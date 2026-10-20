import { hireBookkeeperAccountant } from "./hire-bookkeeper-accountant";
import type { HirePageContent } from "./types";

/**
 * Hire pages built on the new template, keyed by live slug (root-level, like service pages).
 * Add a page here to publish it; `app/(website)/[slug]` prerenders every key.
 */
export const hirePages: Record<string, HirePageContent> = {
  [hireBookkeeperAccountant.slug]: hireBookkeeperAccountant,
};

export type { HirePageContent };
