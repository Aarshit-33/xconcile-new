<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Xconcile Website: Agent Guide

Marketing site for **Xconcile** (outsourced accounting for U.S. businesses and CPA firms).
It is a rebuild of `../old-code/xconcile-website` from a new Figma design.
Priorities, in order: **pixel-match the design → SEO / Core Web Vitals → accessibility → DX.**

## 0. Hard rules (read first)

1. **No UI changes the docs don't ask for.** Build only what is drawn in the design files or written in `docs/`.
   - That covers layout, colors, spacing, copy, sections, animations and states.
   - If something isn't specified (hover state, mobile layout of an inner page, a missing section), **stop and ask**. Don't invent it, and don't "improve" the design.
   - Design skills (`impeccable`, `design-taste-frontend`, `ui-ux-pro-max`, `frontend-design`) are for **implementation quality and review only**. Never use them to restyle or re-art-direct the approved design.
2. **Use shadcn/ui primitives. Never hand-roll a base component.** Add primitives with `npx shadcn@latest add <name>` into `components/ui/`, then compose and style them with Tailwind.
3. **Tokens only.** Use the design tokens in `app/globals.css` (`bg-brand`, `text-heading`, `text-body`, `text-h2`, `bg-dark-gradient`, `container-site`…).
   - Arbitrary values (`text-[#6abe52]`, `mt-[37px]`) are allowed only when a value is in the Figma CSS but not yet tokenized. Add it as a token if it repeats.
4. **Public npm packages only.** Don't use any Google-internal or private packages or registries. `.npmrc` pins `https://registry.npmjs.org/`.
5. **Read-only sources.** Never edit these:
   - `../pages svg, css & png/`
   - `../old-code/`
   - `docs/design/`
   - `docs/content/`
6. **SEO is non-negotiable.** Server-render all content and use one `<h1>` per page. Accordion, tab and carousel content must be in the HTML. Follow the checklist in §6.

## 1. Stack

| Concern | Choice |
|---|---|
| Framework | Next.js **16.4** App Router, React 19.3, TypeScript, **Cache Components + Partial Prefetching on** |
| Styling | Tailwind CSS **v4** (CSS-first `@theme` in `app/globals.css`), `tw-animate-css`, `@tailwindcss/typography` |
| Components | **shadcn/ui** (Radix base, "Nova" preset, Lucide icons) in `components/ui/` |
| CMS | **Sanity v6** + `next-sanity` v13. Studio embedded at `/studio` |
| Animation | **GSAP 3.15** + `@gsap/react` (ScrollTrigger, SplitText) for text reveal and parallax. **Motion** (Framer Motion) for simple enter/exit |
| Forms | react-hook-form + zod 4 + `@hookform/resolvers`, shadcn `field` / `input` / `select` / `textarea` |
| SEO | Next Metadata API, `app/sitemap.ts`, `app/robots.ts`, `schema-dts` typed JSON-LD |
| Misc | `react-calendly` (popup scheduler), `@vercel/speed-insights`, Prettier + tailwind plugin |

**Fonts:** Manrope (primary) and Outfit (footer, process titles, blog titles), loaded via `next/font` in `app/layout.tsx`.

## 2. Commands

```bash
npm run dev          # http://localhost:3000  (Studio: /studio)
npm run build        # production build (must pass before any PR)
npm run lint         # eslint
npm run typecheck    # tsc --noEmit
npm run format       # prettier (sorts Tailwind classes)
npm run typegen      # Sanity schema extract + typegen (needs project ID)
npx shadcn@latest add <component>
```

Copy `.env.example` to `.env.local` before running against real content. Without a Sanity project ID, `sanityFetch` returns `null` so builds still pass.

## 3. Project map

```
app/
  layout.tsx              # root document shared with /studio: <html>/<body>, fonts, metadata, GTM consent default
  (website)/layout.tsx    # public-site group: globals.css + <SiteShell> (JSON-LD, GTM, Zoho, header/footer chrome)
  (website)/page.tsx      # Home: composes components/sections/* from content/home.ts (+ FAQ/Video/LocalBusiness JSON-LD)
  (website)/[slug]/page.tsx # root-level service AND hire pages (live slugs) from the content/services and
                          #   content/hire registries; real 404 for unknown slugs via ensureStatic='navigation'
                          #   (+ Service/Breadcrumb/FAQ(/Video) JSON-LD)
  (website)/industries/[slug]/page.tsx # industry pages at the live /industries/:slug URLs (content/industries
                          #   registry), same 404 handling and JSON-LD
  (website)/not-found.tsx # 404 for notFound() in website pages (unknown slug): body only, the group layout adds chrome
  not-found.tsx           # 404 for URLs matching no route (/a/b/c): wraps the same body in <SiteShell>.
                          #   Body = components/sections/not-found-content.tsx (content/not-found.ts). Never put
                          #   header/footer in the body or the (website) 404 shows them twice
  actions/submit-lead.ts  # lead form server action (Sanity contactSubmission + MS Graph email)
  globals.css             # DESIGN TOKENS: edit only to add tokens that exist in the Figma CSS
  sitemap.ts, robots.ts   # crawl files (page slugs from the content registries, _updatedAt from Sanity)
  studio/[[...tool]]/     # embedded Sanity Studio. Renders bare like the old site's (studio) group: no site
                          #   chrome, tracking or globals.css. Title "Sanity Studio", noindex
  api/revalidate/         # Sanity webhook -> revalidateTag(_type, 'max')
content/
  types.ts                # SHARED section content types (HeroContent, IntroContent, ...) + SCHEDULE_HREF
  home.ts                 # Home copy (typed). Deviations from drawn copy are marked `COPY FIX`
  services/               # service pages: types.ts (ServicePageContent), index.ts (registry), one file per page
  hire/                   # hire pages: types.ts (HirePageContent), index.ts (registry), one file per page
  industries/             # industry pages: types.ts (IndustryPageContent), index.ts (registry), one file per page
  navigation.ts           # header/footer nav, service list, lead-form service options
components/
  ui/                     # shadcn primitives (generated; restyle via className/cva, avoid editing internals)
                          #   local additions: accordion `forceMount` (SSR-visible panels), scroll-area props
  sections/               # SHARED section blocks used by every template (hero, stats-bar, intro, challenges,
                          #   services, case-studies, process, industries, why-choose, tools, tool-tabs,
                          #   testimonials, blog-teaser, faq, cta-band; Hire/Industry blocks: feature-strip,
                          #   card-grid, engagement-models, hiring-steps, experience-levels, audience-cards,
                          #   security-controls (Hire), sub-industries). Data typed by content/types.ts; per-design layout
                          #   differences are component props (e.g. Hero variant="inner" / wide, Challenges tone "white")
  templates/              # page templates composing sections (service-page, hire-page, industry-page)
  shared/                 # cross-page atoms: section-heading, eyebrow, cta (+ cta-styles), rail, check-item,
                          #   rich-text, contact-section
  layout/                 # site-shell (all public-site chrome), site-header, desktop-nav, mobile-menu,
                          #   site-footer, cookie-consent, back-to-top
  forms/lead-form.tsx     # react-hook-form + zod lead form (client)
  calendly/               # CalendlyProvider (popup dialog) + ScheduleMeetingButton
  motion/                 # RevealText (GSAP SplitText) and Parallax client islands
  icons/                  # Material Symbols (inline SVG), brand icons, name -> icon registry
  seo/json-ld.tsx         # <JsonLd data={...}/>
lib/
  site-config.ts          # NAP, offices, GTM/Zoho/Calendly IDs; footer blurb + social = fallbacks only
  site-settings.ts        # getFooterSettings(): footer description + social links from Sanity `settings`
                          #   (Studio -> Site Settings), falling back to site-config
  routes.ts               # URL builders (live URL structure)
  service-page.ts         # service page data = repo content + Sanity (SEO, intro image, serviceAreas)
  seo.ts                  # buildMetadata() + JSON-LD builders
  lead-schema.ts          # zod schema shared by the lead form and its server action
  mail.ts                 # server-only MS Graph sendMail (plain fetch, no Azure SDK)
  gsap.ts                 # import gsap/ScrollTrigger/SplitText/useGSAP ONLY from here
  motion.ts               # motion presets (textReveal, fadeUp, parallax)
  utils.ts                # cn() (aware of the custom font-size tokens)
sanity/
  env.ts                  # env vars (dataset `v2_xconcile`; blog posts read from `blogDataset` = production)
  lib/client.ts           # read + server-only write client
  lib/fetch.ts            # sanityFetch(): 'use cache' + cacheTag + cacheLife('max')
  lib/queries.ts          # getLatestPosts() for the blog teaser (reads `blogDataset`)
  lib/<page>.ts           # per-page loaders (home, service-page, hire-page, industry-page, not-found,
                          #   site-settings) + shared section mappers in sections.ts
  lib/image.ts            # urlFor()
  schemaTypes/            # v2/ page-builder types (documents, sections, objects) + contactSubmission
                          #   (written by the form server actions). Legacy old-site types were removed 2026-10-18
  structure.ts            # Studio sidebar (singletons + page lists)
sanity.config.ts, sanity.cli.ts
docs/
  design/xconcile_redesign_report.md     # MASTER SPEC: tokens, blocks B1–B23, SEO checklist, open decisions
  design/design_normalization_spec.md    # how non-main pages must match their group's main page
  content/                               # copy sources (see §4)
.agents/skills, .claude/skills           # installed agent skills (see §7)
```

## 4. Sources of truth

### Design: `../pages svg, css & png/`
- Each page folder has `page.svg` (the **truth**), `page.css` (exact Figma values) and `image*.png` (preview only).
  - **Don't trust the PNGs.** The Hire main PNG is a copy of the audit page.
- **Groups:** the number at the end of a folder name is its group. Within each group, the `(main)` page is the reference for design and colors:
  - `(1)` Services: `audit-outsourcing-services (main)`
  - `(2)` Hire: `hire-dedicated-accounting-professionals (main)`
  - `(3)` Industries: `real-estate-accounting-services (main)`
- If a non-main page differs from its main page, match the main page. Sections that only exist on one page are built **exactly as drawn** in that page's SVG. The full diff is in `docs/design/design_normalization_spec.md`.
- `Home/` is the only page with a mobile design (`mobile-page.svg`, 390px). Apply its patterns to the other pages (report §3.5).
- `System Theme Variables/` is the theme board.
- Desktop canvas is 1440px with a 1296px container (72px gutters). Mobile gutter is 16px.

### Content
- `docs/content/BASIC INSTRUCTION FOR THE WEBSITE.txt`: client rules:
  - Calendly opens as a **popup**.
  - Add a **cookie consent** banner and a **back-to-top** arrow.
  - "Explore our services" **anchors to the services section on the same page**.
  - Service list items turn **green on hover**.
  - Blog content stays as it is on the existing site. The client will supply Contact copy.
- `docs/content/Home page (1).txt`: Home services accordion (7 items) and 8 FAQs.
- `docs/content/*.md`, `docs/content/industries/*`, `docs/content/hire-staff/*`: page copy from the old site.
- Copy inside `page.svg` is the default for anything not covered above.
- Known copy errors are listed in report §4. Don't reproduce them. Ask if the fix is unclear.

### Old site: `../old-code/xconcile-website`
Reference it for Sanity schemas and queries, header structure, sitemap and API routes (`/api/contact`, `/api/newsletter`). Port the logic, not the UI.

## 5. Build status

**Done:**
- Global chrome (`SiteHeader`, `SiteFooter`, Calendly popup, `CookieConsent`, `BackToTop`).
- **Home**, **404**, the **Service template** with its reference page `/audit-outsourcing-services`, the **Hire template** with its reference page `/hire-bookkeeper-accountant` (design: hire-dedicated-accounting-professionals), and the **Industry template** with its reference page `/industries/real-estate-construction` (design: real-estate-accounting-services).

**Next:** the 6 other service pages (each is one content file + registry entry). All 5 hire pages, all 6 industry pages and the `/industries` gallery are built. They reuse `components/sections/*`; build each block once and drive it with props and variants. Don't make per-page copies.

### Service pages
- **Content sources** (client decision 2026-10-13):
  - Copy comes from the Figma design and lives in `content/services/<slug>.ts`.
  - Sanity `service` documents supply only SEO, the intro image and the services accordion (`serviceAreas`), merged by `lib/service-page.ts`. Repo values are the fallback.
  - Don't write to the Sanity production dataset (the live old site reads it). New CMS fields need approval.
- **CTAs:** service pages have no contact section. CTAs use `SCHEDULE_HREF`, which `CtaLink` renders as a Calendly popup button.
- **Adding a page:**
  1. Copy `audit-outsourcing-services.ts`.
  2. Replace the copy with that page's Figma text and keep the live slug (`docs/design/xconcile_redesign_report.md` §6).
  3. Register it in `content/services/index.ts`.
  4. Mark copy deviations `COPY FIX` and anything not in the design `NOT IN DESIGN`.

### Hire pages
- **Content source** (client decision 2026-10-14, Sanity added 2026-10-18; newer designs in `../pages/hire/*.svg`, 2026-10-25): copy comes from the Figma SVG and lives in `content/hire/<slug>.ts` (bookkeeper-accountant, audit-and-assurance, payroll-and-compliance, tax-preparation-staff, virtual-cfo-and-fp-and-a). The SVG wins over its `page.css` export, which is stale in places (e.g. "Get in Touch" button labels). The newer designs draw Expertise as light cards and the CTA band without a photo; the pages keep the reference components (dark CardGrid, photo CTA band).
- **Sanity** (user request 2026-10-18): every section is editable in the `hirePage` document (Studio → Hire Pages, `_id: hirePage-<slug>`, schema `sanity/schemaTypes/v2/documents/hirePage.ts`, one tab per section). `sanity/lib/hire-page.ts` maps it onto `HirePageContent` with the shared mappers in `sanity/lib/sections.ts`; any empty section/field falls back to the code content. Cache tag `hirePage` (dev: visible on the next refresh; prod: the /api/revalidate webhook). Seed/reset a page from code with `SANITY_AUTH_TOKEN=<token> npx -y tsx --env-file=.env.local scripts/seed-hire-sanity.ts [slug]` (overwrites Studio edits for that page).
- **Section order:** spec §(2) (5-Steps right after Hiring Models). Featured middle cards use the spec's `featured-card` (`bg-navy`).
- **Rhythm:** the Figma body is an auto-layout column with 80px gaps. White sections after a white section drop their top padding (`pt-0 lg:pt-0`); a tinted section after another tinted one gets the white band (`mt-12 lg:mt-20`). See `components/templates/hire-page.tsx`.
- **No mobile design:** card lists use `<Rail>` below `lg`, grids collapse to 2/1 columns.
- **CTAs:** no contact section, so CTAs use `SCHEDULE_HREF` (Calendly popup). "Explore Our Expertise" anchors to `#expertise`.
- **Adding a page:** copy `content/hire/hire-bookkeeper-accountant.ts`, replace the copy with that page's SVG text, keep the live slug (`hire-audit-and-assurance`, `hire-payroll-and-compliance`, `hire-tax-preparation-staff`, `hire-virtual-cfo-and-fp-and-a`), register it in `content/hire/index.ts`, and apply the spec's per-page fixes (e.g. 5 expertise cards on audit-assurance). Then run `scripts/seed-hire-sanity.ts <slug>` to create its Sanity document.

### Industry pages
- **Content source** (client decision 2026-10-14, Sanity added 2026-10-18; newer designs in `../pages/industry/*.svg`, 2026-10-25): copy lives in `content/industries/<slug>.ts`. Served at `/industries/<slug>`: `real-estate-construction`, `medical-health`, `hospitality-retail`, `professional-services`, `tech-ecommerce` (E-commerce design) and `it-technology` (new URL, IT design). Check `content/navigation.ts`.
- **Gallery** (`/industries`, design `Industry.svg`, 2026-10-25): `components/templates/industries-gallery.tsx` = Hero → `FeatureCards` → Industries (every card; cards without an industry page have no link) → FAQ → CTA band. Content `content/industries/gallery.ts`; Sanity singleton `industriesPage` (Studio → Industries Gallery, new section type `featureCardsSection`), loader `sanity/lib/industries-gallery.ts`, cache tag `industriesPage`, seed `scripts/seed-industries-gallery-sanity.ts`.
- **Sanity** (user request 2026-10-18): every section is editable in the `industryPage` document (Studio → Industry Pages, `_id: industryPage-<slug>`, schema `sanity/schemaTypes/v2/documents/industryPage.ts`; only `subIndustriesSection` is industry-specific, the rest reuse Home/service/hire section types). `sanity/lib/industry-page.ts` maps it onto `IndustryPageContent` with the shared mappers; empty sections/fields fall back to code. Cache tag `industryPage`. Seed/reset from code: `SANITY_AUTH_TOKEN=<token> npx -y tsx --env-file=.env.local scripts/seed-industry-sanity.ts [slug]` (overwrites Studio edits for that page).
- **Section order:** spec §(3), minus Security (removed 2026-10-18, user request). Services = `CardGrid` (dark, title only, green highlight word); Sub-Industries = `SubIndustries` (accordion rows: the drawn "+" opens the row's `groups`, copy from `docs/content/industries/<page>.md` "Sub-Industries We Serve"; rows without `groups` stay static).
- **Rhythm:** same 80px rule as Hire. The design's ~700px blank band above the CTA is a placeholder; use normal spacing.
- **Adding a page:** copy `content/industries/real-estate-construction.ts`, replace the copy with that page's SVG text (skip sections the SVG doesn't draw), register it in `content/industries/index.ts`, then run `scripts/seed-industry-sanity.ts <slug>` to create its Sanity document.

### Conventions established by the Home build
- **Mobile first, one DOM.** Base classes = 390px mobile design, `lg:` = 1440px desktop design. Don't render separate mobile/desktop trees; switch layout with classes (`hidden lg:block` only for elements drawn on one breakpoint).
- **Crawlable disclosure.** Accordions and tabs use `forceMount` so closed panels are in the HTML (see `components/ui/accordion.tsx`).
- **Mobile card rails** use `<Rail>` (shadcn ScrollArea + the green progress bar); desktop layout via `listClassName`.
- **Hover states:** only the client's rules; don't invent others. (1) Titles/arrows turn green on hover (incl. FAQ questions and blog card titles). (2) Cards get slightly darker via `cardHover` from `lib/hover.ts` (Tools). Challenges cards instead deepen within their own tint (`tones[*].hover` in `components/sections/challenges.tsx`, client request 2026-10-16). (3) Outline pills hover to `brand-100` with the green label. (4) Solid arrow pills use the hover swap. FAQs start fully closed (`firstOpen` defaults to false).
- **Missing targets:** CTAs whose destination page doesn't exist yet (`href: undefined` in `content/`) are not rendered.
- **Section ids (client request 2026-10-17): every `<section>` has a unique `id`** so any section can be linked to (`/#faq`, `/audit-outsourcing-services#process`). Render it as `<section id={sectionId(data, "<key>")}>` from `lib/section-ids.ts`: per-page override `anchorId` in the content (or the Studio "Section ID" field), else a legacy `id`, else the section type's default in `SECTION_IDS`. A new section type needs (1) a `SECTION_IDS` entry, (2) `SectionAnchor &` on its content type, (3) `anchorIdField("<key>")` as the first field of its Sanity object (validates format + uniqueness on the page), (4) `anchorId` passed through the page's Sanity mapper. If a template renders the same section type twice, give the second an `anchorId`. Anchor jumps clear the fixed header via `scroll-padding-top`.
- **Header (client request 2026-10-14):** the desktop pill is `fixed` (stays at top 32 for the whole scroll) and identical on every page: white logo, white links, drawn 6%-white fill over a navy backing + blur so it reads on white sections too. Don't reintroduce per-page header themes. Anchor offsets: `scroll-padding-top` 88px mobile / 116px desktop (`globals.css`, desktop value = `--spacing-header-offset`). Anything `sticky` on lg+ must use `lg:top-header-offset` (116px), never a smaller top, or it slides under the fixed pill (the Challenges heading column did). Desktop dropdown panels copy the **old live site's mega menu** (client request 2026-10-16: 896px white panel, teal icon tiles, descriptions, dark "Ready to scale?" card; old-site hex colours, data in `headerNav` + `headerMenuPromo` in `content/navigation.ts`), and the pill's navy backing is 82% (slightly see-through, same request). Desktop dropdown panels are force-mounted; keep `keepOpenInsideNav` in `desktop-nav.tsx` or the links stop navigating (closed panels dismiss the menu on pointerdown). **Pill CTAs = `<CtaPill>`** (`components/shared/cta-pill.tsx`; reference look: the navbar "Schedule a Meeting"). `CtaLink`, `ScheduleCta` and `ScheduleMeetingButton` all render it; don't hand-build pills with `Button` + `ctaClassName`. The label colour is set on the label span for every state (`ctaLabelTone`) and pills are `no-underline!`, because containers that restyle descendant links (shadcn AccordionContent `[&_a]:hover:text-foreground`, the services accordion's `[&_a]:hover:text-white`) out-rank the pill's own classes; that once turned the accordion CTA's label white on the white hover pill. **CTA hover swap (client request):** every solid green arrow pill (navbar "Schedule a Meeting", hero, CTA bands, card CTAs) uses `ctaClassName({ swap })` + `<CtaContent swap>` from `components/shared/cta-styles.tsx`: on hover/focus the arrow circle slides to the left edge, the label slides right, and colours invert (#FFFFFF pill + green label + green hairline, green circle + white arrow); hover-out returns to the drawn state. `CtaLink`/`ScheduleCta` enable it automatically for solid + arrow. Arrow-less solid pills (pricing "Get Started") and `mobileSolid` CTAs keep the plain style. **No dark mode:** `globals.css` binds `dark:` to a `.dark` class that is never set (`@custom-variant dark`), so shadcn's `dark:*` classes don't apply for visitors whose OS is in dark mode (they made the CTA hover 50% transparent). Always check hover/colour changes with `colorScheme: "dark"` too.
- **Headings are one string with `*green*` markup (client rule 2026-10-24).** Every H1/H2 (content files and Studio) is a single line of text; wrap the green part in asterisks (`"Why Businesses Choose Xconcile for *Outsourced Accounting*"`), `\*` for a literal asterisk. Render with `<HighlightText text={...} />` (`components/shared/highlight-text.tsx`; `SectionHeading` does it for you) and use `plainTitle()` from `lib/highlight.ts` wherever a heading becomes plain text (aria-labels, Rail labels, previews). No forced `<br>`, nowrap or no-break-space tricks: headings wrap naturally. Sanity type: `headingTitle` (a string with an unmatched-`*` check); the mappers still read the pre-2026-10-24 `{ before, highlight, after }` objects until `scripts/migrate-heading-titles.ts` has been run.
- **Every width from 320px to 1920px must work, with no horizontal overflow.**
  - Mobile grids use `grid-cols-1` (minmax(0,1fr)) so a child's min-content can't widen the track.
  - Full-width pills wrap long labels instead of overflowing; `ctaClassName` already does this.
  - `max-[360px]:` is the only breakpoint below the design widths.
  - Desktop rows that need ≥1280px to fit switch at `xl:` instead of `lg:` (stats 5-up, Why Choose stats, Tools split).

### Animation conventions
- **Effects:** text "coming in" reveal and subtle parallax (client request), plus the **card reveal** (cards stay still; their content rises and fades in as each card reaches the viewport; client request 2026-10-14). Use `motionPresets` in `lib/motion.ts`.
  - Card reveal = `components/motion/reveal-list.tsx` (`<RevealList>`: inside each direct child it animates `[data-reveal]` elements, else the child's own blocks; `<Rail reveal>` for rails). **Used on every card section of every page** (user decision 2026-10-18, "option B": one site-wide feel): Challenges (`reveal` defaults to true), Process, Industries, Tools, ToolTabs (whole block via `FadeUp`), Why Choose features, Blog, CardGrid, EngagementModels, HiringSteps (step text only), ExperienceLevels, AudienceCards, SecurityControls. Not used above the fold (Feature strip) or on accordion rows (Services, Sub-Industries). Rules: one travel distance (preset 40px; don't set `data-reveal-y`), revealed cards get `overflow-hidden` (content appears from inside the card), photos stay still (put `data-reveal` on the text block), and cards share the H2's trigger (`top 85%`).
  - Heading entrance: the H2 is `RevealText`; the eyebrow and subtitle around it use `components/motion/fade-up.tsx` (`<FadeUp>`, `motionPresets.fadeUp`, subtitle `delay={0.12}`). `SectionHeading` does this automatically; custom headings (Services, Security, CTA band, Home contact) wrap their eyebrow/subtitle themselves. Never on the hero (CSS entrance, LCP).
  - Count-up = `components/motion/count-up.tsx` (`<CountUp value="1K+" index={i}>`, client request 2026-10-17): stats bar and Why Choose stats count from 0 on scroll-in (`motionPresets.countUp`). Server HTML keeps the real value; width is locked to the final value; "K"/"M" count through the full number and snap back to the exact label at the end.
  - `<Rail until="md">` keeps the swipe rail on phones only; default `until="lg"`. CardGrid has no rail (user request 2026-10-24): its tiles stack (1 / 2 / 3 columns).
- **Timing (client request 2026-10-16):** every entrance animation runs **0.5s longer** than the original build: `textReveal` 1.3s, `cardReveal` 1.2s, `fadeUp` 1.1s, `gsap.defaults` 1.3s (`lib/gsap.ts`), hero CSS entrance 1.4s (`--animate-hero-rise` / `--animate-hero-lift` in `globals.css`). Staggers and hero delays are unchanged. Parallax is scroll-linked (no duration). Hover and UI transitions (`duration-*` on pills, menus, dialogs, accordion) were not slowed. Keep new entrance animations on this scale.
- **Imports:** never import `@/lib/gsap` (or `gsap`) statically in components. Use `useLazyGsap(ref, ({ gsap, ScrollTrigger, SplitText }, el) => {...})` from `components/motion/use-lazy-gsap.ts`.
  - It dynamic-imports GSAP after hydration, so GSAP stays out of the initial JS.
  - It sets up when the element is within one viewport of the fold.
  - It wraps everything in a scoped `gsap.context` (automatic cleanup) and skips prefers-reduced-motion.
- **Client islands:** keep animated wrappers as small `"use client"` islands. Wrap server-rendered text instead of moving content into client components.
- **Performance:** animate only `transform` and `opacity`.
  - The LCP hero H1 uses the transform-only `animate-hero-lift`. Never start it from `opacity: 0`; that pushed mobile LCP to 7.6s.
  - Honour prefers-reduced-motion (CSS: global rule in `globals.css`; GSAP: `useLazyGsap`).
- **No smooth scrolling.** Don't add scroll-jacking or smooth-scroll libraries; the design doesn't specify them.
- **Navigation scroll:** `<html data-scroll-behavior="smooth">` (app/layout.tsx) is required. `globals.css` makes #anchor jumps smooth; without the attribute Next 16 animates its scroll-to-top on every route change (the new page visibly scrolls up from the old position).

## 6. SEO and performance checklist (definition of done)

**Rendering**
- Every marketing page is a Server Component, statically rendered via `generateStaticParams` and `sanityFetch` (cached and tagged).

**Metadata**
- Use `buildMetadata({ seo, title, description, path })` in `generateMetadata`. It sets a self-referencing canonical.
- Title template is `%s | Xconcile`. `lang="en-US"`.

**Headings**
- One H1 per page, an H2 per section and an H3 per card.
- Eyebrow badges are `<p>`, not headings. Faded step numbers are `aria-hidden`.

**JSON-LD** (`lib/seo.ts`)
- `Service` on service pages.
- `FAQPage` wherever FAQs appear.
- `BreadcrumbList` on inner pages.
- `BlogPosting` with a `Person` author on posts.
- `VideoObject` for testimonials.
- **Local SEO:** fill real NAP and offices in `lib/site-config.ts`. Never ship placeholder phone numbers or addresses.

**Images**
- Use `next/image` with `urlFor()` and explicit width and height. Only the hero image gets `priority`. Alt text is required.

**Video and third-party scripts**
- Video uses a facade (click-to-load). Never autoload the player.
- Load Calendly on demand. Zoho loads `lazyOnload`. GTM is consent-gated.

**Targets** (mobile p75)
- LCP < 2.5s, INP < 200ms, CLS < 0.1, Lighthouse ≥ 90 in every category.

**Initial-JS / CSS budget rules** (from the Home Lighthouse pass)
- Heavy client-only libraries load on demand. Examples: GSAP via `useLazyGsap`, zod via the form's `lazyZodResolver`, Calendly on open.
- Fonts used only below the fold get `preload: false` (Outfit).
- Tailwind scans only `app/`, `components/`, `content/` and `lib/` (`@source` in `globals.css`). Automatic detection also read `.agents/` skill docs and bloated the CSS to 170KB.
- Don't put `priority` on images hidden at some breakpoints (the preload still downloads them there).
- Gotcha: `/studio` needs its own `<Suspense>` + `connection()` marker (in its `page.tsx`) to prerender under Cache Components. Don't remove it: `<SpeedInsights />` used to provide that boundary from the root layout, but it now lives in `<SiteShell />`.
- Never put site chrome, tracking or `globals.css` in `app/layout.tsx`; it also wraps `/studio`. Add them to `components/layout/site-shell.tsx`.

**Accessibility**
- Visible focus states, keyboard support for tabs and accordions (the shadcn/Radix primitives provide it), labelled form fields.

## 7. Installed agent skills (`.agents/skills`, `.claude/skills`)

| Purpose | Skills |
|---|---|
| UI implementation and review | `shadcn`, `ui-ux-pro-max`, `impeccable`, `design-taste-frontend`, `frontend-design`, `web-design-guidelines`, `vercel-react-best-practices`, `vercel-composition-patterns` |
| Animation | `awwwards-animations` (GSAP/useGSAP patterns; use only the subtle reveal and parallax parts) |
| Technical SEO | `seo`, `seo-technical`, `seo-audit`, `seo-sitemap`, `seo-images`, `site-architecture`, `core-web-vitals`, `performance`, `best-practices`, `web-quality-audit`, `accessibility` |
| Schema, local SEO, AI search | `schema`, `seo-schema`, `seo-local`, `seo-geo`, `ai-seo`, `seo-aeo-best-practices`, `programmatic-seo` |
| Content | `copywriting`, `content-strategy` |
| Sanity | `sanity-best-practices`, `content-modeling-best-practices`, `sanity-singletons`, `portable-text-serialization` |

Restore or update the skills with `npx skills experimental_install` (from `skills-lock.json`) or `npx skills update`.

## 8. Open decisions (don't resolve on your own; ask)

From report §9 and spec "Open decisions":
1. **URL strategy.** Keep the live slugs (the current setup in `lib/routes.ts`) or move to the Figma slugs with 301s?
2. **Brand green contrast.** `#6ABE52` on white is 2.3:1. Is a darker text green, or dark text on green buttons, approved?
3. **Missing designs.**
   - About, Contact, Blog, Team, Privacy, index pages.
   - Mobile layouts for inner pages.
4. **Sanity.** Resolved 2026-10-18: page-builder `v2` types in the dedicated `v2_xconcile` dataset; the legacy schema is gone.
5. **Design normalization.**
   - Add the Tools section to vCFO and RCM?
   - Move the Hire 5-Steps section to the position it has on the main page?
   - Add a green highlight word to every hero H1?
   - Show Healthcare's "Show more" button on every Industry page?
