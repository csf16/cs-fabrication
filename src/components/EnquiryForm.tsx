import React, { useEffect, useState } from 'react';
import { X, ArrowRight, Check, Phone } from 'lucide-react';
import { submitLeadToGoogleSheet, validatePhoneNumber } from '../services/leadService';

interface EnquiryFormProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedService?: string;
}

export const EnquiryForm: React.FC<EnquiryFormProps> = ({ isOpen, onClose, preSelectedService }) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    projectType: '',
    requirement: '',
  });
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
    if (name === 'phone' && phoneError) {
      const res = validatePhoneNumber(value);
      if (res.isValid) setPhoneError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const validation = validatePhoneNumber(formData.phone);
    if (!validation.isValid) {
      setPhoneError(validation.error || 'Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    setIsSubmitting(true);

    try {
      await submitLeadToGoogleSheet(
        formData.phone,
        `Drawer - ${formData.projectType || 'General Consultation'}`,
        {
          name: formData.name,
          company: formData.company,
          requirement: `[${formData.projectType || 'General'}] ${formData.requirement}`.trim(),
        }
      );
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({ name: '', company: '', phone: '', projectType: '', requirement: '' });
        onClose();
      }, 2500);
    } catch (err: any) {
      setErrorMessage(err?.message || 'Something went wrong. Please try again or call directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Side-Drawer Container */}
      <div
        className={`fixed top-0 right-0 w-full max-w-[500px] h-full bg-white border-l border-[#E5E7EB] z-50 transform transition-transform duration-300 ease-in-out flex flex-col shadow-2xl ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 sm:p-8 border-b border-[#E5E7EB]">
          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-semibold text-[#0049CA] uppercase tracking-wider">
              Central Structure Fabrication
            </span>
            <h3 className="text-xl font-bold tracking-tight text-[#0F2130] uppercase">
              Request Consultation
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-lg bg-[#F8FAFC] border border-[#E5E7EB] hover:bg-[#E5E7EB] text-[#0F2130] flex items-center justify-center transition-colors"
            aria-label="Close Drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area / Scrollable Form */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          {isSuccess ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-12">
              <div className="w-16 h-16 rounded-full bg-[#0049CA]/10 text-[#0049CA] flex items-center justify-center">
                <Check className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-bold text-[#0F2130] uppercase">
                Inquiry Logged
              </h4>
              <p className="text-sm text-[#647488] max-w-sm">
                Thank you, {formData.name || 'there'}. Our engineering team has received your project parameters and will contact you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <p className="text-xs text-[#647488] leading-relaxed">
                Connect directly with our structural engineering team. Submit your project requirements or profile dimensions for pricing and engineering review.
              </p>

              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="drawer-name" className="text-xs font-semibold text-[#0F2130] uppercase tracking-wider">
                  Full Name <span className="text-[#0049CA]">*</span>
                </label>
                <input
                  type="text"
                  id="drawer-name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Rajesh Sharma"
                  className="w-full text-xs bg-[#F8FAFC] border border-[#E5E7EB] focus:border-[#0049CA] rounded-xl px-4 py-3 text-[#0F2130] placeholder-[#647488]/60 outline-none transition-colors"
                />
              </div>

              {/* Company */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="drawer-company" className="text-xs font-semibold text-[#0F2130] uppercase tracking-wider">
                  Company / Organization
                </label>
                <input
                  type="text"
                  id="drawer-company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="e.g. Solar EPC Ltd."
                  className="w-full text-xs bg-[#F8FAFC] border border-[#E5E7EB] focus:border-[#0049CA] rounded-xl px-4 py-3 text-[#0F2130] placeholder-[#647488]/60 outline-none transition-colors"
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="drawer-phone" className="text-xs font-semibold text-[#0F2130] uppercase tracking-wider">
                  Mobile Number <span className="text-[#0049CA]">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-xs font-semibold text-[#647488]">
                    +91
                  </div>
                  <input
                    type="tel"
                    id="drawer-phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="98765 43210"
                    className={`w-full pl-14 pr-4 py-3 text-xs bg-[#F8FAFC] border rounded-xl text-[#0F2130] placeholder-[#647488]/60 outline-none transition-colors ${
                      phoneError ? 'border-red-500' : 'border-[#E5E7EB] focus:border-[#0049CA]'
                    }`}
                  />
                </div>
                {phoneError && (
                  <span className="text-xs text-red-600 font-medium">
                    {phoneError}
                  </span>
                )}
              </div>

              {/* Project Type */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="drawer-projectType" className="text-xs font-semibold text-[#0F2130] uppercase tracking-wider">
                  Structural Category
                </label>
                <select
                  id="drawer-projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className="w-full text-xs bg-[#F8FAFC] border border-[#E5E7EB] focus:border-[#0049CA] rounded-xl px-4 py-3 text-[#0F2130] outline-none transition-colors"
                >
                  <option value="">Select category...</option>
                  <option value="Solar Mounting Structures">Solar Mounting Structures</option>
                  <option value="C-Channels & Purlins">C-Channels & Purlins</option>
                  <option value="Custom Fabrication">Custom Fabrication</option>
                  <option value="Solar Carports">Solar Carports</option>
                  <option value="Other Steel Framing">Other Steel Framing</option>
                </select>
              </div>

              {/* Requirement */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="drawer-requirement" className="text-xs font-semibold text-[#0F2130] uppercase tracking-wider">
                  Project Notes / Steel Tonnage
                </label>
                <textarea
                  id="drawer-requirement"
                  name="requirement"
                  rows={3}
                  value={formData.requirement}
                  onChange={handleChange}
                  placeholder="e.g. 41x41 HDG channels, 50 tons, project in Rajasthan..."
                  className="w-full text-xs bg-[#F8FAFC] border border-[#E5E7EB] focus:border-[#0049CA] rounded-xl px-4 py-3 text-[#0F2130] placeholder-[#647488]/60 outline-none transition-colors resize-none"
                />
              </div>

              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600">
                  {errorMessage}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 mt-2 bg-[#0049CA] hover:bg-[#003bb0] disabled:bg-[#0049CA]/60 text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Sending Request...</span>
                  </span>
                ) : (
                  <>
                    <Phone className="w-4 h-4" />
                    <span>Request a Call</span>
                    <ArrowRight className="w-4 h-4 transform transition-transform duration-200 group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Drawer Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-[#0F2130]/50 backdrop-blur-sm z-40 transition-opacity duration-300"
        />
      )}
    </>
  );
};

export default EnquiryForm;
