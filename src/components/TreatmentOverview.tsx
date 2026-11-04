import React from 'react';
import { Stethoscope, Sparkles, MonitorPlay } from 'lucide-react';
import { TREATMENT_OVERVIEW } from '../config/siteContent';

export const TreatmentOverview: React.FC = () => {
  return (
    <section className="section section-alt" id="treatment-overview" aria-labelledby="overview-heading">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">{TREATMENT_OVERVIEW.eyebrow}</span>
          <h2 id="overview-heading" className="section-title">
            {TREATMENT_OVERVIEW.title}
          </h2>
          <p className="section-subtitle">
            {TREATMENT_OVERVIEW.description}
          </p>
        </div>

        <div className="benefits-grid" style={{ marginTop: '2.5rem' }}>
          {TREATMENT_OVERVIEW.pillars.map((pillar, idx) => (
            <div key={idx} className="benefit-card">
              <div className="benefit-icon-wrapper">
                {idx === 0 && <Stethoscope size={24} />}
                {idx === 1 && <Sparkles size={24} />}
                {idx === 2 && <MonitorPlay size={24} />}
              </div>
              <h3 className="benefit-title">{pillar.title}</h3>
              <p className="benefit-desc">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

