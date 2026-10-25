import { hireAuditAndAssurance } from "./hire-audit-and-assurance";
import { hireBookkeeperAccountant } from "./hire-bookkeeper-accountant";
import { hirePayrollAndCompliance } from "./hire-payroll-and-compliance";
import { hireTaxPreparationStaff } from "./hire-tax-preparation-staff";
import { hireVirtualCfoAndFpAndA } from "./hire-virtual-cfo-and-fp-and-a";
import type { HirePageContent } from "./types";

/**
 * Hire pages built on the new template, keyed by live slug (root-level, like service pages).
 * Add a page here to publish it; `app/(website)/[slug]` prerenders every key.
 */
export const hirePages: Record<string, HirePageContent> = {
  [hireBookkeeperAccountant.slug]: hireBookkeeperAccountant,
  [hireAuditAndAssurance.slug]: hireAuditAndAssurance,
  [hirePayrollAndCompliance.slug]: hirePayrollAndCompliance,
  [hireTaxPreparationStaff.slug]: hireTaxPreparationStaff,
  [hireVirtualCfoAndFpAndA.slug]: hireVirtualCfoAndFpAndA,
};

export type { HirePageContent };
