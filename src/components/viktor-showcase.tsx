import { CheckIcon } from "@/components/icons";
import { Badge, ButtonLink, Container, Prose } from "@/components/layout-primitives";
import { ProductGallery } from "@/components/product-gallery";
import type { Category, Product } from "@/lib/content/types";
import { pick, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { routes } from "@/lib/i18n/routes";

type Copy = { no: string; en: string };
type CopyList = { no: string[]; en: string[] };

const CONTACT_EMAIL = "frank@nsports.no";

const TOUR_SLUG = "viktor-tour";
const TOURX_SLUG = "viktor-tour-x";

const copy = {
  quoteCta: { no: "Be om tilbud", en: "Request a quote" },
  featuresHeading: { no: "Hovedfordeler", en: "Key benefits" },

  characterEyebrow: { no: "Spillkarakter", en: "Playing character" },
  characterHeading: { no: "Spillkarakter", en: "Playing character" },

  specsEyebrow: { no: "Tekniske spesifikasjoner", en: "Technical specifications" },
  specsHeading: { no: "Tekniske spesifikasjoner", en: "Technical specifications" },

  compareHeading: {
    no: "Hvilken Viktor-ball passer deg?",
    en: "Which Viktor ball suits you?",
  },
  compareIntro: {
    no: "Begge ballene har premium urethan-cover og samme mål og vekt. Forskjellen ligger i konstruksjon, kompresjon og følelse.",
    en: "Both balls have a premium urethane cover and the same dimensions and weight. The difference lies in construction, compression and feel.",
  },
  seeTour: { no: "Se Viktor Tour", en: "View Viktor Tour" },
  seeTourX: { no: "Se Viktor Tour X", en: "View Viktor Tour X" },
  thisBall: { no: "Denne siden", en: "This page" },

  ctaHeading: { no: "Interessert i Viktor golfballer?", en: "Interested in Viktor golf balls?" },
  ctaBody: {
    no: "Ta kontakt for informasjon om klubbpris, proshop-avtale eller større bestillinger.",
    en: "Get in touch for information about club pricing, a pro shop agreement or larger orders.",
  },
} satisfies Record<string, Copy | CopyList>;

const compareCards = {
  tour: {
    name: "Viktor Tour",
    points: {
      no: ["3-dels", "Kompresjon 88", "Mykere følelse", "Fokus på feel, spinn og kontroll"],
      en: ["Three-piece", "Compression 88", "Softer feel", "Focus on feel, spin and control"],
    },
  },
  tourx: {
    name: "Viktor Tour X",
    points: {
      no: ["4-dels", "Kompresjon 91", "Fastere respons", "Fokus på ballhastighet, respons og kontroll"],
      en: [
        "Four-piece",
        "Compression 91",
        "Firmer response",
        "Focus on ball speed, response and control",
      ],
    },
  },
} satisfies Record<string, { name: string; points: CopyList }>;

function CompareCard({
  variant,
  active,
  locale,
  href,
  cta,
}: {
  variant: "tour" | "tourx";
  active: boolean;
  locale: Locale;
  href: string;
  cta: string;
}) {
  const card = compareCards[variant];
  const points = pick(card.points, locale);

  return (
    <div
      className={`flex flex-col rounded-(--radius-card) border bg-paper p-6 sm:p-8 ${
        active ? "border-pine ring-1 ring-pine" : "border-line"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-xl font-semibold text-ink">{card.name}</h3>
        {active ? (
          <Badge tone="pine" className="text-[0.68rem] uppercase tracking-[0.12em]">
            {pick(copy.thisBall, locale)}
          </Badge>
        ) : null}
      </div>
      <ul className="mt-5 space-y-2.5">
        {points.map((point) => (
          <li key={point} className="flex gap-3 text-base text-ink-soft">
            <CheckIcon className="mt-1 h-4.5 w-4.5 shrink-0 text-pine" />
            {point}
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <ButtonLink
          href={href}
          variant={active ? "secondary" : "primary"}
          className="w-full justify-center sm:w-auto"
        >
          {cta}
        </ButtonLink>
      </div>
    </div>
  );
}

export function ViktorShowcase({
  product,
  category,
  locale,
  dict,
}: {
  product: Product;
  category: Category;
  locale: Locale;
  dict: Dictionary;
}) {
  const name = pick(product.name, locale);
  const highlights = pick(product.highlights, locale);
  const isTourX = product.slug === TOURX_SLUG;
  const quoteHref = routes.quote(locale, product.slug);
  const contactHref = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(name)}`;
  const tourHref = routes.product(locale, TOUR_SLUG);
  const tourXHref = routes.product(locale, TOURX_SLUG);

  return (
    <>
      {/* Hero */}
      <Container size="wide" className="py-8 sm:py-12">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          <div className="flex flex-col justify-center">
            <p
              className="mb-3 text-xs font-semibold uppercase tracking-[0.18em]"
              style={{ color: category.accent }}
            >
              {pick(category.name, locale)}
            </p>
            <h1 className="text-4xl font-semibold text-balance text-ink sm:text-5xl">{name}</h1>

            {product.audience.length > 0 ? (
              <div className="mt-5 flex flex-wrap gap-2">
                {product.audience.map((entry) => (
                  <Badge key={entry} tone="neutral">
                    {dict.audience[entry]}
                  </Badge>
                ))}
              </div>
            ) : null}

            <p className="mt-6 text-lg leading-relaxed text-ink-soft">
              {pick(product.tagline, locale)}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={quoteHref} size="lg">
                {pick(copy.quoteCta, locale)}
              </ButtonLink>
              <ButtonLink href={contactHref} variant="secondary" size="lg">
                {CONTACT_EMAIL}
              </ButtonLink>
            </div>
          </div>

          <ProductGallery
            images={product.images.length > 0 ? product.images : [{ alt: product.name }]}
            accent={category.accent}
            icon={category.icon}
            locale={locale}
            dict={dict}
          />
        </div>
      </Container>

      {/* Hovedfordeler */}
      <div className="border-y border-line bg-sand">
        <Container size="wide" className="py-14 sm:py-20">
          <h2 className="text-2xl font-semibold text-ink sm:text-3xl">
            {pick(copy.featuresHeading, locale)}
          </h2>
          <ul className="mt-8 grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
            {highlights.map((highlight) => (
              <li key={highlight} className="flex gap-3 text-base leading-relaxed text-ink-soft">
                <CheckIcon className="mt-1 h-4.5 w-4.5 shrink-0 text-pine" />
                {highlight}
              </li>
            ))}
          </ul>
        </Container>
      </div>

      {/* Spillkarakter */}
      <Container size="wide" className="py-16 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <p
              className="mb-3 text-xs font-semibold uppercase tracking-[0.18em]"
              style={{ color: category.accent }}
            >
              {pick(copy.characterEyebrow, locale)}
            </p>
            <h2 className="text-3xl font-semibold text-balance text-ink sm:text-4xl">
              {pick(copy.characterHeading, locale)}
            </h2>
          </div>
          <Prose>
            {pick(product.description, locale).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Prose>
        </div>
      </Container>

      {/* Tekniske spesifikasjoner */}
      <div className="border-y border-line bg-sand">
        <Container size="wide" className="py-16 sm:py-24">
          <p
            className="mb-3 text-xs font-semibold uppercase tracking-[0.18em]"
            style={{ color: category.accent }}
          >
            {pick(copy.specsEyebrow, locale)}
          </p>
          <h2 className="text-3xl font-semibold text-balance text-ink sm:text-4xl">
            {pick(copy.specsHeading, locale)}
          </h2>
          <dl className="mt-8 max-w-2xl divide-y divide-line border-y border-line">
            {product.specs.map((spec) => (
              <div key={pick(spec.label, locale)} className="flex justify-between gap-6 py-3.5">
                <dt className="text-sm font-medium text-ink-muted">{pick(spec.label, locale)}</dt>
                <dd className="text-right text-sm font-semibold text-ink">
                  {pick(spec.value, locale)}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </div>

      {/* Sammenligning */}
      <Container size="wide" className="py-16 sm:py-24">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold text-balance text-ink sm:text-4xl">
            {pick(copy.compareHeading, locale)}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            {pick(copy.compareIntro, locale)}
          </p>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <CompareCard
            variant="tour"
            active={!isTourX}
            locale={locale}
            href={tourHref}
            cta={pick(copy.seeTour, locale)}
          />
          <CompareCard
            variant="tourx"
            active={isTourX}
            locale={locale}
            href={tourXHref}
            cta={pick(copy.seeTourX, locale)}
          />
        </div>
      </Container>

      {/* CTA */}
      <div className="bg-pine text-paper">
        <Container size="wide" className="py-16 text-center sm:py-20">
          <h2 className="mx-auto max-w-2xl text-balance text-3xl font-semibold leading-tight sm:text-4xl">
            {pick(copy.ctaHeading, locale)}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-paper/85 sm:text-lg">
            {pick(copy.ctaBody, locale)}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href={quoteHref} variant="onPine" size="lg">
              {pick(copy.quoteCta, locale)}
            </ButtonLink>
            <ButtonLink
              href={contactHref}
              size="lg"
              className="bg-transparent text-paper ring-1 ring-inset ring-paper/50 hover:bg-paper/10"
            >
              {CONTACT_EMAIL}
            </ButtonLink>
          </div>
        </Container>
      </div>
    </>
  );
}
