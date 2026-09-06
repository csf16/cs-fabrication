import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Hero3D } from '../components/Hero3D';
import { SectionHeading } from '../components/SectionHeading';
import { TechnicalSpecViewer } from '../components/TechnicalSpecViewer';
import { submitLeadToGoogleSheet, validatePhoneNumber } from '../services/leadService';
import { useSEO } from '../hooks/useSEO';
import { 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Sliders, 
  Layers, 
  Cpu, 
  Factory, 
  Check, 
  Phone, 
  Building2,
  MapPin
} from 'lucide-react';

interface HomePageProps {
  onEnquireClick?: (service?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onEnquireClick }) => {
  useSEO({
    title: 'Central Structure Fabrication (CSF) | Solar Mounting Structures & C-Channels — Amroha, UP',
    description:
      'Central Structure Fabrication (CSF) is a precision structural fabrication company in Amroha, UP. We manufacture hot-dip galvanized solar mounting structures, precision C-channels, and custom industrial steel assemblies.',
    keywords:
      'Central Structure Fabrication, CSF, solar mounting structure manufacturer, C channel steel, strut channel, solar purlin, hot dip galvanized solar frames, solar structure supplier UP, IS 2062 structural steel',
    canonical: 'https://www.csfabrication.in/',
    ogTitle: 'CSF — Precision Solar Mounting Structures & C-Channels',
    ogDescription:
      'Engineered for dependable support. High-tensile galvanized C-channels and solar mounting structures built around precision.',
  });

  // Section 9: Lead Form State
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    requirement: '',
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
      if (res.isValid) {
        setPhoneError(null);
      }
    }
  };

  const handleSubmitLead = async (e: React.FormEvent) => {
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
        'Home Page - Request a Call Section',
        {
          name: formData.name,
          company: formData.company,
          requirement: formData.requirement,
        }
      );
      setSubmitSuccess(true);
      setFormData({ name: '', company: '', phone: '', requirement: '' });
      setPhoneError(null);
    } catch (err: any) {
      setServerError(err?.message || 'Unable to submit request. Please try again or call directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-[#FFFFFF] text-[#0F2130]">
      {/* ────────────────────────────────────────────────────────────
          SECTION 1: HERO (3D ASSEMBLY INTERACTION PRESERVED)
      ──────────────────────────────────────────────────────────── */}
      <Hero3D />

      {/* ────────────────────────────────────────────────────────────
          SECTION 2: WHAT WE FABRICATE
      ──────────────────────────────────────────────────────────── */}
      <section id="products" className="py-24 px-6 md:px-12 lg:px-20 max-w-[1340px] mx-auto">
        <SectionHeading
          badge="Product Lines"
          title="What We Fabricate"
          desc="Precision-engineered structural components built for solar energy, industrial framing, and heavy mechanical infrastructure."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Solar Mounting Structures */}
          <div className="bg-[#F8FAFC] border border-[#E5E7EB] hover:border-[#0049CA]/40 rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-xl group">
            <div className="flex flex-col gap-5">
              <div className="w-12 h-12 rounded-xl bg-[#0049CA]/10 flex items-center justify-center text-[#0049CA] group-hover:bg-[#0049CA] group-hover:text-white transition-colors duration-200">
                <Building2 className="w-6 h-6" />
              </div>

              <div>
                <span className="text-[11px] font-semibold text-[#0049CA] uppercase tracking-wider">
                  Utility & Commercial
                </span>
                <h3 className="text-2xl font-bold text-[#0F2130] uppercase mt-1">
                  Solar Mounting Structures
                </h3>
              </div>

              <p className="text-sm text-[#647488] leading-relaxed">
                Engineered fixed-tilt and tracker ground mounts, rooftop ballasted racking, and long-span industrial solar canopies.
              </p>

              {/* Key Specs */}
              <div className="pt-4 border-t border-[#E5E7EB] flex flex-col gap-2.5">
                {[
                  'IS 2062 Grade E250 / E350 Structural Steel',
                  'Hot-Dip Galvanized coating (85+ microns, IS 2629)',
                  'Wind rated up to 180 - 200 km/h gusts',
                  'Pre-punched slots for rapid on-site bolt assembly',
                ].map((spec, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-[#0F2130]">
                    <CheckCircle2 className="w-4 h-4 text-[#0049CA] flex-shrink-0 mt-0.5" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                if (onEnquireClick) onEnquireClick('Solar Mounting Structures');
                const formEl = document.getElementById('request-a-call');
                if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
              }}
              className="mt-8 w-full py-3.5 bg-[#0049CA] hover:bg-[#003bb0] text-white text-xs font-semibold uppercase tracking-wider rounded-none transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <span>Enquire For Structures</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 2: C-Channels */}
          <div className="bg-[#F8FAFC] border border-[#E5E7EB] hover:border-[#0049CA]/40 rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-xl group">
            <div className="flex flex-col gap-5">
              <div className="w-12 h-12 rounded-xl bg-[#0049CA]/10 flex items-center justify-center text-[#0049CA] group-hover:bg-[#0049CA] group-hover:text-white transition-colors duration-200">
                <Sliders className="w-6 h-6" />
              </div>

              <div>
                <span className="text-[11px] font-semibold text-[#0049CA] uppercase tracking-wider">
                  Cold-Roll Formed Struts
                </span>
                <h3 className="text-2xl font-bold text-[#0F2130] uppercase mt-1">
                  C-Channels & Purlins
                </h3>
              </div>

              <p className="text-sm text-[#647488] leading-relaxed">
                Continuous roll-formed slotted strut channels and custom purlins with uniform web profiles, precision return lips, and tight corner radii.
              </p>

              {/* Key Specs */}
              <div className="pt-4 border-t border-[#E5E7EB] flex flex-col gap-2.5">
                {[
                  'Standard 41×41, 41×21, 60×40 & 80×40 profiles',
                  'Thickness options from 1.5 mm to 3.2 mm',
                  'Continuous 14×28 mm oval CNC slot punching',
                  'Standard 3m / 6m or tailored cut-to-length specs',
                ].map((spec, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-[#0F2130]">
                    <CheckCircle2 className="w-4 h-4 text-[#0049CA] flex-shrink-0 mt-0.5" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                if (onEnquireClick) onEnquireClick('C-Channels & Purlins');
                const formEl = document.getElementById('request-a-call');
                if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
              }}
              className="mt-8 w-full py-3.5 bg-[#0049CA] hover:bg-[#003bb0] text-white text-xs font-semibold uppercase tracking-wider rounded-none transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <span>Enquire For C-Channels</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 3: Custom Fabrication */}
          <div className="bg-[#F8FAFC] border border-[#E5E7EB] hover:border-[#0049CA]/40 rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-xl group">
            <div className="flex flex-col gap-5">
              <div className="w-12 h-12 rounded-xl bg-[#0049CA]/10 flex items-center justify-center text-[#0049CA] group-hover:bg-[#0049CA] group-hover:text-white transition-colors duration-200">
                <Layers className="w-6 h-6" />
              </div>

              <div>
                <span className="text-[11px] font-semibold text-[#0049CA] uppercase tracking-wider">
                  Built-To-Print Components
                </span>
                <h3 className="text-2xl font-bold text-[#0F2130] uppercase mt-1">
                  Custom Fabrication
                </h3>
              </div>

              <p className="text-sm text-[#647488] leading-relaxed">
                Project-specific base plates, structural purlin splices, angle brackets, and heavy-gauge stamped steel mounting hardware.
              </p>

              {/* Key Specs */}
              <div className="pt-4 border-t border-[#E5E7EB] flex flex-col gap-2.5">
                {[
                  'Bespoke slot patterns and connection holes',
                  'Heavy CNC punching, shearing, and press braking',
                  'Fabrication directly from client CAD / 3D models',
                  '100% batch traceability with Mill Test Certificates',
                ].map((spec, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-[#0F2130]">
                    <CheckCircle2 className="w-4 h-4 text-[#0049CA] flex-shrink-0 mt-0.5" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                if (onEnquireClick) onEnquireClick('Custom Fabrication');
                const formEl = document.getElementById('request-a-call');
                if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
              }}
              className="mt-8 w-full py-3.5 bg-[#0049CA] hover:bg-[#003bb0] text-white text-xs font-semibold uppercase tracking-wider rounded-none transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <span>Enquire For Custom Parts</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          SECTION 3: BUILT AROUND PRECISION
      ──────────────────────────────────────────────────────────── */}
      <section className="bg-[#0F2130] text-white py-24 px-6 md:px-12 lg:px-20 relative overflow-hidden">
        {/* Subtle background grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        <div className="max-w-[1340px] mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content (6 cols) */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[#0049CA] text-xs font-semibold uppercase tracking-wider w-fit">
                <span className="w-2 h-2 rounded-full bg-[#0049CA]" />
                <span className="text-white">Engineering Quality</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight leading-[1.1]">
                Precision In Every Section.
              </h2>

              <p className="text-base sm:text-lg text-white/80 font-normal leading-relaxed">
                From roll-forming to hole punching, our manufacturing process is engineered for dimensional accuracy, structural strength, and seamless on-site installation.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-4 border-t border-white/10">
                <div className="flex flex-col gap-1">
                  <span className="text-2xl sm:text-3xl font-bold text-[#0049CA]">±0.1 mm</span>
                  <span className="text-xs text-white/70 uppercase tracking-wider font-medium">Punching Tolerance</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-2xl sm:text-3xl font-bold text-[#0049CA]">85+ µm</span>
                  <span className="text-xs text-white/70 uppercase tracking-wider font-medium">Zinc Coating</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-2xl sm:text-3xl font-bold text-[#0049CA]">25+ Yrs</span>
                  <span className="text-xs text-white/70 uppercase tracking-wider font-medium">Design Life</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/engineering"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-white hover:text-[#0049CA] uppercase tracking-wider transition-colors duration-200"
                >
                  <span>Explore Engineering Workflow</span>
                  <ArrowRight className="w-4 h-4 text-[#0049CA]" />
                </Link>
              </div>
            </div>

            {/* Right: Technical Blueprint Graphic (6 cols) */}
            <div className="lg:col-span-6 bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl backdrop-blur-sm relative">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10 text-xs text-white/60 font-semibold tracking-wider uppercase">
                <span>CAD SCHEMATIC: CSF-C4141-REV4</span>
                <span className="text-[#0049CA]">SCALE: 1:1 CNC VERIFIED</span>
              </div>

              {/* Vector Blueprint Visual */}
              <svg className="w-full aspect-[16/10] stroke-white fill-none" viewBox="0 0 420 260" strokeWidth="1.5">
                {/* Profile Cross-Section */}
                <g transform="translate(40, 30)">
                  {/* Outer profile */}
                  <path
                    d="M 30,30 H 70 V 55 H 55 V 45 H 45 V 175 H 175 V 45 H 165 V 55 H 150 V 30 H 190 V 190 H 30 Z"
                    stroke="#0049CA"
                    strokeWidth="2.5"
                    fill="rgba(0, 73, 202, 0.08)"
                  />

                  {/* Web dimension line */}
                  <line x1="30" y1="210" x2="190" y2="210" stroke="#647488" strokeDasharray="3,3" />
                  <path d="M 30,206 L 30,214 M 190,206 L 190,214" stroke="#647488" />
                  <text x="110" y="226" fill="#FFFFFF" fontSize="11" fontWeight="600" textAnchor="middle">
                    W: 41.3 mm
                  </text>

                  {/* Height dimension line */}
                  <line x1="10" y1="30" x2="10" y2="190" stroke="#647488" strokeDasharray="3,3" />
                  <path d="M 6,30 L 14,30 M 6,190 L 14,190" stroke="#647488" />
                  <text x="2" y="115" fill="#FFFFFF" fontSize="11" fontWeight="600" transform="rotate(-90 2 115)" textAnchor="middle">
                    H: 41.3 mm
                  </text>

                  {/* Return Lip indicator */}
                  <circle cx="62" cy="50" r="3" fill="#0049CA" />
                  <line x1="62" y1="50" x2="110" y2="20" stroke="#0049CA" strokeWidth="1" />
                  <text x="115" y="22" fill="#FFFFFF" fontSize="10" fontWeight="600">
                    LIP: 10 mm
                  </text>

                  {/* Thickness callout */}
                  <text x="110" y="115" fill="#0049CA" fontSize="12" fontWeight="700" textAnchor="middle">
                    t: 2.5 mm (IS 2062)
                  </text>
                </g>

                {/* Slotted Punch Pattern Detail (Right side) */}
                <g transform="translate(260, 40)">
                  <rect x="0" y="10" width="120" height="170" rx="4" stroke="#647488" strokeDasharray="3,3" />
                  
                  {/* Three oval slots */}
                  <rect x="44" y="25" width="32" height="18" rx="9" fill="#0049CA" opacity="0.8" />
                  <rect x="44" y="70" width="32" height="18" rx="9" fill="#0049CA" opacity="0.8" />
                  <rect x="44" y="115" width="32" height="18" rx="9" fill="#0049CA" opacity="0.8" />

                  <text x="60" y="58" fill="#FFFFFF" fontSize="9" fontWeight="600" textAnchor="middle">
                    14 × 28 mm
                  </text>
                  <text x="60" y="103" fill="#FFFFFF" fontSize="9" fontWeight="600" textAnchor="middle">
                    P: 50 mm
                  </text>

                  <text x="60" y="160" fill="#647488" fontSize="9" fontWeight="600" textAnchor="middle">
                    CNC IN-LINE PUNCH
                  </text>
                </g>
              </svg>

              <div className="flex items-center justify-between pt-4 mt-2 border-t border-white/10 text-[11px] text-white/70">
                <span>ZINC THICKNESS: 85+ MICRONS</span>
                <span className="text-[#0049CA] font-bold">100% FACTORY INSPECTED</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          SECTION 4: CAPABILITIES
      ──────────────────────────────────────────────────────────── */}
      <section id="capabilities" className="py-24 px-6 md:px-12 lg:px-20 max-w-[1340px] mx-auto">
        <SectionHeading
          badge="Manufacturing Scope"
          title="Manufacturing Capabilities"
          desc="Purpose-built industrial tooling and automated processing lines engineered for repeatability, structural rigor, and high daily throughput."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Cap 1: Structural Fabrication */}
          <div className="bg-[#F8FAFC] border border-[#E5E7EB] hover:border-[#0049CA]/40 rounded-2xl p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-lg">
            <div className="flex flex-col gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#0049CA]/10 flex items-center justify-center text-[#0049CA]">
                <Factory className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-[#0049CA] tracking-wider uppercase">01 / Scope</span>
              <h3 className="text-xl font-bold text-[#0F2130] uppercase">
                Structural Fabrication
              </h3>
              <p className="text-xs text-[#647488] leading-relaxed">
                Automated cold roll-forming, precision shearing, high-tonnage stamping, and robot-assisted steel processing lines.
              </p>
            </div>
            <div className="pt-4 mt-6 border-t border-[#E5E7EB] flex flex-col gap-1 text-[11px] text-[#0F2130] font-medium">
              <span>• Cold-roll forming lines</span>
              <span>• Heavy hydraulic press brakes</span>
              <span>• High-precision shearing</span>
            </div>
          </div>

          {/* Cap 2: C-Channel Manufacturing */}
          <div className="bg-[#F8FAFC] border border-[#E5E7EB] hover:border-[#0049CA]/40 rounded-2xl p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-lg">
            <div className="flex flex-col gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#0049CA]/10 flex items-center justify-center text-[#0049CA]">
                <Cpu className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-[#0049CA] tracking-wider uppercase">02 / Scope</span>
              <h3 className="text-xl font-bold text-[#0F2130] uppercase">
                C-Channel Manufacturing
              </h3>
              <p className="text-xs text-[#647488] leading-relaxed">
                Standard and custom profiles, uniform wall thickness, tight corner radii, and continuous slotted punch patterns.
              </p>
            </div>
            <div className="pt-4 mt-6 border-t border-[#E5E7EB] flex flex-col gap-1 text-[11px] text-[#0F2130] font-medium">
              <span>• 41×41, 41×21, 60×40 profiles</span>
              <span>• Continuous in-line CNC punching</span>
              <span>• Tight corner radius control</span>
            </div>
          </div>

          {/* Cap 3: Custom Requirements */}
          <div className="bg-[#F8FAFC] border border-[#E5E7EB] hover:border-[#0049CA]/40 rounded-2xl p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-lg">
            <div className="flex flex-col gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#0049CA]/10 flex items-center justify-center text-[#0049CA]">
                <Sliders className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-[#0049CA] tracking-wider uppercase">03 / Scope</span>
              <h3 className="text-xl font-bold text-[#0F2130] uppercase">
                Custom Requirements
              </h3>
              <p className="text-xs text-[#647488] leading-relaxed">
                Built-to-print fabrication, bespoke slot spacing, tailored flange angles, and project-specific zinc coatings.
              </p>
            </div>
            <div className="pt-4 mt-6 border-t border-[#E5E7EB] flex flex-col gap-1 text-[11px] text-[#0F2130] font-medium">
              <span>• Custom hole dimensions & pitch</span>
              <span>• Variable return lip designs</span>
              <span>• Project-specific CAD modeling</span>
            </div>
          </div>

          {/* Cap 4: Production Reliability */}
          <div className="bg-[#F8FAFC] border border-[#E5E7EB] hover:border-[#0049CA]/40 rounded-2xl p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-lg">
            <div className="flex flex-col gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#0049CA]/10 flex items-center justify-center text-[#0049CA]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-[#0049CA] tracking-wider uppercase">04 / Scope</span>
              <h3 className="text-xl font-bold text-[#0F2130] uppercase">
                Production Reliability
              </h3>
              <p className="text-xs text-[#647488] leading-relaxed">
                High-volume monthly output, strict batch-to-batch repeatability, mill test certified raw materials, and on-schedule dispatch.
              </p>
            </div>
            <div className="pt-4 mt-6 border-t border-[#E5E7EB] flex flex-col gap-1 text-[11px] text-[#0F2130] font-medium">
              <span>• Mill Test Certificate (MTC) verification</span>
              <span>• Direct logistics across Northern India</span>
              <span>• Dedicated account dispatch desk</span>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          SECTION 5: WHY CSF
      ──────────────────────────────────────────────────────────── */}
      <section className="bg-[#F8FAFC] py-24 px-6 md:px-12 lg:px-20 border-y border-[#E5E7EB]">
        <div className="max-w-[1340px] mx-auto">
          <SectionHeading
            badge="Engineering Integrity"
            title="Built For Demanding Applications"
            desc="Direct, dependable structural performance without exaggerated claims. Here is what defines CSF."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              {
                num: '01',
                title: 'Precision',
                desc: '±0.1 mm punching and roll-forming tolerances ensure rapid, zero-struggle bolt alignment during site assembly.',
              },
              {
                num: '02',
                title: 'Strength',
                desc: 'High-tensile IS 2062 Grade E250 / E350 steel tested against heavy module static loads and localized wind forces.',
              },
              {
                num: '03',
                title: 'Consistency',
                desc: 'Automated continuous roll-forming lines guarantee uniform web depth, flange parallelity, and lip curvature.',
              },
              {
                num: '04',
                title: 'Responsiveness',
                desc: 'Rapid tooling adaptation, immediate CAD review, and flexible production scheduling for tight project commissioning windows.',
              },
              {
                num: '05',
                title: 'Experience',
                desc: 'Specialized structural expertise focused exclusively on cold-formed channels, solar mounting, and industrial steel assemblies.',
              },
            ].map((item) => (
              <div
                key={item.num}
                className="bg-white border border-[#E5E7EB] rounded-2xl p-6 flex flex-col justify-between hover:shadow-md transition-shadow duration-200"
              >
                <div>
                  <span className="text-xs font-bold text-[#0049CA] tracking-wider uppercase block mb-3">
                    {item.num} // Differentiator
                  </span>
                  <h3 className="text-xl font-bold text-[#0F2130] uppercase mb-3">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#647488] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="w-8 h-[2px] bg-[#0049CA] mt-6 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          SECTION 6: PRODUCTS / TECHNICAL DETAIL
      ──────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12 lg:px-20 max-w-[1340px] mx-auto">
        <SectionHeading
          badge="Product Specifications"
          title="Technical Specifications"
          desc="Inspect profile geometry, steel metallurgy, hole punching dimensions, and protective coating standards."
        />

        <TechnicalSpecViewer
          onSelectProfile={(profileName) => {
            setFormData(prev => ({
              ...prev,
              requirement: `Requirement for ${profileName}: `,
            }));
          }}
        />
      </section>

      {/* ────────────────────────────────────────────────────────────
          SECTION 7: PROJECTS / APPLICATIONS
      ──────────────────────────────────────────────────────────── */}
      <section id="projects" className="bg-[#0F2130] text-white py-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1340px] mx-auto">
          <SectionHeading
            badge="Field Applications"
            title="Projects & Applications"
            desc="Structural frameworks fabricated by CSF deployed across diverse solar generation environments."
            light
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* App 1 */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col justify-between hover:bg-white/[0.08] transition-colors duration-200">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0049CA] uppercase tracking-wider">
                    Utility Scale
                  </span>
                  <span className="text-xs text-white/50">IS 2062 · 85µm HDG</span>
                </div>
                <h3 className="text-2xl font-bold uppercase text-white">
                  Ground Mount Solar Racking
                </h3>
                <p className="text-sm text-white/80 leading-relaxed">
                  Fixed-tilt (10° to 35°) structural frames engineered for utility-scale solar parks. Heavy-duty rammed or pre-cast column connections with slotted purlin cross-members.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 grid grid-cols-2 gap-4 text-xs text-white/70">
                <div>
                  <span className="block text-white/40 uppercase text-[10px]">Purlin Profile</span>
                  <span className="font-semibold text-white">80×40 / 41×41 HDG Strut</span>
                </div>
                <div>
                  <span className="block text-white/40 uppercase text-[10px]">Wind Rating</span>
                  <span className="font-semibold text-white">Up to 200 km/h</span>
                </div>
              </div>
            </div>

            {/* App 2 */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col justify-between hover:bg-white/[0.08] transition-colors duration-200">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0049CA] uppercase tracking-wider">
                    Commercial & Industrial
                  </span>
                  <span className="text-xs text-white/50">Roof Racking</span>
                </div>
                <h3 className="text-2xl font-bold uppercase text-white">
                  Industrial Rooftop Frameworks
                </h3>
                <p className="text-sm text-white/80 leading-relaxed">
                  Ballasted non-penetrating and anchored rafter systems engineered to distribute load profiles evenly across industrial shed roofs and RCC slabs.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 grid grid-cols-2 gap-4 text-xs text-white/70">
                <div>
                  <span className="block text-white/40 uppercase text-[10px]">Material Grade</span>
                  <span className="font-semibold text-white">Galvanized Steel / Alum</span>
                </div>
                <div>
                  <span className="block text-white/40 uppercase text-[10px]">Fixing Type</span>
                  <span className="font-semibold text-white">Chemical Anchor / Ballast</span>
                </div>
              </div>
            </div>

            {/* App 3 */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col justify-between hover:bg-white/[0.08] transition-colors duration-200">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0049CA] uppercase tracking-wider">
                    Canopy Engineering
                  </span>
                  <span className="text-xs text-white/50">Long Span</span>
                </div>
                <h3 className="text-2xl font-bold uppercase text-white">
                  Elevated Solar Carports
                </h3>
                <p className="text-sm text-white/80 leading-relaxed">
                  Heavy-gauge structural steel canopies combining clean architectural columns with overhead solar panel mounting and integrated rainwater channel conduits.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 grid grid-cols-2 gap-4 text-xs text-white/70">
                <div>
                  <span className="block text-white/40 uppercase text-[10px]">Clearance Span</span>
                  <span className="font-semibold text-white">Up to 10.5 Meters</span>
                </div>
                <div>
                  <span className="block text-white/40 uppercase text-[10px]">Corrosion Shield</span>
                  <span className="font-semibold text-white">Class 1 HDG Coating</span>
                </div>
              </div>
            </div>

            {/* App 4 */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col justify-between hover:bg-white/[0.08] transition-colors duration-200">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0049CA] uppercase tracking-wider">
                    Precision Hardware
                  </span>
                  <span className="text-xs text-white/50">Custom CAD</span>
                </div>
                <h3 className="text-2xl font-bold uppercase text-white">
                  Custom Brackets & Splice Plates
                </h3>
                <p className="text-sm text-white/80 leading-relaxed">
                  Precision-punched purlin splice connectors, corner angles, foundation base plates, and clamp assemblies tailored to client structural drawings.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 grid grid-cols-2 gap-4 text-xs text-white/70">
                <div>
                  <span className="block text-white/40 uppercase text-[10px]">Punching Accuracy</span>
                  <span className="font-semibold text-white">±0.1 mm CNC In-Line</span>
                </div>
                <div>
                  <span className="block text-white/40 uppercase text-[10px]">Steel Thickness</span>
                  <span className="font-semibold text-white">Up to 8.0 mm Plate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          SECTION 8: ABOUT CSF
      ──────────────────────────────────────────────────────────── */}
      <section id="about" className="py-24 px-6 md:px-12 lg:px-20 max-w-[1340px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0049CA]/10 border border-[#0049CA]/20 text-[#0049CA] text-xs font-semibold uppercase tracking-wider w-fit">
              <span className="w-2 h-2 rounded-full bg-[#0049CA]" />
              <span>About Central Structure Fabrication</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-[#0F2130] leading-[1.1]">
              Structure Starts With Precision.
            </h2>

            <p className="text-base text-[#647488] leading-relaxed">
              Central Structure Fabrication (CSF) is an industrial steel manufacturing company based in Amroha, Uttar Pradesh. We specialize in cold-roll formed C-channels, hot-dip galvanized solar mounting structures, and custom structural assemblies.
            </p>

            <p className="text-base text-[#647488] leading-relaxed">
              Our engineering philosophy is simple: precision before fabrication. By maintaining strict control over steel grades (IS 2062), punching tolerances, and zinc galvanizing thickness, we deliver dependable framework components that EPC contractors and industrial developers can rely on for 25+ year project lifecycles.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#E5E7EB]">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#0049CA] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-[#0F2130] uppercase block">Manufacturing Facility</span>
                  <span className="text-xs text-[#647488]">Amroha, Uttar Pradesh, India</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#0049CA] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-[#0F2130] uppercase block">Standards Compliance</span>
                  <span className="text-xs text-[#647488]">IS 2062 · IS 2629 · IS 875</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image / Facility Card (5 cols) */}
          <div className="lg:col-span-5 bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-md">
            <div className="rounded-xl overflow-hidden aspect-[4/3] bg-[#0F2130] relative mb-6">
              <img
                src="/assets/steel_structure.jpg"
                alt="CSF Steel Fabrication Facility"
                className="w-full h-full object-cover filter brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F2130]/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] font-semibold text-[#0049CA] uppercase tracking-wider block">
                  FACILITY DISPATCH
                </span>
                <span className="text-sm font-bold">Automated Roll-Forming & Punch Lines</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center text-xs py-2 border-b border-[#E5E7EB]">
                <span className="text-[#647488]">Core Industry:</span>
                <span className="font-semibold text-[#0F2130]">Solar & Structural Steel</span>
              </div>
              <div className="flex justify-between items-center text-xs py-2 border-b border-[#E5E7EB]">
                <span className="text-[#647488]">Raw Material Source:</span>
                <span className="font-semibold text-[#0F2130]">Prime Steel Coils (MTC Certified)</span>
              </div>
              <div className="flex justify-between items-center text-xs py-2">
                <span className="text-[#647488]">Quality Guarantee:</span>
                <span className="font-semibold text-[#0049CA]">100% Pre-Dispatch Quality Check</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          SECTION 9: REQUEST A CALL (LEAD CAPTURE FORM)
      ──────────────────────────────────────────────────────────── */}
      <section id="request-a-call" className="bg-[#F8FAFC] py-24 px-6 md:px-12 lg:px-20 border-t border-[#E5E7EB]">
        <div className="max-w-[1000px] mx-auto">
          <SectionHeading
            badge="Direct Inquiries"
            title="Request A Call"
            desc="Speak directly with our structural fabrication engineering desk for pricing, tonnage calculations, and dispatch lead times."
            align="center"
          />

          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-8 sm:p-12 shadow-xl">
            {submitSuccess ? (
              <div className="py-12 flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[#0049CA]/10 text-[#0049CA] flex items-center justify-center">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-[#0F2130] uppercase">
                  Request Received
                </h3>
                <p className="text-sm text-[#647488] max-w-md">
                  Thank you. A structural engineer from Central Structure Fabrication will call you within 1 business day to discuss your project requirements.
                </p>
                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="mt-4 px-6 py-3 bg-[#0049CA] text-white text-xs font-semibold uppercase tracking-wider rounded-none hover:bg-[#003bb0] transition-colors cursor-pointer shadow-sm"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitLead} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-[#0F2130] uppercase tracking-wider">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="px-4 py-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-sm text-[#0F2130] placeholder-[#647488]/60 focus:outline-none focus:border-[#0049CA] focus:bg-white transition-colors"
                    />
                  </div>

                  {/* Company Name */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-[#0F2130] uppercase tracking-wider">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Solar EPC Ltd."
                      value={formData.company}
                      onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                      className="px-4 py-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-sm text-[#0F2130] placeholder-[#647488]/60 focus:outline-none focus:border-[#0049CA] focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Phone Number */}
                  <div className="flex flex-col gap-2 sm:col-span-2">
                    <label className="text-xs font-semibold text-[#0F2130] uppercase tracking-wider">
                      Mobile Number <span className="text-[#0049CA]">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-xs font-semibold text-[#647488]">
                        +91
                      </div>
                      <input
                        type="tel"
                        required
                        placeholder="98765 43210"
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        className={`w-full pl-14 pr-4 py-3 bg-[#F8FAFC] border rounded-xl text-sm text-[#0F2130] placeholder-[#647488]/60 focus:outline-none focus:bg-white transition-colors ${
                          phoneError ? 'border-red-500 focus:border-red-500' : 'border-[#E5E7EB] focus:border-[#0049CA]'
                        }`}
                      />
                    </div>
                    {phoneError && (
                      <span className="text-xs text-red-600 font-medium mt-0.5">
                        {phoneError}
                      </span>
                    )}
                    <span className="text-[11px] text-[#647488]">
                      Enter a 10-digit Indian mobile number. We will use this number to contact you.
                    </span>
                  </div>
                </div>

                {/* Requirement */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-[#0F2130] uppercase tracking-wider">
                    Project Requirement / Steel Tonnage
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Provide details such as profile dimensions (e.g. 41x41 mm), project location, required coating (HDG 85 microns), or estimated steel volume."
                    value={formData.requirement}
                    onChange={(e) => setFormData(prev => ({ ...prev, requirement: e.target.value }))}
                    className="px-4 py-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-sm text-[#0F2130] placeholder-[#647488]/60 focus:outline-none focus:border-[#0049CA] focus:bg-white transition-colors resize-none"
                  />
                </div>

                {serverError && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600">
                    {serverError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#0049CA] hover:bg-[#003bb0] disabled:bg-[#0049CA]/60 text-white text-xs font-semibold uppercase tracking-wider rounded-none transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group mt-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Submitting Request...</span>
                    </span>
                  ) : (
                    <>
                      <Phone className="w-4 h-4" />
                      <span>Request a Call</span>
                      <ArrowRight className="w-4 h-4 transform transition-transform duration-200 group-hover:translate-x-1" />
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
