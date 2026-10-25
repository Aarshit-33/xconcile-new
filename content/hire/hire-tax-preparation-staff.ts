/**
 * Hire Tax Preparation Staff (`/hire-tax-preparation-staff`, live slug kept).
 *
 * Source (2026-10-25): everything from the Figma design
 * `../pages/hire/hire-tax-preparation-staff.svg` (rendered to PNG; older export:
 * `../pages svg, css & png/hire-tax-preparation-staff (2)/`). The PNG wins where the old
 * `page.css` export is stale (e.g. CSS still says "Get in Touch" on every button, "Why Businesses
 * Choose Xconcile for Outsourced Accounting" and the old four-card security block). Old-site copy
 * (`docs/content/hire-staff/tax-preparation.md`) was only used to cross-check the experience
 * levels. No Sanity reads on this page for now.
 *
 * Several headings are leftovers from the accounting and audit designs. Accounting wording is kept
 * `As drawn`; audit wording (wrong service) is fixed. Every deviation from the drawn copy is
 * marked `COPY FIX`; text that is not in the design at all is marked `NOT IN DESIGN` and needs
 * client confirmation.
 */
import { home } from "@/content/home";
import type { HirePageContent } from "@/content/hire/types";
import { SCHEDULE_HREF, type RichText } from "@/content/types";
import { routes } from "@/lib/routes";

/** The page has no contact section, so every CTA opens the Calendly popup (client rule). */
const schedule = (label: string) => ({ label, href: SCHEDULE_HREF });

export const hireTaxPreparationStaff: HirePageContent = {
  slug: "hire-tax-preparation-staff",
  name: "Hire Tax Preparation Staff",

  seo: {
    // NOT IN DESIGN (the design has no SEO fields). Rendered as "<title> | Xconcile".
    title: "Hire Dedicated Tax Preparation Staff",
    description:
      "Hire dedicated tax preparation staff for individual, business, partnership and corporate returns, with seasonal or ongoing support for CPA firms.",
    // Meta keywords (fallback; Sanity SEO → Meta keywords wins when filled).
    keywords: [
      "hire tax preparation staff",
      "hire tax preparer",
      "dedicated tax preparation staff",
      "outsourced tax preparation staffing",
      "offshore tax preparers for CPA firms",
      "seasonal tax preparation staff",
      "tax season staffing",
      "remote tax associate",
      "staff augmentation for CPA firms",
    ],
  },

  hero: {
    badge: "Dedicated Tax Support", // COPY FIX: drawn with a double space ("Tax  Support")
    title: "Hire Dedicated Tax Preparation Staff",
    subtitle:
      "Build a reliable tax preparation team without the time and cost of managing every hiring detail. Get access to trained tax professionals who can support your firm with accurate, organized, and timely tax preparation work.",
    primaryCta: schedule("Hire tax professionals"),
    // Same rule as "Explore our services": scrolls to this page's expertise grid.
    secondaryCta: { label: "Explore Our Expertise", href: "#expertise" },
    checks: [
      { label: "Experienced Tax Professionals" },
      { label: "U.S. Tax Expertise" },
      { label: "Flexible Engagement Models", desktopOnly: true },
    ],
  },

  features: {
    label: "Why work with Xconcile",
    items: [
      { icon: "person_check", title: "Experienced", body: "Skilled Tax Preparation Staff support" },
      { icon: "cached", title: "Flexible Support", body: "Support tailored to your needs" },
      { icon: "settings", title: "Existing Workflows", body: "Works With Your Existing Workflows" },
      { icon: "lock", title: "Secure Data Handling", body: "Your financial data is protected" },
    ],
  },

  intro: {
    title: "Experienced Tax Professionals, Ready to Support Your Team",
    body: [
      "Whether you need dedicated tax preparation staff for ongoing work or additional support during busy periods, Xconcile provides experienced tax professionals to work alongside your team. They can support individual and business tax returns, tax workpapers, compliance tasks, tax research, and other day-to-day tax preparation work.",
    ],
    bodyMore: [
      "Our professionals use your existing tax software and follow your established processes and workflows. From ongoing ",
      { text: "outsourced tax preparation", href: routes.service("outsourced-tax-preparation") },
      " to seasonal support and specific tax projects, you can choose the level of support that fits your firm's workload.",
    ] satisfies RichText,
    bodyMoreLayout: "paragraph",
    // The design's own photo (embedded at y=992, 1480x986).
    image: {
      src: "/images/hire/intro-tax-preparation.jpg",
      alt: "Tax professional in glasses reviewing printed documents beside her laptop",
      width: 1480,
      height: 986,
    },
    checks: [
      "Flexible Engagement Models",
      "Tax document organization & preparation",
      "Tax research and compliance support",
    ],
    checksStyle: "list",
    cta: schedule("Build your tax support team"), // COPY FIX: drawn as "Build your tex support  team"
  },

  benefits: {
    badge: "Key Benefits",
    title: "Why CPA Firms Hire Tax Preparation Staff",
    body: "Get additional tax preparation support when workloads increase, deadlines approach, or your existing team needs help managing returns and related tax work.",
    cta: schedule("Let's Discuss Project"), // COPY FIX: drawn as "Lets"
    items: [
      {
        tone: "white",
        icon: "group_search",
        title: "Increase Tax Preparation Capacity",
        body: ["Add experienced tax professionals to help your team manage more tax work."],
      },
      {
        tone: "white",
        icon: "how_to_reg",
        title: "Reduce Workload",
        body: ["Get help with tax preparation, workpapers, research, and other routine tax tasks."],
      },
      {
        tone: "white",
        icon: "add_chart",
        title: "Support Filing Deadlines",
        body: ["Add support during busy tax seasons and manage higher workloads around important deadlines."],
      },
      {
        tone: "white",
        icon: "electric_bolt",
        title: "Flexible Support",
        body: ["Choose the level of support you need, from seasonal help to ongoing dedicated tax professionals."],
      },
      {
        tone: "white",
        icon: "track_changes",
        title: "Focus on Higher-Priority Work",
        body: ["Reduce routine tax work so your CPAs and senior staff can focus on clients, reviews, and other important work."],
      },
    ],
  },

  expertise: {
    id: "expertise",
    badge: "Our Tax Expertise",
    title: "Our Tax Professionals Have Expertise in",
    subtitle:
      "Add skilled tax preparation professionals to your team and handle changing workloads without affecting your existing processes.",
    items: [
      {
        icon: "book_4",
        title: "Individual Tax Return Preparation",
        body: "Support the preparation of individual income tax returns, including organizing client information, entering tax data, and preparing supporting documentation.",
      },
      {
        icon: "assured_workload",
        title: "Business Tax Return Preparation",
        body: "Assist with business and entity tax return preparation by handling tax data, documentation, supporting schedules, and other preparation tasks.",
      },
      {
        icon: "event_available",
        title: "Partnership Tax Return Support",
        body: "Provide assistance with partnership return preparation, including organizing financial information, preparing supporting workpapers, and compiling required documentation.",
      },
      {
        icon: "receipt_long",
        title: "Corporate Tax Return Support",
        body: "Help prepare corporate tax returns and supporting documentation while following your firm's established processes and review procedures.",
      },
      {
        icon: "add_chart",
        title: "Tax Data Entry",
        body: "Handle repetitive tax data entry and organize tax documents, financial records, and supporting information to keep your preparation workflow efficient.",
      },
      {
        // The design repeats the add_chart glyph from the previous tile.
        icon: "add_chart",
        title: "Tax Season Support",
        body: "Add additional tax preparation capacity during busy season, filing deadlines, and periods of increased workload without expanding your permanent internal team.",
      },
    ],
  },

  models: {
    id: "hiring-models",
    badge: "Hiring Models",
    // As drawn (accounting wording left over from the accounting page). Confirm the copy.
    title: "Flexible Accounting Engagement Models",
    subtitle: "Choose the support model that fits your workload, scope, and accounting needs.",
    featuredLabel: "Most Popular",
    items: [
      {
        number: "01",
        icon: "history_2",
        title: "Seasonal Tax Preparation Staff",
        tagline: "Flexible help when you need it",
        body: "Flexible help when tax season gets busy",
        features: ["Seasonal support", "1040 & business", "Overflow help", "Flexible terms"],
        cta: schedule("Hire Seasonal"),
      },
      {
        number: "02", // COPY FIX: drawn as "01" (duplicate of the first card)
        title: "Dedicated Tax Preparation Staff",
        tagline: "Consistent support from a dedicated professional",
        // As drawn: the design repeats the tagline as the body. Confirm the copy.
        body: "Consistent support from a dedicated professional",
        features: ["Dedicated staff", "1040–1120-S", "Custom SOPs", "Review-ready"],
        cta: schedule("Hire Dedicated"),
        featured: true,
      },
      {
        number: "03",
        icon: "assignment",
        // As drawn (title left over from the accounting page). Confirm the copy.
        title: "Project-Based Accounting",
        tagline: "Focused support for defined assignments",
        body: "Focused support for defined tax projects",
        features: ["Backlog cleanup", "Extensions", "Multi-state", "Fixed scope"],
        cta: schedule("Discuss Project"),
      },
    ],
  },

  steps: {
    badge: "Hiring Process",
    // As drawn (accounting wording left over from the accounting page). Confirm the copy.
    title: "Hire Your Dedicated Accounting Team in 5 Simple Steps",
    subtitle:
      "Choose the most elastic model of engagement that suits your needs to maximize returns within your budget.",
    steps: [
      {
        title: "Share Your Requirements",
        body: "We learn about your workload, tax services, systems, and staffing needs.",
      },
      { title: "Discuss Your Needs", body: "Identify professionals based on the skills and experience you require." },
      { title: "Meet the Professionals", body: "Professionals work within your existing systems and processes." },
      { title: "Select Your Support", body: "Your dedicated staff begins supporting your defined tax activities." },
      { title: "Start Your Engagement", body: "Adjust your level of tax staffing as your workload changes." },
    ],
    // Same photos as the accounting page.
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
      // As drawn (same badge as the accounting page). Confirm the copy.
      label: "U.S. Accounting Expertise",
      flag: { src: "/images/flags/us-round.png", alt: "", width: 72, height: 72 },
    },
    proof: {
      value: "50+",
      // COPY FIX: drawn as the template placeholder "Developers hired last week"; uses the
      // accounting page's label (matches the "50+ Accounting Professionals" stat).
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
    title: "Choose the Right Tax Professional for Your Needs",
    subtitle: "Choose a flexible engagement model that fits your needs and budget.",
    listLabel: "Core Responsibilities",
    featuredLabel: "Most Popular", // COPY FIX: drawn as "MID LEVEL" (repeats the level tag)
    items: [
      {
        level: "Junior Level",
        title: "Associate Tax Preparer",
        experience: "6 months - 2 years",
        responsibilities: [
          { label: "Tax Indexing", text: "Sorting and bookmarking digital tax organizers into standardized PDF workpapers" },
          { label: "Basic Form 1040", text: "Entering data for simple individual returns (W-2, Interest, and Dividends)" },
          { label: "Drafting Workpapers", text: "Creating lead schedules for simple Schedule C (Sole Proprietor) businesses" },
          { label: "Pro-forma Migration", text: "Rolling forward previous year data into the current year software" },
          { label: "Document Organization", text: "Managing and organizing tax source documents with proper indexing" },
        ],
        cta: schedule("Get Started"),
      },
      {
        level: "Mid Level",
        title: "Senior Tax Associate",
        // As drawn; the old site says "2-5 years". Confirm the range.
        experience: "3-5 years",
        responsibilities: [
          { label: "Entity Returns", text: "Preparing Form 1065 (Partnerships) and Form 1120S (S-Corps)" },
          { label: "Book-to-Tax (M-1)", text: "Calculating adjustments between financial net income and taxable income" },
          { label: "Depreciation Logic", text: "Calculating MACRS, Section 179, and Bonus Depreciation for business assets" },
          { label: "Sales Tax Compliance", text: "Managing multi-state nexus studies and filing via TaxJar or Avalara" },
          {
            label: "Complex Schedules",
            text: "Preparing Schedule E (Rental Properties), Schedule D (Capital Gains), Schedule C (Business)",
          },
          { label: "State Tax Returns", text: "Preparing multi-state individual and business tax returns" },
        ],
        cta: schedule("Get Started"),
        featured: true,
      },
      {
        level: "Senior Level",
        title: "Tax Manager / Specialist",
        experience: "5+ years experience",
        responsibilities: [
          {
            label: "International Compliance",
            text: "Preparing high-penalty forms like 5471 (CFCs) and 5472 (Foreign-owned US corps)",
          },
          {
            label: "Advanced Form 1040",
            text: "Handling High-Net-Worth individuals with complex Schedule E (Rentals) and multi-state K-1s",
          },
          { label: "Notice Resolution", text: "Drafting formal responses to IRS and State tax notices" },
          { label: "Estate & Trust", text: "Preparing Form 1041 (Fiduciary) and Form 706 (Estate/Gift Tax)" },
          { label: "Tax Planning", text: "Providing strategic tax planning advice and optimization strategies" },
          { label: "Quality Review", text: "Performing final quality reviews of complex returns prepared by junior staff" },
        ],
        cta: schedule("Get Started"),
      },
    ],
  },

  audiences: {
    badge: "Who We Support", // COPY FIX: drawn as the truncated placeholder "Work with"
    title: "Who Can Hire Tax Preparation Staff?",
    // COPY FIX: drawn with audit wording ("dedicated audit support", "our audit professionals",
    // "audit workflows"), left over from the audit page; "audit" swapped for "tax".
    subtitle:
      "Whether you need dedicated tax support, additional engagement capacity, or seasonal assistance, our tax professionals can work within your existing team and tax workflows.",
    // Same photos as the accounting page.
    items: [
      {
        title: "Startups",
        body: "Get the tax support you need without building a large in-house team. We help with tax preparation, bookkeeping, compliance, and reporting as your business grows.",
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
        body: "Get additional support with tax preparation and compliance when your team needs extra capacity. Reduce the workload on your internal team and keep recurring tax work on schedule.",
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
        body: "Add experienced tax professionals to your team to handle tax preparation work, support client needs, and manage higher workloads.",
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
    // COPY FIX: drawn as "Why Choose Xconcile for Audit & Assurance Support" (left over from the
    // audit page).
    title: "Why Choose Xconcile for Tax Preparation Support",
    // As drawn (accounting wording left over from the accounting page). Confirm the copy.
    subtitle:
      "Build your accounting team with experienced professionals who work with your systems, processes, and day-to-day requirements.",
    features: [
      {
        icon: "contextual_token_add",
        title: "Experienced Professionals",
        body: "Skilled professionals with experience in tax preparation.",
      },
      {
        icon: "deployed_code_account",
        title: "Reduce Team Workload",
        body: "Give your team support with routine tax tasks.", // COPY FIX: drawn as "routine audit tasks"
      },
      {
        icon: "contact_phone",
        title: "U.S.-Focused Expertise",
        body: "Support built around U.S. tax preparation requirements.",
      },
      {
        icon: "page_info",
        title: "Flexible Engagements",
        body: "Choose support that fits your workload and staffing needs.",
      },
      {
        icon: "add_chart",
        title: "Workflow Integration",
        body: "Work within your existing systems, processes, and tools.",
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

  // Same badge + subtitle, shield banner and three control groups as the accounting page.
  security: {
    badge: "Security & Data Protection",
    title: "Your Financial Data is Handled with Care",
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
    // Tabs as drawn (same tab set as the accounting page). Only the first tab has tools in the
    // design; tabs without tools stay hidden until their tools are supplied.
    categories: [
      {
        id: "accounting-software",
        icon: "calculate",
        // COPY FIX: the open panel is titled "Audit Software" while this tab is active.
        label: "Accounting Software",
        tools: [
          // The design labels this chip "QuickBooks" with the QuickBooks logo.
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
    intro: "Learn more about tax preparation staffing, costs, qualifications, and flexible support.",
    // NOT IN DESIGN: the design draws the questions collapsed, without answers. Each answer
    // only restates claims made elsewhere on this page; confirm.
    items: [
      {
        q: "What tax preparation services does Xconcile provide?",
        a: [
          "Our tax professionals support individual tax return preparation, business tax return preparation, partnership and corporate tax return support, tax data entry, and additional capacity during tax season. They also help with tax workpapers, compliance tasks, and tax research.",
        ],
      },
      {
        // COPY FIX: drawn with a leading space.
        q: "Can Xconcile help U.S. businesses with year-round tax preparation support?",
        a: [
          "Yes. You can hire dedicated tax preparation staff for consistent ongoing support, add seasonal staff when tax season gets busy, or bring in project-based help for backlog cleanup, extensions, and multi-state work.",
        ],
      },
      {
        q: "Can accounting firms outsource tax preparation work to Xconcile?",
        a: [
          "Yes. CPA and accounting firms can add experienced tax professionals to their team to handle tax preparation work, support client needs, and manage higher workloads, using the firm's existing tax software, processes, and workflows.",
        ],
      },
      {
        q: "How does Xconcile support CPAs during busy tax season?",
        a: [
          "We add tax preparation capacity during busy season, filing deadlines, and periods of increased workload. Our professionals take on routine tax work so your CPAs and senior staff can focus on clients, reviews, and other important work.",
        ],
      },
      {
        q: "Can Xconcile handle individual and business tax returns?",
        a: [
          "Yes. Our professionals support individual income tax returns as well as business, partnership, and corporate tax returns, from organizing client information and entering tax data to preparing supporting schedules, workpapers, and documentation.",
        ],
      },
      {
        // COPY FIX: drawn with a leading space.
        q: "What types of businesses can use Xconcile’s tax preparation services?",
        a: [
          "Startups, small and medium businesses, and CPA and accounting firms can all use our tax preparation support, whether they need dedicated staff, extra capacity, or seasonal assistance.",
        ],
      },
      {
        q: "Can I hire dedicated tax preparation staff through Xconcile?",
        a: [
          "Yes. Share your requirements, discuss your needs, meet the professionals, and select your support. Your dedicated staff then begins supporting your defined tax activities, and you can adjust your level of tax staffing as your workload changes.",
        ],
      },
    ],
  },

  ctaBand: {
    title: "Looking for Dedicated Tax Preparation Professionals?",
    body: "Get the tax preparation support your business needs to keep work moving.", // COPY FIX: drawn without the final period
    cta: schedule("Hire Tax Preparation Staff"),
    // The design draws a flat band; the component needs a photo under its overlay, so this
    // reuses the accounting page's photo.
    image: { src: "/images/hire/cta-office.jpg", alt: "", width: 1500, height: 844 },
  },
};
