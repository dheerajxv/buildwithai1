import React, { useRef, useState } from 'react';
import { Upload, Camera, Sparkles, RefreshCw, Layers, CloudSun, CheckCircle2 } from 'lucide-react';
import { DEMO_PRESETS } from '../data/demoExamples';
import { DemoPreset } from '../types/agronomy';
import { CropIllustration } from './CropIllustration';

interface ImageUploadZoneProps {
  onAnalyze: (payload: {
    imageBase64: string;
    mimeType: string;
    cropType: string;
    climate: string;
  }) => void;
  onSelectPreset: (preset: DemoPreset) => void;
  isLoading: boolean;
  activePresetId?: string;
  previewUrl?: string;
  cropHint: string;
  setCropHint: (val: string) => void;
  climateCondition: string;
  setClimateCondition: (val: string) => void;
  onClearImage: () => void;
}

export const ImageUploadZone: React.FC<ImageUploadZoneProps> = ({
  onAnalyze,
  onSelectPreset,
  isLoading,
  activePresetId,
  previewUrl,
  cropHint,
  setCropHint,
  climateCondition,
  setClimateCondition,
  onClearImage,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [currentBase64, setCurrentBase64] = useState<string | null>(null);
  const [currentMimeType, setCurrentMimeType] = useState<string>('image/jpeg');

  const handleFileProcess = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (JPEG, PNG, or WebP).');
      return;
    }

    setCurrentMimeType(file.type);
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setCurrentBase64(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleStartAnalysis = () => {
    if (!currentBase64 && !activePresetId) {
      // Default to first preset if nothing is uploaded
      onSelectPreset(DEMO_PRESETS[0]);
      return;
    }

    if (currentBase64) {
      onAnalyze({
        imageBase64: currentBase64,
        mimeType: currentMimeType,
        cropType: cropHint,
        climate: climateCondition,
      });
    } else if (activePresetId) {
      const preset = DEMO_PRESETS.find((p) => p.id === activePresetId);
      if (preset) onSelectPreset(preset);
    }
  };

  const activePreset = DEMO_PRESETS.find((p) => p.id === activePresetId);

  return (
    <div id="diagnosis-bench" className="space-y-6">
      {/* Upload & Inspection Stage */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-slate-900">01. Field Specimen Input</span>
            <span className="text-xs text-slate-500">· Leaf or Fruit Close-up</span>
          </div>
          {(currentBase64 || activePresetId) && (
            <button
              onClick={() => {
                setCurrentBase64(null);
                onClearImage();
              }}
              className="text-xs font-medium text-slate-500 hover:text-rose-600 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Media Preview or Dropzone */}
        {currentBase64 ? (
          <div className="relative rounded-lg overflow-hidden border border-slate-200 bg-slate-950 flex items-center justify-center max-h-64">
            <img
              src={currentBase64}
              alt="Uploaded field sample"
              className="w-full h-64 object-contain"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-2 right-2 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-mono px-2 py-1 rounded">
              Ready for Gemini diagnosis
            </div>
          </div>
        ) : activePreset ? (
          <div className="space-y-2">
            <CropIllustration type={activePreset.cropType} showAnnotations={true} />
            <div className="flex items-center justify-between text-xs text-slate-500 px-1">
              <span>Preset: {activePreset.title}</span>
              <span className="font-mono text-violet-700">{activePreset.badgeLabel}</span>
            </div>
          </div>
        ) : (
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${
              isDragging
                ? 'border-violet-500 bg-violet-50/50'
                : 'border-slate-300 hover:border-violet-400 bg-slate-50/50'
            }`}
          >
            <div className="mx-auto w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center text-violet-700 mb-3">
              <Upload className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-semibold text-slate-900">
              Drag & drop field leaf photo here
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
              Supports JPEG, PNG, and WebP up to 20MB. Clear close-up of lesions or discoloration gives best results.
            </p>

            <div className="mt-4 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3.5 py-1.5 text-xs font-semibold text-slate-800 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
              >
                Browse Files
              </button>
              <button
                type="button"
                onClick={() => cameraInputRef.current?.click()}
                className="px-3.5 py-1.5 text-xs font-semibold text-violet-700 bg-violet-50 border border-violet-200 hover:bg-violet-100 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Snap Camera</span>
              </button>
            </div>
          </div>
        )}

        {/* Hidden Inputs */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleFileProcess(e.target.files[0]);
            }
          }}
        />
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleFileProcess(e.target.files[0]);
            }
          }}
        />

        {/* Agronomy Context Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-100">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-slate-400" />
              <span>Crop Category Hint</span>
            </label>
            <select
              value={cropHint}
              onChange={(e) => setCropHint(e.target.value)}
              className="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-600"
            >
              <option value="auto-detect">Auto-detect from image</option>
              <option value="Tomato">Tomato (Solanaceae)</option>
              <option value="Corn / Maize">Corn / Maize (Zea mays)</option>
              <option value="Paddy Rice">Paddy Rice (Oryza sativa)</option>
              <option value="Wheat">Wheat (Triticum aestivum)</option>
              <option value="Potato">Potato (Solanum tuberosum)</option>
              <option value="Soybean">Soybean (Glycine max)</option>
              <option value="Citrus / Orange">Citrus / Orange</option>
              <option value="Apple / Orchard">Apple / Orchard</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
              <CloudSun className="w-3.5 h-3.5 text-slate-400" />
              <span>Climate / Field Condition</span>
            </label>
            <select
              value={climateCondition}
              onChange={(e) => setClimateCondition(e.target.value)}
              className="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-600"
            >
              <option value="Temperate Moderate">Temperate Moderate (18 - 25°C)</option>
              <option value="Humid / High Rainfall">Humid / High Rainfall (&gt;80% RH)</option>
              <option value="Tropical Monsoon">Tropical Monsoon / Paddy</option>
              <option value="Arid / Drought Stress">Arid / Drought Stress</option>
              <option value="Greenhouse / Controlled">Greenhouse / Protected polyhouse</option>
            </select>
          </div>
        </div>

        {/* Primary Action Button */}
        <div className="mt-5">
          <button
            type="button"
            disabled={isLoading}
            onClick={handleStartAnalysis}
            className="w-full py-2.5 px-4 rounded-lg bg-violet-600 hover:bg-violet-700 active:scale-[0.99] text-white text-xs font-bold transition-all shadow-sm shadow-violet-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
                <span>Running Gemini Multimodal Pathology...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-violet-200" />
                <span>Analyze Specimen with Gemini</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 4 Demo Example Quick-Picks for Hackathon Judges */}
      <div id="demo-scenarios" className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
          <div>
            <span className="text-sm font-bold text-slate-900">02. Instant Judge Examples</span>
            <span className="text-xs text-slate-500 ml-2">· 1-Click Verification</span>
          </div>
          <span className="text-[11px] font-mono text-violet-700 font-medium">4 Scenarios</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {DEMO_PRESETS.map((preset) => {
            const isSelected = activePresetId === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => {
                  setCurrentBase64(null);
                  onSelectPreset(preset);
                }}
                className={`text-left p-3 rounded-lg border transition-all cursor-pointer relative ${
                  isSelected
                    ? 'border-violet-600 bg-violet-50/70 ring-1 ring-violet-600 shadow-xs'
                    : 'border-slate-200 hover:border-violet-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 truncate">
                    {preset.title}
                  </span>
                  {isSelected && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-violet-700 shrink-0" />
                  )}
                </div>
                <div className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                  {preset.description}
                </div>
                <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-2">
                  <span className="font-semibold text-slate-700">{preset.cropType}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono text-violet-800">{preset.badgeLabel}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
