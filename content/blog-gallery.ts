import { routes } from "@/lib/routes";
/**
 * Blog gallery (`/blog`): every blog post as a card grid.
 *
 * Source (user request 2026-10-26): the Figma design `../pages/Case study gallary/page.svg`
 * (centred hero with one button, centred section heading, 3-column card grid, CTA band), built
 * mobile first. The design draws case-study cards; the grid uses the site's blog card instead
 * (components/shared/blog-card.tsx, same as Home → "Helpful Accounting Insights"). Posts come
 * from Studio → Blog Posts (sanity/lib/queries.ts `getAllPosts`).
 * Editable in Studio → Blog Gallery (sanity/lib/blog-gallery.ts); this file is the fallback for
 * anything left empty there.
 *
 * The design's copy is about case studies, so all copy here is NOT IN DESIGN (blog wording) and
 * needs client confirmation.
 */
import type { CtaBandContent, HeroContent, ImageAsset, SectionAnchor } from "@/content/types";
import { SCHEDULE_HREF } from "@/content/types";

/** Heading over the post grid + paging. */
export type BlogPostsContent = SectionAnchor & {
  badge: string;
  title: string;
  subtitle: string;
  /** Cards shown first and added by each button click (6 = two rows of 3 on desktop). */
  perPage: number;
  loadMoreLabel: string;
  /** Shown instead of the grid when the blog has no posts (or can't be loaded). */
  emptyText: string;
};

/** Copy shared by every article page (`/blog/<slug>`). */
export type BlogArticleSettings = {
  related: { badge: string; title: string; subtitle: string; ctaLabel: string };
  newsletter: {
    title: string;
    body: string;
    placeholder: string;
    button: string;
    success: string;
    already: string;
    error: string;
    image: ImageAsset;
  };
};

export type BlogGalleryContent = {
  seo: { title: string; description: string; keywords?: string[] };
  hero: HeroContent;
  posts: BlogPostsContent;
  ctaBand: CtaBandContent;
  article: BlogArticleSettings;
};

/** No contact section on this page, so CTAs open the Calendly popup (client rule). */
const schedule = (label: string) => ({ label, href: SCHEDULE_HREF });

export const blogGallery: BlogGalleryContent = {
  seo: {
    // Rendered as "<title> | Xconcile".
    title: "Accounting Blog: Insights for CPA Firms & Businesses",
    description:
      "Practical accounting, bookkeeping, payroll and tax insights from Xconcile for U.S. businesses and CPA firms.",
    keywords: [
      "accounting blog",
      "bookkeeping tips",
      "CPA firm outsourcing",
      "tax preparation insights",
      "payroll compliance",
      "outsourced accounting",
    ],
  },

  hero: {
    badge: "Our Blog",
    title: "Accounting Insights & Resources",
    subtitle:
      "Practical accounting, bookkeeping, payroll and tax guidance for U.S. businesses and CPA firms.",
    // As drawn: one button.
    primaryCta: { label: "Talk to our accounting team", href: routes.contact() },
    checks: [],
  },

  posts: {
    badge: "Latest Articles",
    title: "Helpful Accounting Insights",
    subtitle: "Explore our latest accounting tips, guides, and business insights.",
    // Two static rows on desktop, then the button shows more (user request 2026-10-26).
    perPage: 6,
    loadMoreLabel: "Show more articles",
    emptyText: "New articles are on their way. Please check back soon.",
  },

  ctaBand: {
    title: "Need Help With Your Accounting Workload?",
    body: "Xconcile provides flexible outsourced accounting, bookkeeping, payroll and tax support for U.S. businesses and CPA firms. Tell us what you need and we'll suggest the right level of support.",
    cta: schedule("Talk to Our Team"),
    // Same handshake photo as the other CTA bands (identical asset in the design).
    image: { src: "/images/services/cta-handshake.jpg", alt: "", width: 1500, height: 1000 },
  },

  // Article pages (design pages/blog/page.svg): copy as drawn.
  article: {
    related: {
      badge: "Our Blog",
      title: "Related Blog",
      subtitle: "Explore our latest accounting tips, guides, and business insights",
      ctaLabel: "Explore all blogs",
    },
    newsletter: {
      title: "Stay Updated",
      body: "Subscribe to our newsletter and get the latest insights, tips, and resources delivered to your inbox.",
      placeholder: "Enter your email",
      button: "Subscribe",
      // NOT IN DESIGN: result messages (old site's wording).
      success: "Thanks for subscribing! You'll hear from us soon.",
      already: "You're already subscribed to our newsletter.",
      error: "Something went wrong. Please try again.",
      image: { src: "/images/services/cta-handshake.jpg", alt: "", width: 1500, height: 1000 },
    },
  },
};
