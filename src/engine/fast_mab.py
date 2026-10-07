import numpy as np
from typing import Tuple, Optional
from .numba_kernels import (
    accumulate_histograms_uint8,
    evaluate_gini_reduction_bins,
    welford_update_scalar,
    serfling_bound,
    hoeffding_bound
)
from ..pruning.dynamic_allocator import DynamicMinibatchAllocator

class FastMABEngine:
    """High-performance Multi-Armed Bandit node split engine with zero-allocation buffers.
    
    Identifies the best-arm (optimal feature and threshold split) with PAC guarantees
    using Serfling finite-population bounds and online Welford statistics.
    """

    def __init__(
        self,
        n_features: int,
        n_classes: int,
        max_bins: int = 256,
        delta: float = 0.05,
        use_serfling: bool = True
    ):
        self.n_features = n_features
        self.n_classes = n_classes
        self.max_bins = max_bins
        self.delta = delta
        self.use_serfling = use_serfling

        # Pre-allocated reusable buffers per solver instance
        self.hist_buf = np.zeros((n_features, max_bins, n_classes), dtype=np.int32)
        self.gains_buf = np.zeros((n_features, max_bins), dtype=np.float32)
        self.mean_buf = np.zeros((n_features, max_bins), dtype=np.float64)
        self.m2_buf = np.zeros((n_features, max_bins), dtype=np.float64)
        self.count_buf = np.zeros((n_features, max_bins), dtype=np.int32)
        self.active_arms = np.zeros((n_features, max_bins), dtype=bool)
        self.ucb_buf = np.zeros((n_features, max_bins), dtype=np.float64)
        self.lcb_buf = np.zeros((n_features, max_bins), dtype=np.float64)
        self.active_features_mask = np.zeros(n_features, dtype=bool)

    def reset_buffers(self, candidate_features: np.ndarray, actual_bins_per_feat: np.ndarray):
        """Resets statistics buffers and initializes candidate arms."""
        self.mean_buf.fill(0.0)
        self.m2_buf.fill(0.0)
        self.count_buf.fill(0)
        self.active_arms.fill(False)
        self.active_features_mask.fill(False)

        total_arms = 0
        for f in candidate_features:
            self.active_features_mask[f] = True
            n_b = actual_bins_per_feat[f] - 1  # B-1 possible splits
            if n_b > 0:
                self.active_arms[f, :n_b] = True
                total_arms += n_b

        return total_arms

    def find_best_split(
        self,
        X_binned: np.ndarray,
        y: np.ndarray,
        node_indices: np.ndarray,
        candidate_features: np.ndarray,
        actual_bins_per_feat: np.ndarray,
        m0: int = 100,
        m_min: int = 15,
        alpha: float = 1.0,
        use_adaptive_batch: bool = True,
        delta: Optional[float] = None
    ) -> Tuple[int, int, float, int]:
        """Runs the active arm elimination MAB algorithm on the current node."""
        N_node = len(node_indices)
        if N_node <= 1 or len(candidate_features) == 0:
            return -1, -1, 0.0, 0

        curr_delta = delta if delta is not None else self.delta
        total_arms = self.reset_buffers(candidate_features, actual_bins_per_feat)
        if total_arms == 0:
            return -1, -1, 0.0, 0

        allocator = DynamicMinibatchAllocator(
            node_indices=node_indices,
            total_arms_K=total_arms,
            m0=m0,
            m_min=m_min,
            alpha=alpha
        )

        # Precompute overall class distribution for current batch
        node_class_counts = np.zeros(self.n_classes, dtype=np.int32)
        for i in range(N_node):
            node_class_counts[y[node_indices[i]]] += 1

        active_count = total_arms
        samples_evaluated = 0

        while active_count > 1:
            batch, is_exhausted = allocator.next_batch(active_count, use_adaptive=use_adaptive_batch)
            if len(batch) == 0:
                break
            samples_evaluated += len(batch)

            # 1. Accumulate batch histogram across active features
            accumulate_histograms_uint8(
                X_binned,
                y,
                batch,
                self.active_features_mask,
                self.hist_buf
            )

            # 2. Evaluate Gini gains on the batch and update online Welford statistics
            batch_class_counts = np.zeros(self.n_classes, dtype=np.int32)
            for idx in batch:
                batch_class_counts[y[idx]] += 1

            best_lcb = -1e9

            for f in candidate_features:
                if not self.active_features_mask[f]:
                    continue
                n_b = actual_bins_per_feat[f] - 1
                evaluate_gini_reduction_bins(
                    self.hist_buf[f],
                    actual_bins_per_feat[f],
                    batch_class_counts,
                    len(batch),
                    self.gains_buf[f]
                )

                for b in range(n_b):
                    if not self.active_arms[f, b]:
                        continue
                    obs_gain = self.gains_buf[f, b]
                    if obs_gain < 0:
                        obs_gain = 0.0

                    m, m2, cnt = welford_update_scalar(
                        self.mean_buf[f, b],
                        self.m2_buf[f, b],
                        self.count_buf[f, b],
                        obs_gain
                    )
                    self.mean_buf[f, b] = m
                    self.m2_buf[f, b] = m2
                    self.count_buf[f, b] = cnt

                    var = (m2 / (cnt - 1)) if cnt > 1 else 0.25

                    if self.use_serfling:
                        bound = serfling_bound(var, allocator.total_sampled_so_far, N_node, curr_delta)
                    else:
                        bound = hoeffding_bound(allocator.total_sampled_so_far, curr_delta)

                    lcb = m - bound
                    ucb = m + bound
                    self.lcb_buf[f, b] = lcb
                    self.ucb_buf[f, b] = ucb

                    if lcb > best_lcb:
                        best_lcb = lcb

            # 3. Arm Elimination: Prune arms whose UCB falls below best_LCB
            new_active_count = 0
            for f in candidate_features:
                if not self.active_features_mask[f]:
                    continue
                n_b = actual_bins_per_feat[f] - 1
                feat_has_active_arms = False

                for b in range(n_b):
                    if self.active_arms[f, b]:
                        if self.ucb_buf[f, b] < best_lcb:
                            self.active_arms[f, b] = False
                        else:
                            new_active_count += 1
                            feat_has_active_arms = True

                self.active_features_mask[f] = feat_has_active_arms

            active_count = new_active_count
            if is_exhausted:
                # All node samples evaluated -> bound is exact!
                break

        # Pick the arm with the highest empirical mean gain among all evaluated
        best_f = -1
        best_b = -1
        max_mean_gain = -1.0

        for f in candidate_features:
            n_b = actual_bins_per_feat[f] - 1
            for b in range(n_b):
                # Prefer active arms, fallback to best overall mean
                gain = self.mean_buf[f, b]
                if gain > max_mean_gain:
                    max_mean_gain = gain
                    best_f = f
                    best_b = b

        return best_f, best_b, max(max_mean_gain, 0.0), samples_evaluated
