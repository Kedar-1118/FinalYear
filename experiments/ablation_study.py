import time
import argparse
import os
import sys

# Ensure root directory is in sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, f1_score

from src.data.dataset_loader import load_adult, generate_synthetic_dataset
from src.models.tree import MABDecisionTreeClassifier
from benchmarks.benchmark_suite import warmup_jit

def run_ablation(n_samples: int = 25000):
    warmup_jit()

    print("================================================================================")
    print(" MODULAR ABLATION STUDY: EVALUATING CONTRIBUTION OF EACH INNOVATION")
    print("================================================================================\n")

    X, y = generate_synthetic_dataset(n_samples=n_samples, n_features=20, n_classes=2, random_state=42)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    configs = [
        {
            "name": "1. Vanilla MAB (Hoeffding, Fixed Batch, No Hybrid)",
            "params": {
                "use_serfling": False,
                "use_adaptive_batch": False,
                "use_hybrid": False,
                "use_coarse_to_fine": False,
            }
        },
        {
            "name": "2. + Serfling Finite-Population Bound",
            "params": {
                "use_serfling": True,
                "use_adaptive_batch": False,
                "use_hybrid": False,
                "use_coarse_to_fine": False,
            }
        },
        {
            "name": "3. + ADMA (Adaptive Dynamic Minibatch)",
            "params": {
                "use_serfling": True,
                "use_adaptive_batch": True,
                "use_hybrid": False,
                "use_coarse_to_fine": False,
            }
        },
        {
            "name": "4. + Hybrid Depth/Sample Switch",
            "params": {
                "use_serfling": True,
                "use_adaptive_batch": True,
                "use_hybrid": True,
                "use_coarse_to_fine": False,
            }
        },
        {
            "name": "5. Full System (+ Hierarchical Coarse-to-Fine H-MAB)",
            "params": {
                "use_serfling": True,
                "use_adaptive_batch": True,
                "use_hybrid": True,
                "use_coarse_to_fine": True,
            }
        }
    ]

    records = []
    base_time = None

    for cfg in configs:
        print(f"--> Running: {cfg['name']}...")
        clf = MABDecisionTreeClassifier(
            max_depth=8,
            n_bins=128,
            n_thresh=500,
            random_state=42,
            **cfg["params"]
        )

        t0 = time.perf_counter()
        clf.fit(X_train, y_train)
        elapsed = time.perf_counter() - t0

        if base_time is None:
            base_time = elapsed

        preds = clf.predict(X_test)
        acc = accuracy_score(y_test, preds)
        f1 = f1_score(y_test, preds, average='weighted')

        records.append({
            "Ablation Configuration": cfg["name"],
            "Train Time (s)": round(elapsed, 4),
            "Speedup vs Vanilla": f"{round(base_time / max(elapsed, 1e-4), 2)}x",
            "Sample Queries": f"{clf.total_samples_evaluated_:,}",
            "Accuracy": round(acc, 4),
            "F1 Score": round(f1, 4)
        })

    df = pd.DataFrame(records)
    print("\n" + "=" * 90)
    print(" ABLATION STUDY RESULTS")
    print("=" * 90)
    print(df.to_string(index=False))
    print("=" * 90 + "\n")
    return df

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--samples", type=int, default=25000)
    args = parser.parse_args()
    run_ablation(n_samples=args.samples)
