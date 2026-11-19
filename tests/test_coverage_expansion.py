"""
Comprehensive Test Coverage Expansion Suite for MABSplit++.
Targets all uncovered branches, edge cases, error conditions,
and py_func implementations across all modules in src/.
"""

import os
import math
import numpy as np
import pytest
from sklearn.exceptions import NotFittedError
from sklearn.datasets import make_classification

from src.data.prebinning import FastBinner
from src.data.dataset_loader import (
    load_adult,
    load_covertype,
    load_higgs,
    generate_synthetic_dataset,
    list_available_datasets,
    get_dataset_summary,
    _resolve_data_path
)
from src.engine.numba_kernels import (
    accumulate_histograms_uint8,
    evaluate_gini_reduction_bins,
    welford_update_scalar,
    serfling_bound,
    hoeffding_bound,
    exact_best_split_vectorized,
    mab_find_best_split_numba
)
from src.engine.fast_mab import FastMABEngine
from src.engine.hybrid_solver import HybridSolver
from src.engine.cpp_backend import CppEngineBridge
from src.pruning.arm_pruner import HierarchicalArmPruner
from src.pruning.dynamic_allocator import DynamicMinibatchAllocator
from src.models.tree import MABDecisionTreeClassifier, TreeNode
from src.models.forest import MABRandomForestClassifier
from src.utils.cross_validation import MABKFoldEvaluator, MABGridSearchCV
from src.utils.profiler import MABProfiler, ProfileSnapshot
from src.utils.serialization import export_graphviz, save_model_json, load_model_json
from src.utils.statistical_tests import (
    cohens_d,
    compute_paired_ttest,
    compute_wilcoxon_signed_rank,
    BenchmarkSignificanceEvaluator
)

# ==============================================================================
# 1. NUMBA KERNELS PY_FUNC COVERAGE
# ==============================================================================

def test_numba_serfling_and_hoeffding_bounds_branches():
    # py_func calls bypass JIT tracing and execute raw python
    # n_sampled <= 1
    assert serfling_bound.py_func(0.2, 1, 100, 0.05) == 1.0
    assert serfling_bound.py_func(0.2, 0, 100, 0.05) == 1.0
    
    # n_sampled >= N_total
    assert serfling_bound.py_func(0.2, 100, 100, 0.05) == 0.0
    assert serfling_bound.py_func(0.2, 105, 100, 0.05) == 0.0

    # normal case
    b = serfling_bound.py_func(0.2, 50, 100, 0.05)
    assert 0.0 < b < 1.0

    # hoeffding bound n <= 0
    assert hoeffding_bound.py_func(0, 0.05) == 1.0
    assert hoeffding_bound.py_func(-5, 0.05) == 1.0
    assert hoeffding_bound.py_func(50, 0.05) > 0.0

def test_numba_welford_update_non_negativity():
    mean, m2, cnt = welford_update_scalar.py_func(10.0, 0.0, 1, 10.0)
    assert cnt == 2
    assert mean == 10.0
    assert m2 >= 0.0

    # multiple updates
    for val in [5.0, 15.0, 20.0, 2.0]:
        mean, m2, cnt = welford_update_scalar.py_func(mean, m2, cnt, val)
    assert cnt == 6
    assert m2 >= 0.0

def test_numba_accumulate_histograms_and_gini_evaluation():
    X_binned = np.array([[0, 1], [1, 0], [2, 1], [0, 0]], dtype=np.uint8)
    y = np.array([0, 1, 0, 1], dtype=np.int32)
    sample_indices = np.array([0, 1, 2, 3], dtype=np.int32)
    active_features = np.array([True, True], dtype=bool)
    hist = np.zeros((2, 256, 2), dtype=np.int32)

    accumulate_histograms_uint8.py_func(X_binned, y, sample_indices, active_features, hist)
    assert np.sum(hist) == 8

    # evaluate_gini_reduction_bins with total_samples <= 1
    gains = np.empty(256, dtype=np.float32)
    evaluate_gini_reduction_bins.py_func(hist[0], 3, np.array([2, 2], dtype=np.int32), 1, gains)
    assert gains[0] == -1.0

    # evaluate_gini_reduction_bins normal
    evaluate_gini_reduction_bins.py_func(hist[0], 3, np.array([2, 2], dtype=np.int32), 4, gains)
    assert gains[0] >= 0.0

def test_numba_exact_best_split_vectorized():
    # N_node <= 1
    feat, b, gain = exact_best_split_vectorized.py_func(
        np.zeros((10, 2), dtype=np.uint8),
        np.zeros(10, dtype=np.int32),
        np.array([0], dtype=np.int32),
        np.array([4, 4], dtype=np.int32),
        np.array([0, 1], dtype=np.int32),
        2
    )
    assert feat == -1 and b == -1 and gain == 0.0

    # Normal exact split
    X_binned = np.array([[0, 0], [0, 0], [2, 1], [2, 1]], dtype=np.uint8)
    y = np.array([0, 0, 1, 1], dtype=np.int32)
    indices = np.arange(4, dtype=np.int32)
    feat, b, gain = exact_best_split_vectorized.py_func(
        X_binned, y, indices, np.array([3, 2], dtype=np.int32), np.array([0, 1], dtype=np.int32), 2
    )
    assert feat == 0
    assert gain > 0.0

def test_numba_mab_find_best_split_branches():
    F = 2
    n_classes = 2
    max_bins = 256
    hist_buf = np.zeros((F, max_bins, n_classes), dtype=np.int32)
    mean_buf = np.zeros((F, max_bins), dtype=np.float64)
    m2_buf = np.zeros((F, max_bins), dtype=np.float64)
    count_buf = np.zeros((F, max_bins), dtype=np.int32)
    active_arms = np.zeros((F, max_bins), dtype=bool)
    active_features_mask = np.zeros(F, dtype=bool)
    lcb_buf = np.zeros((F, max_bins), dtype=np.float64)
    ucb_buf = np.zeros((F, max_bins), dtype=np.float64)
    gains_buf = np.zeros((F, max_bins), dtype=np.float32)
    batch_class_counts = np.zeros(n_classes, dtype=np.int32)

    # N_node <= 1 or empty candidates
    res = mab_find_best_split_numba.py_func(
        np.zeros((10, 2), dtype=np.uint8),
        np.zeros(10, dtype=np.int32),
        np.array([0], dtype=np.int32),
        np.array([0], dtype=np.int32),
        np.array([4, 4], dtype=np.int32),
        2, 10, 5, 1.0, 0.05, True, True,
        hist_buf, mean_buf, m2_buf, count_buf, active_arms,
        active_features_mask, lcb_buf, ucb_buf, gains_buf, batch_class_counts
    )
    assert res == (-1, -1, 0.0, 0)

    # Empty candidate features
    res2 = mab_find_best_split_numba.py_func(
        np.zeros((10, 2), dtype=np.uint8),
        np.zeros(10, dtype=np.int32),
        np.arange(10, dtype=np.int32),
        np.empty(0, dtype=np.int32),
        np.array([4, 4], dtype=np.int32),
        2, 10, 5, 1.0, 0.05, True, True,
        hist_buf, mean_buf, m2_buf, count_buf, active_arms,
        active_features_mask, lcb_buf, ucb_buf, gains_buf, batch_class_counts
    )
    assert res2 == (-1, -1, 0.0, 0)

    # Full execution with Hoeffding bounds and non-adaptive batch
    X_binned = np.random.randint(0, 4, size=(100, 2)).astype(np.uint8)
    y = np.random.randint(0, 2, size=100).astype(np.int32)
    shuffled = np.arange(100, dtype=np.int32)
    
    best_f, best_b, gain, samples = mab_find_best_split_numba.py_func(
        X_binned, y, shuffled, np.array([0, 1], dtype=np.int32),
        np.array([4, 4], dtype=np.int32), 2, 20, 5, 1.0, 0.05,
        False, False,  # use_serfling=False, use_adaptive_batch=False
        hist_buf, mean_buf, m2_buf, count_buf, active_arms,
        active_features_mask, lcb_buf, ucb_buf, gains_buf, batch_class_counts
    )
    assert samples > 0
    assert best_f >= 0

# ==============================================================================
# 2. DATASET LOADER & PREBINNING EXPANSION
# ==============================================================================

def test_prebinning_validation_and_corner_cases():
    binner = FastBinner(n_bins=16, subsample=50)
    
    # 1. Non-2D array
    with pytest.raises(ValueError, match="must be 2D array"):
        binner.fit(np.array([1.0, 2.0, 3.0]))

    # 2. NaN / Inf
    with pytest.raises(ValueError, match="contains NaN or Inf"):
        binner.fit(np.array([[np.nan, 1.0], [2.0, 3.0]]))
    with pytest.raises(ValueError, match="contains NaN or Inf"):
        binner.fit(np.array([[np.inf, 1.0], [2.0, 3.0]]))

    # 3. Subsampling triggered (n_samples > subsample)
    X_large = np.random.randn(100, 3).astype(np.float32)
    binner.fit(X_large)
    assert len(binner.bin_thresholds_) == 3

    # 4. Constant feature (unique count == 1)
    X_const = np.ones((50, 2), dtype=np.float32)
    binner_const = FastBinner(n_bins=16)
    binner_const.fit(X_const)
    assert len(binner_const.bin_thresholds_[0]) == 1

    # 5. get_split_value edge cases (empty thresholds, clamping)
    binner_const.bin_thresholds_[0] = np.empty(0, dtype=np.float32)
    assert binner_const.get_split_value(0, 5) == 0.0
    
    binner.bin_thresholds_[0] = np.array([1.5, 3.5], dtype=np.float32)
    assert binner.get_split_value(0, -1) == 1.5
    assert binner.get_split_value(0, 10) == 3.5

def test_dataset_loader_utilities_and_errors():
    # 1. list_available_datasets
    avail = list_available_datasets()
    assert isinstance(avail, dict)
    assert "adult" in avail
    assert "covertype" in avail
    assert "higgs" in avail

    # 2. get_dataset_summary
    adult_summary = get_dataset_summary("adult")
    assert adult_summary["primary_file"] == "adult.csv"
    
    with pytest.raises(ValueError, match="not recognized"):
        get_dataset_summary("invalid_dataset_name_123")

    # 3. _resolve_data_path missing file error
    with pytest.raises(FileNotFoundError, match="Could not locate"):
        _resolve_data_path("nonexistent_subfolder", "nonexistent_file.xyz")

    # 4. Subsample loaders with small n
    X_adult, y_adult = load_adult(subsample=100)
    assert len(X_adult) == 100
    assert len(y_adult) == 100

    X_cov, y_cov = load_covertype(subsample=100)
    assert len(X_cov) == 100
    assert len(y_cov) == 100

    X_higgs, y_higgs = load_higgs(subsample=100, nrows=1000)
    assert len(X_higgs) == 100
    assert len(y_higgs) == 100

# ==============================================================================
# 3. TREE & FOREST HYPERPARAMETERS & EDGE CASES
# ==============================================================================

def test_tree_max_features_options():
    X, y = make_classification(n_samples=200, n_features=12, n_classes=2, random_state=42)
    
    # 1. max_features='log2'
    clf_log2 = MABDecisionTreeClassifier(max_depth=3, max_features='log2', random_state=42)
    clf_log2.fit(X, y)
    assert clf_log2.score(X, y) > 0.70

    # 2. max_features=0.5 (float)
    clf_float = MABDecisionTreeClassifier(max_depth=3, max_features=0.5, random_state=42)
    clf_float.fit(X, y)
    assert clf_float.score(X, y) > 0.70

    # 3. max_features=4 (int)
    clf_int = MABDecisionTreeClassifier(max_depth=3, max_features=4, random_state=42)
    clf_int.fit(X, y)
    assert clf_int.score(X, y) > 0.70

    # 4. max_features='sqrt'
    clf_sqrt = MABDecisionTreeClassifier(max_depth=3, max_features='sqrt', random_state=42)
    clf_sqrt.fit(X, y)
    assert clf_sqrt.score(X, y) > 0.70

def test_tree_stopping_criteria_and_pure_node():
    # Pure target dataset
    X_pure = np.random.randn(50, 4)
    y_pure = np.zeros(50, dtype=np.int32)
    
    clf = MABDecisionTreeClassifier(max_depth=5)
    clf.fit(X_pure, y_pure)
    assert clf.n_nodes_ == 1
    assert clf.root_.is_leaf

    # High min_samples_split causing immediate leaf
    X, y = make_classification(n_samples=50, n_features=4, random_state=42)
    clf_high_split = MABDecisionTreeClassifier(min_samples_split=100)
    clf_high_split.fit(X, y)
    assert clf_high_split.root_.is_leaf

    # Single class dataset edge case
    clf_single = MABDecisionTreeClassifier()
    clf_single.fit(X[:10], np.ones(10, dtype=np.int32))
    assert len(clf_single.classes_) == 1

def test_tree_not_fitted_error():
    clf = MABDecisionTreeClassifier()
    with pytest.raises(NotFittedError):
        clf.predict(np.random.randn(10, 4))
    with pytest.raises(NotFittedError):
        _ = clf.feature_importances_

def test_tree_coarse_to_fine_integration():
    X, y = make_classification(n_samples=300, n_features=6, random_state=42)
    clf = MABDecisionTreeClassifier(
        max_depth=4,
        use_coarse_to_fine=True,
        b_coarse=16,
        n_bins=64,
        random_state=42
    )
    clf.fit(X, y)
    preds = clf.predict(X)
    assert len(preds) == 300

def test_forest_oob_and_edge_cases():
    X, y = make_classification(n_samples=300, n_features=8, random_state=42)
    
    # 1. Forest with oob_score=True
    forest = MABRandomForestClassifier(
        n_estimators=5,
        max_depth=4,
        oob_score=True,
        bootstrap=True,
        random_state=42
    )
    forest.fit(X, y)
    assert hasattr(forest, "oob_score_")
    assert 0.0 <= forest.oob_score_ <= 1.0

    # 2. Not fitted check
    unfitted_rf = MABRandomForestClassifier()
    with pytest.raises(NotFittedError):
        unfitted_rf.predict(X)
    with pytest.raises(NotFittedError):
        _ = unfitted_rf.feature_importances_

    # 3. predict_proba
    proba = forest.predict_proba(X)
    assert proba.shape == (300, 2)
    assert np.allclose(np.sum(proba, axis=1), 1.0)

# ==============================================================================
# 4. PRUNING, ALLOCATOR & ENGINES EDGE CASES
# ==============================================================================

def test_hierarchical_arm_pruner_edge_cases():
    # 1. Validation asserts
    with pytest.raises(AssertionError, match="Confidence delta must be in"):
        HierarchicalArmPruner(delta=0.0)
    with pytest.raises(AssertionError, match="Confidence delta must be in"):
        HierarchicalArmPruner(delta=1.5)
    with pytest.raises(AssertionError, match="must be less than fine resolution"):
        HierarchicalArmPruner(b_coarse=64, b_fine=32)

    # 2. Few candidate features <= 2 returns immediately
    pruner = HierarchicalArmPruner(b_coarse=16, b_fine=64)
    cands = np.array([0, 1], dtype=np.int32)
    surv, samples = pruner.screen_features(None, None, None, None, cands, None)
    assert len(surv) == 2
    assert samples == 0

def test_dynamic_allocator_exhaustion_and_non_adaptive():
    indices = np.arange(50, dtype=np.int32)
    alloc = DynamicMinibatchAllocator(indices, total_arms_K=20, m0=20, m_min=10)
    
    # Non-adaptive batch size computation
    b_non_adapt = alloc.compute_batch_size(active_arms_count=5, use_adaptive=False)
    assert b_non_adapt == 20

    # Exhaust all samples sequentially
    b1, is_ex1 = alloc.next_batch(20)
    assert len(b1) == 20 and not is_ex1

    b2, is_ex2 = alloc.next_batch(20)
    assert len(b2) == 20 and not is_ex2

    b3, is_ex3 = alloc.next_batch(20)
    assert len(b3) == 10 and is_ex3

    # Call again after exhaustion
    b4, is_ex4 = alloc.next_batch(20)
    assert len(b4) == 0 and is_ex4
    assert alloc.remaining_samples() == 0
    assert alloc.total_sampled_so_far == 50

def test_hybrid_solver_and_fast_mab_terminal_edges():
    solver = HybridSolver(n_features=4, n_classes=2, n_thresh=100)
    
    # 1. len(node_indices) <= 1
    res1 = solver.solve(
        X_binned=np.zeros((10, 4), dtype=np.uint8),
        y=np.zeros(10, dtype=np.int32),
        node_indices=np.array([0], dtype=np.int32),
        candidate_features=np.array([0, 1], dtype=np.int32),
        actual_bins_per_feat=np.array([4, 4, 4, 4], dtype=np.int32)
    )
    assert res1 == (-1, -1, 0.0, 0, "terminal")

    # 2. empty candidate features
    res2 = solver.solve(
        X_binned=np.zeros((10, 4), dtype=np.uint8),
        y=np.zeros(10, dtype=np.int32),
        node_indices=np.arange(10, dtype=np.int32),
        candidate_features=np.empty(0, dtype=np.int32),
        actual_bins_per_feat=np.array([4, 4, 4, 4], dtype=np.int32)
    )
    assert res2 == (-1, -1, 0.0, 0, "terminal")

    # FastMABEngine terminal edge
    engine = FastMABEngine(n_features=4, n_classes=2)
    res_mab1 = engine.find_best_split(
        np.zeros((10, 4), dtype=np.uint8),
        np.zeros(10, dtype=np.int32),
        np.array([0], dtype=np.int32),
        np.array([0, 1], dtype=np.int32),
        np.array([4, 4, 4, 4], dtype=np.int32)
    )
    assert res_mab1 == (-1, -1, 0.0, 0)

def test_cpp_engine_bridge():
    # Unavailable binary path
    bridge = CppEngineBridge(binary_path="nonexistent_mab_binary.exe")
    assert not bridge.is_available
    res = bridge.run_benchmark()
    assert res["status"] == "unavailable"

    # Default bridge check
    default_bridge = CppEngineBridge()
    if default_bridge.is_available:
        bench_res = default_bridge.run_benchmark()
        assert bench_res["status"] == "success"
        assert "execution_time_ms" in bench_res

# ==============================================================================
# 5. CROSS VALIDATION, SERIALIZATION & STATISTICAL UTILITIES
# ==============================================================================

def test_mab_grid_search_cv():
    X, y = make_classification(n_samples=150, n_features=6, n_classes=2, random_state=42)
    param_grid = {
        "max_depth": [2, 3],
        "n_bins": [16, 32]
    }
    
    # 1. Scoring = accuracy
    grid = MABGridSearchCV(
        estimator_class=MABDecisionTreeClassifier,
        param_grid=param_grid,
        cv=2,
        scoring="accuracy",
        random_state=42
    )
    grid.fit(X, y)
    assert grid.best_params_ is not None
    assert grid.best_score_ > 0.0
    assert grid.best_estimator_ is not None
    assert len(grid.cv_results_) == 4

    # 2. Scoring = f1
    grid_f1 = MABGridSearchCV(
        estimator_class=MABDecisionTreeClassifier,
        param_grid={"max_depth": [2]},
        cv=2,
        scoring="f1",
        random_state=42
    )
    grid_f1.fit(X, y)
    assert grid_f1.best_score_ > 0.0

def test_serialization_errors_and_file_export(tmp_path):
    clf = MABDecisionTreeClassifier(max_depth=3)
    
    # 1. Export unfitted model raises ValueError
    with pytest.raises(ValueError, match="Model must be fitted"):
        export_graphviz(clf)
    with pytest.raises(ValueError, match="Model must be fitted"):
        save_model_json(clf, str(tmp_path / "model.json"))

    # 2. Fitted model export to file and string
    X, y = make_classification(n_samples=100, n_features=4, random_state=42)
    clf.fit(X, y)
    
    dot_file = str(tmp_path / "tree.dot")
    dot_str = export_graphviz(clf, filepath=dot_file, feature_names=["A", "B", "C", "D"], class_names=["No", "Yes"])
    assert os.path.exists(dot_file)
    assert "digraph MABDecisionTree" in dot_str

    json_file = str(tmp_path / "tree.json")
    save_model_json(clf, json_file)
    assert os.path.exists(json_file)

    loaded_clf = load_model_json(json_file)
    assert loaded_clf.max_depth == clf.max_depth
    preds_orig = clf.predict(X)
    preds_load = loaded_clf.predict(X)
    assert np.array_equal(preds_orig, preds_load)

def test_statistical_tests_all_branches():
    # 1. cohens_d empty or tiny arrays
    assert cohens_d([], [1.0, 2.0]) == 0.0
    assert cohens_d([1.0], [2.0]) == 0.0
    
    # 2. cohens_d zero variance
    assert cohens_d([5.0, 5.0], [5.0, 5.0]) == 0.0
    assert cohens_d([5.0, 5.0], [2.0, 2.0]) == 1.0
    assert cohens_d([2.0, 2.0], [5.0, 5.0]) == -1.0

    # 3. compute_paired_ttest validation
    with pytest.raises(ValueError, match="Sample lengths must match"):
        compute_paired_ttest([1.0, 2.0], [1.0])
    with pytest.raises(ValueError, match="At least 2 paired observations"):
        compute_paired_ttest([1.0], [1.0])

    # 4. compute_wilcoxon_signed_rank identical scores
    wilcox_zero = compute_wilcoxon_signed_rank([0.8, 0.9], [0.8, 0.9])
    assert wilcox_zero["w_stat"] == 0.0
    assert wilcox_zero["p_value_approx"] == 1.0

    # 5. BenchmarkSignificanceEvaluator empty summary
    evaluator = BenchmarkSignificanceEvaluator()
    assert evaluator.summarize_markdown_table() == "No significance records available."
    
    # Add comparison and format
    evaluator.add_comparison("Synthetic", "Accuracy", [0.85, 0.88, 0.86], [0.86, 0.89, 0.87])
    md_table = evaluator.summarize_markdown_table()
    assert "| Synthetic | Accuracy |" in md_table

def test_profiler_empty_history():
    profiler = MABProfiler()
    assert profiler.format_summary_table() == "No profiling snapshots recorded."
    
    # Profile dummy function with custom get_sample_queries_fn
    snapshot = profiler.profile_training(
        name="DummyModel",
        fit_fn=lambda: np.sort(np.random.randn(1000)),
        total_samples=1000,
        get_sample_queries_fn=lambda: 500,
        tag="unit-test"
    )
    assert snapshot.sample_queries == 500
    assert snapshot.query_reduction_pct == 50.0
    table = profiler.format_summary_table()
    assert "DummyModel" in table

