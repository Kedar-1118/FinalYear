import numpy as np
from sklearn.base import BaseEstimator, ClassifierMixin
from sklearn.utils.validation import check_is_fitted
from joblib import Parallel, delayed
from typing import Optional, Union, List

from .tree import MABDecisionTreeClassifier
from ..data.prebinning import FastBinner

def _fit_single_tree(
    tree_estimator: MABDecisionTreeClassifier,
    X,
    y,
    sample_indices,
    seed,
    X_binned_fine,
    fine_binner,
    X_binned_coarse,
    coarse_binner
):
    """Worker function to train a single tree on a bootstrap sample using precomputed binned memory."""
    tree_estimator.random_state = seed
    tree_estimator.fit(
        X=X[sample_indices],
        y=y[sample_indices],
        X_binned_fine=X_binned_fine[sample_indices],
        fine_binner=fine_binner,
        X_binned_coarse=X_binned_coarse[sample_indices] if X_binned_coarse is not None else None,
        coarse_binner=coarse_binner
    )
    return tree_estimator

class MABRandomForestClassifier(BaseEstimator, ClassifierMixin):
    """Scikit-Learn compatible Random Forest Classifier accelerated via Multi-Armed Bandit node splitting.
    
    Supports parallel bagging across multi-core CPU threads, bootstrap resampling,
    and modular MAB acceleration hyperparameters.
    """

    def __init__(
        self,
        n_estimators: int = 20,
        max_depth: Optional[int] = 12,
        min_samples_split: int = 10,
        min_samples_leaf: int = 5,
        max_features: Union[str, int, float] = 'sqrt',
        n_bins: int = 256,
        b_coarse: int = 16,
        delta: float = 0.05,
        n_thresh: int = 500,
        m0: int = 100,
        m_min: int = 15,
        alpha: float = 1.0,
        use_hybrid: bool = True,
        use_coarse_to_fine: bool = False,
        use_adaptive_batch: bool = True,
        use_serfling: bool = True,
        bootstrap: bool = True,
        n_jobs: int = -1,
        random_state: int = 42
    ):
        self.n_estimators = n_estimators
        self.max_depth = max_depth
        self.min_samples_split = min_samples_split
        self.min_samples_leaf = min_samples_leaf
        self.max_features = max_features
        self.n_bins = n_bins
        self.b_coarse = b_coarse
        self.delta = delta
        self.n_thresh = n_thresh
        self.m0 = m0
        self.m_min = m_min
        self.alpha = alpha
        self.use_hybrid = use_hybrid
        self.use_coarse_to_fine = use_coarse_to_fine
        self.use_adaptive_batch = use_adaptive_batch
        self.use_serfling = use_serfling
        self.bootstrap = bootstrap
        self.n_jobs = n_jobs
        self.random_state = random_state

    def fit(self, X, y):
        """Fits ensemble of MAB Decision Trees in parallel."""
        X = np.asarray(X, dtype=np.float32)
        y = np.asarray(y, dtype=np.int32)
        
        self.classes_, _ = np.unique(y, return_inverse=True)
        self.n_classes_ = len(self.classes_)
        n_samples, self.n_features_in_ = X.shape

        # 1. Pre-quantize features ONCE across the entire forest
        self.fine_binner_ = FastBinner(n_bins=self.n_bins, random_state=self.random_state)
        X_binned_fine = self.fine_binner_.fit_transform(X)

        if self.use_coarse_to_fine:
            self.coarse_binner_ = FastBinner(n_bins=self.b_coarse, random_state=self.random_state)
            X_binned_coarse = self.coarse_binner_.fit_transform(X)
        else:
            self.coarse_binner_ = None
            X_binned_coarse = None

        rng = np.random.RandomState(self.random_state)
        seeds = rng.randint(0, 1000000, size=self.n_estimators)

        bootstrap_indices = []
        for _ in range(self.n_estimators):
            if self.bootstrap:
                idx = rng.choice(n_samples, n_samples, replace=True)
            else:
                idx = np.arange(n_samples, dtype=np.int32)
            bootstrap_indices.append(idx)

        # Build tree templates
        tree_templates = [
            MABDecisionTreeClassifier(
                max_depth=self.max_depth,
                min_samples_split=self.min_samples_split,
                min_samples_leaf=self.min_samples_leaf,
                max_features=self.max_features,
                n_bins=self.n_bins,
                b_coarse=self.b_coarse,
                delta=self.delta,
                n_thresh=self.n_thresh,
                m0=self.m0,
                m_min=self.m_min,
                alpha=self.alpha,
                use_hybrid=self.use_hybrid,
                use_coarse_to_fine=self.use_coarse_to_fine,
                use_adaptive_batch=self.use_adaptive_batch,
                use_serfling=self.use_serfling,
                random_state=seeds[i]
            )
            for i in range(self.n_estimators)
        ]

        # Parallel tree fitting across available CPU cores
        self.estimators_ = Parallel(n_jobs=self.n_jobs, prefer="threads")(
            delayed(_fit_single_tree)(
                tree_templates[i],
                X,
                y,
                bootstrap_indices[i],
                seeds[i],
                X_binned_fine,
                self.fine_binner_,
                X_binned_coarse,
                self.coarse_binner_
            )
            for i in range(self.n_estimators)
        )

        self.total_samples_evaluated_ = sum(
            t.total_samples_evaluated_ for t in self.estimators_
        )

        return self

    def predict_proba(self, X) -> np.ndarray:
        """Averages predicted class probabilities across all trees in the forest."""
        check_is_fitted(self, ['estimators_', 'classes_'])
        X = np.asarray(X, dtype=np.float32)
        
        all_probas = [tree.predict_proba(X) for tree in self.estimators_]
        avg_proba = np.mean(all_probas, axis=0)
        return avg_proba

    def predict(self, X) -> np.ndarray:
        """Predicts class labels for samples in X."""
        proba = self.predict_proba(X)
        best_indices = np.argmax(proba, axis=1)
        return self.classes_[best_indices]
