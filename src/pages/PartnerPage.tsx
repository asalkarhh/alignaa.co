import React, { useState } from 'react';
import {
  Stethoscope,
  Building2,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Send,
  AlertTriangle,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { PARTNER_CONTENT, BRAND_CONFIG } from '../config/siteContent';
import { PartnerEnquiryData, SubmissionStatus } from '../types';
import { submitEnquiry } from '../services/formSubmission';

interface PartnerPageProps {
  onNavigatePage: (page: string) => void;
}

export const PartnerPage: React.FC<PartnerPageProps> = ({ onNavigatePage }) => {
  const [formData, setFormData] = useState<PartnerEnquiryData>({
    fullName: '',
    role: '',
    clinicName: '',
    mobile: '',
    email: '',
    city: '',
    pinCode: '',
    message: '',
    consent: false,
    websiteField: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [statusMessage, setStatusMessage] = useState<string>('');

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    // 1. Full name
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required.';
    }

    // 2. Role
    if (!formData.role) {
      newErrors.role = 'Please select your role.';
    }

    // 3. Clinic Name
    if (!formData.clinicName.trim()) {
      newErrors.clinicName = 'Clinic or practice name is required.';
    }

    // 4. Mobile
    const cleanedMobile = formData.mobile.replace(/[\s-]/g, '');
    const mobileRegex = /^(\+91|0)?[6-9]\d{9}$/;
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required.';
    } else if (!mobileRegex.test(cleanedMobile)) {
      newErrors.mobile = 'Please enter a valid 10-digit Indian mobile number.';
    }

    // 5. Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    // 6. City
    if (!formData.city.trim()) {
      newErrors.city = 'City is required.';
    }

    // 7. PIN Code
    const pinRegex = /^[1-9][0-9]{5}$/;
    if (!formData.pinCode.trim()) {
      newErrors.pinCode = 'PIN code is required.';
    } else if (!pinRegex.test(formData.pinCode.trim())) {
      newErrors.pinCode = 'Please enter a valid 6-digit Indian PIN code.';
    }

    // 8. Consent
    if (!formData.consent) {
      newErrors.consent = 'You must give consent to be contacted regarding partnership.';
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
      const firstError = Object.keys(errors)[0];
      const el = document.getElementById(`partner-${firstError}`);
      if (el) el.focus();
      return;
    }

    setStatus('loading');
    setStatusMessage('');

    try {
      const result = await submitEnquiry({
        type: 'partner',
        data: {
          ...formData,
          sourcePage: window.location.href,
          timestamp: new Date().toISOString()
        }
      });

      if (result.success) {
        setStatus('success');
        setStatusMessage(result.message);
        setFormData({
          fullName: '',
          role: '',
          clinicName: '',
          mobile: '',
          email: '',
          city: '',
          pinCode: '',
          message: '',
          consent: false,
          websiteField: ''
        });
      } else if (result.status === 'unconfigured') {
        setStatus('unconfigured');
        setStatusMessage(result.message);
      } else {
        setStatus('error');
        setStatusMessage(result.message);
      }
    } catch {
      setStatus('error');
      setStatusMessage('We could not send your partner enquiry. Please try again.');
    }
  };

  return (
    <main id="main-content" className="section" style={{ paddingTop: '3.5rem' }}>
      <div className="container">
        {/* Header Intro */}
        <div className="section-header" style={{ marginBottom: '3rem' }}>
          <span className="eyebrow">{PARTNER_CONTENT.eyebrow}</span>
          <h1 className="section-title">{PARTNER_CONTENT.headline}</h1>
          <p className="section-subtitle">{PARTNER_CONTENT.subheading}</p>

          <div style={{ marginTop: '1.5rem' }}>
            <a
              href={BRAND_CONFIG.parentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <span>{PARTNER_CONTENT.parentSiteCta}</span>
              <ExternalLink size={15} />
            </a>
          </div>
        </div>

        {/* Benefits Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.75rem',
            marginBottom: '4.5rem'
          }}
        >
          {PARTNER_CONTENT.benefits.map((benefit, i) => (
            <div key={i} className="benefit-card">
              <div className="benefit-icon-wrapper">
                {i === 0 ? <ShieldCheck size={24} /> : i === 1 ? <Building2 size={24} /> : <Stethoscope size={24} />}
              </div>
              <h3 className="benefit-title">{benefit.title}</h3>
              <p className="benefit-desc">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Partner Form Card */}
        <div className="form-card" style={{ maxWidth: '720px' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span className="eyebrow" style={{ backgroundColor: 'var(--color-pale-teal)' }}>Partner Inquiry</span>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginTop: '0.5rem' }}>
              Register Your Clinic Interest
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9375rem', marginTop: '0.25rem' }}>
              Connect with our clinical onboarding team to receive our doctor catalogue and partner pricing terms.
            </p>
          </div>

          {/* Success Banner */}
          {status === 'success' && (
            <div className="alert-banner success" role="alert" aria-live="polite">
              <CheckCircle2 size={24} style={{ flexShrink: 0 }} />
              <div>
                <strong>Enquiry Received!</strong>
                <p style={{ margin: '0.25rem 0 0.75rem' }}>{statusMessage}</p>
                <div style={{ paddingTop: '0.5rem', borderTop: '1px solid rgba(0,0,0,0.1)' }}>
                  <p style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                    In the meantime, explore our clinical case studies and provider resources:
                  </p>
                  <a
                    href={BRAND_CONFIG.parentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                  >
                    <span>Visit the Alignaa professional website</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </div>
          )}

          {status === 'unconfigured' && (
            <div className="alert-banner warning" role="alert" aria-live="polite">
              <AlertTriangle size={24} style={{ flexShrink: 0 }} />
              <div>
                <strong>Form Delivery Mode: Preview / Unconfigured</strong>
                <p style={{ margin: '0.25rem 0 0' }}>{statusMessage}</p>
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

          <form onSubmit={handleSubmit} noValidate aria-label="Dental Partner Registration Form">
            {/* Honeypot field */}
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
                <label htmlFor="partner-fullName" className="form-label">
                  Doctor / Representative Name <span className="required">*</span>
                </label>
                <input
                  id="partner-fullName"
                  name="fullName"
                  type="text"
                  placeholder="e.g. Dr. Rajesh Kulkarni"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`form-input ${errors.fullName ? 'error' : ''}`}
                  aria-required="true"
                  aria-invalid={!!errors.fullName}
                />
                {errors.fullName && <span className="field-error">{errors.fullName}</span>}
              </div>

              {/* Role */}
              <div className="form-group">
                <label htmlFor="partner-role" className="form-label">
                  Professional Role <span className="required">*</span>
                </label>
                <select
                  id="partner-role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className={`form-select ${errors.role ? 'error' : ''}`}
                  aria-required="true"
                  aria-invalid={!!errors.role}
                >
                  <option value="">Select role</option>
                  <option value="Dentist">Dentist / Orthodontist</option>
                  <option value="Clinic owner">Dental Clinic Owner</option>
                  <option value="Other">Hospital / Practice Administrator</option>
                </select>
                {errors.role && <span className="field-error">{errors.role}</span>}
              </div>

              {/* Clinic Name */}
              <div className="form-group">
                <label htmlFor="partner-clinicName" className="form-label">
                  Clinic or Practice Name <span className="required">*</span>
                </label>
                <input
                  id="partner-clinicName"
                  name="clinicName"
                  type="text"
                  placeholder="e.g. SmileCare Dental Clinic"
                  value={formData.clinicName}
                  onChange={handleChange}
                  className={`form-input ${errors.clinicName ? 'error' : ''}`}
                  aria-required="true"
                  aria-invalid={!!errors.clinicName}
                />
                {errors.clinicName && <span className="field-error">{errors.clinicName}</span>}
              </div>

              {/* Mobile */}
              <div className="form-group">
                <label htmlFor="partner-mobile" className="form-label">
                  Mobile Number <span className="required">*</span>
                </label>
                <input
                  id="partner-mobile"
                  name="mobile"
                  type="tel"
                  placeholder="10-digit mobile number"
                  value={formData.mobile}
                  onChange={handleChange}
                  className={`form-input ${errors.mobile ? 'error' : ''}`}
                  aria-required="true"
                  aria-invalid={!!errors.mobile}
                />
                {errors.mobile && <span className="field-error">{errors.mobile}</span>}
              </div>

              {/* Email */}
              <div className="form-group">
                <label htmlFor="partner-email" className="form-label">
                  Email Address <span className="required">*</span>
                </label>
                <input
                  id="partner-email"
                  name="email"
                  type="email"
                  placeholder="doctor@clinic.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  aria-required="true"
                  aria-invalid={!!errors.email}
                />
                {errors.email && <span className="field-error">{errors.email}</span>}
              </div>

              {/* City */}
              <div className="form-group">
                <label htmlFor="partner-city" className="form-label">
                  City <span className="required">*</span>
                </label>
                <input
                  id="partner-city"
                  name="city"
                  type="text"
                  placeholder="e.g. Pune, Mumbai"
                  value={formData.city}
                  onChange={handleChange}
                  className={`form-input ${errors.city ? 'error' : ''}`}
                  aria-required="true"
                  aria-invalid={!!errors.city}
                />
                {errors.city && <span className="field-error">{errors.city}</span>}
              </div>

              {/* PIN Code */}
              <div className="form-group">
                <label htmlFor="partner-pinCode" className="form-label">
                  PIN Code <span className="required">*</span>
                </label>
                <input
                  id="partner-pinCode"
                  name="pinCode"
                  type="text"
                  maxLength={6}
                  placeholder="6-digit PIN"
                  value={formData.pinCode}
                  onChange={handleChange}
                  className={`form-input ${errors.pinCode ? 'error' : ''}`}
                  aria-required="true"
                  aria-invalid={!!errors.pinCode}
                />
                {errors.pinCode && <span className="field-error">{errors.pinCode}</span>}
              </div>

              {/* Message */}
              <div className="form-group col-span-2">
                <label htmlFor="partner-message" className="form-label">
                  Practice Overview or Questions <span style={{ color: 'var(--color-text-light)', fontWeight: 400 }}>(Optional)</span>
                </label>
                <textarea
                  id="partner-message"
                  name="message"
                  rows={3}
                  maxLength={1000}
                  placeholder="Number of dental chairs, intraoral scanner availability (e.g. 3Shape, iTero), estimated monthly aligner cases..."
                  value={formData.message}
                  onChange={handleChange}
                  className="form-textarea"
                />
              </div>

              {/* Consent */}
              <div className="form-group col-span-2">
                <label className="checkbox-label" htmlFor="partner-consent">
                  <input
                    id="partner-consent"
                    name="consent"
                    type="checkbox"
                    checked={formData.consent}
                    onChange={handleChange}
                    className="checkbox-input"
                    aria-required="true"
                  />
                  <span>
                    I agree to allow the Alignaa partnerships team to contact me regarding laboratory services and professional collaboration. I have read the{' '}
                    <a
                      href="/privacy-policy"
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigatePage('privacy');
                      }}
                      style={{ textDecoration: 'underline' }}
                    >
                      Privacy Policy
                    </a>
                    . <span className="required">*</span>
                  </span>
                </label>
                {errors.consent && (
                  <span className="field-error" style={{ marginLeft: '1.75rem' }}>
                    {errors.consent}
                  </span>
                )}
              </div>
            </div>

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
                    Submitting Application...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Submit Partner Registration
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Persistent Link to Parent Site */}
        <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '0.75rem' }}>
            Looking for clinical technical documentation, case submissions, or webinar recordings?
          </p>
          <a
            href={BRAND_CONFIG.parentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <span>Visit the Alignaa professional website</span>
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </main>
  );
};

