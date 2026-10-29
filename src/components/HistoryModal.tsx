import React from 'react';
import { X, History, Trash2, ExternalLink, Calendar, AlertCircle } from 'lucide-react';
import { CropAnalysisResult } from '../types/agronomy';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  history: CropAnalysisResult[];
  onSelectRecord: (record: CropAnalysisResult) => void;
  onClearHistory: () => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  history,
  onSelectRecord,
  onClearHistory,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white rounded-xl border border-slate-200 shadow-xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center text-violet-700">
              <History className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Local Inspection History
              </h3>
              <p className="text-xs text-slate-500">
                {history.length} field diagnostic records saved in browser storage
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-3 flex-1">
          {history.length === 0 ? (
            <div className="py-12 text-center text-slate-500">
              <AlertCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-medium text-slate-700">No inspections logged yet</p>
              <p className="text-xs text-slate-400 mt-1">
                Upload a field photo or select an instant demo case to generate your first diagnostic report.
              </p>
            </div>
          ) : (
            history.map((record) => (
              <div
                key={record.id}
                onClick={() => {
                  onSelectRecord(record);
                  onClose();
                }}
                className="p-3.5 rounded-lg border border-slate-200 hover:border-violet-400 hover:bg-slate-50 transition-all cursor-pointer flex items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">
                      {record.cropName}
                    </span>
                    <span aria-hidden="true" className="text-slate-300">·</span>
                    <span className="text-[11px] font-mono text-violet-700">
                      {record.confidencePercentage}% Conf.
                    </span>
                  </div>
                  <div className="text-xs font-medium text-slate-700">
                    {record.primaryDiagnosis}
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-mono">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(record.timestamp).toLocaleDateString()}</span>
                    <span>{new Date(record.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded border ${
                      record.severityLevel === 'critical'
                        ? 'bg-rose-50 text-rose-700 border-rose-200'
                        : record.severityLevel === 'severe'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : record.severityLevel === 'moderate'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    }`}
                  >
                    {record.severityLevel}
                  </span>
                  <ExternalLink className="w-4 h-4 text-slate-400" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer actions */}
        {history.length > 0 && (
          <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
            <button
              onClick={onClearHistory}
              className="text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
            <button
              onClick={onClose}
              className="text-xs font-semibold text-slate-700 hover:bg-slate-200 px-4 py-1.5 rounded-md transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
