import numpy as np

class FastBinner:
    """Quantizes continuous features into uint8 bin indices (0 to n_bins-1).
    
    Adopts the columnar Fortran-contiguous memory representation used by high-performance
    tree libraries (e.g. LightGBM, HistGradientBoosting) to maximize CPU cache locality
    and reduce memory footprint from 8 bytes (float64) to 1 byte (uint8).
    """

    def __init__(self, n_bins: int = 256, subsample: int = 200000, random_state: int = 42):
        assert 2 <= n_bins <= 256, "n_bins must be between 2 and 256 for uint8 representation"
        self.n_bins = n_bins
        self.subsample = subsample
        self.random_state = random_state
        self.bin_thresholds_ = []  # List of threshold arrays per feature
        self.actual_bins_per_feat_ = None

    def fit(self, X: np.ndarray):
        """Computes bin thresholds from X using quantiles."""
        X = np.asarray(X, dtype=np.float32)
        n_samples, n_features = X.shape
        rng = np.random.RandomState(self.random_state)

        if n_samples > self.subsample:
            idx = rng.choice(n_samples, self.subsample, replace=False)
            X_sample = X[idx]
        else:
            X_sample = X

        self.bin_thresholds_ = []
        actual_bins = []

        for f in range(n_features):
            col = X_sample[:, f]
            unq = np.unique(col)
            if len(unq) <= self.n_bins:
                # If unique values are fewer than n_bins, use midpoints
                if len(unq) > 1:
                    thresholds = (unq[:-1] + unq[1:]) / 2.0
                else:
                    thresholds = unq.copy()
            else:
                percentiles = np.linspace(0, 100, self.n_bins + 1)[1:-1]
                thresholds = np.unique(np.percentile(col, percentiles))

            self.bin_thresholds_.append(thresholds.astype(np.float32))
            actual_bins.append(len(thresholds) + 1)

        self.actual_bins_per_feat_ = np.array(actual_bins, dtype=np.int32)
        return self

    def transform(self, X: np.ndarray) -> np.ndarray:
        """Transforms continuous features into uint8 bin indices in Fortran order."""
        X = np.asarray(X, dtype=np.float32)
        n_samples, n_features = X.shape
        # Allocate Fortran-contiguous array (column-major) for optimal cache streaming
        binned = np.empty((n_samples, n_features), dtype=np.uint8, order='F')

        for f in range(n_features):
            thresh = self.bin_thresholds_[f]
            if len(thresh) == 0:
                binned[:, f] = 0
            else:
                # np.digitize returns 0..len(thresh), which fits in uint8
                binned[:, f] = np.digitize(X[:, f], thresh).astype(np.uint8)

        return binned

    def fit_transform(self, X: np.ndarray) -> np.ndarray:
        """Fits thresholds and returns binned array."""
        return self.fit(X).transform(X)

    def get_split_value(self, feature_idx: int, bin_idx: int) -> float:
        """Retrieves continuous threshold value corresponding to a feature and bin index."""
        thresh = self.bin_thresholds_[feature_idx]
        if len(thresh) == 0:
            return 0.0
        # If bin_idx is within thresholds, use that threshold; else clamp to last
        clamped_idx = min(max(0, bin_idx), len(thresh) - 1)
        return float(thresh[clamped_idx])
