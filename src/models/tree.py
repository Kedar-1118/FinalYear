import math
import numpy as np
from sklearn.base import BaseEstimator, ClassifierMixin
from sklearn.utils.validation import check_is_fitted
from typing import Optional, Union, Dict, Any

from ..data.prebinning import FastBinner
from ..engine.hybrid_solver import HybridSolver

class TreeNode:
    """Represents a node in the MAB Decision Tree."""
    def __init__(self, is_leaf: bool = False, depth: int = 0):
        self.is_leaf = is_leaf
        self.depth = depth
        self.feature = -1
        self.threshold = 0.0  # Continuous threshold for fast raw inference
        self.bin_idx = -1
        self.left = None
        self.right = None
        self.class_counts = None
        self.value = None      # Probability distribution
        self.solver_mode = ""  # 'exact' or 'mab'

class MABDecisionTreeClassifier(BaseEstimator, ClassifierMixin):
    """Scikit-Learn compatible Decision Tree Classifier accelerated via Multi-Armed Bandit node splitting.
    
    Includes Depth-Adaptive Hybrid Dispatch, Serfling Finite-Population Bounds,
    Hierarchical Coarse-to-Fine Pruning, and Adaptive Dynamic Minibatch Sizing.
    """

    def __init__(
        self,
        max_depth: Optional[int] = 10,
        min_samples_split: int = 10,
        min_samples_leaf: int = 5,
        n_bins: int = 256,
        b_coarse: int = 16,
        delta: float = 0.05,
        n_thresh: int = 500,
        m0: int = 100,
        m_min: int = 15,
        alpha: float = 1.0,
        max_features: Optional[Union[int, float, str]] = None,
        use_hybrid: bool = True,
        use_coarse_to_fine: bool = False,
        use_adaptive_batch: bool = True,
        use_serfling: bool = True,
        random_state: int = 42
    ):
        self.max_depth = max_depth
        self.min_samples_split = min_samples_split
        self.min_samples_leaf = min_samples_leaf
        self.n_bins = n_bins
        self.b_coarse = b_coarse
        self.delta = delta
        self.n_thresh = n_thresh
        self.m0 = m0
        self.m_min = m_min
        self.alpha = alpha
        self.max_features = max_features
        self.use_hybrid = use_hybrid
        self.use_coarse_to_fine = use_coarse_to_fine
        self.use_adaptive_batch = use_adaptive_batch
        self.use_serfling = use_serfling
        self.random_state = random_state

    def fit(self, X, y, X_binned_fine=None, fine_binner=None, X_binned_coarse=None, coarse_binner=None):
        """Builds decision tree using MAB-accelerated node splitting."""
        X = np.asarray(X, dtype=np.float32)
        y = np.asarray(y, dtype=np.int32)
        
        self.classes_, y_encoded = np.unique(y, return_inverse=True)
        self.n_classes_ = len(self.classes_)
        n_samples, self.n_features_in_ = X.shape

        self.rng_ = np.random.RandomState(self.random_state)

        # 1. Fit or use provided Fine Binner (B=256)
        if X_binned_fine is not None and fine_binner is not None:
            self.fine_binner_ = fine_binner
        else:
            self.fine_binner_ = FastBinner(n_bins=self.n_bins, random_state=self.random_state)
            X_binned_fine = self.fine_binner_.fit_transform(X)

        # 2. Optionally Fit Coarse Binner (B=16) if coarse-to-fine enabled
        if self.use_coarse_to_fine:
            if X_binned_coarse is not None and coarse_binner is not None:
                self.coarse_binner_ = coarse_binner
            else:
                self.coarse_binner_ = FastBinner(n_bins=self.b_coarse, random_state=self.random_state)
                X_binned_coarse = self.coarse_binner_.fit_transform(X)
            actual_coarse_bins = self.coarse_binner_.actual_bins_per_feat_
        else:
            self.coarse_binner_ = None
            X_binned_coarse = None
            actual_coarse_bins = None

        # 3. Initialize Hybrid Solver
        self.solver_ = HybridSolver(
            n_features=self.n_features_in_,
            n_classes=self.n_classes_,
            n_thresh=self.n_thresh,
            delta=self.delta,
            use_hybrid=self.use_hybrid,
            use_coarse_to_fine=self.use_coarse_to_fine,
            use_serfling=self.use_serfling,
            use_adaptive_batch=self.use_adaptive_batch,
            m0=self.m0,
            m_min=self.m_min,
            alpha=self.alpha
        )

        self.total_samples_evaluated_ = 0
        self.splits_by_mode_ = {"exact": 0, "mab": 0}
        self.n_nodes_ = 0

        # 4. Recursively build tree
        all_indices = np.arange(n_samples, dtype=np.int32)
        self.root_ = self._build_node(
            X_binned_fine=X_binned_fine,
            X_binned_coarse=X_binned_coarse,
            y=y_encoded,
            node_indices=all_indices,
            depth=0,
            actual_coarse_bins=actual_coarse_bins
        )

        return self

    def _determine_candidate_features(self) -> np.ndarray:
        """Determines feature subset per node based on max_features hyperparameter."""
        if self.max_features is None:
            return np.arange(self.n_features_in_, dtype=np.int32)
        elif self.max_features == 'sqrt':
            k = max(1, int(math.sqrt(self.n_features_in_)))
        elif self.max_features == 'log2':
            k = max(1, int(math.log2(self.n_features_in_)))
        elif isinstance(self.max_features, float):
            k = max(1, int(self.max_features * self.n_features_in_))
        elif isinstance(self.max_features, int):
            k = min(self.n_features_in_, max(1, self.max_features))
        else:
            k = self.n_features_in_

        return self.rng_.choice(self.n_features_in_, k, replace=False).astype(np.int32)

    def _build_node(
        self,
        X_binned_fine: np.ndarray,
        X_binned_coarse: Optional[np.ndarray],
        y: np.ndarray,
        node_indices: np.ndarray,
        depth: int,
        actual_coarse_bins: Optional[np.ndarray]
    ) -> TreeNode:
        self.n_nodes_ += 1
        node = TreeNode(depth=depth)
        N_node = len(node_indices)

        # Compute class distribution in current node
        class_counts = np.bincount(y[node_indices], minlength=self.n_classes_)
        node.class_counts = class_counts
        node.value = class_counts.astype(np.float64) / max(1, N_node)

        # Stopping criteria: pure node, max depth, or min samples split
        if (np.max(class_counts) == N_node or 
            (self.max_depth is not None and depth >= self.max_depth) or 
            N_node < self.min_samples_split):
            node.is_leaf = True
            return node

        candidate_feats = self._determine_candidate_features()

        best_feat, best_bin, best_gain, samples_eval, mode = self.solver_.solve(
            X_binned=X_binned_fine,
            y=y,
            node_indices=node_indices,
            candidate_features=candidate_feats,
            actual_bins_per_feat=self.fine_binner_.actual_bins_per_feat_,
            X_binned_coarse=X_binned_coarse,
            actual_coarse_bins=actual_coarse_bins
        )

        self.total_samples_evaluated_ += samples_eval
        if mode in self.splits_by_mode_:
            self.splits_by_mode_[mode] += 1

        if best_feat < 0 or best_bin < 0 or best_gain <= 1e-7:
            node.is_leaf = True
            return node

        # Partition node samples into left and right
        col_bins = X_binned_fine[node_indices, best_feat]
        left_mask = col_bins <= best_bin
        left_indices = node_indices[left_mask]
        right_indices = node_indices[~left_mask]

        if len(left_indices) < self.min_samples_leaf or len(right_indices) < self.min_samples_leaf:
            node.is_leaf = True
            return node

        node.feature = best_feat
        node.bin_idx = best_bin
        node.threshold = self.fine_binner_.get_split_value(best_feat, best_bin)
        node.solver_mode = mode

        node.left = self._build_node(
            X_binned_fine, X_binned_coarse, y, left_indices, depth + 1, actual_coarse_bins
        )
        node.right = self._build_node(
            X_binned_fine, X_binned_coarse, y, right_indices, depth + 1, actual_coarse_bins
        )

        return node

    def predict_proba(self, X) -> np.ndarray:
        """Predicts class probabilities using direct continuous threshold traversal."""
        check_is_fitted(self, ['root_', 'classes_'])
        X = np.asarray(X, dtype=np.float32)
        n_samples = len(X)
        proba = np.empty((n_samples, self.n_classes_), dtype=np.float64)

        for i in range(n_samples):
            curr = self.root_
            row = X[i]
            while not curr.is_leaf:
                if row[curr.feature] <= curr.threshold:
                    curr = curr.left
                else:
                    curr = curr.right
            proba[i] = curr.value

        return proba

    def predict(self, X) -> np.ndarray:
        """Predicts class labels for samples in X."""
        proba = self.predict_proba(X)
        best_indices = np.argmax(proba, axis=1)
        return self.classes_[best_indices]

    @property
    def feature_importances_(self) -> np.ndarray:
        """Computes normalized feature importances based on split feature occurrences."""
        check_is_fitted(self, ['root_', 'n_features_'])
        importances = np.zeros(self.n_features_, dtype=np.float64)

        def _traverse(node):
            if node is None or node.is_leaf:
                return
            if node.feature >= 0 and node.feature < self.n_features_:
                importances[node.feature] += 1.0
            _traverse(node.left)
            _traverse(node.right)

        _traverse(self.root_)
        total = np.sum(importances)
        if total > 0:
            importances /= total
        return importances

