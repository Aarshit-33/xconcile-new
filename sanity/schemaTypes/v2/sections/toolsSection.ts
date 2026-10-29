import { WrenchIcon } from "@sanity/icons/Wrench";
import { defineArrayMember, defineField, defineType } from "sanity";

import { anchorIdField, badgeField, subtitleField, titleField } from "../fields";

/** "Tools We Work With" logo grid (mirrors `ToolsContent`). Logo size comes from the asset. */
export default defineType({
  name: "toolsSection",
  title: "Tools",
  type: "object",
  icon: WrenchIcon,
  fields: [
    anchorIdField("tools"),
    badgeField(),
    titleField(),
    subtitleField(),
    defineField({
      name: "items",
      title: "Tools",
      type: "array",
      description: "Order = desktop columns top→bottom, left column first.",
      of: [
        defineArrayMember({
          name: "toolLogo",
          title: "Tool",
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "logo",
              title: "Logo",
              type: "image",
              description:
                "SVG, or a square transparent PNG ~120×120 px (shown whole in a 40px box). The tool name is used as alt text.",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: { select: { title: "name", media: "logo" } },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
});
