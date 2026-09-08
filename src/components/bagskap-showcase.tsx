import Link from "next/link";

import { CheckIcon, DownloadIcon, ShieldIcon, TagIcon } from "@/components/icons";
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
  audienceBadge: { no: "For golfklubb og anlegg", en: "For golf clubs and facilities" },
  quoteCta: { no: "Be om tilbud", en: "Request a quote" },
  featuresHeading: { no: "Hovedfordeler", en: "Key benefits" },

  aboutEyebrow: { no: "Om produktet", en: "About the product" },
  aboutHeading: {
    no: "Trygg oppbevaring for golfutstyret",
    en: "Secure storage for golf equipment",
  },

  incomeEyebrow: { no: "For klubben", en: "For the club" },
  incomeHeading: {
    no: "Mer medlemsservice og nye leieinntekter",
    en: "More member service and new rental income",
  },
  incomeBody: {
    no: [
      "Utleie av bagskap gir medlemmene en praktisk tjeneste og klubben en stabil inntektskilde. Når skapene først er montert, krever ordningen lite daglig oppfølging.",
      "Klubben kan leie ut hvert skap for en sesong eller for et helt år. Med kodehengelås slipper medlemmet å være avhengig av nøkkelutlevering fra klubbens ansatte.",
      "Bagskapene gir dermed klubben mulighet til å kombinere bedre medlemsservice med god utnyttelse av tilgjengelig plass.",
    ],
    en: [
      "Renting out bag lockers gives members a practical service and the club a stable source of income. Once the lockers are installed, the arrangement requires little day-to-day follow-up.",
      "The club can rent out each locker for a season or for a whole year. With a combination padlock, the member does not depend on key handover from the club's staff.",
      "The bag lockers therefore let the club combine better member service with good use of the available space.",
    ],
  },

  specsEyebrow: { no: "Teknisk", en: "Technical" },
  specsHeading: { no: "Mål og spesifikasjoner", en: "Dimensions and specifications" },

  docsEyebrow: { no: "Dokumentasjon", en: "Documentation" },
  docsHeading: { no: "Dokumentasjon", en: "Documentation" },
  docsCta: { no: "Be om produktinformasjon", en: "Request product information" },

  ctaHeading: {
    no: "Interessert i bagskap til klubben?",
    en: "Interested in bag lockers for your club?",
  },
  ctaBody: {
    no: "Vi gir tilbud basert på antall og leveringssted. Ta kontakt for pris, leveringstid og mer informasjon. Vi svarer normalt innen én virkedag.",
    en: "We provide a quote based on quantity and delivery location. Get in touch for price, delivery time and more information. We normally reply within one working day.",
  },
} satisfies Record<string, Copy | CopyList>;

export function BagskapShowcase({
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
                <ShieldIcon className="h-4 w-4" />
                {pick(copy.audienceBadge, locale)}
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

      {/* En god inntektskilde – fremhevet seksjon */}
      <div className="bg-pine text-paper">
        <Container size="wide" className="py-16 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
            <div>
              <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-paper/70">
                <TagIcon className="h-4 w-4" />
                {pick(copy.incomeEyebrow, locale)}
              </p>
              <h2 className="text-3xl font-semibold text-balance leading-tight sm:text-4xl">
                {pick(copy.incomeHeading, locale)}
              </h2>
            </div>
            <div className="space-y-5">
              {pick(copy.incomeBody, locale).map((paragraph) => (
                <p key={paragraph} className="text-base leading-relaxed text-paper/85 sm:text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </Container>
      </div>

      {/* Mål og spesifikasjoner */}
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
        <dl className="mt-10 grid gap-x-12 gap-y-0 sm:grid-cols-2">
          {product.specs.map((spec) => (
            <div
              key={pick(spec.label, locale)}
              className="flex justify-between gap-6 border-b border-line py-3.5"
            >
              <dt className="text-sm text-ink-muted">{pick(spec.label, locale)}</dt>
              <dd className="text-right text-sm font-medium text-ink">{pick(spec.value, locale)}</dd>
            </div>
          ))}
        </dl>
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
