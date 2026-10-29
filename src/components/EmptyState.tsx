import React from 'react';
import { Microscope, Sparkles, ArrowLeft, ShieldCheck, HeartPulse } from 'lucide-react';

interface EmptyStateProps {
  onSelectExample: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onSelectExample }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-8 sm:p-12 text-center shadow-xs flex flex-col items-center justify-center min-h-[420px]">
      <div className="w-16 h-16 rounded-2xl bg-violet-100 border border-violet-200 flex items-center justify-center text-violet-700 mb-4 shadow-sm shadow-violet-100">
        <HeartPulse className="w-8 h-8" />
      </div>

      <div className="text-xs font-semibold uppercase tracking-wider text-violet-700 mb-1">
        Clinical Diagnostic Workbench
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight max-w-md">
        Select a field specimen or judge example to generate diagnosis
      </h3>
      <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-md leading-relaxed">
        AgriSmart’s vision pipeline evaluates leaf margins, necrotic spotting, and discoloration patterns, delivering structured recovery steps and yield protection insights.
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={onSelectExample}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 active:scale-[0.98] text-white text-xs font-semibold transition-all shadow-sm shadow-violet-200 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Load Judge Demo Preset</span>
        </button>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left max-w-lg w-full">
        <div className="text-xs text-slate-600">
          <span className="font-semibold text-slate-900 block mb-0.5">1. Multimodal Input</span>
          Accepts camera or uploaded field close-up leaves.
        </div>
        <div className="text-xs text-slate-600">
          <span className="font-semibold text-slate-900 block mb-0.5">2. JSON Pathology</span>
          Converts visual disease symptoms into verified steps.
        </div>
        <div className="text-xs text-slate-600">
          <span className="font-semibold text-slate-900 block mb-0.5">3. Field Action</span>
          Dual-track organic & chemical treatment protocols.
        </div>
      </div>
    </div>
  );
};
