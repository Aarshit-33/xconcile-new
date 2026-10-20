/**
 * Shared hover treatments (client requests 2026-10-14).
 *
 * `cardHover`: cards get slightly darker on hover. An inset box-shadow paints a 5% navy veil
 * over the card's own background (whatever its tint) but under its content, follows the border
 * radius, and doesn't change layout. Tailwind's `hover:` only applies on hover-capable devices,
 * so touch rails are unaffected.
 */
export const cardHover =
  "transition-shadow duration-200 hover:shadow-[inset_0_0_0_100vmax_rgb(19_33_44/0.05)]";
