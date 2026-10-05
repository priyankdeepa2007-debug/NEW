import React, { useState } from 'react';
import { ScreenId } from '../types';

interface Screen04Props {
  onNavigate: (screen: ScreenId) => void;
}

export const Screen04DataStructures: React.FC<Screen04Props> = ({ onNavigate }) => {
  const [hasPathComp, setHasPathComp] = useState<boolean>(true);
  const [hasUnionRank, setHasUnionRank] = useState<boolean>(true);

  const [parentArray, setParentArray] = useState<number[]>([0, 0, 0, 0, 0, 5, 6]);
  const [rankArray, setRankArray] = useState<number[]>([2, 0, 0, 0, 0, 0, 0]);
  const [highlightP4, setHighlightP4] = useState<boolean>(false);
  const [highlightP5, setHighlightP5] = useState<boolean>(false);
  const [statusMsg, setStatusMsg] = useState<{ text: string; isAction: boolean }>({
    text: 'DSU State: Ready. Memory addresses indexed [0..6].',
    isAction: false,
  });

  const [naiveHopCount, setNaiveHopCount] = useState<string>('4 Steps');
  const [optHopCount, setOptHopCount] = useState<string>('1 Step');
  const [showNaiveTrail, setShowNaiveTrail] = useState<boolean>(false);

  const handleRunFind4 = () => {
    setShowNaiveTrail(true);
    setTimeout(() => setShowNaiveTrail(false), 1800);

    setNaiveHopCount('4 Steps (Deep)');
    const hops = hasPathComp ? '1 Step (Root Direct)' : '2 Steps';
    setOptHopCount(hops);

    if (hasPathComp) {
      setHighlightP4(true);
      setTimeout(() => setHighlightP4(false), 1200);
      setStatusMsg({
        text: 'Find(4) executed: Root 0 discovered in 1 step via collapsed pointer. parent[4] cached to 0.',
        isAction: true,
      });
    } else {
      setStatusMsg({
        text: 'Find(4) executed without Path Compression: Traversing chain pointers linearly.',
        isAction: false,
      });
    }
  };

  const handleRunUnion25 = () => {
    setParentArray((prev) => {
      const next = [...prev];
      next[5] = 0; // attach 5 to canonical root 0
      return next;
    });

    if (hasUnionRank) {
      // rank remains 2 because rank(5)=0 < rank(0)=2
      setRankArray((prev) => [...prev]);
    }

    setHighlightP5(true);
    setTimeout(() => setHighlightP5(false), 1500);

    setStatusMsg({
      text: 'Union(2, 5) completed: root(5) attached directly to canonical root(0). Sets merged successfully.',
      isAction: true,
    });
  };

  const handleReset = () => {
    setParentArray([0, 0, 0, 0, 0, 5, 6]);
    setRankArray([2, 0, 0, 0, 0, 0, 0]);
    setNaiveHopCount('4 Steps');
    setOptHopCount('1 Step');
    setStatusMsg({
      text: 'DSU Memory Vectors reset to initial baseline values.',
      isAction: false,
    });
  };

  return (
    <div className="flex flex-col w-full pb-space-xl">
      <div className="p-space-lg md:p-space-xl space-y-space-xl max-w-[1720px] mx-auto w-full">
        {/* Top Header Banner */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md bg-surface-container-low p-space-lg rounded-xl shadow-md border border-surface-container/40">
          <div className="space-y-space-xs">
            <div className="flex items-center gap-space-sm flex-wrap">
              <span className="font-code-sm text-code-sm text-primary uppercase tracking-widest font-semibold">
                Module 04 // Architecture
              </span>
              <span className="text-outline">/</span>
              <span className="font-code-sm text-code-sm text-on-surface-variant">
                Disjoint Sets, Heaps &amp; Memory Layout
              </span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
              04. Core Data Structures &amp; Disjoint Set Union (DSU) Implementation
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-4xl">
              Comprehensive breakdown of arrays, priority queues, and amortized tree optimizations. Designed for instant
              cycle invalidation and near-constant amortized verification.
            </p>
          </div>

          <button
            onClick={() => onNavigate('marks-dashboard')}
            className="group shrink-0 inline-flex items-center gap-space-sm px-space-md py-space-sm rounded-lg bg-tertiary-container/15 hover:bg-tertiary-container/25 text-tertiary transition-all shadow-sm cursor-pointer border border-tertiary-container/30"
          >
            <div className="w-7 h-7 rounded bg-tertiary/20 flex items-center justify-center text-tertiary">
              <span className="material-symbols-outlined text-[18px]">verified</span>
            </div>
            <div className="flex flex-col text-left">
              <span className="font-label-badge text-label-badge text-tertiary uppercase tracking-wider font-bold">
                Criterion: Implementation using Data Structures
              </span>
              <span className="font-code-md text-code-md text-on-surface font-semibold flex items-center gap-1">
                40 Marks Allocated
                <span className="material-symbols-outlined text-[14px] text-tertiary group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </span>
            </div>
          </button>
        </div>

        {/* 4 Architectural Core Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-space-md">
          {/* Card 1 */}
          <div className="bg-surface-container rounded-xl p-space-lg shadow-sm flex flex-col justify-between hover:bg-surface-container-high transition-colors border border-surface-container-high/60">
            <div className="space-y-space-sm">
              <div className="flex items-center justify-between">
                <span className="font-label-badge text-label-badge px-2 py-0.5 rounded bg-surface-container-lowest text-secondary font-bold">
                  STRUCT 01
                </span>
                <span className="material-symbols-outlined text-secondary text-[22px]">data_array</span>
              </div>
              <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                Edge List (Array of Tuples)
              </h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Flat linear memory buffer storing{' '}
                <code className="font-code-sm text-code-sm text-primary-fixed bg-surface-container-lowest px-1 py-0.5 rounded">
                  (u, v, w)
                </code>{' '}
                records. Contiguous cache locality maximizes branch prediction throughput.
              </p>
            </div>
            <div className="mt-space-md pt-space-md bg-surface-container-low/50 -mx-space-lg -mb-space-lg p-space-md rounded-b-xl flex items-center justify-between border-t border-surface-container-high/40">
              <div>
                <span className="font-code-sm text-code-sm text-outline block">Memory Bound</span>
                <span className="font-metric-val text-headline-sm text-on-surface">O(E)</span>
              </div>
              <div className="text-right">
                <span className="font-code-sm text-code-sm text-outline block">Architectural Purpose</span>
                <span className="font-code-sm text-code-sm text-secondary font-semibold">Sequential Quicksort</span>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-surface-container rounded-xl p-space-lg shadow-sm flex flex-col justify-between hover:bg-surface-container-high transition-colors border border-surface-container-high/60">
            <div className="space-y-space-sm">
              <div className="flex items-center justify-between">
                <span className="font-label-badge text-label-badge px-2 py-0.5 rounded bg-surface-container-lowest text-primary font-bold">
                  STRUCT 02
                </span>
                <span className="material-symbols-outlined text-primary text-[22px]">sort</span>
              </div>
              <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">Sorted Array / Min-Heap</h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Orders network links monotonically by non-decreasing latency weight. Provides strictly deterministic
                candidate selection for the greedy Kruskal pass.
              </p>
            </div>
            <div className="mt-space-md pt-space-md bg-surface-container-low/50 -mx-space-lg -mb-space-lg p-space-md rounded-b-xl flex items-center justify-between border-t border-surface-container-high/40">
              <div>
                <span className="font-code-sm text-code-sm text-outline block">Time Complexity</span>
                <span className="font-metric-val text-headline-sm text-on-surface">O(E log E)</span>
              </div>
              <div className="text-right">
                <span className="font-code-sm text-code-sm text-outline block">Architectural Purpose</span>
                <span className="font-code-sm text-code-sm text-primary font-semibold">Greedy Invariant</span>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-surface-container rounded-xl p-space-lg shadow-sm flex flex-col justify-between hover:bg-surface-container-high transition-colors border border-surface-container-high/60">
            <div className="space-y-space-sm">
              <div className="flex items-center justify-between">
                <span className="font-label-badge text-label-badge px-2 py-0.5 rounded bg-surface-container-lowest text-tertiary font-bold">
                  STRUCT 03
                </span>
                <span className="material-symbols-outlined text-tertiary text-[22px]">account_tree</span>
              </div>
              <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">DSU: parent[] &amp; rank[]</h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Maintains dynamic partitions across vertices. Employs path compression with rank-balanced tree merge
                mechanics to prevent tree elongation.
              </p>
            </div>
            <div className="mt-space-md pt-space-md bg-surface-container-low/50 -mx-space-lg -mb-space-lg p-space-md rounded-b-xl flex items-center justify-between border-t border-surface-container-high/40">
              <div>
                <span className="font-code-sm text-code-sm text-outline block">Amortized Cost</span>
                <span className="font-metric-val text-headline-sm text-on-surface">O(α(V))</span>
              </div>
              <div className="text-right">
                <span className="font-code-sm text-code-sm text-outline block">Architectural Purpose</span>
                <span className="font-code-sm text-code-sm text-tertiary font-semibold">Cycle Detection</span>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-surface-container rounded-xl p-space-lg shadow-sm flex flex-col justify-between hover:bg-surface-container-high transition-colors border border-surface-container-high/60">
            <div className="space-y-space-sm">
              <div className="flex items-center justify-between">
                <span className="font-label-badge text-label-badge px-2 py-0.5 rounded bg-surface-container-lowest text-primary-fixed font-bold">
                  STRUCT 04
                </span>
                <span className="material-symbols-outlined text-primary-fixed text-[22px]">reorder</span>
              </div>
              <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                Adjacency List (Vector Pairs)
              </h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Targeted network graph representation consumed by post-MST validations, depth-first connectivity audits,
                and bridge cut-vertex detection algorithms.
              </p>
            </div>
            <div className="mt-space-md pt-space-md bg-surface-container-low/50 -mx-space-lg -mb-space-lg p-space-md rounded-b-xl flex items-center justify-between border-t border-surface-container-high/40">
              <div>
                <span className="font-code-sm text-code-sm text-outline block">Memory Footprint</span>
                <span className="font-metric-val text-headline-sm text-on-surface">O(V + E)</span>
              </div>
              <div className="text-right">
                <span className="font-code-sm text-code-sm text-outline block">Architectural Purpose</span>
                <span className="font-code-sm text-code-sm text-primary-fixed font-semibold">Resilience Audit</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive DSU Forest Workbench */}
        <div className="bg-surface-container rounded-xl shadow-lg overflow-hidden flex flex-col border border-surface-container-high">
          {/* Toolbar Header */}
          <div className="p-space-md md:p-space-lg bg-surface-container-low flex flex-col lg:flex-row lg:items-center justify-between gap-space-md border-b border-surface-container">
            <div className="flex items-center gap-space-md">
              <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary shadow-sm">
                <span className="material-symbols-outlined text-[24px]">visibility</span>
              </div>
              <div>
                <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  Interactive DSU Forest Workbench
                </h2>
                <p className="font-code-sm text-code-sm text-on-surface-variant">
                  Real-time dynamic parent pointer transformation &amp; pointer collapse
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center flex-wrap gap-space-md">
              <div className="flex items-center gap-space-sm bg-surface-container px-space-sm py-1.5 rounded-lg border border-surface-container-high/60">
                <label className="font-code-sm text-code-sm text-on-surface flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={hasPathComp}
                    onChange={(e) => setHasPathComp(e.target.checked)}
                    className="accent-primary rounded"
                  />
                  <span>Path Compression</span>
                </label>
                <span className="text-outline">|</span>
                <label className="font-code-sm text-code-sm text-on-surface flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={hasUnionRank}
                    onChange={(e) => setHasUnionRank(e.target.checked)}
                    className="accent-primary rounded"
                  />
                  <span>Union by Rank</span>
                </label>
              </div>

              <div className="flex items-center gap-space-xs">
                <button
                  onClick={handleRunFind4}
                  className="px-space-md py-1.5 rounded bg-primary-container text-on-primary-container font-code-md text-code-md font-bold hover:bg-primary transition-all shadow-sm flex items-center gap-1 cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">search</span>
                  Run Find(4)
                </button>
                <button
                  onClick={handleRunUnion25}
                  className="px-space-md py-1.5 rounded bg-surface-container-high text-secondary hover:bg-surface-bright transition-all font-code-md text-code-md font-semibold flex items-center gap-1 cursor-pointer border border-surface-container-high"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">merge</span>
                  Run Union(2, 5)
                </button>
                <button
                  onClick={handleReset}
                  className="px-space-sm py-1.5 rounded bg-surface-container text-on-surface-variant hover:text-on-surface transition-all font-code-md text-code-md cursor-pointer border border-surface-container-high"
                  type="button"
                  title="Reset DSU Memory"
                >
                  <span className="material-symbols-outlined text-[18px]">restart_alt</span>
                </button>
              </div>
            </div>
          </div>

          {/* Comparative Canvas Panes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-surface-container-lowest">
            {/* Left Sub-Panel: Naive Forest */}
            <div className="bg-surface-container p-space-lg flex flex-col justify-between border-r border-surface-container/30">
              <div className="space-y-space-xs mb-space-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-error"></span>
                    <span className="font-code-md text-code-md text-error font-bold uppercase tracking-wider">
                      Naive Parent Forest
                    </span>
                  </div>
                  <span className="font-code-sm text-code-sm text-on-surface-variant bg-surface-container-low px-2 py-0.5 rounded border border-surface-container/50">
                    No Optimizations
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Arbitrary merge direction yields worst-case degenerate linked list with linear search penalty.
                </p>
              </div>

              <div className="relative w-full h-64 bg-surface-container-lowest rounded-lg p-space-sm flex items-center justify-center overflow-hidden border border-surface-container/40">
                <svg className="w-full h-full select-none" viewBox="0 0 520 220" preserveAspectRatio="xMidYMid meet">
                  <defs>
                    <marker id="arrowNaive" markerWidth="6" markerHeight="6" refX="22" refY="5" viewBox="0 0 10 10" orient="auto-start-reverse">
                      <path d="M 0 1 L 9 5 L 0 9 z" fill="#ffb4ab" />
                    </marker>
                  </defs>

                  {/* Links: 4 -> 3 -> 2 -> 1 -> R(0) */}
                  <path d="M 450 110 L 360 110" markerEnd="url(#arrowNaive)" stroke="#ffb4ab" strokeDasharray="4 2" strokeWidth="2" />
                  <path d="M 360 110 L 270 110" markerEnd="url(#arrowNaive)" stroke="#ffb4ab" strokeDasharray="4 2" strokeWidth="2" />
                  <path d="M 270 110 L 180 110" markerEnd="url(#arrowNaive)" stroke="#ffb4ab" strokeDasharray="4 2" strokeWidth="2" />
                  <path d="M 180 110 L 90 110" markerEnd="url(#arrowNaive)" stroke="#ffb4ab" strokeDasharray="4 2" strokeWidth="2" />

                  {/* Root 0 */}
                  <g>
                    <circle cx="90" cy="110" r="18" fill="#151b2a" stroke="#ffb4ab" strokeWidth="2.5" />
                    <text x="90" y="115" fill="#dce2f6" fontFamily="JetBrains Mono" fontSize="12" fontWeight="700" textAnchor="middle">
                      0 (R)
                    </text>
                  </g>
                  {/* Nodes 1, 2, 3, 4 */}
                  {[
                    { id: 1, x: 180 },
                    { id: 2, x: 270 },
                    { id: 3, x: 360 },
                    { id: 4, x: 450 },
                  ].map((node) => (
                    <g key={node.id}>
                      <circle cx={node.x} cy="110" r="17" fill="#151b2a" stroke={node.id === 4 ? '#ffb4ab' : '#859490'} strokeWidth="2" />
                      <text x={node.x} y="114" fill="#dce2f6" fontFamily="JetBrains Mono" fontSize="11" textAnchor="middle">
                        {node.id}
                      </text>
                    </g>
                  ))}

                  {/* Hop Trail Pulse */}
                  {showNaiveTrail && (
                    <g>
                      <circle cx="450" cy="110" r="26" fill="none" stroke="#ffb4ab" strokeWidth="2" className="animate-ping" />
                      <circle cx="360" cy="110" r="26" fill="none" stroke="#ffb4ab" strokeWidth="2" className="animate-ping" />
                      <circle cx="270" cy="110" r="26" fill="none" stroke="#ffb4ab" strokeWidth="2" className="animate-ping" />
                      <circle cx="180" cy="110" r="26" fill="none" stroke="#ffb4ab" strokeWidth="2" className="animate-ping" />
                    </g>
                  )}
                </svg>

                <div className="absolute bottom-2 left-2 bg-surface-container-high/90 px-2.5 py-1 rounded font-code-sm text-code-sm text-on-surface-variant flex items-center gap-2 border border-surface-container-high">
                  <span className="material-symbols-outlined text-[14px] text-error">trending_down</span>
                  <span>
                    Degenerate Chain Depth: <strong className="text-error">4 hops</strong>
                  </span>
                </div>
              </div>

              {/* Telemetry Footer */}
              <div className="mt-space-md grid grid-cols-2 gap-space-sm text-left">
                <div className="p-space-sm rounded bg-surface-container-low border border-surface-container/40">
                  <span className="font-code-sm text-code-sm text-outline block">Find Worst Case</span>
                  <span className="font-metric-val text-headline-sm text-error">O(V)</span>
                </div>
                <div className="p-space-sm rounded bg-surface-container-low border border-surface-container/40">
                  <span className="font-code-sm text-code-sm text-outline block">Traversal Stack</span>
                  <span className="font-metric-val text-headline-sm text-on-surface">{naiveHopCount}</span>
                </div>
              </div>
            </div>

            {/* Right Sub-Panel: Optimized DSU */}
            <div className="bg-surface-container p-space-lg flex flex-col justify-between">
              <div className="space-y-space-xs mb-space-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
                    <span className="font-code-md text-code-md text-primary font-bold uppercase tracking-wider">
                      Optimized DSU Forest
                    </span>
                  </div>
                  <span className="font-code-sm text-code-sm text-primary bg-primary/10 px-2 py-0.5 rounded font-semibold border border-primary/20">
                    Rank Balanced + Collapsed
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Path compression rewires visited descendants straight to canonical root; star topology emerges.
                </p>
              </div>

              <div className="relative w-full h-64 bg-surface-container-lowest rounded-lg p-space-sm flex items-center justify-center overflow-hidden border border-surface-container/40">
                <svg className="w-full h-full select-none" viewBox="0 0 520 220" preserveAspectRatio="xMidYMid meet">
                  <defs>
                    <marker id="arrowOpt" markerWidth="6" markerHeight="6" refX="22" refY="5" viewBox="0 0 10 10" orient="auto-start-reverse">
                      <path d="M 0 1 L 9 5 L 0 9 z" fill="#57f1db" />
                    </marker>
                  </defs>

                  {/* Compressed Star Edges */}
                  <path d="M 100 170 L 260 60" markerEnd="url(#arrowOpt)" stroke="#57f1db" strokeOpacity="0.8" strokeWidth="2" />
                  <path d="M 200 175 L 260 60" markerEnd="url(#arrowOpt)" stroke="#57f1db" strokeOpacity="0.8" strokeWidth="2" />
                  <path d="M 320 175 L 260 60" markerEnd="url(#arrowOpt)" stroke="#57f1db" strokeOpacity="0.8" strokeWidth="2" />
                  <path d="M 420 170 L 260 60" markerEnd="url(#arrowOpt)" stroke="#57f1db" strokeOpacity="1" strokeWidth="2.5" />

                  {/* Center Root R(0) */}
                  <g>
                    <circle cx="260" cy="60" r="22" fill="#151b2a" stroke="#57f1db" strokeWidth="3" />
                    <circle cx="260" cy="60" r="30" fill="none" stroke="#57f1db" strokeOpacity="0.4" strokeWidth="1" className="animate-pulse" />
                    <text x="260" y="65" fill="#57f1db" fontFamily="JetBrains Mono" fontSize="13" fontWeight="700" textAnchor="middle">
                      0 (R)
                    </text>
                  </g>

                  {/* Collapsed Children */}
                  <g>
                    <circle cx="100" cy="170" r="17" fill="#151b2a" stroke="#7bd0ff" strokeWidth="2" />
                    <text x="100" y="174" fill="#dce2f6" fontFamily="JetBrains Mono" fontSize="11" textAnchor="middle">1</text>
                  </g>
                  <g>
                    <circle cx="200" cy="175" r="17" fill="#151b2a" stroke="#7bd0ff" strokeWidth="2" />
                    <text x="200" y="179" fill="#dce2f6" fontFamily="JetBrains Mono" fontSize="11" textAnchor="middle">2</text>
                  </g>
                  <g>
                    <circle cx="320" cy="175" r="17" fill="#151b2a" stroke="#7bd0ff" strokeWidth="2" />
                    <text x="320" y="179" fill="#dce2f6" fontFamily="JetBrains Mono" fontSize="11" textAnchor="middle">3</text>
                  </g>
                  <g>
                    <circle cx="420" cy="170" r="18" fill="#151b2a" stroke="#57f1db" strokeWidth="2.5" />
                    <text x="420" y="175" fill="#57f1db" fontFamily="JetBrains Mono" fontSize="12" fontWeight="700" textAnchor="middle">4</text>
                  </g>
                </svg>

                <div className="absolute bottom-2 left-2 bg-surface-container-high/90 px-2.5 py-1 rounded font-code-sm text-code-sm text-primary flex items-center gap-2 border border-surface-container-high">
                  <span className="material-symbols-outlined text-[14px]">bolt</span>
                  <span>Direct Root Access: <strong>1 hop</strong></span>
                </div>
              </div>

              {/* Telemetry Footer */}
              <div className="mt-space-md grid grid-cols-2 gap-space-sm text-left">
                <div className="p-space-sm rounded bg-surface-container-low border border-surface-container/40">
                  <span className="font-code-sm text-code-sm text-outline block">Amortized Inverse Ackermann</span>
                  <span className="font-metric-val text-headline-sm text-primary">O(α(V)) ≤ 4</span>
                </div>
                <div className="p-space-sm rounded bg-surface-container-low border border-surface-container/40">
                  <span className="font-code-sm text-code-sm text-outline block">Traversal Stack</span>
                  <span className="font-metric-val text-headline-sm text-primary">{optHopCount}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Live DSU Memory Arrays Section */}
          <div className="p-space-lg bg-surface-container-low border-t border-surface-container">
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-space-md mb-space-md">
              <div className="space-y-space-xs">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-tertiary">memory</span>
                  <span className="font-code-md text-code-md text-on-surface font-bold uppercase tracking-wider">
                    Live Contiguous Memory Vectors (RAM State)
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Direct index mapping for parent array and union height/rank balancing registers.
                </p>
              </div>

              {/* Live Status Banner */}
              <div className="font-code-sm text-code-sm bg-surface-container-highest px-space-md py-1.5 rounded-lg text-primary flex items-center gap-2 border border-surface-container-high">
                <span className={`w-2 h-2 rounded-full ${statusMsg.isAction ? 'bg-primary' : 'bg-secondary'} animate-ping`}></span>
                <span>{statusMsg.text}</span>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left font-code-md text-code-md border-collapse">
                <thead>
                  <tr className="bg-surface-container-highest/60 text-outline uppercase font-code-sm text-code-sm tracking-wider">
                    <th className="p-space-sm rounded-l">Register / Vector</th>
                    <th className="p-space-sm text-center">idx [0]</th>
                    <th className="p-space-sm text-center">idx [1]</th>
                    <th className="p-space-sm text-center">idx [2]</th>
                    <th className="p-space-sm text-center">idx [3]</th>
                    <th className="p-space-sm text-center">idx [4]</th>
                    <th className="p-space-sm text-center">idx [5]</th>
                    <th className="p-space-sm text-center rounded-r">idx [6]</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container">
                  {/* Vertex ID */}
                  <tr className="hover:bg-surface-container-high/40 transition-colors">
                    <td className="p-space-sm font-semibold text-secondary flex items-center gap-2">
                      <span className="material-symbols-outlined text-[16px]">pin</span>
                      <span>vertex</span>
                    </td>
                    {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                      <td key={i} className="p-space-sm text-center font-bold text-on-surface">
                        {i}
                      </td>
                    ))}
                  </tr>
                  {/* Parent Array */}
                  <tr className="hover:bg-surface-container-high/40 transition-colors">
                    <td className="p-space-sm font-semibold text-primary flex items-center gap-2">
                      <span className="material-symbols-outlined text-[16px]">subdirectory_arrow_right</span>
                      <span>parent[i]</span>
                    </td>
                    {parentArray.map((val, idx) => {
                      const isHigh = (idx === 4 && highlightP4) || (idx === 5 && highlightP5);
                      return (
                        <td
                          key={idx}
                          className={`p-space-sm text-center font-bold transition-all duration-300 ${
                            isHigh
                              ? 'bg-primary text-on-primary scale-110 shadow-md'
                              : idx === 0
                              ? 'text-primary-fixed bg-surface-container-highest/30'
                              : 'text-on-surface'
                          }`}
                        >
                          {val}
                        </td>
                      );
                    })}
                  </tr>
                  {/* Rank Array */}
                  <tr className="hover:bg-surface-container-high/40 transition-colors">
                    <td className="p-space-sm font-semibold text-tertiary flex items-center gap-2">
                      <span className="material-symbols-outlined text-[16px]">stairs</span>
                      <span>rank[i]</span>
                    </td>
                    {rankArray.map((val, idx) => (
                      <td
                        key={idx}
                        className={`p-space-sm text-center font-bold ${
                          idx === 0 ? 'text-tertiary bg-surface-container-highest/30' : 'text-on-surface-variant'
                        }`}
                      >
                        {val}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Theoretical Foundation & Ackermann Expansion Card */}
        <div className="relative overflow-hidden bg-gradient-to-r from-surface-container-low via-surface-container to-surface-container-high p-space-lg md:p-space-xl rounded-xl shadow-md border border-surface-container/50">
          <div className="absolute -right-12 -top-12 w-64 h-64 rounded-full bg-primary/5 blur-3xl pointer-events-none"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-lg items-center">
            <div className="lg:col-span-2 space-y-space-sm">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-primary text-[20px]">functions</span>
                <span className="font-code-sm text-code-sm text-primary font-bold uppercase tracking-wider">
                  Algorithmic Asymptotics &amp; Limits
                </span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
                Amortized Cost ≈ O(α(V)), where α is the Inverse Ackermann Function
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                While disjoint set operations without optimizations degenerate to{' '}
                <code className="font-code-sm text-code-sm text-error">O(V)</code> per query, the dual application of{' '}
                <em>Path Compression</em> and <em>Union by Rank</em> drops per-operation runtime to{' '}
                <code className="font-code-sm text-code-sm text-primary">O(α(V))</code>.
              </p>
              <div className="p-space-md rounded-lg bg-surface-container-lowest/80 font-code-sm text-code-sm text-on-surface-variant space-y-1 border border-surface-container/40">
                <div className="flex items-center justify-between text-secondary">
                  <span className="font-semibold">Ackermann Sequence Growth rate:</span>
                  <span>A(4, 2) = 2^(65536) &gt; Atoms in observable universe</span>
                </div>
                <div className="text-[12px] text-outline">
                  For any conceivable practical graph size (|V| ≤ 10<sup>80</sup>),{' '}
                  <strong className="text-primary-fixed">α(|V|) &lt; 5</strong>. Thus, DSU operations run in practical
                  constant time <strong className="text-primary">O(1)</strong> in bare-metal deployments.
                </div>
              </div>
            </div>

            {/* Spark Metric */}
            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-inner flex flex-col justify-center items-center text-center space-y-space-xs border border-surface-container/40">
              <span className="font-code-sm text-code-sm text-outline uppercase font-semibold">
                Effective Operations Bound
              </span>
              <div className="flex items-baseline gap-1">
                <span className="font-metric-val text-display text-primary tracking-tighter">α(V) &lt; 5</span>
              </div>
              <span className="font-code-sm text-code-sm text-primary-fixed font-semibold bg-primary/10 px-2 py-0.5 rounded">
                Constant-Time Upper Bound
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant pt-2">
                Zero GC overhead • Single-pass Pointer Fixup
              </span>
            </div>
          </div>
        </div>

        {/* Production C++20 Pseudocode Implementation */}
        <div className="bg-surface-container rounded-xl shadow-lg overflow-hidden border border-surface-container-high">
          {/* Header */}
          <div className="p-space-md bg-surface-container-low flex items-center justify-between border-b border-surface-container">
            <div className="flex items-center gap-space-sm">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-error/70"></span>
                <span className="w-3 h-3 rounded-full bg-secondary-container/70"></span>
                <span className="w-3 h-3 rounded-full bg-primary/70"></span>
              </div>
              <span className="font-code-sm text-code-sm text-on-surface font-semibold ml-2">
                dsu_kruskal_engine.cpp
              </span>
              <span className="font-label-badge text-label-badge text-outline bg-surface-container px-2 py-0.5 rounded">
                C++20 Opt
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-code-sm text-code-sm text-on-surface-variant">Amortized Invariants: Enabled</span>
            </div>
          </div>

          {/* Syntax Code */}
          <div className="p-space-lg bg-surface-container-lowest overflow-x-auto font-code-sm text-code-sm leading-relaxed text-on-surface">
            <pre>
              <code>
                <span className="text-outline">// Core High-Performance Disjoint Set Union Class with Path Flattening</span>{'\n'}
                <span className="text-tertiary">#include &lt;vector&gt;</span>{'\n'}
                <span className="text-tertiary">#include &lt;algorithm&gt;</span>{'\n\n'}
                <span className="text-secondary">struct </span><span className="text-primary-fixed">DisjointSetUnion</span> {'{'}{'\n'}
                {'    '}<span className="text-secondary">std::vector&lt;int&gt;</span> parent;{'\n'}
                {'    '}<span className="text-secondary">std::vector&lt;int&gt;</span> rank;{'\n\n'}
                {'    '}<span className="text-primary-fixed">DisjointSetUnion</span>(<span className="text-secondary">int</span> n) : parent(n), rank(n, <span className="text-primary">0</span>) {'{'}{'\n'}
                {'        '}<span className="text-secondary">for</span> (<span className="text-secondary">int</span> i = <span className="text-primary">0</span>; i &lt; n; ++i) parent[i] = i; <span className="text-outline">// Initial self-root identity</span>{'\n'}
                {'    '}{'}'}{'\n\n'}
                {'    '}<span className="text-outline">// Amortized O(α(V)) Find with recursive path compression</span>{'\n'}
                {'    '}<span className="text-secondary">int </span><span className="text-primary font-bold">find</span>(<span className="text-secondary">int</span> x) {'{'}{'\n'}
                {'        '}<span className="text-secondary">if</span> (parent[x] == x) <span className="text-secondary">return</span> x;{'\n'}
                {'        '}<span className="text-secondary">return</span> parent[x] = <span className="text-primary font-bold">find</span>(parent[x]); <span className="text-outline">// Pointer collapse straight to root</span>{'\n'}
                {'    '}{'}'}{'\n\n'}
                {'    '}<span className="text-outline">// Amortized O(α(V)) Union by Rank: attaches lower depth sub-tree to higher</span>{'\n'}
                {'    '}<span className="text-secondary">bool </span><span className="text-primary font-bold">union_sets</span>(<span className="text-secondary">int</span> a, <span className="text-secondary">int</span> b) {'{'}{'\n'}
                {'        '}a = <span className="text-primary font-bold">find</span>(a);{'\n'}
                {'        '}b = <span className="text-primary font-bold">find</span>(b);{'\n'}
                {'        '}<span className="text-secondary">if</span> (a == b) <span className="text-secondary">return </span><span className="text-error font-semibold">false</span>; <span className="text-outline">// Cycle identified</span>{'\n\n'}
                {'        '}<span className="text-secondary">if</span> (rank[a] &lt; rank[b]) <span className="text-secondary">std::swap</span>(a, b);{'\n'}
                {'        '}parent[b] = a; <span className="text-outline">// Attach root b under root a</span>{'\n'}
                {'        '}<span className="text-secondary">if</span> (rank[a] == rank[b]) rank[a]++;{'\n'}
                {'        '}<span className="text-secondary">return </span><span className="text-primary font-semibold">true</span>;{'\n'}
                {'    '}{'}'}{'\n'}
                {'}'};{'\n\n'}
                <span className="text-outline">// Kruskal&apos;s Minimum Spanning Tree using DisjointSetUnion</span>{'\n'}
                <span className="text-secondary">struct </span><span className="text-primary-fixed">Edge</span> {'{'} <span className="text-secondary">int</span> u, v, weight; {'}'};{'\n\n'}
                <span className="text-secondary">std::vector&lt;Edge&gt; </span><span className="text-primary font-bold">kruskal_mst</span>(<span className="text-secondary">int</span> vertices, <span className="text-secondary">std::vector&lt;Edge&gt;&amp;</span> edges) {'{'}{'\n'}
                {'    '}<span className="text-outline">// Step 1: Greedy Sort by non-decreasing edge weight: O(E log E)</span>{'\n'}
                {'    '}<span className="text-secondary">std::sort</span>(edges.begin(), edges.end(), [](<span className="text-secondary">const </span><span className="text-primary-fixed">Edge&amp;</span> a, <span className="text-secondary">const </span><span className="text-primary-fixed">Edge&amp;</span> b) {'{'}{'\n'}
                {'        '}<span className="text-secondary">return</span> a.weight &lt; b.weight;{'\n'}
                {'    '}{'}'});{'\n\n'}
                {'    '}<span className="text-primary-fixed">DisjointSetUnion</span> dsu(vertices);{'\n'}
                {'    '}<span className="text-secondary">std::vector&lt;Edge&gt;</span> mst;{'\n'}
                {'    '}mst.reserve(vertices - <span className="text-primary">1</span>);{'\n\n'}
                {'    '}<span className="text-outline">// Step 2: Sequential Invalidation &amp; Acceptance</span>{'\n'}
                {'    '}<span className="text-secondary">for</span> (<span className="text-secondary">const auto&amp;</span> edge : edges) {'{'}{'\n'}
                {'        '}<span className="text-secondary">if</span> (dsu.<span className="text-primary font-bold">union_sets</span>(edge.u, edge.v)) {'{'}{'\n'}
                {'            '}mst.push_back(edge);{'\n'}
                {'            '}<span className="text-secondary">if</span> (mst.size() == <span className="text-secondary">static_cast&lt;size_t&gt;</span>(vertices - <span className="text-primary">1</span>)) <span className="text-secondary">break</span>;{'\n'}
                {'        '}{'}'}{'\n'}
                {'    '}{'}'}{'\n'}
                {'    '}<span className="text-secondary">return</span> mst;{'\n'}
                {'}'}
              </code>
            </pre>
          </div>
        </div>

        {/* Structure-to-Complexity Operational Mapping Table */}
        <div className="bg-surface-container rounded-xl shadow-lg overflow-hidden space-y-space-sm p-space-lg border border-surface-container-high">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm">
            <div>
              <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                Structure-to-Complexity Operational Mapping
              </h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Direct correlation between algorithmic steps, auxiliary memory footprint, and asymptotic runtime
                boundaries.
              </p>
            </div>
            <span className="font-label-badge text-label-badge text-secondary bg-surface-container-high px-space-sm py-1 rounded">
              5 Operations Mapped
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-body-md text-body-md border-collapse">
              <thead>
                <tr className="bg-surface-container-low text-outline uppercase font-code-sm text-code-sm tracking-wider">
                  <th className="p-space-md rounded-l">Operation</th>
                  <th className="p-space-md">Data Structure Used</th>
                  <th className="p-space-md">Time Complexity</th>
                  <th className="p-space-md">Space Complexity</th>
                  <th className="p-space-md rounded-r">Practical Notes &amp; Cache Behavior</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-high">
                <tr className="hover:bg-surface-container-high/40 transition-colors">
                  <td className="p-space-md font-semibold text-on-surface flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-secondary"></span>
                    Sorting Edges
                  </td>
                  <td className="p-space-md font-code-sm text-code-sm text-on-surface-variant">
                    Introspective Sort / Array
                  </td>
                  <td className="p-space-md font-code-md text-code-md font-bold text-secondary">O(E log E)</td>
                  <td className="p-space-md font-code-md text-code-md text-on-surface-variant">O(1) aux</td>
                  <td className="p-space-md font-body-sm text-body-sm text-on-surface-variant">
                    Dominates overall execution. Highly cache-friendly sequential access.
                  </td>
                </tr>
                <tr className="hover:bg-surface-container-high/40 transition-colors">
                  <td className="p-space-md font-semibold text-on-surface flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                    Find with Path Compression
                  </td>
                  <td className="p-space-md font-code-sm text-code-sm text-on-surface-variant">parent[] array</td>
                  <td className="p-space-md font-code-md text-code-md font-bold text-primary">O(α(V)) amortized</td>
                  <td className="p-space-md font-code-md text-code-md text-on-surface-variant">O(V)</td>
                  <td className="p-space-md font-body-sm text-body-sm text-on-surface-variant">
                    Flattens tree depth dynamically upon every query pass; subsequent hits cost O(1).
                  </td>
                </tr>
                <tr className="hover:bg-surface-container-high/40 transition-colors">
                  <td className="p-space-md font-semibold text-on-surface flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary-fixed"></span>
                    Union by Rank
                  </td>
                  <td className="p-space-md font-code-sm text-code-sm text-on-surface-variant">rank[] array</td>
                  <td className="p-space-md font-code-md text-code-md font-bold text-primary-fixed">
                    O(α(V)) amortized
                  </td>
                  <td className="p-space-md font-code-md text-code-md text-on-surface-variant">O(V)</td>
                  <td className="p-space-md font-body-sm text-body-sm text-on-surface-variant">
                    Attaches shallower tree to deeper canonical root. Strictly bounds height to O(log V).
                  </td>
                </tr>
                <tr className="hover:bg-surface-container-high/40 transition-colors">
                  <td className="p-space-md font-semibold text-on-surface flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-tertiary"></span>
                    Cycle Check
                  </td>
                  <td className="p-space-md font-code-sm text-code-sm text-on-surface-variant">Find(u) == Find(v)</td>
                  <td className="p-space-md font-code-md text-code-md font-bold text-tertiary">O(α(V))</td>
                  <td className="p-space-md font-code-md text-code-md text-on-surface-variant">O(1)</td>
                  <td className="p-space-md font-body-sm text-body-sm text-on-surface-variant">
                    Direct register equality check. Eliminates full BFS/DFS cycle traversal overhead.
                  </td>
                </tr>
                <tr className="hover:bg-surface-container-high/40 transition-colors">
                  <td className="p-space-md font-semibold text-on-surface flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-secondary-fixed"></span>
                    Adjacency Construction
                  </td>
                  <td className="p-space-md font-code-sm text-code-sm text-on-surface-variant">
                    std::vector&lt;pair&lt;int,int&gt;&gt;[]
                  </td>
                  <td className="p-space-md font-code-md text-code-md font-bold text-secondary-fixed">O(V + E)</td>
                  <td className="p-space-md font-code-md text-code-md text-on-surface-variant">O(V + E)</td>
                  <td className="p-space-md font-body-sm text-body-sm text-on-surface-variant">
                    Constructed for subsequent failure simulations, resilience audits, and bridge cut checks.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
