import { UsersIcon } from "@sanity/icons/Users";
import { defineField, defineType } from "sanity";

import { pageUrlFields } from "../page-url-fields";

/**
 * Sections in the same order as components/templates/hire-page.tsx. Each one is a field (with
 * its own Studio tab) whose type lives in ../sections and mirrors the matching block of
 * `HirePageContent` (content/hire/types.ts). Field names match the content keys, so the
 * mapper (sanity/lib/hire-page.ts) and the seed (scripts/seed-hire-sanity.ts, removed 2026-10-30, in git history) stay 1:1.
 * Hero, Intro, Key Benefits (challenges), Why Choose, Tools, FAQ and CTA Band reuse the
 * Home/service section types.
 */
const sections: { name: string; title: string; type: string; required?: boolean }[] = [
  { name: "hero", title: "Hero", type: "heroSection", required: true },
  { name: "features", title: "Feature Strip", type: "featureStripSection" },
  { name: "intro", title: "Intro", type: "introSection" },
  { name: "benefits", title: "Key Benefits", type: "challengesSection" },
  { name: "expertise", title: "Expertise", type: "cardGridSection" },
  { name: "models", title: "Hiring Models", type: "engagementModelsSection" },
  { name: "steps", title: "Hiring Steps", type: "hiringStepsSection" },
  { name: "levels", title: "Experience Levels", type: "experienceLevelsSection" },
  { name: "audiences", title: "Audiences", type: "audienceCardsSection" },
  { name: "whyChoose", title: "Why Choose", type: "whyChooseSection" },
  { name: "security", title: "Security", type: "securityControlsSection" },
  { name: "tools", title: "Tools", type: "toolTabsSection" },
  { name: "faq", title: "FAQ", type: "faqSection" },
  { name: "ctaBand", title: "CTA Band", type: "ctaBandSection" },
];

/**
 * New-site hire page (e.g. /hire-bookkeeper-accountant). One document per page, matched by
 * `_id` (the URL slug is editable); one field + one Studio tab per page section, like the service pages. Named `hirePage`
 * (not `hireStaff`) so it never clashes with the legacy `hireStaff` type still registered here.
 */
export default defineType({
  name: "hirePage",
  title: "Hire Page",
  type: "document",
  icon: UsersIcon,
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
    ...pageUrlFields("root"),
  ],
  preview: {
    select: { title: "name", slug: "slug.current" },
    prepare: ({ title, slug }) => ({
      title: title || "Hire page",
      subtitle: slug ? `/${slug}` : undefined,
    }),
  },
});
