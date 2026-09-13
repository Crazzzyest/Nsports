import { CheckIcon, ShieldIcon, TagIcon } from "@/components/icons";
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
  audiencesHeading: { no: "Målgrupper", en: "Target groups" },
  audiences: {
    no: ["Golfklubb og anlegg", "Proshop", "Privatkunde"],
    en: ["Golf clubs and facilities", "Pro shop", "Private customers"],
  },
  featuresHeading: { no: "Hovedfordeler", en: "Key benefits" },

  aboutEyebrow: { no: "Om produktet", en: "About the product" },
  aboutHeading: {
    no: "Prisgunstige golfsko for norske forhold",
    en: "Cost-effective golf shoes for Norwegian conditions",
  },

  boaEyebrow: { no: "Salgsargument", en: "Selling point" },
  boaHeading: {
    no: "BOA-snøring på alle modeller",
    en: "BOA lacing on every model",
  },
  boaBody: {
    no: [
      "Alle modellene leveres med BOA-snøring. Med et enkelt vrid på hjulet strammes eller løsnes skoen jevnt, og passformen kan justeres raskt gjennom hele runden.",
      "Kombinert med den spikefrie sålen gir dette god komfort og godt grep på banen, samtidig som skoene fungerer fint også utenfor golfbanen.",
    ],
    en: [
      "Every model comes with BOA lacing. A simple turn of the dial tightens or loosens the shoe evenly, and the fit can be adjusted quickly throughout the round.",
      "Combined with the spikeless outsole, this gives good comfort and good grip on the course, while the shoes also work well off the golf course.",
    ],
  },

  variantsEyebrow: { no: "Varianter", en: "Variants" },
  variantsHeading: { no: "Modeller og farger", en: "Models and colours" },

  specsEyebrow: { no: "Teknisk", en: "Technical" },
  specsHeading: { no: "Produktinformasjon", en: "Product information" },

  ctaHeading: {
    no: "Interessert i dette produktet?",
    en: "Interested in this product?",
  },
  ctaBody: {
    no: "Vi gir pris ut fra antall og leveringssted, og svarer normalt innen én virkedag.",
    en: "We provide a price based on quantity and delivery location, and normally reply within one working day.",
  },
} satisfies Record<string, Copy | CopyList>;

export function GolfskoShowcase({
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
  const audiences = pick(copy.audiences, locale);
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
                {pick({ no: "BOA-snøring på alle modeller", en: "BOA lacing on every model" }, locale)}
              </Badge>
            </div>

            <p className="mt-6 text-lg leading-relaxed text-ink-soft">
              {pick(product.tagline, locale)}
            </p>

            <div className="mt-7">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted">
                {pick(copy.audiencesHeading, locale)}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {audiences.map((audience) => (
                  <Badge key={audience} tone="neutral" className="px-3 py-1.5 text-[0.78rem]">
                    {audience}
                  </Badge>
                ))}
              </div>
            </div>

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

      {/* BOA – fremhevet salgsargument */}
      <div className="bg-pine text-paper">
        <Container size="wide" className="py-16 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
            <div>
              <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-paper/70">
                <TagIcon className="h-4 w-4" />
                {pick(copy.boaEyebrow, locale)}
              </p>
              <h2 className="text-3xl font-semibold text-balance leading-tight sm:text-4xl">
                {pick(copy.boaHeading, locale)}
              </h2>
            </div>
            <div className="space-y-5">
              {pick(copy.boaBody, locale).map((paragraph) => (
                <p key={paragraph} className="text-base leading-relaxed text-paper/85 sm:text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </Container>
      </div>

      {/* Varianter */}
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
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {product.variants.map((variant) => (
            <li
              key={pick(variant.name, locale)}
              className="rounded-lg border border-line bg-sand px-5 py-4 text-base font-medium text-ink"
            >
              {pick(variant.name, locale)}
            </li>
          ))}
        </ul>
      </Container>

      {/* Produktinformasjon */}
      <div className="border-y border-line bg-sand">
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
                <dd className="text-right text-sm font-medium text-ink">
                  {pick(spec.value, locale)}
                </dd>
              </div>
            ))}
          </dl>
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
