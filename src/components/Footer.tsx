import React from 'react';
import { ArrowUpRight, Mail, Shield } from 'lucide-react';
import { BRAND_CONFIG } from '../config/siteContent';

interface FooterProps {
  onNavigatePage: (page: string) => void;
  onNavigateToEnquiry: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigatePage, onNavigateToEnquiry }) => {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-brand">
            <img
              src={BRAND_CONFIG.logoLightPath}
              alt="Alignaa"
              style={{ height: '38px', filter: 'brightness(0) invert(1)' }}
            />
            <p>
              Precision clear aligners prescribed by licensed dental professionals.
              Transforming smiles across India with comfortable, invisible, custom orthodontic care.
            </p>
            <div style={{ marginTop: '1.25rem', display: 'flex', gap: '0.75rem' }}>
              <a
                href={BRAND_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Alignaa on Instagram"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: '#FFFFFF'
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </a>
              <a
                href={`mailto:${BRAND_CONFIG.contactEmail}`}
                aria-label="Email Alignaa"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: '#FFFFFF'
                }}
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-heading">Treatment</h4>
            <ul className="footer-links">
              <li>
                <a
                  href="#how-it-works"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigatePage('home');
                    setTimeout(() => {
                      document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="#results"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigatePage('home');
                    setTimeout(() => {
                      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                >
                  Real Smiles
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigatePage('home');
                    setTimeout(() => {
                      document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                >
                  Pricing & Inclusions
                </a>
              </li>
              <li>
                <a
                  href="#faqs"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigatePage('home');
                    setTimeout(() => {
                      document.getElementById('faqs')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                >
                  FAQs
                </a>
              </li>
              <li>
                <button
                  type="button"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#B5C9C9',
                    cursor: 'pointer',
                    padding: 0,
                    font: 'inherit'
                  }}
                  onClick={onNavigateToEnquiry}
                >
                  Request a Scan
                </button>
              </li>
            </ul>
          </div>

          {/* Partners & Corporate */}
          <div>
            <h4 className="footer-heading">Partners</h4>
            <ul className="footer-links">
              <li>
                <a
                  href="/become-a-partner"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigatePage('partner');
                  }}
                >
                  Become a Partner
                </a>
              </li>
              <li>
                <a
                  href={BRAND_CONFIG.parentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                >
                  Alignaa Professional (India)
                  <ArrowUpRight size={14} />
                </a>
              </li>
              <li>
                <a
                  href="/privacy-policy"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigatePage('privacy');
                  }}
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigatePage('terms');
                  }}
                >
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="footer-heading">Contact & Support</h4>
            <ul className="footer-links">
              <li style={{ color: '#A0B5B5' }}>
                <strong style={{ color: '#FFFFFF', display: 'block' }}>Email Support:</strong>
                {BRAND_CONFIG.contactEmail}
              </li>
              <li style={{ color: '#A0B5B5' }}>
                <strong style={{ color: '#FFFFFF', display: 'block' }}>Corporate Domain:</strong>
                alignaa.in (Professional Hub)
              </li>
              <li style={{ color: '#A0B5B5' }}>
                <strong style={{ color: '#FFFFFF', display: 'block' }}>Patient Domain:</strong>
                alignaa.co (D2C Patient Service)
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Alignaa. All rights reserved. alignaa.co is the patient-facing service of Alignaa.</p>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8125rem' }}>
              <Shield size={14} color="#007B7F" />
              Doctor Prescribed Treatment
            </span>
            <a
              href={BRAND_CONFIG.parentUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#A0B5B5', textDecoration: 'underline' }}
            >
              Visit alignaa.in
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
