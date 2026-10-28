import { CaseIcon } from "@sanity/icons/Case";
import { defineField, defineType } from "sanity";

import { anchorIdField, badgeField, subtitleField, titleField } from "../fields";

/**
 * Case Studies Gallery (`/case-studies`, singleton `_id: "caseStudiesPage"`; design
 * pages/Case study gallary/page.svg). The cards are the Case Study documents; this document holds
 * the copy around them plus the copy every case study page shares. Every empty field falls back
 * to content/case-studies.ts (sanity/lib/case-studies.ts).
 */
export default defineType({
  name: "caseStudiesPage",
  title: "Case Studies Gallery",
  type: "document",
  icon: CaseIcon,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "list", title: "Case Study Grid" },
    { name: "ctaBand", title: "CTA Band" },
    { name: "detail", title: "Case study pages" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "heroSection",
      group: "hero",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "list",
      title: "Case Study Grid",
      type: "object",
      group: "list",
      options: { collapsible: false },
      fields: [
        anchorIdField("caseStudies"),
        badgeField(),
        titleField(),
        subtitleField(),
        defineField({
          name: "perPage",
          title: "Cards shown at first",
          type: "number",
          description:
            "Cards shown before the button, and added by each click. 6 = two rows on desktop.",
          initialValue: 6,
          validation: (Rule) => Rule.integer().min(3).max(60),
        }),
        defineField({
          name: "loadMoreLabel",
          title: "Button label",
          type: "string",
          validation: (Rule) => Rule.max(40),
        }),
        defineField({
          name: "allLabel",
          title: "First filter tab",
          type: "string",
          description:
            "The tab that shows every industry, e.g. All. The other tabs are the case studies' industries.",
          validation: (Rule) => Rule.max(20),
        }),
        defineField({
          name: "cardLinkLabel",
          title: "Card link text",
          type: "string",
          description: "e.g. Read Success Story",
          validation: (Rule) => Rule.max(30),
        }),
        defineField({
          name: "emptyText",
          title: "Text when there are no case studies",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "ctaBand",
      title: "CTA Band",
      type: "ctaBandSection",
      group: "ctaBand",
      description: "Also used on every case study page that has no CTA band of its own.",
    }),
    defineField({
      name: "detail",
      title: "Every case study page",
      type: "object",
      group: "detail",
      options: { collapsible: false },
      fields: [
        defineField({
          name: "badge",
          title: "Pill above the title",
          type: "string",
          description: "e.g. Case study",
        }),
        defineField({
          name: "related",
          title: "Related Case Studies",
          type: "object",
          options: { collapsible: false },
          fields: [
            defineField({ name: "badge", title: "Badge", type: "string" }),
            defineField({ name: "title", title: "Heading", type: "string" }),
            defineField({ name: "subtitle", title: "Subtitle", type: "string" }),
            defineField({
              name: "ctaLabel",
              title: "Button label",
              type: "string",
              description: "Links to /case-studies.",
            }),
            defineField({
              name: "cardLinkLabel",
              title: "Card link text",
              type: "string",
              description: "e.g. View Case Study",
            }),
          ],
        }),
      ],
    }),
    defineField({ name: "seo", title: "SEO", type: "seoMeta", group: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Case Studies Gallery", subtitle: "/case-studies" }) },
});
