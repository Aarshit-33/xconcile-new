"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { ScrollArea as ScrollAreaPrimitive } from "radix-ui"

function ScrollArea({
  className,
  children,
  viewportClassName,
  vertical = true,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Root> & {
  /** Extra classes for the scrolling viewport (e.g. scroll-snap). */
  viewportClassName?: string
  /** Render the default vertical scrollbar. Disable for horizontal-only rails. */
  vertical?: boolean
}) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={cn("relative", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className={cn(
          "size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1",
          viewportClassName
        )}
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      {vertical ? <ScrollBar /> : null}
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
}

function ScrollBar({
  className,
  thumbClassName,
  orientation = "vertical",
  ref,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar> & {
  thumbClassName?: string
}) {
  const barRef = React.useRef<HTMLDivElement | null>(null)
  const setRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      barRef.current = node
      if (typeof ref === "function") ref(node)
      else if (ref) ref.current = node
    },
    [ref]
  )

  // Radix sizes the thumb in a ResizeObserver callback that can run before the bar has read its
  // own padding (first paint), so the thumb stays unmounted until the bar is resized (e.g. phone
  // rotation). Resizing a horizontal bar by 1px for one frame makes Radix measure again (audit H2:
  // mobile rail progress bars). Retries while there is still no thumb, and again when the bar
  // scrolls into view; skips hidden bars and rails with nothing to scroll.
  React.useEffect(() => {
    const el = barRef.current
    if (orientation !== "horizontal" || !el) return
    const viewport = el
      .closest('[data-slot="scroll-area"]')
      ?.querySelector<HTMLElement>('[data-slot="scroll-area-viewport"]')
    let frame = 0
    let timer = 0
    let tries = 0
    const done = () =>
      !!el.querySelector('[data-slot="scroll-area-thumb"]') ||
      !el.getClientRects().length ||
      (!!viewport && viewport.scrollWidth <= viewport.clientWidth)
    // Set in one frame, undone in the next, so the size change is seen by the ResizeObserver.
    const nudge = () => {
      if (done() || tries++ >= 8) return
      el.style.marginRight = `${parseFloat(getComputedStyle(el).marginRight) + 1}px`
      frame = requestAnimationFrame(() => {
        el.style.marginRight = ""
        timer = window.setTimeout(() => (frame = requestAnimationFrame(nudge)), 300)
      })
    }
    const start = () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(timer)
      el.style.marginRight = ""
      tries = 0
      frame = requestAnimationFrame(nudge)
    }
    start()
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting) && !done()) start()
    })
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(frame)
      window.clearTimeout(timer)
      el.style.marginRight = ""
    }
  }, [orientation])

  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      ref={setRef}
      data-slot="scroll-area-scrollbar"
      data-orientation={orientation}
      orientation={orientation}
      className={cn(
        "flex touch-none p-px transition-colors select-none data-horizontal:h-2.5 data-horizontal:flex-col data-horizontal:border-t data-horizontal:border-t-transparent data-vertical:h-full data-vertical:w-2.5 data-vertical:border-l data-vertical:border-l-transparent",
        className
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot="scroll-area-thumb"
        className={cn("relative flex-1 rounded-full bg-border", thumbClassName)}
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  )
}

export { ScrollArea, ScrollBar }
