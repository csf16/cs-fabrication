import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, PhoneCall } from 'lucide-react';
import { CSFLogo } from './CSFLogo';

interface NavbarProps {
  onEnquireClick: (service?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onEnquireClick: _onEnquireClick }) => {
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
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
    { to: '/capabilities', label: 'Capabilities' },
    { to: '/projects', label: 'Projects' },
    { to: '/about', label: 'About' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#E5E7EB] shadow-xs'
          : 'bg-[#FFFFFF]/90 backdrop-blur-xs border-b border-[#E5E7EB]/60'
      }`}
    >
      <div className="max-w-[1320px] mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
        
        {/* Official CSF Main Brand Logo */}
        <Link to="/" className="flex items-center group py-1">
          <CSFLogo
            className="h-9 sm:h-11 w-auto transition-transform duration-200 group-hover:scale-[1.02]"
            variant="dark"
            showText={true}
          />
        </Link>

        {/* Desktop Navigation with Distinct Page Links */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => {
            const active = isActive(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`text-[13px] tracking-[0.02em] font-sans transition-colors duration-200 py-1 border-b-2 ${
                  active
                    ? 'font-bold text-[#0049CA] border-[#0049CA]'
                    : 'font-medium text-[#0F2130] hover:text-[#0049CA] border-transparent'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Primary CTA Button — navigates directly to /contact */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0049CA] hover:bg-[#003CAD] text-white text-[13px] font-semibold font-sans tracking-[0.02em] rounded-none shadow-xs hover:shadow-sm transition-all duration-200"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Request a Call</span>
          </Link>
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
        <div className="md:hidden bg-white border-b border-[#E5E7EB] px-6 py-6 flex flex-col gap-3 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
          {navLinks.map((link) => {
            const active = isActive(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm py-2.5 border-b border-[#E5E7EB]/60 font-sans flex items-center justify-between ${
                  active
                    ? 'font-bold text-[#0049CA]'
                    : 'font-medium text-[#0F2130] hover:text-[#0049CA]'
                }`}
              >
                <span>{link.label}</span>
                {active && <span className="w-1.5 h-1.5 bg-[#0049CA]" />}
              </Link>
            );
          })}
          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full mt-3 py-3 bg-[#0049CA] hover:bg-[#003CAD] text-white text-sm font-semibold rounded-none flex items-center justify-center gap-2 shadow-sm font-sans"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Request a Call</span>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
