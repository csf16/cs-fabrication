import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Factory,
  Layers,
  ShieldCheck,
  Wrench,
  Zap,
  HardHat,
  Compass,
  Maximize2,
  X,
  PhoneCall,
  ExternalLink,
} from 'lucide-react';
import { TechnicalImagePlaceholder } from '../components/TechnicalImagePlaceholder';

interface CapabilitiesPageProps {
  onEnquireClick?: (service?: string) => void;
}

export const CapabilitiesPage: React.FC<CapabilitiesPageProps> = ({ onEnquireClick }) => {
  const navigate = useNavigate();
  useSEO({
    title: 'Industrial Capabilities & Engineering Process | Central Structure Fabrication (CSF)',
    description:
      'Explore the 8 core industrial capabilities and 5-step engineering process of Central Structure Fabrication (CSF). Solar structure manufacturing, roll-forming, ACDB/DCDB production, on-site installation and testing in Amroha, UP.',
    keywords:
      'solar structure capabilities, C channel manufacturing UP, ACDB DCDB production, strut channel cold roll forming, solar installation Amroha, solar commissioning India, CSF capabilities',
    canonical: 'https://www.csfabrication.in/capabilities',
    ogTitle: 'Capabilities & 5-Step Process — Central Structure Fabrication (CSF)',
    ogDescription:
      'From requirement analysis and CNC roll-forming to on-site structural completion and commissioning — CSF delivers reliable solar infrastructure.',
  });

  const [activeStep, setActiveStep] = useState(0);

  // 8 Visual Capabilities with rich technical specifications for in-page modal inspection
  const capabilities = [
    {
      id: '01',
      num: '01',
      tag: 'SOLAR STRUCTURES',
      title: 'Solar Structure Fabrication',
      desc: 'Heavy-gauge cold roll-forming and precision fabrication for solar mounting systems. Engineered for high wind load resistance, customized tilt profiles, and seamless on-site bolt assembly.',
      image: '/projects/csf_project_01.jpg',
      cardImage: '/gallery/solar_structure_framework.png',
      icon: <Factory className="w-4 h-4 text-[#0057D9]" />,
      category: 'HEAVY FABRICATION',
      badge: 'IS 2062 GRADE STEEL',
      specsLine: '180 km/h Wind Tolerance • 80 Micron Hot-Dip Galvanizing',
      application: 'Ground Mounted Utility, Commercial Rooftops & Solar Sheds',
      specs: [
        { label: 'Steel Grade', value: 'IS 2062 E250 / E350' },
        { label: 'Corrosion Protection', value: 'Hot-Dip Galvanized 80–85µ' },
        { label: 'Wind Tolerance', value: 'Up to 180 km/h (IS 875)' },
        { label: 'Manufacturing', value: 'CNC Slotted & Pierced' },
      ],
      deliverables: [
        'Complete columns, rafters, purlins, and bracings manufactured to project BOM',
        'Customized tilt angles (10° to 30°) matching localized latitude and sun vector',
        'Zero on-site welding or cutting needed; pre-punched for fast bolt alignment',
        'Certified compliance with Indian and international structural safety standards',
      ],
      productLink: '/products?tab=structural#showcase',
      productLinkLabel: 'Browse Solar Structure Catalog',
    },
    {
      id: '02',
      num: '02',
      tag: 'ROLL-FORMING',
      title: 'Cold Roll-Formed C-Channel (80 × 40 × 15 mm)',
      desc: 'Continuous cold roll-formed C-channels with precision slotting for primary rafter and purlin spans in commercial and utility solar mounting frameworks.',
      image: '/gallery/c_channel_80x40x15.png',
      cardImage: '/gallery/c_channel_80x40x15.png',
      icon: <Layers className="w-4 h-4 text-[#0057D9]" />,
      category: 'ROLL-FORMING',
      badge: 'CONTINUOUS PROFILE',
      specsLine: '80mm Web × 40mm Flange × 15mm Lip • 1.6mm - 3.2mm Thickness',
      application: 'Primary Solar Rafters, Heavy Purlins & Industrial Framing',
      specs: [
        { label: 'Standard Sizes', value: '80×40×15 / 60×40×15' },
        { label: 'Thickness Range', value: '1.6mm to 3.0mm' },
        { label: 'Slot Geometry', value: 'Oval 12×25 / 14×30 mm' },
        { label: 'Tensile Yield', value: '≥ 250 to 350 MPa' },
      ],
      deliverables: [
        'Continuous cold roll-forming lines delivering exact custom lengths up to 12 meters',
        'Precision CNC punched slots for effortless module clamp and splice connection',
        'Hot-dip galvanized coating ensuring 25+ years rust resistance in aggressive zones',
        'Straightness and camber within strict ±1mm per meter industrial tolerance',
      ],
      productLink: '/products?tab=structural#c-channel-80-40-15',
      productLinkLabel: 'View C-Channel Specifications',
    },
    {
      id: '03',
      num: '03',
      tag: 'MODULAR FRAMING',
      title: 'Heavy-Duty 41 × 41 Slotted Strut Channel',
      desc: '41×41 modular slotted channels with inward clamping return lips for fast hardware alignment, cable containment, and high torsional rigidity.',
      image: '/gallery/strut_channel_41x41.png',
      cardImage: '/gallery/strut_channel_41x41.png',
      icon: <Compass className="w-4 h-4 text-[#0057D9]" />,
      category: 'MODULAR FRAMING',
      badge: 'MODULAR FRAMING',
      specsLine: '41mm × 41mm Profile • Inward Return Lips • CNC Slotted',
      application: 'Modular Solar Array Framework, Cable Trays & Mounting Struts',
      specs: [
        { label: 'Profile Dimensions', value: '41×41 mm / 41×21 mm' },
        { label: 'Gauge / Thickness', value: '2.0mm to 2.5mm' },
        { label: 'Return Lips', value: 'Serrated Inward Hook' },
        { label: 'Surface Finish', value: 'Pre-Galv / HDG IS 4759' },
      ],
      deliverables: [
        'Continuous inward gripping return lips for rapid spring nut and clamp locking',
        'Uniform slotted punch pattern for universal modular bracket mounting',
        'High moment of inertia resisting torsional and flexural twisting loads',
        'Ideal for rooftop solar, MEP racking, and cable tray containment spans',
      ],
      productLink: '/products?tab=structural#strut-channel-41-41',
      productLinkLabel: 'View Strut Channel Details',
    },
    {
      id: '04',
      num: '04',
      tag: 'ELECTRICAL ENCLOSURES',
      title: 'ACDB & DCDB Manufacturing',
      desc: 'Factory-assembled IP65 distribution and combiner enclosures with high-interrupt surge protection, calibrated DC switchgear, and UV-resistant housing.',
      image: '/electrical/acdb_box.png',
      cardImage: '/electrical/acdb_box.png',
      icon: <Zap className="w-4 h-4 text-[#0057D9]" />,
      category: 'ELECTRICAL ENCLOSURES',
      badge: 'IP65 WEATHERPROOF',
      specsLine: 'Type-II AC SPD • High-Interrupt MCCB • Copper Busbars',
      application: 'Solar Inverter AC Output Protection & Grid Interconnection',
      specs: [
        { label: 'Enclosure Rating', value: 'IP65 Polycarbonate / Metal' },
        { label: 'Surge Protection', value: 'Type II AC / DC SPDs' },
        { label: 'Operating Voltage', value: 'Up to 1000V DC / 415V AC' },
        { label: 'Switchgear', value: 'Tier-1 MCB / MCCB / Fuse' },
      ],
      deliverables: [
        'Fully factory-wired, numbered, and continuity-tested before dispatch',
        'Transparent UV-stabilized covers for instant inspection without breaking seal',
        'Dual protection: over-voltage surge suppression and string isolation disconnects',
        'Custom 1-in-1-out to 6-in-6-out combiner designs for utility and commercial systems',
      ],
      productLink: '/products?tab=electrical#acdb',
      productLinkLabel: 'View Electrical Enclosures',
    },
    {
      id: '05',
      num: '05',
      tag: 'PRECISION HARDWARE',
      title: 'Solar Hardware & Clamping Systems',
      desc: 'Anodized aluminium mid/end clamps, U-clamps, and high-tensile hot-dip galvanized fasteners engineered for secure module retention.',
      image: '/hardware/u_clamp.png',
      cardImage: '/hardware/u_clamp.png',
      icon: <Wrench className="w-4 h-4 text-[#0057D9]" />,
      category: 'PRECISION HARDWARE',
      badge: 'HOT-DIP GALVANIZED',
      specsLine: 'Universal Module Fit • Heavy-Duty Steel Retention',
      application: 'Intermediate PV Module Retention & Support Framework Locking',
      specs: [
        { label: 'Material', value: 'Aluminium 6063-T6 / SS 304' },
        { label: 'Surface Finish', value: '15µ Natural Anodized' },
        { label: 'Module Compatibility', value: '30mm, 35mm, 40mm framed' },
        { label: 'Fasteners', value: 'SS 304 A2-70 Allen Bolts' },
      ],
      deliverables: [
        'High-shear clamping jaws with serrated ribs preventing module slippage under wind loads',
        'Factory assembled with spring washers and pre-threaded nuts for single-hand installation',
        'Universal solar rail and strut channel compatibility across all major brands',
        'Tested to withstand extreme thermal expansion cycles and coastal humidity',
      ],
      productLink: '/products?tab=components#mid-clamp',
      productLinkLabel: 'View Hardware & Clamping Systems',
    },
    {
      id: '06',
      num: '06',
      tag: 'FIELD EXECUTION',
      title: 'On-Site Installation Support',
      desc: 'Technical erection guidance and on-site alignment supervision ensuring structural squareness, leveling, and calibrated torque tightness.',
      image: '/gallery/solar_engineer_field.jpg',
      cardImage: '/gallery/solar_engineer_field.jpg',
      icon: <HardHat className="w-4 h-4 text-[#0057D9]" />,
      category: 'FIELD EXECUTION',
      badge: 'ON-SITE SUPERVISION',
      specsLine: 'MNRE Standards • Torque & Pull-Out Testing • Grid Sync',
      application: 'Utility Solar Parks, Commercial Rooftops & Industrial Captive Plants',
      specs: [
        { label: 'Coverage', value: 'Pan-India Project Support' },
        { label: 'Scope', value: 'Rooftop, Ground-Mount, Canopy' },
        { label: 'Quality Verification', value: 'Laser Level & Torque Audit' },
        { label: 'Deliverable', value: 'Site Alignment Sign-Off' },
      ],
      deliverables: [
        'Direct technical supervision by experienced CSF structural engineers on site',
        'Systematic base-plate anchor pull testing and foundation alignment verification',
        'Guidance on piece-marked assembly reducing site labor and installation time by up to 30%',
        'Strict adherence to site safety protocols, torque limits, and wind bracing plans',
      ],
      productLink: undefined,
      productLinkLabel: undefined,
    },
    {
      id: '07',
      num: '07',
      tag: 'QUALITY AUDIT',
      title: 'Structural Quality Verification',
      desc: 'Comprehensive dimensional audits, zinc coating thickness verification, and mechanical sign-off prior to PV module placement.',
      image: '/projects/csf_project_07.jpg',
      cardImage: '/projects/csf_project_07.jpg',
      icon: <ShieldCheck className="w-4 h-4 text-[#0057D9]" />,
      category: 'QUALITY AUDIT',
      badge: 'QA / QC CERTIFIED',
      specsLine: 'IS 2062 & IS 4759 Standards • Elcometer 85µ • 100% Calibrated Torque',
      application: 'Engineering QA/QC Audit & Bankable Structural Completion Sign-Off',
      specs: [
        { label: 'Inspection Protocol', value: 'IS 2062 & IS 4759 Standards' },
        { label: 'Coating Check', value: 'Elcometer Magnetic Gauge (85µ)' },
        { label: 'Fastener Check', value: '100% Calibrated Torque Audit' },
        { label: 'Deliverable', value: 'Structural Completion Certificate' },
      ],
      deliverables: [
        'Comprehensive dimensional audit checking rail parallelism, purlin slope, and overhang',
        'Electromagnetic testing of hot-dip galvanizing coating thickness (minimum 80–85 microns)',
        'Deflection and load distribution confirmation under full operational design limits',
        'Formal engineering sign-off package ready for bankable lenders and EPC auditors',
      ],
      productLink: undefined,
      productLinkLabel: undefined,
    },
    {
      id: '08',
      num: '08',
      tag: 'GRID HANDOVER',
      title: 'Testing & Commissioning Coordination',
      desc: 'Electrical continuity, string polarity, insulation resistance testing, and seamless handover for smooth grid synchronization.',
      image: '/gallery/utility_solar_farm.jpg',
      cardImage: '/gallery/utility_solar_farm.jpg',
      icon: <CheckCircle2 className="w-4 h-4 text-[#0057D9]" />,
      category: 'GRID HANDOVER',
      badge: 'GRID SYNCHRONIZATION',
      specsLine: 'Megawatt Utility EPC • Reactive Power Balancing • PR Guaranteed',
      application: 'Megawatt-Scale Solar Farms & Heavy Industrial Power Consumers',
      specs: [
        { label: 'Testing Standard', value: 'IEC 62446 / CEA Standards' },
        { label: 'Insulation Testing', value: '1000V DC Megger Test' },
        { label: 'String Logging', value: 'Voc & Isc Polarities' },
        { label: 'Deliverable', value: 'As-Built Commissioning Dossier' },
      ],
      deliverables: [
        'Open-circuit voltage (Voc) and short-circuit current (Isc) logging across every string circuit',
        'High-voltage insulation resistance testing verifying zero ground faults on DC and AC sides',
        'ACDB/DCDB protection relay tripping verification and SPD health verification',
        'Final commissioning report facilitating utility DISCOM approvals and plant handover',
      ],
      productLink: undefined,
      productLinkLabel: undefined,
    },
  ];

  const [selectedCapability, setSelectedCapability] = useState<typeof capabilities[0] | null>(null);

  // Prevent background page from scrolling when modal is open
  useEffect(() => {
    if (selectedCapability) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setSelectedCapability(null);
        }
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [selectedCapability]);

  // 5-Step Execution Workflow
  const processSteps = [
    {
      step: '01',
      title: 'Requirement Analysis & Engineering',
      shortDesc: 'Engineering analysis & wind-load verification.',
      desc: 'Technical consultation and engineering review to evaluate structural requirements, site conditions, wind loads, and installation parameters.',
      deliverables: [
        'Site & wind-zone review (IS 875 Part 3)',
        'Load calculations: Dead, live & wind uplift',
        'Structural detailing & BOM generation',
        'Customized section sizing & profile selection',
      ],
      qualityGate: 'Structural engineering sign-off on section sizing and wind uplift tolerance.',
    },
    {
      step: '02',
      title: 'Structural & Electrical Fabrication',
      shortDesc: 'Automated roll-forming & enclosure assembly.',
      desc: 'High-throughput manufacturing in our Amroha plant across automated roll-forming lines, CNC punching tooling, and certified electrical wiring bays.',
      deliverables: [
        'Continuous roll-forming of C-Channels & 41×41 Struts',
        'Precision hole punching with zero-burr tooling',
        'Assembly & wiring of IP65 ACDB / DCDB panels',
        'Hot-dip galvanizing coating audit (IS 2629 / 4759)',
      ],
      qualityGate: 'Dimensional tolerance inspection (±0.5mm) and factory continuity test.',
    },
    {
      step: '03',
      title: 'On-Site Installation Support',
      shortDesc: 'Field erection & alignment supervision.',
      desc: 'Piece-marked structural bundle dispatch to project sites followed by expert technical guidance ensuring plumb, square, and level assembly.',
      deliverables: [
        'Organized bundle dispatch with piece-marked tags',
        'Base plate anchoring & column erection guidance',
        'Rafter squaring and purlin level verification',
        'Calibrated torque-wrench joint bolting audits',
      ],
      qualityGate: 'Plumb and tilt angle verification prior to module mounting.',
    },
    {
      step: '04',
      title: 'Structural Completion',
      shortDesc: 'Mechanical stability & torque audit sign-off.',
      desc: 'Rigid mechanical and structural verification ensuring every rafter, purlin, and fastener connection conforms rigidly to approved engineering drawings.',
      deliverables: [
        '100% structural fastener tightness audit',
        'Zinc coating thickness verification (ASTM / IS 4759)',
        'Deflection checking under full module load',
        'Formal structural handover checklist',
      ],
      qualityGate: 'Zero-deflection confirmation and mechanical stability sign-off.',
    },
    {
      step: '05',
      title: 'Testing & Commissioning',
      shortDesc: 'Electrical testing & formal grid synchronization.',
      desc: 'Pre-power-on verification of all electrical subsystems, switchgear isolation, array polarity, and grid synchronization readiness.',
      deliverables: [
        'String Voc & Isc logging across all array circuits',
        'Earth continuity & insulation resistance testing (megger)',
        'ACDB / DCDB breaker operation & SPD health check',
        'Commissioning dossier and as-built handover',
      ],
      qualityGate: 'Pre-power-on safety clearance and complete documentation package.',
    },
  ];

  // 5 Engineered Product Categories
  const productLines = [
    {
      name: 'Solar Structures',
      image: '/gallery/solar_structure_framework.png',
      label: 'CAP-01',
      link: '/products?tab=structural#showcase',
    },
    {
      name: 'C-Channels',
      image: '/gallery/c_channel_80x40x15.png',
      label: 'CAP-02',
      link: '/products?tab=structural#c-channel-80-40-15',
    },
    {
      name: 'Strut Channels',
      image: '/gallery/strut_channel_41x41.png',
      label: 'CAP-03',
      link: '/products?tab=structural#strut-channel-41-41',
    },
    {
      name: 'ACDB / DCDB Enclosures',
      image: '/electrical/acdb_box.png',
      label: 'CAP-04',
      link: '/products?tab=electrical#acdb',
    },
    {
      name: 'Solar Hardware',
      image: '/hardware/u_clamp.png',
      label: 'CAP-05',
      link: '/products?tab=components#mid-clamp',
    },
  ];

  return (
    <div className="w-full bg-[#FFFFFF] text-[#10202E] font-sans selection:bg-[#0057D9] selection:text-white">

      {/* ── 05. HERO SECTION (Full Background Image with Dark Industrial Gradients & High-Contrast Typography) ── */}
      <section className="relative min-h-[85vh] lg:min-h-[88vh] flex flex-col justify-center overflow-hidden bg-[#07131F] text-white border-b border-[#1E3347]">
        {/* Full-bleed Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/csf-hero-factory.png"
            alt="Central Structure Fabrication Facility"
            className="w-full h-full object-cover object-center transform scale-105 filter brightness-[0.70] contrast-[1.15]"
            loading="eager"
          />

          {/* Precision Industrial Gradient Overlay Masks for WCAG AAA text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#07131F]/95 via-[#07131F]/85 to-[#07131F]/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07131F] via-transparent to-[#07131F]/80" />

          {/* Technical Blueprint Grid Watermark */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#0057D9_1px,transparent_1px)] [background-size:24px_24px]"
            aria-hidden="true"
          />

          {/* Subtle Corner Architectural CAD Framing */}
          <div className="absolute top-8 left-8 w-8 h-8 border-t-2 border-l-2 border-[#1677FF]/40 pointer-events-none hidden sm:block" />
          <div className="absolute top-8 right-8 w-8 h-8 border-t-2 border-r-2 border-[#1677FF]/40 pointer-events-none hidden sm:block" />
          <div className="absolute bottom-8 left-8 w-8 h-8 border-b-2 border-l-2 border-[#1677FF]/40 pointer-events-none hidden sm:block" />
          <div className="absolute bottom-8 right-8 w-8 h-8 border-b-2 border-r-2 border-[#1677FF]/40 pointer-events-none hidden sm:block" />
        </div>

        {/* Foreground Content Layer (Overlaid directly on full background) */}
        <div className="relative z-10 w-full max-w-[1720px] mx-auto px-6 sm:px-10 md:px-16 lg:px-24 pt-36 sm:pt-40 lg:pt-44 pb-16 sm:pb-20">
          <div className="max-w-5xl">
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2.5 mb-6">
              <span className="w-2 h-2 bg-[#1677FF] animate-pulse" />
              <span className="text-[11px] sm:text-[12px] font-mono font-bold tracking-[0.16em] text-[#60A5FA] uppercase">
                MANUFACTURING &amp; EXECUTION
              </span>
              <span className="text-white/30 font-mono text-[11px] hidden sm:inline">|</span>
              <span className="text-[11px] font-mono tracking-wider text-white/70 hidden sm:inline">AMROHA FACILITY // ROLL-FORMING LINE</span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-6xl lg:text-[76px] xl:text-[84px] font-extrabold text-white tracking-tight leading-[1.0] mb-6 drop-shadow-md">
              Industrial Capabilities <br />
              <span className="text-white/65 font-normal">&amp; Engineering Process</span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg lg:text-[20px] text-[#CBD5E1] leading-relaxed max-w-2xl mb-10 font-normal">
              Engineering-led manufacturing and execution for solar structures, roll-formed steel sections, electrical enclosures and on-site infrastructure.
            </p>

            {/* CTA Actions */}
            <div className="flex flex-wrap items-center gap-4 mb-14">
              <a
                href="#capabilities"
                className="px-8 py-4 rounded-full bg-[#0057D9] hover:bg-[#0049CA] text-white text-[13px] font-bold uppercase tracking-[0.1em] transition-all duration-200 shadow-lg hover:shadow-blue-500/25 cursor-pointer flex items-center gap-3 group"
              >
                <span>Explore Capabilities</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>

              <Link
                to="/contact"
                className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/25 hover:border-[#1677FF] backdrop-blur-md text-[13px] font-bold uppercase tracking-[0.1em] transition-all duration-200 cursor-pointer flex items-center gap-3"
              >
                <span>Request Engineering RFQ</span>
                <ArrowUpRight className="w-4 h-4 text-[#60A5FA]" />
              </Link>
            </div>

            {/* Overlaid Technical Telemetry Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-white/15 text-white">
              <div>
                <span className="block text-[10px] font-mono text-[#94A3B8] uppercase tracking-[0.14em] mb-1">LOCATION</span>
                <span className="font-mono font-bold text-white text-xs sm:text-sm tracking-wide">AMROHA, UP — MANUFACTURING</span>
              </div>
              <div>
                <span className="block text-[10px] font-mono text-[#94A3B8] uppercase tracking-[0.14em] mb-1">STANDARD</span>
                <span className="font-mono font-bold text-[#60A5FA] text-xs sm:text-sm tracking-wide">IS 2062 CERTIFIED</span>
              </div>
              <div>
                <span className="block text-[10px] font-mono text-[#94A3B8] uppercase tracking-[0.14em] mb-1">FACILITY LINE</span>
                <span className="font-mono font-bold text-white text-xs sm:text-sm tracking-wide">CONTINUOUS ROLL-FORMING</span>
              </div>
              <div>
                <span className="block text-[10px] font-mono text-[#94A3B8] uppercase tracking-[0.14em] mb-1">DISPATCH</span>
                <span className="font-mono font-bold text-[#34D399] text-xs sm:text-sm tracking-wide">PAN-INDIA FREIGHT</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 06. KEY METRICS STRIP (Horizontal Anchor Strip) ───────── */}
      <section className="bg-[#0B1B2A] text-white py-10 border-b border-[#1E3347]">
        <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-10 md:px-16 lg:px-24">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 divide-y sm:divide-y-0 sm:divide-x divide-[#1E3347]/80">

            <div className="flex flex-col pt-4 sm:pt-0 sm:pl-0">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-mono">
                08
              </span>
              <span className="text-[11px] font-mono tracking-[0.14em] uppercase text-[#7A8793] mt-1 font-semibold">
                CORE CAPABILITIES
              </span>
            </div>

            <div className="flex flex-col pt-4 sm:pt-0 sm:pl-8 lg:pl-12">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1677FF] tracking-tight font-mono">
                05
              </span>
              <span className="text-[11px] font-mono tracking-[0.14em] uppercase text-[#7A8793] mt-1 font-semibold">
                EXECUTION STEPS
              </span>
            </div>

            <div className="flex flex-col pt-4 sm:pt-0 sm:pl-8 lg:pl-12">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-mono">
                AMROHA, UP
              </span>
              <span className="text-[11px] font-mono tracking-[0.14em] uppercase text-[#7A8793] mt-1 font-semibold">
                MANUFACTURING HUB
              </span>
            </div>

            <div className="flex flex-col pt-4 sm:pt-0 sm:pl-8 lg:pl-12">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-mono">
                IS 2062
              </span>
              <span className="text-[11px] font-mono tracking-[0.14em] uppercase text-[#7A8793] mt-1 font-semibold">
                STEEL STANDARD
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* ── 07 & 08. CAPABILITIES SECTION (8 Visual Cards with Popup Detail) ── */}
      <section id="capabilities" className="py-20 lg:py-28 bg-[#FAF9F6] border-t border-[#EAE6DF] scroll-mt-24">
        <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-10 md:px-16 lg:px-24">

          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-[#EAE6DF] pb-8">
            <div>
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 bg-[#0049CA]" />
                <span className="text-[11px] font-mono font-bold tracking-[0.14em] text-[#0049CA] uppercase">
                  CORE CAPABILITIES
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-[#0F2130] tracking-tight leading-[1.05]">
                End-to-End <br />
                <span className="text-[#8E8A85] font-light">Industrial Scope</span>
              </h2>
            </div>
            <p className="text-base sm:text-lg text-[#647488] max-w-md leading-relaxed font-normal">
              Click any capability below to inspect full specifications, engineering tolerances, deliverables, and production standards.
            </p>
          </div>

          {/* 8-Card Visual Grid: Exact Match with Product Cards Design */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {capabilities.map((cap) => (
              <div
                key={cap.id}
                onClick={() => setSelectedCapability(cap)}
                className="bg-white rounded-[28px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between border border-[#EAE6DF] group cursor-pointer"
              >
                <div>
                  {/* Image Bay (Matching Image 2 warm beige canvas and aspect-square layout) */}
                  <div className="aspect-square w-full overflow-hidden bg-[#F5F2EB] relative flex items-center justify-center">
                    <img
                      src={cap.cardImage || cap.image}
                      alt={cap.title}
                      className={`w-full h-full transition-transform duration-500 group-hover:scale-105 ${
                        (cap.cardImage || cap.image).endsWith('.png') ||
                        (cap.cardImage || cap.image).includes('clamp') ||
                        (cap.cardImage || cap.image).includes('channel') ||
                        (cap.cardImage || cap.image).includes('acdb')
                          ? 'object-contain p-6'
                          : 'object-cover'
                      }`}
                      loading="lazy"
                    />

                    {/* Floating Badge on Top-Left (Exact Image 2 design) */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-block px-2.5 py-1 bg-white/95 border border-[#EAE6DF] text-[#0049CA] text-[10px] font-mono font-bold uppercase tracking-wider shadow-xs">
                        {cap.badge}
                      </span>
                    </div>

                    {/* Number Tag on Top-Right */}
                    <div className="absolute top-4 right-4">
                      <span className="inline-block px-2.5 py-1 bg-[#0F2130]/80 backdrop-blur-xs text-white rounded text-[10px] font-mono font-bold">
                        {cap.num}
                      </span>
                    </div>
                  </div>

                  {/* Card Body (Exact Image 2 Typography & Hierarchy) */}
                  <div className="p-7">
                    <p className="text-[11px] font-mono text-[#0049CA] font-semibold mb-2 line-clamp-1">
                      {cap.specsLine}
                    </p>
                    <h3 className="text-xl font-bold text-[#0F2130] mb-3 leading-snug group-hover:text-[#0049CA] transition-colors">
                      {cap.title}
                    </h3>
                    <p className="text-xs text-[#647488] leading-relaxed mb-4 line-clamp-3">
                      {cap.desc}
                    </p>

                    <div className="pt-3 border-t border-[#EAE6DF] flex flex-col gap-1 text-xs">
                      <span className="text-[10px] text-[#8E8A85] uppercase font-bold tracking-wider">
                        Application
                      </span>
                      <span className="text-[#0F2130] font-medium leading-snug line-clamp-2">
                        {cap.application}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Footer: Interactive Trigger */}
                <div className="px-7 pb-6 pt-3 border-t border-[#EAE6DF] flex items-center justify-between text-xs font-bold text-[#0049CA] group-hover:bg-[#FAF9F6] transition-colors">
                  <span className="uppercase tracking-[0.06em] text-[11px]">View Capability Details</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 09. FEATURED CAPABILITY SECTION (Real Solar Installation Framework) ─── */}
      <section className="py-20 lg:py-28 bg-[#0B1B2A] text-white border-t border-b border-[#1E3347]">
        <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-10 md:px-16 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left 50%: Large Solar Structure Photo (Clickable to open popup) */}
            <div className="lg:col-span-6 relative">
              <div
                onClick={() => setSelectedCapability(capabilities[0])}
                className="border border-[#1E3347] rounded-2xl shadow-2xl relative overflow-hidden group cursor-pointer"
              >
                <TechnicalImagePlaceholder
                  src="/projects/csf_project_01.jpg"
                  alt="CSF Rooftop Solar Structure Mounting System"
                  label="SOLAR STRUCTURE // REAL DEPLOYMENT"
                  category="HEAVY ROLL-FORMED FRAMEWORK"
                  caption="WIND TOLERANCE: 180 KM/H"
                  aspectRatio="aspect-[4/3]"
                />

                {/* Engineering Callout Tag */}
                <div className="absolute top-4 right-4 bg-[#0B1B2A]/90 border border-[#0057D9]/40 px-3 py-1 rounded-full text-[11px] font-mono text-white flex items-center gap-2 backdrop-blur-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1677FF] animate-pulse" />
                  <span>HOT-DIP GALVANIZED</span>
                </div>

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-[#07131F]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                  <span className="px-4 py-2 bg-white text-[#0B1B2A] rounded-full shadow-lg flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                    <Maximize2 className="w-4 h-4 text-[#0057D9]" />
                    <span>View Capability Specifications</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Right 50%: Technical Copy & 3 Compact Specs */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-2 h-2 bg-[#1677FF] rounded-full" />
                <span className="text-[11px] font-mono font-bold tracking-[0.14em] text-[#1677FF] uppercase">
                  FEATURED CAPABILITY
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-white tracking-tight leading-[1.05] mb-4">
                Solar Structure Fabrication
              </h2>

              <p className="text-base text-[#CBD5E1] leading-relaxed mb-8 max-w-xl">
                Engineering-grade structural sections roll-formed specifically for rooftop and ground-mounted solar infrastructure. Manufactured in Amroha, UP from high-tensile IS 2062 steel with hot-dip galvanizing up to 85µ.
              </p>

              {/* 3 Compact Technical Specifications */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="p-4 bg-[#10283B] border border-[#1E3347] rounded-xl">
                  <span className="text-[10px] font-mono text-[#7A8793] uppercase tracking-[0.12em] block mb-1">
                    PROFILE
                  </span>
                  <span className="text-sm font-bold text-white">
                    Custom / Standard
                  </span>
                </div>

                <div className="p-4 bg-[#10283B] border border-[#1E3347] rounded-xl">
                  <span className="text-[10px] font-mono text-[#7A8793] uppercase tracking-[0.12em] block mb-1">
                    STEEL
                  </span>
                  <span className="text-sm font-bold text-[#1677FF]">
                    IS 2062 E250/E350
                  </span>
                </div>

                <div className="p-4 bg-[#10283B] border border-[#1E3347] rounded-xl">
                  <span className="text-[10px] font-mono text-[#7A8793] uppercase tracking-[0.12em] block mb-1">
                    APPLICATION
                  </span>
                  <span className="text-sm font-bold text-white">
                    Solar Mounting
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedCapability(capabilities[0])}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#0057D9] hover:bg-[#1677FF] text-white text-xs font-bold uppercase tracking-[0.08em] transition-colors shadow-sm cursor-pointer"
                >
                  <span>Inspect Capability Specs</span>
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
                <Link
                  to="/contact?service=Solar%20Structure%20Fabrication"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold uppercase tracking-[0.08em] transition-colors cursor-pointer"
                >
                  <span>Request RFQ</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 10 & 11. ENGINEERING WORKFLOW & INTERACTIVE DETAIL PANEL (Anchor id="process") ─ */}
      <section id="process" className="py-20 lg:py-28 bg-[#10283B] text-white">
        <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-10 md:px-16 lg:px-24">

          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-[#1E3347] pb-8">
            <div>
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 bg-[#1677FF] rounded-full" />
                <span className="text-[11px] font-mono font-bold tracking-[0.14em] text-[#1677FF] uppercase">
                  METHODOLOGY
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-white tracking-tight leading-[1.05]">
                The 5-Step <br />
                <span className="text-[#7A8793] font-normal">Execution Workflow</span>
              </h2>
            </div>
            <p className="text-sm sm:text-base text-[#7A8793] max-w-md leading-relaxed">
              From engineering analysis through testing and commissioning, every stage follows a controlled execution process.
            </p>
          </div>

          {/* Horizontal Timeline Tabs (Uniform rounded-xl corners) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-10">
            {processSteps.map((step, idx) => (
              <button
                key={step.step}
                onClick={() => setActiveStep(idx)}
                className={`text-left p-5 border rounded-xl transition-all duration-200 cursor-pointer relative overflow-hidden ${activeStep === idx
                    ? 'border-[#1677FF] bg-[#0057D9]/20 text-white'
                    : 'border-[#1E3347] bg-[#0B1B2A]/70 text-[#7A8793] hover:border-white/30 hover:text-white'
                  }`}
              >
                {/* Active Indicator Strip */}
                {activeStep === idx && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#1677FF]" />
                )}

                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xl font-mono font-extrabold ${activeStep === idx ? 'text-[#1677FF]' : 'text-[#7A8793]'}`}>
                    {step.step}
                  </span>
                  <div className={`w-2 h-2 rounded-full ${activeStep === idx ? 'bg-[#1677FF]' : 'bg-[#1E3347]'}`} />
                </div>

                <h4 className="text-sm font-bold text-white leading-snug mb-1">
                  {step.title}
                </h4>
                <p className="text-[11px] text-[#7A8793] leading-tight line-clamp-1">
                  {step.shortDesc}
                </p>
              </button>
            ))}
          </div>

          {/* Interactive Step Detail Panel (Uniform rounded-2xl corners) */}
          <div className="border border-[#1E3347] bg-[#0B1B2A] rounded-2xl p-8 sm:p-12 transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

              {/* Left Column: Scope & Deliverables */}
              <div className="lg:col-span-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl font-mono font-extrabold text-[#1677FF]">
                      STEP {processSteps[activeStep].step}
                    </span>
                    <span className="text-[10px] font-mono tracking-[0.14em] uppercase px-2.5 py-1 rounded-full bg-[#1677FF]/15 text-[#1677FF] border border-[#1677FF]/30">
                      CONTROLLED EXECUTION
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
                    {processSteps[activeStep].title}
                  </h3>

                  <p className="text-sm sm:text-base text-[#7A8793] leading-relaxed mb-6">
                    {processSteps[activeStep].desc}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {processSteps[activeStep].deliverables.map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/90">
                        <Check className="w-4 h-4 text-[#1677FF] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Quality Gate Card & Action */}
              <div className="lg:col-span-4 bg-[#10283B] border border-[#1E3347] rounded-xl p-6 flex flex-col justify-between h-full">
                <div>
                  <span className="text-[10px] font-mono text-[#7A8793] uppercase tracking-[0.14em] block mb-2 font-bold">
                    QUALITY GATE VERIFICATION
                  </span>
                  <p className="text-xs text-white/80 leading-relaxed mb-6">
                    {processSteps[activeStep].qualityGate}
                  </p>
                </div>

                <Link
                  to={`/contact?service=${encodeURIComponent(`Process Step ${processSteps[activeStep].step}: ${processSteps[activeStep].title}`)}`}
                  className="w-full py-3.5 px-4 rounded-full bg-[#0057D9] hover:bg-[#1677FF] text-white text-xs font-bold uppercase tracking-[0.08em] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>Discuss This Step</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ── 12. TECHNICAL DRAWING VISUAL SECTION (Engineering Precision) */}
      <section className="py-20 lg:py-28 bg-[#FFFFFF] border-b border-[#E2E8F0]">
        <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-10 md:px-16 lg:px-24">

          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 bg-[#0057D9] rounded-full" />
              <span className="text-[11px] font-mono font-bold tracking-[0.14em] text-[#0057D9] uppercase">
                ENGINEERING SPECIFICATION
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1B2A] tracking-tight">
              Built Around Engineering Precision
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-[#F5F7F9] border border-[#E2E8F0] rounded-2xl p-6 sm:p-10 lg:p-12">

            {/* Left Col: Technical Drawing Overlay with SVG Callouts */}
            <div className="lg:col-span-7 bg-[#0B1B2A] border border-[#1E3347] rounded-xl p-8 relative overflow-hidden text-white">
              {/* Technical Drawing Blueprint Grid */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#1677FF_1px,transparent_1px)] [background-size:16px_16px]" />

              <div className="relative z-10 flex flex-col items-center justify-center py-6">
                <div className="text-[10px] font-mono text-[#1677FF] tracking-[0.16em] uppercase mb-4 self-start">
                  41 × 41 MM // SLOTTED STRUT CHANNEL
                </div>

                {/* Clean CAD Vector Line Art Schematic */}
                <svg viewBox="0 0 280 200" className="w-64 sm:w-80 h-auto my-2">
                  {/* Dimension Marks */}
                  <line x1="40" y1="40" x2="40" y2="160" stroke="#1677FF" strokeWidth="1.2" strokeDasharray="3,3" />
                  <text x="24" y="105" fill="#1677FF" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">41 mm</text>

                  <line x1="50" y1="180" x2="190" y2="180" stroke="#1677FF" strokeWidth="1.2" strokeDasharray="3,3" />
                  <text x="120" y="195" fill="#1677FF" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">41 mm</text>

                  {/* 41x41 Strut Outline with Return Lips */}
                  <path
                    d="M 170 50 L 50 50 L 50 160 L 190 160 L 190 50 L 170 50 L 170 65 L 180 65 L 180 150 L 60 150 L 60 60 L 160 60 L 160 50 Z"
                    fill="#0057D9"
                    fillOpacity="0.15"
                    stroke="#1677FF"
                    strokeWidth="2.5"
                  />
                  <text x="115" y="105" fill="#7A8793" fontSize="9" fontFamily="monospace" textAnchor="middle">CNC Slotted Base</text>
                </svg>

                <div className="w-full flex items-center justify-between text-[11px] font-mono text-[#7A8793] border-t border-[#1E3347] pt-3 mt-4">
                  <span>SCALE: 1:1 PRECISION CAD</span>
                  <span className="text-[#1677FF] font-bold">100% IN-HOUSE ROLL-FORMED</span>
                </div>
              </div>
            </div>

            {/* Right Col: Technical Metadata Badges */}
            <div className="lg:col-span-5 flex flex-col gap-5">
              <div>
                <span className="text-xs font-mono font-bold text-[#0057D9] uppercase tracking-wider block mb-1">
                  DIMENSIONAL SPECIFICATIONS
                </span>
                <h3 className="text-2xl font-bold text-[#0B1B2A] tracking-tight">
                  High Torsional Rigidity Profile
                </h3>
                <p className="text-xs sm:text-sm text-[#52606D] leading-relaxed mt-2">
                  Continuous inward return lips lock standard spring channel nuts with high-slip resistance against dynamic environmental and wind loads.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="p-3.5 bg-white border border-[#E2E8F0] rounded-xl flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[#7A8793] uppercase tracking-wider">MATERIAL</span>
                  <span className="text-xs font-bold text-[#0B1B2A]">GALVANIZED STEEL</span>
                </div>
                <div className="p-3.5 bg-white border border-[#E2E8F0] rounded-xl flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[#7A8793] uppercase tracking-wider">PROFILE</span>
                  <span className="text-xs font-bold text-[#0057D9]">41 × 41 MM</span>
                </div>
                <div className="p-3.5 bg-white border border-[#E2E8F0] rounded-xl flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[#7A8793] uppercase tracking-wider">APPLICATION</span>
                  <span className="text-xs font-bold text-[#0B1B2A]">SOLAR STRUCTURAL SUPPORT</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 13. MANUFACTURING FACILITY (Amroha Plant) ──────────────── */}
      <section className="py-20 lg:py-28 bg-[#F5F7F9] border-b border-[#E2E8F0]">
        <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-10 md:px-16 lg:px-24">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left 50%: Image Container with uniform rounded-2xl */}
            <div className="lg:col-span-6 relative">
              <div className="border border-[#CBD5E1] rounded-2xl overflow-hidden shadow-lg">
                <TechnicalImagePlaceholder
                  src="/images/csf-hero-factory.png"
                  alt="Amroha Manufacturing Plant"
                  label="AMROHA, UTTAR PRADESH"
                  category="INDUSTRIAL HUB"
                  caption="HIGH-THROUGHPUT FACILITY"
                  aspectRatio="aspect-[4/3]"
                />
              </div>
            </div>

            {/* Right 50%: Compact Specification Cards */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 bg-[#0057D9] rounded-full" />
                <span className="text-[11px] font-mono font-bold tracking-[0.14em] text-[#0057D9] uppercase">
                  FACILITY &amp; COMPLIANCE
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#0B1B2A] tracking-tight leading-[1.05] mb-6">
                Amroha Manufacturing Plant
              </h2>

              <div className="space-y-3">
                <div className="p-4 bg-white border border-[#E2E8F0] rounded-xl flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#7A8793] uppercase tracking-wider">
                    STEEL GRADES
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-[#0B1B2A]">
                    IS 2062 / Equivalent
                  </span>
                </div>

                <div className="p-4 bg-white border border-[#E2E8F0] rounded-xl flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#7A8793] uppercase tracking-wider">
                    PROTECTION
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-[#0057D9]">
                    Hot-Dip Galvanized
                  </span>
                </div>

                <div className="p-4 bg-white border border-[#E2E8F0] rounded-xl flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#7A8793] uppercase tracking-wider">
                    CORROSION RESISTANCE
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-[#10202E]">
                    Project-specific coating specification (up to 85µ)
                  </span>
                </div>

                <div className="p-4 bg-white border border-[#E2E8F0] rounded-xl flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#7A8793] uppercase tracking-wider">
                    QUALITY SYSTEM
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-[#0B1B2A]">
                    Certified production process
                  </span>
                </div>

                <div className="p-4 bg-white border border-[#E2E8F0] rounded-xl flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#7A8793] uppercase tracking-wider">
                    REGISTRATION
                  </span>
                  <span className="text-xs sm:text-sm font-mono text-[#52606D]">
                    Relevant industrial certifications &amp; GST registered
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 14. ENGINEERING PRODUCT LINES (Clean Product Strip with rounded-xl) ── */}
      <section className="py-20 lg:py-24 bg-[#FFFFFF] border-b border-[#E2E8F0]">
        <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-10 md:px-16 lg:px-24">

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-[11px] font-mono font-bold tracking-[0.14em] text-[#0057D9] uppercase block mb-1">
                PORTFOLIO
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B1B2A] tracking-tight">
                Engineered Product Lines
              </h2>
            </div>
            <Link
              to="/products"
              className="text-xs font-bold text-[#0057D9] hover:text-[#0B1B2A] flex items-center gap-1.5 transition-colors uppercase tracking-[0.06em]"
            >
              <span>View Full Products Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {productLines.map((prod, i) => (
              <Link
                key={i}
                to={prod.link}
                className="group border border-[#E2E8F0] hover:border-[#0057D9] rounded-xl bg-white p-3.5 flex flex-col justify-between transition-all duration-200 cursor-pointer shadow-2xs hover:shadow-md overflow-hidden"
              >
                <div className="relative mb-3 overflow-hidden bg-[#0E1E2E] rounded-lg">
                  <TechnicalImagePlaceholder
                    src={prod.image}
                    alt={prod.name}
                    label={prod.label}
                    aspectRatio="aspect-square"
                  />
                </div>
                <div className="flex items-center justify-between pt-1 text-xs font-bold text-[#0B1B2A] group-hover:text-[#0057D9] transition-colors">
                  <span className="truncate pr-2">{prod.name}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* ── 15. ENGINEERING SUPPORT CTA (Compact Dark Navy Banner) ─── */}
      <section className="py-14 bg-[#0B1B2A] text-white border-b border-[#1E3347]">
        <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-10 md:px-16 lg:px-24">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-1">
                Need Custom Fabrication or Engineering Support?
              </h3>
              <p className="text-xs sm:text-sm text-[#7A8793] max-w-xl leading-relaxed">
                Share your structural, fabrication or BOQ requirements with our engineering team in Amroha.
              </p>
            </div>
            <Link
              to="/contact"
              className="px-7 py-3.5 rounded-full bg-[#0057D9] hover:bg-[#1677FF] text-white text-xs font-bold uppercase tracking-[0.08em] transition-colors shrink-0 flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <span>Request Engineering RFQ</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── IN-PAGE CAPABILITY LIGHTBOX / DETAIL MODAL ────────────── */}
      {selectedCapability && (
        <div
          className="fixed inset-0 z-50 bg-[#0B1B2A]/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-y-auto"
          onClick={() => setSelectedCapability(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-4xl w-full border border-white/20 shadow-2xl overflow-hidden relative my-auto animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedCapability(null)}
              className="absolute top-4 right-4 z-20 p-2.5 bg-[#0B1B2A]/80 hover:bg-[#0B1B2A] text-white rounded-full backdrop-blur-md cursor-pointer transition-colors shadow-lg"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Top Media Banner (Full-Width Edge-to-Edge) */}
            <div className="w-full h-64 sm:h-80 md:h-96 relative bg-[#07131F] overflow-hidden">
              <img
                src={selectedCapability.image}
                alt={selectedCapability.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B2A] via-[#0B1B2A]/40 to-transparent" />

              {/* Tag & ID Badges */}
              <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-white">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-[#0057D9] text-[10px] font-mono font-bold tracking-wider uppercase">
                    CAPABILITY {selectedCapability.num}
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-white/20 backdrop-blur-xs text-[10px] font-mono font-semibold tracking-wider uppercase">
                    {selectedCapability.badge}
                  </span>
                </div>
                <span className="text-xs font-mono text-white/70 hidden sm:inline">
                  CSF AMROHA PLANT
                </span>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 max-h-[calc(90vh-320px)] overflow-y-auto">
              <div className="flex items-center gap-2 mb-2 text-[#0057D9]">
                {selectedCapability.icon}
                <span className="text-[11px] font-mono font-bold uppercase tracking-[0.14em]">
                  {selectedCapability.category}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B1B2A] mb-3">
                {selectedCapability.title}
              </h3>

              <p className="text-sm sm:text-base text-[#52606D] leading-relaxed mb-6">
                {selectedCapability.desc}
              </p>

              {/* Technical Specifications 4-Box Grid */}
              <div className="mb-6">
                <h4 className="text-xs font-mono font-bold uppercase tracking-[0.1em] text-[#7A8793] mb-3">
                  Technical Specifications &amp; Standards
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {selectedCapability.specs.map((s, idx) => (
                    <div key={idx} className="p-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
                      <span className="block text-[10px] font-mono text-[#7A8793] uppercase tracking-wider mb-1">
                        {s.label}
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-[#0B1B2A]">
                        {s.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Engineering Scope & Deliverables */}
              <div className="mb-6">
                <h4 className="text-xs font-mono font-bold uppercase tracking-[0.1em] text-[#7A8793] mb-3">
                  Key Scope &amp; Manufacturing Deliverables
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedCapability.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#10202E]">
                      <Check className="w-4 h-4 text-[#0057D9] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Bar */}
              <div className="pt-6 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      const title = selectedCapability.title;
                      setSelectedCapability(null);
                      if (onEnquireClick) {
                        onEnquireClick(`Capability Inquiry: ${title}`);
                      } else {
                        navigate(`/contact?service=${encodeURIComponent(`Capability Inquiry: ${title}`)}`);
                      }
                    }}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#0057D9] hover:bg-[#0049CA] text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-md cursor-pointer"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Request Engineering RFQ</span>
                  </button>

                  {selectedCapability.productLink && (
                    <Link
                      to={selectedCapability.productLink}
                      onClick={() => setSelectedCapability(null)}
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#0B1B2A] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      <span>{selectedCapability.productLinkLabel || 'Browse Product Line'}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#0057D9]" />
                    </Link>
                  )}
                </div>

                <button
                  onClick={() => setSelectedCapability(null)}
                  className="text-xs font-semibold text-[#7A8793] hover:text-[#0B1B2A] transition-colors cursor-pointer py-2"
                >
                  Close Window
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default CapabilitiesPage;
