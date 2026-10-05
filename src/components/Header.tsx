import React, { useState, useEffect } from 'react';
import { ScreenId } from '../types';

interface HeaderProps {
  onNavigate: (screen: ScreenId) => void;
  onOpenDemo: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, onOpenDemo }) => {
  const [timeStr, setTimeStr] = useState<string>('00:42:19 UTC');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getUTCHours()).padStart(2, '0');
      const mins = String(now.getUTCMinutes()).padStart(2, '0');
      const secs = String(now.getUTCSeconds()).padStart(2, '0');
      setTimeStr(`${hours}:${mins}:${secs} UTC`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed top-0 left-[260px] right-0 h-16 bg-surface/85 backdrop-blur-xl z-40 flex items-center justify-between px-space-lg shadow-[0_1px_8px_rgba(0,0,0,0.3)] border-b border-surface-container/30">
      {/* Left Title */}
      <div className="flex items-center gap-space-md">
        <div className="flex items-center gap-space-sm">
          <div className="flex flex-col">
            <div className="flex items-center gap-space-sm">
              <span className="font-headline-sm text-headline-sm text-on-surface font-bold tracking-tight">MST Studio</span>
              <span className="px-1.5 py-0.5 rounded text-[11px] font-code-sm bg-surface-container-high text-primary font-semibold">
                v2.4-opt
              </span>
            </div>
            <span className="text-[11px] font-code-sm text-on-surface-variant">Resilient Network Optimizer</span>
          </div>
        </div>
      </div>

      {/* Middle Status Indicators */}
      <div className="flex items-center gap-space-md">
        <div className="flex items-center gap-2 px-space-sm py-1 rounded bg-surface-container-low border border-surface-container/50">
          <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(87,241,219,0.8)] animate-ping"></span>
          <span className="font-code-sm text-[11px] text-primary font-semibold tracking-wider">SYSTEM READY</span>
        </div>
        <div className="hidden xl:flex items-center gap-2 px-space-sm py-1 rounded bg-surface-container-low text-[11px] font-code-sm border border-surface-container/50">
          <span className="flex items-center gap-1 text-primary">
            <span className="w-2 h-2 rounded-full bg-primary"></span> CURRENT
          </span>
          <span className="text-outline">/</span>
          <span className="flex items-center gap-1 text-secondary">
            <span className="w-2 h-2 rounded-full bg-secondary"></span> PROPOSED
          </span>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-space-md">
        <button
          onClick={onOpenDemo}
          className="flex items-center gap-space-xs px-space-md py-1.5 rounded bg-primary-container text-on-primary-container font-code-md text-code-md font-bold shadow-[0_0_14px_rgba(45,212,191,0.45)] hover:bg-primary hover:text-on-primary transition-all cursor-pointer"
          type="button"
        >
          <span className="material-symbols-outlined text-[16px]">fast_forward</span>
          <span>Guided Demo</span>
        </button>

        <button
          onClick={() => onNavigate('marks-dashboard')}
          className="flex items-center gap-1 px-space-sm py-1.5 rounded font-code-sm text-code-sm text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all cursor-pointer"
          title="Open Evaluation Rubric"
        >
          <span className="font-metric-val text-headline-sm text-primary-fixed">150</span>
          <span className="text-outline">/150 pts</span>
        </button>

        <div className="hidden sm:flex items-center gap-1 font-code-sm text-code-sm text-on-surface-variant bg-surface-container-low px-space-sm py-1 rounded border border-surface-container/40">
          <span className="material-symbols-outlined text-[16px] text-outline">schedule</span>
          <span>{timeStr}</span>
        </div>

        <div
          onClick={() => onNavigate('marks-dashboard')}
          className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-[0_0_10px_rgba(87,241,219,0.3)] cursor-pointer hover:scale-105 transition-transform"
          title="Student / Evaluation Profile"
        >
          <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
        </div>
      </div>
    </header>
  );
};
