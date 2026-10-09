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
    """Updates mean and M2 using Welford's online algorithm with numerical non-negativity guard."""
    new_count = count + 1
    delta = x - mean
    new_mean = mean + delta / new_count
    delta2 = x - new_mean
    new_m2 = m2 + delta * delta2
    if new_m2 < 0.0:
        new_m2 = 0.0
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

@njit(fastmath=True, nogil=True)
def mab_find_best_split_numba(
    X_binned: np.ndarray,             # (N, F) uint8
    y: np.ndarray,                    # (N,) int32
    shuffled_indices: np.ndarray,     # (N_node,) int32
    candidate_features: np.ndarray,   # (F_cand,) int32
    actual_bins_per_feat: np.ndarray, # (F,) int32
    n_classes: int,
    m0: int,
    m_min: int,
    alpha: float,
    delta: float,
    use_serfling: bool,
    use_adaptive_batch: bool,
    # Buffers:
    hist_buf: np.ndarray,             # (F, 256, n_classes) int32
    mean_buf: np.ndarray,             # (F, 256) float64
    m2_buf: np.ndarray,               # (F, 256) float64
    count_buf: np.ndarray,            # (F, 256) int32
    active_arms: np.ndarray,          # (F, 256) bool
    active_features_mask: np.ndarray, # (F,) bool
    lcb_buf: np.ndarray,              # (F, 256) float64
    ucb_buf: np.ndarray,              # (F, 256) float64
    gains_buf: np.ndarray,            # (F, 256) float32
    batch_class_counts: np.ndarray    # (n_classes,) int32
):
    N_node = len(shuffled_indices)
    if N_node <= 1 or len(candidate_features) == 0:
        return -1, -1, 0.0, 0

    # Reset buffers
    mean_buf.fill(0.0)
    m2_buf.fill(0.0)
    count_buf.fill(0)
    active_arms.fill(False)
    active_features_mask.fill(False)

    total_arms = 0
    for idx_f in range(len(candidate_features)):
        f = candidate_features[idx_f]
        active_features_mask[f] = True
        n_b = actual_bins_per_feat[f] - 1
        if n_b > 0:
            active_arms[f, :n_b] = True
            total_arms += n_b

    if total_arms == 0:
        return -1, -1, 0.0, 0

    cursor = 0
    cumulative_sampled = 0
    active_count = total_arms

    while active_count > 1 and cursor < N_node:
        # 1. Compute dynamic batch size
        remaining = N_node - cursor
        if not use_adaptive_batch:
            batch_size = m0 if m0 < remaining else remaining
        else:
            ratio = float(max(1, active_count)) / float(total_arms)
            calc_m = int(max(float(m_min), math.floor(float(m0) * (ratio ** alpha))))
            batch_size = calc_m if calc_m < remaining else remaining

        if batch_size <= 0:
            break

        start_idx = cursor
        end_idx = cursor + batch_size
        cursor = end_idx
        cumulative_sampled += batch_size

        # 2. Accumulate histogram on batch
        batch_class_counts.fill(0)
        for idx_f in range(len(candidate_features)):
            f = candidate_features[idx_f]
            if active_features_mask[f]:
                hist_buf[f, :, :].fill(0)

        for i in range(start_idx, end_idx):
            row = shuffled_indices[i]
            lbl = y[row]
            batch_class_counts[lbl] += 1
            for idx_f in range(len(candidate_features)):
                f = candidate_features[idx_f]
                if active_features_mask[f]:
                    b = X_binned[row, f]
                    hist_buf[f, b, lbl] += 1

        # 3. Evaluate Gini gains and update online Welford bounds
        best_lcb = -1e9

        for idx_f in range(len(candidate_features)):
            f = candidate_features[idx_f]
            if not active_features_mask[f]:
                continue
            n_b = actual_bins_per_feat[f] - 1
            evaluate_gini_reduction_bins(
                hist_buf[f],
                actual_bins_per_feat[f],
                batch_class_counts,
                batch_size,
                gains_buf[f]
            )

            for b in range(n_b):
                if not active_arms[f, b]:
                    continue
                obs_gain = gains_buf[f, b]
                if obs_gain < 0.0:
                    obs_gain = 0.0

                m, m2, cnt = welford_update_scalar(
                    mean_buf[f, b],
                    m2_buf[f, b],
                    count_buf[f, b],
                    obs_gain
                )
                mean_buf[f, b] = m
                m2_buf[f, b] = m2
                count_buf[f, b] = cnt

                var = (m2 / float(cnt - 1)) if cnt > 1 else 0.25

                if use_serfling:
                    bound = serfling_bound(var, cumulative_sampled, N_node, delta)
                else:
                    bound = hoeffding_bound(cumulative_sampled, delta)

                lcb = m - bound
                ucb = m + bound
                lcb_buf[f, b] = lcb
                ucb_buf[f, b] = ucb

                if lcb > best_lcb:
                    best_lcb = lcb

        # 4. Arm elimination
        new_active = 0
        for idx_f in range(len(candidate_features)):
            f = candidate_features[idx_f]
            if not active_features_mask[f]:
                continue
            n_b = actual_bins_per_feat[f] - 1
            feat_active = False
            for b in range(n_b):
                if active_arms[f, b]:
                    if ucb_buf[f, b] < best_lcb:
                        active_arms[f, b] = False
                    else:
                        new_active += 1
                        feat_active = True
            active_features_mask[f] = feat_active

        active_count = new_active
        if cursor >= N_node:
            break

    # Pick best arm
    best_f = -1
    best_b = -1
    max_mean = -1.0
    for idx_f in range(len(candidate_features)):
        f = candidate_features[idx_f]
        n_b = actual_bins_per_feat[f] - 1
        for b in range(n_b):
            g = mean_buf[f, b]
            if g > max_mean:
                max_mean = g
                best_f = f
                best_b = b

    return best_f, best_b, max(max_mean, 0.0), cumulative_sampled
