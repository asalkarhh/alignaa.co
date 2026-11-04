import React from 'react';
import { Home, ArrowLeft } from 'lucide-react';

interface NotFoundPageProps {
  onBackToHome: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onBackToHome }) => {
  return (
    <main id="main-content" className="section" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: '600px' }}>
        <span className="eyebrow" style={{ backgroundColor: 'var(--color-pale-teal)' }}>Page Not Found</span>
        <h1 style={{ fontSize: '4.5rem', fontWeight: 700, color: 'var(--color-primary)', margin: '1rem 0' }}>
          404
        </h1>
        <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>
          We couldn’t find that page
        </h2>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', fontSize: '1.0625rem' }}>
          The page you are looking for might have been moved, removed, or is temporarily unavailable. Let’s get you back on track to exploring clear-aligner treatment.
        </p>
        <button
          type="button"
          className="btn btn-primary btn-lg"
          onClick={onBackToHome}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <Home size={18} />
          Return to Homepage
        </button>
      </div>
    </main>
  );
};

