import { cacheLife, cacheTag } from "next/cache";

import { absoluteUrl, routes } from "@/lib/routes";
import { siteConfig } from "@/lib/site-config";
import { getAllCaseStudies } from "@/sanity/lib/case-studies";
import { getPageUrls, type PageEntry, type PageKind } from "@/sanity/lib/page-urls";
import { getAllPosts, getAllSeoArticleCards } from "@/sanity/lib/queries";
import { getSiteSettings } from "@/sanity/lib/site-settings";

/**
 * /llms.txt (https://llmstxt.org, user request 2026-10-28): a plain-Markdown map of the site for
 * AI assistants and answer engines: what Xconcile does, then every service, hire, industry,
 * company page, case study, article and blog post with its live URL and a one-line summary.
 * Built from the same sources as the sitemap (sanity/lib/page-urls.ts + Sanity), so renamed pages
 * and new posts show up automatically. Cached like the pages (`sanity` tag, /api/revalidate).
 */
async function buildLlmsTxt(): Promise<string> {
  "use cache";
  cacheLife("hours");
  cacheTag("sanity");

  const [urls, settings, posts, articles, caseStudies] = await Promise.all([
    getPageUrls(),
    getSiteSettings(),
    getAllPosts().catch(() => null),
    getAllSeoArticleCards().catch(() => []),
    getAllCaseStudies().catch(() => []),
  ]);

  const oneLine = (s?: string | null) => (s ?? "").replace(/\s+/g, " ").trim();
  const link = (title: string, path: string, note?: string | null) =>
    `- [${oneLine(title)}](${absoluteUrl(path)})${oneLine(note) ? `: ${oneLine(note)}` : ""}`;
  const pages = (kind: PageKind) =>
    urls.pages
      .filter((p): p is PageEntry => p.kind === kind)
      .map((p) => link(p.content.name, p.path, p.content.seo.description));

  const phones = settings.contact.phones.map((p) => `${p.label} ${p.display}`).join(", ");
  const offices = settings.offices.map((o) => `${o.name}: ${oneLine(o.lines)}`).join("; ");

  return [
    `# ${siteConfig.name}`,
    "",
    `> ${oneLine(siteConfig.defaultDescription)}`,
    "",
    `${siteConfig.legalName} provides outsourced accounting, bookkeeping, tax preparation, multi-state sales tax, payroll, audit support, revenue cycle management and virtual CFO services for U.S. businesses and CPA firms, plus dedicated offshore accounting staff on flexible engagement models.`,
    "",
    `- Website: ${siteConfig.url}`,
    `- Email: ${settings.contact.email}`,
    ...(phones ? [`- Phone: ${phones}`] : []),
    ...(offices ? [`- Offices: ${offices}`] : []),
    "",
    "## Services",
    ...pages("service"),
    "",
    "## Hire dedicated accounting staff",
    ...pages("hire"),
    "",
    "## Industries",
    link("All industries", routes.industries(), "Accounting services by industry."),
    ...pages("industry"),
    "",
    "## Company",
    link("Home", routes.home()),
    link("About Xconcile", routes.about(), "Who we are, our team and how we work."),
    link("Contact", routes.contact(), "Send an enquiry or schedule a free consultation."),
    link("Case studies", routes.caseStudies()),
    link("Blog", routes.blog()),
    link(
      "Privacy Policy",
      routes.privacy(),
      "How we collect, use and protect personal information.",
    ),
    link("Terms of Use", routes.terms(), "The terms that govern use of this website."),
    ...(caseStudies.length
      ? [
          "",
          "## Case studies",
          ...caseStudies.map((c) => link(c.title, routes.caseStudy(c.slug), c.industry)),
        ]
      : []),
    ...(articles.length
      ? ["", "## Guides", ...articles.map((a) => link(a.title, a.href || `/${a.slug}`, a.excerpt))]
      : []),
    ...(posts?.length
      ? ["", "## Blog posts", ...posts.map((p) => link(p.title, routes.post(p.slug), p.excerpt))]
      : []),
    "",
    "## Optional",
    link("Sitemap", "/sitemap.xml", "Every indexable URL with last-modified dates."),
    "",
  ].join("\n");
}

export async function GET() {
  return new Response(await buildLlmsTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
