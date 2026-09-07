import { CategoryCard } from "@/components/category-card";
import { HomeHero } from "@/components/home-hero";
import {
  ButtonLink,
  Container,
  Section,
  SectionHeader,
} from "@/components/layout-primitives";
import { ProductCard } from "@/components/product-card";
import { getCategoriesWithProducts, getFeaturedProducts, getSite } from "@/lib/content";
import { isLocale, pick } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { routes } from "@/lib/i18n/routes";
import { notFound } from "next/navigation";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const [site, categories, featured] = await Promise.all([
    getSite(),
    getCategoriesWithProducts(),
    getFeaturedProducts(6),
  ]);

  const categoryBySlug = new Map(categories.map((category) => [category.slug, category]));
  const showcase = featured
    .map((product) => ({ product, category: categoryBySlug.get(product.category)! }))
    .filter((entry) => entry.category);

  return (
    <>
      <HomeHero site={site} locale={locale} dict={dict} showcase={showcase.slice(0, 3)} />

      <Section className="border-b border-line py-12 sm:py-16">
        <Container size="wide">
          <ul className="grid gap-8 sm:grid-cols-3 sm:gap-10">
            {site.valueProps.map((prop) => (
              <li key={pick(prop.title, locale)} className="border-t-2 border-pine pt-5">
                <h2 className="text-base font-semibold text-ink">{pick(prop.title, locale)}</h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {pick(prop.body, locale)}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="sand">
        <Container size="wide">
          <SectionHeader
            eyebrow={dict.nav.products}
            title={dict.home.categoriesHeading}
            action={
              <ButtonLink href={routes.products(locale)} variant="secondary">
                {dict.actions.seeAllProducts}
              </ButtonLink>
            }
          />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <CategoryCard
                key={category.slug}
                category={category}
                locale={locale}
                dict={dict}
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container size="wide">
          <SectionHeader title={dict.home.featuredHeading} />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {showcase.map(({ product, category }) => (
              <ProductCard
                key={product.slug}
                product={product}
                category={category}
                locale={locale}
                dict={dict}
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="pine">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <h2 className="text-3xl font-semibold sm:text-4xl">{dict.home.processHeading}</h2>
              <p className="mt-4 max-w-sm text-lg leading-relaxed text-pine-200">
                {pick(site.contactPage.lead, locale)}
              </p>
              <ButtonLink href={routes.contact(locale)} variant="onPine" size="lg" className="mt-8">
                {dict.actions.contactUs}
              </ButtonLink>
            </div>

            <ol className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {site.process.map((step, index) => (
                <li key={pick(step.title, locale)}>
                  <span className="text-sm font-semibold tabular-nums text-pine-200">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold text-paper">
                    {pick(step.title, locale)}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-pine-200">
                    {pick(step.body, locale)}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>
    </>
  );
}
