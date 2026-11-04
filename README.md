# Alignaa D2C Patient-Facing Website (alignaa.co)

A static, high-performance patient-facing marketing and enquiry web application for **Alignaa** (`https://alignaa.co`), built with **React 19**, **TypeScript**, and **Vite 6**.

Alignaa patients explore clear-aligner treatment and submit a single, comprehensive enquiry. The Alignaa support team receives it via a configured hosted email endpoint and coordinates a 3D digital scan. Dentists and dental clinic owners have a dedicated partner enquiry route and a link to the parent brand website (`https://alignaa.in`).

---

## 1. Quick Start

### Prerequisites
- Node.js (v18+ recommended, tested on Node v26)
- npm (v9+)

### Installation & Local Development
```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Run production build
npm run build

# Run local preview of the production build
npm run preview

# Run automated browser verification suite
npm run test:e2e
```

---

## 2. Project Architecture & File Map

```
alignaa.co/
├── public/
│   ├── assets/                      # Production media assets
│   │   ├── logo-alignaa.png         # Official Alignaa logo
│   │   ├── alignaa-hero-video.mp4   # SmileSet-style muted autoplay loop
│   │   ├── alignaa-hero-poster.jpg  # Video fallback poster
│   │   ├── alignaa-box.png          # Product kit box image
│   │   ├── aligner-product.jpg      # Product tray photography
│   │   ├── case-*.jpg               # Real clinical case study results
│   │   ├── concern-*.png            # 6 illustrated teeth concern graphics
│   │   └── step-*.png               # 4 circular process step icons
│   ├── favicon.ico
│   ├── alignaa-favicon.png
│   ├── robots.txt                   # Search crawler directives (pre-launch safe)
│   ├── sitemap.xml                  # Canonical sitemap for alignaa.co
│   ├── _redirects                   # SPA routing for static hosts (Netlify/Cloudflare)
│   └── vercel.json                  # SPA routing rewrite for Vercel
├── src/
│   ├── config/
│   │   ├── siteContent.ts           # Centralised, editable content store
│   │   └── contentPendingRegister.ts # Status of pending client sign-offs
│   ├── services/
│   │   └── formSubmission.ts        # Modular form delivery adapter (honest mode)
│   ├── types/
│   │   └── index.ts                 # TypeScript types and interfaces
│   ├── components/
│   │   ├── Header.tsx               # Navigation, mobile drawer & Request a Scan CTA
│   │   ├── Footer.tsx               # Medical footer, partner link & policies
│   │   ├── HeroVideo.tsx            # Autoplay looping hero video with controls
│   │   ├── TreatmentOverview.tsx    # Clear aligner overview and 3 pillars
│   │   ├── TreatmentOffer.tsx       # Starting at ₹39,999 + tick inclusion list
│   │   ├── HowItWorks.tsx           # 4-step circular timeline
│   │   ├── TeethConcerns.tsx        # 6 concern cards + accessible Learn More modal
│   │   ├── RealSmilesResults.tsx    # Before/After cases with category filters
│   │   ├── WhyAlignaa.tsx           # Benefit grid
│   │   ├── PricingComparison.tsx    # Baseline summary + comparison table
│   │   ├── Reviews.tsx              # Patient testimonials with preview badge
│   │   ├── FaqAccordion.tsx         # Accessible accordion for 8 topics
│   │   ├── PatientEnquiryForm.tsx   # Single patient form with validation
│   │   ├── PartnerInvitation.tsx    # Homepage callout linking to partner page
│   │   └── DesignOptionSwitcher.tsx # Interactive layout switcher for reviewers
│   ├── pages/
│   │   ├── HomePage.tsx             # Homepage orchestrating 3 design layouts
│   │   ├── PartnerPage.tsx          # Doctor / clinic owner enquiry page
│   │   ├── PrivacyPolicyPage.tsx    # Privacy policy & data handling disclosure
│   │   ├── TermsPage.tsx            # Patient terms & medical disclaimer
│   │   └── NotFoundPage.tsx         # Accessible 404 page
│   ├── App.tsx                      # Root routing & layout state coordinator
│   ├── main.tsx                     # React application entry
│   └── index.css                    # Responsive CSS design system
├── .env.example                     # Environment variables template
├── test-verification.mjs            # Automated headless browser verification suite
├── tsconfig.json
├── vite.config.ts
└── package.json
```

---

## 3. Brand & Visual System Baseline

- **Primary Teal**: `#007B7F` (Buttons, active states, accents)
- **Dark Teal**: `#005A60` (Hover and focused states)
- **Main Text**: `#333333`
- **White Background**: `#FFFFFF`
- **Near-White Background**: `#FCFCFC`
- **Supporting Pale Teal**: `#EFF8F8`
- **Border Grey**: `#D9E3E3`
- **Headings Font**: `Montserrat`, sans-serif
- **Body & Forms Font**: `Open Sans`, sans-serif

---

## 4. How to Update Content & Media

All customer-facing text, prices, features, FAQs, and image paths are centralised in **`src/config/siteContent.ts`**. You do not need to hunt through component code to update details.

### Updating Pricing & Inclusions
Open `src/config/siteContent.ts`:
```ts
export const TREATMENT_OFFER = {
  startingPrice: '₹39,999', // Change baseline price here
  startingPriceLabel: 'Starting at',
  priceSuffix: '/-',
  emiNote: 'Affordable EMI options available on request...',
  inclusions: [
    { text: 'At-home or Alignaa centre scan facility', tooltip: '...' },
    // Add or modify inclusions here
  ]
};
```

### Future Illustrative Plans
In accordance with client instructions, later tiered plans (`ALIGNAA Lite`, `ALIGNAA Essential`, and `ALIGNAA Complete`) are defined in `PRICING_CONFIG.futureIllustrativeTiers` in `src/config/siteContent.ts` for future activation when authorized.

### Updating Media Files
Place media in `public/assets/` and update references in `src/config/siteContent.ts`:
- **Hero Video**: `public/assets/alignaa-hero-video.mp4`
- **Hero Video Poster**: `public/assets/alignaa-hero-poster.jpg`
- **Product Box**: `public/assets/alignaa-box.png`
- **Before/After Cases**: `public/assets/case-gap-closure.jpg`, `case-forwardly-placed.jpg`, `case-crowding.jpg`

---

## 5. Email Delivery Configuration

Both the **Patient Enquiry Form** and **Partner Enquiry Form** use the centralized adapter in `src/services/formSubmission.ts`.

### Setup Instructions
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Choose a hosted form service:
   - **Formspree**: Create a form at [formspree.io](https://formspree.io/) set to notify `support@alignaa.co`. Copy your endpoint URL (e.g., `https://formspree.io/f/mqkvywzy`).
   - **UseBasin / Getform**: Alternatively create a bucket/endpoint on any secure webhook provider.
3. Configure your `.env`:
   ```ini
   VITE_FORM_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID
   VITE_OWNER_INBOX=support@alignaa.co
   VITE_ENABLE_ILLUSTRATIVE_COMPARISON=true
   VITE_ENABLE_PRODUCTION_INDEXING=false
   ```
4. Restart your development server (`npm run dev`).

### Honest Delivery Mode (When Unconfigured)
If `VITE_FORM_ENDPOINT` is left empty or not set:
- Forms will validate all user inputs.
- Submissions will **never falsely pretend** an email was sent.
- An honest on-screen notice will appear: `"Email delivery is currently unconfigured. Set VITE_FORM_ENDPOINT in .env... Your entered details have been preserved."`
- The payload is logged to the browser console for testing.
- Entered form values are **preserved** so no user work is lost.

---

## 6. Content Pending Register & Approvals

The pending client inputs are documented in `src/config/contentPendingRegister.ts`:

| ID | Item | Current State | Required Client Action |
|---|---|---|---|
| **PEND-001** | Owner Email Inbox & Endpoint | Honest Preview Mode | Provide live Formspree/Basin endpoint URL & destination email |
| **PEND-002** | Financing / EMI Details | General mention ("Available on request") | Confirm lending partners, tenures, and monthly rupee amounts |
| **PEND-003** | Comparison Table Categories | Sample orthodontic comparison table | Confirm specific comparison columns or toggle off for production |
| **PEND-004** | High-Res Patient Photography | Case extracts from client PDF (324x405) | Provide camera-original high-resolution exports and patient consent |
| **PEND-005** | Real Patient Testimonials | 3 clearly marked sample preview cards | Supply verified patient quotes, city locations, and permissions |
| **PEND-006** | Hero Video Footage | Alignaa 3D intro MP4 loop with poster fallback | Confirm whether patient lifestyle footage will replace 3D loop |
| **PEND-007** | Official Contact Details | `partner@alignaa.in` & `@alignaa_india` | Supply registered office address, customer phone, and CIN |

---

## 7. Interactive Design Layout Switcher

In accordance with Section 10 of the brief ("Produce 2 to 3 comparable website design options"), an interactive top bar is available on the homepage:

- **Option A: Video First (Default)**: Wide hero video immediately below navigation, spacious offer with inclusion checklist, clean grids and visual timeline.
- **Option B: Clinical & Structured**: Puts the 4-step clinical process and real patient before/after results front and center.
- **Option C: Patient Story Led**: Starts with before/after transformations and patient reviews, followed by the treatment package and process.

Reviewers can also access layouts directly via URL:
- `https://alignaa.co/?layout=a`
- `https://alignaa.co/?layout=b`
- `https://alignaa.co/?layout=c`

---

## 8. Quality & Accessibility Features

- **Semantic HTML5**: Native `<header>`, `<main>`, `<article>`, `<section>`, `<nav>`, and `<footer>` elements.
- **ARIA Support**: All inputs labelled, `aria-required`, `aria-invalid`, `aria-describedby`, `aria-expanded`, and `aria-controls` on accordions.
- **Accessible Modals**: Traps focus inside educational modals, listens to Escape key to dismiss, and returns focus to the trigger button.
- **Visible Keyboard Focus**: Distinctive teal focus rings (`:focus-visible`).
- **Reduced Motion**: Automatically detects `prefers-reduced-motion: reduce` and halts video autoplay, disabling non-essential transitions.
- **No Unwanted Horizontal Scroll**: Tested across standard mobile (360px, 390px), tablet (768px), and desktop (1024px, 1440px) viewports.
- **Pre-Launch SEO Safety**: `robots.txt` set to `Disallow: /` and `<meta name="robots" content="noindex, nofollow" />` to prevent accidental indexing prior to client release.

