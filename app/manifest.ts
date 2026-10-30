import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site-config";

/**
 * Web app manifest (`/manifest.webmanifest`, audit N-SEO13: it returned 404). Name, colours and
 * icons for "Add to Home Screen" and browser UI. `display: "browser"` keeps the site a normal
 * website: nothing changes for visitors.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.name,
    description: siteConfig.defaultDescription,
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#13212C",
    icons: [
      { src: "/icon.png", sizes: "192x192", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
