import { RocketIcon } from "@sanity/icons/Rocket";
import { defineField, defineType } from "sanity";

import { anchorIdField } from "../fields";

/**
 * Closing CTA band: photo under a navy overlay, centred heading, text and one button (mirrors
 * `CtaBandContent`, components/sections/cta-band.tsx).
 */
export default defineType({
  name: "ctaBandSection",
  title: "CTA Band",
  type: "object",
  icon: RocketIcon,
  fields: [
    anchorIdField("ctaBand"),
    defineField({
      name: "title",
      title: "Heading (H2)",
      type: "string",
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
      name: "image",
      title: "Background photo",
      type: "image",
      description: "Decorative: shown under a 90% navy overlay, so no alt text is needed.",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: { select: { title: "title", subtitle: "cta.label", media: "image" } },
});
