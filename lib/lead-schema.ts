import { z } from "zod";

import { leadServiceOptions } from "@/content/navigation";

const serviceValues: readonly string[] = leadServiceOptions.map((o) => o.value);

/**
 * Contact / lead form schema, shared by the client form (react-hook-form) and the
 * `submitLead` server action. Required fields follow the design: Name*, Email*, Service*.
 */
export const leadSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100, "Please shorten your name."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email address.")
    .max(200, "Please shorten your email address.")
    .pipe(z.email("Please enter a valid email address.")),
  company: z.string().trim().max(150, "Please shorten the company name."),
  service: z.string().refine((value) => serviceValues.includes(value), "Please choose a service."),
  message: z.string().trim().max(5000, "Please keep your message under 5,000 characters."),
  /** Honeypot: visually hidden and skipped by keyboard users; bots tend to fill it in. */
  website: z.string().max(200).optional(),
});

export type LeadFormInput = z.input<typeof leadSchema>;
export type LeadFormOutput = z.output<typeof leadSchema>;
export type LeadField = keyof LeadFormInput;

export function serviceLabel(value: string) {
  return leadServiceOptions.find((o) => o.value === value)?.label ?? value;
}
