import React from 'react';
import { ScreenId } from '../types';

interface GuidedDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (screen: ScreenId) => void;
}

export const GuidedDemoModal: React.FC<GuidedDemoModalProps> = ({ isOpen, onClose, onNavigate }) => {
  if (!isOpen) return null;

  const tourSteps: {
    id: ScreenId;
    step: string;
    title: string;
    criterion: string;
    desc: string;
    icon: string;
  }[] = [
    {
      id: 'problem-approach',
      step: '01',
      title: 'Problem Definition & Mathematical Approach',
      criterion: 'Problem Solving Approach (40m)',
      desc: 'Formulate the minimum cost backbone problem, examine cut & cycle theorems, and understand why Kruskal is edge-optimal.',
      icon: 'menu_book',
    },
    {
      id: 'graph-builder',
      step: '02',
      title: 'Interactive Graph Builder & Topology Editor',
      criterion: 'Presentation & Interaction (30m)',
      desc: 'Create and mutate network vertices and links on an interactive coordinate plane with live weight editing.',
      icon: 'polyline',
    },
    {
      id: 'kruskal-stepper',
      step: '03',
      title: 'Step-by-Step Kruskal Execution & Cycle Detection',
      criterion: 'Presentation & Interaction (30m)',
      desc: 'Step through all 11 evaluation iterations with live DSU component queries and visual edge status classification.',
      icon: 'play_circle',
    },
    {
      id: 'data-structures',
      step: '04',
      title: 'Core Data Structures & DSU Implementation',
      criterion: 'Implementation using Data Structures (40m)',
      desc: 'Explore flat arrays, priority queues, and live DSU forest transformations comparing naive chains with compressed star trees.',
      icon: 'account_tree',
    },
    {
      id: 'algorithm-compare',
      step: '05',
      title: 'Comparative Algorithmic Analysis',
      criterion: 'Algorithm Efficiency & Testing (40m)',
      desc: 'Profile Kruskal vs Prim vs Borůvka across sparse and dense graph topologies with empirical CPU benchmark charts.',
      icon: 'balance',
    },
    {
      id: 'failure-simulator',
      step: '06',
      title: 'Network Resilience & Bridge Failure Simulator',
      criterion: 'Problem Solving & Resilience (40m)',
      desc: 'Simulate critical fiber severances, observe two-component partitions, and trigger immediate heuristic healing.',
      icon: 'bolt',
    },
    {
      id: 'testing-efficiency',
      step: '07',
      title: 'Algorithmic Verification & Edge-Case Suite',
      criterion: 'Algorithm Efficiency & Testing (40m)',
      desc: 'Run 9 deterministic test cases verifying disconnected graphs, duplicate weights, multigraphs, and negative edges.',
      icon: 'speed',
    },
    {
      id: 'dynamic-multi-criteria',
      step: '08',
      title: 'Dynamic Maintenance & Multi-Criteria Pareto',
      criterion: 'Future Scope & Optimization (Proposal)',
      desc: 'Interact with 6-dimensional network sliders (Capex, Distance, Latency, Reliability, Risk, Bandwidth) with live Pareto re-ranking.',
      icon: 'tune',
    },
    {
      id: 'marks-dashboard',
      step: '09',
      title: 'Marks & Academic Evaluation Rubric',
      criterion: 'Full Rubric Evaluation (150/150 marks)',
      desc: 'Comprehensive breakdown of all evaluated criteria with verification indicators and direct module links.',
      icon: 'trophy',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-space-md bg-surface-container-lowest/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-surface-container-low border border-surface-container-high rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-space-lg bg-surface-container flex items-center justify-between border-b border-surface-container-high">
          <div className="flex items-center gap-space-sm">
            <div className="w-10 h-10 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-[24px]">fast_forward</span>
            </div>
            <div>
              <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
                MST Studio • Interactive Guided Walkthrough
              </h2>
              <p className="font-code-sm text-code-sm text-on-surface-variant">
                9-Stage Comprehensive Curriculum &amp; Evaluation Flow
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Modal Body: 9 Stages List */}
        <div className="p-space-lg overflow-y-auto space-y-space-sm flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-sm">
            {tourSteps.map((s) => (
              <div
                key={s.id}
                onClick={() => {
                  onNavigate(s.id);
                  onClose();
                }}
                className="p-space-md rounded-xl bg-surface-container hover:bg-surface-container-high border border-surface-container-high/60 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 group flex flex-col justify-between shadow-sm"
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-code-md text-code-md text-primary font-bold">{s.step}</span>
                    <span className="font-label-badge text-label-badge text-outline bg-surface-container-lowest px-1.5 py-0.5 rounded">
                      {s.criterion}
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold group-hover:text-primary transition-colors flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px] text-secondary">{s.icon}</span>
                    <span>{s.title}</span>
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">{s.desc}</p>
                </div>
                <div className="mt-space-sm pt-space-xs border-t border-surface-container-low flex items-center justify-between text-[11px] font-code-sm text-secondary">
                  <span>Launch Screen</span>
                  <span className="material-symbols-outlined text-[14px] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-space-md bg-surface-container flex items-center justify-between border-t border-surface-container-high">
          <span className="font-code-sm text-code-sm text-on-surface-variant">
            Full Rubric Scope: <strong className="text-primary-fixed">150 / 150 Points</strong>
          </span>
          <button
            onClick={() => {
              onNavigate('problem-approach');
              onClose();
            }}
            className="px-space-lg py-2 rounded-lg bg-primary-container text-on-primary-container font-code-md text-code-md font-bold hover:bg-primary transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <span>Start from Stage 01</span>
            <span className="material-symbols-outlined text-[18px]">play_arrow</span>
          </button>
        </div>
      </div>
    </div>
  );
};
