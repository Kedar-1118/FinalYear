# MABSplit++ Final Presentation Slide Deck Transcript

**Institution**: Pune Institute of Computer Technology (PICT), Pune  
**Department**: Department of Computer Engineering  
**Project**: MABSplit++: Accelerated Decision Tree and Random Forest Training via Multi-Armed Bandits  
**Duration**: 15–20 Minutes (including 5 min Technical Q&A)

---

### Slide 1: Title & Team Credentials
- **Title**: MABSplit++: Accelerated Decision Tree & Random Forest Training via Finite-Population Multi-Armed Bandits
- **Domain**: Machine Learning Systems / Algorithmic Acceleration / Bandits
- **Team Members**:
  - Aditya Pansare
  - Kedar Dhotre
  - Dhanashree Maid
  - Onkar Rane
- **Academic Year**: 2026–2027 | Pune Institute of Computer Technology
- **Speaker Cue**: *"Good morning respected evaluators and committee members. Today we present MABSplit++, an accelerated tree training architecture that reformulates the fundamental computational bottleneck of machine learning decision trees into a multi-armed bandit best-arm identification problem."*

---

### Slide 2: Problem Statement & Motivation
- **The Bottleneck**:
  - Greedy exact splitting (CART / C4.5) evaluates all $N_v$ samples for every feature $F$ and threshold $B$:
    $$\text{Cost}_{\text{Exact}} = \mathcal{O}(N_v \cdot F \cdot B)$$
  - For large datasets ($N \ge 10^5$) and ensemble forests of 100+ trees, tree induction is bottlenecked by memory bandwidth and redundant sample queries.
- **Why Existing Work Fell Short (Tiwari et al., NeurIPS 2022)**:
  - 1. High overhead at small leaf nodes ($N < 1000$).
  - 2. Naive infinite-population bounds caused sampling stalls as $n \to N_v$.
  - 3. Fixed batch sizes ($M=100$) wasted queries in late elimination rounds.
- **Speaker Cue**: *"While NeurIPS 2022 proved theoretical bounds, existing implementations were up to 3x slower in wall-clock time near leaves and wasted samples due to uncorrected bounds."*

---

### Slide 3: Algorithmic Innovations Overview
- **Four Core Theoretical & Systems Contributions**:
  1. **Serfling Finite-Population Bounds**: Variance collapses to $0.0$ as $n \to N_v$.
  2. **Adaptive Dynamic Minibatch Allocation (ADMA)**: $M_t = \max(M_{\min}, \lfloor M_0 (|Act|/K)^\alpha \rfloor)$.
  3. **Hierarchical Coarse-to-Fine Arm Pruning (H-MAB)**: Bonferroni budget split ($\delta = \delta/3 + 2\delta/3$).
  4. **Depth-Adaptive Hybrid Solver (`HybridSolver`)**: Switches small partitions ($N < 500$) to vectorized exact SIMD splitting.
- **Speaker Cue**: *"We do not just patch the algorithm; we introduce four formal innovations that eliminate leaf overhead, shrink minibatch waste, and collapse variance to zero."*

---

### Slide 4: Mathematical Innovation 1 — Finite-Population Bounds
- **The Serfling Concentration Inequality**:
  $$\epsilon_t = \sqrt{2 \sigma^2 \left(1 - \frac{n-1}{N_v}\right) \frac{\ln(3/\delta)}{n}} + \frac{3 \ln(3/\delta) \left(1 - \frac{n-1}{N_v}\right)}{n}$$
- **Key Insight**: The factor $(1 - \frac{n-1}{N_v})$ strictly vanishes when all node samples are read, eliminating the theoretical gap between bandit sampling and exact computation.

---

### Slide 5: Mathematical Innovation 2 — H-MAB with Bonferroni Budget
- **Two-Stage Feature Screening**:
  - Stage 1: Coarse screening with $B_{\text{coarse}} = 16$ candidate bins.
  - Stage 2: Fine-resolution evaluation with $B_{\text{fine}} = 256$ bins on surviving features.
- **PAC Guarantee Preservation**:
  $$\delta = \delta_{\text{coarse}} + \delta_{\text{fine}} = \frac{\delta}{3} + \frac{2\delta}{3}$$
- **Result**: Cuts candidate arm space by up to $80\%$ in the first round with zero error budget leakage.

---

### Slide 6: Systems Architecture & Memory Engineering
- **Columnar `uint8` Representation**: Pre-quantizing features into 256 bins reduces memory footprint by **8x** (1 byte vs. 8 bytes per sample).
- **Fortran (`order='F'`) Layout**: Contiguous column storage enables seamless L1/L2 cache prefetching.
- **Zero-Allocation Execution Buffers**: Pre-allocated scratch arrays for histograms, active masks, and Welford variance running accumulators eliminate Python garbage collection stalls.

---

### Slide 7: Depth-Adaptive Hybrid Solver (`HybridSolver`)
- **Routing Logic**:
  - $N_v < N_{\text{thresh}}$: Vectorized Exact Sorting (SIMD accelerated).
  - $N_v \ge N_{\text{thresh}}$: H-MAB + Serfling Finite-Population Engine.
- **Why it Works**: Near the leaves (where 70%+ of nodes exist), exact sorting evaluates 100–300 samples in microseconds, eliminating MAB book-keeping overhead.

---

### Slide 8: Empirical Benchmarks & Speedup Comparison
- **Dataset Results**:
  - **Adult Census** ($N=48\text{k}$): **5.22x Speedup** vs. Scikit-Learn CART.
  - **Forest Covertype** ($N=581\text{k}$): **9.18x Speedup** vs. CART.
  - **HIGGS** ($N=1\text{M}$): **7.88x–11.81x Speedup** vs. CART.
- **Key Takeaway**: Achieves competitive speedups matching dedicated histogram gradient boosters while retaining pure CART tree interpretability.

---

### Slide 9: Split Fidelity & Statistical Significance
- **Novel Metric**: Split Agreement Rate $S_{\text{agree}} > 99.1\%$ across all benchmarks.
- **Statistical Significance**:
  - Two-tailed paired Wilcoxon signed-rank test confirmed **no statistically significant difference** in generalization accuracy compared to exact CART ($p > 0.05$).

---

### Slide 10: Ablation Study Progression
- **Step-by-Step Cumulative Speedup on Covertype ($N=581\text{k}$)**:
  - Baseline MAB (Tiwari et al.): $3.02\times$
  - + Serfling Bounds: $4.09\times$
  - + H-MAB Coarse-to-Fine: $6.23\times$
  - + ADMA Dynamic Allocation: $7.45\times$
  - + HybridSolver (Full MABSplit++): **9.18x**

---

### Slide 11: High-Throughput C++17 Bare-Metal Engine
- Standalone C++17 implementation utilizing zero runtime heap allocations and cache-aligned histogram arrays.
- Evaluates 100,000 samples across 20 features in **3.23 milliseconds** (evaluating only 24.5% of samples).
- Python integration via `CppEngineBridge` in `src.engine`.

---

### Slide 12: Project Verification & Toolchain
- **Automated Test Suite**: 18 unit and integration tests passing with 100% success rate.
- **CI/CD Pipeline**: GitHub Actions multi-platform workflow (Linux/Windows, Python 3.10–3.12, CMake C++ build).
- **Deliverables**: Comprehensive documentation, complete LaTeX research paper, verified benchmark logs.

---

### Slide 13: Summary & Conclusion
- Formulated tree splitting as Multi-Armed Bandit Best-Arm Identification with finite-population bounds.
- Solved the leaf-node overhead and sampling stalls with Serfling bounds, ADMA, H-MAB, and `HybridSolver`.
- Demonstrated up to **11.8x wall-clock speedup** with $>99.1\%$ split fidelity on big-data benchmarks.
- Open for Technical Q&A.
