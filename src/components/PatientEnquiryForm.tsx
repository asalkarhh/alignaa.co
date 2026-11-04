import React, { useState } from 'react';
import { Send, CheckCircle2, AlertTriangle, AlertCircle, Loader2, Sparkles } from 'lucide-react';
import { PatientEnquiryData, SubmissionStatus } from '../types';
import { submitEnquiry } from '../services/formSubmission';
import { AGE_GROUPS, TEETH_CONCERN_OPTIONS } from '../config/siteContent';

interface PatientEnquiryFormProps {
  initialConcern?: string;
  onNavigatePage?: (page: string) => void;
}

export const PatientEnquiryForm: React.FC<PatientEnquiryFormProps> = ({
  initialConcern,
  onNavigatePage
}) => {
  const [formData, setFormData] = useState<PatientEnquiryData>({
    fullName: '',
    mobile: '',
    ageGroup: '',
    city: '',
    pinCode: '',
    concern: initialConcern || '',
    email: '',
    message: '',
    consent: false,
    websiteField: '' // Honeypot
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [statusMessage, setStatusMessage] = useState<string>('');

  // Update concern if passed from a Learn More modal click
  React.useEffect(() => {
    if (initialConcern) {
      setFormData((prev) => ({
        ...prev,
        concern: initialConcern
      }));
    }
  }, [initialConcern]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    // 1. Full Name
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required.';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter a valid full name.';
    }

    // 2. Mobile Number (Indian 10-digit, optionally starting with +91 or 0)
    const cleanedMobile = formData.mobile.replace(/[\s-]/g, '');
    const mobileRegex = /^(\+91|0)?[6-9]\d{9}$/;
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required.';
    } else if (!mobileRegex.test(cleanedMobile)) {
      newErrors.mobile = 'Please enter a valid 10-digit Indian mobile number.';
    }

    // 3. Age Group
    if (!formData.ageGroup) {
      newErrors.ageGroup = 'Please select your age group.';
    }

    // 4. City
    if (!formData.city.trim()) {
      newErrors.city = 'City is required.';
    }

    // 5. PIN Code (6 digits)
    const pinRegex = /^[1-9][0-9]{5}$/;
    if (!formData.pinCode.trim()) {
      newErrors.pinCode = 'PIN code is required.';
    } else if (!pinRegex.test(formData.pinCode.trim())) {
      newErrors.pinCode = 'Please enter a valid 6-digit Indian PIN code.';
    }

    // 6. Teeth Concern
    if (!formData.concern) {
      newErrors.concern = 'Please select your primary teeth concern.';
    }

    // 7. Optional Email validation
    if (formData.email && formData.email.trim() !== '') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Please enter a valid email address.';
      }
    }

    // 8. Consent
    if (!formData.consent) {
      newErrors.consent = 'You must agree to be contacted to submit an enquiry.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error for field
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      // Focus first error field
      const firstErrorField = Object.keys(errors)[0];
      const el = document.getElementById(`field-${firstErrorField}`);
      if (el) el.focus();
      return;
    }

    setStatus('loading');
    setStatusMessage('');

    try {
      const result = await submitEnquiry({
        type: 'patient',
        data: {
          ...formData,
          sourcePage: window.location.href,
          timestamp: new Date().toISOString()
        }
      });

      if (result.success) {
        setStatus('success');
        setStatusMessage(result.message);
        // Clear form on confirmed success
        setFormData({
          fullName: '',
          mobile: '',
          ageGroup: '',
          city: '',
          pinCode: '',
          concern: '',
          email: '',
          message: '',
          consent: false,
          websiteField: ''
        });
      } else if (result.status === 'unconfigured') {
        setStatus('unconfigured');
        setStatusMessage(result.message);
        // Do NOT clear form so user does not lose input
      } else {
        setStatus('error');
        setStatusMessage(result.message);
      }
    } catch {
      setStatus('error');
      setStatusMessage('We could not send your enquiry. Please check your connection and try again.');
    }
  };

  return (
    <section className="section" id="enquiry" aria-labelledby="enquiry-heading">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">Start Your Smile Journey</span>
          <h2 id="enquiry-heading" className="section-title">
            Request an Alignaa 3D Scan
          </h2>
          <p className="section-subtitle">
            Take the first step toward a confident smile. Share your details and our care coordinator will reach out to explain the scan procedure and answer your questions.
          </p>
        </div>

        <div className="form-card">
          {/* Status Banners */}
          {status === 'success' && (
            <div className="alert-banner success" role="alert" aria-live="polite">
              <CheckCircle2 size={24} style={{ flexShrink: 0 }} />
              <div>
                <strong>Enquiry Received!</strong>
                <p style={{ margin: '0.25rem 0 0' }}>{statusMessage}</p>
              </div>
            </div>
          )}

          {status === 'unconfigured' && (
            <div className="alert-banner warning" role="alert" aria-live="polite">
              <AlertTriangle size={24} style={{ flexShrink: 0 }} />
              <div>
                <strong>Form Delivery Mode: Preview / Unconfigured</strong>
                <p style={{ margin: '0.25rem 0 0' }}>{statusMessage}</p>
                <p style={{ fontSize: '0.8125rem', marginTop: '0.4rem', color: '#555' }}>
                  (Developer Note: Copy .env.example to .env and set VITE_FORM_ENDPOINT to route live enquiries to the Alignaa team inbox.)
                </p>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="alert-banner error" role="alert" aria-live="polite">
              <AlertCircle size={24} style={{ flexShrink: 0 }} />
              <div>
                <strong>Submission Failed</strong>
                <p style={{ margin: '0.25rem 0 0' }}>{statusMessage}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate aria-label="Patient Scan Request Form">
            {/* Honeypot field for spam prevention */}
            <input
              type="text"
              name="websiteField"
              value={formData.websiteField}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
              className="website-field-hidden"
              aria-hidden="true"
            />

            <div className="form-grid">
              {/* Full Name */}
              <div className="form-group col-span-2">
                <label htmlFor="field-fullName" className="form-label">
                  Full Name <span className="required">*</span>
                </label>
                <input
                  id="field-fullName"
                  name="fullName"
                  type="text"
                  placeholder="e.g. Aditi Sharma"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`form-input ${errors.fullName ? 'error' : ''}`}
                  aria-required="true"
                  aria-invalid={!!errors.fullName}
                  aria-describedby={errors.fullName ? 'err-fullName' : undefined}
                />
                {errors.fullName && (
                  <span id="err-fullName" className="field-error" role="alert">
                    {errors.fullName}
                  </span>
                )}
              </div>

              {/* Mobile Number */}
              <div className="form-group">
                <label htmlFor="field-mobile" className="form-label">
                  Mobile Number <span className="required">*</span>
                </label>
                <input
                  id="field-mobile"
                  name="mobile"
                  type="tel"
                  placeholder="10-digit mobile (e.g. 9820012345)"
                  value={formData.mobile}
                  onChange={handleChange}
                  className={`form-input ${errors.mobile ? 'error' : ''}`}
                  aria-required="true"
                  aria-invalid={!!errors.mobile}
                  aria-describedby={errors.mobile ? 'err-mobile' : undefined}
                />
                {errors.mobile && (
                  <span id="err-mobile" className="field-error" role="alert">
                    {errors.mobile}
                  </span>
                )}
              </div>

              {/* Age Group */}
              <div className="form-group">
                <label htmlFor="field-ageGroup" className="form-label">
                  Age Group <span className="required">*</span>
                </label>
                <select
                  id="field-ageGroup"
                  name="ageGroup"
                  value={formData.ageGroup}
                  onChange={handleChange}
                  className={`form-select ${errors.ageGroup ? 'error' : ''}`}
                  aria-required="true"
                  aria-invalid={!!errors.ageGroup}
                  aria-describedby={errors.ageGroup ? 'err-ageGroup' : undefined}
                >
                  <option value="">Select age group</option>
                  {AGE_GROUPS.map((group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  ))}
                </select>
                {errors.ageGroup && (
                  <span id="err-ageGroup" className="field-error" role="alert">
                    {errors.ageGroup}
                  </span>
                )}
              </div>

              {/* City */}
              <div className="form-group">
                <label htmlFor="field-city" className="form-label">
                  City <span className="required">*</span>
                </label>
                <input
                  id="field-city"
                  name="city"
                  type="text"
                  placeholder="e.g. Mumbai, Pune, Delhi"
                  value={formData.city}
                  onChange={handleChange}
                  className={`form-input ${errors.city ? 'error' : ''}`}
                  aria-required="true"
                  aria-invalid={!!errors.city}
                  aria-describedby={errors.city ? 'err-city' : undefined}
                />
                {errors.city && (
                  <span id="err-city" className="field-error" role="alert">
                    {errors.city}
                  </span>
                )}
              </div>

              {/* PIN Code */}
              <div className="form-group">
                <label htmlFor="field-pinCode" className="form-label">
                  PIN Code <span className="required">*</span>
                </label>
                <input
                  id="field-pinCode"
                  name="pinCode"
                  type="text"
                  maxLength={6}
                  placeholder="6-digit PIN (e.g. 400001)"
                  value={formData.pinCode}
                  onChange={handleChange}
                  className={`form-input ${errors.pinCode ? 'error' : ''}`}
                  aria-required="true"
                  aria-invalid={!!errors.pinCode}
                  aria-describedby={errors.pinCode ? 'err-pinCode' : undefined}
                />
                {errors.pinCode && (
                  <span id="err-pinCode" className="field-error" role="alert">
                    {errors.pinCode}
                  </span>
                )}
              </div>

              {/* Teeth Concern */}
              <div className="form-group col-span-2">
                <label htmlFor="field-concern" className="form-label">
                  Primary Teeth Concern <span className="required">*</span>
                </label>
                <select
                  id="field-concern"
                  name="concern"
                  value={formData.concern}
                  onChange={handleChange}
                  className={`form-select ${errors.concern ? 'error' : ''}`}
                  aria-required="true"
                  aria-invalid={!!errors.concern}
                  aria-describedby={errors.concern ? 'err-concern' : undefined}
                >
                  <option value="">Select your dental concern</option>
                  {TEETH_CONCERN_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {errors.concern && (
                  <span id="err-concern" className="field-error" role="alert">
                    {errors.concern}
                  </span>
                )}
              </div>

              {/* Email (Optional) */}
              <div className="form-group col-span-2">
                <label htmlFor="field-email" className="form-label">
                  Email Address <span style={{ color: 'var(--color-text-light)', fontWeight: 400 }}>(Optional)</span>
                </label>
                <input
                  id="field-email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'err-email' : undefined}
                />
                {errors.email && (
                  <span id="err-email" className="field-error" role="alert">
                    {errors.email}
                  </span>
                )}
              </div>

              {/* Additional Message (Optional) */}
              <div className="form-group col-span-2">
                <label htmlFor="field-message" className="form-label">
                  Additional Message or Questions <span style={{ color: 'var(--color-text-light)', fontWeight: 400 }}>(Optional)</span>
                </label>
                <textarea
                  id="field-message"
                  name="message"
                  rows={3}
                  maxLength={1000}
                  placeholder="Any particular questions or preferred times to talk?"
                  value={formData.message}
                  onChange={handleChange}
                  className="form-textarea"
                />
              </div>

              {/* Consent Checkbox */}
              <div className="form-group col-span-2" style={{ marginTop: '0.5rem' }}>
                <label className="checkbox-label" htmlFor="field-consent">
                  <input
                    id="field-consent"
                    name="consent"
                    type="checkbox"
                    checked={formData.consent}
                    onChange={handleChange}
                    className="checkbox-input"
                    aria-required="true"
                    aria-invalid={!!errors.consent}
                    aria-describedby={errors.consent ? 'err-consent' : undefined}
                  />
                  <span>
                    I agree that the Alignaa team may contact me about this enquiry. I have read the{' '}
                    <a
                      href="/privacy-policy"
                      onClick={(e) => {
                        if (onNavigatePage) {
                          e.preventDefault();
                          onNavigatePage('privacy');
                        }
                      }}
                      style={{ textDecoration: 'underline' }}
                    >
                      Privacy Policy
                    </a>
                    . <span className="required">*</span>
                  </span>
                </label>
                {errors.consent && (
                  <span id="err-consent" className="field-error" role="alert" style={{ marginLeft: '1.75rem' }}>
                    {errors.consent}
                  </span>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div style={{ marginTop: '2rem' }}>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn btn-primary btn-lg"
                style={{ width: '100%', opacity: status === 'loading' ? 0.75 : 1 }}
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 size={18} className="spin-animation" />
                    Submitting Enquiry...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Request My Scan Consultation
                  </>
                )}
              </button>
            </div>

            <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.8125rem', color: 'var(--color-text-light)' }}>
              <Sparkles size={13} style={{ verticalAlign: 'middle', marginRight: '4px', color: 'var(--color-primary)' }} />
              No spam. Your contact details are kept secure and used solely to coordinate your smile assessment.
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

