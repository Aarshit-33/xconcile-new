/**
 * Professional Services Accounting (`/industries/accounting-outsourcing-professional-services`; was `/industries/professional-services`, which 301s here).
 *
 * Source (user request 2026-10-25): the Figma design
 * `../pages/industry/accounting-outsourcing-professional-services.svg`, on the real-estate
 * page's components as they are (same template, same section order, no extra blocks). The
 * design wins where the older `page.css` export
 * (`../pages svg, css & png/professional-services-accounting-services (3)/`) is stale (button
 * labels, feature strip, Why Choose cards, CTA band). That older export also has a Security &
 * Data Protection section; the current design no longer draws it, and the real-estate page has
 * no such component anyway. Editable in Studio → Industry Pages
 * (`industryPage-professional-services`); this file is the fallback and the seed source.
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

export const professionalServices: IndustryPageContent = {
  // URL renamed by the client 2026-10-28 (was /industries/professional-services, which now 301s here).
  slug: "accounting-outsourcing-professional-services",
  sanityId: "industryPage-professional-services",
  redirectFrom: ["professional-services"],
  name: "Professional Services Accounting",

  seo: {
    // NOT IN DESIGN (the design has no SEO fields). Rendered as "<title> | Xconcile".
    title: "Outsourced Accounting for Professional Services Firms",
    description:
      "Outsourced accounting for professional services firms: bookkeeping, AP/AR, month-end close and reporting for law, insurance, consulting and staffing firms.",
    // Meta keywords (fallback; Sanity SEO → Meta keywords wins when filled).
    keywords: [
      "professional services accounting",
      "outsourced accounting for professional services firms",
      "law firm bookkeeping",
      "insurance agency accounting",
      "consulting firm accounting",
      "staffing agency accounting",
      "professional services bookkeeping for CPA firms",
      "month-end close for professional services",
    ],
  },

  hero: {
    // COPY FIX: drawn with a double space ("Professional Services  Accounting Support").
    badge: "Professional Services Accounting Support",
    // As drawn: the whole heading is white (no green phrase).
    title: "Outsourced Accounting for Professional Services",
    subtitle:
      "Keep your books, reporting, payroll, and other accounting activities organized with flexible support for U.S. professional services firms and CPA firms.",
    // Labels from the design (the CSS export still says "Get in Touch" on both buttons).
    primaryCta: { label: "Talk to an expert", href: routes.contact() },
    // Same rule as "Explore our services": scrolls to this page's services grid.
    secondaryCta: { label: "Explore Our Expertise", href: "#expertise" },
    checks: [
      { label: "U.S. Accounting Expertise" },
      { label: "Experienced Professionals" },
      { label: "Flexible Engagements" },
    ],
  },

  features: {
    label: "Why work with Xconcile",
    items: [
      {
        icon: "person_check",
        title: "Professional Services Expertise",
        body: "Dedicated expertise for your accounting needs.",
      },
      { icon: "cached", title: "Flexible Support", body: "Support that fits your business." },
      { icon: "settings", title: "Existing Workflows", body: "Works with your current systems." },
      { icon: "lock", title: "Secure Data Handling", body: "Safe, secure financial data." },
    ],
  },

  intro: {
    title: "Accounting Support for Professional Service Firms",
    // The design has three paragraphs; the intro block has two, so the first two are joined.
    // No linked/underlined words are drawn in this design.
    body: [
      "Professional service businesses have unique accounting needs. Client billing, project expenses, payroll, subcontractors, revenue recognition, and cash flow can quickly become difficult to manage as your firm grows. Our outsourced accounting team helps you stay on top of your financial operations without the cost and complexity of building a larger in-house accounting department.",
    ] satisfies RichText,
    bodyMore: [
      "We work with you and your team to help you stay organized and current with your financial records, provide timely reports, and help you make better financial decisions every day.",
    ],
    bodyMoreLayout: "paragraph",
    image: {
      src: "/images/industries/professional-services-intro.jpg",
      alt: "Overhead view of business partners shaking hands over a desk with financial charts, a calculator and cash",
      width: 1500,
      height: 1000,
    },
    checks: [
      "U.S.-focused accounting workflows",
      "Dedicated accounting professionals",
      "Flexible engagement options",
    ],
    checksStyle: "list",
    cta: { label: "Hire Accounting Staff", href: routes.contact() },
  },

  challenges: {
    badge: "Key Challenges",
    title: "Common Accounting Challenges for Professional Services",
    body: "Running a professional services firm requires your attention on clients, employees, projects, and growth. Accounting tasks can easily become a distraction.",
    cta: { label: "Let's Discuss Project", href: routes.contact() }, // COPY FIX: drawn as "Lets"
    // Five cards, as drawn.
    items: [
      {
        tone: "white",
        icon: "calculate",
        title: "Inconsistent Bookkeeping",
        body: [
          "Keep transactions categorized and financial records maintained on a regular schedule.",
        ],
      },
      {
        tone: "white",
        icon: "add_chart",
        title: "Delayed Financial Reports",
        body: [
          "Get timely financial information so you can better understand how your business is performing.",
        ],
      },
      {
        tone: "white",
        icon: "assignment",
        title: "Complex Billing & Receivables",
        body: ["Stay organized with invoicing, accounts receivable, and payment tracking."],
      },
      {
        tone: "white",
        icon: "currency_exchange",
        title: "Cash Flow Visibility",
        body: ["Understand what is coming in, what is going out, and where your cash stands."],
      },
      {
        tone: "white",
        icon: "monitoring",
        title: "Growing Accounting Workloads",
        body: [
          "Get additional accounting capacity as your firm adds clients, employees, or locations.",
        ],
      },
    ],
  },

  services: {
    id: "expertise",
    badge: "Expertise",
    // As drawn: no green highlight in this heading.
    title: "Outsourced Accounting & Bookkeeping Services",
    subtitle:
      "We provide flexible outsourced accounting and bookkeeping services designed around the needs of professional services firms.",
    // Eight tiles with their own glyphs and lines, as drawn (the design shows them 4 + 4; the dark
    // 3-column grid of the real-estate page shows them as 3 + 3 + 2). "Month-End Accounting" and
    // "Month-End Close" are both drawn, with near-identical lines; kept as drawn.
    items: [
      {
        icon: "book_4",
        title: "Bookkeeping",
        body: "Keep your financial records current and organized with ongoing transaction recording, account reconciliation, and bookkeeping support.",
      },
      {
        icon: "assured_workload",
        title: "Accounts Payable",
        body: "We help organize vendor bills, payment records, and expense transactions so your payables process remains efficient and easier to monitor.",
      },
      {
        icon: "payments",
        title: "Accounts Receivable",
        body: "Improve visibility into outstanding invoices with organized billing records, receivables tracking, and reporting.",
      },
      {
        icon: "add_chart",
        title: "Financial Reporting",
        body: "Receive timely financial reports that help you understand revenue, expenses, profitability, cash flow, and overall financial performance.",
      },
      {
        icon: "event_available",
        title: "Month-End Accounting",
        body: "A consistent month-end process helps identify discrepancies, reconcile accounts, and prepare reliable financial statements.",
      },
      {
        icon: "person",
        title: "Ongoing Accounting Support",
        // COPY FIX: drawn starting lowercase ("accounting needs can change…").
        body: "Accounting needs can change as your business grows. Our services can adapt to your requirements.",
      },
      {
        icon: "calendar_lock",
        title: "Month-End Close",
        body: "Create a consistent month-end process to review accounts and prepare accurate financial statements.",
      },
      {
        icon: "mop",
        title: "Catch-Up & Cleanup",
        body: "Update outdated or messy books so you can move forward with reliable financial data.",
      },
    ],
  },

  subIndustries: {
    badge: "Sub-Industries",
    title: "Accounting Support Across Professional Services",
    subtitle:
      "Different professional services businesses have different billing, payroll, expense, and reporting requirements. Our support can be structured around your existing accounting processes.",
    // All four rows are drawn (titles, focus lines, icons; rows 3 and 4 share the same book glyph
    // in the design). No "Show more" button in this design. Accordion details:
    // docs/content/industries/professional-services.md ("Sub-Industries We Serve"), bold markers
    // dropped.
    items: [
      {
        icon: "gavel",
        title: "Law Firms & Legal Services",
        body: "IOLTA Compliance and Matter-Based Accounting",
        groups: [
          {
            title: "Bookkeeping",
            items: [
              // COPY FIX: colon added after the lead-in (the doc has none on this bullet only).
              "Trust Accounting (IOLTA): Maintaining separate ledgers for client funds to ensure no co-mingling with firm operating funds",
              'Matter Cost Tracking: Recording "Hard Costs" (filing fees, court reporters) and "Soft Costs" (copies, postage) billable to clients',
              "Managing retainer advances and client deposits",
              "Recording billable vs. non-billable time",
            ],
          },
          {
            title: "Accounting",
            items: [
              "Three-Way Reconciliation: Monthly matching of bank statement, book balance, and individual client trust ledgers (mandatory in most US states)",
              "Realization Rate Analysis: Comparing time recorded vs. amount actually collected",
              "Partner compensation calculations (origination, management, production credits)",
              "Tracking WIP (Work in Progress) by matter and attorney",
            ],
          },
          {
            title: "Payroll",
            items: [
              "Managing partner draws vs. associate salaries",
              "Processing 1099s for expert witnesses and contract attorneys",
              "Handling performance bonuses for paralegals and legal assistants",
            ],
          },
          {
            title: "Tax Preparation",
            items: [
              "Managing Section 199A (QBI) deductions for pass-through law firms",
              "Specialized treatment of advanced client costs (some deductible, some loans)",
              "Multi-state income tax for attorneys licensed in multiple states",
            ],
          },
          {
            title: "Software Stack",
            items: [
              "Clio / LeanLaw / CosmoLex (Legal Practice Management)",
              "QuickBooks Online (Legal Edition) / PCLaw (Legal Accounting)",
              "Soluno / TimeSolv (Time & Billing)",
            ],
          },
        ],
      },
      {
        icon: "encrypted",
        title: "Insurance Agencies & Brokerages",
        body: "Commission Reconciliation and Fiduciary Duties",
        groups: [
          {
            title: "Bookkeeping",
            items: [
              'Premium Trust Accounting: Tracking "Agency Bill" premiums that must be remitted to carriers',
              "Commission Reconciliation: Matching monthly carrier commission statements against internal AMS records",
              "Managing E&O (Errors & Omissions) insurance payments",
            ],
          },
          {
            title: "Accounting",
            items: [
              'Revenue Recognition: Tracking "Direct Bill" commissions vs. "Agency Bill" earnings',
              "EBITDA Analysis: Monitoring the valuation of the agency for potential M&A or internal buyouts",
              "Managing commission splits and overrides",
            ],
          },
          {
            title: "Payroll",
            items: [
              "Managing complex commission splits between the house and independent producers",
              "Tracking draw-against-commission for new agents",
              "Processing renewal commission residuals",
            ],
          },
          {
            title: "Tax Preparation",
            items: [
              'Managing amortization of "Purchased Intangibles" (if the agency bought a book of business)',
              "Multi-state nexus for licensed brokers writing business in multiple states",
              "1099-MISC reporting for independent insurance agents",
            ],
          },
          {
            title: "Software Stack",
            items: [
              "Vertafore (AMS360) / Applied Epic / EZLynx (Agency Management System)",
              "QuickBooks Online / Xero (Accounting)",
              "ADP / Gusto (Payroll)",
            ],
          },
        ],
      },
      {
        icon: "add_chart",
        title: "Management & Business Consulting",
        body: "Project Profitability and Utilization Reporting",
        groups: [
          {
            title: "Bookkeeping",
            items: [
              "Managing client retainers and deferred revenue",
              "Tracking reimbursable travel and meal expenses via Expensify/Concur",
              "Recording project-based expenses and allocating overhead",
            ],
          },
          {
            title: "Accounting",
            items: [
              "Utilization Reporting: Measuring how many hours consultants spend on client work vs. internal business development",
              "Project Margin Analysis: Calculating the true profit of a project after accounting for labor costs and overhead",
              "Managing revenue recognition for milestone-based billing",
            ],
          },
          {
            title: "Payroll",
            items: [
              "Managing performance-based year-end bonuses",
              "Multi-state withholding for consultants traveling to client sites",
              "Processing per-diem reimbursements for travel",
            ],
          },
          {
            title: "Tax Preparation",
            items: [
              "Managing home office deductions for remote consultants",
              "Tracking business meals and entertainment (M&E) limitations (50% deductible)",
              "Section 199A (QBI) deduction planning",
            ],
          },
          {
            title: "Software Stack",
            items: [
              "Harvest / Toggl (Time Tracking)",
              "Mavenlink (Kantata) / BigTime (Professional Services Automation)",
              "Xero / QuickBooks (Accounting)",
              "Bill.com (AP Automation)",
            ],
          },
        ],
      },
      {
        icon: "groups_2",
        title: "Staffing & Recruitment Agencies",
        body: "High-Volume Payroll and Cash Flow Management",
        groups: [
          {
            title: "Bookkeeping",
            items: [
              "Managing high-volume Accounts Receivable (A/R) from client companies",
              "Reconciling temporary staff timesheets daily or weekly",
              "Tracking recruiter placement fees (direct hire vs. contract-to-hire)",
            ],
          },
          {
            title: "Accounting",
            items: [
              "Funding & Factoring Reconciliation: Managing cash flow if using payroll funding or factoring companies",
              "Burden Analysis: Calculating the true cost of an employee (Salary + Taxes + Insurance + Benefits + Workers Comp)",
              "Managing bill rate vs. pay rate spreads (gross margin analysis)",
            ],
          },
          {
            title: "Payroll",
            items: [
              'The Core Task: Weekly or bi-weekly payroll for hundreds of "temp" employees',
              "Handling garnishments, multi-state taxes, and benefits administration",
              "Managing on-hire and off-hire processes efficiently",
            ],
          },
          {
            title: "Tax Preparation",
            items: [
              "Work Opportunity Tax Credit (WOTC) tracking for eligible hires",
              "Managing federal and state unemployment tax (FUTA/SUTA) rates",
              "Processing bulk 1099-NEC for independent contractors",
            ],
          },
          {
            title: "Software Stack",
            items: [
              "Bullhorn / Avionté / JobDiva (Staffing Software)",
              "Gusto / ADP SmartCompliance (Payroll)",
              "QuickBooks Online (Accounting)",
              "Fundbox / BlueVine (Factoring/Cash Flow)",
            ],
          },
        ],
      },
    ],
  },

  whyChoose: {
    badge: "Why Choose Us",
    title: "Why Professional Service Firms Choose Outsourced Accounting",
    subtitle:
      "Get accounting support that fits your existing processes, workload, and business requirements.",
    // Titles and lines from the design (the CSS export has an older set of five cards).
    features: [
      {
        icon: "deployed_code_account",
        title: "Experienced Professionals",
        body: "Work with professionals experienced in accounting and financial activities.",
      },
      {
        icon: "deployed_code_account",
        title: "U.S. Accounting Expertise",
        body: "Get support aligned with U.S. businesses and accounting workflows.",
      },
      {
        icon: "contact_phone",
        title: "Financial Records",
        body: "Keep your books, reconciliations, and financial information organized.",
      },
      {
        icon: "page_info",
        title: "Flexible Support",
        body: "Choose a support model based on your accounting requirements.",
      },
      {
        icon: "add_chart",
        title: "Scalable Capacity",
        body: "Adjust your accounting support as your workload changes.",
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

  // Security & Data Protection: only in the older CSS export, not drawn in the current design
  // (and the real-estate page has no security section since the 2026-10-18 user request).

  faq: {
    badge: "FAQ",
    title: "Frequently asked questions",
    intro: "Find answers to common professional services accounting questions.",
    // NOT IN DESIGN: the design draws the questions collapsed, without answers. Each answer only
    // restates claims made elsewhere in this design; confirm.
    items: [
      {
        q: "What is outsourced accounting for professional services firms?",
        a: [
          "An outsourced accounting team handles your bookkeeping, accounts payable and receivable, month-end close, and financial reporting, so you stay on top of your financial operations without the cost and complexity of building a larger in-house accounting department.",
        ],
      },
      {
        q: "Which professional services businesses can outsource accounting?",
        a: [
          "We support law firms and legal services, insurance agencies and brokerages, management and business consulting firms, and staffing and recruitment agencies, as well as CPA firms that serve professional services clients.",
        ],
      },
      {
        q: "What is the difference between bookkeeping and outsourced accounting?",
        a: [
          "Bookkeeping keeps your financial records current through ongoing transaction recording and account reconciliation. Outsourced accounting builds on it with accounts payable and receivable support, a consistent month-end close, and timely financial reports that help you understand revenue, expenses, profitability, and cash flow.",
        ],
      },
      {
        q: "Can you work with our existing accounting software?",
        a: [
          "Yes. Our team works with your current systems, and our support can be structured around your existing accounting processes.",
        ],
      },
      {
        q: "Can outsourced accounting help a growing professional services firm?",
        a: [
          "Yes. As your firm adds clients, employees, or locations, you get additional accounting capacity and can adjust your support as your workload changes.",
        ],
      },
    ],
  },

  ctaBand: {
    title: "Need Accounting Support for Your Professional Services Firm?",
    body: "Get flexible accounting, bookkeeping, payroll, and tax support from professionals who can work with your existing processes.",
    cta: schedule("Get Accounting Support"),
    // The design draws a flat teal band; the real-estate CTA band component uses a photo, so the
    // same handshake photo is kept (decorative).
    image: { src: "/images/services/cta-handshake.jpg", alt: "", width: 1500, height: 1000 },
  },
};
