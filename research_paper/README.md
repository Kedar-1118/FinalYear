# MABSplit: Research Paper Manuscript

This directory contains the complete LaTeX source code, section breakdown, bibliography, and experimental tables for the research paper:

> **Title**: *MABSplit: Accelerated Decision Tree and Random Forest Training via Multi-Armed Bandits with Finite-Population Bounds*  
> **Authors**: Aditya Pansare, Kedar Dhotre, Dhanashree Maid, Onkar Rane  
> **Target Venue**: IEEE Transactions on Knowledge and Data Engineering (TKDE) / NeurIPS / ICML / ACM KDD / IEEE Access

---

## 📁 Directory Structure

```
research_paper/
├── main.tex                       # Master LaTeX document (IEEEtran conference / journal format)
├── references.bib                 # Comprehensive BibTeX citations
├── README.md                      # Compilation instructions and paper roadmap
├── sections/                      # Modular LaTeX sections
│   ├── 01_introduction.tex        # Motivation, bottleneck analysis, and novel contributions
│   ├── 02_background.tex          # Decision tree splitting, Gini criterion, Hoeffding vs. Serfling bounds
│   ├── 03_methodology.tex         # Fast MAB engine, H-MAB pruning, ADMA, Depth-adaptive hybrid solver
│   ├── 04_theoretical_guarantees.tex # PAC optimality proofs, sample complexity, and Bonferroni split
│   ├── 05_experiments.tex         # Experimental results, speedup benchmarks, split fidelity, ablation
│   └── 06_conclusion.tex          # Conclusion, limitations, and future work
└── tables/                        # Standalone LaTeX table components
    ├── dataset_stats.tex          # Characteristics of evaluation datasets
    ├── benchmark_results.tex      # Comparative training speedup & accuracy
    └── ablation_table.tex         # Contribution-wise ablation study
```

---

## 🛠️ Compilation Instructions

### Prerequisites
- TeX Live / MiKTeX / MacTeX with `pdflatex` or `latexmk`
- Standard IEEEtran class (`IEEEtran.cls`) and BibTeX

### Compiling with `latexmk` (Recommended)
```bash
latexmk -pdf main.tex
```

### Compiling with `pdflatex` manually
```bash
pdflatex main.tex
bibtex main
pdflatex main.tex
pdflatex main.tex
```

---

## 🎯 Key Contributions Documented

1. **Finite-Population Serfling Empirical Bernstein Bounds**: Formalization of non-replacement sampling bounds with zero variance residual upon node exhaust.
2. **Hierarchical Coarse-to-Fine Arm Pruning (H-MAB)**: Quantization-aware two-stage arm pruning with split $\delta$-budgets ($\delta/3$ and $2\delta/3$).
3. **Adaptive Dynamic Minibatch Allocation (ADMA)**: Batch schedule reduction when candidate set contracts.
4. **Depth-Adaptive Hybrid Architecture**: Heuristic threshold $N_{\text{thresh}}$ switching between exact vector scan and MAB elimination.
5. **Split Fidelity Metric**: Quantitative split agreement rate evaluation protocol verifying empirical node partition equivalence with exact greedy algorithms.
