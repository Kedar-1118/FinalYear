# Benchmark Datasets Directory

This directory stores the local datasets used for benchmarking and validating the **MABSplit** decision tree and random forest algorithms.

> **Note:** Raw dataset files (`*.csv`, `*.gz`, `*.zip`, `*.data`) are excluded from Git tracking via `.gitignore` to maintain repository size and comply with remote limits.

---

## Directory Organization

```
datasets/
├── adult/
│   ├── adult.csv           # Adult Census Income dataset (~48,842 rows, 14 features)
│   └── archive.zip         # Original zipped source
├── covertype/
│   ├── covtype.data.gz     # Forest Cover Type dataset (581,012 rows, 54 features)
│   └── covertype.zip       # Original zipped source
└── higgs/
    ├── HIGGS.csv.gz        # UCI HIGGS Boson kinematic dataset (11,000,000 rows, 28 features)
    └── higgs.zip           # Original zipped source
```

---

## Dataset Summary & Specifications

| Dataset | Task Type | Total Instances | Features | Classes | Target Description | File Format |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Adult** | Binary Classification | 48,842 | 14 (Mixed) | 2 | Income level (`<=50K`, `>50K`) | CSV (`adult.csv`) |
| **Covertype** | Multi-Class Classification | 581,012 | 54 (Cartographic) | 7 | Forest cover type (Classes 1–7) | Gzip CSV (`covtype.data.gz`) |
| **HIGGS** | Large-scale Binary Classification | 11,000,000 | 28 (Kinematic float) | 2 | Signal (1.0) vs Background (0.0) | Gzip CSV (`HIGGS.csv.gz`) |
| **Synthetic** | Controlled Benchmark | Configurable | Configurable | Configurable | Generated via Scikit-Learn | In-memory (`make_classification`) |

---

## Python API Usage

All datasets are loaded via the high-performance unified data loader in `src/data/dataset_loader.py`:

```python
from src.data import (
    load_adult,
    load_covertype,
    load_higgs,
    generate_synthetic_dataset,
    list_available_datasets
)

# Check availability and sizes of local datasets
status = list_available_datasets()
print(status)

# 1. Load Adult Census Income (returns float32 features and int32 labels)
X_adult, y_adult = load_adult(subsample=10000, random_state=42)

# 2. Load Forest Cover Type (labels re-indexed to 0..6)
X_cov, y_cov = load_covertype(subsample=50000, random_state=42)

# 3. Load HIGGS (fast chunked streaming without exhausting RAM)
X_higgs, y_higgs = load_higgs(subsample=100000, random_state=42)

# 4. Generate on-demand synthetic tabular dataset
X_syn, y_syn = generate_synthetic_dataset(n_samples=50000, n_features=30, n_classes=2)
```

### Automatic Archive Extraction
If a raw dataset file (`adult.csv` or `covtype.data.gz`) is not yet unpacked, `dataset_loader.py` will automatically locate the corresponding `.zip` file in that dataset's folder and extract it on the first call.
