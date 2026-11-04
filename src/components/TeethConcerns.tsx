import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, X, AlertCircle, Sparkles } from 'lucide-react';
import { TEETH_CONCERNS } from '../config/siteContent';
import { TeethConcernItem } from '../types';

interface TeethConcernsProps {
  onSelectConcernForEnquiry: (concernName: string) => void;
}

export const TeethConcerns: React.FC<TeethConcernsProps> = ({ onSelectConcernForEnquiry }) => {
  const [selectedConcern, setSelectedConcern] = useState<TeethConcernItem | null>(null);
  const triggerRefMap = useRef<Record<string, HTMLButtonElement | null>>({});

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedConcern) {
        handleCloseModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedConcern]);

  const handleOpenModal = (concern: TeethConcernItem) => {
    setSelectedConcern(concern);
  };

  const handleCloseModal = () => {
    const currentId = selectedConcern?.id;
    setSelectedConcern(null);
    if (currentId && triggerRefMap.current[currentId]) {
      triggerRefMap.current[currentId]?.focus();
    }
  };

  return (
    <section className="section" id="concerns" aria-labelledby="concerns-heading">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">Common Alignment Needs</span>
          <h2 id="concerns-heading" className="section-title">
            Teeth Concerns We Can Help Address
          </h2>
          <p className="section-subtitle">
            Clear aligners are proven to correct a wide spectrum of mild to moderate dental alignments.
            Explore common conditions below.
          </p>
        </div>

        <div className="concerns-grid">
          {TEETH_CONCERNS.map((concern) => (
            <article key={concern.id} className="concern-card">
              <div className="concern-image-wrapper">
                <img
                  src={concern.iconPath}
                  alt={`${concern.title} illustration`}
                  className="concern-img"
                  loading="lazy"
                />
              </div>

              <h3 className="concern-title">{concern.title}</h3>
              <p className="concern-desc">{concern.shortDescription}</p>

              <button
                ref={(el) => {
                  triggerRefMap.current[concern.id] = el;
                }}
                type="button"
                className="concern-learn-more-btn"
                onClick={() => handleOpenModal(concern)}
                aria-haspopup="dialog"
              >
                Learn More
                <ArrowRight size={14} aria-hidden="true" />
              </button>
            </article>
          ))}
        </div>

        {/* Clinical Disclaimer Callout */}
        <div
          style={{
            marginTop: '2.5rem',
            padding: '1rem 1.5rem',
            backgroundColor: 'var(--color-bg-near-white)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            fontSize: '0.875rem',
            color: 'var(--color-text-muted)'
          }}
        >
          <AlertCircle size={18} color="var(--color-primary)" style={{ flexShrink: 0 }} />
          <span>
            <strong>Educational Note:</strong> These descriptions illustrate typical dental alignments and do not constitute a clinical diagnosis. Suitability is determined exclusively by a licensed dental professional following your 3D digital scan.
          </span>
        </div>
      </div>

      {/* Accessible Educational Modal */}
      {selectedConcern && (
        <div
          className="modal-backdrop"
          onClick={handleCloseModal}
          role="presentation"
        >
          <div
            className="modal-content"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-concern-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close-btn"
              onClick={handleCloseModal}
              aria-label="Close dialog"
            >
              <X size={20} />
            </button>

            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <img
                src={selectedConcern.iconPath}
                alt=""
                style={{ height: '90px', margin: '0 auto 1rem', objectFit: 'contain' }}
              />
              <span className="eyebrow" style={{ marginBottom: '0.5rem' }}>Orthodontic Guide</span>
              <h3 id="modal-concern-title" style={{ fontSize: '1.5rem' }}>
                {selectedConcern.title}
              </h3>
            </div>

            <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-main)', lineHeight: 1.65, marginBottom: '1.25rem' }}>
              {selectedConcern.educationalDetails}
            </p>

            <div
              style={{
                backgroundColor: 'var(--color-pale-teal)',
                borderLeft: '3px solid var(--color-primary)',
                padding: '0.85rem 1rem',
                borderRadius: '0 8px 8px 0',
                fontSize: '0.875rem',
                color: 'var(--color-text-muted)',
                marginBottom: '1.75rem'
              }}
            >
              <strong>Clinical Assessment:</strong> {selectedConcern.suitableAlignerFit}
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={handleCloseModal}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => {
                  handleCloseModal();
                  onSelectConcernForEnquiry(selectedConcern.title);
                }}
              >
                Enquire about {selectedConcern.title}
                <Sparkles size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

