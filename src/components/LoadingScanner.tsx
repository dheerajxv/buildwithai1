import React, { useEffect, useState } from 'react';
import { RefreshCw, Scan, Layers, ShieldCheck, Microscope } from 'lucide-react';

export const LoadingScanner: React.FC = () => {
  const [stepIndex, setStepIndex] = useState(0);

  const steps = [
    { title: 'Specimen Ingestion', desc: 'Decoding image resolution and leaf geometry...', icon: Scan },
    { title: 'Multimodal Vision Probing', desc: 'Sending payload to Gemini 3.8 Flash for lesion mapping...', icon: Microscope },
    { title: 'Pathology Cross-Reference', desc: 'Evaluating fungal, bacterial, and nutrient deficiency markers...', icon: Layers },
    { title: 'Protocol Synthesis', desc: 'Formulating step-by-step organic and chemical recovery steps...', icon: ShieldCheck },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStepIndex((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 700);

    return () => clearInterval(timer);
  }, [steps.length]);

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-xs flex flex-col items-center justify-center text-center min-h-[380px]">
      <div className="relative w-20 h-20 mb-6 flex items-center justify-center">
        {/* Animated concentric rings */}
        <div className="absolute inset-0 rounded-full border-2 border-violet-200 animate-ping opacity-35" />
        <div className="absolute inset-1 rounded-full border border-violet-400 animate-spin opacity-50" />
        <div className="w-14 h-14 rounded-full bg-violet-600 flex items-center justify-center text-white shadow-md shadow-violet-300">
          <Microscope className="w-7 h-7" />
        </div>
      </div>

      <h3 className="text-base font-bold text-slate-900 tracking-tight">
        Diagnosing Specimen with Gemini
      </h3>
      <p className="text-xs text-slate-500 mt-1 max-w-sm">
        Analyzing chlorosis, necrotic margins, and sporulation markers against agricultural pathology standards.
      </p>

      {/* Progressive Step Checklist */}
      <div className="mt-6 w-full max-w-md space-y-2.5 text-left">
        {steps.map((step, idx) => {
          const isDone = idx < stepIndex;
          const isCurrent = idx === stepIndex;
          const StepIcon = step.icon;

          return (
            <div
              key={idx}
              className={`p-2.5 rounded-lg border transition-all flex items-center gap-3 ${
                isCurrent
                  ? 'border-violet-300 bg-violet-50/60'
                  : isDone
                  ? 'border-emerald-200 bg-emerald-50/30'
                  : 'border-slate-200/60 bg-slate-50/30 opacity-40'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 ${
                  isCurrent
                    ? 'bg-violet-600 text-white'
                    : isDone
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-200 text-slate-500'
                }`}
              >
                {isCurrent ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <StepIcon className="w-3.5 h-3.5" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-slate-900 truncate">
                  {step.title}
                </div>
                <div className="text-[11px] text-slate-500 truncate">{step.desc}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
