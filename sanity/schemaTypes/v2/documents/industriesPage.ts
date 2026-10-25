import { EarthGlobeIcon } from "@sanity/icons/EarthGlobe";
import { defineField, defineType } from "sanity";

/**
 * Sections in the same order as components/templates/industries-gallery.tsx; each mirrors the
 * matching block of `IndustriesGalleryContent` (content/industries/types.ts). Field names match
 * the content keys, so the mapper (sanity/lib/industries-gallery.ts) and the seed
 * (scripts/seed-industries-gallery-sanity.ts) stay 1:1.
 */
const sections: { name: string; title: string; type: string; required?: boolean }[] = [
  { name: "hero", title: "Hero", type: "heroSection", required: true },
  { name: "features", title: "Feature Cards", type: "featureCardsSection" },
  { name: "industries", title: "Industry Cards", type: "industriesSection" },
  { name: "faq", title: "FAQ", type: "faqSection" },
  { name: "ctaBand", title: "CTA Band", type: "ctaBandSection" },
];

/**
 * Industries Gallery page (`/industries`, singleton `_id: "industriesPage"`). Lists every industry;
 * each industry's own page is an Industry Page document. Shown in Studio as "Industries Gallery";
 * the type name and _id stay `industriesPage` so existing content and links keep working.
 */
export default defineType({
  name: "industriesPage",
  title: "Industries Gallery",
  type: "document",
  icon: EarthGlobeIcon,
  groups: [
    ...sections.map((s, i) => ({ name: s.name, title: s.title, default: i === 0 })),
    { name: "seo", title: "SEO" },
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
  ],
  preview: { prepare: () => ({ title: "Industries Gallery", subtitle: "/industries" }) },
});
