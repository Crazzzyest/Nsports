import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Icon } from "@/components/icons";
import { ButtonLink, Container, Prose } from "@/components/layout-primitives";
import { ProductCard } from "@/components/product-card";
import { getCategories, getCategory, getProductsByCategory } from "@/lib/content";
import { isLocale, pick } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { plural } from "@/lib/i18n/format";
import { routes } from "@/lib/i18n/routes";
import { buildMetadata } from "@/lib/seo";
import { tint } from "@/lib/utils";

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};

  const category = await getCategory(slug);
  if (!category) return {};

  return buildMetadata({
    locale,
    path: routes.category(locale, slug),
    title: pick(category.name, locale),
    description: pick(category.tagline, locale),
  });
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const category = await getCategory(slug);
  if (!category) notFound();

  const dict = getDictionary(locale);
  const [products, categories] = await Promise.all([
    getProductsByCategory(slug),
    getCategories(),
  ]);

  return (
    <>
      <div
        className="border-b border-line"
        style={{ backgroundColor: tint(category.accent, 9) }}
      >
        <Container size="wide" className="py-14 sm:py-20">
          <nav className="mb-6 text-sm text-ink-muted">
            <Link href={routes.products(locale)} className="hover:text-pine">
              {dict.products.heading}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-ink-soft">{pick(category.name, locale)}</span>
          </nav>

          <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-16">
            <div>
              <span
                className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-paper/80"
                style={{ color: category.accent }}
              >
                <Icon name={category.icon} className="h-6 w-6" />
              </span>
              <h1 className="mt-5 text-4xl font-semibold text-ink sm:text-5xl">
                {pick(category.name, locale)}
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-ink-soft">
                {pick(category.tagline, locale)}
              </p>
            </div>

            <Prose className="lg:pt-20">
              {pick(category.description, locale).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </Prose>
          </div>
        </Container>
      </div>

      <Container size="wide" className="py-12 sm:py-16">
        <p className="mb-6 text-sm text-ink-muted">
          {plural(dict.products.resultCount, products.length)}
        </p>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <ProductCard
              key={product.slug}
              product={product}
              category={category}
              locale={locale}
              dict={dict}
              priority={index < 3}
              showCategory={false}
            />
          ))}
        </div>
      </Container>

      <div className="border-t border-line bg-sand">
        <Container size="wide" className="py-12">
          <h2 className="mb-5 text-sm font-semibold uppercase tracking-[0.14em] text-ink-muted">
            {dict.home.categoriesHeading}
          </h2>
          <div className="flex flex-wrap gap-2.5">
            {categories
              .filter((entry) => entry.slug !== category.slug)
              .map((entry) => (
                <Link
                  key={entry.slug}
                  href={routes.category(locale, entry.slug)}
                  className="rounded-full border border-line bg-paper px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:border-pine hover:text-pine"
                >
                  {pick(entry.name, locale)}
                </Link>
              ))}
            <ButtonLink href={routes.products(locale)} variant="secondary" size="sm">
              {dict.actions.seeAllProducts}
            </ButtonLink>
          </div>
        </Container>
      </div>
    </>
  );
}
