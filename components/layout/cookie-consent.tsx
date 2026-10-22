"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { routes } from "@/lib/routes";

export const CONSENT_KEY = "xc-consent";
type Consent = "granted" | "denied";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function updateConsent(value: Consent) {
  window.gtag?.("consent", "update", {
    ad_storage: value,
    ad_user_data: value,
    ad_personalization: value,
    analytics_storage: value,
  });
  window.dataLayer?.push({ event: "consent_update", consent: value });
}

/**
 * Cookie consent banner (client rule "add cookies"). Not drawn in the design; built from
 * shadcn Card + Button with brand tokens. Drives Google Consent Mode v2: the default
 * (set in app/layout.tsx, before GTM loads from SiteShell) is "denied" unless a stored choice exists.
 */
export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(CONSENT_KEY) as Consent | null;
      // eslint-disable-next-line react-hooks/set-state-in-effect -- reading browser-only storage after mount
      if (!stored) setShow(true);
    } catch {
      setShow(true);
    }
  }, []);

  const choose = (value: Consent) => {
    try {
      window.localStorage.setItem(CONSENT_KEY, value);
    } catch {
      /* storage unavailable: choice applies to this page view only */
    }
    updateConsent(value);
    setShow(false);
  };

  if (!show) return null;

  return (
    <Card
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-4 bottom-4 z-50 gap-4 rounded-md bg-white p-5 shadow-xl ring-hairline sm:right-auto sm:max-w-md"
    >
      <p className="text-b2 text-body">
        We use cookies to analyse traffic and improve your experience. You can accept or decline
        non-essential cookies. See our{" "}
        <Link href={routes.privacy()} className="link-inline">
          privacy policy
        </Link>
        .
      </p>
      <div className="flex gap-3">
        <Button
          type="button"
          onClick={() => choose("granted")}
          className="h-10 flex-1 rounded-pill bg-brand px-5 text-b2 font-medium text-white hover:bg-brand/90"
        >
          Accept all
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => choose("denied")}
          className="h-10 flex-1 rounded-pill border-brand bg-transparent px-5 text-b2 font-medium text-brand hover:bg-brand-50"
        >
          Decline
        </Button>
      </div>
    </Card>
  );
}
