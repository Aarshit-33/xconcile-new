import Image from "next/image";

import { RevealList } from "@/components/motion/reveal-list";
import { SectionHeading } from "@/components/shared/section-heading";
import { CertificationsPill, LinkedInLink, ProfileBio } from "@/components/shared/profile-parts";
import type { TeamContent } from "@/content/types";
import { cn } from "@/lib/utils";
import { plainTitle } from "@/lib/highlight";
import { sectionId } from "@/lib/section-ids";

/**
 * About "Meet Our Team" (design pages/ABOUT US, y 3100–3700): centred H2 over two-up cards.
 * Each card: a #F3F8F2 photo panel (636×412) with a green circle cut by the top-right corner,
 * the cut-out portrait bottom-right (≈91% of the panel height), name 40/48 + role and LinkedIn
 * icon bottom-left; then the bio paragraphs and the certifications pill. Cards stack on phones
 * and tablets (no mobile design); two columns from lg. Cards rise in (RevealList).
 */
export function TeamMembers({ data, className }: { data: TeamContent; className?: string }) {
  const id = sectionId(data, "team");
  const titleId = `${id}-title`;
  return (
    <section id={id} aria-labelledby={titleId} className={cn("section-y", className)}>
      <div className="container-site flex flex-col gap-8 lg:gap-12">
        <SectionHeading title={data.title} titleId={titleId} />
        <RevealList aria-label={plainTitle(data.title)} className="grid gap-12 lg:grid-cols-2 lg:gap-6">
          {data.members.map((m) => (
            <li key={m.name} className="flex flex-col gap-8">
              <div className="relative flex h-[340px] items-end overflow-hidden bg-brand-50 sm:h-[412px]">
                {/* Decorative green circle: r 332, centre 196px right of the panel's top-right corner. */}
                <span
                  aria-hidden
                  className="absolute top-[-332px] left-[calc(100%-136px)] size-[664px] rounded-full bg-brand"
                />
                <Image
                  src={m.image.src}
                  alt={m.image.alt}
                  width={m.image.width}
                  height={m.image.height}
                  sizes="(min-width: 1024px) 300px, 60vw"
                  // Phones: at most half the panel, so the name column beside it stays clear.
                  className="absolute right-0 bottom-0 h-[91%] w-auto max-w-[50%] object-contain object-right-bottom sm:max-w-[62%]"
                />
                <div className="relative z-10 flex max-w-[50%] flex-col gap-1 p-4 sm:max-w-[55%] sm:px-7 sm:pb-7">
                  <h3 className="text-h4-m text-heading sm:text-h3 lg:text-[40px] lg:leading-[48px] lg:font-bold">
                    {m.name}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                    <p className="text-b1 text-body">{m.role}</p>
                    <LinkedInLink person={m} />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-6">
                <ProfileBio bio={m.bio} />
                <CertificationsPill label={data.certificationsLabel} items={m.certifications} />
              </div>
            </li>
          ))}
        </RevealList>
      </div>
    </section>
  );
}
