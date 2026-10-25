/**
 * Outsourced Accounting & Bookkeeping (`/outsourced-accounting-and-bookkeeping`, live slug kept).
 *
 * Sources (decision 2026-10-13):
 *  - Copy: the Figma design `pages/services/outsourced-accounting-bookkeeping` (audit layout).
 *  - Service-row task lists and FAQ answer facts: docs/content/Bookkeeping & Accounting.md.
 *  - Sanity: once seeded, the `servicePage` document (slug `outsourced-accounting-and-bookkeeping`)
 *    wins; this file is the fallback for any section or field left empty there.
 *
 * Every deviation from the drawn copy is marked `COPY FIX`; text that is not in the design at
 * all is marked `NOT IN DESIGN` and needs client confirmation.
 */
import { home } from "@/content/home";
import { SCHEDULE_HREF, type RichText } from "@/content/types";
import type { ServicePageContent } from "@/content/services/types";
import { routes } from "@/lib/routes";

export const outsourcedAccountingAndBookkeeping: ServicePageContent = {
  slug: "outsourced-accounting-and-bookkeeping",
  name: "Outsourced Accounting & Bookkeeping Services",

  // NOT IN DESIGN: derived from the docs H1/intro and the page copy; confirm.
  seo: {
    // Fallbacks; Sanity `seo` wins when present.
    title: "Outsourced Accounting & Bookkeeping for US Businesses",
    description:
      "Outsourced accounting and bookkeeping for U.S. businesses and CPA firms: ledger upkeep, AP, AR, reconciliations, month-end close and catch-up bookkeeping.",
    // Meta keywords (fallback; Sanity SEO → Meta keywords wins when filled).
    keywords: [
      "outsourced accounting services",
      "outsourced bookkeeping services",
      "bookkeeping and accounting services",
      "outsourced accounting for CPA firms",
      "white-label bookkeeping",
      "accounts payable and receivable outsourcing",
      "month-end close and reconciliations",
      "catch-up bookkeeping",
    ],
  },

  hero: {
    badge: "Accounting & Bookkeeping Support",
    title: "Outsourced Accounting & Bookkeeping Services for US Businesses",
    subtitle:
      "Xconcile provides dedicated accounting support for U.S. businesses and CPA firms, including bookkeeping, financial reporting, payroll, tax, and ongoing finance services.",
    // No contact section on service pages: CTAs open the Calendly popup.
    primaryCta: { label: "Get expert accounting support", href: SCHEDULE_HREF },
    // Client rule: "Explore our services" scrolls to this page's services section.
    secondaryCta: { label: "Explore Our Services", href: "#services" },
    checks: [
      // As drawn (same check on the payroll and sales tax pages). The intro claims ISO/IEC
      // 27001:2022 only: confirm with the client that ISO 27701 is also held.
      { label: "ISO 27001 - ISO 27701" },
      { label: "US GAAP Expertise" },
    ],
  },

  stats: {
    items: [
      { value: "10+", label: "Accounting Expertise" },
      { value: "1K+", label: "Businesses Supported" },
      // Drawn as 30+ here but 50+ in the Why Choose stats below (and on Home); confirm.
      { value: "30+", label: "Accounting Professionals" },
      { value: "98%", label: "Reconciliation Accuracy" },
    ],
    rating: { value: "4.3", source: "Google" },
  },

  intro: {
    // COPY FIX: drawn as "... Partner in the U.S" (no closing period).
    title: "Your Trusted Outsourced Accounting Partner in the U.S.",
    body: [
      "Xconcile helps U.S. businesses and CPA firms handle their financial work with experienced professionals and flexible outsourced support. Whether you need help with day-to-day accounting tasks or extra support during busy periods, our team works with your existing systems and processes to keep your work organized and on track.",
    ] satisfies RichText,
    // Drawn as three paragraphs: services list, then the ISO sentence (`bodyExtra`).
    bodyMore: [
      "We provide accounting and bookkeeping, ",
      { text: "outsourced tax preparation", href: routes.service("outsourced-tax-preparation") },
      // COPY FIX: drawn as "help during busy Seasons, or Get Support with Specific Accounting
      // Tasks," (stray capitals, "or get support" reads as a broken list).
      ", payroll and compliance, audit and assurance, and Virtual CFO and FP&A services. Whether you need regular accounting support, help during busy seasons, or support with specific accounting tasks, our team works alongside you to keep your financial operations running smoothly.",
    ],
    bodyExtra: [
      "With ISO/IEC 27001:2022 certification, we follow a structured approach to information security when handling business and financial information.",
    ],
    bodyMoreLayout: "paragraph",
    // Fallback (design photo); the Sanity intro image wins when present.
    image: {
      src: "/images/services/outsourced-accounting-and-bookkeeping/intro-handshake.jpg",
      alt: "Two professionals shaking hands over a signed agreement on a clipboard",
      width: 1012,
      height: 1480,
    },
    checks: ["U.S. Accounting Experience", "Dedicated Accounting Support", "Support for CPA Firms"],
    checksStyle: "list",
    cta: { label: "Discuss Your Accounting Needs", href: SCHEDULE_HREF },
  },

  challenges: {
    badge: "Key Challenges",
    title: "Why Businesses & CPA Firms Outsource Accounting Work",
    body: "Businesses and CPA firms use outsourced accounting services to manage talent shortages, control costs, and handle changing workloads.",
    cta: { label: "Let's Discuss Project", href: SCHEDULE_HREF }, // COPY FIX: "Lets"
    items: [
      {
        tone: "rose",
        icon: "person_search",
        title: "Access to Skilled Accounting Talent",
        body: [
          "Outsourcing provides access to experienced professionals for bookkeeping, tax preparation, ",
          { text: "audit support", href: routes.service("audit-outsourcing-services") },
          ", and other accounting tasks.",
        ],
      },
      {
        tone: "amber",
        icon: "trending_up",
        title: "Cost-Effective Accounting Support",
        body: [
          "Outsourcing helps businesses manage costs by reducing expenses for hiring, salaries, benefits, training, and office overhead.",
        ],
      },
      {
        tone: "blue",
        icon: "paid",
        title: "Scale Support With Seasonal Demand",
        body: [
          "Adjust accounting support based on seasonal demand, with additional capacity during tax and audit seasons and reduce support when busy periods end.",
        ],
      },
      {
        tone: "purple",
        icon: "visibility_off",
        title: "Focus on Core Business", // COPY FIX: drawn "Focus on core business" (other titles are title case)
        body: [
          "Outsourcing accounting tasks allows internal teams to focus on core business operations and strategic growth.",
        ],
      },
    ],
  },

  services: {
    id: "services",
    badge: "Services",
    title: "Our Accounting & Bookkeeping Services",
    // COPY FIX: drawn with a trailing comma ("... accurate financial records,").
    subtitle:
      "From everyday bookkeeping to strategic financial planning, our outsourced accounting services help businesses maintain accurate financial records.",
    initiallyVisible: 5,
    // Fallback rows (drawn titles + subtitles). `groups`: copied from
    // docs/content/Bookkeeping & Accounting.md (H3 1–5), "Micro-Task:" prefixes and markdown removed.
    items: [
      {
        icon: "calculate",
        title: "Bookkeeping & Ledger Maintenance",
        description: "Transitioning from messy data to a clean, Audit-Ready General Ledger",
        groups: [
          {
            title: "Chart of Accounts (COA) Optimization",
            items: [
              "Mapping COA to industry standards (e.g., specialized accounts for Real Estate or SaaS).",
              "Cleaning up redundant or \"ghost\" accounts to streamline reporting.",
            ],
          },
          {
            title: "Daily Transaction Processing",
            items: [
              "Real-time coding of bank and credit card feeds.",
              "Splitting single transactions into multiple categories (e.g., a Staples receipt split between \"Office Supplies\" and \"Computer Hardware\").",
              "Recording owner-paid business expenses (Accountable Plans).",
            ],
          },
          {
            title: "Cloud Ecosystem Management",
            items: [
              "Setting up and syncing third-party apps (Hubdoc, Dext, or Expensify) with the main ledger.",
              "Monitoring bank feed health and resolving \"broken\" connections immediately.",
            ],
          },
        ],
      },
      {
        icon: "assignment",
        title: "Accounts Payable: Procure-to-Pay (P2P)",
        description: "Fraud prevention, vendor happiness, and cash flow timing",
        groups: [
          {
            title: "Vendor Onboarding & Compliance",
            items: [
              "Collecting and verifying IRS Form W-9 for all new vendors.",
              "Maintaining a master vendor list to prevent duplicate payments.",
            ],
          },
          {
            title: "The 3-Way Matching Workflow",
            items: ["Verifying that the Purchase Order (PO) matches the Receiving Report, which matches the Vendor Invoice."],
          },
          {
            title: "Expense Management",
            items: [
              "Auditing employee expense reports for policy compliance and valid receipts.",
              "Allocating corporate credit card spend to specific projects or departments.",
            ],
          },
          {
            title: "Payment Strategy",
            items: [
              "Identifying \"Early Payment Discounts\" to save client money.",
              "Weekly \"Payable Aging\" reviews to decide which bills to pay based on available cash.",
            ],
          },
        ],
      },
      {
        icon: "import_contacts",
        title: "Accounts Receivable: Order-to-Cash (O2C)",
        description: "Accelerating cash inflow and reducing Bad Debt",
        groups: [
          {
            title: "Revenue Recognition & Invoicing",
            items: [
              "Managing \"Deferred Revenue\" for subscription-based models.",
              "Creating \"Progress Billings\" for long-term construction or consulting projects.",
            ],
          },
          {
            title: "Collection & Dunning Services",
            items: [
              "Setting up automated \"Gentle Nudge\" emails for invoices 1, 7, and 15 days overdue.",
              "Documenting collection notes (calls made, promises to pay) directly in the accounting software.",
            ],
          },
          {
            title: "Cash Application",
            items: [
              "Applying partial payments to specific invoice line items.",
              "Recording and reconciling merchant fees (Stripe/Square) so the \"Gross Revenue\" remains accurate.",
            ],
          },
          {
            title: "Customer Credit Management",
            items: ["Reviewing \"Aged Receivables\" to flag high-risk customers before new orders are fulfilled."],
          },
        ],
      },
      {
        icon: "add_chart",
        title: "Reconciliations & Month-End Excellence",
        description: "Ensuring the Balance Sheet is 100% accurate every 30 days",
        groups: [
          {
            title: "Advanced Reconciliations",
            items: [
              "Merchant Account Sync: Reconciling \"Net Deposits\" from Amazon/Shopify to \"Gross Sales.\"",
              "Loan & Lease Reconciliation: Splitting monthly payments into Principal and Interest based on amortization schedules.",
              "Inter-company \"Due To/From\": Ensuring balances between parent and subsidiary companies net to zero.",
            ],
          },
          {
            title: "Month-End Adjustments",
            items: [
              "Recording Accruals (expenses incurred but not yet invoiced).",
              "Recording Prepaid Expenses (like annual insurance) and amortizing them monthly.",
              "Adjusting Journal Entries (AJEs) for depreciation and amortization.",
            ],
          },
          {
            title: "Reporting & Review",
            items: [
              "Generating a \"Management Reporting Package\" (P&L, Balance Sheet, Cash Flow).",
              "Performing a \"Trend Analysis\" to spot unusual spikes in expenses (e.g., why is \"Utilities\" 40% higher this month?).",
            ],
          },
        ],
      },
      {
        icon: "sync",
        title: "Catch-up & Clean-up Services",
        description: "Bringing historical data up to date for taxes or funding",
        // The docs list three flat bullets with bold leads; each lead becomes a group title.
        groups: [
          {
            title: "Backlog Processing",
            items: ["Entering data from previous months or years from bank statements."],
          },
          {
            title: "Balance Sheet Forensic Review",
            items: ["Investigating old balances in \"Uncategorized Assets\" or \"Opening Balance Equity.\""],
          },
          {
            title: "Audit-Ready Packaging",
            items: ["Preparing a \"Permanent File\" of all high-value contracts and asset purchases for future audits."],
          },
        ],
      },
    ],
  },

  caseStudies: {
    badge: "Testimonials",
    title: "Trusted by Businesses & CPA Firms",
    subtitle: "See how Xconcile helps businesses improve efficiency, visibility, and financial operations.",
    // Only "CPA Firms" has copy in the design (tabs drawn: CPA Firms, Real Estate, E-commerce,
    // Construction, Restaurants); other tabs appear once their case studies exist. Never invent
    // client results.
    items: [
      {
        id: "cpa-firms",
        label: "CPA Firms",
        title: "CPA Firms",
        challenge: "Growing workload and limited accounting capacity.",
        solution: "Dedicated outsourced accounting support.",
        result: "Better financial visibility, streamlined operations, and reduced accounting workload.",
        // NOT IN DESIGN: impact figure reused from Home; confirm with the client.
        impact: home.caseStudies.items[0].impact,
        // Same photo as Home's CPA-firm case study.
        image: home.caseStudies.items[0].image,
        // No case-study pages exist yet, so the button opens the matching industry page.
        cta: { label: "View Case Study", href: routes.industry("professional-services") },
      },
    ],
  },

  process: {
    badge: "How It Works",
    title: "Our Accounting Outsourcing Process",
    subtitle:
      "Our process covers accounting requirements, workflow setup, ongoing management, and review of completed work.",
    steps: [
      {
        icon: "search",
        title: "Understand",
        body: "Review your accounting requirements, systems, workflows, and reporting needs.",
      },
      {
        icon: "assignment",
        title: "Plan",
        body: "Set responsibilities, tasks, deliverables, timelines, and communication requirements.",
      },
      {
        icon: "rocket_launch",
        title: "Onboard",
        body: "Set up access, understand your processes, and organize the transition to our team.",
      },
      {
        icon: "bucket_check",
        title: "Deliver",
        body: "Managed bookkeeping, reconciliations, month-end and financial reporting.",
      },
      {
        icon: "autorenew",
        title: "Review & Improve",
        body: "Review work done, resolve pending tasks and improve processes as needed.",
      },
    ],
  },

  industries: {
    badge: "Industries We Serve",
    title: "Accounting Expertise Across Industries",
    subtitle:
      "Accounting support designed around the financial workflows of different industries and business types.",
    // Not drawn on this page; no href keeps the button hidden.
    cta: { label: "Explore More", href: undefined },
    // Links use the live industry slugs; Education and Pharmaceutical have no industry page.
    // Photos as drawn (the CPA card reuses the manufacturing photo, as on Home and audit).
    items: [
      {
        title: "CPA & Accounting Firms",
        body: "Client accounting, bookkeeping, reporting, and job costing.",
        href: routes.industry("professional-services"),
        image: home.industries.items[0].image,
      },
      {
        title: "Healthcare",
        body: "Practice accounting, revenue cycle support, compliance.",
        href: routes.industry("medical-health"),
        image: home.industries.items[1].image,
      },
      {
        title: "Real Estate",
        body: "Property accounting, sales tracking, and client reporting.",
        href: routes.industry("real-estate-construction"),
        image: home.industries.items[2].image,
      },
      {
        title: "Retail",
        body: "Multi-location consolidation and daily sales reconciliation.",
        href: routes.industry("hospitality-retail"),
        image: home.industries.items[3].image,
      },
      {
        title: "Education",
        // COPY FIX: drawn as "Simplify admissions, student records, and administrative" (sentence
        // cut off, no period). Confirm the missing word.
        body: "Simplify admissions, student records, and administrative tasks.",
        image: { src: "/images/industries/education.jpg", alt: "Students working at desks in a classroom", width: 500, height: 311 },
      },
      {
        title: "Pharmaceutical",
        // COPY FIX: drawn without the closing period.
        body: "Improve compliance, inventory tracking, and distribution.",
        image: { src: "/images/industries/pharmaceutical.jpg", alt: "Pharmacist taking stock from pharmacy shelves", width: 500, height: 333 },
      },
      {
        title: "eCommerce",
        // COPY FIX: drawn as "Multi-channel books, inventory COGS, sales tax." (missing comma).
        body: "Multi-channel books, inventory, COGS, sales tax.",
        href: routes.industry("tech-ecommerce"),
        image: { src: "/images/industries/ecommerce.jpg", alt: "Online seller packing orders at a desk", width: 500, height: 334 },
      },
      {
        title: "Manufacturing",
        body: "Optimize production, inventory, and supply chain operations.",
        // No manufacturing industry page exists, so no link.
        image: { ...home.industries.items[0].image, alt: "Sparks flying from metal grinding in a factory" },
      },
    ],
  },

  whyChoose: {
    badge: "Why Choose Us",
    title: "Why Businesses Choose Xconcile for Accounting Outsourcing",
    subtitle:
      "Get reliable accounting support from experienced professionals to keep your finances organized, handle day-to-day accounting work, and give you more time to focus on growing your business.",
    features: [
      {
        icon: "contextual_token_add",
        title: "US Accounting Expertise",
        body: "US accounting knowledge for accurate and compliant workflows.",
      },
      {
        icon: "deployed_code_account",
        title: "Experienced Professionals",
        body: "Skilled professionals supporting your daily accounting needs.",
      },
      {
        icon: "contact_phone",
        title: "Flexible Support",
        body: "Flexible support tailored to your accounting workload and needs.",
      },
      {
        icon: "page_info",
        title: "CPA & Business Support",
        // The design links "Accounting support"; feature bodies are plain strings, so no link.
        body: "Accounting support built for CPA firms and growing businesses.",
      },
      {
        icon: "add_chart",
        title: "Data Security",
        body: "Controlled workflows help protect sensitive financial information.",
      },
    ],
    // Same four photos and stats (10+ / 1K+ / 50+ / 98%) as drawn on Home.
    images: home.whyChoose.images,
    stats: home.whyChoose.stats,
  },

  tools: {
    badge: "Software Expertise",
    // COPY FIX: drawn as "Your Audit Tools. Our Expertise." (audit wording on the bookkeeping page).
    title: "Your Accounting Tools. Our Expertise.",
    subtitle:
      "We work with the accounting and audit platforms your team already uses, helping you maintain your existing workflows instead of rebuilding your process around a new system.",
    // The design draws the audit tab list (Accounting Software, Audit Software, Data Analytics &
    // Testing, Confirmation & Documentation, Audit Software again) with the first tab open.
    categories: [
      {
        id: "accounting-software",
        icon: "calculate",
        label: "Accounting Software",
        tools: [
          // COPY FIX: the panel heading is drawn as "Audit Software" and the first chip as
          // "CaseWare Working Papers" with the QuickBooks logo; shown as QuickBooks (the logo, and
          // the docs' main platform).
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
      // NOT IN DESIGN: the other tabs are drawn collapsed with audit labels. Labels and tool names
      // below come from the bookkeeping copy (docs/content/Bookkeeping & Accounting.md); confirm
      // and add logos.
      {
        id: "practice-management",
        icon: "dvr",
        label: "Practice Management", // COPY FIX: drawn "Audit Software"
        tools: [{ name: "Karbon" }, { name: "Canopy" }],
      },
      {
        id: "receipt-expense-capture",
        icon: "analytics",
        label: "Receipt & Expense Capture", // COPY FIX: drawn "Data Analytics & Testing"
        tools: [{ name: "Dext" }, { name: "Hubdoc" }, { name: "Expensify" }],
      },
      {
        // Hidden until tools are provided (no bookkeeping source names any). The fifth drawn tab
        // ("Audit Software" again, magnifier icon) is a duplicate and is left out.
        id: "confirmation-documentation",
        icon: "assignment",
        label: "Confirmation & Documentation",
        tools: [],
      },
    ],
  },

  testimonials: { ...home.testimonials, title: "Trusted by Our Clients" },

  blog: home.blog,

  faq: {
    badge: "FAQ",
    title: "Frequently asked questions",
    // COPY FIX: drawn without the closing period.
    intro: "Find answers to common questions about outsourced accounting and bookkeeping services.",
    // NOT IN DESIGN: the design draws the questions collapsed, without answers. Answers are
    // written only from claims already made on this page and in the bookkeeping copy doc; confirm.
    items: [
      {
        q: "What is outsourced accounting and bookkeeping?",
        a: [
          "Outsourced accounting and bookkeeping means an external team handles your financial work, such as transaction coding, accounts payable and receivable, reconciliations, month-end adjustments, and financial reporting. Xconcile's professionals work with your existing systems and processes as an extension of your team, following US GAAP.",
        ],
      },
      {
        q: "What bookkeeping services do you provide?",
        a: [
          "We cover bookkeeping and ledger maintenance (chart of accounts clean-up and daily transaction processing), accounts payable, accounts receivable, reconciliations and month-end close, and catch-up and clean-up work that brings historical books up to date for taxes or funding.",
        ],
      },
      {
        q: "What outsourced accounting services does Xconcile provide?",
        a: [
          "Alongside accounting and bookkeeping, Xconcile provides ",
          { text: "outsourced tax preparation", href: routes.service("outsourced-tax-preparation") },
          ", ",
          { text: "payroll and compliance", href: routes.service("outsourced-payroll-and-compliance-services") },
          ", ",
          { text: "audit and assurance", href: routes.service("audit-outsourcing-services") },
          ", and ",
          { text: "Virtual CFO and FP&A", href: routes.service("outsourced-virtual-cfo-and-fp-and-a") },
          " services for U.S. businesses and CPA firms.",
        ],
      },
      {
        q: "How much do outsourced bookkeeping services cost in the U.S.?",
        a: [
          "Cost depends on your transaction volume, the number of accounts and entities, the services you need, and whether you need ongoing or catch-up support. Xconcile uses transparent, flat-fee pricing, and firms typically reduce overhead by 40% to 60% compared with local hiring; share your requirements to get a scoped proposal.",
        ],
      },
      {
        q: "How much do outsourced tax preparation services cost?",
        a: [
          "It depends on the number and complexity of returns and how much preparation and review support you need. See our ",
          { text: "outsourced tax preparation", href: routes.service("outsourced-tax-preparation") },
          " page, or share your requirements to get a scoped proposal.",
        ],
      },
      {
        q: "How do I choose the right outsourced accounting provider?",
        a: [
          "Look for U.S. accounting experience and US GAAP expertise, a secure workflow (Xconcile is ISO/IEC 27001:2022 certified), experience with the software you already use such as QuickBooks Online, Xero, or NetSuite, and a review process that checks every deliverable before it reaches you.",
        ],
      },
    ],
  },

  ctaBand: {
    title: "Build the Right Accounting Team for Your Needs",
    body: "Get dedicated accounting professionals matched to your workload, skills, and business requirements.",
    cta: { label: "Talk to an Expert", href: SCHEDULE_HREF },
    // The design draws a plain dark band here; the shared service-page photo is the fallback.
    image: { src: "/images/services/cta-handshake.jpg", alt: "", width: 1500, height: 1000 },
  },
};
