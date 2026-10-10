"""Unit and integration tests for statistical significance testing and MAB profiler."""

import unittest
import numpy as np
import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from src.utils.statistical_tests import (
    compute_paired_ttest,
    compute_wilcoxon_signed_rank,
    compute_cohens_d,
    BenchmarkSignificanceEvaluator
)
from src.utils.profiler import MABProfiler


class TestStatisticalSignificance(unittest.TestCase):
    """Test suite for statistical test functions."""

    def test_paired_ttest_identical(self):
        """Identical scores should have t=0, p=1, and not be significant."""
        a = [0.85, 0.88, 0.90, 0.82]
        b = [0.85, 0.88, 0.90, 0.82]
        res = compute_paired_ttest(a, b)
        self.assertAlmostEqual(res["t_stat"], 0.0)
        self.assertAlmostEqual(res["p_value"], 1.0)
        self.assertFalse(res["significant_05"])

    def test_paired_ttest_distinct(self):
        """Substantially different distributions should yield low p-value."""
        a = [0.95, 0.96, 0.97, 0.94, 0.98]
        b = [0.60, 0.62, 0.58, 0.61, 0.59]
        res = compute_paired_ttest(a, b)
        self.assertTrue(res["significant_05"])
        self.assertGreater(res["cohens_d"], 2.0)

    def test_wilcoxon_signed_rank(self):
        """Wilcoxon test should correctly identify strictly dominant rankings."""
        a = [10.0, 12.0, 15.0, 11.0, 14.0]
        b = [2.0, 3.0, 1.0, 4.0, 2.0]
        res = compute_wilcoxon_signed_rank(a, b)
        self.assertTrue(res["significant_05"])

    def test_cohens_d(self):
        """Verify Cohen's d computation."""
        x = np.array([10.0, 20.0, 30.0])
        y = np.array([5.0, 15.0, 25.0])
        d = compute_cohens_d(x, y)
        self.assertGreater(d, 0.0)

    def test_benchmark_evaluator(self):
        """Verify report aggregation and markdown output."""
        evaluator = BenchmarkSignificanceEvaluator()
        evaluator.add_comparison(
            dataset="Adult",
            metric_name="Accuracy",
            baseline_scores=[0.85, 0.84, 0.86],
            mabsplit_scores=[0.85, 0.85, 0.86]
        )
        md_table = evaluator.summarize_markdown_table()
        self.assertIn("Adult", md_table)
        self.assertIn("Accuracy", md_table)


class TestMABProfiler(unittest.TestCase):
    """Test suite for execution and memory profiler."""

    def test_profiler_execution(self):
        profiler = MABProfiler()

        def dummy_fit():
            arr = np.ones((500, 500), dtype=np.float64)
            return np.sum(arr)

        snap = profiler.profile_training(
            name="DummyAlgorithm",
            fit_fn=dummy_fit,
            total_samples=10000,
            get_sample_queries_fn=lambda: 2500
        )
        self.assertEqual(snap.algorithm_name, "DummyAlgorithm")
        self.assertGreater(snap.wall_time_sec, 0.0)
        self.assertEqual(snap.sample_queries, 2500)
        self.assertAlmostEqual(snap.query_reduction_pct, 75.0)

        table = profiler.format_summary_table()
        self.assertIn("DummyAlgorithm", table)
        self.assertIn("75.0%", table)


if __name__ == "__main__":
    unittest.main()
