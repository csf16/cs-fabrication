import React from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';
import {
  MapPin,
  Mail,
  Zap,
  Layers,
  Wrench,
  ShieldCheck,
  ArrowRight,
  Award,
  Factory,
  Check
} from 'lucide-react';

interface AboutPageProps {
  onEnquireClick?: (service?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onEnquireClick: _onEnquireClick }) => {
  useSEO({
    title: 'About Us | Central Structure Fabrication (CSF) — Amroha, UP',
    description:
      'Central Structure Fabrication (CSF) is an industrial manufacturing and trading enterprise in Amroha, Uttar Pradesh, specializing in solar mounting structures, C-channels, 41×41 struts, solar hybrid inverters, and ACDB/DCDB panels.',
    keywords:
      'About Central Structure Fabrication, CSF Amroha, solar structure manufacturer Uttar Pradesh, C channel roll forming India, ACDB DCDB manufacturer, solar company UP',
    canonical: 'https://www.csfabrication.in/about',
    ogTitle: 'About Central Structure Fabrication (CSF) — Amroha, Uttar Pradesh',
    ogDescription:
      'Dual competence in precision solar structural fabrication and certified solar electrical protection. Amroha, UP.',
  });

  const principles = [
    {
      title: 'Engineering Discipline',
      desc: 'Every channel, weldment, and distribution box is built strictly to documented load calculations, IS codes, and single-line schematics.',
    },
    {
      title: 'Industrial Strength',
      desc: 'We utilize certified IS 2062 structural steel, Class 1 hot-dip galvanizing, and industrial-rated electrical switchgear built for 25+ year endurance.',
    },
    {
      title: 'Reliable Execution',
      desc: 'Direct factory dispatch from our Amroha facility with piece-marked numbering, rapid lead times, and comprehensive on-site technical coordination.',
    },
    {
      title: 'Long-Term Value',
      desc: 'Minimizing lifecycle maintenance and power loss through corrosion-resistant joinery, tight manufacturing tolerances, and rugged protection enclosures.',
    },
  ];

  const complianceBadges = [
    { label: 'GSTIN', value: '09BDRPA4213J1ZJ' },
    { label: 'UDYAM Number', value: 'UDYAM-UP-40-0014133' },
    { label: 'Enterprise Category', value: 'Micro Enterprise (MSME)' },
    { label: 'Operating State', value: 'Uttar Pradesh (09)' },
  ];

  return (
    <div className="w-full pt-28 pb-24 bg-[#FFFFFF] text-[#0F2130]">
      {/* ── Page Hero ─────────────────────────────────────────────── */}
      <section className="max-w-[1320px] mx-auto px-6 md:px-10 mb-20">
        <div className="flex flex-col gap-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0049CA]/10 text-[#0049CA] text-[12px] font-semibold tracking-[0.04em] uppercase w-fit">
            <span>Corporate Profile</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#0F2130] leading-[1.1]">
            Structure Starts With Precision.
          </h1>
          <p className="text-base sm:text-lg text-[#647488] leading-relaxed">
            Central Structure Fabrication (CSF) is an integrated solar manufacturing enterprise headquartered in Amroha, Uttar Pradesh. We unite precision structural cold-roll forming with certified solar electrical distribution systems.
          </p>
        </div>

        {/* Dual Competence Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <div className="border border-[#E5E7EB] bg-[#F8FAFC] p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-[#0049CA]/10 border border-[#0049CA]/20 text-[#0049CA]">
                <Layers className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-[#0F2130]">Precision Structural Fabrication</h2>
            </div>
            <p className="text-sm text-[#647488] leading-relaxed mb-6">
              Our automated cold-roll forming machinery processes high-tensile steel coils into continuous slotted C-channels (80×40×15, 60×40×15) and 41×41 strut channels. We manufacture heavy-duty ground-mount, rooftop, and carport steel mounting structures designed to withstand wind loads up to 180 km/h with 25+ year anti-corrosion protection.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#0F2130]">
                <Check className="w-4 h-4 text-[#0049CA]" />
                <span>IS 2062 Grade E250 / E350 Structural Steel</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#0F2130]">
                <Check className="w-4 h-4 text-[#0049CA]" />
                <span>Class 1 Hot-Dip Galvanizing (IS 2629 / 4759)</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#0F2130]">
                <Check className="w-4 h-4 text-[#0049CA]" />
                <span>Automated Slot Piercing for Fast Site Assembly</span>
              </div>
            </div>
          </div>

          <div className="border border-[#E5E7EB] bg-[#F8FAFC] p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-[#0049CA]/10 border border-[#0049CA]/20 text-[#0049CA]">
                <Zap className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-[#0F2130]">Solar Electrical Products</h2>
            </div>
            <p className="text-sm text-[#647488] leading-relaxed mb-6">
              Our electrical division manufactures custom AC Distribution Boxes (ACDB) and DC Distribution Boxes (DCDB), and trades high-performance solar hybrid inverters. Every enclosure is engineered for harsh outdoor environments with IP65 ingress protection, calibrated surge protection, and high-voltage DC string isolation.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#0F2130]">
                <Check className="w-4 h-4 text-[#0049CA]" />
                <span>Solar Hybrid Inverters with Multi-Source Routing</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#0F2130]">
                <Check className="w-4 h-4 text-[#0049CA]" />
                <span>IP65 Weatherproof ACDB &amp; DCDB Enclosures</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#0F2130]">
                <Check className="w-4 h-4 text-[#0049CA]" />
                <span>Tier-1 Switchgear with Type II AC/DC SPDs</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── The 4 Core Principles ─────────────────────────────────── */}
      <section className="bg-[#0F2130] text-white py-24 mb-24">
        <div className="max-w-[1320px] mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-[#647488]/30 pb-6">
            <div>
              <span className="text-[12px] font-bold text-[#0049CA] tracking-[0.06em] uppercase">Brand Philosophy</span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-1">
                The 4 Core Principles of CSF
              </h2>
            </div>
            <p className="text-sm text-[#E5E7EB]/70 max-w-md">
              Our foundation is defined by calculated engineering, uncompromising strength, and field-proven reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {principles.map((p, idx) => (
              <div
                key={p.title}
                className="border border-[#647488]/30 bg-white/5 p-6 flex flex-col justify-between"
              >
                <div>
                  <span className="text-3xl font-mono font-bold text-[#0049CA] block mb-4">
                    0{idx + 1}
                  </span>
                  <h3 className="text-lg font-bold text-white mb-3">{p.title}</h3>
                  <p className="text-xs text-[#E5E7EB]/80 leading-relaxed">{p.desc}</p>
                </div>
                <div className="mt-8 pt-4 border-t border-[#647488]/30">
                  <span className="text-[11px] text-[#0049CA] font-semibold uppercase tracking-wider">
                    Verified Benchmark
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Facility & Compliance Details ─────────────────────────── */}
      <section className="max-w-[1320px] mx-auto px-6 md:px-10 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Details */}
          <div className="lg:col-span-7 border border-[#E5E7EB] bg-[#F8FAFC] p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Factory className="w-6 h-6 text-[#0049CA]" />
                <h3 className="text-xl font-bold text-[#0F2130]">Manufacturing Hub — Amroha, Uttar Pradesh</h3>
              </div>
              <p className="text-sm text-[#647488] leading-relaxed mb-6">
                Our plant is located in the industrial corridor of Amroha, offering efficient highway connectivity across Uttar Pradesh, Delhi-NCR, Uttarakhand, Rajasthan, and northern India for rapid project site dispatch.
              </p>

              <div className="space-y-3 border-t border-[#E5E7EB] pt-6 mb-6">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#0049CA] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-[#0F2130] block">Works &amp; Factory Address</span>
                    <span className="text-xs text-[#647488] leading-relaxed">
                      Mohanpur Shumali, Post Basera Taga, Jamna Khas Road,<br />
                      Tahseel Naugaon Sadat, District Amroha,<br />
                      Uttar Pradesh — 244221, India
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <Mail className="w-5 h-5 text-[#0049CA] shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-[#0F2130] block">Official Email</span>
                    <a href="mailto:info.csf16@gmail.com" className="text-xs text-[#0049CA] hover:underline font-mono">
                      info.csf16@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Compliance Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#E5E7EB]">
              {complianceBadges.map((badge) => (
                <div key={badge.label} className="p-3 bg-white border border-[#E5E7EB]">
                  <span className="text-[10px] text-[#647488] uppercase tracking-wider block font-semibold">
                    {badge.label}
                  </span>
                  <span className="text-xs font-bold text-[#0F2130] font-mono mt-0.5 block">
                    {badge.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Summary Card */}
          <div className="lg:col-span-5 border border-[#0049CA] bg-[#0049CA]/5 p-8 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-[#0049CA] uppercase tracking-wider block mb-2">
                Why Partner With CSF
              </span>
              <h3 className="text-2xl font-bold text-[#0F2130] mb-4">
                Single-Source Solar Infrastructure
              </h3>
              <p className="text-xs text-[#647488] leading-relaxed mb-6">
                Avoid coordinating between separate structural steel vendors and electrical panel makers. CSF provides the integrated mounting structure, the channels, the clamping hardware, the distribution boxes, and the inverter supply under one accountable roof.
              </p>

              <div className="space-y-3">
                <div className="p-3 bg-white border border-[#E5E7EB] flex items-center gap-3">
                  <Award className="w-5 h-5 text-[#0049CA] shrink-0" />
                  <span className="text-xs font-bold text-[#0F2130]">Factory-Direct Pricing with Zero Broker Markup</span>
                </div>
                <div className="p-3 bg-white border border-[#E5E7EB] flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#0049CA] shrink-0" />
                  <span className="text-xs font-bold text-[#0F2130]">Certified Material Test Certificates (MTC)</span>
                </div>
                <div className="p-3 bg-white border border-[#E5E7EB] flex items-center gap-3">
                  <Wrench className="w-5 h-5 text-[#0049CA] shrink-0" />
                  <span className="text-xs font-bold text-[#0F2130]">Technical On-Site Erection Guidance</span>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <Link
                to="/contact"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0049CA] hover:bg-[#003CAD] text-white text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors"
              >
                <span>Connect With Factory Team</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom Link Banner ────────────────────────────────────── */}
      <section className="max-w-[1320px] mx-auto px-6 md:px-10">
        <div className="border border-[#0F2130] bg-[#0F2130] text-white p-8 md:p-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold mb-1">Explore Products &amp; Capabilities</h3>
            <p className="text-xs text-[#E5E7EB]/80">
              Browse our technical C-channel cross sections, strut systems, and 5-step engineering process.
            </p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <Link
              to="/products"
              className="px-5 py-3 border border-white/40 hover:border-white text-white text-xs font-bold uppercase tracking-wider transition-colors"
            >
              View Products
            </Link>
            <Link
              to="/capabilities"
              className="px-5 py-3 bg-[#0049CA] hover:bg-[#003CAD] text-white text-xs font-bold uppercase tracking-wider transition-colors"
            >
              View Capabilities
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
