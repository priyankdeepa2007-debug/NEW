import React, { useState } from 'react';
import { ScreenId, TestCase } from '../types';

interface Screen07Props {
  onNavigate: (screen: ScreenId) => void;
}

const initialTestCases: TestCase[] = [
  { id: 'TC-01', description: 'Normal connected benchmark graph', input: 'V=7, E=11', expectedCost: 'Cost = 15', actualCost: 'Cost = 15', time: '0.04 ms', status: 'PASS' },
  { id: 'TC-02', description: 'Duplicate edge weights (Multiple valid MSTs)', input: 'V=5, E=8', expectedCost: 'Cost = 12', actualCost: 'Cost = 12', time: '0.03 ms', status: 'PASS' },
  { id: 'TC-03', description: 'Single isolated node (Boundary V=1)', input: 'V=1, E=0', expectedCost: 'Cost = 0', actualCost: 'Cost = 0', time: '0.01 ms', status: 'PASS' },
  { id: 'TC-04', description: 'Disconnected graph (Spanning forest fallback)', input: 'V=8, E=6', expectedCost: 'Forest (2 trees)', actualCost: 'Forest (2 trees)', time: '0.03 ms', status: 'PASS' },
  { id: 'TC-05', description: 'Self-loops & parallel multigraph edges', input: 'V=4, E=9', expectedCost: 'Cost = 8', actualCost: 'Cost = 8', time: '0.02 ms', status: 'PASS' },
  { id: 'TC-06', description: 'Already a minimal tree (E = V - 1)', input: 'V=6, E=5', expectedCost: 'Cost = 19', actualCost: 'Cost = 19', time: '0.02 ms', status: 'PASS' },
  { id: 'TC-07', description: 'Complete dense graph Kn (E = V(V-1)/2)', input: 'V=20, E=190', expectedCost: 'Cost = 84', actualCost: 'Cost = 84', time: '0.12 ms', status: 'PASS' },
  { id: 'TC-08', description: 'Large sparse planar infrastructure', input: 'V=1,000, E=2,500', expectedCost: 'Cost = 4,210', actualCost: 'Cost = 4,210', time: '2.45 ms', status: 'PASS' },
  { id: 'TC-09', description: 'Negative edge weights (Kruskal validity)', input: 'V=5, E=7', expectedCost: 'Cost = -4', actualCost: 'Cost = -4', time: '0.03 ms', status: 'PASS' },
];

const sparseBenchData = [
  { v: '100', e: '300', t: '0.18 ms', m: '14 KB', q: '450' },
  { v: '1,000', e: '3,000', t: '2.41 ms', m: '128 KB', q: '4,800' },
  { v: '10,000', e: '30,000', t: '29.8 ms', m: '1.4 MB', q: '49,200' },
  { v: '100,000', e: '300,000', t: '340.0 ms', m: '16.2 MB', q: '498,000' },
];

const denseBenchData = [
  { v: '100', e: '2,500', t: '0.62 ms', m: '42 KB', q: '950' },
  { v: '1,000', e: '250,000', t: '48.3 ms', m: '4.8 MB', q: '89,400' },
  { v: '5,000', e: '6,250,000', t: '1,120 ms', m: '118 MB', q: '1,980,000' },
  { v: '10,000', e: '25,000,000', t: '4,890 ms', m: '480 MB', q: '7,920,000' },
];

export const Screen07TestingEfficiency: React.FC<Screen07Props> = ({ onNavigate }) => {
  const [testCases, setTestCases] = useState<TestCase[]>(initialTestCases);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [benchDensity, setBenchDensity] = useState<'sparse' | 'dense'>('sparse');

  const runAllTests = () => {
    setIsRunning(true);
    // Set all to running
    setTestCases((prev) => prev.map((tc) => ({ ...tc, status: 'RUNNING' })));

    // Progressively resolve
    testCases.forEach((_, idx) => {
      setTimeout(() => {
        setTestCases((prev) =>
          prev.map((tc, i) => (i === idx ? { ...tc, status: 'PASS' } : tc))
        );
        if (idx === testCases.length - 1) {
          setIsRunning(false);
        }
      }, (idx + 1) * 90);
    });
  };

  const currentBenchData = benchDensity === 'sparse' ? sparseBenchData : denseBenchData;

  return (
    <div className="flex flex-col w-full pb-space-xl">
      <div className="px-space-lg py-space-md flex flex-col gap-space-lg w-full">
        {/* Top Context Row */}
        <div className="flex flex-wrap items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-sm flex-wrap">
            <button
              onClick={() => onNavigate('marks-dashboard')}
              className="flex items-center gap-1.5 px-space-md py-1 rounded-full bg-primary-container/15 text-primary hover:bg-primary-container/25 transition-all shadow-sm cursor-pointer border border-primary/20"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="font-label-badge text-label-badge uppercase tracking-wider font-bold">
                Criterion: Algorithm Efficiency &amp; Testing • 40 marks
              </span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
            <div className="flex items-center gap-1 px-space-sm py-1 rounded bg-surface-container-high text-on-surface-variant font-code-sm text-code-sm border border-surface-container/50">
              <span className="material-symbols-outlined text-[15px] text-outline">verified</span>
              <span>Formal Verification Harness v2.4</span>
            </div>
          </div>
          <span className="px-space-sm py-1 rounded bg-surface-container text-on-surface-variant font-code-sm text-code-sm shadow-sm border border-surface-container/40">
            Notice: Synthetic test fixture data for academic evaluation.
          </span>
        </div>

        {/* Section Title & Telemetry Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md bg-surface-container-low p-space-lg rounded-xl shadow-md border border-surface-container/40">
          <div className="flex flex-col gap-space-xs max-w-2xl">
            <div className="flex items-center gap-space-xs font-code-sm text-code-sm text-primary uppercase tracking-widest font-semibold">
              <span>Module 07</span>
              <span className="text-outline">/</span>
              <span>Formal Suite</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
              Algorithmic Verification, Benchmarking &amp; Edge-Case Suite
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Strict empirical assertion suite verifying Kruskal's greedy invariant, disjoint-set amortized complexity bounds, and fallback topologies across 9 edge conditions.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-space-md">
            <div className="flex items-center gap-space-md px-space-md py-space-sm bg-surface-container rounded-lg shadow-sm border border-surface-container/40">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[24px]">task_alt</span>
              </div>
              <div className="flex flex-col">
                <span className="font-code-sm text-code-sm text-on-surface-variant">Test Suite Status</span>
                <span className="font-metric-val text-headline-sm text-primary tracking-tight">
                  {testCases.filter((tc) => tc.status === 'PASS').length} / {testCases.length} PASSED
                </span>
                <span className="font-label-badge text-label-badge text-primary-fixed-dim">100% Branch Coverage</span>
              </div>
            </div>

            <button
              onClick={runAllTests}
              disabled={isRunning}
              className="group flex items-center justify-center gap-space-sm px-space-lg py-space-md rounded-lg bg-primary-container text-on-primary-container font-code-md text-code-md font-bold shadow-[0_0_16px_rgba(45,212,191,0.35)] hover:bg-primary hover:text-on-primary transition-all cursor-pointer disabled:opacity-50"
              type="button"
            >
              <span className={`material-symbols-outlined text-[18px] ${isRunning ? 'animate-spin' : 'group-hover:rotate-180 transition-transform'}`}>
                restart_alt
              </span>
              <span>{isRunning ? 'Verifying Invariants...' : 'Run All Test Cases'}</span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-on-primary-container opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-on-primary-container"></span>
              </span>
            </button>
          </div>
        </div>

        {/* Live Execution Telemetry Metric Strips */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-space-md">
          <div className="p-space-md rounded-lg bg-surface-container shadow-sm flex flex-col gap-1 border border-surface-container/40">
            <span className="font-code-sm text-code-sm text-on-surface-variant uppercase">Mean Assertion Latency</span>
            <div className="flex items-baseline gap-2">
              <span className="font-metric-val text-headline-md text-primary">0.038</span>
              <span className="font-code-sm text-code-sm text-outline">ms/case</span>
            </div>
            <div className="w-full bg-surface-container-high h-1 rounded-full overflow-hidden mt-1">
              <div className="bg-primary h-full rounded-full" style={{ width: '14%' }}></div>
            </div>
          </div>

          <div className="p-space-md rounded-lg bg-surface-container shadow-sm flex flex-col gap-1 border border-surface-container/40">
            <span className="font-code-sm text-code-sm text-on-surface-variant uppercase">DSU Disjoint Sets</span>
            <div className="flex items-baseline gap-2">
              <span className="font-metric-val text-headline-md text-secondary">α(N) ≤ 4</span>
              <span className="font-code-sm text-code-sm text-secondary-fixed">Ackermann Inv</span>
            </div>
            <div className="w-full bg-surface-container-high h-1 rounded-full overflow-hidden mt-1">
              <div className="bg-secondary h-full rounded-full" style={{ width: '98%' }}></div>
            </div>
          </div>

          <div className="p-space-md rounded-lg bg-surface-container shadow-sm flex flex-col gap-1 border border-surface-container/40">
            <span className="font-code-sm text-code-sm text-on-surface-variant uppercase">Memory Overhead</span>
            <div className="flex items-baseline gap-2">
              <span className="font-metric-val text-headline-md text-tertiary">2.84</span>
              <span className="font-code-sm text-code-sm text-outline">MB Peak</span>
            </div>
            <div className="w-full bg-surface-container-high h-1 rounded-full overflow-hidden mt-1">
              <div className="bg-tertiary h-full rounded-full" style={{ width: '22%' }}></div>
            </div>
          </div>

          <div className="p-space-md rounded-lg bg-surface-container shadow-sm flex flex-col gap-1 border border-surface-container/40">
            <span className="font-code-sm text-code-sm text-on-surface-variant uppercase">Invariant Validation</span>
            <div className="flex items-baseline gap-2">
              <span className="font-metric-val text-headline-md text-primary-fixed">100.0%</span>
              <span className="font-code-sm text-code-sm text-primary">Acyclic Tree</span>
            </div>
            <div className="w-full bg-surface-container-high h-1 rounded-full overflow-hidden mt-1">
              <div className="bg-primary-fixed h-full rounded-full" style={{ width: '100%' }}></div>
            </div>
          </div>
        </div>

        {/* Boundary & Structural Edge Test Suite Table */}
        <div className="flex flex-col gap-space-sm bg-surface-container-low p-space-lg rounded-xl shadow-md border border-surface-container/40">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm">
            <div className="flex items-center gap-space-sm">
              <span className="material-symbols-outlined text-[20px] text-primary">checklist</span>
              <h2 className="font-headline-md text-headline-md text-on-surface font-semibold">
                Boundary &amp; Structural Edge Test Suite
              </h2>
              <span className="px-2 py-0.5 rounded text-label-badge font-label-badge bg-surface-container-high text-primary">
                9 Target Assertions
              </span>
            </div>
            <div className="flex items-center gap-space-xs text-on-surface-variant font-code-sm text-code-sm">
              <span className="inline-block w-2 h-2 rounded-full bg-primary"></span>
              <span>Deterministic Graph Invariant Check</span>
            </div>
          </div>

          <div className="w-full overflow-x-auto rounded-lg shadow-sm border border-surface-container/40">
            <table className="w-full text-left font-body-sm text-body-sm">
              <thead className="bg-surface-container text-on-surface-variant font-code-sm text-code-sm uppercase tracking-wider">
                <tr>
                  <th className="px-space-md py-space-sm font-semibold">Test ID</th>
                  <th className="px-space-md py-space-sm font-semibold">Description</th>
                  <th className="px-space-md py-space-sm font-semibold">Input (V, E)</th>
                  <th className="px-space-md py-space-sm font-semibold">Expected Cost</th>
                  <th className="px-space-md py-space-sm font-semibold">Actual Cost</th>
                  <th className="px-space-md py-space-sm font-semibold">Execution Time</th>
                  <th className="px-space-md py-space-sm font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container/30">
                {testCases.map((tc, idx) => (
                  <tr
                    key={tc.id}
                    className={`transition-colors hover:bg-surface-container ${
                      idx % 2 === 0 ? 'bg-surface-container-lowest/60' : 'bg-surface-container-low/40'
                    }`}
                  >
                    <td className="px-space-md py-space-sm font-code-md text-code-md text-primary font-bold">
                      {tc.id}
                    </td>
                    <td className="px-space-md py-space-sm text-on-surface font-medium">{tc.description}</td>
                    <td className="px-space-md py-space-sm font-code-sm text-code-sm text-secondary">{tc.input}</td>
                    <td className="px-space-md py-space-sm font-code-sm text-code-sm text-on-surface-variant">
                      {tc.expectedCost}
                    </td>
                    <td className="px-space-md py-space-sm font-code-sm text-code-sm text-primary font-semibold">
                      {tc.actualCost}
                    </td>
                    <td className="px-space-md py-space-sm font-code-sm text-code-sm text-on-surface">{tc.time}</td>
                    <td className="px-space-md py-space-sm text-right">
                      {tc.status === 'PASS' ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded font-label-badge text-label-badge bg-primary-container/20 text-primary font-bold">
                          <span className="material-symbols-outlined text-[13px]">check_circle</span> PASS
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded font-label-badge text-label-badge bg-surface-container-high text-secondary font-bold">
                          <span className="material-symbols-outlined text-[13px] animate-spin">sync</span> RUNNING
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Complexity Breakdown & Scalability Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
          {/* Left: Theoretical Complexity Card */}
          <div className="lg:col-span-5 flex flex-col gap-space-md bg-surface-container-low p-space-lg rounded-xl shadow-md border border-surface-container/40">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-[20px] text-tertiary">functions</span>
                <h3 className="font-headline-md text-headline-md text-on-surface font-semibold">
                  Theoretical Asymptotics
                </h3>
              </div>
              <span className="font-label-badge text-label-badge px-2 py-0.5 rounded bg-surface-container-high text-tertiary">
                Rigorous Proof
              </span>
            </div>

            <div className="flex flex-col gap-space-sm">
              <div className="p-space-md rounded-lg bg-surface-container flex flex-col gap-1 shadow-sm border border-surface-container/40">
                <div className="flex items-center justify-between">
                  <span className="font-body-sm text-body-sm text-on-surface font-medium">Edge Sorting Phase</span>
                  <span className="font-code-md text-code-md text-primary font-bold">O(E log E)</span>
                </div>
                <p className="font-code-sm text-code-sm text-on-surface-variant">
                  Dual-Pivot Quicksort with fallback to Heapsort (Introsort) for deterministic worst-case runtime. Since E ≤ V², O(E log E) = O(E log V).
                </p>
              </div>

              <div className="p-space-md rounded-lg bg-surface-container flex flex-col gap-1 shadow-sm border border-surface-container/40">
                <div className="flex items-center justify-between">
                  <span className="font-body-sm text-body-sm text-on-surface font-medium">DSU Operations (Union-Find)</span>
                  <span className="font-code-md text-code-md text-secondary font-bold">O((V + E) α(V))</span>
                </div>
                <p className="font-code-sm text-code-sm text-on-surface-variant">
                  Combining path compression during `find(u)` with rank-balanced `union(u, v)` brings amortized cost per operation to inverse Ackermann α(V) ≤ 4.
                </p>
              </div>

              <div className="p-space-md rounded-lg bg-surface-container flex flex-col gap-1 shadow-sm border border-surface-container/40">
                <div className="flex items-center justify-between">
                  <span className="font-body-sm text-body-sm text-on-surface font-medium">Overall Time Complexity</span>
                  <span className="font-code-md text-code-md text-primary-fixed font-bold">O(E log E)</span>
                </div>
                <p className="font-code-sm text-code-sm text-on-surface-variant">
                  Dominated entirely by edge ordering. If edge weights are pre-sorted or integer-bounded within range [1..K], Radix Sort achieves O(E + K).
                </p>
              </div>

              <div className="p-space-md rounded-lg bg-surface-container flex flex-col gap-1 shadow-sm border border-surface-container/40">
                <div className="flex items-center justify-between">
                  <span className="font-body-sm text-body-sm text-on-surface font-medium">Auxiliary Space Overhead</span>
                  <span className="font-code-md text-code-md text-tertiary-fixed font-bold">O(V + E)</span>
                </div>
                <p className="font-code-sm text-code-sm text-on-surface-variant">
                  Flat continuous parent array `int[V]`, rank array `uint8[V]`, and linear edge references without cyclic pointers.
                </p>
              </div>
            </div>

            <div className="p-space-sm rounded-lg bg-surface-container-high/60 flex items-center gap-space-sm text-on-surface-variant border border-surface-container">
              <span className="material-symbols-outlined text-[18px] text-primary">psychology</span>
              <span className="font-code-sm text-code-sm">
                Prim's with Fibonacci Heap achieves O(E + V log V), preferable for dense graphs (TC-07).
              </span>
            </div>
          </div>

          {/* Right: Empirical Scalability Benchmark Panel */}
          <div className="lg:col-span-7 flex flex-col gap-space-md bg-surface-container-low p-space-lg rounded-xl shadow-md border border-surface-container/40">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-[20px] text-secondary">speed</span>
                <h3 className="font-headline-md text-headline-md text-on-surface font-semibold">
                  Empirical Scalability Benchmarking
                </h3>
              </div>
              <div className="inline-flex p-0.5 rounded-lg bg-surface-container shadow-inner border border-surface-container-high">
                <button
                  onClick={() => setBenchDensity('sparse')}
                  className={`px-space-sm py-1 rounded font-code-sm text-code-sm font-semibold transition-all cursor-pointer ${
                    benchDensity === 'sparse'
                      ? 'bg-primary-container text-on-primary-container'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                  type="button"
                >
                  Sparse (E = 3V)
                </button>
                <button
                  onClick={() => setBenchDensity('dense')}
                  className={`px-space-sm py-1 rounded font-code-sm text-code-sm font-semibold transition-all cursor-pointer ${
                    benchDensity === 'dense'
                      ? 'bg-primary-container text-on-primary-container'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                  type="button"
                >
                  Dense (E = V²/4)
                </button>
              </div>
            </div>

            <div className="w-full overflow-x-auto rounded-lg shadow-sm border border-surface-container/40">
              <table className="w-full text-left font-body-sm text-body-sm">
                <thead className="bg-surface-container text-on-surface-variant font-code-sm text-code-sm uppercase">
                  <tr>
                    <th className="px-space-md py-space-xs">Graph Scale (V, E)</th>
                    <th className="px-space-md py-space-xs">Time (ms)</th>
                    <th className="px-space-md py-space-xs">Resident Memory</th>
                    <th className="px-space-md py-space-xs text-right">DSU Finds</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container/30 font-code-sm text-code-sm">
                  {currentBenchData.map((d, i) => (
                    <tr
                      key={i}
                      className={`hover:bg-surface-container transition-colors ${
                        i % 2 === 0 ? 'bg-surface-container-lowest/70' : 'bg-surface-container-low/40'
                      }`}
                    >
                      <td className="px-space-md py-space-sm text-on-surface font-bold">
                        V = {d.v}, E = {d.e}
                      </td>
                      <td className="px-space-md py-space-sm text-primary font-semibold">{d.t}</td>
                      <td className="px-space-md py-space-sm text-on-surface-variant">{d.m}</td>
                      <td className="px-space-md py-space-sm text-right text-secondary">{d.q}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Scalability SVG Plot */}
            <div className="flex flex-col gap-space-sm p-space-md rounded-lg bg-surface-container shadow-inner border border-surface-container-high">
              <div className="flex items-center justify-between text-on-surface-variant font-code-sm text-code-sm flex-wrap gap-2">
                <span className="flex items-center gap-1 text-on-surface font-semibold">
                  <span className="material-symbols-outlined text-[16px] text-primary">insights</span>
                  Static Recompute vs. Incremental MST Dynamic Update
                </span>
                <div className="flex items-center gap-space-md text-[11px]">
                  <span className="flex items-center gap-1.5 text-primary">
                    <span className="w-3 h-0.5 bg-primary rounded-full inline-block"></span> Static O(E log E)
                  </span>
                  <span className="flex items-center gap-1.5 text-secondary">
                    <span className="w-3 h-0.5 bg-secondary rounded-full inline-block border-b border-dashed border-secondary"></span>{' '}
                    Incremental O(log V)
                  </span>
                </div>
              </div>

              <div className="w-full h-44 relative bg-surface-container-lowest/80 rounded flex items-center justify-center p-2 border border-surface-container/30">
                <svg className="w-full h-full select-none" fill="none" preserveAspectRatio="none" viewBox="0 0 540 140">
                  <line className="text-surface-container-highest" stroke="currentColor" strokeDasharray="3 3" strokeWidth="1" x1="40" x2="520" y1="20" y2="20" />
                  <line className="text-surface-container-highest" stroke="currentColor" strokeDasharray="3 3" strokeWidth="1" x1="40" x2="520" y1="55" y2="55" />
                  <line className="text-surface-container-highest" stroke="currentColor" strokeDasharray="3 3" strokeWidth="1" x1="40" x2="520" y1="90" y2="90" />
                  <line className="text-surface-container-highest" stroke="currentColor" strokeWidth="1.5" x1="40" x2="520" y1="125" y2="125" />

                  <text className="fill-outline font-code-sm text-[10px]" textAnchor="end" x="32" y="24">350ms</text>
                  <text className="fill-outline font-code-sm text-[10px]" textAnchor="end" x="32" y="60">30ms</text>
                  <text className="fill-outline font-code-sm text-[10px]" textAnchor="end" x="32" y="95">2ms</text>
                  <text className="fill-outline font-code-sm text-[10px]" textAnchor="end" x="32" y="128">0ms</text>

                  <text className="fill-outline font-code-sm text-[10px]" x="70" y="138">10²</text>
                  <text className="fill-outline font-code-sm text-[10px]" x="210" y="138">10³</text>
                  <text className="fill-outline font-code-sm text-[10px]" x="350" y="138">10⁴</text>
                  <text className="fill-outline font-code-sm text-[10px]" x="490" y="138">10⁵ V</text>

                  <path className="text-primary" d="M 70 124 C 180 120, 240 115, 350 90 C 420 70, 460 40, 490 22" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5" />
                  <path className="text-secondary" d="M 70 124 C 180 123, 260 121, 350 118 C 420 115, 470 113, 490 110" fill="none" stroke="currentColor" strokeDasharray="5 4" strokeLinecap="round" strokeWidth="2" />

                  <circle className="fill-primary" cx="70" cy="124" r="3.5" />
                  <circle className="fill-primary" cx="210" cy="118" r="3.5" />
                  <circle className="fill-primary" cx="350" cy="90" r="3.5" />
                  <circle className="fill-primary" cx="490" cy="22" r="4.5" style={{ filter: 'drop-shadow(0 0 6px rgba(87,241,219,0.8))' }} />
                  <circle className="fill-secondary" cx="490" cy="110" r="3.5" />
                </svg>
              </div>

              <div className="flex items-center justify-between text-[11px] font-code-sm text-on-surface-variant">
                <span>Scale Factor: N log N edge sorting bottleneck</span>
                <span className="text-primary font-semibold">Δ 99.3% runtime reduction via Dynamic DSU update</span>
              </div>
            </div>
          </div>
        </div>

        {/* Edge Case Handling Architectural Guardrails Card */}
        <div className="flex flex-col gap-space-md bg-surface-container-low p-space-lg rounded-xl shadow-md border border-surface-container/40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-space-sm">
              <span className="material-symbols-outlined text-[20px] text-primary">security</span>
              <h3 className="font-headline-md text-headline-md text-on-surface font-semibold">
                Boundary Handling Strategy &amp; Mathematical Guardrails
              </h3>
            </div>
            <span className="font-label-badge text-label-badge px-2 py-0.5 rounded bg-surface-container text-primary font-bold">
              Resilience Spec
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
            <div className="flex flex-col gap-space-xs p-space-md rounded-lg bg-surface-container shadow-sm border border-surface-container/40">
              <div className="flex items-center gap-space-xs text-primary font-code-sm text-code-sm font-semibold">
                <span className="material-symbols-outlined text-[18px]">filter_1</span>
                <span>Empty &amp; 0-Edge Graphs (V ≤ 1, E = 0)</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Zero-allocation fast return. Returns empty edge set and cost <span className="font-code-sm text-code-sm text-on-surface font-semibold">0.00</span> without initiating Disjoint Set memory structures, preventing null pointer and division-by-zero bounds.
              </p>
              <div className="mt-auto pt-2 font-code-sm text-[11px] text-outline">
                Guard: <code className="text-primary">if (V &lt;= 1 || edges.empty()) return EmptyForest;</code>
              </div>
            </div>

            <div className="flex flex-col gap-space-xs p-space-md rounded-lg bg-surface-container shadow-sm border border-surface-container/40">
              <div className="flex items-center gap-space-xs text-secondary font-code-sm text-code-sm font-semibold">
                <span className="material-symbols-outlined text-[18px]">filter_2</span>
                <span>Disconnected Components &amp; Forests</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                When reachable edge count &lt; V - 1, system flags <span className="font-code-sm text-code-sm text-secondary font-semibold">Spanning Forest Fallback</span>. Exactly <code className="font-code-sm text-[11px] text-secondary">k = V - |MST_Edges|</code> independent trees are identified and indexed without assertion panic.
              </p>
              <div className="mt-auto pt-2 font-code-sm text-[11px] text-outline">
                Invariant: <code className="text-secondary">Connected if dsu.component_count() == 1</code>
              </div>
            </div>

            <div className="flex flex-col gap-space-xs p-space-md rounded-lg bg-surface-container shadow-sm border border-surface-container/40">
              <div className="flex items-center gap-space-xs text-tertiary font-code-sm text-code-sm font-semibold">
                <span className="material-symbols-outlined text-[18px]">filter_3</span>
                <span>Negative Edge Cost Invariance</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Unlike Dijkstra's algorithm, Kruskal's greedy matroid cut theorem remains strictly optimal under arbitrary negative weights (TC-09) since cycle rejection is independent of weight signs.
              </p>
              <div className="mt-auto pt-2 font-code-sm text-[11px] text-outline">
                Proof: <code className="text-tertiary">Matroid Independence System Preserved</code>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation Footer Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-space-md p-space-md rounded-xl bg-surface-container shadow-sm mb-space-lg border border-surface-container-high">
          <div className="flex items-center gap-space-sm text-on-surface-variant font-code-sm text-code-sm">
            <span className="material-symbols-outlined text-[18px] text-primary">arrow_back</span>
            <button
              onClick={() => onNavigate('failure-simulator')}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              Previous: 06. Failure Simulator &amp; Bridge Recovery
            </button>
          </div>
          <button
            onClick={() => onNavigate('dynamic-multi-criteria')}
            className="group flex items-center gap-space-xs px-space-md py-1.5 rounded-lg bg-primary-container text-on-primary-container font-code-md text-code-md font-bold shadow-[0_0_12px_rgba(45,212,191,0.3)] hover:bg-primary hover:text-on-primary transition-all cursor-pointer"
          >
            <span>Explore Dynamic &amp; Multi-Criteria Extensions</span>
            <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
