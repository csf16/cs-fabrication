import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Structure3DHero } from '../components/Structure3DHero';
import { useSEO } from '../hooks/useSEO';
import { Phone, CheckCircle2, ArrowRight } from 'lucide-react';

interface ComingSoonPageProps {
  onEnquireClick: (service?: string) => void;
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="h-screen w-screen bg-[#0E1012] text-[#F7F6F1] flex flex-col justify-between relative overflow-hidden font-sans select-none">
      
      {/* ── Background 3D Structure Assembly Animation ─────────── */}
      <div className="absolute inset-0 z-0">
        <Structure3DHero />
      </div>

      {/* Subtle Dark Radial Gradient to ensure text readability */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#0E1012]/90 via-[#0E1012]/40 to-[#0E1012]/70 pointer-events-none" />

      {/* ── Top Header ─────────────────────────────────────────── */}
      <header className="relative z-10 max-w-[1280px] w-full mx-auto px-6 sm:px-12 pt-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 flex items-center justify-center">
            <svg viewBox="0 0 28 28" fill="none" className="w-full h-full">
              <rect x="4" y="4" width="10" height="20" rx="1" stroke="#F7F6F1" strokeWidth="1.5" fill="none" />
              <rect x="4" y="4" width="6" height="2" rx="0.5" fill="#F7F6F1" />
              <rect x="4" y="22" width="6" height="2" rx="0.5" fill="#F7F6F1" />
              <rect x="16" y="8" width="8" height="12" rx="1" stroke="#A88A58" strokeWidth="1.5" fill="none" />
            </svg>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-[13px] font-bold tracking-[0.24em] text-[#F7F6F1] uppercase">Central Structure</span>
            <span className="text-[9px] font-medium tracking-[0.2em] text-[#A88A58] uppercase">Fabrication</span>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-1 bg-[#F7F6F1]/5 border border-[#F7F6F1]/10 rounded-full text-[10px] font-mono text-[#A88A58]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>LAUNCHING SOON</span>
        </div>
      </header>

      {/* ── Center: Single Line Text & Phone Number Input ────────── */}
      <main className="relative z-10 max-w-[860px] w-full mx-auto px-6 text-center flex flex-col items-center gap-7 my-auto">
        
        {/* Single line text */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight leading-[1.1] text-white">
          Solar Mounting Structures &amp; <span className="text-[#A88A58]">C-Channels</span>.
        </h1>

        <p className="text-xs sm:text-sm text-[#F7F6F1]/60 font-mono uppercase tracking-[0.25em]">
          Manufacturing &amp; Engineering // Amroha, Uttar Pradesh
        </p>

        {/* Single Phone Input */}
        <div className="w-full max-w-md mt-2">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex items-center bg-[#17191C]/90 backdrop-blur-md border border-[#F7F6F1]/15 focus-within:border-[#A88A58] rounded-[4px] p-1.5 transition-all shadow-2xl">
              <div className="flex items-center pl-3 pr-2 text-[#A88A58]">
                <Phone className="w-4 h-4" />
              </div>
              <input
                type="tel"
                required
                placeholder="Enter your phone number..."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-transparent border-none text-sm text-white placeholder-[#F7F6F1]/40 focus:outline-none flex-1 font-mono tracking-wide py-2"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#A88A58] hover:bg-[#C4A96E] text-[#0E1012] text-xs font-bold font-mono tracking-widest uppercase rounded-[3px] transition-all whitespace-nowrap"
              >
                Request Call →
              </button>
            </form>
          ) : (
            <div className="flex items-center justify-center gap-2 p-4 bg-[#A88A58]/20 border border-[#A88A58]/40 rounded-[4px] text-xs font-mono text-[#A88A58] shadow-lg">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Thank you! Our team will call you back shortly.</span>
            </div>
          )}
        </div>

      </main>

      {/* ── Minimal Bottom Footer ───────────────────────────────── */}
      <footer className="relative z-10 max-w-[1280px] w-full mx-auto px-6 sm:px-12 pb-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#F7F6F1]/40 border-t border-[#F7F6F1]/8 pt-5">
        <div>
          <span>saifi.electricals2@gmail.com · Amroha, UP · GSTIN: 09BDRPA4213J1ZJ</span>
        </div>

        <Link
          to="/home"
          className="text-[#A88A58] hover:text-white transition-colors flex items-center gap-1.5 uppercase tracking-wider"
        >
          <span>Preview Full Website</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </footer>

    </div>
  );
};

export default ComingSoonPage;
