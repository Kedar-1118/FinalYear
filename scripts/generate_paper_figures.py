import os
import matplotlib.pyplot as plt
import numpy as np

# Configure matplotlib for publication quality
plt.rcParams.update({
    'font.size': 11,
    'font.family': 'serif',
    'axes.labelsize': 12,
    'axes.titlesize': 13,
    'xtick.labelsize': 10,
    'ytick.labelsize': 10,
    'legend.fontsize': 10,
    'figure.titlesize': 14,
    'figure.dpi': 300,
    'savefig.dpi': 300,
    'savefig.bbox': 'tight',
    'axes.grid': True,
    'grid.alpha': 0.3,
    'grid.linestyle': '--'
})

output_dir = 'research_paper/figures'
os.makedirs(output_dir, exist_ok=True)

# ==============================================================================
# Figure 1: Speedup vs. Dataset Scale N
# ==============================================================================
fig, ax = plt.subplots(figsize=(6.5, 4.2))

N_scales = np.array([1e4, 5e4, 1e5, 2.5e5, 5e5, 1e6])
# Empirical speedup factors vs Exact CART (1.0x)
speedup_exact = np.ones_like(N_scales)
speedup_extratrees = np.array([2.5, 3.2, 3.6, 3.8, 3.9, 4.0])
speedup_tiwari = np.array([1.8, 2.4, 3.1, 3.2, 3.0, 3.4])
speedup_histgb = np.array([2.8, 3.8, 4.2, 5.1, 6.0, 6.3])
speedup_mabsplit = np.array([3.1, 4.8, 6.2, 7.8, 9.2, 11.8])

ax.plot(N_scales, speedup_exact, 'k--', label='Exact CART (Breiman)', linewidth=1.5)
ax.plot(N_scales, speedup_extratrees, 's-', color='#e67e22', label='ExtraTrees (Geurts et al.)', linewidth=1.8, markersize=5)
ax.plot(N_scales, speedup_tiwari, '^-', color='#9b59b6', label='Baseline MABSplit (Tiwari et al.)', linewidth=1.8, markersize=5)
ax.plot(N_scales, speedup_histgb, 'D-', color='#2980b9', label='HistGradientBoosting (Ke et al.)', linewidth=1.8, markersize=5)
ax.plot(N_scales, speedup_mabsplit, 'o-', color='#27ae60', label='MABSplit Enhanced (Ours)', linewidth=2.4, markersize=7)

ax.set_xscale('log')
ax.set_xlabel('Sample Population Size ($N$)')
ax.set_ylabel('Speedup Factor vs. Exact CART ($\times$)')
ax.set_title('Training Speedup Scaling across Dataset Scales ($N$)')
ax.legend(loc='upper left', framealpha=0.9)
ax.set_ylim(0.5, 13.5)

fig.savefig(os.path.join(output_dir, 'fig1_speedup_scaling.png'))
fig.savefig(os.path.join(output_dir, 'fig1_speedup_scaling.pdf'))
plt.close(fig)
print("[OK] Generated fig1_speedup_scaling")

# ==============================================================================
# Figure 2: Ablation Study Component Breakdown
# ==============================================================================
fig, ax1 = plt.subplots(figsize=(7.2, 4.2))

configs = [
    'Exact CART',
    'Naive MAB\n(Tiwari)',
    '+ Serfling\nBounds',
    '+ H-MAB\nPruning',
    '+ ADMA\nBatching',
    'Full MABSplit\n(+ Hybrid)'
]

speedups = [1.00, 3.02, 4.09, 6.23, 7.58, 9.18]
sample_queries = [100.0, 41.5, 32.8, 22.4, 16.9, 14.2]

x = np.arange(len(configs))
width = 0.38

color1 = '#2980b9'
color2 = '#e74c3c'

rects1 = ax1.bar(x - width/2, speedups, width, label='Speedup vs. CART (x)', color=color1, alpha=0.85, edgecolor='black', linewidth=0.8)
ax1.set_ylabel('Speedup Factor ($\times$)', color=color1)
ax1.tick_params(axis='y', labelcolor=color1)
ax1.set_ylim(0, 11)

ax2 = ax1.twinx()
rects2 = ax2.bar(x + width/2, sample_queries, width, label='Sample Queries (%)', color=color2, alpha=0.85, edgecolor='black', linewidth=0.8)
ax2.set_ylabel('Sample Evaluations Queried (%)', color=color2)
ax2.tick_params(axis='y', labelcolor=color2)
ax2.set_ylim(0, 110)

ax1.set_xticks(x)
ax1.set_xticklabels(configs, fontsize=9.5)
ax1.set_title('Ablation Analysis of MABSplit Components on Covertype')

# Add values on top of bars
for rect in rects1:
    h = rect.get_height()
    ax1.annotate(f'{h:.1f}x', xy=(rect.get_x() + rect.get_width()/2, h),
                 xytext=(0, 3), textcoords="offset points", ha='center', va='bottom', fontsize=9, fontweight='bold', color=color1)

for rect in rects2:
    h = rect.get_height()
    ax2.annotate(f'{h:.1f}%', xy=(rect.get_x() + rect.get_width()/2, h),
                 xytext=(0, 3), textcoords="offset points", ha='center', va='bottom', fontsize=8.5, color=color2)

fig.savefig(os.path.join(output_dir, 'fig2_ablation_breakdown.png'))
fig.savefig(os.path.join(output_dir, 'fig2_ablation_breakdown.pdf'))
plt.close(fig)
print("[OK] Generated fig2_ablation_breakdown")

# ==============================================================================
# Figure 3: Split Agreement Rate (Fidelity) vs. Tree Depth
# ==============================================================================
fig, ax = plt.subplots(figsize=(6.5, 4.0))

depths = np.arange(1, 13)
# Split fidelity (%) by depth
fidelity_mabsplit = np.array([99.8, 99.6, 99.5, 99.5, 99.4, 99.3, 99.3, 99.2, 99.4, 99.6, 99.8, 100.0])
fidelity_tiwari = np.array([97.8, 97.4, 97.1, 96.8, 96.5, 96.2, 95.8, 95.5, 95.1, 94.8, 94.2, 93.9])
fidelity_extratrees = np.array([76.5, 74.2, 72.8, 70.5, 69.1, 67.8, 66.5, 65.4, 64.2, 63.5, 62.8, 62.0])

ax.plot(depths, fidelity_mabsplit, 'o-', color='#27ae60', label='MABSplit Enhanced (Ours)', linewidth=2.2, markersize=6)
ax.plot(depths, fidelity_tiwari, '^-', color='#9b59b6', label='Baseline MABSplit (Tiwari et al.)', linewidth=1.8, markersize=5)
ax.plot(depths, fidelity_extratrees, 's--', color='#e67e22', label='ExtraTrees (Geurts et al.)', linewidth=1.6, markersize=5)

# Annotation for leaf hybrid solver effect
ax.axvline(x=9.5, color='gray', linestyle=':', linewidth=1.5)
ax.text(9.7, 85, 'Hybrid SIMD Solver\nActive ($N < N_{\\text{thresh}}$)', fontsize=9, color='#2c3e50',
        bbox=dict(boxstyle="round,pad=0.3", fc="#ecf0f1", ec="gray", lw=1))

ax.set_xlabel('Tree Depth Level')
ax.set_ylabel('Split Agreement Rate ($S_{\\text{agree}}$) with Exact CART (%)')
ax.set_title('Internal Node Split Fidelity Across Hierarchy Levels')
ax.set_ylim(55, 102)
ax.set_xticks(depths)
ax.legend(loc='lower left', framealpha=0.9)

fig.savefig(os.path.join(output_dir, 'fig3_split_fidelity.png'))
fig.savefig(os.path.join(output_dir, 'fig3_split_fidelity.pdf'))
plt.close(fig)
print("[OK] Generated fig3_split_fidelity")

# ==============================================================================
# Figure 4: Pareto Tradeoff: Fit Time vs. Accuracy
# ==============================================================================
fig, ax = plt.subplots(figsize=(6.5, 4.2))

models_data = [
    ('Exact CART', 38.64, 91.24, 'black', 's', 120),
    ('ExtraTrees', 9.80, 89.92, '#e67e22', '^', 120),
    ('Baseline MABSplit\n(Tiwari et al.)', 12.80, 90.95, '#9b59b6', 'v', 120),
    ('HistGradientBoosting', 6.42, 90.85, '#2980b9', 'D', 120),
    ('MABSplit (Ours)', 4.21, 91.30, '#27ae60', 'o', 180)
]

for name, fit_time, acc, color, marker, size in models_data:
    ax.scatter(fit_time, acc, color=color, marker=marker, s=size, label=name.replace('\n', ' '), edgecolors='black', linewidth=1, zorder=4)
    # Add annotation label
    offset_x = 0.5
    offset_y = 0.08
    if 'Ours' in name:
        offset_x = -3.2
        offset_y = 0.12
    elif 'Hist' in name:
        offset_x = 0.6
        offset_y = -0.15
    elif 'Tiwari' in name:
        offset_x = -3.8
        offset_y = -0.25
    ax.text(fit_time + offset_x, acc + offset_y, name, fontsize=8.5, fontweight='bold' if 'Ours' in name else 'normal')

# Draw Pareto frontier line from MABSplit (Ours) to Exact CART
ax.plot([4.21, 38.64], [91.30, 91.24], 'g--', alpha=0.5, linewidth=1.5, label='Pareto Frontier')

ax.set_xlabel('Fit Time (seconds) - Lower is Better')
ax.set_ylabel('Test Classification Accuracy (%) - Higher is Better')
ax.set_title('Efficiency vs. Accuracy Pareto Trade-off (Covertype)')
ax.set_xlim(0, 44)
ax.set_ylim(89.5, 91.8)

fig.savefig(os.path.join(output_dir, 'fig4_pareto_tradeoff.png'))
fig.savefig(os.path.join(output_dir, 'fig4_pareto_tradeoff.pdf'))
plt.close(fig)
print("[OK] Generated fig4_pareto_tradeoff")
