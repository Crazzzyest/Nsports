import { CheckIcon, TargetIcon } from "@/components/icons";
import { Badge, ButtonLink, Container, Prose } from "@/components/layout-primitives";
import { ProductGallery } from "@/components/product-gallery";
import type { Category, Product } from "@/lib/content/types";
import { pick, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { routes } from "@/lib/i18n/routes";

type Copy = { no: string; en: string };
type CopyList = { no: string[]; en: string[] };

const CONTACT_EMAIL = "frank@nsports.no";

const copy = {
  quoteCta: { no: "Be om tilbud", en: "Request a quote" },
  featuresHeading: { no: "Hovedfordeler", en: "Key benefits" },

  aboutEyebrow: { no: "Om produktet", en: "About the product" },
  aboutHeading: {
    no: "Bygget for daglig bruk på driving range",
    en: "Built for daily use on the driving range",
  },

  brandingEyebrow: { no: "Profilering og sponsorlogo", en: "Branding and sponsor logo" },
  brandingHeading: {
    no: "Profilering og sponsorlogo",
    en: "Branding and sponsor logo",
  },
  brandingBody: {
    no: "Rangeballene kan leveres med egen klubblogo, sponsorlogo eller annen profilering. Dette gir golfklubber en ekstra mulighet til å synliggjøre samarbeidspartnere på driving rangen. Logo kan trykkes i opptil fem farger og på flere posisjoner på ballen.",
    en: "The range balls can be supplied with your own club logo, sponsor logo or other branding. This gives golf clubs an extra opportunity to make partners visible on the driving range. The logo can be printed in up to five colours and in several positions on the ball.",
  },
  brandingPoints: {
    no: [
      "Klubb- eller sponsorlogo",
      "Logo i opptil 5 farger",
      "Opptil 4 trykkposisjoner",
      "Maks anbefalt logobredde 23 mm",
      "Minimumsbestilling 6 000 baller",
    ],
    en: [
      "Club or sponsor logo",
      "Logo in up to 5 colours",
      "Up to 4 print positions",
      "Maximum recommended logo width 23 mm",
      "Minimum order 6,000 balls",
    ],
  },

  specsEyebrow: { no: "Tekniske spesifikasjoner", en: "Technical specifications" },
  specsHeading: { no: "Tekniske spesifikasjoner", en: "Technical specifications" },

  ctaHeading: { no: "Interessert i rangeballer?", en: "Interested in range balls?" },
  ctaBody: {
    no: "Vi gir pris basert på antall, profilering og leveringssted.",
    en: "We provide a price based on quantity, branding and delivery location.",
  },
} satisfies Record<string, Copy | CopyList>;

export function RangeballProShowcase({
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
  const brandingPoints = pick(copy.brandingPoints, locale);
  const quoteHref = routes.quote(locale, product.slug);
  const contactHref = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Rangeballer")}`;

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

            <div className="mt-5">
              <Badge tone="pine" className="gap-1.5 px-3 py-1.5 text-[0.78rem]">
                <TargetIcon className="h-4 w-4" />
                {dict.audience.klubb}
              </Badge>
            </div>

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

      {/* Om produktet */}
      <Container size="wide" className="py-16 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <p
              className="mb-3 text-xs font-semibold uppercase tracking-[0.18em]"
              style={{ color: category.accent }}
            >
              {pick(copy.aboutEyebrow, locale)}
            </p>
            <h2 className="text-3xl font-semibold text-balance text-ink sm:text-4xl">
              {pick(copy.aboutHeading, locale)}
            </h2>
          </div>
          <Prose>
            {pick(product.description, locale).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Prose>
        </div>
      </Container>

      {/* Profilering og sponsorlogo */}
      <div className="border-y border-line bg-sand">
        <Container size="wide" className="py-16 sm:py-24">
          <div className="max-w-2xl">
            <p
              className="mb-3 text-xs font-semibold uppercase tracking-[0.18em]"
              style={{ color: category.accent }}
            >
              {pick(copy.brandingEyebrow, locale)}
            </p>
            <h2 className="text-3xl font-semibold text-balance text-ink sm:text-4xl">
              {pick(copy.brandingHeading, locale)}
            </h2>
          </div>
          <div className="mt-8 max-w-3xl rounded-(--radius-card) border border-line bg-paper p-6 sm:p-8">
            <p className="text-base leading-relaxed text-ink-soft">
              {pick(copy.brandingBody, locale)}
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {brandingPoints.map((point) => (
                <li key={point} className="flex gap-3 text-base text-ink-soft">
                  <CheckIcon className="mt-1 h-4.5 w-4.5 shrink-0 text-pine" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </div>

      {/* Tekniske spesifikasjoner */}
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
