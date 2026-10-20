import { z } from "zod";

import { inquiryServiceOptions } from "@/lib/inquiry-options";

const serviceValues: readonly string[] = inquiryServiceOptions.map((o) => o.value);

/**
 * Old-site inquiry form (home contact section), shared by the client form and the
 * `submitInquiry` server action. Required fields match the old site:
 * Full Name*, Work Email*, Service*, Message*. Phone and Company are optional.
 */
export const inquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100, "Please shorten your name."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email address.")
    .max(200, "Please shorten your email address.")
    .pipe(z.email("Please enter a valid email address.")),
  phone: z
    .string()
    .trim()
    .max(30, "Please shorten the phone number.")
    .refine(
      (value) => value === "" || /^[+()\d\s.-]{7,}$/.test(value),
      "Please enter a valid phone number.",
    ),
  company: z.string().trim().max(150, "Please shorten the company name."),
  service: z.string().refine((value) => serviceValues.includes(value), "Please choose a service."),
  message: z
    .string()
    .trim()
    .min(1, "Please enter a message.")
    .max(5000, "Please keep your message under 5,000 characters."),
  /** Honeypot: visually hidden and skipped by keyboard users; bots tend to fill it in. */
  website: z.string().max(200).optional(),
});

export type InquiryFormInput = z.input<typeof inquirySchema>;
export type InquiryFormOutput = z.output<typeof inquirySchema>;
export type InquiryField = keyof InquiryFormInput;
