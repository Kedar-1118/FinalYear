import os
import zipfile
import gzip
import numpy as np
import pandas as pd
from sklearn.datasets import make_classification

DATA_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))

def load_adult(subsample: int = None, random_state: int = 42):
    """Loads and preprocesses the Adult Census Income dataset (~48,842 rows, 14 features).
    
    Extracts from archive.zip if adult.csv is not yet unpacked.
    Categorical columns are integer/one-hot encoded to numerical values.
    """
    csv_path = os.path.join(DATA_DIR, "adult.csv")
    zip_path = os.path.join(DATA_DIR, "archive.zip")

    if not os.path.exists(csv_path) and os.path.exists(zip_path):
        with zipfile.ZipFile(zip_path, 'r') as zf:
            zf.extract("adult.csv", DATA_DIR)

    if not os.path.exists(csv_path):
        raise FileNotFoundError(f"Could not locate adult.csv or archive.zip in {DATA_DIR}")

    df = pd.read_csv(csv_path)
    # Strip whitespace from string columns
    for col in df.select_dtypes(include='object').columns:
        df[col] = df[col].astype(str).str.strip()

    # Identify target column: 'income' or '<=50K'
    target_col = 'income' if 'income' in df.columns else df.columns[-1]
    y_raw = df[target_col]
    y = (y_raw.isin(['>50K', '>50K.'])).astype(np.int32).values

    X_df = df.drop(columns=[target_col])
    # Encode categorical columns
    for col in X_df.select_dtypes(include='object').columns:
        X_df[col] = X_df[col].astype('category').cat.codes

    X = X_df.values.astype(np.float32)

    if subsample and subsample < len(y):
        rng = np.random.RandomState(random_state)
        idx = rng.choice(len(y), subsample, replace=False)
        X, y = X[idx], y[idx]

    return X, y

def load_covertype(subsample: int = None, random_state: int = 42):
    """Loads the Covertype (Forest Cover Type) dataset (581,012 rows, 54 features, 7 classes).
    
    Extracts covtype.data.gz from covertype.zip if needed.
    """
    gz_path = os.path.join(DATA_DIR, "covtype.data.gz")
    zip_path = os.path.join(DATA_DIR, "covertype.zip")

    if not os.path.exists(gz_path) and os.path.exists(zip_path):
        with zipfile.ZipFile(zip_path, 'r') as zf:
            zf.extract("covtype.data.gz", DATA_DIR)

    if not os.path.exists(gz_path):
        raise FileNotFoundError(f"Could not locate covtype.data.gz or covertype.zip in {DATA_DIR}")

    with gzip.open(gz_path, 'rt') as f:
        data = pd.read_csv(f, header=None)

    X = data.iloc[:, :-1].values.astype(np.float32)
    # Covertype labels are 1-indexed (1..7), map to 0..6
    y = (data.iloc[:, -1].values - 1).astype(np.int32)

    if subsample and subsample < len(y):
        rng = np.random.RandomState(random_state)
        idx = rng.choice(len(y), subsample, replace=False)
        X, y = X[idx], y[idx]

    return X, y

def generate_synthetic_dataset(n_samples: int = 100000, n_features: int = 30, n_classes: int = 2, random_state: int = 42):
    """Generates synthetic tabular classification data with controllable scale and difficulty."""
    X, y = make_classification(
        n_samples=n_samples,
        n_features=n_features,
        n_informative=max(2, n_features // 2),
        n_redundant=max(1, n_features // 4),
        n_classes=n_classes,
        random_state=random_state,
        shuffle=True
    )
    return X.astype(np.float32), y.astype(np.int32)
