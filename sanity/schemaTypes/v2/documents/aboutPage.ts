import { InfoOutlineIcon } from "@sanity/icons/InfoOutline";
import { defineField, defineType } from "sanity";

/**
 * Sections in the same order as components/templates/about-page.tsx; each mirrors the matching
 * block of `AboutPageContent` (content/about.ts). Field names match the content keys, so the
 * mapper (sanity/lib/about-page.ts) and the seed (scripts/seed-about-sanity.ts) stay 1:1.
 */
const sections: { name: string; title: string; type: string; required?: boolean }[] = [
  { name: "hero", title: "Hero", type: "heroSection", required: true },
  { name: "stats", title: "Stats", type: "statsSection" },
  { name: "intro", title: "Intro", type: "introSection" },
  { name: "audiences", title: "Businesses We Work With", type: "audienceCardsSection" },
  { name: "founder", title: "Founder", type: "founderSection" },
  { name: "team", title: "Team", type: "teamSection" },
  { name: "values", title: "Core Values", type: "featureCardsSection" },
  { name: "security", title: "Security", type: "securityControlsSection" },
  { name: "expertise", title: "Expertise", type: "cardGridSection" },
  { name: "contact", title: "Contact Form", type: "leadContactSection" },
];

/** About page (`/about`, singleton `_id: "aboutPage"`). */
export default defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  icon: InfoOutlineIcon,
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
  preview: { prepare: () => ({ title: "About Page", subtitle: "/about" }) },
});
