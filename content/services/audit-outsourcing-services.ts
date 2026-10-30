/**
 * Audit Outsourcing Services (`/audit-outsourcing-services`, live slug kept).
 *
 * Sources (decision 2026-10-13):
 *  - Copy: the Figma design `../pages svg, css & png/audit-outsourcing-services (main) (1)`,
 *    re-checked against the newer export `pages/services/audit-outsourcing-services.svg`
 *    (2026-10-25: only the case study changed).
 *  - Sanity (since 2026-10-17): the whole page is editable in Studio → Service Pages
 *    (`servicePage` document, slug `audit-outsourcing-services`, seeded from this file by
 *    scripts/seed-service-sanity.ts, removed 2026-10-30, in git history). This file is the fallback for any section or field left
 *    empty there (see sanity/lib/service-page.ts).
 *
 * Every deviation from the drawn copy is marked `COPY FIX`; text that is not in the design at
 * all is marked `NOT IN DESIGN` and needs client confirmation.
 */
import { home } from "@/content/home";
import { SCHEDULE_HREF, type RichText } from "@/content/types";
import type { ServicePageContent } from "@/content/services/types";
import { routes } from "@/lib/routes";

export const auditOutsourcingServices: ServicePageContent = {
  slug: "audit-outsourcing-services",
  name: "Audit Outsourcing Services",

  seo: {
    // Fallbacks; Sanity `seo` wins when present.
    title: "Audit Outsourcing Services for CPA Firms",
    description:
      "Reliable audit outsourcing services for U.S. CPA firms: audit planning, financial statement audits, documentation, testing and assurance support.",
    // Meta keywords (fallback; Sanity SEO → Meta keywords wins when filled).
    keywords: [
      "audit outsourcing services",
      "outsourced audit support for CPA firms",
      "financial statement audit outsourcing",
      "audit planning and documentation",
      "audit testing services",
      "assurance support services",
      "offshore audit staff",
      "audit workpaper preparation",
    ],
  },

  hero: {
    badge: "Trusted by 500+ USA Accounting Firms",
    title: "Audit Outsourcing Services for CPA Firms & Businesses",
    subtitle:
      "Get reliable audit outsourcing services for U.S. CPA firms, with support for audit planning, financial statement audits, documentation, testing, and assurance work.",
    // No contact section on service pages: CTAs open the Calendly popup.
    primaryCta: { label: "Get expert audit support", href: routes.contact() },
    // Client rule: "Explore our services" scrolls to this page's services section.
    secondaryCta: { label: "Explore Our Services", href: "#services" },
    checks: [
      { label: "Experienced audit professionals" },
      { label: "Secure & confidential workflow" },
    ],
  },

  stats: {
    items: [
      { value: "10+", label: "Audit Expertise" },
      { value: "1K+", label: "Businesses Supported" },
      { value: "10+", label: "Audit Professionals" },
      { value: "98%", label: "Client Satisfaction" },
    ],
    rating: { value: "4.3", source: "Google" },
  },

  intro: {
    title: "Your Trusted Partner for Outsourced Audit Support",
    body: [
      "Xconcile provides outsourced audit and assurance support for CPA firms and businesses that need reliable help with audit workloads, documentation, and financial reporting. Our ",
      {
        text: "audit experienced professionals",
        href: routes.hireStaff("hire-audit-assurance-staff"),
      },
      " work with your existing processes to support audit engagements without disrupting the way your team operates.",
    ] satisfies RichText,
    bodyMore: [
      "From audit planning and financial statement audits to risk assessment, internal control testing, documentation, and working papers, we provide practical support across key audit activities. Our team works as an extension of your existing staff, helping you manage workloads, maintain organized audit files, and keep engagements moving from planning through completion.",
    ],
    bodyMoreLayout: "paragraph",
    // Fallback (design photo); the Sanity intro image wins when present.
    image: {
      src: "/images/services/audit-intro.jpg",
      alt: "Auditor reviewing figures with a calculator and notebook",
      width: 1271,
      height: 848,
    },
    checks: [
      "Reliable Audit Support",
      "Secure & confidential workflow",
      "Flexible Engagement Models",
    ],
    checksStyle: "list",
    cta: { label: "Get Audit Support", href: SCHEDULE_HREF },
  },

  challenges: {
    badge: "Key Challenges",
    title: "Why Businesses & Accounting Firms Outsource Audit Work",
    body: "Outsourcing audit work helps businesses and accounting firms manage workloads, add skilled support, and keep audit tasks organized without increasing internal staffing.",
    cta: { label: "Let's Discuss Project", href: routes.contact() }, // COPY FIX: "Lets"
    items: [
      {
        tone: "rose",
        icon: "contextual_token_add",
        title: "Increase Audit Capacity",
        body: [
          "Expand your audit team with experienced professionals when workloads increase or you need extra support to manage engagements and complete audit work on time.",
        ],
      },
      {
        tone: "amber",
        icon: "trending_down",
        title: "Reduce Hiring Pressure",
        body: [
          "Get additional audit support without hiring permanent employees when you need extra team capacity for specific workloads or engagements.",
        ],
      },
      {
        tone: "blue",
        icon: "monitoring",
        title: "Handle Seasonal Demand",
        body: [
          "Add audit support when workloads increase so your team can handle more engagements without hiring permanent staff.",
        ],
      },
      {
        tone: "purple",
        icon: "groups_2",
        title: "Focus Internal Teams",
        body: [
          "Free up your experienced staff to focus on audit review and client needs while routine tasks are handled by support staff.",
        ],
      },
    ],
  },

  services: {
    id: "services",
    badge: "Services",
    title: "*Audit* Outsourcing Services",
    // COPY FIX: drawn as "our outsourced accounting services help businesses maintain accurate
    // financial records," (lower-case, trailing comma; Home placeholder). Confirm audit wording.
    subtitle:
      "Our outsourced accounting services help businesses maintain accurate financial records.",
    initiallyVisible: 5,
    // Fallback rows (drawn titles + subtitles). In Studio, Services → each row can also get
    // "Grouped lists" (task lists shown when the row is open).
    // `groups` (user request 2026-10-18, audit S1: rows opened to an empty panel): copied from
    // docs/content/Audit & Assurance.md (H3 1–5), "Task:" prefixes and markdown removed.
    items: [
      {
        icon: "book_4",
        title: "Audit Planning & Risk Assessment",
        description: "Strategic groundwork to ensure a focused and efficient audit",
        groups: [
          {
            title: "Pre-Audit Engagement Support",
            items: [
              "Rolling forward the previous year’s electronic audit files in software like CaseWare, AdvanceFlow, or CCH Axcess.",
              "Drafting Engagement Letters and Independence Confirmations for the audit team.",
            ],
          },
          {
            title: "Materiality & Risk Identification",
            items: [
              "Calculating Overall Materiality and Performance Materiality based on the chosen benchmark (e.g., Total Assets or Revenue).",
              "Preparing Planning Analytics (Flux Analysis) to identify significant account balances and unusual trends.",
              'Documenting the "Understanding of the Entity" and identifying fraud risk factors.',
            ],
          },
          {
            title: "PBC (Provided by Client) Management",
            items: [
              "Creating and managing a detailed PBC Checklist to track document status and follow up on missing items.",
            ],
          },
        ],
      },
      {
        icon: "assignment",
        title: "Substantive Testing & Execution",
        description: 'The "Heavy Lifting" of verifying account balances',
        groups: [
          {
            title: "Sample Selection & Testing",
            items: [
              "Using IDEA or ACL to perform statistical and non-statistical sampling.",
              "Vouching: Tracing samples from the General Ledger to source documents (Invoices, BOLs, Contracts).",
              "Tracing: Selecting source documents and tracing them into the General Ledger to ensure completeness.",
            ],
          },
          {
            title: "Account-Specific Scrutiny",
            items: [
              'Cash: Preparing bank reconciliations and performing "Casting" procedures on bank statements.',
              "Accounts Receivable: Managing the Confirmation Process (preparing, sending, and tracking responses via Confirmation.com).",
              'Inventory: Reviewing physical inventory count sheets and performing "Price Testing" (lower of cost or market).',
              "Search for Unrecorded Liabilities: Reviewing post-balance sheet payments to ensure proper period cutoff.",
            ],
          },
        ],
      },
      {
        icon: "beenhere",
        title: "Internal Control & Compliance Testing",
        description: 'Testing the "Plumbing" of the organization',
        groups: [
          {
            title: "Walkthroughs & Narratives",
            items: [
              "Documenting process walkthroughs (Sales, Payroll, Purchasing) through flowcharts and narratives.",
              'Identifying "Key Controls" within the transaction cycles.',
            ],
          },
          {
            title: "Control Testing (SOC/SOX)",
            items: [
              "Testing the Operating Effectiveness of internal controls (e.g., verifying that all checks over $5,000 have two signatures).",
              "Reporting control deficiencies (Significant Deficiencies vs. Material Weaknesses) to the onshore team.",
            ],
          },
          {
            title: "Compliance Audits",
            items: [
              "Verifying adherence to industry-specific regulations (e.g., HIPAA for Healthcare or HUD for Real Estate).",
            ],
          },
        ],
      },
      {
        icon: "add_chart",
        title: "Financial Statement Preparation & Finalization",
        description: 'The "Last Mile" of the audit engagement',
        groups: [
          {
            title: "Reporting & Disclosure",
            items: [
              "Drafting the Full Disclosure Financial Statements (P&L, Balance Sheet, Cash Flow, Footnotes) as per US GAAP.",
              "Completing Disclosure Checklists to ensure every mandatory footnote is included.",
            ],
          },
          {
            title: "Tie-out & Quality Review",
            items: [
              'Performing a "Mathematical Accuracy" (Casting) check on the entire financial report.',
              "Indexing & Cross-Referencing: Linking every number in the financial statements back to the supporting lead schedule.",
            ],
          },
          {
            title: "Completion Procedures",
            items: [
              "Drafting the Management Letter Points (MLPs) and the Audit Summary Memo.",
              'Preparing the "Representation Letter" for management signature.',
            ],
          },
        ],
      },
      {
        icon: "contact_phone",
        title: "Specialized Audit Support (Niche Areas)",
        description: "High-margin expertise for specific US requirements",
        groups: [
          {
            title: "Employee Benefit Plan (EBP) Audits",
            items: [
              "Testing participant eligibility, contributions, and distributions for 401(k) or 403(b) plans.",
            ],
          },
          {
            title: "Governmental & Single Audits",
            items: [
              "Support for Yellow Book audits and Uniform Guidance (Single Audit) compliance for non-profits receiving federal funds.",
            ],
          },
          {
            title: "Agreed-Upon Procedures (AUP)",
            items: [
              "Performing specific testing on limited financial areas as requested by third parties (e.g., royalty audits or loan covenant compliance).",
            ],
          },
        ],
      },
    ],
  },

  caseStudies: {
    badge: "Testimonials",
    title: "Trusted by Businesses & CPA Firms",
    subtitle:
      "See how Xconcile helps businesses improve efficiency, visibility, and financial operations.",
    // Only "CPA Firms" has copy in the design; other drawn tabs appear once their case studies
    // exist. Never invent client results.
    items: [
      {
        id: "cpa-firms",
        label: "CPA Firms",
        title: "CPA Firms",
        challenge: "Growing audit workloads were putting pressure on the firm’s internal team.",
        solution:
          "Dedicated outsourced audit support to streamline workflows and improve efficiency.",
        result: "Increased audit capacity, faster turnaround times, and reduced team workload.",
        // The 2026-10-25 design draws an audit-specific case study (own copy and photo) without an
        // impact card. Every case-study field stays filled (user request 2026-10-25), so it keeps
        // the CPA-firm impact figure used on Home. NOT IN DESIGN: confirm the figure with the client.
        impact: home.caseStudies.items[0].impact,
        image: {
          src: "/images/services/audit-outsourcing-services/case-study-calculator.jpg",
          alt: "Accountant writing notes while working a desktop calculator over financial reports",
          width: 1500,
          height: 1000,
        },
        // No case-study pages exist yet, so the button opens the matching industry page.
        cta: { label: "View Case Study", href: routes.industry("accounting-outsourcing-professional-services") },
      },
    ],
  },

  process: {
    badge: "How It Works",
    title: "Our Audit Outsourcing Process",
    subtitle:
      "Our audit outsourcing process covers planning, audit documentation, testing, workpaper support, and review activities.",
    steps: [
      {
        icon: "search",
        title: "Understand",
        body: "Review the audit scope, client information, reporting requirements, and engagement timeline.",
      },
      {
        icon: "assignment",
        title: "Plan",
        body: "Define audit procedures, responsibilities, documentation requirements, and key deadlines.",
      },
      {
        icon: "rocket_launch",
        title: "Onboard",
        body: "Align our team with your audit software, workpapers, client files, and review procedures.",
      },
      {
        icon: "bucket_check",
        title: "Manage",
        // COPY FIX: drawn as "Support testing, documentation, workpapers, reconciliations,"
        body: "Support testing, documentation, workpapers, and reconciliations.",
      },
      {
        icon: "autorenew",
        title: "Review & Improve",
        body: "Complete review points, organize supporting documentation, and prepare work for final review.",
      },
    ],
  },

  industries: {
    badge: "Industries We Serve",
    title: "Audit Expertise Across Industries",
    subtitle:
      "Every industry has different financial processes, reporting requirements, and compliance needs.",
    // Not drawn in the 2026-10-25 design (no button beside the heading); `href: undefined`
    // keeps it hidden.
    cta: { label: "Explore More", href: undefined },
    // Links use the live industry slugs; Education, Pharmaceutical and Manufacturing have no
    // industry page (plain cards).
    items: [
      {
        title: "CPA & Accounting Firms",
        body: "Audit and accounting support for your client work",
        href: routes.industry("accounting-outsourcing-professional-services"),
        image: home.industries.items[0].image,
      },
      {
        title: "Healthcare",
        body: "Audit support for healthcare records and finance needs.",
        href: routes.industry("healthcare-accounting-services"),
        image: home.industries.items[1].image,
      },
      {
        title: "Real Estate",
        body: "Audit support for property records and transactions",
        href: routes.industry("real-estate-accounting-services"),
        image: home.industries.items[2].image,
      },
      {
        title: "Retail",
        body: "Audit support for sales, inventory, and financial data.",
        href: routes.industry("hospitality-accounting-services"),
        image: home.industries.items[3].image,
      },
      {
        title: "Education",
        body: "Audit support for tuition, expenses, and financial records.",
        image: {
          src: "/images/industries/education.jpg",
          alt: "Students working at desks in a classroom",
          width: 500,
          height: 311,
        },
      },
      {
        title: "Pharmaceutical",
        body: "Audit support for inventory, expenses, and compliance.",
        image: {
          src: "/images/industries/pharmaceutical.jpg",
          alt: "Pharmacist taking stock from pharmacy shelves",
          width: 500,
          height: 333,
        },
      },
      {
        title: "eCommerce",
        body: "Audit support for sales, payments, inventory, and tax.",
        href: routes.industry("ecommerce-accounting-services"),
        image: {
          src: "/images/industries/ecommerce.jpg",
          alt: "Online seller packing orders at a desk",
          width: 500,
          height: 334,
        },
      },
      {
        title: "Manufacturing",
        body: "Audit support for inventory, costs, and financial records.",
        image: {
          ...home.industries.items[0].image,
          alt: "Sparks flying from metal grinding in a factory",
        },
      },
    ],
  },

  whyChoose: {
    badge: "Why Choose Us",
    title: "Why Businesses & CPA Firms Choose Xconcile for Audit Support",
    subtitle:
      "Get reliable audit support from experienced accounting professionals who help CPA firms and businesses manage audit testing, workpapers, documentation, and engagement workloads—especially during busy periods.",
    features: [
      {
        icon: "contextual_token_add",
        title: "Increase Audit Capacity",
        body: "Handle more engagements without adding pressure to your team.",
      },
      {
        icon: "deployed_code_account",
        title: "Access Audit Expertise",
        body: "Get expert support for audit testing, workpapers, and documentation.",
      },
      {
        icon: "contact_phone",
        title: "Support Busy Seasons",
        body: "Add skilled accounting support when audit workloads increase.",
      },
      {
        icon: "page_info",
        title: "Maintain Your Workflow",
        body: "Work seamlessly with your existing audit tools and processes.",
      },
      {
        icon: "add_chart",
        title: "Improve Audit Efficiency",
        body: "Keep audit tasks organized and moving efficiently from start to finish.",
      },
    ],
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
        id: "audit-software",
        icon: "calculate",
        label: "Audit Software",
        tools: [
          // COPY FIX: the design shows the QuickBooks logo on this chip; no CaseWare logo yet.
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
      // NOT IN DESIGN: the other tabs are drawn collapsed. Tool names come from the audit copy
      // (docs/content/Audit & Assurance.md); confirm and add logos.
      {
        id: "data-analytics-testing",
        icon: "dvr",
        label: "Data Analytics & Testing",
        tools: [{ name: "IDEA" }, { name: "ACL" }],
      },
      {
        id: "confirmation-documentation",
        icon: "analytics",
        label: "Confirmation & Documentation",
        tools: [{ name: "Confirmation.com" }, { name: "CCH Axcess" }, { name: "AdvanceFlow" }],
      },
      {
        // Hidden until tools are provided (no source names any research tools).
        id: "research-reference",
        icon: "assignment",
        label: "Research & Reference",
        tools: [],
      },
    ],
  },

  testimonials: { ...home.testimonials, title: "Trusted by Our Clients" },

  blog: home.blog,

  faq: {
    badge: "FAQ",
    title: "Frequently asked questions",
    intro: "Find answers to common questions about our audit outsourcing services.",
    // NOT IN DESIGN: the design draws the questions collapsed, without answers. Answers are
    // written only from claims already made on this page and in the audit copy doc; confirm.
    items: [
      {
        q: "What are audit outsourcing services?",
        a: [
          "Audit outsourcing services give CPA firms and businesses experienced support for audit work, including audit planning, risk assessment, internal control testing, documentation, working papers, and financial statement audit support. Xconcile's team works with your existing processes so engagements keep moving without disrupting the way your team operates.",
        ],
      },
      {
        q: "How do I choose the right audit outsourcing service provider?",
        a: [
          "Look for a provider with experienced audit professionals, a secure and confidential workflow, flexible engagement models, and experience with the audit software you already use, such as CaseWare, CCH Axcess, or AdvanceFlow. A clear process from planning and testing through documentation and review also helps keep quality consistent.",
        ],
      },
      {
        q: "Why should a CPA firm outsource audit work?",
        a: [
          "Outsourcing lets a CPA firm add audit capacity when workloads increase, handle seasonal demand without hiring permanent staff, and free experienced team members to focus on audit review and client needs while routine tasks are handled by support staff.",
        ],
      },
      {
        q: "What are the benefits of outsourcing audit work?",
        a: [
          "You can handle more engagements without adding pressure to your team, get expert support for audit testing, workpapers, and documentation, add skilled help during busy seasons, and keep audit tasks organized from start to finish, all while working within your existing audit tools and processes.",
        ],
      },
      {
        q: "How much does audit outsourcing cost?",
        a: [
          "Cost depends on the scope of the engagement, the number and size of audits, the type of support needed (planning, testing, documentation, or review), and whether you need ongoing or seasonal help. Xconcile offers flexible engagement models; share your requirements to get a scoped proposal.",
        ],
      },
    ],
  },

  ctaBand: {
    title: "Scale your Audit Capacity with Expert Support",
    body: "Get reliable audit professionals to help manage workloads, deadlines, and engagements.",
    cta: { label: "Get Audit Support", href: SCHEDULE_HREF },
    image: { src: "/images/services/cta-handshake.jpg", alt: "", width: 1500, height: 1000 },
  },
};
