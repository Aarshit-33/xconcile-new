"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm, type Resolver } from "react-hook-form";

import { submitInquiry } from "@/app/actions/submit-inquiry";
import { CaptchaDialog, type CaptchaSolution } from "@/components/forms/captcha-dialog";
import { ArrowForwardIcon } from "@/components/icons/material-symbols";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { home } from "@/content/home";
import { inquiryDefaults, inquiryServiceOptions } from "@/lib/inquiry-options";
import type { InquiryField, InquiryFormInput, InquiryFormOutput } from "@/lib/inquiry-schema";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type Copy = typeof home.inquiry.form;

/*
 * OLD-SITE LOOK (client request 2026-10-15): values copied from the old site's Tailwind theme
 * (old-code/xconcile-website/tailwind.config.js), not from the Figma tokens.
 * neutral-50 #fafafa · neutral-200 #e5e5e5 · neutral-400 #a3a3a3 · neutral-500 #737373 ·
 * neutral-700 #404040 · neutral-900 #171717
 * Focus ring: was primary-500 #1c7185 (teal); brand green since 2026-10-22 (client request).
 * Submit button: was secondary-600/700 #5a9240/#436d30 (olive); brand green with the solid-CTA
 * hover (brand/90) since 2026-10-22 so it matches every other button (client request).
 */
const control =
  "h-auto rounded-xl border-[#e5e5e5] bg-[#fafafa] px-4 py-3 text-sm text-[#171717] shadow-none transition-colors placeholder:text-[#a3a3a3] focus-visible:border-transparent focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-brand disabled:opacity-50 md:text-sm";
const label = "gap-0 text-sm font-semibold text-[#404040]";

// The zod schema loads on the first validation (blur / submit), keeping zod out of the initial JS.
const lazyZodResolver: Resolver<InquiryFormInput, unknown, InquiryFormOutput> = async (
  values,
  context,
  options,
) => {
  const { inquiryFieldsSchema } = await import("@/lib/inquiry-schema");
  return zodResolver(inquiryFieldsSchema)(values, context, options);
};

/**
 * Home contact form in the old site's "Send Us a Message" card style. Same fields and required
 * rules as the old ServiceInquiryForm; submits to the `submitInquiry` server action.
 */
export function InquiryForm({
  copy,
  contactEmail = siteConfig.contact.email,
  className,
}: {
  copy: Copy;
  /** From Sanity Site Settings (passed by the server parent); code value otherwise. */
  contactEmail?: string;
  className?: string;
}) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  // Valid form values waiting for the CAPTCHA popup (client request 2026-10-28); null = closed.
  const [pending, setPending] = useState<InquiryFormOutput | null>(null);
  const {
    register,
    control: formControl,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<InquiryFormInput, unknown, InquiryFormOutput>({
    resolver: lazyZodResolver,
    defaultValues: inquiryDefaults,
    mode: "onTouched",
  });

  // Send: the fields are validated here, then the CAPTCHA popup opens.
  const onSubmit = handleSubmit((values) => {
    setStatus("idle");
    setPending(values);
  });

  /** From the popup: send with the CAPTCHA answer; returns a CAPTCHA error to show there. */
  const send = async ({ answer, token }: CaptchaSolution): Promise<string | null> => {
    if (!pending) return null;
    const result = await submitInquiry({
      ...pending,
      captchaAnswer: answer,
      captchaToken: token,
    }).catch(() => ({ ok: false as const, reason: "failed" as const }));
    if (result.ok) {
      setPending(null);
      reset(inquiryDefaults);
      setStatus("success");
      return null;
    }
    if (result.reason === "invalid") {
      const { captchaAnswer, ...fieldErrors } = result.fieldErrors;
      if (captchaAnswer) return captchaAnswer;
      setPending(null);
      for (const [field, message] of Object.entries(fieldErrors)) {
        if (message) setError(field as InquiryField, { message });
      }
      return null;
    }
    setPending(null);
    setStatus("error");
    return null;
  };

  const { fields } = copy;
  const req = (required: boolean) =>
    required ? (
      <span aria-hidden className="ml-1">
        *
      </span>
    ) : null;

  return (
    <div
      className={cn(
        "rounded-3xl bg-white p-4 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] md:p-10",
        className,
      )}
    >
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-[#171717]">{copy.title}</h3>
        <p className="mt-1 text-sm text-[#737373]">{copy.note}</p>
      </div>

      <form
        noValidate
        onSubmit={onSubmit}
        aria-label="Contact form"
        className="relative flex flex-col gap-5"
      >
        <div role="status" aria-live="polite" className="empty:hidden">
          {status === "success" ? (
            <p className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-medium text-green-700">
              {copy.success}
            </p>
          ) : null}
          {status === "error" ? (
            <p className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
              {copy.error}{" "}
              <a href={`mailto:${contactEmail}`} className="link-inline">
                {contactEmail}
              </a>
              .
            </p>
          ) : null}
        </div>

        {/* Name + Email */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field data-invalid={!!errors.name} className="gap-1.5">
            <FieldLabel htmlFor="inquiry-name" className={label}>
              {fields.name.label}
              {req(fields.name.required)}
            </FieldLabel>
            <Input
              id="inquiry-name"
              autoComplete="name"
              placeholder={fields.name.placeholder}
              aria-required={fields.name.required}
              aria-invalid={!!errors.name}
              disabled={isSubmitting}
              className={control}
              {...register("name")}
            />
            <FieldError errors={[errors.name]} />
          </Field>

          <Field data-invalid={!!errors.email} className="gap-1.5">
            <FieldLabel htmlFor="inquiry-email" className={label}>
              {fields.email.label}
              {req(fields.email.required)}
            </FieldLabel>
            <Input
              id="inquiry-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder={fields.email.placeholder}
              aria-required={fields.email.required}
              aria-invalid={!!errors.email}
              disabled={isSubmitting}
              className={control}
              {...register("email")}
            />
            <FieldError errors={[errors.email]} />
          </Field>
        </div>

        {/* Phone + Company */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field data-invalid={!!errors.phone} className="gap-1.5">
            <FieldLabel htmlFor="inquiry-phone" className={label}>
              {fields.phone.label}
            </FieldLabel>
            <Input
              id="inquiry-phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder={fields.phone.placeholder}
              aria-invalid={!!errors.phone}
              disabled={isSubmitting}
              className={control}
              {...register("phone")}
            />
            <FieldError errors={[errors.phone]} />
          </Field>

          <Field data-invalid={!!errors.company} className="gap-1.5">
            <FieldLabel htmlFor="inquiry-company" className={label}>
              {fields.company.label}
            </FieldLabel>
            <Input
              id="inquiry-company"
              autoComplete="organization"
              placeholder={fields.company.placeholder}
              aria-invalid={!!errors.company}
              disabled={isSubmitting}
              className={control}
              {...register("company")}
            />
            <FieldError errors={[errors.company]} />
          </Field>
        </div>

        {/* Service of interest */}
        <Field data-invalid={!!errors.service} className="gap-1.5">
          <FieldLabel htmlFor="inquiry-service" className={label}>
            {fields.service.label}
            {req(fields.service.required)}
          </FieldLabel>
          <Controller
            name="service"
            control={formControl}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange} disabled={isSubmitting}>
                <SelectTrigger
                  id="inquiry-service"
                  ref={field.ref}
                  onBlur={field.onBlur}
                  aria-required={fields.service.required}
                  aria-invalid={!!errors.service}
                  className={cn(
                    control,
                    "w-full data-[size=default]:h-auto [&_svg]:size-4 [&_svg]:text-[#a3a3a3]",
                  )}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent position="popper" className="max-h-72">
                  {inquiryServiceOptions.map((o) => (
                    <SelectItem key={o.value} value={o.value} className="py-2 text-sm">
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <FieldError errors={[errors.service]} />
        </Field>

        {/* Message */}
        <Field data-invalid={!!errors.message} className="gap-1.5">
          <FieldLabel htmlFor="inquiry-message" className={label}>
            {fields.message.label}
            {req(fields.message.required)}
          </FieldLabel>
          <Textarea
            id="inquiry-message"
            rows={4}
            placeholder={fields.message.placeholder}
            aria-required={fields.message.required}
            aria-invalid={!!errors.message}
            disabled={isSubmitting}
            className={cn(control, "field-sizing-fixed min-h-0 resize-none")}
            {...register("message")}
          />
          <FieldError errors={[errors.message]} />
        </Field>

        {/* Honeypot: off-screen, not focusable, hidden from assistive tech */}
        <div aria-hidden className="absolute -left-[9999px] size-px overflow-hidden">
          <label htmlFor="inquiry-website">Website</label>
          <input
            id="inquiry-website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("website")}
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-auto min-h-12 w-full gap-2 rounded-xl bg-brand px-6 py-3 text-base font-bold whitespace-normal text-white hover:bg-brand/90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? copy.submitting : copy.submit}
          {isSubmitting ? null : <ArrowForwardIcon className="size-5" />}
        </Button>
      </form>

      <CaptchaDialog
        open={pending !== null}
        onOpenChange={(open) => !open && setPending(null)}
        onSubmit={send}
      />
    </div>
  );
}
