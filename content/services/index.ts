import { auditOutsourcingServices } from "./audit-outsourcing-services";
import { multiStateSalesAndUseTaxCompliance } from "./multi-state-sales-and-use-tax-compliance";
import { outsourcedAccountingAndBookkeeping } from "./outsourced-accounting-and-bookkeeping";
import { outsourcedPayrollAndComplianceServices } from "./outsourced-payroll-and-compliance-services";
import { outsourcedTaxPreparation } from "./outsourced-tax-preparation";
import { outsourcedVirtualCfoAndFpAndA } from "./outsourced-virtual-cfo-and-fp-and-a";
import { revenueCycleManagement } from "./revenue-cycle-management";
import type { ServicePageContent } from "./types";

/**
 * Service pages built on the new template, keyed by live slug. Add a page here to publish it
 * (generateStaticParams reads this list); slugs not listed 404.
 * Order = the Services menu order (content/navigation.ts).
 */
export const servicePages: Record<string, ServicePageContent> = {
  [outsourcedAccountingAndBookkeeping.slug]: outsourcedAccountingAndBookkeeping,
  [auditOutsourcingServices.slug]: auditOutsourcingServices,
  [outsourcedTaxPreparation.slug]: outsourcedTaxPreparation,
  [multiStateSalesAndUseTaxCompliance.slug]: multiStateSalesAndUseTaxCompliance,
  [outsourcedPayrollAndComplianceServices.slug]: outsourcedPayrollAndComplianceServices,
  [outsourcedVirtualCfoAndFpAndA.slug]: outsourcedVirtualCfoAndFpAndA,
  [revenueCycleManagement.slug]: revenueCycleManagement,
};

export type { ServicePageContent };
