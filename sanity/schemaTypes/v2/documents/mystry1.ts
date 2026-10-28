import { DocumentIcon } from "@sanity/icons/Document";
import { defineField, defineType } from "sanity";

/**
 * Mystry 1 — parked single-document page type (`_id: "mystry1"`). Not registered in the schema
 * index, not routed, not linked. Kept for possible reuse.
 */
export default defineType({
  name: "mystry1",
  title: "Mystry 1",
  type: "document",
  icon: DocumentIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Heading (H1)",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: "intro",
      title: "Line under the heading",
      type: "text",
      rows: 2,
      group: "content",
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: "lastUpdated",
      title: "Last updated",
      type: "date",
      group: "content",
      description: "Shown under the heading.",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "articleBody",
      group: "content",
      description: "Paragraphs, headings, lists, links and tables, in any order (same editor as blog posts).",
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "seo", title: "SEO", type: "seoMeta", group: "seo" }),
  ],
  preview: {
    select: { title: "title", date: "lastUpdated" },
    prepare: ({ title, date }) => ({ title: title || "Mystry 1", subtitle: date ? `Last updated ${date}` : undefined }),
  },
});
