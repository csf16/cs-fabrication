import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { EnquiryForm } from './components/EnquiryForm';

import { ComingSoonPage } from './pages/ComingSoonPage';

// Dedicated Full Website Pages
import { HomePage } from './pages/HomePage';
import { StructuresPage } from './pages/StructuresPage';
import { GalleryPage } from './pages/GalleryPage';
import { EngineeringPage } from './pages/EngineeringPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

export const App: React.FC = () => {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('');

  // Global listener for custom open-enquiry events from buttons/cards
  useEffect(() => {
    const handleOpenEnquiry = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        setSelectedService(customEvent.detail);
      }
      setIsEnquiryOpen(true);
    };

    window.addEventListener('open-enquiry', handleOpenEnquiry);
    return () => window.removeEventListener('open-enquiry', handleOpenEnquiry);
  }, []);

  const triggerEnquiry = (service?: string) => {
    setSelectedService(service || '');
    setIsEnquiryOpen(true);
  };

  // Check if running on localhost vs live production
  const isLocal =
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1';

  // Secret preview flag so you or client can preview full site on live with ?preview=true
  const hasPreviewParam =
    typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).get('preview') === 'true';

  // If live on production (and no preview flag), strictly show the Launch / Coming Soon page
  if (!isLocal && !hasPreviewParam) {
    return (
      <BrowserRouter>
        <ComingSoonPage onEnquireClick={triggerEnquiry} />
        <EnquiryForm 
          isOpen={isEnquiryOpen} 
          onClose={() => setIsEnquiryOpen(false)} 
          preSelectedService={selectedService}
        />
      </BrowserRouter>
    );
  }

  // On Localhost (or with ?preview=true), serve the complete full multi-page website
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="bg-[#F5F4EF] text-[#17191B] min-h-screen font-sans selection:bg-[#B59A68]/20 selection:text-[#17191B] flex flex-col justify-between">
        
        {/* Navigation Sticky Dock */}
        <Navbar onEnquireClick={triggerEnquiry} />

        {/* Multi-Page Routes */}
        <main className="flex-grow w-full">
          <Routes>
            <Route path="/" element={<HomePage onEnquireClick={triggerEnquiry} />} />
            
            {/* Dedicated Structures Page */}
            <Route path="/structures" element={<StructuresPage onEnquireClick={triggerEnquiry} />} />
            <Route path="/hardware" element={<Navigate to="/structures" replace />} />
            
            {/* Dedicated Gallery Page */}
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/projects" element={<Navigate to="/gallery" replace />} />
            
            {/* Dedicated Engineering, About, Contact Pages */}
            <Route path="/engineering" element={<EngineeringPage onEnquireClick={triggerEnquiry} />} />
            <Route path="/about" element={<AboutPage onEnquireClick={triggerEnquiry} />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* Launch / Coming Soon page preview route */}
            <Route path="/coming-soon" element={<ComingSoonPage onEnquireClick={triggerEnquiry} />} />
            
            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Universal Footer */}
        <Footer onEnquireClick={triggerEnquiry} />

        {/* Quick RFQ Drawer Form */}
        <EnquiryForm 
          isOpen={isEnquiryOpen} 
          onClose={() => setIsEnquiryOpen(false)} 
          preSelectedService={selectedService}
        />
      </div>
    </BrowserRouter>
  );
};

export default App;
