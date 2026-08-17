"use server";

import { headers } from "next/headers";

import { handleEnquiry } from "@/lib/enquiry";
import type { EnquiryState } from "@/lib/enquiry-types";
import { defaultLocale, isLocale } from "@/lib/i18n/config";

export async function submitEnquiry(
  _previous: EnquiryState,
  formData: FormData,
): Promise<EnquiryState> {
  const raw = String(formData.get("locale") ?? "");
  const locale = isLocale(raw) ? raw : defaultLocale;

  const requestHeaders = await headers();
  const clientKey =
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "ukjent";

  return handleEnquiry(formData, locale, clientKey);
}
