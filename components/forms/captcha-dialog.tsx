"use client";

import { RefreshCwIcon } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import { getCaptcha } from "@/app/actions/captcha";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

export type CaptchaSolution = { answer: string; token: string };

/**
 * Math CAPTCHA popup (client request 2026-10-28: "can we do the captcha in a popup"). Opens when
 * the contact form is valid and Send is pressed. Shows the server-drawn sum image
 * (lib/captcha.ts, svg-captcha), a refresh button and the answer box.
 *
 * `onSubmit` sends the form with the answer and resolves to a CAPTCHA error message (wrong or
 * expired: a new image is loaded and the popup stays open) or `null` (the parent closes it).
 */
export function CaptchaDialog({
  open,
  onOpenChange,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (solution: CaptchaSolution) => Promise<string | null>;
}) {
  const [challenge, setChallenge] = useState<{ svg: string; token: string } | null>(null);
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);
  const [sending, setSending] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const errorId = useId();

  const refresh = useCallback(async () => {
    setChallenge(null);
    setAnswer("");
    try {
      setChallenge(await getCaptcha());
      setLoadFailed(false);
      inputRef.current?.focus();
    } catch {
      setLoadFailed(true);
    }
  }, []);

  // A fresh image every time the popup opens.
  useEffect(() => {
    if (!open) return;
    // Async fetch from the server; state is set when it resolves.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setError(null);
    void refresh();
  }, [open, refresh]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!challenge) return;
    const value = answer.trim();
    if (!/^\d{1,3}$/.test(value)) {
      setError("Please enter the answer as a number.");
      inputRef.current?.focus();
      return;
    }
    setSending(true);
    setError(null);
    const message = await onSubmit({ answer: value, token: challenge.token });
    setSending(false);
    if (message) {
      setError(message);
      await refresh();
    }
  };

  return (
    <Dialog open={open} onOpenChange={(next) => !sending && onOpenChange(next)}>
      <DialogContent className="gap-5 rounded-3xl bg-white p-6 sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-[#171717]">One last step</DialogTitle>
          <DialogDescription className="text-sm text-[#737373]">
            Add the two numbers in the image to send your message.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={submit} noValidate className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-[60px] flex-1 items-center justify-center overflow-hidden rounded-xl border border-[#e5e5e5] bg-[#f5f5f5]">
              {challenge ? (
                // eslint-disable-next-line @next/next/no-img-element -- inline SVG data URL, not an asset
                <img
                  src={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(challenge.svg)}`}
                  width={200}
                  height={60}
                  alt="Security check: add the two numbers in this image"
                  draggable={false}
                  className="select-none"
                />
              ) : loadFailed ? (
                <span className="px-3 text-center text-xs text-destructive">
                  Couldn&apos;t load the check. Try the refresh button.
                </span>
              ) : (
                <Spinner className="size-5 text-[#a3a3a3]" />
              )}
            </div>
            <button
              type="button"
              onClick={() => void refresh()}
              disabled={sending}
              aria-label="Show a new image"
              title="Show a new image"
              className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-[#e5e5e5] text-[#737373] transition-colors hover:text-brand focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none disabled:opacity-50"
            >
              <RefreshCwIcon className="size-4" aria-hidden />
            </button>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="captcha-answer" className="text-sm font-semibold text-[#404040]">
              Your answer
            </label>
            <Input
              ref={inputRef}
              id="captcha-answer"
              inputMode="numeric"
              autoComplete="off"
              maxLength={3}
              value={answer}
              onChange={(e) => setAnswer(e.currentTarget.value)}
              disabled={sending || !challenge}
              aria-invalid={!!error}
              aria-describedby={error ? errorId : undefined}
              className={cn(
                "h-auto rounded-xl border-[#e5e5e5] bg-[#fafafa] px-4 py-3 text-base text-[#171717] shadow-none focus-visible:border-transparent focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-brand",
                error && "border-destructive",
              )}
            />
            {error ? (
              <p id={errorId} role="alert" className="text-sm text-destructive">
                {error}
              </p>
            ) : null}
          </div>

          <DialogFooter className="flex-row gap-3 sm:justify-stretch">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={sending}
              className="h-auto flex-1 rounded-xl py-3 text-base font-semibold"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={sending || !challenge}
              className="h-auto flex-1 gap-2 rounded-xl bg-brand py-3 text-base font-bold text-white hover:bg-brand/90"
            >
              {sending ? <Spinner className="size-4" /> : null}
              {sending ? "Sending…" : "Verify & Send"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
