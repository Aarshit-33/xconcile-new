import { auditOutsourcingServices } from "./audit-outsourcing-services";
import type { ServicePageContent } from "./types";

/**
 * Service pages built on the new template, keyed by live slug. Add a page here to publish it
 * (generateStaticParams reads this list); slugs not listed 404.
 */
export const servicePages: Record<string, ServicePageContent> = {
  [auditOutsourcingServices.slug]: auditOutsourcingServices,
};

export type { ServicePageContent };
