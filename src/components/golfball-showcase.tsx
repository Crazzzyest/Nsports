import { CheckIcon, TagIcon, TargetIcon } from "@/components/icons";
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
  melandBadge: {
    no: "Testet og solgt i proshopen ved Meland Golfklubb",
    en: "Tested and sold in the pro shop at Meland Golfklubb",
  },
  quoteCta: { no: "Be om tilbud", en: "Request a quote" },
  featuresHeading: { no: "Hovedfordeler", en: "Key benefits" },

  interestHeading: { no: "Interessert i dette produktet?", en: "Interested in this product?" },
  interestBody: {
    no: "Vi gir pris ut fra antall og leveringssted, og svarer normalt innen én virkedag.",
    en: "We provide a price based on quantity and delivery location, and normally reply within one working day.",
  },

  aboutEyebrow: { no: "Proshop-økonomi", en: "Pro shop economics" },
  aboutHeading: {
    no: "Et interessant alternativ for proshopen",
    en: "An interesting alternative for the pro shop",
  },

  variantsEyebrow: { no: "Varianter", en: "Variants" },
  variantsHeading: { no: "Tilgjengelige varianter", en: "Available variants" },
  variantsNote: {
    no: "Minimumsantall for bestilling med egen klubblogo avklares og vil bli oppdatert.",
    en: "The minimum order quantity for orders with your own club logo is being clarified and will be updated.",
  },

  specsEyebrow: { no: "Produktinformasjon", en: "Product information" },
  specsHeading: { no: "Produktinformasjon", en: "Product information" },
  specsNote: {
    no: "Kompresjon og øvrige tekniske spesifikasjoner oppdateres når endelige produktdata er bekreftet.",
    en: "Compression and other technical specifications will be updated once final product data is confirmed.",
  },

  ctaHeading: {
    no: "Interessert i premium golfball til proshopen?",
    en: "Interested in a premium golf ball for the pro shop?",
  },
  ctaBody: {
    no: "Vi gir pris ut fra antall og leveringssted, og svarer normalt innen én virkedag. Ta kontakt for mer informasjon om varianter og profilering med klubbens egen logo.",
    en: "We provide a price based on quantity and delivery location, and normally reply within one working day. Get in touch for more information about variants and branding with the club's own logo.",
  },
} satisfies Record<string, Copy | CopyList>;

export function GolfballShowcase({
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
  const contactHref = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Premium golfball")}`;

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

      {/* Hovedfordeler + interesse */}
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
          <div className="mt-10 max-w-2xl rounded-(--radius-card) border border-line bg-paper p-6 sm:p-8">
            <h3 className="text-lg font-semibold text-ink">{pick(copy.interestHeading, locale)}</h3>
            <p className="mt-3 text-base leading-relaxed text-ink-soft">
              {pick(copy.interestBody, locale)}
            </p>
            <div className="mt-5">
              <ButtonLink href={quoteHref}>{pick(copy.quoteCta, locale)}</ButtonLink>
            </div>
          </div>
        </Container>
      </div>

      {/* Proshop-økonomi */}
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
          <ul className="mt-8 flex flex-wrap gap-3">
            {product.variants.map((variant) => (
              <li
                key={pick(variant.name, locale)}
                className="rounded-full border border-line bg-paper px-4 py-2 text-sm font-medium text-ink"
              >
                {pick(variant.name, locale)}
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-ink-muted">
            {pick(copy.variantsNote, locale)}
          </p>
        </Container>
      </div>

      {/* Produktinformasjon */}
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
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-ink-muted">
          {pick(copy.specsNote, locale)}
        </p>
      </Container>

      {/* CTA */}
      <div className="bg-pine text-paper">
        <Container size="wide" className="py-16 text-center sm:py-20">
          <div className="mx-auto mb-5 flex w-fit items-center gap-1.5 rounded-full bg-paper/10 px-3 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-paper/90">
            <TagIcon className="h-4 w-4" />
            {pick(copy.aboutEyebrow, locale)}
          </div>
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
