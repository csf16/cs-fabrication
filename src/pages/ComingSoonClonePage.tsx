import React, { useState } from 'react';
import { Hero3D } from '../components/Hero3D';
import { useSEO } from '../hooks/useSEO';
import { Phone, CheckCircle2 } from 'lucide-react';

import { submitLeadToGoogleSheet, validatePhoneNumber } from '../services/leadService';

interface ComingSoonClonePageProps {
  onEnquireClick?: (service?: string) => void;
}

export const ComingSoonClonePage: React.FC<ComingSoonClonePageProps> = () => {
  useSEO({
    title: 'Coming Soon | Central Structure Fabrication — Solar Mounting Structures & C-Channels',
    description:
      'Central Structure Fabrication — Coming Soon. Built for what’s above. Solar mounting structures, cold-formed C-channels, and strut channels. Amroha, Uttar Pradesh. GSTIN: 09BDRPA4213J1ZJ.',
    keywords:
      'Central Structure Fabrication, coming soon, solar mounting structures, C channel steel, strut channel, Amroha UP',
    canonical: 'https://www.csfabrication.in/clone',
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
      await submitLeadToGoogleSheet(phone, 'Landing Page');
      setPhone('');
      setSubmitted(true);
    } catch (err: any) {
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-[100dvh] w-full bg-[#F5F4EF] text-[#141516] font-sans relative overflow-hidden select-none">
      <Hero3D fixedViewport={true} minimal={true}>
        <div className="absolute inset-0 flex flex-col justify-between items-center py-10 sm:py-14 px-6 pointer-events-none z-20">
          
          {/* ── Top Title (Updated textual content on clone page) ── */}
          <div className="flex flex-col items-center text-center select-none max-w-3xl mt-2 sm:mt-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[#141516] leading-[1.08] font-sans">
              COMING SOON.<br /><br />
              BUILT FOR WHAT'S<br />
              <span className="text-[#A88A58]">ABOVE.</span>
            </h1>
            <p className="text-[10px] sm:text-xs text-[#7A7D80] font-mono uppercase tracking-[0.24em] mt-3 sm:mt-4 font-semibold">
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
                  className="w-full flex items-center bg-white/95 border border-[#141516]/15 rounded-[4px] p-1.5 focus-within:border-[#A88A58] shadow-sm backdrop-blur-xs transition-all"
                >
                  <div className="flex items-center pl-3 pr-2 text-[#A88A58]">
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
                    className="bg-transparent border-none text-xs sm:text-sm text-[#141516] placeholder-[#141516]/45 focus:outline-none flex-1 font-mono tracking-wide py-2 disabled:opacity-60"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2.5 bg-[#141516] hover:bg-[#2C2F32] text-[#F7F6F1] text-xs font-bold font-mono tracking-widest uppercase rounded-[3px] transition-all whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'SENDING...' : 'GET NOTIFIED →'}
                  </button>
                </form>
                {errorMessage && (
                  <p className="text-[11px] font-mono text-rose-600 text-center tracking-wide">
                    {errorMessage}
                  </p>
                )}
              </div>
            ) : (
              <div className="w-full flex items-center justify-center gap-2 p-3.5 bg-emerald-50 border border-emerald-300 rounded-[4px] text-xs font-mono text-emerald-800 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Thank you. We'll be in touch soon.</span>
              </div>
            )}

            {/* Thin divider line */}
            <div className="w-full h-[1px] bg-[#141516]/10" />

            {/* Footer credentials line */}
            <p className="text-[10px] sm:text-xs font-mono text-[#7A7D80] text-center select-none">
              saifi.electricals2@gmail.com · Amroha, UP · GST: 09BDRPA4213J1ZJ
            </p>
          </div>

        </div>
      </Hero3D>
    </div>
  );
};

export default ComingSoonClonePage;
