import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';
import {
  Layers,
  Zap,
  Building,
  Wrench,
  Sun,
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
    id: 'proj-1',
    title: 'Ground Mounted Solar Structure Array',
    domain: 'solar-installations',
    domainLabel: 'Solar Installations',
    image: '/gallery/solar_mounting_framework.png',
    location: 'Western Uttar Pradesh',
    specs: 'IS 2062 Grade Steel // 160 km/h Wind Resistance',
    description: 'Utility-scale ground mounted solar frame utilizing heavy-duty C-channel purlins and bolted post uprights.',
  },
  {
    id: 'proj-2',
    title: 'Slotted Continuous C-Channels',
    domain: 'structural-applications',
    domainLabel: 'Structural Applications',
    image: '/gallery/slotted_c_channels_raw.png',
    location: 'Amroha Facility',
    specs: '80×40×15 & 60×40×15 mm // Hot Dip Galvanized',
    description: 'Precision roll-formed C-channels with pre-punched elongation slots for seamless bolt alignment in industrial framing.',
  },
  {
    id: 'proj-3',
    title: 'Modular 41×41 Strut Channel Systems',
    domain: 'mounting-systems',
    domainLabel: 'Solar Mounting Systems',
    image: '/gallery/slotted_strut_channel.png',
    location: 'Industrial Rooftop Deployments',
    specs: '41×41 mm // Inward Gripping Lip Profile',
    description: 'Versatile slotted channel framework providing modular mounting points for solar modules, cable trays, and raceways.',
  },
  {
    id: 'proj-4',
    title: 'High-Torque Stainless Hardware & Brackets',
    domain: 'custom-fabrication',
    domainLabel: 'Custom Fabrication',
    image: '/gallery/stainless_fasteners_detail.png',
    location: 'Field Erection Support',
    specs: 'SS304 A2-70 Fasteners & Structural Splices',
    description: 'Corrosion-resistant bolted joinery ensuring long-term structural integrity without loosening under cyclic thermal expansion.',
  },
  {
    id: 'proj-5',
    title: 'Solar Hybrid Inverter Trading & Supply',
    domain: 'electrical-systems',
    domainLabel: 'Electrical Solar Systems',
    image: '/electrical/solar_hybrid_inverter.jpg',
    location: 'Commercial & Institutional Sites',
    specs: 'Multi-Source Power Routing // Solar + Grid + Storage',
    description: 'Supply of high-efficiency solar hybrid inverters enabling seamless power transfer between solar panels, grid, and storage batteries.',
  },
  {
    id: 'proj-6',
    title: 'Precision AC Distribution Box (ACDB)',
    domain: 'electrical-systems',
    domainLabel: 'Electrical Solar Systems',
    image: '/electrical/acdb_box.jpg',
    location: 'Solar Inverter Interconnection',
    specs: 'IP65 Polycarbonate Enclosure // Type II SPD',
    description: 'Custom-manufactured ACDB panel with calibrated MCB/MCCB breakers and AC surge protection devices.',
  },
  {
    id: 'proj-7',
    title: 'Industrial DC Distribution Box (DCDB)',
    domain: 'electrical-systems',
    domainLabel: 'Electrical Solar Systems',
    image: '/electrical/dcdb_box.jpg',
    location: 'PV String Combiner Point',
    specs: '1000V DC Isolator // High-Voltage DC Fuses',
    description: 'Manufactured DCDB for PV array string isolation, featuring high-voltage DC disconnect switch and surge protection.',
  },
  {
    id: 'proj-8',
    title: 'Anodized Aluminum Mid & End Clamping',
    domain: 'mounting-systems',
    domainLabel: 'Solar Mounting Systems',
    image: '/hardware/u_clamp.jpg',
    location: 'Solar Array Module Fixing',
    specs: '6063-T6 Extruded Alloy // SS304 Bolts',
    description: 'Universal extruded clamps with serrated grip channels engineered for secure solar panel retention across 30mm–40mm modules.',
  },
  {
    id: 'proj-9',
    title: 'Heavy Structural Purlin Framework',
    domain: 'structural-applications',
    domainLabel: 'Structural Applications',
    image: '/gallery/heavy_duty_purlins_stacked.png',
    location: 'Commercial Solar Canopy',
    specs: 'Cold Roll Formed // Class 1 Hot Dip Galvanizing',
    description: 'High-strength steel purlin sections stacked ready for dispatch to commercial shed solar installation sites.',
  },
];

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onEnquireClick }) => {
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

  const applicationDomains = [
    {
      id: 'solar-installations',
      title: 'Solar Installations',
      desc: 'Ground-mounted utility arrays, commercial rooftop frameworks, and rural solar microgrids engineered for 25+ year outdoor lifespans.',
      icon: <Sun className="w-5 h-5 text-[#0049CA]" />,
    },
    {
      id: 'structural-applications',
      title: 'Structural Applications',
      desc: 'High-capacity cold-formed purlins, rafters, and framing members for industrial sheds, warehouses, and solar canopies.',
      icon: <Building className="w-5 h-5 text-[#0049CA]" />,
    },
    {
      id: 'mounting-systems',
      title: 'Solar Mounting Systems',
      desc: 'Modular fixed-tilt systems, ballasted non-penetrating rooftop racks, and strut-based adaptable solar arrays.',
      icon: <Layers className="w-5 h-5 text-[#0049CA]" />,
    },
    {
      id: 'custom-fabrication',
      title: 'Custom Fabrication',
      desc: 'Tailored base plates, structural gussets, splice joiners, angle brackets, and heavy-gauge stamped steel mounting components.',
      icon: <Wrench className="w-5 h-5 text-[#0049CA]" />,
    },
    {
      id: 'electrical-systems',
      title: 'Electrical Solar Systems',
      desc: 'Solar hybrid inverters, ACDB and DCDB electrical enclosures delivering complete protection and efficient grid interconnection.',
      icon: <Zap className="w-5 h-5 text-[#0049CA]" />,
    },
  ];

  const filteredItems = activeFilter === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.domain === activeFilter);

  return (
    <div className="w-full pt-28 pb-24 bg-[#FFFFFF] text-[#0F2130]">
      {/* ── Page Header ─────────────────────────────────────────── */}
      <section className="max-w-[1320px] mx-auto px-6 md:px-10 mb-20">
        <div className="flex flex-col gap-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0049CA]/10 text-[#0049CA] text-[12px] font-semibold tracking-[0.04em] uppercase w-fit">
            <span>Portfolio &amp; Deployments</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#0F2130] leading-[1.1]">
            Projects &amp; Application Domains
          </h1>
          <p className="text-base sm:text-lg text-[#647488] leading-relaxed">
            Central Structure Fabrication supports solar developers, EPC contractors, and industrial infrastructure projects across India. Explore our core application domains and verified manufacturing deployments.
          </p>
        </div>

        {/* ── 5 Application Domains Overview ────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-12">
          {applicationDomains.map((domain) => (
            <div
              key={domain.id}
              onClick={() => setActiveFilter(domain.id)}
              className={`p-5 border cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                activeFilter === domain.id
                  ? 'border-[#0049CA] bg-[#0049CA]/5 shadow-xs'
                  : 'border-[#E5E7EB] bg-[#F8FAFC] hover:border-[#0049CA]/50'
              }`}
            >
              <div>
                <div className="mb-3 p-2 bg-white border border-[#E5E7EB] w-fit">
                  {domain.icon}
                </div>
                <h3 className="text-sm font-bold text-[#0F2130] mb-2">{domain.title}</h3>
                <p className="text-xs text-[#647488] leading-relaxed">{domain.desc}</p>
              </div>
              <span className="text-[11px] font-semibold text-[#0049CA] mt-4 flex items-center gap-1">
                <span>View items</span>
                <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Visual Gallery with Filters ───────────────────────────── */}
      <section className="max-w-[1320px] mx-auto px-6 md:px-10 mb-24">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-[#E5E7EB] pb-6">
          <div>
            <span className="text-xs font-bold text-[#0049CA] uppercase tracking-wider">Deployment Showcase</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F2130] mt-1">
              Verified Industrial Gallery
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 text-xs font-semibold cursor-pointer transition-colors ${
                activeFilter === 'all'
                  ? 'bg-[#0049CA] text-white'
                  : 'bg-[#F8FAFC] text-[#647488] hover:text-[#0F2130] border border-[#E5E7EB]'
              }`}
            >
              All Projects ({GALLERY_ITEMS.length})
            </button>
            {applicationDomains.map((d) => (
              <button
                key={d.id}
                onClick={() => setActiveFilter(d.id)}
                className={`px-3 py-2 text-xs font-semibold cursor-pointer transition-colors ${
                  activeFilter === d.id
                    ? 'bg-[#0049CA] text-white'
                    : 'bg-[#F8FAFC] text-[#647488] hover:text-[#0F2130] border border-[#E5E7EB]'
                }`}
              >
                {d.title}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="border border-[#E5E7EB] bg-white group hover:border-[#0049CA] transition-all duration-200 flex flex-col justify-between"
            >
              <div className="relative aspect-16/10 overflow-hidden bg-[#0F2130]/5 cursor-pointer" onClick={() => setSelectedImage(item)}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-[#0F2130]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                  <span className="p-3 bg-white text-[#0F2130] rounded-none shadow-sm flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                    <Maximize2 className="w-4 h-4 text-[#0049CA]" />
                    <span>Enlarge</span>
                  </span>
                </div>
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 bg-[#0F2130]/90 text-white text-[10px] font-semibold uppercase tracking-wider">
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
                  <button
                    onClick={() => onEnquireClick?.(`Project RFQ: ${item.title}`)}
                    className="text-xs font-bold text-[#0049CA] hover:text-[#003CAD] inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Enquire</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Image Lightbox Modal ──────────────────────────────────── */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-[#0F2130]/90 backdrop-blur-xs flex items-center justify-center p-4 sm:p-8"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="bg-white max-w-4xl w-full border border-white/20 p-6 relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 bg-[#F8FAFC] hover:bg-[#E5E7EB] text-[#0F2130] cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-16/10 max-h-[60vh] overflow-hidden mb-6 bg-black">
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

              <button
                onClick={() => {
                  const title = selectedImage.title;
                  setSelectedImage(null);
                  onEnquireClick?.(`Inquiry for: ${title}`);
                }}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#0049CA] hover:bg-[#003CAD] text-white text-xs font-bold uppercase tracking-wider shrink-0 cursor-pointer"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Request Similar Spec</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Section CTA ───────────────────────────────────────────── */}
      <section className="max-w-[1320px] mx-auto px-6 md:px-10">
        <div className="border border-[#0F2130] bg-[#0F2130] text-white p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold mb-2">Have a Project with Specific Structural or Electrical Specs?</h3>
            <p className="text-sm text-[#E5E7EB]/80 max-w-xl">
              Our engineering and fabrication teams in Amroha can review your bill of materials (BOM), load specifications, or single line diagram (SLD).
            </p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0049CA] hover:bg-[#003CAD] text-white text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors"
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
