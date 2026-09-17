import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';
import {
  Check,
  CheckCircle2
} from 'lucide-react';

export type ProductTabType = 'all' | 'structural' | 'electrical' | 'components';

interface ProductsPageProps {
  onEnquireClick?: (service?: string) => void;
  initialTab?: ProductTabType;
}

interface ProductItem {
  id: string;
  name: string;
  category: 'electrical' | 'structural' | 'components';
  categoryLabel: string;
  badge: string;
  specsLine: string;
  image: string;
  description: string;
  application: string;
  specification?: string;
}

export const getTabFromParam = (val: string | null | undefined): ProductTabType | null => {
  if (!val) return null;
  const lower = val.toLowerCase().replace('#', '').trim();
  if (
    [
      'structural',
      'structure',
      'structures',
      'solar-structures',
      'solar-structure',
      'c-channel-80-40-15',
      'c-channel-60-40-15',
      'strut-channel-41-41',
    ].includes(lower)
  ) {
    return 'structural';
  }
  if (
    [
      'electrical',
      'electronics',
      'inverter',
      'solar-hybrid-inverter',
      'acdb',
      'dcdb',
    ].includes(lower)
  ) {
    return 'electrical';
  }
  if (
    [
      'components',
      'component',
      'hardware',
      'clamps',
      'mid-clamp',
      'z-clamp',
      'installation-commissioning',
      'compensate-epc',
    ].includes(lower)
  ) {
    return 'components';
  }
  if (lower === 'all') return 'all';
  return null;
};

const PRODUCTS_DATA: ProductItem[] = [
  // Category 1: Solar Electrical
  {
    id: 'solar-hybrid-inverter',
    name: 'Solar Hybrid Inverter',
    category: 'electrical',
    categoryLabel: 'Solar Electrical',
    badge: 'Power Electronics',
    specsLine: 'Dual MPPT • Sub-10ms UPS Switchover • IP65 Rated',
    image: '/electrical/solar_hybrid_inverter.png',
    description: 'Supply and trading of high-efficiency solar hybrid inverters with intelligent multi-source power routing across PV, battery storage, and utility grid feed.',
    application: 'On-Grid / Off-Grid Solar Power Systems & Commercial Hybrid Backup',
    specification: 'Capacity: 3kW to 100kW tailored to project load requirements',
  },
  {
    id: 'acdb',
    name: 'ACDB (AC Distribution Box)',
    category: 'electrical',
    categoryLabel: 'Solar Electrical',
    badge: 'IP65 Weatherproof',
    specsLine: 'Type-II AC SPD • High-Interrupt MCCB • Copper Busbars',
    image: '/electrical/acdb_box.png',
    description: 'Manufacturing of AC Distribution Boxes engineered for inverter output protection, circuit isolation, and multi-stage surge suppression in harsh outdoor environments.',
    application: 'Solar Inverter AC Output Protection & Grid Interconnection',
    specification: 'Configured with high-grade MCB / MCCB & Type-II AC Surge Protection',
  },
  {
    id: 'dcdb',
    name: 'DCDB (DC Distribution Box)',
    category: 'electrical',
    categoryLabel: 'Solar Electrical',
    badge: '1000V DC Protection',
    specsLine: '1000V DC Isolator • gPV High-Voltage Fuses • IP65 Enclosure',
    image: '/electrical/dcdb_box.png',
    description: 'Manufacturing of DC Distribution Boxes built for PV array string isolation, DC surge protection, and high-voltage fuse coordination between solar strings and inverters.',
    application: 'Solar PV String Combiner & DC Array Isolation',
    specification: 'Equipped with 1000V DC Isolators, gPV Fuses & DC Surge Protectors',
  },

  // Category 2: Structural Fabrication
  {
    id: 'solar-structures',
    name: 'Solar Structure Manufacturing (Ground & Rooftop)',
    category: 'structural',
    categoryLabel: 'Structural Fabrication',
    badge: 'IS 2062 Grade Steel',
    specsLine: '180 km/h Wind Tolerance • 80 Micron Hot-Dip Galvanizing',
    image: '/gallery/solar_structure_framework.png',
    description: 'Engineered heavy-duty ground-mount and elevated rooftop solar mounting frameworks featuring optimized column-to-purlin load distribution and pre-punched CNC field alignment.',
    application: 'Ground Mounted Utility, Commercial Rooftops & Solar Sheds',
    specification: 'High-tensile steel cold-roll formed with bolt-together geometry',
  },
  {
    id: 'c-channel-80-40-15',
    name: 'Cold Roll-Formed C-Channel (80 × 40 × 15 mm)',
    category: 'structural',
    categoryLabel: 'Structural Fabrication',
    badge: 'Continuous Profile',
    specsLine: '80mm Web × 40mm Flange × 15mm Lip • 1.6mm - 3.2mm Thickness',
    image: '/gallery/c_channel_80x40x15.png',
    description: 'Automated continuous roll-formed structural C-channel section with precision inward return lips, engineered for primary solar rafters, heavy purlins, and industrial mechanical supports.',
    application: 'Primary Solar Rafters, Heavy Purlins & Industrial Framing',
    specification: '80 mm (Web) × 40 mm (Flange) × 15 mm (Return Lip)',
  },
  {
    id: 'c-channel-60-40-15',
    name: 'Precision Cold-Formed C-Channel (60 × 40 × 15 mm)',
    category: 'structural',
    categoryLabel: 'Structural Fabrication',
    badge: 'Pre-Galvanized & HDG',
    specsLine: '60mm Web × 40mm Flange × 15mm Lip • Mill-Precision Slot Punching',
    image: '/gallery/c_channel_profile.png',
    description: 'Precision cold-formed structural C-channel profile engineered for secondary spans, intermediate purlin runs, module mounting rails, and structural cross bracing.',
    application: 'Module Support Rails, Cross Bracing & Secondary Framing',
    specification: '60 mm (Web) × 40 mm (Flange) × 15 mm (Return Lip)',
  },
  {
    id: 'strut-channel-41-41',
    name: 'Heavy-Duty 41 × 41 Slotted Strut Channel',
    category: 'structural',
    categoryLabel: 'Structural Fabrication',
    badge: 'Modular Framing',
    specsLine: '41mm × 41mm Profile • Inward Return Lips • CNC Slotted',
    image: '/gallery/strut_channel_41x41.png',
    description: 'Universal precision-slotted structural strut channels engineered with inward clamping return lips for modular framing, cable trays, and spring-nut hardware attachment.',
    application: 'Modular Solar Array Framework, Cable Trays & Mounting Struts',
    specification: '41 mm × 41 mm Square Strut Profile with CNC slotted base',
  },

  // Category 3: Components & Services
  {
    id: 'mid-clamp',
    name: 'Solar Module Mid Clamp (U-Clamp)',
    category: 'components',
    categoryLabel: 'Components',
    badge: 'Hot-Dip Galvanized',
    specsLine: 'Universal Module Fit • Heavy-Duty Steel Retention',
    image: '/hardware/u_clamp.png',
    description: 'Heavy-duty solar panel intermediate clamp engineered to lock adjacent framed PV modules securely to purlins, struts, and mounting rails with vibration-resistant retention.',
    application: 'Intermediate PV Module Retention & Support Framework Locking',
    specification: 'High-tensile steel hot-dip galvanized with standard fastener geometry',
  },
  {
    id: 'z-clamp',
    name: 'Solar Module Z-Clamp (End Clamp)',
    category: 'components',
    categoryLabel: 'Components',
    badge: 'Perimeter Locking',
    specsLine: 'Perimeter End Locking • High Wind Rated • Fast Torque Locking',
    image: '/hardware/z_clamp.png',
    description: 'Perimeter end-clamp engineered to firmly anchor the terminal outside edges of solar PV module strings to rail frameworks at the outer boundaries of each array.',
    application: 'Array Perimeter & End-of-Row PV Module Edge Locking',
    specification: 'Engineered for standard outer frame heights (30mm, 35mm, 40mm)',
  },
  {
    id: 'installation-commissioning',
    name: 'Installation, Completion & Commissioning Services',
    category: 'components',
    categoryLabel: 'Turnkey Services',
    badge: 'Turnkey Execution',
    specsLine: 'MNRE Standards • Torque & Pull-Out Testing • Grid Sync',
    image: '/gallery/solar_engineer_field.jpg',
    description: 'Comprehensive on-site solar structural erection, mechanical bolt torque audits, column alignment, string DC verification, HT/LT synchronization, and grid commissioning.',
    application: 'Utility Solar Parks, Commercial Rooftops & Industrial Captive Plants',
    specification: 'MNRE & CEA standards compliant with field pull-out load testing',
  },
  {
    id: 'compensate-epc',
    name: 'Compensate (Turnkey Solar EPC & Grid Balancing)',
    category: 'components',
    categoryLabel: 'Turnkey Services',
    badge: 'Grid Synchronization',
    specsLine: 'Megawatt Utility EPC • Reactive Power Balancing • PR Guaranteed',
    image: '/gallery/utility_solar_farm.jpg',
    description: 'Full-spectrum turnkey engineering, procurement, construction (EPC), reactive power compensation, power factor balancing, and HT/LT substation synchronization.',
    application: 'Megawatt-Scale Solar Farms & Heavy Industrial Power Consumers',
    specification: 'Full-spectrum EPC execution with guaranteed PR (Performance Ratio)',
  },
];

export const ProductsPage: React.FC<ProductsPageProps> = ({
  onEnquireClick: _onEnquireClick,
  initialTab,
}) => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  useSEO({
    title: 'Product Portfolio & Technical Catalog | Central Structure Fabrication',
    description:
      'Explore CSF product portfolio: Solar Hybrid Inverters, ACDB / DCDB manufacturing, Solar Structure fabrication, C-Channels 80×40×15, 60×40×15, 41×41 Strut Channels, and solar clamps.',
    keywords:
      'CSF products, solar electrical products, solar hybrid inverters, ACDB DCDB manufacturer, solar mounting structures, C-channel 80x40x15, C-channel 60x40x15, 41x41 strut channel, solar clamps',
    canonical: 'https://www.csfabrication.in/products',
    ogTitle: 'CSF Products & Services — Solar Electrical & Structural Fabrication',
    ogDescription:
      'Precision structural profiles, solar electrical equipment, and mounting components manufactured and supplied by Central Structure Fabrication.',
  });

  const getResolvedTab = (): ProductTabType => {
    if (initialTab) return initialTab;
    const fromSearch =
      getTabFromParam(searchParams.get('tab')) ||
      getTabFromParam(searchParams.get('category')) ||
      getTabFromParam(searchParams.get('filter'));
    if (fromSearch) return fromSearch;
    const fromHash = getTabFromParam(location.hash);
    if (fromHash) return fromHash;
    return 'all';
  };

  const [activeTab, setActiveTab] = useState<ProductTabType>(getResolvedTab);
  const [selectedProfile, setSelectedProfile] = useState<'80x40' | '60x40' | '41x41'>('80x40');

  // React dynamically if URL search params or hash change
  useEffect(() => {
    const tabFromSearch =
      getTabFromParam(searchParams.get('tab')) ||
      getTabFromParam(searchParams.get('category')) ||
      getTabFromParam(searchParams.get('filter'));
    const tabFromHash = getTabFromParam(location.hash);
    const resolved = initialTab || tabFromSearch || tabFromHash;
    if (resolved) {
      setActiveTab(resolved);
    }
  }, [initialTab, location.search, location.hash, searchParams]);

  // Handle smooth scroll to target showcase or specific product card
  useEffect(() => {
    const rawHash = location.hash.replace('#', '');
    if (rawHash) {
      const timer = setTimeout(() => {
        const el = document.getElementById(rawHash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else if (
          rawHash === 'structures' ||
          rawHash === 'structural' ||
          rawHash === 'showcase' ||
          rawHash === 'solar-structures'
        ) {
          document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
      return () => clearTimeout(timer);
    } else if (
      searchParams.get('tab') ||
      searchParams.get('category') ||
      searchParams.get('filter') ||
      initialTab
    ) {
      const timer = setTimeout(() => {
        document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [location.hash, location.search, initialTab]);

  const handleTabChange = (key: ProductTabType) => {
    setActiveTab(key);
    const newParams = new URLSearchParams(searchParams);
    if (key === 'all') {
      newParams.delete('tab');
      newParams.delete('category');
      newParams.delete('filter');
    } else {
      newParams.set('tab', key);
    }
    setSearchParams(newParams, { replace: true });
  };

  const filteredProducts =
    activeTab === 'all'
      ? PRODUCTS_DATA
      : PRODUCTS_DATA.filter((p) => p.category === activeTab);

  return (
    <div className="w-full bg-[#FAF9F6] text-[#0F2130] font-sans pt-28 pb-24 selection:bg-[#0049CA] selection:text-white">
      
      {/* ── Page Header & Filter Navigation ── */}
      <section id="showcase" className="max-w-[1720px] mx-auto px-6 sm:px-10 md:px-16 lg:px-24 mb-20 scroll-mt-28">
        
        {/* Section Header + Category Filter Pills */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-8 pb-8 border-b border-[#EAE6DF]">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#0F2130] leading-[1.05] mb-5">
              Our Fit For Purpose{' '}
              <span className="text-[#8E8A85] font-light block sm:inline">Product Range</span>
            </h1>
            <p className="text-base sm:text-lg text-[#647488] font-normal leading-relaxed">
              Continuous cold roll-formed steel channels, certified solar power combiner arrays, and precision clamping hardware manufactured directly at our Amroha plant for demanding renewable infrastructure.
            </p>
          </div>

          {/* Category Filter Pills (Sleek Horizontal Segmented Control that never wraps or deforms) */}
          <div className="w-full lg:w-auto overflow-x-auto no-scrollbar py-1 self-start lg:self-end shrink-0">
            <div className="inline-flex items-center gap-1 p-1 sm:p-1.5 rounded-full bg-[#EFECE6] border border-[#E2DDD5] shadow-xs shrink-0">
              {[
                { key: 'all' as ProductTabType, label: 'All Products' },
                { key: 'structural' as ProductTabType, label: 'Structures' },
                { key: 'electrical' as ProductTabType, label: 'Electrical' },
                { key: 'components' as ProductTabType, label: 'Components' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => handleTabChange(tab.key)}
                  className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer shrink-0 whitespace-nowrap ${
                    activeTab === tab.key
                      ? 'bg-[#0049CA] text-white shadow-sm shadow-[#0049CA]/30'
                      : 'text-[#647488] hover:text-[#0F2130] hover:bg-white/50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3-Column Product Cards Grid (Matching the exact screenshot aesthetic) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              id={product.id}
              className="scroll-mt-32 bg-white rounded-[28px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between border border-[#EAE6DF] group"
            >
              <div>
                {/* Image Bay */}
                <div className="aspect-square w-full overflow-hidden bg-[#F5F2EB] relative flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className={`w-full h-full transition-transform duration-500 group-hover:scale-105 ${
                      product.image.endsWith('.png') ||
                      product.image.includes('clamp') ||
                      product.image.includes('channel')
                        ? 'object-contain p-6'
                        : 'object-cover'
                    }`}
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-block px-3 py-1 rounded-full bg-white/95 border border-[#EAE6DF] text-[#0049CA] text-[10px] font-mono font-bold uppercase tracking-wider shadow-xs backdrop-blur-xs">
                      {product.badge}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-7">
                  <p className="text-[11px] font-mono text-[#0049CA] font-semibold mb-2">
                    {product.specsLine}
                  </p>
                  <h3 className="text-xl font-bold text-[#0F2130] mb-3 leading-snug group-hover:text-[#0049CA] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-[#647488] leading-relaxed mb-4">
                    {product.description}
                  </p>

                  <div className="pt-3 border-t border-[#EAE6DF] flex flex-col gap-1 text-xs">
                    <span className="text-[10px] text-[#8E8A85] uppercase font-bold tracking-wider">Application</span>
                    <span className="text-[#0F2130] font-medium leading-snug">{product.application}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 04: STRUCTURAL PROFILES & INTERACTIVE CAD STATION ── */}
      <section id="structural-cad" className="max-w-[1720px] mx-auto px-6 sm:px-10 md:px-16 lg:px-24 mb-28 scroll-mt-28">
        <div className="bg-white rounded-[28px] p-8 sm:p-12 md:p-16 border border-[#EAE6DF] shadow-sm">
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#EAE6DF] mb-10">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F2130] tracking-tight">
                Precision In Every{' '}
                <span className="text-[#8E8A85] font-light">Roll-Formed Section</span>
              </h2>
            </div>

            {/* Profile Selector Tabs (Exact Previous Engineering Tabs) */}
            <div className="flex flex-wrap items-center gap-2.5">
              {[
                { key: '80x40', label: '80 × 40 × 15 C-CHANNEL' },
                { key: '60x40', label: '60 × 40 × 15 C-CHANNEL' },
                { key: '41x41', label: '41 × 41 STRUT CHANNEL' },
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => setSelectedProfile(item.key as any)}
                  className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer rounded-xl border ${
                    selectedProfile === item.key
                      ? 'bg-[#0049CA] text-white border-[#0049CA] shadow-sm'
                      : 'bg-[#F8FAFC] text-[#647488] border-[#E5E7EB] hover:text-[#0F2130] hover:border-[#0049CA] hover:bg-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive CAD Split Station: Exact 2D Line Art Schematic + Engineering Specs */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Col: Exact 2D CAD Line Art Cross-Section Schematic */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
              <div className="w-full h-72 sm:h-80 md:h-96 overflow-hidden rounded-2xl flex flex-col items-center justify-center bg-white border border-[#E5E7EB] shadow-xs relative p-6">
                <div className="absolute top-4 left-4 text-[10px] font-bold text-[#647488] uppercase tracking-wider font-mono">
                  CAD PROFILE CROSS-SECTION
                </div>

                {selectedProfile === '80x40' && (
                  <svg viewBox="0 0 240 240" className="w-56 h-56 sm:w-64 sm:h-64 my-auto">
                    {/* Dimension marks */}
                    <line x1="30" y1="30" x2="30" y2="210" stroke="#0049CA" strokeWidth="1.2" strokeDasharray="2,2" />
                    <text x="16" y="125" fill="#0049CA" fontSize="10" fontWeight="bold" textAnchor="middle">80 mm</text>
                    <line x1="50" y1="225" x2="170" y2="225" stroke="#0049CA" strokeWidth="1.2" strokeDasharray="2,2" />
                    <text x="110" y="238" fill="#0049CA" fontSize="10" fontWeight="bold" textAnchor="middle">40 mm</text>
                    
                    {/* C-Channel Outline: Web 80, Flange 40, Lip 15 */}
                    <path
                      d="M 135 40 L 50 40 L 50 200 L 135 200 L 135 170 L 125 170 L 125 190 L 60 190 L 60 50 L 125 50 L 125 70 L 135 70 Z"
                      fill="#0049CA"
                      fillOpacity="0.10"
                      stroke="#0049CA"
                      strokeWidth="2.5"
                    />
                    <text x="145" y="60" fill="#647488" fontSize="9" fontWeight="600">Lip: 15 mm</text>
                  </svg>
                )}

                {selectedProfile === '60x40' && (
                  <svg viewBox="0 0 240 240" className="w-56 h-56 sm:w-64 sm:h-64 my-auto">
                    {/* Dimension marks */}
                    <line x1="30" y1="50" x2="30" y2="190" stroke="#0049CA" strokeWidth="1.2" strokeDasharray="2,2" />
                    <text x="16" y="125" fill="#0049CA" fontSize="10" fontWeight="bold" textAnchor="middle">60 mm</text>
                    <line x1="50" y1="210" x2="170" y2="210" stroke="#0049CA" strokeWidth="1.2" strokeDasharray="2,2" />
                    <text x="110" y="224" fill="#0049CA" fontSize="10" fontWeight="bold" textAnchor="middle">40 mm</text>
                    
                    {/* C-Channel Outline: Web 60, Flange 40, Lip 15 */}
                    <path
                      d="M 135 60 L 50 60 L 50 180 L 135 180 L 135 155 L 125 155 L 125 170 L 60 170 L 60 70 L 125 70 L 125 85 L 135 85 Z"
                      fill="#0049CA"
                      fillOpacity="0.10"
                      stroke="#0049CA"
                      strokeWidth="2.5"
                    />
                    <text x="145" y="75" fill="#647488" fontSize="9" fontWeight="600">Lip: 15 mm</text>
                  </svg>
                )}

                {selectedProfile === '41x41' && (
                  <svg viewBox="0 0 240 240" className="w-56 h-56 sm:w-64 sm:h-64 my-auto">
                    {/* Dimension marks */}
                    <line x1="30" y1="60" x2="30" y2="180" stroke="#0049CA" strokeWidth="1.2" strokeDasharray="2,2" />
                    <text x="16" y="125" fill="#0049CA" fontSize="10" fontWeight="bold" textAnchor="middle">41 mm</text>
                    <line x1="50" y1="200" x2="170" y2="200" stroke="#0049CA" strokeWidth="1.2" strokeDasharray="2,2" />
                    <text x="110" y="215" fill="#0049CA" fontSize="10" fontWeight="bold" textAnchor="middle">41 mm</text>
                    
                    {/* Strut Channel Outline: 41 x 41 with inward return lips */}
                    <path
                      d="M 135 70 L 50 70 L 50 170 L 150 170 L 150 70 L 130 70 L 130 85 L 140 85 L 140 160 L 60 160 L 60 80 L 120 80 L 120 70 Z"
                      fill="#0049CA"
                      fillOpacity="0.10"
                      stroke="#0049CA"
                      strokeWidth="2.5"
                    />
                    <text x="100" y="120" fill="#647488" fontSize="9" fontWeight="600">Slotted Base</text>
                  </svg>
                )}

                <div className="w-full flex items-center justify-between text-[11px] text-[#647488] border-t border-[#F1F3F5] pt-2 font-mono">
                  <span>Scale: 1:1 Precision</span>
                  <span className="text-[#0049CA] font-bold">100% In-House Roll-Formed</span>
                </div>
              </div>

              <div className="w-full mt-4 flex items-center justify-between px-2 text-xs text-[#647488]">
                <span>Mill Standard: Cold-Rolled Continuous Grain</span>
                <span className="font-mono text-[#0049CA] font-bold">CNC Punched</span>
              </div>
            </div>

            {/* Right Col: Exact Previous Profile Header + Checkmarks + Full Engineering Matrix */}
            <div className="lg:col-span-7 flex flex-col gap-5">
              <div>
                <span className="text-[11px] font-mono text-[#0049CA] font-bold uppercase tracking-wider block mb-1">
                  {selectedProfile === '80x40' && 'HEAVY SOLAR PURLIN & RAFTER PROFILE'}
                  {selectedProfile === '60x40' && 'INTERMEDIATE RAIL & SPANNING PROFILE'}
                  {selectedProfile === '41x41' && 'CONTINUOUS SPRING-NUT MODULAR CHANNEL'}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F2130] uppercase tracking-tight">
                  {selectedProfile === '80x40' && 'C-CHANNEL 80 × 40 × 15 MM'}
                  {selectedProfile === '60x40' && 'C-CHANNEL 60 × 40 × 15 MM'}
                  {selectedProfile === '41x41' && '41 × 41 STRUT CHANNEL'}
                </h3>
                <p className="text-sm text-[#647488] leading-relaxed mt-2">
                  {selectedProfile === '80x40' &&
                    'High-capacity cold roll-formed structural purlin member designed for heavy-duty main rafters, long-span arrays, and utility solar purlin runs. Cold roll-formed with uniform return lips for high torsional rigidity.'}
                  {selectedProfile === '60x40' &&
                    'Medium structural member engineered for module mounting rails, intermediate purlins, and structural angle bracing with tight dimensional tolerances.'}
                  {selectedProfile === '41x41' &&
                    'Continuous modular square strut profile with inward return lips locking standard spring channel nuts for fast hardware alignment.'}
                </p>
              </div>

              {/* Exact Checkmarks from Previous Version */}
              <div className="flex flex-col gap-2.5 pt-1 text-xs text-[#0F2130]">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#0049CA] flex-shrink-0" />
                  <span className="font-medium">Roll-formed with uniform web profiles and consistent return lips</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#0049CA] flex-shrink-0" />
                  <span className="font-medium">Pre-punched CNC slots enable fast on-site bolt connection</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#0049CA] flex-shrink-0" />
                  <span className="font-medium">High torsional resistance against heavy environmental &amp; wind loads</span>
                </div>
              </div>

              {/* Spec Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#EAE6DF]">
                  <span className="text-[10px] text-[#8E8A85] uppercase font-bold tracking-wider block">Web Height</span>
                  <span className="text-sm font-bold text-[#0F2130]">
                    {selectedProfile === '80x40' ? '80 mm' : selectedProfile === '60x40' ? '60 mm' : '41 mm'}
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#EAE6DF]">
                  <span className="text-[10px] text-[#8E8A85] uppercase font-bold tracking-wider block">Flange Width</span>
                  <span className="text-sm font-bold text-[#0F2130]">
                    {selectedProfile === '41x41' ? '41 mm' : '40 mm'}
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#EAE6DF]">
                  <span className="text-[10px] text-[#8E8A85] uppercase font-bold tracking-wider block">Return Lip</span>
                  <span className="text-sm font-bold text-[#0F2130]">
                    {selectedProfile === '41x41' ? 'Inward Rolled' : '15 mm'}
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#EAE6DF]">
                  <span className="text-[10px] text-[#8E8A85] uppercase font-bold tracking-wider block">Thickness</span>
                  <span className="text-sm font-bold text-[#0F2130]">1.6mm - 3.2mm</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#EAE6DF]">
                  <span className="text-[10px] text-[#8E8A85] uppercase font-bold tracking-wider block">Steel Grade</span>
                  <span className="text-sm font-bold text-[#0F2130]">IS 2062 / E350</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#EAE6DF]">
                  <span className="text-[10px] text-[#8E8A85] uppercase font-bold tracking-wider block">Lengths</span>
                  <span className="text-sm font-bold text-[#0F2130]">Custom Up to 12m</span>
                </div>
              </div>

              <div className="pt-2">
                <span className="inline-block px-4 py-2 bg-[#FAF9F6] border border-[#EAE6DF] text-xs font-mono text-[#647488]">
                  Custom punch patterns and lengths available upon drawing submission
                </span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── SECTION 05: POWER CONVERSION & DISTRIBUTION (Alive with real photos) ── */}
      <section id="electrical" className="max-w-[1720px] mx-auto px-6 sm:px-10 md:px-16 lg:px-24 mb-28 scroll-mt-28">
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F2130] tracking-tight">
            Powering The System{' '}
            <span className="text-[#8E8A85] font-light">Behind The Structure</span>
          </h2>
          <p className="text-sm sm:text-base text-[#647488] max-w-3xl mt-3 leading-relaxed">
            CSF supplies certified solar hybrid inverters and manufactures weatherproof ACDB and DCDB combiner enclosures to safeguard downstream infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Inverter Card */}
          <div className="bg-white rounded-[28px] overflow-hidden border border-[#EAE6DF] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="aspect-square w-full overflow-hidden relative bg-[#F5F2EB] flex items-center justify-center">
                <img
                  src="/electrical/solar_hybrid_inverter.png"
                  alt="Solar Hybrid Inverter Trading"
                  className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-2.5 py-1 bg-white/95 border border-[#EAE6DF] text-[#0049CA] text-[10px] font-mono font-bold uppercase tracking-wider shadow-xs">
                    Supply &amp; Trading
                  </span>
                </div>
              </div>
              <div className="p-7">
                <p className="text-[11px] font-mono text-[#0049CA] font-semibold mb-1.5">Dual MPPT • Intelligent Routing</p>
                <h3 className="text-xl font-bold text-[#0F2130] mb-2 group-hover:text-[#0049CA] transition-colors">
                  Solar Hybrid Inverter
                </h3>
                <p className="text-xs text-[#647488] leading-relaxed mb-4">
                  Supply and trading of dependable hybrid inverters engineered for solar generation, battery bank storage, and seamless utility grid feed.
                </p>
                <div className="pt-3 border-t border-[#EAE6DF] text-xs text-[#0F2130] font-medium space-y-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0049CA]" />
                    <span>3kW to 100kW capacities</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0049CA]" />
                    <span>Sub-10ms automatic UPS switchover</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ACDB Card */}
          <div className="bg-white rounded-[28px] overflow-hidden border border-[#EAE6DF] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="aspect-square w-full overflow-hidden relative bg-[#F5F2EB] flex items-center justify-center">
                <img
                  src="/electrical/acdb_box.png"
                  alt="ACDB Distribution Box Manufacturing"
                  className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-2.5 py-1 bg-white/95 border border-[#EAE6DF] text-[#0049CA] text-[10px] font-mono font-bold uppercase tracking-wider shadow-xs">
                    In-House Manufacturing
                  </span>
                </div>
              </div>
              <div className="p-7">
                <p className="text-[11px] font-mono text-[#0049CA] font-semibold mb-1.5">Type-II AC SPD • MCB/MCCB Protected</p>
                <h3 className="text-xl font-bold text-[#0F2130] mb-2 group-hover:text-[#0049CA] transition-colors">
                  AC Distribution Box (ACDB)
                </h3>
                <p className="text-xs text-[#647488] leading-relaxed mb-4">
                  Factory-assembled AC distribution enclosures with high-interrupt circuit breakers, voltage monitoring, and lightning protection.
                </p>
                <div className="pt-3 border-t border-[#EAE6DF] text-xs text-[#0F2130] font-medium space-y-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0049CA]" />
                    <span>IP65 weatherproof powder-coated box</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0049CA]" />
                    <span>Electrolytic grade copper busbars</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* DCDB Card */}
          <div className="bg-white rounded-[28px] overflow-hidden border border-[#EAE6DF] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="aspect-square w-full overflow-hidden relative bg-[#F5F2EB] flex items-center justify-center">
                <img
                  src="/electrical/dcdb_box.png"
                  alt="DCDB String Combiner Manufacturing"
                  className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-2.5 py-1 bg-white/95 border border-[#EAE6DF] text-[#0049CA] text-[10px] font-mono font-bold uppercase tracking-wider shadow-xs">
                    In-House Manufacturing
                  </span>
                </div>
              </div>
              <div className="p-7">
                <p className="text-[11px] font-mono text-[#0049CA] font-semibold mb-1.5">1000V DC Isolator • gPV Fuses</p>
                <h3 className="text-xl font-bold text-[#0F2130] mb-2 group-hover:text-[#0049CA] transition-colors">
                  DC Distribution Box (DCDB)
                </h3>
                <p className="text-xs text-[#647488] leading-relaxed mb-4">
                  Engineered string combiner and array isolation boxes built for multi-string solar arrays with dedicated high-voltage DC protection.
                </p>
                <div className="pt-3 border-t border-[#EAE6DF] text-xs text-[#0F2130] font-medium space-y-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0049CA]" />
                    <span>Individual string fuse coordination</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0049CA]" />
                    <span>UV-stabilized polycarbonate / sheet metal</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── SECTION 06: FASTENING HARDWARE SPOTLIGHT (Alive with user uploaded photos) ── */}
      <section id="hardware" className="max-w-[1720px] mx-auto px-6 sm:px-10 md:px-16 lg:px-24 mb-28 scroll-mt-28">
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F2130] tracking-tight">
            Small Components.{' '}
            <span className="text-[#8E8A85] font-light">Critical Connections</span>
          </h2>
          <p className="text-sm sm:text-base text-[#647488] max-w-3xl mt-3 leading-relaxed">
            CSF manufactures high-strength solar module clamps engineered for vibration resistance, firm mechanical retention, and rapid on-site torque tightening.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
          
          {/* Mid Clamp (U-Clamp) */}
          <div className="bg-white rounded-[28px] overflow-hidden border border-[#EAE6DF] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="aspect-square w-full bg-[#F5F2EB] overflow-hidden relative flex items-center justify-center">
                <img
                  src="/hardware/u_clamp.png"
                  alt="Mid Clamp / U-Clamp"
                  className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-2.5 py-1 bg-white/95 border border-[#EAE6DF] text-[#0049CA] text-[10px] font-mono font-bold uppercase tracking-wider shadow-xs">
                    Intermediate Locking
                  </span>
                </div>
              </div>
              <div className="p-7">
                <p className="text-[11px] font-mono text-[#0049CA] font-semibold mb-1.5">Hot-Dip Galvanized • Universal Panel Retention</p>
                <h3 className="text-2xl font-bold text-[#0F2130] mb-2 group-hover:text-[#0049CA] transition-colors">
                  Mid Clamp (U-Clamp)
                </h3>
                <p className="text-xs text-[#647488] leading-relaxed mb-4">
                  Intermediate PV module retention clamp designed to lock two adjacent framed solar panels securely into strut channel rails, purlins, and structural posts.
                </p>
                <div className="pt-3 border-t border-[#EAE6DF] text-xs text-[#0F2130] font-medium space-y-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0049CA]" />
                    <span>Fabricated for standard framed solar PV modules</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0049CA]" />
                    <span>High-tensile steel with 80+ micron HDG coating</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Z-Clamp (End Clamp) */}
          <div className="bg-white rounded-[28px] overflow-hidden border border-[#EAE6DF] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="aspect-square w-full bg-[#F5F2EB] overflow-hidden relative flex items-center justify-center">
                <img
                  src="/hardware/z_clamp.png"
                  alt="Z-Clamp (End Clamp)"
                  className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-2.5 py-1 bg-white/95 border border-[#EAE6DF] text-[#0049CA] text-[10px] font-mono font-bold uppercase tracking-wider shadow-xs">
                    Perimeter Locking
                  </span>
                </div>
              </div>
              <div className="p-7">
                <p className="text-[11px] font-mono text-[#0049CA] font-semibold mb-1.5">Outer String Edge • Wind Load Tested</p>
                <h3 className="text-2xl font-bold text-[#0F2130] mb-2 group-hover:text-[#0049CA] transition-colors">
                  Z-Clamp (End Clamp)
                </h3>
                <p className="text-xs text-[#647488] leading-relaxed mb-4">
                  Perimeter end-clamp engineered to firmly secure the outside terminal edge of PV modules at the border of each array, anchoring strings securely against high wind lift.
                </p>
                <div className="pt-3 border-t border-[#EAE6DF] text-xs text-[#0F2130] font-medium space-y-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0049CA]" />
                    <span>Engineered for 30mm, 35mm, and 40mm module depths</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0049CA]" />
                    <span>Pre-punched fastener hole for stainless steel bolt assembly</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
