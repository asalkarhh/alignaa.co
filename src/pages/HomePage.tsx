import React, { useState } from 'react';
import { HeroVideo } from '../components/HeroVideo';
import { TreatmentOverview } from '../components/TreatmentOverview';
import { TreatmentOffer } from '../components/TreatmentOffer';
import { HowItWorks } from '../components/HowItWorks';
import { TeethConcerns } from '../components/TeethConcerns';
import { RealSmilesResults } from '../components/RealSmilesResults';
import { WhyAlignaa } from '../components/WhyAlignaa';
import { PricingComparison } from '../components/PricingComparison';
import { Reviews } from '../components/Reviews';
import { FaqAccordion } from '../components/FaqAccordion';
import { PatientEnquiryForm } from '../components/PatientEnquiryForm';
import { PartnerInvitation } from '../components/PartnerInvitation';
import { DesignLayoutOption } from '../types';

interface HomePageProps {
  layoutOption: DesignLayoutOption;
  onNavigatePage: (page: string) => void;
  onNavigateToEnquiry: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  layoutOption,
  onNavigatePage,
  onNavigateToEnquiry
}) => {
  const [prefilledConcern, setPrefilledConcern] = useState<string>('');

  const handleSelectConcernForEnquiry = (concernName: string) => {
    setPrefilledConcern(concernName);
    onNavigateToEnquiry();
  };

  const handleExploreClick = () => {
    const el = document.getElementById('how-it-works') || document.getElementById('treatment-overview');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Option A: Video First (Default)
  if (layoutOption === 'a') {
    return (
      <main id="main-content">
        <HeroVideo
          onNavigateToEnquiry={onNavigateToEnquiry}
          onExploreClick={handleExploreClick}
        />
        <TreatmentOverview />
        <TreatmentOffer onNavigateToEnquiry={onNavigateToEnquiry} />
        <HowItWorks />
        <TeethConcerns onSelectConcernForEnquiry={handleSelectConcernForEnquiry} />
        <RealSmilesResults onNavigateToEnquiry={onNavigateToEnquiry} />
        <WhyAlignaa />
        <PricingComparison onNavigateToEnquiry={onNavigateToEnquiry} />
        <Reviews />
        <FaqAccordion />
        <PatientEnquiryForm
          initialConcern={prefilledConcern}
          onNavigatePage={onNavigatePage}
        />
        <PartnerInvitation onNavigatePartner={() => onNavigatePage('partner')} />
      </main>
    );
  }

  // Option B: Clinical & Structured Focus
  if (layoutOption === 'b') {
    return (
      <main id="main-content">
        <HeroVideo
          onNavigateToEnquiry={onNavigateToEnquiry}
          onExploreClick={handleExploreClick}
        />
        <TreatmentOverview />
        <HowItWorks />
        <RealSmilesResults onNavigateToEnquiry={onNavigateToEnquiry} />
        <WhyAlignaa />
        <TeethConcerns onSelectConcernForEnquiry={handleSelectConcernForEnquiry} />
        <TreatmentOffer onNavigateToEnquiry={onNavigateToEnquiry} />
        <PricingComparison onNavigateToEnquiry={onNavigateToEnquiry} />
        <FaqAccordion />
        <Reviews />
        <PatientEnquiryForm
          initialConcern={prefilledConcern}
          onNavigatePage={onNavigatePage}
        />
        <PartnerInvitation onNavigatePartner={() => onNavigatePage('partner')} />
      </main>
    );
  }

  // Option C: Patient Story Led
  return (
    <main id="main-content">
      <HeroVideo
        onNavigateToEnquiry={onNavigateToEnquiry}
        onExploreClick={handleExploreClick}
      />
      <RealSmilesResults onNavigateToEnquiry={onNavigateToEnquiry} />
      <Reviews />
      <TeethConcerns onSelectConcernForEnquiry={handleSelectConcernForEnquiry} />
      <TreatmentOffer onNavigateToEnquiry={onNavigateToEnquiry} />
      <HowItWorks />
      <WhyAlignaa />
      <PricingComparison onNavigateToEnquiry={onNavigateToEnquiry} />
      <FaqAccordion />
      <PatientEnquiryForm
        initialConcern={prefilledConcern}
        onNavigatePage={onNavigatePage}
      />
      <PartnerInvitation onNavigatePartner={() => onNavigatePage('partner')} />
    </main>
  );
};

