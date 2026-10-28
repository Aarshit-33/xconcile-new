"use client";

import { useState, useTransition } from "react";

import { subscribeNewsletter } from "@/app/actions/subscribe-newsletter";
import { cn } from "@/lib/utils";

type Copy = {
  placeholder: string;
  button: string;
  success: string;
  already: string;
  error: string;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Email field + Subscribe pill (design: white field with the white pill button beside it;
 * stacked full width on phones). Submits to the `subscribeNewsletter` Server Action; the result
 * message appears under the row and is announced to screen readers.
 */
export function NewsletterForm({ copy }: { copy: Copy }) {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [message, setMessage] = useState<{ tone: "ok" | "error"; text: string } | null>(null);
  const [pending, startTransition] = useTransition();
  const invalid = "Please enter a valid email address.";

  return (
    <form
      noValidate
      className="relative flex w-full max-w-[447px] flex-col items-center gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        setMessage(null);
        if (!EMAIL.test(email.trim())) {
          setMessage({ tone: "error", text: invalid });
          return;
        }
        startTransition(async () => {
          const result = await subscribeNewsletter({ email, website });
          if (result.ok) {
            setMessage({
              tone: "ok",
              text: result.status === "already" ? copy.already : copy.success,
            });
            setEmail("");
          } else {
            setMessage({ tone: "error", text: result.reason === "invalid" ? invalid : copy.error });
          }
        });
      }}
    >
      <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:gap-6 lg:gap-11">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          name="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          placeholder={copy.placeholder}
          disabled={pending}
          aria-invalid={message?.tone === "error" || undefined}
          aria-describedby="newsletter-status"
          className="h-12 w-full min-w-0 shrink-0 rounded-md border border-white bg-white px-4 text-b1 text-heading placeholder:text-body focus:ring-3 focus:ring-brand/60 focus:outline-none disabled:opacity-70 sm:flex-1"
        />
        {/* Honeypot: hidden from people and assistive tech; bots fill it in. */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          value={website}
          onChange={(e) => setWebsite(e.currentTarget.value)}
          className="pointer-events-none absolute h-0 w-0 opacity-0"
        />
        <button
          type="submit"
          disabled={pending}
          className="h-12 shrink-0 rounded-pill bg-white px-4 text-b1 font-medium text-heading transition-colors hover:bg-brand hover:text-white focus-visible:ring-3 focus-visible:ring-white/60 focus-visible:outline-none disabled:opacity-70"
        >
          {pending ? `${copy.button}…` : copy.button}
        </button>
      </div>
      <p
        id="newsletter-status"
        role="status"
        aria-live="polite"
        className={cn(
          "min-h-5 text-b2",
          message?.tone === "error" ? "text-[#ffb4b4]" : "text-[#a6e08f]",
        )}
      >
        {message?.text ?? ""}
      </p>
    </form>
  );
}
