import React, { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, PhoneCall } from 'lucide-react';

interface NavbarProps {
  onEnquireClick: (service?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onEnquireClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { to: '/structures', label: 'Products' },
    { to: '/engineering', label: 'Capabilities' },
    { to: '/gallery', label: 'Projects' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#E5E7EB] shadow-xs'
            : 'bg-[#FFFFFF]/80 backdrop-blur-xs border-b border-[#E5E7EB]/60'
        }`}
      >
        <div className="max-w-[1320px] mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
          
          {/* CSF Precision Logo */}
          <Link to="/" className="flex items-center gap-3 group select-none">
            <div className="w-9 h-9 flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105">
              <svg viewBox="20 15 315 460" fill="none" className="w-full h-full">
                <path d="M163.34 339.98L83.93 306.45V104.85L322.15 206.31V148.52L31 25V341.39L163.34 397.42V339.97V339.98Z" fill="#0049CA"/>
                <path d="M322.15 292.33L163.34 224.84V253.68L322.15 321.01V465L189.81 408.79V351.44L269.22 384.97V356.3L110.41 288.81V144.99L322.16 234.98V292.33H322.15Z" fill="#0F2130"/>
              </svg>
            </div>
            <div className="flex flex-col leading-tight">
              <div className="flex items-center gap-1.5">
                <span className="text-base font-bold tracking-[0.04em] text-[#0F2130]">
                  CSF
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#0049CA]" />
              </div>
              <span className="text-[10px] font-semibold tracking-[0.02em] text-[#647488] uppercase">
                Central Structure Fabrication
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-[13px] font-medium tracking-[0.02em] font-sans transition-colors duration-200 ${
                    isActive
                      ? 'text-[#0049CA] font-semibold'
                      : 'text-[#0F2130] hover:text-[#0049CA]'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Primary CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => onEnquireClick('General Requirement')}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0049CA] hover:bg-[#003CAD] text-white text-[13px] font-semibold font-sans tracking-[0.02em] rounded-[3px] shadow-xs hover:shadow-sm transition-all duration-200"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Request a Call</span>
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#0F2130] hover:text-[#0049CA] focus:outline-none"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-[#E5E7EB] px-6 py-6 flex flex-col gap-4 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `text-sm font-medium py-2 border-b border-[#E5E7EB]/60 font-sans ${
                    isActive ? 'text-[#0049CA] font-bold' : 'text-[#0F2130]'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onEnquireClick('General Requirement');
              }}
              className="w-full mt-2 py-3 bg-[#0049CA] hover:bg-[#003CAD] text-white text-sm font-semibold rounded-[3px] flex items-center justify-center gap-2 shadow-sm font-sans"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Request a Call</span>
            </button>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
