import { EnvelopeIcon } from "@sanity/icons/Envelope";
import { defineField, defineType } from "sanity";

/**
 * Contact page (`/contact`, singleton `_id: "contactPage"`, design
 * page-updated/newShit/contact.svg). The page is the dark "Send Us a Message" section, then the
 * footer (the "Stay Updated" subscribe band was removed, user request 2026-10-27).
 *  - Contact section: leave empty to show the same copy as Home (Studio → Home Page → Contact),
 *    so one edit updates both; fill it to give this page its own copy.
 */
export default defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  icon: EnvelopeIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "contact",
      title: "Contact section (optional)",
      type: "contactSection",
      group: "content",
      description:
        "Empty = the Home page's Contact section (same copy on both pages). The heading is this page's H1.",
    }),
    defineField({ name: "seo", title: "SEO", type: "seoMeta", group: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Contact Page", subtitle: "/contact" }) },
});
