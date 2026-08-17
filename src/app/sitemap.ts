import type { MetadataRoute } from "next";

import { getCategories, getProducts } from "@/lib/content";
import { defaultLocale, locales, localeHtmlLang, type Locale } from "@/lib/i18n/config";
import { routes, translatePath } from "@/lib/i18n/routes";
import { absoluteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categories, products] = await Promise.all([getCategories(), getProducts()]);

  const paths = (locale: Locale) => [
    { path: routes.home(locale), priority: 1 },
    { path: routes.products(locale), priority: 0.9 },
    { path: routes.about(locale), priority: 0.6 },
    { path: routes.contact(locale), priority: 0.6 },
    ...categories.map((category) => ({
      path: routes.category(locale, category.slug),
      priority: 0.8,
    })),
    ...products.map((product) => ({
      path: routes.product(locale, product.slug),
      priority: 0.7,
    })),
  ];

  return locales.flatMap((locale) =>
    paths(locale).map(({ path, priority }) => ({
      url: absoluteUrl(path),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority,
      alternates: {
        languages: {
          ...Object.fromEntries(
            locales.map((candidate) => [
              localeHtmlLang[candidate],
              absoluteUrl(translatePath(path, locale, candidate)),
            ]),
          ),
          "x-default": absoluteUrl(translatePath(path, locale, defaultLocale)),
        },
      },
    })),
  );
}
