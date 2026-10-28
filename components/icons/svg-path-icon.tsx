import type { IconProps } from "./material-symbols";

/**
 * One Material Symbols glyph from its path data (viewBox "0 -960 960 960", 24px default).
 * No icon data of its own, so client components can use it with a path passed from the server.
 */
export function SvgPathIcon({
  d,
  title,
  width = 24,
  height = 24,
  ...props
}: IconProps & { d: string }) {
  return (
    <svg
      viewBox="0 -960 960 960"
      width={width}
      height={height}
      fill="currentColor"
      focusable="false"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <path d={d} />
    </svg>
  );
}
