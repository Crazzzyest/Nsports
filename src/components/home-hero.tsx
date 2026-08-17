import { ButtonLink, Container, Eyebrow } from "@/components/layout-primitives";
import { ProductMedia } from "@/components/product-media";
import type { Category, Product, SiteContent } from "@/lib/content/types";
import { pick, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { routes } from "@/lib/i18n/routes";

/**
 * Forsidens toppseksjon. Bildecollagen til høyre henter de tre første
 * utvalgte produktene, slik at den fylles med ekte produktbilder så snart
 * de er lastet opp — uten at forsiden må endres.
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
  const [lead, ...rest] = showcase;

  return (
    <section className="relative overflow-hidden bg-sand">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.55]"
        style={{
          background:
            "radial-gradient(80% 60% at 12% 0%, var(--color-pine-50) 0%, transparent 60%)",
        }}
      />

      <Container size="wide" className="relative">
        <div className="grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div className="max-w-xl">
            <Eyebrow>{pick(site.hero.eyebrow, locale)}</Eyebrow>
            <h1 className="text-4xl font-semibold leading-[1.08] text-ink sm:text-5xl lg:text-6xl">
              {pick(site.hero.title, locale)}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft">
              {pick(site.hero.body, locale)}
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href={routes.products(locale)} size="lg">
                {dict.actions.seeAllProducts}
              </ButtonLink>
              <ButtonLink href={routes.contact(locale)} variant="secondary" size="lg">
                {dict.actions.requestQuote}
              </ButtonLink>
            </div>
          </div>

          {lead ? (
            <div className="grid grid-cols-2 gap-4">
              <ShowcaseTile
                entry={lead}
                locale={locale}
                dict={dict}
                priority
                className="col-span-2 aspect-16/10"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
              {rest.slice(0, 2).map((entry) => (
                <ShowcaseTile
                  key={entry.product.slug}
                  entry={entry}
                  locale={locale}
                  dict={dict}
                  className="aspect-4/3"
                  sizes="(max-width: 1024px) 50vw, 22vw"
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
    <div
      className={`relative overflow-hidden rounded-(--radius-card) border border-line bg-paper ${className}`}
    >
      <ProductMedia
        image={product.images[0]}
        accent={category.accent}
        icon={category.icon}
        sizes={sizes}
        priority={priority}
        missingLabel={dict.product.imageMissing}
      />
      <span className="absolute left-3 top-3 rounded-full bg-paper/90 px-2.5 py-1 text-xs font-medium text-ink">
        {pick(product.name, locale)}
      </span>
    </div>
  );
}
