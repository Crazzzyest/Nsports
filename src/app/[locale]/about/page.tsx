import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Icon } from "@/components/icons";
import {
  ButtonLink,
  Container,
  Eyebrow,
  Prose,
  Section,
} from "@/components/layout-primitives";
import { getSite } from "@/lib/content";
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

  const site = await getSite();
  const dict = getDictionary(locale);

  return buildMetadata({
    locale,
    path: routes.about(locale),
    title: dict.nav.about,
    description: pick(site.about.lead, locale),
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const site = await getSite();

  return (
    <>
      <div className="border-b border-line bg-sand">
        <Container size="wide" className="py-14 sm:py-24">
          <div className="max-w-3xl">
            <Eyebrow>{pick(site.brand.legalName, locale)}</Eyebrow>
            <h1 className="text-4xl font-semibold text-ink sm:text-5xl">{dict.nav.about}</h1>
            <p className="mt-6 text-xl leading-relaxed text-ink-soft">
              {pick(site.about.lead, locale)}
            </p>
          </div>
        </Container>
      </div>

      <Section>
        <Container size="wide">
          <div className="space-y-14 sm:space-y-20">
            {site.about.sections.map((section) => (
              <div
                key={pick(section.heading, locale)}
                className="grid gap-4 border-t border-line pt-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16"
              >
                <h2 className="text-2xl font-semibold text-ink">{pick(section.heading, locale)}</h2>
                <Prose>
                  {pick(section.body, locale).map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </Prose>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="sand" className="border-y border-line">
        <Container size="wide">
          <h2 className="mb-10 text-2xl font-semibold text-ink">{dict.home.processHeading}</h2>
          <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {site.process.map((step, index) => (
              <li key={pick(step.title, locale)} className="border-t-2 border-pine pt-4">
                <span className="text-sm font-semibold tabular-nums text-pine-400">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-lg font-semibold text-ink">{pick(step.title, locale)}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                  {pick(step.body, locale)}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section>
        <Container size="wide">
          <ul className="grid gap-8 sm:grid-cols-3 sm:gap-10">
            {site.valueProps.map((prop) => (
              <li key={pick(prop.title, locale)}>
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-pine-50 text-pine">
                  <Icon name={prop.icon} className="h-5.5 w-5.5" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-ink">{pick(prop.title, locale)}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                  {pick(prop.body, locale)}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-14 flex flex-wrap gap-3 border-t border-line pt-10">
            <ButtonLink href={routes.contact(locale)} size="lg">
              {dict.actions.contactUs}
            </ButtonLink>
            <ButtonLink href={routes.products(locale)} variant="secondary" size="lg">
              {dict.actions.seeAllProducts}
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
