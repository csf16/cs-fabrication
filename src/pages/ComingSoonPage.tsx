import React, { useState } from 'react';
import { Hero3D } from '../components/Hero3D';
import { useSEO } from '../hooks/useSEO';
import { Phone, CheckCircle2 } from 'lucide-react';
import { CSFLogo } from '../components/CSFLogo';
import { submitLeadToGoogleSheet, validatePhoneNumber } from '../services/leadService';

interface ComingSoonPageProps {
  onEnquireClick?: (service?: string) => void;
}

export const ComingSoonPage: React.FC<ComingSoonPageProps> = () => {
  useSEO({
    title: 'Central Structure Fabrication (CSF) | Solar Mounting Structures & C-Channels',
    description:
      'Central Structure Fabrication (CSF) — Precision solar mounting structures, cold-formed C-channels, and 41×41 strut channels. Amroha, Uttar Pradesh. GSTIN: 09BDRPA4213J1ZJ.',
    keywords:
      'Central Structure Fabrication, CSF, solar mounting structures, C channel steel, strut channel, Amroha UP',
    canonical: 'https://www.csfabrication.in/',
  });

  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Validate phone number
    const validation = validatePhoneNumber(phone);
    if (!validation.isValid) {
      setErrorMessage(validation.error || 'Please enter a valid 10-digit mobile number.');
      return;
    }

    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      await submitLeadToGoogleSheet(phone, 'Coming Soon Page');
      setPhone('');
      setSubmitted(true);
    } catch (err: any) {
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-[100dvh] w-full bg-[#F8FAFC] text-[#0F2130] font-sans relative overflow-hidden select-none">
      <Hero3D fixedViewport={true} minimal={true}>
        <div className="absolute inset-0 flex flex-col justify-between items-center py-8 sm:py-12 px-6 pointer-events-none z-20">
          
          {/* ── Top Brand Logo & Heading ── */}
          <div className="flex flex-col items-center text-center select-none max-w-3xl mt-2 sm:mt-4">
            <CSFLogo className="h-10 sm:h-12 w-auto mb-4" variant="dark" showText={true} />
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-[#0F2130] leading-[1.08]">
              COMING SOON.<br />
              BUILT FOR WHAT'S<br />
              <span className="text-[#0049CA]">ABOVE.</span>
            </h1>
            <p className="text-[10px] sm:text-xs text-[#647488] uppercase tracking-[0.2em] mt-3 sm:mt-4 font-semibold">
              SOLAR MOUNTING STRUCTURES &amp; C-CHANNELS // AMROHA, UTTAR PRADESH
            </p>
          </div>

          {/* ── Center is completely open for the 3D structure assembly interaction! ── */}

          {/* ── Bottom Callback Form, Line & Footer ── */}
          <div className="w-full max-w-xl flex flex-col items-center gap-5 sm:gap-6 mb-2 sm:mb-4 pointer-events-auto">
            {!submitted ? (
              <div className="w-full flex flex-col gap-1.5">
                <form
                  onSubmit={handleSubmit}
                  className="w-full flex items-center bg-white/95 border border-[#E5E7EB] rounded-xl p-1.5 focus-within:border-[#0049CA] shadow-sm backdrop-blur-xs transition-all"
                >
                  <div className="flex items-center pl-3 pr-2 text-[#0049CA]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    required
                    disabled={isSubmitting}
                    placeholder="Enter your mobile number..."
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errorMessage) setErrorMessage(null);
                    }}
                    className="bg-transparent border-none text-xs sm:text-sm text-[#0F2130] placeholder-[#647488]/60 focus:outline-none flex-1 tracking-wide py-2 disabled:opacity-60"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2.5 bg-[#0049CA] hover:bg-[#003bb0] text-white text-xs font-semibold tracking-wider uppercase rounded-none transition-all whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed shadow-sm cursor-pointer"
                  >
                    {isSubmitting ? 'SENDING...' : 'GET NOTIFIED →'}
                  </button>
                </form>
                {errorMessage && (
                  <p className="text-[11px] text-red-600 text-center font-medium">
                    {errorMessage}
                  </p>
                )}
              </div>
            ) : (
              <div className="w-full flex items-center justify-center gap-2 p-3.5 bg-blue-50 border border-blue-200 rounded-xl text-xs text-[#0049CA] shadow-sm font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[#0049CA]" />
                <span>Thank you. We'll be in touch soon.</span>
              </div>
            )}

            {/* Thin divider line */}
            <div className="w-full h-[1px] bg-[#E5E7EB]" />

            {/* Footer credentials line */}
            <p className="text-[10px] sm:text-xs text-[#647488] text-center select-none">
              info.csf16@gmail.com · Amroha, UP · GST: 09BDRPA4213J1ZJ
            </p>
          </div>

        </div>
      </Hero3D>
    </div>
  );
};

export default ComingSoonPage;
