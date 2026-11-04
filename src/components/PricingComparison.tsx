import React from 'react';
import { Check, X, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { PRICING_CONFIG, COMPARISON_ROWS } from '../config/siteContent';

interface PricingComparisonProps {
  onNavigateToEnquiry: () => void;
  showIllustrativeComparison?: boolean;
}

export const PricingComparison: React.FC<PricingComparisonProps> = ({
  onNavigateToEnquiry,
  showIllustrativeComparison = true
}) => {
  return (
    <section className="section section-alt" id="comparison" aria-labelledby="pricing-heading">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">Fair & Transparent Value</span>
          <h2 id="pricing-heading" className="section-title">
            How Alignaa Compares
          </h2>
          <p className="section-subtitle">
            Experience orthodontic-grade teeth straightening with full doctor oversight at a transparent starting price of {PRICING_CONFIG.baselineStartingPrice}.
          </p>
        </div>

        {/* Confirmed Baseline Summary Card */}
        <div
          style={{
            maxWidth: '820px',
            margin: '0 auto 3.5rem',
            backgroundColor: '#FFFFFF',
            border: '2px solid var(--color-primary)',
            borderRadius: 'var(--radius-xl)',
            padding: '2.5rem',
            boxShadow: 'var(--shadow-md)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="eyebrow" style={{ marginBottom: '0.4rem' }}>Approved Launch Baseline</span>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 700 }}>{PRICING_CONFIG.baselineTitle}</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9375rem', margin: '0.25rem 0 0' }}>
                All-in-one patient package from initial intraoral scan to final retention.
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', display: 'block' }}>Starting Price</span>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                {PRICING_CONFIG.baselineStartingPrice}
              </span>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '0.75rem',
              paddingTop: '1rem',
              borderTop: '1px solid var(--color-border)'
            }}
          >
            {PRICING_CONFIG.baselineInclusions.map((inc, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9375rem' }}>
                <Check size={18} color="var(--color-primary)" style={{ flexShrink: 0 }} />
                <span>{inc}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', paddingTop: '0.5rem' }}>
            <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
              Flexible EMI options available on request upon doctor assessment.
            </span>
            <button type="button" className="btn btn-primary" onClick={onNavigateToEnquiry}>
              Request a Scan
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Comparison Table Section (Controlled by preview flag) */}
        {showIllustrativeComparison && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  backgroundColor: '#FEF3C7',
                  border: '1px solid #FCD34D',
                  color: '#92400E',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  padding: '0.35rem 0.85rem',
                  borderRadius: 'var(--radius-full)'
                }}
              >
                <HelpCircle size={14} />
                Design Review Preview: Illustrative Comparison Matrix (Pending Client Sign-Off)
              </span>
            </div>

            <div className="comparison-container">
              <table className="comparison-table" aria-label="Feature comparison between Alignaa, Traditional Braces, and Mail-order aligners">
                <thead>
                  <tr>
                    <th scope="col" style={{ width: '34%' }}>Feature / Care Step</th>
                    <th scope="col" className="col-highlight" style={{ width: '26%' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <ShieldCheck size={18} />
                        Alignaa Clear Aligners
                      </div>
                    </th>
                    <th scope="col" style={{ width: '20%' }}>Traditional Braces</th>
                    <th scope="col" style={{ width: '20%' }}>Direct-to-Home Kits</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_ROWS.map((row, idx) => (
                    <tr key={idx}>
                      <th scope="row" style={{ fontWeight: 600, color: 'var(--color-text-main)' }}>
                        {row.feature}
                      </th>
                      <td className="col-highlight">
                        {typeof row.alignaa === 'boolean' ? (
                          row.alignaa ? <Check size={18} color="var(--color-primary)" /> : <X size={18} color="#999" />
                        ) : (
                          row.alignaa
                        )}
                      </td>
                      <td>
                        {typeof row.traditionalBraces === 'boolean' ? (
                          row.traditionalBraces ? <Check size={18} color="#2E7D32" /> : <X size={18} color="#999" />
                        ) : (
                          row.traditionalBraces
                        )}
                      </td>
                      <td>
                        {typeof row.otherAligners === 'boolean' ? (
                          row.otherAligners ? <Check size={18} color="#2E7D32" /> : <X size={18} color="#999" />
                        ) : (
                          row.otherAligners
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="comparison-disclaimer">
              * The figures and parameters above are illustrative design draft representations for review. Actual clinical recommendations and costs will be finalized following doctor assessment.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

