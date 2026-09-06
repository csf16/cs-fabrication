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
    id: 'aluminium-c-rail',
    name: 'Aluminium C-Rail',
    category: 'channels',
    image: '/hardware/aluminium-c-rail.jpg',
    material: 'Structural Grade Al 6005-T5',
    finish: 'Clear Anodized 15μm',
    specs: {
      dimensions: '30mm × 50mm Cross Section',
      thickness: '2.2mm Reinforced Web',
      boltSize: 'Slot Groove for Hex Head M8 Bolts',
      standard: 'GB 5237-2008 / AS/NZS 1170',
    },
    description: 'Universal solar mounting rail with dual lateral channels for rapid clamp engagement and splice-connector coupling.',
  },
  {
    id: 'aluminium-mini-rail',
    name: 'Aluminium Mini Rail',
    category: 'roof',
    image: '/hardware/aluminium-mini-rail.jpg',
    material: 'Aluminium 6063-T6',
    finish: 'Mill Finish / Anodized',
    specs: {
      dimensions: 'Lengths: 150mm, 250mm, 385mm',
      thickness: '2.5mm Base Plate',
      boltSize: 'Self-Drilling EPDM Screws Included',
      standard: 'ISO 9001 / CE Certified',
    },
    description: 'Short-profile direct-fix mini rail system for trapezoidal metal sheet roofs with integrated EPDM waterproof gaskets.',
  },
  {
    id: 'aluminium-41x61-base-rail',
    name: 'Aluminium 41×61mm Base Rail',
    category: 'channels',
    image: '/hardware/aluminium-41x61-base-rail.jpg',
    material: 'High-Tensile Aluminium 6005A-T6',
    finish: 'Clear Anodized (15μm)',
    specs: {
      dimensions: '41mm Width × 61mm Height',
      thickness: '2.8mm Dual Flange',
      boltSize: 'M10 T-Head Bolt Bottom Track',
      standard: 'EN 1999-1-1 Eurocode 9',
    },
    description: 'Deep-profile box rail designed for high-wind elevated rooftop installations and long-span carport purlin configurations.',
  },
  {
    id: 'trapezoidal-bracket',
    name: 'Trapezoidal Metal Roof Bracket',
    category: 'roof',
    image: '/hardware/trapezoidal-bracket.jpg',
    material: 'Stainless Steel SS304 / Aluminium 6063',
    finish: 'Pickled & Passivated / Anodized',
    specs: {
      dimensions: '100mm × 50mm Custom Pitch Fit',
      thickness: '2.0mm Pre-Punched',
      boltSize: 'M8 Top Slot + Self-Tapping Fasteners',
      standard: 'DIN 1055 Wind Code',
    },
    description: 'Pre-punched mounting bracket engineered to fit standard trapezoidal sheet ribs without penetrating the water drainage troughs.',
  },
  {
    id: 'l-foot-bracket',
    name: 'Aluminium L-Foot Solar Bracket',
    category: 'accessories',
    image: '/hardware/l-foot-bracket.jpg',
    material: 'Forged Aluminium 6063-T6',
    finish: 'Anodized Silver / Black Oxide',
    specs: {
      dimensions: '80mm Height × 40mm Base × 40mm Width',
      thickness: '5.0mm Heavy Cast Wall',
      boltSize: 'M10 Hanger Bolt Hole + M8 Rail Slot',
      standard: 'UL 2703 Fire & Loading',
    },
    description: 'Standard L-Foot bracket connecting roof hanger bolts or solar wood screws to aluminum mounting rails with serrated grip face.',
  },
  {
    id: 'walkway-metal-bracket',
    name: 'Solar Walkway Metal Bracket',
    category: 'accessories',
    image: '/hardware/walkway-metal-bracket.jpg',
    material: 'Hot-Dip Galvanized IS 2062 Steel',
    finish: 'HDG 85 Microns (IS 2629)',
    specs: {
      dimensions: 'Universal 300mm / 450mm Walkway Width',
      thickness: '3.0mm Pressed Steel Plate',
      boltSize: 'M8 Slotted Channels & Self-Drilling Screws',
      standard: 'IS 875 Part 3 Wind Compliant',
    },
    description: 'Heavy duty galvanized roof-mounted support bracket designed to anchor maintenance walkways and FRP grating on metal roofs.',
  },
  {
    id: 'middle-clamp-hdg',
    name: 'Middle Clamp ( HDG )',
    category: 'clamps',
    image: '/hardware/middle-clamp-hdg.jpg',
    material: 'Structural Carbon Steel Grade E250',
    finish: 'Hot-Dip Galvanized (85+ microns)',
    specs: {
      dimensions: '50mm × 50mm Saddle Profile',
      thickness: '4.0mm Formed Steel',
      boltSize: 'M10 Center Hex Bolt',
      standard: 'IS 2062 / IS 4759',
    },
    description: 'Ultra-durable hot-dip galvanized steel mid clamp built for coastal, desert, and extreme-load utility solar ground mount installations.',
  },
];

export const SolarHardwareCatalog: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<HardwareItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Hardware' },
    { id: 'clamps', label: 'Panel Clamps' },
    { id: 'channels', label: 'Rails & Strut' },
    { id: 'roof', label: 'Rooftop Mounts' },
    { id: 'accessories', label: 'Brackets & Fittings' },
  ];

  const filteredItems = activeCategory === 'all'
    ? HARDWARE_ITEMS
    : HARDWARE_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section id="hardware" className="relative w-full py-24 bg-[#0F2130] text-white overflow-hidden border-t border-b border-white/10">
      {/* Grid line pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0049CA]/20 border border-[#0049CA]/30 text-[#0049CA] text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="w-2 h-2 rounded-full bg-[#0049CA]" />
            <span>CSF Mounting Hardware</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight uppercase leading-[1.12]">
            Solar Mounting Hardware &amp; Components
          </h2>

          <p className="text-sm md:text-base text-[#E5E7EB] max-w-2xl font-normal mt-4 leading-relaxed">
            Engineered aluminium and hot-dip galvanized mounting components designed for utility-scale solar farms, industrial rooftop sheds, and carport racking systems.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2.5 mt-8">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-5 py-2 text-xs font-semibold tracking-wide uppercase rounded-xl transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#0049CA] text-white shadow-md shadow-[#0049CA]/25'
                      : 'bg-white/5 hover:bg-white/10 text-[#E5E7EB] border border-white/10'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group cursor-pointer flex flex-col items-center transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image Frame */}
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-black/40 border border-white/15 p-2 group-hover:border-[#0049CA] transition-colors duration-300 shadow-lg">
                <div className="relative w-full h-full rounded-xl overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F2130]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-3">
                    <span className="text-[10px] tracking-wider text-white bg-[#0049CA] px-3 py-1 rounded-lg uppercase font-semibold">
                      View Specifications →
                    </span>
                  </div>
                </div>
              </div>

              {/* Product Title */}
              <div className="mt-3.5 text-center flex flex-col items-center">
                <h3 className="text-sm md:text-[15px] font-bold text-white tracking-wide group-hover:text-[#0049CA] transition-colors duration-200">
                  {item.name}
                </h3>
                <span className="text-xs text-[#647488] mt-0.5 font-medium">
                  {item.material.split(' ')[0]} · {item.finish.includes('HDG') || item.finish.includes('Galvanized') ? 'Hot-Dip Galv' : 'Anodized'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-16 p-8 md:p-10 rounded-2xl bg-[#152738] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex flex-col gap-2 text-center md:text-left">
            <span className="text-xs font-semibold text-[#0049CA] uppercase tracking-wider">
              Bulk Supply &amp; Custom Profiles
            </span>
            <h4 className="text-xl font-bold text-white uppercase">
              Need custom punch slots, custom lengths, or mill-test certificates?
            </h4>
            <p className="text-sm text-[#E5E7EB] max-w-xl leading-relaxed">
              We fabricate bespoke strut dimensions, custom-anodized clamps, and heavy-gauge HDG brackets to exact project specifications.
            </p>
          </div>
          <button
            onClick={() => {
              window.dispatchEvent(new CustomEvent('open-enquiry', { detail: 'Bulk Hardware Quote' }));
            }}
            className="px-6 py-3.5 bg-[#0049CA] hover:bg-[#003bb0] text-white text-xs font-semibold tracking-wider uppercase rounded-xl transition-all duration-200 shadow-md whitespace-nowrap cursor-pointer"
          >
            Request Hardware Quote →
          </button>
        </div>
      </div>

      {/* Interactive Detail Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-[#0F2130] border border-white/15 rounded-2xl p-6 md:p-8 shadow-2xl text-white overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/20 transition-colors cursor-pointer"
            >
              ✕
            </button>

            <div className="flex flex-col md:flex-row gap-6">
              {/* Product Image */}
              <div className="w-full md:w-1/2 aspect-[4/3] rounded-xl overflow-hidden border border-white/15 bg-black/50 p-2 shrink-0">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              {/* Details & Specs */}
              <div className="flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-[#0049CA] uppercase tracking-wider">
                      CSF Component Specification
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white uppercase">
                    {selectedItem.name}
                  </h3>
                  <p className="text-xs text-[#E5E7EB] mt-2 leading-relaxed">
                    {selectedItem.description}
                  </p>

                  <div className="mt-4 space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-white/10">
                      <span className="text-[#647488]">Material</span>
                      <span className="font-semibold text-white">{selectedItem.material}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/10">
                      <span className="text-[#647488]">Surface Finish</span>
                      <span className="font-semibold text-[#0049CA]">{selectedItem.finish}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/10">
                      <span className="text-[#647488]">Dimensions</span>
                      <span className="font-semibold text-white">{selectedItem.specs.dimensions}</span>
                    </div>
                    {selectedItem.specs.thickness && (
                      <div className="flex justify-between py-1 border-b border-white/10">
                        <span className="text-[#647488]">Thickness</span>
                        <span className="font-semibold text-white">{selectedItem.specs.thickness}</span>
                      </div>
                    )}
                    {selectedItem.specs.boltSize && (
                      <div className="flex justify-between py-1 border-b border-white/10">
                        <span className="text-[#647488]">Fastener Fit</span>
                        <span className="font-semibold text-white">{selectedItem.specs.boltSize}</span>
                      </div>
                    )}
                    <div className="flex justify-between py-1 border-b border-white/10">
                      <span className="text-[#647488]">Standard</span>
                      <span className="font-semibold text-[#E5E7EB]">{selectedItem.specs.standard}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => {
                      const itemName = selectedItem.name;
                      setSelectedItem(null);
                      window.dispatchEvent(new CustomEvent('open-enquiry', { detail: itemName }));
                    }}
                    className="flex-1 py-3 bg-[#0049CA] hover:bg-[#003bb0] text-white text-xs font-semibold tracking-wider text-center uppercase rounded-xl transition-colors cursor-pointer shadow-md"
                  >
                    Inquire For This Item →
                  </button>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="px-5 py-3 border border-white/15 hover:bg-white/10 text-white text-xs font-semibold tracking-wider uppercase rounded-xl transition-colors cursor-pointer"
                  >
                    Close
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
