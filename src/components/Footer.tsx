import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';

interface FooterProps {
  onEnquireClick?: (service?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onEnquireClick: _onEnquireClick }) => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0F2130] text-white border-t border-white/10 font-sans">
      {/* Main Grid */}
      <div className="max-w-[1340px] mx-auto px-6 md:px-12 lg:px-20 pt-20 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          {/* Brand Col (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center shrink-0">
                <svg viewBox="20 15 315 460" fill="none" className="w-full h-full">
                  <path d="M163.34 339.98L83.93 306.45V104.85L322.15 206.31V148.52L31 25V341.39L163.34 397.42V339.97V339.98Z" fill="#0049CA"/>
                  <path d="M322.15 292.33L163.34 224.84V253.68L322.15 321.01V465L189.81 408.79V351.44L269.22 384.97V356.3L110.41 288.81V144.99L322.16 234.98V292.33H322.15Z" fill="#FFFFFF"/>
                </svg>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-base font-bold tracking-tight text-white uppercase">
                  Central Structure Fabrication
                </span>
                <span className="text-xs text-white/50 tracking-wider font-medium">
                  Solar Structures & C-Channels
                </span>
              </div>
            </Link>

            <p className="text-sm text-white/70 leading-relaxed max-w-sm">
              Precision-fabricated structural components built to support demanding solar installations and cold-formed industrial frameworks.
            </p>

            <div className="flex flex-col gap-2 text-xs text-white/60">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#0049CA] flex-shrink-0" />
                <span>Amroha, Uttar Pradesh, India</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#0049CA] flex-shrink-0" />
                <a href="mailto:info.csf16@gmail.com" className="hover:text-white transition-colors">
                  info.csf16@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#0049CA] flex-shrink-0" />
                <a href="#request-a-call" className="hover:text-white transition-colors">
                  Contact Structural Desk
                </a>
              </div>
            </div>
          </div>

          {/* Nav Links (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <span className="text-xs font-bold text-[#0049CA] uppercase tracking-wider">
              Navigation
            </span>
            <ul className="flex flex-col gap-2.5 text-xs text-white/70">
              <li>
                <a href="#products" className="hover:text-white transition-colors">Products & Profiles</a>
              </li>
              <li>
                <a href="#capabilities" className="hover:text-white transition-colors">Manufacturing Capabilities</a>
              </li>
              <li>
                <a href="#projects" className="hover:text-white transition-colors">Projects & Applications</a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">About CSF</a>
              </li>
              <li>
                <a href="#request-a-call" className="hover:text-white transition-colors">Request a Call</a>
              </li>
              <li>
                <Link to="/structures" className="hover:text-white transition-colors">Structure Catalogue</Link>
              </li>
              <li>
                <Link to="/engineering" className="hover:text-white transition-colors">Engineering & Standards</Link>
              </li>
            </ul>
          </div>

          {/* Standards & Compliance (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <span className="text-xs font-bold text-[#0049CA] uppercase tracking-wider">
              Industrial Standards
            </span>
            <p className="text-xs text-white/70 leading-relaxed">
              Every structural section is fabricated from prime steel with direct adherence to Indian and international engineering standards.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-2 text-xs text-white/80">
              <div className="flex justify-between">
                <span className="text-white/50">Steel Grade:</span>
                <span className="font-semibold text-white">IS 2062 Grade E250 / E350</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Galvanizing:</span>
                <span className="font-semibold text-white">IS 2629 / ISO 1461 (85+ µm)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Wind Loading:</span>
                <span className="font-semibold text-white">IS 875 (Part 3) Rated</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">GSTIN:</span>
                <span className="font-semibold text-white">09BDRPA4213J1ZJ</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar with Enigmatic Studios Credit */}
      <div className="border-t border-white/10">
        <div className="max-w-[1340px] mx-auto px-6 md:px-12 lg:px-20 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div>
            © {year} Central Structure Fabrication (CSF). All rights reserved.
          </div>

          {/* Enigmatic Studios Geometric Credit */}
          <div className="flex items-center gap-2 text-white/60">
            <span>Created by</span>
            <span className="inline-flex items-center gap-1.5 font-semibold text-white">
              <svg className="w-3.5 h-3.5 fill-[#0049CA]" viewBox="0 0 16 16">
                <polygon points="8,1 15,8 8,15 1,8" />
              </svg>
              <span>Enigmatic Studios</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
