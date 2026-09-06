import React, { useState } from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface ProfileSpec {
  id: string;
  name: string;
  category: string;
  tagline: string;
  dimensions: {
    webWidth: string;
    flangeHeight: string;
    lipDepth: string;
    thickness: string;
    weightPerMeter: string;
  };
  mechanical: {
    steelGrade: string;
    yieldStrength: string;
    tensileStrength: string;
    coatingOptions: string;
    slotPattern: string;
  };
  applications: string[];
}

const PROFILES: ProfileSpec[] = [
  {
    id: 'c41-41',
    name: '41 × 41 mm Slotted Strut Channel',
    category: 'Standard Structural Strut',
    tagline: 'The industry-benchmark solar mounting and modular support channel.',
    dimensions: {
      webWidth: '41.3 mm (±0.2mm)',
      flangeHeight: '41.3 mm (±0.2mm)',
      lipDepth: '10.0 mm inward curl',
      thickness: '2.0 mm / 2.5 mm / 3.0 mm',
      weightPerMeter: '2.42 kg/m (at 2.5mm t)',
    },
    mechanical: {
      steelGrade: 'IS 2062 E250 / E350 BR, ASTM A36',
      yieldStrength: 'Min 250 - 350 MPa',
      tensileStrength: '410 - 490 MPa',
      coatingOptions: 'Hot-Dip Galvanized (85+ µm, IS 2629) / Pre-Galv 275 GSM',
      slotPattern: '14 × 28 mm oval slots on 50mm / 160mm centers',
    },
    applications: [
      'Solar purlins and rafter cross-beams',
      'Ground mount utility tracker brackets',
      'Industrial pipe racks and MEP cable tray supports',
      'Elevated rooftop solar framing',
    ],
  },
  {
    id: 'c41-21',
    name: '41 × 21 mm Shallow Strut Channel',
    category: 'Low-Profile Framing',
    tagline: 'Engineered for compact rooftop arrays and lightweight structural mounting.',
    dimensions: {
      webWidth: '41.3 mm (±0.2mm)',
      flangeHeight: '21.0 mm (±0.2mm)',
      lipDepth: '8.5 mm inward curl',
      thickness: '1.6 mm / 2.0 mm / 2.5 mm',
      weightPerMeter: '1.65 kg/m (at 2.0mm t)',
    },
    mechanical: {
      steelGrade: 'IS 2062 E250 / ASTM A1011',
      yieldStrength: 'Min 250 MPa',
      tensileStrength: '410 MPa',
      coatingOptions: 'Hot-Dip Galvanized (80+ µm) / Pre-Galv / Galvalume AZ150',
      slotPattern: '14 × 28 mm slots or plain solid web',
    },
    applications: [
      'Residential and light commercial flush rooftop mounts',
      'Cable tray containment and wire management',
      'Secondary structural framing and trim brackets',
    ],
  },
  {
    id: 'c60-40',
    name: '60 × 40 mm Mounting Rafter Rail',
    category: 'Medium-Duty Beam',
    tagline: 'High torsional rigidity for extended spans and demanding wind zones.',
    dimensions: {
      webWidth: '60.0 mm (±0.3mm)',
      flangeHeight: '40.0 mm (±0.3mm)',
      lipDepth: '12.0 mm return lip',
      thickness: '2.0 mm / 2.5 mm / 3.2 mm',
      weightPerMeter: '3.15 kg/m (at 2.5mm t)',
    },
    mechanical: {
      steelGrade: 'IS 2062 E350 (High Tensile)',
      yieldStrength: 'Min 350 MPa',
      tensileStrength: '490 MPa',
      coatingOptions: 'Hot-Dip Galvanized 85+ µm (IS 2629 / ISO 1461)',
      slotPattern: 'Custom CNC multi-pitch or punched on demand',
    },
    applications: [
      'Mid-span utility ground mount rafters',
      'Elevated tin shed solar structures',
      'High wind shear perimeter purlins',
    ],
  },
  {
    id: 'c80-40',
    name: '80 × 40 mm Heavy-Duty Purlin',
    category: 'Long-Span Structural Member',
    tagline: 'Maximum load-bearing capacity for extreme span ground mount and carport structures.',
    dimensions: {
      webWidth: '80.0 mm (±0.4mm)',
      flangeHeight: '40.0 mm (±0.3mm)',
      lipDepth: '15.0 mm return lip',
      thickness: '2.5 mm / 3.0 mm / 3.5 mm',
      weightPerMeter: '4.20 kg/m (at 3.0mm t)',
    },
    mechanical: {
      steelGrade: 'IS 2062 E350 BR High Tensile',
      yieldStrength: 'Min 350 MPa',
      tensileStrength: '520 MPa',
      coatingOptions: 'Class 1 Hot-Dip Galvanizing (85 - 100 µm)',
      slotPattern: 'Precision slotted or solid flange with punched end connection holes',
    },
    applications: [
      'Multi-row ground mount table rafters',
      'Commercial solar carports and canopies',
      'Heavy industrial structural trusses and bracing',
    ],
  },
  {
    id: 'custom-sections',
    name: 'Custom Cold-Formed Profiles',
    category: 'Bespoke Engineered Sections',
    tagline: 'Tailored dimensions, custom hole configurations, and proprietary steel grades.',
    dimensions: {
      webWidth: '30 mm to 150 mm custom range',
      flangeHeight: '20 mm to 80 mm custom range',
      lipDepth: 'Configured to design specs',
      thickness: '1.2 mm to 4.0 mm',
      weightPerMeter: 'Custom calculated based on profile',
    },
    mechanical: {
      steelGrade: 'IS 2062 E250 / E350 / E450 / Galvalume',
      yieldStrength: 'Up to 450 MPa',
      tensileStrength: 'Up to 590 MPa',
      coatingOptions: 'HDG 85+ µm / PosMAC / Galvalume / Pre-Galv',
      slotPattern: 'Custom CNC punch tooling to your CAD drawings',
    },
    applications: [
      'Solar tracker torque tubes and bearing mounts',
      'Specialized agrovoltaic high-clearance columns',
      'Proprietary solar module clamping frameworks',
    ],
  },
];

interface TechnicalSpecViewerProps {
  onSelectProfile?: (profileName: string) => void;
}

export const TechnicalSpecViewer: React.FC<TechnicalSpecViewerProps> = ({ onSelectProfile }) => {
  const [selectedProfileId, setSelectedProfileId] = useState<string>('c41-41');
  const profile = PROFILES.find(p => p.id === selectedProfileId) || PROFILES[0];

  return (
    <div className="w-full bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-10 shadow-lg">
      {/* Profile Selector Tabs */}
      <div className="flex flex-wrap gap-2 pb-6 border-b border-[#E5E7EB]">
        {PROFILES.map((p) => {
          const isActive = p.id === selectedProfileId;
          return (
            <button
              key={p.id}
              onClick={() => setSelectedProfileId(p.id)}
              className={`px-4 py-2.5 rounded-none text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-[#0049CA] text-white shadow-md shadow-[#0049CA]/20'
                  : 'bg-[#F8FAFC] text-[#647488] hover:bg-[#E5E7EB] hover:text-[#0F2130]'
              }`}
            >
              {p.id.replace('c', '').replace('-', '×')} mm
            </button>
          );
        })}
      </div>

      {/* Main Spec Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
        {/* Left: Spec Information (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#0049CA] uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-[#0049CA]" />
              <span>{profile.category}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#0F2130] uppercase tracking-tight">
              {profile.name}
            </h3>
            <p className="text-sm text-[#647488] mt-2 leading-relaxed">
              {profile.tagline}
            </p>
          </div>

          {/* Dimension Table */}
          <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl p-5">
            <h4 className="text-xs font-bold text-[#0F2130] uppercase tracking-wider mb-4 pb-2 border-b border-[#E5E7EB]">
              Dimensional Parameters (IS 808 / IS 2062 Standards)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex justify-between py-1.5 border-b border-[#E5E7EB]/60">
                <span className="text-[#647488]">Web Width (W):</span>
                <span className="font-semibold text-[#0F2130]">{profile.dimensions.webWidth}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#E5E7EB]/60">
                <span className="text-[#647488]">Flange Height (H):</span>
                <span className="font-semibold text-[#0F2130]">{profile.dimensions.flangeHeight}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#E5E7EB]/60">
                <span className="text-[#647488]">Return Lip (L):</span>
                <span className="font-semibold text-[#0F2130]">{profile.dimensions.lipDepth}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#E5E7EB]/60">
                <span className="text-[#647488]">Steel Thickness (t):</span>
                <span className="font-semibold text-[#0F2130]">{profile.dimensions.thickness}</span>
              </div>
              <div className="flex justify-between py-1.5 sm:col-span-2">
                <span className="text-[#647488]">Mass Density / Weight:</span>
                <span className="font-semibold text-[#0049CA]">{profile.dimensions.weightPerMeter}</span>
              </div>
            </div>
          </div>

          {/* Mechanical Properties Table */}
          <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl p-5">
            <h4 className="text-xs font-bold text-[#0F2130] uppercase tracking-wider mb-4 pb-2 border-b border-[#E5E7EB]">
              Metallurgical & Coating Specifications
            </h4>
            <div className="grid grid-cols-1 gap-2.5 text-xs">
              <div className="flex flex-col sm:flex-row sm:justify-between py-1 border-b border-[#E5E7EB]/60">
                <span className="text-[#647488]">Steel Grade & Metallurgy:</span>
                <span className="font-semibold text-[#0F2130]">{profile.mechanical.steelGrade}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between py-1 border-b border-[#E5E7EB]/60">
                <span className="text-[#647488]">Yield / Tensile Strength:</span>
                <span className="font-semibold text-[#0F2130]">{profile.mechanical.yieldStrength} / {profile.mechanical.tensileStrength}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between py-1 border-b border-[#E5E7EB]/60">
                <span className="text-[#647488]">Zinc Galvanizing Spec:</span>
                <span className="font-semibold text-[#0049CA]">{profile.mechanical.coatingOptions}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between py-1">
                <span className="text-[#647488]">Punch Slot Dimensions:</span>
                <span className="font-semibold text-[#0F2130]">{profile.mechanical.slotPattern}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Technical Blueprint Graphic + Applications (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-6">
          {/* Blueprint SVG Card */}
          <div className="bg-[#0F2130] rounded-xl p-6 text-white relative overflow-hidden shadow-inner flex flex-col justify-between min-h-[260px]">
            {/* Engineering Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

            <div className="relative flex items-center justify-between z-10">
              <span className="text-[10px] font-semibold text-[#0049CA] uppercase tracking-wider px-2 py-0.5 rounded bg-white/10">
                SECTION DWG · ISO 9001
              </span>
              <span className="text-[10px] text-white/50 tracking-wider">
                TOLERANCE ±0.1MM
              </span>
            </div>

            {/* Geometric Cross-Section Graphic */}
            <div className="relative py-8 flex items-center justify-center z-10">
              <svg className="w-48 h-36 stroke-white fill-none" viewBox="0 0 160 120" strokeWidth="2">
                {/* Outer Profile with Return Lips */}
                <path
                  d="M 30,30 H 45 V 42 H 41 V 34 H 34 V 86 H 126 V 34 H 119 V 42 H 115 V 30 H 130 V 90 H 30 Z"
                  className="stroke-[#0049CA] fill-[#0049CA]/10"
                  strokeWidth="2.5"
                />

                {/* Dimension Guides */}
                {/* Width W */}
                <line x1="30" y1="102" x2="130" y2="102" stroke="#647488" strokeWidth="1" strokeDasharray="2,2" />
                <path d="M 30,99 L 30,105 M 130,99 L 130,105" stroke="#647488" strokeWidth="1" />
                <text x="80" y="112" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="600">
                  W: {profile.dimensions.webWidth.split(' ')[0]}
                </text>

                {/* Height H */}
                <line x1="16" y1="30" x2="16" y2="90" stroke="#647488" strokeWidth="1" strokeDasharray="2,2" />
                <path d="M 13,30 L 19,30 M 13,90 L 19,90" stroke="#647488" strokeWidth="1" />
                <text x="10" y="62" textAnchor="middle" transform="rotate(-90 10 62)" fill="#FFFFFF" fontSize="9" fontWeight="600">
                  H: {profile.dimensions.flangeHeight.split(' ')[0]}
                </text>

                {/* Return Lip indicator */}
                <circle cx="43" cy="36" r="3" fill="#0049CA" />
                <line x1="43" y1="36" x2="70" y2="18" stroke="#0049CA" strokeWidth="1" />
                <text x="74" y="18" fill="#FFFFFF" fontSize="8" fontWeight="600">
                  LIP: {profile.dimensions.lipDepth.split(' ')[0]}
                </text>
              </svg>
            </div>

            <div className="relative flex items-center justify-between text-[11px] text-white/70 border-t border-white/10 pt-3 z-10">
              <span>HDG ZINC: 85+ MICRONS</span>
              <span className="text-[#0049CA] font-bold">PASS-THROUGH CNC</span>
            </div>
          </div>

          {/* Primary Recommended Applications */}
          <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl p-5 flex flex-col gap-3">
            <h4 className="text-xs font-bold text-[#0F2130] uppercase tracking-wider">
              Recommended Applications
            </h4>
            <div className="flex flex-col gap-2">
              {profile.applications.map((app, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-[#0F2130]">
                  <CheckCircle2 className="w-4 h-4 text-[#0049CA] flex-shrink-0 mt-0.5" />
                  <span className="leading-snug">{app}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTA */}
          <button
            onClick={() => {
              if (onSelectProfile) {
                onSelectProfile(profile.name);
              }
              const formEl = document.getElementById('request-a-call');
              if (formEl) {
                formEl.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="w-full py-3.5 bg-[#0049CA] hover:bg-[#003bb0] text-white font-semibold text-xs uppercase tracking-wider rounded-none transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Request Quote For This Profile</span>
            <ArrowRight className="w-4 h-4 transform transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
};
