import { RevealList } from "@/components/motion/reveal-list";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

/** Breakpoint-specific classes, written out in full so Tailwind sees them. */
const UNTIL = {
  lg: {
    list: "lg:w-auto lg:pr-0 lg:pb-0",
    root: "lg:mr-0",
    viewport: "lg:snap-none",
    bar: "lg:hidden",
  },
  md: {
    list: "md:w-auto md:pr-0 md:pb-0",
    root: "md:mr-0",
    viewport: "md:snap-none",
    bar: "md:hidden",
  },
} as const;

/**
 * Mobile card rail (challenges, process, industries, tools): horizontal scroll-snap list that
 * bleeds to the right screen edge, with the design's green progress bar (a styled scrollbar,
 * 8px #E7F6E2 track). From `until` (default `lg`) the parent switches the list to its own
 * layout via `listClassName` and the bar is hidden. `until="md"` keeps the rail on phones
 * only (CardGrid: 3-column grid from tablet).
 */
export function Rail({
  children,
  label,
  className,
  listClassName,
  as: List = "ul",
  reveal = false,
  until = "lg",
}: {
  children: React.ReactNode;
  label: string;
  className?: string;
  listClassName?: string;
  as?: "ul" | "ol" | "div";
  /** Cards rise into place as they reach the viewport (GSAP, see RevealList). */
  reveal?: boolean;
  until?: keyof typeof UNTIL;
}) {
  const bp = UNTIL[until];
  const listCls = cn("flex w-max gap-4 pr-4 pb-8 md:pr-8", bp.list, listClassName);
  return (
    <ScrollArea
      type="always"
      vertical={false}
      aria-label={label}
      className={cn("min-w-0 -mr-4 md:-mr-8", bp.root, className)}
      viewportClassName={cn("snap-x snap-mandatory", bp.viewport)}
    >
      {reveal ? (
        <RevealList as={List} className={listCls}>
          {children}
        </RevealList>
      ) : (
        <List className={listCls}>{children}</List>
      )}
      <ScrollBar
        orientation="horizontal"
        className={cn("mr-4 h-2 rounded-full border-0 bg-brand-100 p-0 md:mr-8", bp.bar)}
        thumbClassName="bg-brand"
      />
    </ScrollArea>
  );
}
