import { EnvelopeIcon } from "@sanity/icons/Envelope";
import { defineArrayMember, defineField, defineType } from "sanity";

import { anchorIdField, hiddenField, sectionPreview } from "../fields";

/** Label + placeholder for one form input. Required rules stay in code (lib/lead-schema.ts). */
const formInput = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "object",
    options: { collapsible: true, collapsed: true },
    fields: [
      defineField({ name: "label", title: "Label", type: "string", validation: (Rule) => Rule.required() }),
      defineField({ name: "placeholder", title: "Placeholder", type: "string" }),
    ],
  });

/**
 * "Ready to Simplify Your Accounting?" contact block in the Figma look (light grey, copy + checks
 * left, form card right; components/shared/contact-section.tsx). Used on the About page; mirrors
 * `home.contact` in content/home.ts. Editors change the copy; the fields themselves, the required
 * rules and the service options stay in code because the server validates them.
 */
export default defineType({
  name: "leadContactSection",
  title: "Contact Form (light)",
  type: "object",
  icon: EnvelopeIcon,
  groups: [
    { name: "copy", title: "Left side", default: true },
    { name: "form", title: "Form" },
  ],
  fields: [
    { ...hiddenField(), group: "copy" },
    { ...anchorIdField("contact"), group: "copy" },
    defineField({ name: "title", title: "Heading (H2)", type: "headingTitle", group: "copy" }),
    defineField({ name: "body", title: "Text", type: "text", rows: 3, group: "copy" }),
    defineField({
      name: "checks",
      title: "Check items",
      type: "array",
      group: "copy",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "form",
      title: "Form",
      type: "object",
      group: "form",
      options: { collapsible: false },
      fields: [
        defineField({
          name: "fields",
          title: "Inputs",
          type: "object",
          options: { collapsible: false },
          fields: [
            formInput("name", "Name"),
            formInput("email", "Email"),
            formInput("company", "Company"),
            formInput("service", "Service of interest"),
            formInput("message", "Message"),
          ],
        }),
        defineField({ name: "submit", title: "Button label", type: "string" }),
        defineField({ name: "submitting", title: "Button label while sending", type: "string" }),
        defineField({ name: "success", title: "Success message", type: "text", rows: 2 }),
        defineField({
          name: "error",
          title: "Error message",
          type: "text",
          rows: 2,
          description: "The contact email address is added after this text automatically.",
        }),
      ],
    }),
  ],
  preview: sectionPreview("Contact Form"),
});
