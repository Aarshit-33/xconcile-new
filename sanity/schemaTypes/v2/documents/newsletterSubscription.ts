import { EnvelopeIcon } from "@sanity/icons/Envelope";
import { defineField, defineType } from "sanity";

/**
 * "Stay Updated" newsletter sign-up, written by the blog article form
 * (app/actions/subscribe-newsletter.ts). Same shape as the old site's documents
 * (old-code/xconcile-website/schemas/newsletterSubscription.ts), stored in this site's dataset.
 */
export default defineType({
  name: "newsletterSubscription",
  title: "Newsletter Subscriber",
  type: "document",
  icon: EnvelopeIcon,
  fields: [
    defineField({ name: "email", title: "Email", type: "string", validation: (Rule) => Rule.required().email() }),
    defineField({
      name: "subscribedAt",
      title: "Subscribed at",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Active", value: "active" },
          { title: "Unsubscribed", value: "unsubscribed" },
        ],
        layout: "radio",
      },
      initialValue: "active",
    }),
    defineField({
      name: "source",
      title: "Signed up on",
      type: "string",
      description: "Page the form was submitted from.",
      readOnly: true,
    }),
  ],
  orderings: [{ title: "Newest first", name: "subscribedAtDesc", by: [{ field: "subscribedAt", direction: "desc" }] }],
  preview: {
    select: { email: "email", subscribedAt: "subscribedAt", status: "status" },
    prepare: ({ email, subscribedAt, status }) => ({
      title: email || "No email",
      subtitle: `${status || "active"} · ${subscribedAt ? new Date(subscribedAt).toLocaleDateString() : "unknown date"}`,
    }),
  },
});
