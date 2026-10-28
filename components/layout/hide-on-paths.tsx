"use client";

import { usePathname } from "next/navigation";

/**
 * Renders its children except on the given paths. Lets the server-rendered site chrome (e.g.
 * <SiteFooter />) be left out of single pages without splitting the `(website)` layout into
 * route groups. The pathname is known during prerendering, so excluded pages ship no HTML for it.
 */
export function HideOnPaths({ paths, children }: { paths: string[]; children: React.ReactNode }) {
  const pathname = usePathname();
  const path = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
  return paths.includes(path) ? null : children;
}
