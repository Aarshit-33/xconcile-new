"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm, type Resolver } from "react-hook-form";

import { submitLead } from "@/app/actions/submit-lead";
import { ArrowForwardIcon, CheckCircleIcon } from "@/components/icons/material-symbols";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
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
import { leadServiceOptions } from "@/content/navigation";
import { leadDefaults } from "@/lib/lead-defaults";
import type { LeadField, LeadFormInput, LeadFormOutput } from "@/lib/lead-schema";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type Copy = typeof home.contact.form;

// Figma: 48px fields, 0.93px #DEE2E6 border, 7.4px radius, 14.8px inset, #898989 placeholder.
const control =
  "h-12 rounded-[7.4px] border-input-line bg-white px-[15px] text-b1 font-medium text-heading placeholder:text-placeholder md:text-b1";
const label = "gap-0 text-b1 leading-6 font-medium text-heading";

// The shared zod schema (same one the server action uses) loads on the first validation
// (blur / submit), so zod stays out of the page's initial JavaScript.
const lazyZodResolver: Resolver<LeadFormInput, unknown, LeadFormOutput> = async (
  values,
  context,
  options,
) => {
  const { leadSchema } = await import("@/lib/lead-schema");
  return zodResolver(leadSchema)(values, context, options);
};

/**
 * Lead form (contact section). react-hook-form + zod (shared schema) with shadcn Field,
 * Input, Select and Textarea; submits to the `submitLead` server action.
 */
export function LeadForm({
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
  const {
    register,
    control: formControl,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormInput, unknown, LeadFormOutput>({
    resolver: lazyZodResolver,
    defaultValues: leadDefaults,
    mode: "onTouched",
  });

  const onSubmit = handleSubmit(async (values) => {
    setStatus("idle");
    const result = await submitLead(values).catch(() => ({
      ok: false as const,
      reason: "failed" as const,
    }));
    if (result.ok) {
      reset(leadDefaults);
      setStatus("success");
      return;
    }
    if (result.reason === "invalid") {
      for (const [field, message] of Object.entries(result.fieldErrors)) {
        if (message) setError(field as LeadField, { message });
      }
      return;
    }
    setStatus("error");
  });

  const { fields } = copy;
  const req = (required: boolean) => (required ? <span aria-hidden>*</span> : null);

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      aria-label="Contact form"
      className={cn(
        "relative flex flex-col gap-10 rounded-md border border-line bg-white p-6",
        className,
      )}
    >
      <FieldGroup className="gap-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <Field data-invalid={!!errors.name}>
            <FieldLabel htmlFor="lead-name" className={label}>
              {fields.name.label}
              {req(fields.name.required)}
            </FieldLabel>
            <Input
              id="lead-name"
              autoComplete="name"
              placeholder={fields.name.placeholder}
              aria-required={fields.name.required}
              aria-invalid={!!errors.name}
              className={control}
              {...register("name")}
            />
            <FieldError errors={[errors.name]} />
          </Field>

          <Field data-invalid={!!errors.email}>
            <FieldLabel htmlFor="lead-email" className={label}>
              {fields.email.label}
              {req(fields.email.required)}
            </FieldLabel>
            <Input
              id="lead-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder={fields.email.placeholder}
              aria-required={fields.email.required}
              aria-invalid={!!errors.email}
              className={control}
              {...register("email")}
            />
            <FieldError errors={[errors.email]} />
          </Field>
        </div>

        <Field data-invalid={!!errors.company}>
          <FieldLabel htmlFor="lead-company" className={label}>
            {fields.company.label}
          </FieldLabel>
          <Input
            id="lead-company"
            autoComplete="organization"
            placeholder={fields.company.placeholder}
            aria-invalid={!!errors.company}
            className={control}
            {...register("company")}
          />
          <FieldError errors={[errors.company]} />
        </Field>

        <Field data-invalid={!!errors.service}>
          <FieldLabel htmlFor="lead-service" className={label}>
            {fields.service.label}
            {req(fields.service.required)}
          </FieldLabel>
          <Controller
            name="service"
            control={formControl}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  id="lead-service"
                  ref={field.ref}
                  onBlur={field.onBlur}
                  aria-required={fields.service.required}
                  aria-invalid={!!errors.service}
                  className={cn(
                    control,
                    "w-full data-placeholder:text-placeholder data-[size=default]:h-12 [&_svg]:size-5 [&_svg]:text-body",
                  )}
                >
                  <SelectValue placeholder={fields.service.placeholder} />
                </SelectTrigger>
                <SelectContent position="popper" className="max-h-72">
                  {leadServiceOptions.map((o) => (
                    <SelectItem key={o.value} value={o.value} className="py-2 text-b1">
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <FieldError errors={[errors.service]} />
        </Field>

        <Field data-invalid={!!errors.message}>
          <FieldLabel htmlFor="lead-message" className={label}>
            {fields.message.label}
          </FieldLabel>
          <Textarea
            id="lead-message"
            placeholder={fields.message.placeholder}
            aria-invalid={!!errors.message}
            className={cn(control, "h-auto min-h-[121px] resize-none pt-4")}
            {...register("message")}
          />
          <FieldError errors={[errors.message]} />
        </Field>

        {/* Honeypot: off-screen, not focusable, hidden from assistive tech */}
        <div aria-hidden className="absolute -left-[9999px] size-px overflow-hidden">
          <label htmlFor="lead-website">Website</label>
          <input
            id="lead-website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("website")}
          />
        </div>
      </FieldGroup>

      <div className="flex flex-col">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-auto min-h-12 w-full gap-2 rounded-md bg-brand px-4 py-2 text-b1 font-medium whitespace-normal text-white hover:bg-brand/90 disabled:opacity-70 lg:px-8"
        >
          {isSubmitting ? copy.submitting : copy.submit}
          <ArrowForwardIcon className="size-5" />
        </Button>

        <div role="status" aria-live="polite" className="mt-4 empty:mt-0">
          {status === "success" ? (
            <p className="flex items-start gap-2 text-b1 text-heading">
              <CheckCircleIcon className="mt-0.5 size-5 shrink-0 text-brand" />
              {copy.success}
            </p>
          ) : null}
          {status === "error" ? (
            <p className="text-b1 text-destructive">
              {copy.error}{" "}
              <a href={`mailto:${contactEmail}`} className="link-inline">
                {contactEmail}
              </a>
              .
            </p>
          ) : null}
        </div>
      </div>
    </form>
  );
}
