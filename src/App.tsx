import React, { useState, useEffect } from 'react';
import { TopBar } from './components/TopBar';
import { LandingHero } from './components/LandingHero';
import { ImageUploadZone } from './components/ImageUploadZone';
import { DiagnosticConsole } from './components/DiagnosticConsole';
import { LoadingScanner } from './components/LoadingScanner';
import { EmptyState } from './components/EmptyState';
import { HistoryModal } from './components/HistoryModal';
import { DEMO_PRESETS } from './data/demoExamples';
import { CropAnalysisResult, DemoPreset } from './types/agronomy';
import { AlertCircle, Sprout, Check } from 'lucide-react';

const STORAGE_KEY = 'agrismart_inspection_history';

export default function App() {
  const [currentResult, setCurrentResult] = useState<CropAnalysisResult | null>(DEMO_PRESETS[0].result);
  const [activePresetId, setActivePresetId] = useState<string | undefined>(DEMO_PRESETS[0].id);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [history, setHistory] = useState<CropAnalysisResult[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const [cropHint, setCropHint] = useState('auto-detect');
  const [climateCondition, setClimateCondition] = useState('Humid / High Rainfall');
  const [notificationToast, setNotificationToast] = useState<string | null>(null);

  // Load history from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setHistory(parsed);
        }
      } else {
        // Pre-populate with initial demo preset in history so it's ready for review
        setHistory([DEMO_PRESETS[0].result]);
      }
    } catch (e) {
      console.warn('Could not read inspection history from localStorage', e);
    }
  }, []);

  const saveRecordToHistory = (record: CropAnalysisResult) => {
    setHistory((prev) => {
      const filtered = prev.filter((item) => item.id !== record.id);
      const updated = [record, ...filtered].slice(0, 20); // Keep last 20
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (err) {
        console.warn('Could not persist history to localStorage', err);
      }
      return updated;
    });
  };

  const handleClearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.warn('Could not clear history', err);
    }
    setNotificationToast('Inspection history cleared.');
    setTimeout(() => setNotificationToast(null), 2500);
  };

  const handleSelectPreset = (preset: DemoPreset) => {
    setActivePresetId(preset.id);
    setCropHint(preset.cropType);
    setClimateCondition(preset.climate);
    setCurrentResult(preset.result);
    setErrorMessage(null);
    saveRecordToHistory(preset.result);
    setNotificationToast(`Loaded demo: ${preset.title}`);
    setTimeout(() => setNotificationToast(null), 2200);
  };

  const handleRunInstantDemo = () => {
    // Cycles to next preset or loads first
    const currentIndex = DEMO_PRESETS.findIndex((p) => p.id === activePresetId);
    const nextPreset = DEMO_PRESETS[(currentIndex + 1) % DEMO_PRESETS.length];
    handleSelectPreset(nextPreset);
  };

  const handleAnalyze = async (payload: {
    imageBase64: string;
    mimeType: string;
    cropType: string;
    climate: string;
  }) => {
    setIsLoading(true);
    setErrorMessage(null);
    setActivePresetId(undefined);

    try {
      const response = await fetch('/api/analyze-crop', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server responded with status ${response.status}`);
      }

      const data: CropAnalysisResult = await response.json();
      const enrichedResult: CropAnalysisResult = {
        ...data,
        id: `insp-${Date.now()}`,
        timestamp: new Date().toISOString(),
        sampleImageUrl: payload.imageBase64,
      };

      setCurrentResult(enrichedResult);
      saveRecordToHistory(enrichedResult);
      setNotificationToast(`Diagnosis completed for ${data.cropName}!`);
      setTimeout(() => setNotificationToast(null), 2500);
    } catch (error: any) {
      console.error('Diagnosis failed:', error);
      setErrorMessage(
        error.message || 'Failed to complete diagnosis. Check internet connection and image file.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearImage = () => {
    setActivePresetId(undefined);
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 selection:bg-violet-200 selection:text-violet-900">
      {/* TopBar navigation */}
      <TopBar
        onRunInstantDemo={handleRunInstantDemo}
        onOpenHistory={() => setIsHistoryOpen(true)}
        historyCount={history.length}
      />

      {/* Toast Notification */}
      {notificationToast && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in border border-slate-800">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{notificationToast}</span>
        </div>
      )}

      {/* Minimal Hero Kicker */}
      <LandingHero onQuickStart={handleRunInstantDemo} />

      {/* Main Diagnostic Workbench */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {errorMessage && (
          <div className="mb-6 p-4 rounded-xl border border-rose-200 bg-rose-50 text-rose-800 text-xs sm:text-sm flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">Diagnostic Processing Error</span>
              <span>{errorMessage}</span>
            </div>
          </div>
        )}

        {/* 2-Column Responsive Asymmetric Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Console: Image Input & Context (5 Columns) */}
          <div className="lg:col-span-5">
            <ImageUploadZone
              onAnalyze={handleAnalyze}
              onSelectPreset={handleSelectPreset}
              isLoading={isLoading}
              activePresetId={activePresetId}
              cropHint={cropHint}
              setCropHint={setCropHint}
              climateCondition={climateCondition}
              setClimateCondition={setClimateCondition}
              onClearImage={handleClearImage}
            />
          </div>

          {/* Right Console: Diagnostic Output & Clinical Cards (7 Columns) */}
          <div className="lg:col-span-7">
            {isLoading ? (
              <LoadingScanner />
            ) : currentResult ? (
              <DiagnosticConsole
                result={currentResult}
                onSaveToHistory={saveRecordToHistory}
                isSaved={history.some((h) => h.id === currentResult.id)}
              />
            ) : (
              <EmptyState onSelectExample={() => handleSelectPreset(DEMO_PRESETS[0])} />
            )}
          </div>
        </div>
      </main>

      {/* History Modal Drawer */}
      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onSelectRecord={(rec) => {
          setCurrentResult(rec);
          setActivePresetId(undefined);
          setNotificationToast(`Loaded record: ${rec.cropName}`);
          setTimeout(() => setNotificationToast(null), 2000);
        }}
        onClearHistory={handleClearHistory}
      />

      {/* Anti-Slop Quiet Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Sprout className="w-4 h-4 text-violet-600" />
            <span className="font-semibold text-slate-800">AgriSmart</span>
            <span aria-hidden="true">·</span>
            <span>Multimodal Field Agronomy & Yield Protection</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsHistoryOpen(true)}
              className="hover:text-slate-800 transition-colors cursor-pointer"
            >
              Inspection History ({history.length})
            </button>
            <span aria-hidden="true">·</span>
            <span>Powered by Gemini 3.8 Flash</span>
            <span aria-hidden="true">·</span>
            <span>Build with AI Hackathon 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
