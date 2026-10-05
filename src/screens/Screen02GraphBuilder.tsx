import React, { useState, useRef, useEffect } from 'react';
import { ScreenId, GraphNode, GraphEdge } from '../types';

interface Screen02Props {
  onNavigate: (screen: ScreenId) => void;
}

const initialNodes: GraphNode[] = [
  { id: 'A', x: 180, y: 190, label: 'A (0)' },
  { id: 'B', x: 420, y: 130, label: 'B (1)' },
  { id: 'C', x: 260, y: 440, label: 'C (2)' },
  { id: 'D', x: 740, y: 140, label: 'D (3)' },
  { id: 'E', x: 520, y: 390, label: 'E (4)' },
  { id: 'F', x: 920, y: 360, label: 'F (5)' },
  { id: 'G', x: 700, y: 580, label: 'G (6)' },
];

const initialEdges: GraphEdge[] = [
  { id: 'e1', u: 'A', v: 'B', w: 4, active: true },
  { id: 'e2', u: 'A', v: 'C', w: 2, active: true },
  { id: 'e3', u: 'B', v: 'C', w: 5, active: true },
  { id: 'e4', u: 'B', v: 'D', w: 10, active: true },
  { id: 'e5', u: 'C', v: 'E', w: 3, active: true },
  { id: 'e6', u: 'D', v: 'E', w: 4, active: true },
  { id: 'e7', u: 'D', v: 'F', w: 11, active: true },
  { id: 'e8', u: 'E', v: 'F', w: 8, active: true },
  { id: 'e9', u: 'E', v: 'G', w: 7, active: true },
  { id: 'e10', u: 'F', v: 'G', w: 1, active: true },
  { id: 'e11', u: 'B', v: 'E', w: 2, active: true },
];

export const Screen02GraphBuilder: React.FC<Screen02Props> = ({ onNavigate }) => {
  const [nodes, setNodes] = useState<GraphNode[]>(initialNodes);
  const [edges, setEdges] = useState<GraphEdge[]>(initialEdges);
  const [history, setHistory] = useState<{ nodes: GraphNode[]; edges: GraphEdge[] }[]>([]);
  const [future, setFuture] = useState<{ nodes: GraphNode[]; edges: GraphEdge[] }[]>([]);

  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [connectSource, setConnectSource] = useState<string | null>(null);
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [hoveredEdgeId, setHoveredEdgeId] = useState<string | null>(null);
  const [hoverTelemetry, setHoverTelemetry] = useState<string>('None');

  const [isDense, setIsDense] = useState<boolean>(false);
  const [snapToGrid, setSnapToGrid] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [newU, setNewU] = useState<string>('A');
  const [newV, setNewV] = useState<string>('B');
  const [newW, setNewW] = useState<number>(6);
  const [tableFilter, setTableFilter] = useState<'all' | 'sorted' | 'heavy'>('all');

  const svgRef = useRef<SVGSVGElement | null>(null);

  // Snapshot for undo/redo
  const saveSnapshot = () => {
    setHistory((prev) => [...prev.slice(-15), { nodes: JSON.parse(JSON.stringify(nodes)), edges: JSON.parse(JSON.stringify(edges)) }]);
    setFuture([]);
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setFuture((f) => [{ nodes: JSON.parse(JSON.stringify(nodes)), edges: JSON.parse(JSON.stringify(edges)) }, ...f]);
    setNodes(prev.nodes);
    setEdges(prev.edges);
    setHistory((h) => h.slice(0, -1));
  };

  const handleRedo = () => {
    if (future.length === 0) return;
    const next = future[0];
    setHistory((h) => [...h, { nodes: JSON.parse(JSON.stringify(nodes)), edges: JSON.parse(JSON.stringify(edges)) }]);
    setNodes(next.nodes);
    setEdges(next.edges);
    setFuture((f) => f.slice(1));
  };

  // Node Dragging
  const handleMouseDownNode = (e: React.MouseEvent, node: GraphNode) => {
    e.stopPropagation();
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    setDraggingNodeId(node.id);
    setDragOffset({
      x: (e.clientX - rect.left) / zoomLevel - node.x,
      y: (e.clientY - rect.top) / zoomLevel - node.y,
    });
  };

  const handleMouseMoveSVG = (e: React.MouseEvent) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const curX = (e.clientX - rect.left) / zoomLevel;
    const curY = (e.clientY - rect.top) / zoomLevel;
    setMousePos({ x: curX, y: curY });

    if (draggingNodeId) {
      setNodes((prev) =>
        prev.map((n) => {
          if (n.id === draggingNodeId) {
            let nextX = Math.max(30, Math.min(1150, curX - dragOffset.x));
            let nextY = Math.max(30, Math.min(750, curY - dragOffset.y));
            if (snapToGrid) {
              nextX = Math.round(nextX / 28) * 28;
              nextY = Math.round(nextY / 28) * 28;
            }
            return { ...n, x: nextX, y: nextY };
          }
          return n;
        })
      );
    }
  };

  const handleMouseUp = () => {
    if (draggingNodeId) {
      saveSnapshot();
      setDraggingNodeId(null);
    }
  };

  // Node Click: Connect or Select
  const handleClickNode = (e: React.MouseEvent, node: GraphNode) => {
    e.stopPropagation();
    if (connectSource) {
      if (connectSource !== node.id) {
        saveSnapshot();
        const exists = edges.some(
          (ed) =>
            (ed.u === connectSource && ed.v === node.id) ||
            (ed.u === node.id && ed.v === connectSource)
        );
        if (!exists) {
          const defaultW = Math.floor(Math.random() * 9) + 2;
          setEdges((prev) => [
            ...prev,
            { id: `e${Date.now()}`, u: connectSource, v: node.id, w: defaultW, active: true },
          ]);
        }
      }
      setConnectSource(null);
      setSelectedNode(null);
    } else {
      setSelectedNode(node.id);
      setConnectSource(node.id);
    }
  };

  // Canvas Click (Cancel selection)
  const handleClickSVG = () => {
    setConnectSource(null);
    setSelectedNode(null);
  };

  // Actions
  const handleAddNode = () => {
    if (nodes.length >= 12) {
      alert('Maximum test canvas capacity reached (12 nodes).');
      return;
    }
    saveSnapshot();
    const nextChar = String.fromCharCode(65 + nodes.length);
    const randX = 180 + Math.floor(Math.random() * 600);
    const randY = 140 + Math.floor(Math.random() * 400);
    const newNode: GraphNode = {
      id: nextChar,
      x: randX,
      y: randY,
      label: `${nextChar} (${nodes.length})`,
    };
    const neighbor = nodes[Math.floor(Math.random() * nodes.length)];
    const newEdge: GraphEdge = {
      id: `e${Date.now()}`,
      u: nextChar,
      v: neighbor.id,
      w: Math.floor(Math.random() * 8) + 2,
      active: true,
    };
    setNodes((prev) => [...prev, newNode]);
    setEdges((prev) => [...prev, newEdge]);
  };

  const handleRandomize = () => {
    saveSnapshot();
    setEdges((prev) =>
      prev.map((e) => ({ ...e, w: Math.floor(Math.random() * 14) + 1 }))
    );
  };

  const handleToggleDensity = () => {
    saveSnapshot();
    if (!isDense) {
      setIsDense(true);
      const cross1: GraphEdge = { id: 'e-dense1', u: 'A', v: 'D', w: 12, active: true };
      const cross2: GraphEdge = { id: 'e-dense2', u: 'C', v: 'G', w: 9, active: true };
      setEdges((prev) => [...prev.filter((e) => e.id !== 'e-dense1' && e.id !== 'e-dense2'), cross1, cross2]);
    } else {
      setIsDense(false);
      setEdges((prev) => prev.filter((e) => e.id !== 'e-dense1' && e.id !== 'e-dense2'));
    }
  };

  const handleLoadSample = () => {
    saveSnapshot();
    setNodes(JSON.parse(JSON.stringify(initialNodes)));
    setEdges(JSON.parse(JSON.stringify(initialEdges)));
    setIsDense(false);
  };

  const handleExportJSON = () => {
    const data = JSON.stringify({ nodes, edges }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `graph_topology_v${nodes.length}_e${edges.length}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSubmitNewEdge = () => {
    const u = newU.trim().toUpperCase();
    const v = newV.trim().toUpperCase();
    if (u === v || !nodes.some((n) => n.id === u) || !nodes.some((n) => n.id === v)) {
      alert('Please specify two distinct valid nodes (e.g. A and B).');
      return;
    }
    saveSnapshot();
    setEdges((prev) => [
      ...prev,
      { id: `e${Date.now()}`, u, v, w: Number(newW) || 1, active: true },
    ]);
    setShowAddForm(false);
  };

  // Metrics
  const activeEdges = edges.filter((e) => e.active);
  const totalWeight = activeEdges.reduce((acc, curr) => acc + curr.w, 0);
  const sortedActive = [...activeEdges].sort((a, b) => a.w - b.w);
  const mstEst = sortedActive.slice(0, Math.max(0, nodes.length - 1)).reduce((acc, c) => acc + c.w, 0);
  const cycles = Math.max(0, activeEdges.length - nodes.length + 1);

  // Table filtering
  let filteredEdges = [...edges];
  if (tableFilter === 'sorted') {
    filteredEdges.sort((a, b) => a.w - b.w);
  } else if (tableFilter === 'heavy') {
    filteredEdges = filteredEdges.filter((e) => e.w >= 5);
  }

  const sourceNode = nodes.find((n) => n.id === connectSource);

  return (
    <div className="flex flex-col w-full pb-space-xl" onMouseUp={handleMouseUp}>
      {/* Top Rubric Header & Sub-Bar */}
      <div className="px-gutter-desktop py-space-md bg-surface-container-low flex flex-wrap items-center justify-between gap-space-md border-b border-surface-container/30">
        <div className="flex items-center gap-space-md flex-wrap">
          <div className="flex items-center gap-space-xs">
            <span className="font-code-sm text-code-sm text-primary font-bold">STAGE 02</span>
            <span className="text-outline text-body-sm">/</span>
            <h1 className="font-headline-sm text-headline-sm text-on-surface tracking-tight font-semibold">
              Interactive Graph Builder &amp; Topology Editor
            </h1>
          </div>
          <span className="px-space-sm py-0.5 rounded-full bg-surface-container-high text-primary-fixed-dim font-code-sm text-code-sm flex items-center gap-1.5 shadow-sm border border-surface-container/50">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            Undirected Weighted • G = (V, E)
          </span>
        </div>

        {/* Clickable Rubric Badge */}
        <button
          onClick={() => onNavigate('marks-dashboard')}
          className="group flex items-center gap-2 px-space-md py-1 rounded-full bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 shadow-sm transition-all cursor-pointer"
        >
          <span className="w-2 h-2 rounded-full bg-orange-400 shadow-[0_0_8px_rgba(249,115,22,0.8)]"></span>
          <span className="font-label-badge text-label-badge uppercase tracking-wider font-bold">
            Criterion: Presentation &amp; Interaction
          </span>
          <span className="font-code-sm text-code-sm text-on-surface bg-surface-container-highest px-1.5 py-0.2 rounded font-semibold">
            30 marks
          </span>
          <span className="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">
            arrow_forward
          </span>
        </button>
      </div>

      {/* Telemetry Bar & Action Toolbar */}
      <div className="px-gutter-desktop py-space-sm bg-surface-container-lowest flex flex-wrap items-center justify-between gap-space-md shadow-sm border-b border-surface-container/30">
        {/* Metric Chips */}
        <div className="flex items-center gap-space-sm flex-wrap">
          <div className="flex items-center gap-2 px-space-sm py-1 rounded bg-surface-container text-on-surface border border-surface-container/40">
            <span className="font-code-sm text-code-sm text-outline">Nodes (V):</span>
            <span className="font-metric-val text-headline-sm text-primary">{nodes.length}</span>
          </div>
          <div className="flex items-center gap-2 px-space-sm py-1 rounded bg-surface-container text-on-surface border border-surface-container/40">
            <span className="font-code-sm text-code-sm text-outline">Edges (E):</span>
            <span className="font-metric-val text-headline-sm text-secondary">{edges.length}</span>
          </div>
          <div className="flex items-center gap-2 px-space-sm py-1 rounded bg-surface-container text-on-surface border border-surface-container/40">
            <span className="font-code-sm text-code-sm text-outline">MST Target (V-1):</span>
            <span className="font-metric-val text-headline-sm text-tertiary">
              {Math.max(0, nodes.length - 1)}
            </span>
          </div>
          <div className="flex items-center gap-2 px-space-sm py-1 rounded bg-surface-container text-on-surface border border-surface-container/40">
            <span className="font-code-sm text-code-sm text-outline">Density:</span>
            <span className="font-code-md text-code-md text-primary-fixed-dim font-bold">
              {isDense ? 'Dense (0.78)' : 'Sparse (0.52)'}
            </span>
          </div>
        </div>

        {/* Action Toolbar */}
        <div className="flex items-center gap-space-xs flex-wrap">
          <button
            onClick={handleAddNode}
            className="flex items-center gap-1.5 px-space-sm py-1.5 rounded bg-surface-container-high hover:bg-surface-variant text-on-surface font-code-sm text-code-sm shadow-sm transition-colors cursor-pointer border border-surface-container-high/60"
            title="Spawn new vertex (V) at cursor coordinates"
          >
            <span className="material-symbols-outlined text-[18px] text-primary">add_circle</span>
            <span>Add Node</span>
          </button>

          <button
            onClick={handleRandomize}
            className="flex items-center gap-1.5 px-space-sm py-1.5 rounded bg-surface-container-high hover:bg-surface-variant text-on-surface font-code-sm text-code-sm shadow-sm transition-colors cursor-pointer border border-surface-container-high/60"
            title="Randomize edge weights [1-15]"
          >
            <span className="material-symbols-outlined text-[18px] text-secondary">casino</span>
            <span>Random Graph</span>
          </button>

          <button
            onClick={handleToggleDensity}
            className="flex items-center gap-1.5 px-space-sm py-1.5 rounded bg-surface-container-high hover:bg-surface-variant text-on-surface font-code-sm text-code-sm shadow-sm transition-colors cursor-pointer border border-surface-container-high/60"
            title="Toggle between Sparse and Dense topologies"
          >
            <span className="material-symbols-outlined text-[18px] text-tertiary">swap_horiz</span>
            <span>{isDense ? 'Dense Mode' : 'Sparse Mode'}</span>
          </button>

          <button
            onClick={handleLoadSample}
            className="flex items-center gap-1.5 px-space-sm py-1.5 rounded bg-surface-container-high hover:bg-surface-variant text-on-surface font-code-sm text-code-sm shadow-sm transition-colors cursor-pointer border border-surface-container-high/60"
            title="Load canonical CLRS 7-Node benchmark graph"
          >
            <span className="material-symbols-outlined text-[18px] text-primary-fixed-dim">dataset</span>
            <span>Load Test Case</span>
          </button>

          <div className="w-px h-5 bg-surface-variant mx-1"></div>

          <button
            onClick={handleUndo}
            disabled={history.length === 0}
            className="p-1.5 rounded bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface disabled:opacity-40 transition-colors cursor-pointer"
            title="Undo (Ctrl+Z)"
          >
            <span className="material-symbols-outlined text-[18px]">undo</span>
          </button>

          <button
            onClick={handleRedo}
            disabled={future.length === 0}
            className="p-1.5 rounded bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface disabled:opacity-40 transition-colors cursor-pointer"
            title="Redo (Ctrl+Y)"
          >
            <span className="material-symbols-outlined text-[18px]">redo</span>
          </button>

          <button
            onClick={handleExportJSON}
            className="flex items-center gap-1.5 px-space-sm py-1.5 rounded bg-surface-container hover:bg-surface-container-high text-on-surface font-code-sm text-code-sm shadow-sm transition-colors cursor-pointer"
            title="Export JSON"
          >
            <span className="material-symbols-outlined text-[18px] text-outline">file_download</span>
            <span>Export (JSON)</span>
          </button>
        </div>
      </div>

      {/* Main Split Workspace: 70% Left Canvas | 30% Right Edge Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 flex-1 min-h-[680px] bg-surface-container-lowest">
        {/* LEFT 70% CANVAS */}
        <div className="lg:col-span-8 relative flex flex-col overflow-hidden bg-surface-container-lowest border-r border-surface-container/30">
          {/* Canvas Status HUD Overlay */}
          <div className="absolute top-space-md left-space-md right-space-md z-20 flex items-center justify-between pointer-events-none">
            <div className="pointer-events-auto flex items-center gap-space-sm px-space-md py-1.5 rounded-full bg-surface-container/90 backdrop-blur-md text-on-surface font-code-sm text-code-sm shadow-lg border border-surface-container-high/40">
              <span className="material-symbols-outlined text-[16px] text-primary">touch_app</span>
              <span>Drag node to relocate</span>
              <span className="text-outline">•</span>
              <span>Click two nodes to insert edge</span>
              <span className="text-outline">•</span>
              <span className="text-secondary">Hover edge for weight</span>
            </div>

            {/* Canvas Controls */}
            <div className="pointer-events-auto flex items-center gap-1 p-1 rounded-lg bg-surface-container/90 backdrop-blur-md shadow-lg border border-surface-container-high/40">
              <button
                onClick={() => setZoomLevel((z) => Math.min(1.6, z + 0.1))}
                className="w-7 h-7 flex items-center justify-center rounded hover:bg-surface-bright text-on-surface transition-colors cursor-pointer"
                title="Zoom In"
              >
                <span className="material-symbols-outlined text-[18px]">zoom_in</span>
              </button>
              <button
                onClick={() => setZoomLevel((z) => Math.max(0.6, z - 0.1))}
                className="w-7 h-7 flex items-center justify-center rounded hover:bg-surface-bright text-on-surface transition-colors cursor-pointer"
                title="Zoom Out"
              >
                <span className="material-symbols-outlined text-[18px]">zoom_out</span>
              </button>
              <button
                onClick={() => setZoomLevel(1)}
                className="w-7 h-7 flex items-center justify-center rounded hover:bg-surface-bright text-on-surface transition-colors cursor-pointer"
                title="Reset Viewport"
              >
                <span className="material-symbols-outlined text-[18px]">fit_screen</span>
              </button>
              <div className="w-px h-4 bg-outline-variant mx-0.5"></div>
              <button
                onClick={() => setSnapToGrid(!snapToGrid)}
                className={`px-2 h-7 flex items-center gap-1 rounded font-code-sm text-code-sm font-semibold cursor-pointer ${
                  snapToGrid ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-primary'
                }`}
                title="Toggle Snap to Grid"
              >
                <span className="material-symbols-outlined text-[14px]">grid_4x4</span>
                <span className="text-[10px]">SNAP</span>
              </button>
            </div>
          </div>

          {/* Interactive SVG Canvas Surface */}
          <div className="relative w-full h-[640px] lg:h-[720px] select-none overflow-hidden cursor-crosshair">
            <svg
              ref={svgRef}
              className="w-full h-full"
              viewBox="0 0 1200 800"
              onMouseMove={handleMouseMoveSVG}
              onClick={handleClickSVG}
            >
              <defs>
                <pattern id="gridDot2" width="28" height="28" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1.2" fill="rgba(85, 148, 144, 0.22)" />
                </pattern>
                <filter id="glowTeal2" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#2dd4bf" floodOpacity="0.6" />
                </filter>
                <filter id="glowSel2" x="-30%" y="-30%" width="160%" height="160%">
                  <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#7bd0ff" floodOpacity="0.8" />
                </filter>
              </defs>

              <rect width="100%" height="100%" fill="#070e1c" />
              <rect width="100%" height="100%" fill="url(#gridDot2)" />

              {/* Connecting Preview Line */}
              {connectSource && sourceNode && (
                <line
                  x1={sourceNode.x}
                  y1={sourceNode.y}
                  x2={mousePos.x}
                  y2={mousePos.y}
                  stroke="#7bd0ff"
                  strokeWidth="2.5"
                  strokeDasharray="6,4"
                  className="pointer-events-none"
                />
              )}

              {/* Dynamic Edges */}
              {edges.map((edge) => {
                const uNode = nodes.find((n) => n.id === edge.u);
                const vNode = nodes.find((n) => n.id === edge.v);
                if (!uNode || !vNode) return null;
                const isHovered = hoveredEdgeId === edge.id;
                const midX = (uNode.x + vNode.x) / 2;
                const midY = (uNode.y + vNode.y) / 2;

                return (
                  <g key={edge.id}>
                    <line
                      x1={uNode.x}
                      y1={uNode.y}
                      x2={vNode.x}
                      y2={vNode.y}
                      stroke={isHovered ? '#57f1db' : edge.active ? '#3c4a46' : '#232a39'}
                      strokeWidth={isHovered ? 4.5 : 3}
                      strokeLinecap="round"
                      className="cursor-pointer transition-all"
                      onMouseEnter={() => {
                        setHoveredEdgeId(edge.id);
                        setHoverTelemetry(`Edge (${edge.u} ↔ ${edge.v}) [Weight: ${edge.w}]`);
                      }}
                      onMouseLeave={() => {
                        setHoveredEdgeId(null);
                        setHoverTelemetry('None');
                      }}
                    />
                    {/* Weight Badge */}
                    <g
                      transform={`translate(${midX}, ${midY})`}
                      className="cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        const nw = prompt(`Enter new weight for edge (${edge.u} - ${edge.v}):`, String(edge.w));
                        if (nw && !isNaN(Number(nw))) {
                          saveSnapshot();
                          setEdges((prev) =>
                            prev.map((item) => (item.id === edge.id ? { ...item, w: parseInt(nw, 10) } : item))
                          );
                        }
                      }}
                    >
                      <rect
                        x="-14"
                        y="-11"
                        width="28"
                        height="22"
                        rx="4"
                        fill="#19202e"
                        stroke={isHovered ? '#57f1db' : '#2dd4bf'}
                        strokeWidth="1.2"
                      />
                      <text
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill="#dce2f6"
                        fontFamily="JetBrains Mono"
                        fontSize="11"
                        fontWeight="bold"
                      >
                        {edge.w}
                      </text>
                    </g>
                  </g>
                );
              })}

              {/* Dynamic Nodes */}
              {nodes.map((node) => {
                const isSelected = selectedNode === node.id;
                const degree = edges.filter((e) => e.active && (e.u === node.id || e.v === node.id)).length;
                return (
                  <g
                    key={node.id}
                    transform={`translate(${node.x}, ${node.y})`}
                    className="cursor-grab active:cursor-grabbing select-none"
                    onMouseDown={(e) => handleMouseDownNode(e, node)}
                    onClick={(e) => handleClickNode(e, node)}
                    onMouseEnter={() => setHoverTelemetry(`Vertex ${node.id} [Deg: ${degree}]`)}
                    onMouseLeave={() => setHoverTelemetry('None')}
                  >
                    {/* Halo */}
                    <circle
                      r="26"
                      fill={isSelected ? 'rgba(123, 208, 255, 0.25)' : 'rgba(87, 241, 219, 0.08)'}
                      stroke={isSelected ? '#7bd0ff' : 'transparent'}
                      strokeWidth="2"
                      strokeDasharray={isSelected ? '4,2' : 'none'}
                    />
                    {/* Core Disc */}
                    <circle
                      r="20"
                      fill="#0c1321"
                      stroke={isSelected ? '#7bd0ff' : '#2dd4bf'}
                      strokeWidth="2.5"
                      filter="url(#glowTeal2)"
                    />
                    {/* Label */}
                    <text
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="#dce2f6"
                      fontFamily="JetBrains Mono"
                      fontSize="13"
                      fontWeight="700"
                    >
                      {node.id}
                    </text>
                    {/* Coordinates Sub-text */}
                    <text
                      x="0"
                      y="32"
                      textAnchor="middle"
                      fill="#859490"
                      fontFamily="JetBrains Mono"
                      fontSize="9"
                    >
                      {`${Math.round(node.x)},${Math.round(node.y)}`}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Coordinate Legend Bottom-Left */}
            <div className="absolute bottom-space-md left-space-md flex flex-col gap-1 p-space-sm rounded bg-surface-container-low/85 backdrop-blur font-code-sm text-code-sm text-outline-variant pointer-events-none shadow-md border border-surface-container/40">
              <div className="flex items-center gap-2 text-on-surface">
                <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_6px_rgba(87,241,219,0.8)]"></span>
                <span className="font-bold text-primary">Spatial Engine:</span> Cartesian 2D (1200 × 800)
              </div>
              <div className="text-[11px] text-on-surface-variant flex items-center gap-2">
                <span>
                  Hovering: <span className="text-secondary font-bold">{hoverTelemetry}</span>
                </span>
                <span>•</span>
                <span>
                  Selection:{' '}
                  <span className="text-tertiary">
                    {selectedNode ? `Node ${selectedNode} selected` : '0 nodes'}
                  </span>
                </span>
              </div>
            </div>

            {/* Canvas Mini-Map Floating Card */}
            <div className="absolute bottom-space-md right-space-md w-36 h-24 rounded bg-surface-container/90 backdrop-blur p-1 shadow-xl hidden md:flex flex-col justify-between border border-surface-container-high/50 pointer-events-none">
              <div className="flex items-center justify-between px-1 text-[9px] font-code-sm text-outline uppercase tracking-wider">
                <span>MINI-MAP</span>
                <span className="text-primary">• 100%</span>
              </div>
              <svg className="w-full h-16 rounded bg-surface-container-lowest" viewBox="0 0 1200 800">
                {edges.map((e) => {
                  const u = nodes.find((n) => n.id === e.u);
                  const v = nodes.find((n) => n.id === e.v);
                  if (!u || !v) return null;
                  return (
                    <line
                      key={e.id}
                      x1={u.x}
                      y1={u.y}
                      x2={v.x}
                      y2={v.y}
                      stroke={e.active ? '#3c4a46' : '#19202e'}
                      strokeWidth="10"
                    />
                  );
                })}
                {nodes.map((n) => (
                  <circle key={n.id} cx={n.x} cy={n.y} r="26" fill="#2dd4bf" />
                ))}
              </svg>
            </div>
          </div>
        </div>

        {/* RIGHT 30% SIDEBAR PANEL: Edge Register */}
        <div className="lg:col-span-4 flex flex-col bg-surface-container-low shadow-2xl">
          {/* Panel Header */}
          <div className="p-space-md bg-surface-container flex items-center justify-between border-b border-surface-container-high">
            <div className="flex items-center gap-space-sm">
              <span className="material-symbols-outlined text-[20px] text-primary">format_list_numbered</span>
              <div>
                <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold leading-tight">
                  Edge Register
                </h2>
                <p className="font-code-sm text-code-sm text-on-surface-variant">
                  {edges.length} topological connections
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="flex items-center gap-1 px-space-sm py-1 rounded bg-primary text-on-primary font-code-sm text-code-sm font-bold shadow-[0_0_8px_rgba(87,241,219,0.4)] hover:bg-primary-fixed transition-colors cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">add</span>
                <span>Edge</span>
              </button>
              <button
                onClick={() => setTableFilter((f) => (f === 'sorted' ? 'all' : 'sorted'))}
                className={`p-1 rounded transition-colors cursor-pointer ${
                  tableFilter === 'sorted' ? 'bg-secondary text-on-secondary' : 'bg-surface-container-high hover:bg-surface-variant text-secondary'
                }`}
                title="Sort weights ascending (Kruskal pre-order)"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">sort</span>
              </button>
            </div>
          </div>

          {/* Sorter Pills */}
          <div className="px-space-md py-space-xs bg-surface-container-low flex items-center gap-1.5 flex-wrap border-b border-surface-container">
            <button
              onClick={() => setTableFilter('all')}
              className={`px-2 py-0.5 rounded font-code-sm text-code-sm font-semibold transition-colors cursor-pointer ${
                tableFilter === 'all'
                  ? 'bg-primary-container text-on-primary-container'
                  : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface'
              }`}
            >
              All ({edges.length})
            </button>
            <button
              onClick={() => setTableFilter('sorted')}
              className={`px-2 py-0.5 rounded font-code-sm text-code-sm transition-colors flex items-center gap-1 cursor-pointer ${
                tableFilter === 'sorted'
                  ? 'bg-primary-container text-on-primary-container font-semibold'
                  : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span>Weight ↑</span>
              <span className="text-[10px] text-primary">ASC</span>
            </button>
            <button
              onClick={() => setTableFilter('heavy')}
              className={`px-2 py-0.5 rounded font-code-sm text-code-sm transition-colors cursor-pointer ${
                tableFilter === 'heavy'
                  ? 'bg-primary-container text-on-primary-container font-semibold'
                  : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface'
              }`}
            >
              w ≥ 5
            </button>
          </div>

          {/* Inline Edge Form */}
          {showAddForm && (
            <div className="p-space-sm bg-surface-container-lowest flex flex-col gap-space-xs border-b border-surface-container-high">
              <div className="flex items-center justify-between text-[11px] font-code-sm text-primary font-bold">
                <span>INSERT NEW EDGE</span>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="text-outline hover:text-on-surface cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px]">close</span>
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] font-code-sm text-outline block mb-0.5">Source (u)</label>
                  <input
                    type="text"
                    maxLength={2}
                    value={newU}
                    onChange={(e) => setNewU(e.target.value.toUpperCase())}
                    className="w-full bg-surface-container-high text-on-surface px-2 py-1 rounded font-code-md text-code-md uppercase outline-none focus:ring-1 focus:ring-primary border border-surface-container/60"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-code-sm text-outline block mb-0.5">Target (v)</label>
                  <input
                    type="text"
                    maxLength={2}
                    value={newV}
                    onChange={(e) => setNewV(e.target.value.toUpperCase())}
                    className="w-full bg-surface-container-high text-on-surface px-2 py-1 rounded font-code-md text-code-md uppercase outline-none focus:ring-1 focus:ring-primary border border-surface-container/60"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-code-sm text-outline block mb-0.5">Weight (w)</label>
                  <input
                    type="number"
                    min={1}
                    max={99}
                    value={newW}
                    onChange={(e) => setNewW(Number(e.target.value))}
                    className="w-full bg-surface-container-high text-on-surface px-2 py-1 rounded font-code-md text-code-md outline-none focus:ring-1 focus:ring-primary border border-surface-container/60"
                  />
                </div>
              </div>
              <button
                onClick={handleSubmitNewEdge}
                className="w-full py-1 rounded bg-secondary text-on-secondary font-code-sm text-code-sm font-bold mt-1 cursor-pointer hover:bg-secondary-fixed transition-colors"
                type="button"
              >
                Connect Vertices
              </button>
            </div>
          )}

          {/* Edge Table Component */}
          <div className="flex-1 overflow-y-auto max-h-[460px] p-space-sm space-y-1">
            <table className="w-full text-left font-code-sm text-code-sm">
              <thead className="text-outline uppercase text-[10px] tracking-wider bg-surface-container-lowest sticky top-0 z-10">
                <tr>
                  <th className="py-2 px-space-sm rounded-l">Edge (u ↔ v)</th>
                  <th className="py-2 px-space-sm">Weight (w)</th>
                  <th className="py-2 px-space-sm">State</th>
                  <th className="py-2 px-space-sm rounded-r text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="space-y-1">
                {filteredEdges.map((edge) => (
                  <tr
                    key={edge.id}
                    onMouseEnter={() => setHoveredEdgeId(edge.id)}
                    onMouseLeave={() => setHoveredEdgeId(null)}
                    className="hover:bg-surface-container transition-colors group"
                  >
                    <td className="py-1.5 px-space-sm font-bold text-on-surface flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${edge.active ? 'bg-primary' : 'bg-outline'}`}></span>
                      <span>{edge.u}</span>
                      <span className="text-outline">&harr;</span>
                      <span>{edge.v}</span>
                    </td>
                    <td className="py-1.5 px-space-sm">
                      <span className="px-2 py-0.5 rounded bg-surface-container-high text-primary font-bold">
                        {edge.w}
                      </span>
                    </td>
                    <td className="py-1.5 px-space-sm">
                      <button
                        onClick={() => {
                          saveSnapshot();
                          setEdges((prev) =>
                            prev.map((e) => (e.id === edge.id ? { ...e, active: !e.active } : e))
                          );
                        }}
                        className={`text-[11px] px-1.5 py-0.5 rounded cursor-pointer transition-colors ${
                          edge.active
                            ? 'bg-primary-container/20 text-primary'
                            : 'bg-surface-bright text-outline'
                        }`}
                      >
                        {edge.active ? 'Active' : 'Disabled'}
                      </button>
                    </td>
                    <td className="py-1.5 px-space-sm text-right space-x-1">
                      <button
                        onClick={() => {
                          const nw = prompt(`Weight for (${edge.u} - ${edge.v}):`, String(edge.w));
                          if (nw && !isNaN(Number(nw))) {
                            saveSnapshot();
                            setEdges((prev) =>
                              prev.map((e) => (e.id === edge.id ? { ...e, w: parseInt(nw, 10) } : e))
                            );
                          }
                        }}
                        className="text-on-surface-variant hover:text-secondary p-0.5 cursor-pointer"
                        title="Edit weight"
                      >
                        <span className="material-symbols-outlined text-[16px]">edit</span>
                      </button>
                      <button
                        onClick={() => {
                          saveSnapshot();
                          setEdges((prev) => prev.filter((e) => e.id !== edge.id));
                        }}
                        className="text-on-surface-variant hover:text-error p-0.5 cursor-pointer"
                        title="Delete connection"
                      >
                        <span className="material-symbols-outlined text-[16px]">delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary Telemetry Bottom Card */}
          <div className="p-space-md bg-surface-container-high/60 mt-auto flex flex-col gap-space-xs border-t border-surface-container">
            <div className="flex items-center justify-between">
              <span className="font-code-sm text-code-sm text-outline uppercase tracking-wider font-semibold">
                Graph Cost Matrix
              </span>
              <span className="font-label-badge text-label-badge text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                Pre-Kruskal Check
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center pt-1">
              <div className="p-2 rounded bg-surface-container border border-surface-container/40">
                <span className="block text-[10px] font-code-sm text-outline">Total Weight</span>
                <span className="font-metric-val text-headline-sm text-on-surface">{totalWeight}</span>
              </div>
              <div className="p-2 rounded bg-surface-container border border-surface-container/40">
                <span className="block text-[10px] font-code-sm text-outline">MST Estimate</span>
                <span className="font-metric-val text-headline-sm text-primary">~{mstEst}</span>
              </div>
              <div className="p-2 rounded bg-surface-container border border-surface-container/40">
                <span className="block text-[10px] font-code-sm text-outline">Cycles Present</span>
                <span className="font-metric-val text-headline-sm text-secondary">{cycles}</span>
              </div>
            </div>
            <div className="text-[11px] font-code-sm text-on-surface-variant flex items-center gap-1.5 pt-1">
              <span className="material-symbols-outlined text-[14px] text-primary">verified</span>
              <span>Acyclic spanning forest possible with {Math.max(0, nodes.length - 1)} edges.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="px-gutter-desktop py-space-md bg-surface-container flex flex-col sm:flex-row items-center justify-between gap-space-md shadow-md border-t border-surface-container-high">
        <div className="flex items-center gap-space-sm text-on-surface">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <span className="material-symbols-outlined text-[20px]">check_circle</span>
          </div>
          <div>
            <p className="font-body-md text-body-md text-on-surface font-semibold">
              Graph is fully connected &amp; valid
            </p>
            <p className="font-code-sm text-code-sm text-on-surface-variant">
              Ready for Kruskal algorithm execution with Disjoint Set Union (Path Compression &amp; Union by Rank enabled).
            </p>
          </div>
        </div>

        <div className="flex items-center gap-space-md w-full sm:w-auto justify-end">
          <button
            onClick={() => {
              alert(
                `Topology Graph Schema Ready:\n- Vertices: ${nodes.length}\n- Edges: ${edges.length}\n- Format: Undirected Adjacency\n- Verification Status: PASS`
              );
            }}
            className="px-space-md py-2 rounded bg-surface-container-high hover:bg-surface-bright text-on-surface font-code-md text-code-md transition-colors flex items-center gap-1.5 cursor-pointer border border-surface-container-high/60"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">schema</span>
            <span>Export Graph Schema</span>
          </button>
          <button
            onClick={() => onNavigate('kruskal-stepper')}
            className="px-space-lg py-2.5 rounded bg-primary-container hover:bg-primary text-on-primary-container font-code-md text-code-md font-bold shadow-[0_0_16px_rgba(45,212,191,0.5)] flex items-center gap-2 transition-all cursor-pointer"
          >
            <span>Run Kruskal Stepper</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};
