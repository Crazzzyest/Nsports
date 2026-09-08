import Image from "next/image";
import Link from "next/link";

import { CheckIcon, DownloadIcon, TargetIcon } from "@/components/icons";
import { Badge, ButtonLink, Container, Prose } from "@/components/layout-primitives";
import { ProductGallery } from "@/components/product-gallery";
import type { Category, Product } from "@/lib/content/types";
import { pick, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { routes } from "@/lib/i18n/routes";

type Copy = { no: string; en: string };
type CopyList = { no: string[]; en: string[] };

const CONTACT_EMAIL = "frank@nsports.no";
const ILLUSTRATION_SRC = "/bilder/produkter/rangematte-oppbygning.png";

const copy = {
  melandBadge: {
    no: "Grundig testet ved Meland Golfklubb",
    en: "Thoroughly tested at Meland Golfklubb",
  },
  quoteCta: { no: "Be om tilbud", en: "Request a quote" },
  featuresHeading: { no: "Hovedfordeler", en: "Key benefits" },

  aboutEyebrow: { no: "Om produktet", en: "About the product" },
  aboutHeading: {
    no: "Slitesterk matte med god spillefølelse",
    en: "A durable mat with a good playing feel",
  },

  variantsEyebrow: { no: "Varianter", en: "Versions" },
  variantsHeading: { no: "To varianter for ulike behov", en: "Two versions for different needs" },

  buildEyebrow: { no: "Teknisk", en: "Technical" },
  buildHeading: { no: "Mål og oppbygning", en: "Dimensions and construction" },
  buildCaption: {
    no: "Teknisk illustrasjon av standardmatten på 150 × 150 cm.",
    en: "Technical illustration of the standard mat at 150 × 150 cm.",
  },
  buildAlt: {
    no: "Teknisk tegning av rangematte på 150 × 150 cm med nylongress, dempende 3D-fjæringslag og NBR-gummibunn.",
    en: "Technical drawing of a 150 × 150 cm range mat with nylon grass, a cushioning 3D suspension layer and an NBR rubber base.",
  },
  buildBody: {
    no: "Standardmatten er bygget opp av tre lag: 10 mm NBR-gummi i bunnen, et 10 mm dempende 3D-fjæringslag og 15 mm slitesterkt nylongress. Samlet gir dette en stabil rangematte med god støtdemping og en behagelig spillefølelse.",
    en: "The standard mat is built up of three layers: 10 mm NBR rubber at the base, a 10 mm cushioning 3D suspension layer and 15 mm hard-wearing nylon grass. Together this makes a stable range mat with good shock absorption and a comfortable playing feel.",
  },
  enlargeHint: { no: "Klikk for større format", en: "Click to enlarge" },

  docsEyebrow: { no: "Dokumentasjon", en: "Documentation" },
  docsHeading: { no: "Dokumentasjon", en: "Documentation" },
  docsCta: { no: "Be om produktark", en: "Request a product sheet" },

  ctaHeading: {
    no: "Interessert i rangematter til ditt anlegg?",
    en: "Interested in range mats for your facility?",
  },
  ctaBody: {
    no: "Vi hjelper dere med å velge riktig variant og gir tilbud basert på antall og leveringssted. Ta kontakt for pris, leveringstid og produktinformasjon. Vi svarer normalt innen én virkedag.",
    en: "We help you choose the right version and provide a quote based on quantity and delivery location. Get in touch for price, delivery time and product information. We normally reply within one working day.",
  },
} satisfies Record<string, Copy | CopyList>;

type VariantSpec = { label: Copy; value: Copy };
type ShowVariant = {
  title: Copy;
  description: Copy;
  specs: VariantSpec[];
  features: Copy[];
};

const variants: ShowVariant[] = [
  {
    title: { no: "Standard rangematte", en: "Standard range mat" },
    description: {
      no: "Slitesterk rangematte med fast nylonoverflate, solid NBR-gummibunn og et eget dempende fjæringssystem. Et godt valg for driving ranger og golfanlegg med stor aktivitet.",
      en: "A durable range mat with a firm nylon surface, a solid NBR rubber base and its own cushioning suspension system. A good choice for driving ranges and golf facilities with high activity.",
    },
    specs: [
      { label: { no: "Størrelse", en: "Size" }, value: { no: "150 × 150 cm", en: "150 × 150 cm" } },
      { label: { no: "Topplag", en: "Top layer" }, value: { no: "15 mm nylongress", en: "15 mm nylon grass" } },
      {
        label: { no: "Fjæringssystem", en: "Suspension system" },
        value: { no: "10 mm dempende 3D-lag", en: "10 mm cushioning 3D layer" },
      },
      { label: { no: "Bunn", en: "Base" }, value: { no: "10 mm NBR-gummi", en: "10 mm NBR rubber" } },
      { label: { no: "Samlet høyde", en: "Total height" }, value: { no: "35 mm", en: "35 mm" } },
    ],
    features: [
      { no: "Flere hull for gummipegg", en: "Several holes for a rubber tee" },
      { no: "Kan vendes og roteres", en: "Can be turned and rotated" },
    ],
  },
  {
    title: { no: "Peggbar rangematte", en: "Tee-through range mat" },
    description: {
      no: "En tykkere variant hvor spilleren kan plassere en vanlig golfpeg direkte i kunstgresset. Dette gir større frihet til å variere peggehøyden og skaper en mer naturlig treningsopplevelse.",
      en: "A thicker version where the player can place an ordinary golf tee directly in the artificial grass. This gives greater freedom to vary the tee height and creates a more natural practice experience.",
    },
    specs: [
      { label: { no: "Størrelse", en: "Size" }, value: { no: "150 × 150 cm", en: "150 × 150 cm" } },
      { label: { no: "Såle", en: "Sole" }, value: { no: "10 mm EVA", en: "10 mm EVA" } },
      { label: { no: "Topplag", en: "Top layer" }, value: { no: "35 mm PP-kunstgress", en: "35 mm PP artificial grass" } },
      { label: { no: "Samlet høyde", en: "Total height" }, value: { no: "45 mm", en: "45 mm" } },
    ],
    features: [
      { no: "Peggbar overflate", en: "Tee-through surface" },
      {
        no: "Egnet for både jernslag og utslag med wood og driver",
        en: "Suitable for iron shots as well as tee shots with woods and driver",
      },
    ],
  },
];

export function RangematteShowcase({
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

      {/* Varianter */}
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
            {variants.map((variant) => (
              <div
                key={pick(variant.title, locale)}
                className="flex flex-col rounded-(--radius-card) border border-line bg-paper p-6 sm:p-8"
              >
                <h3 className="text-xl font-semibold text-ink">{pick(variant.title, locale)}</h3>
                <p className="mt-3 text-base leading-relaxed text-ink-soft">
                  {pick(variant.description, locale)}
                </p>
                <dl className="mt-6 divide-y divide-line border-y border-line">
                  {variant.specs.map((spec) => (
                    <div
                      key={pick(spec.label, locale)}
                      className="grid grid-cols-2 gap-4 py-2.5"
                    >
                      <dt className="text-sm text-ink-muted">{pick(spec.label, locale)}</dt>
                      <dd className="text-sm font-medium text-ink">{pick(spec.value, locale)}</dd>
                    </div>
                  ))}
                </dl>
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
        </Container>
      </div>

      {/* Mål og oppbygning */}
      <Container size="wide" className="py-16 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p
            className="mb-3 text-xs font-semibold uppercase tracking-[0.18em]"
            style={{ color: category.accent }}
          >
            {pick(copy.buildEyebrow, locale)}
          </p>
          <h2 className="text-3xl font-semibold text-balance text-ink sm:text-4xl">
            {pick(copy.buildHeading, locale)}
          </h2>
        </div>

        <figure className="mx-auto mt-10 max-w-3xl">
          <a
            href={ILLUSTRATION_SRC}
            target="_blank"
            rel="noopener noreferrer"
            className="group block overflow-hidden rounded-(--radius-card) border border-line bg-white p-4 sm:p-6"
          >
            <Image
              src={ILLUSTRATION_SRC}
              alt={pick(copy.buildAlt, locale)}
              width={914}
              height={608}
              sizes="(min-width: 768px) 768px, 100vw"
              className="h-auto w-full"
            />
          </a>
          <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm text-ink-muted">
            <span>{pick(copy.buildCaption, locale)}</span>
            <span className="text-xs uppercase tracking-[0.12em]">
              {pick(copy.enlargeHint, locale)}
            </span>
          </figcaption>
        </figure>

        <p className="mx-auto mt-8 max-w-3xl text-base leading-relaxed text-ink-soft sm:text-lg">
          {pick(copy.buildBody, locale)}
        </p>
      </Container>

      {/* Dokumentasjon */}
      <div className="border-y border-line bg-sand">
        <Container size="wide" className="py-14 sm:py-16">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p
                className="mb-2 text-xs font-semibold uppercase tracking-[0.18em]"
                style={{ color: category.accent }}
              >
                {pick(copy.docsEyebrow, locale)}
              </p>
              <h2 className="text-2xl font-semibold text-ink">{pick(copy.docsHeading, locale)}</h2>
            </div>
            <Link
              href={quoteHref}
              className="inline-flex items-center gap-2 text-base font-medium text-pine underline-offset-4 hover:underline"
            >
              <DownloadIcon className="h-4.5 w-4.5" />
              {pick(copy.docsCta, locale)}
            </Link>
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
