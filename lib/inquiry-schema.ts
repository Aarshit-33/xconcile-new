import { z } from "zod";

import { inquiryServiceOptions } from "@/lib/inquiry-options";

const serviceValues: readonly string[] = inquiryServiceOptions.map((o) => o.value);

/**
 * Old-site inquiry form (home contact section), shared by the client form and the
 * `submitInquiry` server action. Required fields match the old site:
 * Full Name*, Work Email*, Service*, Message*. Phone and Company are optional.
 */
export const inquiryFieldsSchema = z.object({
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

/**
 * What the server action receives: the form fields plus the math CAPTCHA, which is solved in a
 * popup after the form validates (components/forms/captcha-dialog.tsx; client request 2026-10-28).
 */
export const inquirySchema = inquiryFieldsSchema.extend({
  /** Answer to the CAPTCHA image ("4 + 6"), checked against the signed token on the server. */
  captchaAnswer: z
    .string()
    .trim()
    .min(1, "Please enter the answer.")
    .regex(/^\d{1,3}$/, "Please enter the answer as a number."),
  /** Signed challenge from `getCaptcha` (lib/captcha.ts). */
  captchaToken: z.string().min(1, "Please enter the answer.").max(200),
});

/** The form's own fields (validated in the browser before the CAPTCHA popup opens). */
export type InquiryFormInput = z.input<typeof inquiryFieldsSchema>;
export type InquiryFormOutput = z.output<typeof inquiryFieldsSchema>;
export type InquiryField = keyof InquiryFormInput;
export type InquirySubmission = z.input<typeof inquirySchema>;
