import React, { useEffect, useState, useRef } from 'react';
import { X, Upload } from 'lucide-react';

interface EnquiryFormProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedService?: string;
}

export const EnquiryForm: React.FC<EnquiryFormProps> = ({ isOpen, onClose, preSelectedService }) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    projectType: '',
    location: '',
    capacity: '',
    message: '',
  });
  const [fileName, setFileName] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (preSelectedService) {
      setFormData(prev => ({ ...prev, projectType: preSelectedService }));
    }
  }, [preSelectedService, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate premium luxury confirmation feedback
    alert(
      `Thank you, ${formData.name}.\n\nYour engineering consultation request for the "${formData.projectType || 'General Steel'}" project in ${formData.location || 'unspecified location'} has been logged.\n\nOur structural engineering division will review your requirements and follow up within 24 hours.`
    );
    setFormData({
      name: '',
      company: '',
      email: '',
      phone: '',
      projectType: '',
      location: '',
      capacity: '',
      message: '',
    });
    setFileName('');
    onClose();
  };

  return (
    <>
      {/* Side-Drawer Container */}
      <div
        className={`fixed top-0 right-0 w-full max-w-[500px] h-full bg-[#EAE8E1] border-l border-[#34383B]/20 z-50 transform transition-transform duration-500 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-8 border-b border-[#34383B]/10">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-mono tracking-[0.2em] text-[#B59A68] uppercase font-bold">
              ENGINEERING DIVISION
            </span>
            <h3 className="text-lg font-bold tracking-tight text-[#17191B] uppercase font-sans">
              REQUEST CONSULTATION
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#34383B] hover:text-[#17191B] transition-colors p-2"
            aria-label="Close Enquiry"
          >
            <X className="w-5 h-5 stroke-[1.5]" />
          </button>
        </div>

        {/* Content Area / Scrollable Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 flex flex-col gap-6">
          <p className="text-xs text-[#34383B]/70 leading-relaxed font-sans font-light">
            Please submit your site loading and dimensional requirements. Our senior engineering team will evaluate the specifications and contact you with preliminary drafts.
          </p>

          {/* Name & Company */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-[9px] font-mono tracking-widest text-[#34383B] uppercase font-bold">
                FULL NAME *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Liam Vance"
                className="w-full text-xs bg-[#F5F4EF] border border-[#34383B]/20 focus:border-[#B59A68] rounded-sm px-4 py-3 text-[#17191B] outline-none transition-colors duration-300"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="company" className="text-[9px] font-mono tracking-widest text-[#34383B] uppercase font-bold">
                COMPANY / ENTERPRISE
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="e.g. Apex Energy Ltd"
                className="w-full text-xs bg-[#F5F4EF] border border-[#34383B]/20 focus:border-[#B59A68] rounded-sm px-4 py-3 text-[#17191B] outline-none transition-colors duration-300"
              />
            </div>
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-[9px] font-mono tracking-widest text-[#34383B] uppercase font-bold">
                EMAIL ADDRESS *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. liam@company.com"
                className="w-full text-xs bg-[#F5F4EF] border border-[#34383B]/20 focus:border-[#B59A68] rounded-sm px-4 py-3 text-[#17191B] outline-none transition-colors duration-300"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className="text-[9px] font-mono tracking-widest text-[#34383B] uppercase font-bold">
                PHONE NUMBER *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g. +91 98765 43210"
                className="w-full text-xs bg-[#F5F4EF] border border-[#34383B]/20 focus:border-[#B59A68] rounded-sm px-4 py-3 text-[#17191B] outline-none transition-colors duration-300"
              />
            </div>
          </div>

          {/* Project Type */}
          <div className="flex flex-col gap-2">
            <label htmlFor="projectType" className="text-[9px] font-mono tracking-widest text-[#34383B] uppercase font-bold">
              PROJECT STRUCTURE TYPE *
            </label>
            <select
              id="projectType"
              name="projectType"
              required
              value={formData.projectType}
              onChange={handleChange}
              className="w-full text-xs bg-[#F5F4EF] border border-[#34383B]/20 focus:border-[#B59A68] rounded-sm px-4 py-3 text-[#17191B] outline-none transition-colors duration-300 appearance-none"
            >
              <option value="" disabled>Select structural option...</option>
              <option value="Ground Mounted Fixed Tilt">Ground Mounted Fixed Tilt</option>
              <option value="Rooftop Solar Structure">Rooftop Solar Structure</option>
              <option value="Solar Carports">Solar Carports</option>
              <option value="Tracker Structure">Tracker Structure</option>
              <option value="Custom Steel Structure">Custom Steel Structure</option>
            </select>
          </div>

          {/* Location & Capacity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="location" className="text-[9px] font-mono tracking-widest text-[#34383B] uppercase font-bold">
                PROJECT LOCATION
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Gujarat, India"
                className="w-full text-xs bg-[#F5F4EF] border border-[#34383B]/20 focus:border-[#B59A68] rounded-sm px-4 py-3 text-[#17191B] outline-none transition-colors duration-300"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="capacity" className="text-[9px] font-mono tracking-widest text-[#34383B] uppercase font-bold">
                CAPACITY / REQUIREMENT
              </label>
              <input
                type="text"
                id="capacity"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                placeholder="e.g. 5 MW / 200 Tons"
                className="w-full text-xs bg-[#F5F4EF] border border-[#34383B]/20 focus:border-[#B59A68] rounded-sm px-4 py-3 text-[#17191B] outline-none transition-colors duration-300"
              />
            </div>
          </div>

          {/* Details / Message */}
          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-[9px] font-mono tracking-widest text-[#34383B] uppercase font-bold">
              PROJECT SPECIFICATIONS / SCOPE
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="e.g. Wind loads (180 km/h), soil conditions, C-channel coating thickness parameters..."
              className="w-full text-xs bg-[#F5F4EF] border border-[#34383B]/20 focus:border-[#B59A68] rounded-sm px-4 py-3 text-[#17191B] outline-none transition-colors duration-300 resize-none"
            />
          </div>

          {/* File Upload (Drawing) */}
          <div className="flex flex-col gap-2">
            <span className="text-[9px] font-mono tracking-widest text-[#34383B] uppercase font-bold">
              UPLOAD TECHNICAL DRAWING / CAD (Optional)
            </span>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="w-full border border-dashed border-[#34383B]/30 hover:border-[#B59A68] rounded-sm p-6 bg-[#F5F4EF]/50 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors duration-300"
            >
              <Upload className="w-5 h-5 text-[#B59A68] stroke-[1.5]" />
              <span className="text-[10px] text-[#34383B]/70 font-mono tracking-wider">
                {fileName ? fileName : 'SELECT PDF, DXF, DWG OR ZIP'}
              </span>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.dxf,.dwg,.zip,.rar"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 mt-2 bg-[#17191B] text-[#F5F4EF] hover:bg-[#34383B] transition-all duration-300 text-xs font-bold uppercase tracking-widest rounded-sm border border-[#17191B]"
          >
            SEND PROJECT REQUIREMENTS &rarr;
          </button>
        </form>
      </div>

      {/* Drawer Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-[#17191B]/40 backdrop-blur-sm z-40 transition-all duration-300"
        />
      )}
    </>
  );
};
