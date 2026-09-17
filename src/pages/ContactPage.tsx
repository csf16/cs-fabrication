import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';
import { MapPin, Mail, Clock, CheckCircle2, ArrowRight, Navigation } from 'lucide-react';
import { submitLeadToGoogleSheet, validatePhoneNumber } from '../services/leadService';

export const ContactPage: React.FC = () => {
  useSEO({
    title: 'Contact & Request Proposal | Central Structure Fabrication (CSF) — Amroha, UP',
    description:
      'Contact Central Structure Fabrication (CSF) in Amroha, Uttar Pradesh. Request factory-direct quotes for solar structures, C-channels, strut channels, solar hybrid inverters, and ACDB/DCDB panels.',
    keywords:
      'contact Central Structure Fabrication, CSF RFQ, solar structure price India, C channel manufacturer Amroha, ACDB DCDB quote, solar mounting quotation',
    canonical: 'https://www.csfabrication.in/contact',
    ogTitle: 'Contact CSF — Request a Proposal & Direct Factory Quote',
    ogDescription:
      'Direct factory quotes for solar mounting structures, cold-roll formed channels, and electrical distribution boxes. Mohanpur Shumali, Amroha, UP.',
  });

  const location = useLocation();

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    productCategory: 'Solar Structures & Mounting Systems',
    notes: '',
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const service = params.get('service') || params.get('requirement') || '';
    if (service) {
      // Map common categories if applicable
      const lower = service.toLowerCase();
      let matchedCategory = 'Solar Structures & Mounting Systems';
      if (lower.includes('c-channel') || lower.includes('c channel') || lower.includes('80x40') || lower.includes('60x40')) {
        matchedCategory = 'C-Channel 80x40x15 / 60x40x15';
      } else if (lower.includes('strut') || lower.includes('41x41')) {
        matchedCategory = '41x41 Strut Channel Systems';
      } else if (lower.includes('inverter') || lower.includes('hybrid')) {
        matchedCategory = 'Solar Hybrid Inverter Supply';
      } else if (lower.includes('acdb') || lower.includes('dcdb') || lower.includes('panel')) {
        matchedCategory = 'ACDB / DCDB Manufacturing';
      } else if (lower.includes('hardware') || lower.includes('clamp') || lower.includes('fastener')) {
        matchedCategory = 'Solar Clamping Hardware & Fasteners';
      } else if (lower.includes('installation') || lower.includes('commissioning')) {
        matchedCategory = 'On-Site Installation & Commissioning';
      }

      setFormData((prev) => ({
        ...prev,
        productCategory: matchedCategory,
        notes: prev.notes ? prev.notes : `Requirement: ${service}`,
      }));
    }
  }, [location.search]);

  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFormData((prev) => ({ ...prev, phone: val }));
    if (phoneError) {
      const res = validatePhoneNumber(val);
      if (res.isValid) setPhoneError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    const validation = validatePhoneNumber(formData.phone);
    if (!validation.isValid) {
      setPhoneError(validation.error || 'Enter a valid 10-digit Indian mobile number.');
      return;
    }
    setIsSubmitting(true);
    try {
      await submitLeadToGoogleSheet(formData.phone, 'Contact Page - RFQ Form', {
        name: formData.name,
        company: formData.company,
        email: formData.email,
        requirement: formData.productCategory,
        notes: formData.notes,
      });
      setIsSubmitted(true);
    } catch (err: any) {
      setServerError(err?.message || 'Unable to submit. Please email info.csf16@gmail.com directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-[#FFFFFF] text-[#0F2130] min-h-screen">

      {/* ── HERO SPLIT SECTION ─────────────────────────────────── */}
      <section className="w-full grid grid-cols-1 lg:grid-cols-2 min-h-screen">

        {/* LEFT — Industrial Photo Panel */}
        <div className="relative min-h-[560px] lg:min-h-screen pt-28 sm:pt-32 pb-12 sm:pb-16 lg:py-32 px-6 sm:px-10 md:px-16 flex flex-col justify-between overflow-hidden">
          <img
            src="/images/csf-hero-factory.png"
            alt="CSF Solar Manufacturing Facility — Amroha, Uttar Pradesh"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Dark overlay for legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#07131F]/95 via-[#07131F]/85 to-[#07131F]/75" />

          {/* Info block (Full natural flow, 100% visible on phone and desktop) */}
          <div className="relative z-10 flex flex-col justify-between h-full">
            <div className="border-l-2 border-[#0049CA] pl-4 sm:pl-5">
              <p className="text-[11px] font-mono font-bold text-[#60A5FA] uppercase tracking-[0.14em] mb-2">
                Manufacturing Facility
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight mb-3">
                Central Structure<br />Fabrication (CSF)
              </h2>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-sm mb-5">
                Mohanpur Shumali, Post Basera Taga,<br />
                Tahseel Naugaon Sadat, District Amroha,<br />
                Uttar Pradesh — 244221, India
              </p>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Mohanpur+Shumali+Amroha+Uttar+Pradesh+244221+India"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0049CA] hover:bg-white hover:text-[#0F2130] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm w-fit"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Take Me There</span>
              </a>
            </div>

            {/* Contact strips */}
            <div className="mt-10 sm:mt-12 pt-6 border-t border-white/15 space-y-3">
              <a
                href="mailto:info.csf16@gmail.com"
                className="flex items-center gap-3 group"
              >
                <div className="w-8 h-8 rounded-lg bg-[#0049CA] flex items-center justify-center shrink-0">
                  <Mail className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-xs sm:text-sm text-white/90 group-hover:text-white transition-colors font-mono">
                  info.csf16@gmail.com
                </span>
              </a>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#0049CA]/30 border border-[#0049CA]/40 flex items-center justify-center shrink-0">
                  <Clock className="w-3.5 h-3.5 text-[#60A5FA]" />
                </div>
                <span className="text-xs sm:text-sm text-white/80 font-mono">
                  Mon – Sat: 08:30 – 18:30 IST
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#0049CA]/30 border border-[#0049CA]/40 flex items-center justify-center shrink-0">
                  <MapPin className="w-3.5 h-3.5 text-[#60A5FA]" />
                </div>
                <span className="text-xs sm:text-sm text-white/80 font-mono">
                  GSTIN: 09BDRPA4213J1ZJ
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — Form Panel */}
        <div className="bg-[#FFFFFF] flex flex-col justify-center px-6 sm:px-10 md:px-16 py-12 sm:py-16 lg:py-32">

          {/* Header */}
          <div className="mb-10">
            <p className="text-[11px] font-mono font-bold text-[#0049CA] uppercase tracking-[0.12em] mb-3">
              Our Contacts
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#0F2130] leading-[1.1] tracking-tight">
              Get in touch<br />with us
            </h1>
            <div className="w-12 h-0.5 bg-[#0049CA] mt-4" />
          </div>

          {isSubmitted ? (
            /* Success state */
            <div className="border-l-2 border-[#0049CA] pl-6 py-4">
              <CheckCircle2 className="w-10 h-10 text-[#0049CA] mb-4" />
              <h3 className="text-2xl font-bold text-[#0F2130] mb-2">Request Received</h3>
              <p className="text-sm text-[#647488] leading-relaxed mb-6">
                Thank you, <strong>{formData.name || 'Valued Partner'}</strong>. Our team will contact you at <strong className="font-mono">+91 {formData.phone}</strong> within 4 business hours.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({ name: '', company: '', phone: '', email: '', productCategory: 'Solar Structures & Mounting Systems', notes: '' });
                }}
                className="text-xs font-bold text-[#0049CA] uppercase tracking-wider hover:underline cursor-pointer"
              >
                Submit Another Request →
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-0">

              {serverError && (
                <div className="mb-6 p-4 bg-red-50 border-l-2 border-red-500 text-red-700 text-xs font-medium">
                  {serverError}
                </div>
              )}

              {/* Name */}
              <div className="border-b border-[#E5E7EB] pb-5 mb-5">
                <label className="block text-[10px] font-bold text-[#647488] uppercase tracking-[0.1em] mb-2">
                  Your Name <span className="text-[#0049CA]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Rajesh Kumar"
                  className="w-full bg-transparent text-base font-semibold text-[#0F2130] placeholder-[#C0C8D2] focus:outline-none"
                />
              </div>

              {/* Company */}
              <div className="border-b border-[#E5E7EB] pb-5 mb-5">
                <label className="block text-[10px] font-bold text-[#647488] uppercase tracking-[0.1em] mb-2">
                  Company / Organization
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Solar EPC Solutions Pvt Ltd"
                  className="w-full bg-transparent text-base font-semibold text-[#0F2130] placeholder-[#C0C8D2] focus:outline-none"
                />
              </div>

              {/* Phone */}
              <div className="border-b border-[#E5E7EB] pb-5 mb-5">
                <label className="block text-[10px] font-bold text-[#647488] uppercase tracking-[0.1em] mb-2">
                  Phone Number <span className="text-[#0049CA]">*</span>
                </label>
                <div className="flex items-center gap-3">
                  <span className="text-base font-bold text-[#0F2130] font-mono">+91</span>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    placeholder="9876543210"
                    maxLength={10}
                    className={`flex-1 bg-transparent text-base font-semibold text-[#0F2130] placeholder-[#C0C8D2] font-mono focus:outline-none ${
                      phoneError ? 'text-red-600' : ''
                    }`}
                  />
                </div>
                {phoneError && (
                  <span className="text-[11px] text-red-500 font-medium mt-1 block">{phoneError}</span>
                )}
              </div>

              {/* Email */}
              <div className="border-b border-[#E5E7EB] pb-5 mb-5">
                <label className="block text-[10px] font-bold text-[#647488] uppercase tracking-[0.1em] mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="engineer@company.com"
                  className="w-full bg-transparent text-base font-semibold text-[#0F2130] placeholder-[#C0C8D2] focus:outline-none"
                />
              </div>

              {/* Requirement */}
              <div className="border-b border-[#E5E7EB] pb-5 mb-5">
                <label className="block text-[10px] font-bold text-[#647488] uppercase tracking-[0.1em] mb-2">
                  Product / Requirement
                </label>
                <select
                  value={formData.productCategory}
                  onChange={(e) => setFormData({ ...formData, productCategory: e.target.value })}
                  className="w-full bg-transparent text-base font-semibold text-[#0F2130] focus:outline-none appearance-none cursor-pointer"
                >
                  <option value="Solar Structures & Mounting Systems">Solar Structures &amp; Mounting Systems</option>
                  <option value="C-Channel 80x40x15 / 60x40x15">C-Channel 80×40×15 / 60×40×15</option>
                  <option value="41x41 Strut Channel Systems">41×41 Strut Channel Framing</option>
                  <option value="Solar Hybrid Inverter Supply">Solar Hybrid Inverter Supply</option>
                  <option value="ACDB / DCDB Manufacturing">ACDB / DCDB Panel Manufacturing</option>
                  <option value="Solar Clamping Hardware & Fasteners">Solar Clamping Hardware &amp; Fasteners</option>
                  <option value="On-Site Installation & Commissioning">Installation &amp; Commissioning</option>
                  <option value="Custom Metal Fabrication">Custom Fabrication &amp; Base Plates</option>
                </select>
              </div>

              {/* Message */}
              <div className="border-b border-[#E5E7EB] pb-5 mb-8">
                <label className="block text-[10px] font-bold text-[#647488] uppercase tracking-[0.1em] mb-2">
                  Message / Project Notes
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="e.g. 50 kW rooftop, 20T purlins, wind zone IV, delivery to Noida..."
                  className="w-full bg-transparent text-base font-semibold text-[#0F2130] placeholder-[#C0C8D2] focus:outline-none resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="group w-full bg-[#0049CA] hover:bg-[#003CAD] text-white px-8 py-4.5 rounded-full text-sm font-bold uppercase tracking-[0.1em] flex items-center justify-between cursor-pointer transition-all duration-200 disabled:opacity-50 shadow-md hover:shadow-lg"
              >
                <span>{isSubmitting ? 'Transmitting...' : 'Send Request'}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ── DARK INFO BAR ──────────────────────────────────────── */}
      <section className="bg-[#0F2130] border-t border-white/5">
        <div className="max-w-[1720px] mx-auto px-6 sm:px-10 md:px-16 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">

            <div className="py-10 md:pr-10">
              <p className="text-[10px] font-mono font-bold text-[#0049CA] uppercase tracking-[0.1em] mb-3">
                01 — Response Time
              </p>
              <p className="text-2xl font-bold text-white mb-1">4 Business Hours</p>
              <p className="text-xs text-white/50">Engineering desk responds with formal BOM and price estimate.</p>
            </div>

            <div className="py-10 md:px-10">
              <p className="text-[10px] font-mono font-bold text-[#0049CA] uppercase tracking-[0.1em] mb-3">
                02 — Factory Location
              </p>
              <p className="text-2xl font-bold text-white mb-1">Amroha, UP</p>
              <p className="text-xs text-white/50">Mohanpur Shumali, Tahseel Naugaon Sadat — 244221. Direct highway connectivity to Delhi-NCR.</p>
            </div>

            <div className="py-10 md:pl-10">
              <p className="text-[10px] font-mono font-bold text-[#0049CA] uppercase tracking-[0.1em] mb-3">
                03 — Credentials
              </p>
              <p className="text-2xl font-bold text-white mb-1 font-mono text-lg">09BDRPA4213J1ZJ</p>
              <p className="text-xs text-white/50">GSTIN · UDYAM-UP-40-0014133 · Micro Enterprise (MSME)</p>
            </div>

          </div>
        </div>
      </section>

      {/* ── MAP EMBED ───────────────────────────────────────────── */}
      <section className="w-full h-[400px] relative overflow-hidden bg-[#E5E7EB]">
        <iframe
          title="Central Structure Fabrication Factory Location — Amroha, UP"
          src="https://maps.google.com/maps?q=Mohanpur+Shumali+Amroha+Uttar+Pradesh+244221+India&output=embed&z=14"
          className="w-full h-full border-0 grayscale opacity-90"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        {/* Map overlay badge */}
        <div className="absolute top-6 left-6 bg-[#0F2130] text-white px-5 py-3.5 rounded-2xl shadow-xl flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 border-l-4 border-[#0049CA]">
          <div>
            <p className="text-[10px] font-mono font-bold text-[#0049CA] uppercase tracking-wider mb-0.5">Factory Pin</p>
            <p className="text-sm font-bold">Amroha, Uttar Pradesh</p>
          </div>
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=Mohanpur+Shumali+Amroha+Uttar+Pradesh+244221+India"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full bg-[#0049CA] hover:bg-white hover:text-[#0F2130] text-white text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5 shadow-sm"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Take Me There</span>
          </a>
        </div>
      </section>

    </div>
  );
};

export default ContactPage;
