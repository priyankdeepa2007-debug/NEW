import React, { useState } from 'react';
import { ScreenId } from '../types';

interface Screen06Props {
  onNavigate: (screen: ScreenId) => void;
}

export const Screen06FailureSimulator: React.FC<Screen06Props> = ({ onNavigate }) => {
  const [isSevered, setIsSevered] = useState<boolean>(true);
  const [healedWithBE, setHealedWithBE] = useState<boolean>(false);
  const [alertText, setAlertText] = useState<{
    type: 'error' | 'success' | 'info';
    msg: string;
  }>({
    type: 'error',
    msg: 'BRIDGE SEVERED: Global reachability lost! Cut size = 2 components',
  });

  const toggleSeveredCE = () => {
    if (isSevered) {
      setIsSevered(false);
      setAlertText({
        type: 'success',
        msg: 'BRIDGE RESTORED: Primary edge (C, E) re-established. Full tree connectivity active.',
      });
    } else {
      setIsSevered(true);
      setHealedWithBE(false);
      setAlertText({
        type: 'error',
        msg: 'BRIDGE SEVERED: Global reachability lost! Cut size = 2 components',
      });
    }
  };

  const healWithCandidate = () => {
    setHealedWithBE(true);
    setIsSevered(false);
    setAlertText({
      type: 'success',
      msg: 'RECOVERY COMPLETE: Graph reconnected via minimum-weight cut edge (B, E) [w=2]! Cost = 14',
    });
  };

  const handleSelectSuboptimal = () => {
    setAlertText({
      type: 'info',
      msg: 'Inspecting alternative cut edge (B, D) w=10. Suboptimal compared to (B, E) w=2.',
    });
  };

  const handleReset = () => {
    setIsSevered(true);
    setHealedWithBE(false);
    setAlertText({
      type: 'error',
      msg: 'BRIDGE SEVERED: Global reachability lost! Cut size = 2 components',
    });
  };

  return (
    <div className="flex flex-col w-full pb-space-xl">
      <div className="w-full px-space-lg py-space-md space-y-space-md">
        {/* Header Section with Rubric Badges */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md bg-surface-container-low p-space-lg rounded-xl shadow-lg relative overflow-hidden border border-surface-container/40">
          <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-error/5 blur-3xl pointer-events-none"></div>
          <div className="flex flex-col gap-1 min-w-0">
            <div className="flex items-center gap-space-sm flex-wrap">
              <span className="font-code-sm text-code-sm text-primary uppercase tracking-widest font-semibold">
                SIMULATION LAB
              </span>
              <span className="text-outline">•</span>
              <span className="font-code-sm text-code-sm text-error flex items-center gap-1 font-bold">
                <span className="w-2 h-2 rounded-full bg-error animate-ping"></span>
                LIVE INJECTION ACTIVE
              </span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-bold">
              06. Network Resilience &amp; Bridge Failure Simulator
            </h1>
            <div className="flex items-center gap-space-md flex-wrap mt-1">
              <div className="flex items-center gap-2 bg-surface-container px-space-sm py-1 rounded border border-surface-container/50">
                <span className="material-symbols-outlined text-[16px] text-primary">lan</span>
                <span className="font-code-sm text-code-sm text-on-surface-variant">Active Topology:</span>
                <span className="font-code-sm text-code-sm text-on-surface font-semibold">
                  Minimum Spanning Tree (V=7, E=6, Cost=15)
                </span>
              </div>
              <div className="flex items-center gap-2 bg-error/10 px-space-sm py-1 rounded border border-error/20">
                <span className="material-symbols-outlined text-[16px] text-error">shield_with_heart</span>
                <span className="font-code-sm text-code-sm text-error">Redundancy Factor:</span>
                <span className="font-code-sm text-code-sm text-error font-bold">
                  0.0 (Zero fault-tolerance in pure MST)
                </span>
              </div>
            </div>
          </div>

          {/* Criterion Badges */}
          <div className="flex flex-wrap lg:flex-nowrap items-center gap-space-sm shrink-0">
            <button
              onClick={() => onNavigate('marks-dashboard')}
              className="flex items-center gap-2 px-space-md py-space-sm rounded-lg bg-surface-container hover:bg-surface-container-high transition-all shadow-sm group cursor-pointer border border-surface-container-high"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-secondary shadow-[0_0_8px_rgba(123,208,255,0.6)]"></span>
              <div className="flex flex-col text-left">
                <span className="font-label-badge text-label-badge text-secondary tracking-wider uppercase">
                  Criterion: Problem Solving
                </span>
                <span className="font-code-sm text-code-sm text-on-surface font-bold">40 Marks</span>
              </div>
              <span className="material-symbols-outlined text-[18px] text-secondary group-hover:translate-x-0.5 transition-transform">
                arrow_forward
              </span>
            </button>
            <button
              onClick={() => onNavigate('marks-dashboard')}
              className="flex items-center gap-2 px-space-md py-space-sm rounded-lg bg-surface-container hover:bg-surface-container-high transition-all shadow-sm group cursor-pointer border border-surface-container-high"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-tertiary-fixed shadow-[0_0_8px_rgba(224,224,255,0.5)]"></span>
              <div className="flex flex-col text-left">
                <span className="font-label-badge text-label-badge text-tertiary tracking-wider uppercase">
                  Criterion: Presentation &amp; Interaction
                </span>
                <span className="font-code-sm text-code-sm text-on-surface font-bold">30 Marks</span>
              </div>
              <span className="material-symbols-outlined text-[18px] text-tertiary group-hover:translate-x-0.5 transition-transform">
                arrow_forward
              </span>
            </button>
          </div>
        </div>

        {/* 4-Stage Operational Recovery Pipeline Stepper */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-space-sm bg-surface-container-lowest p-space-md rounded-xl shadow-md border border-surface-container/40">
          <div className="flex items-center gap-space-md p-space-md rounded-lg bg-surface-container-low transition-all border border-surface-container/30">
            <div className="w-9 h-9 rounded-lg bg-error text-on-error flex items-center justify-center font-code-md text-code-md font-bold shrink-0 shadow-[0_0_12px_rgba(255,180,171,0.3)]">
              01
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-code-sm text-code-sm text-error font-bold uppercase tracking-wider">[DETECT]</span>
                <span className="font-label-badge text-label-badge text-error bg-error/15 px-1 py-0.2 rounded font-semibold">
                  2ms
                </span>
              </div>
              <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                Telemetry detects link severance
              </span>
            </div>
          </div>

          <div className="flex items-center gap-space-md p-space-md rounded-lg bg-surface-container-low transition-all border border-surface-container/30">
            <div className="w-9 h-9 rounded-lg bg-surface-container-high text-on-surface flex items-center justify-center font-code-md text-code-md font-bold shrink-0">
              02
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-code-sm text-code-sm text-on-surface font-bold uppercase tracking-wider">[REMOVE]</span>
                <span className="font-label-badge text-label-badge text-on-surface-variant bg-surface-container-highest px-1 py-0.2 rounded font-semibold">
                  E ← E\{'{e}'}
                </span>
              </div>
              <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                Invalidate edge in adjacency registry
              </span>
            </div>
          </div>

          <div className="flex items-center gap-space-md p-space-md rounded-lg bg-surface-container-low transition-all border border-surface-container/30">
            <div className="w-9 h-9 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center font-code-md text-code-md font-bold shrink-0 shadow-[0_0_12px_rgba(45,212,191,0.25)]">
              03
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-code-sm text-code-sm text-primary font-bold uppercase tracking-wider">
                  [RECOMPUTE]
                </span>
                <span className="font-label-badge text-label-badge text-primary bg-primary/10 px-1 py-0.2 rounded font-semibold">
                  Cut Min
                </span>
              </div>
              <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                Query candidate replacement edges
              </span>
            </div>
          </div>

          <div className="flex items-center gap-space-md p-space-md rounded-lg bg-surface-container-low transition-all border border-surface-container/30">
            <div className="w-9 h-9 rounded-lg bg-surface-container-high text-secondary flex items-center justify-center font-code-md text-code-md font-bold shrink-0">
              04
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-code-sm text-code-sm text-secondary font-bold uppercase tracking-wider">
                  [RENDER]
                </span>
                <span className="font-label-badge text-label-badge text-secondary bg-secondary/15 px-1 py-0.2 rounded font-semibold">
                  Healed
                </span>
              </div>
              <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                Restored 1-tree connectivity topology
              </span>
            </div>
          </div>
        </div>

        {/* Main Interactive Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md items-start">
          {/* Left Panel: Topology Canvas */}
          <div className="lg:col-span-7 flex flex-col bg-surface-container-low rounded-xl overflow-hidden shadow-xl border border-surface-container/40">
            <div className="flex items-center justify-between px-space-lg py-space-sm bg-surface-container border-b border-surface-container">
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-[18px] text-primary">polyline</span>
                <span className="font-code-sm text-code-sm text-on-surface font-semibold">
                  TOPOLOGY CANVAS • GRAPH G=(V,E)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-label-badge text-label-badge text-on-surface-variant uppercase">INTERACTION:</span>
                <span className="font-code-sm text-code-sm text-primary font-medium">CLICK EDGE TO CUT / RESTORE</span>
              </div>
            </div>

            <div className="relative w-full h-[520px] bg-surface-container-lowest overflow-hidden flex items-center justify-center select-none">
              {/* Dot Grid */}
              <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
                <defs>
                  <pattern id="dotGridFail" width="24" height="24" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1.2" fill="#57f1db" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#dotGridFail)" />
              </svg>

              {/* Component Partition Underlay Blobs */}
              <div className="absolute left-8 top-16 w-64 h-80 rounded-full bg-primary/10 blur-2xl pointer-events-none transition-all duration-500"></div>
              <div className="absolute right-8 bottom-12 w-80 h-80 rounded-full bg-tertiary-container/10 blur-2xl pointer-events-none transition-all duration-500"></div>

              {/* Component Labels in background */}
              <div className="absolute left-10 top-10 pointer-events-none flex flex-col gap-0.5 opacity-80">
                <span className="font-headline-md text-headline-md text-primary font-bold tracking-tight">
                  Component S
                </span>
                <span className="font-code-sm text-code-sm text-on-surface-variant font-medium">
                  {'{ A, B, C } • 3 Vertices'}
                </span>
              </div>
              <div className="absolute right-10 bottom-10 pointer-events-none flex flex-col items-end gap-0.5 opacity-80">
                <span className="font-headline-md text-headline-md text-tertiary font-bold tracking-tight">
                  Component V \ S
                </span>
                <span className="font-code-sm text-code-sm text-on-surface-variant font-medium">
                  {'{ D, E, F, G } • 4 Vertices'}
                </span>
              </div>

              {/* Floating Alert Banner */}
              <div
                className={`absolute top-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-space-sm px-space-md py-space-xs rounded-full shadow-lg ${
                  alertText.type === 'error'
                    ? 'bg-error text-on-error shadow-[0_0_20px_rgba(255,180,171,0.4)] animate-bounce'
                    : alertText.type === 'success'
                    ? 'bg-primary-container text-on-primary-container shadow-[0_0_20px_rgba(45,212,191,0.5)]'
                    : 'bg-surface-container-high text-on-surface shadow-xl'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {alertText.type === 'error' ? 'warning' : alertText.type === 'success' ? 'verified' : 'info'}
                </span>
                <span className="font-code-sm text-code-sm font-bold">{alertText.msg}</span>
              </div>

              {/* Graph SVG */}
              <svg className="w-full h-full relative z-10" viewBox="0 0 680 480">
                {/* Candidate 1: Edge (B, D) w=10 */}
                <g className="cursor-pointer group" onClick={handleSelectSuboptimal}>
                  <line
                    x1="160"
                    y1="280"
                    x2="380"
                    y2="130"
                    stroke="#f59e0b"
                    strokeWidth="2.5"
                    strokeDasharray="6 6"
                    strokeOpacity="0.75"
                    className="group-hover:stroke-opacity-100 transition-all"
                  />
                  <rect x="260" y="195" width="46" height="20" rx="4" fill="#19202e" stroke="#f59e0b" strokeWidth="1" />
                  <text x="283" y="209" fill="#f59e0b" fontFamily="JetBrains Mono" fontSize="11" fontWeight="bold" textAnchor="middle">
                    w=10
                  </text>
                </g>

                {/* Candidate 2: Edge (B, E) w=2 (Optimal Replacement) */}
                <g className="cursor-pointer group" onClick={healWithCandidate}>
                  <line
                    x1="160"
                    y1="280"
                    x2="380"
                    y2="330"
                    stroke={healedWithBE ? '#57f1db' : '#f59e0b'}
                    strokeWidth={healedWithBE ? 4 : 3}
                    strokeDasharray={healedWithBE ? 'none' : '6 6'}
                    className="group-hover:stroke-width-4 transition-all"
                  />
                  <rect
                    x="260"
                    y="295"
                    width="60"
                    height="22"
                    rx="4"
                    fill={healedWithBE ? '#003731' : '#070e1c'}
                    stroke={healedWithBE ? '#57f1db' : '#f59e0b'}
                    strokeWidth="1.5"
                  />
                  <text
                    x="290"
                    y="310"
                    fill={healedWithBE ? '#57f1db' : '#f59e0b'}
                    fontFamily="JetBrains Mono"
                    fontSize="11"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    {healedWithBE ? 'HEALED w=2' : 'OPT w=2'}
                  </text>
                </g>

                {/* Intra-Component S Edges */}
                {/* Edge (A, B) w=1 */}
                <g>
                  <line x1="100" y1="140" x2="160" y2="280" stroke="#57f1db" strokeWidth="3.5" />
                  <circle cx="130" cy="210" r="12" fill="#070e1c" stroke="#57f1db" strokeWidth="1.5" />
                  <text x="130" y="214" fill="#57f1db" fontFamily="JetBrains Mono" fontSize="10" fontWeight="bold" textAnchor="middle">
                    1
                  </text>
                </g>
                {/* Edge (A, C) w=4 */}
                <g>
                  <line x1="100" y1="140" x2="240" y2="190" stroke="#57f1db" strokeWidth="3.5" />
                  <circle cx="170" cy="165" r="12" fill="#070e1c" stroke="#57f1db" strokeWidth="1.5" />
                  <text x="170" y="169" fill="#57f1db" fontFamily="JetBrains Mono" fontSize="10" fontWeight="bold" textAnchor="middle">
                    4
                  </text>
                </g>

                {/* Severed Bridge Edge: (C, E) w=3 */}
                <g className="cursor-pointer group" onClick={toggleSeveredCE}>
                  {isSevered ? (
                    <>
                      <line x1="240" y1="190" x2="295" y2="245" stroke="#ffb4ab" strokeWidth="3.5" strokeDasharray="8 4" />
                      <line x1="325" y1="275" x2="380" y2="330" stroke="#ffb4ab" strokeWidth="3.5" strokeDasharray="8 4" />
                      <circle cx="310" cy="260" r="16" fill="#690005" stroke="#ffb4ab" strokeWidth="2" className="animate-pulse" />
                      <text x="310" y="264" fill="#ffb4ab" fontFamily="JetBrains Mono" fontSize="12" fontWeight="bold" textAnchor="middle">
                        ✕
                      </text>
                      <text x="310" y="290" fill="#ffb4ab" fontFamily="JetBrains Mono" fontSize="10" fontWeight="bold" textAnchor="middle">
                        CUT (w=3)
                      </text>
                    </>
                  ) : (
                    <>
                      <line x1="240" y1="190" x2="380" y2="330" stroke="#57f1db" strokeWidth="3.5" />
                      <circle cx="310" cy="260" r="14" fill="#003731" stroke="#57f1db" strokeWidth="2" />
                      <text x="310" y="264" fill="#57f1db" fontFamily="JetBrains Mono" fontSize="11" fontWeight="bold" textAnchor="middle">
                        ✓
                      </text>
                      <text x="310" y="290" fill="#57f1db" fontFamily="JetBrains Mono" fontSize="10" fontWeight="bold" textAnchor="middle">
                        LINKED (w=3)
                      </text>
                    </>
                  )}
                </g>

                {/* Intra-Component V \ S Edges */}
                {/* Edge (D, E) w=2 */}
                <g>
                  <line x1="380" y1="130" x2="380" y2="330" stroke="#b3b9ff" strokeWidth="3.5" />
                  <circle cx="380" cy="230" r="12" fill="#070e1c" stroke="#b3b9ff" strokeWidth="1.5" />
                  <text x="380" y="234" fill="#b3b9ff" fontFamily="JetBrains Mono" fontSize="10" fontWeight="bold" textAnchor="middle">
                    2
                  </text>
                </g>
                {/* Edge (D, F) w=2 */}
                <g>
                  <line x1="380" y1="130" x2="520" y2="170" stroke="#b3b9ff" strokeWidth="3.5" />
                  <circle cx="450" cy="150" r="12" fill="#070e1c" stroke="#b3b9ff" strokeWidth="1.5" />
                  <text x="450" y="154" fill="#b3b9ff" fontFamily="JetBrains Mono" fontSize="10" fontWeight="bold" textAnchor="middle">
                    2
                  </text>
                </g>
                {/* Edge (F, G) w=3 */}
                <g>
                  <line x1="520" y1="170" x2="580" y2="310" stroke="#b3b9ff" strokeWidth="3.5" />
                  <circle cx="550" cy="240" r="12" fill="#070e1c" stroke="#b3b9ff" strokeWidth="1.5" />
                  <text x="550" y="244" fill="#b3b9ff" fontFamily="JetBrains Mono" fontSize="10" fontWeight="bold" textAnchor="middle">
                    3
                  </text>
                </g>

                {/* Vertices Component S */}
                <g>
                  <circle cx="100" cy="140" r="22" fill="#070e1c" stroke="#57f1db" strokeWidth="2.5" />
                  <text x="100" y="145" fill="#57f1db" fontFamily="JetBrains Mono" fontSize="14" fontWeight="bold" textAnchor="middle">
                    A
                  </text>
                </g>
                <g>
                  <circle cx="160" cy="280" r="22" fill="#070e1c" stroke="#57f1db" strokeWidth="2.5" />
                  <text x="160" y="285" fill="#57f1db" fontFamily="JetBrains Mono" fontSize="14" fontWeight="bold" textAnchor="middle">
                    B
                  </text>
                </g>
                <g>
                  <circle cx="240" cy="190" r="22" fill="#070e1c" stroke={isSevered ? '#ffb4ab' : '#57f1db'} strokeWidth="3" className={isSevered ? 'animate-pulse' : ''} />
                  <text x="240" y="195" fill={isSevered ? '#ffb4ab' : '#57f1db'} fontFamily="JetBrains Mono" fontSize="14" fontWeight="bold" textAnchor="middle">
                    C
                  </text>
                </g>

                {/* Vertices Component V \ S */}
                <g>
                  <circle cx="380" cy="130" r="22" fill="#070e1c" stroke="#b3b9ff" strokeWidth="2.5" />
                  <text x="380" y="135" fill="#b3b9ff" fontFamily="JetBrains Mono" fontSize="14" fontWeight="bold" textAnchor="middle">
                    D
                  </text>
                </g>
                <g>
                  <circle cx="380" cy="330" r="22" fill="#070e1c" stroke={isSevered ? '#ffb4ab' : '#b3b9ff'} strokeWidth="3" className={isSevered ? 'animate-pulse' : ''} />
                  <text x="380" y="335" fill={isSevered ? '#ffb4ab' : '#b3b9ff'} fontFamily="JetBrains Mono" fontSize="14" fontWeight="bold" textAnchor="middle">
                    E
                  </text>
                </g>
                <g>
                  <circle cx="520" cy="170" r="22" fill="#070e1c" stroke="#b3b9ff" strokeWidth="2.5" />
                  <text x="520" y="175" fill="#b3b9ff" fontFamily="JetBrains Mono" fontSize="14" fontWeight="bold" textAnchor="middle">
                    F
                  </text>
                </g>
                <g>
                  <circle cx="580" cy="310" r="22" fill="#070e1c" stroke="#b3b9ff" strokeWidth="2.5" />
                  <text x="580" y="315" fill="#b3b9ff" fontFamily="JetBrains Mono" fontSize="14" fontWeight="bold" textAnchor="middle">
                    G
                  </text>
                </g>
              </svg>

              {/* Edge Info Overlay */}
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-on-surface-variant font-code-sm text-code-sm bg-surface-container-high/80 backdrop-blur px-space-md py-1.5 rounded-lg border border-surface-container-high">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-error">content_cut</span>
                  <span>
                    Status:{' '}
                    <strong className={isSevered ? 'text-error' : 'text-primary'}>
                      {isSevered ? 'Edge (C, E) [w=3] SEVERED' : healedWithBE ? 'Healed via (B, E) [w=2]' : 'Restored (C, E)'}
                    </strong>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-primary">
                    <span className="w-2 h-2 rounded-full bg-primary"></span> Comp S {'{A,B,C}'}
                  </span>
                  <span className="flex items-center gap-1 text-tertiary">
                    <span className="w-2 h-2 rounded-full bg-tertiary"></span> Comp V\S {'{D,E,F,G}'}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-space-md bg-surface-container flex flex-wrap items-center justify-between gap-space-sm border-t border-surface-container">
              <div className="flex items-center gap-space-sm font-code-sm text-code-sm text-on-surface-variant">
                <span className="material-symbols-outlined text-[16px] text-outline">info</span>
                <span>
                  Mathematical Basis: Removing any edge <code className="text-primary font-bold">e ∈ T</code> partitions tree into exactly 2 connected components.
                </span>
              </div>
              <button
                onClick={handleReset}
                className="font-code-sm text-code-sm text-secondary hover:text-on-surface px-space-sm py-1 rounded bg-surface-container-highest transition-colors cursor-pointer"
                type="button"
              >
                Reset Simulator
              </button>
            </div>
          </div>

          {/* Right Panel: Recomputation & Proposed Augmentation */}
          <div className="lg:col-span-5 flex flex-col gap-space-md">
            {/* Immediate Static Recomputation Card */}
            <div className="flex flex-col bg-surface-container-low rounded-xl p-space-lg shadow-xl space-y-space-md border border-surface-container/40">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-sm">
                  <div className="w-7 h-7 rounded bg-primary/20 text-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">healing</span>
                  </div>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                    Immediate Static Recomputation
                  </h2>
                </div>
                <span className="font-label-badge text-label-badge bg-primary/10 text-primary px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                  DSU ENGINE
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Under a pure MST paradigm, any failure triggers full graph re-evaluation to detect cut-crossing replacement edges or initiates localized reconnect search.
              </p>

              {/* Action Button */}
              <button
                onClick={healWithCandidate}
                className="w-full flex items-center justify-center gap-space-sm px-space-md py-space-md rounded-lg bg-primary-container text-on-primary-container font-code-md text-code-md font-bold shadow-[0_0_16px_rgba(45,212,191,0.35)] hover:bg-primary hover:shadow-[0_0_22px_rgba(45,212,191,0.6)] transition-all cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">refresh</span>
                <span>Recompute MST with Alternative Edges</span>
              </button>

              {/* Metric Matrix */}
              <div className="bg-surface-container rounded-lg p-space-md space-y-space-xs font-code-sm text-code-sm border border-surface-container/40">
                <div className="flex justify-between items-center py-1">
                  <span className="text-on-surface-variant">Previous MST Cost:</span>
                  <span className="font-metric-val text-headline-sm text-on-surface">15 units</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-on-surface-variant">Severed Edge:</span>
                  <span className="text-error font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">close</span>
                    (C, E) [w=3]
                  </span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-on-surface-variant">Selected Replacement Edge:</span>
                  <span className="text-secondary font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">done</span>
                    (B, E) [w=2] (Optimal Cut)
                  </span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-on-surface-variant">New MST Cost:</span>
                  <span className="font-metric-val text-headline-sm text-primary font-bold">
                    {healedWithBE ? '14 units' : isSevered ? 'Partitioner' : '15 units'}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-on-surface-variant">Recomputation Latency:</span>
                  <span className="text-on-surface font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px] text-primary">timer</span>
                    0.18 ms <span className="text-outline text-body-sm">(DSU + Heap)</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Proposed Resilient Architecture */}
            <div className="flex flex-col bg-surface-container-low rounded-xl p-space-lg shadow-xl space-y-space-md relative overflow-hidden border border-surface-container/40">
              <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-secondary-container/10 blur-2xl pointer-events-none"></div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-sm">
                  <div className="w-7 h-7 rounded bg-secondary-container/30 text-secondary-fixed flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">verified</span>
                  </div>
                  <h2 className="font-headline-sm text-headline-sm text-secondary font-bold">
                    PROPOSED: Fault-Tolerant Dynamic Augmentation
                  </h2>
                </div>
                <span className="font-label-badge text-label-badge bg-surface-container-high text-secondary-fixed px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                  FUTURE SCOPE
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                To eliminate single points of failure without complete offline re-runs, higher-order resilient primitives can be integrated into the streaming engine.
              </p>

              {/* Locked Toggles with Tooltips */}
              <div className="space-y-space-sm">
                {[
                  { title: '2-Edge-Connected Augmentation (2-ECA)', sub: 'Biconnectivity via cycle-enclosure chords' },
                  { title: 'Pre-computed Backup Edge Registry', sub: 'O(1) localized failover swap lookups' },
                  { title: 'Dynamic Link-Cut Tree Maintenance', sub: 'O(log V) dynamic edge updates amortized' },
                  { title: 'Reliability-Weighted Edge Selection', sub: 'MTBF & packet drop-rate probability costs' },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="group relative flex items-center justify-between p-space-sm bg-surface-container rounded-lg border border-surface-container-high/40 cursor-help"
                    title="Proposed architecture: planned for Next-Gen Engine. Prevents single point of failure."
                  >
                    <div className="flex items-center gap-space-sm">
                      <span className="material-symbols-outlined text-[18px] text-secondary">lock</span>
                      <div className="flex flex-col">
                        <span className="font-code-sm text-code-sm text-on-surface font-semibold">{item.title}</span>
                        <span className="font-body-sm text-body-sm text-outline">{item.sub}</span>
                      </div>
                    </div>
                    <div className="w-10 h-5 bg-surface-container-highest rounded-full relative p-0.5">
                      <div className="w-4 h-4 bg-outline rounded-full"></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Status Chips */}
              <div className="pt-space-xs flex flex-wrap items-center gap-1.5 font-code-sm text-code-sm">
                <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface font-medium">
                  Minimum Cost: 15
                </span>
                <span className="px-2 py-0.5 rounded bg-surface-container text-primary font-medium">
                  Connectivity: 100%
                </span>
                <span className="px-2 py-0.5 rounded bg-surface-container text-error font-medium">
                  Redundancy: Single Point of Failure
                </span>
                <span className="px-2 py-0.5 rounded bg-error/15 text-error font-bold">Resilience: Critical</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-space-md p-space-md bg-surface-container-low rounded-xl shadow-lg mt-space-md border border-surface-container/40">
          <div className="flex items-center gap-space-md">
            <button
              onClick={() => onNavigate('algorithm-compare')}
              className="flex items-center gap-1.5 px-space-md py-space-sm rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-code-sm text-code-sm transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              <span>5. Algorithm Compare</span>
            </button>
            <div className="hidden sm:flex items-center gap-2 text-outline font-code-sm text-code-sm">
              <span>Module 06 of 09</span>
              <span>•</span>
              <span>Simulated Bridge Analysis Complete</span>
            </div>
          </div>

          <button
            onClick={() => onNavigate('testing-efficiency')}
            className="w-full sm:w-auto flex items-center justify-center gap-space-sm px-space-lg py-space-sm rounded-lg bg-primary text-on-primary font-code-md text-code-md font-bold shadow-[0_0_16px_rgba(87,241,219,0.3)] hover:shadow-[0_0_24px_rgba(87,241,219,0.5)] transition-all cursor-pointer"
          >
            <span>Proceed to Testing &amp; Efficiency Suite</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};
