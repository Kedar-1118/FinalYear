"""
MABSplit++ Tree SVG Generator
Generates publication-quality, standalone SVG tree diagrams for each JSON file
in visualization/data/:
  1. adult_analysis.svg
  2. covertype_analysis.svg
  3. higgs_analysis.svg
  4. synthetic_analysis.svg
  5. benchmark_summary.svg
"""

import os
import json
import html

NODE_WIDTH = 220
NODE_HEIGHT = 112
GAP_X = 40
LEVEL_HEIGHT = 180
MARGIN_LEFT = 80
MARGIN_TOP = 170

# Color palette for classes (up to 7 classes)
CLASS_COLORS = [
    '#38bdf8',  # sky blue
    '#34d399',  # emerald green
    '#f59e0b',  # amber
    '#ec4899',  # pink
    '#a78bfa',  # purple
    '#06b6d4',  # cyan
    '#f87171',  # red
]

def escape(text):
    return html.escape(str(text))

def compute_tree_layout(node, depth=0, state=None):
    if state is None:
        state = {'leaf_count': 0}
    if not node:
        return
    
    is_leaf = node.get('is_leaf') or (not node.get('left') and not node.get('right'))
    if is_leaf:
        node['x'] = state['leaf_count'] * (NODE_WIDTH + GAP_X) + NODE_WIDTH / 2 + MARGIN_LEFT
        node['y'] = depth * LEVEL_HEIGHT + MARGIN_TOP
        state['leaf_count'] += 1
    else:
        if node.get('left'):
            compute_tree_layout(node['left'], depth + 1, state)
        if node.get('right'):
            compute_tree_layout(node['right'], depth + 1, state)
        left_x = node['left']['x'] if node.get('left') else 0
        right_x = node['right']['x'] if node.get('right') else left_x
        node['x'] = (left_x + right_x) / 2
        node['y'] = depth * LEVEL_HEIGHT + MARGIN_TOP

def render_links(node, links_svg):
    if not node:
        return
    
    left = node.get('left')
    right = node.get('right')
    
    if left or right:
        startX = node['x']
        startY = node['y'] + NODE_HEIGHT / 2
        
        for idx, child in enumerate([left, right]):
            if not child:
                continue
            endX = child['x']
            endY = child['y'] - NODE_HEIGHT / 2
            
            c1X = startX
            c1Y = startY + LEVEL_HEIGHT / 2.3
            c2X = endX
            c2Y = endY - LEVEL_HEIGHT / 2.3
            
            stroke_color = '#06b6d4' if idx == 0 else '#a855f7'
            tag_text = 'YES (≤)' if idx == 0 else 'NO (>)'
            tag_fill = '#083344' if idx == 0 else '#3b0764'
            tag_border = '#06b6d4' if idx == 0 else '#a855f7'
            
            midX = (startX + endX) / 2 + (-26 if idx == 0 else 10)
            midY = (startY + endY) / 2
            
            # Bezier link
            links_svg.append(
                f'<path d="M {startX:.1f} {startY:.1f} C {c1X:.1f} {c1Y:.1f}, {c2X:.1f} {c2Y:.1f}, {endX:.1f} {endY:.1f}" '
                f'stroke="{stroke_color}" stroke-width="2.5" stroke-opacity="0.55" fill="none" stroke-linecap="round"/>'
            )
            
            # Tag pill
            tag_w = 46
            tag_h = 18
            links_svg.append(
                f'<g transform="translate({midX:.1f}, {midY - 9:.1f})">'
                f'<rect width="{tag_w}" height="{tag_h}" rx="5" fill="{tag_fill}" stroke="{tag_border}" stroke-width="1.2" stroke-opacity="0.8"/>'
                f'<text x="{tag_w/2}" y="12.5" font-family="monospace" font-size="9px" font-weight="bold" fill="{tag_border}" text-anchor="middle">{tag_text}</text>'
                f'</g>'
            )
            
            render_links(child, links_svg)

def render_nodes(node, class_names, nodes_svg):
    if not node:
        return
    
    is_leaf = node.get('is_leaf') or (not node.get('left') and not node.get('right'))
    depth = node.get('depth', 0)
    
    # Check if this is a "Final Split" (split directly above leaves)
    left_is_leaf = bool(node.get('left') and (node['left'].get('is_leaf') or not node['left'].get('left')))
    right_is_leaf = bool(node.get('right') and (node['right'].get('is_leaf') or not node['right'].get('right')))
    is_final_split = not is_leaf and (left_is_leaf or right_is_leaf)
    
    x = node['x'] - NODE_WIDTH / 2
    y = node['y'] - NODE_HEIGHT / 2
    
    # Determine color styles
    if is_leaf:
        border_color = '#10b981'
        border_width = '2.2'
        bg_fill = 'url(#leafGrad)'
        badge_text = '🌿 LEAF'
        badge_color = '#10b981'
        badge_bg = 'rgba(16, 185, 129, 0.15)'
    elif is_final_split:
        border_color = '#f59e0b'
        border_width = '2.2'
        bg_fill = 'url(#finalSplitGrad)'
        badge_text = 'FINAL SPLIT'
        badge_color = '#f59e0b'
        badge_bg = 'rgba(245, 158, 11, 0.15)'
    elif node.get('solver_mode') == 'mab':
        border_color = '#a855f7'
        border_width = '1.8'
        bg_fill = 'url(#mabGrad)'
        badge_text = '⚡ MAB'
        badge_color = '#c084fc'
        badge_bg = 'rgba(168, 85, 247, 0.15)'
    else:
        border_color = '#06b6d4'
        border_width = '1.8'
        bg_fill = 'url(#exactGrad)'
        badge_text = 'EXACT'
        badge_color = '#22d3ee'
        badge_bg = 'rgba(6, 182, 212, 0.15)'
    
    node_markup = [f'<g class="tree-node" transform="translate({x:.1f}, {y:.1f})">']
    
    # Background card
    node_markup.append(
        f'<rect width="{NODE_WIDTH}" height="{NODE_HEIGHT}" rx="10" fill="{bg_fill}" stroke="{border_color}" stroke-width="{border_width}" filter="url(#dropShadow)"/>'
    )
    
    # Node header
    node_id = node.get('node_id', '?')
    node_markup.append(
        f'<text x="12" y="22" font-family="system-ui, sans-serif" font-size="11px" font-weight="600" fill="#94a3b8">'
        f'Node #{node_id} · D{depth}'
        f'</text>'
    )
    
    # Badge (Top Right)
    badge_w = 64 if len(badge_text) > 6 else 48
    badge_x = NODE_WIDTH - badge_w - 10
    node_markup.append(
        f'<rect x="{badge_x}" y="10" width="{badge_w}" height="17" rx="4" fill="{badge_bg}" stroke="{badge_color}" stroke-width="1"/>'
        f'<text x="{badge_x + badge_w/2}" y="22" font-family="system-ui, sans-serif" font-size="9.5px" font-weight="bold" fill="{badge_color}" text-anchor="middle">{badge_text}</text>'
    )
    
    # Rule text or Prediction
    if is_leaf:
        pred_class = escape(node.get('predicted_class', 'Class'))
        if len(pred_class) > 18:
            pred_class = pred_class[:16] + '…'
        node_markup.append(
            f'<text x="12" y="47" font-family="monospace" font-size="12px" font-weight="bold" fill="#34d399">'
            f'Pred: {pred_class}'
            f'</text>'
        )
    else:
        feat = escape(node.get('feature_name', 'Feature'))
        thresh = node.get('threshold', 0.0)
        thresh_str = f"{thresh:.2f}" if isinstance(thresh, float) else str(thresh)
        rule_str = f"{feat} ≤ {thresh_str}"
        if len(rule_str) > 22:
            rule_str = rule_str[:20] + '…'
        node_markup.append(
            f'<text x="12" y="47" font-family="monospace" font-size="12px" font-weight="bold" fill="#f8fafc">'
            f'{rule_str}'
            f'</text>'
        )
    
    # Sub-statistics
    samples = node.get('samples', 0)
    gini = node.get('gini', 0.0)
    gini_gain = node.get('gini_gain', 0.0)
    if is_leaf:
        probs = node.get('probabilities', [])
        max_prob = max(probs) * 100 if probs else 100.0
        stats_text = f"N = {samples:,} · Conf: {max_prob:.1f}%"
    else:
        stats_text = f"N = {samples:,} · Gini: {gini:.3f}"
        if gini_gain and gini_gain > 0.001:
            stats_text += f" (+{gini_gain:.3f})"
    
    node_markup.append(
        f'<text x="12" y="68" font-family="system-ui, sans-serif" font-size="10.5px" fill="#cbd5e1">'
        f'{stats_text}'
        f'</text>'
    )
    
    # Mini Class Distribution Bar
    class_counts = node.get('class_counts', [])
    if class_counts and sum(class_counts) > 0:
        bar_x = 12
        bar_y = 82
        bar_w = NODE_WIDTH - 24
        bar_h = 12
        total_s = max(1, sum(class_counts))
        
        # Bar background
        node_markup.append(
            f'<rect x="{bar_x}" y="{bar_y}" width="{bar_w}" height="{bar_h}" rx="3" fill="#0f172a" stroke="#334155" stroke-width="0.8"/>'
        )
        
        cur_x = bar_x
        for c_idx, count in enumerate(class_counts):
            seg_w = (count / total_s) * bar_w
            if seg_w > 0.5:
                color = CLASS_COLORS[c_idx % len(CLASS_COLORS)]
                node_markup.append(
                    f'<rect x="{cur_x:.1f}" y="{bar_y:.1f}" width="{seg_w:.1f}" height="{bar_h}" fill="{color}" opacity="0.9"/>'
                )
                cur_x += seg_w
        
        # Percentage indicator on the bar
        if len(class_counts) == 2 and total_s > 0:
            p0 = (class_counts[0] / total_s) * 100
            node_markup.append(
                f'<text x="{bar_x + 4}" y="{bar_y + 9}" font-family="monospace" font-size="8.5px" font-weight="bold" fill="#0f172a">{p0:.0f}%</text>'
                f'<text x="{bar_x + bar_w - 4}" y="{bar_y + 9}" font-family="monospace" font-size="8.5px" font-weight="bold" fill="#0f172a" text-anchor="end">{100-p0:.0f}%</text>'
            )
    
    node_markup.append('</g>')
    nodes_svg.append(''.join(node_markup))
    
    if node.get('left'):
        render_nodes(node['left'], class_names, nodes_svg)
    if node.get('right'):
        render_nodes(node['right'], class_names, nodes_svg)

def generate_tree_svg(data, output_path):
    root = data['tree_hierarchy']
    dataset_name = data.get('dataset_name', 'Dataset')
    perf = data.get('performance', {})
    class_names = data.get('class_names', ['Class 0', 'Class 1'])
    top_features = data.get('top_features', {}).get('top_3', [])
    
    # 1. Compute layout
    state = {'leaf_count': 0}
    compute_tree_layout(root, depth=0, state=state)
    
    leaf_count = state['leaf_count']
    total_width = leaf_count * (NODE_WIDTH + GAP_X) + 2 * MARGIN_LEFT
    total_depth = perf.get('tree_depth', 5)
    total_height = (total_depth + 1) * LEVEL_HEIGHT + MARGIN_TOP + 80
    
    # 2. Render links and nodes
    links_svg = []
    render_links(root, links_svg)
    
    nodes_svg = []
    render_nodes(root, class_names, nodes_svg)
    
    # Class colors legend items
    class_legend_items = []
    for c_idx, c_name in enumerate(class_names[:7]):
        col = CLASS_COLORS[c_idx % len(CLASS_COLORS)]
        class_legend_items.append(
            f'<rect width="10" height="10" rx="2" fill="{col}"/>'
            f'<text x="14" y="9" font-family="system-ui, sans-serif" font-size="11px" fill="#cbd5e1">{escape(c_name)}</text>'
        )
    
    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {total_width} {total_height}" width="100%" height="100%" style="background-color: #0b0f19;">
  <defs>
    <!-- Background Gradients -->
    <linearGradient id="headerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e293b" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#0f172a" stop-opacity="0.95"/>
    </linearGradient>
    <linearGradient id="mabGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1e1b4b" stop-opacity="0.92"/>
      <stop offset="100%" stop-color="#0f172a" stop-opacity="0.96"/>
    </linearGradient>
    <linearGradient id="exactGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#082f49" stop-opacity="0.92"/>
      <stop offset="100%" stop-color="#0f172a" stop-opacity="0.96"/>
    </linearGradient>
    <linearGradient id="finalSplitGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#451a03" stop-opacity="0.90"/>
      <stop offset="100%" stop-color="#0f172a" stop-opacity="0.96"/>
    </linearGradient>
    <linearGradient id="leafGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#064e3b" stop-opacity="0.88"/>
      <stop offset="100%" stop-color="#0f172a" stop-opacity="0.96"/>
    </linearGradient>
    
    <!-- Drop Shadow Filter -->
    <filter id="dropShadow" x="-10%" y="-10%" width="125%" height="125%">
      <feDropShadow dx="0" dy="8" stdDeviation="8" flood-color="#000000" flood-opacity="0.45"/>
    </filter>
  </defs>

  <style>
    text {{ user-select: none; }}
    .tree-node {{ transition: transform 0.2s ease; }}
    .tree-node:hover {{ cursor: pointer; }}
    .kpi-title {{ font-size: 11px; fill: #64748b; text-transform: uppercase; letter-spacing: 0.05em; font-family: system-ui, sans-serif; font-weight: 600; }}
    .kpi-value {{ font-size: 16px; fill: #f8fafc; font-weight: 800; font-family: system-ui, sans-serif; }}
  </style>

  <!-- Background blueprint grid pattern -->
  <g opacity="0.04" stroke="#38bdf8" stroke-width="1">
    {' '.join(f'<line x1="{x}" y1="0" x2="{x}" y2="{total_height}"/>' for x in range(0, int(total_width), 80))}
    {' '.join(f'<line x1="0" y1="{y}" x2="{total_width}" y2="{y}"/>' for y in range(0, int(total_height), 80))}
  </g>

  <!-- Header Banner -->
  <g transform="translate(40, 24)">
    <rect width="{total_width - 80}" height="100" rx="14" fill="url(#headerGrad)" stroke="#1e293b" stroke-width="1.5" filter="url(#dropShadow)"/>
    
    <!-- Title and Subtitle -->
    <text x="24" y="40" font-family="system-ui, sans-serif" font-size="24px" font-weight="800" fill="#f8fafc">
      {escape(dataset_name)} <tspan fill="#38bdf8">— MABSplit++ Decision Tree</tspan>
    </text>
    <text x="24" y="66" font-family="system-ui, sans-serif" font-size="12.5px" fill="#94a3b8">
      Top Discriminant Features: <tspan fill="#38bdf8" font-weight="600">{escape(', '.join(top_features))}</tspan> · Depth: {perf.get('tree_depth', 5)} · Classes: {len(class_names)}
    </text>
    
    <!-- KPI Badge 1: Sample Reduction -->
    <g transform="translate({total_width - 560}, 22)">
      <rect width="130" height="56" rx="8" fill="#1e293b" stroke="rgba(56,189,248,0.25)" stroke-width="1"/>
      <text x="14" y="22" class="kpi-title">Query Reduction</text>
      <text x="14" y="44" class="kpi-value" fill="#34d399">{perf.get('sample_evaluation_reduction_pct', 0)}%</text>
    </g>
    
    <!-- KPI Badge 2: Nodes & Splits -->
    <g transform="translate({total_width - 410}, 22)">
      <rect width="130" height="56" rx="8" fill="#1e293b" stroke="rgba(168,85,247,0.25)" stroke-width="1"/>
      <text x="14" y="22" class="kpi-title">Tree Structure</text>
      <text x="14" y="44" class="kpi-value" fill="#a78bfa">{perf.get('total_nodes', 0)} Nodes</text>
    </g>
    
    <!-- KPI Badge 3: Solver Splits -->
    <g transform="translate({total_width - 260}, 22)">
      <rect width="140" height="56" rx="8" fill="#1e293b" stroke="rgba(245,158,11,0.25)" stroke-width="1"/>
      <text x="14" y="22" class="kpi-title">Solver Modes</text>
      <text x="14" y="44" class="kpi-value" fill="#fbbf24">{perf.get('splits_by_mode', {}).get('mab', 0)} MAB / {perf.get('splits_by_mode', {}).get('exact', 0)} Exact</text>
    </g>
  </g>

  <!-- Legend Bar -->
  <g transform="translate(40, 134)">
    <!-- MAB Split -->
    <g transform="translate(0, 0)">
      <rect width="14" height="14" rx="3" fill="#1e1b4b" stroke="#a855f7" stroke-width="1.5"/>
      <text x="20" y="11" font-family="system-ui, sans-serif" font-size="11.5px" fill="#cbd5e1">⚡ MAB Node</text>
    </g>
    <!-- Exact Split -->
    <g transform="translate(130, 0)">
      <rect width="14" height="14" rx="3" fill="#082f49" stroke="#06b6d4" stroke-width="1.5"/>
      <text x="20" y="11" font-family="system-ui, sans-serif" font-size="11.5px" fill="#cbd5e1">⚙️ Exact Node</text>
    </g>
    <!-- Final Split -->
    <g transform="translate(260, 0)">
      <rect width="14" height="14" rx="3" fill="#451a03" stroke="#f59e0b" stroke-width="1.5"/>
      <text x="20" y="11" font-family="system-ui, sans-serif" font-size="11.5px" fill="#cbd5e1">🔶 Final Split (Leaf Parent)</text>
    </g>
    <!-- Leaf -->
    <g transform="translate(450, 0)">
      <rect width="14" height="14" rx="3" fill="#064e3b" stroke="#10b981" stroke-width="1.5"/>
      <text x="20" y="11" font-family="system-ui, sans-serif" font-size="11.5px" fill="#cbd5e1">🌿 Leaf Node</text>
    </g>
    <!-- Class Labels -->
    <g transform="translate(600, 0)">
      <text x="0" y="11" font-family="system-ui, sans-serif" font-size="11.5px" font-weight="bold" fill="#64748b">Classes:</text>
      {' '.join(f'<g transform="translate({60 + i * 140}, 0)">{item}</g>' for i, item in enumerate(class_legend_items))}
    </g>
  </g>

  <!-- Branch Links Group -->
  <g id="tree-links">
    {''.join(links_svg)}
  </g>

  <!-- Tree Nodes Group -->
  <g id="tree-nodes">
    {''.join(nodes_svg)}
  </g>

</svg>"""

    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(svg)
    print(f">> [Generated] {output_path} ({total_width}x{total_height}px, {len(nodes_svg)} nodes)")

def generate_benchmark_summary_svg(summary_data, output_path):
    """Generates an executive quad-tree summary SVG comparing all 4 datasets."""
    width = 1600
    height = 980
    
    datasets = ['adult', 'covertype', 'higgs', 'synthetic']
    card_w = 740
    card_h = 390
    positions = [
        (40, 130),
        (820, 130),
        (40, 550),
        (820, 550)
    ]
    
    cards_svg = []
    for idx, key in enumerate(datasets):
        d = summary_data.get(key, {})
        posX, posY = positions[idx]
        name = d.get('dataset_name', key.title())
        n_samples = d.get('n_samples', 0)
        n_features = d.get('n_features', 0)
        n_classes = d.get('n_classes', 0)
        perf = d.get('performance', {})
        root_split = d.get('root_split', {})
        top_feats = d.get('top_features', {}).get('top_5', [])
        
        # Color accent
        acc_colors = ['#38bdf8', '#34d399', '#a78bfa', '#f59e0b']
        color = acc_colors[idx % len(acc_colors)]
        
        cards_svg.append(f"""
        <g transform="translate({posX}, {posY})">
          <!-- Card Background -->
          <rect width="{card_w}" height="{card_h}" rx="16" fill="#131b2e" stroke="{color}" stroke-width="1.5" stroke-opacity="0.4" filter="url(#cardShadow)"/>
          
          <!-- Card Header -->
          <rect width="{card_w}" height="56" rx="16" fill="rgba(255,255,255,0.02)"/>
          <text x="24" y="36" font-family="system-ui, sans-serif" font-size="18px" font-weight="bold" fill="#f8fafc">
            {escape(name)}
          </text>
          
          <!-- Metadata Pill -->
          <g transform="translate({card_w - 220}, 16)">
            <rect width="200" height="24" rx="12" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)"/>
            <text x="100" y="16" font-family="system-ui, sans-serif" font-size="11px" fill="#94a3b8" text-anchor="middle">
              {n_samples:,} Rows · {n_features} Feat · {n_classes} Classes
            </text>
          </g>
          
          <!-- KPI Metrics Row -->
          <g transform="translate(24, 76)">
            <!-- Speedup -->
            <rect width="150" height="64" rx="8" fill="#1e293b" stroke="rgba(56,189,248,0.2)"/>
            <text x="14" y="24" font-family="system-ui, sans-serif" font-size="10.5px" fill="#64748b" font-weight="600" text-transform="uppercase">Query Reduction</text>
            <text x="14" y="50" font-family="system-ui, sans-serif" font-size="20px" font-weight="bold" fill="#34d399">{perf.get('sample_evaluation_reduction_pct', 0)}%</text>
            
            <!-- Nodes -->
            <g transform="translate(165, 0)">
              <rect width="150" height="64" rx="8" fill="#1e293b" stroke="rgba(168,85,247,0.2)"/>
              <text x="14" y="24" font-family="system-ui, sans-serif" font-size="10.5px" fill="#64748b" font-weight="600" text-transform="uppercase">Tree Depth / Nodes</text>
              <text x="14" y="50" font-family="system-ui, sans-serif" font-size="20px" font-weight="bold" fill="#a78bfa">D{perf.get('tree_depth', 5)} · {perf.get('total_nodes', 0)} Nodes</text>
            </g>
            
            <!-- Splits -->
            <g transform="translate(330, 0)">
              <rect width="180" height="64" rx="8" fill="#1e293b" stroke="rgba(245,158,11,0.2)"/>
              <text x="14" y="24" font-family="system-ui, sans-serif" font-size="10.5px" fill="#64748b" font-weight="600" text-transform="uppercase">Splits (MAB / Exact)</text>
              <text x="14" y="50" font-family="system-ui, sans-serif" font-size="20px" font-weight="bold" fill="#fbbf24">{perf.get('splits_by_mode', {}).get('mab', 0)} MAB / {perf.get('splits_by_mode', {}).get('exact', 0)} Exact</text>
            </g>
            
            <!-- Evaluated Samples -->
            <g transform="translate(525, 0)">
              <rect width="165" height="64" rx="8" fill="#1e293b" stroke="rgba(52,211,153,0.2)"/>
              <text x="14" y="24" font-family="system-ui, sans-serif" font-size="10.5px" fill="#64748b" font-weight="600" text-transform="uppercase">Samples Inspected</text>
              <text x="14" y="50" font-family="system-ui, sans-serif" font-size="17px" font-weight="bold" fill="#38bdf8">{perf.get('samples_evaluated', 0):,}</text>
            </g>
          </g>
          
          <!-- Root Split Diagram Mockup -->
          <g transform="translate(24, 160)">
            <text x="0" y="0" font-family="system-ui, sans-serif" font-size="12px" font-weight="bold" fill="#94a3b8">ROOT NODE SPLIT ARCHITECTURE:</text>
            
            <!-- Root Box -->
            <g transform="translate(240, 20)">
              <rect width="210" height="70" rx="8" fill="#1e1b4b" stroke="#a855f7" stroke-width="1.8"/>
              <text x="12" y="20" font-family="system-ui, sans-serif" font-size="10px" fill="#c084fc" font-weight="bold">⚡ ROOT NODE #0</text>
              <text x="12" y="42" font-family="monospace" font-size="12px" font-weight="bold" fill="#f8fafc">{escape(root_split.get('feature_name', 'Feature'))} ≤ {root_split.get('threshold', 0):.2f}</text>
              <text x="12" y="58" font-family="system-ui, sans-serif" font-size="10px" fill="#94a3b8">Gini: {root_split.get('gini', 0):.4f} · Gain: +{root_split.get('gini_gain', 0):.4f}</text>
            </g>
            
            <!-- Left Branch Line -->
            <path d="M 290 90 L 140 130" stroke="#06b6d4" stroke-width="2" fill="none"/>
            <text x="180" y="105" font-family="monospace" font-size="9px" fill="#06b6d4" font-weight="bold">YES (≤)</text>
            
            <!-- Left Child -->
            <g transform="translate(40, 130)">
              <rect width="190" height="50" rx="6" fill="#082f49" stroke="#06b6d4" stroke-width="1.2"/>
              <text x="10" y="20" font-family="system-ui, sans-serif" font-size="9.5px" fill="#22d3ee">LEFT BRANCH SUBTREE</text>
              <text x="10" y="38" font-family="monospace" font-size="11px" fill="#f8fafc">{root_split.get('left_samples', 0):,} samples ({escape(root_split.get('left_pred', 'Pred'))})</text>
            </g>
            
            <!-- Right Branch Line -->
            <path d="M 400 90 L 550 130" stroke="#a855f7" stroke-width="2" fill="none"/>
            <text x="470" y="105" font-family="monospace" font-size="9px" fill="#a855f7" font-weight="bold">NO (&gt;)</text>
            
            <!-- Right Child -->
            <g transform="translate(460, 130)">
              <rect width="190" height="50" rx="6" fill="#2e1065" stroke="#a855f7" stroke-width="1.2"/>
              <text x="10" y="20" font-family="system-ui, sans-serif" font-size="9.5px" fill="#c084fc">RIGHT BRANCH SUBTREE</text>
              <text x="10" y="38" font-family="monospace" font-size="11px" fill="#f8fafc">{root_split.get('right_samples', 0):,} samples ({escape(root_split.get('right_pred', 'Pred'))})</text>
            </g>
          </g>
          
          <!-- Top Features Footer -->
          <g transform="translate(24, 360)">
            <text x="0" y="0" font-family="system-ui, sans-serif" font-size="11px" fill="#64748b" font-weight="bold">DOMINANT FEATURES:</text>
            <text x="130" y="0" font-family="monospace" font-size="11px" fill="{color}" font-weight="bold">{escape(', '.join(top_feats))}</text>
          </g>
        </g>
        """)

    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" width="100%" height="100%" style="background-color: #0b0f19;">
  <defs>
    <filter id="cardShadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="10" stdDeviation="12" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
  </defs>

  <!-- Header Banner -->
  <g transform="translate(40, 24)">
    <text x="0" y="36" font-family="system-ui, sans-serif" font-size="28px" font-weight="800" fill="#f8fafc">
      MABSplit++ Benchmark Suite <tspan fill="#38bdf8">— Multi-Dataset Tree Architectures</tspan>
    </text>
    <text x="0" y="64" font-family="system-ui, sans-serif" font-size="14px" fill="#94a3b8">
      Executive Tree Split Comparison &amp; Sample Efficiency across 4 Benchmark Tabular Datasets
    </text>
  </g>

  <!-- 4 Dataset Summary Cards -->
  {''.join(cards_svg)}

</svg>"""

    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(svg)
    print(f">> [Generated] {output_path} ({width}x{height}px, 4 datasets)")

def main():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    data_dir = os.path.join(base_dir, "visualization", "data")
    output_trees_dir = os.path.join(base_dir, "visualization", "trees")
    os.makedirs(output_trees_dir, exist_ok=True)
    
    # 1. Generate trees for the 4 individual analysis datasets
    analysis_files = [
        ("adult_analysis.json", "adult_analysis.svg", "adult_tree.svg"),
        ("covertype_analysis.json", "covertype_analysis.svg", "covertype_tree.svg"),
        ("higgs_analysis.json", "higgs_analysis.svg", "higgs_tree.svg"),
        ("synthetic_analysis.json", "synthetic_analysis.svg", "synthetic_tree.svg"),
    ]
    
    for json_name, svg_name, alias_name in analysis_files:
        json_path = os.path.join(data_dir, json_name)
        if os.path.exists(json_path):
            with open(json_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            # Save in visualization/data/ (direct match with json filename)
            out1 = os.path.join(data_dir, svg_name)
            generate_tree_svg(data, out1)
            
            # Also save in visualization/trees/
            out2 = os.path.join(output_trees_dir, svg_name)
            out3 = os.path.join(output_trees_dir, alias_name)
            with open(out1, 'r', encoding='utf-8') as src:
                content = src.read()
            with open(out2, 'w', encoding='utf-8') as dst:
                dst.write(content)
            with open(out3, 'w', encoding='utf-8') as dst:
                dst.write(content)
    
    # 2. Generate summary tree for benchmark_summary.json
    summary_json_path = os.path.join(data_dir, "benchmark_summary.json")
    if os.path.exists(summary_json_path):
        with open(summary_json_path, 'r', encoding='utf-8') as f:
            summary_data = json.load(f)
        
        out_summary1 = os.path.join(data_dir, "benchmark_summary.svg")
        generate_benchmark_summary_svg(summary_data, out_summary1)
        
        out_summary2 = os.path.join(output_trees_dir, "benchmark_summary.svg")
        with open(out_summary1, 'r', encoding='utf-8') as src:
            content = src.read()
        with open(out_summary2, 'w', encoding='utf-8') as dst:
            dst.write(content)

if __name__ == "__main__":
    main()
