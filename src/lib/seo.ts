import type { Metadata } from "next";

import { locales, localeHtmlLang, defaultLocale, type Locale } from "@/lib/i18n/config";
import { translatePath } from "@/lib/i18n/routes";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://nsports.no"
).replace(/\/$/, "");

export function absoluteUrl(path: string): string {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Bygger metadata for en side, inkludert hreflang for de andre språkene.
 * `path` er den offentlige adressen for gjeldende språk.
 */
export function buildMetadata({
  locale,
  path,
  title,
  description,
  images,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  images?: string[];
}): Metadata {
  const languages: Record<string, string> = {};
  for (const candidate of locales) {
    languages[localeHtmlLang[candidate]] = absoluteUrl(
      translatePath(path, locale, candidate),
    );
  }
  languages["x-default"] = absoluteUrl(translatePath(path, locale, defaultLocale));

  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl(path),
      languages,
    },
    openGraph: {
      type: "website",
      siteName: "NSports",
      locale: localeHtmlLang[locale],
      url: absoluteUrl(path),
      title,
      description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
  };
}
