import {
  TeethConcernItem,
  SmileResultCase,
  PricingPlan,
  ComparisonRow,
  FaqItem,
  ReviewItem,
  BenefitItem,
  StepItem
} from '../types';

export const BRAND_CONFIG = {
  name: 'Alignaa',
  tagline: 'Precision Clear Aligners',
  domain: 'alignaa.co',
  parentDomain: 'alignaa.in',
  parentUrl: 'https://alignaa.in/',
  instagramUrl: 'https://www.instagram.com/alignaa_india/',
  contactEmail: 'partner@alignaa.in',
  supportInbox: 'support@alignaa.co',
  phoneDisplay: '+91 98200 00000 (Pending Confirmation)',
  phoneCallable: '+919820000000',
  logoLightPath: '/assets/logo-alignaa.png',
  logoDarkPath: '/assets/logo-alignaa.png',
  heroVideoPath: '/assets/alignaa-hero-video.mp4',
  heroPosterPath: '/assets/alignaa-hero-poster.jpg',
  plan3dVideoPath: '/assets/alignaa-3d-plan.mp4',
  plan3dPosterPath: '/assets/alignaa-3d-poster.png',
  kitBoxPath: '/assets/alignaa-box.png',
  productImagePath: '/assets/aligner-product.jpg',
  colors: {
    primary: '#007B7F',
    primaryDark: '#005A60',
    textMain: '#333333',
    bgWhite: '#FFFFFF',
    bgNearWhite: '#FCFCFC',
    paleTeal: '#EFF8F8',
    borderColor: '#D9E3E3'
  }
};

export const HERO_CONTENT = {
  badge: 'Precision Orthodontic Aligners',
  headline: 'Your smile journey starts with Alignaa',
  supportingText:
    'Explore clear-aligner treatment with a personalised plan prescribed by a dental professional. Discreet, comfortable, and doctor-monitored from scan to retainers.',
  primaryCta: 'Request a Scan',
  secondaryCta: 'Explore How It Works',
  startingPriceNote: 'Starting at ₹39,999 with complete care inclusions'
};

export const TREATMENT_OVERVIEW = {
  eyebrow: 'Clinical Care Meets Everyday Comfort',
  title: 'Clear aligners designed for real life',
  description:
    'Alignaa clear aligners are transparent, custom-molded medical devices crafted to gently guide your teeth into proper alignment over time. Unlike traditional metal braces, Alignaa aligners are virtually invisible, smooth on gums, and easily removable for eating and oral hygiene.',
  pillars: [
    {
      title: 'Doctor-Prescribed Planning',
      description: 'Every treatment roadmap is personally reviewed and mapped out by licensed dental professionals.'
    },
    {
      title: 'High-Clarity Medical Polymers',
      description: 'Engineered from ultra-clear, BPA-free biocompatible material that resists staining and fits snugly.'
    },
    {
      title: 'Convenient Digital Workflow',
      description: 'Digital 3D scans capture exact tooth anatomy without messy impression putty.'
    }
  ]
};

export const TREATMENT_OFFER = {
  eyebrow: 'All-Inclusive Care Package',
  title: 'Aligner Treatment',
  startingPrice: '₹39,999',
  startingPriceLabel: 'Starting at',
  priceSuffix: '/-',
  emiNote: 'Affordable EMI options available on request (financing partner terms apply upon enquiry).',
  ctaLabel: 'Request a Scan',
  productImage: '/assets/alignaa-box.png',
  productImageAlt: 'Alignaa custom clear aligner package and travel kit',
  inclusions: [
    {
      text: 'At-home or Alignaa centre scan facility',
      tooltip: 'Convenient 3D intraoral scan scheduled at your preferred location or partner clinic.'
    },
    {
      text: 'Custom treatment plan prescribed by a licensed doctor',
      tooltip: 'Detailed orthodontic staging prepared by verified dental practitioners.'
    },
    {
      text: 'Free shipping and handling',
      tooltip: 'Direct door-to-door delivery of all your aligner phases in protective packaging.'
    },
    {
      text: 'Full or phased treatment-package delivery',
      tooltip: 'Receive your aligners packaged sequentially to ensure optimal tracking and compliance.'
    },
    {
      text: 'Free retainers included',
      tooltip: 'Maintain your newly aligned smile after treatment completion at no added expense.'
    }
  ]
};

export const HOW_IT_WORKS_STEPS: StepItem[] = [
  {
    stepNumber: 1,
    title: 'Request a scan',
    description:
      'Book your digital intraoral 3D scan at home or visit an authorised Alignaa partner centre. A high-resolution 3D digital model of your teeth is captured in minutes.',
    iconPath: '/assets/step-scan.png',
    operationalNote: 'Scan availability and locations confirmed during enquiry follow-up.'
  },
  {
    stepNumber: 2,
    title: 'Dental professional creates the plan',
    description:
      'A licensed doctor reviews your 3D digital scan, assesses eligibility, and calculates exact tooth movements to engineer your personalised treatment timeline.',
    iconPath: '/assets/step-plan.png'
  },
  {
    stepNumber: 3,
    title: 'Aligners are shipped',
    description:
      'Your custom series of Alignaa medical-grade aligners are manufactured with micrometer precision and shipped directly to your doorstep with clear instructions.',
    iconPath: '/assets/step-ship.png'
  },
  {
    stepNumber: 4,
    title: 'Your Alignaa journey begins',
    description:
      'Wear each set of aligners as prescribed, switch to new sets on schedule, and smile with renewed confidence. The Alignaa support team is with you at every step.',
    iconPath: '/assets/step-journey.png'
  }
];

export const TEETH_CONCERNS: TeethConcernItem[] = [
  {
    id: 'spacing',
    title: 'Spacing / Teeth Gaps',
    shortDescription: 'Visible spaces or gaps between teeth where food particles can collect.',
    educationalDetails:
      'Spacing occurs when there is excess space in the dental arch or when teeth are proportionally smaller. Alignaa aligners apply calibrated pressure to draw separated teeth closer together, helping create a balanced, continuous smile arc and reducing food impaction.',
    iconPath: '/assets/concern-spacing.png',
    suitableAlignerFit: 'Commonly addressed with mild to moderate clear aligner staging.'
  },
  {
    id: 'crowding',
    title: 'Crowding',
    shortDescription: 'Teeth overlap, twist, or push out of alignment due to insufficient jaw space.',
    educationalDetails:
      'Crowding occurs when there is not enough room in the jaw for all teeth to sit comfortably. Overcrowded teeth can be hard to brush and floss, increasing plaque buildup. Clear aligners sequentially widen or derotate teeth to distribute them evenly along the arch.',
    iconPath: '/assets/concern-crowding.png',
    suitableAlignerFit: 'Frequently corrected through doctor-planned sequential expansion and rotation.'
  },
  {
    id: 'forwardly-placed',
    title: 'Forwardly Placed Teeth',
    shortDescription: 'Front teeth project forward past normal arch position.',
    educationalDetails:
      'When front teeth protrude outward, they are more susceptible to accidental trauma and may impact lip posture. Controlled orthodontic forces from aligners help retract and upright protruding teeth to achieve harmonious facial aesthetics.',
    iconPath: '/assets/concern-forwardly-placed.png',
    suitableAlignerFit: 'Assessed for alignment staging by doctor evaluation during treatment planning.'
  },
  {
    id: 'crossbite',
    title: 'Crossbite',
    shortDescription: 'One or more upper teeth bite inside the lower teeth instead of outside.',
    educationalDetails:
      'In a healthy bite, upper teeth slightly overlap lower teeth on the outside. In a crossbite, some upper teeth sit inside lower teeth, which can cause uneven tooth wear or jaw discomfort. Aligners can assist in correcting dental crossbites.',
    iconPath: '/assets/concern-crossbite.png',
    suitableAlignerFit: 'Dental crossbites are assessed for clear aligner suitability by our clinical panel.'
  },
  {
    id: 'open-bite',
    title: 'Open Bite',
    shortDescription: 'Top and bottom front teeth do not touch when back teeth are closed.',
    educationalDetails:
      'An open bite leaves a vertical space between the biting surfaces of the front teeth when the back teeth chew together. This can make biting into certain foods challenging. Custom clear aligners work to guide teeth vertically to restore proper incisal contact.',
    iconPath: '/assets/concern-open-bite.png',
    suitableAlignerFit: 'Suitability depends on skeletal versus dental origin, verified via 3D scan.'
  },
  {
    id: 'deep-bite',
    title: 'Deep Bite',
    shortDescription: 'Upper front teeth overlap lower front teeth excessively on closing.',
    educationalDetails:
      'A deep bite occurs when the upper teeth cover an excessive portion of the lower teeth upon closure, sometimes irritating the roof of the mouth or accelerating front tooth wear. Clear aligners facilitate intrusion and leveling movements.',
    iconPath: '/assets/concern-deep-bite.png',
    suitableAlignerFit: 'Evaluated individually by licensed dentists based on root positioning.'
  }
];

export const SMILE_RESULTS: SmileResultCase[] = [
  {
    id: 'gap-closure',
    title: 'Diastema & Gap Closure',
    category: 'Gap Closure',
    duration: '8.5 months',
    alignerCount: 17,
    imageBeforeAfter: '/assets/case-gap-closure.jpg',
    patientNotes:
      'Patient experienced front incisor spacing. Custom Alignaa trays closed the midline gap in 17 steps.'
  },
  {
    id: 'forwardly-placed',
    title: 'Protrusion Correction',
    category: 'Forwardly Placed',
    duration: '10 months',
    alignerCount: 20,
    imageBeforeAfter: '/assets/case-forwardly-placed.jpg',
    patientNotes:
      'Upper anterior protrusion corrected over 20 aligner stages with doctor-guided retraction.'
  },
  {
    id: 'crowding',
    title: 'Lower & Upper Crowding',
    category: 'Crowding',
    duration: '8 months',
    alignerCount: 16,
    imageBeforeAfter: '/assets/case-crowding.jpg',
    patientNotes:
      'Moderate anterior crowding resolved through gentle arch de-rotation over 16 aligner stages.'
  }
];

export const WHY_ALIGNAA_BENEFITS: BenefitItem[] = [
  {
    id: 'doctor-planned',
    title: 'Licensed Doctor Oversight',
    description:
      'No DIY guesswork. Your scan and tooth movements are planned and supervised by qualified orthodontic and dental professionals.',
    iconName: 'ShieldCheck'
  },
  {
    id: 'precision-fit',
    title: 'Laser-Trimmed Comfort',
    description:
      'Scalloped along your natural gumline for snug, unnoticeable wear. Smooth edges prevent mouth abrasions and irritation.',
    iconName: 'Smile'
  },
  {
    id: 'at-home-convenience',
    title: 'Home & Centre Scan Access',
    description:
      'Choose between an assisted at-home 3D digital scan or visit an authorised partner dental centre at your convenience.',
    iconName: 'MapPin'
  },
  {
    id: 'transparent-pricing',
    title: 'Clear Pricing Baseline',
    description:
      'Starting at ₹39,999 with 3D scan coordination, custom doctor plan, shipping, and retainers bundled without hidden fees.',
    iconName: 'Sparkles'
  },
  {
    id: 'dedicated-support',
    title: 'Personal Support Team',
    description:
      'Have questions during treatment? The Alignaa patient care team is a message or call away to assist with tracking and logistics.',
    iconName: 'HeartHandshake'
  },
  {
    id: 'free-retainers',
    title: 'Retainers Included Free',
    description:
      'Keep your dream smile locked in place. Custom retainers are included at the conclusion of your treatment cycle.',
    iconName: 'CheckCircle'
  }
];

// Confirmed baseline vs future illustrative plans
export const PRICING_CONFIG = {
  baselineStartingPrice: '₹39,999',
  baselineTitle: 'Alignaa Aligner Treatment',
  baselineInclusions: [
    'At-home or partner centre 3D digital scan',
    'Custom treatment plan by licensed dental professional',
    'Doorstep aligner shipping in discreet packaging',
    'Full or phased sequential tray delivery',
    'Complimentary post-treatment retainers',
    'Dedicated patient support coordination'
  ],
  // Retained internally for future product tiers (NOT displayed as active launch pricing)
  futureIllustrativeTiers: [
    {
      id: 'lite',
      name: 'ALIGNAA Lite',
      range: '₹24,999 – ₹29,999',
      scope: 'Minor crowding or spacing and limited relapse cases (defined tray count).'
    },
    {
      id: 'essential',
      name: 'ALIGNAA Essential',
      range: '₹34,999 – ₹44,999',
      scope: 'Mild to moderate cases; broader plan with defined refinement allowance.'
    },
    {
      id: 'complete',
      name: 'ALIGNAA Complete',
      range: '₹49,999 – ₹64,999',
      scope: 'Comprehensive cases requiring extensive movement and broader refinement provision.'
    }
  ]
};

// Illustrative comparison data (clearly labeled for preview mode)
export const COMPARISON_ROWS: ComparisonRow[] = [
  {
    feature: 'Doctor-Prescribed Treatment Plan',
    alignaa: 'Yes (Licensed Dental Professionals)',
    traditionalBraces: 'Yes (In-Clinic)',
    otherAligners: 'Varies / Often Remote-Only',
    highlight: true
  },
  {
    feature: 'Initial 3D Scan Experience',
    alignaa: 'Home or Centre Scan Option',
    traditionalBraces: 'Messy Putty Impressions in Clinic',
    otherAligners: 'Self-Serve Putty Mail Kits'
  },
  {
    feature: 'Aesthetic Invisibility',
    alignaa: 'Crystal-Clear Medical Polymer',
    traditionalBraces: 'Visible Metal Wires & Brackets',
    otherAligners: 'Translucent Trays'
  },
  {
    feature: 'Removable for Eating & Brushing',
    alignaa: 'Yes (Remove freely anytime)',
    traditionalBraces: 'No (Fixed to teeth)',
    otherAligners: 'Yes'
  },
  {
    feature: 'Dietary Restrictions',
    alignaa: 'None (Remove aligner to eat)',
    traditionalBraces: 'Strict (No hard, sticky, or chewy foods)',
    otherAligners: 'None'
  },
  {
    feature: 'Post-Treatment Retainers Included',
    alignaa: 'Yes (Free retainers included)',
    traditionalBraces: 'Typically ₹5,000–₹12,000 Extra',
    otherAligners: 'Often Sold Separately'
  },
  {
    feature: 'Price Transparency',
    alignaa: 'Starting at ₹39,999 (Clear inclusions)',
    traditionalBraces: '₹45,000 to ₹85,000+ varying widely',
    otherAligners: '₹55,000 to ₹1,50,000+'
  }
];

// Sample reviews clearly marked for review
export const SAMPLE_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Pooja S.',
    location: 'Mumbai',
    rating: 5,
    treatment: 'Gap Closure (8 Months)',
    reviewText:
      'The entire process from the home scan to receiving my trays was so smooth. Having a doctor monitor my plan gave me complete peace of mind, and the aligners were truly invisible!',
    isVerifiedReal: false
  },
  {
    id: 'rev-2',
    author: 'Rohan M.',
    location: 'Pune',
    rating: 5,
    treatment: 'Crowding Correction (9 Months)',
    reviewText:
      'I was hesitant about metal braces as a working professional. Alignaa allowed me to fix my overlapping teeth without feeling self-conscious in meetings. Highly recommended!',
    isVerifiedReal: false
  },
  {
    id: 'rev-3',
    author: 'Ananya D.',
    location: 'Bengaluru',
    rating: 5,
    treatment: 'Forward Teeth Alignment (10 Months)',
    reviewText:
      'Customer support was very responsive whenever I had questions about wearing my aligners. The retainers at the end made the whole package great value.',
    isVerifiedReal: false
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'Basics',
    question: 'What are Alignaa clear aligners and how do they work?',
    answer:
      'Alignaa clear aligners are custom-made, transparent plastic trays molded to fit your teeth snugly. They apply gentle, consistent micro-forces to move teeth incrementally into their prescribed positions. You switch to a new set in the series periodically as your teeth gradually align.'
  },
  {
    id: 'faq-2',
    category: 'Assessment',
    question: 'How does the initial assessment and 3D scan work?',
    answer:
      'After you submit an enquiry, our team coordinates your digital 3D intraoral scan. An optical scanner captures thousands of pictures to create a 3D digital model of your teeth in minutes without uncomfortable impression putty. A licensed doctor then examines the scan to confirm treatment suitability.'
  },
  {
    id: 'faq-3',
    category: 'Pricing',
    question: 'What is included in the ₹39,999 starting price?',
    answer:
      'The starting price includes 3D scan coordination, custom orthodontic treatment design prescribed by a licensed doctor, free doorstep shipping, your sequence of custom aligner trays, and complimentary post-treatment retainers. No hidden clinic add-ons.'
  },
  {
    id: 'faq-4',
    category: 'Payment',
    question: 'Are EMI payment options available?',
    answer:
      'Yes, affordable EMI options are available through partner financing providers. Our care coordinator will discuss available tenure plans and terms based on your eligibility when they contact you.'
  },
  {
    id: 'faq-5',
    category: 'Treatment',
    question: 'How long does clear aligner treatment take?',
    answer:
      'Treatment duration depends on the complexity of your teeth alignment. Most mild to moderate cases take between 6 and 12 months. Your personalised 3D digital treatment simulation will show your exact estimated timeline before you commence.'
  },
  {
    id: 'faq-6',
    category: 'Care',
    question: 'How many hours a day do I need to wear my aligners?',
    answer:
      'For optimal results, aligners should be worn 20 to 22 hours per day. You only remove them when eating, drinking hot or colored beverages, and brushing or flossing your teeth.'
  },
  {
    id: 'faq-7',
    category: 'Retainers',
    question: 'Are retainers really included for free?',
    answer:
      'Yes. Protecting your newly straight smile is essential. Alignaa includes post-treatment retainers in your package at no extra charge to keep your teeth stably in their final positions.'
  },
  {
    id: 'faq-8',
    category: 'Support',
    question: 'How do I contact Alignaa if I have questions?',
    answer:
      'You can submit an enquiry right on this website, and our patient support team will reach out directly. You can also email us at partner@alignaa.in or reach out via our Instagram channel @alignaa_india.'
  }
];

export const PARTNER_CONTENT = {
  eyebrow: 'For Dental Professionals & Clinic Owners',
  headline: 'Partner with Alignaa to Expand Your Practice',
  subheading:
    'Join our network of forward-thinking dental clinics. Offer high-precision, doctor-directed clear aligners to your patients with cutting-edge digital planning and direct laboratory support.',
  parentSiteCta: 'Visit the Alignaa professional website',
  parentSiteUrl: 'https://alignaa.in/',
  benefits: [
    {
      title: 'Doctor-Controlled Treatment Plans',
      description: 'You retain full clinical oversight and approval on all staging, attachments, and interproximal reduction (IPR).'
    },
    {
      title: 'Advanced Digital Orthodontic Lab',
      description: 'Manufactured with high-clarity multilayer polymers ensuring consistent force delivery and predictable patient outcomes.'
    },
    {
      title: 'Competitive Laboratory Pricing',
      description: 'Attractive commercial terms designed to make high-quality aligners profitable for your practice and affordable for patients.'
    },
    {
      title: 'Dedicated Clinical & Logistics Support',
      description: 'Fast turnaround times, priority digital support, and marketing assistance to help educate your patient base.'
    }
  ]
};

export const AGE_GROUPS = [
  'Under 18',
  '18–24',
  '25–34',
  '35–44',
  '45 and above'
];

export const TEETH_CONCERN_OPTIONS = [
  'Spacing / Gaps',
  'Crowding',
  'Forwardly placed teeth',
  'Crossbite',
  'Open bite',
  'Deep bite',
  'Not sure',
  'General enquiry'
];

