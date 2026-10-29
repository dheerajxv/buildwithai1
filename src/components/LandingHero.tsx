import React from 'react';
import { ShieldCheck, Zap, Activity, Clock } from 'lucide-react';

interface LandingHeroProps {
  onQuickStart: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ onQuickStart }) => {
  return (
    <div className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-violet-700 uppercase tracking-wider mb-2">
              <span>Build with AI Hackathon</span>
              <span aria-hidden="true">·</span>
              <span>Agronomy Vision Engine</span>
              <span aria-hidden="true">·</span>
              <span>Gemini 3.8 Flash</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-snug">
              Instant multimodal crop disease diagnosis and actionable yield protection for field farmers.
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
              Upload leaf or fruit field photos to identify pathogens, assess infection severity, and generate dual-track organic and chemical recovery protocols in seconds.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 shrink-0">
            <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
              <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                <Zap className="w-3.5 h-3.5 text-violet-600" />
                <span>Diagnostic Latency</span>
              </div>
              <div className="mt-1 text-xl font-bold font-mono tabular-nums text-slate-900">
                &lt; 2.4s
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">Multimodal analysis</div>
            </div>

            <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
              <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                <Clock className="w-3.5 h-3.5 text-violet-600" />
                <span>Action Protocol</span>
              </div>
              <div className="mt-1 text-xl font-bold font-mono tabular-nums text-slate-900">
                0 - 48h
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">Immediate containment</div>
            </div>

            <div className="col-span-2 sm:col-span-1 p-3 rounded-lg border border-slate-200 bg-slate-50">
              <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Treatment Plans</span>
              </div>
              <div className="mt-1 text-xl font-bold font-mono tabular-nums text-slate-900">
                Dual-Track
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">Organic & Chemical</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
