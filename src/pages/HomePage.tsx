import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Hero3D } from '../components/Hero3D';
import { SectionHeading } from '../components/SectionHeading';
import { GallerySection } from '../components/GallerySection';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

interface HomePageProps {
  onEnquireClick: (service?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onEnquireClick: _onEnquireClick }) => {
  useSEO({
    title: 'Central Structure Fabrication | Solar Mounting Structure & C-Channel Manufacturer — Amroha, UP',
    description:
      'Central Structure Fabrication manufactures precision-engineered solar mounting structures, hot-dip galvanized C-channel steel, and ground mount racking systems for utility, commercial, and rooftop solar projects across India.',
    keywords:
      'solar mounting structure manufacturer India, solar structure supplier UP, ground mount solar racking, rooftop solar structure, solar carport structure, C channel steel, hot dip galvanized solar frames, solar EPC supplier, solar frame manufacturer UP, IS 2062 structural steel',
    canonical: 'https://www.csfabrication.in/',
    ogTitle: 'CS Fabrication — Solar Mounting Structure Manufacturer, Mumbai',
    ogDescription:
      'Precision hot-dip galvanized solar mounting structures. Ground mount, rooftop, carport, tracker systems. IS 2062 · IS 875 · IS 2629 compliant. 150+ MW deployed.',
  });

  const [activeProcessStep, setActiveProcessStep] = useState(0);

  const processSteps = [
    {
      num: '01',
      title: 'CONCEPT',
      desc: 'Initial site analysis, geotechnical data assessment, wind speed parameters evaluation, and preliminary static loads calculation.',
      tech: 'WIND PARAMETERS: UP TO 200 KM/H // SOIL REPORT AUDITING'
    },
    {
      num: '02',
      title: 'ENGINEERING',
      desc: 'Finite Element Analysis (FEA) testing of the steel members to optimize steel thickness (1.5mm to 3.2mm) and C-channel profile dimensions.',
      tech: 'STAAD.PRO SIMULATIONS // BENDING MOMENT EVALUATION'
    },
    {
      num: '03',
      title: 'DESIGN',
      desc: 'High-precision 3D CAD modeling of columns, rafters, purlins, diagonal wind bracing, and custom bolted connection elements.',
      tech: 'SOLIDWORKS MODELLING // 3D INTERFERENCE DETECTION'
    },
    {
      num: '04',
      title: 'FABRICATION',
      desc: 'Automated cold-rolling of steel coils, high-precision slot punching, and robot-assisted plasma cutting of custom steel sheets.',
      tech: 'CNC COLD ROLL FORMING // PUNCHING TOLERANCE: ±0.1MM'
    },
    {
      num: '05',
      title: 'FINISHING',
      desc: 'Hot-dip galvanization of all steel structures to ensure long-term corrosion resistance in harsh, coastal or chemical environments.',
      tech: 'IS 2629 COMPLIANCE // COATING THICKNESS: 85+ MICRONS'
    },
    {
      num: '06',
      title: 'QUALITY',
      desc: 'Non-destructive testing (NDT), zinc coating thickness verification, and tension testing of bolted connections under extreme stress.',
      tech: 'NDT WELD ANALYSIS // ULTRASONIC THICKNESS AUDIT'
    },
    {
      num: '07',
      title: 'INSTALLATION',
      desc: 'On-site post ramming, structural frame assembly, and precision alignment checking using laser surveying equipment.',
      tech: 'LASER ALIGNMENT CHECK // GPS Ramming Coordination'
    }
  ];

  const structuresPreview = [
    {
      num: '01',
      title: 'GROUND MOUNTED FIXED TILT',
      desc: 'Heavy-duty structural systems engineered for utility-scale solar farms, featuring post-rammed columns and optimized rafter spacing.',
      specs: 'WIND LOAD: 180 KM/H // MATERIAL: HDG STEEL // ANGLE: 10° - 35°',
      img: '/assets/steel_structure.jpg'
    },
    {
      num: '02',
      title: 'ROOFTOP SOLAR STRUCTURES',
      desc: 'Ballasted or anchored aluminum and steel frame systems engineered to preserve roof membrane integrity and distribute load profiles.',
      specs: 'MATERIAL: AL 6063-T6 / HDG // Ballast Block Compatible',
      img: '/assets/custom_metal.jpg'
    },
    {
      num: '03',
      title: 'SOLAR CARPORTS',
      desc: 'Long-span structural steel canopies combining clean architectural columns with secure overhead solar panel mounting.',
      specs: 'SPAN: UP TO 10 METERS // INTEGRATED DRAINAGE CHANNELS',
      img: '/assets/steel_structure.jpg'
    },
  ];

  return (
    <div className="w-full">
      {/* 1. Hero 3D Interactive Assembly */}
      <Hero3D />

      {/* 2. Engineering Intro */}
      <section className="max-w-[1300px] mx-auto px-6 md:px-12 py-24 md:py-36 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="flex flex-col gap-6">
          <span className="text-[10px] font-mono tracking-[0.25em] text-[#B59A68] uppercase font-bold">
            PHILOSOPHY
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#17191B] uppercase leading-[1.1] font-sans">
            ENGINEERED<br />
            BEFORE IT IS<br />
            FABRICATED.
          </h2>
          <div className="w-16 h-[2px] bg-[#B59A68]" />
          <p className="text-[#34383B] text-base md:text-lg font-light leading-relaxed max-w-lg">
            Every structure begins with engineering. From site wind loads and geotechnical data to metallurgy properties and automated roll-forming, we design structural systems around the demands of the project.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              to="/engineering"
              className="px-6 py-3 bg-[#17191B] hover:bg-[#34383B] text-[#F5F4EF] text-xs font-mono font-bold uppercase tracking-widest rounded-sm transition-all duration-300 shadow-sm flex items-center gap-2"
            >
              <span>EXPLORE ENGINEERING METHODOLOGY</span>
              <ArrowRight className="w-4 h-4 text-[#B59A68]" />
            </Link>
          </div>
        </div>

        {/* Technical CAD SVG Visual */}
        <div className="bg-[#EAE8E1] border border-[#34383B]/10 rounded-sm p-8 md:p-12 relative flex items-center justify-center aspect-[4/3] shadow-inner group overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(52,56,59,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(52,56,59,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
          
          <svg className="w-full h-full stroke-[#34383B]/60 fill-none" strokeWidth="1" viewBox="0 0 400 300">
            <g transform="translate(60, 40)">
              <rect x="20" y="20" width="80" height="200" rx="2" strokeDasharray="3,3" />
              <line x1="20" y1="60" x2="100" y2="60" />
              <line x1="20" y1="180" x2="100" y2="180" />
              <rect x="52" y="40" width="16" height="36" rx="8" stroke="#B59A68" strokeWidth="1.5" />
              <rect x="52" y="102" width="16" height="36" rx="8" stroke="#B59A68" strokeWidth="1.5" />
              <rect x="52" y="164" width="16" height="36" rx="8" stroke="#B59A68" strokeWidth="1.5" />
              <text x="110" y="60" className="text-[8px] font-mono fill-[#34383B]/80 font-bold">SLOT: 14x28mm</text>
              <line x1="100" y1="58" x2="108" y2="58" />
              <text x="110" y="180" className="text-[8px] font-mono fill-[#34383B]/80 font-bold">PITCH: 160mm</text>
              <line x1="100" y1="178" x2="108" y2="178" />
            </g>

            <g transform="translate(240, 60)">
              <path d="M20,20 H80 V40 H70 V30 H30 V90 H70 V80 H80 V100 H20 Z" stroke="#34383B" strokeWidth="1.5" />
              <line x1="20" y1="10" x2="80" y2="10" strokeDasharray="2,2" />
              <path d="M20,10 L25,7 M20,10 L25,13 M80,10 L75,7 M80,10 L75,13" />
              <text x="42" y="5" className="text-[8px] font-mono fill-[#34383B]/80 font-bold">W: 41mm</text>
              
              <line x1="10" y1="20" x2="10" y2="100" strokeDasharray="2,2" />
              <path d="M10,20 L7,25 M10,20 L13,25 M10,100 L7,95 M10,100 L13,95" />
              <text x="-55" y="5" transform="rotate(-90)" className="text-[8px] font-mono fill-[#34383B]/80 font-bold">H: 41mm</text>
              <text x="35" y="60" className="text-[8px] font-mono fill-[#B59A68] font-bold">t: 2.5mm</text>
            </g>

            <rect x="10" y="260" width="380" height="30" stroke="#34383B" strokeOpacity="0.2" />
            <text x="20" y="278" className="text-[9px] font-mono fill-[#34383B] font-bold tracking-widest">
              DWG: CS-STRUT-C41 // MATERIAL: IS 2062 HDG // VER: 4.2
            </text>
          </svg>
          
          <div className="absolute top-4 right-4 px-3 py-1 bg-[#17191B] text-[#F5F4EF] text-[8px] font-mono tracking-widest uppercase border border-[#B59A68] rounded-sm">
            CAD DRAFT // IS 2062
          </div>
        </div>
      </section>

      {/* 3. Solar Structures Portfolio Showcase */}
      <section className="bg-[#EAE8E1] border-y border-[#34383B]/10 py-24 md:py-36">
        <div className="max-w-[1300px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <SectionHeading 
              badge="Product Portfolio" 
              title="Solar Structures" 
              desc="High-performance structural frameworks engineered for utility, commercial, and residential clean energy deployment."
            />
            <Link
              to="/structures"
              className="px-6 py-3 bg-[#17191B] hover:bg-[#34383B] text-[#F5F4EF] text-xs font-mono font-bold uppercase tracking-widest rounded-sm transition-all duration-300 shadow-sm flex items-center gap-2 whitespace-nowrap"
            >
              <span>VIEW ALL 5 STRUCTURE TYPES</span>
              <ArrowRight className="w-4 h-4 text-[#B59A68]" />
            </Link>
          </div>

          <div className="flex flex-col gap-20">
            {structuresPreview.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div 
                  key={item.num}
                  className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${
                    isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  <div className="w-full lg:w-[50%] aspect-[16/10] overflow-hidden border border-[#34383B]/10 rounded-sm relative group shadow-sm bg-[#17191B]">
                    <img 
                      src={item.img} 
                      alt={item.title} 
                      className="w-full h-full object-cover filter brightness-[0.7] grayscale-[15%] transition-transform duration-700 ease-out group-hover:scale-105 group-hover:brightness-[0.85] group-hover:grayscale-0"
                    />
                    <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[#B59A68] opacity-75" />
                    <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[#B59A68] opacity-75" />
                  </div>

                  <div className="w-full lg:w-[50%] flex flex-col gap-5 select-none">
                    <span className="text-sm font-mono text-[#B59A68] font-bold">{item.num}</span>
                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-[#17191B] uppercase font-sans">
                      {item.title}
                    </h3>
                    <p className="text-[#34383B] text-sm md:text-base font-light leading-relaxed max-w-md">
                      {item.desc}
                    </p>
                    <div className="border-t border-[#34383B]/10 pt-4 flex flex-col gap-1">
                      <span className="text-[9px] font-mono text-[#34383B]/50 uppercase tracking-widest font-bold">
                        TECHNICAL PARAMETERS
                      </span>
                      <span className="text-[10px] font-mono text-[#B59A68] tracking-wider uppercase font-bold">
                        {item.specs}
                      </span>
                    </div>
                    <div className="flex gap-4 pt-2">
                      <Link 
                        to="/structures"
                        className="text-xs font-bold tracking-widest text-[#17191B] hover:text-[#B59A68] transition-colors duration-300 w-fit uppercase flex items-center gap-1 group"
                      >
                        FULL SPECIFICATIONS & DIAGRAMS &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Project & Manufacturing Gallery */}
      <GallerySection />

      {/* 6. Engineering Process Workflow Tabs */}
      <section className="max-w-[1300px] mx-auto px-6 md:px-12 py-24 md:py-36">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <SectionHeading 
            badge="Methodology" 
            title="From Concept to Structure" 
            desc="Our step-by-step industrial engineering workflow ensures flawless load-bearing profiles and 25+ year lifetimes."
          />
          <Link
            to="/engineering"
            className="px-6 py-3 bg-[#17191B] hover:bg-[#34383B] text-[#F5F4EF] text-xs font-mono font-bold uppercase tracking-widest rounded-sm transition-all duration-300 shadow-sm flex items-center gap-2 whitespace-nowrap"
          >
            <span>DEEP DIVE FEA & WIND CODES</span>
            <ArrowRight className="w-4 h-4 text-[#B59A68]" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start mt-8">
          <div className="lg:col-span-1 flex flex-col border-l border-[#34383B]/15">
            {processSteps.map((step, idx) => (
              <button
                key={step.num}
                onClick={() => setActiveProcessStep(idx)}
                className={`py-4 px-6 text-left border-l-2 transition-all duration-300 ${
                  activeProcessStep === idx
                    ? 'border-[#B59A68] bg-[#EAE8E1]/50 text-[#17191B] font-bold'
                    : 'border-transparent text-[#34383B]/50 hover:text-[#34383B] font-normal'
                }`}
              >
                <div className="flex items-center gap-4 text-xs font-mono tracking-widest uppercase">
                  <span>{step.num}</span>
                  <span>{step.title}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="lg:col-span-2 bg-[#EAE8E1] border border-[#34383B]/10 rounded-sm p-8 md:p-12 min-h-[300px] flex flex-col justify-between shadow-inner select-none relative overflow-hidden">
            <div className="flex flex-col gap-6">
              <span className="text-[10px] font-mono tracking-widest text-[#B59A68] font-bold">
                PROCESS PHASE {processSteps[activeProcessStep].num} // {processSteps[activeProcessStep].title}
              </span>
              <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight text-[#17191B] font-sans">
                {processSteps[activeProcessStep].title}
              </h3>
              <p className="text-[#34383B] text-sm md:text-base font-light leading-relaxed max-w-xl">
                {processSteps[activeProcessStep].desc}
              </p>
            </div>

            <div className="border-t border-[#34383B]/15 pt-6 mt-8 flex flex-col gap-1.5">
              <span className="text-[9px] font-mono text-[#34383B]/50 uppercase tracking-widest font-bold">
                METADATA STANDARDS
              </span>
              <span className="text-xs font-mono text-[#17191B] tracking-wider font-bold">
                {processSteps[activeProcessStep].tech}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Precision & Benchmarks */}
      <section className="bg-[#17191B] text-[#F5F4EF] py-24 md:py-36 select-none">
        <div className="max-w-[1300px] mx-auto px-6 md:px-12">
          <SectionHeading 
            badge="Performance Benchmarks" 
            title="Built for Precision" 
            light
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 border-b border-[#F5F4EF]/10 pb-16">
            <div className="flex flex-col gap-4">
              <span className="text-xs font-mono text-[#B59A68] tracking-widest font-bold">YS 250/350</span>
              <h3 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#F5F4EF] font-sans">
                STRENGTH
              </h3>
              <p className="text-[#F5F4EF]/60 text-xs font-sans leading-relaxed font-light">
                Cold-formed structural steel members designed to withstand heavy static PV loading and dynamic localized high wind shears.
              </p>
            </div>
            
            <div className="flex flex-col gap-4">
              <span className="text-xs font-mono text-[#B59A68] tracking-widest font-bold">TOLERANCE ±0.1mm</span>
              <h3 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#F5F4EF] font-sans">
                PRECISION
              </h3>
              <p className="text-[#F5F4EF]/60 text-xs font-sans leading-relaxed font-light">
                High-speed CNC roll forming and slot punching line parameters guarantee perfect grid alignment during site post assembly.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <span className="text-xs font-mono text-[#B59A68] tracking-widest font-bold">25+ YEAR LIFETIME</span>
              <h3 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#F5F4EF] font-sans">
                DURABILITY
              </h3>
              <p className="text-[#F5F4EF]/60 text-xs font-sans leading-relaxed font-light">
                Hot-dip galvanized zinc coating provides corrosion-proof shield, maintaining mechanical integrity in extreme soil or chemical areas.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-16 text-xs font-mono tracking-widest">
            <div className="flex flex-col gap-2">
              <span className="text-[#B59A68] font-bold">ENGINEERED WIND RESISTANCE</span>
              <span className="text-[#F5F4EF] font-light">Up to 200 km/h structures</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[#B59A68] font-bold">STRUCTURAL MATERIAL GRADE</span>
              <span className="text-[#F5F4EF] font-light">IS 2062 / ASTM A36</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[#B59A68] font-bold">ZINC GALVANIZING SPEC</span>
              <span className="text-[#F5F4EF] font-light">85+ Microns // IS 2629</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[#B59A68] font-bold">DESIGN CALCULATION COMPLIANCE</span>
              <span className="text-[#F5F4EF] font-light">IS 875 Parts 1-3 // ASCE 7-10</span>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Call to Action Banner */}
      <section className="max-w-[1300px] mx-auto px-6 md:px-12 py-24 flex flex-col md:flex-row justify-between items-start md:items-center gap-10 select-none">
        <div className="flex flex-col gap-4">
          <span className="text-[10px] font-mono tracking-[0.25em] text-[#B59A68] uppercase font-bold">
            LET'S CONSTRUCT
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#17191B] uppercase font-sans">
            LET'S BUILD WHAT'S NEXT.
          </h2>
          <p className="text-xs text-[#34383B]/80 font-light max-w-lg">
            Connect with our structural desk to calculate steel tonnage, wind load configurations, and custom profile extrusion requirements.
          </p>
        </div>

        <div className="flex gap-4">
          <Link 
            to="/contact"
            className="px-6 py-4 bg-[#17191B] text-[#F5F4EF] hover:bg-[#34383B] transition-all duration-300 text-xs font-bold uppercase tracking-widest rounded-sm flex items-center gap-2 border border-[#17191B]"
          >
            REQUEST A PROPOSAL <ChevronRight className="w-4.5 h-4.5 text-[#B59A68]" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
