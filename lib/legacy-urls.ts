/**
 * Slugs the old site served under /services/<slug> and /hire-staff/<slug> (its Sanity `service`
 * and `hireStaff` documents, checked 2026-10-29). Prerendered by the legacy-prefix routes so
 * these known URLs 301 instantly; any other slug under those prefixes is resolved on request.
 */
export const LEGACY_SERVICE_SLUGS = [
  "outsourced-accounting-and-bookkeeping",
  "audit-outsourcing-services",
  "outsourced-tax-preparation",
  "multi-state-sales-and-use-tax-compliance",
  "outsourced-payroll-and-compliance-services",
  "outsourced-virtual-cfo-and-fp-and-a",
] as const;

export const LEGACY_HIRE_SLUGS = [
  "hire-audit-and-assurance",
  "hire-bookkeeper-accountant",
  "hire-payroll-and-compliance",
  "hire-tax-preparation-staff",
  "hire-virtual-cfo-and-fp-and-a",
] as const;
