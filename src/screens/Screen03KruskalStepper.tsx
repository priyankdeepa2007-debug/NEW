import React, { useState, useEffect, useRef } from 'react';
import { ScreenId, KruskalStep } from '../types';

interface Screen03Props {
  onNavigate: (screen: ScreenId) => void;
}

const stepsData: KruskalStep[] = [
  {
    index: 1,
    edgeId: 'FG',
    u: 'F',
    v: 'G',
    weight: 1,
    findU: 'F',
    findV: 'G',
    decision: 'ACCEPTED',
    reason: 'Nodes F and G belong to disjoint trees. Union(F, G) creates tree rooted at G.',
    cost: 1,
    acceptedCount: 1,
    totalQueries: 2,
    components: 'C1: {A}, C2: {B}, C3: {C}, C4: {D}, C5: {E}, C6: {F, G}',
    roots: { A: 'A', B: 'B', C: 'C', D: 'D', E: 'E', F: 'G', G: 'G' },
  },
  {
    index: 2,
    edgeId: 'AC',
    u: 'A',
    v: 'C',
    weight: 2,
    findU: 'A',
    findV: 'C',
    decision: 'ACCEPTED',
    reason: 'Find(A) ≠ Find(C). Union merges component A into C.',
    cost: 3,
    acceptedCount: 2,
    totalQueries: 4,
    components: 'C1: {A, C}, C2: {B}, C3: {D}, C4: {E}, C5: {F, G}',
    roots: { A: 'C', B: 'B', C: 'C', D: 'D', E: 'E', F: 'G', G: 'G' },
  },
  {
    index: 3,
    edgeId: 'CE',
    u: 'C',
    v: 'E',
    weight: 3,
    findU: 'C',
    findV: 'E',
    decision: 'ACCEPTED',
    reason: 'Find(C) ≠ Find(E). Union merges component E into C.',
    cost: 6,
    acceptedCount: 3,
    totalQueries: 6,
    components: 'C1: {A, C, E}, C2: {B}, C3: {D}, C4: {F, G}',
    roots: { A: 'C', B: 'B', C: 'C', D: 'D', E: 'C', F: 'G', G: 'G' },
  },
  {
    index: 4,
    edgeId: 'BC',
    u: 'B',
    v: 'C',
    weight: 4,
    findU: 'B',
    findV: 'C',
    decision: 'ACCEPTED',
    reason: 'Find(B) ≠ Find(C). Node B merges into principal backbone C.',
    cost: 10,
    acceptedCount: 4,
    totalQueries: 8,
    components: 'C1: {A, B, C, E}, C2: {D}, C3: {F, G}',
    roots: { A: 'C', B: 'C', C: 'C', D: 'D', E: 'C', F: 'G', G: 'G' },
  },
  {
    index: 5,
    edgeId: 'AB',
    u: 'A',
    v: 'B',
    weight: 4,
    findU: 'C',
    findV: 'C',
    decision: 'REJECTED',
    reason: 'Both A and B already resolve to root C. Adding (A, B) creates cycle [A-C-B-A].',
    cost: 10,
    acceptedCount: 4,
    totalQueries: 10,
    components: 'C1: {A, B, C, E}, C2: {D}, C3: {F, G}',
    roots: { A: 'C', B: 'C', C: 'C', D: 'D', E: 'C', F: 'G', G: 'G' },
  },
  {
    index: 6,
    edgeId: 'DE',
    u: 'D',
    v: 'E',
    weight: 5,
    findU: 'D',
    findV: 'C',
    decision: 'ACCEPTED',
    reason: 'Find(D)=D, Find(E)=C. Disjoint sets merged. D joins backbone C.',
    cost: 15,
    acceptedCount: 5,
    totalQueries: 12,
    components: 'C1: {A, B, C, D, E}, C2: {F, G}',
    roots: { A: 'C', B: 'C', C: 'C', D: 'C', E: 'C', F: 'G', G: 'G' },
  },
  {
    index: 7,
    edgeId: 'BD',
    u: 'B',
    v: 'D',
    weight: 6,
    findU: 'C',
    findV: 'C',
    decision: 'REJECTED',
    reason: 'Find(B)=C and Find(D)=C. Edge rejected because path B-C-E-D already connects them.',
    cost: 15,
    acceptedCount: 5,
    totalQueries: 14,
    components: 'C1: {A, B, C, D, E}, C2: {F, G}',
    roots: { A: 'C', B: 'C', C: 'C', D: 'C', E: 'C', F: 'G', G: 'G' },
  },
  {
    index: 8,
    edgeId: 'DF',
    u: 'D',
    v: 'F',
    weight: 7,
    findU: 'C',
    findV: 'G',
    decision: 'ACCEPTED',
    reason: 'Find(D)=C, Find(F)=G. Bridges backbone component C with sub-tree G.',
    cost: 22,
    acceptedCount: 6,
    totalQueries: 16,
    components: 'C1: {A, B, C, D, E, F, G} (Single Connected Component)',
    roots: { A: 'C', B: 'C', C: 'C', D: 'C', E: 'C', F: 'C', G: 'C' },
  },
  {
    index: 9,
    edgeId: 'BE',
    u: 'B',
    v: 'E',
    weight: 8,
    findU: 'C',
    findV: 'C',
    decision: 'REJECTED',
    reason: 'Both nodes already part of completed MST spanning tree.',
    cost: 22,
    acceptedCount: 6,
    totalQueries: 18,
    components: 'C1: Complete Spanning Component',
    roots: { A: 'C', B: 'C', C: 'C', D: 'C', E: 'C', F: 'C', G: 'C' },
  },
  {
    index: 10,
    edgeId: 'EG',
    u: 'E',
    v: 'G',
    weight: 9,
    findU: 'C',
    findV: 'C',
    decision: 'REJECTED',
    reason: 'Path already exists via E-D-F-G. Reject to prevent cycle.',
    cost: 22,
    acceptedCount: 6,
    totalQueries: 20,
    components: 'C1: Complete Spanning Component',
    roots: { A: 'C', B: 'C', C: 'C', D: 'C', E: 'C', F: 'C', G: 'C' },
  },
  {
    index: 11,
    edgeId: 'CD',
    u: 'C',
    v: 'D',
    weight: 10,
    findU: 'C',
    findV: 'C',
    decision: 'REJECTED',
    reason: 'Both nodes in tree. Rejected as cycle redundant link.',
    cost: 22,
    acceptedCount: 6,
    totalQueries: 22,
    components: 'C1: Complete Spanning Component',
    roots: { A: 'C', B: 'C', C: 'C', D: 'C', E: 'C', F: 'C', G: 'C' },
  },
];

// Node screen coordinates in graph SVG
const nodePositions: Record<string, { x: number; y: number }> = {
  A: { x: 120, y: 130 },
  B: { x: 130, y: 310 },
  C: { x: 260, y: 210 },
  D: { x: 430, y: 280 },
  E: { x: 390, y: 140 },
  F: { x: 560, y: 290 },
  G: { x: 480, y: 380 },
};

const allEdgeDefs = [
  { id: 'FG', u: 'F', v: 'G', w: 1, labelX: 521, labelY: 338 },
  { id: 'AC', u: 'A', v: 'C', w: 2, labelX: 191, labelY: 171 },
  { id: 'CE', u: 'C', v: 'E', w: 3, labelX: 326, labelY: 175 },
  { id: 'BC', u: 'B', v: 'C', w: 4, labelX: 196, labelY: 261 },
  { id: 'AB', u: 'A', v: 'B', w: 4, labelX: 124, labelY: 223 },
  { id: 'DE', u: 'D', v: 'E', w: 5, labelX: 409, labelY: 213 },
  { id: 'BD', u: 'B', v: 'D', w: 6, labelX: 283, labelY: 314 },
  { id: 'DF', u: 'D', v: 'F', w: 7, labelX: 501, labelY: 287 },
  { id: 'BE', u: 'B', v: 'E', w: 8, labelX: 261, labelY: 231 },
  { id: 'EG', u: 'E', v: 'G', w: 9, labelX: 451, labelY: 258 },
  { id: 'CD', u: 'C', v: 'D', w: 10, labelX: 347, labelY: 258 },
];

export const Screen03KruskalStepper: React.FC<Screen03Props> = ({ onNavigate }) => {
  const [currentStep, setCurrentStep] = useState<number>(7);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speedMs, setSpeedMs] = useState<number>(800);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const stepObj = stepsData[currentStep - 1] || stepsData[0];

  const stopAuto = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsPlaying(false);
  };

  const handleStepNext = () => {
    if (currentStep < stepsData.length) {
      setCurrentStep((s) => s + 1);
    } else {
      stopAuto();
    }
  };

  const handleStepPrev = () => {
    if (currentStep > 1) {
      setCurrentStep((s) => s - 1);
    }
  };

  const toggleAuto = () => {
    if (isPlaying) {
      stopAuto();
    } else {
      if (currentStep >= stepsData.length) {
        setCurrentStep(1);
      }
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= stepsData.length) {
            stopAuto();
            return prev;
          }
          return prev + 1;
        });
      }, speedMs);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, speedMs]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.code === 'Space') {
        e.preventDefault();
        toggleAuto();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        stopAuto();
        handleStepNext();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        stopAuto();
        handleStepPrev();
      } else if (e.key === 'r' || e.key === 'R') {
        stopAuto();
        setCurrentStep(1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, currentStep]);

  return (
    <div className="flex flex-col w-full pb-space-xl">
      <div className="px-space-lg py-space-md flex flex-col gap-space-lg">
        {/* Top Rubric Header Banner */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md bg-surface-container-low p-space-md rounded-xl shadow-md border border-surface-container/40">
          <div className="flex flex-col gap-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-code-sm text-code-sm text-primary uppercase font-bold tracking-widest">
                Workbench Stage 03
              </span>
              <span className="text-outline text-body-sm">•</span>
              <span className="font-label-badge text-label-badge px-2 py-0.5 rounded bg-primary-container/20 text-primary font-semibold">
                ALGORITHM RUNNER
              </span>
              <button
                onClick={() => onNavigate('marks-dashboard')}
                className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-secondary-container/20 text-secondary font-label-badge text-label-badge hover:bg-secondary-container/30 transition-all cursor-pointer"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                <span>Criterion: Problem Solving (40m)</span>
              </button>
              <button
                onClick={() => onNavigate('marks-dashboard')}
                className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-tertiary-container/20 text-tertiary-container font-label-badge text-label-badge hover:bg-tertiary-container/30 transition-all cursor-pointer"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary-container"></span>
                <span>Criterion: Presentation &amp; Interaction (30m)</span>
              </button>
            </div>
            <h1 className="font-headline-md text-headline-md text-on-surface font-semibold tracking-tight">
              03. Step-by-Step Kruskal Execution &amp; Cycle Detection
            </h1>
          </div>

          <div className="flex items-center gap-2 self-start lg:self-auto">
            <div className="flex items-center gap-2 px-space-md py-1.5 rounded-lg bg-surface-container-highest shadow-sm border border-surface-container/50">
              <span className="material-symbols-outlined text-primary text-[18px] animate-spin">refresh</span>
              <span className="font-code-sm text-code-sm text-primary font-bold">
                Step {currentStep} of {stepsData.length}: Evaluating Edge ({stepObj.u}, {stepObj.v}) w={stepObj.weight}
              </span>
            </div>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-space-sm">
          <div className="bg-surface-container p-space-md rounded-lg shadow-sm flex flex-col justify-between border border-surface-container/40">
            <span className="font-code-sm text-code-sm text-on-surface-variant flex items-center justify-between">
              <span>Accepted Edges</span>
              <span className="material-symbols-outlined text-[16px] text-primary">check_circle</span>
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-metric-val text-headline-md text-primary">{stepObj.acceptedCount} / 6</span>
              <span className="font-code-sm text-code-sm text-outline">(V - 1 target)</span>
            </div>
            <div className="w-full bg-surface-container-highest h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-primary h-full transition-all duration-300"
                style={{ width: `${(stepObj.acceptedCount / 6) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-surface-container p-space-md rounded-lg shadow-sm flex flex-col justify-between border border-surface-container/40">
            <span className="font-code-sm text-code-sm text-on-surface-variant flex items-center justify-between">
              <span>Running MST Cost</span>
              <span className="material-symbols-outlined text-[16px] text-secondary">speed</span>
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-metric-val text-headline-md text-secondary">{stepObj.cost}</span>
              <span className="font-code-sm text-code-sm text-outline">units</span>
            </div>
            <div className="w-full bg-surface-container-highest h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-secondary h-full transition-all duration-300"
                style={{ width: `${Math.min((stepObj.cost / 22) * 100, 100)}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-surface-container p-space-md rounded-lg shadow-sm flex flex-col justify-between border border-surface-container/40">
            <span className="font-code-sm text-code-sm text-on-surface-variant flex items-center justify-between">
              <span>Edges Evaluated</span>
              <span className="material-symbols-outlined text-[16px] text-tertiary">query_stats</span>
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-metric-val text-headline-md text-tertiary">
                {currentStep} / {stepsData.length}
              </span>
              <span className="font-code-sm text-code-sm text-outline">in queue</span>
            </div>
            <div className="w-full bg-surface-container-highest h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-tertiary h-full transition-all duration-300"
                style={{ width: `${(currentStep / stepsData.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-surface-container p-space-md rounded-lg shadow-sm flex flex-col justify-between border border-surface-container/40">
            <span className="font-code-sm text-code-sm text-on-surface-variant flex items-center justify-between">
              <span>Total DSU Queries</span>
              <span className="material-symbols-outlined text-[16px] text-primary-fixed">account_tree</span>
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-metric-val text-headline-md text-primary-fixed">{stepObj.totalQueries}</span>
              <span className="font-code-sm text-code-sm text-outline">Find/Union calls</span>
            </div>
            <div className="w-full bg-surface-container-highest h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-primary-fixed h-full transition-all duration-300"
                style={{ width: `${(stepObj.totalQueries / 22) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Main Grid: Left 7 Cols SVG + Right 5 Cols Engine */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-lg">
          {/* Left: SVG Graph Display & Playback Controls */}
          <div className="xl:col-span-7 flex flex-col gap-space-md">
            <div className="relative bg-surface-container-low rounded-xl overflow-hidden shadow-md flex flex-col border border-surface-container/40">
              {/* Header */}
              <div className="px-space-md py-2.5 bg-surface-container-high/60 flex items-center justify-between border-b border-surface-container">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[18px]">hub</span>
                  <span className="font-code-sm text-code-sm text-on-surface font-semibold uppercase">
                    Topology Graph Display (V=7, E=11)
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[11px] font-code-sm">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-1 rounded-full bg-primary-container"></span> Accepted
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-1 rounded-full bg-error"></span> Rejected Cycle
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-1 rounded-full bg-secondary"></span> Current Test
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-1 rounded-full bg-outline-variant"></span> Pending
                  </span>
                </div>
              </div>

              {/* SVG Canvas */}
              <div className="relative w-full h-[470px] bg-surface-container-lowest flex items-center justify-center overflow-hidden">
                <svg className="w-full h-full relative z-10 select-none" viewBox="0 0 680 440">
                  <defs>
                    <pattern id="dotGridStep" width="24" height="24" patternUnits="userSpaceOnUse">
                      <circle cx="2" cy="2" r="1" fill="#859490" opacity="0.3" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#dotGridStep)" />

                  {/* Edges */}
                  <g id="edge-layer">
                    {allEdgeDefs.map((def) => {
                      const uPos = nodePositions[def.u];
                      const vPos = nodePositions[def.v];
                      const stepIdx = stepsData.findIndex((s) => s.edgeId === def.id);
                      const isPast = stepIdx !== -1 && stepIdx + 1 < currentStep;
                      const isCurrent = stepIdx !== -1 && stepIdx + 1 === currentStep;
                      const stepInfo = stepIdx !== -1 ? stepsData[stepIdx] : null;

                      let stroke = '#3c4a46';
                      let strokeWidth = 2;
                      let strokeDash = 'none';
                      let pulseClass = '';

                      if (isPast && stepInfo) {
                        if (stepInfo.decision === 'ACCEPTED') {
                          stroke = '#2dd4bf';
                          strokeWidth = 4.5;
                        } else {
                          stroke = '#ffb4ab';
                          strokeWidth = 2.5;
                          strokeDash = '6,4';
                        }
                      } else if (isCurrent) {
                        stroke = '#7bd0ff';
                        strokeWidth = 4;
                        strokeDash = '4,4';
                        pulseClass = 'animate-pulse';
                      }

                      return (
                        <line
                          key={def.id}
                          x1={uPos.x}
                          y1={uPos.y}
                          x2={vPos.x}
                          y2={vPos.y}
                          stroke={stroke}
                          strokeWidth={strokeWidth}
                          strokeDasharray={strokeDash}
                          strokeLinecap="round"
                          className={pulseClass}
                        />
                      );
                    })}
                  </g>

                  {/* Edge Labels */}
                  <g className="font-code-sm text-[12px] font-bold">
                    {allEdgeDefs.map((def) => {
                      const stepIdx = stepsData.findIndex((s) => s.edgeId === def.id);
                      const isPast = stepIdx !== -1 && stepIdx + 1 < currentStep;
                      const isCurrent = stepIdx !== -1 && stepIdx + 1 === currentStep;
                      const stepInfo = stepIdx !== -1 ? stepsData[stepIdx] : null;

                      let fill = '#859490';
                      let bgFill = '#070e1c';

                      if (isPast && stepInfo) {
                        if (stepInfo.decision === 'ACCEPTED') {
                          fill = '#57f1db';
                        } else {
                          fill = '#ffb4ab';
                        }
                      } else if (isCurrent) {
                        fill = '#7bd0ff';
                        bgFill = '#00374d';
                      }

                      return (
                        <g key={`lbl-${def.id}`}>
                          <rect
                            x={def.labelX - 12}
                            y={def.labelY - 13}
                            width="24"
                            height="18"
                            rx="4"
                            fill={bgFill}
                          />
                          <text x={def.labelX} y={def.labelY} fill={fill} textAnchor="middle">
                            {def.w}
                          </text>
                        </g>
                      );
                    })}
                  </g>

                  {/* Nodes */}
                  <g id="node-layer">
                    {Object.entries(nodePositions).map(([nodeKey, pos]) => {
                      const currentRoot = stepObj.roots[nodeKey] || nodeKey;
                      const isRoot = currentRoot === nodeKey;
                      const isTargetEdgeNode = stepObj.u === nodeKey || stepObj.v === nodeKey;

                      let ringColor = isTargetEdgeNode ? '#7bd0ff' : '#2dd4bf';
                      if (currentRoot === 'G') ringColor = '#bdc2ff';

                      return (
                        <g key={nodeKey} transform={`translate(${pos.x}, ${pos.y})`}>
                          <circle
                            r="22"
                            fill="#0c1321"
                            stroke={ringColor}
                            strokeWidth={isTargetEdgeNode ? 3.5 : 2.5}
                          />
                          <text
                            y="5"
                            fill="#dce2f6"
                            fontFamily="JetBrains Mono"
                            fontSize="14"
                            fontWeight="700"
                            textAnchor="middle"
                          >
                            {nodeKey}
                          </text>
                          <rect
                            x="-24"
                            y={nodeKey === 'B' || nodeKey === 'D' || nodeKey === 'F' || nodeKey === 'G' ? 26 : -36}
                            width="48"
                            height="15"
                            rx="3"
                            fill={isTargetEdgeNode ? '#00374d' : '#19202e'}
                          />
                          <text
                            x="0"
                            y={nodeKey === 'B' || nodeKey === 'D' || nodeKey === 'F' || nodeKey === 'G' ? 37 : -25}
                            fill={ringColor}
                            fontFamily="JetBrains Mono"
                            fontSize="10"
                            fontWeight="600"
                            textAnchor="middle"
                          >
                            {isRoot ? `ROOT: ${nodeKey}` : `R: ${currentRoot}`}
                          </text>
                        </g>
                      );
                    })}
                  </g>
                </svg>
              </div>

              {/* Sub-Legend */}
              <div className="p-space-sm bg-surface-container flex flex-wrap items-center justify-between gap-space-sm border-t border-surface-container">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-outline text-[16px]">info</span>
                  <span className="font-code-sm text-code-sm text-on-surface-variant">
                    Hover edges or table rows to highlight DSU component boundaries
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-label-badge text-label-badge text-outline">COMPONENTS:</span>
                  <span className="px-2 py-0.5 rounded bg-surface-container-high text-primary font-code-sm text-code-sm font-semibold">
                    {stepObj.components}
                  </span>
                </div>
              </div>
            </div>

            {/* Playback Controls Box */}
            <div className="bg-surface-container p-space-md rounded-xl shadow-md flex flex-col gap-space-sm border border-surface-container/40">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-space-md">
                <div className="flex items-center gap-1.5 bg-surface-container-lowest p-1 rounded-lg border border-surface-container/40">
                  <button
                    onClick={() => {
                      stopAuto();
                      setCurrentStep(1);
                    }}
                    className="p-2 rounded hover:bg-surface-container-high text-on-surface transition-all cursor-pointer"
                    title="First step"
                  >
                    <span className="material-symbols-outlined text-[18px]">first_page</span>
                  </button>
                  <button
                    onClick={() => {
                      stopAuto();
                      handleStepPrev();
                    }}
                    className="p-2 rounded hover:bg-surface-container-high text-on-surface transition-all cursor-pointer"
                    title="Previous step"
                  >
                    <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                  </button>
                  <button
                    onClick={toggleAuto}
                    className="flex items-center gap-1 px-3 py-1.5 rounded bg-primary-container text-on-primary-container font-code-md text-code-md font-bold hover:bg-primary transition-all shadow-sm cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {isPlaying ? 'pause' : 'play_arrow'}
                    </span>
                    <span>{isPlaying ? 'Pause' : 'Auto Play'}</span>
                  </button>
                  <button
                    onClick={() => {
                      stopAuto();
                      handleStepNext();
                    }}
                    className="p-2 rounded hover:bg-surface-container-high text-on-surface transition-all cursor-pointer"
                    title="Next step"
                  >
                    <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                  </button>
                  <button
                    onClick={() => {
                      stopAuto();
                      setCurrentStep(1);
                    }}
                    className="p-2 rounded hover:bg-surface-container-high text-on-surface transition-all cursor-pointer"
                    title="Reset execution"
                  >
                    <span className="material-symbols-outlined text-[18px]">restart_alt</span>
                  </button>
                </div>

                <div className="flex items-center gap-space-md w-full sm:w-auto justify-end">
                  <div className="flex items-center gap-2">
                    <span className="font-code-sm text-code-sm text-on-surface-variant">Speed:</span>
                    <input
                      type="range"
                      min={300}
                      max={1800}
                      step={100}
                      value={speedMs}
                      onChange={(e) => setSpeedMs(Number(e.target.value))}
                      className="w-24 accent-primary cursor-pointer"
                    />
                    <span className="font-code-sm text-code-sm text-primary font-bold">
                      {(800 / speedMs).toFixed(1)}x ({speedMs}ms)
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 bg-surface-container-low px-space-md py-1.5 rounded-lg text-outline border border-surface-container/30">
                <span className="font-code-sm text-code-sm">Keyboard Shortcuts:</span>
                <div className="flex items-center gap-3 font-code-sm text-code-sm text-on-surface-variant">
                  <span>
                    <kbd className="px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface">Space</kbd>{' '}
                    Play / Pause
                  </span>
                  <span>
                    <kbd className="px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface">←</kbd>{' '}
                    <kbd className="px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface">→</kbd> Step
                  </span>
                  <span>
                    <kbd className="px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface">R</kbd> Reset
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: DSU Decision Engine & Priority Queue */}
          <div className="xl:col-span-5 flex flex-col gap-space-md">
            {/* DSU Decision Engine */}
            <div className="bg-surface-container p-space-md rounded-xl shadow-md flex flex-col gap-space-sm border border-surface-container/40">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[18px]">memory</span>
                  <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                    DSU Decision Engine
                  </span>
                </div>
                <span className="font-label-badge text-label-badge text-primary bg-primary-container/20 px-2 py-0.5 rounded">
                  UNION-FIND INVOKED
                </span>
              </div>

              <div className="bg-surface-container-low p-space-sm rounded-lg flex flex-col gap-1 border border-surface-container/40">
                <span className="font-label-badge text-label-badge text-outline">THE SELECTION THEOREM</span>
                <p className="font-code-sm text-code-sm text-on-surface">
                  <span className="text-primary font-semibold">Accept</span> if Find(u) ≠ Find(v);{' '}
                  <span className="text-error font-semibold">Reject</span> if Find(u) == Find(v){' '}
                  <span className="text-on-surface-variant">(introduces cyclic loop)</span>.
                </p>
              </div>

              <div className="bg-surface-container-lowest p-space-md rounded-lg flex flex-col gap-2 font-code-sm text-code-sm border border-surface-container/50">
                <div className="flex items-center justify-between pb-1.5 border-b border-surface-container/40">
                  <span className="text-on-surface-variant">Evaluating Target:</span>
                  <span className="text-secondary font-bold text-code-lg font-code-lg">
                    Edge ({stepObj.u}, {stepObj.v}) • w = {stepObj.weight}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-surface-container-high/60 p-2 rounded flex flex-col gap-0.5 border border-surface-container/40">
                    <span className="text-outline text-[11px]">DISJOINT PROBE 1</span>
                    <span className="text-on-surface font-semibold">
                      Find({stepObj.u}) → <span className="text-primary font-bold">Root {stepObj.findU}</span>
                    </span>
                    <span className="text-[10px] text-on-surface-variant">Component #1</span>
                  </div>
                  <div className="bg-surface-container-high/60 p-2 rounded flex flex-col gap-0.5 border border-surface-container/40">
                    <span className="text-outline text-[11px]">DISJOINT PROBE 2</span>
                    <span className="text-on-surface font-semibold">
                      Find({stepObj.v}) → <span className="text-primary font-bold">Root {stepObj.findV}</span>
                    </span>
                    <span className="text-[10px] text-on-surface-variant">Component #1</span>
                  </div>
                </div>

                <div
                  className={`mt-1 p-2 rounded flex items-start gap-2 ${
                    stepObj.decision === 'ACCEPTED'
                      ? 'bg-primary-container/20 text-primary border border-primary/20'
                      : 'bg-error-container/30 text-error border border-error/20'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {stepObj.decision === 'ACCEPTED' ? 'check_circle' : 'cancel'}
                  </span>
                  <div className="flex flex-col">
                    <span className="font-bold">
                      {stepObj.decision === 'ACCEPTED'
                        ? `Result: Find(${stepObj.u}) ≠ Find(${stepObj.v}) → ACCEPT & UNION(${stepObj.u}, ${stepObj.v})`
                        : `Result: Find(${stepObj.u}) == Find(${stepObj.v}) → REJECT (Cycle Detected)`}
                    </span>
                    <span className="text-[11px] text-on-surface-variant mt-0.5">{stepObj.reason}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sorted Edge Priority Queue Table */}
            <div className="bg-surface-container p-space-md rounded-xl shadow-md flex-1 flex flex-col min-h-0 border border-surface-container/40">
              <div className="flex items-center justify-between pb-space-sm border-b border-surface-container">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary text-[18px]">format_list_numbered</span>
                  <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                    Sorted Edge Priority Queue
                  </span>
                </div>
                <span className="font-code-sm text-code-sm text-outline">Ascending Order</span>
              </div>

              <div className="overflow-y-auto max-h-[310px] rounded-lg bg-surface-container-lowest mt-space-sm">
                <table className="w-full text-left font-code-sm text-code-sm">
                  <thead className="sticky top-0 bg-surface-container-high text-on-surface-variant text-[11px] uppercase tracking-wider">
                    <tr>
                      <th className="p-2.5">#</th>
                      <th className="p-2.5">Edge</th>
                      <th className="p-2.5">Weight</th>
                      <th className="p-2.5">Find(u)</th>
                      <th className="p-2.5">Find(v)</th>
                      <th className="p-2.5 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-container/30">
                    {stepsData.map((s, idx) => {
                      const stepNum = idx + 1;
                      const isDone = stepNum < currentStep;
                      const isCurrent = stepNum === currentStep;

                      return (
                        <tr
                          key={s.edgeId}
                          onClick={() => {
                            stopAuto();
                            setCurrentStep(stepNum);
                          }}
                          className={`cursor-pointer transition-colors ${
                            isCurrent
                              ? 'bg-secondary-container/20 font-bold'
                              : 'hover:bg-surface-container-high/40'
                          }`}
                        >
                          <td className="p-2.5 text-on-surface-variant">
                            {isCurrent ? `▶ ${stepNum}` : stepNum}
                          </td>
                          <td className="p-2.5 text-on-surface">
                            ({s.u}, {s.v})
                          </td>
                          <td className="p-2.5 text-on-surface font-metric-val">{s.weight}</td>
                          <td className="p-2.5 text-primary">{stepNum <= currentStep ? s.findU : '-'}</td>
                          <td className="p-2.5 text-secondary">{stepNum <= currentStep ? s.findV : '-'}</td>
                          <td className="p-2.5 text-right">
                            {isDone ? (
                              s.decision === 'ACCEPTED' ? (
                                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-primary-container/20 text-primary">
                                  ACCEPTED
                                </span>
                              ) : (
                                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-error-container/30 text-error">
                                  REJECTED
                                </span>
                              )
                            ) : isCurrent ? (
                              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-secondary text-on-secondary shadow-sm">
                                CURRENT
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-surface-container text-outline">
                                PENDING
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
        </div>

        {/* Milestone Footer */}
        <div className="p-space-lg rounded-xl bg-gradient-to-r from-surface-container-low via-surface-container to-surface-container-high shadow-xl flex flex-col md:flex-row items-center justify-between gap-space-md border border-surface-container/50">
          <div className="flex items-center gap-space-md min-w-0">
            <div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center shadow-lg shrink-0">
              <span className="material-symbols-outlined text-[28px]">verified</span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  Execution Milestone Target Reached
                </span>
                <span className="px-2 py-0.5 rounded bg-primary-container/20 text-primary font-label-badge text-label-badge font-bold">
                  OPTIMAL
                </span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant truncate">
                Target |V| - 1 = 6 edges spanning complete. Total Spanning Tree Cost = 22 (Zero Disconnection).
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 w-full md:w-auto justify-end">
            <button
              onClick={() => onNavigate('data-structures')}
              className="px-space-md py-2 rounded-lg bg-surface-container-highest hover:bg-surface-bright text-on-surface font-code-md text-code-md font-semibold transition-all flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <span>Inspect Data Structures</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
            <button
              onClick={() => onNavigate('failure-simulator')}
              className="px-space-md py-2 rounded-lg bg-primary-container hover:bg-primary text-on-primary-container font-code-md text-code-md font-bold transition-all flex items-center gap-2 shadow-md cursor-pointer"
            >
              <span>Simulate Failure</span>
              <span className="material-symbols-outlined text-[16px]">bolt</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
