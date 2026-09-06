import React, { useState } from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { useSEO } from '../hooks/useSEO';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface EngineeringPageProps {
  onEnquireClick?: (service?: string) => void;
}

export const EngineeringPage: React.FC<EngineeringPageProps> = ({ onEnquireClick }) => {
  useSEO({
    title: 'Structural Engineering & FEA Analysis | Standards & Methodology — CSF',
    description:
      'Central Structure Fabrication (CSF) executes a 7-step engineering methodology: geotechnical analysis, STAAD.Pro FEA simulations, IS 875 wind compliance, CNC CAD roll-forming, and IS 2629 hot-dip galvanizing for solar mounting structures.',
    keywords:
      'solar structure engineering, STAAD Pro FEA analysis, IS 875 wind load compliance, cold formed C channel design, solar mounting CAD drawings, hot dip galvanizing IS 2629, CSF engineering Amroha',
    canonical: 'https://www.csfabrication.in/engineering',
    ogTitle: 'Engineering & FEA Analysis — Central Structure Fabrication (CSF)',
    ogDescription:
      'From geotechnical analysis to STAAD.Pro FEA, CNC roll-forming, and IS 2629 galvanizing — our 7-step structural engineering workflow guarantees 25+ year solar reliability.',
  });

  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      step: '01',
      title: 'Geotechnical & Wind Speed Analysis',
      subtitle: 'Site Terrain & Meteorological Modeling',
      desc: 'We analyze site wind speed parameters (IS 875 Part 3), ground roughness categories, gust factors, topography multipliers, and geotechnical bore data to establish exact baseline static and dynamic loading limits.',
      parameters: 'WIND ZONES: UP TO 55 M/S (200 KM/H) // TERRAIN CATEGORY 1 TO 4',
      code: 'IS 875 (PART 3) // ASCE 7-16 // EN 1991-1-4',
    },
    {
      step: '02',
      title: 'STAAD.Pro & 3D FEA Stress Simulation',
      subtitle: 'Non-Linear Structural Deflection Analysis',
      desc: 'Finite Element Analysis (FEA) simulates stress concentrations, nodal displacements, torsional flutter, and buckling under combination loading (Dead Load + Live Load + Wind Uplift + Seismic forces).',
      parameters: 'VON MISES STRESS < 0.66 FY // DEFLECTION LIMIT: L/200',
      code: 'STAAD.PRO CONNECT // ANSYS STRUCTURAL FEA',
    },
    {
      step: '03',
      title: 'Section Optimization & C-Channel Design',
      subtitle: 'Cold-Formed Steel Cross-Section Efficiency',
      desc: 'Iterative optimization of C-channel profile dimensions, flange return lip curls, and gauge thickness (1.5mm to 3.2mm) to achieve the highest strength-to-weight ratio without over-engineering steel tonnage.',
      parameters: 'OPTIMIZED STEEL SAVINGS: 12-18% TONNAGE // MAXIMUM MOMENT OF INERTIA',
      code: 'IS 801 (COLD-FORMED CODE) // AISI S100-16',
    },
    {
      step: '04',
      title: 'Precision CAD Blueprints & CNC Tooling',
      subtitle: 'Zero-Tolerance Fabrication Schematics',
      desc: 'Comprehensive 3D SolidWorks drafting generating machine-readable CNC punch matrices, roll tooling clearances, and exact hole pitch coordinates for automated multi-stand roll forming lines.',
      parameters: 'PUNCHING TOLERANCE: ±0.1MM // AUTOMATED G-CODE GENERATION',
      code: 'SOLIDWORKS 2024 // AUTOCAD ARCHITECTURE',
    },
    {
      step: '05',
      title: 'Bolted Joint Engineering & Fasteners',
      subtitle: 'High-Tensile Friction Grip Connections',
      desc: 'All joints utilize pre-engineered Grade 8.8 / SS304 fastener pairs with serrated flange locknuts and channel spring nuts, eliminating field welding and ensuring rapid, foolproof on-site assembly.',
      parameters: 'GRADE 8.8 BOLTS // SS304 SPRING NUTS // ANTI-GALLING TORQUE',
      code: 'IS 4000 // DIN 6921 // ISO 898-1',
    },
    {
      step: '06',
      title: 'Corrosion Barrier & Metallurgy Specs',
      subtitle: 'Hot-Dip Galvanizing & Coating Integrity',
      desc: 'Structural steel members are immersed in a 450°C molten zinc bath forming metallurgical zinc-iron alloy layers (85+ microns) that provide electrochemical cathodic protection against soil and atmospheric corrosion.',
      parameters: 'ZINC COAT: 85+ MICRONS (610 G/M²) // 25+ YEAR SOIL LIFETIME',
      code: 'IS 2629 // IS 4759 // ASTM A123',
    },
    {
      step: '07',
      title: 'On-Site Survey & Pull-Out Load Testing',
      subtitle: 'Real-World Validation on Project Terrain',
      desc: 'Hydraulic pile load testing measuring actual tensile pull-out resistance, lateral load deflection, and soil skin friction at the exact site coordinates prior to full-scale fabrication rollout.',
      parameters: 'PULL-OUT LOAD: UP TO 35 KN // LASER SURVEY ALIGNMENT',
      code: 'IS 2911 (PILE LOAD TESTING) // ASTM D3689',
    },
  ];

  return (
    <div className="w-full pt-32 pb-24 bg-[#FFFFFF] text-[#0F2130]">
      <div className="max-w-[1340px] mx-auto px-6 md:px-12 lg:px-20">
        
        {/* Page Header */}
        <div className="flex flex-col gap-4 mb-16 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0049CA]/10 border border-[#0049CA]/20 text-[#0049CA] text-xs font-semibold uppercase tracking-wider w-fit">
            <span className="w-2 h-2 rounded-full bg-[#0049CA]" />
            <span>Engineering Discipline & Standards</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#0F2130] tracking-tight leading-[1.08] uppercase">
            Engineering &amp; FEA Analysis
          </h1>

          <p className="text-base sm:text-lg text-[#647488] font-normal leading-relaxed">
            Before a single steel coil is unrolled, our structural engineering team simulates local wind pressure gradients, geotechnical reactions, and stress vectors in STAAD.Pro and non-linear FEA modeling.
          </p>
        </div>

        {/* Technical CAD / FEA Visual Display */}
        <div className="bg-[#0F2130] text-white rounded-2xl p-8 sm:p-12 mb-20 relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            <div className="lg:col-span-7 flex flex-col gap-5">
              <span className="text-xs font-bold text-[#0049CA] uppercase tracking-wider px-3 py-1 rounded-full bg-white/10 w-fit">
                FEA Stress &amp; Deflection Testing
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight leading-tight">
                Non-Linear Load Simulation Under 200 km/h Wind Surges
              </h2>
              <p className="text-sm text-white/80 leading-relaxed">
                Our structural C-channels with inward return lips are modeled under multi-directional wind combinations (aerodynamic uplift, dead load, and lateral soil shear). We ensure maximum Von Mises stresses remain safely below material yield thresholds (Yield Strength fy = 250 to 350 MPa).
              </p>

              <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4 text-xs">
                <div className="flex flex-col gap-1">
                  <span className="text-white/50 uppercase font-semibold">Maximum Deflection</span>
                  <span className="text-white font-bold text-sm">≤ L / 200 (IS 800)</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-white/50 uppercase font-semibold">Safety Factor</span>
                  <span className="text-[#0049CA] font-bold text-sm">1.50 (Ultimate Limit State)</span>
                </div>
              </div>
            </div>

            {/* CAD Schematic Visual (5 cols) */}
            <div className="lg:col-span-5 bg-white/5 rounded-xl p-6 border border-white/10 relative aspect-[4/3] flex items-center justify-center overflow-hidden">
              <svg className="w-full h-full stroke-white fill-none" viewBox="0 0 400 300">
                {/* Triangular Racking Truss Outline */}
                <path d="M 60 220 L 60 140 L 320 60 L 320 220" strokeWidth="2.5" stroke="#0049CA" />
                <line x1="60" y1="140" x2="320" y2="60" strokeWidth="3" stroke="#FFFFFF" />
                {/* Diagonal Knee Braces */}
                <line x1="60" y1="180" x2="160" y2="110" strokeWidth="2" stroke="#0049CA" strokeDasharray="4,4" />
                <line x1="320" y1="150" x2="220" y2="90" strokeWidth="2" stroke="#0049CA" strokeDasharray="4,4" />
                {/* Ground Level */}
                <line x1="30" y1="220" x2="360" y2="220" strokeWidth="2" stroke="#647488" />
                {/* Load Vectors */}
                <path d="M 120 40 L 140 85 M 140 85 L 132 75 M 140 85 L 145 75" stroke="#ef4444" strokeWidth="2.5" />
                <path d="M 220 20 L 240 65 M 240 65 L 232 55 M 240 65 L 245 55" stroke="#ef4444" strokeWidth="2.5" />
                
                <text x="65" y="40" fill="#ef4444" fontSize="10" fontWeight="700">WIND UPLIFT: 1.85 kN/m²</text>
                <text x="50" y="245" fill="#FFFFFF" fontSize="10" fontWeight="600">POST 1: 1.50m</text>
                <text x="280" y="245" fill="#FFFFFF" fontSize="10" fontWeight="600">POST 2: 2.70m</text>
              </svg>

              <div className="absolute top-4 right-4 px-2.5 py-1 bg-[#0F2130]/90 border border-white/20 rounded text-[10px] font-bold text-[#0049CA]">
                FEA VECTOR MAP
              </div>
            </div>
          </div>
        </div>

        {/* 7-Step Workflow Detailed Breakdown */}
        <div className="mb-20">
          <SectionHeading
            badge="Methodology"
            title="7-Step Engineering Process"
            desc="Our systematic engineering workflow guarantees zero on-site modifications and decades of dependable structural safety."
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-10">
            {/* Step Navigation Sidebar (4 cols) */}
            <div className="lg:col-span-4 flex flex-col gap-2">
              {steps.map((item, idx) => (
                <button
                  key={item.step}
                  onClick={() => setActiveStep(idx)}
                  className={`py-3.5 px-5 text-left rounded-xl transition-all duration-200 border ${
                    activeStep === idx
                      ? 'border-[#0049CA] bg-[#0049CA]/10 text-[#0F2130] font-bold shadow-sm'
                      : 'border-transparent hover:bg-[#F8FAFC] text-[#647488]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-bold ${activeStep === idx ? 'text-[#0049CA]' : 'text-[#647488]'}`}>
                      {item.step}
                    </span>
                    <span className="text-xs uppercase tracking-wide">{item.title}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Active Step Detailed Display (8 cols) */}
            <div className="lg:col-span-8 bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl p-8 sm:p-10 flex flex-col justify-between shadow-sm">
              <div className="flex flex-col gap-5">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-[#0049CA] tracking-wider uppercase">
                    PHASE {steps[activeStep].step} OF 07
                  </span>
                  <span className="text-xs text-[#0F2130] font-semibold bg-white px-3 py-1 rounded-lg border border-[#E5E7EB]">
                    {steps[activeStep].code}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-[#0F2130] uppercase">
                  {steps[activeStep].title}
                </h3>

                <span className="text-xs font-semibold text-[#0049CA] uppercase tracking-wide">
                  {steps[activeStep].subtitle}
                </span>

                <p className="text-sm text-[#647488] leading-relaxed">
                  {steps[activeStep].desc}
                </p>
              </div>

              <div className="border-t border-[#E5E7EB] pt-6 mt-8 flex flex-col gap-2">
                <span className="text-[10px] text-[#647488] uppercase tracking-wider font-semibold">
                  Applicable Industrial Benchmarks &amp; Codes
                </span>
                <span className="text-xs text-[#0F2130] font-bold tracking-wide">
                  {steps[activeStep].parameters}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Manufacturing & Hardware Catalog ─────────────────────────── */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold text-[#0049CA] uppercase tracking-wider">
                Manufactured In-House
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0F2130] uppercase tracking-tight">
                Solar Mounting Hardware &amp; Clamps
              </h2>
              <p className="text-sm text-[#647488] max-w-xl leading-relaxed">
                Every clamp, channel, and splice plate is produced on our CNC roll-forming and punching lines — hot-dip galvanized or anodized to IS 2629 and AL 6063-T6 standards.
              </p>
            </div>
            <div className="flex flex-col items-start md:items-end gap-0.5 shrink-0">
              <span className="text-[10px] text-[#647488] uppercase font-semibold">Product Count</span>
              <span className="text-3xl font-bold text-[#0F2130]">12+</span>
              <span className="text-[10px] text-[#0049CA] font-semibold uppercase">Hardware SKUs</span>
            </div>
          </div>

          {/* Hardware Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { img: '/hardware/aluminium-middle-clamp-35.jpg', name: 'Aluminium Middle Clamp 35', material: 'AL 6063-T6', finish: 'Anodized' },
              { img: '/hardware/aluminium-middle-clamp-10mm.jpg', name: 'Aluminium Middle Clamp 10mm', material: 'AL 6063-T6', finish: 'Anodized' },
              { img: '/hardware/aluminium-end-clamp.jpg', name: 'Aluminium End Clamp', material: 'AL 6063-T6', finish: 'Anodized' },
              { img: '/hardware/end-clamp-hdg.jpg', name: 'End Clamp (HDG)', material: 'IS 2062 Steel', finish: 'HDG 85µm' },
              { img: '/hardware/aluminium-strut-channel.jpg', name: 'Aluminium Strut Channel', material: 'AL 6063-T6', finish: 'Anodized' },
              { img: '/hardware/aluminium-micro-rail.jpg', name: 'Aluminium Micro Rail', material: 'AL 6063-T6', finish: 'Anodized' },
              { img: '/hardware/gi-strut-channel.jpg', name: 'GI Strut Channel', material: 'IS 2062 Steel', finish: 'HDG 85µm' },
              { img: '/hardware/spring-nut.jpg', name: 'Channel Spring Nut', material: 'SS 304', finish: 'Passivated' },
              { img: '/hardware/ms-roof-clamp.jpg', name: 'MS Roof Clamp', material: 'IS 2062 Steel', finish: 'HDG 85µm' },
              { img: '/hardware/aluminium-mini-strut-channel-41x21.jpg', name: 'Aluminium Mini Strut 41×21', material: 'AL 6063-T6', finish: 'Anodized' },
              { img: '/hardware/aluminium-41x61-base-rail.jpg', name: 'Aluminium 41×61 Base Rail', material: 'AL 6063-T6', finish: 'Anodized' },
              { img: '/hardware/middle-clamp-hdg.jpg', name: 'Middle Clamp (HDG)', material: 'IS 2062 Steel', finish: 'HDG 85µm' },
            ].map((item) => (
              <div
                key={item.name}
                className="group bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl overflow-hidden flex flex-col hover:border-[#0049CA]/40 hover:shadow-lg transition-all duration-300"
              >
                <div className="aspect-square bg-[#0F2130] overflow-hidden relative">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover filter brightness-90 group-hover:brightness-100 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute bottom-3 left-3 px-2 py-0.5 bg-white/90 backdrop-blur-sm rounded-md shadow-xs">
                    <span className="text-[9px] font-bold text-[#0049CA] uppercase tracking-wider">
                      {item.finish}
                    </span>
                  </div>
                </div>

                <div className="p-4 flex flex-col gap-1 flex-1 bg-white">
                  <h3 className="text-xs font-bold text-[#0F2130] uppercase leading-snug">
                    {item.name}
                  </h3>
                  <span className="text-[10px] font-medium text-[#647488] uppercase">
                    {item.material}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-[#E5E7EB] pt-6 text-xs text-[#647488]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#0049CA]" />
              <span>All hardware IS 2629 / IS 1367 compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#0049CA]" />
              <span>Custom dimensions &amp; hole punching available</span>
            </div>
          </div>
        </div>

        {/* Call to Action Banner */}
        <div className="bg-[#0F2130] text-white p-8 md:p-12 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="flex flex-col gap-2 max-w-xl">
            <span className="text-xs font-bold text-[#0049CA] uppercase tracking-wider">
              Site Load Calculations &amp; Auditing
            </span>
            <h3 className="text-2xl font-bold uppercase tracking-tight">
              Need STAAD.Pro load calculations for your project tenders?
            </h3>
            <p className="text-xs text-white/75 leading-relaxed font-normal">
              Send us your site coordinates and module layout. Our engineering desk delivers comprehensive structural calculation packages.
            </p>
          </div>

          <button
            onClick={() => {
              if (onEnquireClick) onEnquireClick('Engineering & STAAD.Pro Calculations');
              const formEl = document.getElementById('request-a-call');
              if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-4 bg-[#0049CA] hover:bg-[#003bb0] text-white text-xs font-semibold tracking-wider uppercase rounded-xl transition-all duration-200 whitespace-nowrap shadow-lg shadow-[#0049CA]/30 flex items-center gap-2"
          >
            <span>Request Engineering Review</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default EngineeringPage;
