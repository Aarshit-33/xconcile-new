import { ThListIcon } from "@sanity/icons/ThList";
import { defineArrayMember, defineField, defineType } from "sanity";

import { iconPreview } from "../../../components/icon-picker-input";
import { anchorIdField, badgeField, iconField, subtitleField } from "../fields";

/** Group card colours: the Home "Key Challenges" tints (components/shared/card-tones.ts) + none. */
const groupTones = [
  { title: "Rose", value: "rose" },
  { title: "Amber", value: "amber" },
  { title: "Blue", value: "blue" },
  { title: "Purple", value: "purple" },
  { title: "Green", value: "green" },
  { title: "White", value: "white" },
  { title: "Transparent (no background)", value: "transparent" },
];

/** "Our Accounting Outsourcing Services" accordion (mirrors `ServicesContent`). */
export default defineType({
  name: "servicesSection",
  title: "Services",
  type: "object",
  icon: ThListIcon,
  fields: [
    anchorIdField("services"),
    badgeField(),
    defineField({
      name: "title",
      title: "Heading (H2)",
      type: "headingTitle",
      validation: (Rule) => Rule.required(),
    }),
    subtitleField(),
    defineField({
      name: "initiallyVisible",
      title: "Visible before “Show more”",
      type: "number",
      description: "Desktop shows this many services, then “Show more services (n)”.",
      initialValue: 5,
      validation: (Rule) => Rule.required().integer().min(1),
    }),
    defineField({
      name: "items",
      title: "Services",
      type: "array",
      of: [
        defineArrayMember({
          name: "serviceCard",
          title: "Service",
          type: "object",
          fields: [
            iconField(),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "keyLabel",
              title: "List heading",
              type: "string",
              description: "e.g. Key services",
              initialValue: "Key services",
            }),
            defineField({
              name: "keyItems",
              title: "List items",
              type: "array",
              of: [defineArrayMember({ type: "string" })],
            }),
            defineField({
              name: "groups",
              title: "Grouped lists",
              type: "array",
              description:
                "Service pages: task lists under small headings, shown when the row is open.",
              // Home rows use the flat list above; only service pages render groups.
              hidden: ({ document }) => document?._type === "home",
              of: [
                defineArrayMember({
                  name: "serviceGroup",
                  title: "Group",
                  type: "object",
                  fields: [
                    defineField({
                      name: "title",
                      title: "Heading",
                      type: "string",
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: "items",
                      title: "Items",
                      type: "array",
                      of: [defineArrayMember({ type: "string" })],
                      validation: (Rule) => Rule.required().min(1),
                    }),
                    defineField({
                      name: "tone",
                      title: "Card colour",
                      type: "string",
                      description:
                        "Same colours as the Home “Key Challenges” cards, or Transparent for no background. Empty = rose, amber, blue, purple, green in turn.",
                      options: { list: groupTones },
                    }),
                  ],
                  preview: {
                    select: { title: "title", items: "items", tone: "tone" },
                    prepare: ({ title, items, tone }) => ({
                      title,
                      subtitle: `${items?.length ?? 0} items${tone ? ` · ${tone}` : ""}`,
                    }),
                  },
                }),
              ],
            }),
            defineField({ name: "cta", title: "Button", type: "ctaLink" }),
          ],
          preview: iconPreview({ title: "title", subtitle: "cta.href" }),
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
});
