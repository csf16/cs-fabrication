import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

export const ContactPage: React.FC = () => {
  useSEO({
    title: 'Request a Proposal | Contact CS Fabrication - Solar Structure Manufacturer Amroha, UP',
    description:
      'Contact Central Structure Fabrication to request a proposal for solar mounting structures, ground mount racking, rooftop frames, or custom steel fabrication. Based in Amroha, Uttar Pradesh. Call, email, or submit an RFQ online.',
    keywords:
      'contact CS Fabrication, solar structure quote India, request solar mounting proposal, solar racking RFQ India, solar structure price India, solar EPC structure enquiry, Mumbai solar structure manufacturer contact, solar frame supplier contact',
    canonical: 'https://www.csfabrication.in/contact',
    ogTitle: 'Contact CS Fabrication — Request a Solar Structure Proposal',
    ogDescription:
      'Get a quote for ground mount, rooftop, or carport solar mounting structures from CS Fabrication, Mumbai. Fast turnaround, IS-compliant engineering.',
  });

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    projectType: 'Ground Mounted Fixed Tilt',
    capacity: '',
    windSpeed: '180 km/h',
    location: '',
    notes: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="w-full pt-28 pb-24 bg-[#F5F4EF]">
      <div className="max-w-[1300px] mx-auto px-6 md:px-12">
        
        {/* Page Header */}
        <div className="flex flex-col gap-4 mb-16">
          <div className="flex items-center gap-3">
            <div className="w-8 h-[1px] bg-[#B59A68]" />
            <span className="text-[10px] font-mono tracking-[0.35em] text-[#B59A68] uppercase font-bold">
              CS FABRICATION // STRUCTURAL INQUIRY DESK
            </span>
            <div className="w-8 h-[1px] bg-[#B59A68]" />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#17191B] tracking-tight font-sans uppercase">
            Request Proposal & Pricing
          </h1>

          <p className="text-base text-[#34383B] max-w-2xl font-light leading-relaxed">
            Submit your solar project parameters to receive an engineering feasibility review, steel tonnage breakdown, and direct manufacturer quote within 24 business hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Contact & Office Details (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="bg-[#EAE8E1] border border-[#34383B]/15 rounded-sm p-8 flex flex-col gap-6 shadow-sm">
              <span className="text-xs font-mono text-[#B59A68] font-bold uppercase tracking-widest">
                DIRECT CHANNELS
              </span>
              
              <h3 className="text-xl font-bold uppercase text-[#17191B] font-sans">
                Engineering & Sales Operations
              </h3>

              <div className="flex flex-col gap-5 text-xs font-mono">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#B59A68] flex-shrink-0 mt-0.5" />
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-[#34383B]/50 uppercase font-bold">PLANT & WORKS</span>
                    <span className="text-[#17191B] font-bold">Plot No. 42-B, Industrial Area, MIDC, Mumbai, Maharashtra 400001</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#B59A68] flex-shrink-0 mt-0.5" />
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-[#34383B]/50 uppercase font-bold">PHONE / WHATSAPP</span>
                    <span className="text-[#17191B] font-bold">+91 98765 43210 / +91 22 2847 0000</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#B59A68] flex-shrink-0 mt-0.5" />
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-[#34383B]/50 uppercase font-bold">EMAIL INQUIRIES</span>
                    <span className="text-[#17191B] font-bold">sales@csfabrication.com / rfq@csfabrication.com</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#B59A68] flex-shrink-0 mt-0.5" />
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-[#34383B]/50 uppercase font-bold">OPERATING HOURS</span>
                    <span className="text-[#17191B]">Mon - Sat: 08:30 AM - 07:00 PM IST</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quality Guarantee Box */}
            <div className="bg-[#17191B] text-[#F5F4EF] rounded-sm p-8 flex flex-col gap-3 shadow-lg">
              <span className="text-xs font-mono text-[#B59A68] font-bold uppercase tracking-wider">
                OUR COMMITMENT
              </span>
              <h4 className="text-base font-bold uppercase font-sans">
                24-Hour Technical Turnaround
              </h4>
              <p className="text-xs text-[#F5F4EF]/70 font-light leading-relaxed">
                Every RFQ is reviewed directly by a qualified structural engineer. We verify local wind zoning, structural section profiles, and provide itemized BOQ breakdowns.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive RFP Submission Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#EAE8E1] border border-[#34383B]/15 rounded-sm p-8 md:p-12 shadow-sm">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[#B59A68]/20 border border-[#B59A68] flex items-center justify-center text-[#B59A68]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold uppercase text-[#17191B] font-sans">
                  PROPOSAL REQUEST SUBMITTED
                </h3>
                <p className="text-sm text-[#34383B] max-w-md font-light leading-relaxed">
                  Thank you for submitting your project parameters. Our structural engineering desk in Mumbai is reviewing your specifications and will send a detailed technical BOQ and quotation within 24 business hours.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 px-6 py-2.5 bg-[#17191B] text-[#F5F4EF] text-xs font-mono uppercase tracking-widest rounded-sm"
                >
                  SUBMIT ANOTHER INQUIRY
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-xs">
                <div>
                  <h3 className="text-xl font-bold uppercase text-[#17191B] font-sans mb-1">
                    PROJECT PARAMETERS & SPECIFICATIONS
                  </h3>
                  <p className="text-xs text-[#34383B]/70 font-light">
                    Fields marked with an asterisk (*) are required for load calculations.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[10px] text-[#34383B] uppercase font-bold">Your Name *</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Rajesh Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#F5F4EF] border border-[#34383B]/20 focus:border-[#B59A68] rounded-sm px-3.5 py-2.5 text-[#17191B] outline-none font-sans text-xs"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[10px] text-[#34383B] uppercase font-bold">Company / EPC Name *</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. SunPower EPC Infra Ltd"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-[#F5F4EF] border border-[#34383B]/20 focus:border-[#B59A68] rounded-sm px-3.5 py-2.5 text-[#17191B] outline-none font-sans text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[10px] text-[#34383B] uppercase font-bold">Email Address *</label>
                    <input
                      required
                      type="email"
                      placeholder="e.g. r.sharma@epc.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#F5F4EF] border border-[#34383B]/20 focus:border-[#B59A68] rounded-sm px-3.5 py-2.5 text-[#17191B] outline-none font-sans text-xs"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[10px] text-[#34383B] uppercase font-bold">Phone / Mobile *</label>
                    <input
                      required
                      type="tel"
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#F5F4EF] border border-[#34383B]/20 focus:border-[#B59A68] rounded-sm px-3.5 py-2.5 text-[#17191B] outline-none font-sans text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[10px] text-[#34383B] uppercase font-bold">Structure System</label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full bg-[#F5F4EF] border border-[#34383B]/20 focus:border-[#B59A68] rounded-sm px-3 py-2.5 text-[#17191B] outline-none font-mono text-[11px]"
                    >
                      <option>Ground Mounted Fixed Tilt</option>
                      <option>Rooftop Strut & Micro Rail</option>
                      <option>Solar Carport Canopy</option>
                      <option>Single-Axis Tracker</option>
                      <option>Mounting Hardware / Clamps Only</option>
                      <option>Custom Agri-PV / Specialized</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[10px] text-[#34383B] uppercase font-bold">Target Capacity (MW/kW)</label>
                    <input
                      type="text"
                      placeholder="e.g. 10 MW or 500 kW"
                      value={formData.capacity}
                      onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                      className="w-full bg-[#F5F4EF] border border-[#34383B]/20 focus:border-[#B59A68] rounded-sm px-3.5 py-2.5 text-[#17191B] outline-none font-mono text-[11px]"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[10px] text-[#34383B] uppercase font-bold">Site Wind Speed</label>
                    <select
                      value={formData.windSpeed}
                      onChange={(e) => setFormData({ ...formData, windSpeed: e.target.value })}
                      className="w-full bg-[#F5F4EF] border border-[#34383B]/20 focus:border-[#B59A68] rounded-sm px-3 py-2.5 text-[#17191B] outline-none font-mono text-[11px]"
                    >
                      <option>150 km/h (Standard)</option>
                      <option>180 km/h (High Wind Zone)</option>
                      <option>200 km/h (Extreme / Cyclone)</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[10px] text-[#34383B] uppercase font-bold">Site Location / Coordinates</label>
                  <input
                    type="text"
                    placeholder="e.g. Bhadla Solar Park, Rajasthan, India"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-[#F5F4EF] border border-[#34383B]/20 focus:border-[#B59A68] rounded-sm px-3.5 py-2.5 text-[#17191B] outline-none font-sans text-xs"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[10px] text-[#34383B] uppercase font-bold">Project Notes & Module Dimensions</label>
                  <textarea
                    rows={4}
                    placeholder="Provide module wattage (e.g. 580W Bifacial), module dimensions, tilt preference, or custom C-channel profile requests..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full bg-[#F5F4EF] border border-[#34383B]/20 focus:border-[#B59A68] rounded-sm px-3.5 py-2.5 text-[#17191B] outline-none font-sans text-xs resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#17191B] hover:bg-[#34383B] text-[#F5F4EF] text-xs font-mono font-bold tracking-widest uppercase rounded-sm transition-all duration-300 shadow-md flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-[#B59A68]" />
                  <span>SUBMIT SPECIFICATIONS FOR FORMAL PROPOSAL →</span>
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
