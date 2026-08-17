import { NextResponse, type NextRequest } from "next/server";

import { defaultLocale, isLocale, type Locale } from "@/lib/i18n/config";
import { anyLocaleSegment, canonicalSegmentFor, publicSegment } from "@/lib/i18n/routes";

/**
 * Kobler den offentlige adressen til riktig mappe under `src/app/[locale]/`.
 *
 *   /produkter/golfbil-elektrisk   →  /no/products/golfbil-elektrisk
 *   /en/products/golfbil-elektrisk →  /en/products/golfbil-elektrisk
 *
 * Norsk er standardspråk og vises uten prefiks. Adresser som treffer feil
 * variant (/no/... eller /products på norsk) sendes videre med 308 slik at
 * hver side bare finnes på én adresse.
 */

function skip(pathname: string): boolean {
  return (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/studio") ||
    pathname.includes(".")
  );
}

/** Bygger den offentlige adressen for et sett stier, uansett hvilket språk de kom fra. */
function publicPath(locale: Locale, segments: string[]): string {
  const prefix = locale === defaultLocale ? "" : `/${locale}`;
  if (segments.length === 0) return prefix || "/";

  const canonical = anyLocaleSegment(segments[0]);
  const head = canonical ? publicSegment(canonical, locale) : segments[0];
  return `${prefix}/${[head, ...segments.slice(1)].join("/")}`;
}

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  if (skip(pathname)) return NextResponse.next();

  const segments = pathname.split("/").filter(Boolean);

  // Standardspråket skal ikke ha prefiks: /no/produkter → /produkter
  if (segments[0] === defaultLocale) {
    const target = publicPath(defaultLocale, segments.slice(1));
    return NextResponse.redirect(new URL(`${target}${search}`, request.url), 308);
  }

  let locale: Locale = defaultLocale;
  let rest = segments;
  if (segments[0] && isLocale(segments[0])) {
    locale = segments[0];
    rest = segments.slice(1);
  }

  if (rest.length === 0) {
    return NextResponse.rewrite(new URL(`/${locale}${search}`, request.url));
  }

  const canonical = canonicalSegmentFor(rest[0], locale);
  if (canonical) {
    const internal = [locale, canonical, ...rest.slice(1)].join("/");
    return NextResponse.rewrite(new URL(`/${internal}${search}`, request.url));
  }

  // Riktig side, men adressen tilhører et annet språk. Send til den riktige.
  const foreign = anyLocaleSegment(rest[0]);
  if (foreign) {
    const target = `${locale === defaultLocale ? "" : `/${locale}`}/${[
      publicSegment(foreign, locale),
      ...rest.slice(1),
    ].join("/")}`;
    return NextResponse.redirect(new URL(`${target}${search}`, request.url), 308);
  }

  // Ukjent adresse. Sendes videre slik at 404-siden vises på riktig språk.
  const internal = [locale, ...rest].join("/");
  return NextResponse.rewrite(new URL(`/${internal}${search}`, request.url));
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|studio|.*\\.).*)"],
};
