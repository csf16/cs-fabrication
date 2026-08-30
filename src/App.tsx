import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { EnquiryForm } from './components/EnquiryForm';

import { ComingSoonPage } from './pages/ComingSoonPage';

// Dedicated Pages
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

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="bg-[#F5F4EF] text-[#17191B] min-h-screen font-sans selection:bg-[#B59A68]/20 selection:text-[#17191B] flex flex-col justify-between">
        
        {/* Multi-Page Routes */}
        <main className="flex-grow w-full">
          <Routes>
            {/* Live Coming Soon Splash on Root */}
            <Route path="/" element={<ComingSoonPage onEnquireClick={triggerEnquiry} />} />
            
            {/* Full Website Routes with Header and Footer */}
            <Route
              path="/home"
              element={
                <>
                  <Navbar onEnquireClick={triggerEnquiry} />
                  <HomePage onEnquireClick={triggerEnquiry} />
                  <Footer onEnquireClick={triggerEnquiry} />
                </>
              }
            />
            
            {/* Dedicated Structures Page */}
            <Route
              path="/structures"
              element={
                <>
                  <Navbar onEnquireClick={triggerEnquiry} />
                  <StructuresPage onEnquireClick={triggerEnquiry} />
                  <Footer onEnquireClick={triggerEnquiry} />
                </>
              }
            />
            <Route path="/hardware" element={<Navigate to="/structures" replace />} />
            
            {/* Dedicated Gallery Page */}
            <Route
              path="/gallery"
              element={
                <>
                  <Navbar onEnquireClick={triggerEnquiry} />
                  <GalleryPage />
                  <Footer onEnquireClick={triggerEnquiry} />
                </>
              }
            />
            <Route path="/projects" element={<Navigate to="/gallery" replace />} />
            
            {/* Dedicated Engineering, About, Contact Pages */}
            <Route
              path="/engineering"
              element={
                <>
                  <Navbar onEnquireClick={triggerEnquiry} />
                  <EngineeringPage onEnquireClick={triggerEnquiry} />
                  <Footer onEnquireClick={triggerEnquiry} />
                </>
              }
            />
            <Route
              path="/about"
              element={
                <>
                  <Navbar onEnquireClick={triggerEnquiry} />
                  <AboutPage onEnquireClick={triggerEnquiry} />
                  <Footer onEnquireClick={triggerEnquiry} />
                </>
              }
            />
            <Route
              path="/contact"
              element={
                <>
                  <Navbar onEnquireClick={triggerEnquiry} />
                  <ContactPage />
                  <Footer onEnquireClick={triggerEnquiry} />
                </>
              }
            />
            
            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

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
