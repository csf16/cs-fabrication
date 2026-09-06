import React, { useState } from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

interface StructuresPageProps {
  onEnquireClick?: (service?: string) => void;
}

export const StructuresPage: React.FC<StructuresPageProps> = ({ onEnquireClick }) => {
  useSEO({
    title: 'Solar Mounting Structures | Ground Mount, Rooftop & Carport Systems — CSF',
    description:
      'Central Structure Fabrication (CSF) manufactures engineered solar mounting structures: ground mount fixed tilt, rooftop racking, solar carports, single-axis trackers, and agri-PV systems. IS 2062 Grade steel, hot-dip galvanized, rated for 200 km/h wind loads.',
    keywords:
      'solar mounting structures, ground mount solar racking, rooftop solar mounting, solar carport structures, single axis solar tracker, IS 2062 steel structures, hot dip galvanized solar frames, solar structure manufacturer Amroha UP, CSF solar frames',
    canonical: 'https://www.csfabrication.in/structures',
    ogTitle: 'Solar Mounting Structures — Central Structure Fabrication (CSF)',
    ogDescription:
      'Ground mount, rooftop, carport, tracker & custom solar structures. IS 2062 · IS 875 · IS 2629 compliant. Built for dependable performance.',
  });

  const [activeTab, setActiveTab] = useState<string>('all');

  const structures = [
    {
      id: 'ground-mount',
      num: '01',
      title: 'Ground Mounted Fixed Tilt Structure',
      subtitle: 'Utility-Scale Solar Farms & Industrial Ground Racking',
      category: 'utility',
      desc: 'Engineered for utility-scale solar installations, featuring cold-formed slotted C-channel columns with ground ramming or concrete pedestal base plates. Configured with optimized rafter tilt angles and multi-span purlin rails to deliver peak mechanical uplift resistance.',
      windLoad: 'Up to 200 km/h (IS 875 Part 3)',
      material: 'IS 2062 Grade E250 / E350 BR Structural Carbon Steel',
      coating: 'Hot-Dip Galvanized (85+ microns / IS 2629 / ISO 1461)',
      tiltAngle: '10° to 35° (Project-Specific Fixed Tilt)',
      foundation: 'Direct Rammed Post / Pre-Cast Footing / Helical Piles',
      img: '/assets/steel_structure.jpg',
      features: [
        'CNC slotted punch holes eliminate field drilling and on-site torch cutting',
        'Pre-engineered knee-brace triangulation for dynamic wind and seismic resistance',
        'Full compatibility with bifacial solar modules (unshaded rear clearance)',
        'Hot-dip galvanized coating engineered for 25+ year soil corrosion resistance',
      ],
    },
    {
      id: 'rooftop',
      num: '02',
      title: 'Rooftop Solar Mounting Structures',
      subtitle: 'Commercial Metal Sheds, Concrete RCC & Ballasted Roofs',
      category: 'commercial',
      desc: 'Lightweight high-strength mounting systems engineered for industrial shed roofs, trapezoidal sheet claddings, and flat RCC roofs. Preserves membrane waterproofing with non-penetrating seam clamps or chemical anchor systems.',
      windLoad: 'Up to 160 km/h',
      material: 'High-Grade Hot-Dip Galvanized Steel / Aluminium 6063-T6',
      coating: 'HDG Steel 80+ µm / Anodized 15µm Aluminium',
      tiltAngle: '5° to 25° / Elevated Tin Shed Mount',
      foundation: 'Direct Seam Clamp / Ballast Trays / Chemical Anchor Fasteners',
      img: '/assets/custom_metal.jpg',
      features: [
        'Non-penetrating standing seam clamps for metal profile roofs',
        'Optimized structural sections reducing roof dead-load distribution',
        'EPDM protective rubber isolators preventing galvanic corrosion',
        'Ballasted concrete block trays for flat RCC commercial terraces',
      ],
    },
    {
      id: 'carport',
      num: '03',
      title: 'Solar Carports & High-Clearance Canopies',
      subtitle: 'Long-Span Commercial & Institutional Vehicle Canopies',
      category: 'commercial',
      desc: 'Architectural structural steel canopies combining wide vehicular column spacing with overhead solar power generation. Features integrated water management channels and concealed wire conduits.',
      windLoad: 'Up to 180 km/h (Seismic Zone Compliant)',
      material: 'IS 2062 Heavy Section Columns + 80×40 / 60×40 Purlins',
      coating: 'Class 1 Hot-Dip Galvanizing (85+ µm)',
      tiltAngle: '5° to 15° Water-Shedding Slope',
      foundation: 'Reinforced Concrete Pedestal Footings with Anchor Cages',
      img: '/assets/steel_structure.jpg',
      features: [
        'Long-span clearance supporting 2 to 4 vehicles per bay span',
        'Integrated gutter channels for rainwater diversion and management',
        'High-clearance column profiles accommodating commercial delivery vans',
        'Pre-drilled base plates for rapid bolt-down anchor installation',
      ],
    },
    {
      id: 'tracker',
      num: '04',
      title: 'Single-Axis Solar Tracker Structures',
      subtitle: 'High-Torsional Resistance Rotating Torque Tube Frameworks',
      category: 'utility',
      desc: 'Robust torque tube and bearing mounting frameworks designed to withstand high torsional flutter and dynamic aerodynamic turbulence during tracker movement.',
      windLoad: 'Up to 190 km/h (Dynamic FEA Simulation Certified)',
      material: 'Cold-Formed High Tensile Steel (YS 350+ MPa)',
      coating: 'Continuous Pre-Galvanized 550 GSM / Hot-Dip Galvanized',
      tiltAngle: '±60° Continuous Rotational Tracking',
      foundation: 'Rammed H-Beam / Heavy C-Channel Driven Columns',
      img: '/assets/precision_prototyping.jpg',
      features: [
        'Engineered torsional stiffness minimizing aeroelastic galloping',
        'High-precision spherical bearing brackets with tight axial tolerances',
        'Optimized center-of-gravity reducing motor drive torque demand',
        'Modular span links accommodating terrain undulations up to 20%',
      ],
    },
    {
      id: 'custom',
      num: '05',
      title: 'Custom Fabrications & Agri-PV Systems',
      subtitle: 'Elevated High-Clearance, Canal-Top & Coastal Structures',
      category: 'custom',
      desc: 'Bespoke steel structures tailored for complex site topographies, agri-photovoltaic overhead farming clearances, canal-top solar frameworks, and aggressive coastal environments.',
      windLoad: 'Site-Specific Structural Calculations (up to 220 km/h)',
      material: 'Custom IS 2062 Steel, SS304 Fasteners & Marine Coatings',
      coating: 'Duplex Coating (HDG 85+ µm + Protective Polyurethane)',
      tiltAngle: 'Fully Customized to Site Azimuth and Sun Path',
      foundation: 'Custom Pile Caps / Pier Mounts / Retaining Walls',
      img: '/assets/custom_metal.jpg',
      features: [
        'Comprehensive 3D CAD modeling with FEA stress analysis',
        'Tailored column clearances up to 5 meters for agricultural equipment',
        'Specialized heavy zinc coatings for aggressive coastal and saline soil',
        'Rapid turnaround on prototype roll-forming and custom slot punching',
      ],
    },
  ];

  const filteredStructures = activeTab === 'all'
    ? structures
    : structures.filter((s) => s.category === activeTab);

  return (
    <div className="w-full pt-32 pb-24 bg-[#FFFFFF] text-[#0F2130]">
      <div className="max-w-[1340px] mx-auto px-6 md:px-12 lg:px-20">
        
        {/* Page Header */}
        <div className="flex flex-col gap-4 mb-16 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0049CA]/10 border border-[#0049CA]/20 text-[#0049CA] text-xs font-semibold uppercase tracking-wider w-fit">
            <span className="w-2 h-2 rounded-full bg-[#0049CA]" />
            <span>Structural Product Portfolio</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#0F2130] tracking-tight leading-[1.08] uppercase">
            Solar Mounting Structures
          </h1>

          <p className="text-base sm:text-lg text-[#647488] font-normal leading-relaxed">
            Engineered structural frameworks fabricated from certified high-tensile structural steel (IS 2062). Designed, FEA-simulated, and manufactured for dependable 25+ year project performance.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'all', label: 'All Structures (5)' },
              { id: 'utility', label: 'Utility Ground Mount & Trackers (2)' },
              { id: 'commercial', label: 'Rooftops & Carports (2)' },
              { id: 'custom', label: 'Custom & Agri-PV (1)' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-[#0049CA] text-white shadow-md shadow-[#0049CA]/20'
                    : 'bg-[#F8FAFC] text-[#647488] hover:bg-[#E5E7EB] hover:text-[#0F2130]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Detailed Structures Cards */}
        <div className="flex flex-col gap-12">
          {filteredStructures.map((item, idx) => (
            <div
              key={item.id}
              id={item.id}
              className="bg-[#F8FAFC] border border-[#E5E7EB] hover:border-[#0049CA]/40 rounded-2xl p-6 sm:p-10 flex flex-col lg:flex-row gap-10 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              {/* Left Column: Image & Badges (5 cols) */}
              <div className="w-full lg:w-[45%] flex flex-col justify-between gap-6">
                <div className="relative aspect-[16/11] rounded-xl overflow-hidden bg-[#0F2130] border border-[#E5E7EB]">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover filter brightness-90"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-lg shadow-sm border border-white/20">
                    <span className="text-[10px] font-bold text-[#0049CA] uppercase tracking-wider">
                      STRUCTURE 0{idx + 1}
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4 px-3 py-1 bg-[#0F2130]/90 backdrop-blur-md rounded-lg border border-white/10">
                    <span className="text-[10px] text-white font-semibold uppercase tracking-wider">
                      {item.windLoad.split('(')[0]}
                    </span>
                  </div>
                </div>

                {/* Technical Quick Spec Grid */}
                <div className="grid grid-cols-2 gap-3 bg-white p-5 rounded-xl border border-[#E5E7EB] text-xs">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] text-[#647488] uppercase font-semibold">Steel Grade</span>
                    <span className="text-[#0F2130] font-bold">{item.material.split('/')[0]}</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] text-[#647488] uppercase font-semibold">Zinc Coating</span>
                    <span className="text-[#0049CA] font-bold">{item.coating.split('(')[0]}</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] text-[#647488] uppercase font-semibold">Tilt Range</span>
                    <span className="text-[#0F2130] font-bold">{item.tiltAngle}</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] text-[#647488] uppercase font-semibold">Foundation</span>
                    <span className="text-[#0F2130] font-bold">{item.foundation.split('/')[0]}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Details & Engineering Highlights (7 cols) */}
              <div className="w-full lg:w-[55%] flex flex-col justify-between gap-6 select-none">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#0049CA] uppercase tracking-wider">TYPE 0{idx + 1} //</span>
                    <span className="text-xs text-[#647488] uppercase tracking-wider font-medium">{item.subtitle}</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold text-[#0F2130] uppercase tracking-tight">
                    {item.title}
                  </h2>

                  <p className="text-sm text-[#647488] leading-relaxed">
                    {item.desc}
                  </p>

                  <div className="mt-2 flex flex-col gap-2.5 border-t border-[#E5E7EB] pt-4">
                    <span className="text-xs font-bold text-[#0F2130] uppercase tracking-wider">
                      Key Engineering Advantages
                    </span>
                    {item.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-[#0F2130]">
                        <CheckCircle2 className="w-4 h-4 text-[#0049CA] flex-shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E5E7EB] flex flex-wrap items-center justify-between gap-4">
                  <button
                    onClick={() => {
                      if (onEnquireClick) onEnquireClick(item.title);
                      const formEl = document.getElementById('request-a-call');
                      if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-6 py-3 bg-[#0049CA] hover:bg-[#003bb0] text-white text-xs font-semibold tracking-wider uppercase rounded-xl transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
                  >
                    <span>Request Quotation For This Structure</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Structural Comparison Matrix */}
        <div className="mt-20 bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl p-8 md:p-12 overflow-x-auto shadow-sm">
          <SectionHeading
            badge="Engineering Verification"
            title="Structural Comparison Matrix"
            desc="Direct technical parameters comparison across all CSF structural profiles."
          />

          <table className="w-full text-left text-xs mt-6 border-collapse">
            <thead>
              <tr className="border-b-2 border-[#E5E7EB] text-[#647488] text-[11px] font-semibold tracking-wider uppercase">
                <th className="py-3.5 px-4">Profile Model</th>
                <th className="py-3.5 px-4">Steel / Alloy Grade</th>
                <th className="py-3.5 px-4">Zinc Thickness</th>
                <th className="py-3.5 px-4">Max Wind Surge</th>
                <th className="py-3.5 px-4">Standard Warranty</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB] text-[#0F2130]">
              <tr className="hover:bg-white transition-colors">
                <td className="py-4 px-4 font-bold">Fixed Tilt Ground Mount</td>
                <td className="py-4 px-4">IS 2062 Grade E250 / E350</td>
                <td className="py-4 px-4 text-[#0049CA] font-bold">85+ Microns (IS 2629)</td>
                <td className="py-4 px-4">200 km/h</td>
                <td className="py-4 px-4">25 Years</td>
              </tr>
              <tr className="hover:bg-white transition-colors">
                <td className="py-4 px-4 font-bold">Rooftop Strut & Rail</td>
                <td className="py-4 px-4">Aluminium 6063-T6 / HDG</td>
                <td className="py-4 px-4 text-[#0049CA] font-bold">80+ µm HDG / 15µm Anodized</td>
                <td className="py-4 px-4">160 km/h</td>
                <td className="py-4 px-4">25 Years</td>
              </tr>
              <tr className="hover:bg-white transition-colors">
                <td className="py-4 px-4 font-bold">Solar Carport Canopy</td>
                <td className="py-4 px-4">IS 2062 Heavy Section</td>
                <td className="py-4 px-4 text-[#0049CA] font-bold">85+ Microns HDG</td>
                <td className="py-4 px-4">180 km/h</td>
                <td className="py-4 px-4">25 Years</td>
              </tr>
              <tr className="hover:bg-white transition-colors">
                <td className="py-4 px-4 font-bold">Single-Axis Tracker Frame</td>
                <td className="py-4 px-4">High Tensile YS 350+ MPa</td>
                <td className="py-4 px-4 text-[#0049CA] font-bold">Pre-Galv 550 GSM / HDG</td>
                <td className="py-4 px-4">190 km/h</td>
                <td className="py-4 px-4">25 Years</td>
              </tr>
              <tr className="hover:bg-white transition-colors">
                <td className="py-4 px-4 font-bold">Custom & Agri-PV Canopy</td>
                <td className="py-4 px-4">Custom Carbon / SS304</td>
                <td className="py-4 px-4 text-[#0049CA] font-bold">Duplex / Marine HDG</td>
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
