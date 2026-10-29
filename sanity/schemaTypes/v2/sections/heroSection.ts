import { BlockElementIcon } from "@sanity/icons/BlockElement";
import { defineArrayMember, defineField, defineType } from "sanity";

import { anchorIdField, sectionPreview } from "../fields";

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
      // One line of text; `*green*` markup (objects/headingTitle.ts). No forced line break.
      type: "headingTitle",
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
      name: "showSecondaryCta",
      title: "Show second button",
      type: "boolean",
      description: "Off = no second button. On = it shows on every screen size.",
      initialValue: true,
    }),
    defineField({
      name: "secondaryCta",
      title: "Secondary Button",
      type: "ctaLink",
      description: "Optional outline button next to the primary one.",
      hidden: ({ parent }) => parent?.showSecondaryCta === false,
    }),
    defineField({
      name: "checks",
      title: "Check Items",
      type: "array",
      description:
        "Short trust points with a check icon under the buttons. Each one shows on every screen size.",
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
            // One switch for every screen size (user request 2026-10-26). Replaces "Desktop only",
            // which hid the item on phones and tablets; old values of that field are ignored.
            defineField({
              name: "show",
              title: "Show",
              type: "boolean",
              description: "Off = hidden on every screen size. On = shown on every screen size.",
              initialValue: true,
            }),
          ],
          preview: {
            select: { title: "label", show: "show" },
            prepare: ({ title, show }) => ({
              title,
              subtitle: show === false ? "Hidden" : "Shown",
            }),
          },
        }),
      ],
      validation: (Rule) => Rule.max(4),
    }),
  ],
  preview: sectionPreview("Hero"),
});
