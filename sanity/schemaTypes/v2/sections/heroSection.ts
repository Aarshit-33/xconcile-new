import { BlockElementIcon } from "@sanity/icons/BlockElement";
import { defineArrayMember, defineField, defineType } from "sanity";

import { anchorIdField } from "../fields";

/**
 * Hero section. Mirrors `HeroContent` (content/types.ts) rendered by
 * components/sections/hero.tsx, so it is reusable on inner pages too.
 */
export default defineType({
  name: "heroSection",
  title: "Hero Section",
  type: "object",
  icon: BlockElementIcon,
  fields: [
    anchorIdField("hero"),
    defineField({
      name: "badge",
      title: "Badge",
      type: "string",
      description: "Small pill above the heading, e.g. “Trusted by 1,000+ U.S. Accounting Firms”.",
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: "title",
      title: "Heading (H1)",
      type: "object",
      description: "Rendered as: Before + Highlight (green), line break, After.",
      options: { collapsible: false },
      fields: [
        defineField({
          name: "before",
          title: "Before",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "highlight",
          title: "Highlight (green)",
          type: "string",
        }),
        defineField({
          name: "after",
          title: "After",
          type: "string",
        }),
        defineField({
          name: "inline",
          title: "No forced line break",
          type: "boolean",
          description: "Let “After” follow the highlight and wrap naturally.",
          initialValue: false,
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: "primaryCta",
      title: "Primary Button",
      type: "ctaLink",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "secondaryCta",
      title: "Secondary Button",
      type: "ctaLink",
      description: "Optional. Desktop only.",
    }),
    defineField({
      name: "checks",
      title: "Check Items",
      type: "array",
      description: "Short trust points with a check icon under the buttons.",
      of: [
        defineArrayMember({
          name: "heroCheck",
          title: "Check Item",
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (Rule) => Rule.required().max(60),
            }),
            defineField({
              name: "desktopOnly",
              title: "Desktop only",
              type: "boolean",
              description: "Hide on mobile.",
              initialValue: false,
            }),
          ],
          preview: {
            select: { title: "label", desktopOnly: "desktopOnly" },
            prepare: ({ title, desktopOnly }) => ({
              title,
              subtitle: desktopOnly ? "Desktop only" : "All devices",
            }),
          },
        }),
      ],
      validation: (Rule) => Rule.max(4),
    }),
  ],
  preview: {
    select: {
      before: "title.before",
      highlight: "title.highlight",
      after: "title.after",
      badge: "badge",
    },
    prepare: ({ before, highlight, after, badge }) => ({
      title: [before, highlight, after].filter(Boolean).join(" ") || "Hero",
      subtitle: badge,
    }),
  },
});
