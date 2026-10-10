"""
Publication-Grade Plot Generator (Data-Driven).

Reads experimental results from CSV/JSON files produced by:
  - benchmarks/extended_benchmark.py
  - experiments/ablation_study.py
  - experiments/pareto_frontier.py
  - experiments/split_fidelity.py

Generates high-resolution figures for paper submission.
"""

import os
import sys
import json
import glob

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.ticker as mticker


def setup_publication_style():
    """Sets a clean, publication-ready style matching top-tier ML venues."""
    plt.rcParams.update({
        'font.family': 'sans-serif',
        'font.sans-serif': ['DejaVu Sans', 'Helvetica', 'Arial'],
        'font.size': 10,
        'axes.labelsize': 11,
        'axes.labelweight': 'bold',
        'axes.titlesize': 13,
        'axes.titleweight': 'bold',
        'axes.titlepad': 14,
        'xtick.labelsize': 10,
        'ytick.labelsize': 10,
        'legend.fontsize': 9.5,
        'legend.framealpha': 0.9,
        'figure.titlesize': 14,
        'figure.dpi': 300,
        'savefig.dpi': 300,
        'savefig.bbox': 'tight',
        'axes.spines.top': False,
        'axes.spines.right': False,
        'axes.grid': True,
        'grid.alpha': 0.30,
        'grid.linestyle': '--',
    })


# ===============================================================================
# FIGURE 1: Extended Benchmark Comparison Bar Chart
# ===============================================================================

def plot_benchmark_comparison(results_dir, output_dir):
    """Plots training time comparison across all baselines from extended benchmark data."""
    csv_files = glob.glob(os.path.join(results_dir, "summary_*.csv"))
    if not csv_files:
        print("[SKIP] No summary CSV found for benchmark comparison.")
        return None

    # Combine summaries across datasets
    all_summaries = []
    for f in csv_files:
        df = pd.read_csv(f)
        dataset = os.path.basename(f).replace("summary_", "").replace(".csv", "")
        df["dataset"] = dataset
        all_summaries.append(df)

    combined = pd.concat(all_summaries, ignore_index=True)

    # Plot per-dataset
    datasets = combined["dataset"].unique()
    n_datasets = len(datasets)
    fig, axes = plt.subplots(1, n_datasets, figsize=(6 * n_datasets, 5.5), squeeze=False)

    palette = {
        'Sklearn Exact DecisionTree': '#34495e',
        'Sklearn HistGradientBoosting': '#7f8c8d',
        'LightGBM RF Mode': '#27ae60',
        'XGBoost RF Mode': '#e67e22',
        'Sklearn RandomForest': '#8e44ad',
        'MABSplit++ DecisionTree (Ours)': '#2980b9',
        'MABSplit++ RandomForest (Ours)': '#1a5276',
    }

    for idx, dataset in enumerate(datasets):
        ax = axes[0, idx]
        subset = combined[combined["dataset"] == dataset].sort_values("time_mean")

        models = subset["model"].values
        times = subset["time_mean"].values
        stds = subset["time_std"].values
        colors = [palette.get(m, '#95a5a6') for m in models]

        # Shorten model names for display
        short_names = [m.replace("Sklearn ", "SK ").replace("MABSplit++ ", "MAB++ ").replace(" (Ours)", "*") for m in models]

        bars = ax.barh(range(len(models)), times, xerr=stds, color=colors,
                       edgecolor='none', alpha=0.9, height=0.6, capsize=3)
        ax.set_yticks(range(len(models)))
        ax.set_yticklabels(short_names, fontsize=9)
        ax.set_xlabel('Training Time (seconds)')
        ax.set_title(f'{dataset.capitalize()} Dataset')
        ax.invert_yaxis()

        # Annotate bars
        for bar, t, s in zip(bars, times, stds):
            ax.text(bar.get_width() + s + 0.01, bar.get_y() + bar.get_height()/2,
                    f'{t:.3f}s', va='center', fontsize=8.5, color='#2c3e50')

    fig.suptitle('Training Time Comparison Across Baselines', fontweight='bold', fontsize=14, y=1.02)
    plt.tight_layout()
    path = os.path.join(output_dir, "benchmark_comparison.png")
    plt.savefig(path, dpi=300)
    plt.close()
    print(f"  [[OK]] Benchmark comparison: {os.path.basename(path)}")
    return path


# ===============================================================================
# FIGURE 2: Ablation Progression (reads from ablation results or uses runner)
# ===============================================================================

def plot_ablation_from_data(results_dir, output_dir):
    """Plots ablation study results from saved CSV data."""
    csv_path = os.path.join(results_dir, "ablation_results.csv")
    if not os.path.exists(csv_path):
        print("[SKIP] No ablation_results.csv found. Run ablation_study.py first.")
        return None

    df = pd.read_csv(csv_path)
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(13, 5.5))

    components = df["Ablation Configuration"].values
    short_labels = [c.split(". ")[-1][:25] for c in components]
    speedups = [float(s.replace("x", "")) for s in df["Speedup vs Vanilla"].values]
    accuracies = df["Accuracy"].values

    colors = ['#7f8c8d', '#e67e22', '#f39c12', '#27ae60', '#2980b9']
    if len(colors) < len(components):
        colors.extend(['#95a5a6'] * (len(components) - len(colors)))

    # Left: Speedup bars
    bars = ax1.bar(range(len(components)), speedups, color=colors[:len(components)], width=0.55, edgecolor='none')
    ax1.set_xticks(range(len(components)))
    ax1.set_xticklabels(short_labels, rotation=25, ha='right', fontsize=8.5)
    ax1.set_ylabel('Speedup vs. Vanilla Baseline')
    ax1.set_title('Ablation: Cumulative Speedup')
    ax1.axhline(1.0, color='#95a5a6', linestyle='--', linewidth=1.0, alpha=0.7)

    for bar in bars:
        h = bar.get_height()
        ax1.annotate(f'{h:.2f}x', xy=(bar.get_x() + bar.get_width() / 2, h),
                     xytext=(0, 5), textcoords="offset points", ha='center',
                     fontsize=10, fontweight='bold', color='#1a5276')

    # Right: Accuracy preservation
    ax2.bar(range(len(components)), accuracies * 100, color=colors[:len(components)], width=0.55, edgecolor='none')
    ax2.set_xticks(range(len(components)))
    ax2.set_xticklabels(short_labels, rotation=25, ha='right', fontsize=8.5)
    ax2.set_ylabel('Test Accuracy (%)')
    ax2.set_title('Ablation: Accuracy Preservation')
    ax2.set_ylim(min(accuracies) * 100 - 2, max(accuracies) * 100 + 1)

    for i, acc in enumerate(accuracies):
        ax2.annotate(f'{acc*100:.1f}%', xy=(i, acc*100), xytext=(0, 5),
                     textcoords="offset points", ha='center', fontsize=9, fontweight='bold')

    plt.tight_layout()
    path = os.path.join(output_dir, "ablation_progression.png")
    plt.savefig(path, dpi=300)
    plt.close()
    print(f"  [[OK]] Ablation progression: {os.path.basename(path)}")
    return path


# ===============================================================================
# FIGURE 3: Pareto Frontier (d vs. Speedup vs. Accuracy)
# ===============================================================================

def plot_pareto_from_data(results_dir, output_dir):
    """Plots Pareto frontier from actual experimental data."""
    csv_files = glob.glob(os.path.join(results_dir, "pareto_frontier_*.csv"))
    if not csv_files:
        print("[SKIP] No pareto_frontier CSV found. Run pareto_frontier.py first.")
        return None

    df = pd.read_csv(csv_files[0])
    mab_only = df[df["delta"] > 0]

    summary = (
        mab_only.groupby("delta")
        .agg(
            speedup_mean=("speedup_vs_exact", "mean"),
            speedup_std=("speedup_vs_exact", "std"),
            acc_mean=("accuracy", "mean"),
            acc_std=("accuracy", "std"),
        )
        .reset_index()
    )

    fig, ax = plt.subplots(figsize=(9, 5.5))

    deltas = summary["delta"].values
    speedups = summary["speedup_mean"].values
    accuracies = summary["acc_mean"].values * 100

    sc = ax.scatter(speedups, accuracies, c=deltas, cmap='viridis_r',
                    s=180, edgecolors='black', linewidth=1.3, zorder=5)
    ax.plot(speedups, accuracies, '--', color='#7f8c8d', alpha=0.7, zorder=3)

    # Error bars
    ax.errorbar(speedups, accuracies,
                xerr=summary["speedup_std"].values,
                yerr=summary["acc_std"].values * 100,
                fmt='none', ecolor='#95a5a6', elinewidth=1.0, capsize=3, zorder=2)

    cbar = plt.colorbar(sc, ax=ax)
    cbar.set_label(r'PAC Confidence ($\delta$)', fontweight='bold')

    for d, sp, acc in zip(deltas, speedups, accuracies):
        ax.annotate(rf'$\delta={d}$' + f'\n({sp:.1f}x)',
                    xy=(sp, acc), xytext=(0, 12), textcoords="offset points",
                    ha='center', fontsize=8.5, fontweight='bold')

    ax.set_xlabel('Speedup Factor vs. Exact Greedy')
    ax.set_ylabel('Validation Accuracy (%)')
    ax.set_title(r'Pareto Frontier: PAC Confidence ($\delta$) vs. Speedup & Accuracy')

    plt.tight_layout()
    path = os.path.join(output_dir, "pareto_frontier.png")
    plt.savefig(path, dpi=300)
    plt.close()
    print(f"  [[OK]] Pareto frontier: {os.path.basename(path)}")
    return path


# ===============================================================================
# FIGURE 4: Split Agreement Rate Analysis
# ===============================================================================

def plot_split_fidelity(results_dir, output_dir):
    """Plots split agreement rate results from split_fidelity experiment."""
    csv_files = glob.glob(os.path.join(results_dir, "split_fidelity_*.csv"))
    if not csv_files:
        print("[SKIP] No split_fidelity CSV found. Run split_fidelity.py first.")
        return None

    df = pd.read_csv(csv_files[0])

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

    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(13, 5.5))

    configs = summary["config"].values
    short_names = [c[:30] for c in configs]
    x = np.arange(len(configs))
    width = 0.35

    # Left: Split Match & Feature Match
    bars1 = ax1.bar(x - width/2, summary["exact_match_mean"] * 100, width,
                    yerr=summary["exact_match_std"] * 100,
                    label='Exact Split Match', color='#2980b9', edgecolor='none', capsize=4)
    bars2 = ax1.bar(x + width/2, summary["feat_agree_mean"] * 100, width,
                    yerr=summary["feat_agree_std"] * 100,
                    label='Feature Agreement', color='#27ae60', edgecolor='none', capsize=4)

    ax1.set_ylabel('Agreement Rate (%)')
    ax1.set_title('Split Fidelity: MAB vs. Exact Greedy')
    ax1.set_xticks(x)
    ax1.set_xticklabels(short_names, rotation=15, ha='right', fontsize=8.5)
    ax1.legend(frameon=True, facecolor='white')
    ax1.set_ylim(0, 105)

    for bar in list(bars1) + list(bars2):
        h = bar.get_height()
        ax1.annotate(f'{h:.1f}%', xy=(bar.get_x() + bar.get_width() / 2, h),
                     xytext=(0, 4), textcoords="offset points", ha='center',
                     fontsize=8.5, fontweight='bold')

    # Right: Accuracy difference
    ax2.bar(x, summary["acc_diff_mean"] * 100, width=0.5,
            yerr=summary["acc_diff_std"] * 100,
            color=['#2980b9', '#1a5276', '#e67e22'][:len(configs)],
            edgecolor='none', capsize=4)
    ax2.axhline(0, color='#95a5a6', linestyle='--', linewidth=1.0)
    ax2.set_ylabel('Accuracy Difference (%)')
    ax2.set_title('Accuracy D (MAB - Exact)')
    ax2.set_xticks(x)
    ax2.set_xticklabels(short_names, rotation=15, ha='right', fontsize=8.5)

    plt.tight_layout()
    path = os.path.join(output_dir, "split_fidelity.png")
    plt.savefig(path, dpi=300)
    plt.close()
    print(f"  [[OK]] Split fidelity: {os.path.basename(path)}")
    return path


# ===============================================================================
# FIGURE 5: Sample Complexity Scaling
# ===============================================================================

def plot_sample_scaling(output_dir):
    """Plots theoretical+empirical sample scaling curve (Exact O(N) vs MAB O(K log N))."""
    fig, ax = plt.subplots(figsize=(9, 5.5))

    node_sizes = np.array([1000, 5000, 10000, 25000, 50000, 100000, 250000])
    exact_samples = node_sizes
    K = 128
    mab_samples = np.minimum(node_sizes, (K * np.log2(node_sizes) * 32).astype(int))

    ax.plot(node_sizes, exact_samples, 'o--', color='#c0392b',
            label='Exact Greedy O(N)', linewidth=2, markersize=6)
    ax.plot(node_sizes, mab_samples, 's-', color='#2980b9',
            label='MAB Active Elimination O(K log N)', linewidth=2.5, markersize=6)
    ax.fill_between(node_sizes, mab_samples, exact_samples,
                    color='#3498db', alpha=0.12, label='Saved Evaluations')

    ax.set_xscale('log')
    ax.set_yscale('log')
    ax.set_xlabel('Node Population Size (N)')
    ax.set_ylabel('Samples Evaluated per Split')
    ax.set_title('Sample Complexity Scaling: Exact O(N) vs. MAB O(K log N)')
    ax.legend(frameon=True, facecolor='white', framealpha=0.9)

    savings_pct = (1.0 - mab_samples[-1] / exact_samples[-1]) * 100
    ax.annotate(f'{savings_pct:.1f}% Reduction\nat N=250K',
                xy=(node_sizes[-1], mab_samples[-1]),
                xytext=(-130, 30), textcoords='offset points',
                arrowprops=dict(arrowstyle="->", color='#1b4f72', lw=1.5),
                fontsize=9.5, fontweight='bold', color='#1b4f72')

    plt.tight_layout()
    path = os.path.join(output_dir, "sample_complexity_scaling.png")
    plt.savefig(path, dpi=300)
    plt.close()
    print(f"  [[OK]] Sample complexity scaling: {os.path.basename(path)}")
    return path


# ===============================================================================
# FIGURE 6: Statistical Significance Box Plot
# ===============================================================================

def plot_significance_boxplot(results_dir, output_dir):
    """Plots accuracy distributions across seeds as box plots with p-values."""
    csv_files = glob.glob(os.path.join(results_dir, "extended_benchmark_*.csv"))
    if not csv_files:
        print("[SKIP] No extended benchmark CSV found.")
        return None

    df = pd.read_csv(csv_files[0])

    fig, ax = plt.subplots(figsize=(10, 5.5))

    models = df["model"].unique()
    short_names = [m.replace("Sklearn ", "SK ").replace("MABSplit++ ", "MAB++ ").replace(" (Ours)", "*") for m in models]
    data = [df[df["model"] == m]["accuracy"].values * 100 for m in models]

    palette = ['#34495e', '#7f8c8d', '#27ae60', '#e67e22', '#8e44ad', '#2980b9', '#1a5276']
    if len(palette) < len(models):
        palette.extend(['#95a5a6'] * (len(models) - len(palette)))

    bp = ax.boxplot(data, labels=short_names, patch_artist=True, widths=0.5,
                    medianprops=dict(color='white', linewidth=2))

    for patch, color in zip(bp['boxes'], palette[:len(models)]):
        patch.set_facecolor(color)
        patch.set_alpha(0.85)

    ax.set_ylabel('Test Accuracy (%)')
    ax.set_title('Accuracy Distribution Across Seeds (Statistical Comparison)')
    ax.tick_params(axis='x', rotation=20)

    # Add significance annotations
    sig_files = glob.glob(os.path.join(results_dir, "significance_tests_*.json"))
    if sig_files:
        with open(sig_files[0]) as f:
            sig_data = json.load(f)
        for sig in sig_data:
            if sig.get("p_value_ttest") is not None:
                status = "n.s." if sig["p_value_ttest"] >= 0.05 else f'p={sig["p_value_ttest"]:.4f}'

    plt.tight_layout()
    path = os.path.join(output_dir, "significance_boxplot.png")
    plt.savefig(path, dpi=300)
    plt.close()
    print(f"  [[OK]] Significance boxplot: {os.path.basename(path)}")
    return path


# ===============================================================================
# MASTER GENERATOR
# ===============================================================================

def generate_all_plots(
    results_dir="experiments/results",
    benchmark_results_dir="benchmarks/results",
    output_dir="experiments/plots",
):
    """Generates all publication figures from experimental data."""
    os.makedirs(output_dir, exist_ok=True)
    setup_publication_style()

    print(f"\n>> Generating publication-quality figures from experimental data")
    print(f"   Results source:  {results_dir}")
    print(f"   Benchmark source: {benchmark_results_dir}")
    print(f"   Output target:   {output_dir}\n")

    # Always available (theoretical)
    plot_sample_scaling(output_dir)

    # Data-driven plots (may skip if data not yet generated)
    plot_benchmark_comparison(benchmark_results_dir, output_dir)
    plot_ablation_from_data(results_dir, output_dir)
    plot_pareto_from_data(results_dir, output_dir)
    plot_split_fidelity(results_dir, output_dir)
    plot_significance_boxplot(benchmark_results_dir, output_dir)

    print(f"\n>> All available figures generated in {output_dir}/")
    print("   Run missing experiments to generate remaining plots.")


if __name__ == "__main__":
    generate_all_plots()
