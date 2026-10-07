import numpy as np
from typing import Tuple

class DynamicMinibatchAllocator:
    """Adaptive Dynamic Minibatch Allocator (ADMA-MABSplit).
    
    Dynamically adjusts the sample batch size M_t according to the shrinkage of the
    active arm candidate set, while sampling without replacement from the node.
    """

    def __init__(
        self,
        node_indices: np.ndarray,
        total_arms_K: int,
        m0: int = 100,
        m_min: int = 15,
        alpha: float = 1.0,
        random_state: int = 42
    ):
        self.node_indices = np.array(node_indices, dtype=np.int32)
        self.N_node = len(self.node_indices)
        self.total_arms_K = max(1, total_arms_K)
        self.m0 = m0
        self.m_min = m_min
        self.alpha = alpha
        
        # Shuffle indices once for efficient sequential O(1) sampling without replacement
        rng = np.random.RandomState(random_state)
        self.shuffled_indices = self.node_indices.copy()
        rng.shuffle(self.shuffled_indices)
        
        self.cursor = 0
        self.cumulative_sampled = 0

    def compute_batch_size(self, active_arms_count: int, use_adaptive: bool = True) -> int:
        """Computes current round batch size M_t."""
        if not use_adaptive:
            return min(self.m0, self.remaining_samples())

        ratio = max(1, active_arms_count) / float(self.total_arms_K)
        # Dynamic formula: max(M_min, floor(M0 * (ratio)^alpha))
        batch_size = int(max(self.m_min, np.floor(self.m0 * (ratio ** self.alpha))))
        return min(batch_size, self.remaining_samples())

    def remaining_samples(self) -> int:
        """Returns count of unvisited samples in this node."""
        return max(0, self.N_node - self.cursor)

    def next_batch(self, active_arms_count: int, use_adaptive: bool = True) -> Tuple[np.ndarray, bool]:
        """Fetches next non-replacement minibatch. Returns (minibatch_indices, is_exhausted)."""
        batch_size = self.compute_batch_size(active_arms_count, use_adaptive=use_adaptive)
        if batch_size <= 0 or self.cursor >= self.N_node:
            return np.empty(0, dtype=np.int32), True

        start = self.cursor
        end = min(self.N_node, self.cursor + batch_size)
        batch = self.shuffled_indices[start:end]
        
        self.cursor = end
        self.cumulative_sampled += len(batch)
        is_exhausted = (self.cursor >= self.N_node)
        
        return batch, is_exhausted

    @property
    def total_sampled_so_far(self) -> int:
        return self.cumulative_sampled
