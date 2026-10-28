"use client";

import { XIcon } from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { preconnect } from "react-dom";

import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

/** Brand colours passed to Calendly (same settings react-calendly used to send). */
const PAGE_SETTINGS = "primary_color=6abe52&text_color=28272a&hide_gdpr_banner=1";

/** Calendly inline-embed URL. `embed_domain` makes Calendly post its events to this page. */
function embedUrl(url: string, host: string) {
  const [base, query] = url.split("?");
  const params = [query, PAGE_SETTINGS, "embed_type=Inline", `embed_domain=${host}`];
  return `${base}?${params.filter(Boolean).join("&")}`;
}

/** Spread on any element that opens the scheduler: starts loading at once if it hasn't yet. */
type WarmProps = { onPointerEnter: () => void; onFocus: () => void; onTouchStart: () => void };
type CalendlyContextValue = { openScheduler: () => void; warmProps: WarmProps };

const CalendlyContext = createContext<CalendlyContextValue | null>(null);

export function useCalendly() {
  const ctx = useContext(CalendlyContext);
  if (!ctx) throw new Error("useCalendly must be used inside <CalendlyProvider>");
  return ctx;
}

/** Seconds after the iframe's `load` event before the spinner gives up waiting for Calendly. */
const READY_FALLBACK_MS = 6000;

/**
 * Calendly popup, preloaded in the background (user request 2026-10-28: "once the page is
 * completely rendered, load Calendly in the background; if the user clicks before it completes,
 * show a loading spinner"). Client rule: scheduling opens in a popup, never a new page.
 *
 * - **Background preload:** after the page's `load` event, once the browser is idle, the Calendly
 *   iframe is created inside this (hidden) popup and loads fully: app, settings, availability.
 *   Skipped when the visitor has Data Saver on (it then loads on hover / click instead).
 * - **Open:** the popup just becomes visible, so a preloaded calendar shows instantly. Clicked
 *   before it is ready: a spinner shows until Calendly reports the calendar is on screen
 *   (`calendly.event_type_viewed` message), or `READY_FALLBACK_MS` after the iframe loaded.
 * - **Kept alive:** closing only hides it, so reopening is instant and keeps the visitor's place.
 *   After a booking (`calendly.event_scheduled`), it reloads in the background on close.
 *
 * Why not the shadcn Dialog: Radix unmounts closed dialog content (and force-mounting a closed
 * modal hides the rest of the page from screen readers), and moving an iframe in the DOM reloads
 * it. So this is a small purpose-built popup: role="dialog" + aria-modal, Escape / backdrop /
 * close button to dismiss, `inert` while closed, scroll lock, focus moved in and restored.
 */
export function CalendlyProvider({ url, children }: { url: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [load, setLoad] = useState(false);
  const [ready, setReady] = useState(false);
  const [frameKey, setFrameKey] = useState(0);
  const booked = useRef(false);
  const returnFocus = useRef<HTMLElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  const startLoading = useCallback(() => setLoad(true), []);

  // Background preload once the page has fully loaded and the browser is idle.
  useEffect(() => {
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
      ?.saveData;
    let idle = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const schedule = () => {
      preconnect("https://calendly.com");
      preconnect("https://assets.calendly.com");
      if (saveData) return;
      if ("requestIdleCallback" in window) {
        idle = window.requestIdleCallback(startLoading, { timeout: 5000 });
      } else {
        timer = setTimeout(startLoading, 2000);
      }
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });
    return () => {
      window.removeEventListener("load", schedule);
      if (idle) window.cancelIdleCallback(idle);
      if (timer) clearTimeout(timer);
    };
  }, [startLoading]);

  // Calendly's postMessage events: calendar on screen / booking made.
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== "https://calendly.com") return;
      const event = (e.data as { event?: string } | null)?.event;
      if (event === "calendly.event_type_viewed") setReady(true);
      if (event === "calendly.event_scheduled") booked.current = true;
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  const openScheduler = useCallback(() => {
    returnFocus.current = document.activeElement as HTMLElement | null;
    setLoad(true);
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    returnFocus.current?.focus?.();
    if (booked.current) {
      // Fresh calendar for the next visitor action (the old one shows the confirmation).
      booked.current = false;
      setReady(false);
      setFrameKey((k) => k + 1);
    }
  }, []);

  // While open: Escape closes, the page behind doesn't scroll, focus moves into the popup.
  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    const root = document.documentElement;
    const overflow = root.style.overflow;
    root.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  const value = useMemo(
    () => ({
      openScheduler,
      warmProps: {
        onPointerEnter: startLoading,
        onFocus: startLoading,
        onTouchStart: startLoading,
      },
    }),
    [openScheduler, startLoading],
  );

  return (
    <CalendlyContext.Provider value={value}>
      {children}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-hidden={!open}
        inert={!open}
        className={cn(
          "fixed inset-0 z-[60] flex items-center justify-center",
          open ? "visible" : "pointer-events-none invisible",
        )}
      >
        <div
          aria-hidden
          onClick={close}
          className={cn(
            "absolute inset-0 bg-black/40 transition-opacity duration-150 supports-backdrop-filter:backdrop-blur-xs",
            open ? "opacity-100" : "opacity-0",
          )}
        />
        <div
          className={cn(
            "relative flex h-[min(90svh,760px)] w-[calc(100%-2rem)] max-w-[1000px] flex-col overflow-hidden rounded-xl bg-white shadow-xl transition-[opacity,scale] duration-150",
            open ? "scale-100 opacity-100" : "scale-95 opacity-0",
          )}
        >
          <h2 id={titleId} className="sr-only">
            Schedule a meeting with Xconcile
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label="Close scheduler"
            className="absolute top-3 right-3 z-10 flex size-9 items-center justify-center rounded-full bg-white/90 text-heading shadow-sm transition-colors hover:text-brand focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none"
          >
            <XIcon className="size-5" aria-hidden />
          </button>
          {/* `load` only turns true in the browser, so `window` is safe here. */}
          {load ? (
            <iframe
              key={frameKey}
              src={embedUrl(url, window.location.host)}
              title="Calendly scheduling page"
              onLoad={() => setTimeout(() => setReady(true), READY_FALLBACK_MS)}
              className="size-full border-0"
            />
          ) : null}
          {!ready ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white text-b2 text-body">
              <Spinner className="size-10 text-brand" />
              <span>Loading calendar…</span>
            </div>
          ) : null}
        </div>
      </div>
    </CalendlyContext.Provider>
  );
}
