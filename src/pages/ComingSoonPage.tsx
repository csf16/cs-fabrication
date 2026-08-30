import React, { useState } from 'react';
import { Hero3D } from '../components/Hero3D';
import { useSEO } from '../hooks/useSEO';
import { Phone, CheckCircle2 } from 'lucide-react';

interface ComingSoonPageProps {
  onEnquireClick?: (service?: string) => void;
}

export const ComingSoonPage: React.FC<ComingSoonPageProps> = () => {
  useSEO({
    title: 'Central Structure Fabrication | Solar Mounting Structures & C-Channels',
    description:
      'Central Structure Fabrication — Precision solar mounting structures, cold-formed C-channels, and 41×41 strut channels. Amroha, Uttar Pradesh. Web portal launching soon. GSTIN: 09BDRPA4213J1ZJ.',
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
    <div className="w-full bg-[#F5F4EF] text-[#17191B] font-sans selection:bg-[#B59A68]/20 selection:text-[#17191B] relative">
      
      {/* ── Fixed Floating Top Bar ───────────────────────────────── */}
      <header className="fixed top-0 left-0 w-full z-50 bg-[#F5F4EF]/90 backdrop-blur-md border-b border-[#141516]/8 transition-all">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 h-16 flex items-center justify-between gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-3 shrink-0">
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

          {/* Top Quick Phone Call Request */}
          <div className="flex items-center gap-3">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="hidden md:flex items-center bg-white border border-[#141516]/12 rounded-[3px] p-1 focus-within:border-[#A88A58] transition-all">
                <Phone className="w-3.5 h-3.5 text-[#A88A58] ml-2 mr-1" />
                <input
                  type="tel"
                  required
                  placeholder="Enter phone number..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-transparent border-none text-xs text-[#141516] placeholder-[#141516]/40 focus:outline-none font-mono py-1 px-1 w-44 tracking-wide"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-[#141516] hover:bg-[#2C2F32] text-[#F7F6F1] text-[10px] font-mono uppercase tracking-wider rounded-[2px] transition-all whitespace-nowrap"
                >
                  Request Call →
                </button>
              </form>
            ) : (
              <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-300 rounded-[3px] text-[10px] font-mono text-emerald-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Call requested. We'll call you shortly!</span>
              </div>
            )}

            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#141516]/5 border border-[#141516]/8 rounded-full text-[9px] font-mono text-[#141516] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>LAUNCHING SOON</span>
            </div>
          </div>

        </div>
      </header>

      {/* ── 1. The Interactive 3D Structure Assembly Animation ────── */}
      <Hero3D />

      {/* ── 2. Simple Action Section with Single Line Text & Phone Form ─ */}
      <section className="bg-white border-t border-[#141516]/8 py-16 sm:py-20 px-6">
        <div className="max-w-[720px] mx-auto text-center flex flex-col items-center gap-6">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F5F4EF] border border-[#141516]/8 rounded-full text-[9px] font-mono text-[#A88A58] font-bold uppercase tracking-widest">
            <span>CENTRAL STRUCTURE FABRICATION</span>
          </div>

          {/* Single line text */}
          <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#141516] leading-snug">
            Solar Mounting Structures &amp; <span className="text-[#A88A58]">C-Channels</span>.
          </h2>

          <p className="text-xs sm:text-sm text-[#7A7D80] font-mono uppercase tracking-[0.2em]">
            Manufacturing &amp; Engineering // Amroha, Uttar Pradesh
          </p>

          {/* Phone Number Input Form */}
          <div className="w-full max-w-md mt-2">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="flex items-center bg-[#F5F4EF] border border-[#141516]/15 focus-within:border-[#A88A58] rounded-[4px] p-1.5 transition-all shadow-sm">
                <div className="flex items-center pl-3 pr-2 text-[#A88A58]">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  type="tel"
                  required
                  placeholder="Enter your phone number..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-transparent border-none text-xs sm:text-sm text-[#141516] placeholder-[#141516]/40 focus:outline-none flex-1 font-mono tracking-wide py-2"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#141516] hover:bg-[#2C2F32] text-[#F7F6F1] text-xs font-bold font-mono tracking-widest uppercase rounded-[3px] transition-all whitespace-nowrap"
                >
                  Request Call →
                </button>
              </form>
            ) : (
              <div className="flex items-center justify-center gap-2 p-4 bg-emerald-50 border border-emerald-300 rounded-[4px] text-xs font-mono text-emerald-800 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Thank you! Our team will call you back shortly.</span>
              </div>
            )}
          </div>

          {/* Minimal Single Line Footer (NO Preview Link) */}
          <div className="w-full border-t border-[#141516]/8 pt-8 mt-6 text-center text-xs font-mono text-[#7A7D80]">
            <span>saifi.electricals2@gmail.com · Amroha, UP · GST: 09BDRPA4213J1ZJ</span>
          </div>

        </div>
      </section>

    </div>
  );
};

export default ComingSoonPage;
