"use server";

import { createCaptcha, type CaptchaChallenge } from "@/lib/captcha";

/** A fresh math CAPTCHA image + token for the contact form (on mount and on refresh). */
export async function getCaptcha(): Promise<CaptchaChallenge> {
  return createCaptcha();
}
