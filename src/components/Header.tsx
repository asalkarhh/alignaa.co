import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { BRAND_CONFIG } from '../config/siteContent';

interface HeaderProps {
  onNavigateToEnquiry: () => void;
  currentPage: string;
  onNavigatePage: (page: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onNavigateToEnquiry,
  currentPage,
  onNavigatePage
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleNavClick = (anchorId?: string, pageTarget?: string) => {
    setMobileMenuOpen(false);
    if (pageTarget) {
      onNavigatePage(pageTarget);
      return;
    }

    if (currentPage !== 'home') {
      onNavigatePage('home');
      setTimeout(() => {
        if (anchorId) {
          const el = document.getElementById(anchorId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      if (anchorId) {
        const el = document.getElementById(anchorId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="site-header" role="banner">
      <div className="container header-container">
        {/* Brand Logo */}
        <a
          href="/"
          className="logo-link"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick(undefined, 'home');
          }}
          aria-label="Alignaa Home"
        >
          <img
            src={BRAND_CONFIG.logoLightPath}
            alt="Alignaa Logo"
            className="brand-logo-img"
            width={160}
            height={42}
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <a
            href="#how-it-works"
            className="nav-link"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('how-it-works');
            }}
          >
            How It Works
          </a>
          <a
            href="#results"
            className="nav-link"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('results');
            }}
          >
            Results
          </a>
          <a
            href="#pricing"
            className="nav-link"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('pricing');
            }}
          >
            Pricing
          </a>
          <a
            href="#faqs"
            className="nav-link"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('faqs');
            }}
          >
            FAQs
          </a>
          <a
            href="/become-a-partner"
            className={`nav-link partner-link ${currentPage === 'partner' ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick(undefined, 'partner');
            }}
          >
            Become a Partner
          </a>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={onNavigateToEnquiry}
          >
            Request a Scan
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </nav>

        {/* Mobile Nav Toggle */}
        <button
          type="button"
          className="mobile-nav-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      <div
        className={`mobile-nav-overlay ${mobileMenuOpen ? 'open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Navigation Drawer */}
      <div
        className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
      >
        <div className="mobile-nav-header">
          <img
            src={BRAND_CONFIG.logoLightPath}
            alt="Alignaa Logo"
            className="brand-logo-img"
            style={{ height: '36px' }}
          />
          <button
            type="button"
            className="modal-close-btn"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close navigation"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="mobile-links" aria-label="Mobile Links">
          <a
            href="#how-it-works"
            className="mobile-nav-link"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('how-it-works');
            }}
          >
            How It Works
          </a>
          <a
            href="#results"
            className="mobile-nav-link"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('results');
            }}
          >
            Results
          </a>
          <a
            href="#pricing"
            className="mobile-nav-link"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('pricing');
            }}
          >
            Pricing
          </a>
          <a
            href="#faqs"
            className="mobile-nav-link"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('faqs');
            }}
          >
            FAQs
          </a>
          <a
            href="/become-a-partner"
            className="mobile-nav-link"
            style={{ color: 'var(--color-primary)', fontWeight: 600 }}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick(undefined, 'partner');
            }}
          >
            Become a Partner
          </a>
        </nav>

        <button
          type="button"
          className="btn btn-primary"
          style={{ width: '100%', marginTop: 'auto' }}
          onClick={() => {
            setMobileMenuOpen(false);
            onNavigateToEnquiry();
          }}
        >
          Request a Scan
        </button>
      </div>
    </header>
  );
};

