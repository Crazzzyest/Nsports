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

const copy = {
  quoteCta: { no: "Be om tilbud", en: "Request a quote" },
  featuresHeading: { no: "Hovedfordeler", en: "Key benefits" },

  aboutEyebrow: { no: "Om produktet", en: "About the product" },
  aboutHeading: {
    no: "Bygget for daglig bruk på driving range",
    en: "Built for daily use on the driving range",
  },

  brandingEyebrow: { no: "Profilering", en: "Branding" },
  brandingHeading: {
    no: "Profilering med klubb- eller sponsorlogo",
    en: "Branding with a club or sponsor logo",
  },
  brandingBody: {
    no: [
      "Rangeballene kan leveres med klubbens egen logo, sponsorlogo eller annen profilering.",
      "Dette gir golfklubber en enkel og synlig mulighet til å profilere både egen merkevare og samarbeidspartnere direkte på driving rangen.",
      "Logo kan trykkes i opptil 5 farger, med flere mulige trykkposisjoner på ballen.",
    ],
    en: [
      "The range balls can be delivered with the club's own logo, a sponsor logo or other branding.",
      "This gives golf clubs a simple and visible way to promote both their own brand and their partners directly on the driving range.",
      "The logo can be printed in up to 5 colours, with several possible print positions on the ball.",
    ],
  },
  brandingOptionsHeading: {
    no: "Eksempler på profilering",
    en: "Branding examples",
  },
  brandingOptions: {
    no: [
      "Rangeball-tekst",
      "Sorte sikte- og markeringslinjer",
      "Klubblogo",
      "Sponsorlogo",
      "Hvite og gule baller",
    ],
    en: [
      "Range ball text",
      "Black sight and alignment lines",
      "Club logo",
      "Sponsor logo",
      "White and yellow balls",
    ],
  },

  specsEyebrow: { no: "Tekniske spesifikasjoner", en: "Technical specifications" },
  specsHeading: { no: "Tekniske spesifikasjoner", en: "Technical specifications" },

  logoEyebrow: { no: "Logo og tilpasning", en: "Logo and customisation" },
  logoHeading: { no: "Logo og tilpasning", en: "Logo and customisation" },
  logoNote: {
    no: "Ta kontakt for informasjon om logo, minimumsantall og tilbud.",
    en: "Get in touch for information about logo, minimum order and a quote.",
  },

  ctaHeading: {
    no: "Interessert i rangeballer til klubben?",
    en: "Interested in range balls for your club?",
  },
  ctaBody: {
    no: "Vi leverer rangeballer til golfklubber og anlegg med mulighet for egen logo og sponsorprofilering. Pris beregnes ut fra antall, profilering og leveringssted.",
    en: "We supply range balls to golf clubs and facilities with the option of your own logo and sponsor branding. The price is calculated based on quantity, branding and delivery location.",
  },
} satisfies Record<string, Copy | CopyList>;

const logoSpecs = [
  {
    label: { no: "Logo", en: "Logo" },
    value: { no: "Klubb-, sponsor- eller firmalogo", en: "Club, sponsor or company logo" },
  },
  { label: { no: "Antall farger", en: "Number of colours" }, value: { no: "Opptil 5", en: "Up to 5" } },
  {
    label: { no: "Maks anbefalt logobredde", en: "Max recommended logo width" },
    value: { no: "23 mm", en: "23 mm" },
  },
  { label: { no: "Trykkposisjoner", en: "Print positions" }, value: { no: "Opptil 4", en: "Up to 4" } },
  {
    label: { no: "Minimumsbestilling", en: "Minimum order" },
    value: { no: "6 000 baller", en: "6,000 balls" },
  },
] satisfies { label: Copy; value: Copy }[];

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
  const brandingBody = pick(copy.brandingBody, locale);
  const brandingOptions = pick(copy.brandingOptions, locale);
  const quoteHref = routes.quote(locale, product.slug);
  const contactHref = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(name)}`;

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

      {/* Bygget for daglig bruk */}
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

      {/* Profilering */}
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
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:gap-10">
            <Prose>
              {brandingBody.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </Prose>
            <div className="rounded-(--radius-card) border border-line bg-paper p-6 sm:p-8">
              <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-ink-muted">
                {pick(copy.brandingOptionsHeading, locale)}
              </h3>
              <ul className="mt-5 space-y-3">
                {brandingOptions.map((option) => (
                  <li key={option} className="flex gap-3 text-base text-ink-soft">
                    <CheckIcon className="mt-1 h-4.5 w-4.5 shrink-0 text-pine" />
                    {option}
                  </li>
                ))}
              </ul>
            </div>
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

      {/* Logo og tilpasning */}
      <div className="border-y border-line bg-sand">
        <Container size="wide" className="py-16 sm:py-24">
          <p
            className="mb-3 text-xs font-semibold uppercase tracking-[0.18em]"
            style={{ color: category.accent }}
          >
            {pick(copy.logoEyebrow, locale)}
          </p>
          <h2 className="text-3xl font-semibold text-balance text-ink sm:text-4xl">
            {pick(copy.logoHeading, locale)}
          </h2>
          <dl className="mt-8 max-w-2xl divide-y divide-line border-y border-line">
            {logoSpecs.map((spec) => (
              <div key={pick(spec.label, locale)} className="flex justify-between gap-6 py-3.5">
                <dt className="text-sm font-medium text-ink-muted">{pick(spec.label, locale)}</dt>
                <dd className="text-right text-sm font-semibold text-ink">
                  {pick(spec.value, locale)}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-soft">
            {pick(copy.logoNote, locale)}
          </p>
        </Container>
      </div>

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
