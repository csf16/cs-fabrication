import React from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';
import {
  MapPin, Mail, Zap, Wrench, Package, CheckCircle2
} from 'lucide-react';

interface AboutPageProps {
  onEnquireClick: (service?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onEnquireClick: _onEnquireClick }) => {
  useSEO({
    title: 'About Central Structure Fabrication | Solar Structure & C-Channel Manufacturer — Amroha, UP',
    description:
      'Central Structure Fabrication (CS Fabrication) is a UDYAM-registered micro enterprise in Amroha, Uttar Pradesh. We manufacture solar mounting structures, C-channel steel, 41×41 strut channels, solar hybrid inverters, and U/Mid/Z clamps. GST: 09BDRPA4213J1ZJ.',
    keywords:
      'Central Structure Fabrication, CS Fabrication Amroha, solar structure manufacturer UP, C channel manufacturer Amroha, strut channel manufacturer India, solar inverter trading UP, UDYAM solar structure, solar installation Uttar Pradesh, mid clamp z clamp manufacturer',
    canonical: 'https://www.csfabrication.in/about',
    ogTitle: 'About Central Structure Fabrication (CS Fabrication) — Amroha, Uttar Pradesh',
    ogDescription:
      'UDYAM-registered solar structure manufacturer in Amroha, UP. Solar mounting structures, C-channels, strut channels, inverters, clamps & installation services.',
    ogType: 'website',
  });

  const services = [
    {
      icon: <Zap className="w-5 h-5" />,
      title: 'Solar Hybrid Inverter Trading',
      desc: 'Supply and trading of solar hybrid inverters for on-grid, off-grid, and hybrid solar power systems.',
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: 'AC/DC & DC/AC Manufacturing',
      desc: 'Manufacturing of AC-to-DC and DC-to-AC conversion systems for solar energy applications.',
    },
    {
      icon: <Package className="w-5 h-5" />,
      title: 'Solar Structure Manufacturing',
      desc: 'Precision cold-roll-formed solar mounting structures — ground mount, rooftop, and carport systems.',
    },
    {
      icon: <Wrench className="w-5 h-5" />,
      title: 'Installation & Commissioning',
      desc: 'End-to-end solar structure installation, alignment, and system commissioning services.',
    },
  ];

  const products = [
    { code: 'C-CH-8040', name: 'C Channel',       spec: '80 × 40 × 15 mm',  material: 'IS 2062 HDG Steel' },
    { code: 'C-CH-6040', name: 'C Channel',       spec: '60 × 40 × 15 mm',  material: 'IS 2062 HDG Steel' },
    { code: 'ST-4141',   name: 'Strut Channel',   spec: '41 × 41 mm',        material: 'GI / HDG Steel'    },
    { code: 'HW-UCLAMP', name: 'U Clamp',         spec: 'Standard / Custom', material: 'MS / SS 304'       },
    { code: 'HW-MIDCLP', name: 'Mid Clamp',       spec: '35mm / 40mm',       material: 'AL 6063-T6'        },
    { code: 'HW-ZCLAMP', name: 'Z Clamp',         spec: 'Standard / Custom', material: 'AL 6063-T6'        },
  ];

  const complianceBadges = [
    { label: 'GSTIN',   value: '09BDRPA4213J1ZJ'           },
    { label: 'UDYAM',   value: 'UDYAM-UP-40-0014133'       },
    { label: 'Category', value: 'Micro Enterprise'         },
    { label: 'State Code', value: 'UP — 09'                },
  ];

  return (
    <div className="w-full pt-28 pb-24 bg-[#F7F6F1]">
      <div className="max-w-[1280px] mx-auto px-8 md:px-14">

        {/* ── Page Header ─────────────────────────────────────────── */}
        <div className="flex flex-col gap-5 mb-20 max-w-3xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-[1px] bg-[#A88A58]" />
            <span className="text-[10px] font-mono tracking-[0.35em] text-[#A88A58] uppercase font-bold">
              CENTRAL STRUCTURE FABRICATION
            </span>
            <div className="w-8 h-[1px] bg-[#A88A58]" />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-[3.5rem] font-bold text-[#141516] tracking-tight leading-[1.05] uppercase">
            Engineered for<br />India's Solar Future
          </h1>

          <p className="text-base text-[#2C2F32] font-light leading-relaxed">
            Central Structure Fabrication is a UDYAM-registered manufacturer based in Amroha, Uttar Pradesh, supplying precision solar mounting structures, cold-formed C-channel steel, solar hybrid inverters, and installation services across North India.
          </p>
        </div>

        {/* ── Company Info + Map Block ────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 mb-20 items-start">

          {/* Left — Details */}
          <div className="flex flex-col gap-8">

            {/* Address Card */}
            <div className="border border-[#141516]/8 rounded-[4px] p-8 bg-white flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-[3px] bg-[#141516] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-[#A88A58]" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] font-mono tracking-[0.2em] text-[#7A7D80] uppercase font-bold">Registered Office</span>
                  <p className="text-sm font-medium text-[#141516] leading-relaxed">
                    Mohanpur Shumali, Post Basera Taga,<br />
                    Jamna Khas Road, Tahseel Naugaon Sadat,<br />
                    District Amroha, Uttar Pradesh — 244221
                  </p>
                </div>
              </div>

              <div className="w-full h-[1px] bg-[#141516]/6" />

              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-[3px] bg-[#141516] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-[#A88A58]" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] font-mono tracking-[0.2em] text-[#7A7D80] uppercase font-bold">Email</span>
                  <a
                    href="mailto:saifi.electricals2@gmail.com"
                    className="text-sm font-medium text-[#141516] hover:text-[#A88A58] transition-colors duration-200"
                  >
                    saifi.electricals2@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Compliance Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {complianceBadges.map(b => (
                <div key={b.label} className="border border-[#141516]/8 rounded-[4px] p-4 flex flex-col gap-1 bg-white">
                  <span className="text-[8px] font-mono tracking-[0.2em] text-[#A88A58] uppercase font-bold">{b.label}</span>
                  <span className="text-[11px] font-mono font-bold text-[#141516] break-all">{b.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Stats */}
          <div className="border border-[#141516]/8 rounded-[4px] p-8 bg-[#141516] flex flex-col gap-8">
            <div className="flex flex-col gap-1">
              <span className="text-[9px] font-mono tracking-[0.2em] text-[#A88A58] uppercase font-bold">Established</span>
              <span className="text-4xl font-bold text-[#F7F6F1]">2026</span>
            </div>
            <div className="w-full h-[1px] bg-[#F7F6F1]/8" />
            <div className="flex flex-col gap-1">
              <span className="text-[9px] font-mono tracking-[0.2em] text-[#A88A58] uppercase font-bold">Classification</span>
              <span className="text-sm font-medium text-[#F7F6F1]">Micro Enterprise</span>
              <span className="text-[10px] font-mono text-[#F7F6F1]/40">MSME / UDYAM Registered</span>
            </div>
            <div className="w-full h-[1px] bg-[#F7F6F1]/8" />
            <div className="flex flex-col gap-1">
              <span className="text-[9px] font-mono tracking-[0.2em] text-[#A88A58] uppercase font-bold">Sectors Served</span>
              <span className="text-sm font-medium text-[#F7F6F1]">Solar Energy, Steel Fabrication</span>
            </div>
            <div className="w-full h-[1px] bg-[#F7F6F1]/8" />
            <div className="flex flex-col gap-1">
              <span className="text-[9px] font-mono tracking-[0.2em] text-[#A88A58] uppercase font-bold">State</span>
              <span className="text-sm font-medium text-[#F7F6F1]">Uttar Pradesh, India</span>
              <span className="text-[10px] font-mono text-[#F7F6F1]/40">GST State Code: 09</span>
            </div>
          </div>
        </div>

        {/* ── Services ────────────────────────────────────────────── */}
        <div className="mb-20">
          <div className="flex flex-col gap-2 mb-12">
            <span className="text-[9px] font-mono tracking-[0.25em] text-[#A88A58] uppercase font-bold">What We Do</span>
            <h2 className="text-3xl font-bold text-[#141516] uppercase tracking-tight">Our Services</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {services.map((s, i) => (
              <div key={i} className="border border-[#141516]/8 rounded-[4px] p-7 bg-white flex gap-5 hover:border-[#A88A58]/40 transition-colors duration-300">
                <div className="w-10 h-10 rounded-[3px] bg-[#F7F6F1] border border-[#141516]/8 flex items-center justify-center text-[#A88A58] shrink-0">
                  {s.icon}
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-[12px] font-bold text-[#141516] uppercase tracking-wide">{s.title}</h3>
                  <p className="text-[12px] text-[#7A7D80] font-light leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Product Range ────────────────────────────────────────── */}
        <div className="mb-20">
          <div className="flex flex-col gap-2 mb-12">
            <span className="text-[9px] font-mono tracking-[0.25em] text-[#A88A58] uppercase font-bold">Manufactured Products</span>
            <h2 className="text-3xl font-bold text-[#141516] uppercase tracking-tight">Steel Sections &amp; Hardware</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((p) => (
              <div key={p.code} className="border border-[#141516]/8 rounded-[4px] p-6 bg-white flex flex-col gap-3 hover:border-[#A88A58]/40 transition-colors duration-300">
                <div className="flex items-center justify-between">
                  <span className="text-[8px] font-mono tracking-widest text-[#A88A58] font-bold uppercase">{p.code}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#A88A58]" />
                </div>
                <h3 className="text-[13px] font-bold text-[#141516] uppercase tracking-wide">{p.name}</h3>
                <div className="flex items-center justify-between border-t border-[#141516]/6 pt-3">
                  <span className="text-[11px] font-mono font-bold text-[#141516]">{p.spec}</span>
                  <span className="text-[9px] font-mono text-[#7A7D80] uppercase">{p.material}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Standards & Compliance ──────────────────────────────── */}
        <div className="border border-[#141516]/8 rounded-[4px] p-8 md:p-12 mb-16 bg-white">
          <div className="flex flex-col gap-2 mb-10">
            <span className="text-[9px] font-mono tracking-[0.25em] text-[#A88A58] uppercase font-bold">Regulatory Compliance</span>
            <h2 className="text-2xl font-bold text-[#141516] uppercase tracking-tight">Codes &amp; Standards</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { std: 'IS 2062',           desc: 'Structural Steel E250/E350'         },
              { std: 'IS 875 (Part 3)',   desc: 'Wind Load — Up to 200 km/h'         },
              { std: 'IS 2629 / 4759',   desc: 'Hot-Dip Galvanization 85+ µm'       },
              { std: 'IS 801 / AISI S100', desc: 'Cold-Formed Light Gauge Steel'    },
            ].map(c => (
              <div key={c.std} className="border border-[#141516]/8 rounded-[3px] p-4 bg-[#F7F6F1] flex flex-col gap-1.5">
                <span className="text-[10px] font-mono font-bold text-[#A88A58]">{c.std}</span>
                <span className="text-[11px] font-medium text-[#141516]">{c.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA ─────────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 md:p-12 bg-[#141516] rounded-[4px]">
          <div className="flex flex-col gap-2">
            <span className="text-[9px] font-mono tracking-[0.25em] text-[#A88A58] uppercase font-bold">
              Get In Touch
            </span>
            <h3 className="text-xl font-bold text-[#F7F6F1] uppercase tracking-tight">
              Connect with our team for pricing &amp; technical queries
            </h3>
            <p className="text-[12px] text-[#F7F6F1]/50 font-light">
              saifi.electricals2@gmail.com · Amroha, Uttar Pradesh
            </p>
          </div>
          <Link
            to="/contact"
            className="px-7 py-3.5 bg-[#A88A58] hover:bg-[#C4A96E] text-[#141516] text-[10px] font-bold uppercase tracking-[0.15em] rounded-[3px] transition-all duration-300 whitespace-nowrap flex items-center gap-2"
          >
            Request a Proposal →
          </Link>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;
