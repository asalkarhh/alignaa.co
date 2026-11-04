import React from 'react';
import { Shield, ArrowLeft } from 'lucide-react';
import { BRAND_CONFIG } from '../config/siteContent';

interface PrivacyPolicyPageProps {
  onBackToHome: () => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onBackToHome }) => {
  return (
    <main id="main-content" className="section" style={{ paddingTop: '3rem' }}>
      <div className="container" style={{ maxWidth: '820px' }}>
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={onBackToHome}
          style={{ marginBottom: '2rem' }}
        >
          <ArrowLeft size={16} />
          Back to Home
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-pale-teal)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-primary)'
            }}
          >
            <Shield size={22} />
          </div>
          <span className="eyebrow" style={{ margin: 0 }}>Legal & Transparency</span>
        </div>

        <h1 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
          Privacy Policy
        </h1>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '2.5rem', fontSize: '0.9375rem' }}>
          Last Updated: 3 November 2026 • Effective for {BRAND_CONFIG.domain}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', lineHeight: 1.7, color: 'var(--color-text-main)' }}>
          <section>
            <h2 style={{ fontSize: '1.375rem', marginBottom: '0.75rem', color: 'var(--color-primary-dark)' }}>
              1. Introduction
            </h2>
            <p>
              Alignaa ("we", "our", or "us") operates the website <strong>{BRAND_CONFIG.domain}</strong>, providing a direct-to-consumer information and enquiry channel for clear-aligner treatment. Our parent professional brand is accessible at{' '}
              <a href={BRAND_CONFIG.parentUrl} target="_blank" rel="noopener noreferrer">
                {BRAND_CONFIG.parentDomain}
              </a>
              . This Privacy Policy outlines how we collect, handle, and protect your personal information when you use our website or submit an enquiry.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.375rem', marginBottom: '0.75rem', color: 'var(--color-primary-dark)' }}>
              2. Information We Collect
            </h2>
            <p>We collect information voluntarily provided by you through our online enquiry forms:</p>
            <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <li>
                <strong>Patient Enquiries:</strong> Full name, 10-digit mobile phone number, age bracket, city, 6-digit postal PIN code, primary teeth concern, optional email address, and optional personal messages or questions.
              </li>
              <li>
                <strong>Dental Partner Enquiries:</strong> Doctor/clinic representative name, professional role (dentist, clinic owner, or administrator), clinic or practice name, mobile number, professional email address, city, and postal PIN code.
              </li>
              <li>
                <strong>Automated Technical Data:</strong> Standard server logs, anonymized browser user-agent, and submission timestamps. We do not store patient enquiry values in public URLs or browser localStorage.
              </li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: '1.375rem', marginBottom: '0.75rem', color: 'var(--color-primary-dark)' }}>
              3. Purpose of Processing
            </h2>
            <p>We process your data exclusively for legitimate operational purposes:</p>
            <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <li>To review your teeth alignment enquiry and contact you via telephone, WhatsApp, or email to discuss treatment feasibility.</li>
              <li>To coordinate appointments for 3D digital intraoral scans at your home or at an authorised partner dental centre.</li>
              <li>To enable licensed dental professionals to evaluate your eligibility for clear aligners.</li>
              <li>For clinic partners, to review practice requirements and furnish laboratory pricing terms.</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: '1.375rem', marginBottom: '0.75rem', color: 'var(--color-primary-dark)' }}>
              4. Data Sharing & Third Parties
            </h2>
            <p>
              We do <strong>not</strong> sell, rent, or trade your personal information to third-party advertisers. Your information is shared only with:
            </p>
            <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <li>Certified dental professionals and orthodontists responsible for reviewing your scan and designing your treatment roadmap.</li>
              <li>Authorised Alignaa customer support personnel coordinating your scans and aligner delivery.</li>
              <li>Trusted hosted infrastructure and email delivery service providers bound by strict confidentiality and data-processing obligations.</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: '1.375rem', marginBottom: '0.75rem', color: 'var(--color-primary-dark)' }}>
              5. Data Security & Storage
            </h2>
            <p>
              We implement industry-standard encryption, secure HTTP protocols (TLS/SSL), and restricted access permissions to safeguard your data against unauthorised disclosure, loss, or misuse.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.375rem', marginBottom: '0.75rem', color: 'var(--color-primary-dark)' }}>
              6. Your Rights & Contact Details
            </h2>
            <p>
              You have the right to request access to the data you have submitted, request corrections, or request deletion of your contact records from our active communication queues. To exercise these rights, please contact our support team at:
            </p>
            <div
              style={{
                marginTop: '0.75rem',
                padding: '1rem 1.25rem',
                backgroundColor: 'var(--color-bg-near-white)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)'
              }}
            >
              <p style={{ margin: 0 }}>
                <strong>Alignaa Privacy & Support Team</strong>
                <br />
                Email:{' '}
                <a href={`mailto:${BRAND_CONFIG.contactEmail}`}>
                  {BRAND_CONFIG.contactEmail}
                </a>
                <br />
                Parent Website:{' '}
                <a href={BRAND_CONFIG.parentUrl} target="_blank" rel="noopener noreferrer">
                  {BRAND_CONFIG.parentUrl}
                </a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

