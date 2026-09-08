import Link from "next/link";

import { ButtonLink, Container } from "@/components/layout-primitives";
import { ProductMedia } from "@/components/product-media";
import type { Category, Product, SiteContent } from "@/lib/content/types";
import { pick, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { routes } from "@/lib/i18n/routes";

/**
 * Forsidens toppseksjon: tekst til venstre og en bildecollage til høyre med
 * golfbil, ballplukker og el-tralle. Teksten ligger i `content/site.json`
 * under `home.hero`, mens bildene hentes fra de tre produktene i `showcase`,
 * slik at flisene lenker til riktig produktside.
 */
export function HomeHero({
  site,
  locale,
  dict,
  showcase,
}: {
  site: SiteContent;
  locale: Locale;
  dict: Dictionary;
  showcase: { product: Product; category: Category }[];
}) {
  const hero = site.home.hero;
  const [lead, ...rest] = showcase;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sand via-sand to-paper">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(72% 68% at 14% 0%, color-mix(in srgb, var(--color-pine-50) 85%, transparent) 0%, transparent 58%), radial-gradient(48% 55% at 92% 8%, var(--color-brass-soft) 0%, transparent 55%)",
        }}
      />

      <Container size="wide" className="relative">
        <div className="grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div className="max-w-xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-pine">
              {pick(hero.eyebrow, locale)}
            </p>
            <h1 className="text-4xl font-semibold leading-[1.08] text-ink text-balance sm:text-5xl lg:text-6xl">
              {pick(hero.title, locale)}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft">
              {pick(hero.body, locale)}
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href={routes.products(locale)} size="lg">
                {pick(hero.primaryCta, locale)}
              </ButtonLink>
              <ButtonLink href={routes.contact(locale)} variant="secondary" size="lg">
                {pick(hero.secondaryCta, locale)}
              </ButtonLink>
            </div>
          </div>

          {lead ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <ShowcaseTile
                entry={lead}
                locale={locale}
                dict={dict}
                priority
                className="aspect-16/10 sm:col-span-2"
                sizes="(max-width: 1024px) 92vw, 45vw"
              />
              {rest.slice(0, 2).map((entry) => (
                <ShowcaseTile
                  key={entry.product.slug}
                  entry={entry}
                  locale={locale}
                  dict={dict}
                  className="aspect-4/3"
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 22vw"
                />
              ))}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}

function ShowcaseTile({
  entry,
  locale,
  dict,
  className,
  sizes,
  priority = false,
}: {
  entry: { product: Product; category: Category };
  locale: Locale;
  dict: Dictionary;
  className: string;
  sizes: string;
  priority?: boolean;
}) {
  const { product, category } = entry;

  return (
    <Link
      href={routes.product(locale, product.slug)}
      className={`group flex flex-col overflow-hidden rounded-(--radius-card) border border-line bg-paper transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pine ${className}`}
    >
      <div className="relative flex-1">
        <ProductMedia
          image={product.images[0]}
          accent={category.accent}
          icon={category.icon}
          sizes={sizes}
          priority={priority}
          missingLabel={dict.product.imageMissing}
        />
      </div>
      <span className="truncate border-t border-line px-3 py-2 text-xs font-medium text-ink group-hover:text-pine">
        {pick(product.name, locale)}
      </span>
    </Link>
  );
}
