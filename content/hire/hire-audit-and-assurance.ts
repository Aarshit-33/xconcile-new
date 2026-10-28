/**
 * Hire Audit & Assurance Staff (`/hire-audit-assurance-staff`; was `/hire-audit-and-assurance`, which 301s here).
 *
 * Source (decision 2026-10-25): everything from the Figma design `hire-audit-assurance-staff`,
 * read from its full-page PNG render. The older `page.css` export in
 * `../pages svg, css & png/hire-audit-assurance-staff (2)/` was used only to confirm spelling
 * and icon names; the PNG wins where they differ. Same template and components as
 * `hire-bookkeeper-accountant.ts`. No Sanity reads on this page for now.
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

export const hireAuditAndAssurance: HirePageContent = {
  // URL renamed by the client 2026-10-28 (was /hire-audit-and-assurance, which now 301s here).
  slug: "hire-audit-assurance-staff",
  sanityId: "hirePage-hire-audit-and-assurance",
  redirectFrom: ["hire-audit-and-assurance"],
  name: "Hire Audit & Assurance Professionals",

  seo: {
    // NOT IN DESIGN (the design has no SEO fields). Rendered as "<title> | Xconcile".
    title: "Hire Audit & Assurance Professionals",
    description:
      "Hire audit and assurance professionals for audit planning, risk assessment, testing and workpapers, with flexible staffing for businesses and CPA firms.",
    // Meta keywords (fallback; Sanity SEO → Meta keywords wins when filled).
    keywords: [
      "hire audit staff",
      "hire audit and assurance professionals",
      "outsourced audit staffing",
      "audit staff augmentation for CPA firms",
      "remote audit associate",
      "offshore audit support",
      "audit workpaper support",
      "financial statement audit support",
      "busy season audit staffing",
    ],
  },

  hero: {
    // As drawn, "Audit" is bold inside the badge; the badge is plain text in the template.
    badge: "Dedicated Audit Support",
    title: "Hire Audit & Assurance Professionals for Your Business",
    subtitle:
      "Get experienced audit and assurance support to strengthen financial reporting, streamline audit preparation, and help your accounting team manage complex engagements with confidence.",
    primaryCta: { label: "Hire audit professionals", href: routes.contact() },
    // Same rule as "Explore our services": scrolls to this page's expertise grid.
    secondaryCta: { label: "Explore Our Expertise", href: "#expertise" },
    checks: [
      { label: "Audit & Assurance Expertise" },
      { label: "Flexible Staffing Models" },
      { label: "Experienced Professionals" },
    ],
  },

  features: {
    label: "Why work with Xconcile",
    items: [
      { icon: "person_check", title: "Experienced", body: "Skilled audit staff" },
      { icon: "cached", title: "Flexible Support", body: "Audit support that fits your needs" },
      { icon: "settings", title: "Existing Workflows", body: "Works with your current systems" },
      { icon: "lock", title: "Secure Data Handling", body: "Your financial data is protected" },
    ],
  },

  intro: {
    title: "Build a Dedicated Audit Team That Fits Your Needs",
    body: [
      "Extend your audit capabilities with experienced professionals who can support defined engagement responsibilities and day-to-day ",
      // Drawn as a green underlined link without a target: points at the audit service page.
      { text: "audit", href: routes.service("audit-outsourcing-services") },
      " activities. Xconcile provides support for audit planning, risk assessment, testing, working papers, documentation, reconciliations, and financial statement audit procedures.",
    ] satisfies RichText,
    bodyMore: [
      "Our professionals work within your established systems, software, templates, and review procedures, integrating with your existing audit function. Support can be structured around individual engagements, recurring audit work, or ongoing staffing needs.",
    ],
    bodyMoreLayout: "paragraph",
    image: {
      src: "/images/hire/intro-audit-assurance.jpg",
      alt: "Two professionals reviewing documents together at an office desk",
      width: 1480,
      height: 986,
    },
    checks: [
      "Flexible Engagement Models",
      "U.S. Business & CPA Firm Support",
      "Flexible Engagements",
    ],
    checksStyle: "list",
    cta: schedule("Build your audit team"), // COPY FIX: drawn as "Build your  audit  team" (double spaces)
  },

  benefits: {
    badge: "Key Benefits",
    title: "Why Businesses Hire Audit & Assurance Professionals?", // COPY FIX: drawn as "Why businesses"
    body: "Build accounting capacity with dedicated professionals supporting your existing workflows and needs.",
    cta: { label: "Let's Discuss Project", href: routes.contact() }, // COPY FIX: drawn as "Lets"
    items: [
      {
        tone: "white",
        icon: "groups_2",
        title: "Increase Your Team's Capacity",
        body: [
          "Add ",
          // Drawn as a green underlined link without a target: points at the Hire Dedicated
          // Accounting Professionals page.
          {
            text: "accounting professionals",
            href: routes.hireStaff("hire-bookkeeper-accountant"),
          },
          " when workloads increase without committing to a permanent increase in headcount.",
        ],
      },
      {
        tone: "white",
        icon: "assignment",
        title: "Improve Documentation",
        body: [
          "Organized schedules, reconciliations, supporting documentation, and workpapers can make engagement workflows easier to manage.",
        ],
      },
      {
        tone: "white",
        icon: "trending_down",
        title: "Reduce Workload Pressure",
        body: [
          "Support your audit team during busy periods so senior professionals can focus on review, analysis, and client communication.",
        ],
      },
      {
        tone: "white",
        icon: "contact_phone",
        title: "Support Multiple Engagements",
        body: [
          "CPA firms can add resources when multiple audits, reviews, compilations, or other engagements overlap.",
        ],
      },
      {
        tone: "white",
        icon: "tune",
        title: "Scale Up or Down",
        body: [
          "Choose an engagement structure based on your workload rather than maintaining the same staffing level year-round.",
        ],
      },
    ],
  },

  expertise: {
    id: "expertise",
    badge: "Our Audit Expertise",
    title: "Our Audit Professionals' Expertise", // COPY FIX: drawn without the apostrophe
    subtitle:
      "Experienced audit professionals supporting audit planning, risk assessment, financial statement audits, documentation, testing, and working papers.",
    // Drawn as light cards with icon, title and body text (five tiles, 3 + 2).
    items: [
      {
        icon: "book_4",
        title: "Financial Statement Audits",
        body: "Support audit procedures, testing, documentation, and workpapers.",
      },
      {
        icon: "article",
        title: "Audit Documentation",
        body: "Prepare and organize documentation and supporting audit evidence.",
      },
      {
        icon: "fact_check",
        title: "Testing & Procedures",
        body: "Assist with account testing, transaction testing, and other audit procedures.",
      },
      {
        icon: "tune",
        title: "Flexible Staffing Options",
        body: "Scale audit support based on your workload, engagement schedules, and changing business requirements.",
      },
      {
        icon: "person",
        title: "Workpaper Support",
        body: "Help prepare, update, and organize audit workpapers.",
      },
    ],
  },

  models: {
    id: "hiring-models",
    badge: "Hiring Models",
    title: "Flexible Audit & Assurance Engagement Models",
    subtitle:
      // COPY FIX: drawn as "based on your a audit workload".
      "Choose an engagement model based on your audit workload, project requirements, and level of support needed.",
    featuredLabel: "Most Popular",
    items: [
      {
        number: "01",
        icon: "history_2",
        title: "Hourly Audit Support",
        tagline: "Flexible expertise when you need it",
        body: "Get audit support for specific tasks, reporting, and ongoing assurance needs.",
        features: [
          "Internal audit assistance",
          "Financial statement reviews",
          "Compliance checks and documentation",
          "Flexible, pay-as-you-go support",
        ],
        cta: { label: "Get Started", href: routes.contact() },
      },
      {
        number: "02", // COPY FIX: drawn as "01" (duplicates the first card's number)
        title: "Dedicated Audit Professionals",
        tagline: "Consistent support from a dedicated professional",
        body: "Work with dedicated audit professionals who fit your team.",
        features: [
          "Dedicated audit professionals",
          "Internal controls and risk assessment",
          "Regulatory compliance and reporting",
          "Ongoing audit and assurance support",
        ],
        cta: { label: "Hire Your Professionals", href: routes.contact() },
        featured: true,
      },
      {
        number: "03",
        icon: "assignment",
        // As drawn ("Accounting" on an audit page, same title as the bookkeeper page). Confirm.
        title: "Project-Based Accounting",
        tagline: "Expert support for defined objectives",
        body: "Get audit experts for risk reviews, due diligence, and compliance projects.",
        features: [
          "Statutory and internal audit projects",
          "Risk assessment and control reviews",
          "Due diligence and financial reviews",
          "Project-based deliverables and timelines",
        ],
        cta: { label: "Discuss Your Project", href: routes.contact() },
      },
    ],
  },

  steps: {
    badge: "Hiring Process",
    title: "Hire your Dedicated Audit Team in 5 Simple Steps", // COPY FIX: drawn as "Audit  Team" (double space)
    subtitle:
      "Choose the most elastic model of engagement that suits your needs to maximize returns within your budget.",
    steps: [
      {
        title: "Share Your Requirements",
        body: "Tell us about your audit workload, engagements, procedures, and support requirements.",
      },
      {
        title: "Discuss Your Needs",
        body: "We review your requirements and determine the experience level and type of audit support needed.",
      },
      {
        title: "Meet the Professionals",
        body: "Review suitable audit professionals based on your specific requirements.",
      },
      // COPY FIX: drawn with a leading space (" Select Your Engagement").
      {
        title: "Select Your Engagement",
        body: "Choose the engagement model that fits your workload and business needs.",
      },
      {
        title: "Start Your Engagement",
        body: "Your selected professionals begin working within your existing processes and workflows.",
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
      label: "Audit Professionals",
      // Decorative: the "50+ Audit Professionals" text carries the meaning.
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
    title: "Choose the Right Audit Professional for Your Needs",
    subtitle: "Choose a flexible engagement model that fits your needs and budget.",
    listLabel: "Core Responsibilities",
    // COPY FIX: the featured pill is drawn as a second "MID LEVEL" (the bookkeeper design
    // draws "Most Popular" there).
    featuredLabel: "Most Popular",
    items: [
      {
        level: "Junior Level",
        title: "Audit Associate",
        experience: "6 months – 2 years", // COPY FIX: drawn with a hyphen ("6 months - 2 years")
        responsibilities: [
          {
            label: "Substantive Testing",
            text: "Performing vouching and tracing of transactions to source documents",
          },
          {
            label: "Confirmations",
            text: "Managing the bank and AR/AP confirmation process via Confirmation.com",
          },
          {
            label: "Roll-forwards",
            text: "Updating the current year audit file with prior-year balances and notes",
          },
          {
            label: "Sample Selection",
            text: "Selecting samples using IDEA or ACL for testing procedures",
          },
          {
            label: "Documentation",
            text: "Preparing audit workpapers with proper indexing and cross-referencing",
          },
          {
            label: "PBC Tracking",
            text: "Helping to track Provided by Client documents and follow up on missing items",
          },
        ],
        cta: { label: "Get Started", href: routes.contact() },
      },
      {
        level: "Mid Level",
        title: "Senior Audit Associate",
        experience: "3 – 5 years", // COPY FIX: drawn with a hyphen ("3-5 years")
        responsibilities: [
          {
            label: "Control Testing",
            text: "Documenting walkthroughs and testing the operating effectiveness of internal controls",
          },
          {
            label: "Financial Drafting",
            text: "Preparing draft financial statements including mandatory GAAP disclosures",
          },
          // COPY FIX: drawn as "multi- state". As drawn otherwise (sales tax on an audit card).
          {
            label: "Sales Tax Compliance",
            text: "Managing multi-state nexus studies and filing via TaxJar or Avalara",
          },
          {
            label: "Account Analysis",
            text: "Performing complex account reconciliations and analytical procedures",
          },
          {
            label: "Risk Assessment",
            text: "Assisting with risk assessment procedures and identifying areas of audit focus",
          },
          {
            label: "Client Communication",
            text: "Interfacing with client accounting staff to gather information and resolve queries",
          },
        ],
        cta: { label: "Get Started", href: routes.contact() },
        featured: true,
      },
      {
        level: "Senior Level",
        title: "Audit Manager",
        experience: "5+ years experience",
        responsibilities: [
          {
            label: "Risk Assessment",
            text: "Calculating materiality and identifying areas of high risk/fraud",
          },
          {
            label: "Quality Review",
            text: "Performing a second-level review of workpapers to ensure GAAS compliance",
          },
          {
            label: "Specialized Audits",
            text: "Leading 401(k) Employee Benefit Plan audits or Single Audits (Uniform Guidance)",
          },
          {
            label: "Planning & Strategy",
            text: "Developing audit strategies and engagement planning documentation",
          },
          {
            label: "Team Supervision",
            text: "Supervising junior and senior associates, performing quality reviews of their work",
          },
          {
            label: "Financial Statement Finalization",
            text: "Finalizing financial statements and disclosure checklists",
          },
          {
            label: "Client Advisement",
            text: "Providing recommendations for improving internal controls and processes",
          },
        ],
        cta: { label: "Get Started", href: routes.contact() },
      },
    ],
  },

  audiences: {
    badge: "Who We Support", // COPY FIX: drawn as the truncated placeholder "Work with"
    title: "Businesses We Work With",
    subtitle:
      "Whether you need dedicated audit support, additional engagement capacity, or seasonal assistance, our audit professionals can work within your existing team and audit workflows.",
    items: [
      {
        title: "Startups",
        // As drawn ("client engagements" reads like CPA-firm copy on the Startups card). Confirm.
        body: "Add audit professionals to support client engagements, documentation, testing, and busy-season workloads.",
        image: {
          src: "/images/hire/audience-business-owners.jpg",
          alt: "Four business owners standing together in a modern office",
          width: 828,
          height: 466,
        },
        cta: { label: "Get Started", href: routes.contact() },
      },
      {
        title: "Small & Medium Businesses",
        body: "Get additional audit and assurance support as your financial reporting and compliance needs grow.",
        image: {
          src: "/images/hire/audience-smb.jpg",
          alt: "Small business owner working on a laptop at his desk",
          width: 828,
          height: 466,
        },
        cta: { label: "Get Started", href: routes.contact() },
      },
      {
        title: "CPA & Accounting Firms",
        body: "Add experienced audit professionals to support internal teams, specific projects, or increased engagement workloads.",
        image: {
          src: "/images/hire/audience-cpa-firms.jpg",
          alt: "Accountant reviewing financial charts next to a calculator",
          width: 829,
          height: 553,
        },
        cta: { label: "Get Started", href: routes.contact() },
      },
    ],
  },

  whyChoose: {
    badge: "Why Choose Xconcile",
    title: "Why Choose Xconcile for Audit & Assurance Support",
    subtitle:
      "Xconcile provides experienced audit professionals who work within your existing systems, processes, and review procedures to support audit engagements and help manage workload.",
    features: [
      {
        icon: "contextual_token_add",
        title: "Experienced Professionals",
        body: "Professionals experienced in audit tasks, documentation, and testing.", // COPY FIX: drawn as "rofessionals"
      },
      {
        icon: "deployed_code_account",
        title: "Flexible Staffing",
        body: "Choose project, dedicated, seasonal, or ongoing audit support.",
      },
      {
        icon: "page_info",
        title: "Scalable Capacity",
        body: "Add audit resources as workloads and engagement needs change.",
      },
      {
        icon: "contact_phone",
        title: "Structured Communication",
        body: "Clear tasks, deliverables, reviews, and communication procedures.",
      },
      {
        icon: "event_available",
        title: "Dedicated Coordination",
        body: "A designated contact keeps tasks, timelines, and communication organized.",
      },
    ],
    // Same four photos as Home (identical assets in the design).
    images: home.whyChoose.images,
    // As drawn (same accounting stats as the bookkeeper page).
    stats: [
      { value: "10+", label: "Accounting Experience" },
      { value: "1K+", label: "Businesses Supported" },
      { value: "50+", label: "Accounting Professionals" },
      { value: "98%", label: "Reconciliation Accuracy" },
    ],
  },

  // Same layout as the bookkeeper page: badge + subtitle, shield banner with the H2, then three
  // control groups.
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
          {
            icon: "shield_person_badge",
            title: "Restricted Client Access",
            body: "Limited permissions",
          },
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
    // Tabs as drawn. Only the first tab has tools in the design; tabs without tools stay hidden
    // until their tools are supplied.
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
      {
        id: "data-analytics-testing",
        icon: "analytics",
        label: "Data Analytics & Testing",
        tools: [],
      },
      {
        id: "confirmation-documentation",
        icon: "assignment",
        label: "Confirmation & Documentation",
        tools: [],
      },
      // The design repeats "Audit Software" as a fifth tab (search_check_2 icon).
      { id: "audit-software-2", icon: "calculate", label: "Audit Software", tools: [] },
    ],
  },

  faq: {
    badge: "FAQ",
    title: "Frequently asked questions",
    intro: "Find answers to common questions about hiring dedicated audit and assurance staff.",
    // COPY FIX: the design draws four rows, but rows 3 and 4 repeat row 2's question word for
    // word ("Why should accounting firms hire audit and assurance staff?"); the duplicates are
    // left out. NOT IN DESIGN: the questions are drawn collapsed, without answers. Each answer
    // only restates claims made elsewhere on this page; confirm.
    items: [
      {
        q: "What services can audit and assurance staff provide?",
        a: [
          "Our audit professionals support financial statement audits, audit documentation, account and transaction testing, and workpaper preparation, along with audit planning, risk assessment, reconciliations, and other financial statement audit procedures.",
        ],
      },
      {
        q: "Why should accounting firms hire audit and assurance staff?",
        a: [
          "Audit and assurance staff let CPA and accounting firms add capacity when workloads increase, without committing to a permanent increase in headcount. They support your audit team during busy periods so senior professionals can focus on review, analysis, and client communication, and they can be added when multiple audits, reviews, compilations, or other engagements overlap.",
        ],
      },
    ],
  },

  ctaBand: {
    title: "Need More Capacity for Your Next Audit or Accounting Engagement?",
    body: "Hire experienced audit and assurance support professionals to help your business or CPA firm manage accounting, documentation, financial reporting, and engagement-related workloads more efficiently.",
    cta: schedule("Hire Audit Professionals"),
    // The design draws a flat teal band without a photo; the CTA band component needs one, so
    // this keeps the bookkeeper page's decorative office photo.
    image: { src: "/images/hire/cta-office.jpg", alt: "", width: 1500, height: 844 },
  },
};
