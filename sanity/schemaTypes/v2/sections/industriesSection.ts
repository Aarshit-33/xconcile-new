import { EarthGlobeIcon } from "@sanity/icons/EarthGlobe";
import { defineArrayMember, defineField, defineType } from "sanity";

import { anchorIdField, badgeField, hrefRule, subtitleField, titleField } from "../fields";

/** "Accounting Services for Different Industries" image cards (mirrors `IndustriesContent`). */
export default defineType({
  name: "industriesSection",
  title: "Industries",
  type: "object",
  icon: EarthGlobeIcon,
  fields: [
    anchorIdField("industries"),
    badgeField(),
    titleField(),
    subtitleField(),
    defineField({ name: "cta", title: "Button", type: "optionalLink" }),
    defineField({
      name: "items",
      title: "Industry cards",
      type: "array",
      of: [
        defineArrayMember({
          name: "industryCard",
          title: "Industry",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "body",
              title: "Text",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "href",
              title: "Link",
              type: "string",
              description:
                "e.g. /industries/healthcare-accounting-services. Leave empty for a plain card.",
              validation: (Rule) => Rule.custom(hrefRule),
            }),
            defineField({
              name: "image",
              title: "Image",
              type: "altImage",
              description: "Upload: 600×320 px (≈15:8), JPG. Cropped from the centre.",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: { select: { title: "title", subtitle: "href", media: "image" } },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
});
