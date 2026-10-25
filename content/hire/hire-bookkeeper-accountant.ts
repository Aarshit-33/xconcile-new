/**
 * Hire Dedicated Accounting Professionals (`/hire-bookkeeper-accountant`, live slug kept).
 *
 * Source (decision 2026-10-14): everything from the Figma design, now
 * `../pages/hire/hire-dedicated-accounting-professionals.svg` (newer export, re-checked
 * 2026-10-25). Its copy is unchanged from the earlier
 * `../pages svg, css & png/hire-dedicated-accounting-professionals (main) (2)/page.svg`; only the
 * intro link colour and the footer layout differ. The SVG wins where the old `page.css` export is
 * stale (e.g. CSS still says "Get in Touch" and "Hospitality Accounting & Bookkeeping Services").
 * No Sanity reads on this page for now.
 *
 * Every deviation from the drawn copy is marked `COPY FIX`; text that is not in the design at
 * all is marked `NOT IN DESIGN` and needs client confirmation.
 */
import { home } from "@/content/home";
import type { HirePageContent } from "@/content/hire/types";
import { SCHEDULE_HREF, type RichText } from "@/content/types";
import { routes } from "@/lib/routes";

/** The page has no contact section, so every CTA opens the Calendly popup (client rule). */
const schedule = (label: string) => ({ label, href: SCHEDULE_HREF });

export const hireBookkeeperAccountant: HirePageContent = {
  slug: "hire-bookkeeper-accountant",
  name: "Hire Dedicated Accounting Professionals",

  seo: {
    // NOT IN DESIGN (the design has no SEO fields). Rendered as "<title> | Xconcile".
    title: "Hire Dedicated Accounting Professionals",
    description:
      "Hire dedicated accountants for bookkeeping, reconciliations, financial reporting and month-end close, with flexible staffing for U.S. businesses and CPA firms.",
    // Meta keywords (fallback; Sanity SEO → Meta keywords wins when filled).
    keywords: [
      "hire dedicated accountant",
      "hire bookkeeper",
      "hire remote accountant",
      "dedicated accounting professionals",
      "offshore accounting staff",
      "outsourced accounting staffing",
      "remote bookkeeper for CPA firms",
      "month-end close support",
      "staff augmentation for CPA firms",
    ],
  },

  hero: {
    badge: "Dedicated Accounting Support",
    title: "Hire *Dedicated* Accounting Professionals for your Business",
    subtitle:
      "Get dedicated accounting professionals to support bookkeeping, reconciliations, financial reporting, month-end close, and other accounting needs. We support U.S. business owners and CPA firms with flexible staffing options that fit their existing workflows.",
    primaryCta: schedule("Hire accounting professionals"),
    // Same rule as "Explore our services": scrolls to this page's expertise grid.
    secondaryCta: { label: "Explore Our Expertise", href: "#expertise" },
    checks: [
      { label: "U.S. Accounting Support" },
      { label: "Flexible Engagements" },
      { label: "Experienced Professionals", desktopOnly: true },
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
    title: "Build a Dedicated Accounting Team That Fits Your Needs",
    body: [
      "Building an in-house accounting team takes time, especially when your business needs support with bookkeeping, reconciliations, reporting, and month-end close. Hiring for every accounting role may not always fit your workload or budget, while leaving important work with an overstretched team can slow things down.",
    ],
    bodyMore: [
      "Xconcile provides ",
      { text: "outsourced accounting and bookkeeping services", href: routes.service("outsourced-accounting-and-bookkeeping") },
      " through dedicated accounting professionals who work around your requirements. Our team can support day-to-day bookkeeping, reconciliations, financial reporting, month-end activities, and other accounting tasks within your existing systems and workflows. You can choose the level of support you need and build a ",
      // Drawn as a link without a target: points at this page's engagement models.
      { text: "dedicated accounting team", href: "#hiring-models" },
      " without managing every role in-house.",
    ] satisfies RichText,
    bodyMoreLayout: "paragraph",
    image: {
      src: "/images/hire/intro.jpg",
      alt: "Accounting professional working through documents at her desk",
      width: 1480,
      height: 986,
    },
    checks: [
      "Work with your existing accounting processes",
      "Support day-to-day accounting activities",
      "Scale support as your workload changes",
    ],
    checksStyle: "list",
    cta: schedule("Build your accounting team"),
  },

  benefits: {
    badge: "Key Benefits",
    title: "Why Businesses Hire Dedicated Accounting Professionals?",
    body: "Scale your accounting support without adding to your in-house team. Our dedicated professionals handle routine tasks and support your daily accounting needs.",
    cta: schedule("Let's Discuss Project"), // COPY FIX: drawn as "Lets"
    items: [
      {
        tone: "white",
        icon: "group_search",
        title: "Handle Day-to-Day Accounting",
        body: ["Handle bookkeeping, reconciliations, payroll, financial records, and routine accounting tasks accurately."],
      },
      {
        tone: "white",
        icon: "how_to_reg",
        title: "Stay Tax Compliant",
        body: ["Keep up with changing tax regulations, prepare accurate returns, and identify legitimate tax-planning opportunities."],
      },
      {
        tone: "white",
        icon: "add_chart",
        title: "Improve Cash Flow & Financial Control",
        body: ["Monitor income and expenses, prepare cash-flow forecasts, and help maintain healthy working capital."],
      },
      {
        tone: "white",
        icon: "electric_bolt",
        title: "Support Business Growth",
        body: ["Build budgets, financial forecasts, and reports that help with expansion, funding, investment decisions, and long-term planning."],
      },
    ],
  },

  expertise: {
    id: "expertise",
    badge: "Our Accounting Expertise",
    title: "Our Accounting Professionals Have Expertise In",
    subtitle:
      "Our accounting professionals support core accounting activities, from bookkeeping and reconciliations to month-end close and financial reporting.",
    // The design draws the same book_4 glyph on every tile.
    // NOT IN DESIGN: `body` lines are placeholder copy added for the scroll reveal (client
    // request 2026-10-14); replace with approved text.
    items: [
      {
        icon: "book_4",
        title: "Accounting & Bookkeeping",
        body: "Day-to-day transactions recorded and categorized to keep your books accurate.",
      },
      {
        icon: "book_4",
        title: "Bank & CC Reconciliation",
        body: "Regular bank and credit card reconciliations to catch missing or duplicate entries.",
      },
      {
        icon: "book_4",
        title: "Month-End Close",
        body: "Adjusting entries, accruals, and reviews to close each month on schedule.",
      },
      {
        icon: "book_4",
        title: "Accounts Payable & Receivable",
        body: "Vendor bills, customer invoices, and payments tracked end to end.",
      },
      {
        icon: "book_4",
        title: "Financial Statements",
        body: "Monthly P&L and balance sheets prepared for review and decisions.",
      },
      {
        icon: "book_4",
        title: "Payroll & Sales Tax Support",
        body: "Payroll and sales tax records supported within your existing systems.",
      },
    ],
  },

  models: {
    id: "hiring-models",
    badge: "Hiring Models",
    title: "Choose Accounting Support That Fits Your Workload",
    subtitle:
      "Choose an engagement model based on your accounting workload, project requirements, and level of support needed.",
    featuredLabel: "Most Popular",
    items: [
      {
        number: "01",
        icon: "history_2",
        title: "Hourly Accounting Support",
        tagline: "Flexible help when you need it",
        body: "Handle overflow, catch-up, cleanup, and variable accounting workloads.",
        features: ["Pay-as-you-go hours", "Month-end surge help", "Prior-period reconciliation", "No retainer commitment"],
        cta: schedule("Get Started"),
      },
      {
        number: "02",
        title: "Dedicated Accountant",
        tagline: "Consistent support from a dedicated professional",
        // As drawn: the design repeats the Hourly card's sentence here. Confirm the copy.
        body: "Handle overflow, catch-up, cleanup, and variable accounting workloads.",
        features: [
          "Embedded full/fractional headcount",
          "Custom SOPs & chart of accounts",
          "Prior-period reconciliation",
          "Controller supervision",
        ],
        cta: schedule("Choose Your Model"),
        featured: true,
      },
      {
        number: "03",
        icon: "assignment",
        title: "Project-Based Accounting",
        tagline: "Focused support for defined assignments",
        body: "Get dedicated help for cleanup, migration, catch-up, or specific projects.",
        features: [
          "ERP & software migrations",
          "Multi-year audit preparation",
          "M&A due diligence readiness",
          "Fixed-fee milestones",
        ],
        cta: schedule("Discuss Your Project"),
      },
    ],
  },

  steps: {
    badge: "Simple Hiring Process",
    title: "Hire your Dedicated Accounting Team in 5 Steps",
    subtitle:
      "Choose the most elastic model of engagement that suits your needs to maximize returns within your budget.",
    steps: [
      {
        title: "Share Your Requirements",
        body: "Tell us about your accounting tasks, workload, systems, and support needs.",
      },
      { title: "Discuss Your Needs", body: "Review the experience level and type of accounting support required." },
      { title: "Meet the Professionals", body: "Review accounting professionals based on your specific requirements." },
      { title: "Select Your Engagement", body: "Choose the engagement model that fits your workload and requirements." },
      {
        title: "Start Working Together",
        body: "Your selected professionals begin working within your existing processes and systems.",
      },
    ],
    photos: [
      {
        src: "/images/hire/steps-team.jpg",
        alt: "Accounting team reviewing figures together on a monitor",
        width: 512,
        height: 279,
      },
      {
        src: "/images/hire/steps-tablet.jpg",
        alt: "Accounting professional smiling while working on a tablet",
        width: 512,
        height: 279,
      },
    ],
    photoBadge: {
      label: "U.S. Accounting Expertise",
      flag: { src: "/images/flags/us-round.png", alt: "", width: 72, height: 72 },
    },
    proof: {
      value: "50+",
      label: "Accounting Experts",
      // Decorative: the "50+ Accounting Experts" text carries the meaning.
      avatars: [
        { src: "/images/hire/avatar-1.jpg", alt: "", width: 147, height: 80 },
        { src: "/images/hire/avatar-2.jpg", alt: "", width: 80, height: 80 },
        { src: "/images/hire/avatar-3.jpg", alt: "", width: 147, height: 80 },
      ],
      badge: "Avg match 48h",
    },
    trust: ["Experienced Professionals", "U.S. Time Zone Aligned", "Zero Hiring Risk"],
  },

  levels: {
    badge: "Experience Levels",
    title: "Choose the Right Accounting Professional for Your Needs",
    subtitle: "Choose a flexible engagement model that fits your needs and budget.",
    listLabel: "Core Responsibilities",
    featuredLabel: "Most Popular",
    items: [
      {
        level: "Junior Level",
        title: "Associate Bookkeeper",
        experience: "6 months – 2 years",
        responsibilities: [
          { label: "Daily Transaction Processing", text: "Categorizing bank and credit card transactions with high accuracy" },
          { label: "AP/AR Assistance", text: "Entering vendor bills, matching receipts via Dext/Hubdoc, and generating basic customer invoices" },
          { label: "Bank Feed Management", text: "Monitoring bank feed connectivity and resolving simple sync errors" },
          { label: "Data Organization", text: "Maintaining a digital filing system for all source documents (SOC2 compliant)" },
          { label: "Basic Reconciliations", text: "Performing straightforward bank and credit card reconciliations" },
        ],
        cta: schedule("Get Started"),
      },
      {
        level: "Mid Level",
        title: "Senior Bookkeeper/ Accountant",
        experience: "2 – 5 years",
        responsibilities: [
          { label: "Complex Reconciliations", text: "Handling high-volume merchant accounts (Stripe, Shopify, PayPal) and multi-currency reconciliations" },
          { label: "Month-End Close", text: "Preparing adjusting journal entries for accruals, deferrals, and prepaid expenses" },
          { label: "Inter-company Accounting", text: "Reconciling \"Due To/From\" accounts for clients with multiple business entities" },
          { label: "Fixed Asset Management", text: "Maintaining depreciation schedules and recording asset disposals" },
          { label: "Financial Statement Preparation", text: "Generating monthly P&L and Balance Sheet with variance analysis" },
        ],
        cta: schedule("Get Started"),
        featured: true,
      },
      {
        level: "Senior Level",
        title: "Accounting Manager / Supervisor",
        experience: "5+ years experience",
        responsibilities: [
          { label: "Financial Review", text: "Performing final quality reviews of the General Ledger and Trial Balance for US GAAP compliance" },
          { label: "Cleanup & Backlog", text: "Leading forensic \"cleanup\" projects for messy historical books" },
          { label: "Systems Integration", text: "Setting up the \"Accounting App Stack\" (connecting CRM, Inventory, and Ledger systems)" },
          { label: "CPA Liaison", text: "Preparing year-end workpaper packages for the client's tax CPA to minimize queries" },
          { label: "Team Leadership", text: "Supervising junior and mid-level bookkeepers, performing quality reviews" },
          { label: "Process Optimization", text: "Implementing best practices and workflow improvements" },
          { label: "Strategic Advisory", text: "Providing insights on financial trends and recommending improvements" },
        ],
        cta: schedule("Get Started"),
      },
    ],
  },

  audiences: {
    badge: "Who We Support", // COPY FIX: drawn as the truncated placeholder "Work with"
    title: "Businesses We Work With",
    subtitle:
      "We provide dedicated accounting support for U.S. business owners and CPA firms, with flexible options based on your workload, accounting processes, and team requirements.",
    items: [
      {
        title: "U.S. Business Owners",
        body: "Get dedicated accounting support for bookkeeping, reconciliations, reporting, and day-to-day financial operations.",
        image: {
          src: "/images/hire/audience-business-owners.jpg",
          alt: "Four business owners standing together in a modern office",
          width: 828,
          height: 466,
        },
        cta: schedule("Get Started"),
      },
      {
        title: "Small & Medium Businesses",
        body: "Add accounting capacity as your transaction volume, reporting needs, and financial workload increase.",
        image: {
          src: "/images/hire/audience-smb.jpg",
          alt: "Small business owner working on a laptop at his desk",
          width: 828,
          height: 466,
        },
        cta: schedule("Get Started"),
      },
      {
        title: "CPA & Accounting Firms",
        body: "Extend your team with accounting professionals who can support client bookkeeping, reconciliations, reporting, and recurring accounting work.",
        image: {
          src: "/images/hire/audience-cpa-firms.jpg",
          alt: "Accountant reviewing financial charts next to a calculator",
          width: 829,
          height: 553,
        },
        cta: schedule("Get Started"),
      },
    ],
  },

  whyChoose: {
    badge: "Why Choose Xconcile",
    title: "Why Hire Dedicated Accounting Professionals for Xconcile",
    subtitle:
      "Xconcile provides accounting professionals for U.S. businesses and CPA firms, working within your existing systems, processes, and requirements to provide the support your team needs.",
    features: [
      {
        icon: "contextual_token_add",
        title: "US Accounting Expertise",
        body: "Experienced professionals supporting your accounting.", // COPY FIX: drawn as "accounting ."
      },
      {
        icon: "deployed_code_account",
        title: "U.S. Business & CPA Support",
        body: "Dedicated support for U.S. business owners and CPA firms.",
      },
      {
        icon: "contact_phone",
        title: "Scalable Team Capacity",
        body: "Add accounting capacity as your workload changes over time.",
      },
      {
        icon: "page_info",
        title: "Flexible Engagements",
        body: "Choose an engagement model based on your workload and needs.",
      },
      {
        icon: "add_chart",
        title: "Secure Data Handling",
        body: "Controlled access helps protect your financial information.",
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

  // Redrawn in the page.svg update of 2026-10-17: badge + subtitle, shield banner with the H2,
  // then three control groups (replaces the old feature card + four numbered cards).
  security: {
    badge: "Security & Data Protection",
    title: "Your Financial Data is Handled with Care",
    // As drawn (copied from the tax page: mentions tax preparation). Confirm the copy.
    subtitle:
      "Tax preparation involves sensitive financial and personal information. Our professionals follow defined processes for handling tax documents, financial information, and file exchanges.",
    shield: { src: "/images/hire/security-shield.svg", alt: "", width: 112, height: 133 },
    groups: [
      {
        title: "Information Security",
        items: [
          { icon: "verified_user", title: "ISO/IEC 27001:2022", body: "Security compliance" },
          { icon: "lock", title: "Confidentiality", body: "Security compliance" },
          { icon: "database", title: "Secure Data Handling", body: "Protected information" },
        ],
      },
      {
        title: "Physical Security",
        items: [
          { icon: "door_open", title: "Controlled Office Access", body: "Building entry" },
          // As drawn: same sub-line as the ISO row. Confirm the copy.
          { icon: "nest_cam_iq_outdoor", title: "CCTV Monitoring", body: "Security compliance" },
          { icon: "desktop_windows", title: "PC & Workstation Locks", body: "Device security" },
        ],
      },
      {
        title: "Logical Access Control",
        items: [
          { icon: "how_to_reg", title: "User-Based Access", body: "Identity and permissions" },
          { icon: "shield_person_badge", title: "Restricted Client Access", body: "Limited permissions" },
          { icon: "settings", title: "System Access Controls", body: "System configuration" },
        ],
      },
    ],
  },

  tools: {
    badge: "Software Expertise",
    title: "Your Tools, Our Expertise",
    subtitle:
      "Work with professionals experienced in major accounting platforms and tools, without changing the workflows your business already relies on.",
    // Tabs as drawn (decision 2026-10-14: Figma, not Sanity). Only the first tab has tools in
    // the design; tabs without tools stay hidden until their tools are supplied.
    categories: [
      {
        id: "accounting-software",
        icon: "calculate",
        // COPY FIX: the open panel is titled "Audit Software" while this tab is active.
        label: "Accounting Software",
        tools: [
          // As on the audit page: the design shows the QuickBooks logo on this chip.
          { name: "CaseWare Working Papers" },
          { name: "Xero", logo: "/images/tools/xero.png", width: 80, height: 80 },
          { name: "NetSuite", logo: "/images/tools/netsuite.svg", width: 34, height: 32 },
          { name: "Sage", logo: "/images/tools/sage.png", width: 160, height: 90 },
          { name: "Dynamics 365", logo: "/images/tools/dynamics-365.png", width: 60, height: 80 },
          { name: "Bill.com", logo: "/images/tools/bill-com.png", width: 80, height: 80 },
          { name: "Zoho Books", logo: "/images/tools/zoho-books.png", width: 160, height: 69 },
          { name: "FreshBooks", logo: "/images/tools/freshbooks.png", width: 80, height: 80 },
        ],
      },
      { id: "audit-software", icon: "dvr", label: "Audit Software", tools: [] },
      { id: "data-analytics-testing", icon: "analytics", label: "Data Analytics & Testing", tools: [] },
      { id: "confirmation-documentation", icon: "assignment", label: "Confirmation & Documentation", tools: [] },
      // The design repeats "Audit Software" as a fifth tab (search_check_2 icon).
      { id: "audit-software-2", icon: "search_check_2", label: "Audit Software", tools: [] },
    ],
  },

  faq: {
    badge: "FAQ",
    title: "Frequently asked questions",
    intro: "Find answers to common questions about hiring dedicated accounting professionals.",
    // NOT IN DESIGN: the design draws the questions collapsed, without answers. Each answer
    // only restates claims made elsewhere on this page; confirm.
    items: [
      {
        q: "What is a dedicated accounting professional?",
        a: [
          "A dedicated accounting professional is an experienced accountant or bookkeeper who works on your accounts within your existing systems, processes, and workflows. They support bookkeeping, reconciliations, financial reporting, month-end close, and other accounting tasks, so you get consistent help without managing every role in-house.",
        ],
      },
      {
        q: "What accounting services can Xconcile provide?",
        a: [
          "Our accounting professionals support accounting and bookkeeping, bank and credit card reconciliation, month-end close, accounts payable and receivable, financial statements, and payroll and sales tax support.",
        ],
      },
      {
        q: "Why should I hire dedicated accounting professionals?",
        a: [
          "Dedicated professionals let you scale your accounting support without adding to your in-house team. They handle routine and day-to-day accounting, help you stay tax compliant, improve cash flow and financial control, and support growth with budgets, forecasts, and reports.",
        ],
      },
      {
        q: "Can Xconcile work with my existing accounting software?",
        a: [
          "Yes. Our professionals are experienced in major accounting platforms and tools, including Xero, NetSuite, Sage, Dynamics 365, Bill.com, Zoho Books, and FreshBooks, and work within the systems and workflows your business already relies on.",
        ],
      },
      {
        q: "Can I hire accounting professionals for ongoing support?",
        a: [
          "Yes. Choose hourly support for overflow and variable workloads, a dedicated accountant for consistent ongoing support, or project-based help for cleanup, migration, catch-up, or specific projects.",
        ],
      },
      {
        q: "Does Xconcile provide accounting support for CPA firms?",
        a: [
          "Yes. CPA and accounting firms can extend their team with accounting professionals who support client bookkeeping, reconciliations, reporting, and recurring accounting work.",
        ],
      },
      {
        q: "Can dedicated accounting support scale with my business?",
        a: [
          "Yes. You can add accounting capacity as your transaction volume, reporting needs, and financial workload change over time, and switch engagement models as your requirements evolve.",
        ],
      },
    ],
  },

  ctaBand: {
    title: "Build the Right Accounting Team for Your Business",
    body: "Whether you're a U.S. business owner or CPA firm, get accounting professionals who can work with your existing systems, processes, and workload.",
    cta: schedule("Hire Accounting Professionals"),
    image: { src: "/images/hire/cta-office.jpg", alt: "", width: 1500, height: 844 },
  },
};
