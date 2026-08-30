import React from 'react';
import { GallerySection } from '../components/GallerySection';
import { useSEO } from '../hooks/useSEO';

export const GalleryPage: React.FC = () => {
  useSEO({
    title: 'Project Gallery | Solar Structures, C-Channel & Factory Photos - CS Fabrication',
    description:
      'Browse the CS Fabrication photo gallery of deployed solar mounting structures, cold-formed C-channel steel, hardware components, and manufacturing facility. Real project photos from utility-scale and rooftop solar installations across India.',
    keywords:
      'solar mounting structure photos, solar structure gallery India, C channel steel photos, solar frame installation images, solar factory India, utility solar structure images, rooftop solar frame photos, solar carport images, CS Fabrication projects',
    canonical: 'https://www.csfabrication.in/gallery',
    ogTitle: 'Project Gallery - CS Fabrication Solar Structures',
    ogDescription:
      'Real installation photos of ground mount, rooftop, and carport solar structures fabricated by CS Fabrication, Amroha UP.',
  });

  return (
    <div className="w-full pt-16 bg-[#EAE8E1]">
      <GallerySection />
    </div>
  );
};

export default GalleryPage;
