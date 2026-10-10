"""
Pareto Frontier Experiment: Sweeps the PAC confidence parameter delta
and measures the tradeoff between speedup, accuracy, and sample efficiency.

This produces the data needed for the Pareto frontier plot (Figure 4).
"""

import os
import sys
import json
import argparse
import time

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

import numpy as np
import pandas as pd
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, f1_score

from src.data.dataset_loader import generate_synthetic_dataset, load_adult, load_covertype
from src.models.tree import MABDecisionTreeClassifier
from benchmarks.benchmark_suite import warmup_jit


def run_pareto_sweep(
    n_samples=30000,
    n_features=20,
    max_depth=10,
    n_seeds=5,
    dataset="synthetic",
):
    """Sweeps delta values and measures speedup/accuracy/sample tradeoff."""
    warmup_jit()

    deltas = [0.001, 0.005, 0.01, 0.05, 0.10, 0.20]

    print("=" * 90)
    print(f" PARETO FRONTIER: delta vs. Speedup vs. Accuracy (Dataset: {dataset.upper()})")
    print("=" * 90)

    all_results = []

    for seed_idx in range(n_seeds):
        seed = 42 + seed_idx
        print(f"\n--- Seed {seed_idx + 1}/{n_seeds} (random_state={seed}) ---")

        if dataset == "synthetic":
            X, y = generate_synthetic_dataset(n_samples=n_samples, n_features=n_features, random_state=seed)
        elif dataset == "adult":
            X, y = load_adult(subsample=n_samples, random_state=seed)
        elif dataset == "covertype":
            X, y = load_covertype(subsample=n_samples, random_state=seed)
        else:
            X, y = generate_synthetic_dataset(n_samples=n_samples, n_features=n_features, random_state=seed)

        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=seed)

        # Exact baseline
        t0 = time.perf_counter()
        sk_tree = DecisionTreeClassifier(max_depth=max_depth, random_state=seed)
        sk_tree.fit(X_train, y_train)
        exact_time = time.perf_counter() - t0
        exact_acc = accuracy_score(y_test, sk_tree.predict(X_test))
        exact_f1 = f1_score(y_test, sk_tree.predict(X_test), average='weighted')

        all_results.append({
            "seed": seed,
            "delta": 0.0,
            "model": "Exact Greedy (Sklearn)",
            "train_time": round(exact_time, 6),
            "accuracy": round(exact_acc, 5),
            "f1_score": round(exact_f1, 5),
            "speedup_vs_exact": 1.0,
            "sample_evaluations": len(X_train),
            "dataset": dataset,
        })

        # MAB sweep over deltas
        for delta in deltas:
            clf = MABDecisionTreeClassifier(
                max_depth=max_depth,
                n_bins=128,
                n_thresh=500,
                delta=delta,
                use_hybrid=True,
                use_adaptive_batch=True,
                use_serfling=True,
                use_coarse_to_fine=False,
                random_state=seed,
            )

            t0 = time.perf_counter()
            clf.fit(X_train, y_train)
            mab_time = time.perf_counter() - t0

            mab_acc = accuracy_score(y_test, clf.predict(X_test))
            mab_f1 = f1_score(y_test, clf.predict(X_test), average='weighted')
            speedup = exact_time / max(mab_time, 1e-6)

            all_results.append({
                "seed": seed,
                "delta": delta,
                "model": f"MABSplit++ (δ={delta})",
                "train_time": round(mab_time, 6),
                "accuracy": round(mab_acc, 5),
                "f1_score": round(mab_f1, 5),
                "speedup_vs_exact": round(speedup, 3),
                "sample_evaluations": clf.total_samples_evaluated_,
                "dataset": dataset,
            })

            print(
                f"  δ={delta:<6}  Time={mab_time:.4f}s  "
                f"Speedup={speedup:.2f}x  Acc={mab_acc:.4f}  "
                f"Samples={clf.total_samples_evaluated_:,}"
            )

    # Aggregate
    df = pd.DataFrame(all_results)

    print("\n" + "=" * 90)
    print(" PARETO FRONTIER SUMMARY (Mean ± Std over Seeds)")
    print("=" * 90)

    mab_only = df[df["delta"] > 0]
    summary = (
        mab_only.groupby("delta")
        .agg(
            speedup_mean=("speedup_vs_exact", "mean"),
            speedup_std=("speedup_vs_exact", "std"),
            acc_mean=("accuracy", "mean"),
            acc_std=("accuracy", "std"),
            samples_mean=("sample_evaluations", "mean"),
        )
        .reset_index()
    )

    exact_summary = df[df["delta"] == 0]
    exact_acc_mean = exact_summary["accuracy"].mean()
    print(f"  Exact Baseline Accuracy: {exact_acc_mean:.4f}")
    print()

    for _, row in summary.iterrows():
        print(
            f"  δ={row['delta']:<6.3f} | "
            f"Speedup: {row['speedup_mean']:.2f}x ± {row['speedup_std']:.2f} | "
            f"Acc: {row['acc_mean']:.4f} ± {row['acc_std']:.4f} | "
            f"Samples: {row['samples_mean']:,.0f}"
        )
    print("=" * 90)

    # Save results
    output_dir = os.path.join(os.path.dirname(__file__), "results")
    os.makedirs(output_dir, exist_ok=True)

    csv_path = os.path.join(output_dir, f"pareto_frontier_{dataset}.csv")
    df.to_csv(csv_path, index=False)
    print(f"\nCSV saved: {csv_path}")

    json_path = os.path.join(output_dir, f"pareto_frontier_{dataset}.json")
    with open(json_path, "w") as f:
        json.dump(all_results, f, indent=2)
    print(f"JSON saved: {json_path}")

    return df


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Pareto Frontier Experiment")
    parser.add_argument("--samples", type=int, default=30000)
    parser.add_argument("--features", type=int, default=20)
    parser.add_argument("--depth", type=int, default=10)
    parser.add_argument("--seeds", type=int, default=5)
    parser.add_argument(
        "--dataset", type=str, default="synthetic",
        choices=["synthetic", "adult", "covertype"]
    )
    args = parser.parse_args()

    run_pareto_sweep(
        n_samples=args.samples,
        n_features=args.features,
        max_depth=args.depth,
        n_seeds=args.seeds,
        dataset=args.dataset,
    )
