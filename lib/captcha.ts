import "server-only";

import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

import svgCaptcha from "svg-captcha";

/**
 * Math CAPTCHA for the contact form (client request 2026-10-28: "5 + 4 = ___", then "make it
 * look like a captcha"). The sum is drawn by `svg-captcha` as a distorted, coloured SVG image
 * with noise lines, so the numbers are not in the page as text. Stateless: the token carries an
 * expiry and a nonce plus an HMAC over (answer, expiry, nonce); `verifyCaptcha` recomputes the
 * HMAC with the visitor's answer. The answer itself never reaches the browser.
 *
 * Secret: CAPTCHA_SECRET, else an existing server secret, so it works on Vercel without new env.
 */
const secret = () =>
  process.env.CAPTCHA_SECRET ||
  process.env.SANITY_REVALIDATE_SECRET ||
  process.env.SANITY_API_WRITE_TOKEN ||
  process.env.SANITY_API_TOKEN ||
  // Local dev without any secret: fixed value (never used on Vercel, which has the tokens).
  "xconcile-dev-captcha";

/** A challenge is valid for 2 hours (long forms, open tabs). */
const TTL_MS = 2 * 60 * 60 * 1000;

const sign = (answer: string, rest: string) =>
  createHmac("sha256", secret()).update(`${answer}.${rest}`).digest("base64url");

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
  const rest = `${Date.now() + TTL_MS}.${randomBytes(9).toString("base64url")}`;
  return { svg: data, token: `${rest}.${sign(text, rest)}` };
}

export type CaptchaCheck = "ok" | "wrong" | "expired";

export function verifyCaptcha(token: string, answer: string): CaptchaCheck {
  const parts = token.split(".");
  if (parts.length !== 3) return "expired";
  const [expires, nonce, signature] = parts;
  if (!(Number(expires) > Date.now())) return "expired";
  const expected = Buffer.from(sign(String(Number(answer.trim())), `${expires}.${nonce}`));
  const given = Buffer.from(signature);
  return expected.length === given.length && timingSafeEqual(expected, given) ? "ok" : "wrong";
}
