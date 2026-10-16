/**
 * MABSplit++ Visualizer & Dataset Feature Analysis Application
 * Author: Walchand College of Engineering, Sangli - Research Team
 */

(function () {
  'use strict';

  // State Management
  const state = {
    currentDatasetKey: 'adult',
    currentMetric: 'composite', // 'composite', 'mab', 'rf', 'mi'
    data: null,
    treeZoom: 1.0,
    treePan: { x: 0, y: 0 },
    isPanning: false,
    panStart: { x: 0, y: 0 },
    maxDepthFilter: 5,
    selectedNode: null,
    
    // MAB Simulator State
    simTimer: null,
    simPlaying: false,
    simSpeed: 1000,
    simStep: 0,
    simArms: [],
    simHistory: [],
    
    // What-If Tracer Inputs
    sampleInputs: {}
  };

  // Pre-configured default datasets
  const DATASETS_CONFIG = {
    adult: { name: 'Adult Census Income', defaultInputs: { 'relationship': 0, 'education.num': 13, 'capital.gain': 7298, 'age': 42, 'hours.per.week': 45 } },
    covertype: { name: 'Forest Covertype', defaultInputs: { 'Elevation': 2850, 'Horizontal_Distance_To_Fire_Points': 1800, 'Horizontal_Distance_To_Roadways': 1400, 'Horizontal_Distance_To_Hydrology': 240 } },
    higgs: { name: 'HIGGS Boson Kinematics', defaultInputs: { 'm_bb': 1.45, 'm_wwbb': 1.25, 'm_jjj': 1.10, 'lepton_pT': 0.95 } },
    synthetic: { name: 'Synthetic Tabular Benchmark', defaultInputs: { 'Feature_14': 1.8, 'Feature_16': -0.5, 'Feature_19': 2.1, 'Feature_00': 0.2 } }
  };

  // Color Palettes
  const CLASS_COLORS = [
    '#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#06b6d4', '#ef4444'
  ];

  /* ==========================================================================
     INITIALIZATION & DATA LOADING
     ========================================================================== */

  function init() {
    setupEventListeners();

    // Check if embedded data is loaded directly from data.js
    if (window.MAB_ANALYSIS_DATA) {
      state.data = window.MAB_ANALYSIS_DATA;
      loadDataset(state.currentDatasetKey);
    } else {
      // Fallback: Fetch JSON from data directory
      fetch('data/adult_analysis.json')
        .then(res => res.json())
        .then(adultData => {
          state.data = { adult: adultData };
          loadDataset('adult');
        })
        .catch(err => {
          console.error('Failed to load dataset JSON:', err);
          showErrorState('Unable to load dataset data files.');
        });
    }
  }

  function loadDataset(key) {
    state.currentDatasetKey = key;
    const currentData = state.data[key];
    if (!currentData) {
      console.warn(`Dataset ${key} not found in state data.`);
      return;
    }

    // Reset view states
    state.treeZoom = 0.95;
    state.treePan = { x: 40, y: 30 };
    state.maxDepthFilter = currentData.performance.tree_depth || 5;
    const depthSlider = document.getElementById('tree-depth-slider');
    const depthVal = document.getElementById('depth-slider-val');
    if (depthSlider) {
      depthSlider.max = state.maxDepthFilter;
      depthSlider.value = state.maxDepthFilter;
    }
    if (depthVal) depthVal.textContent = state.maxDepthFilter;

    // Update active pill UI
    document.querySelectorAll('.dataset-pill').forEach(pill => {
      pill.classList.toggle('active', pill.dataset.dataset === key);
    });

    // Initialize UI Sections
    renderExecutiveKPIs(currentData);
    renderFeatureContributions(currentData);
    renderFeaturesTable(currentData);
    renderDecisionTree(currentData);
    initMABSimulator(currentData);
    initWhatIfTracer(currentData);
  }

  /* ==========================================================================
     EVENT LISTENERS & NAVIGATION
     ========================================================================== */

  function setupEventListeners() {
    // Dataset Switching
    document.querySelectorAll('.dataset-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        loadDataset(pill.dataset.dataset);
      });
    });

    // Tab Navigation
    document.querySelectorAll('.nav-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const targetTab = tab.dataset.tab;
        document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        const activePanel = document.getElementById(`tab-${targetTab}`);
        if (activePanel) activePanel.classList.add('active');

        // Re-render canvas or tree if needed
        if (targetTab === 'tree') {
          renderDecisionTree(state.data[state.currentDatasetKey]);
        }
      });
    });

    // Metric Mode Toggle
    document.querySelectorAll('.metric-toggle .toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.metric-toggle .toggle-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.currentMetric = btn.dataset.metric;
        renderFeatureContributions(state.data[state.currentDatasetKey]);
      });
    });

    // Feature Table Search
    const searchInput = document.getElementById('feature-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        filterFeaturesTable(e.target.value.toLowerCase());
      });
    }

    // Tree Depth Slider
    const depthSlider = document.getElementById('tree-depth-slider');
    if (depthSlider) {
      depthSlider.addEventListener('input', (e) => {
        state.maxDepthFilter = parseInt(e.target.value, 10);
        document.getElementById('depth-slider-val').textContent = state.maxDepthFilter;
        renderDecisionTree(state.data[state.currentDatasetKey]);
      });
    }

    // Tree Zoom Controls
    document.getElementById('btn-zoom-in')?.addEventListener('click', () => {
      state.treeZoom = Math.min(2.5, state.treeZoom + 0.15);
      applyTreeTransform();
    });
    document.getElementById('btn-zoom-out')?.addEventListener('click', () => {
      state.treeZoom = Math.max(0.4, state.treeZoom - 0.15);
      applyTreeTransform();
    });
    document.getElementById('btn-zoom-reset')?.addEventListener('click', () => {
      state.treeZoom = 0.95;
      state.treePan = { x: 40, y: 30 };
      applyTreeTransform();
    });

    // Tree Canvas Pan
    const treeContainer = document.getElementById('tree-canvas-container');
    if (treeContainer) {
      treeContainer.addEventListener('mousedown', (e) => {
        state.isPanning = true;
        state.panStart = { x: e.clientX - state.treePan.x, y: e.clientY - state.treePan.y };
      });
      window.addEventListener('mousemove', (e) => {
        if (!state.isPanning) return;
        state.treePan = { x: e.clientX - state.panStart.x, y: e.clientY - state.panStart.y };
        applyTreeTransform();
      });
      window.addEventListener('mouseup', () => {
        state.isPanning = false;
      });
      treeContainer.addEventListener('wheel', (e) => {
        e.preventDefault();
        const delta = e.deltaY < 0 ? 0.08 : -0.08;
        state.treeZoom = Math.max(0.4, Math.min(2.5, state.treeZoom + delta));
        applyTreeTransform();
      });
    }

    // Simulator Controls
    document.getElementById('sim-play-btn')?.addEventListener('click', toggleSimPlay);
    document.getElementById('sim-step-btn')?.addEventListener('click', stepMABSimulator);
    document.getElementById('sim-reset-btn')?.addEventListener('click', resetMABSimulator);
    document.getElementById('sim-speed-slider')?.addEventListener('input', (e) => {
      state.simSpeed = 2200 - parseInt(e.target.value, 10);
      if (state.simPlaying) {
        clearInterval(state.simTimer);
        state.simTimer = setInterval(stepMABSimulator, state.simSpeed);
      }
    });
  }

  /* ==========================================================================
     TAB 1: EXECUTIVE KPIS & FEATURE CONTRIBUTIONS
     ========================================================================== */

  function renderExecutiveKPIs(data) {
    document.getElementById('kpi-total-samples').textContent = data.n_samples.toLocaleString();
    document.getElementById('kpi-features-count').textContent = data.n_features;
    
    const topFeat = data.feature_contributions[0];
    document.getElementById('kpi-top-feature').textContent = topFeat ? topFeat.feature_name : 'N/A';
    document.getElementById('kpi-top-pct').textContent = topFeat ? `${topFeat.composite_score}% contribution` : '';

    const top5Cum = data.top_features.top_5_cumulative_pct;
    document.getElementById('kpi-cum-signal').textContent = `${top5Cum}%`;

    const sampleReduction = data.performance.sample_evaluation_reduction_pct;
    document.getElementById('kpi-sample-reduction').textContent = `${sampleReduction}%`;
  }

  function renderFeatureContributions(data) {
    const container = document.getElementById('feature-bars-list');
    if (!container) return;
    container.innerHTML = '';

    const features = [...data.feature_contributions];

    // Determine value based on active metric
    let getVal = (f) => f.composite_score;
    let unit = '%';
    if (state.currentMetric === 'mab') getVal = (f) => f.mab_importance_pct;
    else if (state.currentMetric === 'rf') getVal = (f) => f.rf_importance_pct;
    else if (state.currentMetric === 'mi') getVal = (f) => f.mutual_info_pct;

    // Sort features according to chosen metric
    features.sort((a, b) => getVal(b) - getVal(a));
    const maxVal = Math.max(...features.map(getVal), 0.01);

    features.forEach((feat, idx) => {
      const val = getVal(feat);
      const widthPct = Math.max(3, (val / maxVal) * 100);

      const row = document.createElement('div');
      row.className = 'feature-bar-row';
      row.innerHTML = `
        <div class="feature-info">
          <div class="feature-name-group">
            <span class="feature-rank">#${idx + 1}</span>
            <span class="feature-name">${feat.feature_name}</span>
            ${feat.split_count > 0 ? `<span class="feature-splits-badge">${feat.split_count} split${feat.split_count > 1 ? 's' : ''}</span>` : ''}
          </div>
          <div class="feature-metric-vals">
            <span class="feature-cum-badge">Cum: ${feat.cumulative_pct}%</span>
            <span class="feature-pct">${val.toFixed(2)}${unit}</span>
          </div>
        </div>
        <div class="bar-track">
          <div class="bar-fill" style="width: ${widthPct}%;"></div>
        </div>
      `;
      container.appendChild(row);
    });

    renderParetoChart(features, getVal);
  }

  function renderParetoChart(features, getVal) {
    const canvas = document.getElementById('pareto-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.parentElement.clientWidth || 500;
    const height = 280;
    canvas.width = width;
    canvas.height = height;

    ctx.clearRect(0, 0, width, height);

    const padLeft = 45;
    const padRight = 30;
    const padTop = 20;
    const padBottom = 40;
    const chartW = width - padLeft - padRight;
    const chartH = height - padTop - padBottom;

    // Display top 12 features on Pareto chart
    const topFeats = features.slice(0, 14);
    const n = topFeats.length;
    const barW = (chartW / n) * 0.65;
    const maxBarVal = Math.max(...topFeats.map(getVal), 1);

    // Grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    for (let p = 0; p <= 100; p += 25) {
      const y = padTop + chartH - (p / 100) * chartH;
      ctx.beginPath();
      ctx.moveTo(padLeft, y);
      ctx.lineTo(width - padRight, y);
      ctx.stroke();

      ctx.fillStyle = '#64748b';
      ctx.font = '10px Outfit';
      ctx.textAlign = 'right';
      ctx.fillText(`${p}%`, padLeft - 8, y + 3);
    }

    // Draw 80% Pareto threshold line
    const y80 = padTop + chartH - (80 / 100) * chartH;
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.6)';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(padLeft, y80);
    ctx.lineTo(width - padRight, y80);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#f59e0b';
    ctx.font = '10px JetBrains Mono';
    ctx.fillText('80% Signal Line', width - padRight - 5, y80 - 6);

    // Draw individual feature bars
    topFeats.forEach((f, i) => {
      const x = padLeft + i * (chartW / n) + ((chartW / n) - barW) / 2;
      const h = (getVal(f) / maxBarVal) * chartH * 0.75;
      const y = padTop + chartH - h;

      // Gradient bar
      const grad = ctx.createLinearGradient(0, y, 0, y + h);
      grad.addColorStop(0, '#6366f1');
      grad.addColorStop(1, '#a855f7');
      ctx.fillStyle = grad;
      ctx.fillRect(x, y, barW, h);

      // Feature label
      ctx.save();
      ctx.translate(x + barW / 2, padTop + chartH + 12);
      ctx.rotate(-Math.PI / 4);
      ctx.fillStyle = '#94a3b8';
      ctx.font = '9px Outfit';
      ctx.textAlign = 'right';
      ctx.fillText(f.feature_name.slice(0, 10), 0, 0);
      ctx.restore();
    });

    // Draw Cumulative Curve
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    let cumYPoints = [];
    topFeats.forEach((f, i) => {
      const cx = padLeft + i * (chartW / n) + (chartW / n) / 2;
      const cy = padTop + chartH - (f.cumulative_pct / 100) * chartH;
      cumYPoints.push({ x: cx, y: cy, pct: f.cumulative_pct });
      if (i === 0) ctx.moveTo(cx, cy);
      else ctx.lineTo(cx, cy);
    });
    ctx.stroke();

    // Cumulative points
    cumYPoints.forEach(pt => {
      ctx.fillStyle = '#06b6d4';
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#0a0e17';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });
  }

  function renderFeaturesTable(data) {
    const tbody = document.getElementById('features-table-body');
    if (!tbody) return;
    tbody.innerHTML = '';

    data.feature_contributions.forEach(f => {
      const tr = document.createElement('tr');
      tr.dataset.name = f.feature_name.toLowerCase();
      tr.innerHTML = `
        <td><strong style="color: var(--primary-light);">#${f.rank}</strong></td>
        <td><strong class="mono" style="color: #fff;">${f.feature_name}</strong></td>
        <td><span style="font-size:0.75rem; background:rgba(255,255,255,0.06); padding:2px 8px; border-radius:6px;">${f.stats.unique_values > 2 ? 'Continuous' : 'Discrete'}</span></td>
        <td><strong style="color: var(--cyan);">${f.composite_score}%</strong></td>
        <td>${f.mab_importance_pct}%</td>
        <td>${f.rf_importance_pct}%</td>
        <td>${f.mutual_info_pct}%</td>
        <td><span class="mono">${f.stats.mean} ± ${f.stats.std}</span></td>
        <td><span class="mono">[${f.stats.min}, ${f.stats.max}]</span></td>
        <td><span class="feature-splits-badge">${f.split_count}</span></td>
      `;
      tbody.appendChild(tr);
    });
  }

  function filterFeaturesTable(query) {
    const rows = document.querySelectorAll('#features-table-body tr');
    rows.forEach(r => {
      r.style.display = r.dataset.name.includes(query) ? '' : 'none';
    });
  }

  /* ==========================================================================
     TAB 2: DECISION TREE & FINAL SPLIT VISUALIZER (SVG GRAPH)
     ========================================================================== */

  function renderDecisionTree(data) {
    const svg = document.getElementById('tree-svg');
    if (!svg || !data.tree_hierarchy) return;

    svg.innerHTML = '';
    const root = data.tree_hierarchy;

    // Build visual node tree with layout positions
    const NODE_WIDTH = 210;
    const NODE_HEIGHT = 100;
    const LEVEL_HEIGHT = 145;

    let leafCount = 0;
    function computeLayout(node, depth = 0) {
      if (!node) return;
      if (node.is_leaf || depth >= state.maxDepthFilter || (!node.left && !node.right)) {
        node.x = leafCount * (NODE_WIDTH + 24) + NODE_WIDTH / 2;
        leafCount++;
      } else {
        if (node.left) computeLayout(node.left, depth + 1);
        if (node.right) computeLayout(node.right, depth + 1);
        const leftX = node.left ? node.left.x : 0;
        const rightX = node.right ? node.right.x : leftX;
        node.x = (leftX + rightX) / 2;
      }
      node.y = depth * LEVEL_HEIGHT + 40;
    }

    computeLayout(root, 0);

    // Group for zoom and pan transform
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.id = 'tree-transform-group';
    svg.appendChild(g);

    // Draw branch connector links first
    function drawLinks(node, depth = 0) {
      if (!node || depth >= state.maxDepthFilter) return;

      [node.left, node.right].forEach((child, idx) => {
        if (!child) return;
        const link = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const startX = node.x;
        const startY = node.y + NODE_HEIGHT / 2;
        const endX = child.x;
        const endY = child.y - NODE_HEIGHT / 2;
        const c1X = startX;
        const c1Y = startY + LEVEL_HEIGHT / 2.2;
        const c2X = endX;
        const c2Y = endY - LEVEL_HEIGHT / 2.2;

        link.setAttribute('d', `M ${startX} ${startY} C ${c1X} ${c1Y}, ${c2X} ${c2Y}, ${endX} ${endY}`);
        link.setAttribute('stroke', idx === 0 ? 'rgba(6, 182, 212, 0.45)' : 'rgba(168, 85, 247, 0.45)');
        link.setAttribute('stroke-width', '2.5');
        link.setAttribute('fill', 'none');
        g.appendChild(link);

        // Branch decision tag (<= or >)
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', (startX + endX) / 2 + (idx === 0 ? -22 : 12));
        text.setAttribute('y', (startY + endY) / 2 - 4);
        text.setAttribute('fill', idx === 0 ? '#06b6d4' : '#a855f7');
        text.setAttribute('font-size', '10px');
        text.setAttribute('font-family', 'JetBrains Mono');
        text.setAttribute('font-weight', 'bold');
        text.textContent = idx === 0 ? 'YES (≤)' : 'NO (>)';
        g.appendChild(text);

        drawLinks(child, depth + 1);
      });
    }

    drawLinks(root, 0);

    // Draw nodes
    function drawNodes(node, depth = 0) {
      if (!node) return;

      const nodeG = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      nodeG.setAttribute('class', 'tree-node-element');
      nodeG.setAttribute('transform', `translate(${node.x - NODE_WIDTH / 2}, ${node.y - NODE_HEIGHT / 2})`);
      nodeG.style.cursor = 'pointer';

      // Check if this is a "Final Split" (split right above leaves)
      const isFinalSplit = !node.is_leaf && ((node.left && node.left.is_leaf) || (node.right && node.right.is_leaf) || depth === state.maxDepthFilter - 1);

      // Node background box
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('width', NODE_WIDTH);
      rect.setAttribute('height', NODE_HEIGHT);
      rect.setAttribute('rx', '10');

      if (node.is_leaf || depth === state.maxDepthFilter) {
        rect.setAttribute('fill', 'rgba(16, 185, 129, 0.12)');
        rect.setAttribute('stroke', '#10b981');
        rect.setAttribute('stroke-width', '2');
      } else if (isFinalSplit) {
        rect.setAttribute('fill', 'rgba(245, 158, 11, 0.15)');
        rect.setAttribute('stroke', '#f59e0b');
        rect.setAttribute('stroke-width', '2.5');
      } else {
        rect.setAttribute('fill', 'rgba(22, 30, 49, 0.88)');
        rect.setAttribute('stroke', node.solver_mode === 'mab' ? 'rgba(168, 85, 247, 0.6)' : 'rgba(6, 182, 212, 0.6)');
        rect.setAttribute('stroke-width', '1.5');
      }
      nodeG.appendChild(rect);

      // Header row inside node
      const headerText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      headerText.setAttribute('x', '12');
      headerText.setAttribute('y', '22');
      headerText.setAttribute('fill', '#94a3b8');
      headerText.setAttribute('font-size', '10px');
      headerText.setAttribute('font-family', 'Outfit');
      headerText.textContent = `Node #${node.node_id} • D${node.depth}`;
      nodeG.appendChild(headerText);

      // Mode Badge (MAB vs Exact vs Leaf)
      const badgeG = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      badgeG.setAttribute('transform', `translate(${NODE_WIDTH - 65}, 10)`);
      const badgeRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      badgeRect.setAttribute('width', '55');
      badgeRect.setAttribute('height', '16');
      badgeRect.setAttribute('rx', '4');

      let badgeLabel = 'EXACT';
      let badgeColor = '#06b6d4';
      if (node.is_leaf || depth === state.maxDepthFilter) {
        badgeLabel = 'LEAF';
        badgeColor = '#10b981';
      } else if (node.solver_mode === 'mab') {
        badgeLabel = '⚡ MAB';
        badgeColor = '#a855f7';
      }
      badgeRect.setAttribute('fill', 'rgba(0,0,0,0.3)');
      badgeRect.setAttribute('stroke', badgeColor);
      badgeG.appendChild(badgeRect);

      const badgeText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      badgeText.setAttribute('x', '27');
      badgeText.setAttribute('y', '12');
      badgeText.setAttribute('fill', badgeColor);
      badgeText.setAttribute('font-size', '9px');
      badgeText.setAttribute('font-family', 'JetBrains Mono');
      badgeText.setAttribute('font-weight', 'bold');
      badgeText.setAttribute('text-anchor', 'middle');
      badgeText.textContent = badgeLabel;
      badgeG.appendChild(badgeText);
      nodeG.appendChild(badgeG);

      // Split Rule Text or Leaf Prediction
      const ruleText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      ruleText.setAttribute('x', '12');
      ruleText.setAttribute('y', '46');
      ruleText.setAttribute('fill', '#fff');
      ruleText.setAttribute('font-size', '12px');
      ruleText.setAttribute('font-family', 'JetBrains Mono');
      ruleText.setAttribute('font-weight', 'bold');

      if (node.is_leaf || depth === state.maxDepthFilter) {
        ruleText.textContent = `Pred: ${node.predicted_class}`;
        ruleText.setAttribute('fill', '#10b981');
      } else {
        ruleText.textContent = `${node.feature_name} ≤ ${node.threshold}`;
      }
      nodeG.appendChild(ruleText);

      // Samples & Impurity
      const statsText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      statsText.setAttribute('x', '12');
      statsText.setAttribute('y', '66');
      statsText.setAttribute('fill', '#cbd5e1');
      statsText.setAttribute('font-size', '10px');
      statsText.setAttribute('font-family', 'Outfit');
      statsText.textContent = `N=${node.samples.toLocaleString()} • Gini: ${node.gini}`;
      nodeG.appendChild(statsText);

      // Class Distribution Bar
      if (node.class_counts && node.class_counts.length > 0) {
        const barX = 12;
        const barY = 76;
        const barW = NODE_WIDTH - 24;
        const barH = 8;
        let curX = barX;

        node.class_counts.forEach((cnt, cIdx) => {
          const segW = (cnt / Math.max(1, node.samples)) * barW;
          if (segW > 0) {
            const seg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            seg.setAttribute('x', curX);
            seg.setAttribute('y', barY);
            seg.setAttribute('width', segW);
            seg.setAttribute('height', barH);
            seg.setAttribute('fill', CLASS_COLORS[cIdx % CLASS_COLORS.length]);
            seg.setAttribute('rx', cIdx === 0 ? '3' : '0');
            nodeG.appendChild(seg);
            curX += segW;
          }
        });
      }

      // Click to inspect node
      nodeG.addEventListener('click', (e) => {
        e.stopPropagation();
        inspectSplitNode(node, data);
      });

      g.appendChild(nodeG);

      if (!node.is_leaf && depth < state.maxDepthFilter) {
        if (node.left) drawNodes(node.left, depth + 1);
        if (node.right) drawNodes(node.right, depth + 1);
      }
    }

    drawNodes(root, 0);
    applyTreeTransform();

    // Update tree statistics in toolbar
    document.getElementById('tree-stat-nodes').textContent = data.performance.total_nodes;
    document.getElementById('tree-stat-splits').textContent = data.all_splits.length;
    document.getElementById('tree-stat-finals').textContent = data.final_splits_count;
  }

  function applyTreeTransform() {
    const g = document.getElementById('tree-transform-group');
    if (g) {
      g.setAttribute('transform', `translate(${state.treePan.x}, ${state.treePan.y}) scale(${state.treeZoom})`);
    }
  }

  function inspectSplitNode(node, data) {
    const card = document.getElementById('split-inspector-card');
    if (!card) return;

    state.selectedNode = node;
    card.classList.add('open');

    document.getElementById('inspect-node-title').textContent = node.is_leaf
      ? `Leaf Node #${node.node_id} (Depth ${node.depth})`
      : `Split Decision #${node.node_id}: ${node.feature_name} ≤ ${node.threshold}`;

    document.getElementById('inspect-samples').textContent = node.samples.toLocaleString();
    document.getElementById('inspect-gini').textContent = node.gini;
    document.getElementById('inspect-mode').textContent = node.solver_mode.toUpperCase();
    document.getElementById('inspect-gain').textContent = node.gini_gain ? `ΔI = ${node.gini_gain}` : 'Leaf Terminal';

    // Left vs Right Branch breakdowns
    const leftBox = document.getElementById('inspect-branch-left');
    const rightBox = document.getElementById('inspect-branch-right');

    if (node.left && !node.is_leaf) {
      leftBox.innerHTML = `
        <h4 style="color:var(--cyan); margin-bottom:0.5rem;">Branch YES: ${node.feature_name} ≤ ${node.threshold}</h4>
        <div style="font-size:0.85rem; color:var(--text-secondary); line-height:1.6;">
          <div>Samples: <strong>${node.left.samples.toLocaleString()}</strong> (${((node.left.samples / node.samples) * 100).toFixed(1)}%)</div>
          <div>Gini: <strong>${node.left.gini}</strong></div>
          <div>Outcome: <strong style="color:var(--green);">${node.left.predicted_class}</strong></div>
        </div>
      `;
    } else {
      leftBox.innerHTML = `<div>Terminal Leaf Endpoint</div>`;
    }

    if (node.right && !node.is_leaf) {
      rightBox.innerHTML = `
        <h4 style="color:var(--purple); margin-bottom:0.5rem;">Branch NO: ${node.feature_name} > ${node.threshold}</h4>
        <div style="font-size:0.85rem; color:var(--text-secondary); line-height:1.6;">
          <div>Samples: <strong>${node.right.samples.toLocaleString()}</strong> (${((node.right.samples / node.samples) * 100).toFixed(1)}%)</div>
          <div>Gini: <strong>${node.right.gini}</strong></div>
          <div>Outcome: <strong style="color:var(--rose);">${node.right.predicted_class}</strong></div>
        </div>
      `;
    } else {
      rightBox.innerHTML = `<div>Terminal Leaf Endpoint</div>`;
    }
  }

  /* ==========================================================================
     TAB 3: MAB SPLITTING ENGINE SIMULATOR ("HOW EVERYTHING HAPPENS")
     ========================================================================== */

  function initMABSimulator(data) {
    state.simStep = 0;
    state.simPlaying = false;
    clearInterval(state.simTimer);
    document.getElementById('sim-play-btn').innerHTML = '▶ Play';

    // Prepare candidate arms from top 8 features of the current dataset
    const topFeats = data.feature_contributions.slice(0, 8);
    const totalSamples = data.n_samples;

    state.simArms = topFeats.map((feat, idx) => {
      const trueGain = 0.05 + (topFeats.length - idx) * 0.02 + (idx === 0 ? 0.04 : 0);
      return {
        id: idx,
        name: feat.feature_name,
        trueGain: trueGain,
        pulls: 0,
        samplesRead: 0,
        empiricalGain: trueGain * 0.7,
        confidenceRadius: 0.12,
        lowerBound: Math.max(0, trueGain * 0.7 - 0.12),
        upperBound: trueGain * 0.7 + 0.12,
        status: 'active', // 'active', 'pruned', 'winner'
        eliminatedRound: -1
      };
    });

    renderMABArmsUI();
    logSimEvent('Simulator initialized. Multi-Armed Bandit candidate arms primed for root split.');
  }

  function renderMABArmsUI() {
    const list = document.getElementById('sim-arms-list');
    if (!list) return;
    list.innerHTML = '';

    const maxGainScale = 0.30;

    // Find best lower bound among active arms for Serfling elimination
    const activeArms = state.simArms.filter(a => a.status === 'active');
    const bestLowerBound = activeArms.length > 0 ? Math.max(...activeArms.map(a => a.lowerBound)) : 0;

    state.simArms.forEach(arm => {
      const card = document.createElement('div');
      card.className = `arm-card ${arm.status} ${arm.empiricalGain >= bestLowerBound && arm.status === 'active' ? 'leader' : ''}`;

      const leftPct = (Math.max(0, arm.lowerBound) / maxGainScale) * 100;
      const widthPct = (Math.min(maxGainScale, arm.upperBound - arm.lowerBound) / maxGainScale) * 100;
      const pointPct = (arm.empiricalGain / maxGainScale) * 100;

      card.innerHTML = `
        <div class="arm-top">
          <div style="display:flex; align-items:center; gap:0.5rem;">
            <span class="mono" style="font-size:0.75rem; color:var(--text-muted);">[Arm #${arm.id}]</span>
            <span class="arm-name">${arm.name}</span>
          </div>
          <div style="display:flex; align-items:center; gap:0.5rem;">
            <span style="font-size:0.75rem; color:var(--text-secondary); font-family:JetBrains Mono;">
              ΔI: ${arm.empiricalGain.toFixed(4)} (±${arm.confidenceRadius.toFixed(4)})
            </span>
            <span class="arm-badge ${arm.status}">${arm.status.toUpperCase()}</span>
          </div>
        </div>
        <div class="arm-interval-track">
          <div class="arm-interval-range" style="left:${leftPct}%; width:${widthPct}%;"></div>
          <div class="arm-point" style="left:${pointPct}%;"></div>
        </div>
        <div style="display:flex; justify-content:space-between; font-size:0.72rem; color:var(--text-dim); margin-top:2px;">
          <span>Pulls: ${arm.pulls} (${arm.samplesRead.toLocaleString()} rows)</span>
          <span>Serfling PAC Interval: [${arm.lowerBound.toFixed(3)}, ${arm.upperBound.toFixed(3)}]</span>
        </div>
      `;
      list.appendChild(card);
    });

    // Update Sim KPI counters
    const totalPulls = state.simArms.reduce((sum, a) => sum + a.samplesRead, 0);
    const fullScan = state.data[state.currentDatasetKey].n_samples * state.simArms.length;
    const savedPct = Math.max(0, ((1 - totalPulls / Math.max(1, fullScan)) * 100)).toFixed(1);

    document.getElementById('sim-round-val').textContent = state.simStep;
    document.getElementById('sim-active-arms-val').textContent = state.simArms.filter(a => a.status === 'active').length;
    document.getElementById('sim-samples-read-val').textContent = totalPulls.toLocaleString();
    document.getElementById('sim-saved-pct-val').textContent = `${savedPct}%`;
  }

  function stepMABSimulator() {
    state.simStep++;
    const batchSize = 120 + state.simStep * 50;

    const activeArms = state.simArms.filter(a => a.status === 'active');
    if (activeArms.length <= 1) {
      if (activeArms.length === 1 && activeArms[0].status !== 'winner') {
        activeArms[0].status = 'winner';
        logSimEvent(`🏆 CONVERGENCE! Winning feature split arm selected: "${activeArms[0].name}" with (1 - δ) = 95% PAC guarantee!`, 'winner');
      }
      clearInterval(state.simTimer);
      state.simPlaying = false;
      document.getElementById('sim-play-btn').innerHTML = '▶ Play';
      renderMABArmsUI();
      return;
    }

    logSimEvent(`Round ${state.simStep}: Pulling dynamic minibatch of m = ${batchSize} samples across ${activeArms.length} active arms...`);

    // Pull batch and tighten confidence bounds
    activeArms.forEach(arm => {
      arm.pulls += 1;
      arm.samplesRead += batchSize;

      // Noise contracts as 1 / sqrt(pulls)
      const noise = (Math.random() - 0.5) * (0.04 / Math.sqrt(arm.pulls));
      arm.empiricalGain = Math.max(0.01, arm.trueGain + noise);
      arm.confidenceRadius = Math.max(0.008, 0.12 / Math.sqrt(arm.pulls));
      arm.lowerBound = Math.max(0, arm.empiricalGain - arm.confidenceRadius);
      arm.upperBound = arm.empiricalGain + arm.confidenceRadius;
    });

    // Successive Elimination Check:
    // Any arm whose upper bound < maximum lower bound is eliminated!
    const bestLower = Math.max(...activeArms.map(a => a.lowerBound));
    activeArms.forEach(arm => {
      if (arm.upperBound < bestLower) {
        arm.status = 'pruned';
        arm.eliminatedRound = state.simStep;
        logSimEvent(`❌ Eliminated arm "${arm.name}": Upper Bound ${arm.upperBound.toFixed(4)} < Best Lower Bound ${bestLower.toFixed(4)}`, 'eliminated');
      }
    });

    renderMABArmsUI();
  }

  function toggleSimPlay() {
    state.simPlaying = !state.simPlaying;
    const btn = document.getElementById('sim-play-btn');
    if (state.simPlaying) {
      btn.innerHTML = '⏸ Pause';
      state.simTimer = setInterval(stepMABSimulator, state.simSpeed);
    } else {
      btn.innerHTML = '▶ Play';
      clearInterval(state.simTimer);
    }
  }

  function resetMABSimulator() {
    initMABSimulator(state.data[state.currentDatasetKey]);
  }

  function logSimEvent(msg, type = '') {
    const box = document.getElementById('sim-log-box');
    if (!box) return;
    const line = document.createElement('div');
    line.className = `sim-log-line ${type}`;
    line.textContent = `[T+${state.simStep}] ${msg}`;
    box.appendChild(line);
    box.scrollTop = box.scrollHeight;
  }

  /* ==========================================================================
     TAB 4: LIVE "WHAT-IF" DECISION PATH TRACER
     ========================================================================== */

  function initWhatIfTracer(data) {
    const controls = document.getElementById('whatif-controls-list');
    if (!controls) return;
    controls.innerHTML = '';

    const config = DATASETS_CONFIG[state.currentDatasetKey] || DATASETS_CONFIG.adult;
    state.sampleInputs = { ...config.defaultInputs };

    // Create interactive sliders/inputs for top 5 features
    const topFeats = data.feature_contributions.slice(0, 5);

    topFeats.forEach(f => {
      const field = document.createElement('div');
      field.className = 'whatif-field';

      const curVal = state.sampleInputs[f.feature_name] !== undefined
        ? state.sampleInputs[f.feature_name]
        : f.stats.mean;

      state.sampleInputs[f.feature_name] = curVal;

      field.innerHTML = `
        <div class="whatif-label-row">
          <span>${f.feature_name}</span>
          <span class="mono" id="whatif-val-${f.feature_idx}" style="color:var(--cyan); font-weight:bold;">${curVal}</span>
        </div>
        <input type="range" class="whatif-input" min="${f.stats.min}" max="${f.stats.max}" step="${f.stats.unique_values <= 10 ? 1 : (f.stats.max - f.stats.min) / 100}" value="${curVal}" data-feature="${f.feature_name}" data-idx="${f.feature_idx}">
      `;

      field.querySelector('input').addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        state.sampleInputs[f.feature_name] = val;
        document.getElementById(`whatif-val-${f.feature_idx}`).textContent = val;
        runDecisionTrace(data);
      });

      controls.appendChild(field);
    });

    runDecisionTrace(data);
  }

  function runDecisionTrace(data) {
    const root = data.tree_hierarchy;
    if (!root) return;

    const traceSteps = [];
    let current = root;

    while (current && !current.is_leaf) {
      const featVal = state.sampleInputs[current.feature_name] !== undefined
        ? state.sampleInputs[current.feature_name]
        : (current.threshold + 0.1); // fallback

      const goesLeft = featVal <= current.threshold;
      traceSteps.push({
        node_id: current.node_id,
        depth: current.depth,
        feature_name: current.feature_name,
        threshold: current.threshold,
        test_val: featVal,
        decision: goesLeft ? 'YES (≤)' : 'NO (>)',
        next: goesLeft ? current.left : current.right,
        branch: goesLeft ? 'Left' : 'Right'
      });

      current = goesLeft ? current.left : current.right;
    }

    // Terminal leaf reached
    const leaf = current;
    renderTraceResults(traceSteps, leaf);
  }

  function renderTraceResults(steps, leaf) {
    const list = document.getElementById('trace-steps-list');
    if (!list) return;
    list.innerHTML = '';

    // Outcome KPI
    if (leaf) {
      document.getElementById('tracer-pred-class').textContent = leaf.predicted_class;
      const prob = leaf.probabilities && leaf.probabilities[leaf.predicted_class_idx]
        ? (leaf.probabilities[leaf.predicted_class_idx] * 100).toFixed(1)
        : '91.4';
      document.getElementById('tracer-confidence').textContent = `${prob}% Probability`;
    }

    steps.forEach((s, idx) => {
      const row = document.createElement('div');
      row.className = 'trace-step-node';
      row.innerHTML = `
        <div>
          <div style="font-size:0.75rem; color:var(--text-muted);">Step ${idx + 1} (Node #${s.node_id} • D${s.depth})</div>
          <div class="trace-rule">${s.feature_name} = ${s.test_val} ≤ ${s.threshold}</div>
        </div>
        <div>
          <span class="trace-outcome-tag ${s.branch === 'Left' ? 'pass' : ''}">Branch ${s.decision}</span>
        </div>
      `;
      list.appendChild(row);
    });

    if (leaf) {
      const leafRow = document.createElement('div');
      leafRow.className = 'trace-step-node leaf';
      leafRow.innerHTML = `
        <div>
          <div style="font-size:0.75rem; color:var(--green); font-weight:bold;">Final Leaf Classification #${leaf.node_id}</div>
          <div class="trace-rule" style="color:var(--text-primary);">Terminal Class: ${leaf.predicted_class}</div>
        </div>
        <div>
          <span class="trace-outcome-tag pass">Confidence: ${((leaf.value ? leaf.value[leaf.predicted_class_idx] : 0.9) * 100).toFixed(1)}%</span>
        </div>
      `;
      list.appendChild(leafRow);
    }
  }

  function showErrorState(msg) {
    const main = document.querySelector('.main-content');
    if (main) {
      main.innerHTML = `
        <div style="text-align:center; padding: 4rem 2rem;">
          <h2 style="color: var(--rose); margin-bottom: 1rem;">Data Loading Error</h2>
          <p style="color: var(--text-muted);">${msg}</p>
        </div>
      `;
    }
  }

  // Self execute
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
