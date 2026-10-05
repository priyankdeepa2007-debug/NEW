import React, { useState } from 'react';
import { ScreenId } from '../types';

interface Screen01Props {
  onNavigate: (screen: ScreenId) => void;
}

export const Screen01ProblemApproach: React.FC<Screen01Props> = ({ onNavigate }) => {
  const [selectedStep, setSelectedStep] = useState<number>(1);

  const stepData: Record<number, { tag: string; desc: string; code: string; icon: string }> = {
    1: {
      tag: 'STAGE 01 INVARIANT: GRAPH MODELING',
      desc: 'Network is represented as an undirected graph G = (V, E) where nodes represent computational clusters and edges signify physical fiber backbones.',
      code: 'typedef struct { int u, v, w; } Edge;',
      icon: 'hub',
    },
    2: {
      tag: 'STAGE 02 INVARIANT: EDGE FLATTENING',
      desc: 'Avoid O(V²) adjacency matrices by organizing edges directly in a contiguous array. Reduces cache misses and fits memory-constrained edge switches.',
      code: 'std::vector<Edge> edges(M); // |E| contiguous buffer',
      icon: 'dataset',
    },
    3: {
      tag: 'STAGE 03 INVARIANT: GREEDY CANONICAL SORT',
      desc: 'Sorting edges by weight in ascending order establishes the greedy hypothesis. Heaviest edges are pushed to the end of the consideration stream.',
      code: 'std::sort(edges.begin(), edges.end(), [](auto& a, auto& b){ return a.w < b.w; });',
      icon: 'sort',
    },
    4: {
      tag: 'STAGE 04 INVARIANT: DISJOINT SET QUERY',
      desc: 'For edge (u, v), find the canonical root of both endpoints. If roots are distinct, union sets and safely add edge to MST. Otherwise, discard to prevent cycles.',
      code: 'if (dsu.find(u) != dsu.find(v)) { dsu.unite(u, v); mst.push_back(e); }',
      icon: 'account_tree',
    },
    5: {
      tag: 'STAGE 05 INVARIANT: EARLY TERMINATION',
      desc: 'Once exactly |V| - 1 edges are accepted, the tree is provably complete and spanning. Early break avoids processing remaining high-cost edges.',
      code: 'if (mst.size() == V - 1) break; // Guaranteed Spanning Tree',
      icon: 'check_circle',
    },
  };

  const activeInfo = stepData[selectedStep];

  return (
    <div className="flex flex-col w-full pb-space-xl">
      {/* Interactive Top Action / Rubric Bar */}
      <div className="w-full bg-surface-container-lowest/80 backdrop-blur px-space-lg py-space-sm flex flex-wrap items-center justify-between gap-space-md shadow-sm border-b border-surface-container/30">
        <div className="flex items-center gap-space-sm flex-wrap">
          <button
            onClick={() => onNavigate('marks-dashboard')}
            className="group flex items-center gap-2 px-space-md py-1 rounded-full bg-secondary-container/20 hover:bg-secondary-container/30 transition-all cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_rgba(123,208,255,0.8)]"></span>
            <span className="font-code-sm text-code-sm text-secondary font-semibold tracking-wide">
              Criterion: Problem Solving Approach
            </span>
            <span className="font-label-badge text-label-badge bg-surface-container-highest text-secondary-fixed px-1.5 py-0.5 rounded font-bold">
              40 marks
            </span>
            <span className="material-symbols-outlined text-[14px] text-secondary group-hover:translate-x-0.5 transition-transform">
              arrow_forward
            </span>
          </button>
          <span className="font-code-sm text-code-sm text-outline-variant">|</span>
          <span className="font-code-sm text-code-sm text-on-surface-variant flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px] text-primary">verified</span> Formal Proof Verification: Active
          </span>
        </div>
        <div className="flex items-center gap-space-sm text-[12px] font-code-sm">
          <span className="px-2 py-0.5 rounded bg-surface-container-high text-primary-fixed-dim font-medium">
            COMPLEXITY: O(E log E)
          </span>
          <span className="px-2 py-0.5 rounded bg-surface-container-high text-secondary-fixed-dim font-medium">
            DSU: O(α(V))
          </span>
        </div>
      </div>

      <div className="p-space-lg lg:p-space-xl space-y-space-xl max-w-7xl mx-auto w-full">
        {/* Section 1: Header & Problem Statement */}
        <section className="space-y-space-md">
          <div className="flex flex-wrap items-center justify-between gap-space-sm">
            <div className="space-y-1">
              <div className="flex items-center gap-space-sm">
                <span className="font-label-badge text-label-badge tracking-widest text-primary uppercase bg-primary-container/20 px-2 py-0.5 rounded">
                  CORE FOUNDATION
                </span>
                <span className="font-code-sm text-code-sm text-outline">STAGE 01 OF 09</span>
              </div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
                01. Problem Definition &amp; Mathematical Approach
              </h1>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-space-md py-1.5 rounded-lg bg-surface-container-low text-on-surface-variant text-[12px] font-code-sm border border-surface-container/40">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              <span>Target Graph: Undirected, Weighted &amp; Connected</span>
            </div>
          </div>

          {/* Problem Statement Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
            {/* Main Formulation Card */}
            <div className="lg:col-span-8 bg-surface-container-low rounded-xl p-space-lg lg:p-space-xl space-y-space-lg shadow-md relative overflow-hidden border border-surface-container/40">
              <div className="absolute -right-12 -top-12 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
              <div className="flex items-start justify-between gap-space-md">
                <div className="space-y-1">
                  <span className="font-label-badge text-label-badge text-primary uppercase tracking-wider">
                    Mission Directive
                  </span>
                  <h2 className="font-headline-md text-headline-md text-on-surface font-semibold">
                    Infrastructure Minimum Cost Backbone
                  </h2>
                </div>
                <span className="material-symbols-outlined text-[28px] text-primary p-2 bg-surface-container rounded-lg">
                  network_check
                </span>
              </div>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                Connect all <span className="text-secondary font-code-md font-semibold">V</span> nodes of a weighted
                undirected communication network at minimum total cost{' '}
                <span className="text-primary font-code-md font-semibold">∑ w(e)</span>, guaranteeing global reachability
                without creating cycles (forming a spanning tree of exactly{' '}
                <span className="text-secondary font-code-md font-semibold">V - 1</span> edges).
              </p>

              {/* Math Formulation Box */}
              <div className="bg-surface-container-lowest rounded-lg p-space-md space-y-space-sm border border-surface-container/50">
                <div className="flex items-center justify-between text-[11px] font-code-sm text-outline uppercase tracking-wider">
                  <span>Mathematical Optimization Formulation</span>
                  <span className="text-primary-fixed-dim">Objective Function</span>
                </div>
                <div className="font-code-lg text-code-lg text-on-surface bg-surface-container-low/60 rounded px-space-md py-space-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-sm border border-surface-container/30">
                  <div>
                    <span className="text-primary">min </span>
                    <span className="text-on-surface-variant">Cost(T) = </span>
                    <span className="text-secondary font-bold">∑</span>
                    <sub className="text-[10px] text-outline">e ∈ T</sub> <span className="text-tertiary">w(e)</span>
                  </div>
                  <div className="text-[12px] font-code-sm text-on-surface-variant">
                    s.t. <span className="text-primary-fixed">|T| = |V| - 1</span> &amp;{' '}
                    <span className="text-secondary-fixed">Connected(T)</span>
                  </div>
                </div>
              </div>

              {/* Dual Specification Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md pt-space-xs">
                <div className="bg-surface-container p-space-md rounded-lg space-y-1 border border-surface-container/40">
                  <div className="flex items-center gap-1.5 text-secondary text-[12px] font-code-sm font-semibold">
                    <span className="material-symbols-outlined text-[16px]">input</span>
                    <span>INPUT SPECIFICATION</span>
                  </div>
                  <p className="font-code-sm text-code-sm text-on-surface-variant leading-relaxed">
                    G = (V, E) where |V| = n, |E| = m.<br />
                    Weights w: E → ℝ≥0. Graph must be connected.
                  </p>
                </div>
                <div className="bg-surface-container p-space-md rounded-lg space-y-1 border border-surface-container/40">
                  <div className="flex items-center gap-1.5 text-primary text-[12px] font-code-sm font-semibold">
                    <span className="material-symbols-outlined text-[16px]">output</span>
                    <span>OUTPUT SPECIFICATION</span>
                  </div>
                  <p className="font-code-sm text-code-sm text-on-surface-variant leading-relaxed">
                    Tree T ⊆ E such that (V, T) is acyclic, connected, and ∑<sub>e∈T</sub> w(e) is globally minimized.
                  </p>
                </div>
              </div>
            </div>

            {/* Visual Abstract Network Graphic Card */}
            <div className="lg:col-span-4 bg-surface-container-low rounded-xl p-space-lg flex flex-col justify-between shadow-md relative overflow-hidden border border-surface-container/40">
              <div className="space-y-space-xs">
                <span className="font-label-badge text-label-badge text-secondary uppercase">Topology Inspection</span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Base Telemetry Model</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  7 regional data hubs connected via redundant fiber pipelines.
                </p>
              </div>

              {/* Network Diagram with Interactive Weights */}
              <div className="relative w-full h-56 bg-surface-container-lowest rounded-lg my-space-md flex items-center justify-center p-2 overflow-hidden border border-surface-container/50">
                <svg className="w-full h-full select-none" viewBox="0 0 320 200">
                  <defs>
                    <linearGradient id="mstGrad1" x1="0%" x2="100%" y1="0%" y2="100%">
                      <stop offset="0%" stopColor="#57f1db" />
                      <stop offset="100%" stopColor="#2dd4bf" />
                    </linearGradient>
                  </defs>
                  {/* Non-MST Edges (Muted Slate / Redundant) */}
                  <line stroke="#3c4a46" strokeDasharray="3,3" strokeWidth="1.5" x1="60" x2="260" y1="40" y2="40" />
                  <line stroke="#3c4a46" strokeDasharray="3,3" strokeWidth="1.5" x1="160" x2="260" y1="90" y2="160" />
                  <line stroke="#3c4a46" strokeDasharray="3,3" strokeWidth="1.5" x1="60" x2="260" y1="150" y2="160" />

                  {/* Accepted MST Edges (Vivid Teal Glow) */}
                  <line stroke="url(#mstGrad1)" strokeWidth="3" style={{ filter: 'drop-shadow(0 0 5px rgba(87,241,219,0.7))' }} x1="60" x2="160" y1="40" y2="90" />
                  <line stroke="url(#mstGrad1)" strokeWidth="3" style={{ filter: 'drop-shadow(0 0 5px rgba(87,241,219,0.7))' }} x1="60" x2="60" y1="40" y2="150" />
                  <line stroke="url(#mstGrad1)" strokeWidth="3" style={{ filter: 'drop-shadow(0 0 5px rgba(87,241,219,0.7))' }} x1="160" x2="260" y1="90" y2="40" />
                  <line stroke="url(#mstGrad1)" strokeWidth="3" style={{ filter: 'drop-shadow(0 0 5px rgba(87,241,219,0.7))' }} x1="160" x2="160" y1="90" y2="170" />
                  <line stroke="url(#mstGrad1)" strokeWidth="3" style={{ filter: 'drop-shadow(0 0 5px rgba(87,241,219,0.7))' }} x1="160" x2="260" y1="170" y2="160" />
                  <line stroke="url(#mstGrad1)" strokeWidth="3" style={{ filter: 'drop-shadow(0 0 5px rgba(87,241,219,0.7))' }} x1="60" x2="160" y1="150" y2="170" />

                  {/* Edge Weight Labels */}
                  <rect fill="#19202e" height="14" rx="3" width="22" x="95" y="55" />
                  <text fill="#57f1db" fontFamily="JetBrains Mono" fontSize="9" fontWeight="700" textAnchor="middle" x="106" y="65">w:2</text>
                  <rect fill="#19202e" height="14" rx="3" width="22" x="45" y="90" />
                  <text fill="#57f1db" fontFamily="JetBrains Mono" fontSize="9" fontWeight="700" textAnchor="middle" x="56" y="100">w:3</text>
                  <rect fill="#19202e" height="14" rx="3" width="22" x="200" y="55" />
                  <text fill="#57f1db" fontFamily="JetBrains Mono" fontSize="9" fontWeight="700" textAnchor="middle" x="211" y="65">w:4</text>
                  <rect fill="#19202e" height="14" rx="3" width="22" x="150" y="30" />
                  <text fill="#859490" fontFamily="JetBrains Mono" fontSize="8" textAnchor="middle" x="161" y="40">w:12</text>

                  {/* Hub Nodes */}
                  <circle cx="60" cy="40" fill="#0c1321" r="14" stroke="#57f1db" strokeWidth="2" />
                  <text fill="#dce2f6" fontFamily="JetBrains Mono" fontSize="10" fontWeight="700" textAnchor="middle" x="60" y="44">V0</text>
                  <circle cx="160" cy="90" fill="#0c1321" r="14" stroke="#57f1db" strokeWidth="2" />
                  <text fill="#dce2f6" fontFamily="JetBrains Mono" fontSize="10" fontWeight="700" textAnchor="middle" x="160" y="94">V1</text>
                  <circle cx="260" cy="40" fill="#0c1321" r="14" stroke="#57f1db" strokeWidth="2" />
                  <text fill="#dce2f6" fontFamily="JetBrains Mono" fontSize="10" fontWeight="700" textAnchor="middle" x="260" y="44">V2</text>
                  <circle cx="60" cy="150" fill="#0c1321" r="14" stroke="#57f1db" strokeWidth="2" />
                  <text fill="#dce2f6" fontFamily="JetBrains Mono" fontSize="10" fontWeight="700" textAnchor="middle" x="60" y="154">V3</text>
                  <circle cx="160" cy="170" fill="#0c1321" r="14" stroke="#57f1db" strokeWidth="2" />
                  <text fill="#dce2f6" fontFamily="JetBrains Mono" fontSize="10" fontWeight="700" textAnchor="middle" x="160" y="174">V4</text>
                  <circle cx="260" cy="160" fill="#0c1321" r="14" stroke="#57f1db" strokeWidth="2" />
                  <text fill="#dce2f6" fontFamily="JetBrains Mono" fontSize="10" fontWeight="700" textAnchor="middle" x="260" y="164">V5</text>
                </svg>
              </div>

              <div className="flex items-center justify-between font-code-sm text-[11px] text-on-surface-variant">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-1 bg-primary rounded-full"></span> MST Link
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-1 bg-outline-variant rounded-full"></span> Redundant Link
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Step-by-Step Approach Flow (Interactive Pipeline) */}
        <section className="space-y-space-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs">
            <div>
              <span className="font-label-badge text-label-badge text-secondary uppercase tracking-wider">
                Operational Pipeline
              </span>
              <h2 className="font-headline-md text-headline-md text-on-surface font-semibold">
                Step-by-Step Execution Sequence
              </h2>
            </div>
            <div className="font-code-sm text-code-sm text-on-surface-variant">
              Click any step to inspect local invariants
            </div>
          </div>

          {/* 5-Step Pipeline Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-space-sm">
            {[
              { num: 1, label: 'INIT', title: 'Graph Modeling', text: 'Model physical topology as G = (V, E) undirected weighted graph.', badge: '|V| vertices, |E| links' },
              { num: 2, label: 'REPR', title: 'Edge List Buffer', text: 'Flatten graph into edge tuples E = [(u, v, w)] avoiding matrix bloat.', badge: 'Space: O(V + E)' },
              { num: 3, label: 'SORT', title: 'Greedy Ordering', text: 'Sort edges in non-decreasing order of weight w(e) via Dual-Pivot Quicksort.', badge: 'Time: O(E log E)' },
              { num: 4, label: 'DSU', title: 'Cycle Check', text: 'Query components: Accept (u,v) iff Find(u) ≠ Find(v); then Union.', badge: 'Amortized: O(α(V))' },
              { num: 5, label: 'HALT', title: 'Termination', text: 'Halt immediately when accepted edges count reaches |V| - 1. Output MST.', badge: 'Output: Verified Tree' },
            ].map((step) => {
              const isSelected = selectedStep === step.num;
              return (
                <div
                  key={step.num}
                  onClick={() => setSelectedStep(step.num)}
                  className={`cursor-pointer group p-space-md rounded-xl space-y-space-sm transition-all duration-200 hover:-translate-y-1 shadow-sm border ${
                    isSelected
                      ? 'bg-surface-container-high border-primary/40 shadow-[0_0_12px_rgba(87,241,219,0.15)]'
                      : 'bg-surface-container-low border-surface-container/30 hover:border-surface-container-high'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`font-metric-val text-headline-sm ${isSelected ? 'text-primary' : 'text-on-surface-variant group-hover:text-primary'}`}>
                      0{step.num}
                    </span>
                    <span className="font-label-badge text-label-badge text-outline bg-surface-container-lowest px-1.5 py-0.5 rounded">
                      {step.label}
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">{step.title}</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">{step.text}</p>
                  <div className={`text-[11px] font-code-sm px-2 py-1 rounded ${isSelected ? 'text-secondary bg-surface-container' : 'text-on-surface-variant bg-surface-container/60'}`}>
                    {step.badge}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Step Invariant Detail Box */}
          <div className="bg-surface-container-lowest p-space-md rounded-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md border border-surface-container/40">
            <div className="flex items-center gap-space-md">
              <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-[20px]">{activeInfo.icon}</span>
              </div>
              <div>
                <div className="text-[12px] font-code-sm text-primary uppercase font-semibold">{activeInfo.tag}</div>
                <div className="font-body-md text-body-md text-on-surface">{activeInfo.desc}</div>
              </div>
            </div>
            <div className="font-code-sm text-code-sm text-on-surface-variant bg-surface-container-low px-space-md py-1.5 rounded flex items-center gap-2 shrink-0 border border-surface-container/30">
              <span className="material-symbols-outlined text-[16px] text-primary">code</span>
              <span>{activeInfo.code}</span>
            </div>
          </div>
        </section>

        {/* Section 3: Core Theorems Side-by-Side */}
        <section className="space-y-space-md">
          <div>
            <span className="font-label-badge text-label-badge text-tertiary-fixed-dim uppercase tracking-wider">
              Rigorous Foundations
            </span>
            <h2 className="font-headline-md text-headline-md text-on-surface font-semibold">
              Fundamental Spanning Tree Theorems
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
            {/* Theorem 1: Cut Property */}
            <div className="bg-surface-container-low rounded-xl p-space-lg space-y-space-md shadow-md flex flex-col justify-between border border-surface-container/40">
              <div className="space-y-space-sm">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[11px] font-code-sm bg-primary-container/20 text-primary font-bold">
                    THEOREM 1
                  </span>
                  <span className="font-code-sm text-[11px] text-outline">Kruskal Soundness</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">The Cut Property</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  For any cut <span className="font-code-sm text-primary">(S, V \ S)</span> in graph{' '}
                  <span className="font-code-sm text-on-surface">G</span>, if edge{' '}
                  <span className="font-code-sm text-primary font-bold">e</span> is the strictly lightest crossing edge,
                  then <span className="font-code-sm text-primary font-bold">e</span> belongs to{' '}
                  <strong className="text-on-surface">all</strong> minimum spanning trees of{' '}
                  <span className="font-code-sm text-on-surface">G</span>.
                </p>
              </div>

              {/* Cut Property Diagram */}
              <div className="w-full bg-surface-container-lowest rounded-lg p-space-md border border-surface-container/40">
                <svg className="w-full h-36 select-none" viewBox="0 0 340 140">
                  <rect fill="#151b2a" height="110" rx="8" stroke="#232a39" strokeWidth="1.5" width="130" x="15" y="15" />
                  <text fill="#859490" fontFamily="JetBrains Mono" fontSize="11" fontWeight="700" x="30" y="35">Cut Partition S</text>
                  <circle cx="50" cy="80" fill="#232a39" r="10" stroke="#3cddc7" strokeWidth="1.5" />
                  <text fill="#dce2f6" fontFamily="JetBrains Mono" fontSize="9" textAnchor="middle" x="50" y="84">u1</text>
                  <circle cx="105" cy="70" fill="#232a39" r="10" stroke="#3cddc7" strokeWidth="1.5" />
                  <text fill="#dce2f6" fontFamily="JetBrains Mono" fontSize="9" textAnchor="middle" x="105" y="74">u2</text>
                  <line stroke="#3c4a46" strokeWidth="2" x1="50" x2="105" y1="80" y2="70" />

                  <rect fill="#151b2a" height="110" rx="8" stroke="#232a39" strokeWidth="1.5" width="130" x="195" y="15" />
                  <text fill="#859490" fontFamily="JetBrains Mono" fontSize="11" fontWeight="700" x="210" y="35">Cut V \ S</text>
                  <circle cx="235" cy="70" fill="#232a39" r="10" stroke="#7bd0ff" strokeWidth="1.5" />
                  <text fill="#dce2f6" fontFamily="JetBrains Mono" fontSize="9" textAnchor="middle" x="235" y="74">v1</text>
                  <circle cx="290" cy="80" fill="#232a39" r="10" stroke="#7bd0ff" strokeWidth="1.5" />
                  <text fill="#dce2f6" fontFamily="JetBrains Mono" fontSize="9" textAnchor="middle" x="290" y="84">v2</text>
                  <line stroke="#3c4a46" strokeWidth="2" x1="235" x2="290" y1="70" y2="80" />

                  <path d="M 105 70 Q 170 30 235 70" fill="none" stroke="#3c4a46" strokeDasharray="3,3" strokeWidth="1.5" />
                  <text fill="#859490" fontFamily="JetBrains Mono" fontSize="9" textAnchor="middle" x="170" y="44">w: 9</text>

                  <line stroke="#57f1db" strokeWidth="3" style={{ filter: 'drop-shadow(0 0 6px rgba(87,241,219,0.8))' }} x1="105" x2="235" y1="70" y2="70" />
                  <rect fill="#070e1c" height="15" rx="3" width="28" x="157" y="63" />
                  <text fill="#57f1db" fontFamily="JetBrains Mono" fontSize="9" fontWeight="700" textAnchor="middle" x="171" y="74">e (w:2)</text>
                </svg>
                <div className="text-[11px] font-code-sm text-primary text-center mt-2">
                  ✓ Edge e (w:2) is the unique minimal crossing bridge → Guaranteed in MST.
                </div>
              </div>
            </div>

            {/* Theorem 2: Cycle Property */}
            <div className="bg-surface-container-low rounded-xl p-space-lg space-y-space-md shadow-md flex flex-col justify-between border border-surface-container/40">
              <div className="space-y-space-sm">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[11px] font-code-sm bg-error-container/20 text-error font-bold">
                    THEOREM 2
                  </span>
                  <span className="font-code-sm text-[11px] text-outline">Cycle Elimination</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">The Cycle Property</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  For any cycle <span className="font-code-sm text-error">C</span> in graph{' '}
                  <span className="font-code-sm text-on-surface">G</span>, if edge{' '}
                  <span className="font-code-sm text-error font-bold">e</span> is the strictly heaviest edge on{' '}
                  <span className="font-code-sm text-error">C</span>, then{' '}
                  <span className="font-code-sm text-error font-bold">e</span> does{' '}
                  <strong className="text-on-surface">not</strong> belong to any MST of{' '}
                  <span className="font-code-sm text-on-surface">G</span>.
                </p>
              </div>

              {/* Cycle Property Diagram */}
              <div className="w-full bg-surface-container-lowest rounded-lg p-space-md border border-surface-container/40">
                <svg className="w-full h-36 select-none" viewBox="0 0 340 140">
                  <circle cx="80" cy="40" fill="#232a39" r="10" stroke="#dce2f6" strokeWidth="1.5" />
                  <text fill="#dce2f6" fontFamily="JetBrains Mono" fontSize="9" textAnchor="middle" x="80" y="44">A</text>
                  <circle cx="260" cy="40" fill="#232a39" r="10" stroke="#dce2f6" strokeWidth="1.5" />
                  <text fill="#dce2f6" fontFamily="JetBrains Mono" fontSize="9" textAnchor="middle" x="260" y="44">B</text>
                  <circle cx="260" cy="110" fill="#232a39" r="10" stroke="#dce2f6" strokeWidth="1.5" />
                  <text fill="#dce2f6" fontFamily="JetBrains Mono" fontSize="9" textAnchor="middle" x="260" y="114">C</text>
                  <circle cx="80" cy="110" fill="#232a39" r="10" stroke="#dce2f6" strokeWidth="1.5" />
                  <text fill="#dce2f6" fontFamily="JetBrains Mono" fontSize="9" textAnchor="middle" x="80" y="114">D</text>

                  <line stroke="#57f1db" strokeWidth="2.5" x1="80" x2="80" y1="40" y2="110" />
                  <rect fill="#070e1c" height="13" rx="3" width="24" x="68" y="70" />
                  <text fill="#57f1db" fontFamily="JetBrains Mono" fontSize="8" textAnchor="middle" x="80" y="80">w:1</text>

                  <line stroke="#57f1db" strokeWidth="2.5" x1="80" x2="260" y1="110" y2="110" />
                  <rect fill="#070e1c" height="13" rx="3" width="24" x="158" y="103" />
                  <text fill="#57f1db" fontFamily="JetBrains Mono" fontSize="8" textAnchor="middle" x="170" y="113">w:3</text>

                  <line stroke="#57f1db" strokeWidth="2.5" x1="260" x2="260" y1="110" y2="40" />
                  <rect fill="#070e1c" height="13" rx="3" width="24" x="248" y="70" />
                  <text fill="#57f1db" fontFamily="JetBrains Mono" fontSize="8" textAnchor="middle" x="260" y="80">w:4</text>

                  <line stroke="#ffb4ab" strokeDasharray="4,4" strokeWidth="2" style={{ filter: 'drop-shadow(0 0 4px rgba(255,180,171,0.6))' }} x1="80" x2="260" y1="40" y2="40" />
                  <rect fill="#93000a" height="15" rx="3" width="40" x="150" y="32" />
                  <text fill="#ffdad6" fontFamily="JetBrains Mono" fontSize="9" fontWeight="700" textAnchor="middle" x="170" y="43">w:14 ✗</text>
                </svg>
                <div className="text-[11px] font-code-sm text-error text-center mt-2">
                  ✗ Edge (A, B) with w=14 is max in cycle A-B-C-D-A → Safely discarded.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Why Kruskal's for Distributed Networks? */}
        <section className="bg-surface-container-low rounded-xl p-space-lg lg:p-space-xl space-y-space-lg shadow-md border border-surface-container/40">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
            <div>
              <span className="font-label-badge text-label-badge text-primary uppercase tracking-wider">
                Algorithm Selection
              </span>
              <h2 className="font-headline-md text-headline-md text-on-surface font-semibold">
                Why Kruskal's for Distributed Networks?
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-code-sm text-code-sm text-secondary bg-surface-container px-2.5 py-1 rounded border border-surface-container/50">
                Optimal for Sparse Infrastructure
              </span>
            </div>
          </div>

          {/* Core Architectural Rationales */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
            <div className="bg-surface-container p-space-md rounded-lg space-y-2 border border-surface-container/40">
              <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[18px]">polyline</span>
              </div>
              <h4 className="font-headline-sm text-headline-sm text-on-surface">Edge-Centric Suitability</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Physical fiber routes are discrete point-to-point assets. Edge-list representations fit real-world network routing manifests seamlessly without auxiliary matrix overhead.
              </p>
            </div>
            <div className="bg-surface-container p-space-md rounded-lg space-y-2 border border-surface-container/40">
              <div className="w-8 h-8 rounded bg-secondary/10 flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[18px]">data_object</span>
              </div>
              <h4 className="font-headline-sm text-headline-sm text-on-surface">Minimal Overhead</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                No dense <span className="font-code-sm text-secondary">O(V²)</span> memory tax. Processing requires only simple edge storage <span className="font-code-sm text-secondary">O(E)</span>, ideal for edge routers with constrained local cache allocations.
              </p>
            </div>
            <div className="bg-surface-container p-space-md rounded-lg space-y-2 border border-surface-container/40">
              <div className="w-8 h-8 rounded bg-tertiary-fixed/10 flex items-center justify-center text-tertiary">
                <span className="material-symbols-outlined text-[18px]">bolt</span>
              </div>
              <h4 className="font-headline-sm text-headline-sm text-on-surface">Near-Constant DSU Lookup</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Disjoint Set Union with Path Compression and Union by Rank reduces cycle check costs to inverse Ackermann{' '}
                <span className="font-code-sm text-primary font-bold">O(α(V))</span> amortized time per operation.
              </p>
            </div>
          </div>

          {/* Alternatives Considered Row */}
          <div className="bg-surface-container-lowest p-space-md rounded-lg space-y-space-sm border border-surface-container/40">
            <span className="font-code-sm text-[11px] text-outline uppercase tracking-wider">
              Comparative Benchmarks &amp; Alternatives
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
              <div className="bg-surface-container-high/60 p-space-md rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm hover:bg-surface-container-high transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">Prim's Algorithm</span>
                    <span className="font-code-sm text-[11px] text-tertiary-container bg-surface-container-lowest px-1.5 py-0.5 rounded">
                      O(E + V log V)
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Vertex-growing cut approach. Superlative for dense topologies where{' '}
                    <span className="font-code-sm text-primary">E ≈ V²</span> with Fibonacci heaps, but complex implementation.
                  </p>
                </div>
                <button
                  onClick={() => onNavigate('algorithm-compare')}
                  className="shrink-0 flex items-center gap-1 font-code-sm text-code-sm text-secondary hover:text-primary transition-colors cursor-pointer"
                >
                  <span>Compare in Screen 05</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>

              <div className="bg-surface-container-high/60 p-space-md rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm hover:bg-surface-container-high transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">Borůvka's Algorithm</span>
                    <span className="font-code-sm text-[11px] text-secondary bg-surface-container-lowest px-1.5 py-0.5 rounded">
                      O(E log V)
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Parallel component contraction. Historically the first MST algorithm (1926) developed for Czech electric network routing.
                  </p>
                </div>
                <button
                  onClick={() => onNavigate('algorithm-compare')}
                  className="shrink-0 flex items-center gap-1 font-code-sm text-code-sm text-secondary hover:text-primary transition-colors cursor-pointer"
                >
                  <span>Compare in Screen 05</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Limitations & Architecture Roadmap */}
        <section className="space-y-space-md">
          <div>
            <span className="font-label-badge text-label-badge text-outline uppercase tracking-wider">
              Operational Realities
            </span>
            <h2 className="font-headline-md text-headline-md text-on-surface font-semibold">
              Limitations &amp; Architecture Roadmap
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
            {/* Current Limitation */}
            <div className="bg-surface-container-low p-space-lg rounded-xl space-y-space-sm shadow-md border border-surface-container/40">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full text-label-badge font-label-badge bg-primary-container text-on-primary-container font-bold">
                  CURRENT ARCHITECTURE
                </span>
                <span className="font-code-sm text-[11px] text-outline">Classical Kruskal</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                Zero Redundancy (Bridge Vulnerability)
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                By mathematical definition, any spanning tree has exactly{' '}
                <span className="font-code-sm text-primary">|V| - 1</span> edges and zero cycles. Consequently,{' '}
                <strong className="text-on-surface">every edge in an MST is a critical bridge</strong>. A single severed link
                partitions the entire communication grid into two isolated islands. Current remedy requires halting transmission and recalculating the MST from scratch.
              </p>
              <div className="p-space-sm rounded bg-surface-container-lowest text-[12px] font-code-sm text-error flex items-center gap-2 border border-error/20">
                <span className="material-symbols-outlined text-[18px]">warning</span>
                <span>Single Point of Failure: Resiliency Factor = 0.00</span>
              </div>
            </div>

            {/* Proposed Extension */}
            <div className="bg-surface-container-low p-space-lg rounded-xl space-y-space-sm shadow-md border border-surface-container/40">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full text-label-badge font-label-badge bg-tertiary-container text-on-tertiary-container font-bold">
                  PROPOSED SPECIFICATION
                </span>
                <span className="font-code-sm text-[11px] text-secondary">Screen 06 &amp; 08 Scope</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                Fault-Tolerant Multi-Criteria Backbone
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Transition to a 2-edge-connected augmentation (2-ECA). We compute primary MST routes alongside pre-calculated backup secondary links with latency and reliability penalty factors. In the event of a fiber severance, traffic fails over in{' '}
                <span className="font-code-sm text-primary">≤ 12ms</span> without re-running global graph searches.
              </p>
              <div className="p-space-sm rounded bg-surface-container-lowest text-[12px] font-code-sm text-primary flex items-center gap-2 border border-primary/20">
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                <span>Continuous Reachability via Pre-computed Dual Disjoint Paths</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Footer Call-to-Action Bar */}
        <div className="bg-surface-container-low p-space-md rounded-xl flex flex-col lg:flex-row items-center justify-between gap-space-md shadow-lg border border-surface-container/40">
          <div className="flex flex-wrap items-center gap-2 sm:gap-space-sm text-[12px] font-code-sm">
            <div className="flex items-center gap-1.5 px-space-md py-1.5 rounded-lg bg-surface-container-lowest border border-surface-container/40">
              <span className="text-outline">Nodes |V|:</span>
              <span className="font-metric-val text-headline-sm text-primary">7</span>
            </div>
            <div className="flex items-center gap-1.5 px-space-md py-1.5 rounded-lg bg-surface-container-lowest border border-surface-container/40">
              <span className="text-outline">Edges |E|:</span>
              <span className="font-metric-val text-headline-sm text-secondary">11</span>
            </div>
            <div className="flex items-center gap-1.5 px-space-md py-1.5 rounded-lg bg-surface-container-lowest border border-surface-container/40">
              <span className="text-outline">Target MST:</span>
              <span className="font-metric-val text-headline-sm text-primary-fixed">6</span>
            </div>
            <div className="flex items-center gap-1.5 px-space-md py-1.5 rounded-lg bg-surface-container-lowest border border-surface-container/40">
              <span className="text-outline">Base Cost:</span>
              <span className="font-metric-val text-headline-sm text-tertiary">33</span>
            </div>
          </div>

          <div className="flex items-center gap-space-sm w-full lg:w-auto justify-end">
            <button
              onClick={() => onNavigate('marks-dashboard')}
              className="px-space-md py-2 rounded-lg bg-surface-container text-secondary font-code-md text-code-md font-bold hover:bg-surface-container-high transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">assignment</span>
              <span>View Rubric Criteria</span>
            </button>
            <button
              onClick={() => onNavigate('graph-builder')}
              className="px-space-md py-2 rounded-lg bg-primary-container text-on-primary-container font-code-md text-code-md font-bold shadow-[0_0_14px_rgba(45,212,191,0.45)] hover:bg-primary hover:text-on-primary transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Open Graph Builder</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
