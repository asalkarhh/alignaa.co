import React from 'react';
import { FileText, ArrowLeft } from 'lucide-react';
import { BRAND_CONFIG } from '../config/siteContent';

interface TermsPageProps {
  onBackToHome: () => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ onBackToHome }) => {
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
            <FileText size={22} />
          </div>
          <span className="eyebrow" style={{ margin: 0 }}>Terms of Service</span>
        </div>

        <h1 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
          Terms & Conditions
        </h1>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '2.5rem', fontSize: '0.9375rem' }}>
          Last Updated: 3 November 2026 • Effective for {BRAND_CONFIG.domain}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', lineHeight: 1.7, color: 'var(--color-text-main)' }}>
          <section>
            <h2 style={{ fontSize: '1.375rem', marginBottom: '0.75rem', color: 'var(--color-primary-dark)' }}>
              1. Website Purpose & Medical Disclaimer
            </h2>
            <p>
              The website <strong>{BRAND_CONFIG.domain}</strong> is an informative and enquiry platform for Alignaa clear-aligner products.
              The information, diagrams, timelines, and case studies presented on this website are for educational and informational purposes only and do not constitute professional medical or dental diagnosis, advice, or treatment.
            </p>
            <p style={{ marginTop: '0.5rem' }}>
              Final determination of patient eligibility, treatment feasibility, duration, and aligner sequencing is made solely by a registered dental surgeon or orthodontist after evaluating clinical 3D intraoral scans and oral health conditions.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.375rem', marginBottom: '0.75rem', color: 'var(--color-primary-dark)' }}>
              2. Enquiries & Consultations
            </h2>
            <p>
              Submitting an enquiry through this website does not create a doctor-patient relationship, nor does it guarantee appointment scheduling or treatment acceptance. Alignaa representatives will reach out to coordinate next steps, discuss scan logistics, and answer general operational questions.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.375rem', marginBottom: '0.75rem', color: 'var(--color-primary-dark)' }}>
              3. Pricing & Inclusions
            </h2>
            <p>
              The confirmed launch pricing baseline starts at <strong>₹39,999/-</strong>. This starting price encompasses standard scan coordination, initial doctor treatment plan design, door-to-door aligner shipping, sequential clear aligner stages, and complimentary post-treatment retainers.
            </p>
            <p style={{ marginTop: '0.5rem' }}>
              Complex cases requiring extended staging, pre-orthodontic dental interventions (such as fillings, scaling, extractions, or periodontal treatment), or special attachments will be diagnosed by the treating dentist, and any supplementary fees will be communicated prior to commencing manufacturing.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.375rem', marginBottom: '0.75rem', color: 'var(--color-primary-dark)' }}>
              4. Patient Responsibility & Compliance
            </h2>
            <p>
              Predictable orthodontic results rely heavily on patient adherence to the doctor’s wear schedule (typically 20–22 hours daily). Failure to wear aligners as prescribed, improper cleaning, or skipping aligner stages may prolong treatment or require additional refinement aligners.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.375rem', marginBottom: '0.75rem', color: 'var(--color-primary-dark)' }}>
              5. Intellectual Property
            </h2>
            <p>
              All trademarks, logos, brand assets, images, text, and videos displayed on this website are the proprietary property of Alignaa or its licensors. Reproduction, copying, or redistribution without prior written permission is strictly prohibited.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.375rem', marginBottom: '0.75rem', color: 'var(--color-primary-dark)' }}>
              6. Governing Law
            </h2>
            <p>
              These terms shall be governed by and construed in accordance with the laws of India, and any disputes shall be subject to the exclusive jurisdiction of the competent courts in India.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
};

