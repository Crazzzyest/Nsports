import Image from "next/image";

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
const MARKING_SRC = "/bilder/produkter/rangeballer-merking.jpg";

const copy = {
  melandBadge: {
    no: "Testet i daglig drift ved Meland Golfklubb",
    en: "Tested in daily operation at Meland Golfklubb",
  },
  quoteCta: { no: "Be om tilbud", en: "Request a quote" },
  featuresHeading: { no: "Hovedfordeler", en: "Key benefits" },

  aboutEyebrow: { no: "Om produktet", en: "About the product" },
  aboutHeading: {
    no: "Slitesterk rangeball med god økonomi",
    en: "A durable range ball with good economics",
  },

  variantsEyebrow: { no: "Varianter og profilering", en: "Versions and branding" },
  variantsHeading: {
    no: "Med eller uten klubblogo",
    en: "With or without a club logo",
  },
  markingCaption: {
    no: "Illustrasjon: eksempler på merking og profilering av rangeballer.",
    en: "Illustration: examples of marking and branding of range balls.",
  },
  markingAlt: {
    no: "Gule og hvite rangeballer presentert som produktutvalg for driving range.",
    en: "Yellow and white range balls presented as a product range for a driving range.",
  },

  specsEyebrow: { no: "Teknisk", en: "Technical" },
  specsHeading: { no: "Mål og spesifikasjoner", en: "Dimensions and specifications" },

  devTag: { no: "Under utvikling", en: "In development" },
  devHeading: {
    no: "Limited flight for kortere driving ranger",
    en: "Limited flight for shorter driving ranges",
  },
  devBody: {
    no: "Vi undersøker høsten 2026 muligheten for å tilby en egen limited flight-rangeball for kortere driving ranger. Denne balltypen skal ha redusert lengde og gjøre det enklere å utnytte kompakte treningsområder på en trygg og effektiv måte.",
    en: "In the autumn of 2026 we are exploring the possibility of offering a dedicated limited flight range ball for shorter driving ranges. This ball type will have reduced length and make it easier to use compact practice areas in a safe and efficient way.",
  },
  devBody2: {
    no: "Er klubben interessert i en slik løsning, kan dere gjerne ta kontakt med oss. Tilbakemeldinger fra norske golfanlegg vil være nyttige i det videre produktarbeidet.",
    en: "If your club is interested in such a solution, please feel free to get in touch. Feedback from Norwegian golf facilities will be useful in the further product work.",
  },

  ctaHeading: {
    no: "Interessert i rangeballer til ditt anlegg?",
    en: "Interested in range balls for your facility?",
  },
  ctaBody: {
    no: "Vi gir tilbud basert på antall, ønsket merking og leveringssted. Ta kontakt for pris, leveringstid og informasjon om profilering med klubbens logo. Vi svarer normalt innen én virkedag.",
    en: "We provide a quote based on quantity, desired marking and delivery location. Get in touch for price, delivery time and information about branding with the club's logo. We normally reply within one working day.",
  },
} satisfies Record<string, Copy | CopyList>;

type ProfileVariant = {
  title: Copy;
  description: Copy;
  features: Copy[];
};

const profileVariants: ProfileVariant[] = [
  {
    title: { no: "Uten klubblogo", en: "Without a club logo" },
    description: {
      no: "Leveres med standard rangeballmerking og er et godt valg for klubber som ønsker en enkel og prisgunstig løsning.",
      en: "Delivered with standard range ball marking and a good choice for clubs that want a simple, cost-effective solution.",
    },
    features: [
      { no: "Standard rangeballmerking", en: "Standard range ball marking" },
      { no: "Én eller to markeringsstriper", en: "One or two marking stripes" },
    ],
  },
  {
    title: { no: "Med klubblogo", en: "With a club logo" },
    description: {
      no: "Ballene kan profileres med golfklubbens egen logo. Dette gir et mer profesjonelt og helhetlig uttrykk på treningsanlegget.",
      en: "The balls can be branded with the golf club's own logo. This gives a more professional and cohesive look at the practice facility.",
    },
    features: [
      { no: "Minsteantall med egen logo: 10 000 baller", en: "Minimum order with own logo: 10,000 balls" },
      { no: "Logo leveres som trykklar fil", en: "Logo supplied as a print-ready file" },
      { no: "Mulighet for én eller to markeringsstriper", en: "Option of one or two marking stripes" },
    ],
  },
];

export function RangeballShowcase({
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
                {pick(copy.melandBadge, locale)}
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

      {/* Varianter og profilering */}
      <div className="border-y border-line bg-sand">
        <Container size="wide" className="py-16 sm:py-24">
          <div className="max-w-2xl">
            <p
              className="mb-3 text-xs font-semibold uppercase tracking-[0.18em]"
              style={{ color: category.accent }}
            >
              {pick(copy.variantsEyebrow, locale)}
            </p>
            <h2 className="text-3xl font-semibold text-balance text-ink sm:text-4xl">
              {pick(copy.variantsHeading, locale)}
            </h2>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {profileVariants.map((variant) => (
              <div
                key={pick(variant.title, locale)}
                className="flex flex-col rounded-(--radius-card) border border-line bg-paper p-6 sm:p-8"
              >
                <h3 className="text-xl font-semibold text-ink">{pick(variant.title, locale)}</h3>
                <p className="mt-3 text-base leading-relaxed text-ink-soft">
                  {pick(variant.description, locale)}
                </p>
                <ul className="mt-5 space-y-2.5">
                  {variant.features.map((feature) => (
                    <li key={pick(feature, locale)} className="flex gap-3 text-sm text-ink-soft">
                      <CheckIcon className="mt-0.5 h-4.5 w-4.5 shrink-0 text-pine" />
                      {pick(feature, locale)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <figure className="mx-auto mt-12 max-w-2xl">
            <div className="overflow-hidden rounded-(--radius-card) border border-line bg-white p-4 sm:p-6">
              <Image
                src={MARKING_SRC}
                alt={pick(copy.markingAlt, locale)}
                width={1168}
                height={1346}
                sizes="(min-width: 768px) 640px, 100vw"
                className="h-auto w-full"
              />
            </div>
            <figcaption className="mt-3 text-sm text-ink-muted">
              {pick(copy.markingCaption, locale)}
            </figcaption>
          </figure>
        </Container>
      </div>

      {/* Mål og spesifikasjoner */}
      {product.specs.length > 0 ? (
        <Container size="wide" className="py-16 sm:py-24">
          <div className="max-w-2xl">
            <p
              className="mb-3 text-xs font-semibold uppercase tracking-[0.18em]"
              style={{ color: category.accent }}
            >
              {pick(copy.specsEyebrow, locale)}
            </p>
            <h2 className="text-3xl font-semibold text-balance text-ink sm:text-4xl">
              {pick(copy.specsHeading, locale)}
            </h2>
          </div>
          <dl className="mt-8 grid max-w-3xl gap-x-10 sm:grid-cols-2">
            {product.specs.map((spec) => (
              <div
                key={pick(spec.label, locale)}
                className="grid grid-cols-2 gap-4 border-b border-line py-3"
              >
                <dt className="text-sm text-ink-muted">{pick(spec.label, locale)}</dt>
                <dd className="text-sm font-medium text-ink">{pick(spec.value, locale)}</dd>
              </div>
            ))}
          </dl>
        </Container>
      ) : null}

      {/* Under utvikling: limited flight */}
      <div className="border-y border-line bg-sand">
        <Container size="wide" className="py-14 sm:py-16">
          <div className="mx-auto max-w-3xl rounded-(--radius-card) border border-dashed border-line bg-paper p-6 sm:p-8">
            <Badge tone="brass" className="gap-1.5 px-3 py-1.5 text-[0.72rem] uppercase tracking-[0.14em]">
              {pick(copy.devTag, locale)}
            </Badge>
            <h2 className="mt-4 text-2xl font-semibold text-ink sm:text-3xl">
              {pick(copy.devHeading, locale)}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              {pick(copy.devBody, locale)}
            </p>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              {pick(copy.devBody2, locale)}
            </p>
          </div>
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
