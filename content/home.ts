/**
 * Home page copy.
 * Sources (in priority order):
 *  1. docs/content/Home page (1).txt  → services accordion (7 items) + 8 FAQs
 *  2. ../pages svg, css & png/Home/page.svg (desktop, primary) and mobile-page.svg
 *  3. Live site / Sanity (testimonial video, social links)
 *
 * One DOM serves all breakpoints, so where desktop and mobile copy differ the desktop copy is
 * used, except where the desktop copy is a known error (report §4) and the mobile copy fixes it.
 * Every deviation from the drawn copy is marked `COPY FIX`.
 */
import type { IconName } from "@/components/icons/registry";
import { routes } from "@/lib/routes";
import { services } from "@/content/navigation";
import type { CaseStudyImpact, RichText } from "@/content/types";

export type { RichText };

const serviceHref = (value: (typeof services)[number]["value"]) =>
  services.find((s) => s.value === value)!.href;

export const home = {
  seo: {
    // Rendered as "<title> | Xconcile" (root title template): keep under ~60 characters.
    title: "Outsourced Accounting for US Businesses & CPA Firms",
    description:
      "Outsourced accounting and bookkeeping for U.S. businesses and CPA firms: reconciliations, reporting, AP/AR, tax, payroll, audit support and Virtual CFO services.",
    // Meta keywords (fallback; Sanity SEO → Meta keywords wins when filled).
    keywords: [
      "outsourced accounting services",
      "outsourced bookkeeping services",
      "accounting outsourcing for CPA firms",
      "outsourced accounting for US businesses",
      "bank reconciliation services",
      "financial reporting services",
      "accounts payable and receivable outsourcing",
      "tax preparation outsourcing",
      "payroll outsourcing services",
      "virtual CFO services",
    ],
  },

  hero: {
    badge: "Trusted by 1,000+ U.S. Accounting Firms",
    title: "Outsourced *Accounting* Services for US Businesses",
    subtitle:
      "We provide outsourced accounting and bookkeeping services for U.S. businesses and CPA firms, including reconciliations, financial reporting, AP, AR, and ongoing accounting support.",
    primaryCta: { label: "Get a Free Consultation", href: "#contact" },
    // Client rule: "Explore our services" scrolls to this page's own services section.
    secondaryCta: { label: "Explore Our Services", href: "#services" },
    /** `desktopOnly` items are not drawn in the mobile design. */
    checks: [
      { label: "ISO/IEC 27001:2022" },
      { label: "US GAAP Expertise" },
      { label: "Experienced accounting professionals", desktopOnly: true },
    ],
  },

  stats: {
    items: [
      { value: "10+", label: "Years of Experience" },
      { value: "1K+", label: "Businesses Supported" },
      { value: "50+", label: "Accounting Professionals" },
      { value: "98%", label: "Client Satisfaction" },
    ],
    rating: { value: "4.3", source: "Google" },
  },

  intro: {
    title: "Your Accounting Team, Without the Overhead",
    body: [
      "Xconcile provides ",
      { text: "outsourced accounting services", href: serviceHref("accounting-bookkeeping") },
      ", bookkeeping, tax, and audit services for U.S. businesses and CPA firms across industries. Our experienced professionals work with your existing workflows, systems, and requirements to provide reliable financial support based on your business needs.",
    ] satisfies RichText,
    /** Same paragraph on desktop; the mobile design breaks it into a second paragraph here. */
    bodyMore: [
      "From day-to-day accounting tasks to specialized tax, audit, and financial work, we help manage workloads, maintain organized records, and keep your financial processes running smoothly.",
    ] satisfies RichText,
    image: {
      src: "/images/home/intro-office.jpg",
      alt: "Xconcile accounting professionals working in an open-plan office",
      width: 1055,
      height: 704,
    },
    features: [
      { icon: "rewarded_ads", label: "US Accounting Expertise" },
      { icon: "groups_3", label: "Experienced Professionals" },
      { icon: "alarm", label: "Flexible Time Zone" },
    ] satisfies { icon: IconName; label: string }[],
    checks: ["Accounting Bookkeeping", "Tax & Compliance Support", "Financial Reporting Support"],
    cta: { label: "Know more about us", href: routes.about() },
  },

  challenges: {
    badge: "Key Challenges",
    title: "Common Accounting Challenges Businesses Face",
    body: "Managing accounting in-house can become time-consuming as your business grows. From hiring skilled professionals to handling increasing transaction volumes, accounting demands can put pressure on your team and resources.",
    cta: { label: "Let's Discuss Project", href: "#contact" }, // COPY FIX: apostrophe
    items: [
      {
        tone: "rose",
        icon: "person_search",
        title: "Hiring Challenges",
        body: [
          "Finding experienced ",
          {
            text: "accounting professionals",
            href: routes.hireStaff("hire-bookkeeper-accountant"),
          },
          " can take time and add pressure to internal teams.",
        ] satisfies RichText,
      },
      {
        tone: "amber",
        icon: "trending_up",
        title: "Growing Workload",
        body: [
          "Increasing transactions, reconciliations, reporting, and bookkeeping tasks can stretch existing resources.",
        ],
      },
      {
        tone: "blue",
        icon: "paid",
        title: "High Operating Costs",
        body: [
          "Maintaining a full in-house accounting team can increase staffing, training, and operational expenses.",
        ],
      },
      {
        tone: "purple",
        icon: "visibility_off",
        title: "Limited Financial Visibility",
        body: [
          "Delayed or incomplete financial information can make it harder to monitor performance and plan ahead.",
        ],
      },
      {
        tone: "green",
        // COPY FIX: desktop pairs "Cash Flow Management Challenges" with this skills copy;
        // the mobile design's matching title + icon is used instead.
        icon: "clinical_notes",
        title: "Skill Gaps",
        body: [
          "Businesses may lack specialized accounting expertise needed for complex or growing financial requirements.",
        ],
      },
    ] satisfies {
      tone: "rose" | "amber" | "blue" | "purple" | "green";
      icon: IconName;
      title: string;
      body: RichText;
    }[],
  },

  services: {
    id: "services",
    badge: "Services",
    title: "Our *Accounting* Outsourcing Services",
    // COPY FIX: design text ends with a trailing comma.
    subtitle:
      "From everyday bookkeeping to strategic financial planning, our outsourced accounting services help businesses maintain accurate financial records.",
    initiallyVisible: 5,
    items: [
      {
        icon: "calculate",
        title: "Accounting & Bookkeeping",
        description:
          "Keep your financial records accurate, organized, and up to date with ongoing accounting and bookkeeping support.",
        keyLabel: "Key services",
        keyItems: [
          "General ledger maintenance",
          "Bank and account reconciliations",
          "Accounts payable and receivable",
          "Month-end closing",
          "Financial statement preparation",
          "Catch-up and cleanup bookkeeping",
        ],
        cta: {
          label: "Explore Accounting & Bookkeeping",
          href: serviceHref("accounting-bookkeeping"),
        },
      },
      {
        icon: "assignment",
        title: "Audit & Assurance",
        description:
          "Support your audit engagements with experienced professionals handling documentation, testing, workpapers, and related audit activities.",
        keyLabel: "Key services",
        keyItems: [
          "Audit planning support",
          "Risk assessment",
          "Audit testing",
          "Workpapers and documentation",
          "Financial statement audit support",
          "Review and reporting support",
        ],
        cta: { label: "Explore Audit & Assurance", href: serviceHref("audit-assurance") },
      },
      {
        icon: "import_contacts",
        title: "Tax Preparation",
        description:
          "Get support with individual and business tax returns, tax workpapers, compliance tasks, and related preparation activities.",
        keyLabel: "Key services",
        keyItems: [
          "Individual tax returns",
          "Business tax returns",
          "Partnership returns",
          "Corporate returns",
          "Tax workpapers",
          "Tax compliance support",
        ],
        cta: { label: "Explore Tax Preparation", href: serviceHref("tax-preparation") },
      },
      {
        icon: "add_chart",
        title: "Multi-State Sales & Use Tax Compliance",
        description:
          "Manage multi-state sales and use tax requirements with support for registrations, taxability reviews, and filings.",
        keyLabel: "Key services",
        keyItems: [
          "Economic nexus analysis",
          "State registrations",
          "Taxability reviews",
          "Sales tax calculations",
          "Multi-state filings",
          "Compliance reporting",
        ],
        cta: { label: "Explore Sales Tax Compliance", href: serviceHref("sales-tax-compliance") },
      },
      {
        icon: "sync",
        title: "Payroll & Compliance",
        description:
          "Keep payroll activities organized with support for processing, reporting, reconciliations, employee records, and compliance tasks.",
        keyLabel: "Key services",
        keyItems: [
          "Payroll processing",
          "Payroll reporting",
          "Employee record management",
          "Payroll reconciliations",
          "Payroll compliance support",
          "Related accounting activities",
        ],
        cta: { label: "Explore Payroll & Compliance", href: serviceHref("payroll-compliance") },
      },
      {
        icon: "query_stats",
        title: "Virtual CFO & FP&A",
        description:
          "Gain financial planning and reporting support to better understand performance, cash flow, budgets, and future financial needs.",
        keyLabel: "Key services",
        keyItems: [
          "Budgeting and forecasting",
          "Cash flow planning",
          "Financial reporting",
          "Variance analysis",
          "Financial planning",
          "Decision-support insights",
        ],
        cta: { label: "Explore Virtual CFO & FP&A", href: serviceHref("virtual-cfo") },
      },
      {
        icon: "person_add",
        title: "Hire Dedicated Accounting Professionals",
        description:
          "Add experienced accounting professionals to your team without changing the systems and workflows you already use.",
        keyLabel: "Key support",
        keyItems: [
          "Dedicated accounting professionals",
          "Bookkeeping support",
          "Reconciliations",
          "Financial reporting",
          "AP and AR",
          "Flexible staffing models",
        ],
        cta: {
          label: "Hire Accounting Professionals",
          href: routes.hireStaff("hire-bookkeeper-accountant"),
        },
      },
      {
        // NOT IN THE HOME DOCX: drawn in the mobile design ("Revenue Cycle Man..") and implied by
        // the desktop "Show more services (3)". Copy derived from the RCM page design; confirm.
        icon: "health_and_safety",
        title: "Revenue Cycle Management",
        description:
          "Improve provider performance with medical billing and revenue cycle support that gives your practice more time for patients.",
        keyLabel: "Key services",
        keyItems: [
          "Medical billing and coding",
          "Timely filing of clean claims",
          "Accounts receivable management",
          "Old-age billing and follow-up",
          "EOB and ERA payment posting",
          "HIPAA-compliant billing",
        ],
        cta: {
          label: "Explore Revenue Cycle Management",
          href: serviceHref("revenue-cycle-management"),
        },
      },
    ] satisfies {
      icon: IconName;
      title: string;
      description: string;
      keyLabel: string;
      keyItems: string[];
      cta: { label: string; href: string };
    }[],
  },

  caseStudies: {
    badge: "Testimonials",
    title: "Trusted by Businesses & CPA Firms",
    // COPY FIX: the drawn subtitle is the Tools section's line (report §4). Placeholder; confirm.
    subtitle: "Real examples of how Xconcile supports businesses and CPA firms across industries.",
    /**
     * Only "CPA Firms" has copy in the design; "Real Estate" was added in Studio (sample copy, see
     * below). Other drawn tabs (E-commerce, Construction, Restaurants) appear once their case
     * studies are added. Never invent client results.
     */
    items: [
      {
        id: "cpa-firms",
        label: "CPA Firms",
        title: "CPA Firms",
        challenge:
          "Growing client workloads were putting pressure on the firm's internal accounting capacity.",
        // COPY FIX: drawn text contains a designer note ("If this section is meant to showcase…").
        solution:
          "Dedicated outsourced accounting support integrated with the firm's existing workflow.",
        result:
          "Improved financial visibility, streamlined day-to-day operations, and reduced internal accounting workload.",
        // Drawn on mobile only; shown on every screen since 2026-10-25 (user request). Editable in
        // Studio → Home Page → Case Studies → Impact card (icon, Show on).
        impact: {
          label: "Workload Impact",
          value: "42% Reduced",
          icon: "trending_down",
          devices: ["mobile", "tablet", "laptop"],
        } satisfies CaseStudyImpact,
        image: {
          src: "/images/home/case-study-cpa.jpg",
          alt: "Accountant reviewing client financials at his desk",
          width: 1080,
          height: 709,
          /** The mobile design uses a different photo (art direction via <picture>). */
          mobile: { src: "/images/home/case-study-cpa-mobile.jpg", width: 1200, height: 896 },
        },
        // No case-study pages exist yet (user request 2026-10-25: fill every field), so the button
        // opens the matching industry page.
        cta: {
          label: "View Case Study",
          href: routes.industry("professional-services") as string | undefined,
        },
      },
      {
        // Added in Studio (2026-10-25) with test copy. SAMPLE CONTENT (NOT IN DESIGN): challenge,
        // solution and result only restate claims from the real-estate industry page (no client
        // figures); replace with a real client story. Impact label/value as entered in Studio;
        // confirm.
        id: "real-estate",
        label: "Real Estate",
        title: "Real Estate",
        challenge:
          "Managing income, expenses, and reconciliations across multiple properties and entities was creating manual spreadsheet work and slowing down reporting.",
        solution:
          "Dedicated real estate bookkeeping and property-level accounting, with regular bank reconciliations and a consistent month-end close.",
        result:
          "Organized property-level records, accurate reconciliations, and clearer financial reporting across the portfolio.",
        impact: {
          label: "Raise in leads",
          value: "10+",
          icon: "trending_up",
          devices: ["mobile", "tablet", "laptop"],
        } satisfies CaseStudyImpact,
        image: {
          src: "/images/industries/real-estate-intro.jpg",
          alt: "Accountant taking notes beside a calculator, laptop and model houses",
          width: 2048,
          height: 1152,
          mobile: { src: "/images/industries/real-estate-intro.jpg", width: 2048, height: 1152 },
        },
        cta: {
          label: "View Case Study",
          href: routes.industry("real-estate-construction") as string | undefined,
        },
      },
    ],
  },

  process: {
    badge: "How It Works",
    title: "Our Simple Accounting Process",
    subtitle:
      "From understanding your needs to managing ongoing accounting work, our structured process helps ensure a smooth transition, clear communication, and support that fits your existing workflows.",
    steps: [
      {
        icon: "search",
        title: "Understand",
        body: "Learn your accounting needs, systems, and workflows.",
      },
      { icon: "assignment", title: "Plan", body: "Define scope, responsibilities, and timelines." },
      {
        icon: "rocket_launch",
        title: "Onboard",
        body: "Align our team with your systems and processes.",
      },
      {
        icon: "bucket_check",
        title: "Manage",
        body: "Handle agreed accounting tasks and reporting.",
      },
      {
        icon: "autorenew",
        title: "Review & Improve",
        body: "Review results and improve processes over time.",
      },
    ] satisfies { icon: IconName; title: string; body: string }[],
  },

  industries: {
    badge: "Industries We Serve",
    title: "Accounting Services for Different Industries",
    subtitle: "Explore accounting solutions designed for the financial realities of your industry.",
    // Same outline button as the Blog block's "Explore all blogs" (desktop only), linking to the
    // Industries gallery (user request 2026-10-25). COPY FIX: drawn as "Explore More".
    cta: { label: "Explore all industries", href: routes.industries() as string | undefined },
    items: [
      {
        title: "CPA & Accounting Firms",
        // COPY FIX: desktop card has manufacturing copy (report §4); mobile copy used.
        body: "Reliable bookkeeping and accounting support for CPA firms.",
        href: routes.industry("professional-services"),
        image: {
          src: "/images/home/industry-cpa-firms.jpg",
          alt: "Close-up of metal grinding sparks",
          width: 564,
          height: 376,
        },
      },
      {
        title: "Healthcare",
        body: "Practice accounting, revenue cycle support, compliance.",
        href: routes.industry("medical-health"),
        image: {
          src: "/images/home/industry-healthcare.jpg",
          alt: "Doctor in a white coat using a smartphone",
          width: 500,
          height: 333,
        },
      },
      {
        title: "Real Estate",
        body: "Streamline property, sales, and client relationships.",
        href: routes.industry("real-estate-construction"),
        image: {
          src: "/images/home/industry-real-estate.jpg",
          alt: "Modern high-rise office buildings",
          width: 500,
          height: 291,
        },
      },
      {
        title: "Retail",
        body: "Multi-location consolidation and daily sales reconciliation.",
        href: routes.industry("hospitality-retail"),
        image: {
          src: "/images/home/industry-retail.jpg",
          alt: "Retail store owner using a point-of-sale tablet",
          width: 499,
          height: 333,
        },
      },
    ],
  },

  whyChoose: {
    badge: "Why Choose Us",
    title: "Why Businesses Choose Xconcile for *Outsourced Accounting*",
    subtitle:
      "Get reliable accounting support from experienced professionals who handle daily accounting, reconciliations, financial reporting, and ongoing accounting needs.",
    features: [
      {
        icon: "contextual_token_add",
        title: "US Accounting Expertise",
        body: "Support according to U.S. accounting practices and needs.",
      },
      {
        icon: "deployed_code_account",
        title: "Experienced Professionals",
        body: "Experienced professionals to meet your accounting needs.",
      },
      {
        icon: "contact_phone",
        title: "Dedicated Support",
        body: "Dedicated professionals focused on your accounting needs.",
      },
      {
        icon: "page_info",
        title: "Flexible Engagements",
        body: "Flexible support that fits your workload and requirements.",
      },
      {
        icon: "add_chart",
        title: "Month-End Support",
        body: "Stay on top of your recurring month-end accounting activities.",
      },
    ] satisfies { icon: IconName; title: string; body: string }[],
    images: [
      {
        src: "/images/home/why-choose-1.jpg",
        alt: "Colleagues celebrating with a high five at a meeting table",
        width: 507,
        height: 338,
      },
      {
        src: "/images/home/why-choose-2.jpg",
        alt: "Accounting team collaborating at their desks",
        width: 508,
        height: 381,
      },
      {
        src: "/images/home/why-choose-3.jpg",
        alt: "Team members joining hands over a desk",
        width: 494,
        height: 741,
      },
      {
        src: "/images/home/why-choose-4.jpg",
        alt: "Professionals working on laptops in a shared office",
        width: 489,
        height: 335,
      },
    ],
    stats: [
      { value: "10+", label: "Accounting Experience" },
      { value: "1K+", label: "Businesses Supported" },
      { value: "50+", label: "Accounting Professionals" },
      { value: "98%", label: "Reconciliation Accuracy" },
    ],
  },

  tools: {
    badge: "Software Expertise",
    title: "Tools We Work With",
    // COPY FIX: drawn subtitle repeats the case-study result; this line was drawn under the
    // case-study heading instead (report §4: subtitles swapped).
    subtitle: "We work with the accounting platforms and business tools your company already uses.",
    /** Order = desktop columns top→bottom (left column first), which also yields the mobile order. */
    items: [
      { name: "QuickBooks", logo: "/images/tools/quickbooks.png", width: 80, height: 80 },
      { name: "NetSuite", logo: "/images/tools/netsuite.svg", width: 34, height: 32 },
      { name: "Dynamics 365", logo: "/images/tools/dynamics-365.png", width: 60, height: 80 },
      { name: "Zoho Books", logo: "/images/tools/zoho-books.png", width: 160, height: 69 },
      { name: "Odoo", logo: "/images/tools/odoo.png", width: 160, height: 51 },
      { name: "Xero", logo: "/images/tools/xero.png", width: 80, height: 80 },
      { name: "Sage", logo: "/images/tools/sage.png", width: 160, height: 90 },
      { name: "Bill.com", logo: "/images/tools/bill-com.png", width: 80, height: 80 },
      { name: "Drake Software", logo: "/images/tools/drake-software.png", width: 80, height: 80 },
      { name: "FreshBooks", logo: "/images/tools/freshbooks.png", width: 80, height: 80 },
    ],
  },

  testimonials: {
    badge: "Testimonials",
    title: "What Our Clients Say",
    subtitle:
      "See how Xconcile helps businesses improve efficiency, visibility, and financial operations.",
    /**
     * Fallback only (Sanity wins). Only one testimonial video exists (live site + Sanity). The
     * thumbnail slider under the player always renders, one thumbnail per video.
     */
    videos: [
      {
        youtubeId: "Mu0O-qTK1jo",
        title: "Our Success Story - Hear What Our Clients Have to Say",
        name: "Rosanne Mallozzi",
        company: "Navesink Tax and Advisory", // COPY FIX: "Tex" → "Tax"
        country: "us" as const,
        uploadDate: "2026-08-11T05:30:24-07:00",
        duration: "PT3M9S",
        poster: { src: "/images/home/testimonial-rosanne-mallozzi.jpg", width: 1365, height: 766 },
      },
    ],
  },

  blog: {
    badge: "Our Blog",
    title: "Helpful Accounting Insights",
    subtitle: "Explore our latest accounting tips, guides, and business insights.",
    cta: { label: "Explore all blogs", href: routes.blog() },
  },

  faq: {
    badge: "FAQ",
    title: "Frequently Asked Questions",
    intro: ["Still have Questions?", "Drop us a message and we’ll get back to you"],
    items: [
      {
        q: "What outsourced accounting services does Xconcile provide?",
        a: [
          "Xconcile provides outsourced accounting and bookkeeping, ",
          { text: "tax preparation", href: serviceHref("tax-preparation") },
          ", payroll, sales tax compliance, audit support, and Virtual CFO & FP&A services for U.S. businesses and CPA firms. Get flexible, professional support for ongoing accounting, seasonal workloads, and specialized financial projects.",
        ] satisfies RichText,
      },
      {
        q: "Does Xconcile work with U.S. businesses and CPA firms?",
        a: [
          "Yes. Xconcile works with U.S. businesses and CPA and accounting firms. Businesses can outsource their day-to-day accounting needs, while CPA firms can add capacity, support more clients, and manage increasing workloads with dedicated accounting support.",
        ],
      },
      {
        q: "Can Xconcile work with our existing accounting software?",
        a: [
          "Yes. Xconcile works with your existing accounting and financial software. Our professionals follow your current systems and workflows to provide accounting support without requiring major changes to your processes.",
        ],
      },
      {
        q: "How does Xconcile support U.S. CPA firms during tax season?",
        a: [
          "Xconcile helps U.S. CPA firms manage tax-season workloads with flexible support for tax preparation, bookkeeping, workpapers, reconciliations, and other accounting tasks. Our professionals can work within your existing processes and systems, helping your team take on more clients while keeping work accurate and on schedule.",
        ],
      },
      {
        q: "How does the outsourced accounting process work?",
        a: [
          "The process starts by understanding your needs, workflows, and systems. Xconcile assigns the right professionals, works within your processes, and reviews work for accuracy and timely delivery.",
        ],
      },
      {
        q: "How does Xconcile protect financial and client data?",
        a: [
          "Xconcile keeps client financial data protected through controlled access. Only authorized team members can access sensitive information.",
        ],
      },
      {
        q: "How much do outsourced accounting services cost?",
        a: [
          "Outsourced accounting services generally cost $500 to $5,000+ per month, depending on the scope of work, transaction volume, business size, and level of support required. Basic bookkeeping may fall at the lower end, while full-service accounting and dedicated accounting professionals can require a larger monthly budget.",
        ],
      },
      {
        q: "What is the difference between bookkeeping and accounting?",
        a: [
          "Bookkeeping handles the day-to-day recording of financial transactions, while accounting uses that information to prepare reports, review financial performance, and support business decisions.",
        ],
      },
    ] satisfies { q: string; a: RichText }[],
  },

  contact: {
    id: "contact",
    title: "Ready to Simplify Your Accounting?",
    body: "Tell us about your accounting needs and we'll help you find the right outsourcing model for your business.",
    checks: [
      "Free, no-obligation consultation",
      "Response within one business day",
      "A clear proposal with scope, team and pricing",
    ],
    form: {
      // COPY FIX: every placeholder in the design reads "Your name", and the message textarea
      // is labelled "Company".
      fields: {
        name: { label: "Name", placeholder: "Your name", required: true },
        email: { label: "Email", placeholder: "you@company.com", required: true },
        company: { label: "Company", placeholder: "Company name", required: false },
        service: { label: "Service of Interest", placeholder: "Select a service", required: true },
        message: {
          label: "Message",
          placeholder: "Tell us about your accounting needs",
          required: false,
        },
      },
      submit: "Get a Free Consultation",
      submitting: "Sending…",
      success:
        "Thank you! Your message has been sent. We'll get back to you within one business day.",
      error: "Sorry, your message could not be sent. Please try again or email us at",
    },
  },

  /**
   * Contact section in the OLD SITE's look (client request 2026-10-15), replacing `contact` on
   * Home. Copy from old-code/xconcile-website/components/services/ServiceInquiryForm.tsx.
   * `contact` above is kept so the Figma version can be restored in app/(website)/page.tsx.
   */
  inquiry: {
    id: "contact", // hero / challenges CTAs link to #contact
    eyebrow: "Start Today",
    // COPY FIX: the old home page passed serviceTitle="Your Business", rendering
    // "Ready to Transform Your Your Business?".
    title: "Ready to Transform Your *Business?*",
    body: "Let our experts build a tailored solution for your business. Fill in the form and we'll reach out within one business day.",
    trust: [
      { icon: "bolt", label: "Fast Response", desc: "We reply within 1 business day" },
      { icon: "lock", label: "100% Confidential", desc: "Your information stays private" },
      { icon: "check", label: "Tailored Solutions", desc: "Custom plans for your business" },
    ] satisfies { icon: "bolt" | "lock" | "check"; label: string; desc: string }[],
    tagline:
      "Trusted by hundreds of businesses across the country. No commitment required — just a conversation.",
    form: {
      title: "Send Us a Message",
      note: "Fields marked * are required.",
      fields: {
        name: { label: "Full Name", placeholder: "John Doe", required: true },
        email: { label: "Work Email", placeholder: "john@company.com", required: true },
        phone: { label: "Phone Number", placeholder: "+1 (234) 567-8900", required: false },
        company: { label: "Company Name", placeholder: "Your Company", required: false },
        service: { label: "Service of Interest", required: true },
        // COPY FIX: old placeholder rendered "Tell us about your Your Business needs...".
        message: {
          label: "Message",
          placeholder: "Tell us about your business needs...",
          required: true,
        },
      },
      submit: "Send Message",
      submitting: "Sending…",
      success: "Thank you! We'll reach out within 1 business day.",
      error: "Sorry, your message could not be sent. Please try again or email us at",
    },
  },
};
