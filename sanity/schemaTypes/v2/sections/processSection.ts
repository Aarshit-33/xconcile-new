import { ArrowRightIcon } from "@sanity/icons/ArrowRight";
import { defineArrayMember, defineField, defineType } from "sanity";

import { anchorIdField, badgeField, subtitleField, titleField } from "../fields";

/** "Our Simple Accounting Process" steps (mirrors `ProcessContent`). */
export default defineType({
  name: "processSection",
  title: "Process",
  type: "object",
  icon: ArrowRightIcon,
  fields: [
    anchorIdField("process"),
    badgeField(),
    titleField(),
    subtitleField(),
    defineField({
      name: "steps",
      title: "Steps",
      type: "array",
      of: [defineArrayMember({ type: "iconCard" })],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
});
