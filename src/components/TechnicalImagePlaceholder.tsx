import React, { useState } from 'react';

interface TechnicalImagePlaceholderProps {
  src: string;
  alt: string;
  label?: string;
  category?: string;
  caption?: string;
  aspectRatio?: string; // e.g. 'aspect-[16/10]', 'aspect-video', 'aspect-square'
  className?: string;
  imgClassName?: string;
  priority?: boolean;
}

export const TechnicalImagePlaceholder: React.FC<TechnicalImagePlaceholderProps> = ({
  src,
  alt,
  label,
  category,
  caption,
  aspectRatio = 'aspect-[16/10]',
  className = '',
  imgClassName = '',
  priority = false,
}) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={`relative w-full overflow-hidden bg-[#0E1E2E] border border-[#1E3347]/60 group ${aspectRatio} ${className}`}
    >
      {/* Precision Blueprint Grid Watermark in Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.14] bg-[radial-gradient(#0057D9_1px,transparent_1px)] [background-size:16px_16px]"
        aria-hidden="true"
      />

      {!hasError ? (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] ${imgClassName}`}
        />
      ) : (
        /* Engineered Fallback Display (When image file is awaiting real photography) */
        <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-7 select-none bg-gradient-to-br from-[#0B1B2A] via-[#10283B] to-[#0A1622]">
          {/* Top Bar: Crosshairs & Badge */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 bg-[#0057D9]" />
              <span className="text-[10px] font-mono tracking-[0.14em] uppercase text-[#7A8793]">
                {category || 'CSF SPECIFICATION'}
              </span>
            </div>
            <span className="text-[9px] font-mono tracking-[0.18em] uppercase px-2 py-0.5 rounded-xs bg-[#0057D9]/15 text-[#1677FF] border border-[#0057D9]/30">
              [ IMAGE PLACEHOLDER ]
            </span>
          </div>

          {/* Center Graphic: Technical CAD Crosshair & Label */}
          <div className="my-auto py-4 flex flex-col items-center justify-center text-center relative">
            {/* Subtle Crosshair Reticle */}
            <svg
              className="w-16 h-16 text-[#0057D9]/25 mb-3"
              viewBox="0 0 64 64"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            >
              <circle cx="32" cy="32" r="24" strokeDasharray="3 3" />
              <line x1="32" y1="4" x2="32" y2="60" />
              <line x1="4" y1="32" x2="60" y2="32" />
              <rect x="22" y="22" width="20" height="20" strokeDasharray="2 2" />
            </svg>

            {label && (
              <span className="text-[11px] font-mono font-bold tracking-[0.2em] text-[#0057D9] uppercase mb-1">
                {label}
              </span>
            )}
            <h4 className="text-sm sm:text-base font-bold text-white tracking-tight uppercase max-w-xs">
              {alt}
            </h4>
          </div>

          {/* Bottom Bar: Path & Technical Caption */}
          <div className="flex items-end justify-between pt-3 border-t border-[#1E3347]/50 text-[10px] font-mono text-[#52606D]">
            <span className="truncate max-w-[200px] text-[#7A8793]">{src}</span>
            <span className="text-right text-[#0057D9]/90 font-medium">{caption || 'RAW COIL TO COMMISS.'}</span>
          </div>
        </div>
      )}

      {/* Subtle Engineering Corner Markers */}
      <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-white/20 pointer-events-none" />
      <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-white/20 pointer-events-none" />
      <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-white/20 pointer-events-none" />
      <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-white/20 pointer-events-none" />
    </div>
  );
};

export default TechnicalImagePlaceholder;
