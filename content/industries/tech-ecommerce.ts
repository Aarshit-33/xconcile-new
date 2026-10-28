/**
 * E-commerce Accounting Services (`/industries/tech-ecommerce`, live slug kept).
 *
 * Source (user request 2026-10-25): the Figma design
 * `../pages/industry/ecommerce-accounting-services.svg`, on the real-estate page's components as
 * they are (same template, same section order, no extra blocks). The design splits the live
 * tech-ecommerce page into separate E-commerce and IT pages; this file is the E-commerce one.
 * The SVG wins where the older `page.css` export (`ecommerce-accounting-services (3)`) is stale
 * (button labels, the feature strip and the Why Choose block). The design leaves an empty band
 * between the FAQ and the CTA band where the older export drew a Security section; nothing is
 * used for it (the real-estate page has no such component). Editable in Studio → Industry Pages
 * (`industryPage-tech-ecommerce`); this file is the fallback and the seed source.
 *
 * Every deviation from the drawn copy is marked `COPY FIX`; text that is not in the design at
 * all is marked `NOT IN DESIGN` and needs client confirmation.
 */
import { home } from "@/content/home";
import type { IndustryPageContent } from "@/content/industries/types";
import type { RichText } from "@/content/types";
import { routes } from "@/lib/routes";

/** The page has no contact section, so CTAs open the Calendly popup (client rule). */

export const techEcommerce: IndustryPageContent = {
  slug: "tech-ecommerce",
  name: "E-commerce Accounting Services",

  seo: {
    // NOT IN DESIGN (the design has no SEO fields). Rendered as "<title> | Xconcile".
    title: "Outsourced E-commerce Accounting Services",
    description:
      "Outsourced e-commerce accounting: bookkeeping, sales and payment reconciliation, Shopify and Amazon accounting, and financial reporting for online businesses.",
    // Meta keywords (fallback; Sanity SEO → Meta keywords wins when filled).
    keywords: [
      "e-commerce accounting services",
      "outsourced e-commerce bookkeeping",
      "Shopify accounting",
      "Amazon seller accounting",
      "e-commerce sales reconciliation",
      "payment processor reconciliation",
      "inventory and COGS accounting",
      "e-commerce accounting for CPA firms",
    ],
  },

  hero: {
    // COPY FIX: drawn with a double space ("E-commerce  Accounting Support").
    badge: "E-commerce Accounting Support",
    // As drawn: no green highlight in the H1.
    title: "Outsourced Accounting for E-commerce",
    subtitle:
      "Keep your books accurate, your cash flow visible, and your finances ready for growth. Our e-commerce accounting and bookkeeping services help U.S. online businesses stay organized across sales channels, payment platforms, inventory, expenses, and taxes.",
    // Labels from the SVG (the CSS export still says "Get in Touch").
    primaryCta: { label: "Talk to an expert", href: routes.contact() },
    // Same rule as "Explore our services": scrolls to this page's services grid.
    secondaryCta: { label: "Explore Our Expertise", href: "#expertise" },
    checks: [
      { label: "U.S. Accounting Expertise" },
      { label: "E-commerce Expertise" },
      { label: "Flexible Engagements" },
    ],
  },

  features: {
    label: "Why work with Xconcile",
    items: [
      {
        icon: "person_check",
        title: "E-commerce Expertise",
        body: "Accounting built for online businesses.",
      },
      { icon: "cached", title: "Flexible Support", body: "Support that fits your needs." },
      { icon: "settings", title: "Seamless Workflows", body: "Works with your current systems." },
      { icon: "lock", title: "Secure Data Handling", body: "Safe and secure financial data." },
    ],
  },

  intro: {
    title: "E-commerce Accounting Support for Growing Businesses",
    // As drawn: no underlined link in this intro (the healthcare design links "outsourced
    // accounting"), so the body is plain text.
    body: [
      "Running an e-commerce business means managing more than orders and customers. Sales, refunds, payment processors, inventory, shipping costs, and marketplace fees can make accounting harder to manage.",
    ] satisfies RichText,
    bodyMore: [
      "Our Outsourced Accounting for E-commerce services help keep your financial records organized. We provide bookkeeping, reconciliations, and financial reporting support so you can spend more time running your business.",
    ],
    bodyMoreLayout: "paragraph",
    image: {
      src: "/images/industries/ecommerce-intro.jpg",
      alt: "Hand holding a pen over a clipboard beside a laptop, smartphone and printed financial charts",
      width: 1480,
      height: 987,
    },
    // COPY FIX: the second item is drawn with a leading space.
    checks: [
      "E-commerce bookkeeping",
      "Inventory and cost-related accounting",
      "Sales tax support",
    ],
    checksStyle: "list",
    cta: { label: "Hire Accounting Staff", href: routes.contact() },
  },

  challenges: {
    badge: "Key Challenges",
    title: "Common Accounting Challenges for E-commerce Businesses",
    body: "E-commerce accounting requires more than recording transactions. Multiple platforms and payment systems can make it difficult to know whether your books accurately reflect what is happening in your business.",
    cta: { label: "Let's Discuss Project", href: routes.contact() }, // COPY FIX: drawn as "Lets"
    items: [
      {
        tone: "white",
        icon: "percent_discount",
        title: "Multiple Sales Channels",
        body: [
          "Selling through Shopify, Amazon, WooCommerce, marketplaces, or your own website can create complex transaction flows.",
        ],
      },
      {
        tone: "white",
        icon: "account_balance",
        title: "Payment Processor Fees",
        body: [
          "Processing fees, reserves, payouts, and transaction adjustments need to be properly accounted for.",
        ],
      },
      {
        tone: "white",
        icon: "compare_arrows",
        title: "Refunds & Returns",
        body: [
          "Returns, refunds, chargebacks, and discounts can make revenue reconciliation difficult without a consistent process.",
        ],
      },
      {
        tone: "white",
        icon: "package_2",
        title: "Inventory & Cost of Goods Sold",
        body: [
          "Tracking inventory purchases and COGS accurately is essential for understanding your true margins.",
        ],
      },
      {
        tone: "white",
        icon: "dictionary",
        title: "Tax-Ready Records",
        body: [
          "Well-maintained books make it easier to prepare for tax filings and respond to accounting or financial information requests.",
        ],
      },
    ],
  },

  services: {
    id: "expertise",
    badge: "Expertise",
    // As drawn: no green highlight in this heading (the real-estate design greens "Real Estate").
    title: "E-commerce Accounting & Bookkeeping Services",
    subtitle:
      "From routine bookkeeping to financial reporting, we provide accounting support designed around the way online businesses operate.",
    // Eight tiles with their own glyphs and lines, as drawn (the dark 3-column grid of the
    // real-estate page shows them as 3 + 3 + 2).
    items: [
      {
        icon: "book_4",
        title: "E-commerce Bookkeeping",
        body: "Keep your books current with accurate recording and categorization of income, expenses, and transactions.",
      },
      {
        icon: "percent_discount",
        title: "Sales Reconciliation",
        body: "Reconcile orders, payouts, refunds, discounts, and fees so your accounting records align with your sales activity.",
      },
      {
        icon: "payments",
        title: "Shopify Accounting",
        body: "Organize and reconcile Shopify sales, payouts, refunds, fees, and related transactions.",
      },
      {
        icon: "checkbook",
        title: "Amazon Accounting",
        body: "Track Amazon sales, settlements, fees, refunds, and other marketplace activity within your accounting records.",
      },
      {
        icon: "currency_exchange",
        title: "Payment Processor Reconciliation",
        body: "Reconcile transactions from platforms such as Stripe, PayPal, and other payment processors.",
      },
      {
        icon: "hand_package",
        title: "Accounts Payable",
        body: "Keep vendor bills and business expenses organized while maintaining accurate records of amounts owed.",
      },
      {
        icon: "receipt_long",
        title: "Accounts Receivable",
        body: "Monitor outstanding customer balances and keep receivables organized where applicable to your business model.",
      },
      {
        // As drawn: the broom glyph (the healthcare "Accounting Cleanup" tile's icon).
        icon: "add_chart",
        title: "Financial Reporting",
        body: "Receive useful reports covering revenue, expenses, profit and loss, balance sheet information, and cash flow.",
      },
    ],
  },

  subIndustries: {
    badge: "Sub-Industries",
    // As drawn: the heading is the professional-services page's ("…for Professional Services");
    // the subtitle is e-commerce copy. Kept until the client confirms.
    title: "Accounting Support for Professional Services",
    subtitle:
      "Need additional capacity for your e-commerce clients? Our accounting support can help CPA and accounting firms manage recurring bookkeeping and financial reporting work without adding the same workload to their internal team.",
    // Five rows are drawn (titles, focus lines, icons; the design numbers the fifth row "04").
    // As drawn: the titles are e-commerce, but every focus line is copied from
    // docs/content/industries/professional-services.md (law firms, insurance, consulting,
    // staffing; row 5 repeats row 4).
    // Accordion details (user request 2026-10-25, "add sample data"): row 1 uses
    // docs/content/industries/tech-ecommerce.md "E-commerce & Amazon FBA Sellers" (bold markers
    // dropped). Rows 2–5 have no source: SAMPLE CONTENT (NOT IN DESIGN), replace with client copy.
    items: [
      {
        icon: "local_convenience_store",
        title: "E-commerce Businesses",
        // As drawn: professional-services (law firms) focus line.
        body: "IOLTA Compliance and Matter-Based Accounting",
        groups: [
          {
            title: "Bookkeeping",
            items: [
              "Reconciling marketplace payouts (Amazon, Shopify, Walmart, eBay)",
              "Recording COGS by SKU and unit",
              "Managing high-volume merchant fees and chargebacks",
              "Tracking Amazon FBA storage and fulfillment fees",
            ],
          },
          {
            title: "Accounting",
            items: [
              "Landed Cost analysis (Product + Freight + Customs + Amazon Fees)",
              "Inventory valuation using FIFO method",
              'Monitoring "Gross Margin after Ad Spend" (ROAS analysis)',
              "Managing inventory reserves for slow-moving and dead stock",
            ],
          },
          {
            title: "Payroll",
            items: [
              "Handling seasonal surges in warehouse/support staff",
              "Commission pay for growth managers and PPC specialists",
              "Managing virtual assistant (VA) payments (domestic and international)",
            ],
          },
          {
            title: "Tax Preparation",
            items: [
              "Multi-state Sales Tax Nexus (Wayfair economic nexus compliance)",
              "Inventory shrinkage/loss write-offs",
              "Year-end physical count adjustments and reserves",
              "Managing FBA inventory in multiple states for nexus purposes",
            ],
          },
          {
            title: "Software Stack",
            items: [
              "A2X / Link My Books (E-commerce Reconciliation)",
              "Inventory Planner / SkuVault (Inventory Management)",
              "Avalara / TaxJar (Sales Tax Automation)",
              "QuickBooks Online / Xero (Accounting)",
            ],
          },
        ],
      },
      {
        icon: "add_shopping_cart",
        title: "Online Retailers",
        // As drawn: professional-services (insurance agencies) focus line.
        body: "Commission Reconciliation and Fiduciary Duties",
        // SAMPLE CONTENT (NOT IN DESIGN).
        groups: [
          {
            title: "Bookkeeping",
            items: [
              "Recording daily Shopify and WooCommerce sales, refunds and discounts",
              "Reconciling Stripe, PayPal and Shop Pay payouts to bank deposits",
              "Tracking shipping, packaging and fulfillment costs",
              "Categorizing ad spend across Meta, Google and TikTok",
            ],
          },
          {
            title: "Accounting",
            items: [
              "Monthly profit and loss by product line",
              "Gross margin reporting after returns and shipping",
              "Inventory and COGS reconciliation against stock counts",
              "Gift card and store credit liability tracking",
            ],
          },
          {
            title: "Payroll",
            items: [
              "Processing payroll for customer support and warehouse staff",
              "Managing seasonal and part-time workers during peak periods",
              "Tracking contractor payments for designers and photographers",
            ],
          },
          {
            title: "Tax Preparation",
            items: [
              "Sales tax tracking across states where you have nexus",
              "Preparing year-end records for your CPA",
              "Supporting inventory and COGS figures for tax filings",
            ],
          },
          {
            title: "Software Stack",
            items: [
              "Shopify / WooCommerce (Storefront)",
              "QuickBooks Online / Xero (Accounting)",
              "A2X (Payout Reconciliation)",
              "Gusto (Payroll)",
            ],
          },
        ],
      },
      {
        icon: "rocket_launch",
        title: "E-commerce Startups",
        // As drawn: professional-services (consulting firms) focus line.
        body: "Project Profitability and Utilization Reporting",
        // SAMPLE CONTENT (NOT IN DESIGN).
        groups: [
          {
            title: "Bookkeeping",
            items: [
              "Setting up a chart of accounts built for online sales",
              "Connecting sales channels and payment processors to your books",
              "Recording founder contributions and early-stage expenses",
              "Monthly bank and credit card reconciliations",
            ],
          },
          {
            title: "Accounting",
            items: [
              "Cash flow and burn rate tracking",
              "Unit economics reporting (CAC, AOV, contribution margin)",
              "Investor-ready monthly financial statements",
              "Budget vs. actual reporting as you scale",
            ],
          },
          {
            title: "Payroll",
            items: [
              "Running payroll for your first employees",
              "Managing contractor (1099) vs. employee (W-2) classification",
              "Tracking equity and founder compensation",
            ],
          },
          {
            title: "Tax Preparation",
            items: [
              "Monitoring economic nexus thresholds as sales grow",
              "Organizing startup and inventory costs for tax filings",
              "Preparing year-end records for your CPA",
            ],
          },
          {
            title: "Software Stack",
            items: [
              "QuickBooks Online / Xero (Accounting)",
              "Shopify (Storefront)",
              "Gusto / Rippling (Payroll)",
              "Ramp / Brex (Expense Management)",
            ],
          },
        ],
      },
      {
        icon: "clear_all",
        title: "Multi-Channel Sellers",
        // As drawn: professional-services (staffing agencies) focus line.
        body: "High-Volume Payroll and Cash Flow Management",
        // SAMPLE CONTENT (NOT IN DESIGN).
        groups: [
          {
            title: "Bookkeeping",
            items: [
              "Reconciling payouts from Amazon, Shopify, Walmart, eBay and Etsy",
              "Separating marketplace fees, refunds and reserves by channel",
              "Recording inventory transfers between warehouses and FBA",
              "Matching settlement reports to bank deposits",
            ],
          },
          {
            title: "Accounting",
            items: [
              "Profit and loss by sales channel",
              "Channel-level margin and fee analysis",
              "Consolidated inventory valuation across locations",
              "Cash flow forecasting around marketplace payout cycles",
            ],
          },
          {
            title: "Payroll",
            items: [
              "Payroll for warehouse, fulfillment and support teams",
              "Commission and bonus pay for channel managers",
              "Managing international virtual assistant payments",
            ],
          },
          {
            title: "Tax Preparation",
            items: [
              "Multi-state sales tax nexus tracking across channels",
              "Marketplace facilitator rules by state",
              "Inventory held in multiple states for nexus purposes",
            ],
          },
          {
            title: "Software Stack",
            items: [
              "A2X / Link My Books (Multi-Channel Reconciliation)",
              "Linnworks / ChannelAdvisor (Channel Management)",
              "Avalara / TaxJar (Sales Tax Automation)",
              "QuickBooks Online / Xero (Accounting)",
            ],
          },
        ],
      },
      {
        icon: "import_contacts",
        title: "CPA Firms",
        // As drawn: same focus line as "Multi-Channel Sellers".
        body: "High-Volume Payroll and Cash Flow Management",
        // SAMPLE CONTENT (NOT IN DESIGN): built on the drawn subtitle (extra capacity for CPA
        // firms' e-commerce clients).
        groups: [
          {
            title: "Bookkeeping",
            items: [
              "Monthly bookkeeping for your e-commerce clients",
              "Marketplace and payment processor reconciliations",
              "Catch-up and cleanup of client books before tax season",
            ],
          },
          {
            title: "Accounting",
            items: [
              "Month-end close and financial statements for client review",
              "Inventory and COGS schedules for e-commerce clients",
              "Review-ready workpapers in your firm's format",
            ],
          },
          {
            title: "Payroll",
            items: [
              "Payroll processing support for client businesses",
              "Contractor payment tracking and 1099 preparation",
            ],
          },
          {
            title: "Tax Preparation",
            items: [
              "Sales tax nexus and filing support for client portfolios",
              "Organized year-end packages for your tax team",
              "Supporting schedules for inventory and COGS",
            ],
          },
          {
            title: "Software Stack",
            items: [
              "QuickBooks Online Accountant / Xero HQ (Accounting)",
              "A2X (E-commerce Reconciliation)",
              "Karbon / Canopy (Practice Management)",
            ],
          },
        ],
      },
    ],
  },

  whyChoose: {
    badge: "Why Choose Us",
    title: "Why U.S. E-commerce Businesses Choose Our Accounting Support",
    subtitle:
      "Your accounting partner should understand the financial complexity behind an online business—not just basic bookkeeping.",
    features: [
      {
        icon: "deployed_code_account",
        title: "Experienced Professionals",
        body: "Work with professionals experienced in accounting and financial activities.",
      },
      {
        icon: "contact_phone",
        title: "E-commerce-Focused Support",
        body: "Get support aligned with common e-commerce accounting workflows.",
      },
      {
        icon: "article",
        title: "Organized Financial Records",
        body: "Keep sales, expenses, payments, and accounting records organized.",
      },
      {
        icon: "page_info",
        title: "Flexible Support",
        body: "Choose a support model based on your workload and requirements.",
      },
      {
        icon: "brightness_5",
        title: "Workflow Integration",
        body: "Work with professionals using your existing systems and processes.",
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

  // Security & Data Protection: not used. This design leaves the band empty (the older CSS
  // export drew tax-page security copy there), and the real-estate page has no security section
  // since the 2026-10-18 user request.

  faq: {
    badge: "FAQ",
    title: "Frequently asked questions",
    intro: "Find answers to common e-commerce accounting questions.",
    // NOT IN DESIGN: the design draws the questions collapsed, without answers. Each answer only
    // restates claims made elsewhere in this design; confirm.
    items: [
      {
        q: "What is e-commerce accounting?",
        a: [
          "E-commerce accounting covers the bookkeeping, sales and payment reconciliations, inventory and cost of goods sold tracking, and financial reporting an online business needs so its books accurately reflect what is happening across its sales channels and payment platforms.",
        ],
      },
      {
        q: "Why does my e-commerce business need specialized accounting?",
        a: [
          "Selling through multiple channels creates complex transaction flows. Processing fees, reserves, payouts, refunds, returns, chargebacks, and discounts all need to be properly accounted for, and accurate inventory and COGS tracking is essential for understanding your true margins.",
        ],
      },
      {
        q: "What e-commerce accounting services does Xconcile provide?",
        a: [
          "We provide e-commerce bookkeeping, sales reconciliation, Shopify and Amazon accounting, payment processor reconciliation, accounts payable and receivable, and financial reporting covering revenue, expenses, profit and loss, balance sheet information, and cash flow.",
        ],
      },
      {
        q: "Can Xconcile handle accounting for multiple e-commerce platforms?",
        a: [
          "Yes. We help keep your books organized across sales channels and payment platforms, including Shopify and Amazon sales, settlements, payouts, refunds, and fees, and transactions from payment processors such as Stripe and PayPal.",
        ],
      },
      {
        q: "Can Xconcile help with e-commerce sales and payment reconciliation?",
        a: [
          "Yes. We reconcile orders, payouts, refunds, discounts, and fees so your accounting records align with your sales activity, and we reconcile transactions from Stripe, PayPal, and other payment processors.",
        ],
      },
      {
        q: "Does Xconcile work with CPA and accounting firms?",
        a: [
          "Yes. Our accounting support can help CPA and accounting firms manage recurring bookkeeping and financial reporting work for their e-commerce clients without adding the same workload to their internal team.",
        ],
      },
      {
        // COPY FIX: drawn with a leading space.
        q: "Can Xconcile help my CPA prepare for tax season?",
        a: [
          "Yes. Well-maintained, organized books make it easier to prepare for tax filings and respond to accounting or financial information requests. We also provide sales tax support.",
        ],
      },
    ],
  },

  ctaBand: {
    title: "Need Accounting Support for Your E-commerce Business?",
    body: "Get flexible bookkeeping, sales reconciliation, inventory, sales tax, payroll, and financial reporting support from experienced professionals.",
    cta: { label: "Get Started", href: routes.contact() },
    // The design draws a flat teal band; the real-estate CTA band component uses a photo, so the
    // same handshake photo is kept (decorative).
    image: { src: "/images/services/cta-handshake.jpg", alt: "", width: 1500, height: 1000 },
  },
};
