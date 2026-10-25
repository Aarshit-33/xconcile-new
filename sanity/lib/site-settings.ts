import "server-only";

import { headerMenuPromo, headerNav, footerNav, type MenuGroup, type MenuPromo, type NavLink } from "@/content/navigation";
import { siteConfig } from "@/lib/site-config";

import { sanityFetch } from "./fetch";
import { img, IMG, type Raw } from "./sections";

/** Platforms the footer has an icon for (as drawn). */
export type SocialPlatform = "facebook" | "instagram" | "linkedin" | "pinterest" | "youtube";
export type SocialLink = { platform: SocialPlatform; label: string; url: string };
export type ContactPhone = { label: string; display: string; tel: string };
export type Office = {
  name: string;
  country: "in" | "us";
  lines: string;
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
};
export type FooterBadge = { src: string; alt: string; size: number };

/** Desktop hamburger side panel; contact lines are resolved from the Contact tab. */
export type SidePanel = {
  title: string;
  body: string;
  cta: NavLink;
  phone?: ContactPhone;
  email: string;
  address?: string;
};

export type SiteSettings = {
  header: { ctaLabel: string; menus: MenuGroup[]; promo: MenuPromo };
  footer: {
    description: string;
    columns: { title: string; links: NavLink[] }[];
    badges: FooterBadge[];
    copyrightName: string;
    /** Studio → Footer → Show phone numbers (default on). */
    showPhones: boolean;
  };
  contact: { email: string; phones: ContactPhone[] };
  offices: Office[];
  /** Profiles with a URL, in the editor's order. */
  social: SocialLink[];
  /** Social URLs for the Organization structured data. */
  sameAs: string[];
  calendlyUrl: string;
  sidePanel: SidePanel;
};

const socialLabels: Record<SocialPlatform, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  pinterest: "Pinterest",
  youtube: "YouTube",
};

const isSocialPlatform = (p: unknown): p is SocialPlatform => typeof p === "string" && Object.hasOwn(socialLabels, p);

/** Code values: what the site showed before Site Settings existed, and the fallback for empty fields. */
const FALLBACK_BADGES: FooterBadge[] = siteConfig.footerBadges.map((b) => ({ ...b }));

const FALLBACK_SOCIAL: SocialLink[] = siteConfig.social
  .filter((s) => s.url)
  .map((s) => ({ platform: s.platform, label: s.label, url: s.url }));

export const FALLBACK_SETTINGS: SiteSettings = {
  header: { ctaLabel: "Schedule a Meeting", menus: headerNav, promo: headerMenuPromo },
  footer: {
    description: siteConfig.footerBlurb,
    columns: footerNav,
    badges: FALLBACK_BADGES,
    copyrightName: siteConfig.legalName,
    showPhones: true,
  },
  contact: { email: siteConfig.contact.email, phones: [...siteConfig.contact.phones] },
  offices: [...siteConfig.offices],
  social: FALLBACK_SOCIAL,
  sameAs: FALLBACK_SOCIAL.map((s) => s.url),
  calendlyUrl: siteConfig.calendlyUrl,
  sidePanel: {
    title: "About Us",
    body: "Xconcile provides outsourced accounting, bookkeeping, tax, and audit services for U.S. businesses and CPA firms, with experienced professionals who fit your workflows and financial needs.",
    cta: { label: "Get in Touch", href: "/#contact" },
    phone: siteConfig.contact.phones[0],
    email: siteConfig.contact.email,
    address: siteConfig.offices.find((o) => o.country === "us")?.lines,
  },
};

const SITE_SETTINGS_QUERY = /* groq */ `*[_id == "siteSettings"][0]{
  header,
  footer{ ..., badges[]{ size, "image": image${IMG} } },
  contact,
  social,
  booking,
  sidePanel
}`;

/** Non-empty array → mapped list, otherwise undefined (so `??` falls back to code). */
const list = <T>(arr: Raw, map: (x: Raw) => T | undefined): T[] | undefined => {
  const out = Array.isArray(arr) ? arr.map(map).filter((x): x is T => Boolean(x)) : [];
  return out.length ? out : undefined;
};

const navLink = (l: Raw): NavLink | undefined => (l?.label && l?.href ? { label: l.label, href: l.href } : undefined);

/**
 * Site-wide settings from the Sanity `siteSettings` singleton (Studio → Site Settings (New
 * Site)): header menus + promo card + navbar button, footer, contact details, offices, social
 * profiles and the Calendly link. Same rules as Home: any field left empty in Sanity (or Sanity
 * not configured / the document missing) falls back to the code values above
 * (content/navigation.ts, lib/site-config.ts). Cache tag: `siteSettings` (/api/revalidate).
 *
 * Called by the header, footer, site shell and Home; `sanityFetch` is cached, so it is one query.
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  const d: Raw = await sanityFetch({ query: SITE_SETTINGS_QUERY, tags: ["siteSettings"] }).catch(() => null);
  if (!d) return FALLBACK_SETTINGS;
  const f = FALLBACK_SETTINGS;

  const menus = list<MenuGroup>(d.header?.menus, (m) => {
    const items = list(m?.items, (l) =>
      navLink(l) && l.icon && l.description ? { ...navLink(l)!, icon: l.icon, description: l.description } : undefined,
    );
    return m?.label && items ? { label: m.label, promo: m.showPromo !== false, items } : undefined;
  });
  const p = d.header?.promo;

  const social = list<SocialLink>(d.social, (s) => {
    const url = s?.url?.trim();
    return url && isSocialPlatform(s?.platform) ? { platform: s.platform, label: socialLabels[s.platform as SocialPlatform], url } : undefined;
  });

  const contact: SiteSettings["contact"] = {
    email: d.contact?.email || f.contact.email,
    phones:
      list<ContactPhone>(d.contact?.phones, (x) =>
        x?.label && x?.display && x?.tel ? { label: x.label, display: x.display, tel: x.tel } : undefined,
      ) ?? f.contact.phones,
  };
  const offices =
    list<Office>(d.contact?.offices, (o) =>
      o?.name && (o.country === "in" || o.country === "us") && o.lines
        ? {
            name: o.name,
            country: o.country,
            lines: o.lines,
            streetAddress: o.streetAddress ?? "",
            addressLocality: o.addressLocality ?? "",
            addressRegion: o.addressRegion ?? "",
            postalCode: o.postalCode ?? "",
            addressCountry: o.addressCountry ?? "",
          }
        : undefined,
    ) ?? f.offices;

  return {
    header: {
      ctaLabel: d.header?.ctaLabel || f.header.ctaLabel,
      menus: menus ?? f.header.menus,
      promo: {
        badge: p?.badge || f.header.promo.badge,
        title: p?.title || f.header.promo.title,
        body: p?.body || f.header.promo.body,
        cta: p?.buttonLabel || f.header.promo.cta,
      },
    },
    footer: {
      description: d.footer?.description?.trim() || f.footer.description,
      columns:
        list(d.footer?.columns, (c) => {
          const links = list(c?.links, navLink);
          return c?.title && links ? { title: c.title, links } : undefined;
        }) ?? f.footer.columns,
      badges:
        list<FooterBadge>(d.footer?.badges, (b) => {
          const image = img(b?.image);
          return image ? { src: image.src, alt: image.alt, size: b.size || 100 } : undefined;
        }) ?? f.footer.badges,
      copyrightName: d.footer?.copyrightName || f.footer.copyrightName,
      showPhones: d.footer?.showPhones !== false,
    },
    contact,
    offices,
    social: social ?? f.social,
    sameAs: (social ?? f.social).map((s) => s.url),
    calendlyUrl: d.booking?.calendlyUrl || f.calendlyUrl,
    sidePanel: resolveSidePanel(d.sidePanel, contact, offices),
  };
}

function resolveSidePanel(sp: Raw, contact: SiteSettings["contact"], offices: Office[]): SidePanel {
  const f = FALLBACK_SETTINGS.sidePanel;
  const wantPhone = sp?.phoneLabel?.trim().toLowerCase();
  // Studio → Side panel → Show phone number (default on).
  const phone =
    sp?.showPhone === false
      ? undefined
      : (wantPhone && contact.phones.find((p) => p.label.toLowerCase() === wantPhone)) || contact.phones[0];
  const country = sp?.office === "in" ? "in" : "us";
  return {
    title: sp?.title?.trim() || f.title,
    body: sp?.body?.trim() || f.body,
    cta: navLink(sp?.cta) ?? f.cta,
    phone,
    email: contact.email,
    address: (offices.find((o) => o.country === country) ?? offices[0])?.lines,
  };
}
