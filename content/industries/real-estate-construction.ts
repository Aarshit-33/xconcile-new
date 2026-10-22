/**
 * Real Estate Accounting Services (`/industries/real-estate-construction`, live slug kept).
 *
 * Source (decision 2026-10-14): only the Figma design
 * `../pages svg, css & png/real-estate-accounting-services (main) (3)/page.svg`. No Sanity.
 * The SVG wins where its `page.css` export is stale (button labels, Why Choose features,
 * the sub-industry rows and the services grid are placeholders in the CSS).
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

export const realEstateConstruction: IndustryPageContent = {
  slug: "real-estate-construction",
  name: "Real Estate Accounting Services",

  seo: {
    // NOT IN DESIGN (the design has no SEO fields). Rendered as "<title> | Xconcile".
    title: "Outsourced Real Estate Accounting Services",
    description:
      "Outsourced accounting for real estate: bookkeeping, property accounting, reconciliations and financial reporting for CPA firms, property managers and investors.",
    // Meta keywords (fallback; Sanity SEO → Meta keywords wins when filled).
    keywords: [
      "real estate accounting services",
      "outsourced real estate bookkeeping",
      "property management accounting",
      "construction accounting services",
      "real estate accounting for CPA firms",
      "property accounting outsourcing",
      "real estate investor accounting",
      "job costing and WIP reporting",
    ],
  },

  hero: {
    badge: "Real Estate Accounting Support",
    title: { before: "Outsourced Accounting Services for Real Estate" },
    subtitle:
      "Support your real estate clients with bookkeeping, property accounting, reconciliations, financial reporting, and ongoing accounting support through your existing systems.",
    primaryCta: schedule("Talk to an expert"),
    // Same rule as "Explore our services": scrolls to this page's services grid.
    secondaryCta: { label: "Explore Our Expertise", href: "#expertise" },
    checks: [
      { label: "U.S. CPA & Accounting Firms" },
      { label: "Property Management Companies" },
      { label: "Real Estate Investors", desktopOnly: true },
    ],
  },

  features: {
    label: "Why work with Xconcile",
    items: [
      { icon: "person_check", title: "Experienced", body: "Skilled accounting support" },
      { icon: "cached", title: "Flexible Support", body: "Support that fits your needs" },
      { icon: "settings", title: "Existing Workflows", body: "Works with your current systems" },
      { icon: "lock", title: "Secure Data Handling", body: "Your financial data is protected" },
    ],
  },

  intro: {
    title: "Accounting Expertise for Real Estate Businesses",
    body: [
      "Real estate businesses often manage complex ",
      { text: "accounting and bookkeeping", href: routes.service("outsourced-accounting-and-bookkeeping") },
      " across multiple properties, entities, transactions, vendors, and financial accounts. Handling these responsibilities in-house can increase your team's workload and make it harder to keep financial records organized.",
    ] satisfies RichText,
    bodyMore: [
      // COPY FIX: drawn as "help with our recurring accounting tasks".
      "Xconcile provides outsourced real estate accounting support based on your existing processes and systems. Our team can help with your recurring accounting tasks, maintain accurate financial records, and provide the accounting support your team needs to keep day-to-day financial operations running smoothly.",
    ],
    bodyMoreLayout: "paragraph",
    image: {
      src: "/images/industries/real-estate-intro.jpg",
      alt: "Accountant writing in a ledger beside a laptop and model houses",
      width: 2048,
      height: 1152,
    },
    checks: ["Dedicated Resources", "US Accounting Experience", "Flexible Support"],
    checksStyle: "list",
    cta: { label: "Hire Accounting Staff", href: routes.hireStaff("hire-bookkeeper-accountant") },
  },

  challenges: {
    badge: "Key Challenges",
    title: "Common Real Estate Accounting Challenges",
    // COPY FIX: drawn sentence stops at "can work within"; completed with the page's own phrase.
    body: "Add experienced accounting capacity without the time and overhead of building an in-house team. A dedicated accounting professional can work within your existing systems.",
    cta: schedule("Let's Discuss Project"), // COPY FIX: drawn as "Lets"
    items: [
      {
        tone: "white",
        icon: "calculate",
        title: "Property-Level Accounting",
        // COPY FIX: closing period added (also on "Lease & CAM Accounting").
        body: ["Managing income, expenses, assets, liabilities, and financial activity across individual properties requires organized property-level records."],
      },
      {
        tone: "white",
        icon: "account_balance",
        title: "Bank & Account Reconciliations",
        body: ["Regular reconciliation is needed to identify missing transactions, duplicate entries, and differences between accounting records and bank statements."],
      },
      {
        tone: "white",
        icon: "home",
        title: "Manage More Properties",
        body: ["Managing financial information across multiple properties, entities, and ownership structures can make data collection, consolidation, and reporting more complex."],
      },
      {
        tone: "white",
        icon: "9k_plus",
        title: "Lease & CAM Accounting",
        body: ["Commercial properties can involve different lease terms, operating-expense allocations, CAM charges, and year-end reconciliations."],
      },
      {
        tone: "white",
        icon: "dictionary",
        title: "Manual Accounting Workloads",
        body: ["Spreadsheets and fragmented processes can increase manual work around reconciliations, reporting, and financial data management as portfolios become more complex."],
      },
    ],
  },

  services: {
    id: "expertise",
    badge: "Expertise",
    title: { before: "Our", highlight: "Real Estate", after: "Accounting Services" },
    subtitle:
      "Get dedicated accounting support for your real estate clients that fits your existing systems, processes, and reporting needs.",
    // The design draws the same book_4 glyph on every tile.
    // NOT IN DESIGN: `body` lines are placeholder copy added for the scroll reveal (client
    // request 2026-10-14); replace with approved text.
    items: [
      {
        icon: "book_4",
        title: "Real Estate Bookkeeping",
        body: "Accurate books across properties, entities, and transactions.",
      },
      {
        icon: "book_4",
        title: "Property Accounting",
        body: "Property-level income, expenses, and records kept organized.",
      },
      {
        icon: "book_4",
        title: "Accounts Payable",
        body: "Vendor bills and property expenses recorded and tracked on time.",
      },
      {
        icon: "book_4",
        title: "Accounts Receivable",
        body: "Rent, tenant charges, and receivables monitored and reconciled.",
      },
      {
        icon: "book_4",
        title: "Ledger Management",
        body: "General ledgers maintained and reconciled for every entity.",
      },
      {
        icon: "book_4",
        title: "Month-End Close",
        body: "Adjustments and reviews that close every month on schedule.",
      },
    ],
  },

  subIndustries: {
    badge: "Sub-Industries",
    title: "Accounting Expertise Across Real Estate",
    subtitle:
      "Our accounting support can be structured around the financial and reporting requirements of different real estate businesses.",
    // Accordion details (user request 2026-10-18; the design draws the "+" but no panel): copy
    // from docs/content/industries/real-estate-construction.md ("Sub-Industries We Serve"),
    // whose "Focus" lines are the drawn row lines. Bold markers dropped.
    items: [
      {
        icon: "calculate",
        title: "Real Estate Development & Investment",
        body: "Capitalization, Fund Accounting, and Investor Reporting",
        groups: [
          {
            title: "Bookkeeping",
            items: [
              "Tracking land acquisition costs and development expenses",
              "Managing accounts payable for architects, surveyors, and consultants",
              "Reconciling construction loan draws and monitoring budgets vs. actuals",
              "Recording equity contributions and investor capital calls",
            ],
          },
          {
            title: "Accounting",
            items: [
              "Capitalization of interest and soft costs during development",
              "Tracking equity contributions vs. debt financing",
              "Consolidated reporting for multi-entity SPVs (Special Purpose Vehicles)",
              "Managing waterfall distributions to investors",
            ],
          },
          {
            title: "Payroll",
            items: [
              "Managing high-level executive payroll",
              "Performance-based acquisition bonuses",
              "Processing consultant and advisory fees",
            ],
          },
          {
            title: "Tax Preparation",
            items: [
              "Managing K-1 distributions for partnership interests",
              "1031 Exchange tracking for like-kind property swaps",
              "Depreciation of \"Qualified Improvement Property\" (QIP)",
              "Cost segregation studies for accelerated depreciation",
            ],
          },
          {
            title: "Software Stack",
            items: [
              "Sage Intacct / QuickBooks (Accounting)",
              "Juniper Square / Covercy (Investor Relations & Fund Management)",
              "MRI Software / Yardi (Real Estate Management)",
              "Procore (Construction Management)",
            ],
          },
        ],
      },
      {
        icon: "assignment",
        title: "Property Management Companies",
        body: "Escrow Compliance and Tenant Ledgers",
        groups: [
          {
            title: "Bookkeeping",
            items: [
              "Recording monthly rent payments and managing tenant ledgers",
              "Reconciling Security Deposit (Escrow) accounts to meet state regulations",
              "Tracking late fees, NSF fees, and lease violation charges",
              "Managing owner distributions and reserve funds",
            ],
          },
          {
            title: "Accounting",
            items: [
              "CAM (Common Area Maintenance) reconciliations and true-ups for commercial properties",
              "Property-wise P&L statements for multi-property portfolios",
              "Managing delinquency reports and collections",
              "Tracking operating expenses by property and unit",
            ],
          },
          {
            title: "Payroll",
            items: [
              "Processing commissions for leasing agents",
              "Payroll for on-site maintenance and janitorial staff",
              "Managing property manager performance bonuses",
            ],
          },
          {
            title: "Tax Preparation",
            items: [
              "Tracking Form 1099-NEC for all repair contractors and service providers",
              "Managing state-specific property tax filings",
              "Processing owner K-1s for partnership-owned properties",
              "Handling rental income reporting across multiple states",
            ],
          },
          {
            title: "Software Stack",
            items: [
              "AppFolio / Buildium / Yardi / Entrata (Property Management)",
              "QuickBooks Online / Sage Intacct (Accounting)",
              "Gusto / ADP (Payroll)",
            ],
          },
        ],
      },
      {
        icon: "import_contacts",
        title: "Construction & General Contracting",
        body: "Job Costing and Progress Billing",
        groups: [
          {
            title: "Bookkeeping",
            items: [
              "Managing lien waivers from subcontractors",
              "Tracking credit card receipts from job sites",
              "Recording material purchases by Job ID",
              "Managing retention receivables and payables",
            ],
          },
          {
            title: "Accounting",
            items: [
              "Job costing: tracking labor, materials, subcontractors, and overhead by project",
              "WIP (Work-in-Progress) reporting to identify over-billings and under-billings",
              "AIA progress billing (G702/G703 forms)",
              "Managing contract revenue recognition (percentage of completion method)",
            ],
          },
          {
            title: "Payroll",
            items: [
              "Certified payroll (WH-347) for government projects",
              "Prevailing wage compliance tracking",
              "Workers' Compensation class code assignment by job type",
              "Union payroll and fringe benefit reporting",
            ],
          },
          {
            title: "Tax Preparation",
            items: [
              "Percentage of Completion Method (PCM) for long-term contracts",
              "Section 179 deductions for heavy machinery and equipment",
              "Multi-state income tax allocation for out-of-state projects",
              "Managing 1099-NEC for subcontractors",
            ],
          },
          {
            title: "Software Stack",
            items: [
              "Foundation / Sage 100/300 CRE (Construction Accounting)",
              "CoConstruct / Buildertrend (Residential Construction)",
              "Procore (Project Management)",
              "QuickBooks Desktop Enterprise (Contractor Edition)",
            ],
          },
        ],
      },
      {
        icon: "add_chart",
        title: "Architecture & Engineering (A&E) Firms",
        body: "Billable Utilization and Project Profitability",
        groups: [
          {
            title: "Bookkeeping",
            items: [
              "Tracking reimbursable expenses (blueprints, travel, consultant fees)",
              "Managing consultant and subconsultant payables",
              "Tracking timesheets by project phase and task code",
              "Recording retainers and billing milestones",
            ],
          },
          {
            title: "Accounting",
            items: [
              "Utilization rate reporting (billable vs. non-billable hours)",
              "Revenue recognition based on project milestones or percentage of completion",
              "Overhead rate calculation and FAR (Federal Acquisition Regulation) compliance",
              "Project profitability analysis comparing budgeted vs. actual costs",
            ],
          },
          {
            title: "Payroll",
            items: [
              "Professional salary management for architects and engineers",
              "Tracking overtime for non-exempt drafters and technicians",
              "Managing PTO accrual and project time allocation",
            ],
          },
          {
            title: "Tax Preparation",
            items: [
              "R&D Tax Credits (Form 6765) for innovative design solutions",
              "Section 179D energy-efficient commercial building deductions",
              "Managing professional liability insurance deductions",
              "Multi-state income tax for projects in various states",
            ],
          },
          {
            title: "Software Stack",
            items: [
              "Deltek Ajera / Vantagepoint (A&E Project Accounting)",
              "BQE CORE (Professional Services Accounting)",
              "Harvest / Toggl (Time Tracking)",
              "QuickBooks Online / Xero (Accounting)",
            ],
          },
        ],
      },
      {
        icon: "sync",
        title: "Interior Design & Home Staging",
        body: "Inventory Tracking and Sales Tax Management",
        groups: [
          {
            title: "Bookkeeping",
            items: [
              "Managing client retainers and deposits",
              "Tracking purchase orders for furniture and fixtures (FF&E)",
              "Reconciling designer discounts and vendor trade accounts",
              "Recording consignment furniture sales and commissions",
            ],
          },
          {
            title: "Accounting",
            items: [
              "Inventory management for staging furniture and accessories",
              "Project profitability analysis by client engagement",
              "Tracking \"Work in Process\" for custom furniture orders",
              "Managing client invoicing for design services vs. product sales",
            ],
          },
          {
            title: "Payroll",
            items: [
              "Payroll for design assistants and staging crews",
              "Managing 1099s for freelance photographers and sub-contractors",
              "Commission structures for lead designers",
            ],
          },
          {
            title: "Tax Preparation",
            items: [
              "Sales tax nexus tracking (collecting tax on physical goods vs. design services)",
              "Resale certificate management for trade purchases",
              "Managing home office deductions for independent designers",
              "1099-NEC reporting for contractor relationships",
            ],
          },
          {
            title: "Software Stack",
            items: [
              "Ivy (by Houzz) / Studio Designer / DesignFiles (Interior Design Software)",
              "Xero / QuickBooks Online (Accounting)",
              "Gusto (Payroll)",
              "Avalara (Sales Tax)",
            ],
          },
        ],
      },
    ],
  },

  whyChoose: {
    badge: "Why Choose Us",
    // COPY FIX: drawn as "Why Healthcare Businesses Choose Conxicle for Accounting Support"
    // (healthcare page leftover + brand typo).
    title: "Why Real Estate Businesses Choose Xconcile for Accounting Support",
    subtitle:
      "Build a stronger accounting function with experienced professionals who understand U.S. business requirements, accounting workflows, and day-to-day financial operations.",
    features: [
      {
        icon: "contextual_token_add",
        title: "Experienced Professionals",
        body: "Skilled professionals for bookkeeping and financial reporting.",
      },
      {
        icon: "deployed_code_account",
        title: "U.S. Accounting Expertise",
        body: "Support aligned with U.S. accounting practices and workflows.",
      },
      { icon: "contact_phone", title: "Financial Records", body: "Keep financial records accurate, organized, and up to date." },
      { icon: "page_info", title: "Flexible Support", body: "Choose support that fits your accounting needs and workload." },
      { icon: "add_chart", title: "Scalable Capacity", body: "Add accounting capacity as your business needs continue to grow." },
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

  // Security & Data Protection: removed from the page (user request 2026-10-18).

  faq: {
    badge: "FAQ",
    title: "Frequently asked questions",
    intro: ["Still have Questions?", "Drop us a message and we’ll get back to you"],
    // NOT IN DESIGN: the design draws the questions collapsed, without answers. Each answer
    // only restates claims made elsewhere on this page; confirm.
    items: [
      {
        q: "What accounting services does Xconcile provide for real estate businesses?",
        a: [
          "Xconcile supports real estate bookkeeping, property accounting, accounts payable and receivable, ledger management, month-end close, reconciliations, and financial reporting, all within your existing systems and processes.",
        ],
      },
      {
        q: "Can Xconcile handle accounting for multiple real estate properties?",
        a: [
          "Yes. We keep organized property-level records and manage financial information across multiple properties, entities, and ownership structures, which makes data collection, consolidation, and reporting easier.",
        ],
      },
      {
        q: "Does Xconcile provide real estate bookkeeping services?",
        a: [
          "Yes. Real estate bookkeeping is one of our core services, alongside property accounting, ledger management, and month-end close, so your financial records stay accurate, organized, and up to date.",
        ],
      },
      {
        q: "Can Xconcile work with my CPA or accounting firm?",
        a: [
          "Yes. We support U.S. CPA and accounting firms with their real estate clients, working behind the scenes within the firm's existing systems, processes, and reporting needs.",
        ],
      },
      {
        q: "How can outsourced accounting help my real estate business?",
        a: [
          "Outsourcing adds experienced accounting capacity without the time and overhead of building an in-house team. It reduces manual work around reconciliations and reporting, keeps records organized, and scales as your portfolio grows.",
        ],
      },
      {
        q: "Can Xconcile help with account reconciliation?",
        a: [
          "Yes. We perform regular bank and account reconciliations to identify missing transactions, duplicate entries, and differences between your accounting records and bank statements.",
        ],
      },
      {
        q: "How does Xconcile protect sensitive financial information?",
        a: [
          "We follow defined processes for secure data handling: an NDA is signed before any data access, only assigned team members can access your files, data is transferred with controlled access, and your financial data is never sold or shared with outside parties. Xconcile is ISO 27001 certified.",
        ],
      },
    ],
  },

  ctaBand: {
    title: "Looking for a Reliable Real Estate Accounting Partner?",
    body: "Let's discuss how we can support your CPA or accounting firm.",
    cta: schedule("Talk to Our Team"),
    // Same handshake photo as the audit page (identical asset in the design).
    image: { src: "/images/services/cta-handshake.jpg", alt: "", width: 1500, height: 1000 },
  },
};
