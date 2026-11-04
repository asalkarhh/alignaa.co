export type DesignLayoutOption = 'a' | 'b' | 'c';

export interface PatientEnquiryData {
  fullName: string;
  mobile: string;
  ageGroup: string;
  city: string;
  pinCode: string;
  concern: string;
  email?: string;
  message?: string;
  consent: boolean;
  sourcePage?: string;
  timestamp?: string;
  // Anti-spam honeypot field (hidden from real users)
  websiteField?: string;
}

export interface PartnerEnquiryData {
  fullName: string;
  role: 'Dentist' | 'Clinic owner' | 'Other' | '';
  clinicName: string;
  mobile: string;
  email: string;
  city: string;
  pinCode: string;
  message?: string;
  consent: boolean;
  sourcePage?: string;
  timestamp?: string;
  websiteField?: string;
}

export type SubmissionStatus = 'idle' | 'loading' | 'success' | 'unconfigured' | 'error';

export interface FormSubmissionResult {
  success: boolean;
  status: 'sent' | 'unconfigured' | 'error';
  message: string;
  details?: Record<string, unknown>;
}

export interface TeethConcernItem {
  id: string;
  title: string;
  shortDescription: string;
  educationalDetails: string;
  iconPath: string;
  suitableAlignerFit: string;
}

export interface SmileResultCase {
  id: string;
  title: string;
  category: 'Gap Closure' | 'Forwardly Placed' | 'Crowding';
  duration: string;
  alignerCount: number;
  imageBeforeAfter: string;
  patientNotes?: string;
}

export interface PricingInclusion {
  text: string;
  tooltip?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  priceDisplay: string;
  badge?: string;
  isCurrentBaseline: boolean;
  description: string;
  inclusions: string[];
}

export interface ComparisonRow {
  feature: string;
  alignaa: string | boolean;
  traditionalBraces: string | boolean;
  otherAligners: string | boolean;
  highlight?: boolean;
}

export interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  location: string;
  rating: number;
  treatment: string;
  reviewText: string;
  isVerifiedReal: boolean;
}

export interface BenefitItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface StepItem {
  stepNumber: number;
  title: string;
  description: string;
  iconPath: string;
  operationalNote?: string;
}

