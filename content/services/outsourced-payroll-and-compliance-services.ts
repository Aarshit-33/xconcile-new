/**
 * Outsourced Payroll & Compliance Services (`/outsourced-payroll-and-compliance-services`).
 *
 * Sources:
 *  - Copy: the Figma design `pages/services/outsourced-payroll-services.svg` (2026-10-25 export).
 *  - Service task lists, the tools tabs and two FAQ answers: docs/content/Payroll & Compliance.md.
 *
 * Every deviation from the drawn copy is marked `COPY FIX`; text that is not in the design at
 * all is marked `NOT IN DESIGN` and needs client confirmation.
 */
import { home } from "@/content/home";
import { SCHEDULE_HREF, type RichText } from "@/content/types";
import type { ServicePageContent } from "@/content/services/types";
import { routes } from "@/lib/routes";

export const outsourcedPayrollAndComplianceServices: ServicePageContent = {
  slug: "outsourced-payroll-and-compliance-services",
  name: "Outsourced Payroll & Compliance Services",

  seo: {
    // Fallbacks; Sanity `seo` wins when present.
    title: "Outsourced Payroll & Compliance Services for CPA Firms",
    description:
      "Outsourced payroll and compliance services for U.S. businesses and CPA firms: payroll processing, multi-state payroll tax, benefits, W-2s and HR support.",
    keywords: [
      "outsourced payroll services",
      "payroll and compliance services",
      "outsourced payroll for CPA firms",
      "payroll processing services",
      "multi-state payroll tax compliance",
      "white-label payroll support",
      "W-2 and 1099 year-end reporting",
      "payroll benefits and deduction administration",
    ],
  },

  hero: {
    badge: "Payroll & Compliance Support",
    title: "Outsourced Payroll & Compliance Services",
    subtitle:
      "Xconcile provides outsourced payroll support for U.S. businesses and CPA firms, helping manage payroll processing, reporting, compliance, and related tasks",
    // No contact section on service pages: CTAs open the Calendly popup.
    primaryCta: { label: "Get expert payroll support", href: routes.contact() },
    // Client rule: "Explore our services" scrolls to this page's services section.
    secondaryCta: { label: "Explore Our Services", href: "#services" },
    checks: [{ label: "ISO 27001 - ISO 27701" }, { label: "US GAAP Expertise" }],
  },

  stats: {
    items: [
      { value: "10+", label: "Payroll Expertise" },
      { value: "1K+", label: "Flexible Engagements" },
      { value: "50+", label: "Payroll Professionals" },
      { value: "98%", label: "Secure Workflows" },
    ],
    rating: { value: "4.3", source: "Google" },
  },

  intro: {
    title: "Outsourced Payroll Services for U.S. Businesses",
    body: [
      // COPY FIX: drawn with a double full stop ("timely attention.. As payroll").
      "As a business grows, payroll can become harder to manage internally. Employee information, payroll taxes, reporting, and filing deadlines all add to the regular workload and require timely attention. As payroll operations become more demanding, handling these responsibilities internally can take valuable time from your team.",
    ] satisfies RichText,
    bodyMore: [
      "Xconcile provides outsourced payroll and compliance services for U.S. businesses and CPA firms. Our ",
      { text: "payroll professionals", href: routes.hireStaff("hire-payroll-and-compliance") },
      " bring structured processes and accounting expertise to manage payroll processing, reporting, administration, and related compliance work according to your requirements. We work within your existing processes to provide dependable payroll support and help keep day-to-day payroll responsibilities under control.",
    ] satisfies RichText,
    bodyMoreLayout: "paragraph",
    // Fallback (design photo); the Sanity intro image wins when present.
    image: {
      src: "/images/services/outsourced-payroll-and-compliance-services/intro-payroll-paperwork.jpg",
      alt: "Payroll specialist reviewing printed documents at her desk",
      width: 1480,
      height: 986,
    },
    checks: ["Accurate Payroll Processing", "Timely Payroll Reporting", "Compliance Support"],
    checksStyle: "list",
    // COPY FIX: drawn as "Talk to an Audit Expert" (copied from the audit page).
    cta: { label: "Talk to a Payroll Expert", href: SCHEDULE_HREF },
  },

  challenges: {
    badge: "Key Challenges",
    title: "Why Businesses & Accounting Firms Outsource Payroll Work",
    body: "Payroll involves complex calculations, deadlines, and compliance requirements. Xconcile helps businesses and CPA firms manage payroll processing and reporting with reliable support.",
    cta: { label: "Let's Discuss Project", href: routes.contact() }, // COPY FIX: "Lets"
    items: [
      {
        tone: "rose",
        icon: "hourglass_top",
        title: "Time-Consuming Payroll Tasks",
        body: ["Recurring payroll activities can take valuable time from your team."],
      },
      {
        tone: "amber",
        icon: "verified_user",
        title: "Payroll Compliance Requirements",
        body: ["Stay organized with changing payroll and tax-related requirements."],
      },
      {
        tone: "blue",
        icon: "edit_note",
        title: "Manual Data Management",
        body: ["Reduce workload from repetitive payroll processes and reporting."],
      },
      {
        tone: "purple",
        icon: "groups_2",
        title: "Limited Internal Capacity",
        body: ["Get additional payroll support when your workload increases."],
      },
    ],
  },

  services: {
    id: "services",
    badge: "Services",
    title: "Our Outsourced Payroll Services",
    // COPY FIX: drawn as "Support for sales tax registration, filings, reporting, and compliance
    // across multiple states." (copied from the sales tax page). Confirm payroll wording.
    subtitle:
      "Support for payroll processing, tax filings, reporting, and compliance across multiple states.",
    initiallyVisible: 5,
    // Fallback rows (drawn titles + subtitles). `groups`: copied from
    // docs/content/Payroll & Compliance.md (H3 1–5), "Task:"/"Micro-Task:" prefixes and markdown
    // removed.
    items: [
      {
        icon: "account_balance_wallet",
        title: "Full-Cycle Payroll Processing",
        description: "Timely and accurate pay delivery for diverse workforces",
        groups: [
          {
            title: "Pay Cycle Management",
            items: [
              "Processing payroll for all frequencies (Weekly, Bi-weekly, Semi-monthly, and Monthly).",
              "Handling multiple pay types: Salary, Hourly (Regular/Overtime), Commissions, and Bonuses.",
              'Managing "Final Paycheck" requirements for terminated employees (meeting state-specific immediate payment laws).',
            ],
          },
          {
            title: "Data Integration & Entry",
            items: [
              "Syncing time-tracking software (TSheets, ClockShark) with the payroll system.",
              'Auditing manual timesheets for "Buddy Punching" or missing supervisor approvals.',
            ],
          },
          {
            title: "Payment Distribution",
            items: [
              "Coordinating Direct Deposit (ACH) files and printing physical checks (where required).",
              'Loading and managing "Pay Cards" for unbanked employees.',
            ],
          },
        ],
      },
      {
        icon: "account_balance",
        title: "Multi-State Payroll Tax Compliance",
        description: "Navigating the complexity of 50 different state tax jurisdictions",
        groups: [
          {
            title: "Federal Tax Obligations",
            items: [
              "Calculating and initiating payments for 941 (Quarterly Federal Tax) and 940 (Annual FUTA).",
              "Reconciling total tax deposits against payroll reports to ensure zero variance.",
            ],
          },
          {
            title: "State & Local Tax (SIT/SUI)",
            items: [
              "Managing State Unemployment Insurance (SUI) rates and local city/county taxes.",
              "Registering for new state tax IDs when a client hires their first remote employee in a new state.",
            ],
          },
          {
            title: "Regulatory Reporting",
            items: [
              'Filing "New Hire Reporting" forms with state agencies within 20 days of hire.',
              'Responding to "Notice of Tax Rate" changes from state unemployment agencies.',
            ],
          },
        ],
      },
      {
        icon: "shield_person",
        title: "Benefits & Deduction Administration",
        description: 'Precision in "Gross-to-Net" calculations',
        groups: [
          {
            title: "Retirement & Insurance",
            items: [
              "Tracking 401(k), 403(b), and Simple IRA deferrals and employer matching.",
              "Uploading retirement contribution files to providers like Vanguard, Fidelity, or Guideline.",
              "Deducting Health, Dental, Vision, and HSA/FSA premiums based on plan enrollment.",
            ],
          },
          {
            title: "Statutory Garnishments",
            items: [
              "Processing court-ordered wage garnishments for child support, student loans, or tax levies.",
              "Communicating with state agencies to confirm receipt of garnishment payments.",
            ],
          },
          {
            title: "Workers' Compensation",
            items: [
              'Setting up "Pay-as-you-go" Workers’ Comp integrations.',
              "Preparing the annual payroll audit reports for workers’ comp insurance providers.",
            ],
          },
        ],
      },
      {
        icon: "add_chart",
        title: "Year-End Reporting & Reconciliation",
        description: "Ensuring a stress-free January for the client",
        groups: [
          {
            title: "W-2 & 1099 Issuance",
            items: [
              "Reconciling annual payroll totals before generating W-2s (Employees) and 1099-NECs (Contractors).",
              "Handling electronic filing (E-file) of W-3 and 1096 summary forms with the SSA/IRS.",
            ],
          },
          {
            title: "Compliance Audits",
            items: [
              'Performing year-end "Reasonableness Tests" to catch errors before the IRS does.',
              "Ensuring taxable fringe benefits (like personal use of company car) are added to W-2s.",
            ],
          },
        ],
      },
      {
        // Drawn with the same icon as row 04.
        icon: "group",
        title: "HR Administrative Support",
        description: 'The "People" side of the payroll process',
        groups: [
          {
            title: "Onboarding & Offboarding",
            items: [
              "Setting up new employee profiles in the HRIS (Human Resources Information System).",
              "Collecting and verifying Form I-9 and W-4 (Federal/State withholding certificates).",
            ],
          },
          {
            title: "Employee Self-Service (ESS)",
            items: [
              "Training and supporting employees on how to access pay stubs and year-end tax forms.",
              "Updating address changes, bank details, and withholding status upon request.",
            ],
          },
        ],
      },
    ],
  },

  caseStudies: {
    badge: "Testimonials",
    title: "Trusted by Our Clients",
    subtitle:
      "See how Xconcile helps businesses improve efficiency, visibility, and financial operations.",
    // Only "CPA Firms" has copy in the design; other drawn tabs (Real Estate, E-commerce,
    // Construction, Restaurants) appear once their case studies exist. Never invent client results.
    items: [
      {
        id: "cpa-firms",
        label: "CPA Firms",
        title: "CPA Firms",
        challenge: "Growing workload and limited accounting capacity.",
        solution: "Dedicated outsourced accounting support.",
        result:
          "Better financial visibility, streamlined operations, and reduced accounting workload.",
        // NOT IN DESIGN: impact figure reused from Home; confirm with the client.
        impact: home.caseStudies.items[0].impact,
        // The drawn photo is Home's CPA case-study photo (verified against the design image).
        image: home.caseStudies.items[0].image,
        // No case-study pages exist yet, so the button opens the matching industry page.
        cta: { label: "View Case Study", href: routes.industry("professional-services") },
      },
    ],
  },

  process: {
    badge: "How It Works",
    title: "Our Payroll Support Process",
    subtitle:
      "Our process covers payroll requirements, system setup, processing, reporting, and compliance tasks.",
    steps: [
      {
        icon: "search",
        title: "Understand",
        body: "Review payroll needs, employee information, systems, and workflows.",
      },
      {
        icon: "assignment",
        title: "Plan",
        body: "Define payroll tasks, responsibilities, schedules, and reporting needs.",
      },
      {
        icon: "rocket_launch",
        title: "Onboard",
        body: "Align our team with your payroll systems, processes, and requirements.",
      },
      {
        icon: "bucket_check",
        title: "Manage",
        body: "Manage payroll processing, records, reporting, and compliance tasks.",
      },
      {
        icon: "autorenew",
        title: "Review & Improve",
        body: "Review payroll work and improve processes as your needs change.",
      },
    ],
  },

  industries: {
    badge: "Industries We Serve",
    title: "Payroll Support Across Industries",
    subtitle:
      "Professional payroll support for managing employee payments, records, reporting, and compliance requirements.",
    // Not drawn (no button beside the heading); `href: undefined` keeps it hidden.
    cta: { label: "Explore More", href: undefined },
    // Links use the live industry slugs; Education, Pharmaceutical and Manufacturing have no
    // industry page (plain cards).
    items: [
      {
        title: "CPA & Accounting Firms",
        body: "Extend payroll capabilities with reliable outsourced support.",
        href: routes.industry("professional-services"),
        image: home.industries.items[0].image,
      },
      {
        title: "Healthcare",
        body: "Reliable payroll assistance for healthcare teams and staff.",
        href: routes.industry("medical-health"),
        image: home.industries.items[1].image,
      },
      {
        title: "Real Estate",
        body: "Manage payroll needs for real estate teams and companies.",
        href: routes.industry("real-estate-construction"),
        image: home.industries.items[2].image,
      },
      {
        title: "Retail",
        body: "Support payroll processes for retail businesses and teams.",
        href: routes.industry("hospitality-retail"),
        image: home.industries.items[3].image,
      },
      {
        title: "Education",
        // COPY FIX: drawn as "Education sales tax reporting and compliance support" (copied from
        // the sales tax page).
        body: "Education payroll reporting and compliance support",
        image: {
          src: "/images/industries/education.jpg",
          alt: "Students working at desks in a classroom",
          width: 500,
          height: 311,
        },
      },
      {
        title: "Pharmaceutical",
        body: "Payroll support for pharmaceutical teams and business operations.",
        image: {
          src: "/images/industries/pharmaceutical.jpg",
          alt: "Pharmacist taking stock from pharmacy shelves",
          width: 500,
          height: 333,
        },
      },
      {
        title: "eCommerce",
        body: "Manage payroll needs for growing online businesses and teams.",
        href: routes.industry("tech-ecommerce"),
        image: {
          src: "/images/industries/ecommerce.jpg",
          alt: "Online seller packing orders at a desk",
          width: 500,
          height: 334,
        },
      },
      {
        title: "Manufacturing",
        body: "Organized payroll support for manufacturing workforce needs.",
        image: {
          ...home.industries.items[0].image,
          alt: "Sparks flying from metal grinding in a factory",
        },
      },
    ],
  },

  whyChoose: {
    badge: "Why Choose Us",
    title: "Why Businesses & CPA Firms Choose Xconcile for Payroll Support",
    subtitle:
      "Get reliable, on-time payroll support from experienced professionals. Manage payroll accurately, stay compliant, and save valuable time.",
    features: [
      {
        icon: "contextual_token_add",
        title: "Reliable Payroll Support",
        // COPY FIX: drawn as "Help manage sales tax activities across multiple states." (copied
        // from the sales tax page).
        body: "Help manage payroll activities across multiple states.",
      },
      {
        icon: "deployed_code_account",
        title: "Payroll Expertise",
        body: "Professionals familiar with U.S. payroll workflows",
      },
      {
        icon: "contact_phone",
        title: "Flexible Support",
        body: "Choose payroll support based on your business needs",
      },
      {
        icon: "page_info",
        title: "Secure Data Handling",
        body: "Structured processes to protect sensitive payroll data",
      },
      {
        icon: "add_chart",
        title: "Scalable Payroll Support",
        body: "Adjust payroll support as your business requirements change",
      },
    ],
    // Same four photos and stats as Home (verified against the design images).
    images: home.whyChoose.images,
    stats: home.whyChoose.stats,
  },

  tools: {
    badge: "Software Expertise",
    title: "Your Tools, Our Expertise",
    subtitle:
      "Work with professionals experienced in major accounting platforms and tools, without changing the workflows your business already relies on.",
    categories: [
      {
        id: "accounting-software",
        icon: "calculate",
        // The open panel is headed "Audit Software" in the design (copied from the audit page);
        // the drawn tab label is used.
        label: "Accounting Software",
        tools: [
          // COPY FIX: drawn as "CaseWare Working Papers" (audit software, copied from the audit
          // page) next to the QuickBooks logo; the payroll copy names QuickBooks Online.
          {
            name: "QuickBooks Online",
            logo: "/images/tools/quickbooks.png",
            width: 80,
            height: 80,
          },
          { name: "Xero", logo: "/images/tools/xero.png", width: 80, height: 80 },
          { name: "NetSuite", logo: "/images/tools/netsuite.svg", width: 34, height: 32 },
          { name: "Sage", logo: "/images/tools/sage.png", width: 160, height: 90 },
          { name: "Dynamics 365", logo: "/images/tools/dynamics-365.png", width: 60, height: 80 },
          { name: "Bill.com", logo: "/images/tools/bill-com.png", width: 80, height: 80 },
          { name: "Zoho Books", logo: "/images/tools/zoho-books.png", width: 160, height: 69 },
          { name: "FreshBooks", logo: "/images/tools/freshbooks.png", width: 80, height: 80 },
        ],
      },
      // COPY FIX: the other drawn tabs ("Audit Software", "Data Analytics & Testing",
      // "Confirmation & Documentation", "Audit Software" again) are copied from the audit page.
      // NOT IN DESIGN: labels and tool names come from the "Payroll App Stack" in
      // docs/content/Payroll & Compliance.md; the duplicate 5th tab is dropped. Confirm and add
      // logos.
      {
        id: "payroll-software",
        icon: "dvr",
        label: "Payroll Software",
        tools: [
          { name: "Gusto" },
          { name: "ADP Run/Workforce Now" },
          { name: "Paychex" },
          { name: "Rippling" },
        ],
      },
      {
        id: "time-tracking",
        icon: "analytics",
        label: "Time Tracking",
        tools: [{ name: "TSheets (QuickBooks Time)" }, { name: "Deputy" }, { name: "ClockShark" }],
      },
      {
        id: "workflow-management",
        icon: "assignment",
        label: "Workflow Management",
        tools: [{ name: "Karbon" }, { name: "Canopy" }, { name: "ClickUp" }],
      },
    ],
  },

  testimonials: { ...home.testimonials, title: "Trusted by Our Clients" },

  blog: home.blog,

  faq: {
    badge: "FAQ",
    title: "Frequently asked questions",
    intro: "Find answers to common questions about outsourced payroll services.",
    // NOT IN DESIGN: the design draws the questions collapsed, without answers. Answers 3 and 6
    // are adapted from the FAQs in docs/content/Payroll & Compliance.md; the others are written
    // only from claims already made on this page and in that doc. Confirm.
    items: [
      {
        q: "What payroll services can Xconcile provide for U.S. businesses?",
        a: [
          "Xconcile supports the full payroll cycle: payroll processing for every pay frequency, multi-state payroll tax compliance, benefits and deduction administration, year-end reporting and reconciliation (including W-2s and 1099-NECs), and HR administrative support such as onboarding, offboarding, and employee self-service.",
        ],
      },
      {
        q: "Why do businesses outsource payroll processing?",
        a: [
          "Payroll involves complex calculations, deadlines, and compliance requirements. Outsourcing frees your team from time-consuming recurring payroll tasks, keeps you organized as payroll and tax requirements change, reduces repetitive manual data work, and adds payroll support when your workload increases.",
        ],
      },
      {
        q: "Can Xconcile work with our existing payroll process?",
        a: [
          "Yes. We are tech-agnostic and work in the systems you already trust, whether you use Gusto, Rippling, ADP Workforce Now, or QuickBooks Payroll. We handle gross-to-net calculations, garnishment management, and benefit deductions within your existing stack, ensuring a seamless data flow to the general ledger.",
        ],
      },
      {
        q: "Can CPA firms outsource payroll work for their clients?",
        a: [
          "Yes. Our white-label payroll support works as an extension of your firm, so you can offer payroll services to your clients without the overhead of local hiring. We handle the day-to-day payroll processing and compliance work, so your senior staff can focus on high-value advisory roles.",
        ],
      },
      {
        q: "How can I get started with Xconcile’s outsourced payroll services?",
        a: [
          "Schedule a meeting with our team. We review your payroll needs, employee information, systems, and workflows, define payroll tasks, schedules, and reporting needs, and align our team with your payroll systems before we start managing payroll processing, reporting, and compliance tasks.",
        ],
      },
      {
        // COPY FIX: drawn in title case without a question mark ("Can Xconcile Handle Multi-State
        // Payroll and Compliance").
        q: "Can Xconcile handle multi-state payroll and compliance?",
        a: [
          "Yes. Our team specializes in multi-state compliance, ensuring that SUI, SDI, and local occupational taxes are calculated with precision across all 50 states. We monitor nexus changes and local rate updates proactively, so you don't have to worry about late-payment notices or IRS penalties.",
        ],
      },
    ],
  },

  ctaBand: {
    title: "Need Reliable Payroll Support for Your Business?",
    body: "Get experienced payroll professionals to help manage recurring payroll activities and compliance requirements.",
    // "Hire" button: opens the matching hire page (as the industry pages' "Hire Accounting Staff").
    cta: { label: "Hire Accounting Staff", href: routes.hireStaff("hire-payroll-and-compliance") },
    // The design draws this band as a flat colour with no photo; the type requires an image, so
    // the audit page's band photo is reused.
    image: { src: "/images/services/cta-handshake.jpg", alt: "", width: 1500, height: 1000 },
  },
};
