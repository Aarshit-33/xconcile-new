import { realEstateConstruction } from "./real-estate-construction";
import type { IndustryPageContent } from "./types";

/**
 * Industry pages built on the new template, keyed by live slug (`/industries/<slug>`).
 * Add a page here to publish it; `app/(website)/industries/[slug]` prerenders every key.
 */
export const industryPages: Record<string, IndustryPageContent> = {
  [realEstateConstruction.slug]: realEstateConstruction,
};

export type { IndustryPageContent };
