import { routes } from "@/lib/routes";
/**
 * Case studies (`/case-studies` gallery + `/case-studies/<slug>` pages), user request 2026-10-27.
 *
 * Designs: `../pages/Case study gallary/page.svg` (centred hero, centred heading, 3-column grid
 * of photo cards with the text over the photo, CTA band) and `../pages/case study/page.svg`
 * (left-aligned hero, photo + Client/Service/Goal card, article, stats band, Related Case
 * Studies, CTA band). Built mobile first; no mobile designs.
 * Editable in Studio → Case Studies Gallery (sanity/lib/case-studies.ts); this file is the
 * fallback for anything left empty there. The case studies themselves: Studio → Case Studies.
 */
import type { CtaBandContent, HeroContent, SectionAnchor } from "@/content/types";
import { SCHEDULE_HREF } from "@/content/types";

/** Heading over the case study grid, filter tabs and paging. */
export type CaseStudiesListContent = SectionAnchor & {
  badge: string;
  title: string;
  subtitle: string;
  /** Cards shown first and added by each button click (6 = two rows of 3 on desktop). */
  perPage: number;
  loadMoreLabel: string;
  /** First filter tab (every industry). */
  allLabel: string;
  /** Link text on each gallery card (design: "Read Success Story"). */
  cardLinkLabel: string;
  /** Shown instead of the grid when there are no case studies. */
  emptyText: string;
};

/** Copy shared by every case study page. */
export type CaseStudyPageSettings = {
  /** Hero pill above the title. */
  badge: string;
  related: {
    badge: string;
    title: string;
    subtitle: string;
    ctaLabel: string;
    cardLinkLabel: string;
  };
};

export type CaseStudiesGalleryContent = {
  seo: { title: string; description: string; keywords?: string[] };
  hero: HeroContent;
  list: CaseStudiesListContent;
  /** Also the default CTA band of every case study page (each can set its own). */
  ctaBand: CtaBandContent;
  detail: CaseStudyPageSettings;
};

export const caseStudiesGallery: CaseStudiesGalleryContent = {
  seo: {
    // Rendered as "<title> | Xconcile".
    title: "Case Studies: Client Success Stories",
    description:
      "See how Xconcile helps CPA firms and U.S. businesses manage accounting, audit, payroll and tax workloads with experienced outsourced professionals.",
    keywords: [
      "accounting case studies",
      "CPA firm outsourcing results",
      "outsourced accounting success stories",
    ],
  },

  // Copy as drawn.
  hero: {
    badge: "Case Study",
    title: "Our Success Stories",
    subtitle:
      "Outsource accounting and tax preparation work to experienced professionals supporting U.S. businesses and CPA firms.",
    primaryCta: { label: "Talk to our accounting team", href: routes.contact() },
    checks: [],
  },

  list: {
    badge: "Client Success Stories",
    title: "Real Challenges. Practical Solutions.",
    subtitle:
      "Explore how Xconcile helps CPA firms and U.S. businesses manage accounting challenges with the right support.",
    perPage: 6,
    loadMoreLabel: "Show more case studies",
    // NOT IN DESIGN: filter tabs (user request 2026-10-27).
    allLabel: "All",
    cardLinkLabel: "Read Success Story",
    emptyText: "New success stories are on their way. Please check back soon.",
  },

  // COPY FIX: the design's band is about audit work ("Need Additional Support for Your Audit
  // Workload?"), which suits the audit case study (it sets that copy on its own page) but not
  // the whole gallery. Generic wording here; confirm with the client.
  ctaBand: {
    title: "Need Additional Support for Your Accounting Workload?",
    body: "Talk to Xconcile about outsourced accounting, audit, payroll and tax support that fits your firm's workload and processes.",
    cta: { label: "Talk to Our Team", href: SCHEDULE_HREF },
    image: { src: "/images/services/cta-handshake.jpg", alt: "", width: 1500, height: 1000 },
  },

  detail: {
    badge: "Case study",
    related: {
      badge: "Case Studies",
      title: "Related Case Studies",
      // COPY FIX: the design repeats the blog subtitle ("Explore our latest accounting tips…").
      subtitle: "Explore more ways Xconcile supports CPA firms and U.S. businesses.",
      ctaLabel: "Explore More Case Studies",
      cardLinkLabel: "View Case Study",
    },
  },
};
