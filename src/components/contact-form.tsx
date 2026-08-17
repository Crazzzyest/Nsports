"use client";

import { useActionState, useId } from "react";
import { useFormStatus } from "react-dom";

import { submitEnquiry } from "@/app/[locale]/contact/actions";
import { Button } from "@/components/layout-primitives";
import { CheckIcon } from "@/components/icons";
import { audiences } from "@/lib/content/types";
import {
  emptyEnquiryState,
  type EnquiryField,
  type EnquiryState,
} from "@/lib/enquiry-types";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { cn } from "@/lib/utils";

export type ProductGroup = {
  label: string;
  options: { slug: string; name: string }[];
};

export function ContactForm({
  locale,
  dict,
  productGroups,
  selectedProduct,
}: {
  locale: Locale;
  dict: Dictionary;
  productGroups: ProductGroup[];
  selectedProduct?: string;
}) {
  const [state, formAction] = useActionState(submitEnquiry, emptyEnquiryState);
  const prefix = useId();

  if (state.status === "success") {
    return (
      <div className="flex gap-4 rounded-(--radius-card) border border-pine-200 bg-pine-50 p-6">
        <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-pine" />
        <p className="text-base leading-relaxed text-pine">{dict.contact.success}</p>
      </div>
    );
  }

  const failedWithoutFieldErrors =
    state.status === "error" && Object.keys(state.errors).length === 0;

  return (
    <form action={formAction} className="space-y-5" noValidate>
      <input type="hidden" name="locale" value={locale} />

      {/* Skjult for mennesker, synlig for automatiske innsendinger. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${prefix}-firmanavn`}>Firmanavn</label>
        <input id={`${prefix}-firmanavn`} name="firmanavn" tabIndex={-1} autoComplete="off" />
      </div>

      {failedWithoutFieldErrors ? (
        <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {dict.contact.error}
        </p>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          prefix={prefix}
          name="name"
          label={dict.contact.name}
          state={state}
          dict={dict}
          required
          autoComplete="name"
        />
        <Field
          prefix={prefix}
          name="email"
          label={dict.contact.email}
          type="email"
          state={state}
          dict={dict}
          required
          autoComplete="email"
        />
        <Field
          prefix={prefix}
          name="phone"
          label={dict.contact.phone}
          type="tel"
          state={state}
          dict={dict}
          autoComplete="tel"
        />
        <Field
          prefix={prefix}
          name="organisation"
          label={dict.contact.organisation}
          state={state}
          dict={dict}
          autoComplete="organization"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField
          prefix={prefix}
          name="customerType"
          label={dict.contact.customerType}
          defaultValue=""
        >
          <option value="">—</option>
          {audiences.map((audience) => (
            <option key={audience} value={dict.audience[audience]}>
              {dict.audience[audience]}
            </option>
          ))}
        </SelectField>

        <SelectField
          prefix={prefix}
          name="product"
          label={dict.contact.product}
          defaultValue={selectedProduct ?? ""}
        >
          <option value="">{dict.contact.productNone}</option>
          {productGroups.map((group) => (
            <optgroup key={group.label} label={group.label}>
              {group.options.map((product) => (
                <option key={product.slug} value={product.slug}>
                  {product.name}
                </option>
              ))}
            </optgroup>
          ))}
        </SelectField>
      </div>

      <Field
        prefix={prefix}
        name="quantity"
        label={dict.contact.quantity}
        placeholder={dict.contact.quantityPlaceholder}
        state={state}
        dict={dict}
      />

      <Field
        prefix={prefix}
        name="message"
        label={dict.contact.message}
        placeholder={dict.contact.messagePlaceholder}
        state={state}
        dict={dict}
        required
        multiline
      />

      <SubmitButton dict={dict} />
    </form>
  );
}

function SubmitButton({ dict }: { dict: Dictionary }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" disabled={pending}>
      {pending ? dict.contact.submitting : dict.contact.submit}
    </Button>
  );
}

const fieldClass =
  "w-full rounded-lg border bg-paper px-3.5 py-2.5 text-base text-ink transition-colors placeholder:text-ink-muted/70 focus:border-pine focus:outline-none";

function Label({
  htmlFor,
  children,
  required,
  optionalLabel,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
  optionalLabel?: string;
}) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-ink">
      {children}
      {!required && optionalLabel ? (
        <span className="ml-1.5 font-normal text-ink-muted">({optionalLabel})</span>
      ) : null}
    </label>
  );
}

function Field({
  prefix,
  name,
  label,
  state,
  dict,
  type = "text",
  required = false,
  multiline = false,
  placeholder,
  autoComplete,
}: {
  prefix: string;
  name: EnquiryField;
  label: string;
  state: EnquiryState;
  dict: Dictionary;
  type?: string;
  required?: boolean;
  multiline?: boolean;
  placeholder?: string;
  autoComplete?: string;
}) {
  const id = `${prefix}-${name}`;
  const error = state.errors[name];
  const errorId = `${id}-error`;
  const message = error === "invalidEmail" ? dict.contact.invalidEmail : dict.contact.required;

  const shared = {
    id,
    name,
    required,
    placeholder,
    autoComplete,
    defaultValue: state.values[name] ?? "",
    "aria-invalid": error ? (true as const) : undefined,
    "aria-describedby": error ? errorId : undefined,
    className: cn(fieldClass, error ? "border-red-400" : "border-line-strong"),
  };

  return (
    <div className={multiline ? "sm:col-span-2" : undefined}>
      <Label htmlFor={id} required={required} optionalLabel={dict.contact.optional}>
        {label}
      </Label>
      {multiline ? (
        <textarea {...shared} rows={6} />
      ) : (
        <input {...shared} type={type} />
      )}
      {error ? (
        <p id={errorId} className="mt-1.5 text-sm text-red-700">
          {message}
        </p>
      ) : null}
    </div>
  );
}

function SelectField({
  prefix,
  name,
  label,
  defaultValue,
  children,
}: {
  prefix: string;
  name: EnquiryField;
  label: string;
  defaultValue: string;
  children: React.ReactNode;
}) {
  const id = `${prefix}-${name}`;
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <select
        id={id}
        name={name}
        defaultValue={defaultValue}
        className={cn(fieldClass, "border-line-strong")}
      >
        {children}
      </select>
    </div>
  );
}
