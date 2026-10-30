import { EarthGlobeIcon } from "@sanity/icons/EarthGlobe";
import { defineField, defineType } from "sanity";

import { pageUrlFields } from "../page-url-fields";

/**
 * Sections in the same order as components/templates/industry-page.tsx. Each one is a field (with
 * its own Studio tab) whose type lives in ../sections and mirrors the matching block of
 * `IndustryPageContent` (content/industries/types.ts). Field names match the content keys, so the
 * mapper (sanity/lib/industry-page.ts) and the seed (scripts/seed-industry-sanity.ts, removed 2026-10-30, in git history) stay 1:1.
 * Only Sub-Industries is industry-specific; the rest reuse the Home/service/hire section types.
 */
const sections: { name: string; title: string; type: string; required?: boolean }[] = [
  { name: "hero", title: "Hero", type: "heroSection", required: true },
  { name: "features", title: "Feature Strip", type: "featureStripSection" },
  { name: "intro", title: "Intro", type: "introSection" },
  { name: "challenges", title: "Challenges", type: "challengesSection" },
  { name: "services", title: "Services", type: "cardGridSection" },
  { name: "subIndustries", title: "Sub-Industries", type: "subIndustriesSection" },
  { name: "whyChoose", title: "Why Choose", type: "whyChooseSection" },
  { name: "faq", title: "FAQ", type: "faqSection" },
  { name: "ctaBand", title: "CTA Band", type: "ctaBandSection" },
];

/**
 * New-site industry page (e.g. /industries/real-estate-accounting-services). One document per page,
 * matched by `_id` (the URL slug is editable); one field + one Studio tab per page section.
 * Named `industryPage` (not `industry`) so it never clashes with the legacy `industry` type
 * still registered here.
 */
export default defineType({
  name: "industryPage",
  title: "Industry Page",
  type: "document",
  icon: EarthGlobeIcon,
  groups: [
    ...sections.map((s, i) => ({ name: s.name, title: s.title, default: i === 0 })),
    { name: "seo", title: "SEO" },
    { name: "page", title: "Page" },
  ],
  fields: [
    ...sections.map((s) =>
      defineField({
        name: s.name,
        title: s.title,
        type: s.type,
        group: s.name,
        validation: s.required ? (Rule) => Rule.required() : undefined,
      }),
    ),
    defineField({ name: "seo", title: "SEO", type: "seoMeta", group: "seo" }),
    defineField({
      name: "name",
      title: "Page name",
      type: "string",
      group: "page",
      description:
        "Used in the breadcrumb and the Service structured data (not shown on the page).",
      validation: (Rule) => Rule.required(),
    }),
    ...pageUrlFields("industry"),
  ],
  preview: {
    select: { title: "name", slug: "slug.current" },
    prepare: ({ title, slug }) => ({
      title: title || "Industry page",
      subtitle: slug ? `/industries/${slug}` : undefined,
    }),
  },
});
