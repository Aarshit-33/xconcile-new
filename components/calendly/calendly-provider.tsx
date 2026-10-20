"use client";

import dynamic from "next/dynamic";
import { createContext, useCallback, useContext, useMemo, useState } from "react";

import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";

// Calendly's widget script/iframe is only loaded when the popup opens (keeps it off the
// critical path). Client rule: "Schedule a Meeting" opens Calendly in a popup, not a URL.
const InlineWidget = dynamic(() => import("react-calendly").then((m) => m.InlineWidget), {
  ssr: false,
  loading: () => <Skeleton className="size-full rounded-none" />,
});

type CalendlyContextValue = { openScheduler: () => void };

const CalendlyContext = createContext<CalendlyContextValue | null>(null);

export function useCalendly() {
  const ctx = useContext(CalendlyContext);
  if (!ctx) throw new Error("useCalendly must be used inside <CalendlyProvider>");
  return ctx;
}

export function CalendlyProvider({ url, children }: { url: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const openScheduler = useCallback(() => setOpen(true), []);
  const value = useMemo(() => ({ openScheduler }), [openScheduler]);

  return (
    <CalendlyContext.Provider value={value}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex h-[min(90svh,760px)] w-[calc(100%-2rem)] max-w-[1000px] flex-col gap-0 overflow-hidden rounded-xl bg-white p-0 sm:max-w-[1000px]">
          <DialogTitle className="sr-only">Schedule a meeting with Xconcile</DialogTitle>
          <DialogDescription className="sr-only">
            Pick a date and time for a free consultation call.
          </DialogDescription>
          {open ? (
            <InlineWidget
              url={url}
              styles={{ height: "100%", width: "100%" }}
              pageSettings={{ primaryColor: "6abe52", textColor: "28272a", hideGdprBanner: true }}
            />
          ) : null}
        </DialogContent>
      </Dialog>
    </CalendlyContext.Provider>
  );
}
