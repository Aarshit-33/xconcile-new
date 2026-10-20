/**
 * Sanity Studio config, mounted at /studio (app/studio/[[...tool]]/page.tsx), outside the site chrome.
 * Schemas: the redesign's page-builder types (sanity/schemaTypes/v2) + contactSubmission.
 */
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

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
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
});
