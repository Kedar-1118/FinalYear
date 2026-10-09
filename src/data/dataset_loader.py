import os
import zipfile
import gzip
from typing import Dict, Any, Tuple, Optional
import numpy as np
import pandas as pd
from sklearn.datasets import make_classification

# Points directly to the project's 'datasets/' directory
DATA_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "datasets"))


def _resolve_data_path(subfolder: str, filename: str, zip_filename: Optional[str] = None) -> str:
    """Locates a dataset file within its structured subfolder or root datasets directory.
    
    If the raw file is missing but a corresponding zip exists, it extracts the file automatically.
    """
    target_dir = os.path.join(DATA_DIR, subfolder)
    primary_path = os.path.join(target_dir, filename)
    root_fallback_path = os.path.join(DATA_DIR, filename)

    if os.path.exists(primary_path):
        return primary_path
    if os.path.exists(root_fallback_path):
        return root_fallback_path

    # Try extracting from zip if specified
    if zip_filename:
        zip_sub_path = os.path.join(target_dir, zip_filename)
        zip_root_path = os.path.join(DATA_DIR, zip_filename)
        actual_zip = zip_sub_path if os.path.exists(zip_sub_path) else (zip_root_path if os.path.exists(zip_root_path) else None)

        if actual_zip:
            os.makedirs(target_dir, exist_ok=True)
            with zipfile.ZipFile(actual_zip, 'r') as zf:
                # Find matching filename in zip (handling internal directory prefixes)
                matched_names = [m for m in zf.namelist() if m.endswith(filename)]
                if matched_names:
                    source_name = matched_names[0]
                    # Extract directly to target_dir with flat basename
                    with zf.open(source_name) as source, open(primary_path, "wb") as dest:
                        dest.write(source.read())
                    return primary_path

    raise FileNotFoundError(
        f"Could not locate '{filename}' in '{target_dir}' or '{DATA_DIR}'. "
        f"Ensure datasets are placed in datasets/{subfolder}/ or run extraction."
    )


def load_adult(subsample: Optional[int] = None, random_state: int = 42) -> Tuple[np.ndarray, np.ndarray]:
    """Loads and preprocesses the Adult Census Income dataset (~48,842 rows, 14 features).
    
    Parameters
    ----------
    subsample : int, optional
        Number of samples to extract. If None, returns the full dataset.
    random_state : int, default=42
        Random seed for subsampling reproducibility.

    Returns
    -------
    X : np.ndarray of shape (n_samples, 14), dtype=float32
    y : np.ndarray of shape (n_samples,), dtype=int32 (binary: 0 or 1)
    """
    csv_path = _resolve_data_path("adult", "adult.csv", zip_filename="archive.zip")
    df = pd.read_csv(csv_path)

    # Strip whitespace from string columns
    for col in df.select_dtypes(include='object').columns:
        df[col] = df[col].astype(str).str.strip()

    # Identify target column ('income' or '<=50K')
    target_col = 'income' if 'income' in df.columns else df.columns[-1]
    y_raw = df[target_col]
    y = (y_raw.isin(['>50K', '>50K.'])).astype(np.int32).values

    X_df = df.drop(columns=[target_col])
    # Encode categorical columns to numeric codes
    for col in X_df.select_dtypes(include='object').columns:
        X_df[col] = X_df[col].astype('category').cat.codes

    X = X_df.values.astype(np.float32)

    if subsample and subsample < len(y):
        rng = np.random.RandomState(random_state)
        idx = rng.choice(len(y), subsample, replace=False)
        X, y = X[idx], y[idx]

    return X, y


def load_covertype(subsample: Optional[int] = None, random_state: int = 42) -> Tuple[np.ndarray, np.ndarray]:
    """Loads the Forest Covertype dataset (581,012 rows, 54 features, 7 classes).
    
    Parameters
    ----------
    subsample : int, optional
        Number of samples to extract. If None, returns the full dataset.
    random_state : int, default=42
        Random seed for subsampling reproducibility.

    Returns
    -------
    X : np.ndarray of shape (n_samples, 54), dtype=float32
    y : np.ndarray of shape (n_samples,), dtype=int32 (classes 0..6)
    """
    gz_path = _resolve_data_path("covertype", "covtype.data.gz", zip_filename="covertype.zip")

    if subsample and subsample < 581012:
        # Read with nrows buffer if subsample is requested to accelerate loading
        nrows_to_read = min(subsample * 2, 581012)
        with gzip.open(gz_path, 'rt') as f:
            data = pd.read_csv(f, header=None, nrows=nrows_to_read)
    else:
        with gzip.open(gz_path, 'rt') as f:
            data = pd.read_csv(f, header=None)

    X = data.iloc[:, :-1].values.astype(np.float32)
    # Map labels from 1-indexed (1..7) to 0-indexed (0..6)
    y = (data.iloc[:, -1].values - 1).astype(np.int32)

    if subsample and subsample < len(y):
        rng = np.random.RandomState(random_state)
        idx = rng.choice(len(y), subsample, replace=False)
        X, y = X[idx], y[idx]

    return X, y


def load_higgs(
    subsample: Optional[int] = None,
    nrows: Optional[int] = None,
    random_state: int = 42
) -> Tuple[np.ndarray, np.ndarray]:
    """Loads the HIGGS benchmark dataset (11,000,000 rows, 28 continuous features, binary label).
    
    Higgs schema:
      - Column 0: Class label (1.0 for signal, 0.0 for background) -> converted to int32 (1 or 0)
      - Columns 1-28: Continuous kinematic features -> converted to float32

    Parameters
    ----------
    subsample : int, optional
        Number of random samples to return. If specified without nrows, efficiently reads
        the required chunk to minimize memory usage.
    nrows : int, optional
        Maximum sequential rows to read directly from the compressed archive.
    random_state : int, default=42
        Random seed for subsampling reproducibility.

    Returns
    -------
    X : np.ndarray of shape (n_samples, 28), dtype=float32
    y : np.ndarray of shape (n_samples,), dtype=int32
    """
    gz_path = _resolve_data_path("higgs", "HIGGS.csv.gz", zip_filename="higgs.zip")

    rows_to_read = nrows
    if rows_to_read is None and subsample is not None:
        # Read a reasonable chunk to sample from without decompressing 11M rows into RAM
        rows_to_read = max(subsample * 2, 100000)

    df = pd.read_csv(gz_path, header=None, nrows=rows_to_read, dtype=np.float32)

    y = df.iloc[:, 0].values.astype(np.int32)
    X = df.iloc[:, 1:].values.astype(np.float32)

    if subsample and subsample < len(y):
        rng = np.random.RandomState(random_state)
        idx = rng.choice(len(y), subsample, replace=False)
        X, y = X[idx], y[idx]

    return X, y


def generate_synthetic_dataset(
    n_samples: int = 100000,
    n_features: int = 30,
    n_classes: int = 2,
    random_state: int = 42
) -> Tuple[np.ndarray, np.ndarray]:
    """Generates synthetic tabular classification data with controllable scale and difficulty.
    
    Parameters
    ----------
    n_samples : int, default=100000
        Number of instances.
    n_features : int, default=30
        Total number of features.
    n_classes : int, default=2
        Number of target classes.
    random_state : int, default=42
        Random seed.

    Returns
    -------
    X : np.ndarray of shape (n_samples, n_features), dtype=float32
    y : np.ndarray of shape (n_samples,), dtype=int32
    """
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


def list_available_datasets() -> Dict[str, Dict[str, Any]]:
    """Inspects the datasets directory and returns status, paths, and size metadata for each dataset."""
    info = {
        "adult": {
            "name": "Adult Census Income",
            "task": "Binary Classification (<=50K vs >50K)",
            "expected_rows": 48842,
            "expected_features": 14,
            "subfolder": "datasets/adult",
            "primary_file": "adult.csv",
            "status": "Missing",
            "size_mb": 0.0,
            "path": None
        },
        "covertype": {
            "name": "Forest Cover Type",
            "task": "Multi-class Classification (7 classes)",
            "expected_rows": 581012,
            "expected_features": 54,
            "subfolder": "datasets/covertype",
            "primary_file": "covtype.data.gz",
            "status": "Missing",
            "size_mb": 0.0,
            "path": None
        },
        "higgs": {
            "name": "HIGGS Boson Kinematics",
            "task": "Binary Classification (Signal vs Background)",
            "expected_rows": 11000000,
            "expected_features": 28,
            "subfolder": "datasets/higgs",
            "primary_file": "HIGGS.csv.gz",
            "status": "Missing",
            "size_mb": 0.0,
            "path": None
        },
        "synthetic": {
            "name": "Synthetic Tabular Generator",
            "task": "Configurable (Binary / Multi-class)",
            "expected_rows": "On-demand",
            "expected_features": "On-demand",
            "subfolder": "N/A (Generated via make_classification)",
            "primary_file": "N/A",
            "status": "Ready",
            "size_mb": 0.0,
            "path": "Dynamic"
        }
    }

    # Check physical presence
    for key, item in info.items():
        if key == "synthetic":
            continue
        try:
            resolved = _resolve_data_path(
                key,
                item["primary_file"],
                zip_filename=f"{key}.zip" if key != "adult" else "archive.zip"
            )
            item["status"] = "Ready"
            item["path"] = resolved
            item["size_mb"] = round(os.path.getsize(resolved) / (1024 * 1024), 2)
        except Exception:
            item["status"] = "Missing"

    return info
