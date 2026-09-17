import React from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Clock,
  ExternalLink
} from 'lucide-react';
import { CSFLogo } from './CSFLogo';
import { EnigmaticStudiosLogo } from './EnigmaticStudiosLogo';

interface FooterProps {
  onEnquireClick?: (service?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onEnquireClick: _onEnquireClick }) => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#081018] text-white font-sans relative overflow-hidden border-t border-white/10">
      {/* Subtle background ambient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[300px] bg-radial from-[#0049CA]/15 via-transparent to-transparent pointer-events-none" />

      {/* ── MAIN 4-COLUMN FOOTER NAVIGATION ── */}
      <div className="max-w-[1720px] mx-auto px-6 sm:px-10 md:px-16 lg:px-24 pt-16 sm:pt-20 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-10">
          
          {/* Col 1: Brand & Compliance Credentials (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <Link to="/" className="inline-block group py-1">
              <CSFLogo
                className="h-16 sm:h-20 w-auto transition-transform duration-200 group-hover:scale-[1.02]"
                variant="light"
                showText={true}
              />
            </Link>

            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              Central Structure Fabrication (CSF) is an integrated cold roll-forming and electrical manufacturing enterprise based in Amroha, UP. We consult, engineer, manufacture, and dispatch precision solar mounting structures and power distribution equipment direct to project sites nationwide.
            </p>

            {/* Industrial Compliance Badges */}
            <div>
              <span className="text-[10px] font-mono text-[#0049CA] font-bold uppercase tracking-widest block mb-2.5">
                Standard Compliance &amp; Certifications
              </span>
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-white/90">
                  IS 2062 Grade Steel
                </span>
                <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-white/90">
                  IS 2629 HDG Coating
                </span>
                <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-white/90">
                  IP65 Enclosures
                </span>
                <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-white/90">
                  MNRE Benchmarks
                </span>
              </div>
            </div>

            {/* Tax & Plant Credential */}
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between text-xs text-white/70">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#0049CA] flex-shrink-0" />
                <span className="font-mono font-medium text-white/90">GSTIN: 09BDRPA4213J1ZJ</span>
              </div>
              <span className="text-[11px] text-white/50 font-mono">Registered Entity</span>
            </div>
          </div>

          {/* Col 2: Product Lines (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <span className="text-xs font-bold text-[#0049CA] uppercase tracking-wider">
              Engineered Product Lines
            </span>
            <ul className="flex flex-col gap-2.5 text-xs text-white/70">
              <li>
                <Link to="/products" className="hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0049CA]" />
                  <span>Ground &amp; Rooftop Solar Structures</span>
                </Link>
              </li>
              <li>
                <Link to="/products#structural-cad" className="hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0049CA]" />
                  <span>C-Channel (80 × 40 × 15 mm)</span>
                </Link>
              </li>
              <li>
                <Link to="/products#structural-cad" className="hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0049CA]" />
                  <span>C-Channel (60 × 40 × 15 mm)</span>
                </Link>
              </li>
              <li>
                <Link to="/products#structural-cad" className="hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0049CA]" />
                  <span>41 × 41 mm Slotted Strut Channel</span>
                </Link>
              </li>
              <li>
                <Link to="/products#electrical" className="hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0049CA]" />
                  <span>Dual-MPPT Solar Hybrid Inverters</span>
                </Link>
              </li>
              <li>
                <Link to="/products#electrical" className="hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0049CA]" />
                  <span>Weatherproof ACDB &amp; DCDB Combiners</span>
                </Link>
              </li>
              <li>
                <Link to="/products#hardware" className="hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0049CA]" />
                  <span>Mid Clamps (U-Clamps) &amp; Z-Clamps</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Company & Information (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <span className="text-xs font-bold text-[#0049CA] uppercase tracking-wider">
              Navigation
            </span>
            <ul className="flex flex-col gap-2.5 text-xs text-white/70">
              <li>
                <Link to="/" className="hover:text-white hover:translate-x-1 transition-all inline-block">Home</Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-white hover:translate-x-1 transition-all inline-block">Product Catalog</Link>
              </li>
              <li>
                <Link to="/capabilities" className="hover:text-white hover:translate-x-1 transition-all inline-block">Plant Capabilities</Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-white hover:translate-x-1 transition-all inline-block">Project Deployments</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white hover:translate-x-1 transition-all inline-block">About CSF</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white hover:translate-x-1 transition-all inline-block">Direct Consultation</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Direct Factory Desk & Plant Location (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <span className="text-xs font-bold text-[#0049CA] uppercase tracking-wider">
              Amroha Manufacturing Plant
            </span>

            <div className="flex flex-col gap-3 text-xs text-white/70">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#0049CA] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-white/90 font-medium block">Mohanpur Shumali, Amroha</span>
                  <span>Uttar Pradesh — 244221, India</span>
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=Mohanpur+Shumali+Amroha+Uttar+Pradesh+244221+India"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center gap-1 text-[11px] text-[#4D8BFF] hover:underline"
                  >
                    <span>Get Driving Directions</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5 pt-2 border-t border-white/10">
                <Clock className="w-4 h-4 text-[#0049CA] flex-shrink-0" />
                <span>Mon – Sat: 9:00 AM – 7:00 PM IST</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#0049CA] flex-shrink-0" />
                <a href="tel:+919997178687" className="hover:text-white transition-colors font-mono">
                  +91 99971 78687
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#0049CA] flex-shrink-0" />
                <a href="mailto:info.csf16@gmail.com" className="hover:text-white transition-colors">
                  info.csf16@gmail.com
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── BOTTOM COPYRIGHT & ATTRIBUTION BAR ── */}
      <div className="border-t border-white/10 bg-[#060D14]">
        <div className="max-w-[1720px] mx-auto px-6 sm:px-10 md:px-16 lg:px-24 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div>
            <span>© {year} Central Structure Fabrication (CSF). All rights reserved.</span>
          </div>

          {/* Enigmatic Studios Attribution */}
          <div className="flex items-center gap-2.5 text-white/60">
            <span>Designed &amp; Developed by</span>
            <a
              href="https://enigmaticstudios.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center hover:opacity-100 opacity-90 transition-all duration-200 group"
              title="Enigmatic Studios"
            >
              <EnigmaticStudiosLogo className="h-5 sm:h-5.5 w-auto transition-transform duration-200 group-hover:scale-105" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
