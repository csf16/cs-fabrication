import React, { useState, useEffect } from 'react';
import { InteractiveStructure3D } from '../components/InteractiveStructure3D';
import { useSEO } from '../hooks/useSEO';
import { Phone, CheckCircle2, RotateCcw } from 'lucide-react';

interface ComingSoonPageProps {
  onEnquireClick?: (service?: string) => void;
}

export const ComingSoonPage: React.FC<ComingSoonPageProps> = () => {
  useSEO({
    title: 'Central Structure Fabrication | Solar Mounting Structures & C-Channels',
    description:
      'Central Structure Fabrication — Precision solar mounting structures, cold-formed C-channels, and 41×41 strut channels. Amroha, Uttar Pradesh. GSTIN: 09BDRPA4213J1ZJ.',
    keywords:
      'Central Structure Fabrication, solar mounting structures, C channel steel, strut channel, Amroha UP',
    canonical: 'https://www.csfabrication.in/',
  });

  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [progress, setProgress] = useState(1); // Default to fully assembled
  const [isPlaying, setIsPlaying] = useState(false);

  // Auto-assembly animation toggle
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 1) {
          setIsPlaying(false);
          return 1;
        }
        return Math.min(1, p + 0.02);
      });
    }, 30);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.trim()) {
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setProgress(0);
    setIsPlaying(true);
  };

  return (
    <div className="h-[100dvh] w-full bg-[#F7F6F1] text-[#141516] flex flex-col justify-between relative overflow-hidden font-sans select-none">
      
      {/* ── Top Header ─────────────────────────────────────────── */}
      <header className="w-full max-w-[1280px] mx-auto px-6 sm:px-10 pt-5 pb-2 flex items-center justify-between z-20 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 flex items-center justify-center">
            <svg viewBox="0 0 28 28" fill="none" className="w-full h-full">
              <rect x="4" y="4" width="10" height="20" rx="1" stroke="#141516" strokeWidth="1.5" fill="none" />
              <rect x="4" y="4" width="6" height="2" rx="0.5" fill="#141516" />
              <rect x="4" y="22" width="6" height="2" rx="0.5" fill="#141516" />
              <rect x="16" y="8" width="8" height="12" rx="1" stroke="#A88A58" strokeWidth="1.5" fill="none" />
            </svg>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-[11px] font-bold tracking-[0.2em] text-[#141516] uppercase">Central Structure</span>
            <span className="text-[9px] font-medium tracking-[0.16em] text-[#A88A58] uppercase">Fabrication</span>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-1 bg-[#141516]/5 border border-[#141516]/8 rounded-full text-[9px] font-mono text-[#141516] font-medium tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>LAUNCHING SOON</span>
        </div>
      </header>

      {/* ── Main Interactive Section ────────────────────────────── */}
      <main className="w-full max-w-[960px] mx-auto px-6 flex-1 flex flex-col items-center justify-center text-center py-2 z-10 min-h-0">
        
        {/* Single line text */}
        <div className="flex flex-col items-center gap-1 shrink-0 mb-1">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-[#141516] leading-tight">
            Solar Mounting Structures &amp; <span className="text-[#A88A58]">C-Channels</span>.
          </h1>
          <p className="text-[10px] sm:text-xs text-[#7A7D80] font-mono uppercase tracking-[0.2em]">
            Manufacturing &amp; Engineering // Amroha, Uttar Pradesh
          </p>
        </div>

        {/* ── 3D Interactive Canvas (Drag to rotate) ─────────────── */}
        <div className="w-full flex-1 max-h-[46vh] sm:max-h-[50vh] min-h-[220px] relative my-1 flex items-center justify-center">
          <InteractiveStructure3D progress={progress} onProgressChange={setProgress} />

          <div className="absolute top-2 right-2 text-[8px] font-mono text-[#7A7D80]/60 uppercase tracking-wider pointer-events-none">
            DRAG TO ROTATE 360°
          </div>
        </div>

        {/* ── Interactive Assembly Slider Controller ──────────────── */}
        <div className="w-full max-w-sm flex items-center gap-3 px-4 py-1.5 bg-white border border-[#141516]/10 rounded-full shadow-xs mb-3">
          <button
            onClick={handleReset}
            title="Replay Assembly Animation"
            className="p-1 text-[#A88A58] hover:text-[#141516] transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <span className="text-[9px] font-mono text-[#7A7D80] uppercase tracking-wider font-bold">
            ASSEMBLE
          </span>

          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={progress}
            onChange={(e) => {
              setIsPlaying(false);
              setProgress(parseFloat(e.target.value));
            }}
            className="flex-1 h-1 bg-[#141516]/10 rounded-lg appearance-none cursor-pointer accent-[#A88A58]"
          />

          <span className="text-[9px] font-mono text-[#141516] font-bold min-w-[32px] text-right">
            {Math.round(progress * 100)}%
          </span>
        </div>

        {/* ── Single Phone Input Form ─────────────────────────────── */}
        <div className="w-full max-w-md shrink-0">
          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className="flex items-center bg-white border border-[#141516]/15 focus-within:border-[#A88A58] rounded-[4px] p-1.5 transition-all shadow-sm"
            >
              <div className="flex items-center pl-3 pr-2 text-[#A88A58]">
                <Phone className="w-4 h-4" />
              </div>
              <input
                type="tel"
                required
                placeholder="Enter your phone number..."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-transparent border-none text-xs sm:text-sm text-[#141516] placeholder-[#141516]/40 focus:outline-none flex-1 font-mono tracking-wide py-1.5"
              />
              <button
                type="submit"
                className="px-4 sm:px-5 py-2 sm:py-2.5 bg-[#141516] hover:bg-[#2C2F32] text-[#F7F6F1] text-[10px] sm:text-xs font-bold font-mono tracking-wider uppercase rounded-[3px] transition-all whitespace-nowrap"
              >
                Request Call →
              </button>
            </form>
          ) : (
            <div className="flex items-center justify-center gap-2 p-3 bg-emerald-50 border border-emerald-300 rounded-[4px] text-xs font-mono text-emerald-800 shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Thank you! Our team will call you back shortly.</span>
            </div>
          )}
        </div>

      </main>

      {/* ── Minimal Bottom Footer (No Preview Link) ─────────────── */}
      <footer className="w-full border-t border-[#141516]/8 py-3.5 px-6 text-center text-[10px] sm:text-xs font-mono text-[#7A7D80] shrink-0 z-20">
        <span>saifi.electricals2@gmail.com · Amroha, UP · GST: 09BDRPA4213J1ZJ</span>
      </footer>

    </div>
  );
};

export default ComingSoonPage;
