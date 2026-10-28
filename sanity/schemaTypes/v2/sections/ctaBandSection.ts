import { RocketIcon } from "@sanity/icons/Rocket";
import { defineField, defineType } from "sanity";

import { anchorIdField, hiddenField, sectionPreview } from "../fields";

/**
 * Closing CTA band: photo under a navy overlay, centred heading, text and one button, plus an
 * optional outline second button (mirrors `CtaBandContent`, components/sections/cta-band.tsx).
 */
export default defineType({
  name: "ctaBandSection",
  title: "CTA Band",
  type: "object",
  icon: RocketIcon,
  fields: [
    hiddenField(),
    anchorIdField("ctaBand"),
    defineField({
      name: "title",
      title: "Heading (H2)",
      type: "headingTitle",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      title: "Text",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    // Switches instead of "leave empty": an empty field falls back to the code button, so
    // clearing it could never remove a button (user request 2026-10-26).
    defineField({
      name: "showCta",
      title: "Show main button",
      type: "boolean",
      description: "Off = no main button in this section.",
      initialValue: true,
    }),
    defineField({
      name: "cta",
      title: "Button",
      type: "ctaLink",
      hidden: ({ parent }) => parent?.showCta === false,
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { showCta?: boolean } | undefined;
          return parent?.showCta === false || value ? true : "Required while \"Show main button\" is on.";
        }),
    }),
    defineField({
      name: "showSecondaryCta",
      title: "Show second button",
      type: "boolean",
      description: "Off = no second (outline) button, even if one is filled in below or set in code.",
      initialValue: true,
    }),
    defineField({
      name: "secondaryCta",
      title: "Second button (optional)",
      type: "ctaLink",
      description: "Outline button next to the main one (e.g. RCM page \"Get Started\"). Leave empty for one button.",
      hidden: ({ parent }) => parent?.showSecondaryCta === false,
    }),
    defineField({
      name: "image",
      title: "Background photo",
      type: "image",
      description: "Decorative: shown under a 90% navy overlay, so no alt text is needed.",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: sectionPreview("CTA Band", { media: "image" }),
});
