import time
import argparse
import os
import sys

# Ensure root directory is in sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

import numpy as np
import pandas as pd
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier, HistGradientBoostingClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, f1_score

from src.data.dataset_loader import load_adult, load_covertype, load_higgs, generate_synthetic_dataset
from src.models.tree import MABDecisionTreeClassifier
from src.models.forest import MABRandomForestClassifier

def warmup_jit():
    """Warms up Numba JIT compilation on a tiny dummy matrix before timer activation."""
    print(">> Warming up Numba JIT kernels...")
    X_dummy = np.random.randn(100, 6).astype(np.float32)
    y_dummy = np.random.randint(0, 2, size=100).astype(np.int32)
    clf = MABDecisionTreeClassifier(max_depth=3, n_bins=32, n_thresh=50)
    clf.fit(X_dummy, y_dummy)
    clf.predict(X_dummy)
    print(">> Numba JIT compilation ready.\n")

def run_benchmark(dataset_name: str = "synthetic", subsample: int = 50000, n_trees: int = 10):
    warmup_jit()

    print(f"================================================================================")
    print(f" BENCHMARK RUN: Dataset = {dataset_name.upper()} (Subsample = {subsample})")
    print(f"================================================================================")

    # Load dataset
    if dataset_name.lower() == "adult":
        X, y = load_adult(subsample=subsample)
    elif dataset_name.lower() == "covertype":
        X, y = load_covertype(subsample=subsample)
    elif dataset_name.lower() == "higgs":
        X, y = load_higgs(subsample=subsample)
    else:
        X, y = generate_synthetic_dataset(n_samples=subsample, n_features=25, n_classes=2)

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    print(f"Training Samples: {len(X_train):,}, Features: {X_train.shape[1]}, Classes: {len(np.unique(y_train))}\n")

    results = []

    # 1. Scikit-Learn Exact DecisionTree
    print("--> [1/4] Running Scikit-Learn Exact DecisionTreeClassifier...")
    t0 = time.perf_counter()
    sk_tree = DecisionTreeClassifier(max_depth=10, random_state=42)
    sk_tree.fit(X_train, y_train)
    t_sk_tree = time.perf_counter() - t0
    acc_sk_tree = accuracy_score(y_test, sk_tree.predict(X_test))
    f1_sk_tree = f1_score(y_test, sk_tree.predict(X_test), average='weighted')
    results.append({
        "Model": "Sklearn Exact DecisionTree",
        "Train Time (s)": round(t_sk_tree, 4),
        "Accuracy": round(acc_sk_tree, 4),
        "F1 Score": round(f1_sk_tree, 4),
        "Speedup vs Exact": "1.00x",
        "Sample Reads": f"{len(X_train) * 10:,}"
    })

    # 2. Scikit-Learn HistGradientBoosting (Modern Binned Baseline)
    print("--> [2/4] Running Sklearn HistGradientBoostingClassifier...")
    t0 = time.perf_counter()
    hgb = HistGradientBoostingClassifier(max_depth=10, max_iter=20, random_state=42)
    hgb.fit(X_train, y_train)
    t_hgb = time.perf_counter() - t0
    acc_hgb = accuracy_score(y_test, hgb.predict(X_test))
    f1_hgb = f1_score(y_test, hgb.predict(X_test), average='weighted')
    results.append({
        "Model": "Sklearn HistGradientBoosting",
        "Train Time (s)": round(t_hgb, 4),
        "Accuracy": round(acc_hgb, 4),
        "F1 Score": round(f1_hgb, 4),
        "Speedup vs Exact": f"{round(t_sk_tree / max(t_hgb, 1e-4), 2)}x",
        "Sample Reads": "N/A"
    })

    # 3. Our Accelerated MABDecisionTreeClassifier
    print("--> [3/4] Running Accelerated MABDecisionTreeClassifier...")
    t0 = time.perf_counter()
    mab_tree = MABDecisionTreeClassifier(
        max_depth=10,
        n_bins=128,
        n_thresh=1000,
        use_hybrid=True,
        use_adaptive_batch=True,
        use_serfling=True,
        m0=120,
        m_min=20,
        random_state=42
    )
    mab_tree.fit(X_train, y_train)
    t_mab_tree = time.perf_counter() - t0
    acc_mab_tree = accuracy_score(y_test, mab_tree.predict(X_test))
    f1_mab_tree = f1_score(y_test, mab_tree.predict(X_test), average='weighted')
    speedup_tree = t_sk_tree / max(t_mab_tree, 1e-4)
    results.append({
        "Model": "Accelerated MABDecisionTree (Ours)",
        "Train Time (s)": round(t_mab_tree, 4),
        "Accuracy": round(acc_mab_tree, 4),
        "F1 Score": round(f1_mab_tree, 4),
        "Speedup vs Exact": f"{round(speedup_tree, 2)}x",
        "Sample Reads": f"{mab_tree.total_samples_evaluated_:,}"
    })

    # 4. Our MABRandomForestClassifier vs Sklearn RandomForest
    print(f"--> [4/4] Running MABRandomForestClassifier ({n_trees} trees)...")
    t0 = time.perf_counter()
    sk_rf = RandomForestClassifier(n_estimators=n_trees, max_depth=10, n_jobs=-1, random_state=42)
    sk_rf.fit(X_train, y_train)
    t_sk_rf = time.perf_counter() - t0
    acc_sk_rf = accuracy_score(y_test, sk_rf.predict(X_test))
    f1_sk_rf = f1_score(y_test, sk_rf.predict(X_test), average='weighted')
    results.append({
        "Model": f"Sklearn RandomForest ({n_trees} trees)",
        "Train Time (s)": round(t_sk_rf, 4),
        "Accuracy": round(acc_sk_rf, 4),
        "F1 Score": round(f1_sk_rf, 4),
        "Speedup vs Exact": "1.00x",
        "Sample Reads": f"{len(X_train) * n_trees * 10:,}"
    })

    t0 = time.perf_counter()
    mab_rf = MABRandomForestClassifier(
        n_estimators=n_trees,
        max_depth=10,
        n_bins=128,
        n_thresh=1000,
        n_jobs=-1,
        random_state=42
    )
    mab_rf.fit(X_train, y_train)
    t_mab_rf = time.perf_counter() - t0
    acc_mab_rf = accuracy_score(y_test, mab_rf.predict(X_test))
    f1_mab_rf = f1_score(y_test, mab_rf.predict(X_test), average='weighted')
    speedup_rf = t_sk_rf / max(t_mab_rf, 1e-4)
    results.append({
        "Model": f"Accelerated MABRandomForest (Ours)",
        "Train Time (s)": round(t_mab_rf, 4),
        "Accuracy": round(acc_mab_rf, 4),
        "F1 Score": round(f1_mab_rf, 4),
        "Speedup vs Exact": f"{round(speedup_rf, 2)}x",
        "Sample Reads": f"{mab_rf.total_samples_evaluated_:,}"
    })

    print("\n" + "=" * 80)
    print(" BENCHMARK RESULTS SUMMARY TABLE")
    print("=" * 80)
    df_res = pd.DataFrame(results)
    print(df_res.to_string(index=False))
    print("=" * 80 + "\n")
    return df_res

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="MABSplit Comprehensive Benchmark Suite")
    parser.add_argument("--dataset", type=str, default="synthetic", choices=["synthetic", "adult", "covertype", "higgs"])
    parser.add_argument("--subsample", type=int, default=30000)
    parser.add_argument("--trees", type=int, default=10)
    args = parser.parse_args()

    run_benchmark(dataset_name=args.dataset, subsample=args.subsample, n_trees=args.trees)
