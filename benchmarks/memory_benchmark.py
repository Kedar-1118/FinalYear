"""Memory and Throughput Benchmark Suite for MABSplit vs Baselines.

Evaluates peak RAM usage, Fortran-contiguous binning footprint, and training throughput
across increasing dimensionalities and sample sizes.
"""

import argparse
import sys
import os
import time
import numpy as np

# Add project root to sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from src.data.dataset_loader import load_synthetic_data
from src.models.tree import MABDecisionTreeClassifier
from src.utils.profiler import MABProfiler


def run_memory_scaling_benchmark(
    n_samples: int = 50000,
    dimensions: list = [10, 25, 50, 100],
    max_depth: int = 10,
    n_classes: int = 2
):
    """Run memory and throughput scaling across varying dimensionalities."""
    print("=" * 75)
    print("🚀 MABSplit Memory & Throughput Scaling Benchmark")
    print(f"Dataset Scale: N = {n_samples:,} samples | Max Depth: {max_depth} | Classes: {n_classes}")
    print("=" * 75)

    profiler = MABProfiler()

    for d in dimensions:
        print(f"\n--- Evaluating Dimensionality D = {d} features ---")
        X, y = load_synthetic_data(n_samples=n_samples, n_features=d, n_classes=n_classes, random_state=42)

        # Baseline: Exact CART
        from sklearn.tree import DecisionTreeClassifier
        exact_tree = DecisionTreeClassifier(max_depth=max_depth, random_state=42)
        snap_exact = profiler.profile_training(
            name=f"Exact CART (D={d})",
            fit_fn=lambda: exact_tree.fit(X, y),
            total_samples=n_samples
        )

        # MABSplit
        mab_tree = MABDecisionTreeClassifier(max_depth=max_depth, random_state=42, use_hybrid=True)
        snap_mab = profiler.profile_training(
            name=f"MABSplit (D={d})",
            fit_fn=lambda: mab_tree.fit(X, y),
            total_samples=n_samples
        )

        speedup = snap_exact.wall_time_sec / max(snap_mab.wall_time_sec, 1e-6)
        mem_ratio = snap_mab.peak_memory_mb / max(snap_exact.peak_memory_mb, 1e-6)

        print(f"  Exact CART : Time = {snap_exact.wall_time_sec:.3f}s | Peak RAM = {snap_exact.peak_memory_mb:.2f} MB")
        print(f"  MABSplit   : Time = {snap_mab.wall_time_sec:.3f}s | Peak RAM = {snap_mab.peak_memory_mb:.2f} MB")
        print(f"  Speedup    : {speedup:.2f}x | Memory Ratio : {mem_ratio:.2f}x")

    print("\n" + "=" * 75)
    print("📊 Summary Results Table")
    print("=" * 75)
    print(profiler.format_summary_table())


def main():
    parser = argparse.ArgumentParser(description="MABSplit Memory Scaling Benchmark")
    parser.add_argument("--samples", type=int, default=30000, help="Number of synthetic samples")
    parser.add_argument("--max-depth", type=int, default=10, help="Maximum tree depth")
    args = parser.parse_args()

    run_memory_scaling_benchmark(n_samples=args.samples, max_depth=args.max_depth)


if __name__ == "__main__":
    main()
