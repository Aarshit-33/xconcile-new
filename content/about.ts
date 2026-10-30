/**
 * About page (`/about`, design pages/ABOUT US/page.svg, 2026-10-25).
 *
 * Sources:
 *  - Copy: the design. Sections that repeat an existing block with the same copy reuse it
 *    (Businesses We Work With + Security = the hire bookkeeper page). The contact section is
 *    Home's (components/templates/about-page.tsx renders InquirySection with Home's copy).
 *  - Sanity: the `aboutPage` singleton (Studio → About Page) wins; this file is the fallback for
 *    any section or field left empty there (sanity/lib/about-page.ts).
 *
 * Every deviation from the drawn copy is marked `COPY FIX`; text that is not in the design at
 * all is marked `NOT IN DESIGN` and needs client confirmation.
 */
import { hireBookkeeperAccountant } from "@/content/hire/hire-bookkeeper-accountant";
import type {
  AudienceCardsContent,
  CardGridContent,
  FeatureCardsContent,
  FounderContent,
  HeroContent,
  IntroContent,
  RichText,
  SecurityControlsContent,
  StatsContent,
  TeamContent,
} from "@/content/types";
import { routes } from "@/lib/routes";

export type AboutPageContent = {
  seo: { title: string; description: string; keywords?: string[] };
  hero: HeroContent;
  stats: StatsContent;
  intro: IntroContent;
  audiences: AudienceCardsContent;
  founder: FounderContent;
  team: TeamContent;
  values: FeatureCardsContent;
  security: SecurityControlsContent;
  expertise: CardGridContent;
};

export const about: AboutPageContent = {
  // NOT IN DESIGN: derived from the hero and intro copy; confirm.
  seo: {
    // The site appends " | Xconcile" to every title.
    title: "About Us | Outsourced Accounting & Tax Team",
    description:
      "Meet Xconcile: experienced accounting and tax professionals supporting U.S. businesses and CPA firms with bookkeeping, tax preparation and financial reporting.",
    keywords: [
      "about Xconcile",
      "outsourced accounting firm",
      "accounting and tax outsourcing partner",
      "U.S. accounting professionals",
      "CPA firm outsourcing support",
      "Xconcile team",
    ],
  },

  hero: {
    badge: "About Xconcile",
    title: "Who We Are?",
    subtitle:
      "Outsource accounting and tax preparation work to experienced professionals supporting U.S. businesses and CPA firms.",
    // The page has its own contact form, so the button scrolls to it.
    primaryCta: { label: "Talk to our accounting team", href: routes.contact() },
    checks: [],
  },

  stats: {
    items: [
      { value: "10+", label: "Years of Experience" },
      { value: "1K+", label: "Businesses Supported" },
      { value: "50+", label: "Accounting Professionals" },
      { value: "98%", label: "Client Satisfaction" },
    ],
    rating: { value: "4.3", source: "Google" },
  },

  intro: {
    title: "Your Trusted Partner for Accounting, Tax & Financial Support",
    body: [
      "Xconcile provides ",
      {
        text: "outsourced accounting",
        href: routes.service("outsourced-accounting-and-bookkeeping"),
      },
      ", bookkeeping, tax preparation, and financial support for U.S. businesses and CPA firms. Our professionals work alongside your existing team to manage accounting tasks, maintain accurate records, and support your financial operations.",
    ] satisfies RichText,
    bodyMore: [
      "With knowledge of U.S. GAAP and U.S. tax requirements, we provide support that fits your processes, systems, and workload. From recurring bookkeeping and reconciliations to ",
      { text: "tax preparation", href: routes.service("outsourced-tax-preparation") },
      " and financial reporting, you can choose the level of support your business needs.",
    ],
    bodyExtra: [
      // COPY FIX: drawn without the closing period.
      "We also take data security seriously. ISO/IEC 27001:2022 supports our approach to information security, with controlled access, secure workflows, and procedures designed to protect financial and client information.",
    ],
    bodyMoreLayout: "paragraph",
    image: {
      src: "/images/about/intro-handshake.jpg",
      alt: "Two businessmen in suits shaking hands in an office",
      width: 1500,
      height: 1000,
    },
    // No checklist and no button are drawn in this intro.
    checks: [],
    checksStyle: "list",
  },

  // Same badge, heading, subtitle, cards and photos as the hire bookkeeper page.
  audiences: hireBookkeeperAccountant.audiences,

  founder: {
    certificationsLabel: "Certifications",
    person: {
      name: "Pranav Jani",
      role: "Founder & CEO",
      image: {
        src: "/images/about/founder-pranav-jani.png",
        alt: "Pranav Jani, Founder & CEO of Xconcile",
        width: 684,
        height: 783,
      },
      bio: [
        "Pranav Jani is the Founder and Senior Tax Consultant at Xconcile. He has more than 10 years of experience working in accounting and taxation, with a focus on U.S. tax and accounting.",
        "Pranav has worked across U.S. federal tax, multi-state compliance, tax preparation, and accounting systems for more than 10 years. His work with U.S. businesses, CPA firms, and U.S. tax expatriates has given him experience with a wide range of tax and accounting requirements.",
        "Pranav is a qualified Chartered Accountant in India and has also completed the CPA graduate program through AICPA. His accounting background and experience with U.S. tax work form the foundation of his approach at Xconcile.",
      ],
      certifications: ["Indian Chartered Accountant", "CPA Graduate (AICPA)"],
    },
  },

  team: {
    title: "Meet Our Team",
    certificationsLabel: "Certifications",
    // The design draws a LinkedIn icon next to each role, but no profile URLs exist (the old
    // site's team data has empty LinkedIn fields). The icon appears once a URL is added in Studio.
    members: [
      {
        name: "Ravi Thanki",
        role: "Senior Accounting Manager",
        image: {
          src: "/images/about/team-ravi-thanki.png",
          alt: "Ravi Thanki, Senior Accounting Manager",
          width: 670,
          height: 935,
        },
        bio: [
          "Ravi Thanki has experience in U.S. accounting and bookkeeping and has worked with multiple U.S. CPA firms. His work includes day-to-day bookkeeping, account reconciliations, financial reporting, and finalization.",
          "His software experience includes QuickBooks Desktop and QuickBooks Online, along with various accounting automation tools. He has worked on accounting records and financial information for CPA firms and their clients.",
          "Ravi is an Inter-Chartered Accountant certified by the Institute of Chartered Accountants of India (ICAI).",
        ],
        certifications: ["Inter-Chartered Accountant (ICAI)"],
      },
      {
        name: "Dhara Thanki",
        role: "Accounting Specialist",
        image: {
          src: "/images/about/team-dhara-thanki.png",
          alt: "Dhara Thanki, Accounting Specialist",
          width: 380,
          height: 673,
        },
        bio: [
          "Dhara has experience working with U.S. CPA firms and their clients on accounting and tax assignments. She handles bookkeeping, sales tax, payroll compliance, and tax preparation.",
          "She uses QuickBooks, Lacerte, Drake, and other accounting and tax software. Her work includes bookkeeping, bank and account reconciliations, maintaining client records, sales tax filings, payroll work, and tax returns.",
          "She also works with CPA firms during tax season when workloads increase and deadlines are tight. Her assignments vary depending on the firm and the needs of its clients.",
        ],
        certifications: ["Inter-Chartered Accountant (ICAI)"],
      },
    ],
  },

  values: {
    anchorId: "core-values",
    title: "Our Core Values",
    // The design draws the same person-search glyph on all three cards.
    items: [
      {
        icon: "person_search",
        title: "Our Vision",
        body: "To be a trusted accounting and tax outsourcing partner for U.S. businesses and CPA firms, known for reliable support, professional expertise, and long-term client relationships.",
      },
      {
        icon: "person_search",
        title: "Our Mission",
        // COPY FIX: drawn cut off as "...support that fits their processes and re".
        body: "To help businesses and CPA firms manage their accounting and tax needs with confidence by providing accurate, consistent, and flexible support that fits their processes and requirements.",
      },
      {
        icon: "person_search",
        title: "Our Goal",
        body: "To deliver dependable financial support that helps clients maintain accurate records, meet their accounting and tax requirements, and focus on their business while our professionals handle the work behind the numbers.",
      },
    ],
  },

  // Same badge, heading, banner, groups and items as the hire bookkeeper page (the drawn
  // subtitle is also the same tax-preparation sentence there; confirm the copy).
  security: hireBookkeeperAccountant.security,

  expertise: {
    anchorId: "expertise",
    badge: "What We Do",
    title: "Our Expertise",
    subtitle:
      "Our accounting professionals support core accounting activities, from bookkeeping and reconciliations to month-end close and financial reporting.",
    // The design draws the same book glyph on every tile and no text under the titles.
    items: [
      { icon: "calculate", title: "Bookkeeping & Accounting" },
      { icon: "import_contacts", title: "Tax Preparation" },
      { icon: "assignment", title: "Audit & Assurance" },
      { icon: "sync", title: "Payroll & Compliance" },
      { icon: "assignment_add", title: "Sales Tax Compliance" },
      { icon: "query_stats", title: "Virtual CFO & FP&A" },
    ],
  },
};
