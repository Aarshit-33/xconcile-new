/**
 * Industries gallery (`/industries`): the index of every industry.
 *
 * Source (user request 2026-10-25): the Figma design `../pages/industry/Industry.svg`. Sections
 * that match the industry pages reuse their blocks (Hero, FAQ, CTA band); the industry cards
 * reuse Home's Industries grid (B11) with every card; the four icon cards are the new
 * FeatureCards block. Editable in Studio → Industries Gallery (sanity/lib/industries-gallery.ts);
 * this file is the fallback for anything left empty there.
 *
 * Every deviation from the drawn copy is marked `COPY FIX`; text that is not in the design at
 * all is marked `NOT IN DESIGN` and needs client confirmation.
 */
import type { IndustriesGalleryContent } from "@/content/industries/types";
import { SCHEDULE_HREF } from "@/content/types";
import { routes } from "@/lib/routes";

/** No contact section on this page, so CTAs open the Calendly popup (client rule). */
const schedule = (label: string) => ({ label, href: SCHEDULE_HREF });

const photo = (name: string, alt: string, width: number, height: number) => ({
  src: `/images/industries/gallery/${name}.jpg`,
  alt,
  width,
  height,
});

export const industriesGallery: IndustriesGalleryContent = {
  seo: {
    // NOT IN DESIGN (the design has no SEO fields). Rendered as "<title> | Xconcile".
    title: "Industry-Specific Accounting Services",
    description:
      "Outsourced accounting built for your industry: bookkeeping, reconciliations, month-end close and reporting for healthcare, real estate, e-commerce and more.",
    keywords: [
      "industry-specific accounting services",
      "outsourced accounting by industry",
      "healthcare accounting services",
      "real estate accounting services",
      "e-commerce accounting services",
      "hospitality accounting services",
      "professional services accounting",
      "accounting for CPA firms",
    ],
  },

  hero: {
    badge: "Specialized Finance & Accounting",
    title: "Industry-Specific Accounting Services",
    subtitle:
      "Every industry has different financial challenges. From inventory and job costing to revenue recognition, cash flow, and management reporting, your accounting should reflect how your business actually operates.",
    primaryCta: { label: "Talk to an expert", href: routes.contact() },
    // The design draws one button only (no secondary CTA).
    checks: [{ label: "Trusted by 12+ industries" }, { label: "Dedicated accounting teams" }],
  },

  features: {
    badge: "Industries We Serve",
    // As drawn: same eyebrow, heading and subtitle as the card grid below. Confirm the copy.
    title: "Industries We Serve",
    subtitle: "Explore accounting solutions designed for the financial realities of your industry.",
    // The design draws the same person_search glyph on all four cards.
    // COPY FIX: each drawn body ends with a run-on tagline ("Industry-Aligned", "Accurate &
    // Timely", "Actionable Insights", "Built to Scale"), dropped here.
    items: [
      {
        icon: "person_search",
        title: "Industry Expertise",
        body: "Accounting aligned with your industry's revenue, costs, and reporting needs.",
      },
      {
        icon: "person_search",
        title: "Reliable Financials",
        body: "Accurate bookkeeping, reconciliations, month-end close, and reporting.",
      },
      {
        icon: "person_search",
        title: "Better Visibility",
        body: "Clear insights into cash flow, margins, profitability, and performance.",
      },
      {
        icon: "person_search",
        title: "Scalable Support",
        body: "Flexible accounting and finance support that grows with your business.",
      },
    ],
  },

  industries: {
    badge: "Industries We Serve",
    title: "Industries We Serve",
    subtitle: "Explore accounting solutions designed for the financial realities of your industry.",
    // No button drawn.
    cta: { label: "Explore More", href: undefined },
    // Cards link to the industry page that covers them; the rest stay plain cards until a page
    // exists (no invented URLs). Photos: the design's own images (public/images/industries/gallery).
    items: [
      {
        title: "CPA & Accounting Firms",
        body: "Bookkeeping, tax, and financial reporting.",
        href: routes.industry("professional-services"),
        image: photo("cpa-firms", "Accountant writing notes beside a calculator", 547, 365),
      },
      {
        title: "Healthcare",
        body: "Medical billing, payroll, and financial reporting.",
        href: routes.industry("medical-health"),
        image: photo("healthcare", "Doctor in a white coat using a smartphone", 500, 333),
      },
      {
        title: "Real Estate",
        body: "Property accounting, rental income, and expenses.",
        href: routes.industry("real-estate-construction"),
        image: photo("real-estate", "Modern high-rise office buildings", 500, 291),
      },
      {
        title: "Retail",
        body: "Sales reconciliation, inventory, and cash flow.",
        href: routes.industry("hospitality-retail"),
        image: photo("retail", "Retail store owner using a point-of-sale tablet", 499, 333),
      },
      {
        title: "Education",
        body: "Budgeting, tuition tracking, and payroll.",
        image: photo("education", "Students working at desks in a classroom", 500, 311),
      },
      {
        title: "Pharma",
        body: "Inventory valuation, cost tracking, and compliance.",
        image: photo("pharma", "Pharmacist taking stock from pharmacy shelves", 500, 333),
      },
      {
        title: "eCommerce",
        body: "Sales reconciliation, inventory, and COGS.",
        href: routes.industry("tech-ecommerce"),
        image: photo("ecommerce", "Online seller packing orders at a desk", 500, 334),
      },
      {
        title: "Manufacturing",
        body: "Cost accounting, inventory valuation, and job costing.",
        image: photo("manufacturing", "Sparks flying from metal grinding in a factory", 564, 376),
      },
      {
        title: "Transportation",
        body: "Fleet costing, fuel expenses, and freight billing.",
        image: photo(
          "transportation",
          "Shipping containers and trucks in a freight yard",
          548,
          365,
        ),
      },
      {
        title: "Travel",
        body: "Booking reconciliation, commissions, and vendor payments.",
        image: photo("travel", "Hiker looking out over snow-capped mountains", 548, 411),
      },
      {
        title: "Fin-tech",
        // As drawn: the design repeats the Travel card's line here. Confirm the copy.
        body: "Booking reconciliation, commissions, and vendor payments.",
        image: photo("fintech", "Laptop showing stock market charts on a desk", 547, 366),
      },
      {
        title: "Legal Services",
        body: "Client billing, trust accounting, and bookkeeping.",
        // Law firms are a sub-industry of the professional services page.
        href: routes.industry("professional-services"),
        image: photo("legal", "Judge's gavel beside an open law book", 548, 365),
      },
      {
        title: "Nonprofit Organizations",
        body: "Fund accounting, grants, and donations.",
        image: photo("nonprofit", "Volunteers joining hands in a circle", 548, 365),
      },
      {
        title: "Beauty & Wellness",
        body: "Revenue tracking, inventory, and payroll.",
        image: photo("beauty-wellness", "Woman lying among fresh fruit", 548, 365),
      },
      {
        title: "Energy & Utilities",
        body: "Project costing, asset accounting, and budgeting.",
        image: photo("energy-utilities", "Power plant lit up at night over water", 547, 308),
      },
      {
        title: "Banking",
        body: "Account reconciliation, financial reporting, and controls.",
        image: photo("banking", "Hand entering a PIN on an ATM keypad", 547, 364),
      },
    ],
  },

  faq: {
    badge: "FAQ",
    title: "Frequently asked questions",
    intro: ["Still have Questions?", "Drop us a message and we’ll get back to you"],
    // NOT IN DESIGN: the design draws the questions collapsed, without answers. Each answer only
    // restates claims made elsewhere on this page; confirm.
    items: [
      {
        q: "What are industry-specific accounting services?",
        a: [
          "Industry-specific accounting services are bookkeeping, reconciliations, month-end close, and reporting set up around how your industry actually earns and spends money, from inventory and job costing to revenue recognition, cash flow, and management reporting.",
        ],
      },
      {
        q: "Why does industry experience matter in accounting?",
        a: [
          "Every industry has different financial challenges. Accountants who know your industry align your books with its revenue, costs, and reporting needs, so you get accurate financials and clearer insight into cash flow, margins, profitability, and performance.",
        ],
      },
      {
        q: "What industries does Xconcile support?",
        a: [
          "We support CPA and accounting firms, healthcare, real estate, retail, education, pharma, e-commerce, manufacturing, transportation, travel, fintech, legal services, nonprofit organizations, beauty and wellness, energy and utilities, and banking.",
        ],
      },
      {
        q: "Can Xconcile work with our existing accounting software?",
        a: [
          "Yes. Our dedicated accounting teams work within your existing systems and workflows, so your accounting support fits the way your business already operates.",
        ],
      },
    ],
  },

  ctaBand: {
    title: "Need Accounting Support for Your Industry?",
    body: "Xconcile provides flexible outsourced accounting support for U.S. businesses and CPA firms. Tell us about your accounting needs, and we can discuss the right level of support for your business.",
    cta: schedule("Talk to Our Team"),
    // Same handshake photo as the industry pages' CTA band (identical asset in the design).
    image: { src: "/images/services/cta-handshake.jpg", alt: "", width: 1500, height: 1000 },
  },
};
