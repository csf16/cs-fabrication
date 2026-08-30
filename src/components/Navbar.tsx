import React, { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onEnquireClick: (service?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = (_props: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMobileMenuOpen(false); }, [location.pathname]);

  const navLinks = [
    { to: '/home',        label: 'Home'        },
    { to: '/structures',  label: 'Structures'  },
    { to: '/gallery',     label: 'Gallery'     },
    { to: '/engineering', label: 'Engineering' },
    { to: '/about',       label: 'About'       },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#F7F6F1]/95 backdrop-blur-xl border-b border-[#141516]/8 shadow-[0_1px_0_0_rgba(20,21,22,0.06)]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-8 md:px-14 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link to="/home" className="flex items-center gap-3 group">
            <div className="w-7 h-7 flex items-center justify-center">
              <svg viewBox="0 0 28 28" fill="none" className="w-full h-full">
                <rect x="4" y="4" width="10" height="20" rx="1" stroke="#141516" strokeWidth="1.5" fill="none"/>
                <rect x="4" y="4" width="6" height="2" rx="0.5" fill="#141516"/>
                <rect x="4" y="22" width="6" height="2" rx="0.5" fill="#141516"/>
                <rect x="16" y="8" width="8" height="12" rx="1" stroke="#A88A58" strokeWidth="1.5" fill="none"/>
              </svg>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#141516] uppercase">CS</span>
              <span className="text-[9px] font-medium tracking-[0.15em] text-[#A88A58] uppercase">Fabrication</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-[11px] font-medium tracking-[0.08em] uppercase transition-colors duration-200 ${
                    isActive ? 'text-[#141516] font-semibold' : 'text-[#7A7D80] hover:text-[#141516]'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/contact"
              className="h-8 px-5 bg-[#141516] hover:bg-[#2C2F32] text-[#F7F6F1] text-[10px] font-semibold tracking-[0.12em] uppercase rounded-[3px] transition-all duration-300 flex items-center gap-2 group"
            >
              Request Proposal
              <span className="text-[#A88A58] transition-transform duration-300 group-hover:translate-x-0.5">→</span>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden text-[#141516] p-1"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div className={`fixed inset-y-0 right-0 w-72 bg-[#F7F6F1] border-l border-[#141516]/8 z-50 flex flex-col transform transition-transform duration-400 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between px-7 h-16 border-b border-[#141516]/6">
          <span className="text-[11px] font-semibold tracking-widest text-[#141516] uppercase">Menu</span>
          <button onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
            <X className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>
        <nav className="flex flex-col px-7 py-8 gap-6">
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `text-[13px] font-medium tracking-wide transition-colors duration-200 ${
                  isActive ? 'text-[#141516] font-semibold' : 'text-[#7A7D80] hover:text-[#141516]'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="px-7 pb-8 mt-auto">
          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full h-10 bg-[#141516] text-[#F7F6F1] text-[10px] font-semibold tracking-[0.12em] uppercase rounded-[3px] flex items-center justify-center gap-2"
          >
            Request Proposal →
          </Link>
        </div>
      </div>

      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-[#141516]/30 backdrop-blur-sm z-40"
        />
      )}
    </>
  );
};

export default Navbar;
