import numpy as np
from typing import Tuple, Optional
from .numba_kernels import exact_best_split_vectorized
from .fast_mab import FastMABEngine
from ..pruning.arm_pruner import HierarchicalArmPruner

class HybridSolver:
    """Hybrid Depth & Sample Adaptive Solver.
    
    Dynamically routes node splitting:
    - If N_node < n_thresh: Exact vectorized greedy split (zero MAB bookkeeping overhead on leaves).
    - If N_node >= n_thresh: Dispatches to Fast-MAB pipeline with optional coarse-to-fine pruning.
    """

    def __init__(
        self,
        n_features: int,
        n_classes: int,
        n_thresh: int = 500,
        delta: float = 0.05,
        use_hybrid: bool = True,
        use_coarse_to_fine: bool = False,
        use_serfling: bool = True,
        use_adaptive_batch: bool = True,
        m0: int = 100,
        m_min: int = 15,
        alpha: float = 1.0
    ):
        self.n_features = n_features
        self.n_classes = n_classes
        self.n_thresh = n_thresh
        self.delta = delta
        self.use_hybrid = use_hybrid
        self.use_coarse_to_fine = use_coarse_to_fine
        self.use_serfling = use_serfling
        self.use_adaptive_batch = use_adaptive_batch
        self.m0 = m0
        self.m_min = m_min
        self.alpha = alpha

        self.mab_engine = FastMABEngine(
            n_features=n_features,
            n_classes=n_classes,
            max_bins=256,
            delta=delta,
            use_serfling=use_serfling
        )

        if self.use_coarse_to_fine:
            self.arm_pruner = HierarchicalArmPruner(
                b_coarse=16,
                b_fine=256,
                delta=delta
            )
        else:
            self.arm_pruner = None

    def solve(
        self,
        X_binned: np.ndarray,
        y: np.ndarray,
        node_indices: np.ndarray,
        candidate_features: np.ndarray,
        actual_bins_per_feat: np.ndarray,
        X_binned_coarse: Optional[np.ndarray] = None,
        actual_coarse_bins: Optional[np.ndarray] = None
    ) -> Tuple[int, int, float, int, str]:
        """Routes to either Exact solver or MAB solver.
        
        Returns: (best_feat, best_bin, best_gain, samples_evaluated, solver_mode)
        """
        N_node = len(node_indices)
        if N_node <= 1 or len(candidate_features) == 0:
            return -1, -1, 0.0, 0, "terminal"

        # Check Hybrid threshold switch
        if self.use_hybrid and (N_node < self.n_thresh):
            feat, b, gain = exact_best_split_vectorized(
                X_binned,
                y,
                node_indices,
                actual_bins_per_feat,
                candidate_features,
                self.n_classes
            )
            return feat, b, gain, N_node, "exact"

        total_samples = 0
        active_features = candidate_features

        # Optional Coarse-to-Fine stage
        if self.use_coarse_to_fine and X_binned_coarse is not None and actual_coarse_bins is not None:
            active_features, coarse_samples = self.arm_pruner.screen_features(
                mab_engine=self.mab_engine,
                X_binned_coarse=X_binned_coarse,
                y=y,
                node_indices=node_indices,
                candidate_features=candidate_features,
                actual_coarse_bins=actual_coarse_bins,
                m0=max(20, self.m0 // 2),
                m_min=self.m_min
            )
            total_samples += coarse_samples

        # Fine MAB stage
        delta_fine = self.arm_pruner.delta_fine if self.arm_pruner else self.delta
        best_feat, best_bin, best_gain, fine_samples = self.mab_engine.find_best_split(
            X_binned=X_binned,
            y=y,
            node_indices=node_indices,
            candidate_features=active_features,
            actual_bins_per_feat=actual_bins_per_feat,
            m0=self.m0,
            m_min=self.m_min,
            alpha=self.alpha,
            use_adaptive_batch=self.use_adaptive_batch,
            delta=delta_fine
        )
        total_samples += fine_samples

        return best_feat, best_bin, best_gain, total_samples, "mab"
