/**
 * Hire Payroll Staff (`/hire-payroll-staff`; was `/hire-payroll-and-compliance`, which 301s here).
 *
 * Source (2026-10-25): everything from the Figma design, rendered as
 * `hire-payroll-staff.png` (text read visually; it is outlined in the export). The older
 * `../pages svg, css & png/hire-payroll-staff (2)/page.css` export was used only to confirm
 * spelling and Material Symbols icon names; the PNG wins where that CSS is stale (e.g. CSS still
 * says "Get in Touch" on every button and has different "Why Choose" cards).
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

export const hirePayrollAndCompliance: HirePageContent = {
  // URL renamed by the client 2026-10-28 (was /hire-payroll-and-compliance, which now 301s here).
  slug: "hire-payroll-staff",
  sanityId: "hirePage-hire-payroll-and-compliance",
  redirectFrom: ["hire-payroll-and-compliance"],
  name: "Hire Dedicated Payroll Professionals",

  seo: {
    // NOT IN DESIGN (the design has no SEO fields). Rendered as "<title> | Xconcile".
    title: "Hire Dedicated Payroll Professionals",
    description:
      "Hire dedicated payroll professionals for payroll processing, reconciliation, reporting, year-end support and multi-state compliance, with flexible engagements.",
    // Meta keywords (fallback; Sanity SEO → Meta keywords wins when filled).
    keywords: [
      "hire payroll professionals",
      "hire payroll specialist",
      "dedicated payroll staff",
      "outsourced payroll staffing",
      "remote payroll specialist",
      "payroll staff for CPA firms",
      "multi-state payroll compliance",
      "year-end payroll support",
      "payroll staff augmentation",
    ],
  },

  hero: {
    badge: "Dedicated Payroll Support",
    title: "Hire Dedicated Payroll Professionals for Your Business",
    subtitle:
      "Get dedicated payroll professionals to support payroll processing, reporting, employee records, compliance tasks, and other payroll needs. Flexible staffing options fit your existing workflows and team.",
    primaryCta: { label: "Hire payroll professionals", href: routes.contact() },
    // Same rule as "Explore our services": scrolls to this page's expertise grid.
    secondaryCta: { label: "Explore Our Expertise", href: "#expertise" },
    checks: [
      { label: "Payroll Processing Support" },
      { label: "Multi-State Payroll Compliance" },
      // No mobile design supplied: third check hidden on mobile as on the reference page.
      { label: "Dedicated Payroll Specialists" },
    ],
  },

  features: {
    label: "Why work with Xconcile",
    items: [
      { icon: "person_check", title: "Experienced", body: "Experienced Payroll Professionals" },
      { icon: "cached", title: "Flexible Support", body: "Support That Fits Your Needs" },
      { icon: "settings", title: "Existing Workflows", body: "Works With Your Existing Workflows" },
      { icon: "lock", title: "Secure Data Handling", body: "Your financial data is protected" },
    ],
  },

  intro: {
    title: "Hire Expert Payroll Professionals to Expand Your Accounting Firm",
    body: [
      "Our skilled and experienced payroll professionals help CPA and accounting firms manage recurring payroll requirements with greater efficiency. From payroll processing and reconciliation to reporting and year-end support, our professionals can become an extension of your existing accounting team.",
    ],
    bodyMore: [
      "Our ",
      // Drawn as a link without a target: points at the payroll service page.
      {
        text: "payroll professionals",
        href: routes.service("outsourced-payroll-compliance-services"),
      },
      " can work with your preferred processes, accounting systems, payroll platforms, and client workflows to deliver customized payroll support according to your business requirements.",
    ] satisfies RichText,
    bodyMoreLayout: "paragraph",
    image: {
      src: "/images/hire/intro-payroll.jpg",
      alt: "Payroll professional checking her phone at a desk with reports on the monitor",
      width: 1480,
      height: 833,
    },
    // As drawn: "Flexible Engagement Models" and "Flexible Engagements" both appear. Confirm.
    checks: [
      "Flexible Engagement Models",
      "U.S. Business & CPA Firm Support",
      "Flexible Engagements",
    ],
    checksStyle: "list",
    cta: schedule("Build your payroll team"), // COPY FIX: drawn with double spaces ("your  payroll  team")
  },

  benefits: {
    badge: "Key Benefits",
    title: "Why CPA Firms Hire Dedicated Payroll Professionals",
    body: "Add payroll capacity with dedicated professionals who work within your existing systems, processes, and payroll requirements.",
    cta: { label: "Let's Discuss Project", href: routes.contact() }, // COPY FIX: drawn as "Lets"
    // As drawn: all five cards are leftover copy from the audit page (audit capacity, workpapers,
    // audit evidence). Kept verbatim until payroll copy is supplied. Confirm the copy.
    items: [
      {
        tone: "white",
        icon: "group_search",
        title: "Increase Audit Capacity",
        body: [
          "Add professionals who can support audit procedures, documentation, testing, reconciliations, and other engagement-related tasks as your workload increases.",
        ],
      },
      {
        tone: "white",
        icon: "how_to_reg",
        title: "Reduce Audit Workload",
        body: [
          "Delegate recurring ",
          // Drawn as a link without a target: points at the audit hire page (matches the words).
          { text: "audit tasks", href: routes.hireStaff("hire-audit-assurance-staff") },
          " and documentation work to dedicated professionals, giving your core team more time to focus on review, client communication, and higher-level responsibilities.",
        ],
      },
      {
        tone: "white",
        icon: "add_chart",
        title: "Maintain Consistent Audit Processes",
        body: [
          "Work with professionals who become familiar with your audit methodology, software, documentation standards, and internal procedures to support a consistent workflow.",
        ],
      },
      {
        tone: "white",
        icon: "electric_bolt",
        title: "Support Multiple Engagements",
        body: [
          "For CPA and accounting firms, dedicated audit professionals can provide additional capacity across multiple client engagements without requiring you to expand your internal team for every workload change.",
        ],
      },
      {
        tone: "white",
        icon: "track_changes",
        title: "Keep Audit Work Organized",
        body: [
          "Maintain structured workpapers, supporting schedules, documentation, and audit evidence so your team can review information efficiently throughout the engagement.",
        ],
      },
    ],
  },

  expertise: {
    id: "expertise",
    badge: "Our Payroll Expertise",
    title: "Our Payroll Professionals Have Expertise in",
    subtitle:
      "Experienced payroll professionals supporting payroll processing, reporting, employee records, tax requirements, and compliance-related tasks.",
    // Drawn as light cards with icon + title + body; icons from the design (add_chart is drawn
    // on both of the last two tiles).
    items: [
      {
        icon: "book_4",
        title: "Payroll Processing",
        body: "Manage recurring payroll tasks across your client accounts while following your firm's established procedures.",
      },
      {
        icon: "assured_workload",
        title: "Employee & Payroll Data",
        body: "Maintain employee records, process changes, and ensure payroll information is organized and ready for processing.",
      },
      {
        icon: "event_available",
        title: "Payroll Reconciliation",
        body: "Compare payroll records, liabilities, reports, and accounting entries to help maintain accurate books.",
      },
      {
        icon: "receipt_long",
        title: "Payroll Reporting",
        body: "Prepare recurring payroll reports and provide the information your accounting team needs for review.",
      },
      {
        icon: "add_chart",
        title: "Year-End Payroll Support",
        body: "Assist with year-end payroll activities, documentation, W-2s, 1099s, and related client requirements.",
      },
      {
        icon: "add_chart",
        title: "Client Payroll Support",
        body: "Help collect information, follow up on missing data, manage documentation, and support recurring client communication.",
      },
    ],
  },

  models: {
    id: "hiring-models",
    badge: "Hiring Models",
    title: "Flexible Payroll Engagement Models",
    subtitle: "Choose the support model that fits your workload, scope, and payroll needs.",
    featuredLabel: "Most Popular",
    // As drawn: card titles, taglines and bodies are the accounting page's; only the feature
    // lists are payroll-specific. Confirm the copy.
    items: [
      {
        number: "01",
        icon: "history_2",
        title: "Hourly Accounting Support",
        tagline: "Flexible help when you need it",
        body: "Handle overflow, catch-up, cleanup, and variable accounting workloads.",
        features: [
          "Pay-as-you-go hours",
          "Payroll data entry & updates",
          "Payroll reconciliation support",
          "Payroll reporting assistance",
        ],
        cta: { label: "Get Started", href: routes.contact() },
      },
      {
        number: "02", // COPY FIX: drawn as "01" (same number as the first card)
        title: "Dedicated Accountant",
        tagline: "Consistent support from a dedicated professional",
        // As drawn: the design repeats the Hourly card's sentence here. Confirm the copy.
        body: "Handle overflow, catch-up, cleanup, and variable accounting workloads.",
        features: [
          "Dedicated full-time or fractional support",
          "Payroll processing & administration",
          "Payroll reconciliations & reporting",
          "Employee payroll record management",
        ],
        cta: { label: "Choose Your Model", href: routes.contact() },
        featured: true,
      },
      {
        number: "03",
        icon: "assignment",
        title: "Project-Based Accounting",
        tagline: "Focused support for defined assignments",
        body: "Get dedicated help for cleanup, migration, catch-up, or specific projects.",
        features: [
          "Payroll system migration",
          "Payroll cleanup & catch-up",
          "Multi-entity payroll projects",
          "Fixed-scope project support",
        ],
        cta: { label: "Discuss Your Project", href: routes.contact() },
      },
    ],
  },

  steps: {
    badge: "Hiring Process",
    title: "Hire Your Dedicated Payroll Professionals in 5 Simple Steps",
    subtitle:
      "Build your payroll team with dedicated professionals who work with your existing systems, processes, and requirements.",
    steps: [
      {
        title: "Share Your Requirements",
        body: "Tell us about your payroll workload, processes, systems, and support requirements.",
      },
      {
        title: "Discuss Your Needs",
        body: "We review your requirements and identify the experience and payroll skills needed.",
      },
      {
        title: "Meet the Professionals",
        body: "Review suitable payroll professionals based on your business and team requirements.",
      },
      {
        title: "Select Your Support",
        body: "Choose a dedicated, ongoing, project-based, or seasonal engagement model.",
      },
      {
        title: "Start Your Engagement",
        body: "Your selected professionals begin supporting your payroll work within your existing processes and workflows.",
      },
    ],
    photos: [
      {
        src: "/images/hire/steps-team.jpg",
        alt: "Payroll team reviewing figures together on a monitor",
        width: 512,
        height: 279,
      },
      {
        src: "/images/hire/steps-tablet.jpg",
        alt: "Payroll professional smiling while working on a tablet",
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
      // COPY FIX: drawn as the template placeholder "Developers hired last week"; label taken
      // from the reference page. Confirm.
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
    title: "Choose the Right Payroll Professional for Your Needs",
    subtitle: "Choose a flexible engagement model that fits your needs and budget.",
    listLabel: "Core Responsibilities",
    featuredLabel: "Most Popular", // COPY FIX: the featured pill is drawn as a second "MID LEVEL"
    items: [
      {
        level: "Junior Level",
        title: "Payroll Associate",
        experience: "6 months – 2 years", // COPY FIX: drawn with a hyphen ("6 months - 2 years")
        responsibilities: [
          // COPY FIX: drawn with a leading space and "Auditing employee" also set in bold.
          {
            label: "Time Tracking",
            text: "Auditing employee timesheets for accuracy and supervisor approval",
          },
          {
            label: "Profile Management",
            text: "Setting up new hires in the payroll system and verifying W-4/I-9 data",
          },
          {
            label: "Inquiry Support",
            text: "Responding to employee questions regarding paystubs or address changes",
          },
          {
            label: "Data Entry",
            text: "Inputting employee information, pay rates, and deductions accurately",
          },
          { label: "Report Generation", text: "Creating basic payroll reports for review" },
        ],
        cta: { label: "Get Started", href: routes.contact() },
      },
      {
        level: "Mid Level",
        title: "Payroll Specialist",
        experience: "3 – 5 years", // COPY FIX: drawn as "3-5 years"
        responsibilities: [
          {
            label: "Full-Cycle Processing",
            text: "Executing multi-state payroll runs for hourly and salaried staff",
          },
          {
            label: "Benefits Admin",
            text: "Tracking 401(k) deferrals, HSA contributions, and health insurance deductions",
          },
          {
            label: "Tax Payments",
            text: "Calculating and initiating 941 (Federal) and SUI/SIT (State) tax deposits",
          },
          {
            label: "Garnishments",
            text: "Processing court-ordered wage garnishments for child support, student loans, or tax levies",
          },
          {
            label: "Multi-State Compliance",
            text: "Managing payroll for employees across multiple state jurisdictions",
          },
          {
            label: "Reconciliation",
            text: "Reconciling payroll liabilities and ensuring proper G/L posting",
          },
        ],
        cta: { label: "Get Started", href: routes.contact() },
        featured: true,
      },
      {
        level: "Senior Level",
        title: "Payroll Compliance Manager",
        experience: "5+ years experience",
        responsibilities: [
          {
            label: "Year-End Filing",
            text: "Leading the production and e-filing of W-2s and 1099-NECs",
          },
          {
            label: "Nexus Registration",
            text: "Opening new state and local tax accounts for remote employees",
          },
          {
            label: "Workers Comp Audits",
            text: "Preparing payroll data and reports for annual insurance audits",
          },
          {
            label: "Compliance Management",
            text: "Ensuring adherence to federal, state, and local payroll regulations",
          },
          {
            label: "Process Optimization",
            text: "Implementing best practices and workflow improvements for payroll operations",
          },
          {
            label: "Team Leadership",
            text: "Supervising junior payroll staff and performing quality reviews",
          },
          {
            label: "Audit Support",
            text: "Managing payroll audits and responding to agency inquiries",
          },
        ],
        cta: { label: "Get Started", href: routes.contact() },
      },
    ],
  },

  audiences: {
    badge: "Who We Support", // COPY FIX: drawn as the truncated placeholder "Work with"
    title: "Businesses We Work With",
    // COPY FIX: drawn with the audit page's wording ("dedicated audit support", "our audit
    // professionals", "audit workflows"); "audit" → "payroll".
    subtitle:
      "Whether you need dedicated payroll support, additional engagement capacity, or seasonal assistance, our payroll professionals can work within your existing team and payroll workflows.",
    items: [
      {
        title: "Startups",
        body: "Whether you need ongoing payroll assistance, additional payroll capacity, or dedicated professionals, our team can support your existing workflow.",
        image: {
          src: "/images/hire/audience-business-owners.jpg",
          alt: "Four startup team members standing together in a modern office",
          width: 828,
          height: 466,
        },
        cta: { label: "Get Started", href: routes.contact() },
      },
      {
        title: "Small & Medium Businesses",
        body: "Extend your payroll capabilities and support client payroll requirements.",
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
        // COPY FIX: drawn as "Add experienced audit professionals" (audit page leftover).
        body: "Add experienced payroll professionals to support internal teams, specific projects, or increased engagement workloads.",
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
    title: "Why Choose Xconcile for Payroll Support",
    subtitle:
      "Xconcile provides experienced payroll professionals to support your existing systems and workflows. Get dedicated support for payroll processing, records, documentation, and ongoing payroll tasks.",
    features: [
      {
        icon: "contextual_token_add",
        title: "Experienced Professionals",
        body: "Experienced payroll professionals for routine payroll tasks.",
      },
      {
        icon: "deployed_code_account",
        title: "Flexible Staffing",
        body: "Flexible payroll support based on your workload and needs.",
      },
      {
        icon: "contact_phone",
        title: "Scalable Capacity",
        body: "Add payroll resources as your workload and needs increase.",
      },
      {
        icon: "page_info",
        title: "Structured Communication",
        body: "Clear tasks, deliverables, updates, and communication.",
      },
      {
        icon: "person",
        title: "Dedicated Coordination",
        body: "A dedicated contact keeps payroll tasks and timelines organized.",
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

  // Same layout as the reference: badge + subtitle, shield banner with the H2, then three
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
    // Tabs as drawn (Figma, not Sanity). Only the first tab has tools in the design; tabs
    // without tools stay hidden until their tools are supplied.
    categories: [
      {
        id: "full-service-payroll",
        icon: "calculate",
        // COPY FIX: the open panel is titled "Audit Software" while this tab is active.
        label: "Full-Service Payroll",
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
      {
        id: "time-tracking-scheduling",
        icon: "dvr",
        label: "Time Tracking & Scheduling",
        tools: [],
      },
      {
        id: "accounting-integration",
        icon: "analytics",
        label: "Accounting Integration",
        tools: [],
      },
      {
        id: "hr-management-systems",
        icon: "assignment",
        label: "HR Management Systems (HRIS)",
        tools: [],
      },
    ],
  },

  faq: {
    badge: "FAQ",
    title: "Frequently asked questions",
    // COPY FIX: drawn as "our audit professionals" (audit page leftover).
    intro: "Get answers about our payroll professionals, support options, and hiring process.",
    // NOT IN DESIGN: the design draws the questions collapsed, without answers. Each answer
    // only restates claims made elsewhere on this page; confirm.
    items: [
      {
        q: "What do dedicated payroll professionals do?",
        a: [
          "Dedicated payroll professionals support payroll processing, employee and payroll data, payroll reconciliation, payroll reporting, year-end payroll support, and client payroll support. They work with your preferred processes, accounting systems, payroll platforms, and client workflows.",
        ],
      },
      {
        q: "Can CPA firms hire dedicated payroll professionals?",
        a: [
          "Yes. Our payroll professionals help CPA and accounting firms manage recurring payroll requirements, from payroll processing and reconciliation to reporting and year-end support, and can become an extension of your existing accounting team.",
        ],
      },
      {
        q: "What payroll tasks can I outsource to Xconcile?",
        a: [
          "You can outsource payroll processing, employee record management, payroll reconciliations and reporting, multi-state payroll compliance, payroll tax deposits, benefits and garnishment processing, and year-end W-2 and 1099 filing.",
        ],
      },
      {
        q: "How can payroll outsourcing help my business manage costs?",
        a: [
          "You add payroll capacity with dedicated professionals who work within your existing systems and processes, without expanding your in-house team. Choose hourly, dedicated, or project-based support so you only pay for the level of support your workload needs.",
        ],
      },
      {
        q: "Can I hire payroll professionals for seasonal workloads?",
        a: [
          "Yes. You can choose a dedicated, ongoing, project-based, or seasonal engagement model, including pay-as-you-go hourly support for variable workloads.",
        ],
      },
      {
        q: "How long does it take to onboard dedicated payroll professionals?",
        a: [
          "Onboarding follows five steps: share your requirements, discuss your needs, meet the professionals, select your support, and start your engagement. Our average match time is 48 hours.",
        ],
      },
    ],
  },

  ctaBand: {
    title: "Need Dedicated Payroll Professionals for Your Business?",
    body: "Add experienced payroll professionals to handle payroll processing, employee records, reporting, documentation, and ongoing payroll tasks.",
    cta: schedule("Hire Payroll Professionals"),
    // NOT IN DESIGN: the band is drawn without a photo; `image` is required by the shared
    // block, so the reference page's photo is reused. Confirm.
    image: { src: "/images/hire/cta-office.jpg", alt: "", width: 1500, height: 844 },
  },
};
