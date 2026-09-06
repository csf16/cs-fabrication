import React, { useState } from 'react';
import { MapPin, Mail, Clock, Send, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';
import { submitLeadToGoogleSheet, validatePhoneNumber } from '../services/leadService';

export const ContactPage: React.FC = () => {
  useSEO({
    title: 'Request a Proposal | Contact Central Structure Fabrication (CSF) — Amroha, UP',
    description:
      'Contact Central Structure Fabrication (CSF) in Amroha, Uttar Pradesh. Request quotes for solar mounting structures, cold-formed C-channels, and custom steel components. Fast turnaround and IS-compliant engineering.',
    keywords:
      'contact Central Structure Fabrication, CSF quote India, solar structure proposal, solar racking RFQ, C channel price UP, solar mounting supplier contact Amroha',
    canonical: 'https://www.csfabrication.in/contact',
    ogTitle: 'Contact CSF — Request a Solar Structure Proposal',
    ogDescription:
      'Get a factory-direct quote for ground mount, rooftop, or carport solar mounting structures from Central Structure Fabrication, Amroha, UP.',
  });

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    projectType: 'Ground Mounted Fixed Tilt',
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
    setFormData(prev => ({ ...prev, phone: val }));
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
      const requirementSummary = `[${formData.projectType}] Location: ${formData.location || 'N/A'}, Capacity: ${formData.capacity || 'N/A'}, Notes: ${formData.notes || 'None'}`;
      await submitLeadToGoogleSheet(
        formData.phone,
        'Contact Page - RFQ Form',
        {
          name: formData.name,
          company: formData.company,
          requirement: requirementSummary,
        }
      );
      setIsSubmitted(true);
    } catch (err: any) {
      setServerError(err?.message || 'Unable to submit request. Please try again or email info.csf16@gmail.com directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full pt-32 pb-24 bg-[#FFFFFF] text-[#0F2130]">
      <div className="max-w-[1340px] mx-auto px-6 md:px-12 lg:px-20">

        {/* Page Header */}
        <div className="flex flex-col gap-4 mb-16 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0049CA]/10 border border-[#0049CA]/20 text-[#0049CA] text-xs font-semibold uppercase tracking-wider w-fit">
            <span className="w-2 h-2 rounded-full bg-[#0049CA]" />
            <span>Direct Engineering Inquiries</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#0F2130] tracking-tight leading-[1.08] uppercase">
            Request Proposal &amp; Pricing
          </h1>

          <p className="text-base sm:text-lg text-[#647488] font-normal leading-relaxed">
            Submit your solar project parameters to receive an engineering feasibility review, steel tonnage breakdown, and direct manufacturer quote within 1 business day.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left Column: Direct Contact & Office Details (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl p-8 flex flex-col gap-6 shadow-sm">
              <span className="text-xs font-bold text-[#0049CA] uppercase tracking-wider">
                Direct Channels
              </span>

              <h3 className="text-2xl font-bold uppercase text-[#0F2130]">
                Manufacturing &amp; Engineering Operations
              </h3>

              <div className="flex flex-col gap-5 text-xs">
                <div className="flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-[#0049CA] flex-shrink-0 mt-0.5" />
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-[#647488] uppercase font-semibold">Manufacturing Facility</span>
                    <span className="text-[#0F2130] font-medium leading-relaxed">
                      Mohanpur Shumali, Post Basera Taga,<br />
                      Jamna Khas Road, Tahseel Naugaon Sadat,<br />
                      District Amroha, Uttar Pradesh — 244221, India
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Mail className="w-5 h-5 text-[#0049CA] flex-shrink-0 mt-0.5" />
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-[#647488] uppercase font-semibold">Official Inquiries Email</span>
                    <a href="mailto:info.csf16@gmail.com" className="text-[#0F2130] font-medium hover:text-[#0049CA] transition-colors">
                      info.csf16@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <ShieldCheck className="w-5 h-5 text-[#0049CA] flex-shrink-0 mt-0.5" />
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-[#647488] uppercase font-semibold">Enterprise Registration</span>
                    <span className="text-[#0F2130] font-medium">GSTIN: 09BDRPA4213J1ZJ</span>
                    <span className="text-[#647488]">UDYAM-UP-40-0014133 (Micro Enterprise)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Clock className="w-5 h-5 text-[#0049CA] flex-shrink-0 mt-0.5" />
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-[#647488] uppercase font-semibold">Production Hours</span>
                    <span className="text-[#0F2130] font-medium">Monday – Saturday: 09:00 to 18:30 IST</span>
                    <span className="text-[#647488]">Dispatch Operations Active Daily</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quality Commitment Card */}
            <div className="bg-[#0F2130] text-white rounded-2xl p-8 flex flex-col gap-4 shadow-xl">
              <span className="text-xs font-bold text-[#0049CA] uppercase tracking-wider">
                Manufacturing Assurance
              </span>
              <h4 className="text-lg font-bold uppercase tracking-tight text-white">
                Prime Steel &amp; 100% Quality Verification
              </h4>
              <p className="text-xs text-white/75 leading-relaxed">
                All raw steel coils are accompanied by Mill Test Certificates (MTC). Profiles are 100% checked for coating thickness, slot dimensions, and flange parallelity prior to dispatch.
              </p>
            </div>
          </div>
          {/* Right Column: RFQ Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl p-8 sm:p-12 shadow-md">
            {isSubmitted ? (
              <div className="py-16 flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[#0049CA]/10 text-[#0049CA] flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-[#0F2130] uppercase">
                  Proposal Request Logged
                </h3>
                <p className="text-sm text-[#647488] max-w-md leading-relaxed">
                  Thank you, {formData.name || 'there'}. Your structural parameters have been sent directly to our engineering desk. A specialist will follow up within 1 business day.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: '', company: '', phone: '', projectType: 'Ground Mounted Fixed Tilt', capacity: '', location: '', notes: '' });
                  }}
                  className="mt-4 px-6 py-3 bg-[#0049CA] hover:bg-[#003bb0] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="flex flex-col gap-1 pb-4 border-b border-[#E5E7EB]">
                  <span className="text-xs font-bold text-[#0049CA] uppercase tracking-wider">
                    Online RFQ
                  </span>
                  <h3 className="text-2xl font-bold uppercase text-[#0F2130]">
                    Project Specifications Form
                  </h3>
                  <p className="text-xs text-[#647488]">
                    Fields marked with an asterisk (<span className="text-[#0049CA]">*</span>) are required.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-[#0F2130] uppercase tracking-wider">
                      Full Name <span className="text-[#0049CA]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikram Verma"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="px-4 py-3 bg-white border border-[#E5E7EB] rounded-xl text-sm text-[#0F2130] placeholder-[#647488]/60 focus:outline-none focus:border-[#0049CA] transition-colors"
                    />
                  </div>

                  {/* Company */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-[#0F2130] uppercase tracking-wider">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. SunPower EPC Pvt Ltd"
                      value={formData.company}
                      onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                      className="px-4 py-3 bg-white border border-[#E5E7EB] rounded-xl text-sm text-[#0F2130] placeholder-[#647488]/60 focus:outline-none focus:border-[#0049CA] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Phone */}
                  <div className="flex flex-col gap-2 sm:col-span-2">
                    <label className="text-xs font-semibold text-[#0F2130] uppercase tracking-wider">
                      Mobile Number <span className="text-[#0049CA]">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-xs font-semibold text-[#647488]">
                        +91
                      </div>
                      <input
                        type="tel"
                        required
                        placeholder="98765 43210"
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        className={`w-full pl-14 pr-4 py-3 bg-white border rounded-xl text-sm text-[#0F2130] placeholder-[#647488]/60 focus:outline-none transition-colors ${phoneError ? 'border-red-500' : 'border-[#E5E7EB] focus:border-[#0049CA]'
                          }`}
                      />
                    </div>
                    {phoneError && (
                      <span className="text-xs text-red-600 font-medium">
                        {phoneError}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Project Type */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-[#0F2130] uppercase tracking-wider">
                      Structure Type
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData(prev => ({ ...prev, projectType: e.target.value }))}
                      className="px-4 py-3 bg-white border border-[#E5E7EB] rounded-xl text-sm text-[#0F2130] focus:outline-none focus:border-[#0049CA] transition-colors"
                    >
                      <option value="Ground Mounted Fixed Tilt">Ground Mounted Fixed Tilt</option>
                      <option value="Rooftop Solar Structures">Rooftop Solar Structures</option>
                      <option value="Solar Carports">Solar Carports</option>
                      <option value="C-Channels & Purlins">C-Channels &amp; Purlins</option>
                      <option value="Custom Fabrication">Custom Fabrication</option>
                    </select>
                  </div>

                  {/* Capacity / Tonnage */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-[#0F2130] uppercase tracking-wider">
                      Capacity / Steel Tonnage
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 5 MW / 150 Tons"
                      value={formData.capacity}
                      onChange={(e) => setFormData(prev => ({ ...prev, capacity: e.target.value }))}
                      className="px-4 py-3 bg-white border border-[#E5E7EB] rounded-xl text-sm text-[#0F2130] placeholder-[#647488]/60 focus:outline-none focus:border-[#0049CA] transition-colors"
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-[#0F2130] uppercase tracking-wider">
                    Project Site Location (State / City)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Jodhpur, Rajasthan / Noida, UP"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    className="px-4 py-3 bg-white border border-[#E5E7EB] rounded-xl text-sm text-[#0F2130] placeholder-[#647488]/60 focus:outline-none focus:border-[#0049CA] transition-colors"
                  />
                </div>

                {/* Notes */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-[#0F2130] uppercase tracking-wider">
                    Technical Specifications / Notes
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Provide details such as profile cross-section (e.g. 41x41 or 80x40 mm), coating thickness (85µm HDG), wind load parameters, or target commissioning dates."
                    value={formData.notes}
                    onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                    className="px-4 py-3 bg-white border border-[#E5E7EB] rounded-xl text-sm text-[#0F2130] placeholder-[#647488]/60 focus:outline-none focus:border-[#0049CA] transition-colors resize-none"
                  />
                </div>

                {serverError && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600">
                    {serverError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#0049CA] hover:bg-[#003bb0] disabled:bg-[#0049CA]/60 text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group mt-2"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Transmitting Project Parameters...</span>
                    </span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Proposal Request</span>
                      <ArrowRight className="w-4 h-4 transform transition-transform duration-200 group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
