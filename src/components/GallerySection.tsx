import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';

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
    badge: 'HDG STRUCTURAL STEEL',
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
    badge: 'CNC PUNCHED STEEL',
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
    badge: 'MEGA-SCALE FIELD',
    specs: 'Wind Surge Rating: 200 km/h // 25+ Year Service Life',
    dimensions: 'Multi-megawatt row array alignment',
    location: 'Rajasthan, India',
    desc: 'Utility-scale ground mounted solar farm built with CS Fabrication heavy-duty galvanized structural columns, wind-resistant purlins, and ground ramming.',
  },
  {
    id: 'solar-hardware-overview',
    title: 'Solar Mounting Hardware & Clamp System',
    category: 'hardware',
    categoryLabel: 'Mounting Hardware',
    image: '/gallery/solar_hardware_overview.jpg',
    badge: 'ALUMINIUM & HDG',
    specs: 'Anodized 6063-T6 & Hot-Dip Galvanized Press Formed',
    dimensions: 'Mid Clamps, End Clamps, Spring Nuts, Base Rails',
    location: 'Component Catalog',
    desc: 'Complete solar racking component suite including 35mm & 10mm mid-clamps, Z-end clamps, channel spring nuts, and heavy-duty base rail profiles.',
  },
  {
    id: 'cnc-cold-forming',
    title: 'Automated Cold Roll Forming Production Line',
    category: 'factory',
    categoryLabel: 'Factory & Manufacturing',
    image: '/gallery/cnc_cold_forming.jpg',
    badge: 'AUTOMATED ROLL LINE',
    specs: 'Multi-stage cold forming // Tolerance: ±0.1mm',
    dimensions: 'Coil feed capacity up to 3.5mm steel thickness',
    location: 'CS Plant — Line 01',
    desc: 'Automated multi-stand cold roll forming line shaping high-tensile structural steel coils into high-precision structural C-channels.',
  },
  {
    id: 'laser-punching-line',
    title: 'High-Speed CNC Slot Punching Line',
    category: 'factory',
    categoryLabel: 'Factory & Manufacturing',
    image: '/gallery/laser_punching_line.jpg',
    badge: 'PRECISION CNC',
    specs: 'High-speed automated punch press // Micro-deburring',
    dimensions: 'Custom punch slots, holes & modular knockout patterns',
    location: 'CS Plant — Line 03',
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
    <section id="gallery" className="bg-[#EAE8E1] border-y border-[#34383B]/10 py-24 md:py-36 relative overflow-hidden select-none">
      <div className="max-w-[1300px] mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="flex flex-col gap-3 max-w-2xl mb-12">
          <div className="flex items-center gap-3">
            <div className="w-8 h-[1px] bg-[#B59A68]" />
            <span className="text-[10px] font-mono tracking-[0.35em] text-[#B59A68] uppercase font-bold">
              MEDIA ARCHIVE & DOCUMENTATION
            </span>
            <div className="w-8 h-[1px] bg-[#B59A68]" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#17191B] tracking-tight font-sans uppercase">
            Project & Manufacturing Gallery
          </h2>

          <p className="text-sm md:text-base text-[#34383B] font-light leading-relaxed">
            Browse authentic high-resolution photography of engineered solar mounting structures, cold roll-formed slotted C-channels, CNC slot punching, and utility deployments.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {categories.map((cat) => {
            const count = cat.id === 'all'
              ? items.length
              : items.filter((i) => i.category === cat.id).length;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs font-mono tracking-wider uppercase rounded-sm transition-all duration-200 ${
                  activeCategory === cat.id
                    ? 'bg-[#17191B] text-[#F5F4EF] font-bold shadow-sm'
                    : 'bg-[#F5F4EF] hover:bg-white text-[#34383B] border border-[#34383B]/10'
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
                className={`group cursor-pointer bg-[#F5F4EF] border border-[#34383B]/10 hover:border-[#B59A68] rounded-sm overflow-hidden flex flex-col justify-between transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl relative ${
                  isFirst ? 'sm:col-span-2 lg:col-span-2' : ''
                }`}
              >
                {/* Photo container */}
                <div className={`relative w-full overflow-hidden bg-[#17191B] ${isFirst ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover filter brightness-[0.88] grayscale-[5%] group-hover:scale-105 group-hover:brightness-100 group-hover:grayscale-0 transition-all duration-700 ease-out"
                    loading="lazy"
                  />

                  {/* Corner aesthetic notches */}
                  <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#B59A68] opacity-80 pointer-events-none" />
                  <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-[#B59A68] opacity-80 pointer-events-none" />

                  {/* Badge */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 bg-[#17191B]/90 backdrop-blur-sm border border-[#B59A68]/40 rounded-sm">
                    <span className="text-[9px] font-mono tracking-widest text-[#B59A68] font-bold uppercase">
                      {item.badge}
                    </span>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                    <span className="text-[10px] font-mono text-[#F5F4EF] tracking-wider uppercase font-bold flex items-center gap-1.5">
                      <ZoomIn className="w-3.5 h-3.5 text-[#B59A68]" />
                      CLICK TO EXPAND HIGH-RES
                    </span>
                    <span className="text-[9px] font-mono text-[#B59A68] bg-[#17191B] px-2 py-0.5 rounded">
                      0{idx + 1}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 md:p-6 flex flex-col justify-between gap-3 flex-1 bg-[#F5F4EF]">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-mono text-[#B59A68] font-bold uppercase tracking-wider">
                        {item.categoryLabel}
                      </span>
                      {item.location && (
                        <span className="text-[9px] font-mono text-[#34383B]/50 uppercase">
                          {item.location}
                        </span>
                      )}
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-[#17191B] uppercase tracking-tight group-hover:text-[#B59A68] transition-colors duration-200">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#34383B]/80 font-light leading-relaxed line-clamp-2">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#34383B]/10 flex items-center justify-between">
                    <span className="text-[9px] font-mono text-[#34383B]/60 tracking-wide uppercase truncate max-w-[80%]">
                      {item.specs}
                    </span>
                    <span className="text-xs font-bold text-[#B59A68] group-hover:translate-x-1 transition-transform">
                      &rarr;
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Gallery Summary Stats Banner */}
        <div className="mt-16 bg-[#F5F4EF] border border-[#34383B]/15 rounded-sm p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex flex-col gap-1 text-center md:text-left">
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#B59A68] uppercase font-bold">
              MANUFACTURING & QUALITY STANDARDS
            </span>
            <h4 className="text-lg font-bold text-[#17191B] uppercase font-sans">
              All structural members certified to IS 2062 & IS 2629 standards
            </h4>
            <p className="text-xs text-[#34383B]/70 max-w-xl font-light">
              High-tensile hot-dip galvanized steel framing, custom punch slots, FEA certified wind deflection tolerances, and full structural compliance.
            </p>
          </div>
          <a
            href="#contact"
            className="px-6 py-3 bg-[#17191B] hover:bg-[#34383B] text-[#F5F4EF] text-xs font-mono font-bold tracking-widest uppercase rounded-sm transition-all duration-300 whitespace-nowrap shadow-sm"
          >
            REQUEST SAMPLES & CATALOG →
          </a>
        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX & SLIDESHOW */}
      {currentItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-md animate-fadeIn"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-mono text-base border border-white/20 transition-colors z-50"
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
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-mono text-lg border border-white/20 transition-colors z-50"
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
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-mono text-lg border border-white/20 transition-colors z-50"
            title="Next (Right Arrow)"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Modal Container */}
          <div
            className="relative max-w-5xl w-full max-h-[90vh] bg-[#17191B] border border-slate-700 rounded-sm overflow-hidden flex flex-col md:flex-row shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Full-res Image */}
            <div className="w-full md:w-[65%] bg-black/80 flex items-center justify-center p-4 min-h-[320px] md:min-h-[500px]">
              <img
                src={currentItem.image}
                alt={currentItem.title}
                className="max-w-full max-h-[75vh] object-contain rounded-sm shadow-lg"
              />
            </div>

            {/* Metadata sidebar */}
            <div className="w-full md:w-[35%] p-6 md:p-8 flex flex-col justify-between bg-[#131d2e] border-t md:border-t-0 md:border-l border-slate-700 text-slate-200">
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono tracking-widest text-[#B59A68] font-bold uppercase">
                    {currentItem.categoryLabel}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {(lightboxIndex || 0) + 1} / {filteredItems.length}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white uppercase font-sans leading-snug">
                  {currentItem.title}
                </h3>

                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  {currentItem.desc}
                </p>

                <div className="space-y-2 text-xs border-t border-slate-800 pt-4 mt-2">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-slate-400 font-mono text-[9px] uppercase tracking-wider">TECHNICAL SPECIFICATIONS</span>
                    <span className="font-semibold text-white font-mono text-[11px]">{currentItem.specs}</span>
                  </div>

                  {currentItem.dimensions && (
                    <div className="flex flex-col gap-0.5 pt-1">
                      <span className="text-slate-400 font-mono text-[9px] uppercase tracking-wider">DIMENSIONS & PROFILE</span>
                      <span className="font-semibold text-[#B59A68] font-mono text-[11px]">{currentItem.dimensions}</span>
                    </div>
                  )}

                  {currentItem.location && (
                    <div className="flex flex-col gap-0.5 pt-1">
                      <span className="text-slate-400 font-mono text-[9px] uppercase tracking-wider">PROJECT CONTEXT</span>
                      <span className="font-semibold text-slate-300 font-mono text-[11px]">{currentItem.location}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex gap-2">
                <a
                  href="#contact"
                  onClick={closeLightbox}
                  className="flex-1 py-3 bg-[#B59A68] hover:bg-[#c9ae7c] text-[#0d1624] text-xs font-mono font-bold tracking-wider text-center uppercase rounded-sm transition-colors shadow-sm"
                >
                  ENQUIRE ABOUT THIS SPEC →
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
