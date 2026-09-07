import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getCategories, getSite } from "@/lib/content";
import { isLocale, locales, localeHtmlLang, pick } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { routes } from "@/lib/i18n/routes";
import { buildMetadata, siteUrl } from "@/lib/seo";

import "../globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const site = await getSite();

  return {
    metadataBase: new URL(siteUrl),
    ...buildMetadata({
      locale,
      path: routes.home(locale),
      title: pick(site.seo.title, locale),
      description: pick(site.seo.description, locale),
    }),
    title: {
      default: pick(site.seo.title, locale),
      template: `%s — ${site.brand.name}`,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const [site, categories] = await Promise.all([getSite(), getCategories()]);

  return (
    <html
      lang={localeHtmlLang[locale]}
      className={`${geistSans.variable} ${geistMono.variable} h-full bg-paper antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper">
        <a
          href="#innhold"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-pine focus:px-4 focus:py-2 focus:text-sm focus:text-paper"
        >
          {dict.nav.skipToContent}
        </a>

        <SiteHeader locale={locale} dict={dict} />

        <main id="innhold" className="flex-1">
          {children}
        </main>

        <SiteFooter locale={locale} dict={dict} site={site} categories={categories} />
      </body>
    </html>
  );
}
