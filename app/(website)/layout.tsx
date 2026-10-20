import { SiteShell } from "@/components/layout/site-shell";
import "../globals.css";

/**
 * Public site layout (route group: no URL segment). Mirrors the old site's `(website)` group:
 * site chrome and design tokens apply here, never to the embedded Studio at /studio.
 */
export default function WebsiteLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell>{children}</SiteShell>;
}
