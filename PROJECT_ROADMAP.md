# MABSplit Project Implementation Roadmap & Action Plan

**Project Title**: MABSplit — Accelerated Random Forest & Decision Tree Training via Multi-Armed Bandit Node Splitting  
**Institution**: Walchand College of Engineering, Sangli — Department of Computer Science and Engineering  
**Academic Year**: 2026–2027  
**Core Reference**: Tiwari et al., *MABSplit: Faster Forest Training Using Multi-Armed Bandits*, NeurIPS 2022 (`ThrunGroup/FastForest`)

---

## 1. Executive Summary

This project accelerates Decision Tree and Random Forest training on large-scale tabular datasets by reformulating the computational bottleneck of node splitting $\mathcal{O}(N \cdot F \cdot B)$ into a Multi-Armed Bandit (MAB) best-arm identification problem with $\mathcal{O}(K \log N)$ sample complexity.

The existing Python/NumPy implementation of MABSplit suffers from three critical bottlenecks:
1. **Leaf Overhead**: Fixed per-arm bookkeeping and bound computation exceed brute-force sorting on small leaf nodes ($N < 1000$).
2. **Wasteful Sampling**: Fixed minibatch sizes ($M=100$) over-sample data when the active arm candidate set has shrunk to 2–3 arms.
3. **Python Interpreter Overhead**: Inner sampling loops and dynamic `np.concatenate` allocations diminish theoretical sample-efficiency gains in wall-clock time.

This project delivers **four modular innovations** to achieve **5x–10x real-world wall-clock speedup** while guaranteeing no loss in generalization accuracy.

---

## 2. Core Architecture & Modules to Implement

```
+-----------------------------------------------------------------------------------+
|                                  TreeBuilder / Forest                             |
|          (Manages recursive tree expansion, bootstrap sampling, predictions)     |
+-----------------------------------------------------------------------------------+
                                          |
                                          v
+-----------------------------------------------------------------------------------+
|                         HybridSolver (Depth-Adaptive Dispatch)                    |
|       Checks: If N < N_thresh  ---> Exact Vectorized Sorting (Guaranteed Fast)    |
|               If N >= N_thresh ---> Dispatch to Fast MAB Pipeline                 |
+-----------------------------------------------------------------------------------+
                                          |
          +-------------------------------+-------------------------------+
          |                               |                               |
          v                               v                               v
+-------------------+           +-------------------+           +-------------------+
|     ArmPruner     |           | MinibatchAllocator|           |   FastMABEngine   |
|  (H-MABSplit)     |           |  (ADMA-MABSplit)  |           |     (Fast-MAB)    |
| - Coarse (B=16)   |           | - Dynamic batch:  |           | - Numba @njit     |
|   feature filter  |           |   M_t = max(M_min,|           |   kernels         |
| - Fine (B=256)    |           |     M0*(|Act|/K)^a|           | - Pre-allocated   |
|   expansion       |           | - No-replace sampl|           |   NumPy buffers   |
| - UCB/LCB pruning |           |                   |           | - Online Welford  |
+-------------------+           +-------------------+           +-------------------+
```

---

## 3. Detailed Step-by-Step Implementation Roadmap

### Phase 1: Environment Setup & Dataset Preparation
- [ ] **1.1 Set up Python Virtual Environment**:
  - Install dependencies: `numpy`, `scipy`, `numba`, `scikit-learn`, `pandas`, `matplotlib`, `seaborn`, `pytest`, `memory_profiler`.
- [ ] **1.2 Extract & Validate Benchmark Datasets**:
  - Extract and prepare:
    - **Adult (Census Income)**: ~48,842 rows, 14 features (tabular classification).
    - **Covertype**: 581,012 rows, 54 features (high-dimensional multi-class classification).
    - **Higgs**: ~11,000,000 rows, 28 features (large-scale stress test).
    - **Synthetic Generator**: Configurable sample size, informative features, and noise levels for boundary-case stress testing.
- [ ] **1.3 Data Pipeline Utilities**:
  - Implement memory-efficient data loaders (`mmap` or chunked loaders where needed for Higgs).
  - Train/test stratified splitting utilities.

---

### Phase 2: Baseline Implementation & Reference Mapping
- [ ] **2.1 Standard Scikit-Learn Benchmark**:
  - Implement standard benchmark wrappers for `scikit-learn`'s `DecisionTreeClassifier`, `DecisionTreeRegressor`, and `RandomForestClassifier`.
  - Record training time, sample reads, peak memory, and baseline accuracy (F1 / RMSE).
- [ ] **2.2 Baseline MABSplit Reproduction**:
  - Extract/clone the reference `FastForest` implementation from the published NeurIPS 2022 paper.
  - Document paper-to-code deviations (binning edge updates, array concatenation bottlenecks).
  - Benchmark baseline MABSplit against scikit-learn.

---

### Phase 3: Core Algorithmic Components Development

#### Module A: Fast-MAB Engine (`FastMABEngine`)
- [ ] **3.1 Numba JIT Compilation (`@njit(fastmath=True)`)**:
  - Compile the innermost histogram update loop.
  - Compile the online Welford statistics update (running mean $\hat{\Delta}_a$ and sample variance $\sigma_a^2$).
  - Compile UCB/LCB bound computation and active-mask filtering.
- [ ] **3.2 Zero-Allocation Memory Management**:
  - Pre-allocate reusable NumPy arrays for histograms, active masks, and bound buffers per tree depth to eliminate dynamic reallocations.

#### Module B: Hybrid Depth Dispatcher (`HybridSolver`)
- [ ] **3.3 Exact Sorting Engine**:
  - Implement a fast vectorized exact splitting routine for small nodes.
- [ ] **3.4 Threshold Switching Logic**:
  - Implement dynamic routing:
    $$\text{Mode} = \begin{cases} \text{Exact Vectorized Sort}, & N < N_{\text{thresh}} \\ \text{MAB Solver}, & N \ge N_{\text{thresh}} \end{cases}$$
  - Default $N_{\text{thresh}} \in [500, 2000]$.

#### Module C: Hierarchical Coarse-to-Fine Arm Pruning (`ArmPruner` / `H-MABSplit`)
- [ ] **3.5 Coarse Histogram Filtering ($B_{\text{coarse}} = 16$)**:
  - Build 16-bin histograms across all $F$ features.
  - Run initial rapid bandit sampling rounds.
  - Discard features whose upper bound $\text{UCB}_a$ falls below the best $\text{LCB}$.
- [ ] **3.6 Fine Histogram Expansion ($B_{\text{fine}} = 256$)**:
  - Expand only surviving candidate features into full 256-bin resolution.
  - Reduces initial memory footprint by $2\times - 4\times$ on high-dimensional datasets.

#### Module D: Adaptive Dynamic Minibatch Allocation (`MinibatchAllocator` / `ADMA-MABSplit`)
- [ ] **3.7 Dynamic Sizing Calculation**:
  - Implement formula:
    $$M_t = \max\left(M_{\text{min}}, \left\lfloor M_0 \cdot \left(\frac{|\text{Active}_t|}{K}\right)^\alpha \right\rfloor\right)$$
  - Parameters: Initial batch $M_0 = 100$, minimum batch $M_{\text{min}} = 10$, decay exponent $\alpha \in [0.5, 1.5]$.
- [ ] **3.8 Sampling Without Replacement**:
  - Efficient tracking of sampled indices per node to ensure statistical validity without duplicate reads.

---

### Phase 4: Model Assembler (Scikit-Learn Compatible Estimators)
- [ ] **4.1 `MABDecisionTreeClassifier` & `MABDecisionTreeRegressor`**:
  - Standard scikit-learn API: `.fit(X, y)`, `.predict(X)`, `.predict_proba(X)`.
  - Supports configurable hyperparameters: `max_depth`, `min_samples_split`, `criterion` (`gini` / `mse`), `delta` ($\delta$), `n_thresh`, `b_coarse`, `b_fine`, `m0`, `alpha`.
- [ ] **4.2 `MABRandomForestClassifier` & `MABRandomForestRegressor`**:
  - Bootstrap bagging, `max_features` subsampling, parallel tree training across multi-core CPU threads (`joblib` / `multiprocessing`).
- [ ] **4.3 Modular Ablation Toggles**:
  - Add flags to independently enable/disable:
    - `use_hybrid` (toggle Hybrid Depth Switch)
    - `use_coarse_to_fine` (toggle H-MABSplit)
    - `use_adaptive_batch` (toggle ADMA-MABSplit)
    - `use_numba_engine` (toggle Fast-MAB JIT)

---

### Phase 5: Verification, Unit Testing & Statistical Benchmarking
- [ ] **5.1 Unit & Correctness Tests (`pytest`)**:
  - Test exact vs. MAB split consistency on toy synthetic datasets.
  - Verify error bound guarantee: optimal split recovered with probability $\ge 1 - \delta$.
  - Verify edge cases (pure nodes, constant features, very small $N$).
- [ ] **5.2 Comprehensive Benchmark Suite**:
  - Benchmark on **Adult**, **Covertype**, **Higgs**, and **Synthetic**.
  - Compare across 3 configurations:
    1. Scikit-learn Exact Solver
    2. Baseline MABSplit (`FastForest`)
    3. Our Optimized Hybrid-H-ADMA Fast-MAB
  - Collect across $\ge 5$ seeds:
    - **Wall-clock training time (seconds)**
    - **Sample queries count (evaluations per split)**
    - **Peak memory usage (MB)**
    - **Model accuracy (F1-score / RMSE)**
    - **Statistical significance testing (p-values / paired t-test)**

---

### Phase 6: Ablation Studies & Visualizations
- [ ] **6.1 Component Ablation Experiments**:
  - Baseline MABSplit
  - Baseline + Numba Engine (Fast-MAB)
  - Baseline + Fast-MAB + Hybrid Switch
  - Baseline + Fast-MAB + Hybrid Switch + Coarse-to-Fine
  - Full System (Fast-MAB + Hybrid + Coarse-to-Fine + ADMA)
- [ ] **6.2 Automated Plotting Scripts**:
  - Generate bar plots: Speedup comparisons across datasets.
  - Generate line curves: Sample efficiency vs. node depth.
  - Generate memory footprint curves over training time.
  - Output high-res figures (`.png`/`.pdf`) and summary Markdown/CSV tables.

---

### Phase 7: Final Documentation & Presentation Deliverables
- [ ] **7.1 Project Documentation**:
  - Final project report matching B.Tech CSE thesis guidelines.
  - Detailed code documentation with symbol and API references.
- [ ] **7.2 Presentation Slides & Demonstration**:
  - Reproducible benchmark script allowing live execution and timing comparisons.

---

## 4. Key Target Metrics Summary

| Metric | Target Expectation |
|---|---|
| **Wall-Clock Speedup** | **$5\times - 10\times$ faster** than pure Python MABSplit |
| **Leaf Split Overhead** | **$25\% - 40\%$ reduction** in net forest training time via Hybrid Switch |
| **Sample Query Reduction** | **$20\% - 30\%$ fewer sample evaluations** via ADMA dynamic batching |
| **Memory Reduction** | **$2\times - 4\times$ reduction** in initial arm memory for high-dimensional data via coarse pruning |
| **Generalization Accuracy** | **No statistically significant degradation** compared to exact scikit-learn ($p > 0.05$) |
