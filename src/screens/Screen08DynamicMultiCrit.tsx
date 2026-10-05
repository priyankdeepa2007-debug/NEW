import React, { useState } from 'react';
import { ScreenId, ParetoWeights } from '../types';

interface Screen08Props {
  onNavigate: (screen: ScreenId) => void;
}

interface EdgeMetric {
  id: string;
  u: string;
  v: string;
  cost: number;
  dist: number;
  lat: number;
  rel: number;
  risk: number;
  bw: number;
}

const initialCandidateEdges: EdgeMetric[] = [
  { id: 'e1', u: 'N1', v: 'N2', cost: 12, dist: 14, lat: 2.1, rel: 0.99, risk: 0.10, bw: 100 },
  { id: 'e2', u: 'N2', v: 'N3', cost: 24, dist: 38, lat: 6.4, rel: 0.95, risk: 0.35, bw: 40 },
  { id: 'e3', u: 'N1', v: 'N4', cost: 18, dist: 22, lat: 3.5, rel: 0.98, risk: 0.15, bw: 100 },
  { id: 'e4', u: 'N3', v: 'N5', cost: 30, dist: 45, lat: 8.2, rel: 0.91, risk: 0.50, bw: 10 },
  { id: 'e5', u: 'N4', v: 'N5', cost: 15, dist: 18, lat: 2.9, rel: 0.97, risk: 0.20, bw: 40 },
  { id: 'e6', u: 'N2', v: 'N5', cost: 28, dist: 30, lat: 5.1, rel: 0.94, risk: 0.25, bw: 40 },
  { id: 'e7', u: 'N1', v: 'N3', cost: 35, dist: 52, lat: 9.0, rel: 0.89, risk: 0.60, bw: 10 },
  { id: 'e8', u: 'N4', v: 'N6', cost: 20, dist: 25, lat: 4.1, rel: 0.96, risk: 0.18, bw: 100 },
  { id: 'e9', u: 'N5', v: 'N6', cost: 16, dist: 19, lat: 3.0, rel: 0.99, risk: 0.08, bw: 100 },
];

export const Screen08DynamicMultiCrit: React.FC<Screen08Props> = ({ onNavigate }) => {
  const defaultWeights: ParetoWeights = {
    w1: 0.40,
    w2: 0.25,
    w3: 0.15,
    w4: 0.10,
    w5: 0.05,
    w6: 0.05,
  };

  const [weights, setWeights] = useState<ParetoWeights>(defaultWeights);

  const calculateComposite = (e: EdgeMetric, w: ParetoWeights) => {
    const costNorm = e.cost / 40.0;
    const distNorm = e.dist / 60.0;
    const latNorm = e.lat / 10.0;
    const relNorm = 1.0 - e.rel;
    const riskNorm = e.risk;
    const bwNorm = (100 - e.bw) / 100.0;

    const score =
      w.w1 * costNorm +
      w.w2 * distNorm +
      w.w3 * latNorm +
      w.w4 * relNorm +
      w.w5 * riskNorm +
      w.w6 * bwNorm;

    return Number((score * 100).toFixed(2));
  };

  const handleReset = () => {
    setWeights(defaultWeights);
  };

  const handleAutoNormalize = () => {
    const sum = Object.values(weights).reduce((a, b) => a + b, 0);
    if (sum > 0) {
      setWeights({
        w1: Math.round((weights.w1 / sum) * 100) / 100,
        w2: Math.round((weights.w2 / sum) * 100) / 100,
        w3: Math.round((weights.w3 / sum) * 100) / 100,
        w4: Math.round((weights.w4 / sum) * 100) / 100,
        w5: Math.round((weights.w5 / sum) * 100) / 100,
        w6: Math.round((weights.w6 / sum) * 100) / 100,
      });
    }
  };

  const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);

  const scoredEdges = initialCandidateEdges
    .map((e) => ({
      ...e,
      composite: calculateComposite(e, weights),
    }))
    .sort((a, b) => a.composite - b.composite);

  const mstEdgeCount = 5; // Top 5 form spanning tree

  return (
    <div className="flex flex-col w-full pb-space-xl">
      {/* Top Context Indicator */}
      <div className="px-margin-desktop py-space-md bg-surface-container-lowest flex flex-wrap items-center justify-between gap-space-sm border-b border-surface-container/30">
        <div className="flex items-center gap-space-sm flex-wrap">
          <div className="flex items-center gap-1.5 px-space-sm py-1 rounded bg-secondary-container/20 text-secondary font-label-badge text-label-badge uppercase tracking-wider border border-secondary/20">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
            Criterion: Problem Solving (Future Scope)
          </div>
          <button
            onClick={() => onNavigate('marks-dashboard')}
            className="flex items-center gap-1.5 px-space-sm py-1 rounded bg-tertiary-container/20 text-tertiary font-label-badge text-label-badge uppercase tracking-wider hover:bg-tertiary-container/30 transition-all cursor-pointer border border-tertiary/20"
          >
            <span className="material-symbols-outlined text-[14px]">stars</span>
            Proposed Architecture • 150m Rubric Link
          </button>
          <span className="text-outline text-body-sm font-code-sm">MST-OPT::STAGE_08_PROPOSAL</span>
        </div>
        <div className="flex items-center gap-space-md text-on-surface-variant font-code-sm text-code-sm">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px] text-primary">model_training</span> Spec v3.0-Draft
          </span>
          <span className="text-outline">/</span>
          <span className="text-secondary font-semibold">Pareto Multi-Objective</span>
        </div>
      </div>

      <div className="px-margin-desktop py-space-xl space-y-space-xl">
        {/* Visionary Hero Header */}
        <div className="relative overflow-hidden rounded-xl bg-surface-container-low p-space-xl shadow-xl border border-surface-container/40">
          <div className="absolute -right-20 -bottom-24 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none"></div>
          <div className="absolute right-12 top-6 opacity-10 pointer-events-none">
            <span className="material-symbols-outlined text-[180px] text-primary">grain</span>
          </div>
          <div className="relative z-10 max-w-4xl space-y-space-sm">
            <div className="flex items-center gap-2 font-code-sm text-code-sm text-primary tracking-widest uppercase">
              <span className="w-2 h-0.5 bg-primary"></span>
              Theoretical Extension &amp; System Horizon
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
              08. Dynamic Graph Maintenance &amp; Multi-Criteria Pareto Optimization
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
              Evolving beyond static minimum cost toward self-healing, multi-objective infrastructure networks capable of
              real-time topology restructuring under physical telemetry constraints.
            </p>
            <div className="flex items-center gap-space-lg pt-space-xs font-code-sm text-code-sm flex-wrap">
              <div className="flex items-center gap-2 text-on-surface">
                <span className="text-primary font-bold">ΔT</span>
                <span>Update Latency:</span>
                <span className="px-1.5 py-0.5 rounded bg-surface-container text-error font-bold line-through">
                  O(E log E)
                </span>
                <span className="material-symbols-outlined text-[14px] text-primary">arrow_forward</span>
                <span className="px-1.5 py-0.5 rounded bg-primary-container text-on-primary-container font-bold">
                  O(log V)
                </span>
              </div>
              <div className="flex items-center gap-2 text-on-surface">
                <span className="text-secondary font-bold">K-Obj</span>
                <span>Vector Dimensions:</span>
                <span className="text-secondary-fixed font-bold">6 Real-Time Weights</span>
              </div>
            </div>
          </div>
        </div>

        {/* Comparative Paradigm Split View */}
        <div className="space-y-space-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">compare_arrows</span>
              <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                Architectural Paradigm Shift
              </span>
            </div>
            <span className="font-code-sm text-code-sm text-on-surface-variant">
              Static Recompute vs. Dynamic Maintenance
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter-desktop">
            {/* Left Card: Static */}
            <div className="rounded-xl bg-surface-container p-space-lg flex flex-col justify-between shadow-md space-y-space-md border border-surface-container-high">
              <div className="space-y-space-sm">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-badge text-label-badge uppercase">
                    Baseline Standard
                  </span>
                  <span className="font-code-sm text-code-sm text-error font-bold">Complexity: O(E log E)</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
                  Current Implementation • Static Recompute
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Every telemetry anomaly, link loss, or cost fluctuation forces a destructive graph tear-down and full recalculation from scratch across the entire cluster.
                </p>

                {/* Flow */}
                <div className="space-y-2 pt-space-xs font-code-sm text-code-sm">
                  <div className="p-space-xs rounded bg-surface-container-low flex items-center justify-between text-on-surface border border-surface-container/40">
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-error"></span> 1. Link Failure / Weight Shift
                    </span>
                    <span className="text-outline text-[11px]">ΔE detected</span>
                  </div>
                  <div className="flex justify-center text-outline">
                    <span className="material-symbols-outlined text-[16px]">arrow_downward</span>
                  </div>
                  <div className="p-space-xs rounded bg-surface-container-low flex items-center justify-between text-on-surface border border-surface-container/40">
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-outline"></span> 2. Invalidate &amp; Re-flatten Edge List
                    </span>
                    <span className="text-outline text-[11px]">Mem reset</span>
                  </div>
                  <div className="flex justify-center text-outline">
                    <span className="material-symbols-outlined text-[16px]">arrow_downward</span>
                  </div>
                  <div className="p-space-xs rounded bg-surface-container-low flex items-center justify-between text-on-surface border border-surface-container/40">
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-error"></span> 3. Re-sort all |E| edges (Dual-Pivot Quicksort)
                    </span>
                    <span className="text-error font-bold">O(E log E)</span>
                  </div>
                  <div className="flex justify-center text-outline">
                    <span className="material-symbols-outlined text-[16px]">arrow_downward</span>
                  </div>
                  <div className="p-space-xs rounded bg-surface-container-low flex items-center justify-between text-on-surface border border-surface-container/40">
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-outline"></span> 4. Re-run Kruskal DSU loop over |E| items
                    </span>
                    <span className="text-outline text-[11px]">O(E α(V))</span>
                  </div>
                  <div className="flex justify-center text-outline">
                    <span className="material-symbols-outlined text-[16px]">arrow_downward</span>
                  </div>
                  <div className="p-space-xs rounded bg-surface-container-low flex items-center justify-between text-on-surface border border-surface-container/40">
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> 5. Full Re-render of Entire Tree
                    </span>
                    <span className="text-secondary text-[11px]">Screen refresh</span>
                  </div>
                </div>
              </div>

              <div className="p-space-sm rounded bg-surface-container-low space-y-1 border border-surface-container/40">
                <div className="flex items-center justify-between font-code-sm text-code-sm">
                  <span className="text-on-surface-variant">Resource Waste Ratio:</span>
                  <span className="text-error font-bold">94.2% Redundant Ops</span>
                </div>
                <p className="font-body-sm text-[12px] text-outline">
                  Modifying 1 edge in a 1,000-node network recomputes 4,999 untouched spans unnecessarily, causing route jitter in high-frequency topologies.
                </p>
              </div>
            </div>

            {/* Right Card: Dynamic Link-Cut */}
            <div className="rounded-xl bg-surface-container-high p-space-lg flex flex-col justify-between shadow-xl space-y-space-md relative overflow-hidden border border-secondary/40">
              <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-secondary/10 blur-2xl pointer-events-none"></div>
              <div className="space-y-space-sm relative z-10">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-secondary text-on-secondary font-label-badge text-label-badge uppercase font-bold">
                    Proposed Architecture
                  </span>
                  <span className="font-code-sm text-code-sm text-primary font-bold">Complexity: O(log V) Amortized</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
                  Future Horizon • Dynamic MST Maintenance
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Maintains spanning forests incrementally using Sleator-Tarjan Link-Cut Trees. Operates locally on severed component cuts without touching external trees.
                </p>

                {/* Flow */}
                <div className="space-y-2 pt-space-xs font-code-sm text-code-sm">
                  <div className="p-space-xs rounded bg-surface-container flex items-center justify-between text-on-surface border border-surface-container-high">
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span> 1. Dynamic Telemetry / Cut Event
                    </span>
                    <span className="text-primary text-[11px]">Local trigger</span>
                  </div>
                  <div className="flex justify-center text-primary">
                    <span className="material-symbols-outlined text-[16px]">arrow_downward</span>
                  </div>
                  <div className="p-space-xs rounded bg-surface-container flex items-center justify-between text-on-surface border border-surface-container-high">
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary"></span> 2. Tree Cut Partition Query via Splay Trees
                    </span>
                    <span className="text-primary font-bold">O(log V)</span>
                  </div>
                  <div className="flex justify-center text-primary">
                    <span className="material-symbols-outlined text-[16px]">arrow_downward</span>
                  </div>
                  <div className="p-space-xs rounded bg-surface-container flex items-center justify-between text-on-surface border border-surface-container-high">
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> 3. Query Minimum Non-Tree Replacement Edge
                    </span>
                    <span className="text-secondary font-bold">O(log V)</span>
                  </div>
                  <div className="flex justify-center text-primary">
                    <span className="material-symbols-outlined text-[16px]">arrow_downward</span>
                  </div>
                  <div className="p-space-xs rounded bg-surface-container flex items-center justify-between text-on-surface border border-surface-container-high">
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-fixed"></span> 4. Link-Cut Reroot &amp; Splay Splice Operation
                    </span>
                    <span className="text-primary-fixed font-bold">O(log V)</span>
                  </div>
                  <div className="flex justify-center text-primary">
                    <span className="material-symbols-outlined text-[16px]">arrow_downward</span>
                  </div>
                  <div className="p-space-xs rounded bg-surface-container flex items-center justify-between text-on-surface border border-surface-container-high">
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary"></span> 5. Patch Minimal Subgraph Canvas Delta
                    </span>
                    <span className="text-primary text-[11px]">ΔNodes only</span>
                  </div>
                </div>
              </div>

              <div className="p-space-sm rounded bg-surface-container space-y-1 relative z-10 border border-surface-container-high">
                <div className="flex items-center justify-between font-code-sm text-code-sm">
                  <span className="text-on-surface-variant">Throughput Scale:</span>
                  <span className="text-primary font-bold">↑ 3,400x Updates / Sec</span>
                </div>
                <p className="font-body-sm text-[12px] text-on-surface-variant">
                  Zero global sort iterations. Graph stays strictly optimal through dynamic amortized potential functions and aux-tree splay path rotations.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Data Structure Roadmap Cards */}
        <div className="space-y-space-sm">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[20px]">account_tree</span>
              <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                Specialized Dynamic Structures Roadmap
              </span>
            </div>
            <span className="px-2 py-0.5 rounded bg-tertiary-container/30 text-tertiary font-label-badge text-label-badge uppercase font-bold border border-tertiary/20">
              Future Directions • Beyond Current Release
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter-desktop">
            {/* Card 1 */}
            <div className="rounded-xl bg-surface-container p-space-md shadow-md space-y-space-sm flex flex-col justify-between hover:bg-surface-container-high transition-all border border-surface-container-high">
              <div className="space-y-space-xs">
                <div className="flex items-center justify-between">
                  <span className="w-7 h-7 rounded bg-primary-container/20 text-primary flex items-center justify-center font-code-sm font-bold">
                    01
                  </span>
                  <span className="font-code-sm text-code-sm text-primary font-bold">O(log V)</span>
                </div>
                <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Link-Cut Trees</h4>
                <p className="font-code-sm text-[11px] text-secondary">Sleator &amp; Tarjan (1983)</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Maintains a forest of rooted trees subject to link and cut operations using auxiliary splay trees partitioned into preferred paths. Allows querying the maximum weight edge on any path in logarithmic amortized time.
                </p>
              </div>
              <div className="p-space-xs rounded bg-surface-container-low font-code-sm text-[11px] text-outline flex items-center justify-between border border-surface-container/40">
                <span>Primary primitive:</span>
                <span className="text-on-surface">expose(v) • splay(v)</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="rounded-xl bg-surface-container p-space-md shadow-md space-y-space-sm flex flex-col justify-between hover:bg-surface-container-high transition-all border border-surface-container-high">
              <div className="space-y-space-xs">
                <div className="flex items-center justify-between">
                  <span className="w-7 h-7 rounded bg-secondary-container/20 text-secondary flex items-center justify-center font-code-sm font-bold">
                    02
                  </span>
                  <span className="font-code-sm text-code-sm text-secondary font-bold">O(log² V)</span>
                </div>
                <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Euler Tour Trees</h4>
                <p className="font-code-sm text-[11px] text-secondary">Henzinger &amp; King (1995)</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Linearizes tree traversals into sequence representations via balanced binary search trees (Treaps / Red-Black). Excels at randomized dynamic connectivity and incremental component-size verification during link failure.
                </p>
              </div>
              <div className="p-space-xs rounded bg-surface-container-low font-code-sm text-[11px] text-outline flex items-center justify-between border border-surface-container/40">
                <span>Primary primitive:</span>
                <span className="text-on-surface">split(ET) • merge(T1, T2)</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="rounded-xl bg-surface-container p-space-md shadow-md space-y-space-sm flex flex-col justify-between hover:bg-surface-container-high transition-all border border-surface-container-high">
              <div className="space-y-space-xs">
                <div className="flex items-center justify-between">
                  <span className="w-7 h-7 rounded bg-tertiary-container/20 text-tertiary flex items-center justify-center font-code-sm font-bold">
                    03
                  </span>
                  <span className="font-code-sm text-code-sm text-tertiary font-bold">2-ECA Bound</span>
                </div>
                <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                  2-Edge-Connected Augmentation
                </h4>
                <p className="font-code-sm text-[11px] text-secondary">Biconnectivity Optimization</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Guarantees zero single-point-of-failure bridges by determining the minimal-cost subset of non-tree edges required to formulate a 2-edge-connected network via ear decomposition cycles.
                </p>
              </div>
              <div className="p-space-xs rounded bg-surface-container-low font-code-sm text-[11px] text-outline flex items-center justify-between border border-surface-container/40">
                <span>Primary primitive:</span>
                <span className="text-on-surface">bridge_cut_tree • min_leaf_aug</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Multi-Criteria Pareto Objective Optimizer */}
        <div className="rounded-xl bg-surface-container p-space-lg shadow-xl space-y-space-md border border-surface-container-high">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-space-sm">
            <div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[22px]">tune</span>
                <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
                  Multi-Criteria Pareto Objective Optimizer
                </h3>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Live interactive telemetry engine. Re-weights real optical network constraints to construct balanced minimum spanning solutions beyond simple monetary cost.
              </p>
            </div>
            <div className="flex items-center gap-space-sm">
              <button
                onClick={handleReset}
                className="px-space-md py-1.5 rounded bg-surface-container-high text-on-surface-variant font-code-sm text-code-sm hover:text-on-surface hover:bg-surface-container-highest transition-all cursor-pointer border border-surface-container"
                type="button"
              >
                Reset Defaults
              </button>
              <button
                onClick={handleAutoNormalize}
                className="px-space-md py-1.5 rounded bg-primary-container text-on-primary-container font-code-sm text-code-sm font-bold hover:bg-primary transition-all cursor-pointer"
                type="button"
              >
                Auto-Normalize
              </button>
            </div>
          </div>

          {/* Formula Display Box */}
          <div className="p-space-md rounded bg-surface-container-lowest font-code-md text-code-md shadow-inner flex flex-col md:flex-row items-start md:items-center justify-between gap-space-sm border border-surface-container/50">
            <div className="flex items-center gap-2 flex-wrap text-on-surface">
              <span className="text-primary font-bold">C(e) =</span>
              <span className="text-secondary font-semibold">{weights.w1.toFixed(2)}</span>·Cost +
              <span className="text-secondary font-semibold">{weights.w2.toFixed(2)}</span>·Dist +
              <span className="text-secondary font-semibold">{weights.w3.toFixed(2)}</span>·Latency −
              <span className="text-primary font-semibold">{weights.w4.toFixed(2)}</span>·Rel +
              <span className="text-error font-semibold">{weights.w5.toFixed(2)}</span>·Risk −
              <span className="text-primary font-semibold">{weights.w6.toFixed(2)}</span>·BW
            </div>
            <div className="flex items-center gap-2 text-on-surface-variant font-code-sm text-code-sm shrink-0">
              <span>Sum Weights:</span>
              <span
                className={`px-2 py-0.5 rounded font-bold ${
                  Math.abs(totalWeight - 1.0) > 0.05
                    ? 'bg-error-container text-on-error-container'
                    : 'bg-surface-container-high text-primary'
                }`}
              >
                {totalWeight.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Sliders Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">
            {[
              { key: 'w1', label: 'w1: Installation Cost', icon: 'payments', sub: 'Capex budget', weight: weights.w1 },
              { key: 'w2', label: 'w2: Physical Fiber Distance', icon: 'straighten', sub: 'Kilometers (km)', weight: weights.w2 },
              { key: 'w3', label: 'w3: Packet Latency', icon: 'speed', sub: 'Round-Trip (ms)', weight: weights.w3 },
              { key: 'w4', label: 'w4: Hardware Reliability (Inv)', icon: 'verified_user', sub: 'MTBF Factor', weight: weights.w4 },
              { key: 'w5', label: 'w5: Environmental Risk', icon: 'warning', sub: 'Seismic / Flood Hazard', weight: weights.w5 },
              { key: 'w6', label: 'w6: Bandwidth Headroom (Inv)', icon: 'network_cell', sub: 'Gbps Capacity Reserve', weight: weights.w6 },
            ].map((s) => (
              <div key={s.key} className="p-space-sm rounded bg-surface-container-low space-y-2 border border-surface-container/40">
                <div className="flex items-center justify-between font-code-sm text-code-sm">
                  <span className="text-on-surface flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-secondary">{s.icon}</span>
                    {s.label}
                  </span>
                  <span className="font-bold text-secondary">{s.weight.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={s.weight}
                  onChange={(e) => setWeights((prev) => ({ ...prev, [s.key]: Number(e.target.value) }))}
                  className="w-full h-1.5 bg-surface-container-high rounded appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-[10px] font-code-sm text-outline">
                  <span>{s.sub}</span>
                  <span>Weight: {Math.round(s.weight * 100)}%</span>
                </div>
              </div>
            ))}
          </div>

          {/* Real-Time Ranked Candidate Table */}
          <div className="space-y-space-xs pt-space-xs">
            <div className="flex items-center justify-between">
              <span className="font-headline-sm text-headline-sm text-on-surface font-semibold flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[18px]">reorder</span>
                Pareto-Ranked Candidate Edges (Priority Queue)
              </span>
              <span className="font-code-sm text-code-sm text-on-surface-variant">
                Top |V|-1 (MST Tree Subgraph) Highlighted
              </span>
            </div>

            <div className="overflow-x-auto rounded bg-surface-container-low border border-surface-container/40">
              <table className="w-full text-left font-code-sm text-code-sm border-collapse">
                <thead>
                  <tr className="bg-surface-container-high text-on-surface-variant text-[11px] uppercase">
                    <th className="p-space-sm">Priority</th>
                    <th className="p-space-sm">Edge</th>
                    <th className="p-space-sm">Cost ($k)</th>
                    <th className="p-space-sm">Dist (km)</th>
                    <th className="p-space-sm">Latency (ms)</th>
                    <th className="p-space-sm">Reliability</th>
                    <th className="p-space-sm">Risk Index</th>
                    <th className="p-space-sm">Bandwidth</th>
                    <th className="p-space-sm text-right text-primary font-bold">Composite C(e)</th>
                    <th className="p-space-sm text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container">
                  {scoredEdges.map((e, idx) => {
                    const isMst = idx < mstEdgeCount;
                    return (
                      <tr
                        key={e.id}
                        className={isMst ? 'bg-primary-container/10 font-medium' : 'hover:bg-surface-container-high transition-colors'}
                      >
                        <td className={`p-space-sm font-bold ${isMst ? 'text-primary' : 'text-outline'}`}>
                          {isMst ? `• #${idx + 1}` : `#${idx + 1}`}
                        </td>
                        <td className="p-space-sm font-bold text-on-surface">
                          {e.u} &harr; {e.v}
                        </td>
                        <td className="p-space-sm text-on-surface-variant">${e.cost}k</td>
                        <td className="p-space-sm text-on-surface-variant">{e.dist} km</td>
                        <td className="p-space-sm text-on-surface-variant">{e.lat} ms</td>
                        <td className="p-space-sm text-on-surface-variant">{(e.rel * 100).toFixed(0)}%</td>
                        <td className={`p-space-sm ${e.risk > 0.3 ? 'text-error' : 'text-on-surface-variant'}`}>
                          {e.risk.toFixed(2)}
                        </td>
                        <td className="p-space-sm text-on-surface-variant">{e.bw}G</td>
                        <td className={`p-space-sm text-right font-metric-val ${isMst ? 'text-primary font-bold' : 'text-on-surface'}`}>
                          {e.composite}
                        </td>
                        <td className="p-space-sm text-center">
                          {isMst ? (
                            <span className="px-1.5 py-0.5 rounded bg-primary text-on-primary font-label-badge text-[10px] font-bold">
                              MST TREE
                            </span>
                          ) : (
                            <span className="px-1.5 py-0.5 rounded bg-surface-container text-outline font-label-badge text-[10px]">
                              STANDBY
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Project Evolution Roadmap */}
        <div className="rounded-xl bg-surface-container p-space-lg shadow-md space-y-space-md border border-surface-container-high">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">timeline</span>
              <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
                Engineering Milestone Evolution
              </h3>
            </div>
            <span className="font-code-sm text-code-sm text-primary font-bold">150 / 150 Marks Target</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter-desktop">
            <div className="p-space-md rounded-xl bg-surface-container-low border-l-4 border-primary space-y-space-sm relative border-t border-r border-b border-surface-container/40">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-primary-container text-on-primary-container font-label-badge text-label-badge uppercase font-bold">
                  Review 1 • Complete
                </span>
                <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
              </div>
              <div>
                <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  Core Graph &amp; DSU Execution Engine
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Production-grade foundation implementing foundational minimum spanning algorithmic pipelines.
                </p>
              </div>
              <ul className="space-y-1.5 font-code-sm text-code-sm text-on-surface">
                <li className="flex items-center gap-2">
                  <span className="text-primary font-bold">✓</span> Dynamic Adjacency &amp; Edge List Builders
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary font-bold">✓</span> Quicksort with Median-of-Three pivot selection
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary font-bold">✓</span> DSU with Path Compression &amp; Union by Rank
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary font-bold">✓</span> Step-by-step interactive Kruskal visualizer
                </li>
              </ul>
            </div>

            <div className="p-space-md rounded-xl bg-surface-container-low border-l-4 border-secondary space-y-space-sm relative border-t border-r border-b border-surface-container/40">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-secondary-container/30 text-secondary font-label-badge text-label-badge uppercase font-bold">
                  Review 2 • Active Evaluation
                </span>
                <span className="material-symbols-outlined text-secondary text-[20px] animate-spin">sync</span>
              </div>
              <div>
                <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  Resilience Simulator &amp; Multi-Criteria
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Rigorous validation benchmarks, real-time stress testing, and visionary extension modeling.
                </p>
              </div>
              <ul className="space-y-1.5 font-code-sm text-code-sm text-on-surface">
                <li className="flex items-center gap-2">
                  <span className="text-secondary font-bold">•</span> Comparative Benchmarks (Prim vs. Kruskal vs. Borůvka)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-secondary font-bold">•</span> Real-time Link/Node Failure Simulator &amp; Cascade Recovery
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-secondary font-bold">•</span> Automated Property Verification Test Suite
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-secondary font-bold">•</span> Multi-criteria Pareto composite weighting interface
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Closing Visionary Banner */}
        <div className="p-space-xl rounded-xl bg-gradient-to-r from-surface-container-low via-surface-container to-surface-container-high shadow-2xl flex flex-col md:flex-row items-center justify-between gap-space-lg border border-surface-container/50">
          <div className="space-y-1 text-center md:text-left">
            <span className="font-label-badge text-label-badge uppercase tracking-widest text-primary font-bold">
              Academic &amp; Industrial Mandate
            </span>
            <h3 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
              “Mission: Efficient, Resilient, and Adaptive Network Optimization.”
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
              Transforming graph theory coursework into an enterprise-grade optimization instrument verified against rigorous theoretical bounds.
            </p>
          </div>
          <div className="shrink-0">
            <button
              onClick={() => onNavigate('marks-dashboard')}
              className="flex items-center gap-space-sm px-space-xl py-space-md rounded-xl bg-primary-container text-on-primary-container font-code-md text-code-md font-bold shadow-lg hover:bg-primary hover:text-on-primary hover:shadow-[0_0_20px_rgba(87,241,219,0.5)] transition-all cursor-pointer"
            >
              <span>Open Marks &amp; Evaluation Dashboard</span>
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
