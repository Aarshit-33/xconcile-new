import type { InquiryFormInput } from "@/lib/inquiry-schema";

/**
 * Old-site inquiry form options (old-code/xconcile-website/components/services/ServiceInquiryForm.tsx).
 * Same values as the old site so `contactSubmission.service` stays consistent across both sites.
 * Kept out of `inquiry-schema.ts` so the client form can import them without pulling in zod.
 */
export const inquiryServiceOptions = [
  { value: "tax-preparation", label: "Tax Preparation" },
  { value: "sales-use-tax-compliance", label: "Sales & Use Tax Compliance" },
  { value: "bookkeeping", label: "Bookkeeping" },
  { value: "payroll", label: "Payroll" },
  { value: "full-service-accounting", label: "Full-Service Accounting" },
  { value: "cfo-support", label: "CFO Support" },
  { value: "account-cleanup", label: "Account Cleanup" },
  { value: "other", label: "Other" },
] as const;

/** Empty form state. Service defaults to "Other", as on the old home page. */
export const inquiryDefaults: InquiryFormInput = {
  name: "",
  email: "",
  phone: "",
  company: "",
  service: "other",
  message: "",
  website: "",
};

export function inquiryServiceLabel(value: string) {
  return inquiryServiceOptions.find((o) => o.value === value)?.label ?? value;
}
