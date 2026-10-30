import "server-only";

import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

import { after } from "next/server";
import svgCaptcha from "svg-captcha";

import { writeToken } from "@/sanity/env.server";
import { writeClient } from "@/sanity/lib/client";

/**
 * Math CAPTCHA for the contact form (client request 2026-10-28: "5 + 4 = ___", then "make it
 * look like a captcha"). The sum is drawn by `svg-captcha` as a distorted, coloured SVG image
 * with noise lines, so the numbers are not in the page as text. The answer never reaches the
 * browser.
 *
 * Token: `<expires>.<nonce>.<issueMac>.<answerMac>`.
 * - `issueMac` = HMAC(expires.nonce): proves this server issued the token, so forged tokens are
 *   rejected before anything is stored.
 * - `answerMac` = HMAC(answer.expires.nonce): `verifyCaptcha` recomputes it with the visitor's
 *   answer.
 *
 * Hardening (security audit 2026-10-30, N-S2 + N-S4; user request "make each token single-use,
 * allow 3 attempts and shorten the lifetime to 10 minutes"):
 * - Lifetime 10 minutes (was 2 hours).
 * - Single use: a correct answer burns the token; replaying it returns "expired".
 * - At most 3 answers per token; the 4th returns "expired".
 * The popup (components/forms/captcha-dialog.tsx) already loads a new image after any wrong or
 * expired answer, so visitors see the same flow as before.
 *
 * State lives in Sanity as `captchaUse` documents with dotted IDs (`captcha.<nonce>`): dotted
 * IDs are never returned without a token, even while the dataset is public, and the Studio
 * schema doesn't list the type. Expired ones are deleted in the background. If Sanity is
 * unreachable (or no write token is set, e.g. local dev), the check falls back to the signed
 * token alone, so the contact form is never blocked by the store.
 */

/** A challenge is valid for 10 minutes. */
const TTL_MS = 10 * 60 * 1000;
/** Answers allowed per challenge. */
const MAX_ATTEMPTS = 3;

/**
 * Signing key. A dedicated CAPTCHA_SECRET is preferred. Otherwise a key is DERIVED from an
 * existing server secret (HMAC with a fixed label), so the raw token is never used as the key
 * itself. The public dev constant is only ever used outside production.
 */
let warnedNoSecret = false;
const key = (() => {
  let cached: string | Buffer | undefined;
  return () => {
    if (cached) return cached;
    const dedicated = process.env.CAPTCHA_SECRET;
    if (dedicated) return (cached = dedicated);
    const fallback =
      process.env.SANITY_REVALIDATE_SECRET ||
      process.env.SANITY_API_WRITE_TOKEN ||
      process.env.SANITY_API_TOKEN ||
      process.env.AZURE_CLIENT_SECRET;
    if (fallback) {
      return (cached = createHmac("sha256", fallback).update("xconcile-captcha-key-v1").digest());
    }
    if (process.env.NODE_ENV !== "production") return (cached = "xconcile-dev-captcha");
    // Production with no secret at all: a random per-instance key (tokens from another instance
    // fail with "expired" and the popup loads a new image). Set CAPTCHA_SECRET to avoid this.
    if (!warnedNoSecret) {
      warnedNoSecret = true;
      console.error("[captcha] No CAPTCHA_SECRET (or other server secret) set; using a random key");
    }
    return (cached = randomBytes(32));
  };
})();

const mac = (data: string) => createHmac("sha256", key()).update(data).digest("base64url");

const safeEqual = (a: string, b: string) => {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
};

export type CaptchaChallenge = { svg: string; token: string };

/** A new "a + b" image (1–9 each) and its signed token. */
export function createCaptcha(): CaptchaChallenge {
  const { data, text } = svgCaptcha.createMathExpr({
    mathMin: 1,
    mathMax: 9,
    mathOperator: "+",
    noise: 2,
    color: true,
    background: "#f5f5f5",
    width: 200,
    height: 60,
    fontSize: 62,
  });
  const rest = `${Date.now() + TTL_MS}.${randomBytes(12).toString("base64url")}`;
  return { svg: data, token: `${rest}.${mac(rest)}.${mac(`${text}.${rest}`)}` };
}

export type CaptchaCheck = "ok" | "wrong" | "expired";

type CaptchaUse = { _id: string; _rev: string; attempts?: number; solved?: boolean };

/** Sanity ID for a challenge (nonce is base64url: letters, digits, `-`, `_`). */
const captchaDocId = (nonce: string) => `captcha.${nonce}`;

/**
 * Counts this answer against the challenge (atomic create-if-missing + increment).
 * Returns the stored state after the increment, or `null` when the store is unavailable.
 */
async function recordAttempt(nonce: string, expires: number): Promise<CaptchaUse | null> {
  if (!writeToken) return null;
  const _id = captchaDocId(nonce);
  try {
    const result = await writeClient
      .transaction()
      .createIfNotExists({
        _id,
        _type: "captchaUse",
        attempts: 0,
        solved: false,
        expiresAt: new Date(expires).toISOString(),
      })
      .patch(_id, (p) => p.inc({ attempts: 1 }))
      .commit({ returnDocuments: true, visibility: "async" });
    const docs = result as unknown as CaptchaUse[];
    return docs.find((d) => d._id === _id) ?? null;
  } catch (error) {
    console.error("[captcha] attempt store unavailable; checking the signed token only", error);
    return null;
  }
}

/** Burns the challenge. `false` when another request burned it first (revision changed). */
async function markSolved(use: CaptchaUse): Promise<boolean> {
  try {
    await writeClient
      .patch(use._id)
      .ifRevisionId(use._rev)
      .set({ solved: true })
      .commit({ visibility: "async" });
    return true;
  } catch (error) {
    // 409: the document changed since this request read it (a concurrent answer).
    if ((error as { statusCode?: number }).statusCode === 409) return false;
    console.error("[captcha] could not mark the challenge as used", error);
    return true;
  }
}

/** Background clean-up of expired challenges (runs after the response is sent). */
function purgeExpired() {
  if (!writeToken) return;
  const run = () =>
    writeClient
      .delete({
        query: `*[_type == "captchaUse" && expiresAt < $now][0...200]`,
        params: { now: new Date().toISOString() },
      })
      .then(
        () => undefined,
        (error) => console.error("[captcha] clean-up failed", error),
      );
  try {
    after(run);
  } catch {
    // Outside a request (scripts/tests): run it now, unawaited.
    void run();
  }
}

export async function verifyCaptcha(token: string, answer: string): Promise<CaptchaCheck> {
  const parts = token.split(".");
  if (parts.length !== 4) return "expired";
  const [expiresRaw, nonce, issueMac, answerMac] = parts;
  const expires = Number(expiresRaw);
  if (!(expires > Date.now())) return "expired";
  if (!/^[A-Za-z0-9_-]{8,64}$/.test(nonce)) return "expired";
  // Not issued by this server: reject before touching the store.
  if (!safeEqual(mac(`${expiresRaw}.${nonce}`), issueMac)) return "expired";

  const use = await recordAttempt(nonce, expires);
  if (use && (use.solved || (use.attempts ?? 0) > MAX_ATTEMPTS)) return "expired";

  const correct = safeEqual(
    mac(`${String(Number(answer.trim()))}.${expiresRaw}.${nonce}`),
    answerMac,
  );
  if (!correct) return "wrong";
  if (use && !(await markSolved(use))) return "expired";
  purgeExpired();
  return "ok";
}
