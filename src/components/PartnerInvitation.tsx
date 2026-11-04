import React from 'react';
import { Stethoscope, ArrowRight } from 'lucide-react';

interface PartnerInvitationProps {
  onNavigatePartner: () => void;
}

export const PartnerInvitation: React.FC<PartnerInvitationProps> = ({ onNavigatePartner }) => {
  return (
    <section className="section section-alt" aria-labelledby="partner-invite-heading">
      <div className="container">
        <div className="partner-invitation-box">
          <div className="partner-invitation-text">
            <span className="eyebrow" style={{ backgroundColor: '#FFFFFF' }}>For Dental Practitioners</span>
            <h3 id="partner-invite-heading">Are You a Dentist or Clinic Owner?</h3>
            <p>
              Partner with Alignaa to offer world-class clear-aligner solutions directly in your practice.
              Retain 100% clinical control with seamless 3D digital planning and direct laboratory pricing.
            </p>
          </div>

          <button
            type="button"
            className="btn btn-secondary btn-lg"
            onClick={onNavigatePartner}
            style={{ flexShrink: 0 }}
          >
            <Stethoscope size={18} />
            Explore Partner Opportunities
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

