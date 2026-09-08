import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CheckIcon, DownloadIcon } from "@/components/icons";
import { Badge, ButtonLink, Container, Prose } from "@/components/layout-primitives";
import { ProductCard } from "@/components/product-card";
import { ProductGallery } from "@/components/product-gallery";
import { RoberaProShowcase } from "@/components/robera-pro-showcase";
import { WayroboShowcase } from "@/components/wayrobo-showcase";
import {
  getCategories,
  getCategory,
  getProduct,
  getProducts,
  getRelatedProducts,
  getSite,
} from "@/lib/content";
import { isLocale, pick } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { routes } from "@/lib/i18n/routes";
import { absoluteUrl, buildMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};

  const product = await getProduct(slug);
  if (!product) return {};

  const image = product.images.find((entry) => entry.src)?.src;

  return buildMetadata({
    locale,
    path: routes.product(locale, slug),
    title: pick(product.name, locale),
    description: pick(product.tagline, locale),
    images: image ? [absoluteUrl(image)] : undefined,
  });
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const product = await getProduct(slug);
  if (!product) notFound();

  const category = await getCategory(product.category);
  if (!category) notFound();

  const dict = getDictionary(locale);
  const [related, categories, site] = await Promise.all([
    getRelatedProducts(product),
    getCategories(),
    getSite(),
  ]);

  // Fyllet nederst kan hente produkter fra andre kategorier når denne har få.
  const relatedIsSameCategory = related.every((entry) => entry.category === product.category);

  const name = pick(product.name, locale);
  const highlights = pick(product.highlights, locale);
  const description = pick(product.description, locale);

  // Robera Pro og Wayrobo har egne, mer utfyllende salgssider enn den generiske malen.
  const isRobera = product.slug === "ai-golftralle";
  const isWayrobo = product.slug === "automatisk-ballplukker";

  return (
    <>
      <Container size="wide" className="pt-8">
        <nav className="text-sm text-ink-muted">
          <Link href={routes.products(locale)} className="hover:text-pine">
            {dict.products.heading}
          </Link>
          <span className="mx-2">/</span>
          <Link href={routes.category(locale, category.slug)} className="hover:text-pine">
            {pick(category.name, locale)}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-ink-soft">{name}</span>
        </nav>
      </Container>

      {isRobera ? (
        <RoberaProShowcase
          product={product}
          category={category}
          locale={locale}
          dict={dict}
        />
      ) : isWayrobo ? (
        <WayroboShowcase
          product={product}
          category={category}
          locale={locale}
          dict={dict}
        />
      ) : (
        <>
      <Container size="wide" className="py-8 sm:py-12">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
          <ProductGallery
            images={product.images.length > 0 ? product.images : [{ alt: product.name }]}
            accent={category.accent}
            icon={category.icon}
            locale={locale}
            dict={dict}
          />

          <div>
            <p
              className="mb-3 text-xs font-semibold uppercase tracking-[0.16em]"
              style={{ color: category.accent }}
            >
              {pick(category.name, locale)}
            </p>

            <h1 className="text-3xl font-semibold text-ink sm:text-4xl">{name}</h1>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              {pick(product.tagline, locale)}
            </p>

            {product.audience.length > 0 ? (
              <div className="mt-5 flex flex-wrap gap-2">
                {product.audience.map((entry) => (
                  <Badge key={entry} tone="neutral">
                    {dict.audience[entry]}
                  </Badge>
                ))}
              </div>
            ) : null}

            {highlights.length > 0 ? (
              <ul className="mt-7 space-y-2.5">
                {highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3 text-sm leading-relaxed text-ink-soft">
                    <CheckIcon className="mt-0.5 h-4.5 w-4.5 shrink-0 text-pine" />
                    {highlight}
                  </li>
                ))}
              </ul>
            ) : null}

            <div className="mt-8 rounded-(--radius-card) border border-line bg-sand p-6">
              <h2 className="text-base font-semibold text-ink">{dict.product.quoteCardHeading}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                {dict.product.quoteCardBody}
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <ButtonLink href={routes.quote(locale, product.slug)} size="md">
                  {dict.actions.requestQuote}
                </ButtonLink>
                <ButtonLink
                  href={`mailto:${site.contact.email}?subject=${encodeURIComponent(name)}`}
                  variant="secondary"
                  size="md"
                >
                  {site.contact.email}
                </ButtonLink>
              </div>
            </div>

            {product.datasheets.length > 0 ? (
              <div className="mt-6">
                <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
                  {dict.product.downloads}
                </h2>
                <ul className="space-y-2">
                  {product.datasheets.map((datasheet) => {
                    const label = pick(datasheet.label, locale);
                    return (
                      <li key={label}>
                        {datasheet.file ? (
                          <a
                            href={datasheet.file}
                            download
                            className="inline-flex items-center gap-2 text-sm font-medium text-pine underline-offset-4 hover:underline"
                          >
                            <DownloadIcon className="h-4 w-4" />
                            {label} — {dict.actions.downloadDatasheet}
                          </a>
                        ) : (
                          <Link
                            href={routes.quote(locale, product.slug)}
                            className="inline-flex items-center gap-2 text-sm font-medium text-ink-muted underline-offset-4 hover:text-pine hover:underline"
                          >
                            <DownloadIcon className="h-4 w-4" />
                            {label} — {dict.actions.requestDatasheet}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </Container>

      <div className="border-y border-line bg-sand">
        <Container size="wide" className="py-14 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div>
              <h2 className="text-2xl font-semibold text-ink">{dict.product.description}</h2>
              <Prose className="mt-5">
                {description.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </Prose>

              {product.variants.length > 0 ? (
                <div className="mt-10">
                  <h2 className="text-2xl font-semibold text-ink">{dict.product.variants}</h2>
                  <ul className="mt-5 divide-y divide-line border-y border-line">
                    {product.variants.map((variant) => {
                      const variantName = pick(variant.name, locale);
                      return (
                        <li
                          key={variantName}
                          className="flex flex-wrap items-baseline justify-between gap-2 py-3"
                        >
                          <span className="text-sm font-medium text-ink">{variantName}</span>
                          {variant.note ? (
                            <span className="text-sm text-ink-muted">
                              {pick(variant.note, locale)}
                            </span>
                          ) : null}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ) : null}
            </div>

            {product.specs.length > 0 ? (
              <div>
                <h2 className="text-2xl font-semibold text-ink">{dict.product.specifications}</h2>
                <dl className="mt-5 divide-y divide-line border-y border-line">
                  {product.specs.map((spec) => {
                    const label = pick(spec.label, locale);
                    return (
                      <div key={label} className="grid grid-cols-2 gap-4 py-3">
                        <dt className="text-sm text-ink-muted">{label}</dt>
                        <dd className="text-sm font-medium text-ink">{pick(spec.value, locale)}</dd>
                      </div>
                    );
                  })}
                </dl>
              </div>
            ) : null}
          </div>
        </Container>
      </div>
        </>
      )}

      {related.length > 0 ? (
        <Container size="wide" className="py-14 sm:py-20">
          <div className="mb-8 flex items-end justify-between gap-4">
            <h2 className="text-2xl font-semibold text-ink">
              {relatedIsSameCategory
                ? dict.product.relatedHeading
                : dict.product.relatedHeadingMixed}
            </h2>
            {relatedIsSameCategory ? (
              <ButtonLink href={routes.category(locale, category.slug)} variant="ghost">
                {dict.actions.seeCategory}
              </ButtonLink>
            ) : (
              <ButtonLink href={routes.products(locale)} variant="ghost">
                {dict.actions.seeAllProducts}
              </ButtonLink>
            )}
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((entry) => (
              <ProductCard
                key={entry.slug}
                product={entry}
                category={
                  categories.find((item) => item.slug === entry.category) ?? category
                }
                locale={locale}
                dict={dict}
                showCategory={!relatedIsSameCategory}
              />
            ))}
          </div>
        </Container>
      ) : null}
    </>
  );
}
