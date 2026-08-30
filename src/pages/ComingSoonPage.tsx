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
    <div className="h-[100dvh] w-full bg-[#F5F4EF] text-[#17191B] font-sans selection:bg-[#B59A68]/20 selection:text-[#17191B] relative overflow-hidden flex flex-col justify-between">
      
      {/* ── Fixed Floating Top Bar ───────────────────────────────── */}
      <header className="fixed top-0 left-0 w-full z-50 bg-[#F5F4EF]/85 backdrop-blur-md border-b border-[#141516]/8 transition-all">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10 h-14 sm:h-16 flex items-center justify-between gap-3">
          
          {/* Logo */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center">
              <svg viewBox="0 0 28 28" fill="none" className="w-full h-full">
                <rect x="4" y="4" width="10" height="20" rx="1" stroke="#141516" strokeWidth="1.5" fill="none" />
                <rect x="4" y="4" width="6" height="2" rx="0.5" fill="#141516" />
                <rect x="4" y="22" width="6" height="2" rx="0.5" fill="#141516" />
                <rect x="16" y="8" width="8" height="12" rx="1" stroke="#A88A58" strokeWidth="1.5" fill="none" />
              </svg>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-[#141516] uppercase">Central Structure</span>
              <span className="text-[8px] sm:text-[9px] font-medium tracking-[0.16em] text-[#A88A58] uppercase">Fabrication</span>
            </div>
          </div>

          {/* Quick Phone Call Request in Header */}
          <div className="flex items-center gap-2 sm:gap-3">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="flex items-center bg-white border border-[#141516]/12 rounded-[3px] p-1 focus-within:border-[#A88A58] transition-all shadow-2xs">
                <Phone className="w-3.5 h-3.5 text-[#A88A58] ml-1.5 mr-1 shrink-0" />
                <input
                  type="tel"
                  required
                  placeholder="Enter phone..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-transparent border-none text-[11px] sm:text-xs text-[#141516] placeholder-[#141516]/40 focus:outline-none font-mono py-0.5 px-1 w-28 sm:w-44 tracking-wide"
                />
                <button
                  type="submit"
                  className="px-2.5 sm:px-3 py-1 bg-[#141516] hover:bg-[#2C2F32] text-[#F7F6F1] text-[9px] sm:text-[10px] font-mono uppercase tracking-wider rounded-[2px] transition-all whitespace-nowrap"
                >
                  Request Call →
                </button>
              </form>
            ) : (
              <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-300 rounded-[3px] text-[10px] font-mono text-emerald-800 shadow-2xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Call requested!</span>
              </div>
            )}

            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#141516]/5 border border-[#141516]/8 rounded-full text-[9px] font-mono text-[#141516] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>LAUNCHING SOON</span>
            </div>
          </div>

        </div>
      </header>

      {/* ── The Pure 3D Structure Interaction Component (Fixed Viewport, Page Never Scrolls Down) ── */}
      <main className="flex-1 w-full h-full relative overflow-hidden">
        <Hero3D fixedViewport={true} />
      </main>

      {/* ── Ultra-Minimal Bottom Bar ── */}
      <footer className="fixed bottom-0 left-0 w-full z-40 bg-[#F5F4EF]/75 backdrop-blur-xs py-2 px-6 border-t border-[#141516]/6 pointer-events-none text-center">
        <span className="text-[9px] sm:text-[10px] font-mono text-[#7A7D80]">
          saifi.electricals2@gmail.com · Amroha, UP · GST: 09BDRPA4213J1ZJ
        </span>
      </footer>

    </div>
  );
};

export default ComingSoonPage;
