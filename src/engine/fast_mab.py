import numpy as np
from typing import Tuple, Optional
from .numba_kernels import mab_find_best_split_numba

class FastMABEngine:
    """High-performance Multi-Armed Bandit node split engine with compiled Numba loops.
    
    Identifies the best-arm (optimal feature and threshold split) with PAC guarantees
    using Serfling finite-population bounds, adaptive batch sizes, and online Welford statistics.
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
        self.batch_class_counts = np.zeros(n_classes, dtype=np.int32)

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
        """Runs the compiled active arm elimination MAB algorithm on the current node."""
        N_node = len(node_indices)
        if N_node <= 1 or len(candidate_features) == 0:
            return -1, -1, 0.0, 0

        curr_delta = delta if delta is not None else self.delta

        # Fast shuffle of node indices for sampling without replacement
        shuffled = node_indices.copy()
        np.random.shuffle(shuffled)

        best_f, best_b, best_gain, samples_evaluated = mab_find_best_split_numba(
            X_binned=X_binned,
            y=y,
            shuffled_indices=shuffled,
            candidate_features=np.asarray(candidate_features, dtype=np.int32),
            actual_bins_per_feat=actual_bins_per_feat,
            n_classes=self.n_classes,
            m0=m0,
            m_min=m_min,
            alpha=alpha,
            delta=curr_delta,
            use_serfling=self.use_serfling,
            use_adaptive_batch=use_adaptive_batch,
            hist_buf=self.hist_buf,
            mean_buf=self.mean_buf,
            m2_buf=self.m2_buf,
            count_buf=self.count_buf,
            active_arms=self.active_arms,
            active_features_mask=self.active_features_mask,
            lcb_buf=self.lcb_buf,
            ucb_buf=self.ucb_buf,
            gains_buf=self.gains_buf,
            batch_class_counts=self.batch_class_counts
        )

        return best_f, best_b, best_gain, samples_evaluated
