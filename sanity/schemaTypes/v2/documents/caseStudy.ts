import { CaseIcon } from "@sanity/icons/Case";
import { defineArrayMember, defineField, defineType } from "sanity";

import { iconPreview } from "../../../components/icon-picker-input";
import { iconField } from "../fields";

/**
 * Case study (`/case-studies/<slug>`, app/(website)/case-studies/[slug]/page.tsx; design
 * pages/case study/page.svg). Every published case study appears on the Case Studies gallery
 * automatically; no page has to be created in code. The industry builds the gallery's filter tabs.
 */
export default defineType({
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  icon: CaseIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "facts", title: "Client / Service / Goal" },
    { name: "more", title: "Related & CTA" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "sample",
      title: "Sample content",
      type: "boolean",
      group: "content",
      description:
        "ON = placeholder written for the build (figures are not real client results). Replace the text, then switch it off. Only shown here in Studio.",
      initialValue: false,
    }),
    defineField({
      name: "title",
      title: "Title (H1)",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: "cardTitle",
      title: "Short title (cards)",
      type: "string",
      group: "content",
      description:
        "Shorter title for the gallery and related cards, e.g. “Audit Support Helped a CPA Firm”. Empty = the full title.",
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: "slug",
      title: "URL slug",
      type: "slug",
      group: "content",
      description:
        "The page address: /case-studies/<slug>. Don't change it after publishing (links and Google use it).",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "industry",
      title: "Industry",
      type: "string",
      group: "content",
      description:
        "Shown on the cards (e.g. CPA Firm, Real Estate) and used for the gallery's filter tabs: spell the same industry the same way on every case study.",
      validation: (Rule) => Rule.required().max(30),
    }),
    defineField({
      name: "publishedAt",
      title: "Published date",
      type: "date",
      group: "content",
      description: "Case studies are listed newest first.",
      initialValue: () => new Date().toISOString().slice(0, 10),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Summary",
      type: "text",
      rows: 3,
      group: "content",
      description: "One or two sentences for Google and link previews. Not shown on the page.",
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: "mainImage",
      title: "Photo",
      type: "image",
      group: "content",
      description:
        "Upload: 1800×900 px (2:1), JPG. Shown at the top of the page (≈856×400) and on the cards (≈416×358, much squarer), cropped from the centre both times: keep the subject in the middle half. The card's bottom-left has a dark wash with the title.",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      title: "Content",
      type: "caseStudyBody",
      group: "content",
      description:
        "Headings, paragraphs, lists, links, images and tables in any order, plus the grey “Highlight list” box and the dark “Results band” (Insert menu).",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "facts",
      title: "Card next to the photo",
      type: "array",
      group: "facts",
      description: "Design: Client, Service, Project Goal. Up to 4 rows.",
      of: [
        defineArrayMember({
          name: "caseStudyFact",
          title: "Row",
          type: "object",
          fields: [
            iconField(),
            defineField({
              name: "label",
              title: "Small label",
              type: "string",
              description: "e.g. Client",
              validation: (Rule) => Rule.required().max(30),
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              description: "e.g. U.S.-Based CPA Firm",
              validation: (Rule) => Rule.required().max(60),
            }),
            defineField({
              name: "text",
              title: "Text",
              type: "text",
              rows: 2,
              validation: (Rule) => Rule.max(200),
            }),
          ],
          preview: iconPreview({ title: "title", subtitle: "label" }),
        }),
      ],
      validation: (Rule) => Rule.max(4),
    }),

    defineField({
      name: "related",
      title: "Related case studies",
      type: "array",
      group: "more",
      description:
        "Up to 3, in this order. Empty = other case studies from the same industry first, then the newest.",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "caseStudy" }],
          options: {
            disableNew: true,
            filter: ({ document }) => ({
              filter: "_id != $id && !(_id in path('drafts.**'))",
              params: { id: String(document._id).replace(/^drafts\./, "") },
            }),
          },
        }),
      ],
      validation: (Rule) => Rule.max(3).unique(),
    }),
    defineField({
      name: "ctaBand",
      title: "CTA band",
      type: "ctaBandSection",
      group: "more",
      description:
        "Optional: the dark band at the end of this page. Empty = the Case Studies Gallery's CTA band.",
    }),

    defineField({ name: "seo", title: "SEO", type: "seoMeta", group: "seo" }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", industry: "industry", media: "mainImage", sample: "sample" },
    prepare: ({ title, industry, media, sample }) => ({
      title,
      subtitle: [sample ? "SAMPLE" : null, industry].filter(Boolean).join(" · "),
      media,
    }),
  },
});
