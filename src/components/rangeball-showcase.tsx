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
  melandBadge: {
    no: "Testet i daglig bruk ved Meland Golfklubb",
    en: "Tested in daily use at Meland Golfklubb",
  },
  quoteCta: { no: "Be om tilbud", en: "Request a quote" },
  featuresHeading: { no: "Hovedfordeler", en: "Key benefits" },

  aboutEyebrow: { no: "Om produktet", en: "About the product" },
  aboutHeading: {
    no: "Slitesterk rangeball med god økonomi",
    en: "A durable range ball with good economics",
  },

  brandingEyebrow: { no: "Profilering", en: "Branding" },
  brandingHeading: {
    no: "Rangeballer med klubbens egen logo",
    en: "Range balls with the club's own logo",
  },
  brandingBody: {
    no: "Gi driving rangen et helhetlig og profesjonelt uttrykk med rangeballer profilert med klubbens egen logo.",
    en: "Give the driving range a cohesive and professional look with range balls branded with the club's own logo.",
  },
  brandingPoints: {
    no: [
      "Minsteantall med logo: 10 000 baller",
      "Pris gis på forespørsel",
      "Levering beregnes ut fra antall og leveringssted",
    ],
    en: [
      "Minimum order with logo: 10,000 balls",
      "Price on request",
      "Delivery is calculated based on quantity and delivery location",
    ],
  },

  devTag: { no: "Under vurdering", en: "Under consideration" },
  devHeading: {
    no: "Limited flight for kortere driving ranger",
    en: "Limited flight for shorter driving ranges",
  },
  devBody: {
    no: "Vi undersøker høsten 2026 muligheten for å tilby en limited flight-rangeball for golfklubber med kortere driving ranger.",
    en: "In the autumn of 2026 we are exploring the possibility of offering a limited flight range ball for golf clubs with shorter driving ranges.",
  },
  devBody2: {
    no: "Er dette aktuelt for deres anlegg, ønsker vi gjerne å høre fra dere. Tilbakemeldinger fra norske golfklubber vil være nyttige når vi vurderer behovet i markedet.",
    en: "If this is relevant for your facility, we would be glad to hear from you. Feedback from Norwegian golf clubs will be useful when we assess the need in the market.",
  },
  devNote: {
    no: "Limited flight-ballen er ikke lansert og kan ikke bestilles ennå.",
    en: "The limited flight ball has not been launched and cannot yet be ordered.",
  },

  ctaHeading: {
    no: "Interessert i rangeballer til ditt anlegg?",
    en: "Interested in range balls for your facility?",
  },
  ctaBody: {
    no: "Vi gir tilbud basert på antall, ønsket merking og leveringssted. Ta kontakt for mer informasjon om levering og profilering med klubbens egen logo. Vi svarer normalt innen én virkedag.",
    en: "We provide a quote based on quantity, desired marking and delivery location. Get in touch for more information about delivery and branding with the club's own logo. We normally reply within one working day.",
  },
} satisfies Record<string, Copy | CopyList>;

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

      {/* Profilering med klubblogo */}
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
            <ul className="mt-6 space-y-3">
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

      {/* Under vurdering: limited flight */}
      <Container size="wide" className="py-14 sm:py-16">
        <div className="mx-auto max-w-3xl rounded-(--radius-card) border border-dashed border-line bg-sand p-6 sm:p-8">
          <Badge
            tone="brass"
            className="gap-1.5 px-3 py-1.5 text-[0.72rem] uppercase tracking-[0.14em]"
          >
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
          <p className="mt-5 text-sm font-medium text-ink-muted">{pick(copy.devNote, locale)}</p>
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
