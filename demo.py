"""
MABSplit++ Interactive Quickstart & Demonstration Script.

Runs an immediate live benchmark comparing exact Scikit-Learn CART
against MABSplit++ on a controlled dataset, demonstrating wall-clock speedup,
sample complexity reduction, and accuracy preservation.

Usage:
    python demo.py
"""

import sys
import os
import time
import numpy as np

# Ensure root is in path
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))

from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, f1_score
from sklearn.tree import DecisionTreeClassifier

from src.models.tree import MABDecisionTreeClassifier
from src.engine.cpp_backend import CppEngineBridge
from benchmarks.benchmark_suite import warmup_jit


def run_live_demo():
    print("=" * 75)
    print("  🌲 MABSplit++ Live Verification & Demonstration Suite")
    print("  Walchand College of Engineering, Sangli — Dept. of CSE")
    print("=" * 75)
    
    # 1. Warm up Numba JIT kernels
    print("\n[1/4] Initializing and warming up Numba JIT machine kernels...")
    warmup_jit()
    print("      ✓ Numba compilation active and cached.")

    # 2. Generate Synthetic Dataset
    n_samples = 30000
    n_features = 20
    print(f"\n[2/4] Generating benchmark tabular dataset ({n_samples:,} samples, {n_features} features)...")
    X, y = make_classification(
        n_samples=n_samples,
        n_features=n_features,
        n_informative=14,
        n_classes=2,
        random_state=42
    )
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # 3. Train Standard Scikit-Learn CART Baseline
    print("\n[3/4] Training Baseline: Scikit-Learn Exact Greedy CART...")
    t0 = time.perf_counter()
    cart = DecisionTreeClassifier(max_depth=10, random_state=42)
    cart.fit(X_train, y_train)
    cart_time = time.perf_counter() - t0
    cart_preds = cart.predict(X_test)
    cart_acc = accuracy_score(y_test, cart_preds)
    cart_f1 = f1_score(y_test, cart_preds)

    # 4. Train MABSplit++
    print("      Training MABSplit++ (Serfling Bounds + H-MAB + ADMA + HybridSolver)...")
    t0 = time.perf_counter()
    mab = MABDecisionTreeClassifier(
        max_depth=10,
        random_state=42,
        use_hybrid=True,
        use_coarse_to_fine=True,
        use_serfling=True,
        use_adaptive_batch=True
    )
    mab.fit(X_train, y_train)
    mab_time = time.perf_counter() - t0
    mab_preds = mab.predict(X_test)
    mab_acc = accuracy_score(y_test, mab_preds)
    mab_f1 = f1_score(y_test, mab_preds)

    speedup = cart_time / max(mab_time, 1e-6)
    samples_eval = getattr(mab, "total_samples_evaluated_", 0)

    # 5. Display Comparative Results
    print("\n" + "=" * 75)
    print("  📊 COMPARATIVE BENCHMARK RESULTS")
    print("=" * 75)
    print(f"{'Metric':<30} | {'Scikit-Learn CART':<18} | {'MABSplit++ (Ours)':<18}")
    print("-" * 75)
    print(f"{'Training Runtime':<30} | {cart_time * 1000:>14.2f} ms | {mab_time * 1000:>14.2f} ms")
    print(f"{'Wall-Clock Speedup':<30} | {'1.00x':>18} | {f'{speedup:.2f}x':>18}")
    print(f"{'Test Accuracy':<30} | {cart_acc * 100:>17.2f}% | {mab_acc * 100:>17.2f}%")
    print(f"{'Test F1-Score':<30} | {cart_f1:>18.4f} | {mab_f1:>18.4f}")
    if samples_eval > 0:
        total_possible = len(X_train) * (2 ** 10 - 1)
        pct = (samples_eval / total_possible) * 100
        print(f"{'Samples Evaluated':<30} | {'100.0% (Exhaustive)':>18} | {f'{samples_eval:,} ({pct:.1f}%)':>18}")
    print("=" * 75)

    # 6. Check C++ Bare-Metal Micro-benchmark
    bridge = CppEngineBridge()
    if bridge.is_available:
        print("\n[4/4] Executing Bare-Metal C++17 Micro-Benchmark Engine...")
        res = bridge.run_benchmark()
        if res.get("status") == "success":
            print(f"      ✓ C++ Engine Runtime: {res.get('execution_time_ms', 0):.2f} ms")
            print(f"      ✓ Sample Queries:    {res.get('samples_evaluated', 0):,} / {res.get('total_samples', 0):,} ({res.get('sample_read_pct', 0):.1f}%)")

    # 7. Next Steps & UI Links
    print("\n💡 NEXT STEPS FOR EVALUATION & DEMONSTRATION:")
    print("  1. Interactive Web Dashboard: Run 'python visualization/serve.py' or open 'visualization/index.html'")
    print("  2. Slide Deck Presentation:   Open 'docs/presentation/presentation.html' in your browser")
    print("  3. Technical Defense QA:      Read 'docs/presentation/TECHNICAL_DEFENSE_QA.md'")
    print("  4. Full Test Suite:           Run 'pytest tests/ -v'")
    print("=" * 75 + "\n")


if __name__ == "__main__":
    run_live_demo()
