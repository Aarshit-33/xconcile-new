import { WrenchIcon } from "@sanity/icons/Wrench";
import { defineArrayMember, defineField, defineType } from "sanity";

import { anchorIdField, badgeField, hiddenField, iconField, sectionPreview, subtitleField, titleField } from "../fields";

/**
 * Service pages' "Your Tools, Our Expertise": vertical category tabs + logo chips (mirrors
 * `ToolTabsContent`, components/sections/tool-tabs.tsx). Home uses the logo grid (toolsSection).
 */
export default defineType({
  name: "toolTabsSection",
  title: "Tools (tabs)",
  type: "object",
  icon: WrenchIcon,
  fields: [
    hiddenField(),
    anchorIdField("tools"),
    badgeField(),
    titleField(),
    subtitleField(),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      description: "Each category is one tab. A category without tools is hidden on the site.",
      of: [
        defineArrayMember({
          name: "toolCategory",
          title: "Category",
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Tab label",
              type: "string",
              description: "e.g. Audit Software",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "id",
              title: "Tab ID",
              type: "slug",
              options: {
                source: (_doc, { parent }) => (parent as { label?: string })?.label ?? "",
              },
              validation: (Rule) => Rule.required(),
            }),
            iconField(),
            defineField({
              name: "tools",
              title: "Tools",
              type: "array",
              of: [
                defineArrayMember({
                  name: "toolChip",
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
                      description: "Optional. PNG or SVG; shown 24px tall before the name.",
                    }),
                  ],
                  preview: { select: { title: "name", media: "logo" } },
                }),
              ],
            }),
          ],
          preview: {
            select: { title: "label", tools: "tools" },
            prepare: ({ title, tools }) => ({
              title,
              subtitle: tools?.length ? `${tools.length} tools` : "Hidden (no tools)",
            }),
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: sectionPreview("Tools (tabs)"),
});
