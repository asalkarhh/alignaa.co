import { PatientEnquiryData, PartnerEnquiryData, FormSubmissionResult } from '../types';

export type EnquiryPayload =
  | { type: 'patient'; data: PatientEnquiryData }
  | { type: 'partner'; data: PartnerEnquiryData };

export async function submitEnquiry(payload: EnquiryPayload): Promise<FormSubmissionResult> {
  const endpoint = import.meta.env.VITE_FORM_ENDPOINT?.trim();
  const targetInbox = import.meta.env.VITE_OWNER_INBOX?.trim() || 'support@alignaa.co';

  // 1. Anti-spam check (honeypot field)
  if (payload.data.websiteField && payload.data.websiteField.trim() !== '') {
    // Silently drop bot submission
    return {
      success: true,
      status: 'sent',
      message: 'Thank you for your enquiry.'
    };
  }

  const now = new Date();
  const istTimestamp = now.toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'long'
  });

  const isPatient = payload.type === 'patient';
  const subject = isPatient
    ? `Alignaa Patient Enquiry: ${payload.data.fullName}`
    : `Alignaa Partner Enquiry: ${payload.data.fullName} (${(payload.data as PartnerEnquiryData).clinicName || 'Clinic'})`;

  const structuredData = {
    _subject: subject,
    enquiryType: isPatient ? 'Patient D2C Enquiry' : 'Dental Partner Enquiry',
    submissionTimeIST: istTimestamp,
    submissionISO: now.toISOString(),
    sourceUrl: typeof window !== 'undefined' ? window.location.href : 'https://alignaa.co',
    targetInbox,
    ...(isPatient
      ? {
          fullName: payload.data.fullName,
          mobile: payload.data.mobile,
          ageGroup: (payload.data as PatientEnquiryData).ageGroup,
          city: payload.data.city,
          pinCode: payload.data.pinCode,
          teethConcern: (payload.data as PatientEnquiryData).concern,
          email: payload.data.email || 'Not provided',
          message: payload.data.message || 'None',
          consentToContact: payload.data.consent ? 'Agreed' : 'Denied'
        }
      : {
          fullName: payload.data.fullName,
          role: (payload.data as PartnerEnquiryData).role,
          clinicName: (payload.data as PartnerEnquiryData).clinicName,
          mobile: payload.data.mobile,
          email: (payload.data as PartnerEnquiryData).email,
          city: payload.data.city,
          pinCode: payload.data.pinCode,
          message: payload.data.message || 'None',
          consentToContact: payload.data.consent ? 'Agreed' : 'Denied'
        })
  };

  // 2. Check if delivery endpoint is configured
  if (!endpoint) {
    console.info(
      '%c[Alignaa Form Adapter - Unconfigured Delivery Service]',
      'color: #007B7F; font-weight: bold;',
      '\nNo VITE_FORM_ENDPOINT is configured in environment.\nPayload captured for testing:\n',
      structuredData
    );

    return {
      success: false,
      status: 'unconfigured',
      message:
        'Email delivery is currently unconfigured. Set VITE_FORM_ENDPOINT in .env with your Formspree/Basin endpoint URL to deliver enquiries directly to ' +
        targetInbox +
        '. Your entered details have been preserved.',
      details: structuredData
    };
  }

  // 3. Dispatch to hosted form service or API endpoint
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(structuredData)
    });

    if (response.ok) {
      const successMessage = isPatient
        ? 'Thank you for your enquiry. The Alignaa support team will contact you to discuss your requirements and guide you through the next steps.'
        : 'Thank you for your interest in partnering with Alignaa. Our team will contact you to discuss the next steps.';

      return {
        success: true,
        status: 'sent',
        message: successMessage
      };
    } else {
      let errorMessage = 'Failed to submit form.';
      try {
        const errorJson = await response.json();
        if (errorJson && errorJson.error) {
          errorMessage = errorJson.error;
        }
      } catch {
        // Fallback to text
        const errorText = await response.text();
        if (errorText) errorMessage = errorText;
      }

      return {
        success: false,
        status: 'error',
        message: `We could not send your enquiry (${errorMessage}). Please check your connection and try again.`
      };
    }
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Network connection error';
    return {
      success: false,
      status: 'error',
      message: `We could not send your enquiry due to a network error (${errorMsg}). Please try again.`
    };
  }
}

