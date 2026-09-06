import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';
import {
  Factory,
  Layers,
  ShieldCheck,
  Wrench,
  CheckCircle2,
  ArrowRight,
  Zap,
  HardHat,
  Compass
} from 'lucide-react';

interface CapabilitiesPageProps {
  onEnquireClick?: (service?: string) => void;
}

export const CapabilitiesPage: React.FC<CapabilitiesPageProps> = ({ onEnquireClick }) => {
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

  const capabilities = [
    {
      id: '01',
      title: 'Solar Structure Fabrication',
      subtitle: 'Heavy-Gauge Cold-Roll Forming & Precision Piercing',
      desc: 'Fabrication of ground-mount, rooftop, and carport steel mounting structures designed to withstand localized wind loads up to 180 km/h with 25+ year durability.',
      specs: ['IS 2062 Grade E250 / E350 Structural Steel', 'CNC precision slot punching for fast assembly', 'Pre-engineered bolted connections (zero site welding)'],
      icon: <Factory className="w-5 h-5 text-[#0049CA]" />,
    },
    {
      id: '02',
      title: 'C-Channel Manufacturing',
      subtitle: '80×40×15 & 60×40×15 Profiles',
      desc: 'High-speed automated roll-forming lines producing continuous slotted C-channels with stiffening return lips for high torsional resistance and minimal deflection.',
      specs: ['Web: 60mm & 80mm | Flange: 40mm | Lip: 15mm', 'Continuous roll-formed profile consistency', 'Slotted hole patterns for variable module bolt spacing'],
      icon: <Layers className="w-5 h-5 text-[#0049CA]" />,
    },
    {
      id: '03',
      title: 'Strut Channel Manufacturing',
      subtitle: '41×41 Modular Framing Systems',
      desc: 'Roll-formed structural strut channels featuring continuous inward-curling return lips for channel nut engagement, modular solar framing, and electrical containment.',
      specs: ['41mm × 41mm square structural section', 'Serrated lip profile for high-slip-resistance clamping', 'Compatible with standard spring nuts and strut hardware'],
      icon: <Compass className="w-5 h-5 text-[#0049CA]" />,
    },
    {
      id: '04',
      title: 'ACDB & DCDB Manufacturing',
      subtitle: 'In-House Protection & Distribution Enclosures',
      desc: 'Engineered fabrication and wiring of IP65 solar distribution boxes featuring Tier-1 switchgear, surge suppression (SPD), and high-voltage DC isolation.',
      specs: ['Up to 1000V DC string fuse & isolator integration', 'Type II AC & DC Surge Protection Devices (SPD)', 'Neoprene gasketed polycarbonate/FRP/CRCA enclosures'],
      icon: <Zap className="w-5 h-5 text-[#0049CA]" />,
    },
    {
      id: '05',
      title: 'Solar Hardware & Clamping Systems',
      subtitle: 'Extruded Clamps & High-Tensile Fasteners',
      desc: 'Precision manufacturing of anodized aluminum mid/end clamps, stainless steel (SS304/SS316) fasteners, U-clamps, base plates, and structural splices.',
      specs: ['6063-T6 Structural Aluminium extruded profiles', 'Passivated SS304 A2-70 Allen bolts & EPDM grip washers', 'Universal module thickness accommodation (30mm – 40mm)'],
      icon: <Wrench className="w-5 h-5 text-[#0049CA]" />,
    },
    {
      id: '06',
      title: 'On-Site Installation Support',
      subtitle: 'Technical Field Supervision & Structural Erection',
      desc: 'Expert on-site guidance ensuring alignment tolerances, pile foundation leveling, rafter squaring, and torque-controlled bolted fastening.',
      specs: ['Purlin leveling and array string squaring supervision', 'Calibrated torque wrench verification on structural joints', 'Safety compliant installation protocols'],
      icon: <HardHat className="w-5 h-5 text-[#0049CA]" />,
    },
    {
      id: '07',
      title: 'Structural Completion & Verification',
      subtitle: 'Dimensional Audit & Torque Auditing',
      desc: 'Systematic inspection covering zinc coating thickness gauge measurement, structural bolt torque audits, and module tilt angle verification against CAD drawings.',
      specs: ['100% joint torque and dimensional verification', 'Zinc coating thickness verification (ASTM / IS 4759)', 'Deflection checking under full module dead-weight'],
      icon: <ShieldCheck className="w-5 h-5 text-[#0049CA]" />,
    },
    {
      id: '08',
      title: 'Testing & Commissioning Coordination',
      subtitle: 'Pre-Commissioning Electrical & Mechanical Handover',
      desc: 'Complete electrical continuity, string insulation resistance (megger testing), and DC polarity checks preceding formal inverter synchronization.',
      specs: ['String open-circuit voltage (Voc) & short-circuit current (Isc) logging', 'ACDB / DCDB trip mechanism verification', 'As-built documentation and commissioning dossier'],
      icon: <CheckCircle2 className="w-5 h-5 text-[#0049CA]" />,
    },
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Requirement Analysis & Engineering',
      desc: 'Technical consultation to evaluate structural requirements, soil conditions, wind speed zones, and electrical distribution layout before manufacturing.',
      items: [
        'Site terrain, wind zone (IS 875 Part 3), and module layout review',
        'Load calculations: Dead load, live load, and wind uplift resistance',
        'BOM generation and customized section sizing',
      ],
      timeframe: 'Phase 1: Project Alignment',
    },
    {
      step: '02',
      title: 'Structural & Electrical Fabrication',
      desc: 'Precision manufacturing in our Amroha facility across automated roll-forming lines, stamping presses, and certified electrical assembly bays.',
      items: [
        'Continuous roll forming of C-Channels & 41×41 Struts',
        'Precision hole punching with zero-burr tooling',
        'Assembly & wiring of IP65 ACDB / DCDB protection panels',
      ],
      timeframe: 'Phase 2: Factory Manufacturing',
    },
    {
      step: '03',
      title: 'On-Site Installation Support',
      desc: 'Direct logistical delivery to project sites followed by technical supervision to guarantee plumb, level, and square assembly.',
      items: [
        'Organized bundle dispatch with piece-marked identification',
        'Base plate anchoring and rafter/purlin erection guidance',
        'Torque-calibrated bolting verification',
      ],
      timeframe: 'Phase 3: Field Erection',
    },
    {
      step: '04',
      title: 'Structural Completion',
      desc: 'Final mechanical audits ensuring the entire structural framework conforms rigidly to structural drawings and stability standards.',
      items: [
        'Full structural stability and fastener tightness inspection',
        'Coating integrity and corrosion protection review',
        'Module mounting alignment sign-off',
      ],
      timeframe: 'Phase 4: Mechanical Audit',
    },
    {
      step: '05',
      title: 'Testing & Commissioning',
      desc: 'Pre-power-on verification of all electrical subsystems, switchgear isolation, array polarity, and grid synchronization readiness.',
      items: [
        'ACDB / DCDB breaker operation & SPD health verification',
        'String Voc and earth continuity resistance testing',
        'Formal completion dossier handover to client',
      ],
      timeframe: 'Phase 5: Handover',
    },
  ];

  return (
    <div className="w-full pt-28 pb-24 bg-[#FFFFFF] text-[#0F2130]">
      {/* ── Page Hero Header ──────────────────────────────────────── */}
      <section className="max-w-[1320px] mx-auto px-6 md:px-10 mb-20">
        <div className="flex flex-col gap-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0049CA]/10 text-[#0049CA] text-[12px] font-semibold tracking-[0.04em] uppercase w-fit">
            <span>Manufacturing & Execution</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#0F2130] leading-[1.1]">
            Industrial Capabilities &amp; Engineering Process
          </h1>
          <p className="text-base sm:text-lg text-[#647488] leading-relaxed">
            Central Structure Fabrication pairs high-volume steel roll-forming machinery with certified electrical panel manufacturing. We deliver complete structural and electrical solar infrastructure from raw coil to on-site commissioning.
          </p>
        </div>

        {/* Quick Stats / Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 border border-[#E5E7EB] bg-[#F8FAFC] p-6">
          <div>
            <span className="block text-2xl sm:text-3xl font-bold text-[#0049CA]">8 Core</span>
            <span className="text-xs text-[#647488] uppercase tracking-wider font-semibold">Capabilities</span>
          </div>
          <div>
            <span className="block text-2xl sm:text-3xl font-bold text-[#0F2130]">5-Step</span>
            <span className="text-xs text-[#647488] uppercase tracking-wider font-semibold">Execution Workflow</span>
          </div>
          <div>
            <span className="block text-2xl sm:text-3xl font-bold text-[#0049CA]">Amroha, UP</span>
            <span className="text-xs text-[#647488] uppercase tracking-wider font-semibold">Manufacturing Hub</span>
          </div>
          <div>
            <span className="block text-2xl sm:text-3xl font-bold text-[#0F2130]">IS Standards</span>
            <span className="text-xs text-[#647488] uppercase tracking-wider font-semibold">IS 2062 &amp; IS 875</span>
          </div>
        </div>
      </section>

      {/* ── Section 04: The 8 Core Capabilities Grid ──────────────── */}
      <section id="capabilities-grid" className="max-w-[1320px] mx-auto px-6 md:px-10 mb-28">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-[#E5E7EB] pb-6">
          <div>
            <span className="text-[12px] font-bold text-[#0049CA] tracking-[0.06em] uppercase">Core Capabilities</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0F2130] mt-1">
              End-to-End Industrial Scope
            </h2>
          </div>
          <p className="text-sm text-[#647488] max-w-md">
            Our dual competence spans structural steel cold roll-forming and certified solar electrical protection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((cap) => (
            <div
              key={cap.id}
              className="border border-[#E5E7EB] bg-[#FFFFFF] p-6 flex flex-col justify-between hover:border-[#0049CA] transition-all duration-200 group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 bg-[#F8FAFC] border border-[#E5E7EB] group-hover:bg-[#0049CA]/10 group-hover:border-[#0049CA]/30 transition-colors">
                    {cap.icon}
                  </div>
                  <span className="text-xs font-mono font-bold text-[#647488]">CAP-{cap.id}</span>
                </div>
                <h3 className="text-lg font-bold text-[#0F2130] mb-1 group-hover:text-[#0049CA] transition-colors">
                  {cap.title}
                </h3>
                <span className="block text-[11px] font-semibold text-[#0049CA] uppercase tracking-wider mb-3">
                  {cap.subtitle}
                </span>
                <p className="text-xs text-[#647488] leading-relaxed mb-6">
                  {cap.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E5E7EB]/80 flex flex-col gap-2">
                {cap.specs.map((spec, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[#0049CA] shrink-0 mt-1.5" />
                    <span className="text-[11px] text-[#0F2130] font-medium leading-tight">{spec}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section 05: 5-Step Process Timeline ────────────────────── */}
      <section id="process" className="bg-[#0F2130] text-white py-24 mb-24">
        <div className="max-w-[1320px] mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-[#647488]/30 pb-6">
            <div>
              <span className="text-[12px] font-bold text-[#0049CA] tracking-[0.06em] uppercase">Methodology</span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-1">
                The 5-Step Execution Workflow
              </h2>
            </div>
            <p className="text-sm text-[#E5E7EB]/70 max-w-md">
              From the initial BOM analysis through automated fabrication to testing and commissioning on-site.
            </p>
          </div>

          {/* Desktop Steps Navigation Tabs */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-10">
            {processSteps.map((step, idx) => (
              <button
                key={step.step}
                onClick={() => setActiveStep(idx)}
                className={`text-left p-4 border transition-all duration-200 cursor-pointer ${
                  activeStep === idx
                    ? 'border-[#0049CA] bg-[#0049CA]/20 text-white'
                    : 'border-[#647488]/30 bg-white/5 text-[#E5E7EB]/70 hover:border-white/40'
                }`}
              >
                <span className="block text-xs font-mono text-[#0049CA] font-bold mb-1">STEP {step.step}</span>
                <span className="text-sm font-bold block leading-tight">{step.title}</span>
              </button>
            ))}
          </div>

          {/* Active Step Detailed Card */}
          <div className="border border-[#647488]/30 bg-[#0F2130]/90 p-8 md:p-12 relative overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl font-mono font-bold text-[#0049CA]">
                    {processSteps[activeStep].step}
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-1 bg-[#0049CA]/30 text-white uppercase tracking-wider">
                    {processSteps[activeStep].timeframe}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                  {processSteps[activeStep].title}
                </h3>
                <p className="text-base text-[#E5E7EB]/80 leading-relaxed mb-6">
                  {processSteps[activeStep].desc}
                </p>

                <div className="space-y-3">
                  {processSteps[activeStep].items.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[#0049CA] shrink-0 mt-0.5" />
                      <span className="text-sm text-white font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step Action Box */}
              <div className="lg:w-80 border border-[#647488]/40 bg-white/5 p-6 flex flex-col justify-between shrink-0">
                <div>
                  <span className="text-xs text-[#E5E7EB]/60 uppercase tracking-wider block mb-2 font-mono">
                    Quality Gate Check
                  </span>
                  <p className="text-xs text-[#E5E7EB] leading-relaxed mb-6">
                    Each stage must meet dimensional, electrical, and structural inspection thresholds before handoff to the next phase.
                  </p>
                </div>
                <button
                  onClick={() => onEnquireClick?.(`Process Step ${processSteps[activeStep].step}: ${processSteps[activeStep].title}`)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#0049CA] hover:bg-[#003CAD] text-white text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors"
                >
                  <span>Discuss This Step</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Factory & Technical Specs ─────────────────────────────── */}
      <section className="max-w-[1320px] mx-auto px-6 md:px-10 mb-20">
        <div className="border border-[#E5E7EB] p-8 md:p-12 bg-[#F8FAFC]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div>
              <span className="text-xs font-bold text-[#0049CA] uppercase tracking-wider">Facility &amp; Compliance</span>
              <h3 className="text-2xl font-bold text-[#0F2130] mt-1 mb-3">
                Amroha Manufacturing Plant
              </h3>
              <p className="text-xs text-[#647488] leading-relaxed">
                Mohanpur Shumali, Tahseel Naugaon Sadat, District Amroha, UP — 244221. Operating high-throughput roll-forming, punching, welding, and panel-wiring infrastructure.
              </p>
            </div>

            <div className="space-y-3 lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-white border border-[#E5E7EB]">
                <span className="text-xs font-bold text-[#0F2130] block mb-1">Steel Grades</span>
                <span className="text-xs text-[#647488]">IS 2062 E250 / E350 high tensile structural steel</span>
              </div>
              <div className="p-4 bg-white border border-[#E5E7EB]">
                <span className="text-xs font-bold text-[#0F2130] block mb-1">Protection Standards</span>
                <span className="text-xs text-[#647488]">IP65 Enclosures, Type II SPD &amp; 1000V DC rated switchgear</span>
              </div>
              <div className="p-4 bg-white border border-[#E5E7EB]">
                <span className="text-xs font-bold text-[#0F2130] block mb-1">Corrosion Resistance</span>
                <span className="text-xs text-[#647488]">Hot-dip galvanizing (IS 2629 / 4759) up to 85+ microns</span>
              </div>
              <div className="p-4 bg-white border border-[#E5E7EB]">
                <span className="text-xs font-bold text-[#0F2130] block mb-1">GSTIN Registration</span>
                <span className="text-xs text-[#647488] font-mono">09BDRPA4213J1ZJ (Uttar Pradesh)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Call To Action ────────────────────────────────────────── */}
      <section className="max-w-[1320px] mx-auto px-6 md:px-10">
        <div className="border border-[#0F2130] bg-[#0F2130] text-white p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold mb-2">Need Custom Fabrication or Engineering Support?</h3>
            <p className="text-sm text-[#E5E7EB]/80 max-w-xl">
              Consult directly with our Amroha manufacturing and technical team for customized C-channel roll-forming, strut designs, or ACDB/DCDB builds.
            </p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0049CA] hover:bg-[#003CAD] text-white text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors"
            >
              <span>Request Engineering RFQ</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CapabilitiesPage;
