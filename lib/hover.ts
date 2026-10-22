/**
 * Shared hover treatments.
 *
 * Card micro-interactions (client request 2026-10-22) come in three recipes, all colour/shadow
 * only (never layout), 200ms, and only on hover-capable devices (Tailwind's `hover:` is wrapped
 * in `@media (hover: hover)`, so the phone swipe rails never stick in a hovered state):
 *
 *  - `hoverGreen`        light cards: a little green shade (bg → brand-50, hairline → green 20%).
 *                        Put `hoverTile` on an icon chip that rests on brand-50, or it would
 *                        vanish into the shaded card.
 *  - `hoverGreenAccent`  the green shade + a 2px bright-green bottom line (stats bar). The line
 *                        is an inset box-shadow, so nothing shifts.
 *  - `hoverDark`         cards on the dark bands: translucent white, never green. An inset
 *                        box-shadow paints an 8% white veil over the card's own background
 *                        (works on transparent, dark-card and solid-navy cards alike) and the
 *                        border lifts to white 20%.
 *
 * `cardHover` (client request 2026-10-14) is the older navy veil, used by the Tools cards.
 * Industries + Blog cards have no background hover, only a green title (2026-10-22).
 * Challenges deepen within their own tint (see challenges.tsx).
 */
const hoverBase = "transition-[background-color,border-color,box-shadow,color] duration-200";

export const hoverGreen = `group/card ${hoverBase} hover:border-brand-border hover:bg-brand-50`;

export const hoverGreenAccent = `${hoverGreen} hover:shadow-[inset_0_-2px_0_var(--color-brand)]`;

/** Icon chip inside a `hoverGreen` card: brand-50 → brand-100 so it stays visible on the shade. */
export const hoverTile = "transition-colors duration-200 group-hover/card:bg-brand-100";

export const hoverDark = `${hoverBase} hover:border-white/20 hover:shadow-[inset_0_0_0_100vmax_rgb(255_255_255/0.08)]`;

export const cardHover =
  "transition-shadow duration-200 hover:shadow-[inset_0_0_0_100vmax_rgb(19_33_44/0.05)]";
