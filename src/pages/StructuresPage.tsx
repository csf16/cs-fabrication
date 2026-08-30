import React, { useState } from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

interface StructuresPageProps {
  onEnquireClick: (service?: string) => void;
}

export const StructuresPage: React.FC<StructuresPageProps> = ({ onEnquireClick }) => {
  useSEO({
    title: 'Solar Mounting Structures | Ground Mount, Rooftop & Carport Systems - CS Fabrication',
    description:
      "Explore CS Fabrication's full range of solar mounting structures: ground mounted fixed tilt, rooftop solar frames, solar carports, single-axis trackers, and agri-PV structures. IS 2062 grade steel, hot-dip galvanized, engineered for 200 km/h wind loads.",
    keywords:
      'ground mounted solar structure, rooftop solar mounting frame, solar carport structure, single axis solar tracker, agri PV solar structure, IS 2062 solar frame, hot dip galvanized solar racking, solar mounting structure specifications, solar EPC structure supplier India',
    canonical: 'https://www.csfabrication.in/structures',
    ogTitle: 'Solar Mounting Structures - CS Fabrication',
    ogDescription:
      'Ground mount, rooftop, carport, tracker & agri-PV structures. IS 2062 · IS 875 · IS 2629 compliant. Engineered for wind loads up to 200 km/h.',
  });

  const [activeTab, setActiveTab] = useState<string>('all');

  const structures = [
    {
      id: 'ground-mount',
      num: '01',
      title: 'GROUND MOUNTED FIXED TILT',
      subtitle: 'Utility-Scale Solar Farms & Heavy Industrial Land Racking',
      category: 'utility',
      desc: 'Engineered for utility-scale solar parks, featuring cold-formed slotted C-channel columns with ground ramming or concrete base plates. Configured with optimized rafter tilts and multi-span purlin rails to deliver peak mechanical uplift resistance.',
      windLoad: 'Up to 200 km/h (IS 875 Part 3)',
      material: 'IS 2062 Grade E250 / E350 Structural Carbon Steel',
      coating: 'Hot-Dip Galvanized (85+ microns / IS 2629)',
      tiltAngle: '10° to 35° (Custom Fixed Tilt)',
      foundation: 'Direct Rammed Post / Pre-cast Footing / Helical Piles',
      img: '/assets/steel_structure.jpg',
      features: [
        'CNC slotted punch holes eliminate on-site drilling and cutting',
        'Pre-engineered knee-brace triangulation for dynamic wind gusts',
        'Full compatibility with bifacial solar panels (unshaded rear clearance)',
        'Hot-dip galvanized coating engineered for 25+ year soil corrosive resistance',
      ],
    },
    {
      id: 'rooftop',
      num: '02',
      title: 'ROOFTOP SOLAR MOUNTING STRUCTURES',
      subtitle: 'Commercial Metal Sheds, Concrete RCC & Ballasted Roofs',
      category: 'commercial',
      desc: 'Lightweight high-strength mounting systems engineered for industrial shed roofs, trapezoidal sheet claddings, and flat RCC roofs. Preserves membrane waterproofing with non-penetrating seam clamps or chemical anchor systems.',
      windLoad: 'Up to 160 km/h',
      material: 'Aluminium 6063-T6 / High-Grade Galvanized Steel',
      coating: 'Anodized 15μm / HDG Steel 80μm',
      tiltAngle: '5° to 25° / Flush Mount',
      foundation: 'Direct Seam Clamp / Ballast Blocks / Expansion Fasteners',
      img: '/assets/custom_metal.jpg',
      features: [
        'Non-penetrating standing seam clamps for metal sheet roofs',
        'Lightweight aluminium micro rails reducing structural dead-load',
        'EPDM protective rubber isolators preventing galvanic corrosion',
        'Ballasted concrete block trays for flat RCC commercial terraces',
      ],
    },
    {
      id: 'carport',
      num: '03',
      title: 'SOLAR CARPORTS & ARCHITECTURAL CANOPIES',
      subtitle: 'High-Span Dual/Single Vehicle Parking Canopies',
      category: 'commercial',
      desc: 'Architectural structural steel canopies combining clean vehicular column spacing with overhead solar power generation. Features integrated water management channels and concealed wire raceways.',
      windLoad: 'Up to 180 km/h (Seismic Zone 4 Compliant)',
      material: 'IS 2062 Heavy Section Steel + 41×61 Base Rails',
      coating: 'Hot-Dip Galvanized + Optional Powder Coat',
      tiltAngle: '5° to 15° Water-Shedding Slope',
      foundation: 'Reinforced Concrete Pedestal Footings',
      img: '/assets/steel_structure.jpg',
      features: [
        'Long-span clearance supporting 2 to 4 vehicles per bay span',
        'Concealed cable trays and built-in gutter rain drainage',
        'High-clearance column profiles for SUVs and commercial delivery vans',
        'Pre-drilled base plates for rapid bolt-down anchor installation',
      ],
    },
    {
      id: 'tracker',
      num: '04',
      title: 'SINGLE-AXIS SOLAR TRACKER STRUCTURES',
      subtitle: 'High-Torsional Resistance Rotating Torque Tube Systems',
      category: 'utility',
      desc: 'Robust torque tube and bearing mounting frameworks designed to withstand high torsional flutter and dynamic aerodynamic turbulence during tracker movement.',
      windLoad: 'Up to 190 km/h (Dynamic FEA Simulation Certified)',
      material: 'Cold-Formed High Tensile Steel (YS 350+ MPa)',
      coating: 'Continuous Pre-Galvanized / Hot-Dip Galvanized',
      tiltAngle: '±60° Continuous Rotational Tracking',
      foundation: 'Rammed H-Beam / C-Channel Driven Columns',
      img: '/assets/precision_prototyping.jpg',
      features: [
        'Engineered torsional stiffness minimizing aeroelastic galloping',
        'High-precision machined spherical bearing brackets',
        'Optimized center-of-gravity for lower motor drive torque',
        'Modular span links for terrain slopes up to 20%',
      ],
    },
    {
      id: 'custom',
      num: '05',
      title: 'CUSTOM STRUCTURAL FABRICATION',
      subtitle: 'Agri-PV, Canal Top, Elevated & Coastal High-Load Systems',
      category: 'custom',
      desc: 'Bespoke steel structures tailored for complex site topographies, agri-photovoltaic overhead farming clearances, canal-top solar frameworks, and aggressive coastal environments.',
      windLoad: 'Custom Site-Specific Calculations (up to 220 km/h)',
      material: 'Custom Carbon Steel, SS304/316 & Marine Aluminium',
      coating: 'Duplex Coating (HDG + Epoxy / Marine Grade)',
      tiltAngle: 'Fully Customized to Site Azimuth',
      foundation: 'Custom Pile Caps / Pier Mounts / Retaining Walls',
      img: '/assets/custom_metal.jpg',
      features: [
        'Comprehensive 3D CAD modeling with FEA stress analysis',
        'Tailored column heights up to 5 meters for agricultural equipment',
        'Specialized marine coatings for aggressive coastal and saline soil',
        'Rapid turn-around on prototype roll-forming and custom punching',
      ],
    },
  ];

  const filteredStructures = activeTab === 'all'
    ? structures
    : structures.filter((s) => s.category === activeTab);

  return (
    <div className="w-full pt-28 pb-24 bg-[#F5F4EF]">
      <div className="max-w-[1300px] mx-auto px-6 md:px-12">
        
        {/* Page Header */}
        <div className="flex flex-col gap-4 mb-14">
          <div className="flex items-center gap-3">
            <div className="w-8 h-[1px] bg-[#B59A68]" />
            <span className="text-[10px] font-mono tracking-[0.35em] text-[#B59A68] uppercase font-bold">
              CS FABRICATION // STRUCTURAL SYSTEMS
            </span>
            <div className="w-8 h-[1px] bg-[#B59A68]" />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#17191B] tracking-tight font-sans uppercase">
            Solar Mounting Structures
          </h1>

          <p className="text-base text-[#34383B] max-w-2xl font-light leading-relaxed">
            Engineered structural frameworks fabricated from certified high-tensile structural steel and marine-grade aluminium. Designed and FEA-tested to withstand up to 200 km/h wind surges.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 mt-2">
            {[
              { id: 'all', label: 'All Structures (5)' },
              { id: 'utility', label: 'Utility Ground Mount & Trackers (2)' },
              { id: 'commercial', label: 'Rooftops & Carports (2)' },
              { id: 'custom', label: 'Custom & Agri-PV (1)' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-xs font-mono tracking-wider uppercase rounded-sm transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-[#17191B] text-[#F5F4EF] font-bold shadow-sm'
                    : 'bg-[#EAE8E1] hover:bg-white text-[#34383B] border border-[#34383B]/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Detailed Structures Cards */}
        <div className="flex flex-col gap-20">
          {filteredStructures.map((item, idx) => (
            <div
              key={item.id}
              id={item.id}
              className="bg-[#EAE8E1] border border-[#34383B]/15 rounded-sm overflow-hidden p-8 md:p-12 flex flex-col lg:flex-row gap-12 shadow-sm"
            >
              {/* Left Column: Image & Badges */}
              <div className="w-full lg:w-[45%] flex flex-col gap-6">
                <div className="relative aspect-[16/11] rounded-sm overflow-hidden bg-[#17191B] border border-[#34383B]/20">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover filter brightness-[0.8]"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-[#17191B]/90 backdrop-blur-sm border border-[#B59A68] rounded-sm">
                    <span className="text-[10px] font-mono tracking-widest text-[#B59A68] font-bold">
                      PROFILE 0{idx + 1}
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/80 backdrop-blur-sm rounded-sm">
                    <span className="text-[9px] font-mono text-[#F5F4EF] uppercase tracking-wider">
                      {item.windLoad}
                    </span>
                  </div>
                </div>

                {/* Technical Quick Spec Grid */}
                <div className="grid grid-cols-2 gap-3 bg-[#F5F4EF] p-5 rounded-sm border border-[#34383B]/10 text-xs font-mono">
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] text-[#34383B]/50 uppercase font-bold">STEEL GRADE</span>
                    <span className="text-[#17191B] font-bold text-[10px]">{item.material.split('/')[0]}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] text-[#34383B]/50 uppercase font-bold">GALVANIZING</span>
                    <span className="text-[#B59A68] font-bold text-[10px]">{item.coating.split('(')[0]}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] text-[#34383B]/50 uppercase font-bold">TILT RANGE</span>
                    <span className="text-[#17191B] font-bold text-[10px]">{item.tiltAngle}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] text-[#34383B]/50 uppercase font-bold">FOUNDATION</span>
                    <span className="text-[#17191B] font-bold text-[10px]">{item.foundation.split('/')[0]}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Details & Engineering Highlights */}
              <div className="w-full lg:w-[55%] flex flex-col justify-between gap-6 select-none">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-[#B59A68] font-bold">TYPE 0{idx + 1} //</span>
                    <span className="text-xs font-mono text-[#34383B]/60 uppercase tracking-wider">{item.subtitle}</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17191B] uppercase font-sans tracking-tight">
                    {item.title}
                  </h2>

                  <p className="text-sm text-[#34383B] font-light leading-relaxed">
                    {item.desc}
                  </p>

                  <div className="mt-4 flex flex-col gap-2.5 border-t border-[#34383B]/10 pt-4">
                    <span className="text-[9px] font-mono text-[#34383B]/60 uppercase tracking-widest font-bold">
                      KEY ENGINEERING ADVANTAGES
                    </span>
                    {item.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-[#34383B]">
                        <CheckCircle2 className="w-4 h-4 text-[#B59A68] flex-shrink-0 mt-0.5" />
                        <span className="font-light">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-[#34383B]/10 flex flex-wrap items-center justify-between gap-4">
                  <button
                    onClick={() => onEnquireClick(item.title)}
                    className="px-6 py-3 bg-[#17191B] hover:bg-[#34383B] text-[#F5F4EF] text-xs font-mono font-bold tracking-widest uppercase rounded-sm transition-all duration-300 shadow-sm flex items-center gap-2"
                  >
                    <span>REQUEST SPECIFICATIONS FOR {item.title.split(' ')[0]}</span>
                    <ArrowRight className="w-4 h-4 text-[#B59A68]" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Structural Comparison Matrix */}
        <div className="mt-24 bg-[#EAE8E1] border border-[#34383B]/15 rounded-sm p-8 md:p-12 overflow-x-auto shadow-sm">
          <SectionHeading
            badge="Engineering Specs"
            title="Structural Comparison Matrix"
            desc="Direct technical specifications comparison across all CS structural profiles."
          />

          <table className="w-full text-left text-xs font-mono mt-8 border-collapse">
            <thead>
              <tr className="border-b-2 border-[#34383B]/20 text-[#34383B]/60 text-[10px] tracking-wider uppercase">
                <th className="py-3 px-4">Profile Model</th>
                <th className="py-3 px-4">Steel / Alloy Grade</th>
                <th className="py-3 px-4">Zinc Thickness</th>
                <th className="py-3 px-4">Max Wind Surge</th>
                <th className="py-3 px-4">Standard Warranty</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#34383B]/10 text-[#17191B]">
              <tr className="hover:bg-[#F5F4EF]/60">
                <td className="py-4 px-4 font-bold">Fixed Tilt Ground Mount</td>
                <td className="py-4 px-4">IS 2062 Grade E250/E350</td>
                <td className="py-4 px-4 text-[#B59A68] font-bold">85+ Microns (IS 2629)</td>
                <td className="py-4 px-4">200 km/h</td>
                <td className="py-4 px-4">25 Years</td>
              </tr>
              <tr className="hover:bg-[#F5F4EF]/60">
                <td className="py-4 px-4 font-bold">Rooftop Strut & Micro Rail</td>
                <td className="py-4 px-4">Aluminium 6063-T6 / HDG</td>
                <td className="py-4 px-4 text-[#B59A68] font-bold">15μm Anodized</td>
                <td className="py-4 px-4">160 km/h</td>
                <td className="py-4 px-4">25 Years</td>
              </tr>
              <tr className="hover:bg-[#F5F4EF]/60">
                <td className="py-4 px-4 font-bold">Solar Carport Canopy</td>
                <td className="py-4 px-4">IS 2062 Heavy Section</td>
                <td className="py-4 px-4 text-[#B59A68] font-bold">85+ Microns HDG</td>
                <td className="py-4 px-4">180 km/h</td>
                <td className="py-4 px-4">25 Years</td>
              </tr>
              <tr className="hover:bg-[#F5F4EF]/60">
                <td className="py-4 px-4 font-bold">Single-Axis Tracker Frame</td>
                <td className="py-4 px-4">High Tensile YS 350+ MPa</td>
                <td className="py-4 px-4 text-[#B59A68] font-bold">Pre-Galv 550 GSM / HDG</td>
                <td className="py-4 px-4">190 km/h</td>
                <td className="py-4 px-4">25 Years</td>
              </tr>
              <tr className="hover:bg-[#F5F4EF]/60">
                <td className="py-4 px-4 font-bold">Custom & Agri-PV Canopy</td>
                <td className="py-4 px-4">Custom Carbon / SS304</td>
                <td className="py-4 px-4 text-[#B59A68] font-bold">Duplex / Marine HDG</td>
                <td className="py-4 px-4">Up to 220 km/h</td>
                <td className="py-4 px-4">25 Years</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StructuresPage;
