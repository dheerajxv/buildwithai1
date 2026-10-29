import React from 'react';

interface CropIllustrationProps {
  type: string;
  className?: string;
  showAnnotations?: boolean;
}

export const CropIllustration: React.FC<CropIllustrationProps> = ({
  type,
  className = 'w-full h-48',
  showAnnotations = false,
}) => {
  const norm = type.toLowerCase();

  if (norm.includes('tomato')) {
    return (
      <div className={`relative overflow-hidden rounded-xl bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900 flex items-center justify-center p-4 ${className}`}>
        <svg viewBox="0 0 400 300" className="w-full h-full max-h-56 filter drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Main Leaf Body */}
          <path d="M200 40 C280 80 320 180 250 250 C180 300 130 260 90 200 C50 140 120 50 200 40 Z" fill="#2E7D32" stroke="#1B5E20" strokeWidth="3" />
          
          {/* Leaf Venation */}
          <path d="M190 250 Q180 160 200 50" stroke="#81C784" strokeWidth="3" strokeLinecap="round" />
          <path d="M185 200 Q230 180 260 190" stroke="#81C784" strokeWidth="2" strokeLinecap="round" />
          <path d="M180 160 Q130 150 100 165" stroke="#81C784" strokeWidth="2" strokeLinecap="round" />
          <path d="M188 130 Q240 110 270 125" stroke="#81C784" strokeWidth="2" strokeLinecap="round" />
          <path d="M192 100 Q145 90 120 100" stroke="#81C784" strokeWidth="2" strokeLinecap="round" />

          {/* Early Blight Concentric Ring Lesion 1 (Lower Left) */}
          <circle cx="140" cy="170" r="28" fill="#FACC15" fillOpacity="0.4" />
          <circle cx="140" cy="170" r="22" fill="#78350F" />
          <circle cx="140" cy="170" r="16" stroke="#451A03" strokeWidth="2" fill="none" />
          <circle cx="140" cy="170" r="10" stroke="#451A03" strokeWidth="2" fill="none" />
          <circle cx="140" cy="170" r="4" fill="#1C1917" />

          {/* Early Blight Lesion 2 (Mid Right) */}
          <circle cx="235" cy="145" r="24" fill="#FACC15" fillOpacity="0.35" />
          <circle cx="235" cy="145" r="18" fill="#78350F" />
          <circle cx="235" cy="145" r="12" stroke="#451A03" strokeWidth="1.5" fill="none" />
          <circle cx="235" cy="145" r="7" stroke="#451A03" strokeWidth="1.5" fill="none" />
          <circle cx="235" cy="145" r="3" fill="#1C1917" />

          {/* Incipient Lesion 3 */}
          <circle cx="180" cy="85" r="14" fill="#FACC15" fillOpacity="0.3" />
          <circle cx="180" cy="85" r="9" fill="#78350F" />

          {/* Stem attachment */}
          <path d="M190 250 Q195 285 205 300" stroke="#A16207" strokeWidth="5" strokeLinecap="round" />
        </svg>

        {showAnnotations && (
          <div className="absolute bottom-2 left-3 text-[11px] font-mono text-emerald-200/90 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
            Alternaria solani concentric rings detected
          </div>
        )}
      </div>
    );
  }

  if (norm.includes('corn') || norm.includes('maize')) {
    return (
      <div className={`relative overflow-hidden rounded-xl bg-gradient-to-br from-emerald-950 via-slate-900 to-amber-950 flex items-center justify-center p-4 ${className}`}>
        <svg viewBox="0 0 400 300" className="w-full h-full max-h-56 filter drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Maize Leaf Blade */}
          <path d="M50 240 Q160 140 370 70 Q300 130 180 230 Q120 260 50 240 Z" fill="#2E7D32" stroke="#1B5E20" strokeWidth="2.5" />
          
          {/* Parallel Venation */}
          <path d="M60 235 Q170 145 360 80" stroke="#81C784" strokeWidth="3" />
          <path d="M80 245 Q170 160 340 95" stroke="#66BB6A" strokeWidth="1.5" strokeDasharray="4 2" />
          <path d="M100 230 Q180 130 350 72" stroke="#66BB6A" strokeWidth="1.5" strokeDasharray="4 2" />

          {/* Cigar-shaped Northern Leaf Blight Lesion 1 */}
          <ellipse cx="230" cy="130" rx="48" ry="12" transform="rotate(-26 230 130)" fill="#78350F" stroke="#D97706" strokeWidth="2" />
          <ellipse cx="230" cy="130" rx="36" ry="7" transform="rotate(-26 230 130)" fill="#A16207" />
          <ellipse cx="230" cy="130" rx="18" ry="3" transform="rotate(-26 230 130)" fill="#451A03" />

          {/* Cigar Lesion 2 */}
          <ellipse cx="140" cy="195" rx="35" ry="9" transform="rotate(-24 140 195)" fill="#78350F" stroke="#D97706" strokeWidth="1.5" />
          <ellipse cx="140" cy="195" rx="22" ry="5" transform="rotate(-24 140 195)" fill="#A16207" />
        </svg>

        {showAnnotations && (
          <div className="absolute bottom-2 left-3 text-[11px] font-mono text-amber-200/90 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
            Exserohilum turcicum elliptical blighting
          </div>
        )}
      </div>
    );
  }

  if (norm.includes('rice')) {
    return (
      <div className={`relative overflow-hidden rounded-xl bg-gradient-to-br from-emerald-950 via-slate-900 to-amber-950 flex items-center justify-center p-4 ${className}`}>
        <svg viewBox="0 0 400 300" className="w-full h-full max-h-56 filter drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Narrow Rice Leaves */}
          <path d="M120 290 Q170 160 210 20 Q190 140 160 290 Z" fill="#2E7D32" stroke="#1B5E20" strokeWidth="2" />
          <path d="M220 290 Q240 140 270 40 Q250 160 240 290 Z" fill="#388E3C" stroke="#1B5E20" strokeWidth="2" />

          {/* Interveinal Bacterial Streaks */}
          <rect x="175" y="80" width="4" height="45" rx="2" fill="#CA8A04" />
          <rect x="183" y="110" width="3.5" height="38" rx="1.5" fill="#EAB308" />
          <rect x="170" y="140" width="4" height="50" rx="2" fill="#B45309" />
          
          <rect x="238" y="90" width="3.5" height="42" rx="1.5" fill="#EAB308" />
          <rect x="245" y="125" width="4" height="35" rx="2" fill="#CA8A04" />

          {/* Amber Exudate Droplets */}
          <circle cx="177" cy="95" r="2.5" fill="#FEF08A" stroke="#B45309" strokeWidth="0.8" />
          <circle cx="185" cy="120" r="2" fill="#FEF08A" stroke="#B45309" strokeWidth="0.8" />
          <circle cx="240" cy="110" r="2.5" fill="#FEF08A" stroke="#B45309" strokeWidth="0.8" />
        </svg>

        {showAnnotations && (
          <div className="absolute bottom-2 left-3 text-[11px] font-mono text-yellow-200/90 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
            Xanthomonas oryzae linear interveinal streaks
          </div>
        )}
      </div>
    );
  }

  // Healthy Wheat Field
  return (
    <div className={`relative overflow-hidden rounded-xl bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900 flex items-center justify-center p-4 ${className}`}>
      <svg viewBox="0 0 400 300" className="w-full h-full max-h-56 filter drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Wheat Stem */}
        <line x1="200" y1="280" x2="200" y2="70" stroke="#15803D" strokeWidth="4" strokeLinecap="round" />
        
        {/* Healthy Symmetrical Wheat Spikelets */}
        {[80, 105, 130, 155, 180].map((y, idx) => (
          <g key={idx}>
            {/* Left spikelet */}
            <path d={`M200 ${y} Q175 ${y - 15} 165 ${y - 30}`} stroke="#22C55E" strokeWidth="3" strokeLinecap="round" />
            <path d={`M198 ${y} C180 ${y - 10} 175 ${y - 25} 185 ${y - 28} C195 ${y - 20} 200 ${y - 8} 198 ${y}`} fill="#4ADE80" />
            {/* Right spikelet */}
            <path d={`M200 ${y + 12} Q225 ${y - 3} 235 ${y - 18}`} stroke="#22C55E" strokeWidth="3" strokeLinecap="round" />
            <path d={`M202 ${y + 12} C220 ${y + 2} 225 ${y - 13} 215 ${y - 16} C205 ${y - 8} 200 ${y + 4} 202 ${y + 12}`} fill="#4ADE80" />
          </g>
        ))}

        {/* Flag Leaf */}
        <path d="M198 190 Q270 170 340 220 Q260 195 200 196" fill="#15803D" stroke="#166534" strokeWidth="2" />
        <path d="M202 210 Q130 195 70 235 Q140 215 200 214" fill="#15803D" stroke="#166534" strokeWidth="2" />
      </svg>

      {showAnnotations && (
        <div className="absolute bottom-2 left-3 text-[11px] font-mono text-emerald-300 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
          Nominal chlorophyll density · Feekes 10.1
        </div>
      )}
    </div>
  );
};
