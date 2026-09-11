import type { Metadata } from "next";
import Link from "next/link";

import { defaultLocale, localeHtmlLang } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { routes } from "@/lib/i18n/routes";

import "./globals.css";

export const metadata: Metadata = {
  title: `${getDictionary(defaultLocale).notFound.heading} - NSports`,
  robots: { index: false, follow: true },
};

/**
 * Vises for adresser som ikke treffer et språksegment i det hele tatt.
 * Må rendre <html> selv, siden rotoppsettet bare sender videre.
 */
export default function NotFound() {
  const dict = getDictionary(defaultLocale);

  return (
    <html lang={localeHtmlLang[defaultLocale]} className="h-full antialiased">
      <body className="flex min-h-full items-center justify-center bg-paper px-5 py-24 text-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-pine-400">404</p>
          <h1 className="mt-3 text-4xl font-semibold text-ink">{dict.notFound.heading}</h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">{dict.notFound.body}</p>
          <Link
            href={routes.home(defaultLocale)}
            className="mt-8 inline-flex items-center justify-center rounded-full bg-pine px-6 py-3.5 text-base font-medium text-paper"
          >
            {dict.notFound.action}
          </Link>
        </div>
      </body>
    </html>
  );
}
