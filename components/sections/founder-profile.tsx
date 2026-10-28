import Image from "next/image";

import { FadeUp } from "@/components/motion/fade-up";
import { RevealText } from "@/components/motion/reveal-text";
import { CertificationsPill, LinkedInLink, ProfileBio } from "@/components/shared/profile-parts";
import type { FounderContent } from "@/content/types";
import { cn } from "@/lib/utils";
import { sectionId } from "@/lib/section-ids";

/**
 * About "Founder & CEO" (design pages/ABOUT US, y 2483–3056): #FAFAFA band. Desktop: copy left
 * (name 48/58, role, three paragraphs, certifications pill, hairline under the column), portrait
 * right, bottom-aligned, in front of a green block that starts 198px left of the container's
 * right edge and runs to the viewport edge. No mobile design: copy first, then the portrait on a
 * green block, centred.
 */
export function FounderProfile({ data, className }: { data: FounderContent; className?: string }) {
  const id = sectionId(data, "founder");
  const { person } = data;
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn("overflow-hidden bg-surface-muted", className)}
    >
      <div className="container-site grid gap-8 lg:grid-cols-[minmax(0,640fr)_minmax(0,656fr)] lg:gap-6">
        <div className="flex flex-col gap-8 pt-12 lg:border-b lg:border-hairline lg:pt-[67px] lg:pb-[62px]">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-4">
              <RevealText as="h2" id={`${id}-title`} className="text-h2-m text-heading lg:text-h2">
                {person.name}
              </RevealText>
              <LinkedInLink person={person} />
            </div>
            <p className="text-b1 text-body lg:text-h5 lg:font-medium">{person.role}</p>
          </div>
          <FadeUp className="flex flex-col gap-6">
            <ProfileBio bio={person.bio} />
            <CertificationsPill label={data.certificationsLabel} items={person.certifications} />
          </FadeUp>
        </div>

        {/* Portrait column: the green block is decorative (clipped by the section). */}
        <div className="relative flex h-[340px] items-end justify-center sm:h-[420px] lg:h-auto lg:min-h-[573px] lg:justify-end">
          <div
            aria-hidden
            className="absolute inset-y-0 left-1/2 w-[100vw] bg-brand lg:left-[calc(100%-198px)]"
          />
          <Image
            src={person.image.src}
            alt={person.image.alt}
            width={person.image.width}
            height={person.image.height}
            sizes="(min-width: 1024px) 452px, 300px"
            className="relative h-full max-h-[340px] w-auto object-contain object-bottom sm:max-h-[420px] lg:absolute lg:right-[-6px] lg:bottom-0 lg:h-[518px] lg:max-h-none"
          />
        </div>
      </div>
    </section>
  );
}
