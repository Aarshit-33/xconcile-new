import { HelpCircleIcon } from "@sanity/icons/HelpCircle";
import { defineArrayMember, defineField, defineType } from "sanity";

import { anchorIdField, badgeField, hiddenField, sectionPreview, titleField } from "../fields";

/** "Frequently Asked Questions" accordion (mirrors `FaqContent`). Also feeds the FAQ JSON-LD. */
export default defineType({
  name: "faqSection",
  title: "FAQ",
  type: "object",
  icon: HelpCircleIcon,
  fields: [
    hiddenField(),
    anchorIdField("faq"),
    badgeField(),
    titleField(),
    defineField({
      name: "intro",
      title: "Intro lines",
      type: "array",
      description: "Each entry is shown on its own line, e.g. “Still have Questions?”.",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "items",
      title: "Questions",
      type: "array",
      of: [
        defineArrayMember({
          name: "faqEntry",
          title: "Question",
          type: "object",
          fields: [
            defineField({
              name: "question",
              title: "Question",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "answer",
              title: "Answer",
              type: "richText",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: { select: { title: "question" } },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: sectionPreview("FAQ"),
});
