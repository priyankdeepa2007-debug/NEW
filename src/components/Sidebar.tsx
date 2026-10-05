import React from 'react';
import { ScreenId } from '../types';

interface SidebarProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentScreen, onNavigate }) => {
  const coreScreens: { id: ScreenId; name: string; mark: string; markColor: string; icon: string }[] = [
    { id: 'problem-approach', name: '1. Problem & Approach', mark: '40m', markColor: 'text-secondary', icon: 'menu_book' },
    { id: 'graph-builder', name: '2. Graph Builder', mark: '30m', markColor: 'text-tertiary', icon: 'polyline' },
    { id: 'kruskal-stepper', name: '3. Kruskal Stepper', mark: '40m', markColor: 'text-secondary', icon: 'play_circle' },
    { id: 'data-structures', name: '4. Data Structures', mark: '40m', markColor: 'text-tertiary-fixed-dim', icon: 'account_tree' },
    { id: 'algorithm-compare', name: '5. Algorithm Compare', mark: '40m', markColor: 'text-primary', icon: 'balance' },
  ];

  const resilienceScreens: { id: ScreenId; name: string; mark: string; markColor: string; icon: string }[] = [
    { id: 'failure-simulator', name: '6. Failure Simulator', mark: '40m', markColor: 'text-error', icon: 'bolt' },
    { id: 'testing-efficiency', name: '7. Testing & Efficiency', mark: '40m', markColor: 'text-primary-fixed-dim', icon: 'speed' },
    { id: 'dynamic-multi-criteria', name: '8. Dynamic & Multi-crit', mark: 'Scope', markColor: 'text-on-surface-variant', icon: 'tune' },
    { id: 'marks-dashboard', name: '9. Marks Dashboard', mark: '150m', markColor: 'text-primary-fixed font-bold', icon: 'trophy' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-[260px] bg-surface-container-lowest z-50 flex flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.5)] border-r border-surface-container/40">
      <div className="flex flex-col h-full overflow-hidden">
        {/* Logo Banner */}
        <div
          onClick={() => onNavigate('problem-approach')}
          className="p-space-md flex items-center gap-space-sm bg-surface-container-low/40 cursor-pointer hover:bg-surface-container-low/70 transition-colors"
        >
          <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-primary shadow-[0_0_12px_rgba(45,212,191,0.25)]">
            <span className="material-symbols-outlined text-[20px]">hub</span>
          </div>
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm text-on-surface font-bold tracking-tight">MST Studio</span>
            <span className="font-code-sm text-[11px] text-on-surface-variant">v2.4-opt • Core Engine</span>
          </div>
        </div>

        {/* Navigation Sections */}
        <div className="flex-1 overflow-y-auto px-space-sm py-space-md space-y-space-lg">
          {/* Group 1 */}
          <nav className="space-y-space-xs">
            <div className="px-space-sm pb-space-xs text-[10px] uppercase tracking-wider font-code-sm text-outline font-semibold">
              Core Architecture &amp; Algorithm
            </div>
            {coreScreens.map((screen) => {
              const isActive = currentScreen === screen.id;
              return (
                <button
                  key={screen.id}
                  onClick={() => onNavigate(screen.id)}
                  className={`w-full group flex items-center justify-between px-space-sm py-space-xs rounded-lg transition-all text-left ${
                    isActive
                      ? 'bg-primary-container text-on-primary-container font-semibold shadow-[0_0_10px_rgba(45,212,191,0.35)]'
                      : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                  }`}
                >
                  <div className="flex items-center gap-space-sm min-w-0">
                    <span className="material-symbols-outlined text-[18px] shrink-0">{screen.icon}</span>
                    <span className="font-body-sm text-body-sm truncate">{screen.name}</span>
                  </div>
                  <span
                    className={`font-label-badge text-label-badge px-1 py-0.5 rounded text-[11px] shrink-0 ${
                      isActive ? 'bg-on-primary-container/20 text-on-primary-container font-bold' : `bg-surface-container-high ${screen.markColor}`
                    }`}
                  >
                    {screen.mark}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Group 2 */}
          <nav className="space-y-space-xs">
            <div className="px-space-sm pb-space-xs text-[10px] uppercase tracking-wider font-code-sm text-outline font-semibold">
              Resilience &amp; Evaluation
            </div>
            {resilienceScreens.map((screen) => {
              const isActive = currentScreen === screen.id;
              return (
                <button
                  key={screen.id}
                  onClick={() => onNavigate(screen.id)}
                  className={`w-full group flex items-center justify-between px-space-sm py-space-xs rounded-lg transition-all text-left ${
                    isActive
                      ? 'bg-primary-container text-on-primary-container font-semibold shadow-[0_0_10px_rgba(45,212,191,0.35)]'
                      : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                  }`}
                >
                  <div className="flex items-center gap-space-sm min-w-0">
                    <span className="material-symbols-outlined text-[18px] shrink-0">{screen.icon}</span>
                    <span className="font-body-sm text-body-sm truncate">{screen.name}</span>
                  </div>
                  <span
                    className={`font-label-badge text-label-badge px-1 py-0.5 rounded text-[11px] shrink-0 ${
                      isActive ? 'bg-on-primary-container/20 text-on-primary-container font-bold' : `bg-surface-container-high ${screen.markColor}`
                    }`}
                  >
                    {screen.mark}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Execution State Footer */}
        <div className="p-space-md bg-surface-container-low/70 space-y-space-xs border-t border-surface-container/30">
          <div className="flex items-center justify-between font-code-sm text-code-sm text-on-surface-variant">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              Step-by-Step
            </span>
            <span className="font-label-badge text-label-badge text-primary uppercase text-[10px]">EXEC MODE</span>
          </div>
          <div className="p-space-xs rounded bg-surface-container-lowest text-[11px] font-code-sm text-on-surface-variant flex flex-col gap-0.5 border border-surface-container/40">
            <div className="flex justify-between items-center">
              <span>Path Comp:</span>
              <span className="text-primary font-bold">ACTIVE</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Union by Rank:</span>
              <span className="text-primary font-bold">ACTIVE</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
