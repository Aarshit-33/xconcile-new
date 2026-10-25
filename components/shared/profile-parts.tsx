import Image from "next/image";

import type { PersonProfile } from "@/content/types";
import { cn } from "@/lib/utils";

/**
 * About page profile parts shared by the Founder and Team blocks (design pages/ABOUT US).
 */

/**
 * Row layout per container width. Static class strings (Tailwind only generates classes it can
 * read in the source); the pill picks the smallest threshold its one-line width fits under.
 */
const ROW_FROM = [
  {
    min: 440,
    box: "@min-[440px]:flex-row @min-[440px]:items-center @min-[440px]:gap-x-6 @min-[440px]:rounded-[19px] @min-[440px]:py-1.5",
    list: "@min-[440px]:flex-row @min-[440px]:items-center @min-[440px]:gap-x-6",
  },
  {
    min: 520,
    box: "@min-[520px]:flex-row @min-[520px]:items-center @min-[520px]:gap-x-6 @min-[520px]:rounded-[19px] @min-[520px]:py-1.5",
    list: "@min-[520px]:flex-row @min-[520px]:items-center @min-[520px]:gap-x-6",
  },
  {
    min: 600,
    box: "@min-[600px]:flex-row @min-[600px]:items-center @min-[600px]:gap-x-6 @min-[600px]:rounded-[19px] @min-[600px]:py-1.5",
    list: "@min-[600px]:flex-row @min-[600px]:items-center @min-[600px]:gap-x-6",
  },
  {
    min: 680,
    box: "@min-[680px]:flex-row @min-[680px]:items-center @min-[680px]:gap-x-6 @min-[680px]:rounded-[19px] @min-[680px]:py-1.5",
    list: "@min-[680px]:flex-row @min-[680px]:items-center @min-[680px]:gap-x-6",
  },
];

/**
 * "Certifications • A • B": grey label, green dot + green text per certification.
 * - Fits on one line (design, e.g. 1440 and 768): the drawn pill, 38px tall, fully round.
 * - Doesn't fit (founder column at 1024–1279px, every pill on phones; user report 2026-10-25:
 *   the wrapped 37px-radius pill stretched edge to edge and looked squashed): a compact card,
 *   label on top and one certification per line, 16px corners, as wide as its longest line.
 * The switch is a container query on the pill's column; the threshold comes from a width
 * estimate of the text (Manrope 14px label / 16px items), so Studio edits keep working.
 */
export function CertificationsPill({
  label,
  items,
  className,
}: {
  label: string;
  items: string[];
  className?: string;
}) {
  if (!items.length) return null;
  // px-4 sides + label + per item (dot + gap + text) + 24px gaps; ~6.8px/char at 14px, 7.6 at 16px.
  const oneLine = 32 + label.length * 6.8 + items.reduce((w, c) => w + 24 + 12 + c.length * 7.6, 0);
  const row = ROW_FROM.find((r) => oneLine <= r.min - 16);

  return (
    <div className="@container w-full">
      <div
        className={cn(
          "flex w-fit max-w-full flex-col items-start gap-y-2 rounded-2xl border border-hairline bg-white px-4 py-3 text-b2",
          row?.box,
          className,
        )}
      >
        <span className="text-body">{label}</span>
        <ul className={cn("flex flex-col gap-y-1.5", row?.list)} aria-label={label}>
          {items.map((c) => (
            <li key={c} className="flex items-baseline gap-2 text-b1 text-brand">
              <span aria-hidden className="size-1 shrink-0 translate-y-[-3px] rounded-full bg-brand" />
              {c}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Bio paragraphs (16/24 body copy, 16px apart). */
export function ProfileBio({ bio, className }: { bio: string[]; className?: string }) {
  return (
    <div className={cn("flex flex-col gap-4 text-b1 text-body", className)}>
      {bio.map((p) => (
        <p key={p}>{p}</p>
      ))}
    </div>
  );
}

/** LinkedIn logo linking to the profile; nothing when no URL is set (no dead icon). */
export function LinkedInLink({ person, className }: { person: PersonProfile; className?: string }) {
  if (!person.linkedin) return null;
  return (
    <a
      href={person.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${person.name} on LinkedIn`}
      className={cn(
        "relative inline-flex shrink-0 rounded-[3px] outline-none before:absolute before:-inset-2 focus-visible:ring-3 focus-visible:ring-brand",
        className,
      )}
    >
      <Image src="/images/about/linkedin.png" alt="" width={26} height={26} className="size-[26px]" />
    </a>
  );
}
