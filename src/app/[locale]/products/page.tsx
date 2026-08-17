import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/layout-primitives";
import { ProductExplorer } from "@/components/product-explorer";
import { getCategories, getProducts, getSite } from "@/lib/content";
import { isLocale, pick } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { routes } from "@/lib/i18n/routes";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const [dict, site] = [getDictionary(locale), await getSite()];

  return buildMetadata({
    locale,
    path: routes.products(locale),
    title: dict.products.heading,
    description: pick(site.seo.description, locale),
  });
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const [products, categories, site] = await Promise.all([
    getProducts(),
    getCategories(),
    getSite(),
  ]);

  return (
    <>
      <div className="border-b border-line bg-sand">
        <Container size="wide" className="py-14 sm:py-20">
          <h1 className="text-4xl font-semibold text-ink sm:text-5xl">{dict.products.heading}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
            {pick(site.hero.body, locale)}
          </p>
        </Container>
      </div>

      <Container size="wide" className="py-10 sm:py-14">
        <ProductExplorer
          products={products}
          categories={categories}
          locale={locale}
          dict={dict}
        />
      </Container>
    </>
  );
}
