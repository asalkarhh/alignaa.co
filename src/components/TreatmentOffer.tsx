import React from 'react';
import { CheckCircle2, ArrowRight, Shield, Info } from 'lucide-react';
import { TREATMENT_OFFER } from '../config/siteContent';

interface TreatmentOfferProps {
  onNavigateToEnquiry: () => void;
}

export const TreatmentOffer: React.FC<TreatmentOfferProps> = ({ onNavigateToEnquiry }) => {
  return (
    <section className="section" id="pricing" aria-labelledby="offer-heading">
      <div className="container">
        <div className="offer-grid">
          {/* Visual Column */}
          <div className="offer-visual-card">
            <span className="offer-card-badge">Doctor Prescribed</span>
            <img
              src={TREATMENT_OFFER.productImage}
              alt={TREATMENT_OFFER.productImageAlt}
              className="offer-product-image"
              loading="lazy"
              width={512}
              height={360}
            />
            <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
              <Shield size={16} color="var(--color-primary)" />
              <span>Medical-grade biocompatible polymers</span>
            </div>
          </div>

          {/* Details & Inclusions Column */}
          <div className="offer-details">
            <span className="eyebrow">{TREATMENT_OFFER.eyebrow}</span>
            <h2 id="offer-heading" className="section-title" style={{ marginBottom: '0.5rem' }}>
              {TREATMENT_OFFER.title}
            </h2>

            <div className="price-lockup">
              <span className="price-label">{TREATMENT_OFFER.startingPriceLabel}</span>
              <span className="price-figure">{TREATMENT_OFFER.startingPrice}</span>
              <span className="price-suffix">{TREATMENT_OFFER.priceSuffix}</span>
            </div>

            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem', fontSize: '0.9375rem' }}>
              Complete orthodontic treatment engineered for your specific bite. No surprise add-ons or hidden lab costs.
            </p>

            {/* Inclusions List */}
            <ul className="inclusions-list" aria-label="Treatment package inclusions">
              {TREATMENT_OFFER.inclusions.map((inclusion, index) => (
                <li key={index} className="inclusion-item">
                  <CheckCircle2 size={20} className="inclusion-icon" aria-hidden="true" />
                  <div>
                    <strong>{inclusion.text}</strong>
                    {inclusion.tooltip && (
                      <span style={{ display: 'block', fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginTop: '0.1rem' }}>
                        {inclusion.tooltip}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={onNavigateToEnquiry}
              style={{ alignSelf: 'flex-start', marginBottom: '1rem' }}
            >
              {TREATMENT_OFFER.ctaLabel}
              <ArrowRight size={18} aria-hidden="true" />
            </button>

            {/* EMI Notice */}
            <div className="emi-callout-box">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: '0.2rem' }}>
                <Info size={15} color="var(--color-primary)" />
                <span>Flexible Financing</span>
              </div>
              <p style={{ margin: 0 }}>{TREATMENT_OFFER.emiNote}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

