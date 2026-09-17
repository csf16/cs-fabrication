import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';

import { ComingSoonPage } from './pages/ComingSoonPage';
import { ComingSoonClonePage } from './pages/ComingSoonClonePage';

// Dedicated CSF Full Website Pages
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { CapabilitiesPage } from './pages/CapabilitiesPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

const AppContent: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleEnquire = (service?: string) => {
    if (service) {
      navigate(`/contact?service=${encodeURIComponent(service)}`);
    } else {
      navigate('/contact');
    }
  };

  // Global listener for custom open-enquiry events from buttons/cards to navigate to /contact
  useEffect(() => {
    const handleOpenEnquiry = (e: Event) => {
      const customEvent = e as CustomEvent;
      handleEnquire(customEvent.detail);
    };

    window.addEventListener('open-enquiry', handleOpenEnquiry);
    return () => window.removeEventListener('open-enquiry', handleOpenEnquiry);
  }, [navigate]);

  // Check if running on localhost vs live production
  const isLocal =
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1';

  // Secret preview flag so you or client can preview full site on live with ?preview=true
  const hasPreviewParam =
    new URLSearchParams(location.search).get('preview') === 'true';

  // If user is previewing clone page on production or local
  const isCloneRoute =
    location.pathname === '/coming-soon-clone' ||
    location.pathname === '/clone';

  if (isCloneRoute) {
    return <ComingSoonClonePage onEnquireClick={handleEnquire} />;
  }

  // If live on production (and no preview flag), strictly show the Launch / Coming Soon page
  if (!isLocal && !hasPreviewParam) {
    return <ComingSoonPage onEnquireClick={handleEnquire} />;
  }

  // On Localhost (or with ?preview=true), serve the complete full multi-page website
  return (
    <div className="bg-[#FFFFFF] text-[#0F2130] min-h-screen font-sans selection:bg-[#0057D9] selection:text-white flex flex-col justify-between">
      {/* Navigation Sticky Dock */}
      <Navbar onEnquireClick={handleEnquire} />

      {/* Multi-Page Routes */}
      <main className="flex-grow w-full">
        <Routes>
          <Route path="/" element={<HomePage onEnquireClick={handleEnquire} />} />
          
          {/* Dedicated Products Page */}
          <Route path="/products" element={<ProductsPage onEnquireClick={handleEnquire} />} />
          <Route path="/structures" element={<ProductsPage onEnquireClick={handleEnquire} initialTab="structural" />} />
          <Route path="/hardware" element={<ProductsPage onEnquireClick={handleEnquire} initialTab="components" />} />
          
          {/* Dedicated Capabilities & Engineering Page */}
          <Route path="/capabilities" element={<CapabilitiesPage onEnquireClick={handleEnquire} />} />
          <Route path="/engineering" element={<Navigate to="/capabilities" replace />} />
          
          {/* Dedicated Projects & Applications Page */}
          <Route path="/projects" element={<ProjectsPage onEnquireClick={handleEnquire} />} />
          <Route path="/gallery" element={<Navigate to="/projects" replace />} />
          
          {/* Dedicated About & Contact Pages */}
          <Route path="/about" element={<AboutPage onEnquireClick={handleEnquire} />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Launch / Coming Soon page preview route */}
          <Route path="/coming-soon" element={<ComingSoonPage onEnquireClick={handleEnquire} />} />
          <Route path="/coming-soon-clone" element={<ComingSoonClonePage onEnquireClick={handleEnquire} />} />
          <Route path="/clone" element={<ComingSoonClonePage onEnquireClick={handleEnquire} />} />
          
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Universal Footer */}
      <Footer onEnquireClick={handleEnquire} />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
