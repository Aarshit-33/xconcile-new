/**
 * Outsourced Tax Preparation (`/outsourced-tax-preparation`, live slug kept).
 *
 * Sources:
 *  - Copy: the Figma design `pages/services/outsourced-tax-preparation.svg` (2026-10-25 export).
 *  - Service-row task lists (`groups`): docs/content/Tax Preparation.md (H3 1–5), markdown removed.
 *
 * Every deviation from the drawn copy is marked `COPY FIX`; text that is not in the design at
 * all is marked `NOT IN DESIGN` and needs client confirmation.
 */
import { home } from "@/content/home";
import { SCHEDULE_HREF, type RichText } from "@/content/types";
import type { ServicePageContent } from "@/content/services/types";
import { routes } from "@/lib/routes";

export const outsourcedTaxPreparation: ServicePageContent = {
  slug: "outsourced-tax-preparation",
  name: "Outsourced Tax Preparation",

  seo: {
    // NOT IN DESIGN: written from the drawn hero/services copy.
    title: "Tax Preparation Outsourcing Services for CPA Firms",
    description:
      "Outsourced tax preparation for U.S. CPA firms: 1040, 1065, 1120 and 1120S returns, workpapers, international and sales tax compliance, seasonal or ongoing.",
    keywords: [
      "outsourced tax preparation",
      "tax preparation outsourcing services",
      "outsourced tax preparation for CPA firms",
      "1040 tax return preparation",
      "business tax return outsourcing",
      "international tax compliance support",
      "sales and use tax compliance",
      "offshore tax preparation staff",
    ],
  },

  hero: {
    badge: "Trusted by 500+ U.S. Accounting Firms",
    title: "Tax Preparation Outsourcing Services for US CPA Firms",
    // COPY FIX: drawn as "Handle increasing audit workloads with experienced professionals who
    // support your team with planning, testing, documentation, financial statement audits, and
    // working papers" (pasted from the audit page). Replaced with the sub-headline from
    // docs/content/Tax Preparation.md; confirm.
    subtitle:
      "Scale your firm's capacity and eliminate tax-season burnout with precision white-label support.",
    // No contact section on service pages: CTAs open the Calendly popup.
    // COPY FIX: drawn as "Get expert tex support".
    primaryCta: { label: "Get expert tax support", href: routes.contact() },
    // Client rule: "Explore our services" scrolls to this page's services section.
    secondaryCta: { label: "Explore Our Services", href: "#services" },
    checks: [
      { label: "Flexible Tax Support" },
      { label: "Faster Tax Preparation" },
      { label: "Experienced Tax Professionals" },
    ],
  },

  stats: {
    items: [
      { value: "10+", label: "Tax Expertise" },
      { value: "1K+", label: "Businesses Supported" },
      { value: "25+", label: "Tax Professionals" },
      { value: "98%", label: "Secure, Compliant Workflows" },
    ],
    rating: { value: "4.3", source: "Google" },
  },

  intro: {
    title: "Tax Preparation Support for Growing CPA Firms",
    body: [
      "Growing tax workloads can make it challenging for CPA firms to manage every return and related task with their existing team. During busy periods, additional preparation work can put pressure on staff, affect turnaround times, and leave less time for client-facing and higher-level work.",
    ] satisfies RichText,
    bodyMore: [
      "Xconcile provides ",
      {
        text: "outsourced tax preparation support",
        href: routes.hireStaff("hire-tax-preparation-staff"),
      },
      " for U.S. CPA firms, helping extend your team's capacity when you need it. Our professionals can handle tax return preparation, workpapers, supporting documentation, and other tax-related tasks within your established processes and software. Whether you need seasonal support or ongoing assistance, you can choose the level of support that fits your firm's workload.",
    ],
    bodyMoreLayout: "paragraph",
    image: {
      src: "/images/services/outsourced-tax-preparation/intro-team-meeting.jpg",
      alt: "Tax professional discussing figures with colleagues in a city-view conference room",
      width: 1480,
      height: 986,
    },
    checks: [
      "Trusted Tax Preparation Support",
      "Experienced Tax Professionals",
      "Secure, Confidential Processes",
    ],
    checksStyle: "list",
    // COPY FIX: drawn as "Talk to an Audit Expert" (pasted from the audit page).
    cta: { label: "Talk to a Tax Expert", href: SCHEDULE_HREF },
  },

  challenges: {
    badge: "Key Challenges",
    title: "Why Businesses and CPA Firms Outsource Tax Preparation",
    body: "When tax workloads increase, keeping up with every deadline can be difficult. Outsourcing gives businesses and CPA firms extra preparation support when they need it.",
    cta: { label: "Let's Discuss Project", href: routes.contact() }, // COPY FIX: "Lets"
    items: [
      {
        tone: "rose",
        icon: "person_search",
        title: "Reduce Tax Workload", // COPY FIX: drawn as "Reduce Audit Workload"
        body: [
          "Get help with tax returns and supporting documents so your team can focus on other accounting work.",
        ],
      },
      {
        tone: "amber",
        icon: "trending_up",
        title: "Add Capacity During Busy Periods",
        body: [
          "Manage seasonal increases in tax work and keep deadlines on track without expanding your permanent team.",
        ],
      },
      {
        tone: "blue",
        icon: "article",
        title: "Keep Tax Documentation Organized", // COPY FIX: drawn as "Keep Audit Documentation Organized"
        body: [
          "Keep tax records and supporting documents organized so your team can review returns more easily.",
        ],
      },
      {
        tone: "purple",
        icon: "visibility_off",
        title: "Manage Multiple Returns", // COPY FIX: drawn as "Manage Multiple Audits"
        body: [
          "Handle more client tax returns while keeping workloads manageable and deadlines on track.",
        ],
      },
    ],
  },

  services: {
    id: "services",
    badge: "Services",
    title: "Our Tax Preparation Outsourcing Services",
    subtitle:
      "Support your tax workload with experienced professionals handling tax returns, compliance tasks, and workpaper preparation for CPA firms and businesses.",
    initiallyVisible: 5,
    // Drawn titles + subtitles. `groups`: copied from docs/content/Tax Preparation.md (H3 1–5),
    // markdown removed.
    items: [
      {
        icon: "person",
        title: "Individual Tax Preparation (Form 1040)",
        description: "Accuracy, optimization of credits, and seamless data flow",
        groups: [
          {
            title: "Workpaper Preparation & Indexing",
            items: [
              'Organizing digital "shoeboxes" into bookmarked, hyperlinked PDF workpapers.',
              "Cross-referencing source documents (W-2, 1099, 1098) with the draft tax return.",
            ],
          },
          {
            title: "Income & Investment Reporting",
            items: [
              "Schedule C: Profit/Loss from Business (Self-employed) with home office and auto-expense calculation.",
              "Schedule D: Capital Gains/Losses reconciliation from brokerage statements (1099-B).",
              "Schedule E: Rental property income and expense tracking (including depreciation).",
            ],
          },
          {
            title: "Credits & Deductions Optimization",
            items: [
              "Itemized Deductions (Schedule A) vs. Standard Deduction comparison.",
              "Calculation of Child Tax Credits (CTC), Education Credits (1098-T), and Energy Credits.",
            ],
          },
        ],
      },
      {
        icon: "card_travel",
        title: "Business Tax Compliance (1065, 1120, 1120S)",
        description: "Precision in book-to-tax adjustments and shareholder reporting",
        groups: [
          {
            title: "Entity-Specific Preparation",
            items: [
              "Form 1120/1120S: Federal and State Corporate/S-Corp income tax returns.",
              "Form 1065: Partnership returns with complex capital account maintenance.",
            ],
          },
          {
            title: "Technical Tax Tasks",
            items: [
              "M-1 & M-3 Reconciliations: Bridging the gap between financial net income and taxable income.",
              "Fixed Asset & Depreciation: MACRS vs. Section 179/Bonus Depreciation optimization.",
              "Shareholder Basis Tracking: Maintaining accurate basis logs to ensure tax-free distributions.",
            ],
          },
          {
            title: "Year-End Information Returns",
            items: ["Bulk 1099-NEC/MISC preparation and electronic filing for contractors."],
          },
        ],
      },
      {
        icon: "import_contacts",
        title: "International Tax Compliance (Inbound & Outbound)",
        description: "Specialized expertise in high-penalty IRS disclosure forms",
        groups: [
          {
            title: "Inbound (Foreign-Owned US Entities)",
            items: [
              "Form 5472 & 1120: Reporting transactions between US corporations and 25% foreign shareholders.",
              "FIRPTA Compliance: Forms 8288/8288-A for foreign persons selling US real estate.",
            ],
          },
          {
            title: "Outbound (US Entities/Persons Overseas)",
            items: [
              "Form 5471: Information returns for US persons with respect to certain Foreign Corporations (CFCs).",
              "Form 8865: Reporting interests in Foreign Partnerships.",
              "GILTI & Subpart F: Calculation of Global Intangible Low-Taxed Income.",
            ],
          },
          {
            title: "Individual International Reporting",
            items: [
              "FBAR (FinCEN 114): Reporting foreign bank and financial accounts.",
              "Form 8938 (FATCA): Statement of specified foreign financial assets.",
              "Form 2555: Foreign Earned Income Exclusion for US expats.",
            ],
          },
        ],
      },
      {
        icon: "receipt",
        title: "Indirect Tax (Sales & Use Tax)",
        description: "Multi-state Nexus protection for E-commerce and Retail",
        groups: [
          {
            title: "Nexus Identification",
            items: ["Economic and Physical Nexus studies to determine state filing obligations."],
          },
          {
            title: "Compliance & Filing",
            // The doc repeats a truncated copy of the second line ("Monthly, Quarterly, an"); dropped.
            items: [
              "Registration for State Sales Tax permits.",
              "Monthly, Quarterly, and Annual Sales Tax return preparation and remittance via Avalara or TaxJar.",
            ],
          },
          {
            title: "Audit Support",
            items: [
              "Gathering documentation for State Sales Tax audits and responding to nexus inquiries.",
            ],
          },
        ],
      },
      {
        icon: "account_balance",
        title: "Specialized Statutory & Trust Filings",
        description: "Niche tax areas for high-net-worth and non-profit clients",
        groups: [
          {
            title: "Exempt Organizations",
            items: [
              "Form 990 / 990-PF: Annual information returns for Non-profits and Private Foundations.",
            ],
          },
          {
            title: "Trust & Estate Taxation",
            items: [
              "Form 1041: Fiduciary income tax returns and beneficiary K-1 issuance.",
              "Form 706/709: Estate and Gift tax return preparation.",
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
        // Same photo as Home's case study.
        image: home.caseStudies.items[0].image,
        // No case-study pages exist yet, so the button opens the matching industry page.
        cta: { label: "View Case Study", href: routes.industry("professional-services") },
      },
    ],
  },

  process: {
    badge: "How It Works",
    title: "Our Tax Preparation Outsourcing Process",
    subtitle:
      "Our process covers tax requirements, document preparation, return preparation, review, and finalization.",
    steps: [
      {
        icon: "search",
        title: "Understand",
        body: "Review tax requirements, return types, client data, and deadlines.",
      },
      {
        icon: "assignment",
        title: "Plan",
        body: "Define preparation tasks, timelines, documents, and review needs.",
      },
      {
        icon: "rocket_launch",
        title: "Onboard",
        body: "Align our team with your tax software, files, and workflows.",
      },
      {
        icon: "bucket_check",
        title: "Manage",
        body: "Prepare tax returns, workpapers, and agreed compliance deliverables.",
      },
      {
        icon: "autorenew",
        title: "Delivery & Ongoing Support",
        body: "Review completed work, resolve issues, and support finalization.",
      },
    ],
  },

  industries: {
    badge: "Industries We Serve",
    // COPY FIX: drawn with a double space ("Tax  Expertise").
    title: "Tax Expertise Across Industries",
    subtitle:
      "Tax support that fits the structure, operations, and filing requirements of your business.",
    // NOT IN DESIGN: no button beside the heading; `href: undefined` keeps it hidden.
    cta: { label: "Explore More", href: undefined },
    // Links use the live industry slugs; Education, Pharmaceutical and Manufacturing have no
    // industry page (plain cards).
    items: [
      {
        title: "CPA & Accounting Firms",
        // COPY FIX: drawn as "Cost accounting, inventory valuation, job costing." (manufacturing
        // copy, same known error as Home); Home's fixed line used.
        body: home.industries.items[0].body,
        href: routes.industry("professional-services"),
        image: home.industries.items[0].image,
      },
      {
        title: "Healthcare",
        body: "Practice accounting, revenue cycle support, compliance.",
        href: routes.industry("medical-health"),
        image: home.industries.items[1].image,
      },
      {
        title: "Real Estate",
        body: "Streamline property sales and client relationship management.",
        href: routes.industry("real-estate-construction"),
        image: home.industries.items[2].image,
      },
      {
        title: "Retail",
        body: "Multi-location consolidation and daily sales reconciliation.",
        href: routes.industry("hospitality-retail"),
        image: home.industries.items[3].image,
      },
      {
        title: "Education",
        // COPY FIX: drawn as "Simplify admissions, student records, and administrative" (cut off).
        body: "Simplify admissions, student records, and administrative tasks.",
        image: {
          src: "/images/industries/education.jpg",
          alt: "Students working at desks in a classroom",
          width: 500,
          height: 311,
        },
      },
      {
        title: "Pharmaceutical",
        // COPY FIX: drawn without the final period.
        body: "Improve compliance, inventory tracking, and distribution.",
        image: {
          src: "/images/industries/pharmaceutical.jpg",
          alt: "Pharmacist taking stock from pharmacy shelves",
          width: 500,
          height: 333,
        },
      },
      {
        title: "eCommerce",
        body: "Multi-channel bookkeeping, inventory, COGS, and sales tax.",
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
        body: "Optimize production, inventory, and supply chain operations.",
        image: {
          ...home.industries.items[0].image,
          alt: "Sparks flying from metal grinding in a factory",
        },
      },
    ],
  },

  whyChoose: {
    badge: "Why Choose Us",
    title: "Why Businesses & CPA Firms Trust Xconcile for Tax Preparation",
    subtitle:
      "Get experienced tax professionals to support your team with tax preparation work for U.S. businesses and CPA firms when workloads increase or additional capacity is needed.",
    features: [
      {
        icon: "contextual_token_add",
        title: "Tax Expertise",
        body: "Experienced support for U.S. tax workflows and business requirements.",
      },
      {
        icon: "deployed_code_account",
        title: "Tax Preparation Support",
        body: "Reliable support for tax preparation, tax filing, and financial documentation.",
      },
      {
        icon: "contact_phone",
        title: "Support Busy Seasons",
        body: "Scale your team during peak tax and accounting periods.",
      },
      {
        icon: "page_info",
        title: "Flexible Support",
        body: "Support that fits your processes, workload, and priorities.",
      },
      {
        icon: "add_chart",
        title: "Data Security",
        body: "We keep your financial information safe and confidential with secure processes.",
      },
    ],
    // Same photos and figures as Home.
    images: home.whyChoose.images,
    stats: home.whyChoose.stats,
  },

  tools: {
    badge: "Software Expertise",
    title: "Your Tools, Our Expertise",
    subtitle:
      "We work with the tax preparation and accounting software your team already uses, helping streamline workflows and deliver efficient, accurate results without disrupting your existing processes.",
    // COPY FIX: the open panel's heading is drawn as "Audit Software" while the "Accounting
    // Software" tab is selected; the panel shows the selected tab's label.
    categories: [
      {
        id: "accounting-software",
        icon: "calculate",
        label: "Accounting Software",
        tools: [
          // COPY FIX: drawn as "CaseWare Working Papers" (audit software) next to the QuickBooks logo.
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
      // NOT IN DESIGN: the other tabs are drawn collapsed. Tool names come from
      // docs/content/Tax Preparation.md; confirm and add logos.
      {
        id: "tax-software",
        icon: "dvr",
        label: "Tax Software", // COPY FIX: drawn as "Audit Software" (pasted from the audit page)
        tools: [
          { name: "UltraTax CS" },
          { name: "Lacerte" },
          { name: "CCH Axcess" },
          {
            name: "Drake Software",
            logo: "/images/tools/drake-software.png",
            width: 80,
            height: 80,
          },
        ],
      },
      {
        // Audit tab label kept as drawn; hidden until tools are provided (no tax source names any).
        id: "data-analytics-testing",
        icon: "analytics",
        label: "Data Analytics & Testing",
        tools: [],
      },
      {
        id: "confirmation-documentation",
        icon: "assignment",
        label: "Confirmation & Documentation",
        // Secure client-document portals named in the tax copy doc.
        tools: [{ name: "ShareFile" }, { name: "Suralink" }],
      },
      {
        id: "sales-use-tax",
        icon: "search_check_2",
        // COPY FIX: drawn as a second "Audit Software" tab (duplicate label).
        label: "Sales & Use Tax",
        tools: [{ name: "Avalara" }, { name: "TaxJar" }],
      },
    ],
  },

  testimonials: { ...home.testimonials, title: "Trusted by Our Clients" },

  blog: home.blog,

  faq: {
    badge: "FAQ",
    title: "Frequently asked questions",
    intro: "Find answers to common questions about outsourced tax preparation services.",
    // NOT IN DESIGN: the design draws the questions collapsed, without answers. Answers are
    // written only from claims already made on this page and in the tax copy doc; confirm.
    items: [
      {
        q: "What is Outsourced Tax Preparation?",
        a: [
          "Outsourced tax preparation gives U.S. CPA firms and businesses experienced tax professionals who handle tax return preparation, workpapers, supporting documentation, and other tax-related tasks within your established processes and software. Xconcile works as an extension of your team, with seasonal or ongoing support.",
        ],
      },
      {
        q: "What types of tax returns does Xconcile prepare?",
        a: [
          "Our team prepares individual returns (Form 1040, including Schedules A, C, D, and E), business returns (Forms 1065, 1120, and 1120S), international filings such as Forms 5471, 5472, 8865, 8938, 2555, and FBAR, multi-state sales and use tax returns, and specialized filings including Form 990/990-PF, Form 1041, and Forms 706/709.",
        ],
      },
      {
        q: "Why should CPA firms outsource tax preparation?",
        a: [
          "Outsourcing reduces your team's tax workload, adds capacity during busy periods without expanding your permanent team, keeps tax records and supporting documents organized for easier review, and lets you handle more client returns while keeping deadlines on track.",
        ],
      },
      {
        q: "Is outsourced tax preparation suitable for small CPA firms?",
        a: [
          "Yes. You choose the level of support that fits your firm's workload, whether that is seasonal help during tax season or ongoing assistance, so growing firms can extend their capacity without hiring permanent staff.",
        ],
      },
      {
        q: "How much does outsourced tax preparation cost?",
        a: [
          "Cost depends on the number and complexity of returns, the type of work needed (preparation, workpapers, or compliance filings), and whether you need seasonal or ongoing support. Share your requirements to get a scoped proposal.",
        ],
      },
    ],
  },

  ctaBand: {
    title: "Need Extra Tax Preparation Support This Tax Season?",
    body: "Expand your team with experienced tax professionals who can help manage busy-season workloads, improve turnaround times, and give your firm greater flexibility.",
    cta: { label: "Get Tax Preparation Support", href: SCHEDULE_HREF },
    // NOT IN DESIGN: the band is drawn on a plain teal fill with no photo; the template's
    // shared band photo is reused.
    image: { src: "/images/services/cta-handshake.jpg", alt: "", width: 1500, height: 1000 },
  },
};
