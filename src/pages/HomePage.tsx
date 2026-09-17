import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Hero3D } from '../components/Hero3D';
import { useSEO } from '../hooks/useSEO';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Factory,
  Layers,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Clock,
  Navigation,
  Truck,
  PackageCheck,
  ExternalLink,
  FileText,
  Wrench,
  X,
  PhoneCall,
  Maximize2
} from 'lucide-react';

interface CollageProjectItem {
  id: string;
  title: string;
  domainLabel: string;
  image: string;
  location: string;
  specs: string;
  description: string;
  badge?: string;
  caption: string;
}

const COLLAGE_PROJECTS: Record<string, CollageProjectItem> = {
  topLeft: {
    id: 'proj-csf-14',
    title: 'Multi-Level Rooftop Solar Canopy Structure',
    domainLabel: 'Structural Applications',
    image: '/projects/csf_project_14.jpg',
    location: 'Commercial Rooftop Facility, Western UP',
    specs: 'Modular C-Channel Rafters • High-Tensile Fasteners',
    description: 'Structural terrace pergola framework offering full clearance for rooftop walking space while generating sustainable solar energy.',
    caption: 'Terrace Solar Pergola • UP Project',
  },
  bottomLeft: {
    id: 'proj-csf-07',
    title: 'Engineered Solar Support Frame & Rail Layout',
    domainLabel: 'Solar Mounting Systems',
    image: '/projects/csf_project_07.jpg',
    location: 'Commercial Rooftop Deployment',
    specs: 'Continuous 80x40 C-Channel Rails • Mid Clamps',
    description: 'Precision-aligned roll-formed C-channel purlins and clamp retainers securing PV module strings along the perimeter parapet.',
    caption: 'Continuous C-Channel Base Rails',
  },
  center: {
    id: 'proj-csf-01',
    title: 'High-Elevation Rooftop Solar Pergola Structure',
    domainLabel: 'Solar Installations',
    image: '/projects/csf_project_01.jpg',
    location: 'Commercial Terrace Rooftop, Western UP',
    specs: 'IS 2062 C-Channels • 160 km/h Wind Tolerance',
    description: 'Heavy-duty elevated rooftop solar canopy structure constructed with galvanized roll-formed C-channels and high-tensile diagonal cross-braces.',
    badge: 'Dual Competence',
    caption: 'Calculated Load Tolerances & On-Site Erection',
  },
  topRight: {
    id: 'proj-csf-15',
    title: 'Elevated Solar Canopy Rafter Joint Assembly',
    domainLabel: 'Custom Fabrication',
    image: '/projects/csf_project_15.jpg',
    location: 'Rooftop Fabrication Site, UP',
    specs: 'Custom Splice Plates • CNC Punched Flanges',
    description: 'Custom-fabricated structural steel splice connection joining channel rafters with vertical posts for maximum torsional strength.',
    caption: 'Rafter Joint & Splice Assembly',
  },
  bottomRight: {
    id: 'proj-csf-18',
    title: 'Panoramic Rooftop Solar Array Installation',
    domainLabel: 'Solar Installations',
    image: '/projects/csf_project_18.jpg',
    location: 'Industrial Plant Rooftop, Western UP',
    specs: 'Multi-Row String Layout • Heavy-Gauge Purlins',
    description: 'Wide panoramic view of commercial rooftop solar deployment fabricated with cold-rolled C-channels and modular bracketry.',
    caption: '25+ Year Resilience • IS 2062 HDG Steel',
  },
};

interface HomePageProps {
  onEnquireClick?: (service?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onEnquireClick: _onEnquireClick }) => {
  useSEO({
    title: 'Central Structure Fabrication (CSF) | Solar Electrical Products & Structural Fabrication',
    description:
      'Central Structure Fabrication (CSF) specializes in solar hybrid inverters, ACDB/DCDB manufacturing, solar mounting structures, cold-roll formed C-channels, and 41×41 strut channels. Amroha, UP.',
    keywords:
      'Central Structure Fabrication, CSF, solar structure manufacturer, solar hybrid inverter, ACDB DCDB, C-channel steel, strut channel 41x41, Amroha solar manufacturer, structural fabrication India',
    canonical: 'https://www.csfabrication.in',
    ogTitle: 'Central Structure Fabrication (CSF) — Dual Solar Electrical & Structural Fabrication',
    ogDescription:
      'Engineered solar mounting structures, continuous cold-roll formed C-channels, and certified ACDB/DCDB manufacturing from Amroha, Uttar Pradesh.',
  });

  const [selectedProject, setSelectedProject] = useState<CollageProjectItem | null>(null);

  useEffect(() => {
    if (selectedProject) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setSelectedProject(null);
        }
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [selectedProject]);


  // Carousel ref and active index for Expertise cards
  const carouselRef = useRef<HTMLDivElement>(null);
  const expertiseHeaderRef = useRef<HTMLDivElement>(null);
  const [carouselPaddingLeft, setCarouselPaddingLeft] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const w = window.innerWidth;
      if (w >= 1720) return (w - 1720) / 2 + 96;
      if (w >= 1024) return 96;
      if (w >= 768) return 64;
      if (w >= 640) return 40;
      return 24;
    }
    return 24;
  });
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeCorridor, setActiveCorridor] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(25);

  useEffect(() => {
    const updatePadding = () => {
      if (expertiseHeaderRef.current) {
        const rect = expertiseHeaderRef.current.getBoundingClientRect();
        if (rect.left > 0) {
          setCarouselPaddingLeft(rect.left);
        }
      }
    };

    updatePadding();
    const timer = setTimeout(updatePadding, 50);
    window.addEventListener('resize', updatePadding);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updatePadding);
    };
  }, []);

  const checkScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll > 0) {
        setScrollProgress(Math.round((scrollLeft / maxScroll) * 75 + 25));
      }
    }
  };

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -480 : 480;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(checkScroll, 350);
    }
  };


  // Nationwide Project Dispatch Corridors Data (Manufactured to Order)
  const deploymentCorridors = [
    {
      id: 'north',
      grid: 'Northern Corridor',
      coverage: 'Uttar Pradesh & Delhi NCR',
      dispatchType: 'Direct Factory Flatbed',
      highway: 'NH-9 / Western Peripheral Corridor',
      states: 'Western UP, Noida, Gurugram, Haryana, Rajasthan',
      cargo: 'Continuous C-Channels, Rooftop Mounting Kits, ACDB/DCDB',
      mode: 'Dedicated Flatbed Trucks',
      accent: '#0049CA',
    },
    {
      id: 'west',
      grid: 'Western Corridor',
      coverage: 'Gujarat & Maharashtra',
      dispatchType: 'High-Volume Freight',
      highway: 'Delhi-Mumbai Freight Corridor (DMIC)',
      states: 'Ahmedabad, Surat, Pune, Nagpur, Mumbai Belt',
      cargo: 'Heavy Ground Mounts, 80×40 Purlins, Carport Systems',
      mode: 'Dedicated Long-Bed Trailers',
      accent: '#0284C7',
    },
    {
      id: 'central',
      grid: 'Central Corridor',
      coverage: 'Madhya Pradesh & Chhattisgarh',
      dispatchType: 'Project Freight',
      highway: 'North-South Corridor via Agra-Gwalior (NH-44)',
      states: 'Bhopal, Indore, Gwalior, Raipur',
      cargo: '41×41 Strut Channels, Custom Bracketry, DCDB Units',
      mode: 'Coordinated Site Dispatch',
      accent: '#2563EB',
    },
    {
      id: 'south',
      grid: 'Southern Corridor',
      coverage: 'Karnataka, Telangana & Beyond',
      dispatchType: 'Containerized Cargo',
      highway: 'National Highway Multi-Modal Routes',
      states: 'Hyderabad, Bengaluru, Chennai Solar Parks',
      cargo: 'Utility Solar Mounting Structures, Custom Substation Steel',
      mode: 'Containerized Long-Haul',
      accent: '#4F46E5',
    },
  ];

  // Expertise Cards Data (Individual Accurate Products & Services)
  const expertiseList = [
    {
      id: 'structures',
      tag: 'Manufacturing',
      titleFirst: 'Solar structure',
      titleRest: 'manufacturing & mounting systems',
      img: '/gallery/solar_structure_framework.png',
      link: '/products#solar-structures',
    },
    {
      id: 'c80',
      tag: 'Roll-Forming',
      titleFirst: 'C-Channel 80×40×15',
      titleRest: 'cold roll-formed section (mm)',
      img: '/gallery/c_channel_80x40x15.png',
      link: '/products#c-channel-80-40-15',
    },
    {
      id: 'c60',
      tag: 'Roll-Forming',
      titleFirst: 'C-Channel 60×40×15',
      titleRest: 'precision rail section (mm)',
      img: '/gallery/c_channel_profile.png',
      link: '/products#c-channel-60-40-15',
    },
    {
      id: 'struts',
      tag: 'Modular Framing',
      titleFirst: '41×41 Strut',
      titleRest: 'channel support systems',
      img: '/gallery/strut_channel_41x41.png',
      link: '/products#strut-channel-41-41',
    },
    {
      id: 'inverters',
      tag: 'Trading & Supply',
      titleFirst: 'Solar hybrid',
      titleRest: 'inverter trading (3kW - 100kW)',
      img: '/electrical/solar_hybrid_inverter.png',
      link: '/products#solar-hybrid-inverter',
    },
    {
      id: 'acdb',
      tag: 'Manufacturing',
      titleFirst: 'ACDB',
      titleRest: 'distribution box manufacturing',
      img: '/electrical/acdb_box.png',
      link: '/products#acdb',
    },
    {
      id: 'dcdb',
      tag: 'Manufacturing',
      titleFirst: 'DCDB',
      titleRest: 'string combiner manufacturing',
      img: '/electrical/dcdb_box.png',
      link: '/products#dcdb',
    },
    {
      id: 'midclamp',
      tag: 'Precision Hardware',
      titleFirst: 'Mid Clamp',
      titleRest: '(U-Clamp) intermediate retention',
      img: '/hardware/u_clamp.png',
      link: '/products#mid-clamp',
    },
    {
      id: 'zclamp',
      tag: 'Precision Hardware',
      titleFirst: 'Z-Clamp',
      titleRest: 'perimeter module end clamp',
      img: '/hardware/z_clamp.png',
      link: '/products#z-clamp',
    },
    {
      id: 'installation',
      tag: 'Turnkey Execution',
      titleFirst: 'Installation & completion',
      titleRest: 'site testing & commissioning',
      img: '/gallery/solar_engineer_field.jpg',
      link: '/products#installation-commissioning',
    },
    {
      id: 'compensate',
      tag: 'Turnkey Solar EPC',
      titleFirst: 'Compensate',
      titleRest: 'solar EPC & grid synchronization',
      img: '/gallery/utility_solar_farm.jpg',
      link: '/products#compensate-epc',
    },
  ];


  return (
    <div className="w-full bg-[#FAF9F6] text-[#0F2130]">
      {/* ── Section 00: 3D HERO INTERACTION (100% PRESERVED UNTOUCHED) ── */}
      <Hero3D />



      {/* ── Section 02: Warm Architectural Statement & Organic Collage ── */}
      <section className="pt-28 pb-24 bg-[#FAF9F6] border-b border-[#EAE6DF]/80 overflow-hidden">
        <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-10 md:px-16 lg:px-24">

          {/* Virya-style Organic Overlapping Collage Cluster */}
          <div className="relative mb-16 sm:mb-24 w-full max-w-[1040px] mx-auto h-[410px] sm:h-[480px] md:h-[560px] lg:h-[620px] select-none">

            {/* 1. Top-Left Photo: Multi-Level Rooftop Solar Canopy */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => setSelectedProject(COLLAGE_PROJECTS.topLeft)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedProject(COLLAGE_PROJECTS.topLeft); } }}
              className="absolute left-[1%] sm:left-[5%] md:left-[8%] top-[3%] sm:top-[6%] w-[34%] sm:w-[28%] md:w-[26%] aspect-[4/5] z-10 rounded-[28px] shadow-xl overflow-hidden border border-white/70 group hover:scale-[1.03] hover:z-40 transition-all duration-500 bg-[#EFECE6] cursor-pointer"
            >
              <img
                src={COLLAGE_PROJECTS.topLeft.image}
                alt={COLLAGE_PROJECTS.topLeft.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute top-2.5 right-2.5 sm:top-3.5 sm:right-3.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/40 backdrop-blur-xs text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-md">
                <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end p-2 sm:p-5 pointer-events-none">
                <p className="text-white text-[9px] sm:text-xs font-medium tracking-tight sm:tracking-wide line-clamp-2 sm:line-clamp-none">
                  {COLLAGE_PROJECTS.topLeft.caption}
                </p>
              </div>
            </div>

            {/* 2. Bottom-Left Photo: Continuous Base Rail Layout */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => setSelectedProject(COLLAGE_PROJECTS.bottomLeft)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedProject(COLLAGE_PROJECTS.bottomLeft); } }}
              className="absolute left-[5%] sm:left-[11%] md:left-[14%] bottom-[2%] sm:bottom-[4%] w-[32%] sm:w-[26%] md:w-[24%] aspect-[1/1] z-20 rounded-[28px] shadow-xl overflow-hidden border border-white/70 group hover:scale-[1.03] hover:z-40 transition-all duration-500 bg-[#E5E0D5] cursor-pointer"
            >
              <img
                src={COLLAGE_PROJECTS.bottomLeft.image}
                alt={COLLAGE_PROJECTS.bottomLeft.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute top-2.5 right-2.5 sm:top-3.5 sm:right-3.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/40 backdrop-blur-xs text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-md">
                <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end p-2 sm:p-4 pointer-events-none">
                <p className="text-white text-[9px] sm:text-xs font-medium tracking-tight sm:tracking-wide line-clamp-2 sm:line-clamp-none">
                  {COLLAGE_PROJECTS.bottomLeft.caption}
                </p>
              </div>
            </div>

            {/* 3. Center Photo: Elevated Architectural Solar Pergola Framework (Elevated Hero Card - Clear Solar PV Array) */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => setSelectedProject(COLLAGE_PROJECTS.center)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedProject(COLLAGE_PROJECTS.center); } }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[52%] sm:w-[42%] md:w-[38%] aspect-[4/5] z-30 rounded-[28px] shadow-2xl overflow-hidden border-2 sm:border-4 border-[#FAF9F6] group hover:scale-[1.02] transition-transform duration-500 bg-[#E5E0D5] cursor-pointer"
            >
              <img
                src={COLLAGE_PROJECTS.center.image}
                alt={COLLAGE_PROJECTS.center.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="eager"
              />
              <div className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/50 backdrop-blur-xs text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-md">
                <Maximize2 className="w-4 h-4" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex items-end p-3 sm:p-6 md:p-8 pointer-events-none">
                <div>
                  <span className="inline-block px-2 sm:px-3 py-0.5 sm:py-1 bg-[#0049CA] text-white text-[9px] sm:text-xs font-mono font-bold uppercase tracking-wider mb-1 sm:mb-2 shadow-sm">
                    {COLLAGE_PROJECTS.center.badge || 'Dual Competence'}
                  </span>
                  <p className="text-white text-[11px] sm:text-sm md:text-base font-semibold leading-snug">
                    {COLLAGE_PROJECTS.center.caption}
                  </p>
                </div>
              </div>
            </div>

            {/* 4. Top-Right Photo: Canopy Rafter Joint Assembly */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => setSelectedProject(COLLAGE_PROJECTS.topRight)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedProject(COLLAGE_PROJECTS.topRight); } }}
              className="absolute right-[3%] sm:right-[9%] md:right-[12%] top-[3%] sm:top-[6%] w-[30%] sm:w-[24%] md:w-[22%] aspect-[4/5] z-10 rounded-[28px] shadow-lg overflow-hidden border border-white/70 group hover:scale-[1.03] hover:z-40 transition-all duration-500 bg-[#EFECE6] cursor-pointer"
            >
              <img
                src={COLLAGE_PROJECTS.topRight.image}
                alt={COLLAGE_PROJECTS.topRight.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute top-2.5 right-2.5 sm:top-3.5 sm:right-3.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/40 backdrop-blur-xs text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-md">
                <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end p-2 sm:p-4 pointer-events-none">
                <p className="text-white text-[9px] sm:text-xs font-medium tracking-tight sm:tracking-wide line-clamp-2 sm:line-clamp-none">
                  {COLLAGE_PROJECTS.topRight.caption}
                </p>
              </div>
            </div>

            {/* 5. Bottom-Right Photo: Panoramic Rooftop Solar Array */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => setSelectedProject(COLLAGE_PROJECTS.bottomRight)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedProject(COLLAGE_PROJECTS.bottomRight); } }}
              className="absolute right-[1%] sm:right-[4%] md:right-[6%] bottom-[2%] sm:bottom-[4%] w-[36%] sm:w-[30%] md:w-[28%] aspect-[4/3] z-20 rounded-[28px] shadow-xl overflow-hidden border border-white/70 group hover:scale-[1.03] hover:z-40 transition-all duration-500 bg-[#EFECE6] cursor-pointer"
            >
              <img
                src={COLLAGE_PROJECTS.bottomRight.image}
                alt={COLLAGE_PROJECTS.bottomRight.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute top-2.5 right-2.5 sm:top-3.5 sm:right-3.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/40 backdrop-blur-xs text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-md">
                <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end p-2 sm:p-5 pointer-events-none">
                <p className="text-white text-[9px] sm:text-xs font-medium tracking-tight sm:tracking-wide line-clamp-2 sm:line-clamp-none">
                  {COLLAGE_PROJECTS.bottomRight.caption}
                </p>
              </div>
            </div>

          </div>

          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#0049CA] tracking-tight leading-[1.15] mb-8">
              We manufacture{' '}
              <span className="text-[#8E8A85] font-light">
                <span className="whitespace-nowrap">fit-for-purpose</span>
                <br className="hidden sm:inline" /> solar infrastructure
              </span>
            </h2>

            <p className="text-lg sm:text-xl text-[#647488] leading-relaxed font-normal mb-10 max-w-3xl mx-auto">
              Central Structure Fabrication (CSF) bridges the gap between precision heavy steel roll-forming and certified solar electrical distribution. From our specialized manufacturing hub in Amroha, Uttar Pradesh, we supply India’s renewable ecosystem with high-yield mounting arrays, continuous cold roll-formed channels, and engineered protection enclosures.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/about"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#0F2130] text-white hover:bg-[#0049CA] text-sm font-semibold tracking-wide transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <span>Discover our journey</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#0F2130] hover:bg-[#EFECE6] border border-[#E0DCD3] text-sm font-semibold tracking-wide transition-all duration-200"
              >
                <span>Speak with an engineer</span>
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ── Section 02: Our Expertise Carousel (Virya-style full-screen edge-to-edge cards) ── */}
      <section className="py-24 md:py-32 bg-[#EDE8E1] w-full overflow-hidden">
        {/* Header container aligned with wide grid */}
        <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-10 md:px-16 lg:px-24 mb-12">
          <div ref={expertiseHeaderRef} className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-bold text-[#0049CA] tracking-widest uppercase block mb-2">
                Core Competence
              </span>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#0F2130] tracking-tight">
                Our <span className="text-[#8E8A85] font-light">expertise</span>
              </h2>
            </div>

            {/* Carousel Navigation Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => scrollCarousel('left')}
                disabled={!canScrollLeft}
                aria-label="Previous expertise slide"
                className="w-12 h-12 rounded-full bg-white/90 hover:bg-white text-[#0F2130] flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed shadow-sm transition-all cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollCarousel('right')}
                disabled={!canScrollRight}
                aria-label="Next expertise slide"
                className="w-12 h-12 rounded-full bg-white/90 hover:bg-white text-[#0F2130] flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed shadow-sm transition-all cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel track: Left-aligned with 'Our expertise' heading, bleeding off right edge */}
        <div
          ref={carouselRef}
          onScroll={checkScroll}
          className="w-full flex gap-6 sm:gap-8 overflow-x-auto pb-8 pt-2 scroll-smooth no-scrollbar select-none snap-x snap-mandatory pr-6 sm:pr-10 md:pr-16"
          style={{
            paddingLeft: `${carouselPaddingLeft}px`,
            scrollPaddingLeft: `${carouselPaddingLeft}px`,
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {expertiseList.map((card) => (
            <Link
              key={card.id}
              to={card.link}
              className="min-w-[280px] sm:min-w-[380px] md:min-w-[420px] lg:min-w-[460px] max-w-[460px] bg-white rounded-[28px] p-6 sm:p-9 flex flex-col justify-between shadow-sm hover:shadow-2xl transition-all duration-300 snap-start group border border-[#E2DDD5]/70 cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-5 sm:mb-8">
                  <span className="text-xs font-mono font-bold tracking-[0.14em] text-[#0049CA] uppercase">
                    {card.tag}
                  </span>
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#FAF9F6] text-[#647488] group-hover:bg-[#0049CA] group-hover:text-white flex items-center justify-center transition-all duration-200 group-hover:scale-105 shadow-sm">
                    <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

                <div className="w-full h-60 sm:h-80 md:h-96 rounded-2xl overflow-hidden mb-5 sm:mb-8 bg-[#F5F2EB] border border-[#EAE6DF]/60 relative flex items-center justify-center">
                  <img
                    src={card.img}
                    alt={card.titleFirst}
                    className={`w-full h-full transition-transform duration-500 group-hover:scale-105 ${card.img.endsWith('.png') || card.img.includes('clamp') || card.img.includes('channel')
                      ? 'object-contain p-4 sm:p-6'
                      : 'object-cover'
                      }`}
                    loading="lazy"
                  />
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-[#0F2130] leading-snug group-hover:text-[#0049CA] transition-colors duration-200">
                  {card.titleFirst}{' '}
                  <span className="text-[#8E8A85] font-light block sm:inline">
                    {card.titleRest}
                  </span>
                </h3>
              </div>
            </Link>
          ))}
        </div>

        {/* Virya-style pill scroll progress indicator */}
        <div className="flex justify-center items-center mt-6">
          <div className="w-28 h-1.5 rounded-full bg-[#D7D1C8] overflow-hidden">
            <div
              className="h-full bg-[#0049CA] rounded-full transition-all duration-300"
              style={{
                width: `${Math.max(20, Math.min(100, scrollProgress))}%`,
              }}
            />
          </div>
        </div>
      </section>

      {/* ── Section 03: CSF in Numbers (Virya-style Accent + Stats Grid) ── */}
      <section className="py-24 bg-[#FAF9F6] border-b border-[#EAE6DF]/80">
        <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-10 md:px-16 lg:px-24">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

            {/* Left Accent Card (Deep CSF Navy with Radial Solar Graphic) */}
            <div className="lg:col-span-5 bg-[#0F2130] rounded-[28px] p-10 md:p-12 text-white relative overflow-hidden flex flex-col justify-between shadow-xl">
              {/* Radial Solar Graphic Watermark */}
              <div className="absolute -bottom-20 -right-20 w-80 h-80 opacity-10 pointer-events-none">
                <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" className="text-white w-full h-full">
                  <circle cx="100" cy="100" r="70" strokeWidth="2" strokeDasharray="4 4" />
                  <circle cx="100" cy="100" r="45" strokeWidth="2" />
                  <line x1="100" y1="10" x2="100" y2="190" strokeWidth="2" />
                  <line x1="10" y1="100" x2="190" y2="100" strokeWidth="2" />
                  <line x1="36" y1="36" x2="164" y2="164" strokeWidth="2" />
                  <line x1="36" y1="164" x2="164" y2="36" strokeWidth="2" />
                </svg>
              </div>

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 text-[11px] font-mono font-bold tracking-[0.14em] text-[#60A5FA] uppercase mb-6">
                  <span className="w-1.5 h-1.5 bg-[#1677FF]" />
                  <span>CSF in Numbers</span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-extrabold leading-tight tracking-tight mb-6">
                  Industrial scale{' '}
                  <span className="text-[#A2B1C2] font-light">
                    backed by engineering discipline.
                  </span>
                </h3>
                <p className="text-sm sm:text-base text-[#D1D9E0] leading-relaxed font-normal mb-8">
                  From cold-formed steel coils to automated punch lines and fully tested electrical bays, every metric reflects our zero-compromise manufacturing philosophy.
                </p>
              </div>

              <div className="relative z-10 pt-6 border-t border-white/15 flex flex-wrap items-center gap-4">
                <Link
                  to="/capabilities"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0049CA] text-white hover:bg-white hover:text-[#0F2130] text-xs font-bold uppercase tracking-wider transition-all duration-200"
                >
                  <span>Explore Capabilities</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <span className="text-xs text-[#8FA3B8]">Amroha, Uttar Pradesh</span>
              </div>
            </div>

            {/* Right Stats Grid (Clean Rounded Soft White Cards) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">

              <div className="bg-white rounded-[28px] p-8 shadow-sm border border-[#EAE6DF] hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-full bg-[#0049CA]/10 text-[#0049CA] flex items-center justify-center mb-6">
                  <Factory className="w-5 h-5" />
                </div>
                <div className="text-4xl sm:text-5xl font-extrabold text-[#0F2130] tracking-tight mb-2">
                  50+ <span className="text-[#0049CA] text-3xl font-semibold">MW</span>
                </div>
                <p className="text-xs sm:text-sm text-[#647488] font-normal leading-relaxed">
                  Solar mounting capacity structurally engineered and fabricated for utility and rooftop deployments.
                </p>
              </div>

              <div className="bg-white rounded-[28px] p-8 shadow-sm border border-[#EAE6DF] hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-full bg-[#0049CA]/10 text-[#0049CA] flex items-center justify-center mb-6">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="text-4xl sm:text-5xl font-extrabold text-[#0F2130] tracking-tight mb-2">
                  25+ <span className="text-[#0049CA] text-3xl font-semibold">Years</span>
                </div>
                <p className="text-xs sm:text-sm text-[#647488] font-normal leading-relaxed">
                  Calculated design lifespan with 80-micron hot-dip galvanizing under harsh outdoor conditions.
                </p>
              </div>

              <div className="bg-white rounded-[28px] p-8 shadow-sm border border-[#EAE6DF] hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-full bg-[#0049CA]/10 text-[#0049CA] flex items-center justify-center mb-6">
                  <Layers className="w-5 h-5" />
                </div>
                <div className="text-4xl sm:text-5xl font-extrabold text-[#0F2130] tracking-tight mb-2">
                  0.1 <span className="text-[#0049CA] text-3xl font-semibold">mm</span>
                </div>
                <p className="text-xs sm:text-sm text-[#647488] font-normal leading-relaxed">
                  Roll-forming tooling tolerance ensuring seamless piece-marked assembly without on-site re-drilling.
                </p>
              </div>

              <div className="bg-white rounded-[28px] p-8 shadow-sm border border-[#EAE6DF] hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-full bg-[#0049CA]/10 text-[#0049CA] flex items-center justify-center mb-6">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="text-4xl sm:text-5xl font-extrabold text-[#0F2130] tracking-tight mb-2">
                  4 <span className="text-[#0049CA] text-3xl font-semibold">Hours</span>
                </div>
                <p className="text-xs sm:text-sm text-[#647488] font-normal leading-relaxed">
                  Fast factory-direct turnaround for customized Bill of Materials (BOM) pricing and structural load estimates.
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>



      {/* ── Section 05: Nationwide Execution & Amroha Hub ── */}
      <section className="py-28 bg-[#EDE8E1] border-b border-[#E0DCD3] relative overflow-hidden">
        {/* Subtle decorative background grid pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#0F2130_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-10 md:px-16 lg:px-24 relative z-10">

          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-[0.14em] text-[#0049CA] uppercase mb-4">
                <span className="w-1.5 h-1.5 bg-[#0049CA] animate-pulse" />
                <span>Engineered-to-Order &bull; Consultation &rarr; Manufacturing &rarr; Dispatch</span>
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F2130] tracking-tight leading-[1.1] mb-6">
                Consultation first.{' '}
                <span className="text-[#8E8A85] font-light block sm:inline">Then precision manufacturing &amp; site dispatch.</span>
              </h2>
              <p className="text-base sm:text-lg text-[#556475] leading-relaxed">
                We do not supply generic off-the-shelf products. Every engagement begins with in-depth engineering consultation and BOQ review. Once your site wind loads, profile dimensions, and electrical specs are finalized, we manufacture each component at our Amroha plant and dispatch piece-marked bundles directly to your project site.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Mohanpur+Shumali+Amroha+Uttar+Pradesh+244221+India"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white hover:bg-[#0F2130] hover:text-white text-[#0F2130] text-xs font-bold uppercase tracking-wider border border-[#D8D3C8] transition-all duration-200 shadow-sm group"
              >
                <Navigation className="w-4 h-4 text-[#0049CA] group-hover:text-white group-hover:rotate-45 transition-transform" />
                <span>Visit Plant</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#0049CA] hover:bg-[#0F2130] text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-md group"
              >
                <span>Start Technical Consultation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* 3-Step Process Ribbon: Consultation -> Manufacturing -> Dispatch */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
            <div className="rounded-2xl bg-white/90 border border-white/70 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold text-[#0049CA] uppercase tracking-wider">
                  Phase 01
                </span>
                <div className="w-8 h-8 rounded-full bg-[#0049CA]/10 text-[#0049CA] flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
              </div>
              <h3 className="text-base font-bold text-[#0F2130] mb-2">
                Consultation &amp; Requirement Understanding
              </h3>
              <p className="text-xs text-[#647488] leading-relaxed">
                Detailed review of client drawings, Bill of Quantities (BOQ), site topography, wind/seismic load calculations, and required profile gauges.
              </p>
            </div>

            <div className="rounded-2xl bg-white/90 border border-white/70 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold text-[#0049CA] uppercase tracking-wider">
                  Phase 02
                </span>
                <div className="w-8 h-8 rounded-full bg-[#0049CA]/10 text-[#0049CA] flex items-center justify-center">
                  <Wrench className="w-4 h-4" />
                </div>
              </div>
              <h3 className="text-base font-bold text-[#0F2130] mb-2">
                Precision Manufacturing &amp; Piece-Marking
              </h3>
              <p className="text-xs text-[#647488] leading-relaxed">
                High-speed cold roll-forming of 80&times;40 and 41&times;41 channels, CNC punching, Class-1 hot-dip galvanizing, and CAD piece-marking of every part.
              </p>
            </div>

            <div className="rounded-2xl bg-white/90 border border-white/70 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold text-[#0049CA] uppercase tracking-wider">
                  Phase 03
                </span>
                <div className="w-8 h-8 rounded-full bg-[#0049CA]/10 text-[#0049CA] flex items-center justify-center">
                  <Truck className="w-4 h-4" />
                </div>
              </div>
              <h3 className="text-base font-bold text-[#0F2130] mb-2">
                Factory Dispatch Direct to Site
              </h3>
              <p className="text-xs text-[#647488] leading-relaxed">
                Piece-marked bundles are moisture-wrapped, pallet-strapped, and loaded onto dedicated flatbed transport for direct dispatch to your project coordinates.
              </p>
            </div>
          </div>

          {/* Main Visual Showcase Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

            {/* Left Column: Industrial Factory Dispatch Imagery & Pallet Bundling Showcase */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">

              {/* Primary Dispatch Fleet Hero Image Card */}
              <div className="relative rounded-[28px] overflow-hidden shadow-xl border border-white/60 bg-[#0F2130] group min-h-[380px] sm:min-h-[460px] flex flex-col justify-between p-6 sm:p-8">
                {/* Background image */}
                <img
                  src="/gallery/nationwide_logistics_dispatch.jpg"
                  alt="CSF Central Structure Fabrication factory dispatch upon manufacturing completion"
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90"
                />

                {/* Gradient Overlays for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F2130] via-[#0F2130]/30 to-[#0F2130]/60 pointer-events-none" />

                {/* Top Floating Badges */}
                <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-mono font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#38BDF8]" />
                    <span>Amroha Central Plant &bull; 28.90&deg;N, 78.47&deg;E</span>
                  </div>

                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#0049CA]/90 backdrop-blur-md text-white text-[11px] font-mono font-bold uppercase tracking-wider shadow-lg">
                    <Truck className="w-3.5 h-3.5" />
                    <span>Direct Factory Dispatch Once Fabricated</span>
                  </div>
                </div>

                {/* Bottom Telemetry HUD */}
                <div className="relative z-10 pt-16">
                  <div className="max-w-xl mb-6">
                    <span className="text-xs font-bold text-[#38BDF8] uppercase tracking-wider block mb-1.5">
                      Engineered to Order &bull; Amroha Manufacturing Desk
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                      Fabricated to drawing specifications and dispatched directly to your site
                    </h3>
                  </div>

                  {/* Telemetry Stats Bar */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/20">
                    <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
                      <span className="text-xs text-white/70 block">Custom Built</span>
                      <strong className="text-lg sm:text-xl font-extrabold text-white block mt-0.5">100%</strong>
                      <span className="text-[10px] text-[#38BDF8]">Per Project BOQ</span>
                    </div>

                    <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
                      <span className="text-xs text-white/70 block">Roll-Forming</span>
                      <strong className="text-lg sm:text-xl font-extrabold text-white block mt-0.5">0.1 mm</strong>
                      <span className="text-[10px] text-[#38BDF8]">Tooling Precision</span>
                    </div>

                    <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
                      <span className="text-xs text-white/70 block">Piece-Marked</span>
                      <strong className="text-lg sm:text-xl font-extrabold text-white block mt-0.5">100%</strong>
                      <span className="text-[10px] text-[#38BDF8]">CAD Matched</span>
                    </div>

                    <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
                      <span className="text-xs text-white/70 block">Dispatch</span>
                      <strong className="text-lg sm:text-xl font-extrabold text-white block mt-0.5">All-India</strong>
                      <span className="text-[10px] text-[#38BDF8]">Direct Site Transport</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Secondary Feature Card: Physical Piece-Marked Bundles & Plant Verification */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Physical Packaging & Piece-Marking Thumbnail Card */}
                <div className="rounded-[28px] bg-white border border-[#E2DDD5] p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shrink-0 border border-[#EAE6DF] shadow-inner">
                      <img
                        src="/gallery/piece_marked_bundles.jpg"
                        alt="Piece-marked galvanized steel bundles ready for dispatch"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/70 text-white text-[9px] font-mono font-bold">
                        TAGGED
                      </span>
                    </div>
                    <div>
                      <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#0049CA] uppercase tracking-wider mb-1">
                        <PackageCheck className="w-3.5 h-3.5" />
                        <span>Factory Tagged</span>
                      </div>
                      <h4 className="text-sm font-bold text-[#0F2130] leading-snug">
                        Piece-Marked Assembly Bundles
                      </h4>
                      <p className="text-xs text-[#647488] leading-relaxed mt-1">
                        Every fabricated C-channel, strut, and bracket carries weatherproof part labels matching the engineering drawing for fast site installation.
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#F0ECE6] flex items-center justify-between text-[11px] text-[#647488]">
                    <span className="flex items-center gap-1 text-[#0F2130] font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#0049CA]" />
                      Zero Field Confusion
                    </span>
                    <span className="font-mono text-[#0049CA] font-medium">Pallet Tagged</span>
                  </div>
                </div>

                {/* Amroha Hub Plant Specs Card */}
                <div className="rounded-[28px] bg-white border border-[#E2DDD5] p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-bold text-[#0049CA] uppercase tracking-wider">
                        Primary Manufacturing Base
                      </span>
                      <span className="px-2 py-0.5 bg-[#FAF9F6] border border-[#EAE6DF] text-[10px] font-mono text-[#647488]">
                        PIN: 244221
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-[#0F2130] mb-1">
                      Amroha Fabrication Complex
                    </h4>
                    <p className="text-xs text-[#647488] leading-relaxed mb-4">
                      Mohanpur Shumali, Tahseel Naugaon Sadat, Amroha, Western Uttar Pradesh. Continuous roll-forming lines, CNC punch lines, and 10-ton EOT cranes.
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#F0ECE6] flex items-center justify-between">
                    <span className="text-[11px] text-[#647488]">Engineers on-site for consultation</span>
                    <a
                      href="https://www.google.com/maps/dir/?api=1&destination=Mohanpur+Shumali+Amroha+Uttar+Pradesh+244221+India"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-[#0049CA] hover:underline inline-flex items-center gap-1"
                    >
                      <span>Navigate</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>

              </div>

            </div>

            {/* Right Column: Interactive Regional Deployment Corridors */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-white rounded-[28px] p-6 sm:p-8 md:p-10 shadow-sm border border-[#E2DDD5]">

              {/* Corridor Card Header */}
              <div>
                <div className="flex items-start justify-between pb-6 border-b border-[#EAE6DF] mb-6">
                  <div>
                    <span className="text-[11px] font-bold text-[#0049CA] uppercase tracking-wider block mb-1">
                      Factory Dispatch Network
                    </span>
                    <h3 className="text-xl font-bold text-[#0F2130]">Major Project Dispatch Corridors</h3>
                    <p className="text-xs text-[#647488] mt-0.5">Dedicated flatbed dispatches once fabrication is complete</p>
                  </div>
                  <span className="px-3 py-1 bg-[#FAF9F6] border border-[#EAE6DF] text-[#0F2130] text-[11px] font-mono font-bold tracking-tight shrink-0">
                    GST: 09BDRPA4213J1ZJ
                  </span>
                </div>

                {/* Interactive Corridor Selector Tabs */}
                <div className="space-y-3.5 mb-8">
                  {deploymentCorridors.map((c, idx) => {
                    const isSelected = activeCorridor === idx;
                    return (
                      <div
                        key={c.id}
                        onClick={() => setActiveCorridor(idx)}
                        className={`cursor-pointer rounded-2xl p-4 sm:p-5 transition-all duration-200 border ${isSelected
                          ? 'bg-[#0049CA]/5 border-[#0049CA] shadow-sm ring-1 ring-[#0049CA]/20'
                          : 'bg-[#FAF9F6] border-[#EAE6DF] hover:border-[#D8D3C8] hover:bg-white'
                          }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2.5">
                            <span
                              className={`w-2.5 h-2.5 rounded-full ${isSelected ? 'bg-[#0049CA]' : 'bg-[#D8D3C8]'
                                }`}
                            />
                            <h4 className="text-sm font-bold text-[#0F2130]">{c.grid}</h4>
                            <span className="text-[11px] text-[#647488] hidden sm:inline">&bull; {c.coverage}</span>
                          </div>

                          <span className="px-2.5 py-1 bg-white border border-[#EAE6DF] text-[11px] font-mono font-bold text-[#0049CA]">
                            {c.dispatchType}
                          </span>
                        </div>

                        <p className="text-xs text-[#556475] leading-relaxed mb-3">
                          {c.states}
                        </p>

                        <div className="flex flex-wrap items-center justify-between gap-2 pt-2.5 border-t border-[#EAE6DF]/60 text-[11px]">
                          <span className="text-[#647488] flex items-center gap-1.5">
                            <Truck className="w-3 h-3 text-[#0049CA]" />
                            <span className="font-medium text-[#0F2130]">{c.mode}</span>
                          </span>
                          <span className="font-mono text-[#0049CA] text-[10px] truncate max-w-[200px]">
                            {c.highway}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Active Corridor Cargo Breakdown Callout */}
              <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E2DDD5] mb-6">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#647488]">
                    Target Project Material ({deploymentCorridors[activeCorridor].grid})
                  </span>
                  <span className="text-[10px] font-mono text-[#0049CA] font-semibold">
                    Direct Site Dispatch
                  </span>
                </div>
                <p className="text-xs font-medium text-[#0F2130] leading-relaxed">
                  {deploymentCorridors[activeCorridor].cargo}
                </p>
              </div>

              {/* Verified Technical Standards Compliance Strip */}
              <div className="pt-5 border-t border-[#EAE6DF] flex flex-wrap items-center justify-between gap-3 text-xs text-[#647488]">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#0049CA]" />
                  <span>Certified IS 2062 Grade Steel</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#0049CA]" />
                  <span>Class 1 Hot-Dip Galvanizing (IS 2629 / 4759)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#0049CA]" />
                  <span>IP65 Enclosures</span>
                </span>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ── Project Lightbox Modal (Same as Projects Page) ── */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 bg-[#0F2130]/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
          onClick={() => setSelectedProject(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-white rounded-3xl max-w-4xl w-full border border-white/20 p-6 sm:p-8 relative overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2.5 bg-[#F8FAFC] hover:bg-[#E5E7EB] text-[#0F2130] rounded-full cursor-pointer transition-colors z-10"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-16/10 max-h-[60vh] overflow-hidden mb-6 bg-black rounded-2xl flex items-center justify-center">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-[#0049CA] uppercase tracking-wider block mb-1">
                  {selectedProject.domainLabel} // {selectedProject.location}
                </span>
                <h3 className="text-xl font-bold text-[#0F2130]">{selectedProject.title}</h3>
                <p className="text-xs text-[#647488] mt-1">{selectedProject.description}</p>
                {selectedProject.specs && (
                  <p className="text-[11px] font-mono text-[#0049CA] mt-1.5 font-medium">
                    {selectedProject.specs}
                  </p>
                )}
              </div>

              <Link
                to={`/contact?service=${encodeURIComponent(`Inquiry for: ${selectedProject.title}`)}`}
                onClick={() => setSelectedProject(null)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#0049CA] hover:bg-[#003CAD] text-white text-xs font-bold uppercase tracking-wider shrink-0 cursor-pointer shadow-md transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Request Similar Spec</span>
              </Link>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default HomePage;
