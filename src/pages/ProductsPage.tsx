import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';
import {
  Zap,
  Layers,
  Wrench,
  ArrowRight,
  Check,
  PhoneCall
} from 'lucide-react';

interface ProductsPageProps {
  onEnquireClick?: (service?: string) => void;
}

interface ProductItem {
  id: string;
  name: string;
  category: 'electrical' | 'structural' | 'components';
  categoryLabel: string;
  image: string;
  description: string;
  application: string;
  specification?: string;
}

const PRODUCTS_DATA: ProductItem[] = [
  // Category 1: Solar Electrical
  {
    id: 'solar-hybrid-inverter',
    name: 'Solar Hybrid Inverter',
    category: 'electrical',
    categoryLabel: 'Solar Electrical',
    image: '/electrical/solar_hybrid_inverter.jpg',
    description: 'Supply and trading of solar hybrid inverters for solar power applications with intelligent multi-source energy routing.',
    application: 'On-Grid / Off-Grid Solar Power Systems & Hybrid Backup',
    specification: 'Capacity: Tailored to project load requirements',
  },
  {
    id: 'acdb',
    name: 'ACDB (AC Distribution Box)',
    category: 'electrical',
    categoryLabel: 'Solar Electrical',
    image: '/electrical/acdb_box.jpg',
    description: 'Manufacturing of AC Distribution Boxes engineered for solar inverter output protection, circuit isolation, and surge suppression.',
    application: 'Solar Inverter AC Output & Grid Interconnection',
    specification: 'Configured with high-grade MCB / MCCB & Type-II AC SPD',
  },
  {
    id: 'dcdb',
    name: 'DCDB (DC Distribution Box)',
    category: 'electrical',
    categoryLabel: 'Solar Electrical',
    image: '/electrical/dcdb_box.jpg',
    description: 'Manufacturing of DC Distribution Boxes built for PV array string isolation, DC surge protection, and high-voltage fuse coordination.',
    application: 'Solar PV String Combiner & DC Array Isolation',
    specification: 'Equipped with 1000V DC Isolator, Fuses & DC Surge Protectors',
  },

  // Category 2: Structural Fabrication
  {
    id: 'solar-structures',
    name: 'Solar Structures',
    category: 'structural',
    categoryLabel: 'Structural Fabrication',
    image: '/gallery/solar_mounting_framework.png',
    description: 'Manufacturing of structural components and robust mounting systems engineered for solar installations.',
    application: 'Ground Mounted Utility, Commercial Rooftops & Solar Sheds',
    specification: 'High-tensile steel cold-roll formed with bolt-together geometry',
  },
  {
    id: 'c-channel-80-40-15',
    name: 'C-Channel 80 × 40 × 15',
    category: 'structural',
    categoryLabel: 'Structural Fabrication',
    image: '/gallery/slotted_c_channels_raw.png',
    description: 'Cold roll-formed structural C-channel section with precision return lips, built for heavy solar purlins and structural rafters.',
    application: 'Primary Solar Rafters, Heavy Purlins & Industrial Framing',
    specification: '80 mm (Web) × 40 mm (Flange) × 15 mm (Return Lip)',
  },
  {
    id: 'c-channel-60-40-15',
    name: 'C-Channel 60 × 40 × 15',
    category: 'structural',
    categoryLabel: 'Structural Fabrication',
    image: '/gallery/slotted_c_channels_raw.png',
    description: 'Precision cold-formed structural C-channel profile engineered for secondary spans, module mounting rails, and bracing.',
    application: 'Module Support Rails, Cross Bracing & Secondary Framing',
    specification: '60 mm (Web) × 40 mm (Flange) × 15 mm (Return Lip)',
  },
  {
    id: 'strut-channel-41-41',
    name: '41 × 41 Strut Channel',
    category: 'structural',
    categoryLabel: 'Structural Fabrication',
    image: '/gallery/slotted_strut_channel.png',
    description: 'Precision slotted structural strut channel engineered with inward clamping return lips for modular framing and hardware attachment.',
    application: 'Modular Solar Array Framework, Cable Trays & Mounting Struts',
    specification: '41 mm × 41 mm Square Strut Profile',
  },

  // Category 3: Components & Services
  {
    id: 'u-clamp',
    name: 'U-Clamp',
    category: 'components',
    categoryLabel: 'Components',
    image: '/hardware/u_clamp.jpg',
    description: 'Precision galvanized structural U-clamp engineered for rigid mechanical retention around structural pipes and purlin intersections.',
    application: 'Pipe-to-Rail Clamping, Column Bracing & Framework Retention',
    specification: 'Fabricated for standard structural pipe & channel diameters',
  },
  {
    id: 'mid-clamp',
    name: 'Mid Clamp',
    category: 'components',
    categoryLabel: 'Components',
    image: '/hardware/middle-clamp-hdg.jpg',
    description: 'Precision-formed solar module intermediate clamp engineered to secure adjacent framed PV panels firmly to mounting channels.',
    application: 'Intermediate PV Module Retention on Struts and Purlins',
    specification: 'Engineered for standard framed solar PV modules',
  },
  {
    id: 'z-clamp',
    name: 'Z-Clamp',
    category: 'components',
    categoryLabel: 'Components',
    image: '/hardware/end-clamp-hdg.jpg',
    description: 'Perimeter end-clamp engineered to anchor the terminal edges of solar PV module strings securely to the rail profile.',
    application: 'Array Perimeter & End-of-Row PV Module Edge Locking',
    specification: 'Engineered for standard outer frame heights',
  },
];

export const ProductsPage: React.FC<ProductsPageProps> = ({ onEnquireClick }) => {
  useSEO({
    title: 'Products & Services | Central Structure Fabrication (CSF) — Solar Electrical & Structural Steel',
    description:
      'Explore CSF product portfolio: Solar Hybrid Inverters, ACDB / DCDB manufacturing, Solar Structure fabrication, C-Channels 80×40×15, 60×40×15, 41×41 Strut Channels, and solar clamps.',
    keywords:
      'CSF products, solar electrical products, solar hybrid inverters, ACDB DCDB manufacturer, solar mounting structures, C-channel 80x40x15, C-channel 60x40x15, 41x41 strut channel, solar clamps',
    canonical: 'https://www.csfabrication.in/products',
    ogTitle: 'CSF Products & Services — Solar Electrical & Structural Fabrication',
    ogDescription:
      'Precision structural profiles, solar electrical equipment, and mounting components manufactured and supplied by Central Structure Fabrication.',
  });

  const [activeTab, setActiveTab] = useState<'all' | 'electrical' | 'structural' | 'components'>('all');
  const [selectedProfile, setSelectedProfile] = useState<'80x40' | '60x40' | '41x41'>('80x40');

  const filteredProducts = activeTab === 'all'
    ? PRODUCTS_DATA
    : PRODUCTS_DATA.filter(p => p.category === activeTab);

  return (
    <div className="w-full bg-[#FFFFFF] text-[#0F2130] font-sans pt-28 pb-24">
      {/* ── Page Header ── */}
      <div className="max-w-[1340px] mx-auto px-6 md:px-12 lg:px-20 mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0049CA]/10 border border-[#0049CA]/20 text-[#0049CA] text-xs font-semibold uppercase tracking-wider mb-4">
          <span className="w-2 h-2 rounded-full bg-[#0049CA]" />
          <span>Product Portfolio &amp; Services</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight uppercase text-[#0F2130] leading-[1.08]">
          SOLAR ELECTRICAL &amp;<br />
          <span className="text-[#0049CA]">STRUCTURAL FABRICATION</span>
        </h1>

        <p className="text-base sm:text-lg text-[#647488] max-w-3xl mt-4 font-normal leading-relaxed">
          From solar electrical products and distribution boxes to precision-fabricated steel C-channels and mounting components, CSF delivers solutions engineered for dependable solar infrastructure.
        </p>

        {/* Quick Jump Buttons */}
        <div className="flex flex-wrap items-center gap-3 mt-8">
          <a
            href="#showcase"
            className="px-5 py-2.5 bg-[#0049CA] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#003CAD] transition-colors rounded-none shadow-xs"
          >
            Product Showcase (10)
          </a>
          <a
            href="#structural"
            className="px-5 py-2.5 bg-white border border-[#E5E7EB] hover:border-[#0049CA] text-[#0F2130] text-xs font-semibold uppercase tracking-wider transition-colors rounded-none"
          >
            Structural Profiles &amp; CAD
          </a>
          <a
            href="#electrical"
            className="px-5 py-2.5 bg-white border border-[#E5E7EB] hover:border-[#0049CA] text-[#0F2130] text-xs font-semibold uppercase tracking-wider transition-colors rounded-none"
          >
            Solar Electrical Systems
          </a>
          <a
            href="#components"
            className="px-5 py-2.5 bg-white border border-[#E5E7EB] hover:border-[#0049CA] text-[#0F2130] text-xs font-semibold uppercase tracking-wider transition-colors rounded-none"
          >
            Clamping Hardware
          </a>
        </div>
      </div>

      {/* ── 3-Category Architecture ── */}
      <section className="max-w-[1340px] mx-auto px-6 md:px-12 lg:px-20 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cat 1: Solar Electrical */}
          <div className="border border-[#E5E7EB] bg-[#F8FAFC] p-8 flex flex-col justify-between hover:border-[#0049CA] transition-colors">
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
                <span className="text-xs font-bold text-[#647488] uppercase tracking-wider">CATEGORY 01</span>
                <Zap className="w-5 h-5 text-[#0049CA]" />
              </div>
              <h2 className="text-2xl font-bold text-[#0F2130] uppercase tracking-tight">
                SOLAR ELECTRICAL
              </h2>
              <p className="text-xs text-[#647488] leading-relaxed">
                Electrical products and systems supporting reliable solar installations.
              </p>
              <div className="flex flex-col gap-3 pt-2">
                <div className="p-3 bg-white border border-[#E5E7EB]">
                  <span className="text-xs font-bold text-[#0F2130] uppercase block">SOLAR HYBRID INVERTER TRADING</span>
                  <span className="text-[11px] text-[#647488] block mt-0.5">Supply and trading of solar hybrid inverters for solar power applications.</span>
                </div>
                <div className="p-3 bg-white border border-[#E5E7EB]">
                  <span className="text-xs font-bold text-[#0F2130] uppercase block">ACDB / DCDB MANUFACTURING</span>
                  <span className="text-[11px] text-[#647488] block mt-0.5">Manufacturing of AC Distribution Boxes and DC Distribution Boxes for solar electrical systems.</span>
                </div>
              </div>
            </div>
            <a
              href="#electrical"
              className="mt-6 text-xs font-semibold text-[#0049CA] hover:text-[#0F2130] uppercase tracking-wider inline-flex items-center gap-1.5"
            >
              <span>View Electrical Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Cat 2: Structural Fabrication */}
          <div className="border border-[#E5E7EB] bg-[#F8FAFC] p-8 flex flex-col justify-between hover:border-[#0049CA] transition-colors">
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
                <span className="text-xs font-bold text-[#647488] uppercase tracking-wider">CATEGORY 02</span>
                <Layers className="w-5 h-5 text-[#0049CA]" />
              </div>
              <h2 className="text-2xl font-bold text-[#0F2130] uppercase tracking-tight">
                STRUCTURAL FABRICATION
              </h2>
              <p className="text-xs text-[#647488] leading-relaxed">
                Precision-fabricated structural components developed for solar and related applications.
              </p>
              <div className="flex flex-col gap-3 pt-2">
                <div className="p-3 bg-white border border-[#E5E7EB]">
                  <span className="text-xs font-bold text-[#0F2130] uppercase block">SOLAR STRUCTURE MANUFACTURING</span>
                  <span className="text-[11px] text-[#647488] block mt-0.5">Manufacturing of structural components and mounting systems for solar installations.</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 bg-white border border-[#E5E7EB]">
                    <span className="text-[10px] text-[#647488] uppercase block">C-CHANNEL</span>
                    <span className="text-xs font-bold text-[#0049CA]">80 × 40 × 15</span>
                  </div>
                  <div className="p-2.5 bg-white border border-[#E5E7EB]">
                    <span className="text-[10px] text-[#647488] uppercase block">C-CHANNEL</span>
                    <span className="text-xs font-bold text-[#0049CA]">60 × 40 × 15</span>
                  </div>
                </div>
                <div className="p-2.5 bg-white border border-[#E5E7EB]">
                  <span className="text-[10px] text-[#647488] uppercase block">STRUT PROFILE</span>
                  <span className="text-xs font-bold text-[#0049CA]">41 × 41 STRUT CHANNEL</span>
                </div>
              </div>
            </div>
            <a
              href="#structural"
              className="mt-6 text-xs font-semibold text-[#0049CA] hover:text-[#0F2130] uppercase tracking-wider inline-flex items-center gap-1.5"
            >
              <span>View Structural Profiles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Cat 3: Components & Services */}
          <div className="border border-[#E5E7EB] bg-[#F8FAFC] p-8 flex flex-col justify-between hover:border-[#0049CA] transition-colors">
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
                <span className="text-xs font-bold text-[#647488] uppercase tracking-wider">CATEGORY 03</span>
                <Wrench className="w-5 h-5 text-[#0049CA]" />
              </div>
              <h2 className="text-2xl font-bold text-[#0F2130] uppercase tracking-tight">
                COMPONENTS &amp; SERVICES
              </h2>
              <p className="text-xs text-[#647488] leading-relaxed">
                Supporting components and on-site services for complete solar infrastructure requirements.
              </p>
              <div className="flex flex-col gap-3 pt-2">
                <div className="p-3 bg-white border border-[#E5E7EB]">
                  <span className="text-[10px] text-[#647488] uppercase font-semibold block mb-1">CLAMPS</span>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-0.5 bg-[#F8FAFC] border border-[#E5E7EB] text-xs font-bold text-[#0F2130]">U-CLAMP</span>
                    <span className="px-2 py-0.5 bg-[#F8FAFC] border border-[#E5E7EB] text-xs font-bold text-[#0F2130]">MID CLAMP</span>
                    <span className="px-2 py-0.5 bg-[#F8FAFC] border border-[#E5E7EB] text-xs font-bold text-[#0F2130]">Z-CLAMP</span>
                  </div>
                </div>
                <div className="p-3 bg-white border border-[#E5E7EB]">
                  <span className="text-[10px] text-[#647488] uppercase font-semibold block mb-1">SERVICES</span>
                  <div className="flex flex-col gap-1 text-xs font-medium text-[#0F2130]">
                    <span>• INSTALLATION</span>
                    <span>• COMPLETION</span>
                    <span>• COMMISSIONING</span>
                  </div>
                </div>
              </div>
            </div>
            <a
              href="#components"
              className="mt-6 text-xs font-semibold text-[#0049CA] hover:text-[#0F2130] uppercase tracking-wider inline-flex items-center gap-1.5"
            >
              <span>View Hardware &amp; Services</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* ── Dedicated 10-Product Showcase Grid ── */}
      <section id="showcase" className="max-w-[1340px] mx-auto px-6 md:px-12 lg:px-20 mb-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E5E7EB] mb-10">
          <div>
            <span className="text-xs font-bold text-[#0049CA] uppercase tracking-wider">
              SHOWCASE // 10 PRODUCTS
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold uppercase tracking-tight text-[#0F2130] mt-1">
              TECHNICAL PRODUCT CATALOG
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 bg-[#F8FAFC] border border-[#E5E7EB] p-1">
            {[
              { key: 'all', label: 'ALL PRODUCTS (10)' },
              { key: 'electrical', label: 'SOLAR ELECTRICAL (3)' },
              { key: 'structural', label: 'STRUCTURAL (4)' },
              { key: 'components', label: 'COMPONENTS (3)' },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  activeTab === tab.key
                    ? 'bg-[#0049CA] text-white shadow-xs'
                    : 'text-[#647488] hover:text-[#0F2130]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="border border-[#E5E7EB] bg-white flex flex-col justify-between hover:border-[#0049CA] transition-all duration-200 hover:shadow-md group"
            >
              <div className="w-full h-56 bg-[#F8FAFC] border-b border-[#E5E7EB] overflow-hidden relative p-4 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#0F2130] text-white text-[10px] font-semibold uppercase tracking-wider">
                  {product.categoryLabel}
                </span>
              </div>

              <div className="p-6 flex flex-col justify-between flex-grow gap-4">
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-bold text-[#0F2130] uppercase tracking-tight group-hover:text-[#0049CA] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-[#647488] leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E5E7EB] flex flex-col gap-2 text-xs">
                  <div>
                    <span className="text-[10px] text-[#647488] uppercase font-medium block">APPLICATION</span>
                    <span className="text-[#0F2130] font-medium">{product.application}</span>
                  </div>
                  {product.specification && (
                    <div>
                      <span className="text-[10px] text-[#647488] uppercase font-medium block">SPECIFICATION</span>
                      <span className="text-[#0049CA] font-bold">{product.specification}</span>
                    </div>
                  )}
                </div>

                <Link
                  to="/contact"
                  onClick={() => {
                    if (onEnquireClick) onEnquireClick(product.name);
                  }}
                  className="mt-2 w-full py-3 bg-[#F8FAFC] hover:bg-[#0049CA] border border-[#E5E7EB] hover:border-[#0049CA] text-[#0F2130] hover:text-white text-xs font-semibold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <span>REQUEST PROPOSAL / SPEC</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Structural Fabrication Section ── */}
      <section id="structural" className="max-w-[1340px] mx-auto px-6 md:px-12 lg:px-20 mb-24 pt-12 border-t border-[#E5E7EB]">
        <div className="flex flex-col gap-8">
          <div>
            <span className="text-xs font-bold text-[#0049CA] uppercase tracking-wider">
              SECTION 04 // STRUCTURAL PROFILES
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold uppercase tracking-tight text-[#0F2130] mt-1">
              PRECISION IN EVERY SECTION.
            </h2>
            <p className="text-sm sm:text-base text-[#647488] max-w-3xl mt-2">
              CSF manufactures structural profiles and solar mounting components with a focus on consistency, precision and dependable application.
            </p>
          </div>

          {/* Interactive CAD Diagram Container */}
          <div className="bg-[#F8FAFC] border border-[#E5E7EB] p-8">
            <div className="flex flex-wrap items-center gap-3 pb-6 border-b border-[#E5E7EB]">
              {[
                { key: '80x40', label: '80 × 40 × 15 C-CHANNEL' },
                { key: '60x40', label: '60 × 40 × 15 C-CHANNEL' },
                { key: '41x41', label: '41 × 41 STRUT CHANNEL' },
              ].map(item => (
                <button
                  key={item.key}
                  onClick={() => setSelectedProfile(item.key as any)}
                  className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                    selectedProfile === item.key
                      ? 'bg-[#0049CA] text-white'
                      : 'bg-white border border-[#E5E7EB] text-[#0F2130] hover:border-[#0049CA]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8">
              <div className="lg:col-span-5 bg-white border border-[#E5E7EB] p-8 flex items-center justify-center">
                {selectedProfile === '80x40' && (
                  <svg viewBox="0 0 240 240" className="w-56 h-56">
                    <line x1="30" y1="30" x2="30" y2="210" stroke="#0049CA" strokeWidth="1" strokeDasharray="2,2" />
                    <text x="18" y="125" fill="#0049CA" fontSize="10" fontWeight="bold" textAnchor="middle">80 mm</text>
                    <line x1="50" y1="225" x2="170" y2="225" stroke="#0049CA" strokeWidth="1" strokeDasharray="2,2" />
                    <text x="110" y="238" fill="#0049CA" fontSize="10" fontWeight="bold" textAnchor="middle">40 mm</text>
                    <path
                      d="M 135 40 L 50 40 L 50 200 L 135 200 L 135 170 L 125 170 L 125 190 L 60 190 L 60 50 L 125 50 L 125 70 L 135 70 Z"
                      fill="#0049CA"
                      fillOpacity="0.12"
                      stroke="#0049CA"
                      strokeWidth="2.5"
                    />
                    <text x="145" y="60" fill="#647488" fontSize="8" fontWeight="600">Lip: 15 mm</text>
                  </svg>
                )}
                {selectedProfile === '60x40' && (
                  <svg viewBox="0 0 240 240" className="w-56 h-56">
                    <line x1="30" y1="50" x2="30" y2="190" stroke="#0049CA" strokeWidth="1" strokeDasharray="2,2" />
                    <text x="18" y="125" fill="#0049CA" fontSize="10" fontWeight="bold" textAnchor="middle">60 mm</text>
                    <line x1="50" y1="210" x2="170" y2="210" stroke="#0049CA" strokeWidth="1" strokeDasharray="2,2" />
                    <text x="110" y="224" fill="#0049CA" fontSize="10" fontWeight="bold" textAnchor="middle">40 mm</text>
                    <path
                      d="M 135 60 L 50 60 L 50 180 L 135 180 L 135 155 L 125 155 L 125 170 L 60 170 L 60 70 L 125 70 L 125 85 L 135 85 Z"
                      fill="#0049CA"
                      fillOpacity="0.12"
                      stroke="#0049CA"
                      strokeWidth="2.5"
                    />
                    <text x="145" y="75" fill="#647488" fontSize="8" fontWeight="600">Lip: 15 mm</text>
                  </svg>
                )}
                {selectedProfile === '41x41' && (
                  <svg viewBox="0 0 240 240" className="w-56 h-56">
                    <line x1="30" y1="60" x2="30" y2="180" stroke="#0049CA" strokeWidth="1" strokeDasharray="2,2" />
                    <text x="18" y="125" fill="#0049CA" fontSize="10" fontWeight="bold" textAnchor="middle">41 mm</text>
                    <line x1="50" y1="200" x2="170" y2="200" stroke="#0049CA" strokeWidth="1" strokeDasharray="2,2" />
                    <text x="110" y="215" fill="#0049CA" fontSize="10" fontWeight="bold" textAnchor="middle">41 mm</text>
                    <path
                      d="M 135 70 L 50 70 L 50 170 L 150 170 L 150 70 L 130 70 L 130 85 L 140 85 L 140 160 L 60 160 L 60 80 L 120 80 L 120 70 Z"
                      fill="#0049CA"
                      fillOpacity="0.12"
                      stroke="#0049CA"
                      strokeWidth="2.5"
                    />
                    <text x="100" y="120" fill="#647488" fontSize="8" fontWeight="600">Slotted Base</text>
                  </svg>
                )}
              </div>

              <div className="lg:col-span-7 flex flex-col gap-4">
                <h3 className="text-xl font-bold text-[#0F2130] uppercase">
                  {selectedProfile === '80x40' && 'C-CHANNEL 80 × 40 × 15 MM'}
                  {selectedProfile === '60x40' && 'C-CHANNEL 60 × 40 × 15 MM'}
                  {selectedProfile === '41x41' && '41 × 41 STRUT CHANNEL'}
                </h3>
                <p className="text-xs text-[#647488] leading-relaxed">
                  {selectedProfile === '80x40' && 'High-capacity cold roll-formed structural purlin member designed for heavy-duty main rafters, long-span arrays, and utility solar purlin runs.'}
                  {selectedProfile === '60x40' && 'Medium structural member engineered for module mounting rails, intermediate purlins, and structural angle bracing with tight dimensional tolerances.'}
                  {selectedProfile === '41x41' && 'Continuous modular square strut profile with inward return lips locking standard spring channel nuts for fast hardware alignment.'}
                </p>
                <div className="flex flex-col gap-2 pt-2 text-xs text-[#0F2130]">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#0049CA]" />
                    <span>Roll-formed with uniform web profiles and consistent return lips</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#0049CA]" />
                    <span>Pre-punched CNC slots enable fast on-site bolt connection</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Solar Electrical Section ── */}
      <section id="electrical" className="max-w-[1340px] mx-auto px-6 md:px-12 lg:px-20 mb-24 pt-12 border-t border-[#E5E7EB]">
        <div className="flex flex-col gap-8">
          <div>
            <span className="text-xs font-bold text-[#0049CA] uppercase tracking-wider">
              SECTION 05 // POWER CONVERSION &amp; PROTECTION
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold uppercase tracking-tight text-[#0F2130] mt-1">
              POWERING THE SYSTEM BEHIND THE STRUCTURE.
            </h2>
            <p className="text-sm sm:text-base text-[#647488] max-w-3xl mt-2">
              CSF supplies solar hybrid inverters and manufactures certified AC and DC distribution boxes to safeguard solar electrical infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-[#F8FAFC] border border-[#E5E7EB] flex flex-col justify-between gap-4">
              <div>
                <span className="text-[10px] text-[#0049CA] font-bold uppercase">SUPPLY &amp; TRADING</span>
                <h3 className="text-lg font-bold text-[#0F2130] uppercase mt-1">Solar Hybrid Inverter</h3>
                <p className="text-xs text-[#647488] mt-2 leading-relaxed">
                  Trading of dependable hybrid inverters for solar power applications. Built for on-grid, off-grid, and battery backup systems.
                </p>
              </div>
              <div className="text-xs text-[#0F2130] pt-2 border-t border-[#E5E7EB]">
                <span>• MPPT Solar Tracking</span><br />
                <span>• Intelligent Power Routing</span>
              </div>
            </div>

            <div className="p-6 bg-[#F8FAFC] border border-[#E5E7EB] flex flex-col justify-between gap-4">
              <div>
                <span className="text-[10px] text-[#0049CA] font-bold uppercase">MANUFACTURING</span>
                <h3 className="text-lg font-bold text-[#0F2130] uppercase mt-1">ACDB Manufacturing</h3>
                <p className="text-xs text-[#647488] mt-2 leading-relaxed">
                  AC Distribution Boxes engineered for inverter output protection, utility grid disconnection, and AC surge suppression.
                </p>
              </div>
              <div className="text-xs text-[#0F2130] pt-2 border-t border-[#E5E7EB]">
                <span>• Weatherproof IP65 Housing</span><br />
                <span>• AC Surge Protective Device (SPD)</span>
              </div>
            </div>

            <div className="p-6 bg-[#F8FAFC] border border-[#E5E7EB] flex flex-col justify-between gap-4">
              <div>
                <span className="text-[10px] text-[#0049CA] font-bold uppercase">MANUFACTURING</span>
                <h3 className="text-lg font-bold text-[#0F2130] uppercase mt-1">DCDB Manufacturing</h3>
                <p className="text-xs text-[#647488] mt-2 leading-relaxed">
                  DC Distribution Boxes engineered for solar string combiner protection, 1000V DC isolation, and lightning surge suppression.
                </p>
              </div>
              <div className="text-xs text-[#0F2130] pt-2 border-t border-[#E5E7EB]">
                <span>• High-Voltage DC Isolator</span><br />
                <span>• DC Cartridge Fuses per String</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Components Section ── */}
      <section id="components" className="max-w-[1340px] mx-auto px-6 md:px-12 lg:px-20 mb-24 pt-12 border-t border-[#E5E7EB]">
        <div className="flex flex-col gap-8">
          <div>
            <span className="text-xs font-bold text-[#0049CA] uppercase tracking-wider">
              SECTION 06 // FASTENING HARDWARE
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold uppercase tracking-tight text-[#0F2130] mt-1">
              SMALL COMPONENTS. CRITICAL CONNECTIONS.
            </h2>
            <p className="text-sm sm:text-base text-[#647488] max-w-3xl mt-2">
              CSF manufactures solar clamps engineered for vibration resistance, firm mechanical retention, and rapid on-site wrench tightening.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-[#E5E7EB] p-6 bg-white flex flex-col gap-4">
              <div className="w-full h-44 bg-[#F8FAFC] overflow-hidden">
                <img src="/hardware/u_clamp.jpg" alt="U-Clamp" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-lg font-bold text-[#0F2130] uppercase">U-CLAMP</h3>
              <p className="text-xs text-[#647488] leading-relaxed">
                Structural clamp for rigid mechanical fixing around structural pipes, support posts, and cross purlins.
              </p>
            </div>

            <div className="border border-[#E5E7EB] p-6 bg-white flex flex-col gap-4">
              <div className="w-full h-44 bg-[#F8FAFC] overflow-hidden">
                <img src="/hardware/middle-clamp-hdg.jpg" alt="Mid Clamp" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-lg font-bold text-[#0F2130] uppercase">MID CLAMP</h3>
              <p className="text-xs text-[#647488] leading-relaxed">
                Intermediate PV module retention clamp designed to lock two adjacent framed panels securely into channel rails.
              </p>
            </div>

            <div className="border border-[#E5E7EB] p-6 bg-white flex flex-col gap-4">
              <div className="w-full h-44 bg-[#F8FAFC] overflow-hidden">
                <img src="/hardware/end-clamp-hdg.jpg" alt="Z-Clamp" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-lg font-bold text-[#0F2130] uppercase">Z-CLAMP</h3>
              <p className="text-xs text-[#647488] leading-relaxed">
                Perimeter end-clamp engineered to firmly secure the outside edge of terminal solar modules at the border of each array.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Callout Bottom Banner ── */}
      <div className="max-w-[1340px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="bg-[#0F2130] text-white p-8 md:p-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-2xl font-bold uppercase tracking-tight">
              REQUIRE PRODUCT SPECIFICATIONS OR CUSTOM SIZES?
            </h3>
            <p className="text-xs text-white/70">
              Speak directly with our technical fabrication desk in Amroha, UP.
            </p>
          </div>
          <Link
            to="/contact"
            className="px-8 py-4 bg-[#0049CA] hover:bg-[#003CAD] text-white text-xs font-semibold uppercase tracking-wider transition-colors rounded-none shadow-sm flex items-center gap-2 cursor-pointer flex-shrink-0"
          >
            <PhoneCall className="w-4 h-4" />
            <span>REQUEST A CALL</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
