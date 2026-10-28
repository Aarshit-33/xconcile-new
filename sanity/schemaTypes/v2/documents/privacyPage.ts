import { LockIcon } from "@sanity/icons/Lock";
import { defineField, defineType } from "sanity";

/**
 * Privacy Policy (`/privacy-policy`, singleton `_id: "privacyPage"`). Linked from the cookie
 * banner and the footer. Content copied from the old site's `privacyPolicy` document on
 * 2026-10-27 (scripts/migrate-legacy-privacy-sanity.ts). Named `privacyPage` so it never
 * clashes with the old site's type name.
 */
export default defineType({
  name: "privacyPage",
  title: "Privacy Policy",
  type: "document",
  icon: LockIcon,
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
      initialValue: "Privacy Policy",
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: "intro",
      title: "Line under the heading",
      type: "text",
      rows: 2,
      group: "content",
      description: "Optional. Empty = “How Xconcile collects, uses and protects your personal information.”",
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: "lastUpdated",
      title: "Last updated",
      type: "date",
      group: "content",
      description: "Shown under the heading. Change it whenever the policy changes.",
    }),
    defineField({
      name: "body",
      title: "Policy text",
      type: "articleBody",
      group: "content",
      description: "Paragraphs, headings, lists, links and tables, in any order (same editor as blog posts).",
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "seo", title: "SEO", type: "seoMeta", group: "seo" }),
  ],
  preview: {
    select: { title: "title", date: "lastUpdated" },
    prepare: ({ title, date }) => ({ title: title || "Privacy Policy", subtitle: date ? `Last updated ${date}` : undefined }),
  },
});
