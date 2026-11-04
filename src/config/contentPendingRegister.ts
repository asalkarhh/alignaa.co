export interface PendingItem {
  id: string;
  category: 'Asset' | 'Copy' | 'Commercial' | 'Integration' | 'Compliance';
  item: string;
  currentPlaceholder: string;
  requiredFromClient: string;
  status: 'Pending Client Sign-Off' | 'Configured in Preview' | 'Supplied Partial';
  notes: string;
}

export const CONTENT_PENDING_REGISTER: PendingItem[] = [
  {
    id: 'PEND-001',
    category: 'Integration',
    item: 'Owner Email Inbox & Hosted Form Endpoint',
    currentPlaceholder: 'Preview mode logging to console / on-screen guidance',
    requiredFromClient: 'Webhook URL or Formspree/Basin endpoint ID + target recipient inbox email (e.g., support@alignaa.co)',
    status: 'Configured in Preview',
    notes: 'Forms validate and preserve data; honest notification explains when delivery service endpoint is unconfigured in .env'
  },
  {
    id: 'PEND-002',
    category: 'Commercial',
    item: 'Financing & EMI Partner Details',
    currentPlaceholder: 'General mention: "Affordable EMI options available on request"',
    requiredFromClient: 'Confirmed EMI partner names, interest rates, tenure options, and monthly installment claims',
    status: 'Pending Client Sign-Off',
    notes: 'No specific monthly rupee amounts invented per requirements'
  },
  {
    id: 'PEND-003',
    category: 'Copy',
    item: 'Comparison Table Data & Categories',
    currentPlaceholder: 'Standard orthodontic vs clear aligner feature comparison',
    requiredFromClient: 'Specific competitor comparison parameters or confirmation to hide section in production',
    status: 'Configured in Preview',
    notes: 'Configurable toggle VITE_ENABLE_ILLUSTRATIVE_COMPARISON controls visibility for production'
  },
  {
    id: 'PEND-004',
    category: 'Asset',
    item: 'High-Resolution Real Patient Results Photography',
    currentPlaceholder: 'Approved case study photographs extracted from ALignaa.co.pdf (324x405)',
    requiredFromClient: 'High-resolution original exports for Gap Closure, Forwardly Placed, and Crowding cases with signed consent',
    status: 'Supplied Partial',
    notes: 'PDF extracts currently active in assets directory; high-res camera originals recommended for crisp retina display'
  },
  {
    id: 'PEND-005',
    category: 'Copy',
    item: 'Verified Patient Testimonials & Google / Practo Reviews',
    currentPlaceholder: 'Sample patient experience previews clearly flagged as unverified review placeholders',
    requiredFromClient: 'Real approved patient reviews, names, photos, and ratings',
    status: 'Pending Client Sign-Off',
    notes: 'Marked with disclaimer in preview mode'
  },
  {
    id: 'PEND-006',
    category: 'Asset',
    item: 'Hero Video Footage',
    currentPlaceholder: 'Alignaa 3D intro footage (/assets/alignaa-hero-video.mp4) with poster image',
    requiredFromClient: 'Confirmation if 16:9 widescreen patient lifestyle video should replace the current 3D loop footage',
    status: 'Supplied Partial',
    notes: 'Current video autoplays inline, muted, with poster fallback and play/pause accessible controls'
  },
  {
    id: 'PEND-007',
    category: 'Compliance',
    item: 'Official Contact Numbers & Registered Office Address',
    currentPlaceholder: 'partner@alignaa.in, Instagram @alignaa_india, placeholder phone',
    requiredFromClient: 'Registered company entity name, CIN, official customer care phone, and physical clinic address',
    status: 'Pending Client Sign-Off',
    notes: 'Only verified parent brand links (alignaa.in, partner@alignaa.in, @alignaa_india) are active'
  }
];

