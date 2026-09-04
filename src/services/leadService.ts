/**
 * Lead capture service for Google Apps Script Web App integration
 */

// Deployment Web App URL placeholder as requested
export const GOOGLE_SHEET_WEBHOOK_URL: string =
  "https://script.google.com/macros/s/AKfycbzlgb3BrbACNfb9nSGkwNLZP0wFHAp1KkpVtLTiPKgW-hQ1z3EiRfn6Kyaria84-95XDg/exec";

export interface LeadPayload {
  phone: string;
  source: string;
}

export interface ValidationResult {
  isValid: boolean;
  normalized: string;
  error?: string;
}

/**
 * Validates Indian mobile numbers:
 * Accept:
 * - 10-digit Indian mobile number
 * - +91 followed by a 10-digit number
 * 
 * Reject:
 * - Empty input
 * - Invalid phone number
 * - Fewer than 10 digits
 * - More than 10 digits
 */
export function validatePhoneNumber(input: string): ValidationResult {
  const trimmed = input.trim();
  if (!trimmed) {
    return {
      isValid: false,
      normalized: '',
      error: 'Please enter your mobile number.',
    };
  }

  // Remove spaces, dashes, brackets
  const cleaned = trimmed.replace(/[\s\-()]/g, '');

  let digits = cleaned;
  if (digits.startsWith('+91')) {
    digits = digits.slice(3);
  } else if (digits.startsWith('91') && digits.length === 12) {
    digits = digits.slice(2);
  } else if (digits.startsWith('0') && digits.length === 11) {
    digits = digits.slice(1);
  }

  // Must be strictly 10 numeric digits
  if (!/^\d+$/.test(digits)) {
    return {
      isValid: false,
      normalized: '',
      error: 'Phone number must contain digits only.',
    };
  }

  if (digits.length < 10) {
    return {
      isValid: false,
      normalized: '',
      error: 'Phone number is fewer than 10 digits.',
    };
  }

  if (digits.length > 10) {
    return {
      isValid: false,
      normalized: '',
      error: 'Phone number is more than 10 digits.',
    };
  }

  // Indian mobile numbers start with 6, 7, 8, or 9
  if (!/^[6-9]/.test(digits)) {
    return {
      isValid: false,
      normalized: '',
      error: 'Please enter a valid 10-digit Indian mobile number.',
    };
  }

  return {
    isValid: true,
    normalized: digits,
  };
}

/**
 * Sends the lead to the Google Apps Script Web App via POST.
 */
export async function submitLeadToGoogleSheet(
  phone: string,
  source: string = 'Landing Page'
): Promise<{ success: boolean; message: string }> {
  // Validate first
  const validation = validatePhoneNumber(phone);
  if (!validation.isValid) {
    throw new Error(validation.error || 'Invalid phone number');
  }

  const payload: LeadPayload = {
    phone: validation.normalized,
    source,
  };

  if (
    !GOOGLE_SHEET_WEBHOOK_URL ||
    GOOGLE_SHEET_WEBHOOK_URL === "PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE"
  ) {
    console.warn(
      "GOOGLE_SHEET_WEBHOOK_URL is not set yet. Please paste the deployed Google Apps Script Web App URL into src/services/leadService.ts"
    );
    throw new Error("Something went wrong. Please try again.");
  }

  try {
    // Note: Google Apps Script redirects with 302 upon POST.
    // 'no-cors' mode with text/plain prevents CORS preflight issues and executes reliably across all browsers.
    await fetch(GOOGLE_SHEET_WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    return {
      success: true,
      message: "Lead submitted successfully",
    };
  } catch (err) {
    console.error("Error submitting lead to Google Sheet:", err);
    throw new Error("Something went wrong. Please try again.");
  }
}
