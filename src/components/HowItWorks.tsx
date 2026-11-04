import React from 'react';
import { HOW_IT_WORKS_STEPS } from '../config/siteContent';

export const HowItWorks: React.FC = () => {
  return (
    <section className="section section-alt" id="how-it-works" aria-labelledby="how-it-works-heading">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">Clear & Simple Process</span>
          <h2 id="how-it-works-heading" className="section-title">
            How Alignaa Works
          </h2>
          <p className="section-subtitle">
            From initial digital intraoral scan to wearing your custom aligners, your journey is supervised by licensed dental specialists.
          </p>
        </div>

        <div className="how-it-works-timeline">
          {HOW_IT_WORKS_STEPS.map((step) => (
            <div key={step.stepNumber} className="step-card">
              <div className="step-circle">
                <img
                  src={step.iconPath}
                  alt={`Step ${step.stepNumber}: ${step.title}`}
                  className="step-icon-img"
                  loading="lazy"
                />
                <div className="step-number-badge">{step.stepNumber}</div>
              </div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
              {step.operationalNote && (
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-light)', marginTop: '0.5rem', display: 'block' }}>
                  * {step.operationalNote}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

