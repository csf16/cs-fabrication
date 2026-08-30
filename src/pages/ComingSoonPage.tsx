import React from 'react';
import { Link } from 'react-router-dom';
import { Hero3D } from '../components/Hero3D';
import { useSEO } from '../hooks/useSEO';
import { Mail, MapPin, ArrowRight } from 'lucide-react';

interface ComingSoonPageProps {
  onEnquireClick: (service?: string) => void;
}

export const ComingSoonPage: React.FC<ComingSoonPageProps> = ({ onEnquireClick }) => {
  useSEO({
    title: 'Central Structure Fabrication | Solar Mounting Structures — Launching Soon',
    description:
      'Central Structure Fabrication is an industrial manufacturer of solar mounting structures, cold-formed C-channels, strut channels, and solar hybrid inverters in Amroha, Uttar Pradesh. Web portal launching soon. GSTIN: 09BDRPA4213J1ZJ.',
    keywords:
      'Central Structure Fabrication, CS Fabrication Amroha, solar mounting structure manufacturer, C channel steel, solar inverter trading, solar structure manufacturer Uttar Pradesh',
    canonical: 'https://www.csfabrication.in/',
    ogTitle: 'Central Structure Fabrication — Solar Mounting Structures',
    ogDescription:
      'Precision cold-formed solar structures, C-channels, strut channels & solar hybrid inverters. Amroha, Uttar Pradesh. Launching soon.',
  });

  return (
    <div className="w-full bg-[#F7F6F1] text-[#141516] font-sans selection:bg-[#A88A58]/20 selection:text-[#141516]">
      
      {/* ── Fixed Minimal Floating Header ───────────────────────── */}
      <header className="fixed top-0 left-0 w-full z-50 bg-[#F7F6F1]/90 backdrop-blur-md border-b border-[#141516]/8 transition-all">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 h-16 flex items-center justify-between">
          
          {/* Logo */}
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

          {/* Right actions */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-[#141516]/5 border border-[#141516]/8 rounded-full text-[9px] font-mono text-[#141516] font-medium tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>LAUNCHING SOON // TAKING ORDERS</span>
            </div>

            <button
              onClick={() => onEnquireClick('General RFQ')}
              className="h-8 px-4 bg-[#141516] hover:bg-[#2C2F32] text-[#F7F6F1] text-[10px] font-semibold tracking-[0.12em] uppercase rounded-[3px] transition-all duration-300 flex items-center gap-2"
            >
              Direct RFQ →
            </button>
          </div>
        </div>
      </header>

      {/* ── 3D Interactive Structure Assembly Animation ─────────── */}
      <div className="relative w-full pt-16">
        <Hero3D />
      </div>

      {/* ── Simple & Clean Information Footer ─────────────────────── */}
      <section className="border-t border-[#141516]/10 bg-white py-16 sm:py-20 px-6 sm:px-12">
        <div className="max-w-[1280px] mx-auto flex flex-col gap-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Mission & Products */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-[1px] bg-[#A88A58]" />
                <span className="text-[10px] font-mono tracking-[0.3em] text-[#A88A58] uppercase font-bold">
                  MANUFACTURING &amp; TRADING // AMROHA, UP
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#141516]">
                Precision Solar Mounting Structures &amp; Hardware
              </h2>

              <p className="text-sm text-[#7A7D80] font-light leading-relaxed max-w-xl">
                We manufacture cold-formed C-channels (80×40×15 &amp; 60×40×15), 41×41 strut channels, high-tensile ground &amp; rooftop solar mounting structures, solar hybrid inverters, and hardware clamps.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {[
                  'C-Channel 80×40×15',
                  'C-Channel 60×40×15',
                  '41×41 Strut Channel',
                  'Solar Hybrid Inverters',
                  'Middle & End Clamps',
                  'U & Z Clamps',
                  'IS 2062 / HDG 85µm',
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-[#F7F6F1] border border-[#141516]/8 rounded-[3px] text-[10px] font-mono text-[#141516] font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Column: Direct Contact & Credentials */}
            <div className="lg:col-span-5 flex flex-col gap-5 border-t lg:border-t-0 lg:border-l border-[#141516]/8 pt-8 lg:pt-0 lg:pl-10">
              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-mono text-[#A88A58] uppercase tracking-widest font-bold">
                  DIRECT CONTACT &amp; INQUIRIES
                </span>
                <a
                  href="mailto:saifi.electricals2@gmail.com"
                  className="text-base font-bold text-[#141516] hover:text-[#A88A58] transition-colors flex items-center gap-2"
                >
                  <Mail className="w-4 h-4 text-[#A88A58]" />
                  <span>saifi.electricals2@gmail.com</span>
                </a>
                <div className="flex items-start gap-2 pt-1 text-xs text-[#7A7D80]">
                  <MapPin className="w-4 h-4 text-[#A88A58] shrink-0 mt-0.5" />
                  <span>Mohanpur Shumali, Jamna Khas Road, Amroha, UP — 244221</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-[#F7F6F1] rounded-[3px] border border-[#141516]/6 flex flex-col gap-0.5">
                  <span className="text-[8px] font-mono text-[#A88A58] font-bold uppercase">GSTIN</span>
                  <span className="text-[11px] font-mono font-bold text-[#141516]">09BDRPA4213J1ZJ</span>
                </div>
                <div className="p-3 bg-[#F7F6F1] rounded-[3px] border border-[#141516]/6 flex flex-col gap-0.5">
                  <span className="text-[8px] font-mono text-[#A88A58] font-bold uppercase">UDYAM</span>
                  <span className="text-[10px] font-mono font-bold text-[#141516] break-all">UDYAM-UP-40-0014133</span>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => onEnquireClick('Solar Structure RFQ')}
                  className="flex-1 h-10 bg-[#A88A58] hover:bg-[#C4A96E] text-[#141516] text-[10px] font-bold uppercase tracking-[0.14em] rounded-[3px] transition-all"
                >
                  Request a Quote
                </button>
                <a
                  href="mailto:saifi.electricals2@gmail.com?subject=Project%20Inquiry%20-%20Central%20Structure%20Fabrication"
                  className="px-4 h-10 border border-[#141516]/15 hover:border-[#141516] text-[#141516] text-[10px] font-mono uppercase tracking-wider rounded-[3px] transition-all flex items-center justify-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email</span>
                </a>
              </div>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="border-t border-[#141516]/8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#7A7D80]">
            <span>© {new Date().getFullYear()} Central Structure Fabrication. All rights reserved.</span>
            
            <Link
              to="/home"
              className="text-[#A88A58] hover:text-[#141516] transition-colors flex items-center gap-1.5 uppercase tracking-wider font-semibold"
            >
              <span>Preview Full Multi-Page Website</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
};

export default ComingSoonPage;
