/**
 * Site schema types, designed from scratch for the redesign (registered in ../index.ts).
 * Names avoid the old site's legacy ones (seo, cta, stat, faq, feature, testimonial, homePage…)
 * so documents left over in shared datasets never collide.
 */
import type { SchemaTypeDefinition } from "sanity";

import home from "./documents/home";
import hirePage from "./documents/hirePage";
import industryPage from "./documents/industryPage";
import notFoundPage from "./documents/notFoundPage";
import servicePage from "./documents/servicePage";
import siteSettings from "./documents/siteSettings";
import altImage from "./objects/altImage";
import ctaLink from "./objects/ctaLink";
import headingTitle from "./objects/headingTitle";
import iconCard from "./objects/iconCard";
import optionalLink from "./objects/optionalLink";
import richText from "./objects/richText";
import seoMeta from "./objects/seoMeta";
import statItem from "./objects/statItem";
import audienceCardsSection from "./sections/audienceCardsSection";
import blogSection from "./sections/blogSection";
import cardGridSection from "./sections/cardGridSection";
import caseStudiesSection from "./sections/caseStudiesSection";
import challengesSection from "./sections/challengesSection";
import contactSection from "./sections/contactSection";
import ctaBandSection from "./sections/ctaBandSection";
import engagementModelsSection from "./sections/engagementModelsSection";
import experienceLevelsSection from "./sections/experienceLevelsSection";
import faqSection from "./sections/faqSection";
import featureStripSection from "./sections/featureStripSection";
import heroSection from "./sections/heroSection";
import hiringStepsSection from "./sections/hiringStepsSection";
import industriesSection from "./sections/industriesSection";
import introSection from "./sections/introSection";
import processSection from "./sections/processSection";
import securityControlsSection from "./sections/securityControlsSection";
import servicesSection from "./sections/servicesSection";
import statsSection from "./sections/statsSection";
import subIndustriesSection from "./sections/subIndustriesSection";
import testimonialsSection from "./sections/testimonialsSection";
import toolsSection from "./sections/toolsSection";
import toolTabsSection from "./sections/toolTabsSection";
import whyChooseSection from "./sections/whyChooseSection";

export const v2Types: SchemaTypeDefinition[] = [
  // Objects
  altImage,
  ctaLink,
  headingTitle,
  iconCard,
  optionalLink,
  richText,
  seoMeta,
  statItem,

  // Sections (page order)
  heroSection,
  statsSection,
  introSection,
  challengesSection,
  servicesSection,
  caseStudiesSection,
  processSection,
  industriesSection,
  whyChooseSection,
  toolsSection,
  testimonialsSection,
  blogSection,
  faqSection,
  contactSection,
  // Service-page-only sections
  toolTabsSection,
  ctaBandSection,
  // Hire-page-only sections (template order)
  featureStripSection,
  cardGridSection,
  engagementModelsSection,
  hiringStepsSection,
  experienceLevelsSection,
  audienceCardsSection,
  securityControlsSection,
  // Industry-page-only sections
  subIndustriesSection,

  // Documents
  home,
  servicePage,
  hirePage,
  industryPage,
  notFoundPage,
  siteSettings,
];
