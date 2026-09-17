import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';
import {
  X,
  ArrowRight,
  PhoneCall,
  Maximize2
} from 'lucide-react';

interface ProjectsPageProps {
  onEnquireClick?: (service?: string) => void;
}

interface GalleryItem {
  id: string;
  title: string;
  domain: 'solar-installations' | 'structural-applications' | 'mounting-systems' | 'custom-fabrication' | 'electrical-systems';
  domainLabel: string;
  image: string;
  location: string;
  specs: string;
  description: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'proj-csf-01',
    title: 'High-Elevation Rooftop Solar Pergola Structure',
    domain: 'solar-installations',
    domainLabel: 'Solar Installations',
    image: '/projects/csf_project_01.jpg',
    location: 'Commercial Terrace Rooftop, Western UP',
    specs: 'IS 2062 C-Channels • 160 km/h Wind Tolerance',
    description: 'Heavy-duty elevated rooftop solar canopy structure constructed with galvanized roll-formed C-channels and high-tensile diagonal cross-braces.',
  },
  {
    id: 'proj-csf-02',
    title: 'Elevated Terrace Solar Frame with Cross-Bracing',
    domain: 'structural-applications',
    domainLabel: 'Structural Applications',
    image: '/projects/csf_project_02.jpg',
    location: 'Multi-Floor Building, Amroha Corridor',
    specs: 'Galvanized Rafter Columns • Diagonal Bracing',
    description: 'Engineered rooftop solar array framework showing heavy-duty vertical stanchions and cross bracing for maximum structural wind stability.',
  },
  {
    id: 'proj-csf-03',
    title: 'Rooftop Solar Array Rear Structural View',
    domain: 'structural-applications',
    domainLabel: 'Structural Applications',
    image: '/projects/csf_project_03.jpg',
    location: 'Commercial Facility Terrace, UP',
    specs: 'Continuous Purlin Rails • Bolted Splice Plates',
    description: 'Rear elevation structural perspective showing bolted C-channel rafters, purlins, and truss connections supporting framed PV panels.',
  },
  {
    id: 'proj-csf-04',
    title: 'Urban Multi-Storey Building Solar Canopy',
    domain: 'solar-installations',
    domainLabel: 'Solar Installations',
    image: '/projects/csf_project_04.jpg',
    location: 'NCR Urban Residential & Commercial Project',
    specs: 'Headspace Clearance • High-Rise Terrace Structure',
    description: 'Full exterior elevation of a modern multi-storey building crowned by an engineered elevated rooftop solar framework allowing usable terrace living space.',
  },
  {
    id: 'proj-csf-05',
    title: 'Terrace Solar PV Array Top Elevation',
    domain: 'solar-installations',
    domainLabel: 'Solar Installations',
    image: '/projects/csf_project_05.jpg',
    location: 'Rooftop Commercial Project, UP',
    specs: 'High-Yield Module Strings • Slotted Base Rails',
    description: 'Top view of a residential and commercial rooftop solar installation utilizing galvanized steel base rails and stainless hardware.',
  },
  {
    id: 'proj-csf-06',
    title: 'High-Clearance Solar Terrace Superstructure',
    domain: 'structural-applications',
    domainLabel: 'Structural Applications',
    image: '/projects/csf_project_06.jpg',
    location: 'Residential Rooftop, Western UP',
    specs: 'Heavy Column Stanchions • Zinc Plated Fasteners',
    description: 'Elevated superstructure racking designed to withstand seasonal high wind storms while maintaining usable roof access below.',
  },
  {
    id: 'proj-csf-07',
    title: 'Engineered Solar Support Frame & Rail Layout',
    domain: 'mounting-systems',
    domainLabel: 'Solar Mounting Systems',
    image: '/projects/csf_project_07.jpg',
    location: 'Commercial Rooftop Deployment',
    specs: 'Continuous 80x40 C-Channel Rails • Mid Clamps',
    description: 'Precision-aligned roll-formed C-channel purlins and clamp retainers securing PV module strings along the perimeter parapet.',
  },
  {
    id: 'proj-csf-08',
    title: 'Rooftop Slotted Channel Solar Array String',
    domain: 'mounting-systems',
    domainLabel: 'Solar Mounting Systems',
    image: '/projects/csf_project_08.jpg',
    location: 'Industrial Facility Terrace, Amroha',
    specs: 'Hot-Dip Galvanized Channels • Oval CNC Slots',
    description: 'Continuous multi-row solar array installed onto CNC pre-punched slotted C-channels allowing micro-adjustment and rapid bolt tightening.',
  },
  {
    id: 'proj-csf-09',
    title: 'Continuous Long-Span Rooftop Solar String',
    domain: 'solar-installations',
    domainLabel: 'Solar Installations',
    image: '/projects/csf_project_09.jpg',
    location: 'Commercial Industrial Rooftop, UP',
    specs: 'Continuous Roll-Formed Purlins • Module Rails',
    description: 'Overview of long-run PV module rows mounted with precision roll-formed C-channels for maximum structural rigidity and clean cable routing.',
  },
  {
    id: 'proj-csf-10',
    title: 'Solar Module String Mounting Detail',
    domain: 'mounting-systems',
    domainLabel: 'Solar Mounting Systems',
    image: '/projects/csf_project_10.jpg',
    location: 'Commercial Shed Rooftop Project',
    specs: 'Precision Retaining Clamps • Anti-Corrosion HDG',
    description: 'Detailed perspective showing panel retention clamps, continuous channel base rails, and vibration-resistant hardware fixing.',
  },
  {
    id: 'proj-csf-11',
    title: 'Elevated Solar Stanchion Column Installation',
    domain: 'structural-applications',
    domainLabel: 'Structural Applications',
    image: '/projects/csf_project_11.jpg',
    location: 'Urban Building Rooftop, UP',
    specs: 'Heavy-Duty Post Supports • Base Anchor Plates',
    description: 'Engineered column post stanchion securely anchored into rooftop columns, elevating solar modules safely above roof obstructions.',
  },
  {
    id: 'proj-csf-12',
    title: 'Long-Run Solar Panel Rows with Galvanized Purlins',
    domain: 'solar-installations',
    domainLabel: 'Solar Installations',
    image: '/projects/csf_project_12.jpg',
    location: 'Industrial Shed Installation, NCR',
    specs: 'High-Capacity Cold-Rolled Channels • IS 2062',
    description: 'Extensive rooftop solar array installation featuring continuous cold-rolled galvanized steel purlins engineered for 25+ year outdoor life.',
  },
  {
    id: 'proj-csf-13',
    title: 'Terrace Pergola Solar Column Assembly',
    domain: 'structural-applications',
    domainLabel: 'Structural Applications',
    image: '/projects/csf_project_13.jpg',
    location: 'Commercial High-Rise Rooftop',
    specs: 'Hot-Dip Galvanized Posts • High Load Bearing',
    description: 'Vertical structural steel column assembly and rafter joints engineered to deliver high bending moment resistance under heavy wind loads.',
  },
  {
    id: 'proj-csf-14',
    title: 'Multi-Level Rooftop Solar Canopy Structure',
    domain: 'structural-applications',
    domainLabel: 'Structural Applications',
    image: '/projects/csf_project_14.jpg',
    location: 'Commercial Rooftop Facility, Western UP',
    specs: 'Modular C-Channel Rafters • High-Tensile Fasteners',
    description: 'Structural terrace pergola framework offering full clearance for rooftop walking space while generating sustainable solar energy.',
  },
  {
    id: 'proj-csf-15',
    title: 'Elevated Solar Canopy Rafter Joint Assembly',
    domain: 'custom-fabrication',
    domainLabel: 'Custom Fabrication',
    image: '/projects/csf_project_15.jpg',
    location: 'Rooftop Fabrication Site, UP',
    specs: 'Custom Splice Plates • CNC Punched Flanges',
    description: 'Custom-fabricated structural steel splice connection joining channel rafters with vertical posts for maximum torsional strength.',
  },
  {
    id: 'proj-csf-16',
    title: 'Rooftop Solar Array String Overlooking Town',
    domain: 'solar-installations',
    domainLabel: 'Solar Installations',
    image: '/projects/csf_project_16.jpg',
    location: 'Regional Solar Deployment, Amroha District',
    specs: 'High-Yield Strings • Continuous Channel Purlins',
    description: 'Elevated perspective of a finished solar array capturing sunlight efficiently across continuous galvanized roll-formed purlins.',
  },
  {
    id: 'proj-csf-17',
    title: 'Rooftop Solar Canopy Column Foundation & Anchors',
    domain: 'structural-applications',
    domainLabel: 'Structural Applications',
    image: '/projects/csf_project_17.jpg',
    location: 'Commercial Terrace Installation',
    specs: 'Heavy Chemical Anchor Bolts • Thick Base Plates',
    description: 'Rigid structural base anchor plates fixed with high-strength anchors into concrete roof columns, ensuring safe load transfer.',
  },
  {
    id: 'proj-csf-18',
    title: 'Panoramic Rooftop Solar Array Installation',
    domain: 'solar-installations',
    domainLabel: 'Solar Installations',
    image: '/projects/csf_project_18.jpg',
    location: 'Industrial Plant Rooftop, Western UP',
    specs: 'Multi-Row String Layout • Heavy-Gauge Purlins',
    description: 'Wide panoramic view of commercial rooftop solar deployment fabricated with cold-rolled C-channels and modular bracketry.',
  },
  {
    id: 'proj-csf-19',
    title: 'Rooftop Solar Stanchion Uprights & Bracing',
    domain: 'mounting-systems',
    domainLabel: 'Solar Mounting Systems',
    image: '/projects/csf_project_19.jpg',
    location: 'Institutional Rooftop Project',
    specs: 'Adjustable Tilt Stanchions • Hot-Dip Galvanized',
    description: 'Modular elevated stanchion posts providing optimal seasonal tilt angles for solar photovoltaic modules in North India.',
  },
  {
    id: 'proj-csf-20',
    title: 'Rooftop Solar Module Array with Mid-Clamps',
    domain: 'mounting-systems',
    domainLabel: 'Solar Mounting Systems',
    image: '/projects/csf_project_20.jpg',
    location: 'Commercial Rooftop Facility',
    specs: 'Anodized Aluminum Mid-Clamps • EPDM Gaskets',
    description: 'Close-up perspective of solar modules secured onto continuous roll-formed purlin channels with heavy-duty intermediate clamps.',
  },
  {
    id: 'proj-csf-21',
    title: 'Rooftop Solar Purlin Continuous Alignment',
    domain: 'mounting-systems',
    domainLabel: 'Solar Mounting Systems',
    image: '/projects/csf_project_21.jpg',
    location: 'Commercial Shed Deployment',
    specs: 'Slotted C-Channels (80x40x15) • CNC Oval Slots',
    description: 'Precision alignment of continuous slotted C-channels allowing fast on-site bolt connection and straight panel rows.',
  },
  {
    id: 'proj-csf-22',
    title: 'Commercial Rooftop Solar String Array Top View',
    domain: 'solar-installations',
    domainLabel: 'Solar Installations',
    image: '/projects/csf_project_22.jpg',
    location: 'Industrial Rooftop Deployment, Western UP',
    specs: 'Full Roof Utilization • 80μm HDG Protection',
    description: 'High-density solar string array designed to maximize rooftop square footage and deliver maximum daily kilowatt-hour yield.',
  },
  {
    id: 'proj-csf-23',
    title: 'High-Rise Rooftop Solar Structure Column Framing',
    domain: 'structural-applications',
    domainLabel: 'Structural Applications',
    image: '/projects/csf_project_23.jpg',
    location: 'Urban Commercial Building, NCR Corridor',
    specs: 'Structural C-Channel Columns • Welded Base Plates',
    description: 'High-rise structural framework designed to resist severe wind shear forces at high elevations using cold-rolled steel purlins.',
  },
  {
    id: 'proj-csf-24',
    title: 'Elevated Terrace Solar Overhead Pergola Framework',
    domain: 'solar-installations',
    domainLabel: 'Solar Installations',
    image: '/projects/csf_project_24.jpg',
    location: 'Modern Multi-Floor Building, UP',
    specs: 'Architectural Terrace Pergola • Zero Lost Space',
    description: 'Modern architectural solar pergola installed overhead on a residential/commercial building terrace combining utility with energy generation.',
  },
  {
    id: 'proj-csf-25',
    title: 'Industrial Shed Rooftop Solar PV Installation',
    domain: 'solar-installations',
    domainLabel: 'Solar Installations',
    image: '/projects/csf_project_25.jpg',
    location: 'Industrial Facility, Amroha Hub',
    specs: 'Trapezoidal & Purlin Mounting • High-Tensile Steel',
    description: 'Large-scale commercial roof deployment utilizing CSF roll-formed mounting channels and robust stainless steel clamping hardware.',
  },
  {
    id: 'proj-csf-26',
    title: 'Full Building Elevation with Rooftop Solar Racking',
    domain: 'solar-installations',
    domainLabel: 'Solar Installations',
    image: '/projects/csf_project_26.jpg',
    location: 'Commercial Building Deployment, Western UP',
    specs: 'Turnkey Solar Installation • Complete Racking Suite',
    description: 'Full perspective of the client building showing the engineered rooftop solar racking seamlessly integrated onto the terrace roof.',
  },
];

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onEnquireClick: _onEnquireClick }) => {
  useSEO({
    title: 'Projects & Application Domains | Central Structure Fabrication (CSF)',
    description:
      'View real-world deployments and application domains of Central Structure Fabrication (CSF): Solar Installations, Structural Applications, Mounting Systems, Custom Fabrication, and Electrical Solar Systems.',
    keywords:
      'solar structure projects India, CSF fabrication gallery, solar mounting photos, industrial C channel applications, solar inverter setups, ACDB DCDB installations',
    canonical: 'https://www.csfabrication.in/projects',
    ogTitle: 'Projects & Applications — Central Structure Fabrication (CSF)',
    ogDescription:
      'Real industrial deployments of solar structures, C-channels, custom steel fabrication, and electrical distribution boxes by CSF.',
  });

  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  // Prevent background page from scrolling when modal is open
  useEffect(() => {
    if (selectedImage) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setSelectedImage(null);
        }
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [selectedImage]);

  const applicationDomains = [
    { id: 'solar-installations', title: 'Solar Installations' },
    { id: 'structural-applications', title: 'Structural Applications' },
    { id: 'mounting-systems', title: 'Solar Mounting Systems' },
    { id: 'custom-fabrication', title: 'Custom Fabrication' },
  ];

  const filteredItems = activeFilter === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.domain === activeFilter);

  return (
    <div className="w-full pt-28 pb-24 bg-[#FFFFFF] text-[#0F2130]">
      {/* ── Page Header ─────────────────────────────────────────── */}
      <section className="max-w-[1720px] mx-auto px-6 sm:px-10 md:px-16 lg:px-24 mb-14">
        <div className="flex flex-col gap-4 max-w-3xl">
          <div className="inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#0049CA]" />
            <span className="text-[11px] font-mono font-bold tracking-[0.14em] text-[#0049CA] uppercase">
              Portfolio &amp; Deployments
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#0F2130] leading-[1.1]">
            Projects &amp; Application Domains
          </h1>
          <p className="text-base sm:text-lg text-[#647488] leading-relaxed">
            Central Structure Fabrication supports solar developers, EPC contractors, and industrial infrastructure projects across India. Explore our verified manufacturing deployments and field installations.
          </p>
        </div>
      </section>

      {/* ── Visual Gallery with Filters ───────────────────────────── */}
      <section className="max-w-[1720px] mx-auto px-6 sm:px-10 md:px-16 lg:px-24 mb-24">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-[#E5E7EB] pb-6">
          <div>
            <span className="text-xs font-bold text-[#0049CA] uppercase tracking-wider">Deployment Showcase</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F2130] mt-1">
              Verified Industrial Gallery
            </h2>
          </div>

          {/* Filter Pills (Uniform rounded-full) */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-full text-xs font-semibold cursor-pointer transition-all duration-200 ${activeFilter === 'all'
                  ? 'bg-[#0049CA] text-white shadow-xs'
                  : 'bg-[#F8FAFC] text-[#647488] hover:text-[#0F2130] border border-[#E5E7EB]'
                }`}
            >
              All Projects ({GALLERY_ITEMS.length})
            </button>
            {applicationDomains.map((d) => (
              <button
                key={d.id}
                onClick={() => setActiveFilter(d.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold cursor-pointer transition-all duration-200 ${activeFilter === d.id
                    ? 'bg-[#0049CA] text-white shadow-xs'
                    : 'bg-[#F8FAFC] text-[#647488] hover:text-[#0F2130] border border-[#E5E7EB]'
                  }`}
              >
                {d.title}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid (Uniform rounded-2xl cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="border border-[#E5E7EB] rounded-2xl bg-white group hover:border-[#0049CA] transition-all duration-300 shadow-xs hover:shadow-xl flex flex-col justify-between overflow-hidden cursor-pointer"
              onClick={() => setSelectedImage(item)}
            >
              <div className="relative aspect-16/10 overflow-hidden bg-[#0F2130]/5">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-[#0F2130]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                  <span className="px-4 py-2 bg-white text-[#0F2130] rounded-full shadow-md flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                    <Maximize2 className="w-4 h-4 text-[#0049CA]" />
                    <span>Enlarge</span>
                  </span>
                </div>
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 bg-[#0F2130]/90 backdrop-blur-xs text-white rounded-md text-[10px] font-semibold uppercase tracking-wider">
                    {item.domainLabel}
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-base font-bold text-[#0F2130] mb-1 group-hover:text-[#0049CA] transition-colors">
                    {item.title}
                  </h3>
                  <span className="text-xs font-mono text-[#647488] block mb-2">{item.specs}</span>
                  <p className="text-xs text-[#647488] leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E5E7EB] flex items-center justify-between">
                  <span className="text-[11px] text-[#0F2130] font-medium">📍 {item.location}</span>
                  <Link
                    to={`/contact?service=${encodeURIComponent(`Project RFQ: ${item.title}`)}`}
                    onClick={(e) => e.stopPropagation()}
                    className="text-xs font-bold text-[#0049CA] hover:text-[#003CAD] inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Enquire</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Image Lightbox Modal (Uniform rounded-3xl dialog) ─────── */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-[#0F2130]/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-4xl w-full border border-white/20 p-6 sm:p-8 relative overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2.5 bg-[#F8FAFC] hover:bg-[#E5E7EB] text-[#0F2130] rounded-full cursor-pointer transition-colors z-10"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-16/10 max-h-[60vh] overflow-hidden mb-6 bg-black rounded-2xl">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-[#0049CA] uppercase tracking-wider block mb-1">
                  {selectedImage.domainLabel} // {selectedImage.location}
                </span>
                <h3 className="text-xl font-bold text-[#0F2130]">{selectedImage.title}</h3>
                <p className="text-xs text-[#647488] mt-1">{selectedImage.description}</p>
              </div>

              <Link
                to={`/contact?service=${encodeURIComponent(`Inquiry for: ${selectedImage.title}`)}`}
                onClick={() => setSelectedImage(null)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#0049CA] hover:bg-[#003CAD] text-white text-xs font-bold uppercase tracking-wider shrink-0 cursor-pointer shadow-md transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Request Similar Spec</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ── Section CTA (Uniform rounded-2xl banner) ─────────────────── */}
      <section className="max-w-[1720px] mx-auto px-6 sm:px-10 md:px-16 lg:px-24 mb-20">
        <div className="border border-[#0F2130] rounded-2xl bg-[#0F2130] text-white p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h3 className="text-2xl font-bold mb-2">Have a Project with Specific Structural or Electrical Specs?</h3>
            <p className="text-sm text-[#E5E7EB]/80 max-w-xl">
              Our engineering and fabrication teams in Amroha can review your bill of materials (BOM), load specifications, or single line diagram (SLD).
            </p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#0049CA] hover:bg-[#003CAD] text-white text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors shadow-md"
            >
              <span>Submit Project Inquiry</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage;
