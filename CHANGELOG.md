# Changelog

All notable changes to the **MABSplit++** repository will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2026-10-16

### Added
- **Depth-Adaptive Hybrid Solver (`HybridSolver`)**: Automatically routes nodes with $N < N_{\text{thresh}}$ to vectorized exact splitting, bypassing MAB overhead at leaf levels.
- **Hierarchical Coarse-to-Fine Arm Pruning (H-MAB)**: Evaluates features at $B_{\text{coarse}}=16$, eliminates suboptimal features, expands survivors to $B_{\text{fine}}=256$ with formal Bonferroni budget split ($\delta = \delta/3 + 2\delta/3$).
- **Serfling / Bardenet-Maillard Finite-Population Bounds**: Replaces naive Hoeffding bounds with non-replacement bounds where variance collapses to zero as $n \to N_v$.
- **Adaptive Dynamic Minibatch Allocation (ADMA)**: Dynamically scales sample batch size $M_t = \max(M_{\min}, \lfloor M_0 (|Act|/K)^\alpha \rfloor)$.
- **Bare-Metal C++17 Engine**: High-throughput micro-benchmark runner using SIMD-aligned cache arrays and zero runtime heap allocations.
- **Extended Benchmark Suite**: Added multi-seed evaluation, split fidelity rate calculations, paired Wilcoxon signed-rank significance tests, and Pareto frontier profiling.
- **GitHub Actions CI/CD Pipeline**: Multi-platform automated workflow testing Python 3.10-3.12 on Linux/Windows alongside CMake C++ compilation.
- **Model Serialization**: Full JSON and Graphviz DOT export/import utilities for fitted decision trees.

### Changed
- Standardized API to full Scikit-Learn estimator conventions (`BaseEstimator`, `ClassifierMixin`, `n_features_in_`, `n_features_`).
- Optimized columnar `uint8` pre-binning with Fortran-order memory layout for cache-friendly sequential scans.

### Fixed
- Fixed missing `n_features_` attribute check in `check_is_fitted` across decision tree serialization and random forest feature importance routines.
- Resolved institution documentation alignment to Pune Institute of Computer Technology (PICT).

---

## [0.2.0] - 2026-10-10

### Added
- Multi-class classification stress test suite.
- Adult Census and Forest Covertype data pipelines with automated streaming extraction.
- Numba `@njit(fastmath=True)` kernel implementations for online Welford statistics and histogram accumulations.

---

## [0.1.0] - 2026-09-15

### Added
- Initial project architecture and theoretical formulation based on Tiwari et al. (NeurIPS 2022).
- Baseline CART greedy splitter reference implementations.
