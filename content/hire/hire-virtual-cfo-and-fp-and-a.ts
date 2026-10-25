/**
 * Hire a Virtual CFO (`/hire-virtual-cfo-and-fp-and-a`, live slug kept).
 *
 * Source (decision 2026-10-14): everything from the Figma design, rendered to PNG
 * (`hire-virtual-cfo.png`, 1440px, read visually 2026-10-25). The older
 * `../pages svg, css & png/hire-virtual-cfo (2)/page.css` export of a previous version was only
 * used to confirm spelling and icon names; the PNG wins where it is stale (e.g. CSS still says
 * "Get in Touch" on every button and has the old Why Choose / Security / Tools copy). Same
 * section layout and components as the Hire main page.
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

export const hireVirtualCfoAndFpAndA: HirePageContent = {
  slug: "hire-virtual-cfo-and-fp-and-a",
  name: "Hire a Virtual CFO",

  seo: {
    // NOT IN DESIGN (the design has no SEO fields). Rendered as "<title> | Xconcile".
    title: "Hire a Virtual CFO & FP&A Professionals",
    description:
      "Hire an experienced virtual CFO for financial planning, forecasting, cash flow management, budgeting, and reporting, with flexible engagement models.",
    // Meta keywords (fallback; Sanity SEO → Meta keywords wins when filled).
    keywords: [
      "hire virtual CFO",
      "virtual CFO services",
      "fractional CFO",
      "outsourced CFO",
      "part-time CFO",
      "hire FP&A analyst",
      "financial planning and analysis",
      "cash flow forecasting",
      "CFO for small business",
    ],
  },

  hero: {
    badge: "Dedicated Virtual CFO Support",
    title: "Hire a Virtual CFO for Your Business",
    subtitle:
      "Get access to experienced Virtual CFO professionals who can support financial planning, forecasting, cash flow management, reporting, budgeting, and strategic financial analysis.",
    primaryCta: schedule("Hire a virtual CFO"), // COPY FIX: drawn as "Hire a virtual cfo"
    // Same rule as "Explore our services": scrolls to this page's expertise grid.
    secondaryCta: { label: "Explore Our Expertise", href: "#expertise" },
    checks: [
      { label: "U.S.-Focused Financial Expertise" },
      { label: "Experienced CFO Professionals" },
      { label: "Flexible Engagement Models", desktopOnly: true },
    ],
  },

  features: {
    label: "Why work with Xconcile",
    items: [
      {
        icon: "person_check",
        title: "Experienced",
        // COPY FIX: drawn as "Skilled Tax Preparation Staff support" (left over from the tax page);
        // the Hire main page draws "Skilled accounting support".
        body: "Skilled accounting support",
      },
      { icon: "cached", title: "Flexible Support", body: "Support tailored to your needs" },
      // COPY FIX: drawn in Title Case ("Works With Your Existing Workflows"); sentence case like the other tiles.
      { icon: "settings", title: "Seamless Integration", body: "Works with your existing workflows" },
      { icon: "lock", title: "Secure Data Handling", body: "Your financial data is protected" },
    ],
  },

  intro: {
    title: "Strengthen Your Finance Team With an Experienced Virtual CFO",
    body: [
      "As your business grows, financial planning, reporting, and cash flow management require more time and consistent attention. Cash flow, budgets, forecasts, profitability, and management reports all need regular attention to support sound business decisions. Not every business needs to hire a full-time CFO to get this level of financial support.",
    ],
    bodyMore: [
      "Xconcile provides ",
      // Drawn as a green link without a target: points at the Virtual CFO service page.
      { text: "outsourced virtual CFO services", href: routes.service("outsourced-virtual-cfo-and-fp-and-a") },
      " for U.S. businesses that need ongoing or project-based financial support. Our professionals work with your team on financial planning, cash flow forecasting, budgeting, management reporting, profitability analysis, and investor needs, giving you reliable financial information to support planning and decision-making.",
    ] satisfies RichText,
    bodyMoreLayout: "paragraph",
    image: {
      src: "/images/hire/intro-virtual-cfo.jpg",
      alt: "Finance professional in a suit at his desk with financial charts and a laptop",
      width: 1480,
      height: 987,
    },
    checks: [
      "Financial planning & forecasting",
      "Cash-flow & working capital management",
      "MIS reporting & business performance analysis",
    ],
    checksStyle: "list",
    cta: schedule("Build your CFO support team"), // COPY FIX: drawn as "Build your cfo support  team" (double space)
  },

  benefits: {
    badge: "Key Benefits",
    title: "Why Businesses Hire a Virtual CFO",
    body: "Growing businesses can get experienced financial support without hiring a full-time CFO. A Virtual CFO helps with cash flow, financial planning, growth, and key business decisions.",
    cta: schedule("Let's Discuss Project"), // COPY FIX: drawn as "Lets"
    items: [
      {
        tone: "white",
        icon: "group_search",
        title: "Cost-Efficient CFO Support",
        body: ["Get CFO support based on your business needs without the cost of hiring a full-time CFO."],
      },
      {
        tone: "white",
        icon: "how_to_reg",
        title: "Financial Planning",
        body: ["Create budgets, forecasts, financial models and plans to help you make better financial decisions."],
      },
      {
        tone: "white",
        icon: "add_chart",
        title: "Cash Flow Management",
        // COPY FIX: drawn without the closing period.
        body: ["Track your cash flow, plan for upcoming expenses, and maintain a clear view of your business finances."],
      },
      {
        tone: "white",
        icon: "electric_bolt",
        title: "Investor Readiness & Fundraising",
        body: [
          "Prepare financial models, reports, and supporting documents to help you confidently prepare for investors and lenders.",
        ],
      },
      {
        tone: "white",
        icon: "track_changes",
        title: "Compliance & Risk Management",
        body: [
          "Keep your financial processes organized, improve internal controls, and prepare for tax, compliance, and audit requirements with ",
          // As drawn: a green link to the tax preparation service (odd on a CFO page). Confirm.
          { text: "outsourced tax preparation support", href: routes.service("outsourced-tax-preparation") },
          ".",
        ],
      },
    ],
  },

  expertise: {
    id: "expertise",
    badge: "Our CFO Expertise", // COPY FIX: drawn as "Our CFO  Expertise" (double space)
    title: "Our CFOs Have Expertise in", // COPY FIX: drawn as "Our CFO Have Expertise in"
    subtitle: "Get financial support across the areas that matter most to your business.",
    items: [
      {
        icon: "book_4",
        title: "Financial Planning & Strategy",
        body: "Build financial plans tied to your growth goals, so decisions are backed by numbers, not guesswork.",
      },
      {
        icon: "assured_workload",
        title: "Budgeting & Forecasting", // COPY FIX: drawn with a leading space
        body: "Create budgets and rolling forecasts that update as your business and market conditions change.",
      },
      {
        icon: "event_available",
        title: "Cash Flow Management",
        body: "Track inflows and outflows, spot shortfalls early, and improve short- and long-term cash visibility.",
      },
      {
        icon: "receipt_long",
        title: "Financial Reporting & Analysis",
        body: "Get accurate, timely reports with analysis that explains what the numbers mean.",
      },
      {
        icon: "add_chart",
        title: "Management Reporting & KPIs",
        body: "Turn raw financial data into dashboards and KPI reports your leadership team can act on.",
      },
      {
        icon: "add_chart",
        title: "Ongoing CFO Advisory",
        body: "Get regular guidance from a finance professional who understands your business and priorities.",
      },
    ],
  },

  models: {
    id: "hiring-models",
    badge: "Engagement Models",
    title: "Choose the Virtual CFO Support That Fits Your Business",
    subtitle: "Select a flexible engagement based on your financial needs, workload, and level of support.",
    featuredLabel: "Most Popular",
    items: [
      {
        number: "01",
        icon: "history_2",
        title: "Part-Time Virtual CFO",
        tagline: "Flexible help when you need it",
        body: "Get ongoing CFO support without hiring a full-time executive.",
        features: ["Regular financial reviews", "Budgeting and forecasting", "Cash flow planning", "Management reporting"],
        cta: schedule("Get Started"),
      },
      {
        number: "02", // COPY FIX: drawn as "01" (duplicates the first card)
        title: "Dedicated Virtual CFO",
        tagline: "Consistent support from a dedicated professional",
        body: "Work with a dedicated CFO professional who understands your business and financial priorities.",
        features: ["Ongoing financial oversight", "Regular reporting and analysis", "Financial planning", "Business decision support"],
        cta: schedule("Choose Your Model"),
        featured: true,
      },
      {
        number: "03",
        icon: "assignment",
        title: "Project-Based CFO Support",
        tagline: "Focused support for defined assignments",
        body: "Get focused financial expertise for a specific project or business need.",
        features: ["Financial analysis", "Forecasting projects", "Business planning", "Financial model support"],
        cta: schedule("Discuss Your Project"),
      },
    ],
  },

  steps: {
    badge: "Hiring Process",
    title: "Hire Your Virtual CFO in 5 Simple Steps",
    subtitle:
      "Choose the most elastic model of engagement that suits your needs to maximize returns within your budget.",
    steps: [
      { title: "Tell Us About Your Business", body: "Share your business, financial needs, and current challenges." },
      {
        title: "Define Your CFO Requirements",
        body: "We understand your requirements and determine the right level of CFO support.",
      },
      {
        title: "Meet Your CFO Professional",
        body: "Meet the proposed CFO professional and discuss how they can support your business.",
      },
      {
        title: "Start Your Engagement",
        body: "Your Virtual CFO integrates with your existing team, systems, and processes.",
      },
      {
        // As drawn: repeats step 4's title. Confirm the copy.
        title: "Start Your Engagement",
        body: "Review the engagement regularly and adjust support as your business evolves.",
      },
    ],
    photos: [
      {
        src: "/images/hire/steps-team.jpg",
        alt: "Finance team reviewing figures together on a monitor",
        width: 512,
        height: 279,
      },
      {
        src: "/images/hire/steps-tablet.jpg",
        alt: "Finance professional smiling while working on a tablet",
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
      // COPY FIX: drawn as "Developers hired last week" (left over from a developer-hiring
      // template); the Hire main page draws "Accounting Experts", and this page's stats say
      // "50+ Accounting Professionals".
      label: "Accounting Experts",
      // Decorative: the "50+ Accounting Experts" text carries the meaning.
      avatars: [
        { src: "/images/hire/avatar-1.jpg", alt: "", width: 147, height: 80 },
        { src: "/images/hire/avatar-2.jpg", alt: "", width: 80, height: 80 },
        { src: "/images/hire/avatar-3.jpg", alt: "", width: 147, height: 80 },
      ],
      badge: "Avg match 48h",
    },
    trust: ["Pre-Vetted Talent", "Timezone Aligned", "Zero Hiring Risk"],
  },

  levels: {
    badge: "Experience Levels",
    title: "Choose the Virtual CFO support that fits your business",
    subtitle: "Choose a flexible engagement model that fits your needs and budget.",
    listLabel: "Core Responsibilities",
    // COPY FIX: the featured pill is drawn as "MID LEVEL" (repeats the level tag beside it); the
    // Hire main page and this page's hiring models draw "Most Popular".
    featuredLabel: "Most Popular",
    items: [
      {
        level: "Junior Level",
        title: "Financial Analyst",
        experience: "6 months - 2 years",
        responsibilities: [
          { label: "Data Visualization", text: "Updating monthly KPI dashboards and charts using Power BI, Tableau, or Fathom" },
          { label: "Budgeting Support", text: "Gathering historical data to assist in the creation of departmental budgets" },
          { label: "Ratio Analysis", text: "Calculating liquidity, leverage, and profitability ratios for financial health assessment" },
          { label: "Report Generation", text: "Creating standardized financial reports and presentations" },
          { label: "Data Management", text: "Maintaining financial databases and ensuring data accuracy" },
          { label: "Ad-hoc Analysis", text: "Supporting senior analysts with special projects and research" },
        ],
        cta: schedule("Get Started"),
      },
      {
        level: "Mid Level",
        title: "Senior FP&A Analyst",
        experience: "3-5 years",
        responsibilities: [
          { label: "Rolling Forecasts", text: "Building and maintaining 12-month rolling financial forecasts that adapt to market conditions" },
          { label: "Cash Flow Modeling", text: "Creating 13-week cash flow projections to manage short-term liquidity and avoid cash crunches" },
          { label: "Scenario Planning", text: "Building \"What-if\" models for price changes, new product launches, or expansion scenarios" },
          { label: "Variance Analysis", text: "Performing detailed budget vs. actual analysis to explain performance gaps" },
          { label: "Profitability Analysis", text: "Analyzing product/service line profitability and customer profitability" },
          { label: "Board Presentations", text: "Preparing monthly executive summary decks for board meetings or investors" },
        ],
        cta: schedule("Get Started"),
        featured: true,
      },
      {
        level: "Senior Level",
        title: "Fractional CFO / Controller",
        experience: "5+ years experience",
        responsibilities: [
          { label: "Strategic Advisory", text: "Presenting financial narratives to the Board of Directors or investors with strategic recommendations" },
          { label: "M&A Support", text: "Managing the \"Data Room\" and financial due diligence for business sales or acquisitions" },
          { label: "Capital Allocation", text: "Advising on debt vs. equity funding and ROI on major capital expenditures" },
          { label: "Financial Strategy", text: "Developing long-term financial strategies aligned with business growth objectives" },
          { label: "Process Optimization", text: "Implementing financial controls, policies, and best practices" },
          { label: "Team Leadership", text: "Supervising finance team members and ensuring quality deliverables" },
          { label: "Fundraising Support", text: "Preparing pro-forma statements and investor presentations for capital raises" },
        ],
        cta: schedule("Get Started"),
      },
    ],
  },

  audiences: {
    badge: "Who We Support", // COPY FIX: drawn as the truncated placeholder "Work with"
    title: "Who Can Hire a Virtual CFO?",
    // COPY FIX: drawn with audit wording ("dedicated audit support", "our audit professionals",
    // "audit workflows"), left over from the audit page; "audit" swapped for CFO/finance wording
    // (same fix as the payroll and tax pages).
    subtitle:
      "Whether you need dedicated CFO support, additional engagement capacity, or seasonal assistance, our CFO professionals can work within your existing team and finance workflows.",
    items: [
      {
        title: "Startups",
        body: "Get financial support as your business grows and financial needs become more complex.",
        image: {
          src: "/images/hire/audience-business-owners.jpg",
          alt: "Four startup founders standing together in a modern office",
          width: 828,
          height: 466,
        },
        cta: schedule("Get Started"),
      },
      {
        title: "Small & Medium Businesses",
        body: "Access CFO-level financial support without adding a full-time CFO position.",
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
        body: "Extend your firm's financial advisory capabilities with experienced virtual CFO professionals.",
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
    title: "Why Hire a Virtual CFO Through Xconcile?",
    subtitle:
      "Get experienced financial professionals who can work with your existing accounting processes, systems, and reporting requirements.",
    features: [
      {
        icon: "contextual_token_add",
        title: "Experienced Professionals",
        body: "Work with professionals experienced in financial planning and analysis.",
      },
      {
        icon: "deployed_code_account",
        title: "U.S.-Focused Expertise",
        body: "Support designed around U.S. business and financial workflows.",
      },
      {
        icon: "contact_phone",
        title: "Flexible Support",
        body: "Choose support based on your workload, goals, and requirements.",
      },
      {
        icon: "page_info",
        title: "Existing Workflow",
        body: "Our professionals work with your current systems and processes.",
      },
      {
        icon: "add_chart",
        title: "Scalable Capacity",
        body: "Increase or adjust CFO support as your business needs change.",
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

  // Same badge, banner and control groups as the Hire main page.
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
    intro: "Get answers about our Virtual CFO professionals, support options, and hiring process.",
    // NOT IN DESIGN: the design draws the questions collapsed, without answers. Each answer
    // only restates claims made elsewhere on this page; confirm.
    items: [
      {
        q: "What is a Virtual CFO?",
        a: [
          "A Virtual CFO is an experienced finance professional who supports financial planning, forecasting, cash flow management, reporting, budgeting, and strategic financial analysis, without you hiring a full-time CFO.",
        ],
      },
      {
        q: "What does a Virtual CFO do?",
        a: [
          "A Virtual CFO helps with cash flow, financial planning, growth, and key business decisions: creating budgets, forecasts, and financial models, tracking cash flow and upcoming expenses, preparing for investors and lenders, and improving internal controls.",
        ],
      },
      {
        q: "What services does a Virtual CFO provide?",
        a: [
          "Our CFO professionals support financial planning and strategy, budgeting and forecasting, cash flow management, financial reporting and analysis, management reporting and KPIs, and ongoing CFO advisory.",
        ],
      },
      {
        q: "How can Virtual CFO services help my business?",
        a: [
          "You get CFO support based on your business needs without the cost of hiring a full-time CFO, a clear view of your cash flow, budgets and forecasts for better financial decisions, and support preparing for investors and lenders.",
        ],
      },
      {
        q: "How does a Virtual CFO work with my existing accounting team?",
        a: [
          "Your Virtual CFO integrates with your existing team, systems, and processes, and works with your existing accounting processes and reporting requirements.",
        ],
      },
      {
        q: "Can Xconcile work with my existing CPA or accounting firm?",
        a: [
          "Yes. CPA and accounting firms can extend their financial advisory capabilities with experienced virtual CFO professionals, who work with your current systems and processes.",
        ],
      },
      {
        q: "How does Xconcile support businesses that are growing or scaling?",
        a: [
          "Startups get financial support as the business grows and financial needs become more complex. You can choose part-time, dedicated, or project-based CFO support, and increase or adjust it as your business needs change.",
        ],
      },
    ],
  },

  ctaBand: {
    title: "Need CFO Support Without Hiring Full-Time?",
    // COPY FIX: drawn without the closing period.
    body: "Get experienced financial support for planning, forecasting, cash flow, reporting, and business decisions.",
    cta: schedule("Hire a Virtual CFO"),
    // The design draws a flat band without the photo; same asset as the Hire main page.
    image: { src: "/images/hire/cta-office.jpg", alt: "", width: 1500, height: 844 },
  },
};
