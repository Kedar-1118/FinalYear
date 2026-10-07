import math
import numpy as np
from numba import njit, prange

@njit(fastmath=True, nogil=True)
def accumulate_histograms_uint8(
    X_binned: np.ndarray,      # (N, F) uint8
    y: np.ndarray,             # (N,) int32
    sample_indices: np.ndarray,# (M,) int32
    active_features: np.ndarray, # (F,) bool
    hist: np.ndarray           # (F, 256, n_classes) int32
):
    """Accumulates class counts per bin for active features in the given sample batch."""
    M = len(sample_indices)
    F = X_binned.shape[1]
    
    # Zero out histogram slice for active features
    for f in range(F):
        if active_features[f]:
            hist[f, :, :] = 0

    for i in range(M):
        idx = sample_indices[i]
        label = y[idx]
        for f in range(F):
            if active_features[f]:
                b = X_binned[idx, f]
                hist[f, b, label] += 1

@njit(fastmath=True, nogil=True)
def evaluate_gini_reduction_bins(
    hist_f: np.ndarray,        # (256, n_classes) int32
    actual_bins: int,
    node_class_counts: np.ndarray, # (n_classes,) int32
    total_samples: int,
    gains: np.ndarray          # (256,) float32 output
):
    """Computes Gini impurity decrease for each possible threshold split 0..(actual_bins-2)."""
    n_classes = hist_f.shape[1]
    gains[:] = -1.0  # Invalid indicator
    
    if total_samples <= 1:
        return

    # Total node impurity
    node_sq_sum = 0.0
    for c in range(n_classes):
        cnt = node_class_counts[c]
        node_sq_sum += (cnt / total_samples) * (cnt / total_samples)
    total_gini = 1.0 - node_sq_sum

    # Running cumulative counts for Left child
    left_counts = np.zeros(n_classes, dtype=np.float64)
    left_total = 0.0

    for b in range(actual_bins - 1):
        # Accumulate left child class counts
        for c in range(n_classes):
            bin_c = hist_f[b, c]
            left_counts[c] += bin_c
            left_total += bin_c

        right_total = total_samples - left_total
        if left_total < 1.0 or right_total < 1.0:
            continue

        left_sq_sum = 0.0
        right_sq_sum = 0.0
        for c in range(n_classes):
            p_l = left_counts[c] / left_total
            left_sq_sum += p_l * p_l
            
            r_c = node_class_counts[c] - left_counts[c]
            p_r = r_c / right_total
            right_sq_sum += p_r * p_r

        gini_left = 1.0 - left_sq_sum
        gini_right = 1.0 - right_sq_sum
        
        split_gini = (left_total / total_samples) * gini_left + (right_total / total_samples) * gini_right
        gain = total_gini - split_gini
        gains[b] = gain if gain > 0.0 else 0.0

@njit(fastmath=True, nogil=True)
def welford_update_scalar(mean: float, m2: float, count: int, x: float):
    """Updates mean and M2 using Welford's online algorithm."""
    new_count = count + 1
    delta = x - mean
    new_mean = mean + delta / new_count
    delta2 = x - new_mean
    new_m2 = m2 + delta * delta2
    return new_mean, new_m2, new_count

@njit(fastmath=True, nogil=True)
def serfling_bound(variance: float, n_sampled: int, N_total: int, delta: float) -> float:
    """Computes Serfling / Bardenet-Maillard finite-population empirical Bernstein bound.
    
    When sampling n_sampled from N_total without replacement:
    - If n_sampled >= N_total, all samples have been observed without replacement -> uncertainty is 0.0.
    - Otherwise, uncertainty shrinks with finite population correction factor.
    """
    if n_sampled <= 1:
        return 1.0
    if n_sampled >= N_total:
        return 0.0
    
    # Finite population correction factor
    fp_factor = max(0.0, 1.0 - (n_sampled - 1.0) / float(N_total))
    if fp_factor <= 1e-9:
        return 0.0

    log_term = math.log(3.0 / max(delta, 1e-12))
    v = max(variance, 1e-7)
    term1 = math.sqrt(2.0 * v * fp_factor * log_term / float(n_sampled))
    term2 = 3.0 * log_term * fp_factor / float(n_sampled)
    return term1 + term2

@njit(fastmath=True, nogil=True)
def hoeffding_bound(n_sampled: int, delta: float) -> float:
    """Standard i.i.d. Hoeffding confidence bound."""
    if n_sampled <= 0:
        return 1.0
    return math.sqrt(math.log(2.0 / max(delta, 1e-12)) / (2.0 * float(n_sampled)))

@njit(fastmath=True, nogil=True)
def exact_best_split_vectorized(
    X_binned: np.ndarray,       # (N, F) uint8
    y: np.ndarray,              # (N,) int32
    node_indices: np.ndarray,   # (N_node,) int32
    actual_bins_per_feat: np.ndarray, # (F,) int32
    candidate_features: np.ndarray,   # (F_cand,) int32
    n_classes: int
):
    """Exact greedy best split finder across candidate features and all thresholds."""
    N_node = len(node_indices)
    if N_node <= 1:
        return -1, -1, 0.0

    # Count total class distribution in current node
    node_class_counts = np.zeros(n_classes, dtype=np.int32)
    for i in range(N_node):
        node_class_counts[y[node_indices[i]]] += 1

    best_feat = -1
    best_bin = -1
    best_gain = -1.0

    gains_buf = np.empty(256, dtype=np.float32)
    hist_f = np.zeros((256, n_classes), dtype=np.int32)

    for idx_f in range(len(candidate_features)):
        f = candidate_features[idx_f]
        hist_f[:, :] = 0
        
        # Build histogram for feature f
        for i in range(N_node):
            row = node_indices[i]
            b = X_binned[row, f]
            hist_f[b, y[row]] += 1

        bins_count = actual_bins_per_feat[f]
        evaluate_gini_reduction_bins(hist_f, bins_count, node_class_counts, N_node, gains_buf)

        for b in range(bins_count - 1):
            g = gains_buf[b]
            if g > best_gain:
                best_gain = g
                best_feat = f
                best_bin = b

    return best_feat, best_bin, max(best_gain, 0.0)
