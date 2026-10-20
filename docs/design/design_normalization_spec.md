# Design Normalization Spec: match each page to its group's main page

**Rules (from the client)**
1. The **last number in the folder name is the page group**.
2. In each group, the **(main)** page is the reference for design and colors.
3. If a page has a section the main page doesn't have, build it **exactly as drawn in that page's `page.svg`**.

| # | Group | Reference (main) | Pages that follow it |
|---|---|---|---|
| (1) | Services | `audit-outsourcing-services` | bookkeeping, payroll, tax-preparation, multi-state-sales-tax, virtual-cfo, RCM |
| (2) | Hire | `hire-dedicated-accounting-professionals` | hire-audit-assurance, hire-payroll, hire-tax-preparation, hire-virtual-cfo |
| (3) | Industries | `real-estate-accounting-services` | ecommerce, healthcare, hospitality, it-technology, professional-services |

**How I checked:** I rendered every `page.svg` with headless Chrome. I did not use `image.png`, because the Hire main PNG is a copy of the audit page. Each page was compared section by section against its main page, and the color palettes in `page.css` were diffed. Only design was compared, not copy.

> [!IMPORTANT]
> **No page has an additional section.** Every section on every page maps to a section on its main page, so the "keep as drawn" rule doesn't apply to any full section today. The only extra element is Healthcare's "Show more services (3)" button, which stays as drawn.

````carousel
![Services: main (left) vs payroll (right). Services accordion, Blog/FAQ backgrounds and CTA band differ](/usr/local/google/home/arshitj/.gemini/jetski/brain/49262cc8-8fc3-4076-aa7b-6e9748b7850b/scratch/cmp/svc.jpg)
<!-- slide -->
![Hire: main (left) vs hire-payroll (right). Expertise grid, featured cards and CTA band differ](/usr/local/google/home/arshitj/.gemini/jetski/brain/49262cc8-8fc3-4076-aa7b-6e9748b7850b/scratch/cmp/hire.jpg)
<!-- slide -->
![Industries: main (left) vs IT (right). Services grid, Sub-Industries, Why Choose and CTA band differ](/usr/local/google/home/arshitj/.gemini/jetski/brain/49262cc8-8fc3-4076-aa7b-6e9748b7850b/scratch/cmp/ind.jpg)
````

---

## Shared tokens taken from the main pages

| Token | Value | Used for |
|---|---|---|
| `dark-gradient` | `linear-gradient(270deg,#13212C,#173345)` | Hero, dark Services/Expertise, Why Choose, Video |
| `dark-card` | `rgba(255,255,255,.04)`, radius 8 | Cards on dark sections |
| `dark-pill` | bg `rgba(255,255,255,.04)`, border `rgba(255,255,255,.1)`, white text | Eyebrow badge on dark sections |
| `dark-icon-tile` | `rgba(106,190,82,.16)` | Icon tiles on dark cards |
| `featured-card` | `#13212C`, white text, green "Most Popular" pill | Hire middle cards |
| `cta-overlay` | `linear-gradient(rgba(19,33,44,.9),rgba(19,33,44,.9))` over a photo | **Final CTA band (all groups)** |
| ~~`teal #165A6A`~~ | **drop** | Used only by the non-main CTA bands |
| `link` | brand link style (not `#2C00A1`) | Inline links. Dark blue on navy is unreadable |

> [!NOTE]
> The CTA band is the **one change that applies to all 15 non-main pages**: replace the flat teal `#165A6A` band with the photo + navy overlay band. Every main page uses the overlay and no main page uses teal.

---

## (1) Services: reference `audit-outsourcing-services`

**Main page section order:**
1. Hero (dark)
2. Stats bar (grey)
3. Intro (white)
4. Key Challenges, tinted cards (grey)
5. **Services accordion (dark)**
6. Case-study tabs (white)
7. Process (grey)
8. Industries 4×2 (white)
9. Why Choose (dark)
10. Tools (grey)
11. Video testimonials (dark)
12. **Blog (white)**
13. **FAQ (grey)**
14. ~117px gap
15. **CTA with photo overlay**
16. Footer

### Changes on all 6 pages
| Section | Now | Change to (match main) |
|---|---|---|
| 5 Services accordion | White background, light pill, dark text, light "+" circles | `dark-gradient` background with padding 80/71, `dark-pill`, white H2 with the **first word green**, white titles, muted subtitles, dark dividers, dark "+" buttons |
| 12 Blog | `#F5F7F8` background | White |
| 13 FAQ | White background | Grey `#FAFAFA` (Blog and FAQ backgrounds are currently swapped) |
| 14 → 15 FAQ to CTA spacing | Between 0 and ~750px (see below) | Main spacing: FAQ padding, then ~117px, then the CTA |
| 15 CTA | Teal `#165A6A` | `cta-overlay` with photo |
| 4 Challenge card 4 icon | Eye-slash `#9333EA` | Main's eye icon in `#9747FF` |

### Per page
| Page | Missing main sections | Glitches to fix |
|---|---|---|
| outsourced-accounting-bookkeeping | none | `#2C00A1` links (one is unreadable on the dark Why Choose). Why Choose item is 7px off. FAQ touches the CTA (0px gap) |
| outsourced-payroll-services | none | ~320px blank gap before the CTA |
| outsourced-tax-preparation | none | ~190px gap. CTA and footer are ~16px narrow and shifted left. Nav has an extra "Resources" item (content, leave it) |
| multi-state-sales-tax-compliance | none | ~340px gap. CTA and footer are 1px off |
| outsourced-virtual-cfo-services | **Tools** | ~750px gap. ~120px of white below the footer |
| RCM | **Tools** | ~750px gap, ~120px of white below the footer. Accordion row 06 is 9px off, has no divider and collides with the next section |

---

## (2) Hire: reference `hire-dedicated-accounting-professionals`

**Main page section order:**
1. Hero (dark)
2. Feature strip
3. Intro
4. Key Benefits (grey)
5. **Expertise grid (dark)**
6. Hiring Models, **dark middle card**
7. **5-Step process**
8. Experience Levels, **dark middle card**
9. Businesses We Work With
10. Why Hire (dark)
11. Security
12. Tools
13. FAQ
14. **CTA with photo overlay**
15. Footer

### Changes on all 4 pages
| Section | Now | Change to (match main) |
|---|---|---|
| 5 Expertise grid | White section, white bordered cards, light icon tiles, dark text | `dark-gradient`, `dark-card` (main height ~258, title at the bottom), `dark-icon-tile`, white titles, `dark-pill`, white H2, subtitle `rgba(255,255,255,.8)`. If descriptions are kept, they need light text |
| 6 Hiring Models middle card | White | `featured-card` (`#13212C`, white text, green "Most Popular" pill, green filled button). All 3 cards equal height and aligned at the top |
| 8 Experience Levels middle card | White, with a green "MID LEVEL" pill | `featured-card` with the "Most Popular" pill style |
| 7 Steps photo chip | Blue placeholder circle | US-flag chip, as on main |
| 14 CTA | Teal `#165A6A` | `cta-overlay` with photo |
| FAQ to CTA spacing | 640–880px blank | Main spacing. **Don't copy** main's glitch where the CTA overlaps FAQ items 5–7 |
| Section order | 5-Steps sits after Why Choose | Move it to sit after Hiring Models, as on main (**confirm**) |

### Per page
| Page | Missing | Glitches to fix |
|---|---|---|
| hire-audit-assurance-staff | none | Expertise has 5 cards (3+2), so plan the dark grid for that. Middle Hiring card is taller than the others. Why Choose right column is 7px low. ~880px gap |
| hire-payroll-staff | none | Business cards are staggered (need top alignment). Experience cards have unequal heights. ~650px gap |
| hire-tax-preparation-staff | none | Hiring cards are misaligned and the Project-Based card has an empty gap. 3rd Business card is 8px low. ~640px gap |
| hire-virtual-cfo | none | Middle Hiring card is taller and sits higher. Why Choose is 7px off. Experience cards have unequal heights. ~670px gap |

---

## (3) Industries: reference `real-estate-accounting-services`

**Main page section order:**
1. Hero (dark)
2. Feature strip
3. Intro (1-column checklist)
4. Key Challenges (grey)
5. **Services (dark, 3×2, icon + title only)**
6. **Sub-Industries (white, full-width list)**
7. Why Choose (dark)
8. Security, **with an ISO 27001 badge**
9. FAQ
10. **CTA with photo overlay**
11. Footer

### Changes per page
| Section | ecommerce | healthcare | hospitality | it-technology | prof-services |
|---|:-:|:-:|:-:|:-:|:-:|
| 5 Services: white 4-col cards → dark 3×2, title only | fix | fix | ✓ matches | fix | fix |
| 6 Sub-Industries: grey and inset → white, full width (x 45–855 at 900px) | fix | fix | fix | fix | fix |
| 8 Security: add a divider + "ISO 27001 Certified" badge next to the shield | fix | fix | fix | fix | fix |
| 10 CTA: teal → photo overlay | fix | fix | fix | fix | fix |
| 3 Intro checklist: 2 columns → 1 column | n/a | fix | n/a | n/a | n/a |
| 7 Why Choose: light with boxed cards → dark, no boxes, translucent stats bar | n/a | n/a | n/a | fix | n/a |

### Per page
| Page | Additional (keep as drawn) | Glitches to fix |
|---|---|---|
| ecommerce | none | CTA and footer shifted 6px right |
| healthcare | **"Show more services (3)" button** under Sub-Industries | none (only 3 challenge cards, which is content) |
| hospitality | none | none (hero wraps to 3 lines, which is OK) |
| it-technology | none | Intro photo doesn't fill its frame (~30px grey band) |
| professional-services | none | Feature card title wraps, so the cards are taller. Feature-to-intro gap is ~15px. FAQ is 8px right. **CTA and footer are 27px right and clipped**. Canvas is too tall |

All Industry pages, including main, have a ~700px blank band above the CTA. Treat it as a placeholder and use normal section spacing.

---

## Open decisions
1. **Missing Tools section** on vCFO and RCM: add main's Tools section, or leave it out as drawn?
2. **Hire section order:** move 5-Steps to main's position?
3. **Green highlight word in the hero H1:** only the main pages have one. Apply it to every page?
4. **Healthcare "Show more" button:** keep it as drawn (the rule says yes), or apply it to every Industry page?
