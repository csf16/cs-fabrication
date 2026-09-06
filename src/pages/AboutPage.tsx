import React from 'react';
import { useSEO } from '../hooks/useSEO';
import {
  MapPin, Mail, Zap, Wrench, Package, CheckCircle2, ArrowRight
} from 'lucide-react';

interface AboutPageProps {
  onEnquireClick?: (service?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onEnquireClick: _onEnquireClick }) => {
  useSEO({
    title: 'About Central Structure Fabrication (CSF) | Precision Solar Structures — Amroha, UP',
    description:
      'Central Structure Fabrication (CSF) is a dedicated structural steel fabrication company based in Amroha, Uttar Pradesh. We manufacture hot-dip galvanized solar mounting structures, C-channels, and precision steel components.',
    keywords:
      'Central Structure Fabrication, CSF, solar structure manufacturer Amroha, C channel steel UP, strut channel manufacturer, hot dip galvanizing India, IS 2062 structural steel',
    canonical: 'https://www.csfabrication.in/about',
    ogTitle: 'About Central Structure Fabrication (CSF) — Amroha, Uttar Pradesh',
    ogDescription:
      'Precision structural fabrication company built around precision, strength, and dependable performance. Amroha, UP.',
  });

  const services = [
    {
      icon: <Package className="w-5 h-5" />,
      title: 'Solar Structure Manufacturing',
      desc: 'Precision cold-roll-formed solar mounting structures — ground mount, rooftop, and carport systems.',
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: 'C-Channel Roll-Forming',
      desc: 'High-speed automated roll-forming of 41×41, 41×21, 60×40, and 80×40 slotted steel channels.',
    },
    {
      icon: <Wrench className="w-5 h-5" />,
      title: 'Custom Metal Fabrication',
      desc: 'Project-specific base plates, purlin splices, angle brackets, and heavy-gauge stamped steel mounting hardware.',
    },
    {
      icon: <CheckCircle2 className="w-5 h-5" />,
      title: 'Quality Testing & Galvanization',
      desc: 'Mill Test Certification, tensile testing, and Class 1 Hot-Dip Galvanizing (85+ microns, IS 2629).',
    },
  ];

  const products = [
    { code: 'C-CH-8040', name: 'Heavy-Duty Purlin', spec: '80 × 40 × 15 mm',  material: 'IS 2062 HDG Steel' },
    { code: 'C-CH-6040', name: 'Rafter Rail',       spec: '60 × 40 × 12 mm',  material: 'IS 2062 HDG Steel' },
    { code: 'ST-4141',   name: 'Standard Strut',    spec: '41 × 41 × 10 mm',  material: 'GI / HDG Steel'    },
    { code: 'ST-4121',   name: 'Shallow Strut',     spec: '41 × 21 × 8.5 mm', material: 'GI / HDG Steel'    },
    { code: 'HW-MIDCLP', name: 'Mid Clamp',         spec: '35mm / 40mm',      material: 'AL 6063-T6'        },
    { code: 'HW-ENDCLP', name: 'End Clamp',         spec: '35mm / 40mm',      material: 'AL 6063-T6'        },
  ];

  const complianceBadges = [
    { label: 'GSTIN', value: '09BDRPA4213J1ZJ' },
    { label: 'UDYAM', value: 'UDYAM-UP-40-0014133' },
    { label: 'Category', value: 'Micro Enterprise' },
    { label: 'Location', value: 'Amroha, UP — 09' },
  ];

  return (
    <div className="w-full pt-32 pb-24 bg-[#FFFFFF] text-[#0F2130]">
      <div className="max-w-[1340px] mx-auto px-6 md:px-12 lg:px-20">

        {/* ── Page Header ─────────────────────────────────────────── */}
        <div className="flex flex-col gap-5 mb-20 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0049CA]/10 border border-[#0049CA]/20 text-[#0049CA] text-xs font-semibold uppercase tracking-wider w-fit">
            <span className="w-2 h-2 rounded-full bg-[#0049CA]" />
            <span>Central Structure Fabrication (CSF)</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#0F2130] tracking-tight leading-[1.08] uppercase">
            Structure Starts<br />With Precision.
          </h1>

          <p className="text-base sm:text-lg text-[#647488] font-normal leading-relaxed">
            Central Structure Fabrication is a technically capable structural fabrication company built around precision, strength, and dependable performance. Based in Amroha, Uttar Pradesh, we manufacture solar mounting structures, cold-formed C-channels, and precision-engineered structural steel components.
          </p>
        </div>

        {/* ── Company Info + Map Block ────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20 items-stretch">

          {/* Left — Details (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6">

            {/* Address Card */}
            <div className="border border-[#E5E7EB] rounded-2xl p-8 bg-[#F8FAFC] flex flex-col gap-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#0049CA]/10 flex items-center justify-center text-[#0049CA] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-semibold text-[#0049CA] uppercase tracking-wider">Manufacturing Facility</span>
                  <p className="text-sm font-medium text-[#0F2130] leading-relaxed">
                    Mohanpur Shumali, Post Basera Taga,<br />
                    Jamna Khas Road, Tahseel Naugaon Sadat,<br />
                    District Amroha, Uttar Pradesh — 244221, India
                  </p>
                </div>
              </div>

              <div className="w-full h-[1px] bg-[#E5E7EB]" />

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#0049CA]/10 flex items-center justify-center text-[#0049CA] shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-semibold text-[#0049CA] uppercase tracking-wider">Direct Email</span>
                  <a
                    href="mailto:info.csf16@gmail.com"
                    className="text-sm font-medium text-[#0F2130] hover:text-[#0049CA] transition-colors"
                  >
                    info.csf16@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Compliance Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {complianceBadges.map(b => (
                <div key={b.label} className="border border-[#E5E7EB] rounded-xl p-4 flex flex-col gap-1 bg-white shadow-sm">
                  <span className="text-[10px] font-semibold text-[#0049CA] uppercase tracking-wider">{b.label}</span>
                  <span className="text-xs font-bold text-[#0F2130] break-all">{b.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Stats (5 cols) */}
          <div className="lg:col-span-5 border border-[#0F2130] rounded-2xl p-8 bg-[#0F2130] text-white flex flex-col justify-between gap-6 shadow-xl">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-[#0049CA] uppercase tracking-wider">Established</span>
              <span className="text-5xl font-bold text-white">2026</span>
            </div>
            <div className="w-full h-[1px] bg-white/10" />
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-[#0049CA] uppercase tracking-wider">Classification</span>
              <span className="text-sm font-semibold text-white">MSME / UDYAM Registered Enterprise</span>
              <span className="text-xs text-white/50">Registration: UDYAM-UP-40-0014133</span>
            </div>
            <div className="w-full h-[1px] bg-white/10" />
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-[#0049CA] uppercase tracking-wider">Specialization</span>
              <span className="text-sm font-semibold text-white">Solar Mounting Frameworks &amp; Precision C-Channels</span>
            </div>
            <div className="w-full h-[1px] bg-white/10" />
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-[#0049CA] uppercase tracking-wider">Regional Supply</span>
              <span className="text-sm font-semibold text-white">Direct Dispatch Across Northern India</span>
            </div>
          </div>
        </div>

        {/* ── Services ────────────────────────────────────────────── */}
        <div className="mb-20">
          <div className="flex flex-col gap-2 mb-12">
            <span className="text-xs font-bold text-[#0049CA] uppercase tracking-wider">What We Do</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F2130] uppercase tracking-tight">Our Core Offerings</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {services.map((s, i) => (
              <div key={i} className="border border-[#E5E7EB] rounded-2xl p-7 bg-[#F8FAFC] flex gap-5 hover:border-[#0049CA]/40 transition-all duration-200 hover:shadow-md">
                <div className="w-11 h-11 rounded-xl bg-white border border-[#E5E7EB] flex items-center justify-center text-[#0049CA] shrink-0 shadow-sm">
                  {s.icon}
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-base font-bold text-[#0F2130] uppercase tracking-wide">{s.title}</h3>
                  <p className="text-xs text-[#647488] leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Product Range ────────────────────────────────────────── */}
        <div className="mb-20">
          <div className="flex flex-col gap-2 mb-12">
            <span className="text-xs font-bold text-[#0049CA] uppercase tracking-wider">Manufactured Products</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F2130] uppercase tracking-tight">Standard Steel Profiles &amp; Hardware</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <div key={p.code} className="border border-[#E5E7EB] rounded-2xl p-6 bg-white flex flex-col gap-3 hover:border-[#0049CA]/40 transition-all duration-200 hover:shadow-md">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold tracking-wider text-[#0049CA] uppercase">{p.code}</span>
                  <CheckCircle2 className="w-4 h-4 text-[#0049CA]" />
                </div>
                <h3 className="text-base font-bold text-[#0F2130] uppercase">{p.name}</h3>
                <div className="flex items-center justify-between border-t border-[#E5E7EB] pt-3 text-xs">
                  <span className="font-semibold text-[#0F2130]">{p.spec}</span>
                  <span className="text-[#647488] uppercase">{p.material}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Standards & Compliance ──────────────────────────────── */}
        <div className="border border-[#E5E7EB] rounded-2xl p-8 md:p-12 mb-16 bg-[#F8FAFC]">
          <div className="flex flex-col gap-2 mb-8">
            <span className="text-xs font-bold text-[#0049CA] uppercase tracking-wider">Engineering Compliance</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F2130] uppercase tracking-tight">Codes &amp; Technical Standards</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { std: 'IS 2062', desc: 'Structural Steel Grade E250/E350' },
              { std: 'IS 875 (Part 3)', desc: 'Wind Loading — Up to 200 km/h' },
              { std: 'IS 2629 / 4759', desc: 'Class 1 HDG Coating 85+ µm' },
              { std: 'IS 801 / AISI S100', desc: 'Cold-Formed Light Gauge Steel' },
            ].map(c => (
              <div key={c.std} className="border border-[#E5E7EB] rounded-xl p-4 bg-white flex flex-col gap-1.5 shadow-sm">
                <span className="text-xs font-bold text-[#0049CA]">{c.std}</span>
                <span className="text-xs font-medium text-[#0F2130]">{c.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA ─────────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 md:p-12 bg-[#0F2130] rounded-2xl text-white">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold text-[#0049CA] uppercase tracking-wider">
              Work With Us
            </span>
            <h3 className="text-2xl font-bold text-white uppercase tracking-tight">
              Connect With Our Engineering Desk
            </h3>
            <p className="text-xs text-white/60">
              info.csf16@gmail.com · Amroha, Uttar Pradesh, India
            </p>
          </div>
          <a
            href="/#request-a-call"
            className="px-8 py-4 bg-[#0049CA] hover:bg-[#003bb0] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all duration-200 whitespace-nowrap flex items-center gap-2 shadow-lg shadow-[#0049CA]/30"
          >
            <span>Request A Call</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;
