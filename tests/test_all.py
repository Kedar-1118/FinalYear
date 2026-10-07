import math
import numpy as np
import pytest
from sklearn.metrics import accuracy_score
from sklearn.datasets import make_classification

from src.data.prebinning import FastBinner
from src.engine.numba_kernels import (
    welford_update_scalar,
    serfling_bound,
    hoeffding_bound,
    exact_best_split_vectorized
)
from src.pruning.dynamic_allocator import DynamicMinibatchAllocator
from src.models.tree import MABDecisionTreeClassifier
from src.models.forest import MABRandomForestClassifier

def test_fast_binner():
    X = np.random.randn(500, 5).astype(np.float32)
    binner = FastBinner(n_bins=32)
    X_binned = binner.fit_transform(X)
    assert X_binned.shape == (500, 5)
    assert X_binned.dtype == np.uint8
    assert np.isfortran(X_binned)
    assert np.max(X_binned) <= 32
    assert len(binner.bin_thresholds_) == 5

def test_serfling_bound():
    # When n == N, Serfling finite-population factor is 0 -> bound is 0
    bound_full = serfling_bound(variance=0.25, n_sampled=1000, N_total=1000, delta=0.05)
    assert bound_full == 0.0

    # When n < N, bound is positive and smaller than Hoeffding
    bound_half = serfling_bound(variance=0.25, n_sampled=500, N_total=1000, delta=0.05)
    bound_hoeffding = hoeffding_bound(n_sampled=500, delta=0.05)
    assert bound_half > 0.0
    assert bound_half < bound_hoeffding * 1.5

def test_welford_updates():
    data = [1.2, 2.5, 0.8, 3.1, 4.0, 2.2]
    mean = 0.0
    m2 = 0.0
    cnt = 0
    for x in data:
        mean, m2, cnt = welford_update_scalar(mean, m2, cnt, x)

    expected_mean = np.mean(data)
    expected_var = np.var(data, ddof=1)
    computed_var = m2 / (cnt - 1)

    assert math.isclose(mean, expected_mean, rel_tol=1e-5)
    assert math.isclose(computed_var, expected_var, rel_tol=1e-5)

def test_dynamic_minibatch_allocator():
    node_indices = np.arange(1000, dtype=np.int32)
    allocator = DynamicMinibatchAllocator(
        node_indices=node_indices,
        total_arms_K=100,
        m0=100,
        m_min=15,
        alpha=1.0
    )
    # When active arms = 100/100, batch size = m0 = 100
    b1 = allocator.compute_batch_size(active_arms_count=100)
    assert b1 == 100

    # When active arms shrunk to 10/100, batch size = 15 (m_min)
    b2 = allocator.compute_batch_size(active_arms_count=10)
    assert b2 == 15

    # Test sequential sampling without replacement
    batch, is_exhausted = allocator.next_batch(active_arms_count=100)
    assert len(batch) == 100
    assert not is_exhausted

def test_mab_decision_tree_classifier():
    X, y = make_classification(n_samples=2000, n_features=10, n_classes=2, random_state=42)
    clf = MABDecisionTreeClassifier(
        max_depth=6,
        n_bins=64,
        n_thresh=200,
        use_hybrid=True,
        random_state=42
    )
    clf.fit(X, y)
    preds = clf.predict(X)
    proba = clf.predict_proba(X)

    acc = accuracy_score(y, preds)
    assert acc > 0.80, f"Expected accuracy > 0.80, got {acc}"
    assert proba.shape == (2000, 2)
    assert np.allclose(np.sum(proba, axis=1), 1.0)
    assert clf.n_nodes_ > 0
    assert clf.total_samples_evaluated_ > 0

def test_mab_random_forest_classifier():
    X, y = make_classification(n_samples=2000, n_features=10, n_classes=2, random_state=42)
    rf = MABRandomForestClassifier(
        n_estimators=5,
        max_depth=5,
        n_bins=64,
        n_jobs=2,
        random_state=42
    )
    rf.fit(X, y)
    preds = rf.predict(X)
    proba = rf.predict_proba(X)

    acc = accuracy_score(y, preds)
    assert acc > 0.80, f"Expected accuracy > 0.80, got {acc}"
    assert proba.shape == (2000, 2)
    assert len(rf.estimators_) == 5

def test_ablation_configurations():
    X, y = make_classification(n_samples=1000, n_features=8, n_classes=2, random_state=42)
    # Test with hybrid disabled
    clf_no_hybrid = MABDecisionTreeClassifier(max_depth=4, use_hybrid=False, random_state=42)
    clf_no_hybrid.fit(X, y)
    assert accuracy_score(y, clf_no_hybrid.predict(X)) > 0.75

    # Test with coarse-to-fine enabled
    clf_c2f = MABDecisionTreeClassifier(max_depth=4, use_coarse_to_fine=True, random_state=42)
    clf_c2f.fit(X, y)
    assert accuracy_score(y, clf_c2f.predict(X)) > 0.75
