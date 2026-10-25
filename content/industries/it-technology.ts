/**
 * IT & Technology Accounting Services (`/industries/it-technology`, new slug: the live site has
 * no separate IT page).
 *
 * Source (user request 2026-10-25): the Figma design
 * `../pages/industry/it-technology-accounting-services.svg` (rendered to PNG and read visually),
 * on the real-estate page's components as they are (same template, same section order, no extra
 * blocks). The PNG wins where the older `page.css` export
 * (`../pages svg, css & png/it-technology-accounting-services (3)/`) is stale (button labels).
 * The CSS export also has a Security & Data Protection section; it is not drawn in the PNG and
 * the real-estate page has no such component, so it is not used. Editable in Studio → Industry
 * Pages (`industryPage-it-technology`); this file is the fallback and the seed source.
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

export const itTechnology: IndustryPageContent = {
  slug: "it-technology",
  name: "IT & Technology Accounting Services",

  seo: {
    // NOT IN DESIGN (the design has no SEO fields). Rendered as "<title> | Xconcile".
    title: "Outsourced IT & Technology Accounting Services",
    description:
      "Outsourced accounting for IT and technology businesses: bookkeeping, reconciliations, month-end close and financial reporting for SaaS, software and IT firms.",
    // Meta keywords (fallback; Sanity SEO → Meta keywords wins when filled).
    keywords: [
      "IT accounting services",
      "technology accounting services",
      "outsourced bookkeeping for IT companies",
      "SaaS accounting services",
      "software company bookkeeping",
      "tech startup accounting",
      "technology accounting for CPA firms",
      "month-end close for technology companies",
    ],
  },

  hero: {
    // COPY FIX: drawn as "E-commerce Accounting Support" (e-commerce page leftover).
    badge: "IT & Technology Accounting Support",
    title: "Outsourced Accounting for IT & Technology Businesses",
    subtitle:
      "Keep your financial records organized and your accounting work on track with outsourced accounting support built for IT and technology businesses.",
    // Labels from the PNG (the CSS export still says "Get in Touch" on both buttons).
    primaryCta: schedule("Talk to an expert"),
    // Same rule as "Explore our services": scrolls to this page's services grid.
    secondaryCta: { label: "Explore Our Expertise", href: "#expertise" },
    checks: [
      { label: "U.S. Accounting Expertise" },
      { label: "Accurate books & financial reporting" },
      { label: "Flexible outsourced accounting", desktopOnly: true },
    ],
  },

  features: {
    label: "Why work with Xconcile",
    items: [
      { icon: "person_check", title: "Technology Expertise", body: "Accounting built for IT & technology businesses." },
      { icon: "cached", title: "Flexible Support", body: "Flexible support for your business." },
      { icon: "settings", title: "Seamless Workflows", body: "Fits your existing workflow." },
      // COPY FIX: closing period added.
      { icon: "lock", title: "Secure Data Handling", body: "Protecting your financial data." },
    ],
  },

  intro: {
    title: "Accounting Solutions for IT & Technology Businesses",
    // As drawn: two paragraphs, no underlined (linked) words.
    body: [
      "IT and technology businesses have unique accounting needs, from managing revenue and expenses to keeping financial records accurate and up to date. Xconcile provides outsourced accounting solutions for technology companies in the U.S., helping technology businesses and CPA firms manage bookkeeping, reconciliations, financial reporting, and ongoing accounting work within their existing workflows.",
    ] satisfies RichText,
    bodyMore: [
      "Whether you operate a software company, IT services firm, SaaS business, or other technology organization, our team provides consistent accounting support to help keep your financial operations organized.",
    ],
    bodyMoreLayout: "paragraph",
    image: {
      src: "/images/industries/it-technology-intro.jpg",
      alt: "Accountant reviewing paperwork beside stacked binders, a laptop and a monitor showing a bar chart",
      width: 1480,
      height: 986,
    },
    checks: ["Accurate Bookkeeping", "Financial Reporting", "Ongoing Accounting Support"],
    checksStyle: "list",
    cta: { label: "Hire Accounting Staff", href: routes.hireStaff("hire-bookkeeper-accountant") },
  },

  challenges: {
    badge: "Key Challenges",
    title: "Accounting Challenges IT & Technology Businesses Face",
    body: "Technology businesses focus on products, customers, and growth. Managing revenue, software systems, and project costs can make accounting more demanding as they grow.",
    cta: schedule("Let's Discuss Project"), // COPY FIX: drawn as "Lets"
    items: [
      {
        tone: "white",
        icon: "calculate",
        title: "Managing Project-Based Finances",
        body: ["Tracking project costs, revenue, and profitability can become difficult across multiple projects."],
      },
      {
        tone: "white",
        icon: "account_balance",
        title: "Growing Transaction Volume",
        body: ["As the business grows, handling invoices, expenses, payments, and reconciliations can take more time."],
      },
      {
        tone: "white",
        icon: "home",
        title: "Tracking Revenue and Cash Flow",
        body: ["Subscription billing, recurring revenue, and changing project payments can make cash flow harder to manage."],
      },
      {
        tone: "white",
        icon: "9k_plus",
        title: "Accurate Financial Reporting",
        body: ["Maintaining accurate books and timely financial reporting becomes more challenging as operations expand."],
      },
      {
        tone: "white",
        icon: "dictionary",
        title: "Payroll & Contractor Payments",
        body: ["Managing employees, contractors, and payroll requirements can add to the accounting workload."],
      },
    ],
  },

  services: {
    id: "expertise",
    badge: "Expertise",
    // As drawn: no green highlight in this heading.
    title: "IT & Technology Accounting & Bookkeeping Services",
    subtitle: "We help technology businesses with accounting, bookkeeping, and financial reporting.",
    // Six tiles with their own glyphs and lines, as drawn (4 + 2 in the design).
    items: [
      {
        icon: "book_4",
        title: "Bookkeeping for IT Companies",
        body: "Manage daily transactions, accounts payable, accounts receivable, and general ledger activities.",
      },
      {
        icon: "assured_workload",
        title: "Bank & Account Reconciliations",
        body: "Keep bank, credit card, and other accounts reconciled and financial records accurate.",
      },
      {
        icon: "payments",
        title: "Financial Reporting",
        body: "Prepare regular financial reports to help you track revenue, expenses, and overall business performance.",
      },
      {
        icon: "sync_alt",
        title: "Revenue & Expense Tracking",
        body: "Track project revenue, subscriptions, software costs, contractors, payroll, and operating expenses.",
      },
      {
        icon: "event_available",
        title: "Accounts Payable & Receivable",
        body: "Manage vendor bills, customer invoices, payments, and outstanding balances.",
      },
      {
        icon: "add_chart",
        title: "Month-End Close",
        // COPY FIX: closing period added.
        body: "Handle recurring month-end tasks, account reviews, and financial close activities.",
      },
    ],
  },

  subIndustries: {
    badge: "Sub-Industries",
    // COPY FIX: drawn as "Accounting Support Across Professional Services" (professional-services
    // page leftover); the drawn subtitle is about technology businesses.
    title: "Accounting Support Across IT & Technology",
    subtitle: "We provide accounting support for a range of technology and technology-enabled businesses.",
    // Five rows, titles, lines and icons as drawn (the design numbers the fifth row "04"; the
    // component numbers rows itself). Accordion details (the design draws the "+" but no panel):
    // only "SaaS & Software Development" in docs/content/industries/tech-ecommerce.md
    // ("Sub-Industries We Serve") matches a drawn row, so only "SaaS Companies" has `groups`;
    // bold markers dropped. The doc's Focus line ("Recurring Revenue Recognition & Burn Rate
    // Management") is not drawn, so the drawn row line is kept as `body`. The other four rows'
    // details are SAMPLE CONTENT (NOT IN DESIGN; user request 2026-10-25), replace with client copy.
    items: [
      {
        icon: "calculate",
        title: "IT Services Companies",
        body: "Manage project revenue, expenses, payroll, and contractors.",
        // SAMPLE CONTENT (NOT IN DESIGN; user request 2026-10-25 "add sample data").
        groups: [
          {
            title: "Bookkeeping",
            items: [
              "Recording project and managed-services revenue by client",
              "Tracking hardware, software licenses and resale costs",
              "Managing vendor bills from distributors and subcontractors",
              "Monthly bank and credit card reconciliations",
            ],
          },
          {
            title: "Accounting",
            items: [
              "Project profitability by client and contract",
              "Recurring managed-services (MRR) revenue reporting",
              "Work in progress and unbilled revenue tracking",
              "Monthly financial statements and management reports",
            ],
          },
          {
            title: "Payroll",
            items: [
              "Payroll for technicians, engineers and support staff",
              "Tracking billable vs. non-billable hours",
              "Managing contractor (1099) payments",
            ],
          },
          {
            title: "Tax Preparation",
            items: [
              "Sales tax on hardware and taxable IT services by state",
              "Fixed asset and depreciation schedules for equipment",
              "Preparing year-end records for your CPA",
            ],
          },
          {
            title: "Software Stack",
            items: [
              "QuickBooks Online / Xero (Accounting)",
              "ConnectWise / Autotask (PSA)",
              "Gusto / ADP (Payroll)",
            ],
          },
        ],
      },
      {
        icon: "assignment",
        title: "SaaS Companies",
        body: "Track recurring revenue, subscriptions, and operating expenses.",
        groups: [
          {
            title: "Bookkeeping",
            items: [
              "Managing subscription billing and automated recurring revenue",
              "Reconciling monthly recurring revenue (MRR) from Stripe, Chargebee, or Recurly",
              "Tracking deferred revenue for annual prepayments",
              "Automated expense management for cloud services (AWS, Azure, GCP)",
            ],
          },
          {
            title: "Accounting",
            items: [
              "ASC 606 Revenue Recognition for multi-element arrangements",
              "Burn rate analysis and runway calculations",
              "SaaS KPI tracking (LTV, CAC, Churn, Net Revenue Retention)",
              "Departmental P&L (Sales, Engineering, G&A)",
              "Deferred revenue waterfall reporting",
            ],
          },
          {
            title: "Payroll",
            items: [
              "Managing multi-state/global remote teams",
              "Handling stock-based compensation (ESOPs, RSUs, ISO, NSO)",
              "R&D salary allocation for tax credit purposes",
              "Managing contractor (1099) vs. employee (W-2) classification for global teams",
            ],
          },
          {
            title: "Tax Preparation",
            items: [
              "R&D Tax Credits (Form 6765) for qualified research activities",
              "Software capitalization vs. expensing (Section 174)",
              "Sales tax nexus for digital goods and SaaS subscriptions",
              "Multi-state apportionment for software sales",
            ],
          },
          {
            title: "Software Stack",
            items: [
              "NetSuite / Sage Intacct (Accounting & Revenue Recognition)",
              "Chargebee / Maxio / Zuora (Subscription Billing)",
              "Rippling / Carta (Payroll & Equity Management)",
              "QuickBooks Online (Small SaaS)",
            ],
          },
        ],
      },
      {
        icon: "import_contacts",
        title: "Software Companies",
        body: "Get bookkeeping and financial reporting support.",
        // SAMPLE CONTENT (NOT IN DESIGN).
        groups: [
          {
            title: "Bookkeeping",
            items: [
              "Recording license, subscription and implementation revenue",
              "Tracking cloud hosting and third-party software costs",
              "Managing customer invoices and collections",
              "Monthly bank and credit card reconciliations",
            ],
          },
          {
            title: "Accounting",
            items: [
              "Revenue recognition for licenses, support and services",
              "Deferred revenue schedules",
              "Capitalized software development cost tracking",
              "Monthly financial statements and KPI reporting",
            ],
          },
          {
            title: "Payroll",
            items: [
              "Payroll for engineering, sales and support teams",
              "Tracking stock options and equity compensation",
              "R&D salary allocation for tax credit purposes",
            ],
          },
          {
            title: "Tax Preparation",
            items: [
              "R&D tax credit support (Form 6765)",
              "Software development cost treatment (Section 174)",
              "Sales tax on software and digital products by state",
            ],
          },
          {
            title: "Software Stack",
            items: [
              "QuickBooks Online / NetSuite (Accounting)",
              "Stripe / Chargebee (Billing)",
              "Rippling / Gusto (Payroll)",
            ],
          },
        ],
      },
      {
        icon: "import_contacts",
        title: "Technology Consultants",
        body: "Manage invoices, projects, contractors, and expenses.",
        // SAMPLE CONTENT (NOT IN DESIGN).
        groups: [
          {
            title: "Bookkeeping",
            items: [
              "Invoicing clients by project, milestone or retainer",
              "Tracking reimbursable travel and client expenses",
              "Managing accounts receivable and collections",
              "Recording subcontractor and freelancer costs",
            ],
          },
          {
            title: "Accounting",
            items: [
              "Project profitability and margin reporting",
              "Utilization reporting (billable vs. non-billable hours)",
              "Revenue recognition for milestone-based billing",
              "Monthly profit and loss and cash flow reports",
            ],
          },
          {
            title: "Payroll",
            items: [
              "Payroll for consultants and project managers",
              "Contractor (1099) payments and year-end forms",
              "Performance and utilization-based bonuses",
            ],
          },
          {
            title: "Tax Preparation",
            items: [
              "Section 199A (QBI) deduction planning for pass-through firms",
              "Multi-state income tax for consultants working on client sites",
              "Organized year-end records for your CPA",
            ],
          },
          {
            title: "Software Stack",
            items: [
              "QuickBooks Online / Xero (Accounting)",
              "Harvest / Toggl (Time Tracking)",
              "Bill.com (AP Automation)",
            ],
          },
        ],
      },
      {
        icon: "import_contacts",
        title: "Tech Startups",
        body: "Build an organized accounting foundation as you grow.",
        // SAMPLE CONTENT (NOT IN DESIGN).
        groups: [
          {
            title: "Bookkeeping",
            items: [
              "Setting up a chart of accounts built for a tech startup",
              "Recording founder contributions and funding rounds",
              "Tracking SaaS tools, cloud and payroll expenses",
              "Monthly bank and credit card reconciliations",
            ],
          },
          {
            title: "Accounting",
            items: [
              "Burn rate and runway reporting",
              "Investor-ready monthly financial statements",
              "Budget vs. actual reporting",
              "Cap table and SAFE / convertible note tracking",
            ],
          },
          {
            title: "Payroll",
            items: [
              "Running payroll for your first hires",
              "Equity compensation tracking (ISOs, NSOs, RSUs)",
              "Contractor (1099) vs. employee (W-2) classification",
            ],
          },
          {
            title: "Tax Preparation",
            items: [
              "R&D tax credit support, including the payroll tax offset",
              "Delaware franchise tax and annual reports",
              "Qualified Small Business Stock (QSBS) record keeping",
            ],
          },
          {
            title: "Software Stack",
            items: [
              "QuickBooks Online / Xero (Accounting)",
              "Carta / Pulley (Equity Management)",
              "Gusto / Rippling (Payroll)",
              "Ramp / Brex (Expense Management)",
            ],
          },
        ],
      },
    ],
  },

  whyChoose: {
    badge: "Why Choose Us",
    title: "Why IT & Technology Businesses Trust Our Accounting Support",
    // As drawn ("sales channels" reads like an e-commerce leftover; confirm with the client).
    subtitle:
      "Get accounting support designed around your sales channels, financial processes, and business requirements.",
    features: [
      {
        icon: "contextual_token_add",
        title: "Experienced Professionals",
        body: "Work with specialists who understand your accounting needs.",
      },
      { icon: "deployed_code_account", title: "Clear Reporting", body: "Get clear reports on revenue, expenses, profit, and cash." },
      { icon: "contact_phone", title: "Scalable Support", body: "Flexible support that grows with your business and team." },
      { icon: "page_info", title: "Accurate Records", body: "Keep financial records accurate, organized, and up to date." },
      { icon: "add_chart", title: "Smooth Workflows", body: "Keep recurring accounting tasks simple and workflows clear." },
    ],
    // Same four photos as Home (identical assets in the design).
    images: home.whyChoose.images,
    // As drawn: this design's stats differ from Home/real estate/healthcare (1K+, 98%); confirm.
    stats: [
      { value: "10+", label: "Accounting Experience" },
      { value: "21+", label: "Businesses Supported" },
      { value: "50+", label: "Accounting Professionals" },
      { value: "90%", label: "Reconciliation Accuracy" },
    ],
  },

  // Security & Data Protection: only in the older CSS export (blank in the PNG); not used (the
  // real-estate page has no security section since the 2026-10-18 user request).

  faq: {
    badge: "FAQ",
    title: "Frequently asked questions",
    intro: "Find answers to common IT and technology accounting questions.",
    // NOT IN DESIGN: the design draws the questions collapsed, without answers. Each answer only
    // restates claims made elsewhere in this design; confirm.
    items: [
      {
        q: "Why should an IT or technology company outsource its accounting?",
        a: [
          "Outsourcing gives you consistent accounting support without building an in-house accounting team. It helps you keep up with growing transaction volume, project-based finances, and payroll and contractor payments, and the support scales as your business grows.",
        ],
      },
      {
        q: "What accounting services does Xconcile provide for technology businesses?",
        a: [
          "We provide bookkeeping for IT companies, bank and account reconciliations, financial reporting, revenue and expense tracking, accounts payable and receivable, and month-end close, all within your existing workflows.",
        ],
      },
      {
        // COPY FIX: drawn with a leading space.
        q: "Can Xconcile work with U.S.-based IT companies and startups?",
        a: [
          "Yes. We provide outsourced accounting solutions for technology companies in the U.S., from tech startups building an organized accounting foundation to IT services, SaaS, and software companies.",
        ],
      },
      {
        q: "Can CPA firms outsource accounting work for their technology clients?",
        a: [
          "Yes. We help CPA firms manage bookkeeping, reconciliations, financial reporting, and ongoing accounting work for their technology clients within their existing workflows.",
        ],
      },
      {
        q: "How does outsourced accounting help technology companies manage finances?",
        a: [
          "Our team keeps your books accurate and up to date, tracks project revenue, subscriptions, software costs, contractors, payroll, and operating expenses, and prepares regular financial reports so you get a clear view of revenue, expenses, profit, and cash.",
        ],
      },
      {
        q: "What types of technology companies can use outsourced accounting services?",
        a: [
          "We support IT services companies, SaaS companies, software companies, technology consultants, and tech startups, as well as other technology and technology-enabled businesses.",
        ],
      },
      {
        q: "How can I get started with Xconcile's outsourced accounting services?",
        a: [
          "Schedule a call with our team. We'll review your accounting needs, systems, and workload, then recommend the support that fits your technology business.",
        ],
      },
    ],
  },

  ctaBand: {
    title: "Need Accounting Support for Your IT & Technology Business?",
    body: "Keep your books organized, understand your financials, and spend more time building your technology business.",
    // Label from the PNG (the CSS export says "Get in Touch").
    cta: schedule("Get Started Today"),
    // The design draws a flat teal band; the real-estate CTA band component uses a photo, so the
    // same handshake photo is kept (decorative).
    image: { src: "/images/services/cta-handshake.jpg", alt: "", width: 1500, height: 1000 },
  },
};
