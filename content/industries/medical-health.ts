/**
 * Healthcare Accounting Services (`/industries/medical-health`, live slug kept).
 *
 * Source (updated 2026-10-25): the newer Figma design
 * `../pages/industry/healthcare-accounting-services.svg`, on the real-estate page's components
 * as they are (same template, same section order, no extra blocks). It replaces the older
 * `../pages svg, css & png/healthcare-accounting-services (3)/page.svg`; the copy is unchanged,
 * the only difference is that the Security & Data Protection section was removed. The
 * design's "Show more services (3)" button is not used: the real-estate page has no such
 * component. Editable in Studio → Industry Pages (`industryPage-medical-health`); this file is
 * the fallback and the seed source (scripts/seed-industry-sanity.ts).
 *
 * Every deviation from the drawn copy is marked `COPY FIX`; text that is not in the design at
 * all is marked `NOT IN DESIGN` and needs client confirmation.
 */
import { home } from "@/content/home";
import type { IndustryPageContent } from "@/content/industries/types";
import { SCHEDULE_HREF, type RichText } from "@/content/types";
import { routes } from "@/lib/routes";

/** The page has no contact section, so CTAs open the Calendly popup (client rule). */
const schedule = (label: string) => ({ label, href: SCHEDULE_HREF });

export const medicalHealth: IndustryPageContent = {
  slug: "medical-health",
  name: "Healthcare Accounting Services",

  seo: {
    // NOT IN DESIGN (the design has no SEO fields). Rendered as "<title> | Xconcile".
    title: "Outsourced Healthcare Accounting Services",
    description:
      "Outsourced healthcare accounting: bookkeeping, reconciliations, month-end close and financial reporting for medical, dental and therapy practices and clinics.",
    // Meta keywords (fallback; Sanity SEO → Meta keywords wins when filled).
    keywords: [
      "healthcare accounting services",
      "outsourced healthcare bookkeeping",
      "medical practice accounting",
      "dental practice bookkeeping",
      "healthcare accounting for CPA firms",
      "clinic accounting services",
      "month-end close for healthcare",
      "healthcare financial reporting",
    ],
  },

  hero: {
    badge: "Healthcare Accounting Support",
    title: "Outsourced Accounting Services for Healthcare",
    subtitle:
      "We provide specialized outsourced accounting services for healthcare businesses, helping providers manage bookkeeping, reporting, and day-to-day financial operations.",
    // Labels as drawn (the older design's CSS export still says "Get in Touch" on both buttons).
    primaryCta: { label: "Talk to an expert", href: routes.contact() },
    // Same rule as "Explore our services": scrolls to this page's services grid.
    secondaryCta: { label: "Explore Our Expertise", href: "#expertise" },
    checks: [
      { label: "Healthcare Experience" },
      { label: "Flexible Engagements" },
      { label: "U.S. Business Focus" },
    ],
  },

  features: {
    label: "Why work with Xconcile",
    items: [
      {
        icon: "person_check",
        title: "Healthcare Expertise",
        body: "Specialized healthcare accounting.",
      },
      { icon: "cached", title: "Flexible Support", body: "Support that fits your needs." },
      { icon: "settings", title: "Existing Workflows", body: "Fits your existing systems." },
      { icon: "lock", title: "Secure Data Handling", body: "Protecting your financial data." },
    ],
  },

  intro: {
    title: "Accounting Experts for Healthcare Businesses",
    // The design has three paragraphs; the intro block has two, so the first two are joined.
    body: [
      // COPY FIX: drawn as "keeping financial records kept organized and current ."
      "Healthcare businesses have unique accounting needs, from managing daily transactions and expenses to keeping financial records organized and current. Xconcile provides ",
      {
        text: "outsourced accounting",
        href: routes.service("outsourced-accounting-and-bookkeeping"),
      },
      " solutions for healthcare businesses in the U.S., helping healthcare businesses and CPA firms manage bookkeeping, reconciliations, financial reporting, and ongoing accounting work within their existing workflows.",
    ] satisfies RichText,
    bodyMore: [
      // COPY FIX: closing period added.
      "Whether you operate a medical practice, dental practice, clinic, or other healthcare organization, our team provides consistent accounting support to help keep your financial operations organized.",
    ],
    bodyMoreLayout: "paragraph",
    image: {
      src: "/images/industries/healthcare-intro.jpg",
      alt: "Accountants reviewing financial charts with a calculator, tablet and laptop",
      width: 1500,
      height: 1000,
    },
    checks: ["Dedicated Resources", "US Accounting Experience", "Flexible Support"],
    checksStyle: "list",
    cta: { label: "Hire Accounting Staff", href: routes.contact() },
  },

  challenges: {
    badge: "Key Challenges",
    title: "Common Accounting Challenges in Healthcare",
    body: "Healthcare businesses often manage complex financial activity while their teams focus on patients, employees, and day-to-day operations.",
    cta: { label: "Let's Discuss Project", href: routes.contact() }, // COPY FIX: drawn as "Lets"
    items: [
      {
        tone: "white",
        icon: "monitoring",
        title: "Growing Accounting Workload",
        body: [
          "As your healthcare business grows, recurring accounting tasks can take more time away from your core operations.",
        ],
      },
      {
        tone: "white",
        icon: "assignment",
        title: "Inconsistent Financial Records",
        body: [
          "Disorganized transactions and delayed reconciliations can make financial reporting harder to manage.",
        ],
      },
      {
        tone: "white",
        icon: "home",
        title: "Limited Internal Accounting Capacity",
        body: [
          "Small and growing healthcare businesses may not need a full in-house accounting department.",
        ],
      },
      {
        tone: "white",
        icon: "9k_plus",
        title: "Month-End Pressure",
        body: [
          "Closing and reporting can become difficult when accounting tasks accumulate throughout the month.",
        ],
      },
    ],
  },

  services: {
    id: "expertise",
    badge: "Expertise",
    // As drawn: no green highlight in this heading (the real-estate design greens "Real Estate").
    title: "Healthcare Accounting Services",
    subtitle:
      "We provide flexible accounting support for healthcare businesses based on the scope and complexity of your operations.",
    // Eight tiles with their own glyphs and lines, as drawn (the dark 3-column grid of the
    // real-estate page shows them as 3 + 3 + 2).
    items: [
      {
        icon: "book_4",
        title: "Bookkeeping Services",
        body: "Maintain organized financial records and record transactions accurately.",
      },
      {
        icon: "assured_workload",
        title: "Bank & Credit Card Reconciliation",
        body: "Reconcile accounts and review financial records regularly.",
      },
      {
        icon: "payments",
        title: "Accounts Payable Support",
        body: "Help organize bills, vendor transactions, and payment records.",
      },
      {
        icon: "sync_alt",
        title: "Accounts Receivable Support",
        body: "Maintain organized receivable records and help track outstanding balances.",
      },
      {
        icon: "event_available",
        title: "Month-End Close Support",
        body: "Support a consistent month-end accounting process so your financial records stay current.",
      },
      {
        icon: "add_chart",
        title: "Financial Reporting",
        body: "Receive organized financial reports that give you a clearer view of business performance.",
      },
      {
        icon: "article",
        title: "General Ledger Management",
        body: "Maintain accurate account classifications and organized general ledger records.",
      },
      {
        icon: "mop",
        title: "Accounting Cleanup",
        body: "Bring disorganized or outdated books up to date and establish a more consistent accounting process.",
      },
    ],
  },

  subIndustries: {
    badge: "Sub-Industries",
    title: "Types of Healthcare Businesses We Support",
    // COPY FIX: drawn with a trailing comma (the Home services line, reused as a placeholder).
    subtitle:
      "From everyday bookkeeping to strategic financial planning, our outsourced accounting services help businesses maintain accurate financial records.",
    // Rows 1–5 are drawn (titles, focus lines, icons); the design hides 6–8 behind
    // "Show more services (3)", which the real-estate component doesn't have, so all eight rows
    // show. Titles, focus lines and accordion details: docs/content/industries/medical-health.md
    // ("Sub-Industries We Serve"), bold markers dropped.
    items: [
      {
        icon: "medical_services",
        title: "General & Specialized Medical Practices",
        body: "Revenue Cycle Management and Insurance Reconciliation",
        groups: [
          {
            title: "Bookkeeping",
            items: [
              "Monthly bank and credit card reconciliations",
              "Recording insurance payments (ERA/EOB) and patient co-pays",
              "Managing vendor payables for lab services and medical supplies",
              "Tracking multiple revenue streams (insurance, patient payments, procedures)",
            ],
          },
          {
            title: "Accounting",
            items: [
              "Monthly Profit & Loss statements by location or department",
              "Revenue Cycle Management (RCM) oversight tracking denied claims and aging A/R",
              "Cash flow forecasting to manage insurance payment lag",
              "Accrual accounting for services rendered but not yet billed",
            ],
          },
          {
            title: "Payroll",
            items: [
              "Managing base salaries for clinicians and support staff",
              "Processing Physician Compensation based on RVUs (Relative Value Units) or net collections",
              "Handling multi-state payroll for group practices with multiple locations",
              "Managing complex benefit structures (health insurance, malpractice, CME allowances)",
            ],
          },
          {
            title: "Tax Preparation",
            items: [
              "Form 1040 / 1120-S preparation for physician-owned practices",
              "Section 179 deductions for medical imaging or surgical equipment",
              "Tracking CME (Continuing Medical Education) and professional dues",
              "Managing S-Corp distributions and reasonable compensation",
            ],
          },
          {
            title: "Software Stack",
            items: [
              "QuickBooks Online / Sage Intacct (Accounting)",
              "AdvancedMD / Athenahealth / Kareo (Practice Management/Billing)",
              "Gusto / ADP (Payroll)",
              "Bill.com (AP Automation)",
            ],
          },
        ],
      },
      {
        icon: "dentistry",
        title: "Dental & Orthodontic Clinics",
        body: "Treatment Plan Tracking and Lab Invoice Management",
        groups: [
          {
            title: "Bookkeeping",
            items: [
              "Tracking high-volume dental lab invoices",
              "Reconciling daily patient payments (insurance + patient portions)",
              "Managing merchant fees from various financing options (CareCredit, LendingClub)",
              "Recording treatment plan deposits and scheduling payments",
            ],
          },
          {
            title: "Accounting",
            items: [
              "Treatment plan profitability analysis (Crowns vs. Fillings vs. Implants)",
              "Tracking Case Fee liabilities for long-term orthodontic contracts",
              "Managing deferred revenue for pre-paid treatment plans",
              "Production vs. collection analysis",
            ],
          },
          {
            title: "Payroll",
            items: [
              "Incentive-based pay for hygienists (production bonuses)",
              "Handling multi-state payroll for group practices",
              "Processing commission structures for treatment coordinators",
            ],
          },
          {
            title: "Tax Preparation",
            items: [
              "Specialized depreciation for dental chairs and X-ray units",
              "State-specific dental tax compliance",
              "Managing equipment leases vs. purchases (Section 179 vs. bonus depreciation)",
            ],
          },
          {
            title: "Software Stack",
            items: [
              "Dentrix / Open Dental / Eaglesoft (Practice Management)",
              "QuickBooks Online (Accounting)",
              "Paychex / Gusto (Payroll)",
            ],
          },
        ],
      },
      {
        icon: "import_contacts",
        title: "Mental Health & Behavioral Therapy",
        body: "Session-Based Billing and OON Reimbursements",
        groups: [
          {
            title: "Bookkeeping",
            items: [
              "Managing session-based billing and scheduling integration",
              "Recording out-of-network (OON) reimbursements from insurance",
              "Tracking telehealth software subscriptions (Zoom, Doxy.me)",
              "Managing sliding-scale fee structures",
            ],
          },
          {
            title: "Accounting",
            items: [
              'Monitoring "No-show" costs and utilization rates',
              "Tracking therapist productivity and session capacity",
              "Managing grant-funded programs for non-profit mental health centers",
            ],
          },
          {
            title: "Payroll",
            items: [
              "Flexible pay cycles for per-session contractors (1099) and salaried clinicians (W-2)",
              "Managing supervision stipends for licensed supervisors",
              "Handling CEU (Continuing Education Unit) reimbursements",
            ],
          },
          {
            title: "Tax Preparation",
            items: [
              "Home office deductions for telehealth providers",
              "Managing self-employment tax for solo practitioners",
              "Tracking professional liability insurance deductions",
            ],
          },
          {
            title: "Software Stack",
            items: [
              "SimplePractice / TherapyNotes / TheraNest (Practice Management)",
              "FreshBooks / Xero (Accounting)",
              "Gusto (Payroll)",
            ],
          },
        ],
      },
      {
        icon: "cognition",
        title: "Physical Therapy & Chiropractic Centers",
        body: "Visit Authorization Tracking and DME Sales",
        groups: [
          {
            title: "Bookkeeping",
            items: [
              "Reconciling high-frequency patient visits",
              "Tracking durable medical equipment (DME) sales (braces, pillows, supplements)",
              "Managing insurance authorization tracking",
              "Recording copays and deductibles",
            ],
          },
          {
            title: "Accounting",
            items: [
              "Calculating Revenue Per Visit benchmarks",
              "Tracking authorized visits remaining per patient",
              "Managing inventory for retail DME products",
              "Workers' comp billing reconciliation",
            ],
          },
          {
            title: "Payroll",
            items: [
              "Performance bonuses based on patient retention and volume",
              "Managing multi-location therapist scheduling",
              "Processing per-diem rates for contract therapists",
            ],
          },
          {
            title: "Tax Preparation",
            items: [
              "Depreciation of therapeutic equipment (ultrasound, laser therapy)",
              "Tracking massage therapy vs. clinical adjustments for sales tax purposes",
              "Managing retail sales tax on DME products",
            ],
          },
          {
            title: "Software Stack",
            items: [
              "WebPT / Jane App / Clinicient (Practice Management)",
              "Xero / QuickBooks Online (Accounting)",
              "Staffology / Gusto (Payroll)",
            ],
          },
        ],
      },
      {
        icon: "dermatology",
        title: "Dermatology & Medical Spas",
        body: "Dual-Entity Accounting (Medical vs. Retail/Wellness)",
        groups: [
          {
            title: "Bookkeeping",
            items: [
              "Complex retail inventory reconciliation (skincare products)",
              "Recording gift card sales vs. redemptions",
              "Managing consignment inventory for injectables (Botox, fillers)",
              // COPY FIX: doc has "member ship".
              "Tracking membership programs and package sales",
            ],
          },
          {
            title: "Accounting",
            items: [
              "Sales Tax Nexus tracking for cosmetic services vs. medical services",
              "Tracking high-margin cosmetic injection costs (COGS analysis)",
              "Managing revenue recognition for package deals and memberships",
              "Inventory valuation for skincare retail",
            ],
          },
          {
            title: "Payroll",
            items: [
              "Commission calculations for estheticians and injectors",
              "Tracking tips for service staff",
              "Managing medical vs. spa staff payroll allocation",
            ],
          },
          {
            title: "Tax Preparation",
            items: [
              'Managing "Dual-Entity" structures (Medical PC vs. Retail/Wellness LLC)',
              "Retail sales tax filings for product sales",
              "Nexus considerations for multi-state operations",
              "Equipment depreciation for laser systems",
            ],
          },
          {
            title: "Software Stack",
            items: [
              "Zenoti / Boulevard / Vagaro (Spa Management)",
              "QuickBooks Online (Accounting)",
              "Gusto / ADP (Payroll)",
              "Avalara (Sales Tax)",
            ],
          },
        ],
      },
      {
        // NOT IN DESIGN: rows 6–8 are hidden in the design, so their icons are not drawn.
        icon: "monitor_heart",
        title: "Outpatient & Diagnostic Centers",
        body: "Capital Equipment Tracking and Multi-Departmental Allocation",
        groups: [
          {
            title: "Bookkeeping",
            items: [
              "High-volume vendor management for reagents and diagnostic kits",
              "Reconciling global vs. technical billing components",
              "Managing multiple payer contracts and fee schedules",
            ],
          },
          {
            title: "Accounting",
            items: [
              "Capital expenditure (CapEx) tracking for MRI/CT machines",
              "Inter-departmental cost allocation (radiology, lab, cardiology)",
              "Managing equipment leases and service contracts",
            ],
          },
          {
            title: "Payroll",
            items: [
              "Managing 24/7 staffing shifts and on-call stipends",
              "Tracking radiologist and pathologist reading fees",
              "Processing shift differentials for overnight staff",
            ],
          },
          {
            title: "Tax Preparation",
            items: [
              "Multi-state nexus if diagnostic results cross state lines",
              "Complex tax structures for imaging partnerships",
              "Section 179 and bonus depreciation for medical equipment",
            ],
          },
          {
            title: "Software Stack",
            items: [
              "Medikamart / Epic / Cerner (Practice Management/LIMS)",
              "Sage Intacct / NetSuite (Accounting)",
              "ADP Comprehensive (Payroll)",
            ],
          },
        ],
      },
      {
        icon: "clean_hands",
        title: "Home Healthcare Services",
        body: "Mileage Tracking and Medicaid/Medicare Billing",
        groups: [
          {
            title: "Bookkeeping",
            items: [
              "Managing travel and mileage reimbursements for field staff",
              "Reconciling Medicaid/Medicare daily billing cycles",
              "Tracking EVV (Electronic Visit Verification) integration",
            ],
          },
          {
            title: "Accounting",
            items: [
              "Cost-per-visit analysis by service type",
              "Managing grant-funded programs and restricted funds",
              "Tracking nurse and aide utilization rates",
            ],
          },
          {
            title: "Payroll",
            items: [
              "GPS-verified timekeeping integration for field staff",
              "Complex overtime for 24-hour live-in caregivers",
              "Managing weekend and holiday premium pay",
            ],
          },
          {
            title: "Tax Preparation",
            items: [
              "Tracking FICA exemptions for certain family caregivers",
              "Managing state-specific caregiver tax credits",
              "Handling 1099 vs. W-2 classification for caregivers",
            ],
          },
          {
            title: "Software Stack",
            items: [
              "AlayaCare / Homecare Homebase / ClearCare (Home Health Management)",
              "QuickBooks Online (Accounting)",
              "Paycor / ADP (Payroll)",
            ],
          },
        ],
      },
      {
        icon: "pill",
        title: "Pharmacy & Medical Supplies",
        body: "Inventory Valuation and PBM Reconciliations",
        groups: [
          {
            title: "Bookkeeping",
            items: [
              "Batch and expiry-date inventory tracking",
              "Reconciling PBM (Pharmacy Benefit Manager) clawbacks and reimbursements",
              "Managing DIR fees and pharmacy network reconciliations",
            ],
          },
          {
            title: "Accounting",
            items: [
              "Cost of Goods Sold (COGS) optimization with FIFO/LIFO",
              "Tracking high-value inventory turnover rates",
              "Managing 340B drug pricing program compliance",
            ],
          },
          {
            title: "Payroll",
            items: [
              "Managing pharmacist licensing stipends",
              "Hourly technician shift management",
              "Handling on-call pharmacist compensation",
            ],
          },
          {
            title: "Tax Preparation",
            items: [
              "Section 471 inventory valuation methods",
              "340B drug pricing program compliance and reporting",
              "Managing controlled substance inventory for DEA compliance",
            ],
          },
          {
            title: "Software Stack",
            items: [
              "PioneerRx / Liberty / QS/1 (Pharmacy Operations)",
              "NetSuite / TallyPrime (Accounting/Inventory)",
              "ADP / Paychex (Payroll)",
            ],
          },
        ],
      },
    ],
  },

  whyChoose: {
    badge: "Why Choose Us",
    // COPY FIX: drawn as "…Choose Conxicle for Accounting Support" (brand typo).
    title: "Why Healthcare Businesses Choose Xconcile for Accounting Support",
    subtitle:
      "Build a stronger accounting function with experienced professionals who understand U.S. business requirements, accounting workflows, and day-to-day financial operations.",
    features: [
      {
        icon: "deployed_code_account",
        title: "Experienced Professionals",
        body: "Skilled professionals for bookkeeping and financial reporting.",
      },
      {
        icon: "beenhere",
        title: "U.S. Accounting Expertise",
        body: "Support aligned with U.S. accounting practices and workflows.",
      },
      {
        icon: "article",
        title: "Financial Records",
        body: "Keep financial records accurate, organized, and up to date.",
      },
      {
        icon: "page_info",
        title: "Flexible Support",
        body: "Choose support that fits your accounting needs and workload.",
      },
      {
        icon: "add_chart",
        title: "Scalable Capacity",
        body: "Add accounting capacity as your business needs continue to grow.",
      },
    ],
    // Same four photos as Home (identical assets in the design).
    images: home.whyChoose.images,
    stats: [
      { value: "10+", label: "Accounting Experience" },
      { value: "1K+", label: "Businesses Supported" },
      { value: "50+", label: "Accounting Professionals" },
      { value: "98%", label: "Reconciliation Accuracy" },
    ],
  },

  // Security & Data Protection: no longer drawn (the newer design removed it; the real-estate
  // page has had no security section since the 2026-10-18 user request).

  faq: {
    badge: "FAQ",
    title: "Frequently asked questions",
    intro: "Find answers to common healthcare accounting questions.",
    // NOT IN DESIGN: the design draws the questions collapsed, without answers. Each answer only
    // restates claims made elsewhere in this design, except the security answer, whose claims
    // come from the older design's security cards (that section is no longer drawn); confirm.
    items: [
      {
        q: "What is healthcare accounting?",
        a: [
          "Healthcare accounting covers the bookkeeping, reconciliations, month-end close, and financial reporting that medical, dental, therapy, and other healthcare businesses need to keep their financial records organized and current.",
        ],
      },
      {
        q: "What types of healthcare businesses does Xconcile support?",
        a: [
          "We support medical and specialized practices, dental and orthodontic clinics, mental health and behavioral therapy providers, physical therapy and chiropractic centers, dermatology and medical spas, outpatient and diagnostic centers, home healthcare services, and pharmacies and medical suppliers.",
        ],
      },
      {
        q: "Can Xconcile handle bookkeeping for my healthcare business?",
        a: [
          "Yes. Our team records transactions, reconciles bank and credit card accounts, supports accounts payable and receivable, and maintains your general ledger, all within your existing systems and workflows.",
        ],
      },
      {
        q: "Why should a healthcare business outsource accounting?",
        a: [
          "Outsourcing gives you consistent accounting support without building a full in-house accounting department. It keeps recurring tasks off your team's plate, helps avoid month-end pressure, and scales as your healthcare business grows.",
        ],
      },
      {
        q: "Is my healthcare business's financial information secure?",
        a: [
          "Yes. An NDA is signed before any data access, only assigned team members can access your files, data is transferred with controlled access, and your financial data is never sold or shared with outside parties.",
        ],
      },
      {
        q: "Can Xconcile help with healthcare business accounting cleanup?",
        a: [
          "Yes. We bring disorganized or outdated books up to date and help establish a more consistent accounting process going forward.",
        ],
      },
      {
        q: "How can I get started with Xconcile's healthcare accounting services?",
        a: [
          "Schedule a call with our team. We'll review your accounting needs, systems, and workload, then recommend the support that fits your healthcare business.",
        ],
      },
    ],
  },

  ctaBand: {
    title: "Need Reliable Accounting Support for Your Healthcare Business?",
    body: "Keep your financial records organized with flexible accounting support for bookkeeping, reconciliations, month-end close, and financial reporting.",
    cta: schedule("Schedule an Accounting Consultation"),
    // The design draws a flat teal band; the real-estate CTA band component uses a photo, so the
    // same handshake photo is kept (decorative).
    image: { src: "/images/services/cta-handshake.jpg", alt: "", width: 1500, height: 1000 },
  },
};
