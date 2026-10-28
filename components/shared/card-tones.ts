import type { ChallengeTone } from "@/content/types";

/**
 * Tinted card colours, shared by the Home "Key Challenges" cards (challenges.tsx) and the service
 * accordion's grouped-list cards (services-accordion-list.tsx), so both always match.
 *
 * `hover` (client request 2026-10-16): each card deepens within its OWN tint instead of the shared
 * `cardHover` veil. The shade is the tone's tile/line colour at 50%, so it sits between the resting
 * card background and the icon tile (the tile stays visible).
 * `groupBg` (services group cards, user request 2026-10-26: "a little more coloured"): halfway
 * between the card tint and its line colour, mixed from the same tokens.
 * Literal class names so Tailwind generates them.
 */
export const cardTones: Record<
  ChallengeTone,
  { card: string; hover: string; tile: string; icon: string; groupBg: string }
> = {
  rose: {
    card: "bg-tint-rose border-tint-rose-line",
    hover: "hover:bg-tint-rose-line/50",
    tile: "bg-tint-rose-line",
    icon: "text-tint-rose-ink",
    groupBg: "bg-[color-mix(in_srgb,var(--color-tint-rose-line)_50%,var(--color-tint-rose))]",
  },
  amber: {
    card: "bg-tint-amber border-tint-amber-line",
    hover: "hover:bg-tint-amber-line/50",
    tile: "bg-tint-amber-line",
    icon: "text-tint-amber-ink",
    groupBg: "bg-[color-mix(in_srgb,var(--color-tint-amber-line)_50%,var(--color-tint-amber))]",
  },
  blue: {
    card: "bg-tint-blue border-tint-blue-line",
    hover: "hover:bg-tint-blue-line/50",
    tile: "bg-tint-blue-line",
    icon: "text-tint-blue-ink",
    groupBg: "bg-[color-mix(in_srgb,var(--color-tint-blue-line)_50%,var(--color-tint-blue))]",
  },
  purple: {
    card: "bg-tint-purple border-tint-purple-line",
    hover: "hover:bg-tint-purple-line/50",
    tile: "bg-tint-purple-line",
    icon: "text-tint-purple-ink",
    groupBg: "bg-[color-mix(in_srgb,var(--color-tint-purple-line)_50%,var(--color-tint-purple))]",
  },
  green: {
    card: "bg-tint-green border-hairline",
    hover: "hover:bg-brand-tile/50",
    tile: "bg-brand-tile",
    icon: "text-brand",
    groupBg: "bg-[color-mix(in_srgb,var(--color-brand-tile)_50%,var(--color-tint-green))]",
  },
  white: {
    card: "bg-white border-hairline",
    hover: "hover:bg-brand-50/50",
    tile: "bg-brand-50",
    icon: "text-brand",
    groupBg: "bg-white",
  },
};

/** Home "Key Challenges" colour order; cards without a colour of their own cycle through it. */
export const defaultToneCycle: ChallengeTone[] = ["rose", "amber", "blue", "purple", "green"];
