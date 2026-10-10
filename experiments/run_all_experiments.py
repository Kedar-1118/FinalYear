"""
Master Experiment Runner: Runs ALL experiments needed for the paper.

Orchestrates:
  1. Extended benchmark (all baselines with statistical significance)
  2. Ablation study (with CSV output)
  3. Split fidelity analysis (novel metric)
  4. Pareto frontier sweep (delta tradeoff)
  5. Publication-grade plot generation

Usage:
  python experiments/run_all_experiments.py                   # Run everything
  python experiments/run_all_experiments.py --phase 1         # Run only benchmarks
  python experiments/run_all_experiments.py --phase 2         # Run only ablation + fidelity
  python experiments/run_all_experiments.py --phase 3         # Run only Pareto
  python experiments/run_all_experiments.py --phase 4         # Generate plots only
  python experiments/run_all_experiments.py --quick           # Quick run (fewer seeds, smaller data)
"""

import os
import sys
import time
import argparse

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))


def run_phase_1(args):
    """Phase 1: Extended benchmark with all baselines."""
    from benchmarks.extended_benchmark import run_extended_benchmark

    datasets = ["synthetic", "adult"]
    if not args.quick:
        datasets.append("covertype")

    for ds in datasets:
        print(f"\n{'═' * 100}")
        print(f" PHASE 1: Extended Benchmark — {ds.upper()}")
        print(f"{'═' * 100}")
        run_extended_benchmark(
            dataset_name=ds,
            subsample=args.subsample,
            n_trees=args.trees,
            max_depth=args.depth,
            n_seeds=args.seeds,
            measure_memory=not args.no_memory,
        )


def run_phase_2(args):
    """Phase 2: Ablation study + Split fidelity."""
    from experiments.ablation_study import run_ablation
    from experiments.split_fidelity import run_split_fidelity

    print(f"\n{'═' * 100}")
    print(f" PHASE 2a: Ablation Study")
    print(f"{'═' * 100}")
    ablation_df = run_ablation(n_samples=args.subsample)

    # Save ablation results as CSV for plot generation
    results_dir = os.path.join(os.path.dirname(__file__), "results")
    os.makedirs(results_dir, exist_ok=True)
    ablation_csv = os.path.join(results_dir, "ablation_results.csv")
    ablation_df.to_csv(ablation_csv, index=False)
    print(f"Ablation results saved to: {ablation_csv}")

    print(f"\n{'═' * 100}")
    print(f" PHASE 2b: Split Fidelity Analysis")
    print(f"{'═' * 100}")
    run_split_fidelity(
        n_samples=args.subsample,
        n_features=20,
        max_depth=args.depth,
        n_seeds=args.seeds,
        dataset="synthetic",
    )


def run_phase_3(args):
    """Phase 3: Pareto frontier sweep."""
    from experiments.pareto_frontier import run_pareto_sweep

    print(f"\n{'═' * 100}")
    print(f" PHASE 3: Pareto Frontier Sweep")
    print(f"{'═' * 100}")
    run_pareto_sweep(
        n_samples=args.subsample,
        n_features=20,
        max_depth=args.depth,
        n_seeds=args.seeds,
        dataset="synthetic",
    )


def run_phase_4(args):
    """Phase 4: Generate all plots from experimental data."""
    from experiments.generate_plots_v2 import generate_all_plots

    print(f"\n{'═' * 100}")
    print(f" PHASE 4: Publication Plot Generation")
    print(f"{'═' * 100}")
    generate_all_plots()


def main():
    parser = argparse.ArgumentParser(description="Master Experiment Runner for MABSplit++ Paper")
    parser.add_argument("--phase", type=int, default=0,
                        help="Run specific phase (1-4). 0 = run all.")
    parser.add_argument("--subsample", type=int, default=25000)
    parser.add_argument("--trees", type=int, default=10)
    parser.add_argument("--depth", type=int, default=10)
    parser.add_argument("--seeds", type=int, default=5)
    parser.add_argument("--no-memory", action="store_true")
    parser.add_argument("--quick", action="store_true",
                        help="Quick mode: fewer seeds (3), smaller data (10k)")
    args = parser.parse_args()

    if args.quick:
        args.seeds = 3
        args.subsample = min(args.subsample, 10000)
        print("[QUICK MODE] Using 3 seeds and max 10k samples")

    overall_start = time.perf_counter()

    phases = {
        1: ("Extended Benchmarks", run_phase_1),
        2: ("Ablation + Split Fidelity", run_phase_2),
        3: ("Pareto Frontier", run_phase_3),
        4: ("Plot Generation", run_phase_4),
    }

    if args.phase == 0:
        for phase_num, (name, func) in phases.items():
            func(args)
    elif args.phase in phases:
        name, func = phases[args.phase]
        func(args)
    else:
        print(f"Unknown phase: {args.phase}. Use 0-4.")
        return

    total = time.perf_counter() - overall_start
    print(f"\n{'═' * 100}")
    print(f" ALL PHASES COMPLETE — Total time: {total:.1f}s ({total/60:.1f} min)")
    print(f"{'═' * 100}")


if __name__ == "__main__":
    main()
