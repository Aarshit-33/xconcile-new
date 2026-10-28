/**
 * Sanity Studio config, mounted at /studio (app/studio/[[...tool]]/page.tsx), outside the site chrome.
 * Schemas: the redesign's page-builder types (sanity/schemaTypes/v2) + contactSubmission.
 */
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { URL_SLUG_TYPES, withOldSlugRecord } from "./sanity/actions/record-old-slug";
import { apiVersion, dataset, projectId, studioBasePath } from "./sanity/env";
import { schema } from "./sanity/schemaTypes";
import { singletonTypes, structure } from "./sanity/structure";

/** Actions allowed on singletons (no duplicate / delete / unpublish). */
const singletonActions = new Set(["publish", "discardChanges", "restore"]);

export default defineConfig({
  name: "xconcile",
  title: "Xconcile",
  basePath: studioBasePath,
  projectId,
  dataset,
  schema: {
    ...schema,
    // Hide singletons from the global "+ Create" menu.
    templates: (templates) => templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    actions: (input, context) => {
      if (singletonTypes.has(context.schemaType))
        return input.filter(({ action }) => action && singletonActions.has(action));
      // Service/hire/industry pages: publishing a new URL slug keeps the old one as a 301.
      if (URL_SLUG_TYPES.has(context.schemaType))
        return input.map((a) => (a.action === "publish" ? withOldSlugRecord(a) : a));
      return input;
    },
  },
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
});
