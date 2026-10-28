/**
 * Multi-State Sales & Use Tax Compliance (`/multi-state-sales-tax-compliance`; was `/multi-state-sales-and-use-tax-compliance`, which 301s here).
 *
 * Sources:
 *  - Copy: the Figma design `pages/services/multi-state-sales-tax-compliance.svg` (2026-10-25,
 *    audit layout incl. tools).
 *  - Accordion task lists: docs/content/Tax Preparation.md, "H3 4. Indirect Tax (Sales & Use
 *    Tax)" (no dedicated sales tax doc exists).
 *
 * Every deviation from the drawn copy is marked `COPY FIX`; text that is not in the design at
 * all is marked `NOT IN DESIGN` and needs client confirmation.
 */
import { home } from "@/content/home";
import { SCHEDULE_HREF, type RichText } from "@/content/types";
import type { ServicePageContent } from "@/content/services/types";
import { routes } from "@/lib/routes";

export const multiStateSalesAndUseTaxCompliance: ServicePageContent = {
  // URL renamed by the client 2026-10-28 (was /multi-state-sales-and-use-tax-compliance, which now 301s here).
  slug: "multi-state-sales-tax-compliance",
  sanityId: "servicePage-multi-state-sales-and-use-tax-compliance",
  redirectFrom: ["multi-state-sales-and-use-tax-compliance"],
  name: "Multi-State Sales & Use Tax Compliance Services",

  // NOT IN DESIGN: derived from the hero, intro and docs copy. Fallbacks; Sanity `seo` wins.
  seo: {
    title: "Multi-State Sales & Use Tax Compliance Services",
    description:
      "Multi-state sales and use tax compliance for U.S. businesses and CPA firms: nexus reviews, state registrations, taxability reviews, filings and remittance.",
    // Meta keywords (fallback; Sanity SEO → Meta keywords wins when filled).
    keywords: [
      "multi-state sales tax compliance",
      "sales and use tax compliance services",
      "economic nexus analysis",
      "sales tax registration services",
      "sales tax filing and remittance",
      "product taxability reviews",
      "outsourced sales tax compliance for CPA firms",
      "Avalara and TaxJar sales tax support",
    ],
  },

  hero: {
    badge: "Tax Compliance Support",
    title: "Multi-State Sales & Use Tax Compliance Services",
    // COPY FIX: drawn without the closing period.
    subtitle:
      "Manage multi-state sales tax requirements with support for registrations, taxability reviews, filings, and ongoing compliance.",
    // No contact section on service pages: CTAs open the Calendly popup.
    primaryCta: { label: "Get expert sales support", href: routes.contact() },
    // Client rule: "Explore our services" scrolls to this page's services section.
    secondaryCta: { label: "Explore Our Services", href: "#services" },
    checks: [{ label: "ISO 27001 - ISO 27701" }, { label: "US GAAP Expertise" }],
  },

  stats: {
    items: [
      { value: "10+", label: "Sales-Tax Expertise" },
      { value: "1K+", label: "Businesses Supported" },
      { value: "15+", label: "Sales-Tax Professionals" },
      { value: "98%", label: "Reconciliation Accuracy" },
    ],
    rating: { value: "4.3", source: "Google" },
  },

  intro: {
    title: "Your Trusted Partner for Multi-State Sales Tax Compliance",
    body: [
      "Managing sales tax across different states can become difficult as your business grows. Our ",
      { text: "tax professionals", href: routes.hireStaff("hire-tax-preparation-staff") },
      " provide multi-state sales tax compliance support to help you understand your tax obligations, keep your records organized, and stay on top of filing deadlines.",
    ] satisfies RichText,
    bodyMore: [
      "Handling sales tax across multiple states can get complicated as your business grows. We can help with economic nexus reviews, state registrations, taxability checks, sales tax returns, and transaction reviews. Our team works with your existing accounting processes and provides support where you need it.",
    ],
    bodyMoreLayout: "paragraph",
    // Fallback (design photo); the Sanity intro image wins when present.
    image: {
      src: "/images/services/multi-state-sales-and-use-tax-compliance/intro-calculator.jpg",
      alt: "Accountant using a calculator over printed sales reports beside a cup of coffee",
      width: 1480,
      height: 986,
    },
    checks: [
      "Multi-State Sales Tax Support",
      "Sales Tax Filing Support",
      "Product Taxability Reviews",
    ],
    checksStyle: "list",
    cta: { label: "Discuss Your Sales Tax Needs", href: SCHEDULE_HREF },
  },

  challenges: {
    badge: "Key Challenges",
    title: "Managing Multi-State Sales Tax Can Be Challenging",
    body: "Managing sales tax across multiple states can be complex. Xconcile helps businesses and CPA firms stay organized and compliant.",
    cta: { label: "Let's Discuss Project", href: routes.contact() }, // COPY FIX: "Lets"
    items: [
      {
        tone: "rose",
        icon: "account_balance",
        title: "Multiple State Requirements",
        body: [
          "Each state has its own registration, filing, and reporting rules, making it difficult to keep up as your business expands.",
        ],
      },
      {
        tone: "amber",
        icon: "autorenew",
        title: "Changing Tax Rules",
        body: [
          "Sales tax rates, thresholds, and exemptions can change, so keeping your processes up to date takes ongoing attention.",
        ],
      },
      {
        tone: "blue",
        icon: "monitoring",
        title: "Growing Transaction Volumes",
        body: [
          "More sales across multiple states mean more transactions to review, track, and report accurately.",
        ],
      },
      {
        tone: "purple",
        // Drawn icon (crossed-out eye, reused from Home's "Limited Financial Visibility").
        icon: "visibility_off",
        title: "Filing Deadlines",
        // COPY FIX: drawn without the closing period.
        body: [
          "Different states have different filing dates and frequencies, making it important to keep every return on schedule.",
        ],
      },
    ],
  },

  services: {
    id: "services",
    badge: "Services",
    title: "Our Sales Tax Compliance Services",
    subtitle:
      "Support for sales tax registration, filings, reporting, and compliance across multiple states.",
    initiallyVisible: 5,
    // Fallback rows (drawn titles + subtitles). `groups`: copied from docs/content/Tax
    // Preparation.md (H3 4, Indirect Tax), "Task:" prefixes and markdown removed; each task is
    // placed under the drawn row it matches. No doc task matches "Advanced Tax Types", so that
    // row has no list (the doc's "Audit Support" task is not drawn as a row).
    items: [
      {
        icon: "radar",
        title: "Nexus Identification & Monitoring",
        description: "Proactive compliance tracking",
        groups: [
          {
            title: "Nexus Identification",
            items: ["Economic and Physical Nexus studies to determine state filing obligations."],
          },
        ],
      },
      {
        icon: "assignment",
        title: "Registration & Permitting",
        description: "Complete multi-state setup",
        groups: [
          { title: "Compliance & Filing", items: ["Registration for State Sales Tax permits."] },
        ],
      },
      {
        icon: "import_contacts",
        title: "Monthly Filing & Remittance",
        description: "Accurate, timely compliance",
        groups: [
          {
            title: "Compliance & Filing",
            items: [
              "Monthly, Quarterly, and Annual Sales Tax return preparation and remittance via Avalara or TaxJar.",
            ],
          },
        ],
      },
      {
        icon: "add_chart",
        title: "Advanced Tax Types",
        description: "Specialized tax management",
      },
    ],
  },

  caseStudies: {
    badge: "Testimonials",
    title: "Trusted by Businesses & CPA Firms",
    subtitle:
      "See how Xconcile helps businesses improve efficiency, visibility, and financial operations.",
    // Only "CPA Firms" has copy in the design (other drawn tabs: Real Estate, E-commerce,
    // Construction, Restaurants); they appear once their case studies exist. Never invent
    // client results.
    items: [
      {
        id: "cpa-firms",
        label: "CPA Firms",
        title: "CPA Firms",
        challenge: "Growing workload and limited accounting capacity.",
        solution: "Dedicated outsourced accounting support.",
        result:
          "Better financial visibility, streamlined operations, and reduced accounting workload.",
        // NOT IN DESIGN: impact figure reused from Home; confirm with the client.
        impact: home.caseStudies.items[0].impact,
        // Same photo as Home's CPA case study (incl. its mobile art direction).
        image: home.caseStudies.items[0].image,
        // No case-study pages exist yet, so the button opens the matching industry page.
        cta: { label: "View Case Study", href: routes.industry("accounting-outsourcing-professional-services") },
      },
    ],
  },

  process: {
    badge: "How It Works",
    title: "Our Sales Tax Compliance Process",
    subtitle:
      "Our process covers sales tax requirements, compliance tasks, filings, reporting, and open items.",
    steps: [
      {
        icon: "search",
        title: "Understand",
        // COPY FIX: drawn as "Review business activities, locations, transactions."
        body: "Review business activities, locations, and transactions.",
      },
      {
        icon: "assignment",
        title: "Plan",
        body: "Define compliance tasks, filing schedules, and state requirements.",
      },
      {
        icon: "rocket_launch",
        title: "Onboard",
        body: "Align our team with your tax data, systems, and filing processes.",
      },
      {
        icon: "bucket_check",
        title: "Manage",
        body: "Manage tax returns, reports, and agreed compliance activities.",
      },
      {
        icon: "autorenew",
        title: "Review & Improve",
        body: "Review filings and address open items for ongoing compliance.",
      },
    ],
  },

  industries: {
    badge: "Industries We Serve",
    title: "Sales Tax Support Across Industries",
    subtitle:
      "Sales tax support for businesses dealing with different products, customers, locations, and state tax requirements.",
    // Not drawn (no button beside the heading); `href: undefined` keeps it hidden.
    cta: { label: "Explore More", href: undefined },
    // Links use the live industry slugs; Education, Pharmaceutical and Manufacturing have no
    // industry page (plain cards).
    items: [
      {
        title: "CPA & Accounting Firms",
        body: "Sales tax compliance support for CPA firm workflows",
        href: routes.industry("accounting-outsourcing-professional-services"),
        image: home.industries.items[0].image,
      },
      {
        title: "Healthcare",
        body: "Healthcare sales tax compliance support and reporting",
        href: routes.industry("healthcare-accounting-services"),
        image: home.industries.items[1].image,
      },
      {
        title: "Real Estate",
        body: "Real estate sales tax compliance and reporting support",
        href: routes.industry("real-estate-accounting-services"),
        image: home.industries.items[2].image,
      },
      {
        title: "Retail",
        body: "Sales tax support for retail transactions and filing",
        href: routes.industry("hospitality-accounting-services"),
        image: home.industries.items[3].image,
      },
      {
        title: "Education",
        body: "Education sales tax reporting and compliance support",
        image: {
          src: "/images/industries/education.jpg",
          alt: "Students working at desks in a classroom",
          width: 500,
          height: 311,
        },
      },
      {
        title: "Pharmaceutical",
        body: "Sales tax support for pharma products and distribution",
        image: {
          src: "/images/industries/pharmaceutical.jpg",
          alt: "Pharmacist taking stock from pharmacy shelves",
          width: 500,
          height: 333,
        },
      },
      {
        title: "eCommerce",
        body: "Sales tax compliance support for online businesses",
        href: routes.industry("ecommerce-accounting-services"),
        image: {
          src: "/images/industries/ecommerce.jpg",
          alt: "Online seller packing orders at a desk",
          width: 500,
          height: 334,
        },
      },
      {
        title: "Manufacturing",
        body: "Manufacturing sales tax compliance and reporting support",
        image: {
          ...home.industries.items[0].image,
          alt: "Sparks flying from metal grinding in a factory",
        },
      },
    ],
  },

  whyChoose: {
    badge: "Why Choose Us",
    title: "Why Businesses & CPA Firms Choose Xconcile for Sales Tax Support",
    subtitle:
      "Get reliable, accurate, and cost-effective accounting support from experienced professionals who help US businesses streamline finances and focus on growth.",
    features: [
      {
        icon: "contextual_token_add",
        title: "Multi-State Support",
        body: "Help manage sales tax activities across multiple states.",
      },
      {
        icon: "deployed_code_account",
        title: "U.S. Tax Expertise",
        body: "Work with professionals familiar with U.S. tax workflows.",
      },
      {
        icon: "contact_phone",
        title: "Flexible Support",
        body: "Flexible support tailored to your accounting workload and needs.",
      },
      {
        icon: "page_info",
        title: "Accurate Reporting",
        body: "Maintain organized and accurate compliance records.",
      },
      {
        icon: "beenhere",
        title: "Data Security",
        body: "Controlled workflows help protect sensitive financial information.",
      },
    ],
    images: home.whyChoose.images,
    stats: home.whyChoose.stats,
  },

  tools: {
    badge: "Software Expertise",
    // COPY FIX: drawn as "Your Audit Tools. Our Expertise." (pasted from the audit page).
    title: "Your Tools. Our Expertise.",
    // COPY FIX: drawn as "…the accounting and audit platforms your team already uses…".
    subtitle:
      "We work with the accounting and sales tax platforms your team already uses, helping you maintain your existing workflows instead of rebuilding your process around a new system.",
    // The design draws the audit page's tab list (Accounting Software, Audit Software, Data
    // Analytics & Testing, Confirmation & Documentation, Audit Software again). Only the open
    // "Accounting Software" tab is kept as drawn; the audit-only tabs are left out.
    categories: [
      {
        id: "accounting-software",
        icon: "calculate",
        label: "Accounting Software",
        tools: [
          // COPY FIX: drawn as "CaseWare Working Papers" (audit software) with the QuickBooks logo.
          { name: "QuickBooks", logo: "/images/tools/quickbooks.png", width: 80, height: 80 },
          { name: "Xero", logo: "/images/tools/xero.png", width: 80, height: 80 },
          { name: "NetSuite", logo: "/images/tools/netsuite.svg", width: 34, height: 32 },
          { name: "Sage", logo: "/images/tools/sage.png", width: 160, height: 90 },
          { name: "Dynamics 365", logo: "/images/tools/dynamics-365.png", width: 60, height: 80 },
          { name: "Bill.com", logo: "/images/tools/bill-com.png", width: 80, height: 80 },
          { name: "Zoho Books", logo: "/images/tools/zoho-books.png", width: 160, height: 69 },
          { name: "FreshBooks", logo: "/images/tools/freshbooks.png", width: 80, height: 80 },
        ],
      },
      {
        // COPY FIX: drawn (collapsed) as "Audit Software". NOT IN DESIGN: tool names come from
        // docs/content/Tax Preparation.md ("remittance via Avalara or TaxJar"); confirm and add
        // logos.
        id: "sales-tax-software",
        icon: "dvr",
        label: "Sales Tax Software",
        tools: [{ name: "Avalara" }, { name: "TaxJar" }],
      },
    ],
  },

  testimonials: { ...home.testimonials, title: "Trusted by Our Clients" },

  blog: home.blog,

  faq: {
    badge: "FAQ",
    title: "Frequently asked questions",
    intro: "Find answers to common questions about multi-state sales tax compliance services.",
    // NOT IN DESIGN: the design draws the questions collapsed, without answers. Answers are
    // written only from claims already made on this page and in the tax copy doc; confirm.
    items: [
      {
        q: "What are multi-state sales and use tax compliance services?",
        a: [
          "Multi-state sales and use tax compliance services help businesses meet sales tax requirements in every state where they have obligations. Xconcile supports economic nexus reviews, state sales tax registrations, product taxability reviews, sales tax returns, transaction reviews, and ongoing compliance reporting.",
        ],
      },
      {
        q: "Why does my business need multi-state sales tax compliance?",
        a: [
          "Each state has its own registration, filing, and reporting rules, and sales tax rates, thresholds, and exemptions can change. As sales grow across states, there are more transactions to track and more filing dates to meet, so structured compliance support helps keep every return accurate and on schedule.",
        ],
      },
      {
        q: "Can Xconcile support multi-state sales tax filings?",
        a: [
          "Yes. Xconcile supports monthly, quarterly, and annual sales tax return preparation and remittance, including through Avalara or TaxJar, along with state registrations and the records needed to keep filings organized.",
        ],
      },
      {
        q: "Can Xconcile help CPA firms with sales tax compliance work?",
        a: [
          "Yes. Xconcile helps businesses and CPA firms stay organized and compliant. Our team works with your existing accounting processes, tax data, and systems, and provides sales tax support where you need it.",
        ],
      },
      {
        q: "What are the benefits of outsourcing multi-state sales tax compliance?",
        a: [
          "You get support from professionals familiar with U.S. tax workflows, help managing sales tax activities across multiple states, organized and accurate compliance records, flexible support tailored to your workload, and controlled workflows that help protect sensitive financial information.",
        ],
      },
    ],
  },

  ctaBand: {
    title: "Need Help With Multi-State Tax Compliance?",
    body: "Get reliable support to manage sales and use tax compliance across multiple states.",
    cta: { label: "Talk to a Sales Tax Specialist", href: SCHEDULE_HREF },
    // The design draws a plain teal band (no photo); the template's photo band needs an image,
    // so the audit page's handshake photo is reused.
    image: { src: "/images/services/cta-handshake.jpg", alt: "", width: 1500, height: 1000 },
  },
};
