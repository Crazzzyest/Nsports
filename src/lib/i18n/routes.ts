/**
 * Adresser per språk.
 *
 * Mappene under `src/app/[locale]/` heter det samme som nøklene her
 * (products, categories, about, contact). Det er den interne adressen.
 * Kartet under oversetter den til adressen publikum ser, og `src/proxy.ts`
 * setter den tilbake igjen på vei inn.
 *
 * Skal en adresse hete noe annet, endres den ett sted: her.
 */

import { defaultLocale, type Locale } from "./config";

export const canonicalSegments = ["products", "categories", "about", "contact"] as const;

export type CanonicalSegment = (typeof canonicalSegments)[number];

export const segmentTranslations: Record<CanonicalSegment, Record<Locale, string>> = {
  products: { no: "produkter", en: "products" },
  categories: { no: "kategorier", en: "categories" },
  about: { no: "om-oss", en: "about" },
  contact: { no: "kontakt", en: "contact" },
};

export function publicSegment(segment: CanonicalSegment, locale: Locale): string {
  return segmentTranslations[segment][locale];
}

/** Oversetter en adresse publikum bruker tilbake til mappenavnet i app-katalogen. */
export function canonicalSegmentFor(segment: string, locale: Locale): CanonicalSegment | null {
  for (const canonical of canonicalSegments) {
    if (segmentTranslations[canonical][locale] === segment) return canonical;
  }
  return null;
}

/** Finnes segmentet på et annet språk? Brukes til å sende brukeren riktig vei. */
export function anyLocaleSegment(segment: string): CanonicalSegment | null {
  for (const canonical of canonicalSegments) {
    if (canonical === segment) return canonical;
    const translations = Object.values(segmentTranslations[canonical]);
    if (translations.includes(segment)) return canonical;
  }
  return null;
}

function prefix(locale: Locale): string {
  return locale === defaultLocale ? "" : `/${locale}`;
}

export const routes = {
  home: (locale: Locale) => prefix(locale) || "/",
  products: (locale: Locale) => `${prefix(locale)}/${publicSegment("products", locale)}`,
  product: (locale: Locale, slug: string) =>
    `${prefix(locale)}/${publicSegment("products", locale)}/${slug}`,
  category: (locale: Locale, slug: string) =>
    `${prefix(locale)}/${publicSegment("categories", locale)}/${slug}`,
  about: (locale: Locale) => `${prefix(locale)}/${publicSegment("about", locale)}`,
  contact: (locale: Locale) => `${prefix(locale)}/${publicSegment("contact", locale)}`,
  quote: (locale: Locale, productSlug: string) =>
    `${prefix(locale)}/${publicSegment("contact", locale)}?produkt=${encodeURIComponent(productSlug)}`,
};

/**
 * Bygger den offentlige adressen for samme side på et annet språk.
 * Brukes av språkvelgeren og av hreflang-taggene.
 */
export function translatePath(
  canonicalPath: string,
  from: Locale,
  to: Locale,
): string {
  const segments = canonicalPath.split("/").filter(Boolean);
  if (segments[0] === from) segments.shift();

  if (segments.length === 0) return routes.home(to);

  const canonical = canonicalSegmentFor(segments[0], from) ?? anyLocaleSegment(segments[0]);
  if (!canonical) return routes.home(to);

  const rest = segments.slice(1);
  const translated = [publicSegment(canonical, to), ...rest].join("/");
  return `${prefix(to)}/${translated}`;
}
