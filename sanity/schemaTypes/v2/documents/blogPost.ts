import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { defineArrayMember, defineField, defineType } from "sanity";

import { RelatedPostSelect } from "../../../components/related-post-select";

/**
 * Blog post (`/blog/<slug>`, app/(website)/blog/[slug]/page.tsx). Every published post appears
 * automatically on the Blog gallery and Home's blog section; no page has to be created in code.
 * The old site's posts were copied in as Blog Posts (scripts/migrate-legacy-blog-sanity.ts), same URLs.
 */
export default defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  icon: DocumentTextIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "faq", title: "FAQs" },
    { name: "related", title: "Related blogs" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "title", title: "Title (H1)", type: "string", group: "content", validation: (Rule) => Rule.required().max(120) }),
    defineField({
      name: "slug",
      title: "URL slug",
      type: "slug",
      group: "content",
      description: "The post's address: /blog/<slug>. Don't change it after publishing (links and Google use it).",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      group: "content",
      to: [{ type: "author" }],
      description: "Pick an author, or create one (name, title, photo) with “+ Create”.",
    }),
    defineField({
      name: "publishedAt",
      title: "Published date",
      type: "date",
      group: "content",
      description: "Shown in the hero and on the cards; posts are listed newest first.",
      initialValue: () => new Date().toISOString().slice(0, 10),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "readTime",
      title: "Read time (minutes)",
      type: "number",
      group: "content",
      description: "Empty = estimated from the length of the article.",
      validation: (Rule) => Rule.integer().min(1).max(120),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      group: "content",
      description: "Short summary for the blog cards and Google. Empty = the start of the article.",
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: "mainImage",
      title: "Cover image",
      type: "image",
      group: "content",
      description: "Upload: 1920×1080 px (16:9), JPG. Shown on the blog cards (cropped to 16:9) and at the top of the article. With “Text on the cover” on, text covers the left side: keep the subject on the right.",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alternative text", type: "string", validation: (Rule) => Rule.required() })],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "coverOverlay",
      title: "Text on the cover image",
      type: "object",
      group: "content",
      description:
        "Optional. Shows the cover at the top of the article as a dark banner with this text over the photo (the blog cards keep the plain photo). Leave the heading empty for the plain image.",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({ name: "title", title: "Heading on the image", type: "string", validation: (Rule) => Rule.max(90) }),
        defineField({ name: "text", title: "Line under the heading", type: "string", validation: (Rule) => Rule.max(140) }),
        defineField({ name: "showLogo", title: "Show the Xconcile logo", type: "boolean", initialValue: true }),
      ],
    }),
    defineField({
      name: "body",
      title: "Article",
      type: "articleBody",
      group: "content",
      description:
        "Add paragraphs, headings, bullet or numbered lists, quotes, links, images and tables in any order. Every “Heading 2” becomes an entry in the Table of Contents.",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "faqTitle",
      title: "FAQ heading",
      type: "string",
      group: "faq",
      description: "e.g. FAQs: Outsourced Accounting Services. Empty = “Frequently Asked Questions”.",
    }),
    defineField({
      name: "faqs",
      title: "FAQs",
      type: "array",
      group: "faq",
      description: "Shown at the end of the article (and in the Table of Contents). Leave empty for no FAQ section.",
      of: [
        defineArrayMember({
          name: "blogFaq",
          title: "Question",
          type: "object",
          fields: [
            defineField({ name: "question", title: "Question", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "answer", title: "Answer", type: "text", rows: 4, validation: (Rule) => Rule.required() }),
          ],
          preview: { select: { title: "question", subtitle: "answer" } },
        }),
      ],
    }),

    defineField({
      name: "relatedPosts",
      title: "Related blogs",
      type: "array",
      group: "related",
      description:
        "Up to 3 posts shown under the article, in this order (drag to reorder). Empty = the 3 latest posts.",
      of: [defineArrayMember({ type: "string", components: { input: RelatedPostSelect } })],
      validation: (Rule) => Rule.max(3).unique(),
    }),

    defineField({ name: "seo", title: "SEO", type: "seoMeta", group: "seo" }),
  ],
  orderings: [{ title: "Newest first", name: "publishedAtDesc", by: [{ field: "publishedAt", direction: "desc" }] }],
  preview: {
    select: { title: "title", date: "publishedAt", media: "mainImage", author: "author.name" },
    prepare: ({ title, date, media, author }) => ({
      title,
      subtitle: [date, author].filter(Boolean).join(" · "),
      media,
    }),
  },
});
