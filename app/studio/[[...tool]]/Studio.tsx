"use client";

import { NextStudio } from "next-sanity/studio";

import config from "../../../sanity.config";

// Client boundary: sanity.config pulls in the whole Studio, which must not enter the RSC graph.
export function Studio() {
  return <NextStudio config={config} />;
}
