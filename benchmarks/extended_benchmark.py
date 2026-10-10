"""
Extended Comparative Benchmark Suite for Publication.

Compares MABSplit++ against ALL competing baselines with statistical significance testing.
Baselines include:
  1. Sklearn Exact DecisionTreeClassifier
  2. Sklearn HistGradientBoostingClassifier
  3. LightGBM in Random Forest mode
  4. XGBoost in Random Forest mode
  5. Sklearn RandomForestClassifier
  6. Our MABDecisionTreeClassifier
  7. Our MABRandomForestClassifier

All benchmarks run over multiple seeds with paired t-tests for statistical rigor.
"""

import os
import sys
import json
import time
import argparse
import tracemalloc

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

import numpy as np
import pandas as pd
from scipy.stats import ttest_rel, wilcoxon
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier, HistGradientBoostingClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, f1_score

from src.data.dataset_loader import (
    load_adult, load_covertype, load_higgs, generate_synthetic_dataset,
)
from src.models.tree import MABDecisionTreeClassifier
from src.models.forest import MABRandomForestClassifier
from benchmarks.benchmark_suite import warmup_jit

# Import optional competitors
try:
    from lightgbm import LGBMClassifier
    HAS_LGBM = True
except ImportError:
    HAS_LGBM = False
    print("[WARN] lightgbm not installed. Skipping LightGBM baselines.")

try:
    from xgboost import XGBRFClassifier
    HAS_XGB = True
except ImportError:
    HAS_XGB = False
    print("[WARN] xgboost not installed. Skipping XGBoost baselines.")


def measure_peak_memory(model, X_train, y_train):
    """Measures peak memory usage during model training using tracemalloc."""
    tracemalloc.start()
    model.fit(X_train, y_train)
    _, peak = tracemalloc.get_traced_memory()
    tracemalloc.stop()
    return peak / (1024 ** 2)  # Convert to MB


def run_single_benchmark(model, model_name, X_train, y_train, X_test, y_test, measure_memory=True):
    """Runs a single model benchmark, collecting time, accuracy, F1, and memory."""
    # Time measurement
    t0 = time.perf_counter()
    model.fit(X_train, y_train)
    train_time = time.perf_counter() - t0

    preds = model.predict(X_test)
    acc = accuracy_score(y_test, preds)
    f1 = f1_score(y_test, preds, average='weighted')

    # Sample evaluations (only for our models)
    samples_eval = getattr(model, 'total_samples_evaluated_', None)

    # Memory measurement (separate run to not interfere with timing)
    peak_mb = None
    if measure_memory:
        try:
            peak_mb = measure_peak_memory(type(model)(**model.get_params()), X_train, y_train)
        except Exception:
            peak_mb = None

    return {
        "model": model_name,
        "train_time": train_time,
        "accuracy": acc,
        "f1_score": f1,
        "sample_evaluations": samples_eval,
        "peak_memory_mb": peak_mb,
    }


def build_model_suite(max_depth=10, n_trees=10):
    """Creates all model instances to benchmark."""
    models = []

    # 1. Sklearn Exact DecisionTree
    models.append((
        "Sklearn Exact DecisionTree",
        DecisionTreeClassifier(max_depth=max_depth, random_state=42),
        "tree"
    ))

    # 2. Sklearn HistGradientBoosting
    models.append((
        "Sklearn HistGradientBoosting",
        HistGradientBoostingClassifier(max_depth=max_depth, max_iter=20, random_state=42),
        "tree"
    ))

    # 3. LightGBM in RF mode
    if HAS_LGBM:
        models.append((
            "LightGBM RF Mode",
            LGBMClassifier(
                boosting_type='rf',
                n_estimators=n_trees,
                max_depth=max_depth,
                subsample=0.8,
                subsample_freq=1,
                verbose=-1,
                random_state=42
            ),
            "forest"
        ))

    # 4. XGBoost in RF mode
    if HAS_XGB:
        models.append((
            "XGBoost RF Mode",
            XGBRFClassifier(
                n_estimators=n_trees,
                max_depth=max_depth,
                subsample=0.8,
                colsample_bynode=0.8,
                random_state=42,
                verbosity=0,
                use_label_encoder=False,
                eval_metric='logloss'
            ),
            "forest"
        ))

    # 5. Sklearn RandomForest
    models.append((
        "Sklearn RandomForest",
        RandomForestClassifier(
            n_estimators=n_trees, max_depth=max_depth,
            n_jobs=-1, random_state=42
        ),
        "forest"
    ))

    # 6. Our MABDecisionTree (Full System)
    models.append((
        "MABSplit++ DecisionTree (Ours)",
        MABDecisionTreeClassifier(
            max_depth=max_depth,
            n_bins=128,
            n_thresh=1000,
            use_hybrid=True,
            use_adaptive_batch=True,
            use_serfling=True,
            use_coarse_to_fine=False,
            m0=120,
            m_min=20,
            random_state=42
        ),
        "tree"
    ))

    # 7. Our MABRandomForest
    models.append((
        "MABSplit++ RandomForest (Ours)",
        MABRandomForestClassifier(
            n_estimators=n_trees,
            max_depth=max_depth,
            n_bins=128,
            n_thresh=1000,
            n_jobs=-1,
            random_state=42
        ),
        "forest"
    ))

    return models


def statistical_significance_test(accs_exact, accs_mab, model_name):
    """Performs paired t-test and Wilcoxon signed-rank test between two accuracy arrays."""
    n = len(accs_exact)
    if n < 3:
        return {"t_stat": None, "p_value": None, "wilcoxon_p": None, "significant": None}

    try:
        t_stat, p_val_t = ttest_rel(accs_exact, accs_mab)
    except Exception:
        t_stat, p_val_t = None, None

    try:
        _, p_val_w = wilcoxon(accs_exact, accs_mab, alternative='two-sided')
    except Exception:
        p_val_w = None

    return {
        "model": model_name,
        "t_statistic": round(t_stat, 4) if t_stat is not None else None,
        "p_value_ttest": round(p_val_t, 6) if p_val_t is not None else None,
        "p_value_wilcoxon": round(p_val_w, 6) if p_val_w is not None else None,
        "significant_at_005": (p_val_t is not None and p_val_t < 0.05),
        "mean_diff": round(np.mean(accs_mab) - np.mean(accs_exact), 5),
    }


def run_extended_benchmark(
    dataset_name="synthetic",
    subsample=30000,
    n_trees=10,
    max_depth=10,
    n_seeds=5,
    measure_memory=True,
):
    """Runs the full extended benchmark with statistical testing."""
    warmup_jit()

    print("=" * 100)
    print(f" EXTENDED COMPARATIVE BENCHMARK (Publication-Grade)")
    print(f" Dataset: {dataset_name.upper()} | Subsample: {subsample:,} | Seeds: {n_seeds}")
    print("=" * 100)

    models_template = build_model_suite(max_depth=max_depth, n_trees=n_trees)

    all_results = []

    for seed_idx in range(n_seeds):
        seed = 42 + seed_idx
        print(f"\n{'─' * 80}")
        print(f" Seed {seed_idx + 1}/{n_seeds} (random_state={seed})")
        print(f"{'─' * 80}")

        # Load data
        if dataset_name.lower() == "adult":
            X, y = load_adult(subsample=subsample, random_state=seed)
        elif dataset_name.lower() == "covertype":
            X, y = load_covertype(subsample=subsample, random_state=seed)
        elif dataset_name.lower() == "higgs":
            X, y = load_higgs(subsample=subsample, random_state=seed)
        else:
            X, y = generate_synthetic_dataset(
                n_samples=subsample, n_features=25, n_classes=2, random_state=seed
            )

        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=seed, stratify=y
        )

        for name, model_template, model_type in models_template:
            # Clone model with different seed
            params = model_template.get_params()
            if 'random_state' in params:
                params['random_state'] = seed
            model = type(model_template)(**params)

            print(f"  -> {name:45s} ", end="", flush=True)

            result = run_single_benchmark(
                model, name, X_train, y_train, X_test, y_test,
                measure_memory=(measure_memory and seed_idx == 0)  # Only measure memory once
            )
            result["seed"] = seed
            result["dataset"] = dataset_name
            result["model_type"] = model_type
            all_results.append(result)

            mem_str = f"  Mem={result['peak_memory_mb']:.1f}MB" if result['peak_memory_mb'] else ""
            samples_str = f"  Samples={result['sample_evaluations']:,}" if result['sample_evaluations'] else ""
            print(
                f"Time={result['train_time']:.4f}s  "
                f"Acc={result['accuracy']:.4f}  "
                f"F1={result['f1_score']:.4f}"
                f"{samples_str}{mem_str}"
            )

    df = pd.DataFrame(all_results)

    # Compute exact baseline time per seed for speedup calculation
    exact_times = df[df["model"] == "Sklearn Exact DecisionTree"].set_index("seed")["train_time"]

    def calc_speedup(row):
        if row["seed"] in exact_times.index:
            return exact_times[row["seed"]] / max(row["train_time"], 1e-6)
        return None

    df["speedup_vs_exact"] = df.apply(calc_speedup, axis=1)

    # Summary table
    print("\n" + "=" * 100)
    print(" BENCHMARK RESULTS SUMMARY (Mean ± Std over Seeds)")
    print("=" * 100)

    summary = (
        df.groupby("model")
        .agg(
            time_mean=("train_time", "mean"),
            time_std=("train_time", "std"),
            acc_mean=("accuracy", "mean"),
            acc_std=("accuracy", "std"),
            f1_mean=("f1_score", "mean"),
            f1_std=("f1_score", "std"),
            speedup_mean=("speedup_vs_exact", "mean"),
            speedup_std=("speedup_vs_exact", "std"),
        )
        .reset_index()
    )

    for _, row in summary.iterrows():
        print(
            f"  {row['model']:45s} | "
            f"Time: {row['time_mean']:.4f}+/-{row['time_std']:.4f}s | "
            f"Acc: {row['acc_mean']:.4f}+/-{row['acc_std']:.4f} | "
            f"Speedup: {row['speedup_mean']:.2f}x"
        )

    # Statistical significance tests
    print("\n" + "=" * 100)
    print(" STATISTICAL SIGNIFICANCE TESTS (vs. Sklearn Exact DecisionTree)")
    print("=" * 100)

    exact_accs_per_seed = df[df["model"] == "Sklearn Exact DecisionTree"].sort_values("seed")["accuracy"].values
    sig_results = []

    for model_name in df["model"].unique():
        if model_name == "Sklearn Exact DecisionTree":
            continue
        model_accs = df[df["model"] == model_name].sort_values("seed")["accuracy"].values
        if len(model_accs) == len(exact_accs_per_seed):
            sig = statistical_significance_test(exact_accs_per_seed, model_accs, model_name)
            sig_results.append(sig)
            status = "!! SIGNIFICANT" if sig["significant_at_005"] else "OK Not Significant"
            print(
                f"  {model_name:45s} | "
                f"p={sig['p_value_ttest']:.6f} | "
                f"Diff={sig['mean_diff']:+.5f} | "
                f"{status}"
            )

    print("=" * 100)

    # Save everything
    output_dir = os.path.join(os.path.dirname(__file__), "results")
    os.makedirs(output_dir, exist_ok=True)

    csv_path = os.path.join(output_dir, f"extended_benchmark_{dataset_name}.csv")
    df.to_csv(csv_path, index=False)

    json_path = os.path.join(output_dir, f"extended_benchmark_{dataset_name}.json")
    with open(json_path, "w") as f:
        json.dump(all_results, f, indent=2, default=str)

    sig_json_path = os.path.join(output_dir, f"significance_tests_{dataset_name}.json")
    with open(sig_json_path, "w") as f:
        json.dump(sig_results, f, indent=2)

    summary_csv = os.path.join(output_dir, f"summary_{dataset_name}.csv")
    summary.to_csv(summary_csv, index=False)

    print(f"\nResults saved to {output_dir}/")
    print(f"  - {os.path.basename(csv_path)} (raw per-seed results)")
    print(f"  - {os.path.basename(json_path)} (JSON format)")
    print(f"  - {os.path.basename(sig_json_path)} (significance tests)")
    print(f"  - {os.path.basename(summary_csv)} (aggregated summary)")

    return df, sig_results


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Extended Comparative Benchmark Suite")
    parser.add_argument("--dataset", type=str, default="synthetic",
                        choices=["synthetic", "adult", "covertype", "higgs"])
    parser.add_argument("--subsample", type=int, default=30000)
    parser.add_argument("--trees", type=int, default=10)
    parser.add_argument("--depth", type=int, default=10)
    parser.add_argument("--seeds", type=int, default=5)
    parser.add_argument("--no-memory", action="store_true", help="Skip memory profiling")
    args = parser.parse_args()

    run_extended_benchmark(
        dataset_name=args.dataset,
        subsample=args.subsample,
        n_trees=args.trees,
        max_depth=args.depth,
        n_seeds=args.seeds,
        measure_memory=not args.no_memory,
    )
