import { ChartUpwardIcon } from "@sanity/icons/ChartUpward";
import { defineArrayMember, defineField, defineType } from "sanity";

import { anchorIdField } from "../fields";

/** Stats bar under the hero (mirrors `StatsContent`). */
export default defineType({
  name: "statsSection",
  title: "Stats Bar",
  type: "object",
  icon: ChartUpwardIcon,
  fields: [
    anchorIdField("stats"),
    defineField({
      name: "items",
      title: "Stats",
      type: "array",
      of: [defineArrayMember({ type: "statItem" })],
      validation: (Rule) => Rule.required().min(1).max(4),
    }),
    defineField({
      name: "rating",
      title: "Rating",
      type: "object",
      options: { collapsible: false },
      fields: [
        defineField({
          name: "value",
          title: "Score",
          type: "string",
          description: "e.g. 4.3",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "source",
          title: "Source",
          type: "string",
          description: "e.g. Google",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
  ],
});
