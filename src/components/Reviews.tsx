import React from 'react';
import { Star, MessageSquareQuote } from 'lucide-react';
import { SAMPLE_REVIEWS } from '../config/siteContent';

export const Reviews: React.FC = () => {
  return (
    <section className="section" id="reviews" aria-labelledby="reviews-heading">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">Patient Experience</span>
          <h2 id="reviews-heading" className="section-title">
            Smiles in Progress
          </h2>
          <p className="section-subtitle">
            Hear from patients who started their orthodontic journeys with Alignaa doctor-guided treatment.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="reviews-grid">
          {SAMPLE_REVIEWS.map((review) => (
            <article key={review.id} className="review-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <div className="review-stars" aria-label={`Rating: ${review.rating} out of 5 stars`}>
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} size={18} fill="#F59E0B" stroke="#F59E0B" />
                  ))}
                </div>
                <MessageSquareQuote size={24} color="var(--color-border)" />
              </div>

              <blockquote className="review-text">
                "{review.reviewText}"
              </blockquote>

              <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--color-border-subtle)' }}>
                <div className="review-author">{review.author}</div>
                <div className="review-meta">
                  {review.location} • {review.treatment}
                </div>
                {!review.isVerifiedReal && (
                  <span className="review-preview-pill">
                    Sample Draft Preview (Pending Approval)
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-light)' }}>
            * Patient reviews above represent sample formatting for design review. Approved patient submissions will be published following verified clinical consent.
          </span>
        </div>
      </div>
    </section>
  );
};

