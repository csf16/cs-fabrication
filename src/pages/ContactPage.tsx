import React, { useState } from 'react';
import { useSEO } from '../hooks/useSEO';
import {
  MapPin,
  Mail,
  Clock,
  CheckCircle2,
  PhoneCall,
  ArrowRight
} from 'lucide-react';
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

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    productCategory: 'Solar Structures & Mounting Systems',
    capacity: '',
    location: '',
    notes: '',
  });

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
      setPhoneError(validation.error || 'Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    setIsSubmitting(true);

    try {
      const requirementSummary = `[${formData.productCategory}] Location: ${formData.location || 'N/A'}, Capacity/Qty: ${formData.capacity || 'N/A'}, Email: ${formData.email || 'N/A'}, Notes: ${formData.notes || 'None'}`;
      await submitLeadToGoogleSheet(formData.phone, 'Contact Page - RFQ Form', {
        name: formData.name,
        company: formData.company,
        requirement: requirementSummary,
      });
      setIsSubmitted(true);
    } catch (err: any) {
      setServerError(err?.message || 'Unable to submit request. Please try again or email info.csf16@gmail.com directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full pt-28 pb-24 bg-[#FFFFFF] text-[#0F2130]">
      <div className="max-w-[1320px] mx-auto px-6 md:px-10">
        
        {/* ── Page Header ─────────────────────────────────────────── */}
        <div className="flex flex-col gap-4 mb-16 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0049CA]/10 text-[#0049CA] text-[12px] font-semibold tracking-[0.04em] uppercase w-fit">
            <span>Direct Factory Inquiries</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#0F2130] leading-[1.1]">
            Request a Proposal or Callback
          </h1>
          <p className="text-base sm:text-lg text-[#647488] leading-relaxed">
            Connect directly with our engineering and commercial teams at the Amroha manufacturing facility. We respond with formal technical proposals and bill-of-materials estimates within 4 business hours.
          </p>
        </div>

        {/* ── Form & Contact Grid ─────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: RFQ Form (7 cols) */}
          <div className="lg:col-span-7 border border-[#E5E7EB] bg-white p-8 md:p-10 shadow-xs">
            <div className="border-b border-[#E5E7EB] pb-6 mb-8">
              <span className="text-xs font-bold text-[#0049CA] uppercase tracking-wider block mb-1">
                Formal Request for Quote (RFQ)
              </span>
              <h2 className="text-2xl font-bold text-[#0F2130]">Technical Project Specification</h2>
            </div>

            {isSubmitted ? (
              <div className="p-8 bg-[#0049CA]/5 border border-[#0049CA]/20 text-center flex flex-col items-center">
                <div className="w-14 h-14 bg-[#0049CA] text-white flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-[#0F2130] mb-2">Proposal Request Received</h3>
                <p className="text-sm text-[#647488] max-w-md mb-6 leading-relaxed">
                  Thank you, <strong>{formData.name || 'Valued Partner'}</strong>. Your specification has been logged directly with our factory engineering desk. An engineer will contact you shortly at <strong>+91 {formData.phone}</strong>.
                </p>
                <div className="text-xs text-[#0F2130] font-mono bg-white border border-[#E5E7EB] p-3 w-full max-w-md text-left mb-6">
                  <div><strong>Category:</strong> {formData.productCategory}</div>
                  <div><strong>Location:</strong> {formData.location || 'India'}</div>
                  <div><strong>Timeframe:</strong> Response within 4 business hours</div>
                </div>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      name: '',
                      company: '',
                      phone: '',
                      email: '',
                      productCategory: 'Solar Structures & Mounting Systems',
                      capacity: '',
                      location: '',
                      notes: '',
                    });
                  }}
                  className="px-6 py-3 bg-[#0049CA] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#003CAD] cursor-pointer"
                >
                  Submit Another Specification
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {serverError && (
                  <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                    {serverError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0F2130] mb-2">
                      Your Name <span className="text-[#0049CA]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Rajesh Kumar"
                      className="w-full px-4 py-3 border border-[#E5E7EB] text-sm text-[#0F2130] placeholder-[#94A3B8] focus:border-[#0049CA] focus:outline-none bg-[#F8FAFC]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0F2130] mb-2">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Solar EPC Solutions Pvt Ltd"
                      className="w-full px-4 py-3 border border-[#E5E7EB] text-sm text-[#0F2130] placeholder-[#94A3B8] focus:border-[#0049CA] focus:outline-none bg-[#F8FAFC]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0F2130] mb-2">
                      Phone Number <span className="text-[#0049CA]">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-3.5 text-xs font-bold text-[#647488] font-mono">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        placeholder="9876543210"
                        maxLength={10}
                        className={`w-full pl-12 pr-4 py-3 border text-sm text-[#0F2130] placeholder-[#94A3B8] focus:outline-none bg-[#F8FAFC] font-mono ${
                          phoneError ? 'border-red-500' : 'border-[#E5E7EB] focus:border-[#0049CA]'
                        }`}
                      />
                    </div>
                    {phoneError && (
                      <span className="text-[11px] text-red-600 font-medium mt-1 block">
                        {phoneError}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0F2130] mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. engineer@company.com"
                      className="w-full px-4 py-3 border border-[#E5E7EB] text-sm text-[#0F2130] placeholder-[#94A3B8] focus:border-[#0049CA] focus:outline-none bg-[#F8FAFC]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#0F2130] mb-2">
                    Primary Product / Service Required <span className="text-[#0049CA]">*</span>
                  </label>
                  <select
                    value={formData.productCategory}
                    onChange={(e) => setFormData({ ...formData, productCategory: e.target.value })}
                    className="w-full px-4 py-3 border border-[#E5E7EB] text-sm text-[#0F2130] focus:border-[#0049CA] focus:outline-none bg-[#F8FAFC]"
                  >
                    <option value="Solar Structures & Mounting Systems">Solar Structures &amp; Mounting Systems</option>
                    <option value="C-Channel 80x40x15 / 60x40x15">C-Channel 80×40×15 / 60×40×15 Roll-Forming</option>
                    <option value="41x41 Strut Channel Systems">41×41 Strut Channel Framing</option>
                    <option value="Solar Hybrid Inverter Supply">Solar Hybrid Inverter Supply &amp; Trading</option>
                    <option value="ACDB / DCDB Manufacturing">ACDB / DCDB Electrical Panel Manufacturing</option>
                    <option value="Solar Clamping Hardware & Fasteners">Solar Clamping Hardware, Mid/End Clamps &amp; Fasteners</option>
                    <option value="On-Site Installation & Commissioning">On-Site Installation &amp; Commissioning Coordination</option>
                    <option value="Custom Metal Fabrication & Base Plates">Custom Metal Fabrication &amp; Base Plates</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0F2130] mb-2">
                      Project Capacity / Steel Tonnage
                    </label>
                    <input
                      type="text"
                      value={formData.capacity}
                      onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                      placeholder="e.g. 50 kW Rooftop / 20 Tons Purlin"
                      className="w-full px-4 py-3 border border-[#E5E7EB] text-sm text-[#0F2130] placeholder-[#94A3B8] focus:border-[#0049CA] focus:outline-none bg-[#F8FAFC]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0F2130] mb-2">
                      Installation / Delivery Location
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g. Noida, UP / Jaipur, RJ"
                      className="w-full px-4 py-3 border border-[#E5E7EB] text-sm text-[#0F2130] placeholder-[#94A3B8] focus:border-[#0049CA] focus:outline-none bg-[#F8FAFC]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#0F2130] mb-2">
                    Additional Specifications / Notes
                  </label>
                  <textarea
                    rows={4}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Provide details on module wattage, tilt angle, wind zone speed, or single-line diagram requirements..."
                    className="w-full px-4 py-3 border border-[#E5E7EB] text-sm text-[#0F2130] placeholder-[#94A3B8] focus:border-[#0049CA] focus:outline-none bg-[#F8FAFC]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#0049CA] hover:bg-[#003CAD] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Submitting to Engineering Desk...</span>
                  ) : (
                    <>
                      <span>Transmit Request for Quote</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Direct Info & Facility Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Factory Card */}
            <div className="border border-[#0F2130] bg-[#0F2130] text-white p-8">
              <span className="text-xs font-bold text-[#0049CA] uppercase tracking-wider block mb-2 font-mono">
                Works &amp; Fabrication Plant
              </span>
              <h3 className="text-xl font-bold mb-4">Central Structure Fabrication (CSF)</h3>
              
              <div className="space-y-4 text-xs text-[#E5E7EB]/80 leading-relaxed border-t border-[#647488]/30 pt-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#0049CA] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5">Manufacturing Facility:</strong>
                    Mohanpur Shumali, Post Basera Taga,<br />
                    Jamna Khas Road, Tahseel Naugaon Sadat,<br />
                    District Amroha, Uttar Pradesh — 244221, India
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#0049CA] shrink-0" />
                  <div>
                    <strong className="text-white block mb-0.5">Official Direct Email:</strong>
                    <a href="mailto:info.csf16@gmail.com" className="text-[#0049CA] hover:underline font-mono">
                      info.csf16@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[#0049CA] shrink-0" />
                  <div>
                    <strong className="text-white block mb-0.5">Operating Hours:</strong>
                    Monday – Saturday: 08:30 – 18:30 IST
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-[#647488]/30">
                <span className="text-[11px] text-[#E5E7EB]/60 uppercase tracking-wider block font-mono">
                  Guaranteed SLA
                </span>
                <span className="text-sm font-bold text-white mt-1 block">
                  Proposal delivered within 4 business hours
                </span>
              </div>
            </div>

            {/* Official Credentials Box */}
            <div className="border border-[#E5E7EB] bg-[#F8FAFC] p-6">
              <span className="text-xs font-bold text-[#0049CA] uppercase tracking-wider block mb-3">
                Commercial &amp; Regulatory Identifiers
              </span>
              <div className="space-y-3">
                <div className="p-3 bg-white border border-[#E5E7EB] flex items-center justify-between">
                  <span className="text-xs text-[#647488] font-medium">GSTIN</span>
                  <span className="text-xs font-bold text-[#0F2130] font-mono">09BDRPA4213J1ZJ</span>
                </div>
                <div className="p-3 bg-white border border-[#E5E7EB] flex items-center justify-between">
                  <span className="text-xs text-[#647488] font-medium">UDYAM Registration</span>
                  <span className="text-xs font-bold text-[#0F2130] font-mono">UDYAM-UP-40-0014133</span>
                </div>
                <div className="p-3 bg-white border border-[#E5E7EB] flex items-center justify-between">
                  <span className="text-xs text-[#647488] font-medium">Enterprise Category</span>
                  <span className="text-xs font-bold text-[#0F2130]">Micro Enterprise (MSME)</span>
                </div>
                <div className="p-3 bg-white border border-[#E5E7EB] flex items-center justify-between">
                  <span className="text-xs text-[#647488] font-medium">Operating Jurisdiction</span>
                  <span className="text-xs font-bold text-[#0F2130]">Uttar Pradesh (Code 09)</span>
                </div>
              </div>
            </div>

            {/* Quick Consultation Call Box */}
            <div className="border border-[#0049CA]/30 bg-[#0049CA]/5 p-6">
              <div className="flex items-center gap-3 mb-2">
                <PhoneCall className="w-5 h-5 text-[#0049CA]" />
                <h4 className="text-sm font-bold text-[#0F2130]">Urgent Project Timeline?</h4>
              </div>
              <p className="text-xs text-[#647488] leading-relaxed">
                If your project has an immediate tender deadline or requires urgent coil slit allocation, fill out the form above or email our desk with subject tag <strong>[URGENT RFQ]</strong>.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default ContactPage;
