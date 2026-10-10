import numpy as np
from typing import Tuple, List

class HierarchicalArmPruner:
    """Hierarchical Coarse-to-Fine Arm Pruner (H-MABSplit).
    
    Applies two-stage feature screening with a formal Bonferroni delta-budget split:
    delta_coarse = delta / 3, delta_fine = 2 * delta / 3.
    Features are filtered at coarse resolution (B=16) before expanding to fine resolution (B=256).
    """

    def __init__(
        self,
        b_coarse: int = 16,
        b_fine: int = 256,
        delta: float = 0.05
    ):
        assert 0.0 < delta < 1.0, f"Confidence delta must be in (0, 1), got {delta}"
        assert b_coarse < b_fine, f"Coarse bin resolution ({b_coarse}) must be less than fine resolution ({b_fine})"
        
        self.b_coarse = b_coarse
        self.b_fine = b_fine
        self.delta = delta
        
        # Formal delta budget allocation: delta_coarse + delta_fine <= delta
        self.delta_coarse = delta / 3.0
        self.delta_fine = (2.0 * delta) / 3.0

    def screen_features(
        self,
        mab_engine,
        X_binned_coarse: np.ndarray,
        y: np.ndarray,
        node_indices: np.ndarray,
        candidate_features: np.ndarray,
        actual_coarse_bins: np.ndarray,
        m0: int = 50,
        m_min: int = 10
    ) -> Tuple[np.ndarray, int]:
        """Runs rapid coarse-resolution MAB round and filters out unpromising features.
        
        Returns (surviving_features, samples_evaluated).
        """
        if len(candidate_features) <= 2:
            return candidate_features, 0

        # Run MAB on coarse bins with delta_coarse
        best_f, best_b, best_gain, samples = mab_engine.find_best_split(
            X_binned=X_binned_coarse,
            y=y,
            node_indices=node_indices,
            candidate_features=candidate_features,
            actual_bins_per_feat=actual_coarse_bins,
            m0=m0,
            m_min=m_min,
            delta=self.delta_coarse
        )

        # Retain features that have positive mean gain or are in active mask
        surviving = []
        for f in candidate_features:
            if mab_engine.active_features_mask[f] or f == best_f:
                surviving.append(f)

        if len(surviving) == 0:
            surviving = [best_f if best_f >= 0 else candidate_features[0]]

        return np.array(surviving, dtype=np.int32), samples
