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
    defineField({
      name: "cta",
      title: "Button",
      type: "ctaLink",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "secondaryCta",
      title: "Second button (optional)",
      type: "ctaLink",
      description: "Outline button next to the main one (e.g. RCM page \"Get Started\"). Leave empty for one button.",
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
