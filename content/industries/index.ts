import { hospitalityRetail } from "./hospitality-retail";
import { itTechnology } from "./it-technology";
import { medicalHealth } from "./medical-health";
import { professionalServices } from "./professional-services";
import { realEstateConstruction } from "./real-estate-construction";
import { techEcommerce } from "./tech-ecommerce";
import type { IndustryPageContent } from "./types";

/**
 * Industry pages built on the new template, keyed by live slug (`/industries/<slug>`).
 * Add a page here to publish it; `app/(website)/industries/[slug]` prerenders every key.
 */
export const industryPages: Record<string, IndustryPageContent> = {
  [realEstateConstruction.slug]: realEstateConstruction,
  [medicalHealth.slug]: medicalHealth,
  [professionalServices.slug]: professionalServices,
  [techEcommerce.slug]: techEcommerce,
  [hospitalityRetail.slug]: hospitalityRetail,
  [itTechnology.slug]: itTechnology,
};

export type { IndustryPageContent };
