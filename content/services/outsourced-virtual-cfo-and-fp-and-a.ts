/**
 * Outsourced Virtual CFO & FP&A (`/outsourced-virtual-cfo-and-fp-and-a`, live slug kept).
 *
 * Sources (2026-10-25):
 *  - Copy: the Figma design `pages/services/virtual-cfo-services.svg` (audit layout without the
 *    Tools section).
 *  - Services accordion task lists (`groups`): docs/content/CFO.md (H3 1–5), "Task:" /
 *    "Micro-Task:" prefixes and markdown removed.
 *  - Sanity: once a `servicePage` document with this slug exists, Studio wins; this file is the
 *    fallback for any section or field left empty there (see sanity/lib/service-page.ts).
 *
 * Every deviation from the drawn copy is marked `COPY FIX`; text that is not in the design at
 * all is marked `NOT IN DESIGN` and needs client confirmation.
 */
import { home } from "@/content/home";
import { SCHEDULE_HREF, type RichText } from "@/content/types";
import type { ServicePageContent } from "@/content/services/types";
import { routes } from "@/lib/routes";

export const outsourcedVirtualCfoAndFpAndA: ServicePageContent = {
  slug: "outsourced-virtual-cfo-and-fp-and-a",
  name: "Outsourced Virtual CFO & FP&A Services",

  seo: {
    // NOT IN DESIGN: fallbacks derived from the hero and the docs H1/intro; Sanity `seo` wins
    // when present.
    title: "Outsourced Virtual CFO & FP&A Services for U.S. Businesses",
    description:
      "Outsourced virtual CFO and FP&A services: budgeting, forecasting, cash flow management, KPI dashboards and financial reporting for U.S. businesses.",
    // Meta keywords (fallback; Sanity SEO → Meta keywords wins when filled).
    keywords: [
      "virtual CFO services",
      "outsourced CFO services",
      "financial planning and analysis services",
      "outsourced FP&A",
      "budgeting and forecasting",
      "cash flow management",
      "KPI dashboards",
      "fractional controller",
    ],
  },

  hero: {
    badge: "Virtual CFO & FP&A Support",
    title: "Outsourced Virtual CFO Services for U.S. Businesses",
    subtitle:
      "Get clear financial insights and ongoing support for budgeting, forecasting, cash flow management, and financial reporting, helping you make informed business decisions.",
    // No contact section on service pages: CTAs open the Calendly popup.
    primaryCta: { label: "Get expert CFO support", href: SCHEDULE_HREF }, // COPY FIX: "cfo"
    // Client rule: "Explore our services" scrolls to this page's services section.
    secondaryCta: { label: "Explore Our Services", href: "#services" },
    checks: [{ label: "Financial dashboard" }, { label: "Business growth charts" }],
  },

  stats: {
    items: [
      { value: "10+", label: "Virtual CFO Support" },
      { value: "1K+", label: "Flexible Engagements" },
      { value: "50+", label: "Virtual CFO Professionals" }, // COPY FIX: double space after "CFO"
      { value: "98%", label: "Secure Workflows" },
    ],
    rating: { value: "4.3", source: "Google" },
  },

  intro: {
    title: "Financial Guidance Without Hiring a Full-Time CFO",
    body: [
      "Growing businesses and CPA firms often need financial guidance without ",
      { text: "hiring a full-time CFO", href: routes.hireStaff("hire-virtual-cfo-and-fp-and-a") },
      ". Xconcile provides outsourced Virtual CFO Services to support budgeting, forecasting, cash flow management, financial reporting, and business planning.",
    ] satisfies RichText,
    bodyMore: [
      "Our team helps you understand your financial position, plan ahead, and make informed business decisions with clear financial insights and ongoing support.",
    ],
    bodyMoreLayout: "paragraph",
    // Fallback (design photo); the Sanity intro image wins when present.
    image: {
      src: "/images/services/outsourced-virtual-cfo-and-fp-and-a/intro-reviewing-charts.jpg",
      alt: "Two finance professionals reviewing printed charts at a desk",
      width: 1480,
      height: 988,
    },
    checks: ["Budgeting & Forecasting", "Cash Flow Management", "Financial Reporting"],
    checksStyle: "list",
    cta: { label: "Get Expert Financial Support", href: SCHEDULE_HREF },
  },

  challenges: {
    badge: "Key Challenges",
    title: "Managing Business Finances Requires Strategic Planning",
    body: "Managing budgets, cash flow, forecasts, and financial reports takes time and careful planning. Virtual CFO support helps businesses understand their finances and plan ahead.",
    // No button is drawn under the copy here, so `cta` is left out (no button).
    items: [
      {
        tone: "rose",
        icon: "person_search",
        title: "Limited Financial Visibility",
        body: [
          "Outdated or disconnected reports can make it hard to see where your business stands each month.",
        ],
      },
      {
        tone: "amber",
        icon: "trending_up",
        title: "Unclear Future Planning",
        body: ["Without regular forecasts, it can be difficult to plan for hiring, growth, or slower periods."],
      },
      {
        tone: "blue",
        icon: "paid",
        title: "Cash Flow Management Challenges",
        body: [
          "Unplanned expenses, delayed payments, or weak cash flow planning can make it harder to cover regular costs.",
        ],
      },
      {
        tone: "purple",
        icon: "visibility_off",
        title: "Lack of Strategic Finance Support",
        body: [
          "Bookkeeping keeps your records up to date, but you may still need financial guidance to plan and make better business decisions.",
        ],
      },
    ],
  },

  services: {
    id: "services",
    badge: "Services",
    title: "Our Virtual CFO Services",
    subtitle: "Get the financial support and insights you need to plan ahead and make better business decisions.",
    initiallyVisible: 5,
    // Fallback rows (drawn titles + subtitles). In Studio, Services → each row can also get
    // "Grouped lists" (task lists shown when the row is open).
    items: [
      {
        icon: "calculate",
        title: "Financial Planning & Analysis (FP&A)",
        description: "Predicting the future through data-driven modeling",
        groups: [
          {
            title: "Budgeting & Rolling Forecasts",
            items: [
              "Developing annual \"bottom-up\" budgets aligned with departmental goals.",
              "Creating 12-month rolling forecasts that adapt as market conditions change.",
              "Performing Variance Analysis (Budget vs. Actual) to explain why targets were missed or exceeded.",
            ],
          },
          {
            title: "Scenario & \"What-If\" Modeling",
            items: [
              "Building dynamic models to test the impact of strategic moves (e.g., What happens if we increase prices by 5%?).",
              "Hiring models to determine the ROI and \"break-even\" point of a new sales representative or developer.",
            ],
          },
          {
            title: "Cash Flow Management",
            items: [
              "Creating 13-Week Cash Flow Projections to manage short-term liquidity and avoid \"cash crunches.\"",
              "Analyzing the \"Cash Conversion Cycle\" to speed up collections and optimize vendor payments.",
            ],
          },
        ],
      },
      {
        icon: "assignment",
        title: "Strategic Advisory & Decision Support",
        description: "Acting as the \"Right Hand\" to the CEO/Owner",
        groups: [
          {
            title: "Profitability & Margin Analysis",
            items: [
              "Product/Service Line Profitability: Identifying which offerings are high-margin and which are \"money-losers.\"",
              "Customer Profitability: Calculating the cost to serve specific clients vs. the revenue they generate.",
            ],
          },
          {
            title: "Break-Even & Pricing Strategy",
            items: [
              "Calculating the precise revenue point where the business covers all fixed and variable costs.",
              "Analyzing competitor pricing and market trends to advise on \"Optimal Price\" positioning.",
            ],
          },
          {
            title: "Board & Stakeholder Presentations",
            items: [
              "Preparing monthly \"Executive Summary\" decks for Board meetings or investors.",
              "Translating complex financial data into simple, actionable narratives for non-financial founders.",
            ],
          },
        ],
      },
      {
        icon: "import_contacts",
        title: "Business Intelligence (BI) & KPI Dashboards",
        description: "Real-time visibility into the health of the business",
        groups: [
          {
            title: "Custom Dashboard Development",
            items: [
              "Building live dashboards using Power BI, Tableau, or Fathom that pull data directly from the ERP.",
              "Tracking Non-Financial KPIs (e.g., website traffic vs. sales conversion, customer churn rates).",
            ],
          },
          {
            title: "Industry-Specific Metrics",
            items: [
              "For SaaS: Tracking MRR (Monthly Recurring Revenue), LTV (Lifetime Value), and CAC (Customer Acquisition Cost).",
              "For E-commerce: Tracking ROAS (Return on Ad Spend) and Cart Abandonment impact on revenue.",
            ],
          },
          {
            title: "Benchmarking",
            items: [
              "Comparing the client’s financial ratios (Gross Margin, Operating Margin) against industry averages.",
            ],
          },
        ],
      },
      {
        icon: "add_chart",
        title: "Capital Structure & M&A Support",
        description: "Helping the business find and manage money",
        groups: [
          {
            title: "Fundraising Readiness",
            items: [
              "Preparing \"Pro-Forma\" financial statements required for Bank Loans or Venture Capital.",
              "Managing the \"Financial Data Room\" for potential investors during the due diligence process.",
            ],
          },
          {
            title: "Mergers & Acquisitions (M&A)",
            items: [
              "Buy-side Due Diligence: Reviewing the target company’s books to find \"red flags.\"",
              "Sell-side Preparation: Cleaning up financials to maximize the company’s valuation before a sale.",
            ],
          },
          {
            title: "Capital Allocation",
            items: ["Advising on whether to reinvest profits into R&D, pay off debt, or distribute dividends."],
          },
        ],
      },
      {
        // The design repeats row 04's chart icon here.
        icon: "add_chart",
        title: "Fractional Controller & Compliance Oversight",
        description: "Strengthening the internal financial \"backbone\"",
        groups: [
          {
            title: "Internal Control Enhancement",
            items: [
              "Implementing \"Check and Balance\" procedures to prevent fraud and embezzlement.",
              "Developing a \"Month-End Close Checklist\" to ensure books are closed in under 5 days.",
            ],
          },
          {
            title: "Audit & Tax Liaison",
            items: [
              "Leading the relationship with external auditors and tax CPAs to ensure a smooth year-end.",
              "Ensuring the company stays compliant with ASC 606 (Revenue Recognition) and other US GAAP standards.",
            ],
          },
        ],
      },
    ],
  },

  caseStudies: {
    badge: "Testimonials",
    title: "Trusted by Our Clients",
    subtitle: "See how Xconcile helps businesses improve efficiency, visibility, and financial operations.",
    // Only "CPA Firms" has copy in the design; the other drawn tabs (Real Estate, E-commerce,
    // Construction, Restaurants) appear once their case studies exist. Never invent client results.
    items: [
      {
        id: "cpa-firms",
        label: "CPA Firms",
        title: "CPA Firms",
        challenge: "Growing workload and limited accounting capacity.",
        solution: "Dedicated outsourced accounting support.",
        result: "Better financial visibility, streamlined operations, and reduced accounting workload.",
        // NOT IN DESIGN: impact figure reused from Home; confirm with the client.
        impact: home.caseStudies.items[0].impact,
        // The design draws the Home case-study photo.
        image: home.caseStudies.items[0].image,
        // No case-study pages exist yet, so the button opens the matching industry page.
        cta: { label: "View Case Study", href: routes.industry("professional-services") },
      },
    ],
  },

  process: {
    badge: "How It Works",
    title: "How Our Virtual CFO Process Works",
    subtitle: "A clear, structured approach to help you plan, manage, and improve your business finances.",
    steps: [
      {
        icon: "search",
        title: "Understand",
        body: "We review your financials, systems, and current reporting to understand your needs.",
      },
      {
        icon: "assignment",
        title: "Plan",
        body: "We set budgeting priorities, KPIs, and a reporting structure based on your business goals.",
      },
      {
        icon: "rocket_launch",
        title: "Onboard",
        body: "We connect with your accounting systems and set up reports, forecasts, and review schedules.",
      },
      {
        icon: "bucket_check",
        title: "Manage",
        body: "We support budgeting, cash flow forecasting, and regular financial reporting.",
      },
      {
        icon: "autorenew",
        title: "Review & Improve",
        body: "We review results, update forecasts, and adjust plans as your business needs change.",
      },
    ],
  },

  industries: {
    badge: "Industries We Serve",
    title: "Virtual CFO Support Across Industries",
    subtitle:
      "Financial guidance and planning support that fits the needs of businesses across different industries.",
    // Not drawn (no button beside the heading); `href: undefined` keeps it hidden.
    cta: { label: "Explore More", href: undefined },
    // Links use the live industry slugs; Pharmaceutical and Manufacturing have no industry page
    // (plain cards). Photos as drawn (the design reuses the audit page's industry photos, incl.
    // the grinding-sparks photo on "Professional Services" and the classroom on "CPA Firms").
    items: [
      {
        title: "Professional Services",
        body: "Financial support for growing service businesses",
        href: routes.industry("professional-services"),
        image: { ...home.industries.items[0].image, alt: "Sparks flying from metal grinding in a workshop" },
      },
      {
        title: "Healthcare",
        body: "Financial support for healthcare businesses",
        href: routes.industry("medical-health"),
        image: home.industries.items[1].image,
      },
      {
        title: "Real Estate",
        body: "Financial guidance for real estate businesses",
        href: routes.industry("real-estate-construction"),
        image: home.industries.items[2].image,
      },
      {
        title: "Retail",
        body: "Financial support for growing retail businesses",
        href: routes.industry("hospitality-retail"),
        image: home.industries.items[3].image,
      },
      {
        title: "CPA Firms",
        body: "Virtual CFO support for growing CPA firms",
        href: routes.industry("professional-services"),
        image: { src: "/images/industries/education.jpg", alt: "Students working at desks in a classroom", width: 500, height: 311 },
      },
      {
        title: "Pharmaceutical",
        body: "Financial support for growing pharma businesses",
        image: { src: "/images/industries/pharmaceutical.jpg", alt: "Pharmacist taking stock from pharmacy shelves", width: 500, height: 333 },
      },
      {
        title: "eCommerce",
        body: "Financial guidance for growing eCommerce businesses",
        href: routes.industry("tech-ecommerce"),
        image: { src: "/images/industries/ecommerce.jpg", alt: "Online seller packing orders at a desk", width: 500, height: 334 },
      },
      {
        title: "Manufacturing",
        body: "Financial support for growing manufacturers",
        image: { ...home.industries.items[0].image, alt: "Sparks flying from metal grinding in a factory" },
      },
    ],
  },

  whyChoose: {
    badge: "Why Choose Us",
    title: "Why Businesses Choose Xconcile for Virtual CFO Support",
    subtitle:
      "Get reliable, accurate, and cost-effective accounting support from experienced professionals who help US businesses streamline finances and focus on growth.",
    features: [
      {
        icon: "contextual_token_add",
        title: "Finance Expertise",
        body: "Work with professionals familiar with accounting processes",
      },
      {
        icon: "deployed_code_account",
        title: "Business Insights",
        body: "Turn financial data into insights for better decisions",
      },
      {
        icon: "contact_phone",
        title: "Flexible Support",
        body: "Choose CFO support based on your business requirements",
      },
      {
        icon: "page_info",
        title: "Reliable Reporting",
        body: "Maintain accurate reports for informed financial planning",
      },
      {
        icon: "add_chart",
        title: "Scalable Support",
        body: "Adjust finance support as your business needs grow",
      },
    ],
    images: home.whyChoose.images,
    stats: home.whyChoose.stats,
  },

  // No Tools section in this design.

  testimonials: { ...home.testimonials, title: "Trusted by Our Clients" },

  blog: home.blog,

  faq: {
    badge: "FAQ",
    title: "Frequently asked questions",
    intro: "Find answers to common questions about outsourced Virtual CFO services.",
    // NOT IN DESIGN: the design draws the questions collapsed, without answers, and none of them
    // matches a docs/content/CFO.md FAQ. Answers are written only from claims already made on
    // this page and in the CFO copy doc; confirm.
    items: [
      {
        q: "What is a Virtual CFO?",
        a: [
          "A Virtual CFO is an outsourced finance professional who gives your business strategic financial guidance without hiring a full-time CFO. Xconcile's Virtual CFO Services support budgeting, forecasting, cash flow management, financial reporting, and business planning.",
        ],
      },
      {
        q: "What does a Virtual CFO do?",
        a: [
          "A Virtual CFO builds budgets and rolling forecasts, prepares cash flow projections, runs \"what-if\" scenario models, analyzes profitability and pricing, sets up KPI dashboards, supports fundraising and M&A preparation, and strengthens internal controls and the month-end close.",
        ],
      },
      {
        q: "When should a business hire a Virtual CFO?",
        a: [
          "Consider a Virtual CFO when outdated or disconnected reports make it hard to see where your business stands, when you need regular forecasts to plan for hiring, growth, or slower periods, when cash flow planning is a challenge, or when your bookkeeping is up to date but you still need financial guidance to make better decisions.",
        ],
      },
      {
        q: "How can Virtual CFO services help my business?",
        a: [
          "Virtual CFO services help you understand your financial position, plan ahead, and make informed business decisions. You get clear financial insights, reliable reporting, and ongoing support that you can adjust as your business needs grow.",
        ],
      },
      {
        q: "How does a Virtual CFO work with my existing accounting team?",
        a: [
          "We connect with your accounting systems and work alongside your existing team: your bookkeeping keeps records up to date, while we set up reports, forecasts, and review schedules on top of that data. We work with platforms such as QuickBooks and Xero and dashboard tools like Power BI and Fathom.",
        ],
      },
      {
        q: "How much do outsourced virtual CFO services cost?",
        a: [
          "Cost depends on the scope of support you need (for example budgeting, forecasting, cash flow management, reporting, or dashboards), the complexity of your business, and how often you need reviews. Xconcile offers CFO support based on your business requirements; share your needs to get a scoped proposal.",
        ],
      },
    ],
  },

  ctaBand: {
    title: "Need Strategic Financial Support for Your Business?",
    body: "Get Virtual CFO and FP&A support to improve financial visibility, planning, and decision-making.",
    cta: { label: "Get Started", href: SCHEDULE_HREF },
    // NOT IN DESIGN: the band is drawn on a plain teal fill with no photo; the template's shared
    // band photo is reused (`image` is required).
    image: { src: "/images/services/cta-handshake.jpg", alt: "", width: 1500, height: 1000 },
  },
};
