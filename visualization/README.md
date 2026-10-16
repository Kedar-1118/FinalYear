# MABSplit++ Visualization Frontend & Split Explorer

This directory contains the standalone interactive visualization frontend for exploring dataset feature contributions and decision tree final splits.

---

## 🚀 Quick Start: Launching the Dashboard

You can view the dashboard in any modern web browser using either of the two methods below:

### Option 1: Python Server (Recommended)
Run the bundled lightweight Python server:
```bash
python visualization/serve.py
```
This automatically binds to `http://localhost:8080` (or the next available port) and opens your default browser.

### Option 2: Direct File Open (Zero Dependencies)
You can directly double-click or open `visualization/index.html` in Chrome, Edge, Firefox, or Safari. All benchmark datasets, feature analyses, and tree split hierarchies are pre-bundled in `visualization/data.js` to ensure 100% offline functionality without CORS restrictions.

---

## 📂 Architecture & Directory Organization

```
visualization/
├── index.html         # Main dashboard single-page interface
├── styles.css         # Dark glassmorphic design system & animations
├── app.js             # Interactive logic, SVG tree rendering & MAB simulator
├── data.js            # Pre-bundled dataset analysis data (Adult, Covertype, HIGGS, Synthetic)
├── serve.py           # One-click local HTTP server launcher
├── export_data.py     # Script to regenerate data.js and data/*.json from dataset analysis
└── data/              # Standalone JSON analysis files
    ├── adult_analysis.json
    ├── covertype_analysis.json
    ├── higgs_analysis.json
    ├── synthetic_analysis.json
    └── benchmark_summary.json
```

---

## 🌟 Interactive Capabilities

1. **Dataset Switcher (Header Pills)**:
   - Toggle seamlessly between **Adult Census Income** (14 features), **Forest Covertype** (54 features), **HIGGS Boson Kinematics** (28 features), and **Synthetic Tabular Benchmark** (20 features).

2. **Feature Contributions & Pareto Analysis (Tab 1)**:
   - Dynamic ranked bar chart showing individual feature predictive contributions.
   - Switch between **Composite Signal**, **MABSplit Impurity Reduction**, **Random Forest MDI**, and **Mutual Information**.
   - Interactive **Pareto 80/20 Signal Curve** displaying how rapidly top features explain the predictive signal.
   - Searchable, sortable catalog of feature statistics (mean, std, min, max, split frequency).

3. **Final Splits & Interactive Decision Tree (Tab 2)**:
   - Dynamic SVG tree visualization with interactive pan, zoom, and reset.
   - Depth filter slider (Depth 1 to Depth 5).
   - Visual distinction between:
     - `⚡ MAB Split` nodes (accelerated multi-armed bandit sampling)
     - `🔍 Exact Split` nodes (adaptive hybrid fallback on small node sizes)
     - `🎯 Final Split` nodes (highlighted terminal split boundaries right above leaves)
     - `🍃 Leaf Prediction` nodes (class prediction with confidence probability)
   - Click any node to open the **Split Inspection Drawer**, comparing left vs right branch sample partitions and Gini gains.

4. **MAB Splitting Engine Simulator ("How Everything Happens") (Tab 3)**:
   - Step-by-step interactive simulation of the Multi-Armed Bandit node splitting mechanism.
   - Play, pause, step forward, and adjust speed.
   - Dynamic Serfling finite-population confidence intervals $[\hat{\mu}_i - c, \hat{\mu}_i + c]$ shrinking over minibatch rounds.
   - Visual depiction of sub-optimal arm elimination and final winner selection.
   - Live activity stream detailing algorithm decisions at each round.

5. **Live "What-If" Decision Path Tracer (Tab 4)**:
   - Test sample sliders for dominant features.
   - Real-time route tracing through the tree splits down to the final predicted classification.

6. **Algorithmic Theory & Benchmarks (Tab 5)**:
   - Mathematical formulations of Serfling finite-population bounds, depth-adaptive hybrid dispatch, and hierarchical coarse-to-fine pruning.
