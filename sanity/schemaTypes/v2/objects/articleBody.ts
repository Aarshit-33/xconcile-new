import { ImageIcon } from "@sanity/icons/Image";
import { ThLargeIcon } from "@sanity/icons/ThLarge";
import { defineArrayMember, defineField, defineType } from "sanity";

import { hrefRule } from "../fields";

/** Image inside a blog article (full content width, optional caption). */
export const articleImage = defineType({
  name: "articleImage",
  title: "Image",
  type: "image",
  icon: ImageIcon,
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Alternative text",
      type: "string",
      description: "Describe the image for screen readers and Google.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
      description: "Optional line under the image.",
    }),
  ],
  preview: {
    select: { title: "caption", subtitle: "alt", media: "asset" },
    prepare: ({ title, subtitle, media }) => ({
      title: title || subtitle || "Image",
      subtitle: "Image",
      media,
    }),
  },
});

/** Table inside a blog article: rows of text cells; the first row can be the header. */
export const articleTable = defineType({
  name: "articleTable",
  title: "Table",
  type: "object",
  icon: ThLargeIcon,
  fields: [
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
      description: "Optional title shown above the table.",
    }),
    defineField({
      name: "hasHeaderRow",
      title: "First row is the header",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "rows",
      title: "Rows",
      type: "array",
      description: "Each row is a list of cells. Keep the same number of cells in every row.",
      of: [
        defineArrayMember({
          name: "tableRow",
          title: "Row",
          type: "object",
          fields: [
            defineField({
              name: "cells",
              title: "Cells",
              type: "array",
              of: [defineArrayMember({ type: "string" })],
              validation: (Rule) => Rule.required().min(1),
            }),
          ],
          preview: {
            select: { cells: "cells" },
            prepare: ({ cells }) => ({
              title: Array.isArray(cells) ? cells.join(" | ") : "Empty row",
            }),
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: { caption: "caption", rows: "rows" },
    prepare: ({ caption, rows }) => ({
      title: caption || "Table",
      subtitle: `Table · ${Array.isArray(rows) ? rows.length : 0} rows`,
    }),
  },
});

/**
 * Text block of the article editors (blog posts, case studies, Privacy Policy): paragraphs,
 * H2–H4, quotes, bullet / numbered / checklist lists, bold/italic/underline and links.
 */
export const articleTextBlock = (h2Title = "Heading 2 (in Table of Contents)") =>
  defineArrayMember({
    type: "block",
    styles: [
      { title: "Paragraph", value: "normal" },
      { title: h2Title, value: "h2" },
      { title: "Heading 3", value: "h3" },
      { title: "Heading 4", value: "h4" },
      { title: "Quote", value: "blockquote" },
    ],
    lists: [
      { title: "Bullets", value: "bullet" },
      { title: "Numbered", value: "number" },
      { title: "Checklist (empty boxes)", value: "check" },
    ],
    marks: {
      decorators: [
        { title: "Bold", value: "strong" },
        { title: "Italic", value: "em" },
        { title: "Underline", value: "underline" },
      ],
      annotations: [
        defineArrayMember({
          name: "link",
          title: "Link",
          type: "object",
          fields: [
            defineField({
              name: "href",
              title: "Link",
              type: "string",
              description: "/page, #section, https://…, mailto: or tel:",
              validation: (Rule) => Rule.required().custom(hrefRule),
            }),
            defineField({
              name: "blank",
              title: "Open in a new tab",
              type: "boolean",
              initialValue: false,
            }),
          ],
        }),
      ],
    },
  });

/**
 * Blog article body: paragraphs, H2–H4 headings, bullet / numbered lists, quotes, links, images
 * and tables, in any order. H2 headings build the article's Table of Contents.
 */
export const articleBody = defineType({
  name: "articleBody",
  title: "Article content",
  type: "array",
  of: [
    articleTextBlock(),
    defineArrayMember({ type: "articleImage" }),
    defineArrayMember({ type: "articleTable" }),
  ],
});
