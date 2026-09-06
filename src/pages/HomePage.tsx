import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Hero3D } from '../components/Hero3D';
import { useSEO } from '../hooks/useSEO';
import {
  Layers,
  ArrowRight,
  CheckCircle2,
  Factory,
  Building,
  PhoneCall,
  Check
} from 'lucide-react';
import { submitLeadToGoogleSheet, validatePhoneNumber } from '../services/leadService';

interface HomePageProps {
  onEnquireClick?: (service?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onEnquireClick: _onEnquireClick }) => {
  useSEO({
    title: 'Central Structure Fabrication (CSF) | Solar Electrical Products & Structural Fabrication',
    description:
      'Central Structure Fabrication (CSF) specializes in solar hybrid inverters, ACDB/DCDB manufacturing, solar mounting structures, cold-roll formed C-channels, and 41×41 strut channels. Amroha, UP.',
    keywords:
      'Central Structure Fabrication, CSF, solar structure manufacturer, solar hybrid inverter, ACDB DCDB, C-channel steel, strut channel 41x41, Amroha solar manufacturer, structural fabrication India',
    canonical: 'https://www.csfabrication.in',
    ogTitle: 'Central Structure Fabrication (CSF) — Dual Solar Electrical & Structural Fabrication',
    ogDescription:
      'Engineered solar mounting structures, continuous cold-roll formed C-channels, and certified ACDB/DCDB manufacturing from Amroha, Uttar Pradesh.',
  });

  // Quick Callback Form State
  const [quickPhone, setQuickPhone] = useState('');
  const [quickName, setQuickName] = useState('');
  const [quickRequirement, setQuickRequirement] = useState('General Solar Infrastructure');
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuickPhone(val);
    if (phoneError) {
      const res = validatePhoneNumber(val);
      if (res.isValid) setPhoneError(null);
    }
  };

  const handleQuickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    const validation = validatePhoneNumber(quickPhone);
    if (!validation.isValid) {
      setPhoneError(validation.error || 'Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    setIsSubmitting(true);

    try {
      await submitLeadToGoogleSheet(quickPhone, 'Home Page - Quick Callback', {
        name: quickName,
        requirement: quickRequirement,
      });
      setIsSubmitted(true);
    } catch (err: any) {
      setServerError(err?.message || 'Unable to submit request. Please try again or email info.csf16@gmail.com.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const principles = [
    {
      num: '01',
      title: 'Engineering Discipline',
      desc: 'Calculated design, rigorous load tolerances, and zero unverified claims. We build strictly to IS standards.',
    },
    {
      num: '02',
      title: 'Industrial Strength',
      desc: 'Certified IS 2062 high-tensile steel, Class 1 hot-dip galvanizing, and industrial-rated electrical switchgear.',
    },
    {
      num: '03',
      title: 'Reliable Execution',
      desc: 'On-time factory delivery from Amroha, piece-marked assembly kits, and comprehensive technical field guidance.',
    },
    {
      num: '04',
      title: 'Long-Term Value',
      desc: '25+ year operational resilience under extreme ambient temperatures, wind gusts, and corrosive environments.',
    },
  ];

  return (
    <div className="w-full bg-[#FFFFFF] text-[#0F2130]">
      {/* ── Section 00: 3D HERO INTERACTION (100% PRESERVED UNTOUCHED) ── */}
      <Hero3D />

      {/* ── Section 01: Official Introduction & Dual Positioning ─────── */}
      <section className="py-24 border-b border-[#E5E7EB] bg-[#FFFFFF]">
        <div className="max-w-[1320px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0049CA]/10 text-[#0049CA] text-[12px] font-semibold tracking-[0.04em] uppercase mb-4">
                <span>Integrated Solar Infrastructure</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0F2130] leading-[1.15] mb-6">
                Dual Competence:<br />
                <span className="text-[#0049CA]">Solar Electrical Products</span> &amp;<br />
                <span className="text-[#0F2130]">Structural Fabrication</span>
              </h2>
              <p className="text-base sm:text-lg text-[#647488] leading-relaxed mb-6 font-normal">
                Central Structure Fabrication (CSF) bridges the gap between heavy structural steel manufacturing and certified solar electrical distribution. Based in Amroha, Uttar Pradesh, we supply the solar power ecosystem with high-yield mounting systems, automated roll-formed channels, and engineered protection enclosures.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#E5E7EB]">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#0049CA] mt-2 shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-[#0F2130]">Structural Fabrication</h4>
                    <p className="text-xs text-[#647488] mt-0.5">
                      Ground mount &amp; rooftop structures, C-channels (80×40, 60×40), and 41×41 strut channels.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#0049CA] mt-2 shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-[#0F2130]">Solar Electrical Systems</h4>
                    <p className="text-xs text-[#647488] mt-0.5">
                      Solar hybrid inverter supply, custom ACDB &amp; DCDB manufacturing with IP65 protection.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Plant Highlights Box */}
            <div className="lg:col-span-5 bg-[#F8FAFC] border border-[#E5E7EB] p-8">
              <span className="text-xs font-mono font-bold text-[#0049CA] uppercase tracking-wider block mb-2">
                Manufacturing Facility
              </span>
              <h3 className="text-2xl font-bold text-[#0F2130] mb-4">
                Amroha, Uttar Pradesh
              </h3>
              <p className="text-xs text-[#647488] leading-relaxed mb-6">
                Mohanpur Shumali, Tahseel Naugaon Sadat. Operating high-precision roll-forming lines, automated punching presses, and certified electrical wiring bays.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-center justify-between p-3 bg-white border border-[#E5E7EB] text-xs">
                  <span className="text-[#647488]">GSTIN</span>
                  <span className="font-mono font-bold text-[#0F2130]">09BDRPA4213J1ZJ</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white border border-[#E5E7EB] text-xs">
                  <span className="text-[#647488]">Steel Grades</span>
                  <span className="font-bold text-[#0F2130]">IS 2062 E250 / E350</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white border border-[#E5E7EB] text-xs">
                  <span className="text-[#647488]">Galvanizing</span>
                  <span className="font-bold text-[#0F2130]">IS 2629 / IS 4759</span>
                </div>
              </div>

              <Link
                to="/about"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#0F2130] hover:bg-[#1E3A52] text-white text-xs font-bold uppercase tracking-wider transition-colors"
              >
                <span>Read Full Company Profile</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ── Portals to Dedicated Pages ─────────────────────────────── */}
      <section className="py-24 bg-[#F8FAFC] border-b border-[#E5E7EB]">
        <div className="max-w-[1320px] mx-auto px-6 md:px-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-[12px] font-bold text-[#0049CA] tracking-[0.06em] uppercase">
                Explore Dedicated Sections
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0F2130] mt-1">
                Explore The CSF Platform
              </h2>
            </div>
            <p className="text-sm text-[#647488] max-w-md">
              Access comprehensive technical specifications, CAD cross-sections, industrial capabilities, and verified project deployments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1: Products */}
            <div className="border border-[#E5E7EB] bg-white p-8 flex flex-col justify-between hover:border-[#0049CA] transition-all duration-200 group">
              <div>
                <div className="w-12 h-12 bg-[#0049CA]/10 text-[#0049CA] flex items-center justify-center mb-6 group-hover:bg-[#0049CA] group-hover:text-white transition-colors">
                  <Layers className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono font-bold text-[#647488] uppercase block mb-1">
                  10 Products // 3 Categories
                </span>
                <h3 className="text-xl font-bold text-[#0F2130] mb-3 group-hover:text-[#0049CA] transition-colors">
                  Products &amp; Channels
                </h3>
                <p className="text-xs text-[#647488] leading-relaxed mb-6">
                  Interactive CAD profile cross-section switcher ($80\times40$, $60\times40$, $41\times41$), hybrid inverters, and ACDB/DCDB enclosures.
                </p>
              </div>

              <Link
                to="/products"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#0049CA] hover:text-[#003CAD] uppercase tracking-wider"
              >
                <span>Browse Products</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Card 2: Capabilities */}
            <div className="border border-[#E5E7EB] bg-white p-8 flex flex-col justify-between hover:border-[#0049CA] transition-all duration-200 group">
              <div>
                <div className="w-12 h-12 bg-[#0049CA]/10 text-[#0049CA] flex items-center justify-center mb-6 group-hover:bg-[#0049CA] group-hover:text-white transition-colors">
                  <Factory className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono font-bold text-[#647488] uppercase block mb-1">
                  8 Capabilities // 5-Step Process
                </span>
                <h3 className="text-xl font-bold text-[#0F2130] mb-3 group-hover:text-[#0049CA] transition-colors">
                  Capabilities &amp; Process
                </h3>
                <p className="text-xs text-[#647488] leading-relaxed mb-6">
                  High-speed automated roll forming, zero-tolerance slot punching, on-site erection support, and full commissioning coordination.
                </p>
              </div>

              <Link
                to="/capabilities"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#0049CA] hover:text-[#003CAD] uppercase tracking-wider"
              >
                <span>View Capabilities</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Card 3: Projects & Applications */}
            <div className="border border-[#E5E7EB] bg-white p-8 flex flex-col justify-between hover:border-[#0049CA] transition-all duration-200 group">
              <div>
                <div className="w-12 h-12 bg-[#0049CA]/10 text-[#0049CA] flex items-center justify-center mb-6 group-hover:bg-[#0049CA] group-hover:text-white transition-colors">
                  <Building className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono font-bold text-[#647488] uppercase block mb-1">
                  5 Application Domains
                </span>
                <h3 className="text-xl font-bold text-[#0F2130] mb-3 group-hover:text-[#0049CA] transition-colors">
                  Projects &amp; Applications
                </h3>
                <p className="text-xs text-[#647488] leading-relaxed mb-6">
                  Utility ground-mount arrays, commercial rooftop framing, industrial purlin sheds, and solar electrical installations.
                </p>
              </div>

              <Link
                to="/projects"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#0049CA] hover:text-[#003CAD] uppercase tracking-wider"
              >
                <span>View Project Deployments</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Card 4: Contact & RFQ */}
            <div className="border border-[#0049CA] bg-[#0049CA]/5 p-8 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 bg-[#0049CA] text-white flex items-center justify-center mb-6">
                  <PhoneCall className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono font-bold text-[#0049CA] uppercase block mb-1">
                  Factory-Direct Quotes
                </span>
                <h3 className="text-xl font-bold text-[#0F2130] mb-3">
                  Proposals &amp; RFQs
                </h3>
                <p className="text-xs text-[#647488] leading-relaxed mb-6">
                  Receive formal bill of materials estimates and price schedules from our technical desk within 4 business hours.
                </p>
              </div>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#0049CA] hover:text-[#003CAD] uppercase tracking-wider"
              >
                <span>Request Quotation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ── Section 07: The 4 Core Principles ─────────────────────── */}
      <section className="py-24 bg-[#0F2130] text-white">
        <div className="max-w-[1320px] mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-[#647488]/30 pb-6">
            <div>
              <span className="text-[12px] font-bold text-[#0049CA] tracking-[0.06em] uppercase">
                Why Central Structure Fabrication
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-1">
                The 4 Core Principles
              </h2>
            </div>
            <p className="text-sm text-[#E5E7EB]/70 max-w-md">
              Engineered solar infrastructure manufactured to rigid structural and electrical tolerances.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {principles.map((item) => (
              <div
                key={item.num}
                className="border border-[#647488]/30 bg-white/5 p-6 flex flex-col justify-between"
              >
                <div>
                  <span className="text-3xl font-mono font-bold text-[#0049CA] block mb-4">
                    {item.num}
                  </span>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-xs text-[#E5E7EB]/80 leading-relaxed">{item.desc}</p>
                </div>
                <div className="mt-8 pt-4 border-t border-[#647488]/30">
                  <span className="text-[11px] text-[#0049CA] font-semibold uppercase tracking-wider">
                    Core Standard
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quick RFQ Callback Form ───────────────────────────────── */}
      <section className="py-24 bg-[#FFFFFF]">
        <div className="max-w-[1320px] mx-auto px-6 md:px-10">
          <div className="border border-[#E5E7EB] bg-[#F8FAFC] p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              <div className="lg:col-span-5">
                <span className="text-xs font-bold text-[#0049CA] uppercase tracking-wider block mb-2">
                  Immediate Callback
                </span>
                <h3 className="text-3xl font-bold text-[#0F2130] mb-4">
                  Request a Factory Consultation
                </h3>
                <p className="text-sm text-[#647488] leading-relaxed mb-6">
                  Share your phone number and project requirement. Our technical commercial desk will contact you within 4 business hours to discuss specifications, tonnage, and delivery schedules.
                </p>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#0F2130]">
                    <Check className="w-4 h-4 text-[#0049CA]" />
                    <span>Direct discussion with Amroha factory engineers</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#0F2130]">
                    <Check className="w-4 h-4 text-[#0049CA]" />
                    <span>Free preliminary BOM calculation &amp; pricing estimate</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#0F2130]">
                    <Check className="w-4 h-4 text-[#0049CA]" />
                    <span>Zero spam — strictly technical callback</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 bg-white border border-[#E5E7EB] p-8">
                {isSubmitted ? (
                  <div className="p-6 bg-[#0049CA]/5 border border-[#0049CA]/20 text-center">
                    <CheckCircle2 className="w-10 h-10 text-[#0049CA] mx-auto mb-3" />
                    <h4 className="text-xl font-bold text-[#0F2130] mb-2">Callback Request Received</h4>
                    <p className="text-xs text-[#647488] mb-4">
                      Our engineering desk will contact you shortly at <strong>+91 {quickPhone}</strong>.
                    </p>
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setQuickPhone('');
                        setQuickName('');
                      }}
                      className="px-4 py-2 bg-[#0049CA] text-white text-xs font-bold uppercase tracking-wider"
                    >
                      Submit Another Request
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleQuickSubmit} className="space-y-4">
                    {serverError && (
                      <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                        {serverError}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#0F2130] mb-1">
                          Your Name
                        </label>
                        <input
                          type="text"
                          value={quickName}
                          onChange={(e) => setQuickName(e.target.value)}
                          placeholder="e.g. Vikas Sharma"
                          className="w-full px-3 py-2.5 border border-[#E5E7EB] text-sm text-[#0F2130] bg-[#F8FAFC] focus:border-[#0049CA] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#0F2130] mb-1">
                          Phone Number <span className="text-[#0049CA]">*</span>
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-2.5 text-xs font-bold text-[#647488] font-mono">
                            +91
                          </span>
                          <input
                            type="tel"
                            required
                            value={quickPhone}
                            onChange={handlePhoneChange}
                            placeholder="9876543210"
                            maxLength={10}
                            className={`w-full pl-12 pr-3 py-2.5 border text-sm text-[#0F2130] bg-[#F8FAFC] font-mono focus:outline-none ${
                              phoneError ? 'border-red-500' : 'border-[#E5E7EB] focus:border-[#0049CA]'
                            }`}
                          />
                        </div>
                        {phoneError && (
                          <span className="text-[10px] text-red-600 font-medium mt-1 block">
                            {phoneError}
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#0F2130] mb-1">
                        Requirement
                      </label>
                      <select
                        value={quickRequirement}
                        onChange={(e) => setQuickRequirement(e.target.value)}
                        className="w-full px-3 py-2.5 border border-[#E5E7EB] text-sm text-[#0F2130] bg-[#F8FAFC] focus:border-[#0049CA] focus:outline-none"
                      >
                        <option value="Solar Structures & Mounting Systems">Solar Structures &amp; Mounting Systems</option>
                        <option value="C-Channel 80x40 / 60x40 Roll-Forming">C-Channel 80×40 / 60×40 Roll-Forming</option>
                        <option value="41x41 Strut Channel Systems">41×41 Strut Channel Systems</option>
                        <option value="Solar Hybrid Inverter Trading">Solar Hybrid Inverter Trading</option>
                        <option value="ACDB / DCDB Manufacturing">ACDB / DCDB Manufacturing</option>
                        <option value="Solar Clamping Hardware & Fasteners">Solar Clamping Hardware &amp; Fasteners</option>
                      </select>
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto px-6 py-3 bg-[#0049CA] hover:bg-[#003CAD] text-white text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors disabled:opacity-50 inline-flex items-center justify-center gap-2"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>{isSubmitting ? 'Submitting...' : 'Request Callback'}</span>
                      </button>

                      <Link
                        to="/contact"
                        className="text-xs font-bold text-[#0F2130] hover:text-[#0049CA] inline-flex items-center gap-1"
                      >
                        <span>Or submit detailed RFQ with drawings</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </form>
                )}
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
