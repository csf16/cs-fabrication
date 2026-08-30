import React, { useState } from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { useSEO } from '../hooks/useSEO';

interface EngineeringPageProps {
  onEnquireClick: (service?: string) => void;
}

export const EngineeringPage: React.FC<EngineeringPageProps> = ({ onEnquireClick }) => {
  useSEO({
    title: 'Solar Structure Engineering | FEA, Wind Load Analysis & CAD Design - CS Fabrication',
    description:
      "CS Fabrication's 7-step engineering process covers geotechnical analysis, STAAD.Pro FEA simulation, IS 875 wind load compliance, CNC roll-forming CAD design, IS 2629 galvanizing, and on-site pull-out load testing for solar mounting structures.",
    keywords:
      'solar structure FEA analysis, STAAD Pro solar structure, IS 875 wind load solar, solar mounting structure engineering, C channel structural design, hot dip galvanizing process solar, CNC roll forming solar frame, solar structure CAD design, structural steel wind analysis India',
    canonical: 'https://www.csfabrication.in/engineering',
    ogTitle: 'Solar Mounting Structure Engineering - CS Fabrication',
    ogDescription:
      'From geotechnical analysis to STAAD.Pro FEA, CNC roll-forming, and IS 2629 galvanizing - our 7-step structural engineering workflow guarantees 25+ year solar mounting reliability.',
  });

  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      step: '01',
      title: 'Geotechnical & Wind Speed Analysis',
      subtitle: 'Site Terrain & Meteorological Modeling',
      desc: 'We analyze site wind speed maps (IS 875 Part 3), ground roughness categories, gust factors, topography multipliers, and soil geotechnical bore reports to establish exact baseline static and dynamic loading limits.',
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
    <div className="w-full pt-28 pb-24 bg-[#F5F4EF]">
      <div className="max-w-[1300px] mx-auto px-6 md:px-12">
        
        {/* Page Header */}
        <div className="flex flex-col gap-4 mb-16">
          <div className="flex items-center gap-3">
            <div className="w-8 h-[1px] bg-[#B59A68]" />
            <span className="text-[10px] font-mono tracking-[0.35em] text-[#B59A68] uppercase font-bold">
              CS FABRICATION // ENGINEERING & DESIGN
            </span>
            <div className="w-8 h-[1px] bg-[#B59A68]" />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#17191B] tracking-tight font-sans uppercase">
            Engineering & FEA Analysis
          </h1>

          <p className="text-base text-[#34383B] max-w-2xl font-light leading-relaxed">
            Before a single steel coil is cut, our structural engineering team simulates local wind pressure gradients, geotechnical reactions, and stress vectors in STAAD.Pro and FEA modeling.
          </p>
        </div>

        {/* Technical CAD / FEA Visual Display */}
        <div className="bg-[#EAE8E1] border border-[#34383B]/15 rounded-sm p-8 md:p-12 mb-20 relative overflow-hidden shadow-inner">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-5">
              <span className="text-[10px] font-mono tracking-widest text-[#B59A68] uppercase font-bold">
                FEA STRESS & DEFLECTION TESTING
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold uppercase text-[#17191B] font-sans">
                Non-Linear Load Simulation Under 200 km/h Wind Surges
              </h2>
              <p className="text-xs sm:text-sm text-[#34383B] font-light leading-relaxed">
                Our structural C-channels with inward return lips are modeled under multi-directional wind gust combinations (aerodynamic uplift, downward dead load, and lateral ground shear). We ensure maximum Von Mises stresses remain safely below material yield thresholds (Yield Strength fy = 250 to 350 MPa).
              </p>

              <div className="grid grid-cols-2 gap-4 border-t border-[#34383B]/15 pt-4 text-xs font-mono">
                <div className="flex flex-col gap-1">
                  <span className="text-[#34383B]/50 font-bold text-[9px]">MAX DEFLECTION</span>
                  <span className="text-[#17191B] font-bold">&le; L / 200 (IS 800)</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[#34383B]/50 font-bold text-[9px]">SAFETY FACTOR</span>
                  <span className="text-[#B59A68] font-bold">1.50 (Ultimate Limit State)</span>
                </div>
              </div>
            </div>

            {/* CAD Schematic Visual */}
            <div className="bg-[#17191B] rounded-sm p-6 border border-[#34383B]/40 relative aspect-[4/3] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(245,244,239,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(245,244,239,0.03)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
              
              <svg className="w-full h-full stroke-[#F5F4EF]/70 fill-none" viewBox="0 0 400 300">
                {/* Triangular Racking Truss Outline */}
                <path d="M 60 220 L 60 140 L 320 60 L 320 220" strokeWidth="2" stroke="#B59A68" />
                <line x1="60" y1="140" x2="320" y2="60" strokeWidth="3" stroke="#F5F4EF" />
                {/* Diagonal Knee Braces */}
                <line x1="60" y1="180" x2="160" y2="110" strokeWidth="2" stroke="#B59A68" strokeDasharray="3,3" />
                <line x1="320" y1="150" x2="220" y2="90" strokeWidth="2" stroke="#B59A68" strokeDasharray="3,3" />
                {/* Ground Level */}
                <line x1="30" y1="220" x2="360" y2="220" strokeWidth="2" stroke="#34383B" />
                {/* Load Vectors */}
                <path d="M 120 40 L 140 85 M 140 85 L 132 75 M 140 85 L 145 75" stroke="#ef4444" strokeWidth="2" />
                <path d="M 220 20 L 240 65 M 240 65 L 232 55 M 240 65 L 245 55" stroke="#ef4444" strokeWidth="2" />
                
                <text x="70" y="45" fill="#ef4444" className="text-[10px] font-mono font-bold">WIND LOAD: 1.85 kN/m²</text>
                <text x="50" y="245" fill="#B59A68" className="text-[9px] font-mono">POST 1: 1.50m</text>
                <text x="290" y="245" fill="#B59A68" className="text-[9px] font-mono">POST 2: 2.70m</text>
              </svg>

              <div className="absolute top-4 right-4 px-2.5 py-1 bg-[#17191B]/90 border border-[#B59A68]/50 rounded text-[9px] font-mono text-[#B59A68]">
                FEA VECTOR MAP
              </div>
            </div>
          </div>
        </div>

        {/* 7-Step Workflow Detailed Breakdown */}
        <div className="mb-20">
          <SectionHeading
            badge="Standardized Workflow"
            title="7-Step Engineering Methodology"
            desc="Our systematic engineering process guarantees zero on-site modifications and decades of structural safety."
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12">
            {/* Step Navigation Sidebar */}
            <div className="lg:col-span-4 flex flex-col border-l border-[#34383B]/15">
              {steps.map((item, idx) => (
                <button
                  key={item.step}
                  onClick={() => setActiveStep(idx)}
                  className={`py-4 px-6 text-left border-l-2 transition-all duration-300 ${
                    activeStep === idx
                      ? 'border-[#B59A68] bg-[#EAE8E1] text-[#17191B] font-bold'
                      : 'border-transparent text-[#34383B]/50 hover:text-[#34383B]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-[#B59A68] font-bold">{item.step}</span>
                    <span className="text-xs font-mono uppercase tracking-wider">{item.title}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Active Step Detailed Display */}
            <div className="lg:col-span-8 bg-[#EAE8E1] border border-[#34383B]/15 rounded-sm p-8 md:p-12 flex flex-col justify-between shadow-sm">
              <div className="flex flex-col gap-6">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-mono text-[#B59A68] font-bold tracking-widest uppercase">
                    PHASE {steps[activeStep].step} OF 07
                  </span>
                  <span className="text-[10px] font-mono text-[#34383B]/60 uppercase bg-[#F5F4EF] px-2.5 py-1 rounded border border-[#34383B]/10">
                    {steps[activeStep].code}
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-extrabold text-[#17191B] uppercase font-sans">
                  {steps[activeStep].title}
                </h3>

                <span className="text-xs font-mono text-[#34383B]/70 font-bold uppercase">
                  {steps[activeStep].subtitle}
                </span>

                <p className="text-sm text-[#34383B] font-light leading-relaxed">
                  {steps[activeStep].desc}
                </p>
              </div>

              <div className="border-t border-[#34383B]/15 pt-6 mt-8 flex flex-col gap-2">
                <span className="text-[9px] font-mono text-[#34383B]/50 uppercase tracking-widest font-bold">
                  APPLICABLE INDUSTRIAL BENCHMARKS & CODES
                </span>
                <span className="text-xs font-mono text-[#17191B] font-bold tracking-wider">
                  {steps[activeStep].parameters}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Manufacturing & Hardware Catalog ─────────────────────────── */}
        <div className="mb-20">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-[1px] bg-[#B59A68]" />
                <span className="text-[10px] font-mono tracking-[0.35em] text-[#B59A68] uppercase font-bold">
                  MANUFACTURED IN-HOUSE
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17191B] uppercase font-sans leading-tight tracking-tight">
                Solar Panel Mounting<br />Structure &amp; Hardware
              </h2>
              <p className="text-sm text-[#34383B] font-light leading-relaxed max-w-xl">
                Every clamp, channel, and rail is produced on our own CNC roll-forming and precision punching lines — hot-dip galvanized or anodized to IS 2629 and AL 6063-T6 standards.
              </p>
            </div>
            <div className="flex flex-col items-start md:items-end gap-1 shrink-0">
              <span className="text-[9px] font-mono text-[#34383B]/50 uppercase tracking-widest font-bold">PRODUCT COUNT</span>
              <span className="text-3xl font-extrabold text-[#17191B] font-sans">12+</span>
              <span className="text-[9px] font-mono text-[#34383B]/50 uppercase tracking-widest">Hardware SKUs</span>
            </div>
          </div>

          {/* Hardware Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { img: '/hardware/aluminium-middle-clamp-35.jpg',       name: 'Aluminium Middle Clamp 35',         material: 'AL 6063-T6',    finish: 'Anodized'  },
              { img: '/hardware/aluminium-middle-clamp-10mm.jpg',     name: 'Aluminium Middle Clamp 10mm',       material: 'AL 6063-T6',    finish: 'Anodized'  },
              { img: '/hardware/aluminium-end-clamp.jpg',             name: 'Aluminium End Clamp',               material: 'AL 6063-T6',    finish: 'Anodized'  },
              { img: '/hardware/end-clamp-hdg.jpg',                   name: 'End Clamp (HDG)',                   material: 'IS 2062 Steel',  finish: 'HDG 85µm'  },
              { img: '/hardware/aluminium-strut-channel.jpg',         name: 'Aluminium Strut Channel',           material: 'AL 6063-T6',    finish: 'Anodized'  },
              { img: '/hardware/aluminium-micro-rail.jpg',            name: 'Aluminium Micro Rail',              material: 'AL 6063-T6',    finish: 'Anodized'  },
              { img: '/hardware/gi-strut-channel.jpg',                name: 'GI Strut Channel',                  material: 'IS 2062 Steel',  finish: 'HDG 85µm'  },
              { img: '/hardware/spring-nut.jpg',                      name: 'Spring Nut',                        material: 'SS 304',         finish: 'Passivated'},
              { img: '/hardware/ms-roof-clamp.jpg',                   name: 'MS Roof Clamp',                     material: 'IS 2062 Steel',  finish: 'HDG 85µm'  },
              { img: '/hardware/aluminium-mini-strut-channel-41x21.jpg', name: 'Aluminium Mini Strut Channel 41×21', material: 'AL 6063-T6', finish: 'Anodized'  },
              { img: '/hardware/aluminium-41x61-base-rail.jpg',       name: 'Aluminium 41×61 Base Rail',         material: 'AL 6063-T6',    finish: 'Anodized'  },
              { img: '/hardware/middle-clamp-hdg.jpg',                name: 'Middle Clamp (HDG)',                 material: 'IS 2062 Steel',  finish: 'HDG 85µm'  },
            ].map((item) => (
              <div
                key={item.name}
                className="group bg-[#EAE8E1] border border-[#34383B]/10 rounded-sm overflow-hidden flex flex-col hover:border-[#B59A68]/50 hover:shadow-md transition-all duration-300"
              >
                {/* Image */}
                <div className="aspect-square bg-[#17191B] overflow-hidden relative">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover filter brightness-[0.88] group-hover:brightness-100 group-hover:scale-105 transition-all duration-500"
                  />
                  {/* Material badge */}
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-[#17191B]/80 backdrop-blur-sm rounded-sm">
                    <span className="text-[8px] font-mono text-[#B59A68] font-bold uppercase tracking-wider">
                      {item.finish}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4 flex flex-col gap-1.5 flex-1">
                  <h3 className="text-[11px] font-bold text-[#17191B] uppercase font-sans leading-snug tracking-wide">
                    {item.name}
                  </h3>
                  <span className="text-[9px] font-mono text-[#34383B]/60 uppercase tracking-wider">
                    {item.material}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Footer note */}
          <div className="mt-8 flex items-center gap-4 border-t border-[#34383B]/10 pt-6">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#B59A68]" />
              <span className="text-[9px] font-mono text-[#34383B]/60 uppercase tracking-widest">
                All hardware IS 2629 / IS 1367 compliant
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#B59A68]" />
              <span className="text-[9px] font-mono text-[#34383B]/60 uppercase tracking-widest">
                Custom dimensions available on request
              </span>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="bg-[#17191B] text-[#F5F4EF] p-8 md:p-12 rounded-sm flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-mono tracking-widest text-[#B59A68] uppercase font-bold">
              SITE LOAD CALCULATIONS & AUDITING
            </span>
            <h3 className="text-2xl font-bold font-sans uppercase">
              Need STAAD.Pro load calculations for your project tenders?
            </h3>
            <p className="text-xs text-[#F5F4EF]/70 max-w-xl font-light">
              Send us your site coordinates and module layout. Our engineering desk delivers comprehensive structural calculation packages and PE stamps.
            </p>
          </div>

          <button
            onClick={() => onEnquireClick('Engineering & STAAD.Pro Calculations')}
            className="px-8 py-3.5 bg-[#B59A68] hover:bg-[#c9ae7c] text-[#0d1624] text-xs font-mono font-bold tracking-widest uppercase rounded-sm transition-all duration-300 whitespace-nowrap shadow-md"
          >
            REQUEST ENGINEERING AUDIT →
          </button>
        </div>

      </div>
    </div>
  );
};

export default EngineeringPage;
