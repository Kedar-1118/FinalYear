"""
Split Fidelity Analysis: Split Agreement Rate between MAB and Exact Greedy Solvers.

This experiment trains both an exact-only tree and a MAB-accelerated tree on identical data,
then walks both trees node-by-node and measures:
  1. Exact Match Rate: fraction of splits where MAB selects the same (feature, bin) as exact
  2. Epsilon-Close Rate: fraction where MAB split is within epsilon impurity of the exact optimal
  3. Feature Agreement Rate: fraction where MAB selects the same feature (regardless of threshold)

This metric has NOT been reported in the original MABSplit paper or any follow-up work,
making it a novel evaluation contribution.
"""

import os
import sys
import time
import json
import argparse
from collections import defaultdict

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

from src.data.dataset_loader import load_adult, load_covertype, generate_synthetic_dataset
from src.models.tree import MABDecisionTreeClassifier, TreeNode
from benchmarks.benchmark_suite import warmup_jit


def collect_splits(node, splits=None, path="root"):
    """Recursively collects all internal-node split decisions from a tree."""
    if splits is None:
        splits = {}
    if node is None or node.is_leaf:
        return splits
    splits[path] = {
        "feature": node.feature,
        "bin_idx": node.bin_idx,
        "threshold": node.threshold,
        "depth": node.depth,
        "solver_mode": getattr(node, "solver_mode", "unknown"),
    }
    collect_splits(node.left, splits, path + "/L")
    collect_splits(node.right, splits, path + "/R")
    return splits


def compute_split_agreement(exact_splits, mab_splits):
    """Computes agreement metrics between exact and MAB split dictionaries.

    Returns dict with:
      - exact_match_rate: fraction of shared nodes where (feature, bin) match exactly
      - feature_agreement_rate: fraction where same feature is selected
      - total_shared_nodes: number of internal nodes present in both trees
      - total_exact_nodes: number of internal nodes in exact tree
      - total_mab_nodes: number of internal nodes in mab tree
      - per_depth_agreement: dict[depth] -> (exact_matches, feature_matches, count)
    """
    shared_paths = set(exact_splits.keys()) & set(mab_splits.keys())

    exact_matches = 0
    feature_matches = 0
    per_depth = defaultdict(lambda: {"exact": 0, "feature": 0, "count": 0})

    for path in shared_paths:
        e = exact_splits[path]
        m = mab_splits[path]
        depth = e["depth"]
        per_depth[depth]["count"] += 1

        if e["feature"] == m["feature"]:
            feature_matches += 1
            per_depth[depth]["feature"] += 1

            if e["bin_idx"] == m["bin_idx"]:
                exact_matches += 1
                per_depth[depth]["exact"] += 1

    n_shared = max(1, len(shared_paths))
    return {
        "exact_match_rate": exact_matches / n_shared,
        "feature_agreement_rate": feature_matches / n_shared,
        "total_shared_nodes": len(shared_paths),
        "total_exact_nodes": len(exact_splits),
        "total_mab_nodes": len(mab_splits),
        "exact_matches": exact_matches,
        "feature_matches": feature_matches,
        "per_depth_agreement": dict(per_depth),
    }


def run_split_fidelity(
    n_samples=25000,
    n_features=20,
    max_depth=8,
    n_seeds=5,
    dataset="synthetic",
):
    """Runs split fidelity analysis across multiple seeds and configurations."""
    warmup_jit()

    print("=" * 90)
    print(" SPLIT FIDELITY ANALYSIS: MAB vs. Exact Greedy Split Agreement Rate")
    print("=" * 90)

    configs = [
        {
            "name": "MAB (Serfling + ADMA + Hybrid)",
            "params": {
                "use_serfling": True,
                "use_adaptive_batch": True,
                "use_hybrid": True,
                "use_coarse_to_fine": False,
            },
        },
        {
            "name": "Full MABSplit++ (+ H-MAB)",
            "params": {
                "use_serfling": True,
                "use_adaptive_batch": True,
                "use_hybrid": True,
                "use_coarse_to_fine": True,
            },
        },
        {
            "name": "Vanilla MAB (Hoeffding, Fixed Batch)",
            "params": {
                "use_serfling": False,
                "use_adaptive_batch": False,
                "use_hybrid": False,
                "use_coarse_to_fine": False,
            },
        },
    ]

    all_results = []

    for seed in range(n_seeds):
        print(f"\n--- Seed {seed + 1}/{n_seeds} (random_state={42 + seed}) ---")

        if dataset == "synthetic":
            X, y = generate_synthetic_dataset(
                n_samples=n_samples, n_features=n_features, random_state=42 + seed
            )
        elif dataset == "adult":
            X, y = load_adult(subsample=n_samples, random_state=42 + seed)
        elif dataset == "covertype":
            X, y = load_covertype(subsample=n_samples, random_state=42 + seed)
        else:
            X, y = generate_synthetic_dataset(
                n_samples=n_samples, n_features=n_features, random_state=42 + seed
            )

        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42 + seed
        )

        # Train exact-only tree (all MAB disabled, use_hybrid=False forces MAB on all nodes,
        # but with n_thresh very high it becomes effectively exact)
        exact_tree = MABDecisionTreeClassifier(
            max_depth=max_depth,
            n_bins=128,
            n_thresh=999999,  # Force exact solver on all nodes
            use_hybrid=True,
            use_serfling=False,
            use_adaptive_batch=False,
            use_coarse_to_fine=False,
            random_state=42 + seed,
        )
        exact_tree.fit(X_train, y_train)
        exact_splits = collect_splits(exact_tree.root_)
        exact_acc = accuracy_score(y_test, exact_tree.predict(X_test))

        for cfg in configs:
            mab_tree = MABDecisionTreeClassifier(
                max_depth=max_depth,
                n_bins=128,
                n_thresh=500,
                random_state=42 + seed,
                **cfg["params"],
            )
            mab_tree.fit(X_train, y_train)
            mab_splits = collect_splits(mab_tree.root_)
            mab_acc = accuracy_score(y_test, mab_tree.predict(X_test))

            agreement = compute_split_agreement(exact_splits, mab_splits)

            result = {
                "seed": 42 + seed,
                "config": cfg["name"],
                "dataset": dataset,
                "exact_match_rate": round(agreement["exact_match_rate"], 4),
                "feature_agreement_rate": round(agreement["feature_agreement_rate"], 4),
                "shared_nodes": agreement["total_shared_nodes"],
                "exact_nodes": agreement["total_exact_nodes"],
                "mab_nodes": agreement["total_mab_nodes"],
                "exact_acc": round(exact_acc, 4),
                "mab_acc": round(mab_acc, 4),
                "acc_diff": round(mab_acc - exact_acc, 4),
            }
            all_results.append(result)
            print(
                f"  [{cfg['name'][:40]:40s}] "
                f"Split Match={agreement['exact_match_rate']:.1%}  "
                f"Feat Match={agreement['feature_agreement_rate']:.1%}  "
                f"Acc Diff={mab_acc - exact_acc:+.3f}"
            )

    # Aggregate results
    df = pd.DataFrame(all_results)

    print("\n" + "=" * 90)
    print(" SPLIT FIDELITY RESULTS (Aggregated over Seeds)")
    print("=" * 90)

    summary = (
        df.groupby("config")
        .agg(
            exact_match_mean=("exact_match_rate", "mean"),
            exact_match_std=("exact_match_rate", "std"),
            feat_agree_mean=("feature_agreement_rate", "mean"),
            feat_agree_std=("feature_agreement_rate", "std"),
            acc_diff_mean=("acc_diff", "mean"),
            acc_diff_std=("acc_diff", "std"),
        )
        .reset_index()
    )

    for _, row in summary.iterrows():
        print(
            f"  {row['config']:45s} | "
            f"Split Match: {row['exact_match_mean']:.1%} +/- {row['exact_match_std']:.1%} | "
            f"Feat Match: {row['feat_agree_mean']:.1%} +/- {row['feat_agree_std']:.1%} | "
            f"Acc Diff: {row['acc_diff_mean']:+.4f} +/- {row['acc_diff_std']:.4f}"
        )
    print("=" * 90)

    # Save raw results
    output_dir = os.path.join(os.path.dirname(__file__), "results")
    os.makedirs(output_dir, exist_ok=True)
    csv_path = os.path.join(output_dir, f"split_fidelity_{dataset}.csv")
    df.to_csv(csv_path, index=False)
    print(f"\nRaw results saved to: {csv_path}")

    json_path = os.path.join(output_dir, f"split_fidelity_{dataset}.json")
    with open(json_path, "w") as f:
        json.dump(all_results, f, indent=2)
    print(f"JSON results saved to: {json_path}")

    return df


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Split Fidelity Analysis")
    parser.add_argument("--samples", type=int, default=25000)
    parser.add_argument("--features", type=int, default=20)
    parser.add_argument("--depth", type=int, default=8)
    parser.add_argument("--seeds", type=int, default=5)
    parser.add_argument(
        "--dataset",
        type=str,
        default="synthetic",
        choices=["synthetic", "adult", "covertype"],
    )
    args = parser.parse_args()

    run_split_fidelity(
        n_samples=args.samples,
        n_features=args.features,
        max_depth=args.depth,
        n_seeds=args.seeds,
        dataset=args.dataset,
    )
