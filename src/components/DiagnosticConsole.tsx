import React, { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle,
  FileText,
  Copy,
  Download,
  Share2,
  Calendar,
  Layers,
  Leaf,
  FlaskConical,
  ShieldAlert,
  TrendingDown,
  Clock,
  Check,
} from 'lucide-react';
import { CropAnalysisResult } from '../types/agronomy';

interface DiagnosticConsoleProps {
  result: CropAnalysisResult;
  onSaveToHistory?: (result: CropAnalysisResult) => void;
  isSaved?: boolean;
}

export const DiagnosticConsole: React.FC<DiagnosticConsoleProps> = ({
  result,
  onSaveToHistory,
  isSaved = false,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'protocol' | 'treatments' | 'yield'>('overview');
  const [copied, setCopied] = useState(false);

  const getSeverityStyle = (level: string) => {
    switch (level) {
      case 'critical':
        return {
          label: 'Critical Infection',
          textClass: 'text-rose-700',
          bgClass: 'bg-rose-50 border-rose-200',
          icon: AlertTriangle,
        };
      case 'severe':
        return {
          label: 'Severe Infection',
          textClass: 'text-amber-700',
          bgClass: 'bg-amber-50 border-amber-200',
          icon: AlertTriangle,
        };
      case 'moderate':
        return {
          label: 'Moderate Severity',
          textClass: 'text-amber-700',
          bgClass: 'bg-amber-50 border-amber-200',
          icon: AlertTriangle,
        };
      case 'low':
      default:
        return {
          label: 'Nominal / Low Stress',
          textClass: 'text-emerald-700',
          bgClass: 'bg-emerald-50 border-emerald-200',
          icon: CheckCircle,
        };
    }
  };

  const severityInfo = getSeverityStyle(result.severityLevel);
  const SeverityIcon = severityInfo.icon;

  const handleCopyReport = () => {
    const reportText = `# AgriSmart Clinical Crop Pathology Report
**Date:** ${new Date(result.timestamp).toLocaleString()}
**Crop Identified:** ${result.cropName} (${result.varietyOrFamily || 'N/A'})
**Primary Diagnosis:** ${result.primaryDiagnosis}
**Scientific Pathogen:** ${result.scientificPathogenName || 'None'}
**Severity Level:** ${result.severityLevel.toUpperCase()}
**Confidence:** ${result.confidencePercentage}%

## Executive Summary
${result.summaryText}

## Visual Symptoms Identified
${result.symptoms.map((s) => `- ${s}`).join('\n')}

## Chronological Action Protocol
${result.actionProtocol
  .map(
    (stage) => `### ${stage.stage} (${stage.timeframe})\n${stage.instructions.map((i) => `1. ${i}`).join('\n')}`
  )
  .join('\n\n')}

## Recommended Interventions
### Organic Options
${result.treatments.organic.map((t) => `- ${t}`).join('\n')}

### Chemical Options
${result.treatments.chemical.map((t) => `- ${t}`).join('\n')}

### Safety & PPE Precautions
${result.treatments.safetyPrecautions.map((s) => `- ${s}`).join('\n')}

## Yield Advisory
- **Risk Assessment:** ${result.yieldAdvisory.riskAssessment}
- **Projected Loss (Untreated):** ${result.yieldAdvisory.projectedLossUntreated}
- **Recovery Timeline:** ${result.yieldAdvisory.recoveryTimeline}
- **Future Prevention:**
${result.yieldAdvisory.futurePreventionTips.map((p) => `  - ${p}`).join('\n')}
`;

    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleDownloadReport = () => {
    const reportText = `AGRISMART CLINICAL CROP PATHOLOGY BULLETIN
--------------------------------------------------------
Date: ${new Date(result.timestamp).toLocaleString()}
Crop: ${result.cropName}
Classification: ${result.varietyOrFamily || 'Agronomic Specimen'}
Diagnosis: ${result.primaryDiagnosis}
Scientific Agent: ${result.scientificPathogenName || 'None'}
Severity: ${result.severityLevel.toUpperCase()}
Confidence Index: ${result.confidencePercentage}%

SUMMARY:
${result.summaryText}

VISUAL OBSERVATIONS:
${result.symptoms.map((s, idx) => `[${idx + 1}] ${s}`).join('\n')}

ACTION PROTOCOL:
${result.actionProtocol
  .map(
    (stage) =>
      `\nSTAGE: ${stage.stage} [${stage.timeframe}]\n` +
      stage.instructions.map((i, idx) => `  (${idx + 1}) ${i}`).join('\n')
  )
  .join('\n')}

ORGANIC MANAGEMENT:
${result.treatments.organic.map((o) => `* ${o}`).join('\n')}

CHEMICAL MANAGEMENT:
${result.treatments.chemical.map((c) => `* ${c}`).join('\n')}

SAFETY & PRECAUTIONS:
${result.treatments.safetyPrecautions.map((p) => `! ${p}`).join('\n')}

YIELD ADVISORY & RECOVERY:
- Risk: ${result.yieldAdvisory.riskAssessment}
- Projected Loss Untreated: ${result.yieldAdvisory.projectedLossUntreated}
- Recovery Timeline: ${result.yieldAdvisory.recoveryTimeline}
- Preventative Guidelines:
${result.yieldAdvisory.futurePreventionTips.map((tip) => `  > ${tip}`).join('\n')}
`;

    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `AgriSmart_Diagnosis_${result.cropName.replace(/[^a-zA-Z0-9]/g, '_')}_${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div id="action-protocols" className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
      {/* Primary Clinical Header */}
      <div className="p-6 border-b border-slate-200 bg-slate-50/60">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-900">{result.cropName}</span>
            <span aria-hidden="true">·</span>
            <span>{result.varietyOrFamily || 'Agronomic Specimen'}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-slate-400">
              {new Date(result.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold border ${severityInfo.bgClass} ${severityInfo.textClass}`}>
              <SeverityIcon className="w-3.5 h-3.5" />
              <span>{severityInfo.label}</span>
            </span>

            <span className="text-xs font-semibold text-violet-800 bg-violet-50 border border-violet-200 px-2.5 py-1 rounded-md font-mono tabular-nums">
              {result.confidencePercentage}% Confidence
            </span>
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          {result.primaryDiagnosis}
        </h2>
        
        {result.scientificPathogenName && result.scientificPathogenName !== 'None / Physiological' && (
          <div className="mt-1 text-xs font-medium text-slate-600 italic">
            Pathogen: {result.scientificPathogenName}
          </div>
        )}

        {result.note && (
          <div className="mt-2 text-xs text-violet-700 bg-violet-50/60 border border-violet-100 rounded-md p-2">
            {result.note}
          </div>
        )}

        <p className="mt-3 text-sm text-slate-700 leading-relaxed">
          {result.summaryText}
        </p>

        {/* Action Controls Bar */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200/80">
          {/* Segmented Tab Controls */}
          <div className="inline-flex items-center p-1 bg-slate-200/70 rounded-lg text-xs font-semibold text-slate-700">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeTab === 'overview'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Symptoms & Markers
            </button>
            <button
              onClick={() => setActiveTab('protocol')}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeTab === 'protocol'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Action Protocol
            </button>
            <button
              onClick={() => setActiveTab('treatments')}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeTab === 'treatments'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Treatments & PPE
            </button>
            <button
              onClick={() => setActiveTab('yield')}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeTab === 'yield'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Yield & Risk
            </button>
          </div>

          {/* Export & Copy Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyReport}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg transition-colors cursor-pointer"
              title="Copy clinical report to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>Copy Report</span>
                </>
              )}
            </button>
            <button
              onClick={handleDownloadReport}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg transition-colors cursor-pointer"
              title="Download text report bulletin"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Download</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tab Panels */}
      <div className="p-6">
        {/* TAB 1: Symptoms & Observations */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Leaf className="w-4 h-4 text-violet-600" />
                <span>Observed Pathological Markers & Symptoms</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {result.symptoms.map((symptom, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 flex items-start gap-3"
                  >
                    <div className="w-5 h-5 rounded-full bg-violet-100 text-violet-700 font-mono text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <p className="text-xs text-slate-800 leading-relaxed">{symptom}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-lg border border-slate-200 bg-slate-50">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Field Severity Index</span>
                <span className="font-mono">{severityInfo.label}</span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden mt-2">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    result.severityLevel === 'critical'
                      ? 'w-full bg-rose-600'
                      : result.severityLevel === 'severe'
                      ? 'w-3/4 bg-amber-500'
                      : result.severityLevel === 'moderate'
                      ? 'w-1/2 bg-amber-400'
                      : 'w-1/4 bg-emerald-500'
                  }`}
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1.5">
                <span>Low Stress</span>
                <span>Moderate</span>
                <span>Severe</span>
                <span>Critical</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Step-by-Step Action Protocol */}
        {activeTab === 'protocol' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-violet-600" />
                <span>Chronological Intervention Protocol</span>
              </h3>
              <span className="text-xs text-slate-500">
                {result.actionProtocol.length} Phased Steps
              </span>
            </div>

            <div className="space-y-3">
              {result.actionProtocol.map((stage, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-slate-200 p-4 bg-slate-50/40 space-y-2.5"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900 font-mono">
                        Step 0{idx + 1}.
                      </span>
                      <span className="text-xs font-bold text-slate-800">{stage.stage}</span>
                    </div>
                    <span className="text-[11px] font-mono font-medium text-violet-700 bg-violet-50 px-2 py-0.5 rounded border border-violet-200">
                      {stage.timeframe}
                    </span>
                  </div>

                  <ul className="space-y-2">
                    {stage.instructions.map((inst, iIdx) => (
                      <li key={iIdx} className="text-xs text-slate-700 flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{inst}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Treatments & PPE */}
        {activeTab === 'treatments' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Organic Options */}
              <div className="p-4 rounded-lg border border-emerald-200 bg-emerald-50/30 space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-emerald-200">
                  <Leaf className="w-4 h-4 text-emerald-600" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                    Track A · Organic & Biological Controls
                  </h4>
                </div>
                <ul className="space-y-2">
                  {result.treatments.organic.map((item, idx) => (
                    <li key={idx} className="text-xs text-emerald-950 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-1.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Chemical Options */}
              <div className="p-4 rounded-lg border border-violet-200 bg-violet-50/30 space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-violet-200">
                  <FlaskConical className="w-4 h-4 text-violet-600" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-violet-900">
                    Track B · Targeted Chemical Interventions
                  </h4>
                </div>
                <ul className="space-y-2">
                  {result.treatments.chemical.map((item, idx) => (
                    <li key={idx} className="text-xs text-violet-950 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-600 shrink-0 mt-1.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Safety & PPE Precautions */}
            <div className="p-4 rounded-lg border border-amber-200 bg-amber-50/40">
              <div className="flex items-center gap-2 mb-2">
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900">
                  Mandatory PPE & Safety Guidelines
                </h4>
              </div>
              <ul className="space-y-1.5">
                {result.treatments.safetyPrecautions.map((safe, idx) => (
                  <li key={idx} className="text-xs text-amber-950 flex items-start gap-2">
                    <span className="text-amber-600 font-bold">!</span>
                    <span>{safe}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* TAB 4: Yield Advisory */}
        {activeTab === 'yield' && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border border-slate-200 bg-slate-50">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
                  <TrendingDown className="w-3.5 h-3.5 text-rose-600" />
                  <span>Projected Yield Loss (Untreated)</span>
                </div>
                <div className="text-2xl font-bold font-mono tabular-nums text-slate-900">
                  {result.yieldAdvisory.projectedLossUntreated}
                </div>
                <p className="text-xs text-slate-600 mt-2">
                  {result.yieldAdvisory.riskAssessment}
                </p>
              </div>

              <div className="p-4 rounded-lg border border-slate-200 bg-slate-50">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
                  <Calendar className="w-3.5 h-3.5 text-violet-600" />
                  <span>Expected Recovery Timeline</span>
                </div>
                <div className="text-2xl font-bold font-mono tabular-nums text-slate-900">
                  {result.yieldAdvisory.recoveryTimeline}
                </div>
                <p className="text-xs text-slate-600 mt-2">
                  Assuming immediate adherence to Phase 1 sanitization and foliar treatment schedules.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-lg border border-slate-200 bg-white">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Long-Term Preventative Agronomy Practices</span>
              </h4>
              <ul className="space-y-2">
                {result.yieldAdvisory.futurePreventionTips.map((tip, idx) => (
                  <li key={idx} className="text-xs text-slate-700 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-600 shrink-0 mt-1.5" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
