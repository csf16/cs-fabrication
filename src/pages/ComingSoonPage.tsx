import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';
import { Mail, MapPin, ArrowRight, CheckCircle2 } from 'lucide-react';

interface ComingSoonPageProps {
  onEnquireClick: (service?: string) => void;
}

export const ComingSoonPage: React.FC<ComingSoonPageProps> = ({ onEnquireClick }) => {
  useSEO({
    title: 'Central Structure Fabrication | Launching Soon — Amroha, Uttar Pradesh',
    description:
      'Central Structure Fabrication is an industrial manufacturer of solar mounting structures, cold-formed C-channels (80x40x15, 60x40x15), strut channels, and solar hybrid inverters based in Amroha, UP. Web portal launching soon. GSTIN: 09BDRPA4213J1ZJ.',
    keywords:
      'Central Structure Fabrication, CS Fabrication Amroha, solar mounting structure manufacturer, C channel steel, solar inverter trading, solar structure manufacturer Uttar Pradesh',
    canonical: 'https://www.csfabrication.in/',
    ogTitle: 'Central Structure Fabrication — Launching Soon',
    ogDescription:
      'Solar mounting structures, C-channels, strut channels & solar hybrid inverters. Amroha, Uttar Pradesh. Coming soon.',
  });

  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
    }
  };

  const capabilities = [
    { code: 'STR-01', title: 'Solar Mounting Structures', desc: 'Ground mount, rooftop fixed tilt, and carport racking systems' },
    { code: 'SEC-02', title: 'Cold-Formed C-Channels',   desc: '80×40×15 & 60×40×15 mm in high-tensile IS 2062 steel' },
    { code: 'STR-03', title: '41×41 Strut Channels',       desc: 'Precision slotted and unslotted GI & HDG mounting channels' },
    { code: 'INV-04', title: 'Solar Hybrid Inverters',    desc: 'Supply and trading of high-efficiency on/off-grid inverters' },
    { code: 'CLP-05', title: 'Hardware & Clamps',         desc: 'AL 6063-T6 middle clamps, end clamps, U-clamps & Z-clamps' },
    { code: 'SRV-06', title: 'Turnkey Installation',       desc: 'End-to-end structure assembly, alignment & commissioning' },
  ];

  return (
    <div className="min-h-screen bg-[#0E1012] text-[#F7F6F1] flex flex-col justify-between selection:bg-[#A88A58]/30 selection:text-[#F7F6F1] relative overflow-hidden font-sans">
      
      {/* Background Architectural Grid */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(rgba(247,246,241,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(247,246,241,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" 
      />

      {/* Subtle Radial Glow */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[#A88A58]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-[#A88A58]/8 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Header */}
      <header className="relative z-10 max-w-[1280px] w-full mx-auto px-6 sm:px-10 py-8 flex items-center justify-between">
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
            <span className="text-[12px] font-bold tracking-[0.22em] text-[#F7F6F1] uppercase">Central Structure</span>
            <span className="text-[9px] font-medium tracking-[0.18em] text-[#A88A58] uppercase">Fabrication</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-[#F7F6F1]/5 border border-[#F7F6F1]/10 rounded-full text-[10px] font-mono text-[#A88A58]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>OPERATIONAL // TAKING ORDERS</span>
          </div>
          <button
            onClick={() => onEnquireClick('General RFQ')}
            className="text-[10px] font-bold uppercase tracking-[0.14em] px-4 py-2 bg-[#A88A58] hover:bg-[#C4A96E] text-[#0E1012] rounded-[3px] transition-all duration-300"
          >
            Direct RFQ →
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-[1100px] w-full mx-auto px-6 sm:px-10 py-12 sm:py-16 flex flex-col gap-14 my-auto">
        
        {/* Hero Copy */}
        <div className="flex flex-col gap-6 max-w-3xl">
          <div className="inline-flex items-center gap-3">
            <div className="w-8 h-[1px] bg-[#A88A58]" />
            <span className="text-[10px] font-mono tracking-[0.35em] text-[#A88A58] uppercase font-bold">
              OFFICIAL DIGITAL PORTAL // LAUNCHING SOON
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight uppercase leading-[1.05]">
            Structures That <span className="text-[#A88A58]">Carry</span> The Future
          </h1>

          <p className="text-base sm:text-lg text-[#F7F6F1]/70 font-light leading-relaxed max-w-2xl">
            Central Structure Fabrication is modernizing its web platform. We manufacture cold-formed C-channels, precision solar mounting structures, 41×41 strut channels, and solar hybrid inverters for utility, commercial, and rooftop solar projects across India.
          </p>

          {/* Quick Notification / Contact bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            {!subscribed ? (
              <form onSubmit={handleNotify} className="flex items-center gap-2 max-w-md w-full">
                <input
                  type="email"
                  required
                  placeholder="Enter email for catalog & launch update"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="bg-[#F7F6F1]/5 border border-[#F7F6F1]/15 rounded-[3px] px-4 py-3 text-xs text-[#F7F6F1] placeholder-[#F7F6F1]/40 focus:outline-none focus:border-[#A88A58] flex-1 font-mono"
                />
                <button
                  type="submit"
                  className="px-5 py-3 bg-[#A88A58] hover:bg-[#C4A96E] text-[#0E1012] text-[11px] font-bold tracking-widest uppercase rounded-[3px] transition-all whitespace-nowrap"
                >
                  Notify Me
                </button>
              </form>
            ) : (
              <div className="flex items-center gap-2 px-4 py-3 bg-[#A88A58]/20 border border-[#A88A58]/40 rounded-[3px] text-xs font-mono text-[#A88A58]">
                <CheckCircle2 className="w-4 h-4" />
                <span>Thank you! We will email you our complete product catalog shortly.</span>
              </div>
            )}

            <a
              href="mailto:saifi.electricals2@gmail.com?subject=Inquiry%20for%20Central%20Structure%20Fabrication"
              className="px-5 py-3 border border-[#F7F6F1]/20 hover:border-[#A88A58] text-[#F7F6F1] text-[11px] font-mono uppercase tracking-wider rounded-[3px] transition-all flex items-center justify-center gap-2"
            >
              <Mail className="w-3.5 h-3.5 text-[#A88A58]" />
              <span>Email Us Direct</span>
            </a>
          </div>
        </div>

        {/* Capabilities Grid */}
        <div className="flex flex-col gap-5 border-t border-[#F7F6F1]/10 pt-10">
          <span className="text-[10px] font-mono tracking-[0.25em] text-[#A88A58] uppercase font-bold">
            MANUFACTURING CAPABILITIES &amp; PRODUCT RANGE
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {capabilities.map((c) => (
              <div
                key={c.code}
                className="p-5 bg-[#F7F6F1]/[0.02] hover:bg-[#F7F6F1]/[0.05] border border-[#F7F6F1]/8 hover:border-[#A88A58]/40 rounded-[3px] transition-all duration-300 flex flex-col gap-2 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono text-[#A88A58] font-bold">{c.code}</span>
                  <span className="text-[9px] font-mono text-[#F7F6F1]/30">IS 2062 / HDG</span>
                </div>
                <h3 className="text-sm font-bold text-[#F7F6F1] uppercase tracking-wide group-hover:text-[#A88A58] transition-colors">
                  {c.title}
                </h3>
                <p className="text-xs text-[#F7F6F1]/55 font-light leading-relaxed">
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance Credentials */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F7F6F1]/[0.03] border border-[#F7F6F1]/10 rounded-[4px] p-5 text-xs font-mono">
          <div className="flex flex-col gap-1">
            <span className="text-[9px] text-[#A88A58] font-bold uppercase tracking-wider">GSTIN</span>
            <span className="text-[11px] font-bold text-[#F7F6F1]">09BDRPA4213J1ZJ</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[9px] text-[#A88A58] font-bold uppercase tracking-wider">UDYAM REGISTRATION</span>
            <span className="text-[11px] font-bold text-[#F7F6F1]">UDYAM-UP-40-0014133</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[9px] text-[#A88A58] font-bold uppercase tracking-wider">MANUFACTURING WORKS</span>
            <span className="text-[11px] font-bold text-[#F7F6F1]">Amroha, Uttar Pradesh</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[9px] text-[#A88A58] font-bold uppercase tracking-wider">STANDARDS</span>
            <span className="text-[11px] font-bold text-[#F7F6F1]">IS 2062 · IS 2629 · IS 875</span>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#F7F6F1]/8 bg-[#090A0C]">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#F7F6F1]/40">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#A88A58]" />
            <span>Mohanpur Shumali, Jamna Khas Road, Amroha, Uttar Pradesh — 244221</span>
          </div>

          <div className="flex items-center gap-6">
            <Link
              to="/home"
              className="text-[#A88A58] hover:text-[#C4A96E] underline underline-offset-4 text-xs font-mono uppercase tracking-wider flex items-center gap-1"
            >
              <span>Preview Full Website</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
            <span>© {new Date().getFullYear()} Central Structure Fabrication</span>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default ComingSoonPage;
