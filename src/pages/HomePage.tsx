import React from 'react';
import { Link } from 'react-router-dom';
import { Hero3D } from '../components/Hero3D';
import { useSEO } from '../hooks/useSEO';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

interface HomePageProps {
  onEnquireClick?: (service?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = () => {
  useSEO({
    title: 'Central Structure Fabrication (CSF) | Solar Electrical Products & Structural Fabrication',
    description:
      'Central Structure Fabrication (CSF) — solar hybrid inverters, ACDB/DCDB manufacturing, solar mounting structures, C-channels and strut channels from Amroha, UP.',
    keywords:
      'Central Structure Fabrication, CSF, solar structure manufacturer, ACDB DCDB, C-channel steel, strut channel, Amroha solar manufacturer',
    canonical: 'https://www.csfabrication.in',
    ogTitle: 'Central Structure Fabrication (CSF) — Solar Electrical & Structural Fabrication',
    ogDescription:
      'Solar mounting structures, C-channels, and certified ACDB/DCDB manufacturing from Amroha, UP.',
  });

  return (
    <div className="w-full bg-[#FFFFFF] text-[#0F2130] font-sans">

      {/* ═══════════════════════════════════════════════════════
          HERO — 3D INTERACTION 100% UNTOUCHED
      ═══════════════════════════════════════════════════════ */}
      <Hero3D />


      {/* ═══════════════════════════════════════════════════════
          S1 — WE DEVELOP (Intro dual-column)
      ═══════════════════════════════════════════════════════ */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-[1320px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left: small photo + label */}
            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="/gallery/laser_punching_line.jpg"
                  alt="CSF Precision CNC Roll-Forming Plant — Amroha"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating stat tile */}
              <div className="absolute -bottom-5 -right-5 bg-[#0049CA] text-white px-6 py-4 shadow-lg">
                <p className="text-xs font-mono uppercase tracking-widest text-white/70 mb-0.5">Registered</p>
                <p className="text-lg font-extrabold font-mono">UDYAM-UP-40-0014133</p>
              </div>
            </div>

            {/* Right: headline + body */}
            <div className="flex flex-col gap-6 lg:pl-8">
              <span className="text-[10px] font-mono font-bold text-[#0049CA] uppercase tracking-[0.15em]">Our Mission</span>
              <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#0F2130] leading-[1.05]">
                We develop sustainable<br />
                <span className="text-[#0049CA]">solar infrastructure.</span>
              </h2>
              <p className="text-sm text-[#647488] leading-relaxed max-w-md">
                Central Structure Fabrication (CSF) is a dual-competence industrial enterprise — manufacturing precision steel solar mounting structures and certified solar electrical protection systems from our Amroha, Uttar Pradesh factory.
              </p>
              <p className="text-sm text-[#647488] leading-relaxed max-w-md">
                From automated C-channel roll-forming to IP65 ACDB/DCDB panel assembly, we deliver complete solar infrastructure, factory-direct.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#0F2130] hover:text-[#0049CA] transition-colors group w-fit border-b border-[#0F2130] hover:border-[#0049CA] pb-0.5"
              >
                Our Story
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════
          S2 — STATS BAR
      ═══════════════════════════════════════════════════════ */}
      <section className="bg-[#F5F2EE] border-y border-[#E5E0D8]">
        <div className="max-w-[1320px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[#E5E0D8]">
            {[
              { num: '10+', label: 'Products' },
              { num: '8', label: 'Core Capabilities' },
              { num: '5', label: 'Application Domains' },
              { num: '20+', label: 'Years Combined Experience' },
            ].map((stat) => (
              <div key={stat.label} className="py-10 px-8 flex flex-col gap-2">
                <span className="text-5xl font-extrabold text-[#0F2130] tracking-tight">{stat.num}</span>
                <span className="text-xs font-semibold text-[#647488] uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════
          S3 — PRODUCT CATEGORIES (card grid)
      ═══════════════════════════════════════════════════════ */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-[1320px] mx-auto px-6 md:px-10">

          {/* Section header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <span className="text-[10px] font-mono font-bold text-[#0049CA] uppercase tracking-[0.15em] block mb-3">What We Build</span>
              <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#0F2130] leading-[1.05]">
                Our product<br />portfolio.
              </h2>
            </div>
            <Link to="/products" className="inline-flex items-center gap-2 text-sm font-bold text-[#0F2130] hover:text-[#0049CA] transition-colors group border-b border-[#0F2130] hover:border-[#0049CA] pb-0.5 w-fit self-start md:self-auto">
              View all products
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">

            {/* Large Dark Card — Solar Electrical */}
            <div className="md:col-span-5 bg-[#0F2130] text-white relative overflow-hidden group">
              <div className="absolute inset-0">
                <img src="/electrical/solar_hybrid_inverter.jpg" alt="Solar Hybrid Inverter" className="w-full h-full object-cover opacity-30 group-hover:opacity-40 group-hover:scale-105 transition-all duration-500" />
              </div>
              <div className="relative z-10 p-8 flex flex-col justify-between min-h-[340px]">
                <div>
                  <span className="text-[10px] font-mono text-[#0049CA] uppercase tracking-widest block mb-4">01</span>
                  <h3 className="text-3xl font-extrabold text-white uppercase leading-tight mb-3">Solar<br />Electrical</h3>
                  <ul className="space-y-1 text-xs text-white/60">
                    <li>Solar Hybrid Inverter</li>
                    <li>ACDB (AC Distribution Box)</li>
                    <li>DCDB (DC Distribution Box)</li>
                  </ul>
                </div>
                <Link to="/products" className="inline-flex items-center gap-2 text-xs font-bold text-white border-b border-white/30 hover:border-white pb-0.5 w-fit mt-8 transition-colors group">
                  Explore <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Right column: two stacked light cards */}
            <div className="md:col-span-7 grid grid-rows-2 gap-5">

              {/* Structural Fabrication */}
              <div className="bg-[#F5F2EE] relative overflow-hidden group flex">
                <div className="flex-1 p-7 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-[#0049CA] uppercase tracking-widest block mb-3">02</span>
                    <h3 className="text-2xl font-extrabold text-[#0F2130] uppercase leading-tight mb-2">Structural<br />Fabrication</h3>
                    <ul className="space-y-1 text-xs text-[#647488]">
                      <li>Solar Structures &amp; Mounting Systems</li>
                      <li>C-Channel 80×40×15 &amp; 60×40×15</li>
                      <li>41×41 Strut Channel</li>
                    </ul>
                  </div>
                  <Link to="/products" className="inline-flex items-center gap-2 text-xs font-bold text-[#0F2130] hover:text-[#0049CA] border-b border-[#0F2130]/30 hover:border-[#0049CA] pb-0.5 w-fit mt-4 transition-colors">
                    Explore <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
                <div className="w-44 shrink-0 overflow-hidden">
                  <img src="/gallery/slotted_c_channels_raw.png" alt="C-Channel Steel" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              </div>

              {/* Components & Services */}
              <div className="bg-[#F5F2EE] relative overflow-hidden group flex">
                <div className="flex-1 p-7 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-[#0049CA] uppercase tracking-widest block mb-3">03</span>
                    <h3 className="text-2xl font-extrabold text-[#0F2130] uppercase leading-tight mb-2">Components<br />&amp; Services</h3>
                    <ul className="space-y-1 text-xs text-[#647488]">
                      <li>Mid Clamp &amp; End Clamp</li>
                      <li>U-Clamp &amp; Spring Nuts</li>
                      <li>Installation &amp; Commissioning</li>
                    </ul>
                  </div>
                  <Link to="/capabilities" className="inline-flex items-center gap-2 text-xs font-bold text-[#0F2130] hover:text-[#0049CA] border-b border-[#0F2130]/30 hover:border-[#0049CA] pb-0.5 w-fit mt-4 transition-colors">
                    Explore <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
                <div className="w-44 shrink-0 overflow-hidden">
                  <img src="/hardware/middle-clamp-hdg.jpg" alt="Solar Clamping Hardware" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════
          S4 — ABOUT STRATEGIC THEMES (dark card + list)
      ═══════════════════════════════════════════════════════ */}
      <section className="bg-[#F5F2EE] py-20 md:py-28">
        <div className="max-w-[1320px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* Dark accent card */}
            <div className="lg:col-span-4 bg-[#0F2130] text-white p-8 flex flex-col justify-between min-h-[400px] relative overflow-hidden">
              {/* Background diagonal lines pattern */}
              <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="diag" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                    <line x1="0" y1="0" x2="0" y2="20" stroke="#0049CA" strokeWidth="2"/>
                  </pattern>
                </defs>
                <rect width="200" height="200" fill="url(#diag)" />
              </svg>
              <div className="relative z-10">
                <span className="text-[10px] font-mono text-[#0049CA] uppercase tracking-widest block mb-8">About CSF</span>
                <h3 className="text-3xl font-extrabold text-white uppercase leading-tight">
                  Our Fit for<br />Purpose<br />Strategic<br />Themes.
                </h3>
              </div>
              <Link to="/about" className="relative z-10 inline-flex items-center gap-2 text-xs font-bold text-white/80 hover:text-white border-b border-white/30 hover:border-white pb-0.5 w-fit transition-colors group">
                Our Story <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Right: 4 themes */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { num: '01', title: 'Reliable Manufacturing', body: 'High-throughput CNC roll-forming lines and certified IS 2062 structural steel with zero-compromise dimensional tolerances.' },
                { num: '02', title: 'Complete Product Range', body: 'Solar hybrid inverters, ACDB/DCDB panels, solar structures, C-channels, strut channels, and clamping hardware — single source.' },
                { num: '03', title: 'Support From Start to Finish', body: 'From factory BOM dispatch to on-site erection guidance, torque auditing, and formal commissioning dossier handover.' },
                { num: '04', title: 'Focused on Solar Infrastructure', body: 'Every product and process is purpose-built for the demands of solar energy infrastructure across India.' },
              ].map((item) => (
                <div key={item.num} className="bg-white p-7 flex flex-col gap-4">
                  <span className="text-[10px] font-mono text-[#0049CA] uppercase tracking-widest">{item.num}</span>
                  <h4 className="text-base font-extrabold text-[#0F2130] uppercase tracking-tight">{item.title}</h4>
                  <p className="text-xs text-[#647488] leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════
          S5 — WHAT WE DO (capabilities horizontal list)
      ═══════════════════════════════════════════════════════ */}
      <section className="bg-white py-20 md:py-28 border-t border-[#E5E7EB]">
        <div className="max-w-[1320px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            <div className="lg:col-span-4">
              <span className="text-[10px] font-mono font-bold text-[#0049CA] uppercase tracking-[0.15em] block mb-4">What We Do</span>
              <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#0F2130] leading-[1.05] mb-6">
                Ideas<br />into<br />Impact.
              </h2>
              <p className="text-sm text-[#647488] leading-relaxed mb-8">
                From automated roll-forming to on-site commissioning, every capability is engineered for precision, durability, and solar reliability.
              </p>
              <Link to="/capabilities" className="inline-flex items-center gap-2 text-sm font-bold text-[#0F2130] hover:text-[#0049CA] transition-colors group border-b border-[#0F2130] hover:border-[#0049CA] pb-0.5 w-fit">
                View Capabilities <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Capabilities list */}
            <div className="lg:col-span-8">
              {[
                { id: '01', title: 'Solar Structure Fabrication', desc: 'Ground-mount, rooftop, and carport solar mounting structures engineered for 25+ year outdoor lifespan.' },
                { id: '02', title: 'C-Channel & Strut Manufacturing', desc: 'Continuous roll-formed C-channels (80×40×15, 60×40×15) and 41×41 strut channel with precision slot punching.' },
                { id: '03', title: 'ACDB & DCDB Manufacturing', desc: 'IP65 solar distribution boxes with Tier-1 switchgear, AC/DC surge protection, and 1000V DC isolation.' },
                { id: '04', title: 'Installation & Commissioning', desc: 'On-site erection supervision, bolt torque auditing, string testing, and formal completion dossier handover.' },
              ].map((item, i) => (
                <div
                  key={item.id}
                  className={`flex items-start gap-6 py-7 ${i < 3 ? 'border-b border-[#E5E7EB]' : ''} group hover:bg-[#F5F2EE] -mx-4 px-4 transition-colors`}
                >
                  <span className="text-[10px] font-mono font-bold text-[#0049CA] uppercase tracking-widest mt-1 shrink-0">{item.id}</span>
                  <div className="flex-1">
                    <h4 className="text-lg font-extrabold text-[#0F2130] uppercase tracking-tight mb-1">{item.title}</h4>
                    <p className="text-xs text-[#647488] leading-relaxed">{item.desc}</p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#647488] group-hover:text-[#0049CA] shrink-0 mt-1 transition-colors" />
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════
          S6 — DISCOVER OUR PRODUCTS (full-width photo CTA)
      ═══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden min-h-[460px] flex items-center">
        <img
          src="/gallery/cnc_cold_forming.jpg"
          alt="CSF CNC Cold-Forming Line — Solar Structure Production"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0F2130]/65" />

        <div className="relative z-10 w-full max-w-[1320px] mx-auto px-6 md:px-10">
          <div className="max-w-xl">
            <span className="text-[10px] font-mono font-bold text-[#0049CA] uppercase tracking-[0.15em] block mb-5">Discover</span>
            <h2 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-white leading-[0.95] uppercase mb-8">
              Discover our<br />ground-breaking<br />Products.
            </h2>
            <Link
              to="/products"
              className="inline-flex items-center gap-3 px-6 py-3.5 bg-[#0049CA] hover:bg-[#003CAD] text-white text-xs font-bold uppercase tracking-wider transition-colors group"
            >
              Explore Products
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════
          S7 — OUR PROJECTS (photo grid)
      ═══════════════════════════════════════════════════════ */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-[1320px] mx-auto px-6 md:px-10">

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="text-[10px] font-mono font-bold text-[#0049CA] uppercase tracking-[0.15em] block mb-3">Portfolio</span>
              <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#0F2130] leading-[1.05]">Our projects.</h2>
            </div>
            <Link to="/projects" className="inline-flex items-center gap-2 text-sm font-bold text-[#0F2130] hover:text-[#0049CA] transition-colors group border-b border-[#0F2130] hover:border-[#0049CA] pb-0.5 w-fit self-start md:self-auto">
              All projects <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Project photo grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-7 aspect-[16/10] overflow-hidden group">
              <img src="/gallery/utility_solar_farm.jpg" alt="Utility Solar Farm — Ground Mount Structures" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="md:col-span-5 aspect-[4/3] overflow-hidden group">
              <img src="/gallery/solar_mounting_framework.png" alt="Solar Mounting Framework" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="md:col-span-4 aspect-[4/3] overflow-hidden group">
              <img src="/gallery/slotted_strut_channel.png" alt="41x41 Strut Channel Modular System" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="md:col-span-4 aspect-[4/3] overflow-hidden group">
              <img src="/electrical/dcdb_box.jpg" alt="DC Distribution Box — DCDB Manufacturing" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="md:col-span-4 aspect-[4/3] overflow-hidden group">
              <img src="/gallery/solar_hardware_overview.jpg" alt="Solar Hardware Overview" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════
          S8 — START YOUR SOLAR TRANSITION TODAY (CTA)
      ═══════════════════════════════════════════════════════ */}
      <section className="bg-[#0F2130] relative overflow-hidden">
        {/* Diagonal line pattern */}
        <div className="absolute inset-0 opacity-[0.06]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="diagCTA" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="40" stroke="#0049CA" strokeWidth="1.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#diagCTA)" />
          </svg>
        </div>

        <div className="relative z-10 max-w-[1320px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[380px] items-center gap-8 py-20 md:py-28">
            <div>
              <span className="text-[10px] font-mono font-bold text-[#0049CA] uppercase tracking-[0.15em] block mb-5">Let's Connect</span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[0.95] uppercase mb-8">
                Start your solar<br />
                <span className="text-[#0049CA]">transition today.</span>
              </h2>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-3 px-6 py-3.5 bg-[#0049CA] hover:bg-[#003CAD] text-white text-xs font-bold uppercase tracking-wider transition-colors group"
                >
                  Request a Call
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-xs font-bold text-white/60 hover:text-white uppercase tracking-wider transition-colors group border-b border-white/30 hover:border-white pb-0.5"
                >
                  Contact Details <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right: big branded accent */}
            <div className="hidden lg:flex items-center justify-end">
              <div className="text-right">
                <p className="text-7xl font-extrabold text-white/5 tracking-tight uppercase leading-none select-none">CSF</p>
                <div className="mt-6 text-right space-y-2">
                  <p className="text-xs text-white/40 font-mono">GSTIN: 09BDRPA4213J1ZJ</p>
                  <p className="text-xs text-white/40 font-mono">Amroha, Uttar Pradesh — 244221</p>
                  <p className="text-xs text-white/40 font-mono">info.csf16@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
