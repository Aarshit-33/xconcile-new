import { cva, type VariantProps } from "class-variance-authority";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/**
 * Section eyebrow pill (Figma "About xconcile" badge component).
 * Rendered as <p>: eyebrows are never headings (SEO checklist).
 */
const eyebrowVariants = cva(
  "h-9 rounded-pill border px-6 py-2.5 text-eyebrow font-medium whitespace-nowrap",
  {
    variants: {
      tone: {
        /** Light sections: #F3F8F2 + green text */
        light: "border-brand-border bg-brand-50 text-brand",
        /** Dark sections (services, why choose) */
        dark: "border-dark-border bg-dark-card text-white",
        /** Hero badge */
        hero: "border-brand-faint bg-dark-card text-[#eeeeee]",
        /** Video testimonials badge */
        glass: "border-white/20 bg-brand-50/10 text-white",
        /** Security sections ("Security & Data Protection"): rose tint */
        rose: "border-tint-rose-line bg-tint-rose text-tint-rose-ink",
      },
    },
    defaultVariants: { tone: "light" },
  },
);

export type EyebrowTone = NonNullable<VariantProps<typeof eyebrowVariants>["tone"]>;

export function Eyebrow({
  tone,
  className,
  children,
}: VariantProps<typeof eyebrowVariants> & { className?: string; children: React.ReactNode }) {
  return (
    <Badge asChild variant="outline" className={cn(eyebrowVariants({ tone }), className)}>
      <p>{children}</p>
    </Badge>
  );
}
