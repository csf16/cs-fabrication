import React, { useState } from 'react';
import { Hero3D } from '../components/Hero3D';
import { submitLeadToGoogleSheet, validatePhoneNumber } from '../services/leadService';
import { useSEO } from '../hooks/useSEO';
import {
  ArrowRight,
  Check,
  Zap,
  Layers,
  Wrench,
  ShieldCheck,
  Factory,
  Boxes,
  Compass,
  FileCheck2,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Clock
} from 'lucide-react';

interface HomePageProps {
  onEnquireClick?: (service?: string) => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// 10 PRODUCT SHOWCASE DATA (Exact requirements from Section 08 & 09)
// ─────────────────────────────────────────────────────────────────────────────
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

export const HomePage: React.FC<HomePageProps> = ({ onEnquireClick }) => {
  useSEO({
    title: 'Central Structure Fabrication (CSF) | Solar Electrical Products & Structural Fabrication',
    description:
      'Central Structure Fabrication (CSF) delivers solar electrical products (Hybrid Inverters, ACDB, DCDB) and precision structural fabrication (Solar Structures, C-Channels 80×40×15, 60×40×15, 41×41 Strut Channels, Clamps) with installation and commissioning support.',
    keywords:
      'Central Structure Fabrication, CSF, solar electrical products, solar hybrid inverter trading, ACDB manufacturing, DCDB manufacturing, solar structure manufacturing, C-channel 80x40x15, C-channel 60x40x15, 41x41 strut channel, solar clamps, installation commissioning',
    canonical: 'https://www.csfabrication.in/',
    ogTitle: 'CSF — Solar Electrical Products & Structural Fabrication',
    ogDescription:
      'Engineered for solar. Built for structure. Complete solar electrical products, structural fabrication, components and commissioning support.',
  });

  // Category filter state for Product Showcase
  const [activeShowcaseTab, setActiveShowcaseTab] = useState<'all' | 'electrical' | 'structural' | 'components'>('all');

  // Interactive profile switcher state for Section 04: Structural Fabrication
  const [selectedProfile, setSelectedProfile] = useState<'80x40' | '60x40' | '41x41'>('80x40');

  // Contact Form state (Section 13)
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    requirement: 'Solar Electrical Products',
  });
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFormData(prev => ({ ...prev, phone: val }));
    if (phoneError) {
      const res = validatePhoneNumber(val);
      if (res.isValid) setPhoneError(null);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    const phoneValidation = validatePhoneNumber(formData.phone);
    if (!phoneValidation.isValid) {
      setPhoneError(phoneValidation.error || 'Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    setIsSubmitting(true);
    try {
      await submitLeadToGoogleSheet(
        formData.phone,
        'Home Page - Contact Section',
        {
          name: formData.name,
          company: formData.company,
          requirement: `${formData.requirement}${formData.email ? ` | Email: ${formData.email}` : ''}`,
        }
      );
      setSubmitSuccess(true);
      setFormData({ name: '', company: '', phone: '', email: '', requirement: 'Solar Electrical Products' });
      setPhoneError(null);
    } catch (err: any) {
      setServerError(err?.message || 'Unable to submit request. Please try again or reach out directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const filteredProducts = activeShowcaseTab === 'all'
    ? PRODUCTS_DATA
    : PRODUCTS_DATA.filter(p => p.category === activeShowcaseTab);

  return (
    <div className="w-full bg-[#FFFFFF] text-[#0F2130] font-sans">
      {/* ────────────────────────────────────────────────────────────
          HERO (EXISTING INTERACTIVE 3D ASSEMBLY PRESERVED UNTOUCHED)
      ──────────────────────────────────────────────────────────── */}
      <Hero3D />

      {/* ────────────────────────────────────────────────────────────
          01 — INTRODUCTION SECTION
          Headline: ENGINEERED FOR SOLAR. BUILT FOR STRUCTURE.
      ──────────────────────────────────────────────────────────── */}
      <section id="intro" className="py-24 px-6 md:px-12 lg:px-20 max-w-[1340px] mx-auto border-b border-[#E5E7EB]">
        <div className="flex flex-col gap-12">
          {/* Header Tag & Statement */}
          <div className="flex flex-col gap-4 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0049CA]/10 border border-[#0049CA]/20 text-[#0049CA] text-xs font-semibold uppercase tracking-wider w-fit">
              <span className="w-2 h-2 rounded-full bg-[#0049CA]" />
              <span>01 // Corporate Foundation</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F2130] uppercase leading-[1.12]">
              ENGINEERED FOR SOLAR.<br />
              BUILT FOR STRUCTURE.
            </h2>

            <p className="text-base sm:text-lg text-[#647488] font-normal leading-relaxed pt-2">
              From solar electrical products to precision-fabricated structures and components, CSF delivers solutions designed for dependable solar infrastructure.
            </p>
          </div>

          {/* Visual Relationship: Solar Electrical + Structural Fabrication */}
          <div className="grid grid-cols-1 lg:grid-cols-11 gap-6 items-stretch pt-4">
            {/* Pillar A: Solar Electrical */}
            <div className="lg:col-span-5 bg-[#F8FAFC] border border-[#E5E7EB] p-8 flex flex-col justify-between transition-all duration-200 hover:border-[#0049CA]/40">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0049CA] tracking-wider uppercase">DOMAIN A</span>
                  <Zap className="w-5 h-5 text-[#0049CA]" />
                </div>
                <h3 className="text-2xl font-bold text-[#0F2130] uppercase tracking-tight">
                  SOLAR ELECTRICAL
                </h3>
                <p className="text-sm text-[#647488] leading-relaxed">
                  Electrical distribution and power conversion systems engineered to safeguard solar generation and regulate on-grid and hybrid energy flow.
                </p>
                <div className="flex flex-col gap-2 pt-2 text-xs text-[#0F2130] font-medium border-t border-[#E5E7EB]">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0049CA]" />
                    <span>Solar Hybrid Inverter Trading</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0049CA]" />
                    <span>ACDB (AC Distribution Box) Manufacturing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0049CA]" />
                    <span>DCDB (DC Distribution Box) Manufacturing</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => scrollToSection('solar-electrical')}
                className="mt-6 text-xs font-semibold text-[#0049CA] hover:text-[#0F2130] uppercase tracking-wider inline-flex items-center gap-1.5 cursor-pointer w-fit"
              >
                <span>Explore Electrical Systems</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Connecting Geometric Node */}
            <div className="lg:col-span-1 flex flex-col items-center justify-center py-4 lg:py-0">
              <div className="w-10 h-10 bg-[#0F2130] text-white flex items-center justify-center font-bold text-lg shadow-sm">
                +
              </div>
            </div>

            {/* Pillar B: Structural Fabrication */}
            <div className="lg:col-span-5 bg-[#F8FAFC] border border-[#E5E7EB] p-8 flex flex-col justify-between transition-all duration-200 hover:border-[#0049CA]/40">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0049CA] tracking-wider uppercase">DOMAIN B</span>
                  <Layers className="w-5 h-5 text-[#0049CA]" />
                </div>
                <h3 className="text-2xl font-bold text-[#0F2130] uppercase tracking-tight">
                  STRUCTURAL FABRICATION
                </h3>
                <p className="text-sm text-[#647488] leading-relaxed">
                  Precision roll-formed steel framework profiles, purlins, strut channels, and mounting components built for mechanical rigidity and site assembly.
                </p>
                <div className="flex flex-col gap-2 pt-2 text-xs text-[#0F2130] font-medium border-t border-[#E5E7EB]">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0049CA]" />
                    <span>Solar Structure Manufacturing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0049CA]" />
                    <span>C-Channels (80 × 40 × 15 &amp; 60 × 40 × 15)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0049CA]" />
                    <span>41 × 41 Strut Channels &amp; Mounting Clamps</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => scrollToSection('structural-fabrication')}
                className="mt-6 text-xs font-semibold text-[#0049CA] hover:text-[#0F2130] uppercase tracking-wider inline-flex items-center gap-1.5 cursor-pointer w-fit"
              >
                <span>Explore Structural Profiles</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          02 — PRODUCTS & SERVICES SECTION
          3-Category Overview Layout
      ──────────────────────────────────────────────────────────── */}
      <section id="products-services" className="py-24 px-6 md:px-12 lg:px-20 max-w-[1340px] mx-auto border-b border-[#E5E7EB]">
        <div className="flex flex-col gap-12">
          {/* Header */}
          <div className="flex flex-col gap-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0049CA]/10 border border-[#0049CA]/20 text-[#0049CA] text-xs font-semibold uppercase tracking-wider w-fit">
              <span className="w-2 h-2 rounded-full bg-[#0049CA]" />
              <span>02 // Portfolio Overview</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F2130] uppercase leading-[1.12]">
              PRODUCTS &amp; SERVICES
            </h2>
            <p className="text-base text-[#647488] font-normal leading-relaxed">
              CSF structures its operations into three integrated divisions to support every stage of solar infrastructure development.
            </p>
          </div>

          {/* 3-Column Category Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Category 01: SOLAR ELECTRICAL */}
            <div className="border border-[#E5E7EB] bg-[#FFFFFF] p-8 flex flex-col justify-between transition-all duration-200 hover:border-[#0049CA] hover:shadow-sm">
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB]">
                  <span className="text-xs font-bold text-[#647488] tracking-widest uppercase">CATEGORY 01</span>
                  <Zap className="w-5 h-5 text-[#0049CA]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#0F2130] uppercase tracking-tight">
                    SOLAR ELECTRICAL
                  </h3>
                  <p className="text-sm text-[#647488] leading-relaxed mt-2">
                    Electrical products and systems supporting reliable solar installations.
                  </p>
                </div>

                <div className="flex flex-col gap-4 pt-2">
                  <div className="p-4 bg-[#F8FAFC] border border-[#E5E7EB]">
                    <h4 className="text-xs font-bold text-[#0F2130] uppercase tracking-wide">
                      SOLAR HYBRID INVERTER TRADING
                    </h4>
                    <p className="text-xs text-[#647488] mt-1 leading-relaxed">
                      Supply and trading of solar hybrid inverters for solar power applications.
                    </p>
                  </div>

                  <div className="p-4 bg-[#F8FAFC] border border-[#E5E7EB]">
                    <h4 className="text-xs font-bold text-[#0F2130] uppercase tracking-wide">
                      ACDB / DCDB MANUFACTURING
                    </h4>
                    <p className="text-xs text-[#647488] mt-1 leading-relaxed">
                      Manufacturing of AC Distribution Boxes and DC Distribution Boxes for solar electrical systems.
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setActiveShowcaseTab('electrical');
                  scrollToSection('showcase');
                }}
                className="mt-8 w-full py-3.5 bg-[#0049CA] hover:bg-[#003CAD] text-white text-xs font-semibold uppercase tracking-wider rounded-none transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span>EXPLORE SOLAR ELECTRICAL</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Category 02: STRUCTURAL FABRICATION */}
            <div className="border border-[#E5E7EB] bg-[#FFFFFF] p-8 flex flex-col justify-between transition-all duration-200 hover:border-[#0049CA] hover:shadow-sm">
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB]">
                  <span className="text-xs font-bold text-[#647488] tracking-widest uppercase">CATEGORY 02</span>
                  <Layers className="w-5 h-5 text-[#0049CA]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#0F2130] uppercase tracking-tight">
                    STRUCTURAL FABRICATION
                  </h3>
                  <p className="text-sm text-[#647488] leading-relaxed mt-2">
                    Precision-fabricated structural components developed for solar and related applications.
                  </p>
                </div>

                <div className="flex flex-col gap-3 pt-2">
                  <div className="p-4 bg-[#F8FAFC] border border-[#E5E7EB]">
                    <h4 className="text-xs font-bold text-[#0F2130] uppercase tracking-wide">
                      SOLAR STRUCTURE MANUFACTURING
                    </h4>
                    <p className="text-xs text-[#647488] mt-1 leading-relaxed">
                      Manufacturing of structural components and mounting systems for solar installations.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-3 bg-[#F8FAFC] border border-[#E5E7EB]">
                      <span className="text-[10px] text-[#647488] uppercase block font-medium">C-CHANNEL</span>
                      <span className="text-xs font-bold text-[#0049CA] tracking-wide">80 × 40 × 15</span>
                    </div>
                    <div className="p-3 bg-[#F8FAFC] border border-[#E5E7EB]">
                      <span className="text-[10px] text-[#647488] uppercase block font-medium">C-CHANNEL</span>
                      <span className="text-xs font-bold text-[#0049CA] tracking-wide">60 × 40 × 15</span>
                    </div>
                  </div>

                  <div className="p-3 bg-[#F8FAFC] border border-[#E5E7EB]">
                    <span className="text-[10px] text-[#647488] uppercase block font-medium">STRUT PROFILE</span>
                    <span className="text-xs font-bold text-[#0049CA] tracking-wide">41 × 41 STRUT CHANNEL</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setActiveShowcaseTab('structural');
                  scrollToSection('showcase');
                }}
                className="mt-8 w-full py-3.5 bg-[#0049CA] hover:bg-[#003CAD] text-white text-xs font-semibold uppercase tracking-wider rounded-none transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span>EXPLORE STRUCTURAL FABRICATION</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Category 03: COMPONENTS & SERVICES */}
            <div className="border border-[#E5E7EB] bg-[#FFFFFF] p-8 flex flex-col justify-between transition-all duration-200 hover:border-[#0049CA] hover:shadow-sm">
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB]">
                  <span className="text-xs font-bold text-[#647488] tracking-widest uppercase">CATEGORY 03</span>
                  <Wrench className="w-5 h-5 text-[#0049CA]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#0F2130] uppercase tracking-tight">
                    COMPONENTS &amp; SERVICES
                  </h3>
                  <p className="text-sm text-[#647488] leading-relaxed mt-2">
                    Supporting components and on-site services for complete solar infrastructure requirements.
                  </p>
                </div>

                <div className="flex flex-col gap-3 pt-2">
                  <div className="p-4 bg-[#F8FAFC] border border-[#E5E7EB]">
                    <span className="text-[10px] text-[#647488] uppercase block font-semibold mb-1">HARDWARE COMPONENTS</span>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2.5 py-1 bg-white border border-[#E5E7EB] text-xs font-bold text-[#0F2130]">U-CLAMP</span>
                      <span className="px-2.5 py-1 bg-white border border-[#E5E7EB] text-xs font-bold text-[#0F2130]">MID CLAMP</span>
                      <span className="px-2.5 py-1 bg-white border border-[#E5E7EB] text-xs font-bold text-[#0F2130]">Z-CLAMP</span>
                    </div>
                  </div>

                  <div className="p-4 bg-[#F8FAFC] border border-[#E5E7EB]">
                    <span className="text-[10px] text-[#647488] uppercase block font-semibold mb-1">ON-SITE SERVICES</span>
                    <div className="flex flex-col gap-1.5 text-xs text-[#0F2130] font-medium">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0049CA]" />
                        <span>INSTALLATION</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0049CA]" />
                        <span>COMPLETION</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0049CA]" />
                        <span>COMMISSIONING</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setActiveShowcaseTab('components');
                  scrollToSection('showcase');
                }}
                className="mt-8 w-full py-3.5 bg-[#0049CA] hover:bg-[#003CAD] text-white text-xs font-semibold uppercase tracking-wider rounded-none transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span>EXPLORE COMPONENTS &amp; SERVICES</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          03 — PRODUCT SHOWCASE SECTION
          Dedicated 10-Product Showcase Grid
      ──────────────────────────────────────────────────────────── */}
      <section id="showcase" className="py-24 px-6 md:px-12 lg:px-20 max-w-[1340px] mx-auto border-b border-[#E5E7EB]">
        <div className="flex flex-col gap-10">
          {/* Section Header & Filter Tabs */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex flex-col gap-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0049CA]/10 border border-[#0049CA]/20 text-[#0049CA] text-xs font-semibold uppercase tracking-wider w-fit">
                <span className="w-2 h-2 rounded-full bg-[#0049CA]" />
                <span>03 // Product Catalog</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F2130] uppercase leading-[1.12]">
                PRODUCT SHOWCASE
              </h2>
              <p className="text-sm sm:text-base text-[#647488] font-normal leading-relaxed">
                Technical specification catalog of all primary solar electrical, structural framework, and clamping products manufactured and supplied by CSF.
              </p>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2 bg-[#F8FAFC] border border-[#E5E7EB] p-1.5 self-start md:self-auto">
              {[
                { key: 'all', label: 'ALL PRODUCTS (10)' },
                { key: 'electrical', label: 'SOLAR ELECTRICAL (3)' },
                { key: 'structural', label: 'STRUCTURAL (4)' },
                { key: 'components', label: 'COMPONENTS (3)' },
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveShowcaseTab(tab.key as any)}
                  className={`px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    activeShowcaseTab === tab.key
                      ? 'bg-[#0049CA] text-white shadow-xs'
                      : 'text-[#647488] hover:text-[#0F2130] hover:bg-white/60'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* 10-Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <div
                key={product.id}
                className="border border-[#E5E7EB] bg-[#FFFFFF] flex flex-col justify-between transition-all duration-200 hover:border-[#0049CA] hover:shadow-md group"
              >
                {/* Product Image Frame */}
                <div className="w-full h-52 bg-[#F8FAFC] border-b border-[#E5E7EB] overflow-hidden relative flex items-center justify-center p-4">
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

                {/* Product Body */}
                <div className="p-6 flex flex-col justify-between flex-grow gap-4">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-bold text-[#0F2130] uppercase tracking-tight group-hover:text-[#0049CA] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-[#647488] leading-relaxed line-clamp-3">
                      {product.description}
                    </p>
                  </div>

                  {/* Application & Specification */}
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

                  {/* Action */}
                  <button
                    onClick={() => {
                      if (onEnquireClick) onEnquireClick(product.name);
                      scrollToSection('contact');
                    }}
                    className="mt-2 w-full py-2.5 bg-[#F8FAFC] hover:bg-[#0049CA] border border-[#E5E7EB] hover:border-[#0049CA] text-[#0F2130] hover:text-white text-xs font-semibold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>REQUEST SPEC / ENQUIRE</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          04 — STRUCTURAL FABRICATION SECTION
          Headline: PRECISION IN EVERY SECTION.
          Showcases: C-Channel 80x40x15, C-Channel 60x40x15, 41x41 Strut Channel
      ──────────────────────────────────────────────────────────── */}
      <section id="structural-fabrication" className="py-24 px-6 md:px-12 lg:px-20 max-w-[1340px] mx-auto border-b border-[#E5E7EB]">
        <div className="flex flex-col gap-12">
          {/* Header */}
          <div className="flex flex-col gap-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0049CA]/10 border border-[#0049CA]/20 text-[#0049CA] text-xs font-semibold uppercase tracking-wider w-fit">
              <span className="w-2 h-2 rounded-full bg-[#0049CA]" />
              <span>04 // Cold Roll-Forming &amp; Punching</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F2130] uppercase leading-[1.12]">
              PRECISION IN EVERY SECTION.
            </h2>
            <p className="text-base sm:text-lg text-[#647488] font-normal leading-relaxed">
              CSF manufactures structural profiles and solar mounting components with a focus on consistency, precision and dependable application.
            </p>
          </div>

          {/* Engineering Spec Sheet & Interactive Profile Showcase */}
          <div className="bg-[#F8FAFC] border border-[#E5E7EB] p-6 md:p-10">
            {/* Top Controls: Profile Switcher Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E5E7EB] gap-4">
              <div>
                <span className="text-xs font-bold text-[#647488] uppercase tracking-wider">
                  ENGINEERING SPECIFICATION SHEET // PROFILES
                </span>
                <p className="text-xs text-[#647488] mt-0.5">Select a structural profile to inspect cross-section geometry</p>
              </div>

              <div className="flex items-center gap-2">
                {[
                  { key: '80x40', label: '80 × 40 × 15 C-CHANNEL' },
                  { key: '60x40', label: '60 × 40 × 15 C-CHANNEL' },
                  { key: '41x41', label: '41 × 41 STRUT CHANNEL' },
                ].map(prof => (
                  <button
                    key={prof.key}
                    onClick={() => setSelectedProfile(prof.key as any)}
                    className={`px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                      selectedProfile === prof.key
                        ? 'bg-[#0049CA] text-white'
                        : 'bg-white border border-[#E5E7EB] text-[#0F2130] hover:border-[#0049CA]'
                    }`}
                  >
                    {prof.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Profile Content Display */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8">
              {/* CAD Cross-Section Schematic (5 cols) */}
              <div className="lg:col-span-5 bg-white border border-[#E5E7EB] p-8 flex flex-col items-center justify-center relative min-h-[300px]">
                <div className="absolute top-3 left-3 text-[10px] font-bold text-[#647488] uppercase tracking-wider">
                  CAD PROFILE CROSS-SECTION
                </div>

                {selectedProfile === '80x40' && (
                  <svg viewBox="0 0 240 240" className="w-56 h-56">
                    {/* Dimension marks */}
                    <line x1="30" y1="30" x2="30" y2="210" stroke="#0049CA" strokeWidth="1" strokeDasharray="2,2" />
                    <text x="18" y="125" fill="#0049CA" fontSize="10" fontWeight="bold" textAnchor="middle">80 mm</text>
                    <line x1="50" y1="225" x2="170" y2="225" stroke="#0049CA" strokeWidth="1" strokeDasharray="2,2" />
                    <text x="110" y="238" fill="#0049CA" fontSize="10" fontWeight="bold" textAnchor="middle">40 mm</text>
                    
                    {/* C-Channel Outline: Web 80, Flange 40, Lip 15 */}
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
                    {/* Dimension marks */}
                    <line x1="30" y1="50" x2="30" y2="190" stroke="#0049CA" strokeWidth="1" strokeDasharray="2,2" />
                    <text x="18" y="125" fill="#0049CA" fontSize="10" fontWeight="bold" textAnchor="middle">60 mm</text>
                    <line x1="50" y1="210" x2="170" y2="210" stroke="#0049CA" strokeWidth="1" strokeDasharray="2,2" />
                    <text x="110" y="224" fill="#0049CA" fontSize="10" fontWeight="bold" textAnchor="middle">40 mm</text>
                    
                    {/* C-Channel Outline: Web 60, Flange 40, Lip 15 */}
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
                    {/* Dimension marks */}
                    <line x1="30" y1="60" x2="30" y2="180" stroke="#0049CA" strokeWidth="1" strokeDasharray="2,2" />
                    <text x="18" y="125" fill="#0049CA" fontSize="10" fontWeight="bold" textAnchor="middle">41 mm</text>
                    <line x1="50" y1="200" x2="170" y2="200" stroke="#0049CA" strokeWidth="1" strokeDasharray="2,2" />
                    <text x="110" y="215" fill="#0049CA" fontSize="10" fontWeight="bold" textAnchor="middle">41 mm</text>
                    
                    {/* Strut Channel Outline: 41 x 41 with inward return lips */}
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

              {/* Technical Profile Details (7 cols) */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                {selectedProfile === '80x40' && (
                  <>
                    <div>
                      <span className="text-xs font-bold text-[#0049CA] uppercase tracking-wider">
                        STRUCTURAL PROFILE SPECIFICATION
                      </span>
                      <h3 className="text-2xl font-bold text-[#0F2130] uppercase tracking-tight mt-1">
                        C-CHANNEL 80 × 40 × 15 MM
                      </h3>
                      <p className="text-sm text-[#647488] leading-relaxed mt-2">
                        Primary structural member engineered for long-span rafters and load-bearing purlins. Designed with return stiffening lips that prevent lateral torsional buckling under environmental loads.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                      <div className="p-3 bg-white border border-[#E5E7EB]">
                        <span className="text-[#647488] block text-[10px] uppercase font-semibold">Web Height</span>
                        <span className="text-base font-bold text-[#0F2130]">80 mm</span>
                      </div>
                      <div className="p-3 bg-white border border-[#E5E7EB]">
                        <span className="text-[#647488] block text-[10px] uppercase font-semibold">Flange Width</span>
                        <span className="text-base font-bold text-[#0F2130]">40 mm</span>
                      </div>
                      <div className="p-3 bg-white border border-[#E5E7EB]">
                        <span className="text-[#647488] block text-[10px] uppercase font-semibold">Return Lip</span>
                        <span className="text-base font-bold text-[#0F2130]">15 mm</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 text-xs text-[#0F2130]">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#0049CA]" />
                        <span>Continuous roll-formed geometry for consistent sectional modulus</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#0049CA]" />
                        <span>Pre-punched slotted configuration available for rapid on-site bolt assembly</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#0049CA]" />
                        <span>Primary application: Solar ground mount main rafters and high-capacity industrial purlins</span>
                      </div>
                    </div>
                  </>
                )}

                {selectedProfile === '60x40' && (
                  <>
                    <div>
                      <span className="text-xs font-bold text-[#0049CA] uppercase tracking-wider">
                        STRUCTURAL PROFILE SPECIFICATION
                      </span>
                      <h3 className="text-2xl font-bold text-[#0F2130] uppercase tracking-tight mt-1">
                        C-CHANNEL 60 × 40 × 15 MM
                      </h3>
                      <p className="text-sm text-[#647488] leading-relaxed mt-2">
                        Medium structural C-channel optimized for secondary module support purlins, cross-tie bracing, and compact rooftop solar arrays where weight optimization and strength are both critical.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                      <div className="p-3 bg-white border border-[#E5E7EB]">
                        <span className="text-[#647488] block text-[10px] uppercase font-semibold">Web Height</span>
                        <span className="text-base font-bold text-[#0F2130]">60 mm</span>
                      </div>
                      <div className="p-3 bg-white border border-[#E5E7EB]">
                        <span className="text-[#647488] block text-[10px] uppercase font-semibold">Flange Width</span>
                        <span className="text-base font-bold text-[#0F2130]">40 mm</span>
                      </div>
                      <div className="p-3 bg-white border border-[#E5E7EB]">
                        <span className="text-[#647488] block text-[10px] uppercase font-semibold">Return Lip</span>
                        <span className="text-base font-bold text-[#0F2130]">15 mm</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 text-xs text-[#0F2130]">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#0049CA]" />
                        <span>Cold roll-formed with uniform tight corner radii</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#0049CA]" />
                        <span>Slotted web geometry for flexible hardware mounting</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#0049CA]" />
                        <span>Primary application: Solar purlin rails, diagonal tie braces, and secondary steel framing</span>
                      </div>
                    </div>
                  </>
                )}

                {selectedProfile === '41x41' && (
                  <>
                    <div>
                      <span className="text-xs font-bold text-[#0049CA] uppercase tracking-wider">
                        STRUCTURAL PROFILE SPECIFICATION
                      </span>
                      <h3 className="text-2xl font-bold text-[#0F2130] uppercase tracking-tight mt-1">
                        41 × 41 STRUT CHANNEL
                      </h3>
                      <p className="text-sm text-[#647488] leading-relaxed mt-2">
                        Modular square strut channel profile with inward return lips engineered for spring nuts, pipe clamps, and universal mounting brackets. Provides fast, modular connection without welding.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                      <div className="p-3 bg-white border border-[#E5E7EB]">
                        <span className="text-[#647488] block text-[10px] uppercase font-semibold">Channel Height</span>
                        <span className="text-base font-bold text-[#0F2130]">41 mm</span>
                      </div>
                      <div className="p-3 bg-white border border-[#E5E7EB]">
                        <span className="text-[#647488] block text-[10px] uppercase font-semibold">Channel Width</span>
                        <span className="text-base font-bold text-[#0F2130]">41 mm</span>
                      </div>
                      <div className="p-3 bg-white border border-[#E5E7EB]">
                        <span className="text-[#647488] block text-[10px] uppercase font-semibold">Profile Geometry</span>
                        <span className="text-base font-bold text-[#0F2130]">Square Strut</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 text-xs text-[#0F2130]">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#0049CA]" />
                        <span>Inward return lips lock standard spring channel nuts securely</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#0049CA]" />
                        <span>CNC slotted pattern provides continuous along-channel fastening points</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#0049CA]" />
                        <span>Primary application: Solar module mounting rails, sub-framing, and mechanical services</span>
                      </div>
                    </div>
                  </>
                )}

                <div className="pt-2">
                  <button
                    onClick={() => {
                      if (onEnquireClick) onEnquireClick(`Profile Quote: ${selectedProfile}`);
                      scrollToSection('contact');
                    }}
                    className="px-6 py-3 bg-[#0F2130] hover:bg-[#0049CA] text-white text-xs font-semibold uppercase tracking-wider rounded-none transition-colors duration-200 inline-flex items-center gap-2 cursor-pointer shadow-xs"
                  >
                    <span>Request Profile Pricing &amp; Lengths</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          05 — SOLAR ELECTRICAL SECTION
          Headline: POWERING THE SYSTEM BEHIND THE STRUCTURE.
          Showcases: Solar Hybrid Inverter Trading, ACDB, DCDB
      ──────────────────────────────────────────────────────────── */}
      <section id="solar-electrical" className="py-24 px-6 md:px-12 lg:px-20 max-w-[1340px] mx-auto border-b border-[#E5E7EB]">
        <div className="flex flex-col gap-12">
          {/* Header */}
          <div className="flex flex-col gap-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0049CA]/10 border border-[#0049CA]/20 text-[#0049CA] text-xs font-semibold uppercase tracking-wider w-fit">
              <span className="w-2 h-2 rounded-full bg-[#0049CA]" />
              <span>05 // Electrical Infrastructure</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F2130] uppercase leading-[1.12]">
              POWERING THE SYSTEM BEHIND THE STRUCTURE.
            </h2>
            <p className="text-base text-[#647488] font-normal leading-relaxed">
              CSF delivers reliable solar electrical distribution and power conversion hardware, supplying solar hybrid inverters and manufacturing certified AC and DC distribution boxes.
            </p>
          </div>

          {/* System Schematic Flow Architecture */}
          <div className="bg-[#0F2130] text-white p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span className="text-xs font-bold text-[#0049CA] uppercase tracking-wider">
                  SOLAR ELECTRICAL SYSTEM ARCHITECTURE
                </span>
                <span className="text-xs text-white/60">END-TO-END DC / AC FLOW</span>
              </div>

              {/* Architecture steps */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                <div className="p-4 bg-white/5 border border-white/10 flex flex-col gap-1.5">
                  <span className="text-[10px] text-[#0049CA] font-bold">SOURCE</span>
                  <span className="text-sm font-bold text-white uppercase">PV Solar Array</span>
                  <span className="text-xs text-white/60">DC Electricity Generation</span>
                </div>

                <div className="p-4 bg-white/10 border border-[#0049CA]/50 flex flex-col gap-1.5">
                  <span className="text-[10px] text-[#0049CA] font-bold">STAGE 01</span>
                  <span className="text-sm font-bold text-white uppercase">DCDB Box</span>
                  <span className="text-xs text-white/60">DC Surge Protection &amp; Fuse Isolation</span>
                </div>

                <div className="p-4 bg-white/10 border border-[#0049CA]/50 flex flex-col gap-1.5">
                  <span className="text-[10px] text-[#0049CA] font-bold">STAGE 02</span>
                  <span className="text-sm font-bold text-white uppercase">Hybrid Inverter</span>
                  <span className="text-xs text-white/60">High-efficiency DC to AC Conversion</span>
                </div>

                <div className="p-4 bg-white/10 border border-[#0049CA]/50 flex flex-col gap-1.5">
                  <span className="text-[10px] text-[#0049CA] font-bold">STAGE 03</span>
                  <span className="text-sm font-bold text-white uppercase">ACDB Box</span>
                  <span className="text-xs text-white/60">AC Circuit Breakers &amp; Grid Routing</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3 Electrical Product Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Solar Hybrid Inverter Trading */}
            <div className="border border-[#E5E7EB] bg-[#FFFFFF] p-8 flex flex-col justify-between transition-all duration-200 hover:border-[#0049CA]">
              <div className="flex flex-col gap-5">
                <div className="w-full h-44 bg-[#F8FAFC] border border-[#E5E7EB] overflow-hidden">
                  <img
                    src="/electrical/solar_hybrid_inverter.jpg"
                    alt="Solar Hybrid Inverter"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#0049CA] uppercase tracking-wider">SUPPLY &amp; TRADING</span>
                  <h3 className="text-xl font-bold text-[#0F2130] uppercase mt-1">
                    Solar Hybrid Inverters
                  </h3>
                </div>
                <p className="text-xs text-[#647488] leading-relaxed">
                  Supply and trading of dependable solar hybrid inverters for solar power applications. Built to handle fluctuating grid voltages, battery storage integration, and dual AC/DC loads.
                </p>
                <div className="pt-3 border-t border-[#E5E7EB] text-xs text-[#0F2130] flex flex-col gap-1.5">
                  <span className="font-semibold text-[11px] text-[#647488] uppercase">Key Features:</span>
                  <div>• On-grid and off-grid operational flexibility</div>
                  <div>• Integrated MPPT solar charge controller tracking</div>
                  <div>• High power conversion efficiency</div>
                </div>
              </div>
              <button
                onClick={() => {
                  if (onEnquireClick) onEnquireClick('Solar Hybrid Inverters');
                  scrollToSection('contact');
                }}
                className="mt-6 w-full py-3 bg-[#0F2130] hover:bg-[#0049CA] text-white text-xs font-semibold uppercase tracking-wider rounded-none transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Enquire For Inverters</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Card 2: ACDB Manufacturing */}
            <div className="border border-[#E5E7EB] bg-[#FFFFFF] p-8 flex flex-col justify-between transition-all duration-200 hover:border-[#0049CA]">
              <div className="flex flex-col gap-5">
                <div className="w-full h-44 bg-[#F8FAFC] border border-[#E5E7EB] overflow-hidden">
                  <img
                    src="/electrical/acdb_box.jpg"
                    alt="ACDB Manufacturing"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#0049CA] uppercase tracking-wider">MANUFACTURING</span>
                  <h3 className="text-xl font-bold text-[#0F2130] uppercase mt-1">
                    ACDB Manufacturing
                  </h3>
                </div>
                <p className="text-xs text-[#647488] leading-relaxed">
                  Manufacturing of AC Distribution Boxes designed to protect the inverter from utility grid back-surges and allow clean circuit disconnection for routine maintenance.
                </p>
                <div className="pt-3 border-t border-[#E5E7EB] text-xs text-[#0F2130] flex flex-col gap-1.5">
                  <span className="font-semibold text-[11px] text-[#647488] uppercase">Key Specifications:</span>
                  <div>• Weatherproof IP65 industrial enclosure</div>
                  <div>• Certified MCB / MCCB circuit breaker integration</div>
                  <div>• AC Class II Surge Protection Device (SPD)</div>
                </div>
              </div>
              <button
                onClick={() => {
                  if (onEnquireClick) onEnquireClick('ACDB Manufacturing');
                  scrollToSection('contact');
                }}
                className="mt-6 w-full py-3 bg-[#0F2130] hover:bg-[#0049CA] text-white text-xs font-semibold uppercase tracking-wider rounded-none transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Enquire For ACDB</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Card 3: DCDB Manufacturing */}
            <div className="border border-[#E5E7EB] bg-[#FFFFFF] p-8 flex flex-col justify-between transition-all duration-200 hover:border-[#0049CA]">
              <div className="flex flex-col gap-5">
                <div className="w-full h-44 bg-[#F8FAFC] border border-[#E5E7EB] overflow-hidden">
                  <img
                    src="/electrical/dcdb_box.jpg"
                    alt="DCDB Manufacturing"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#0049CA] uppercase tracking-wider">MANUFACTURING</span>
                  <h3 className="text-xl font-bold text-[#0F2130] uppercase mt-1">
                    DCDB Manufacturing
                  </h3>
                </div>
                <p className="text-xs text-[#647488] leading-relaxed">
                  Manufacturing of DC Distribution Boxes built to isolate solar PV panel strings, suppress high-voltage lightning surges, and guard inverters against over-current faults.
                </p>
                <div className="pt-3 border-t border-[#E5E7EB] text-xs text-[#0F2130] flex flex-col gap-1.5">
                  <span className="font-semibold text-[11px] text-[#647488] uppercase">Key Specifications:</span>
                  <div>• 1000V DC rotary load isolator switch</div>
                  <div>• High-voltage DC cartridge fuses per string</div>
                  <div>• Type-2 DC Surge Protective Device (SPD)</div>
                </div>
              </div>
              <button
                onClick={() => {
                  if (onEnquireClick) onEnquireClick('DCDB Manufacturing');
                  scrollToSection('contact');
                }}
                className="mt-6 w-full py-3 bg-[#0F2130] hover:bg-[#0049CA] text-white text-xs font-semibold uppercase tracking-wider rounded-none transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Enquire For DCDB</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          06 — COMPONENTS SECTION
          Headline: SMALL COMPONENTS. CRITICAL CONNECTIONS.
          Showcases: U-Clamp, Mid Clamp, Z-Clamp
      ──────────────────────────────────────────────────────────── */}
      <section id="components" className="py-24 px-6 md:px-12 lg:px-20 max-w-[1340px] mx-auto border-b border-[#E5E7EB]">
        <div className="flex flex-col gap-12">
          {/* Header */}
          <div className="flex flex-col gap-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0049CA]/10 border border-[#0049CA]/20 text-[#0049CA] text-xs font-semibold uppercase tracking-wider w-fit">
              <span className="w-2 h-2 rounded-full bg-[#0049CA]" />
              <span>06 // Hardware Components</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F2130] uppercase leading-[1.12]">
              SMALL COMPONENTS.<br />CRITICAL CONNECTIONS.
            </h2>
            <p className="text-base text-[#647488] font-normal leading-relaxed">
              Every solar installation relies on secure mechanical clamping. CSF manufactures precision U-clamps, mid clamps, and Z-clamps for repeatable on-site fastening.
            </p>
          </div>

          {/* 4 Focus Pillars */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-[#F8FAFC] border border-[#E5E7EB]">
              <span className="text-[10px] text-[#0049CA] font-bold uppercase block mb-1">01 // CONNECTION</span>
              <p className="text-xs text-[#647488]">Engineered clamping geometry designed for vibration and wind uplift resistance.</p>
            </div>
            <div className="p-4 bg-[#F8FAFC] border border-[#E5E7EB]">
              <span className="text-[10px] text-[#0049CA] font-bold uppercase block mb-1">02 // MOUNTING</span>
              <p className="text-xs text-[#647488]">Fast, repeatable alignment onto strut channels and purlins without modification.</p>
            </div>
            <div className="p-4 bg-[#F8FAFC] border border-[#E5E7EB]">
              <span className="text-[10px] text-[#0049CA] font-bold uppercase block mb-1">03 // STRUCTURAL SUPPORT</span>
              <p className="text-xs text-[#647488]">Uniform load distribution across panel borders to prevent frame stress or micro-cracks.</p>
            </div>
            <div className="p-4 bg-[#F8FAFC] border border-[#E5E7EB]">
              <span className="text-[10px] text-[#0049CA] font-bold uppercase block mb-1">04 // INSTALLATION PRACTICALITY</span>
              <p className="text-xs text-[#647488]">Optimized for rapid on-site wrench tightening and field installation efficiency.</p>
            </div>
          </div>

          {/* 3 Component Visual Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* U-Clamp */}
            <div className="border border-[#E5E7EB] bg-white flex flex-col justify-between p-6">
              <div className="flex flex-col gap-4">
                <div className="w-full h-48 bg-[#F8FAFC] border border-[#E5E7EB] overflow-hidden">
                  <img src="/hardware/u_clamp.jpg" alt="U-Clamp" className="w-full h-full object-cover" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#0049CA] uppercase tracking-wider">STRUCTURAL HARDWARE</span>
                  <h3 className="text-xl font-bold text-[#0F2130] uppercase mt-1">U-CLAMP</h3>
                </div>
                <p className="text-xs text-[#647488] leading-relaxed">
                  Heavy-duty structural clamp for rigid mechanical fixing around structural pipes, support posts, and cross purlins.
                </p>
                <div className="text-xs text-[#0F2130] pt-2 border-t border-[#E5E7EB]">
                  <span className="font-semibold text-[10px] text-[#647488] uppercase block">Primary Role:</span>
                  <span>Pipe and column structural fastening</span>
                </div>
              </div>
            </div>

            {/* Mid Clamp */}
            <div className="border border-[#E5E7EB] bg-white flex flex-col justify-between p-6">
              <div className="flex flex-col gap-4">
                <div className="w-full h-48 bg-[#F8FAFC] border border-[#E5E7EB] overflow-hidden">
                  <img src="/hardware/middle-clamp-hdg.jpg" alt="Mid Clamp" className="w-full h-full object-cover" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#0049CA] uppercase tracking-wider">MODULE HARDWARE</span>
                  <h3 className="text-xl font-bold text-[#0F2130] uppercase mt-1">MID CLAMP</h3>
                </div>
                <p className="text-xs text-[#647488] leading-relaxed">
                  Intermediate panel retention clamp designed to lock two adjacent framed solar PV modules securely into channel rails.
                </p>
                <div className="text-xs text-[#0F2130] pt-2 border-t border-[#E5E7EB]">
                  <span className="font-semibold text-[10px] text-[#647488] uppercase block">Primary Role:</span>
                  <span>Inter-module PV framing retention</span>
                </div>
              </div>
            </div>

            {/* Z-Clamp */}
            <div className="border border-[#E5E7EB] bg-white flex flex-col justify-between p-6">
              <div className="flex flex-col gap-4">
                <div className="w-full h-48 bg-[#F8FAFC] border border-[#E5E7EB] overflow-hidden">
                  <img src="/hardware/end-clamp-hdg.jpg" alt="Z-Clamp" className="w-full h-full object-cover" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#0049CA] uppercase tracking-wider">MODULE HARDWARE</span>
                  <h3 className="text-xl font-bold text-[#0F2130] uppercase mt-1">Z-CLAMP</h3>
                </div>
                <p className="text-xs text-[#647488] leading-relaxed">
                  Perimeter end clamp engineered to firmly secure the outside edge of terminal solar modules at the border of each array.
                </p>
                <div className="text-xs text-[#0F2130] pt-2 border-t border-[#E5E7EB]">
                  <span className="font-semibold text-[10px] text-[#647488] uppercase block">Primary Role:</span>
                  <span>Array end-of-row module locking</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          07 — INSTALLATION & COMMISSIONING SECTION
          Headline: FROM FABRICATION TO INSTALLATION.
          5-Step Process: 01 Requirement -> 02 Fabrication -> 03 Installation -> 04 Completion -> 05 Commissioning
      ──────────────────────────────────────────────────────────── */}
      <section id="installation" className="py-24 px-6 md:px-12 lg:px-20 max-w-[1340px] mx-auto border-b border-[#E5E7EB]">
        <div className="flex flex-col gap-12">
          {/* Header */}
          <div className="flex flex-col gap-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0049CA]/10 border border-[#0049CA]/20 text-[#0049CA] text-xs font-semibold uppercase tracking-wider w-fit">
              <span className="w-2 h-2 rounded-full bg-[#0049CA]" />
              <span>07 // Field Execution</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F2130] uppercase leading-[1.12]">
              FROM FABRICATION TO INSTALLATION.
            </h2>
            <p className="text-base sm:text-lg text-[#647488] font-normal leading-relaxed">
              CSF supports solar projects beyond manufacturing with installation, completion and commissioning services.
            </p>
          </div>

          {/* 5-Step Process (Horizontal on desktop, vertical on mobile) */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {[
              {
                num: '01',
                title: 'REQUIREMENT',
                desc: 'Evaluating site parameters, structural engineering drawings, and electrical load requirements.',
                icon: Compass,
              },
              {
                num: '02',
                title: 'FABRICATION',
                desc: 'Precision manufacturing of structural steel profiles, C-channels, and certified ACDB/DCDB boxes.',
                icon: Factory,
              },
              {
                num: '03',
                title: 'INSTALLATION',
                desc: 'On-site mechanical erection, column foundation anchoring, channel alignment, and hardware fastening.',
                icon: Wrench,
              },
              {
                num: '04',
                title: 'COMPLETION',
                desc: 'Final structural mechanical lockdown, panel clamp torquing, and full electrical interconnection.',
                icon: Boxes,
              },
              {
                num: '05',
                title: 'COMMISSIONING',
                desc: 'Continuity testing, string voltage verification, inverter synchronization, and system handover.',
                icon: FileCheck2,
              },
            ].map((step, idx) => (
              <div
                key={step.num}
                className="bg-[#F8FAFC] border border-[#E5E7EB] p-6 flex flex-col justify-between gap-6 relative transition-all duration-200 hover:border-[#0049CA]"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-extrabold text-[#0049CA]">
                      {step.num}
                    </span>
                    <step.icon className="w-5 h-5 text-[#647488]" />
                  </div>
                  <h3 className="text-base font-bold text-[#0F2130] uppercase tracking-wide">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#647488] leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="w-full h-[2px] bg-[#E5E7EB]">
                  <div
                    className="h-full bg-[#0049CA]"
                    style={{ width: `${((idx + 1) / 5) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          08 — WHY CSF
          Headline: BUILT AROUND PRECISION.
          4 Core Principles: 01 Precision, 02 Reliability, 03 Complete Support, 04 Technical Approach
      ──────────────────────────────────────────────────────────── */}
      <section id="why-csf" className="py-24 px-6 md:px-12 lg:px-20 max-w-[1340px] mx-auto border-b border-[#E5E7EB]">
        <div className="flex flex-col gap-12">
          {/* Header */}
          <div className="flex flex-col gap-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0049CA]/10 border border-[#0049CA]/20 text-[#0049CA] text-xs font-semibold uppercase tracking-wider w-fit">
              <span className="w-2 h-2 rounded-full bg-[#0049CA]" />
              <span>08 // Core Principles</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F2130] uppercase leading-[1.12]">
              BUILT AROUND PRECISION.
            </h2>
            <p className="text-base sm:text-lg text-[#647488] font-normal leading-relaxed">
              Our engineering-led methodology governs every process, from raw structural steel roll-forming to electrical box wiring and on-site commissioning.
            </p>
          </div>

          {/* 4 Principles Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="border border-[#E5E7EB] bg-[#FFFFFF] p-8 flex flex-col justify-between gap-6 hover:border-[#0049CA] transition-colors">
              <div className="flex flex-col gap-3">
                <span className="text-3xl font-extrabold text-[#0049CA]">01</span>
                <h3 className="text-lg font-bold text-[#0F2130] uppercase tracking-tight">
                  PRECISION
                </h3>
                <p className="text-xs text-[#647488] leading-relaxed">
                  Consistent fabrication and controlled structural profiles.
                </p>
              </div>
              <div className="w-8 h-[2px] bg-[#0049CA]" />
            </div>

            <div className="border border-[#E5E7EB] bg-[#FFFFFF] p-8 flex flex-col justify-between gap-6 hover:border-[#0049CA] transition-colors">
              <div className="flex flex-col gap-3">
                <span className="text-3xl font-extrabold text-[#0049CA]">02</span>
                <h3 className="text-lg font-bold text-[#0F2130] uppercase tracking-tight">
                  RELIABILITY
                </h3>
                <p className="text-xs text-[#647488] leading-relaxed">
                  Products and services developed for dependable solar applications.
                </p>
              </div>
              <div className="w-8 h-[2px] bg-[#0049CA]" />
            </div>

            <div className="border border-[#E5E7EB] bg-[#FFFFFF] p-8 flex flex-col justify-between gap-6 hover:border-[#0049CA] transition-colors">
              <div className="flex flex-col gap-3">
                <span className="text-3xl font-extrabold text-[#0049CA]">03</span>
                <h3 className="text-lg font-bold text-[#0F2130] uppercase tracking-tight">
                  COMPLETE SUPPORT
                </h3>
                <p className="text-xs text-[#647488] leading-relaxed">
                  From components and structures to installation and commissioning.
                </p>
              </div>
              <div className="w-8 h-[2px] bg-[#0049CA]" />
            </div>

            <div className="border border-[#E5E7EB] bg-[#FFFFFF] p-8 flex flex-col justify-between gap-6 hover:border-[#0049CA] transition-colors">
              <div className="flex flex-col gap-3">
                <span className="text-3xl font-extrabold text-[#0049CA]">04</span>
                <h3 className="text-lg font-bold text-[#0F2130] uppercase tracking-tight">
                  TECHNICAL APPROACH
                </h3>
                <p className="text-xs text-[#647488] leading-relaxed">
                  A practical, engineering-focused approach to solar infrastructure.
                </p>
              </div>
              <div className="w-8 h-[2px] bg-[#0049CA]" />
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          09 — CAPABILITIES SECTION
          Technical Grid with 8 Core Capabilities
      ──────────────────────────────────────────────────────────── */}
      <section id="capabilities" className="py-24 px-6 md:px-12 lg:px-20 max-w-[1340px] mx-auto border-b border-[#E5E7EB]">
        <div className="flex flex-col gap-12">
          {/* Header */}
          <div className="flex flex-col gap-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0049CA]/10 border border-[#0049CA]/20 text-[#0049CA] text-xs font-semibold uppercase tracking-wider w-fit">
              <span className="w-2 h-2 rounded-full bg-[#0049CA]" />
              <span>09 // Manufacturing &amp; Services</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F2130] uppercase leading-[1.12]">
              CAPABILITIES
            </h2>
            <p className="text-base text-[#647488] font-normal leading-relaxed">
              Industrial infrastructure and engineering capabilities supporting comprehensive solar project deployments.
            </p>
          </div>

          {/* 8 Capabilities Technical Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { num: '01', title: 'SOLAR STRUCTURE FABRICATION', desc: 'Precision manufacturing of fixed-tilt, rooftop, and modular mounting frameworks.' },
              { num: '02', title: 'C-CHANNEL MANUFACTURING', desc: 'Continuous cold roll-forming of 80×40×15 and 60×40×15 structural steel purlins.' },
              { num: '03', title: 'STRUT CHANNEL MANUFACTURING', desc: '41×41 slotted strut channel production with inward return lips for modular fastening.' },
              { num: '04', title: 'ACDB / DCDB MANUFACTURING', desc: 'Assembly and wiring of AC & DC distribution boxes with surge suppression and isolation.' },
              { num: '05', title: 'SOLAR COMPONENTS', desc: 'Fabrication of specialized U-clamps, mid clamps, and Z-clamps for module retention.' },
              { num: '06', title: 'INSTALLATION', desc: 'On-site structural mechanical erection, channel alignment, and hardware torquing.' },
              { num: '07', title: 'COMPLETION', desc: 'Full mechanical array integration, array stringing verification, and connection lock.' },
              { num: '08', title: 'COMMISSIONING', desc: 'Electrical continuity checks, voltage verification, and final operational plant sign-off.' },
            ].map(cap => (
              <div
                key={cap.num}
                className="bg-[#F8FAFC] border border-[#E5E7EB] p-6 flex flex-col justify-between gap-4 transition-all duration-200 hover:border-[#0049CA]"
              >
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-bold text-[#0049CA] tracking-wider">CAPABILITY {cap.num}</span>
                  <h3 className="text-sm font-bold text-[#0F2130] uppercase tracking-wide leading-snug">
                    {cap.title}
                  </h3>
                  <p className="text-xs text-[#647488] leading-relaxed pt-1">
                    {cap.desc}
                  </p>
                </div>
                <div className="w-full h-[1px] bg-[#E5E7EB]" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          10 — PROJECTS / APPLICATIONS
          Application-focused (Ground, Rooftop, Custom, Electrical)
      ──────────────────────────────────────────────────────────── */}
      <section id="projects" className="py-24 px-6 md:px-12 lg:px-20 max-w-[1340px] mx-auto border-b border-[#E5E7EB]">
        <div className="flex flex-col gap-12">
          {/* Header */}
          <div className="flex flex-col gap-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0049CA]/10 border border-[#0049CA]/20 text-[#0049CA] text-xs font-semibold uppercase tracking-wider w-fit">
              <span className="w-2 h-2 rounded-full bg-[#0049CA]" />
              <span>10 // Supported Sectors</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F2130] uppercase leading-[1.12]">
              PROJECTS &amp; APPLICATIONS
            </h2>
            <p className="text-base text-[#647488] font-normal leading-relaxed">
              CSF components, profiles, and electrical distribution equipment are engineered to support major solar power and structural deployment scenarios.
            </p>
          </div>

          {/* 5 Key Applications Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* App 1 */}
            <div className="border border-[#E5E7EB] bg-white overflow-hidden flex flex-col justify-between">
              <div className="w-full h-52 bg-[#F8FAFC] overflow-hidden">
                <img src="/gallery/utility_solar_farm.jpg" alt="Solar Installations" className="w-full h-full object-cover" />
              </div>
              <div className="p-6 flex flex-col gap-3">
                <span className="text-[10px] font-bold text-[#0049CA] uppercase tracking-wider">APPLICATION 01</span>
                <h3 className="text-lg font-bold text-[#0F2130] uppercase">SOLAR INSTALLATIONS</h3>
                <p className="text-xs text-[#647488] leading-relaxed">
                  Utility-scale ground mounted solar arrays and commercial power plants requiring high-durability steel framework and organized electrical isolation.
                </p>
              </div>
            </div>

            {/* App 2 */}
            <div className="border border-[#E5E7EB] bg-white overflow-hidden flex flex-col justify-between">
              <div className="w-full h-52 bg-[#F8FAFC] overflow-hidden">
                <img src="/assets/steel_structure.jpg" alt="Structural Applications" className="w-full h-full object-cover" />
              </div>
              <div className="p-6 flex flex-col gap-3">
                <span className="text-[10px] font-bold text-[#0049CA] uppercase tracking-wider">APPLICATION 02</span>
                <h3 className="text-lg font-bold text-[#0F2130] uppercase">STRUCTURAL APPLICATIONS</h3>
                <p className="text-xs text-[#647488] leading-relaxed">
                  Industrial framework, modular framing grids, equipment mounting purlins, and cold-formed C-channel structural support framing.
                </p>
              </div>
            </div>

            {/* App 3 */}
            <div className="border border-[#E5E7EB] bg-white overflow-hidden flex flex-col justify-between">
              <div className="w-full h-52 bg-[#F8FAFC] overflow-hidden">
                <img src="/gallery/solar_mounting_framework.png" alt="Solar Mounting Systems" className="w-full h-full object-cover" />
              </div>
              <div className="p-6 flex flex-col gap-3">
                <span className="text-[10px] font-bold text-[#0049CA] uppercase tracking-wider">APPLICATION 03</span>
                <h3 className="text-lg font-bold text-[#0F2130] uppercase">SOLAR MOUNTING SYSTEMS</h3>
                <p className="text-xs text-[#647488] leading-relaxed">
                  Fixed-tilt mounting arrays, industrial shed roof rail networks, and customized elevated solar structures engineered for site constraints.
                </p>
              </div>
            </div>

            {/* App 4 */}
            <div className="border border-[#E5E7EB] bg-white overflow-hidden flex flex-col justify-between">
              <div className="w-full h-52 bg-[#F8FAFC] overflow-hidden">
                <img src="/assets/custom_metal.jpg" alt="Custom Fabrication" className="w-full h-full object-cover" />
              </div>
              <div className="p-6 flex flex-col gap-3">
                <span className="text-[10px] font-bold text-[#0049CA] uppercase tracking-wider">APPLICATION 04</span>
                <h3 className="text-lg font-bold text-[#0F2130] uppercase">CUSTOM FABRICATION</h3>
                <p className="text-xs text-[#647488] leading-relaxed">
                  Project-specific structural lengths, custom hole punching slot dimensions, and specialized bracket assemblies built to specification.
                </p>
              </div>
            </div>

            {/* App 5 */}
            <div className="border border-[#E5E7EB] bg-white overflow-hidden flex flex-col justify-between">
              <div className="w-full h-52 bg-[#F8FAFC] overflow-hidden">
                <img src="/electrical/acdb_box.jpg" alt="Electrical Solar Systems" className="w-full h-full object-cover" />
              </div>
              <div className="p-6 flex flex-col gap-3">
                <span className="text-[10px] font-bold text-[#0049CA] uppercase tracking-wider">APPLICATION 05</span>
                <h3 className="text-lg font-bold text-[#0F2130] uppercase">ELECTRICAL SOLAR SYSTEMS</h3>
                <p className="text-xs text-[#647488] leading-relaxed">
                  AC and DC power distribution, solar hybrid inverter installations, and certified isolation box systems protecting solar plant assets.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          11 — ABOUT CSF SECTION
          Headline: STRUCTURE STARTS WITH PRECISION.
      ──────────────────────────────────────────────────────────── */}
      <section id="about" className="py-24 px-6 md:px-12 lg:px-20 max-w-[1340px] mx-auto border-b border-[#E5E7EB]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0049CA]/10 border border-[#0049CA]/20 text-[#0049CA] text-xs font-semibold uppercase tracking-wider w-fit">
              <span className="w-2 h-2 rounded-full bg-[#0049CA]" />
              <span>11 // Company Profile</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F2130] uppercase leading-[1.12]">
              STRUCTURE STARTS WITH PRECISION.
            </h2>

            <p className="text-base sm:text-lg text-[#647488] font-normal leading-relaxed">
              Central Structure Fabrication provides solar electrical products, structural fabrication, components and installation support for solar infrastructure requirements.
            </p>

            <div className="flex flex-col gap-3 text-sm text-[#0F2130] pt-2">
              <p className="leading-relaxed">
                Headquartered in Amroha, Uttar Pradesh, CSF combines structural steel cold roll-forming with solar electrical manufacturing. By offering both structural framing profiles (C-Channels, Strut Channels, Solar Structures) and electrical protection equipment (ACDB, DCDB, Hybrid Inverters), we provide solar developers with an integrated infrastructure partner.
              </p>
              <p className="leading-relaxed text-[#647488]">
                Our approach emphasizes dimensional accuracy, controlled hole punching, dependable steel sections, and professional on-site installation, completion and commissioning.
              </p>
            </div>

            <div className="pt-4 border-t border-[#E5E7EB] grid grid-cols-2 sm:grid-cols-3 gap-6">
              <div>
                <span className="text-[10px] text-[#647488] uppercase font-semibold block">FACILITY LOCATION</span>
                <span className="text-sm font-bold text-[#0F2130]">Amroha, UP, India</span>
              </div>
              <div>
                <span className="text-[10px] text-[#647488] uppercase font-semibold block">CORE DISCIPLINES</span>
                <span className="text-sm font-bold text-[#0F2130]">Electrical + Structural</span>
              </div>
              <div>
                <span className="text-[10px] text-[#647488] uppercase font-semibold block">ON-SITE SUPPORT</span>
                <span className="text-sm font-bold text-[#0F2130]">Commissioning Ready</span>
              </div>
            </div>
          </div>

          {/* Right Information Card (5 cols) */}
          <div className="lg:col-span-5 bg-[#F8FAFC] border border-[#E5E7EB] p-8 flex flex-col gap-6">
            <h3 className="text-xs font-bold text-[#0049CA] uppercase tracking-wider">
              CENTRAL STRUCTURE FABRICATION (CSF)
            </h3>
            
            <div className="flex flex-col gap-4 text-xs text-[#0F2130]">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#0049CA] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block">Manufacturing &amp; Office:</span>
                  <span className="text-[#647488]">Amroha, Uttar Pradesh, India</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#0049CA] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block">Corporate Email:</span>
                  <a href="mailto:info.csf16@gmail.com" className="text-[#0049CA] hover:underline">info.csf16@gmail.com</a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-[#0049CA] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block">Goods and Services Tax (GSTIN):</span>
                  <span className="text-[#0F2130] font-bold">09BDRPA4213J1ZJ</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white border border-[#E5E7EB] flex flex-col gap-2">
              <span className="text-[10px] font-bold text-[#647488] uppercase">CORE BUSINESS AREAS</span>
              <div className="text-xs text-[#0F2130] flex flex-col gap-1">
                <span>• Solar Hybrid Inverter Trading</span>
                <span>• ACDB / DCDB Manufacturing</span>
                <span>• Solar Structure Manufacturing</span>
                <span>• C-Channel (80×40×15 &amp; 60×40×15)</span>
                <span>• 41×41 Strut Channel Manufacturing</span>
                <span>• Solar Clamps (U, Mid, Z)</span>
                <span>• Installation, Completion &amp; Commissioning</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          12 — CONTACT CTA SECTION
          Headline: HAVE A SOLAR REQUIREMENT?
      ──────────────────────────────────────────────────────────── */}
      <section id="cta" className="py-20 px-6 md:px-12 lg:px-20 bg-[#0F2130] text-white">
        <div className="max-w-[1340px] mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="flex flex-col gap-3 max-w-2xl">
            <span className="text-xs font-bold text-[#0049CA] uppercase tracking-wider">
              12 // PROJECT CONSULTATION
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight leading-[1.12]">
              HAVE A SOLAR REQUIREMENT?
            </h2>
            <p className="text-sm sm:text-base text-white/70 font-normal leading-relaxed">
              Let's discuss the products, structures or services your project requires.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 bg-[#0049CA] hover:bg-[#003CAD] text-white text-xs font-semibold uppercase tracking-wider rounded-none transition-colors duration-200 cursor-pointer shadow-md"
            >
              REQUEST A CALL
            </button>
            <button
              onClick={() => scrollToSection('showcase')}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider rounded-none transition-colors duration-200 border border-white/20 cursor-pointer"
            >
              VIEW PRODUCTS
            </button>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          13 — CONTACT FORM SECTION
          Heading: LET'S BUILD THE RIGHT SOLUTION.
          Fields: Name, Company, Phone Number, Email, Requirement
      ──────────────────────────────────────────────────────────── */}
      <section id="contact" className="py-24 px-6 md:px-12 lg:px-20 max-w-[1340px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Context & Contact Details (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8">
            <div className="flex flex-col gap-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0049CA]/10 border border-[#0049CA]/20 text-[#0049CA] text-xs font-semibold uppercase tracking-wider w-fit">
                <span className="w-2 h-2 rounded-full bg-[#0049CA]" />
                <span>13 // Inquiries &amp; Callback</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0F2130] uppercase leading-[1.15]">
                LET'S BUILD THE RIGHT SOLUTION.
              </h2>

              <p className="text-sm text-[#647488] leading-relaxed">
                Submit your project parameters below to request a callback from the Central Structure Fabrication technical team.
              </p>

              <div className="flex flex-col gap-3 text-xs text-[#0F2130] pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#F8FAFC] border border-[#E5E7EB] flex items-center justify-center text-[#0049CA]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold block">Manufacturing Location:</span>
                    <span className="text-[#647488]">Amroha, Uttar Pradesh, India</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#F8FAFC] border border-[#E5E7EB] flex items-center justify-center text-[#0049CA]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold block">Email:</span>
                    <a href="mailto:info.csf16@gmail.com" className="text-[#0049CA]">info.csf16@gmail.com</a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#F8FAFC] border border-[#E5E7EB] flex items-center justify-center text-[#0049CA]">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold block">GSTIN:</span>
                    <span className="font-bold text-[#0F2130]">09BDRPA4213J1ZJ</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#F8FAFC] border border-[#E5E7EB] text-xs text-[#647488] flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-[#0049CA] flex-shrink-0" />
              <span>Inquiries are typically addressed within 24 business hours.</span>
            </div>
          </div>

          {/* Right Column: Clean Industrial Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#F8FAFC] border border-[#E5E7EB] p-8 sm:p-10">
            {submitSuccess ? (
              <div className="py-12 flex flex-col items-center justify-center text-center gap-4">
                <div className="w-14 h-14 bg-[#0049CA]/10 text-[#0049CA] flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-[#0F2130] uppercase">
                  CALLBACK REQUEST RECORDED
                </h3>
                <p className="text-sm text-[#647488] max-w-md">
                  Thank you. Your inquiry has been routed to our technical engineering and trading desk. We will reach out shortly.
                </p>
                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="mt-4 px-6 py-2.5 bg-[#0F2130] text-white text-xs font-semibold uppercase tracking-wider rounded-none cursor-pointer"
                >
                  Submit Another Requirement
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[#0F2130] uppercase tracking-wider">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name"
                      value={formData.name}
                      onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="px-4 py-3 bg-white border border-[#E5E7EB] text-xs text-[#0F2130] focus:outline-none focus:border-[#0049CA] rounded-none"
                    />
                  </div>

                  {/* Company */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[#0F2130] uppercase tracking-wider">
                      Company
                    </label>
                    <input
                      type="text"
                      placeholder="Company / Organization"
                      value={formData.company}
                      onChange={e => setFormData(prev => ({ ...prev, company: e.target.value }))}
                      className="px-4 py-3 bg-white border border-[#E5E7EB] text-xs text-[#0F2130] focus:outline-none focus:border-[#0049CA] rounded-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Phone Number */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[#0F2130] uppercase tracking-wider">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-xs font-semibold text-[#647488]">
                        +91
                      </div>
                      <input
                        type="tel"
                        required
                        placeholder="10-digit mobile number"
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        className={`w-full pl-12 pr-4 py-3 bg-white border text-xs text-[#0F2130] focus:outline-none rounded-none ${
                          phoneError ? 'border-red-500' : 'border-[#E5E7EB] focus:border-[#0049CA]'
                        }`}
                      />
                    </div>
                    {phoneError && (
                      <span className="text-[10px] text-red-600 font-medium">{phoneError}</span>
                    )}
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[#0F2130] uppercase tracking-wider">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="corporate@company.com"
                      value={formData.email}
                      onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="px-4 py-3 bg-white border border-[#E5E7EB] text-xs text-[#0F2130] focus:outline-none focus:border-[#0049CA] rounded-none"
                    />
                  </div>
                </div>

                {/* Requirement Dropdown */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#0F2130] uppercase tracking-wider">
                    Requirement *
                  </label>
                  <select
                    value={formData.requirement}
                    onChange={e => setFormData(prev => ({ ...prev, requirement: e.target.value }))}
                    className="px-4 py-3 bg-white border border-[#E5E7EB] text-xs text-[#0F2130] focus:outline-none focus:border-[#0049CA] rounded-none cursor-pointer"
                  >
                    <option value="Solar Electrical Products">Solar Electrical Products (Inverters, ACDB, DCDB)</option>
                    <option value="Structural Fabrication">Structural Fabrication (C-Channels, Strut Channels, Solar Structures)</option>
                    <option value="Solar Components">Solar Components (U-Clamps, Mid Clamps, Z-Clamps)</option>
                    <option value="Installation & Commissioning">Installation, Completion &amp; Commissioning Services</option>
                    <option value="Complete Infrastructure Package">Complete Project Infrastructure Package</option>
                  </select>
                </div>

                {serverError && (
                  <div className="p-3 bg-red-50 border border-red-200 text-xs text-red-600">
                    {serverError}
                  </div>
                )}

                {/* Primary CTA Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 w-full py-4 bg-[#0049CA] hover:bg-[#003CAD] text-white text-xs font-semibold uppercase tracking-wider rounded-none transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>RECORDING INQUIRY...</span>
                  ) : (
                    <>
                      <Phone className="w-3.5 h-3.5" />
                      <span>REQUEST A CALL</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
