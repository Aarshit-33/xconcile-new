import { DocumentsIcon } from "@sanity/icons/Documents";
import { defineField, defineType } from "sanity";

import { pageUrlFields } from "../page-url-fields";

/**
 * Sections in the same order as components/templates/service-page.tsx. Like the Home document,
 * each one is a field (with its own Studio tab) whose type lives in ../sections and mirrors the
 * matching block of `ServicePageContent` (content/services/types.ts). Home's section types are
 * reused; Tools (tabs) and CTA Band exist only on service pages. Feature Grid, Extra Services and
 * Security are used by the RCM layout (revenue-cycle-management); a section shows on the site
 * only if that page's design has it (its code content), so empty tabs on other pages are unused.
 */
const sections: { name: string; title: string; type: string; required?: boolean }[] = [
  { name: "hero", title: "Hero", type: "heroSection", required: true },
  { name: "stats", title: "Stats", type: "statsSection" },
  { name: "intro", title: "Intro", type: "introSection" },
  { name: "challenges", title: "Challenges", type: "challengesSection" },
  { name: "featureGrid", title: "Feature Grid (RCM)", type: "featureCardsSection" },
  { name: "services", title: "Services", type: "servicesSection" },
  { name: "caseStudies", title: "Case Studies", type: "caseStudiesSection" },
  { name: "process", title: "Process", type: "processSection" },
  { name: "industries", title: "Industries", type: "industriesSection" },
  { name: "whyChoose", title: "Why Choose", type: "whyChooseSection" },
  { name: "extraServices", title: "Extra Services (RCM)", type: "featureCardsSection" },
  { name: "security", title: "Security (RCM)", type: "securityControlsSection" },
  { name: "tools", title: "Tools", type: "toolTabsSection" },
  { name: "testimonials", title: "Testimonials", type: "testimonialsSection" },
  { name: "blog", title: "Blog", type: "blogSection" },
  { name: "faq", title: "FAQ", type: "faqSection" },
  { name: "ctaBand", title: "CTA Band", type: "ctaBandSection" },
];

/**
 * New-site service page (e.g. /audit-outsourcing-services). One document per page, matched by
 * `_id` (the URL slug is editable); one field + one Studio tab per page section, like the Home document. Named
 * `servicePage` (not `service`) so it never clashes with the legacy `service` type that is still
 * registered in this Studio.
 */
export default defineType({
  name: "servicePage",
  title: "Service Page",
  type: "document",
  icon: DocumentsIcon,
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
      title: "Service name",
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
      title: title || "Service page",
      subtitle: slug ? `/${slug}` : undefined,
    }),
  },
});
