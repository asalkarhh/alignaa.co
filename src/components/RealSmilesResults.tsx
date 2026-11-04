import React, { useState } from 'react';
import { Clock, Layers, Sparkles } from 'lucide-react';
import { SMILE_RESULTS } from '../config/siteContent';

interface RealSmilesResultsProps {
  onNavigateToEnquiry: () => void;
}

export const RealSmilesResults: React.FC<RealSmilesResultsProps> = ({ onNavigateToEnquiry }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  // Extract distinct categories present in data
  const categories = ['All', ...Array.from(new Set(SMILE_RESULTS.map((r) => r.category)))];

  const filteredResults =
    selectedFilter === 'All'
      ? SMILE_RESULTS
      : SMILE_RESULTS.filter((r) => r.category === selectedFilter);

  return (
    <section className="section section-alt" id="results" aria-labelledby="results-heading">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">Clinical Documentation</span>
          <h2 id="results-heading" className="section-title">
            Real Smiles, Real Changes
          </h2>
          <p className="section-subtitle">
            Documented clinical outcomes treated with Alignaa clear aligner therapy under doctor supervision.
          </p>
        </div>

        {/* Category Filters */}
        <div className="results-filter-bar" role="tablist" aria-label="Filter results by category">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={selectedFilter === cat}
              className={`filter-btn ${selectedFilter === cat ? 'active' : ''}`}
              onClick={() => setSelectedFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results Grid */}
        <div className="results-grid">
          {filteredResults.map((result) => (
            <article key={result.id} className="result-card">
              <div className="result-image-container">
                <img
                  src={result.imageBeforeAfter}
                  alt={`Before and After treatment for ${result.title}`}
                  className="result-image"
                  loading="lazy"
                />
                <div className="result-badges">
                  <span className="badge-category">{result.category}</span>
                  <span
                    style={{
                      backgroundColor: 'rgba(0, 0, 0, 0.65)',
                      color: '#FFFFFF',
                      fontSize: '0.75rem',
                      padding: '0.25rem 0.6rem',
                      borderRadius: 'var(--radius-full)',
                      fontWeight: 600,
                      backdropFilter: 'blur(4px)'
                    }}
                  >
                    Before & After
                  </span>
                </div>
              </div>

              <div className="result-body">
                <h3 className="result-title">{result.title}</h3>

                <div className="result-meta-row">
                  <div className="result-meta-item">
                    <span className="meta-label">Duration</span>
                    <span className="meta-value" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Clock size={14} color="var(--color-primary)" />
                      {result.duration}
                    </span>
                  </div>
                  <div className="result-meta-item">
                    <span className="meta-label">Aligner Trays</span>
                    <span className="meta-value" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Layers size={14} color="var(--color-primary)" />
                      {result.alignerCount} Trays
                    </span>
                  </div>
                </div>

                {result.patientNotes && (
                  <p className="result-note">{result.patientNotes}</p>
                )}
              </div>
            </article>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={onNavigateToEnquiry}
          >
            Start Your Smile Journey
            <Sparkles size={16} />
          </button>
          <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-light)', marginTop: '0.75rem' }}>
            * Clinical outcomes reflect specific patient anatomies. Duration and tray count are prescribed individually by treating doctors.
          </p>
        </div>
      </div>
    </section>
  );
};

