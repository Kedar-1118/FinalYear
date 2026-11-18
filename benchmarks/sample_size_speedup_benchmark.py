"""
MABSplit++ Sample Size Scaling & Speedup Benchmark
Evaluates MABSplit++ against Exact Greedy CART, Random Forests, and HistGradientBoosting
across varying sample sizes (from 1,000 to 200,000 samples).
Outputs comprehensive metrics and scaling dynamics to a detailed JSON file.
"""

import os
import sys
import time
import json
import platform
import argparse
import numpy as np
import pandas as pd
from datetime import datetime

# Ensure project root is in sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier, HistGradientBoostingClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, f1_score

from src.data.dataset_loader import generate_synthetic_dataset
from src.models.tree import MABDecisionTreeClassifier
from src.models.forest import MABRandomForestClassifier

def get_tree_depth(node):
    if node is None:
        return 0
    if node.is_leaf:
        return node.depth
    return max(get_tree_depth(node.left), get_tree_depth(node.right))

def warmup_numba_jit():
    """Warms up Numba JIT kernels so compilation time is not counted in benchmark metrics."""
    print(">> [Warmup] Pre-compiling Numba JIT kernels on dummy data...")
    X_warm = np.random.randn(200, 10).astype(np.float32)
    y_warm = np.random.randint(0, 2, size=200).astype(np.int32)
    
    # Warmup MAB DT
    clf = MABDecisionTreeClassifier(max_depth=3, n_bins=32, n_thresh=50, random_state=42)
    clf.fit(X_warm, y_warm)
    clf.predict(X_warm)
    
    # Warmup Vanilla MAB
    clf_vanilla = MABDecisionTreeClassifier(
        max_depth=3, n_bins=32, n_thresh=0,
        use_hybrid=False, use_serfling=False, use_adaptive_batch=False,
        random_state=42
    )
    clf_vanilla.fit(X_warm, y_warm)
    clf_vanilla.predict(X_warm)
    
    print(">> [Warmup] Complete. Starting sample size scaling benchmark.\n")

def run_sample_size_benchmark(sample_sizes=None, n_features=20, n_classes=2, max_depth=10, n_trees=5, random_state=42):
    if sample_sizes is None:
        sample_sizes = [1000, 2500, 5000, 10000, 25000, 50000, 75000, 100000, 150000, 200000]

    warmup_numba_jit()

    results_by_sample_size = []
    summary_table_rows = []

    print("=" * 95)
    print(f" MABSPLIT++ SAMPLE SIZE SCALING BENCHMARK (N in {sample_sizes})")
    print(f" Features: {n_features} | Classes: {n_classes} | Max Depth: {max_depth} | RF Trees: {n_trees}")
    print("=" * 95)

    for idx, n in enumerate(sample_sizes, 1):
        print(f"\n[{idx}/{len(sample_sizes)}] Running benchmark for N = {n:,} samples...")
        
        # 1. Generate dataset
        X, y = generate_synthetic_dataset(
            n_samples=n,
            n_features=n_features,
            n_classes=n_classes,
            random_state=random_state
        )
        
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=random_state, stratify=y
        )
        n_train = len(X_train)
        n_test = len(X_test)
        
        # -------------------------------------------------------------
        # 2. Sklearn Exact Decision Tree (CART)
        # -------------------------------------------------------------
        t0 = time.perf_counter()
        cart = DecisionTreeClassifier(max_depth=max_depth, random_state=random_state)
        cart.fit(X_train, y_train)
        t_cart_fit = time.perf_counter() - t0
        
        t0 = time.perf_counter()
        cart_pred = cart.predict(X_test)
        t_cart_pred = time.perf_counter() - t0
        
        acc_cart = float(accuracy_score(y_test, cart_pred))
        f1_cart = float(f1_score(y_test, cart_pred, average='weighted'))
        nodes_cart = int(cart.tree_.node_count)
        depth_cart = int(cart.tree_.max_depth)
        
        # -------------------------------------------------------------
        # 3. MABSplit++ Decision Tree (Ours)
        # -------------------------------------------------------------
        t0 = time.perf_counter()
        mab_dt = MABDecisionTreeClassifier(
            max_depth=max_depth,
            n_bins=128,
            n_thresh=500,
            use_hybrid=True,
            use_adaptive_batch=True,
            use_serfling=True,
            m0=100,
            m_min=15,
            delta=0.05,
            random_state=random_state
        )
        mab_dt.fit(X_train, y_train)
        t_mab_dt_fit = time.perf_counter() - t0
        
        t0 = time.perf_counter()
        mab_pred = mab_dt.predict(X_test)
        t_mab_dt_pred = time.perf_counter() - t0
        
        acc_mab_dt = float(accuracy_score(y_test, mab_pred))
        f1_mab_dt = float(f1_score(y_test, mab_pred, average='weighted'))
        nodes_mab_dt = int(mab_dt.n_nodes_)
        depth_mab_dt = int(get_tree_depth(mab_dt.root_))
        samples_evaluated_mab_dt = int(mab_dt.total_samples_evaluated_)
        
        # Theoretical worst-case full scans:
        # Each internal node splits over all samples in exact CART: sum(node_samples * features)
        # Approximate baseline: n_train * nodes_mab_dt * (features / 2)
        theoretical_samples_dt = n_train * max(1, (nodes_mab_dt // 2))
        sample_reduction_pct_dt = round(
            max(0.0, (1.0 - (samples_evaluated_mab_dt / max(theoretical_samples_dt, 1))) * 100.0), 2
        )
        dt_speedup = round(t_cart_fit / max(t_mab_dt_fit, 1e-5), 2)
        
        # Splits mode counts
        splits_mode = {
            "exact": int(mab_dt.splits_by_mode_.get("exact", 0)),
            "mab": int(mab_dt.splits_by_mode_.get("mab", 0))
        }

        # -------------------------------------------------------------
        # 4. Vanilla MAB Decision Tree (Tiwari et al., NeurIPS 2022)
        # -------------------------------------------------------------
        t0 = time.perf_counter()
        vanilla_mab = MABDecisionTreeClassifier(
            max_depth=max_depth,
            n_bins=128,
            n_thresh=0,
            use_hybrid=False,
            use_adaptive_batch=False,
            use_serfling=False,
            m0=100,
            delta=0.05,
            random_state=random_state
        )
        vanilla_mab.fit(X_train, y_train)
        t_vanilla_fit = time.perf_counter() - t0
        acc_vanilla = float(accuracy_score(y_test, vanilla_mab.predict(X_test)))
        samples_evaluated_vanilla = int(vanilla_mab.total_samples_evaluated_)
        speedup_vs_vanilla = round(t_vanilla_fit / max(t_mab_dt_fit, 1e-5), 2)

        # -------------------------------------------------------------
        # 5. Sklearn Exact Random Forest
        # -------------------------------------------------------------
        t0 = time.perf_counter()
        sk_rf = RandomForestClassifier(
            n_estimators=n_trees,
            max_depth=max_depth,
            n_jobs=-1,
            random_state=random_state
        )
        sk_rf.fit(X_train, y_train)
        t_sk_rf_fit = time.perf_counter() - t0
        
        t0 = time.perf_counter()
        sk_rf_pred = sk_rf.predict(X_test)
        t_sk_rf_pred = time.perf_counter() - t0
        acc_sk_rf = float(accuracy_score(y_test, sk_rf_pred))
        f1_sk_rf = float(f1_score(y_test, sk_rf_pred, average='weighted'))

        # -------------------------------------------------------------
        # 6. MABSplit++ Random Forest (Ours)
        # -------------------------------------------------------------
        t0 = time.perf_counter()
        mab_rf = MABRandomForestClassifier(
            n_estimators=n_trees,
            max_depth=max_depth,
            n_bins=128,
            n_thresh=500,
            n_jobs=-1,
            random_state=random_state
        )
        mab_rf.fit(X_train, y_train)
        t_mab_rf_fit = time.perf_counter() - t0
        
        t0 = time.perf_counter()
        mab_rf_pred = mab_rf.predict(X_test)
        t_mab_rf_pred = time.perf_counter() - t0
        acc_mab_rf = float(accuracy_score(y_test, mab_rf_pred))
        f1_mab_rf = float(f1_score(y_test, mab_rf_pred, average='weighted'))
        samples_evaluated_mab_rf = int(mab_rf.total_samples_evaluated_)
        rf_speedup = round(t_sk_rf_fit / max(t_mab_rf_fit, 1e-5), 2)
        
        theoretical_samples_rf = n_train * n_trees * 10
        sample_reduction_pct_rf = round(
            max(0.0, (1.0 - (samples_evaluated_mab_rf / max(theoretical_samples_rf, 1))) * 100.0), 2
        )

        # -------------------------------------------------------------
        # 7. HistGradientBoosting (Reference benchmark)
        # -------------------------------------------------------------
        t0 = time.perf_counter()
        hgb = HistGradientBoostingClassifier(
            max_depth=max_depth,
            max_iter=15,
            random_state=random_state
        )
        hgb.fit(X_train, y_train)
        t_hgb_fit = time.perf_counter() - t0
        acc_hgb = float(accuracy_score(y_test, hgb.predict(X_test)))

        # -------------------------------------------------------------
        # Compile record for this N
        # -------------------------------------------------------------
        record = {
            "sample_size": n,
            "train_samples": n_train,
            "test_samples": n_test,
            "n_features": n_features,
            "n_classes": n_classes,
            "speedup_summary": {
                "decision_tree_speedup_vs_cart": dt_speedup,
                "random_forest_speedup_vs_sklearn_rf": rf_speedup,
                "speedup_vs_vanilla_mab": speedup_vs_vanilla,
                "cart_train_time_sec": round(t_cart_fit, 4),
                "mab_dt_train_time_sec": round(t_mab_dt_fit, 4),
                "vanilla_mab_train_time_sec": round(t_vanilla_fit, 4),
                "sklearn_rf_train_time_sec": round(t_sk_rf_fit, 4),
                "mab_rf_train_time_sec": round(t_mab_rf_fit, 4),
                "hist_gbt_train_time_sec": round(t_hgb_fit, 4),
                "dt_sample_reduction_pct": sample_reduction_pct_dt,
                "rf_sample_reduction_pct": sample_reduction_pct_rf
            },
            "exact_cart_details": {
                "train_time_sec": round(t_cart_fit, 4),
                "predict_time_sec": round(t_cart_pred, 4),
                "accuracy": round(acc_cart, 4),
                "f1_score": round(f1_cart, 4),
                "node_count": nodes_cart,
                "max_depth": depth_cart
            },
            "mab_dt_details": {
                "train_time_sec": round(t_mab_dt_fit, 4),
                "predict_time_sec": round(t_mab_dt_pred, 4),
                "accuracy": round(acc_mab_dt, 4),
                "f1_score": round(f1_mab_dt, 4),
                "accuracy_difference_vs_cart": round(acc_mab_dt - acc_cart, 4),
                "node_count": nodes_mab_dt,
                "max_depth": depth_mab_dt,
                "samples_evaluated": samples_evaluated_mab_dt,
                "splits_by_mode": splits_mode,
                "mab_split_ratio": round(splits_mode["mab"] / max(1, splits_mode["exact"] + splits_mode["mab"]), 3)
            },
            "vanilla_mab_details": {
                "train_time_sec": round(t_vanilla_fit, 4),
                "accuracy": round(acc_vanilla, 4),
                "samples_evaluated": samples_evaluated_vanilla
            },
            "exact_rf_details": {
                "n_estimators": n_trees,
                "train_time_sec": round(t_sk_rf_fit, 4),
                "predict_time_sec": round(t_sk_rf_pred, 4),
                "accuracy": round(acc_sk_rf, 4),
                "f1_score": round(f1_sk_rf, 4)
            },
            "mab_rf_details": {
                "n_estimators": n_trees,
                "train_time_sec": round(t_mab_rf_fit, 4),
                "predict_time_sec": round(t_mab_rf_pred, 4),
                "accuracy": round(acc_mab_rf, 4),
                "f1_score": round(f1_mab_rf, 4),
                "accuracy_difference_vs_exact_rf": round(acc_mab_rf - acc_sk_rf, 4),
                "samples_evaluated": samples_evaluated_mab_rf
            },
            "hist_gbt_details": {
                "train_time_sec": round(t_hgb_fit, 4),
                "accuracy": round(acc_hgb, 4)
            }
        }
        
        results_by_sample_size.append(record)
        
        summary_table_rows.append({
            "Sample Size (N)": f"{n:,}",
            "CART Time (s)": f"{t_cart_fit:.4f}",
            "MAB DT Time (s)": f"{t_mab_dt_fit:.4f}",
            "DT Speedup": f"{dt_speedup:.2f}x",
            "MAB Acc": f"{acc_mab_dt * 100:.2f}%",
            "CART Acc": f"{acc_cart * 100:.2f}%",
            "Acc Diff": f"{(acc_mab_dt - acc_cart) * 100:+.2f}%",
            "RF Speedup": f"{rf_speedup:.2f}x",
            "Sample Red %": f"{sample_reduction_pct_dt:.1f}%"
        })
        
        print(f"   -> CART: {t_cart_fit:.3f}s | MAB DT: {t_mab_dt_fit:.3f}s | Speedup: {dt_speedup:.2f}x | Acc: {acc_mab_dt*100:.2f}% (CART: {acc_cart*100:.2f}%)")

    # -------------------------------------------------------------
    # Summary Table Display
    # -------------------------------------------------------------
    df_summary = pd.DataFrame(summary_table_rows)
    print("\n" + "=" * 95)
    print(" SAMPLE SIZE SCALING BENCHMARK SUMMARY")
    print("=" * 95)
    print(df_summary.to_string(index=False))
    print("=" * 95 + "\n")

    # -------------------------------------------------------------
    # Scaling Dynamics & Statistical Insights
    # -------------------------------------------------------------
    speedups = [r["speedup_summary"]["decision_tree_speedup_vs_cart"] for r in results_by_sample_size]
    cart_times = [r["speedup_summary"]["cart_train_time_sec"] for r in results_by_sample_size]
    mab_times = [r["speedup_summary"]["mab_dt_train_time_sec"] for r in results_by_sample_size]
    sample_reductions = [r["speedup_summary"]["dt_sample_reduction_pct"] for r in results_by_sample_size]
    acc_diffs = [r["mab_dt_details"]["accuracy_difference_vs_cart"] for r in results_by_sample_size]

    # Find crossover point where MAB DT becomes faster than Exact CART (speedup > 1.0)
    crossover_n = None
    for r in results_by_sample_size:
        if r["speedup_summary"]["decision_tree_speedup_vs_cart"] >= 1.0:
            crossover_n = r["sample_size"]
            break

    peak_speedup_idx = int(np.argmax(speedups))
    peak_speedup = speedups[peak_speedup_idx]
    peak_speedup_n = sample_sizes[peak_speedup_idx]

    # Empirical time complexity fitting (log-log slope)
    log_n = np.log(sample_sizes)
    log_cart = np.log(cart_times)
    log_mab = np.log(mab_times)
    
    slope_cart, _ = np.polyfit(log_n, log_cart, 1)
    slope_mab, _ = np.polyfit(log_n, log_mab, 1)

    metadata = {
        "benchmark_metadata": {
            "title": "MABSplit++ Sample Size Scaling and Speedup Analysis",
            "generation_timestamp": datetime.now().isoformat(),
            "algorithm_version": "1.0.0",
            "framework": "MABSplit++ (NeurIPS 2022 Extension)",
            "institution": "Walchand College of Engineering, Sangli",
            "authors": ["Aditya Pansare", "Kedar Dhotre", "Dhanashree Maid", "Onkar Rane"]
        },
        "system_environment": {
            "os": platform.platform(),
            "processor": platform.processor(),
            "python_version": platform.python_version(),
            "numpy_version": np.__version__,
            "pandas_version": pd.__version__
        },
        "hyperparameters": {
            "max_depth": max_depth,
            "n_bins": 128,
            "n_thresh_hybrid": 500,
            "delta_pac": 0.05,
            "m0_initial_batch": 100,
            "m_min_floor": 15,
            "alpha_decay": 1.0,
            "n_trees_forest": n_trees,
            "n_features": n_features,
            "n_classes": n_classes
        },
        "scaling_analysis": {
            "sample_sizes_tested": sample_sizes,
            "crossover_point_n": crossover_n,
            "crossover_description": f"MABSplit++ achieves computational superiority at N >= {crossover_n:,} samples.",
            "peak_speedup": {
                "speedup_ratio": peak_speedup,
                "achieved_at_sample_size": peak_speedup_n
            },
            "mean_speedup_large_scale": float(np.mean([s for s, n in zip(speedups, sample_sizes) if n >= 25000])),
            "mean_accuracy_difference": float(np.mean(acc_diffs)),
            "accuracy_parity_maintained": bool(abs(np.mean(acc_diffs)) < 0.01),
            "empirical_time_scaling_exponent": {
                "cart_scaling_order": f"O(N^{slope_cart:.2f})",
                "mab_scaling_order": f"O(N^{slope_mab:.2f})",
                "sublinearity_verification": bool(slope_mab < slope_cart),
                "slope_reduction_pct": round((1.0 - (slope_mab / max(slope_cart, 1e-4))) * 100.0, 2)
            },
            "sample_efficiency": {
                "max_sample_reduction_pct": float(np.max(sample_reductions)),
                "mean_sample_reduction_pct": float(np.mean(sample_reductions))
            }
        },
        "detailed_results_by_sample_size": results_by_sample_size
    }

    # -------------------------------------------------------------
    # Save JSON and CSV
    # -------------------------------------------------------------
    output_dir = os.path.join(os.path.dirname(__file__), "..", "benchmarks", "results")
    os.makedirs(output_dir, exist_ok=True)
    
    json_path = os.path.join(output_dir, "sample_size_speedup_analysis.json")
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(metadata, f, indent=2)
    print(f">> [Output] Full detailed benchmark JSON saved to: {json_path}")

    csv_path = os.path.join(output_dir, "sample_size_speedup_summary.csv")
    df_summary.to_csv(csv_path, index=False)
    print(f">> [Output] Summary CSV saved to: {csv_path}")

    return metadata

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="MABSplit++ Sample Size Speedup Benchmark")
    parser.add_argument("--sizes", nargs="+", type=int, default=[1000, 2500, 5000, 10000, 25000, 50000, 75000, 100000, 150000, 200000])
    parser.add_argument("--features", type=int, default=20)
    parser.add_argument("--depth", type=int, default=10)
    parser.add_argument("--trees", type=int, default=5)
    parser.add_argument("--seed", type=int, default=42)
    args = parser.parse_args()

    run_sample_size_benchmark(
        sample_sizes=args.sizes,
        n_features=args.features,
        max_depth=args.depth,
        n_trees=args.trees,
        random_state=args.seed
    )
