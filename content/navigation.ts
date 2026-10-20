/**
 * Site navigation + service catalog (single source for header, footer, home accordion,
 * lead-form options). Labels come from the Figma header/footer; URLs follow the CURRENT
 * LIVE slugs (lib/routes.ts) so existing rankings are kept.
 *
 * NOTE: pages for these URLs are built in later phases; until then they 404 locally.
 * Header menus, the menu promo card and the footer columns are edited in Sanity (Site Settings,
 * sanity/lib/site-settings.ts); the values here are the fallback and the seed source.
 */
import type { NavIconName } from "@/components/icons/nav-icons";
import { routes } from "@/lib/routes";

export type NavLink = { label: string; href: string };

/** Service pages (Services group (1) in the design). `value` is stored on lead submissions. */
export const services = [
  {
    value: "accounting-bookkeeping",
    label: "Accounting & Bookkeeping",
    href: routes.service("outsourced-accounting-and-bookkeeping"),
  },
  {
    value: "audit-assurance",
    label: "Audit & Assurance",
    href: routes.service("audit-outsourcing-services"),
  },
  {
    value: "tax-preparation",
    label: "Tax Preparation",
    href: routes.service("outsourced-tax-preparation"),
  },
  {
    value: "sales-tax-compliance",
    label: "Multi-State Sales & Use Tax Compliance",
    href: routes.service("multi-state-sales-and-use-tax-compliance"),
  },
  {
    value: "payroll-compliance",
    label: "Payroll & Compliance",
    href: routes.service("outsourced-payroll-and-compliance-services"),
  },
  {
    value: "virtual-cfo",
    label: "Virtual CFO & FP&A",
    href: routes.service("outsourced-virtual-cfo-and-fp-and-a"),
  },
  {
    value: "revenue-cycle-management",
    label: "Revenue Cycle Management",
    // New page (design "RCM (1)"); no live URL yet.
    href: routes.service("revenue-cycle-management"),
  },
] as const;

/** Hire pages (Hire group (2)). Labels from the footer design. */
export const hirePages: NavLink[] = [
  {
    label: "Hire Dedicated Accounting Professionals",
    href: routes.hireStaff("hire-bookkeeper-accountant"),
  },
  { label: "Hire Audit and Assurance", href: routes.hireStaff("hire-audit-and-assurance") },
  { label: "Hire Payroll and Compliance", href: routes.hireStaff("hire-payroll-and-compliance") },
  { label: "Hire Tax Preparation Staff", href: routes.hireStaff("hire-tax-preparation-staff") },
  { label: "Hire Virtual CFO", href: routes.hireStaff("hire-virtual-cfo-and-fp-and-a") },
];

/** Industry pages (Industries group (3)). */
export const industryPages: NavLink[] = [
  { label: "Real Estate", href: routes.industry("real-estate-construction") },
  { label: "Healthcare", href: routes.industry("medical-health") },
  { label: "Hospitality", href: routes.industry("hospitality-retail") },
  { label: "Professional Services", href: routes.industry("professional-services") },
  { label: "E-commerce", href: routes.industry("tech-ecommerce") },
  // Design has a separate IT/Technology page; live site only has tech-ecommerce (report §6).
  { label: "IT & Technology", href: routes.industry("tech-ecommerce") },
];

export const companyLinks: NavLink[] = [
  { label: "About Us", href: routes.about() },
  { label: "Our Team", href: routes.team() },
  { label: "Contact", href: routes.contact() },
];

export const resourceLinks: NavLink[] = [{ label: "Blog", href: routes.blog() }];

/** Mega-menu entry: label + link + the old site's icon and one-line description. */
export type MenuLink = NavLink & { description: string; icon: NavIconName };

/** One navbar dropdown. Editable in Sanity (Site Settings → Header); these values are the fallback. */
export type MenuGroup = { label: string; promo: boolean; items: MenuLink[] };

/**
 * Header menus, in the order drawn in the Figma header. Dropdown contents are not designed:
 * they copy the old live site's mega menu (client request 2026-10-16). Descriptions are the
 * live site's (Sanity production `description` of the same page) unless marked otherwise.
 * `promo`: the old menu's dark "Ready to scale?" card (the old About Us menu had none).
 */
export const headerNav: MenuGroup[] = [
  {
    label: "Services",
    promo: true,
    items: [
      {
        ...services[0],
        icon: "book",
        description:
          "Comprehensive outsourced bookkeeping and accounting solutions providing financial reporting and support for your business.",
      },
      {
        ...services[1],
        icon: "shield",
        description: "Trusted audit and assurance support services designed for U.S. CPA firms.",
      },
      {
        ...services[2],
        icon: "tax",
        description: "Outsourced tax preparation services for U.S. CPA firms & SMBs.",
      },
      {
        ...services[3],
        icon: "receipt",
        description:
          "Reliable sales & use tax compliance support for CPA firms and multi-state businesses across the U.S.",
      },
      {
        ...services[4],
        icon: "users",
        description: "Seamless payroll processing and regulatory compliance.",
      },
      {
        ...services[5],
        icon: "trending-up",
        description: "Expert virtual CFO & FP&A outsourcing services for startups and SMEs",
      },
      {
        ...services[6],
        icon: "currency",
        // New page (no live text): the Home services accordion copy.
        description:
          "Improve provider performance with medical billing and revenue cycle support that gives your practice more time for patients.",
      },
    ],
  },
  {
    label: "Hire Experts",
    promo: true,
    items: [
      {
        ...hirePages[0],
        icon: "book",
        description: "Build a world-class bookkeeping team without local hiring overhead.",
      },
      {
        ...hirePages[1],
        icon: "shield",
        description:
          "GAAS-trained audit professionals performing testing, sampling, and workpaper documentation.",
      },
      {
        ...hirePages[2],
        icon: "users",
        description:
          "SOC 1 & SOC 2 compliant payroll specialists managing bi-weekly processing and tax filings.",
      },
      {
        ...hirePages[3],
        icon: "tax",
        description:
          "CPA, EA, and CA credentialed tax professionals who scale your practice during busy season.",
      },
      {
        ...hirePages[4],
        icon: "trending-up",
        description:
          "Senior FP&A analysts and fractional CFOs with 10+ years of strategic financial leadership.",
      },
    ],
  },
  {
    label: "Industries",
    promo: true,
    items: [
      {
        ...industryPages[0],
        icon: "building",
        description:
          "Job costing, WIP schedules, property management, AIA billing, and 1031 exchange support for developers, contractors, and architects.",
      },
      {
        ...industryPages[1],
        icon: "heart",
        description:
          "HIPAA-compliant accounting for medical practices, dental clinics, mental health, therapy centers, med spas, and home healthcare.",
      },
      {
        ...industryPages[2],
        icon: "shopping-bag",
        description:
          "Prime Cost management, POS reconciliation, and sales tax nexus for restaurants, hotels, franchises, retail brands, and fitness centers.",
      },
      {
        ...industryPages[3],
        icon: "briefcase",
        description:
          "IOLTA trust accounting, time & billing integration, project profitability, realization rates, and partner capital management.",
      },
      {
        ...industryPages[4],
        icon: "monitor",
        description:
          "ASC 606 revenue recognition, SaaS metrics (MRR/ARR/Churn), crypto accounting, e-commerce reconciliation, and investor reporting.",
      },
      {
        ...industryPages[5],
        icon: "chip",
        // Same live page as E-commerce (tech-ecommerce); its description.
        description:
          "ASC 606 revenue recognition, SaaS metrics (MRR/ARR/Churn), crypto accounting, e-commerce reconciliation, and investor reporting.",
      },
    ],
  },
  {
    label: "Resources",
    promo: false,
    items: [
      // Home blog section subtitle (the old site had no Resources menu).
      {
        ...resourceLinks[0],
        icon: "newspaper",
        description: "Explore our latest accounting tips, guides, and business insights.",
      },
    ],
  },
  {
    label: "Company",
    promo: false,
    items: [
      // Old site "About Us" menu descriptions.
      {
        ...companyLinks[0],
        icon: "building",
        description: "Learn about our mission, values, and what drives us",
      },
      {
        ...companyLinks[1],
        icon: "users",
        description: "Meet the talented professionals behind our success",
      },
      // NOT ON THE OLD SITE (Contact was a top-level link there).
      {
        ...companyLinks[2],
        icon: "mail",
        description: "Talk to our team about your accounting needs",
      },
    ],
  },
];

export type MenuPromo = { badge: string; title: string; body: string; cta: string };

/** The old mega menu's dark promo card. CTA opens the Calendly popup (no Contact page yet). */
export const headerMenuPromo: MenuPromo = {
  badge: "Partner with us",
  title: "Ready to scale?",
  body: "Let our expert team handle your finances while you focus on what you do best.",
  cta: "Free Consultation",
};

/** Footer columns: labels exactly as in the footer design. */
export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: routes.about() },
      { label: "Contact", href: routes.contact() },
      { label: "Our Team", href: routes.team() },
      { label: "Blogs", href: routes.blog() },
    ],
  },
  {
    title: "Services",
    links: [
      {
        label: "Outsourced Accounting",
        href: routes.service("outsourced-accounting-and-bookkeeping"),
      },
      { label: "Bookkeeping", href: routes.service("outsourced-accounting-and-bookkeeping") },
      {
        label: "Payroll Services",
        href: routes.service("outsourced-payroll-and-compliance-services"),
      },
      { label: "Tax Support", href: routes.service("outsourced-tax-preparation") },
      {
        label: "AP & AR Management",
        href: routes.service("outsourced-accounting-and-bookkeeping"),
      },
      {
        label: "Financial Reporting",
        href: routes.service("outsourced-accounting-and-bookkeeping"),
      },
      {
        label: "Virtual CFO Services",
        href: routes.service("outsourced-virtual-cfo-and-fp-and-a"),
      },
      { label: "Audit Support", href: routes.service("audit-outsourcing-services") },
    ],
  },
  {
    title: "Hire",
    links: [
      { label: "Hire Audit and Assurance", href: routes.hireStaff("hire-audit-and-assurance") },
      {
        label: "Hire Bookkeeper / Accountant",
        href: routes.hireStaff("hire-bookkeeper-accountant"),
      },
      {
        label: "Hire Payroll and Compliance",
        href: routes.hireStaff("hire-payroll-and-compliance"),
      },
      { label: "Hire Tax Preparation Staff", href: routes.hireStaff("hire-tax-preparation-staff") },
      { label: "Hire Virtual CFO", href: routes.hireStaff("hire-virtual-cfo-and-fp-and-a") },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "Real Estate", href: routes.industry("real-estate-construction") },
      { label: "Healthcare", href: routes.industry("medical-health") },
      { label: "Hospitality", href: routes.industry("hospitality-retail") },
      { label: "Professional Services", href: routes.industry("professional-services") },
      { label: "E-commerce", href: routes.industry("tech-ecommerce") },
      // "IT technology" removed: same page as "Technology" below (audit L11).
      { label: "Retail", href: routes.industry("hospitality-retail") },
      { label: "Technology", href: routes.industry("tech-ecommerce") },
      { label: "Construction", href: routes.industry("real-estate-construction") },
    ],
  },
];

/** Lead form "Service of Interest" options. */
export const leadServiceOptions = [
  ...services.map(({ value, label }) => ({ value, label })),
  { value: "dedicated-staff", label: "Hire Dedicated Accounting Professionals" },
  { value: "other", label: "Other" },
] as const;

export type LeadServiceValue = (typeof leadServiceOptions)[number]["value"];
