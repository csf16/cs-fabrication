import React from 'react';
import { GallerySection } from '../components/GallerySection';
import { useSEO } from '../hooks/useSEO';

export const GalleryPage: React.FC = () => {
  useSEO({
    title: 'Project Gallery | Solar Structures, C-Channel & Factory Photos — Central Structure Fabrication (CSF)',
    description:
      'Browse the Central Structure Fabrication (CSF) photo gallery of deployed solar mounting structures, cold-formed C-channel steel, hardware components, and our manufacturing facility in Amroha, Uttar Pradesh.',
    keywords:
      'Central Structure Fabrication gallery, CSF projects, solar mounting structure photos, solar structure gallery India, C channel steel photos, solar frame installation images, solar factory Amroha, utility solar structure images',
    canonical: 'https://www.csfabrication.in/gallery',
    ogTitle: 'Project & Manufacturing Gallery — Central Structure Fabrication (CSF)',
    ogDescription:
      'Real installation photos of ground mount, rooftop, and carport solar structures fabricated by Central Structure Fabrication, Amroha UP.',
  });

  return (
    <div className="w-full pt-16 bg-[#FFFFFF]">
      <GallerySection />
    </div>
  );
};

export default GalleryPage;
