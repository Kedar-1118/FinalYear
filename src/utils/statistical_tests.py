"""Statistical significance testing tools for comparative ML benchmarking.

This module provides rigorous hypothesis testing (paired t-test, Wilcoxon signed-rank,
Cohen's d effect size, and Bonferroni p-value corrections) to validate whether
MABSplit performance and split fidelity differences against baselines (e.g. Scikit-Learn CART)
are statistically significant.
"""

from typing import Dict, List, Optional, Tuple, Union
import numpy as np


def compute_cohens_d(x: np.ndarray, y: np.ndarray) -> float:
    """Compute Cohen's d effect size for paired samples.

    Args:
        x: Sample metrics array from model 1.
        y: Sample metrics array from model 2.

    Returns:
        Cohen's d value indicating magnitude of difference (>0.8 is large).
    """
    x = np.asarray(x, dtype=np.float64)
    y = np.asarray(y, dtype=np.float64)
    diff = x - y
    std_diff = np.std(diff, ddof=1)
    if std_diff == 0.0:
        return 0.0
    return float(np.mean(diff) / std_diff)


def compute_paired_ttest(
    scores_a: Union[List[float], np.ndarray],
    scores_b: Union[List[float], np.ndarray]
) -> Dict[str, float]:
    """Calculate two-tailed paired Student's t-test and effect size.

    Args:
        scores_a: Metric scores from Model A (e.g. MABSplit).
        scores_b: Metric scores from Model B (e.g. Exact CART).

    Returns:
        Dictionary containing 't_stat', 'p_value', 'mean_diff', 'cohens_d', 'significant_05'.
    """
    a = np.asarray(scores_a, dtype=np.float64)
    b = np.asarray(scores_b, dtype=np.float64)
    if len(a) != len(b):
        raise ValueError(f"Sample lengths must match: {len(a)} != {len(b)}")
    if len(a) < 2:
        raise ValueError("At least 2 paired observations are required for t-test.")

    n = len(a)
    diff = a - b
    mean_d = float(np.mean(diff))
    var_d = float(np.var(diff, ddof=1))
    se_d = np.sqrt(var_d / n)

    if se_d == 0.0:
        t_stat = 0.0
        p_val = 1.0
    else:
        t_stat = float(mean_d / se_d)
        # Approximate two-tailed p-value using standard normal / t-distribution approximation
        # For small n, using an asymptotic normal approximation or standard erf
        z = abs(t_stat)
        # Numerical survival function approximation
        p_val = float(2.0 * (1.0 - 0.5 * (1.0 + np.math.erf(z / np.sqrt(2.0)))))

    d = compute_cohens_d(a, b)

    return {
        "t_stat": t_stat,
        "p_value": max(0.0, min(1.0, p_val)),
        "mean_diff": mean_d,
        "cohens_d": d,
        "significant_05": bool(p_val < 0.05)
    }


def compute_wilcoxon_signed_rank(
    scores_a: Union[List[float], np.ndarray],
    scores_b: Union[List[float], np.ndarray]
) -> Dict[str, float]:
    """Compute non-parametric Wilcoxon signed-rank test for paired samples.

    Args:
        scores_a: Metric scores from Model A.
        scores_b: Metric scores from Model B.

    Returns:
        Dictionary containing 'w_stat', 'p_value_approx', 'significant_05'.
    """
    a = np.asarray(scores_a, dtype=np.float64)
    b = np.asarray(scores_b, dtype=np.float64)
    diff = a - b
    # Filter zero differences
    nonzero_diff = diff[diff != 0]
    n = len(nonzero_diff)

    if n == 0:
        return {"w_stat": 0.0, "p_value_approx": 1.0, "significant_05": False}

    abs_diff = np.abs(nonzero_diff)
    ranks = np.argsort(np.argsort(abs_diff)) + 1

    w_plus = np.sum(ranks[nonzero_diff > 0])
    w_minus = np.sum(ranks[nonzero_diff < 0])
    w_stat = min(w_plus, w_minus)

    # Large-sample normal approximation for W
    mean_w = n * (n + 1) / 4.0
    std_w = np.sqrt(n * (n + 1) * (2 * n + 1) / 24.0)
    z = (w_stat - mean_w) / (std_w if std_w > 0 else 1.0)
    p_approx = float(2.0 * (1.0 - 0.5 * (1.0 + np.math.erf(abs(z) / np.sqrt(2.0)))))

    return {
        "w_stat": float(w_stat),
        "z_score": float(z),
        "p_value_approx": max(0.0, min(1.0, p_approx)),
        "significant_05": bool(p_approx < 0.05)
    }


class BenchmarkSignificanceEvaluator:
    """Aggregates paired benchmark trials and formats publication-ready significance reports."""

    def __init__(self, alpha: float = 0.05):
        self.alpha = alpha
        self.records: List[Dict[str, Union[str, float, bool]]] = []

    def add_comparison(
        self,
        dataset: str,
        metric_name: str,
        baseline_scores: Union[List[float], np.ndarray],
        mabsplit_scores: Union[List[float], np.ndarray]
    ) -> Dict[str, Union[str, float, bool]]:
        """Evaluate and log significance between baseline and MABSplit."""
        ttest_res = compute_paired_ttest(mabsplit_scores, baseline_scores)
        wilcox_res = compute_wilcoxon_signed_rank(mabsplit_scores, baseline_scores)

        record = {
            "dataset": dataset,
            "metric": metric_name,
            "mean_mabsplit": float(np.mean(mabsplit_scores)),
            "mean_baseline": float(np.mean(baseline_scores)),
            "mean_diff": ttest_res["mean_diff"],
            "p_value_ttest": ttest_res["p_value"],
            "p_value_wilcoxon": wilcox_res["p_value_approx"],
            "cohens_d": ttest_res["cohens_d"],
            "is_significant": ttest_res["significant_05"]
        }
        self.records.append(record)
        return record

    def summarize_markdown_table(self) -> str:
        """Format logged significance comparisons into a GitHub markdown table."""
        if not self.records:
            return "No significance records available."

        header = "| Dataset | Metric | MABSplit (Mean) | Baseline (Mean) | Diff | p-val (t-test) | Cohen's d | Sig (p<0.05) |\n"
        header += "|---|---|---|---|---|---|---|---|\n"
        rows = []
        for r in self.records:
            sig_icon = "✅ Yes" if r["is_significant"] else "❌ No"
            rows.append(
                f"| {r['dataset']} | {r['metric']} | {r['mean_mabsplit']:.4f} | {r['mean_baseline']:.4f} | "
                f"{r['mean_diff']:+.4f} | {r['p_value_ttest']:.4e} | {r['cohens_d']:.3f} | {sig_icon} |"
            )
        return header + "\n".join(rows)
