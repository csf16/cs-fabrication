import React from 'react';
import { Link } from 'react-router-dom';

interface FooterProps {
  onEnquireClick: (service?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onEnquireClick: _onEnquireClick }) => {
  const year = new Date().getFullYear();

  const cols = [
    {
      heading: 'Solutions',
      links: [
        { label: 'Solar Structures',    to: '/structures'  },
        { label: 'Media Gallery',        to: '/gallery'     },
        { label: 'Engineering & FEA',    to: '/engineering' },
      ],
    },
    {
      heading: 'Company',
      links: [
        { label: 'About CS Fabrication', to: '/about'    },
        { label: 'Request Proposal',     to: '/contact'  },
      ],
    },
  ];

  return (
    <footer className="bg-[#141516] text-[#F7F6F1]">
      {/* Main grid */}
      <div className="max-w-[1280px] mx-auto px-8 md:px-14 pt-20 pb-16 grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-16">
        
        {/* Brand column */}
        <div className="flex flex-col gap-7 max-w-[280px]">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-7 h-7">
              <svg viewBox="0 0 28 28" fill="none" className="w-full h-full">
                <rect x="4" y="4" width="10" height="20" rx="1" stroke="#F7F6F1" strokeWidth="1.5" fill="none"/>
                <rect x="4" y="4" width="6" height="2" rx="0.5" fill="#F7F6F1"/>
                <rect x="4" y="22" width="6" height="2" rx="0.5" fill="#F7F6F1"/>
                <rect x="16" y="8" width="8" height="12" rx="1" stroke="#A88A58" strokeWidth="1.5" fill="none"/>
              </svg>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#F7F6F1] uppercase">CS</span>
              <span className="text-[9px] font-medium tracking-[0.15em] text-[#A88A58] uppercase">Fabrication</span>
            </div>
          </Link>

          <p className="text-[13px] text-[#F7F6F1]/40 font-light leading-relaxed">
            Solar mounting structures, C-channel steel &amp; inverter systems. Amroha, Uttar Pradesh.
          </p>

          <Link
            to="/contact"
            className="w-fit text-[10px] font-semibold tracking-[0.12em] uppercase text-[#A88A58] hover:text-[#C4A96E] transition-colors duration-200 flex items-center gap-2"
          >
            Request a Proposal →
          </Link>
        </div>

        {/* Link columns */}
        {cols.map(col => (
          <div key={col.heading} className="flex flex-col gap-5">
            <span className="text-[9px] font-semibold tracking-[0.2em] uppercase text-[#F7F6F1]/25">
              {col.heading}
            </span>
            <ul className="flex flex-col gap-3.5">
              {col.links.map(link => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-[12px] text-[#F7F6F1]/55 hover:text-[#F7F6F1] transition-colors duration-200 font-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#F7F6F1]/6">
        <div className="max-w-[1280px] mx-auto px-8 md:px-14 h-14 flex items-center justify-between">
          <span className="text-[10px] text-[#F7F6F1]/25 tracking-wide">
            © {year} Central Structure Fabrication. Amroha, Uttar Pradesh.
          </span>
          <span className="text-[10px] text-[#F7F6F1]/20 tracking-wide">
            GSTIN: 09BDRPA4213J1ZJ · IS 2062 · IS 2629
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
