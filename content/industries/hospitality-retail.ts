/**
 * Hospitality Accounting Services (`/industries/hospitality-retail`, live slug kept).
 *
 * Source (user request 2026-10-25): the Figma design
 * `../pages/industry/hospitality-accounting-services.svg` (read from its full-page PNG render),
 * on the real-estate page's components as they are (same template, same section order, no extra
 * blocks). The render wins where the older `page.css` export
 * (`hospitality-accounting-services (3)`) is stale: Why Choose copy, services tile titles, and a
 * Security & Data Protection section that the current design no longer draws. Editable in
 * Studio → Industry Pages (`industryPage-hospitality-retail`); this file is the fallback and the
 * seed source.
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

export const hospitalityRetail: IndustryPageContent = {
  slug: "hospitality-retail",
  name: "Hospitality Accounting Services",

  seo: {
    // NOT IN DESIGN (the design has no SEO fields). Rendered as "<title> | Xconcile".
    title: "Outsourced Hospitality Accounting Services",
    description:
      "Outsourced hospitality accounting: bookkeeping, reconciliations, payroll support and financial reporting for hotels, restaurants, resorts and franchises.",
    // Meta keywords (fallback; Sanity SEO → Meta keywords wins when filled).
    keywords: [
      "hospitality accounting services",
      "outsourced hospitality bookkeeping",
      "hotel accounting services",
      "restaurant bookkeeping services",
      "hospitality accounting for CPA firms",
      "franchise accounting services",
      "daily sales reconciliation",
      "hospitality financial reporting",
    ],
  },

  hero: {
    badge: "Hospitality Accounting Support",
    // As drawn: no green highlight in the hero heading.
    title: "Outsourced Hospitality Accounting & Bookkeeping Services",
    subtitle:
      "Keep your hospitality business financially organized with reliable accounting and bookkeeping support. We help hotels, restaurants, resorts, and other hospitality businesses maintain accurate books and track financial performance.",
    primaryCta: schedule("Talk to an expert"),
    // Same rule as "Explore our services": scrolls to this page's services grid.
    secondaryCta: { label: "Explore Our Expertise", href: "#expertise" },
    // The design draws two checks only (no third, desktop-only one).
    checks: [{ label: "Hospitality specialists" }, { label: "Dedicated accounting team" }],
  },

  features: {
    label: "Why work with Xconcile",
    items: [
      // COPY FIX: drawn as "Healthcare Expertise" (left over from the healthcare page).
      { icon: "person_check", title: "Hospitality Expertise", body: "Accounting support for hospitality businesses." },
      { icon: "cached", title: "Flexible Support", body: "Support that fits your business needs." },
      { icon: "settings", title: "Existing Workflows", body: "Works with your current systems." },
      { icon: "lock", title: "Secure Data Handling", body: "Protecting your financial data." },
    ],
  },

  intro: {
    title: "Dedicated Accounting Support for Hospitality Businesses",
    body: [
      "Hospitality businesses manage high transaction volumes, changing revenue, payroll, vendor payments, and seasonal fluctuations. As business activity changes, keeping financial records and payroll organized can become more demanding.",
    ] satisfies RichText,
    bodyMore: [
      { text: "Outsourced payroll services", href: routes.service("outsourced-payroll-and-compliance-services") },
      " give hospitality businesses added support with payroll processing, records, reporting, and ongoing payroll requirements.",
    ] satisfies RichText,
    bodyMoreLayout: "paragraph",
    image: {
      src: "/images/industries/hospitality-intro.jpg",
      alt: "Two accountants reviewing financial charts with a calculator, notebooks and a pen",
      width: 1500,
      height: 1000,
    },
    checks: ["Hospitality-focused expertise", "Monthly financial reporting", "Dedicated accounting support"],
    checksStyle: "list",
    cta: { label: "Hire Accounting Staff", href: routes.hireStaff("hire-bookkeeper-accountant") },
  },

  challenges: {
    badge: "Key Challenges",
    title: "Common Financial Challenges for Hospitality Businesses",
    // As drawn: the sentence ends with a colon and leads into the cards.
    body: "Managing hospitality finances can be complex. Hotels, restaurants, resorts, and other hospitality businesses often need to manage:",
    cta: schedule("Let's Discuss Project"), // COPY FIX: drawn as "Lets"
    items: [
      {
        tone: "white",
        icon: "calculate",
        title: "High Transaction Volume",
        body: ["Managing sales and payments from multiple sources can quickly become difficult."],
      },
      {
        tone: "white",
        icon: "account_balance",
        title: "Daily Sales Reconciliation",
        body: ["Making sure daily sales and payment records match helps keep your books accurate."],
      },
      {
        tone: "white",
        icon: "home",
        title: "Payroll & Labor Costs",
        body: ["Tracking wages, staff expenses, and payroll records can take time and attention."],
      },
      {
        tone: "white",
        icon: "9k_plus",
        title: "Vendor Bills & Payments",
        body: ["Keeping up with invoices and vendor payments helps prevent missed or overdue bills."],
      },
      {
        tone: "white",
        icon: "dictionary",
        title: "Monthly Financial Reporting",
        body: ["Clear, up-to-date reports give you a better view of your business's financial performance."],
      },
    ],
  },

  services: {
    id: "expertise",
    badge: "Expertise",
    // As drawn: "Accounting & Bookkeeping" is green.
    title: "Hospitality *Accounting & Bookkeeping* Services",
    subtitle: "We offer accounting support to meet the needs of hospitality businesses.",
    // Six tiles, as drawn (3 + 3), all with the same book_4 glyph and no body line.
    items: [
      { icon: "book_4", title: "Daily Bookkeeping" },
      { icon: "book_4", title: "Accounts Payable & Receivable" },
      { icon: "book_4", title: "Bank & Credit Card Reconciliations" },
      { icon: "book_4", title: "Payroll Accounting Support" },
      { icon: "book_4", title: "Revenue & Expense Tracking" },
      { icon: "book_4", title: "Financial Statement Preparation" },
    ],
  },

  subIndustries: {
    badge: "Sub-Industries",
    title: "Types of Hospitality Businesses We Support",
    subtitle: "Our accounting support can be tailored to different hospitality business models, including:",
    // Rows 1–3 are drawn (titles, focus lines, icons) and the design has no "Show more" button,
    // so only these three show (the doc's other rows are not used). Titles, focus lines and
    // accordion details: docs/content/industries/hospitality-retail.md ("Sub-Industries We
    // Serve"), bold markers dropped.
    items: [
      {
        icon: "calculate",
        title: "Restaurants & Quick Service (QSR)",
        body: "Daily Sales Reconciliation and Prime Cost Control",
        groups: [
          {
            title: "Bookkeeping",
            items: [
              "Daily Sales Audit: Reconciling POS reports (Toast/Clover) with actual bank deposits",
              "Managing third-party delivery services (UberEats/DoorDash) fee reconciliation",
              "Accounts Payable: Managing high-volume vendor invoices for food and beverage",
              "Tracking credit memos for returned produce and food waste",
            ],
          },
          {
            title: "Accounting",
            items: [
              "Prime Cost Reporting: Weekly analysis of COGS + Labor Costs relative to sales (target 60-65%)",
              "Inventory Management: Tracking theoretical vs. actual food usage to identify waste or theft",
              "Menu item profitability analysis",
              "Labor cost percentage tracking by shift and day-part",
            ],
          },
          {
            title: "Payroll",
            items: [
              "Managing tip credit compliance (FICA Tip Credit)",
              "Processing weekly payroll for high-turnover staff",
              "Tracking spread-of-hours pay for employees working split shifts",
              "Handling cash tip reporting and allocation",
            ],
          },
          {
            title: "Tax Preparation",
            items: [
              "Filing Form 8027 (Employer's Annual Information Return of Tip Income)",
              "Managing state and local sales tax filings (food vs. beverage tax rates)",
              "Tracking employee meal deductions",
              "Sales tax exemptions for catering vs. dine-in",
            ],
          },
          {
            title: "Software Stack",
            items: [
              "Restaurant365 (Restaurant Accounting)",
              "Plate IQ / Margin Edge (AP Automation)",
              "Toast / Clover / Square (POS)",
              "QuickBooks Online (Accounting)",
              "Gusto / 7shifts (Payroll/Scheduling)",
            ],
          },
        ],
      },
      {
        icon: "assignment",
        title: "Hotels, Resorts & Boutique Lodging",
        body: "Night Audit Oversight and Occupancy Metrics",
        groups: [
          {
            title: "Bookkeeping",
            items: [
              "Reconciling the Night Audit report with the general ledger",
              "Managing city ledger (corporate accounts receivable) and guest ledgers",
              "Tracking room revenue, F&B sales, and ancillary services separately",
              "Managing advance deposits and group bookings",
            ],
          },
          {
            title: "Accounting",
            items: [
              "Tracking RevPAR (Revenue Per Available Room) and ADR (Average Daily Rate)",
              "Managing fixed asset depreciation for large-scale renovations",
              "Department-level P&L (Rooms, F&B, Spa, Events)",
              "Budgeting and forecasting for seasonal fluctuations",
            ],
          },
          {
            title: "Payroll",
            items: [
              "Managing complex departmental labor (Housekeeping, Front Desk, F&B, Maintenance)",
              "Handling seasonal H-2B visa worker payroll and housing deductions",
              "Processing gratuity distribution for banquet staff",
              "Shift differential pay for overnight front desk",
            ],
          },
          {
            title: "Tax Preparation",
            items: [
              "Managing Occupancy Tax (Hotel Tax) filings at city/county levels",
              "Property tax appeals for high-value real estate",
              "Employee housing taxable fringe benefit reporting",
              "Multi-state income tax for traveling employees",
            ],
          },
          {
            title: "Software Stack",
            items: [
              // COPY FIX: doc has "cloudbeds".
              "M3 / Maestro / Cloudbeds (Hotel Property Management System)",
              "Sage Intacct / QuickBooks (Accounting)",
              "Opera / Mews (PMS)",
              "ADP / Paychex (Payroll)",
            ],
          },
        ],
      },
      {
        icon: "import_contacts",
        title: "Franchise Operations (Multi-Unit)",
        body: "Consolidated Reporting and Franchisor Compliance",
        groups: [
          {
            title: "Bookkeeping",
            items: [
              "Standardizing the Chart of Accounts across 10+ locations",
              "Managing inter-company transfers and shared service allocations",
              "Tracking location-specific vendor contracts and pricing",
              "Centralized AP processing with location coding",
            ],
          },
          {
            title: "Accounting",
            items: [
              "Consolidated Financial Statements to view the health of the entire portfolio",
              "Tracking unit-level EBITDA to identify underperforming locations",
              "Managing franchise fee calculations (percentage of gross sales)",
              "Benchmark reporting across locations (sales per square foot, labor %)",
            ],
          },
          {
            title: "Payroll",
            items: [
              "Centralized payroll processing for hundreds of employees across locations",
              "Managing \"Joint Employer\" liability risks",
              "Multi-state payroll for franchises spanning state lines",
              "Standardized job codes and pay rates across units",
            ],
          },
          {
            title: "Tax Preparation",
            items: [
              "Calculating and remitting Franchise Royalties and Ad Fund fees",
              "Managing multi-state nexus if locations span state lines",
              "Entity structuring (individual LLCs vs. consolidated)",
              "Sales tax compliance across multiple jurisdictions",
            ],
          },
          {
            title: "Software Stack",
            items: [
              "Sage Intacct / NetSuite (Multi-Entity Accounting)",
              "Qvinci / Davo (Franchise Consolidation)",
              "QuickBooks Enterprise (Multi-Location)",
              "ADP Workforce Now (Multi-Location Payroll)",
            ],
          },
        ],
      },
    ],
  },

  whyChoose: {
    badge: "Why Choose Us",
    title: "Why Hospitality Businesses Trust Our Accounting Services",
    subtitle: "Choose an accounting partner that understands the financial demands of hospitality operations.",
    // Five features as drawn (2 + 2 + 1); glyphs as on the healthcare page (same icon slots).
    features: [
      {
        icon: "contextual_token_add",
        title: "Accurate Financial Records",
        body: "Maintain accurate and organized financial records.",
      },
      {
        icon: "deployed_code_account",
        title: "Industry-Focused Support",
        body: "Customized hospitality accounting support.",
      },
      { icon: "contact_phone", title: "Consistent Processes", body: "Keep bookkeeping and reconciliations organized." },
      {
        icon: "page_info",
        title: "Confidentiality & Security",
        body: "Protect sensitive financial data with secure processes.",
      },
      {
        icon: "add_chart",
        title: "Flexible Accounting Support",
        body: "Flexible support that fits your accounting needs.",
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

  // Security & Data Protection: only in the older CSS export; the current design no longer draws
  // it (and the real-estate page has no security section since the 2026-10-18 user request).

  faq: {
    badge: "FAQ",
    title: "Frequently asked questions",
    // COPY FIX: drawn as "…about our e-commerce accounting services." (left over from e-commerce).
    intro: "Common questions about our hospitality accounting services.",
    // NOT IN DESIGN: the design draws the questions collapsed, without answers. Each answer only
    // restates claims made elsewhere in this design; confirm.
    items: [
      {
        q: "What is hospitality accounting?",
        a: [
          "Hospitality accounting covers the bookkeeping, daily sales reconciliation, payroll and labor cost tracking, vendor bills and payments, and financial reporting that hotels, restaurants, resorts, and other hospitality businesses need to maintain accurate books and track financial performance.",
        ],
      },
      {
        q: "What hospitality accounting services does Xconcile provide?",
        a: [
          "We provide daily bookkeeping, accounts payable and receivable, bank and credit card reconciliations, payroll accounting support, revenue and expense tracking, and financial statement preparation.",
        ],
      },
      {
        q: "Can Xconcile handle bookkeeping for hotels and restaurants?",
        a: [
          "Yes. Our team keeps your books accurate, organized, and up to date, including daily sales and payment reconciliation, vendor bills and payments, and bank and credit card reconciliations, all within your current systems.",
        ],
      },
      {
        q: "Can Xconcile prepare financial reports for hospitality businesses?",
        a: [
          "Yes. We prepare monthly financial reports and financial statements that give you a clear, up-to-date view of your business's financial performance.",
        ],
      },
      {
        q: "Can Xconcile support multiple locations?",
        a: [
          "Yes. We support multi-unit and franchise operations, including consolidated reporting across locations, with consistent bookkeeping and reconciliation processes.",
        ],
      },
      {
        q: "Do you provide outsourced accounting for hotels and restaurants?",
        a: [
          "Yes. We provide outsourced accounting for restaurants and quick-service businesses, hotels, resorts and boutique lodging, and franchise operations, with a dedicated accounting team that works within your existing workflows.",
        ],
      },
    ],
  },

  ctaBand: {
    title: "Need Help Managing Your Hospitality Accounting?",
    body: "From bookkeeping and reconciliations to financial reporting, get the accounting support your business needs to stay organized.",
    cta: schedule("Get a Free Consultation"),
    // The design draws a flat teal band; the real-estate CTA band component uses a photo, so the
    // same handshake photo is kept (decorative).
    image: { src: "/images/services/cta-handshake.jpg", alt: "", width: 1500, height: 1000 },
  },
};
