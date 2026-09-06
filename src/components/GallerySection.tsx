import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn, ArrowRight, CheckCircle2 } from 'lucide-react';

export interface GalleryItem {
  id: string;
  title: string;
  category: 'structures' | 'channels' | 'hardware' | 'factory';
  categoryLabel: string;
  image: string;
  badge: string;
  dimensions?: string;
  location?: string;
  specs: string;
  desc: string;
  featured?: boolean;
}

const DEFAULT_GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'solar-mounting-framework',
    title: 'Engineered Ground-Mount Solar Framework',
    category: 'structures',
    categoryLabel: 'Solar Structures',
    image: '/gallery/solar_mounting_framework.png',
    badge: 'HDG Structural Steel',
    specs: 'IS 2062 Grade E250 // 85+ Microns Zinc Coating',
    dimensions: 'Dual-post fixed tilt structure with rafter cantilevers',
    location: 'Utility Deployment Phase 1',
    desc: 'High-tensile galvanized steel mounting framework assembled using precision cold-rolled slotted C-channels, knee-brace supports, and multi-span purlin rails.',
    featured: true,
  },
  {
    id: 'slotted-c-channels-raw',
    title: 'Slotted Strut Channels (41×41 & 41×21mm)',
    category: 'channels',
    categoryLabel: 'C-Channels & Rails',
    image: '/gallery/slotted_strut_channel.png',
    badge: 'CNC Punched Steel',
    specs: '28×14mm Oval Slots // Continuous 160mm Pitch',
    dimensions: '41mm × 41mm × 2.5mm Lip Profile',
    location: 'Rolling Mill Output',
    desc: 'Heavy-gauge cold-formed slotted strut channels featuring continuous CNC oval punch slots and 90-degree inward return lips with downward retention curls.',
    featured: true,
  },
  {
    id: 'utility-solar-farm',
    title: '80 MW Landmark Solar Park Racking',
    category: 'structures',
    categoryLabel: 'Solar Structures',
    image: '/gallery/utility_solar_farm.jpg',
    badge: 'Mega-Scale Field',
    specs: 'Wind Surge Rating: 200 km/h // 25+ Year Service Life',
    dimensions: 'Multi-megawatt row array alignment',
    location: 'Rajasthan, India',
    desc: 'Utility-scale ground mounted solar farm built with CSF heavy-duty galvanized structural columns, wind-resistant purlins, and ground ramming.',
  },
  {
    id: 'solar-hardware-overview',
    title: 'Solar Mounting Hardware & Clamp System',
    category: 'hardware',
    categoryLabel: 'Mounting Hardware',
    image: '/gallery/solar_hardware_overview.jpg',
    badge: 'Aluminium & HDG',
    specs: 'Anodized 6063-T6 & Hot-Dip Galvanized Press Formed',
    dimensions: 'Mid Clamps, End Clamps, Spring Nuts, Base Rails',
    location: 'Component Catalog',
    desc: 'Complete solar racking component suite including 35mm & 40mm mid-clamps, Z-end clamps, channel spring nuts, and heavy-duty base rail profiles.',
  },
  {
    id: 'cnc-cold-forming',
    title: 'Automated Cold Roll Forming Production Line',
    category: 'factory',
    categoryLabel: 'Factory & Manufacturing',
    image: '/gallery/cnc_cold_forming.jpg',
    badge: 'Automated Roll Line',
    specs: 'Multi-stage cold forming // Tolerance: ±0.1mm',
    dimensions: 'Coil feed capacity up to 3.5mm steel thickness',
    location: 'CSF Plant — Line 01',
    desc: 'Automated multi-stand cold roll forming line shaping high-tensile structural steel coils into high-precision structural C-channels.',
  },
  {
    id: 'laser-punching-line',
    title: 'High-Speed CNC Slot Punching Line',
    category: 'factory',
    categoryLabel: 'Factory & Manufacturing',
    image: '/gallery/laser_punching_line.jpg',
    badge: 'Precision CNC',
    specs: 'High-speed automated punch press // Micro-deburring',
    dimensions: 'Custom punch slots, holes & modular knockout patterns',
    location: 'CSF Plant — Line 03',
    desc: 'Continuous CNC punch stamping station delivering uniform oval slots for rapid, bolt-together on-site assembly with zero on-site drilling required.',
  },
  {
    id: 'aluminium-41x61-base-rail',
    title: 'Heavy Duty 41×61mm Aluminium Base Rail',
    category: 'channels',
    categoryLabel: 'C-Channels & Rails',
    image: '/hardware/aluminium-41x61-base-rail.jpg',
    badge: 'AL 6005A-T6',
    specs: 'Dual Wing Mounting Flanges // Clear Anodized 15μm',
    dimensions: '41mm × 61mm Box Section',
    location: 'Elevated & Carport Racking',
    desc: 'Engineered high-span aluminium mounting rail with bottom track T-bolt slot and dual wing flanges for long-span commercial carport rafters.',
  },
  {
    id: 'middle-clamp-hdg',
    title: 'Hot-Dip Galvanized Heavy Duty Middle Clamp',
    category: 'hardware',
    categoryLabel: 'Mounting Hardware',
    image: '/hardware/middle-clamp-hdg.jpg',
    badge: 'IS 2062 HDG',
    specs: '4.0mm Press-Formed Steel // 85+ Microns Zinc Coating',
    dimensions: '50mm × 50mm U-Profile',
    location: 'Coastal & High Wind Arrays',
    desc: 'High-strength galvanized steel saddle clamp designed for high-salinity coastal environments and extreme wind uplift zones.',
  },
];

export const GallerySection: React.FC = () => {
  const [items] = useState<GalleryItem[]>(DEFAULT_GALLERY_ITEMS);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'structures', label: 'Solar Structures' },
    { id: 'channels', label: 'C-Channels & Rails' },
    { id: 'hardware', label: 'Mounting Hardware' },
    { id: 'factory', label: 'Factory & Machinery' },
  ];

  const filteredItems = activeCategory === 'all'
    ? items
    : items.filter((item) => item.category === activeCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextLightbox = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
  }, [lightboxIndex, filteredItems.length]);

  const prevLightbox = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
  }, [lightboxIndex, filteredItems.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextLightbox();
      if (e.key === 'ArrowLeft') prevLightbox();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, nextLightbox, prevLightbox]);

  const currentItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <section id="gallery" className="bg-[#FFFFFF] py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-[1340px] mx-auto px-6 md:px-12 lg:px-20">
        
        {/* Header */}
        <div className="flex flex-col gap-4 max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0049CA]/10 border border-[#0049CA]/20 text-[#0049CA] text-xs font-semibold uppercase tracking-wider w-fit">
            <span className="w-2 h-2 rounded-full bg-[#0049CA]" />
            <span>Media Archive &amp; Documentation</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F2130] tracking-tight uppercase leading-[1.12]">
            Project &amp; Manufacturing Gallery
          </h2>

          <p className="text-base text-[#647488] font-normal leading-relaxed">
            Browse authentic high-resolution photography of engineered solar mounting structures, cold roll-formed slotted C-channels, CNC slot punching, and utility-scale deployments across India.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2.5 mb-10">
          {categories.map((cat) => {
            const count = cat.id === 'all'
              ? items.length
              : items.filter((i) => i.category === cat.id).length;

            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 text-xs font-semibold tracking-wide uppercase rounded-none transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#0049CA] text-white shadow-md shadow-[#0049CA]/20'
                    : 'bg-[#F8FAFC] hover:bg-white text-[#647488] hover:text-[#0F2130] border border-[#E5E7EB]'
                }`}
              >
                {cat.label} ({count})
              </button>
            );
          })}
        </div>

        {/* Asymmetric Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredItems.map((item, idx) => {
            const isFirst = idx === 0 && activeCategory === 'all';
            return (
              <div
                key={item.id}
                onClick={() => openLightbox(idx)}
                className={`group cursor-pointer bg-white border border-[#E5E7EB] hover:border-[#0049CA] rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl relative ${
                  isFirst ? 'sm:col-span-2 lg:col-span-2' : ''
                }`}
              >
                {/* Photo container */}
                <div className={`relative w-full overflow-hidden bg-[#0F2130] ${isFirst ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover filter brightness-[0.92] group-hover:scale-105 group-hover:brightness-100 transition-all duration-700 ease-out"
                    loading="lazy"
                  />

                  {/* Badge */}
                  <div className="absolute top-3.5 right-3.5 px-3 py-1 bg-[#0F2130]/90 backdrop-blur-sm border border-white/20 rounded-lg">
                    <span className="text-[10px] tracking-wider text-white font-semibold uppercase">
                      {item.badge}
                    </span>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F2130]/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-5">
                    <span className="text-xs text-white tracking-wide uppercase font-semibold flex items-center gap-2">
                      <ZoomIn className="w-4 h-4 text-[#0049CA]" />
                      Click to expand high-res
                    </span>
                    <span className="text-[10px] text-white/90 bg-[#0049CA] px-2.5 py-0.5 rounded-md font-semibold">
                      0{idx + 1}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col justify-between gap-4 flex-1 bg-white">
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold text-[#0049CA] uppercase tracking-wider">
                        {item.categoryLabel}
                      </span>
                      {item.location && (
                        <span className="text-[11px] font-medium text-[#647488]">
                          {item.location}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-[#0F2130] leading-snug group-hover:text-[#0049CA] transition-colors duration-200">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#647488] leading-relaxed line-clamp-2">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-3.5 border-t border-[#E5E7EB] flex items-center justify-between">
                    <span className="text-[11px] text-[#647488] font-medium truncate max-w-[80%]">
                      {item.specs}
                    </span>
                    <span className="text-sm font-bold text-[#0049CA] group-hover:translate-x-1 transition-transform">
                      &rarr;
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Gallery Summary Stats Banner */}
        <div className="mt-16 bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex flex-col gap-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#0049CA] uppercase tracking-wider justify-center md:justify-start">
              <CheckCircle2 className="w-4 h-4 text-[#0049CA]" />
              <span>Manufacturing &amp; Quality Standards</span>
            </div>
            <h4 className="text-xl font-bold text-[#0F2130] uppercase">
              All structural members certified to IS 2062 &amp; IS 2629 standards
            </h4>
            <p className="text-sm text-[#647488] max-w-xl font-normal leading-relaxed">
              High-tensile hot-dip galvanized steel framing, custom punch slots, FEA certified wind deflection tolerances, and full structural compliance.
            </p>
          </div>
          <button
            onClick={() => {
              const formEl = document.getElementById('request-a-call');
              if (formEl) {
                formEl.scrollIntoView({ behavior: 'smooth' });
              } else {
                window.dispatchEvent(new CustomEvent('open-enquiry', { detail: 'Project Gallery Samples' }));
              }
            }}
            className="px-6 py-3.5 bg-[#0049CA] hover:bg-[#003bb0] text-white text-xs font-semibold tracking-wider uppercase rounded-none transition-all duration-200 whitespace-nowrap shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer"
          >
            <span>Request Samples &amp; Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX & SLIDESHOW */}
      {currentItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-[#0F2130]/90 backdrop-blur-md animate-fadeIn"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/20 transition-colors z-50 cursor-pointer"
            title="Close (ESC)"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Previous button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevLightbox();
            }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/20 transition-colors z-50 cursor-pointer"
            title="Previous (Left Arrow)"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextLightbox();
            }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/20 transition-colors z-50 cursor-pointer"
            title="Next (Right Arrow)"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Modal Container */}
          <div
            className="relative max-w-5xl w-full max-h-[90vh] bg-[#0F2130] border border-white/15 rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Full-res Image */}
            <div className="w-full md:w-[65%] bg-black/50 flex items-center justify-center p-4 min-h-[320px] md:min-h-[500px]">
              <img
                src={currentItem.image}
                alt={currentItem.title}
                className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-lg"
              />
            </div>

            {/* Metadata sidebar */}
            <div className="w-full md:w-[35%] p-6 md:p-8 flex flex-col justify-between bg-[#152738] border-t md:border-t-0 md:border-l border-white/10 text-white">
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-[#0049CA] bg-[#0049CA]/15 px-3 py-1 rounded-full uppercase tracking-wider">
                    {currentItem.categoryLabel}
                  </span>
                  <span className="text-xs text-[#647488] font-medium">
                    {(lightboxIndex || 0) + 1} / {filteredItems.length}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white uppercase leading-snug">
                  {currentItem.title}
                </h3>

                <p className="text-xs text-[#E5E7EB] font-normal leading-relaxed">
                  {currentItem.desc}
                </p>

                <div className="space-y-3 text-xs border-t border-white/10 pt-4 mt-2">
                  <div className="flex flex-col gap-1">
                    <span className="text-[#647488] text-[10px] uppercase font-semibold tracking-wider">Technical Specifications</span>
                    <span className="font-semibold text-white text-xs">{currentItem.specs}</span>
                  </div>

                  {currentItem.dimensions && (
                    <div className="flex flex-col gap-1 pt-1">
                      <span className="text-[#647488] text-[10px] uppercase font-semibold tracking-wider">Dimensions &amp; Profile</span>
                      <span className="font-semibold text-[#0049CA] text-xs">{currentItem.dimensions}</span>
                    </div>
                  )}

                  {currentItem.location && (
                    <div className="flex flex-col gap-1 pt-1">
                      <span className="text-[#647488] text-[10px] uppercase font-semibold tracking-wider">Project Context</span>
                      <span className="font-medium text-[#E5E7EB] text-xs">{currentItem.location}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 flex gap-2">
                <button
                  onClick={() => {
                    closeLightbox();
                    window.dispatchEvent(new CustomEvent('open-enquiry', { detail: currentItem.title }));
                  }}
                  className="w-full py-3.5 bg-[#0049CA] hover:bg-[#003bb0] text-white text-xs font-semibold tracking-wider text-center uppercase rounded-none transition-all shadow-md cursor-pointer"
                >
                  Enquire About This Spec →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
