import React from 'react';
import { Sprout, Play, History, FileText } from 'lucide-react';

interface TopBarProps {
  onRunInstantDemo: () => void;
  onOpenHistory: () => void;
  historyCount: number;
}

export const TopBar: React.FC<TopBarProps> = ({
  onRunInstantDemo,
  onOpenHistory,
  historyCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-2.5 whitespace-nowrap shrink-0">
          <div className="w-9 h-9 rounded-lg bg-violet-600 flex items-center justify-center text-white shadow-sm shadow-violet-200">
            <Sprout className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-slate-900 leading-none">
              AgriSmart
            </span>
            <span className="text-[11px] font-medium text-violet-700 tracking-wide mt-0.5">
              Crop Doctor & Yield Advisor
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <a
            href="#diagnosis-bench"
            className="hover:text-violet-700 transition-colors whitespace-nowrap shrink-0"
          >
            Field Diagnostic
          </a>
          <a
            href="#demo-scenarios"
            className="hover:text-violet-700 transition-colors whitespace-nowrap shrink-0"
          >
            Sample Cases
          </a>
          <a
            href="#action-protocols"
            className="hover:text-violet-700 transition-colors whitespace-nowrap shrink-0"
          >
            Clinical Protocols
          </a>
          <button
            onClick={onOpenHistory}
            className="hover:text-violet-700 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer text-slate-600"
          >
            <History className="w-4 h-4 text-slate-400" />
            <span>Inspection Log</span>
            {historyCount > 0 && (
              <span className="font-mono text-xs font-semibold text-violet-700 tabular-nums ml-0.5">
                ({historyCount})
              </span>
            )}
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onRunInstantDemo}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-700 active:scale-[0.98] rounded-lg transition-all shadow-sm shadow-violet-200 cursor-pointer whitespace-nowrap shrink-0"
            title="Load instant pre-calibrated sample for hackathon judges"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Run Judge Demo</span>
          </button>
        </div>
      </div>
    </header>
  );
};
