import { CheckCircleIcon, CheckIcon } from "@/components/icons/material-symbols";
import { cn } from "@/lib/utils";

/**
 * Check list item.
 *  - "circle": outlined check_circle (hero 16px, contact 24px)
 *  - "chip":   check inside a #E7F6E2 disc (intro pills)
 */
export function CheckItem({
  children,
  variant = "circle",
  iconClassName,
  className,
}: {
  children: React.ReactNode;
  variant?: "circle" | "chip";
  iconClassName?: string;
  className?: string;
}) {
  return (
    <li className={cn("flex items-center gap-2", className)}>
      {variant === "circle" ? (
        <CheckCircleIcon className={cn("size-4 shrink-0 text-brand", iconClassName)} />
      ) : (
        <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-100">
          <CheckIcon className={cn("size-4 text-brand", iconClassName)} />
        </span>
      )}
      <span>{children}</span>
    </li>
  );
}
