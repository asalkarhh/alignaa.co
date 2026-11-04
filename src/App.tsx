import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { DesignOptionSwitcher } from './components/DesignOptionSwitcher';
import { HomePage } from './pages/HomePage';
import { PartnerPage } from './pages/PartnerPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { DesignLayoutOption } from './types';

export function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [layoutOption, setLayoutOption] = useState<DesignLayoutOption>('a');

  // Synchronize route with window.location.pathname on load and on popstate
  const syncRouteFromPath = useCallback(() => {
    const path = window.location.pathname.replace(/\/+$/, '') || '/';
    const params = new URLSearchParams(window.location.search);
    const layoutParam = params.get('layout');

    if (layoutParam === 'a' || layoutParam === 'b' || layoutParam === 'c') {
      setLayoutOption(layoutParam);
    }

    if (path === '/' || path === '') {
      setCurrentPage('home');
    } else if (path === '/become-a-partner' || path === '/partner') {
      setCurrentPage('partner');
    } else if (path === '/privacy-policy' || path === '/privacy') {
      setCurrentPage('privacy');
    } else if (path === '/terms' || path === '/terms-and-conditions') {
      setCurrentPage('terms');
    } else {
      setCurrentPage('404');
    }
  }, []);

  useEffect(() => {
    syncRouteFromPath();
    const handlePopState = () => syncRouteFromPath();
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [syncRouteFromPath]);

  const handleNavigatePage = (page: string) => {
    setCurrentPage(page);
    let newPath = '/';
    let title = 'Alignaa | Clear Aligner Treatment Starting at ₹39,999';

    if (page === 'partner') {
      newPath = '/become-a-partner';
      title = 'Become an Alignaa Partner | Clear Aligners for Dental Clinics';
    } else if (page === 'privacy') {
      newPath = '/privacy-policy';
      title = 'Privacy Policy | Alignaa';
    } else if (page === 'terms') {
      newPath = '/terms';
      title = 'Terms & Conditions | Alignaa';
    }

    window.history.pushState({}, '', newPath);
    document.title = title;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToEnquiry = () => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      window.history.pushState({}, '', '/#enquiry');
      setTimeout(() => {
        const el = document.getElementById('enquiry');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          const inputEl = document.getElementById('field-fullName');
          if (inputEl) inputEl.focus();
        }
      }, 150);
    } else {
      const el = document.getElementById('enquiry');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        const inputEl = document.getElementById('field-fullName');
        if (inputEl) inputEl.focus();
      }
    }
  };

  const handleSelectLayout = (opt: DesignLayoutOption) => {
    setLayoutOption(opt);
    const url = new URL(window.location.href);
    url.searchParams.set('layout', opt);
    window.history.replaceState({}, '', url.toString());
  };

  return (
    <div className="site-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Accessibility Skip Link */}
      <a
        href="#main-content"
        style={{
          position: 'absolute',
          left: '-9999px',
          top: 'auto',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
          zIndex: 999
        }}
        onFocus={(e) => {
          e.currentTarget.style.position = 'static';
          e.currentTarget.style.width = 'auto';
          e.currentTarget.style.height = 'auto';
        }}
        onBlur={(e) => {
          e.currentTarget.style.position = 'absolute';
          e.currentTarget.style.left = '-9999px';
        }}
      >
        Skip to main content
      </a>

      {/* Reviewer / Intern Design Option Switcher */}
      {currentPage === 'home' && (
        <DesignOptionSwitcher
          currentOption={layoutOption}
          onSelectOption={handleSelectLayout}
        />
      )}

      {/* Primary Header */}
      <Header
        onNavigateToEnquiry={handleNavigateToEnquiry}
        currentPage={currentPage}
        onNavigatePage={handleNavigatePage}
      />

      {/* Main Page Content */}
      <div style={{ flex: 1 }}>
        {currentPage === 'home' && (
          <HomePage
            layoutOption={layoutOption}
            onNavigatePage={handleNavigatePage}
            onNavigateToEnquiry={handleNavigateToEnquiry}
          />
        )}

        {currentPage === 'partner' && (
          <PartnerPage onNavigatePage={handleNavigatePage} />
        )}

        {currentPage === 'privacy' && (
          <PrivacyPolicyPage onBackToHome={() => handleNavigatePage('home')} />
        )}

        {currentPage === 'terms' && (
          <TermsPage onBackToHome={() => handleNavigatePage('home')} />
        )}

        {currentPage === '404' && (
          <NotFoundPage onBackToHome={() => handleNavigatePage('home')} />
        )}
      </div>

      {/* Footer */}
      <Footer
        onNavigatePage={handleNavigatePage}
        onNavigateToEnquiry={handleNavigateToEnquiry}
      />
    </div>
  );
}

export default App;

