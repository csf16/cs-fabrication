import React, { useState } from 'react';

interface HardwareItem {
  id: string;
  name: string;
  category: 'clamps' | 'channels' | 'accessories' | 'roof';
  image: string;
  material: string;
  finish: string;
  specs: {
    dimensions: string;
    thickness?: string;
    boltSize?: string;
    moduleThickness?: string;
    standard: string;
  };
  description: string;
}

const HARDWARE_ITEMS: HardwareItem[] = [
  {
    id: 'aluminium-middle-clamp-35',
    name: 'Aluminium Middle Clamp 35',
    category: 'clamps',
    image: '/hardware/aluminium-middle-clamp-35.jpg',
    material: 'Aluminium 6063-T6 Extrusion',
    finish: 'Natural Anodized (15+ microns)',
    specs: {
      dimensions: '50mm × 35mm × 25mm',
      thickness: '3.2mm Wall',
      boltSize: 'M8 Hex Socket Head Bolt',
      moduleThickness: '30mm - 40mm Framed Panels',
      standard: 'IS 2062 / EN 755',
    },
    description: 'High-strength extruded aluminium mid-clamp engineered to secure adjacent framed solar panels onto strut channels and mounting rails.',
  },
  {
    id: 'aluminium-middle-clamp-10mm',
    name: 'Aluminium Middle Clamp 10mm',
    category: 'clamps',
    image: '/hardware/aluminium-middle-clamp-10mm.jpg',
    material: 'Aluminium 6063-T6',
    finish: 'Clear Anodized / Mill Finish',
    specs: {
      dimensions: '50mm × 28mm × 10mm Gap',
      thickness: '3.0mm Heavy Ribbed',
      boltSize: 'M8 Center Slot Bolt',
      moduleThickness: 'Thin-film / BIPV & Standard Panels',
      standard: 'ASTM B221 / DIN EN 573',
    },
    description: 'Stepped middle clamp profile designed for compact inter-module spacing and maximum mechanical uplift resistance.',
  },
  {
    id: 'aluminium-end-clamp',
    name: 'Aluminium End Clamp',
    category: 'clamps',
    image: '/hardware/aluminium-end-clamp.jpg',
    material: 'Aluminium 6063-T6 High Tensile',
    finish: 'Anodized Silver (Anti-Corrosion)',
    specs: {
      dimensions: '40mm × 35mm / 40mm Z-Profile',
      thickness: '3.5mm Reinforced Spine',
      boltSize: 'M8 Bolt + Flange Nut',
      moduleThickness: '30mm, 35mm, 40mm Height Options',
      standard: 'JIS H4100 / EN 12020',
    },
    description: 'Precision Z-flange end clamp for locking the perimeter solar modules securely to the outer edge of the mounting structure.',
  },
  {
    id: 'end-clamp-hdg',
    name: 'End Clamp ( HDG )',
    category: 'clamps',
    image: '/hardware/end-clamp-hdg.jpg',
    material: 'High Tensile Structural Carbon Steel',
    finish: 'Hot-Dip Galvanized (85+ microns)',
    specs: {
      dimensions: '50mm × 45mm × 40mm',
      thickness: '4.0mm Press-Formed Steel',
      boltSize: 'M10 / M8 Fastener Slot',
      moduleThickness: 'Heavy-Duty Industrial Solar Arrays',
      standard: 'IS 2062 Grade E250 / ASTM A123',
    },
    description: 'Heavy gauge hot-dip galvanized steel end clamp built for utility-scale ground mount solar projects with extreme wind load ratings.',
  },
  {
    id: 'aluminium-strut-channel',
    name: 'Aluminium Strut Channel',
    category: 'channels',
    image: '/hardware/aluminium-strut-channel.jpg',
    material: 'Extruded Aluminium Alloy 6063-T6',
    finish: 'Silver Anodized / Mill Finish',
    specs: {
      dimensions: '41mm × 41mm (Lengths: 2.1m, 3.2m, 4.2m)',
      thickness: '2.0mm - 2.5mm Lip Wall',
      boltSize: 'Accepts M8 / M10 Spring Channel Nuts',
      standard: 'BS EN 755-9 / ASTM B317',
    },
    description: 'Lightweight, ultra-durable extruded aluminum strut channel with inward return lips for rapid rooftop and carport installations.',
  },
  {
    id: 'aluminium-micro-rail',
    name: 'Aluminium Micro Rail',
    category: 'channels',
    image: '/hardware/aluminium-micro-rail.jpg',
    material: 'Structural Aluminium 6005-T5',
    finish: 'Electrolytic Anodized (12-15μm)',
    specs: {
      dimensions: '150mm / 250mm / 400mm Cut Lengths',
      thickness: '2.2mm Profile',
      boltSize: 'EPDM Rubber Underlay + Self-Drilling Screws',
      standard: 'AS/NZS 1170.2 Wind Certified',
    },
    description: 'Short-span direct-to-sheet micro rail system optimized for trapezoidal metal roof solar installations with minimal ballast weight.',
  },
  {
    id: 'gi-strut-channel',
    name: 'GI Strut Channel',
    category: 'channels',
    image: '/hardware/gi-strut-channel.jpg',
    material: 'Galvanized Structural Steel IS 2062',
    finish: 'Hot-Dip Galvanized / Pre-Galvanized (275-550 GSM)',
    specs: {
      dimensions: '41mm × 41mm & 41mm × 21mm (3m / 6m)',
      thickness: '1.6mm, 2.0mm, 2.5mm',
      boltSize: '28×14mm Oval Slotted Punch',
      standard: 'IS 277 / ASTM A653 / IS 4759',
    },
    description: 'Heavy duty cold roll-formed slotted strut channel engineered for mega-watt ground mount frameworks and industrial shed racking.',
  },
  {
    id: 'spring-nut',
    name: 'Spring Nut',
    category: 'accessories',
    image: '/hardware/spring-nut.jpg',
    material: 'Case-Hardened Carbon Steel / SS304',
    finish: 'Electro-Galvanized Zinc Plated / Dacromet',
    specs: {
      dimensions: 'M6 / M8 / M10 Thread Pitch',
      thickness: '6mm - 8mm Thread Depth',
      boltSize: 'With High-Tensile Helical Compression Spring',
      standard: 'DIN 934 / ISO 4032 Channel Spec',
    },
    description: 'Instant locking channel nut with grooved teeth and spring attachment that retains position inside strut channels prior to torque tightening.',
  },
  {
    id: 'ms-roof-clamp',
    name: 'MS Roof Clamp',
    category: 'roof',
    image: '/hardware/ms-roof-clamp.jpg',
    material: 'Mild Steel / Formed SS304',
    finish: 'Hot-Dip Galvanized / Zinc-Nickel Plating',
    specs: {
      dimensions: '85mm × 45mm × 95mm Adjustable',
      thickness: '3.0mm Stamped Bracket',
      boltSize: 'Dual M8 Clamping Bolts',
      standard: 'Standing Seam / Klip-Lok Compatible',
    },
    description: 'Non-penetrating metal roof clamp designed for standing seam and seam-lock metal roof profiles without piercing the water-tight membrane.',
  },
  {
    id: 'aluminium-mini-strut-channel-41x21',
    name: 'Aluminium Mini Strut Channel 41X21',
    category: 'channels',
    image: '/hardware/aluminium-mini-strut-channel-41x21.jpg',
    material: 'Aluminium Alloy 6063-T6',
    finish: 'Silver Anodized / Marine Grade',
    specs: {
      dimensions: '41mm Width × 21mm Depth',
      thickness: '1.8mm - 2.2mm Wall',
      boltSize: 'M8 / M10 Strut Fasteners',
      standard: 'ISO 9001:2015 / EN 12020',
    },
    description: 'Low-profile compact strut rail ideal for low-clearance residential rooftops, flush mounts, and secondary purlin cross-bracing.',
  },
  {
    id: 'aluminium-41x61-base-rail',
    name: 'Aluminium 41X61 Base Rail',
    category: 'channels',
    image: '/hardware/aluminium-41x61-base-rail.jpg',
    material: 'Structural Aluminium 6005A-T6',
    finish: 'Clear Anodized (15+ microns)',
    specs: {
      dimensions: '41mm × 61mm Heavy Box Section',
      thickness: '2.5mm Flange with Dual Wing Base',
      boltSize: 'Bottom Track M10 T-Bolt Channel',
      standard: 'Eurocode 9 / AS/NZS 1664.2',
    },
    description: 'Heavy duty high-span base rail with side wing mounts for elevated solar ground mounts and long-span commercial carport rafters.',
  },
  {
    id: 'middle-clamp-hdg',
    name: 'Middle Clamp ( HDG )',
    category: 'clamps',
    image: '/hardware/middle-clamp-hdg.jpg',
    material: 'High-Tensile Structural Carbon Steel',
    finish: 'Hot-Dip Galvanized (85+ microns)',
    specs: {
      dimensions: '50mm × 50mm U-Profile Center Saddle',
      thickness: '4.0mm Formed Steel',
      boltSize: 'M8 / M10 Center Bolt Hole',
      standard: 'IS 2062 / ASTM A123 Hot Dip',
    },
    description: 'High-capacity hot-dip galvanized steel center clamp engineered for harsh coastal, high-salinity, and extreme-weather solar installations.',
  },
];

export const SolarHardwareCatalog: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<HardwareItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Hardware (12)' },
    { id: 'clamps', label: 'Clamps & Saddles (5)' },
    { id: 'channels', label: 'Strut Channels & Rails (5)' },
    { id: 'roof', label: 'Rooftop Mounts (1)' },
    { id: 'accessories', label: 'Fasteners & Spring Nuts (1)' },
  ];

  const filteredItems = activeCategory === 'all'
    ? HARDWARE_ITEMS
    : HARDWARE_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section id="hardware" className="relative w-full py-24 bg-[#0a1220] text-[#F5F4EF] overflow-hidden border-t border-b border-slate-800">
      {/* Aerial Solar Farm Background Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.16] pointer-events-none bg-cover bg-center"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 30%, rgba(30, 64, 110, 0.7), rgba(10, 18, 32, 0.98))'
        }}
      />
      
      {/* Grid line pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        {/* Header matching user's reference */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-[1px] bg-[#B59A68]" />
            <span className="text-[11px] font-mono tracking-[0.35em] text-[#B59A68] uppercase font-bold">
              CS FABRICATION · MOUNTING HARDWARE
            </span>
            <div className="w-8 h-[1px] bg-[#B59A68]" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-sans uppercase">
            Solar Panel Mounting Structure and Hardware
          </h2>

          <div className="w-24 h-[3px] bg-[#B59A68] mt-4 mb-4 rounded-full" />

          <p className="text-sm md:text-base text-slate-400 max-w-2xl font-light">
            Engineered aluminium and hot-dip galvanized mounting components designed for utility-scale solar farms, industrial rooftop sheds, and carport racking systems.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs font-mono tracking-wider uppercase rounded-sm transition-all duration-200 ${
                  activeCategory === cat.id
                    ? 'bg-[#B59A68] text-[#0d1624] font-bold shadow-md shadow-[#B59A68]/20'
                    : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300 border border-slate-700/50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 4-Column x 3-Row Grid Matching User Photo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group cursor-pointer flex flex-col items-center transition-all duration-300 hover:-translate-y-1.5"
            >
              {/* Image Frame with Double Border Effect */}
              <div className="relative w-full aspect-[4/3] rounded-sm overflow-hidden bg-black/40 border border-slate-700/80 p-2 group-hover:border-[#B59A68] transition-colors duration-300 shadow-lg">
                <div className="relative w-full h-full rounded-sm overflow-hidden border border-white/20">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-3">
                    <span className="text-[10px] font-mono tracking-wider text-[#B59A68] bg-[#0d1624]/90 px-2.5 py-1 rounded border border-[#B59A68]/40 uppercase font-bold">
                      VIEW SPECIFICATIONS →
                    </span>
                  </div>
                </div>
              </div>

              {/* Product Title matching reference */}
              <div className="mt-3.5 text-center flex flex-col items-center">
                <h3 className="text-sm md:text-[15px] font-bold text-white tracking-wide group-hover:text-[#B59A68] transition-colors duration-200">
                  {item.name}
                </h3>
                <span className="text-[11px] font-mono text-slate-400 mt-0.5">
                  {item.material.split(' ')[0]} · {item.finish.includes('HDG') || item.finish.includes('Galvanized') ? 'Hot-Dip Galv' : 'Anodized'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-16 p-8 rounded-sm bg-gradient-to-r from-slate-900/90 via-slate-800/80 to-slate-900/90 border border-slate-700/60 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex flex-col gap-1 text-center md:text-left">
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#B59A68] uppercase font-bold">
              BULK SUPPLY & CUSTOM PROFILES
            </span>
            <h4 className="text-xl font-bold text-white uppercase">
              Need custom punch slots, custom lengths, or mill-test certificates?
            </h4>
            <p className="text-xs text-slate-400 max-w-xl">
              We fabricate bespoke strut dimensions, custom-anodized clamps, and heavy-gauge HDG brackets to exact project specifications.
            </p>
          </div>
          <a
            href="#proposal"
            className="px-6 py-3 bg-[#B59A68] hover:bg-[#c9ae7c] text-[#0d1624] text-xs font-mono font-bold tracking-widest uppercase rounded-sm transition-all duration-300 shadow-md whitespace-nowrap"
          >
            REQUEST HARDWARE QUOTE →
          </a>
        </div>
      </div>

      {/* Interactive Detail Modal Drawer */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-[#131d2e] border border-slate-700 rounded-sm p-6 md:p-8 shadow-2xl text-slate-200 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center font-mono text-sm border border-slate-700 transition-colors"
            >
              ✕
            </button>

            <div className="flex flex-col md:flex-row gap-6">
              {/* Product Image */}
              <div className="w-full md:w-1/2 aspect-[4/3] rounded-sm overflow-hidden border border-slate-700 bg-black/50 p-2 flex-shrink-0">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  className="w-full h-full object-cover rounded-sm border border-white/20"
                />
              </div>

              {/* Details & Specs */}
              <div className="flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono tracking-widest text-[#B59A68] uppercase font-bold">
                      CS COMPONENT SPECIFICATION
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white uppercase font-sans">
                    {selectedItem.name}
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed font-light">
                    {selectedItem.description}
                  </p>

                  <div className="mt-4 space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-slate-800">
                      <span className="text-slate-400 font-mono">MATERIAL</span>
                      <span className="font-semibold text-white">{selectedItem.material}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800">
                      <span className="text-slate-400 font-mono">SURFACE FINISH</span>
                      <span className="font-semibold text-[#B59A68]">{selectedItem.finish}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800">
                      <span className="text-slate-400 font-mono">DIMENSIONS</span>
                      <span className="font-semibold text-white">{selectedItem.specs.dimensions}</span>
                    </div>
                    {selectedItem.specs.thickness && (
                      <div className="flex justify-between py-1 border-b border-slate-800">
                        <span className="text-slate-400 font-mono">THICKNESS</span>
                        <span className="font-semibold text-white">{selectedItem.specs.thickness}</span>
                      </div>
                    )}
                    {selectedItem.specs.boltSize && (
                      <div className="flex justify-between py-1 border-b border-slate-800">
                        <span className="text-slate-400 font-mono">FASTENER FIT</span>
                        <span className="font-semibold text-white">{selectedItem.specs.boltSize}</span>
                      </div>
                    )}
                    <div className="flex justify-between py-1 border-b border-slate-800">
                      <span className="text-slate-400 font-mono">STANDARD</span>
                      <span className="font-semibold text-slate-300">{selectedItem.specs.standard}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <a
                    href="#proposal"
                    onClick={() => setSelectedItem(null)}
                    className="flex-1 py-2.5 bg-[#B59A68] hover:bg-[#c9ae7c] text-[#0d1624] text-xs font-mono font-bold tracking-wider text-center uppercase rounded-sm transition-colors"
                  >
                    INQUIRE FOR THIS ITEM →
                  </a>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="px-4 py-2.5 border border-slate-700 hover:bg-slate-800 text-slate-300 text-xs font-mono tracking-wider uppercase rounded-sm transition-colors"
                  >
                    CLOSE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SolarHardwareCatalog;
