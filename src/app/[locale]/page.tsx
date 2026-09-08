import { notFound } from "next/navigation";

import { CategoryCard } from "@/components/category-card";
import { HomeHero } from "@/components/home-hero";
import { Icon } from "@/components/icons";
import {
  ButtonLink,
  Container,
  Prose,
  Section,
  SectionHeader,
} from "@/components/layout-primitives";
import { getCategoriesWithProducts, getSite } from "@/lib/content";
import { isLocale, pick } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { routes } from "@/lib/i18n/routes";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const [site, categories] = await Promise.all([getSite(), getCategoriesWithProducts()]);
  const home = site.home;

  return (
    <>
      <HomeHero site={site} locale={locale} dict={dict} />

      {/* Fordeler rett under hovedbildet */}
      <Section className="border-b border-line py-14 sm:py-20">
        <Container size="wide">
          <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {home.benefits.map((benefit) => (
              <li key={pick(benefit.title, locale)}>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-pine-50 text-pine">
                  <Icon name={benefit.icon} className="h-6 w-6" />
                </span>
                <h2 className="mt-5 text-lg font-semibold text-ink">
                  {pick(benefit.title, locale)}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {pick(benefit.body, locale)}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Produktkategorier */}
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
                actionLabel={dict.actions.seeProducts}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* Allianseideen */}
      <Section>
        <Container size="narrow">
          <h2 className="text-3xl font-semibold text-balance sm:text-4xl">
            {pick(home.alliance.heading, locale)}
          </h2>
          <Prose className="mt-5">
            {pick(home.alliance.body, locale).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Prose>
          <ButtonLink href={routes.about(locale)} size="lg" className="mt-8">
            {pick(home.alliance.cta, locale)}
          </ButtonLink>
        </Container>
      </Section>

      {/* Prosjektseksjon */}
      <Section tone="sand" className="py-16 sm:py-20">
        <Container size="wide">
          <div className="rounded-(--radius-card) border border-line bg-paper p-8 sm:p-12">
            <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-center lg:gap-12">
              <div className="max-w-2xl">
                <h2 className="text-2xl font-semibold sm:text-3xl">
                  {pick(home.project.heading, locale)}
                </h2>
                <Prose className="mt-4">
                  {pick(home.project.body, locale).map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </Prose>
              </div>
              <div className="lg:justify-self-end">
                <ButtonLink href={routes.contact(locale)} size="lg">
                  {pick(home.project.cta, locale)}
                </ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Avsluttende handlingsseksjon */}
      <Section tone="pine">
        <Container size="narrow" className="text-center">
          <h2 className="text-3xl font-semibold text-balance sm:text-4xl">
            {pick(home.finalCta.heading, locale)}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-pine-100">
            {pick(home.finalCta.body, locale)}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href={routes.products(locale)} variant="onPine" size="lg">
              {pick(home.finalCta.primaryCta, locale)}
            </ButtonLink>
            <ButtonLink href={routes.contact(locale)} variant="onDark" size="lg">
              {pick(home.finalCta.secondaryCta, locale)}
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
