import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';
import { CSFLogo } from './CSFLogo';

interface FooterProps {
  onEnquireClick?: (service?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onEnquireClick }) => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0F2130] text-white border-t border-white/10 font-sans">
      {/* Main Grid */}
      <div className="max-w-[1340px] mx-auto px-6 md:px-12 lg:px-20 pt-20 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          {/* Brand Col (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <Link to="/" className="inline-block group py-1">
              <CSFLogo
                className="h-10 sm:h-12 w-auto transition-transform duration-200 group-hover:scale-[1.02]"
                variant="light"
                showText={true}
              />
            </Link>

            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                CENTRAL STRUCTURE FABRICATION
              </h4>
              <p className="text-xs text-[#0049CA] font-medium tracking-wide mt-1 uppercase">
                Solar Electrical Products · Structural Fabrication · Components &amp; Services
              </p>
            </div>

            <p className="text-sm text-white/70 leading-relaxed max-w-sm">
              From solar electrical products to precision-fabricated structures and components, CSF delivers solutions designed for dependable solar infrastructure.
            </p>

            <div className="flex flex-col gap-2.5 text-xs text-white/60 pt-2">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#0049CA] flex-shrink-0" />
                <span>Mohanpur Shumali, Amroha, Uttar Pradesh — 244221</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#0049CA] flex-shrink-0" />
                <a href="mailto:info.csf16@gmail.com" className="hover:text-white transition-colors">
                  info.csf16@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#0049CA] flex-shrink-0" />
                <span>GST: 09BDRPA4213J1ZJ</span>
              </div>
            </div>
          </div>

          {/* Navigation Links (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <span className="text-xs font-bold text-[#0049CA] uppercase tracking-wider">
              Dedicated Pages
            </span>
            <ul className="flex flex-col gap-2.5 text-xs text-white/70">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-white transition-colors">Products &amp; Channels</Link>
              </li>
              <li>
                <Link to="/capabilities" className="hover:text-white transition-colors">Capabilities &amp; Process</Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-white transition-colors">Projects &amp; Applications</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">About CSF</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">Contact &amp; Proposals</Link>
              </li>
            </ul>
          </div>

          {/* Core Offerings & CTA (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold text-[#0049CA] uppercase tracking-wider">
                Core Portfolio
              </span>
              <ul className="flex flex-col gap-2 text-xs text-white/70">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0049CA]" />
                  <span>Solar Hybrid Inverter Trading</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0049CA]" />
                  <span>ACDB / DCDB Manufacturing</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0049CA]" />
                  <span>Solar Structures &amp; C-Channels (80×40×15, 60×40×15)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0049CA]" />
                  <span>41×41 Strut Channels &amp; Clamps (U, Mid, End)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0049CA]" />
                  <span>Installation, Completion &amp; Commissioning</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => {
                if (onEnquireClick) onEnquireClick('Footer Callback Request');
              }}
              className="w-full py-3.5 bg-[#0049CA] hover:bg-[#003CAD] text-white text-xs font-semibold uppercase tracking-wider rounded-none transition-colors duration-200 shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Request a Call</span>
            </button>
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
            <span className="inline-flex items-center gap-1.5 font-medium text-white/90">
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
