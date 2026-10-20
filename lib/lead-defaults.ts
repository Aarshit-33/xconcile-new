import type { LeadFormInput } from "@/lib/lead-schema";

/**
 * Empty lead-form state. Kept out of `lead-schema.ts` so the client form can import it
 * without pulling zod into the page's initial JavaScript (the schema loads on first validation).
 */
export const leadDefaults: LeadFormInput = {
  name: "",
  email: "",
  company: "",
  service: "",
  message: "",
  website: "",
};
