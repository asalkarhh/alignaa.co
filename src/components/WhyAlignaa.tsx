import React from 'react';
import { ShieldCheck, Smile, MapPin, Sparkles, HeartHandshake, CheckCircle } from 'lucide-react';
import { WHY_ALIGNAA_BENEFITS } from '../config/siteContent';

export const WhyAlignaa: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'ShieldCheck':
        return <ShieldCheck size={26} />;
      case 'Smile':
        return <Smile size={26} />;
      case 'MapPin':
        return <MapPin size={26} />;
      case 'Sparkles':
        return <Sparkles size={26} />;
      case 'HeartHandshake':
        return <HeartHandshake size={26} />;
      case 'CheckCircle':
        return <CheckCircle size={26} />;
      default:
        return <ShieldCheck size={26} />;
    }
  };

  return (
    <section className="section" id="why-alignaa" aria-labelledby="why-heading">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">The Alignaa Difference</span>
          <h2 id="why-heading" className="section-title">
            Why Patients Choose Alignaa
          </h2>
          <p className="section-subtitle">
            Orthodontic care that merges clinical precision with at-home convenience, transparent pricing, and personal support.
          </p>
        </div>

        <div className="benefits-grid">
          {WHY_ALIGNAA_BENEFITS.map((benefit) => (
            <article key={benefit.id} className="benefit-card">
              <div className="benefit-icon-wrapper" aria-hidden="true">
                {getIcon(benefit.iconName)}
              </div>
              <h3 className="benefit-title">{benefit.title}</h3>
              <p className="benefit-desc">{benefit.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

