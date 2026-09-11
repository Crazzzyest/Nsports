import { CheckIcon, TagIcon } from "@/components/icons";
import { Badge, ButtonLink, Container, Prose } from "@/components/layout-primitives";
import { ProductGallery } from "@/components/product-gallery";
import type { Category, Product } from "@/lib/content/types";
import { pick, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { routes } from "@/lib/i18n/routes";

type Copy = { no: string; en: string };
type CopyList = { no: string[]; en: string[] };

const CONTACT_EMAIL = "frank@nsports.no";

const audienceLabels: Record<string, Copy> = {
  proshop: { no: "Proshop", en: "Pro shop" },
  privat: { no: "Privatkunde", en: "Private customer" },
  klubb: { no: "Golfklubb og anlegg", en: "Golf clubs and facilities" },
};

const teeLengths: { length: string; note: Copy }[] = [
  {
    length: "40 mm",
    note: {
      no: "En kort pegg som passer når ballen skal pegges lavt.",
      en: "A short tee suited to when the ball is to be teed low.",
    },
  },
  {
    length: "70 mm",
    note: {
      no: "En allsidig lengde som gir golfspilleren flere muligheter på utslagsstedet.",
      en: "A versatile length that gives the golfer more options on the tee.",
    },
  },
  {
    length: "85 mm",
    note: {
      no: "En lengre pegg for spillere som ønsker å pegge ballen høyere.",
      en: "A longer tee for players who want to tee the ball higher.",
    },
  },
];

const copy = {
  quoteCta: { no: "Be om tilbud", en: "Request a quote" },
  audienceLabel: { no: "For hvem", en: "For whom" },
  featuresHeading: { no: "Hovedfordeler", en: "Key benefits" },

  aboutEyebrow: { no: "Om produktet", en: "About the product" },
  aboutHeading: {
    no: "Hvitmalte trepegger til proshop og klubb",
    en: "White-painted wooden tees for pro shop and club",
  },

  teesEyebrow: { no: "Trepegger", en: "Wooden tees" },
  teesHeading: { no: "Lengder og pakning", en: "Lengths and packaging" },
  lengthsLabel: { no: "Tilgjengelige lengder", en: "Available lengths" },
  packagingLabel: { no: "Pakningsalternativer", en: "Packaging options" },
  packaging: {
    no: ["Pose med 30 pegger", "Mixpose med forskjellige lengder", "Mulighet for logotrykk"],
    en: ["Bag of 30 tees", "Mixed bag with different lengths", "Option of logo printing"],
  },

  lengthsEyebrow: { no: "Tre lengder til ulike behov", en: "Three lengths for different needs" },
  lengthsHeading: {
    no: "Velg lengden som passer spillet",
    en: "Choose the length that suits your game",
  },

  brandingEyebrow: { no: "Pegger med egen logo", en: "Tees with your own logo" },
  brandingHeading: { no: "Sett klubbens logo på peggen", en: "Put the club's logo on the tee" },
  brandingBody: {
    no: "Hvitmalte trepegger kan leveres med klubbens eller bedriftens logo. Det gjør peggene godt egnet som profilprodukt i proshop, til turneringer, sponsorarrangementer og firmagolf.",
    en: "White-painted wooden tees can be delivered with the club's or company's logo. This makes the tees well suited as a branded product in the pro shop, for tournaments, sponsor events and corporate golf.",
  },
  brandingNote: {
    no: "Ta kontakt for informasjon om trykk og antall.",
    en: "Get in touch for information about printing and quantity.",
  },

  simEyebrow: { no: "Golfsimulator", en: "Golf simulator" },
  simHeading: { no: "Plastpegger til golfsimulator", en: "Plastic tees for golf simulators" },
  simBody: {
    no: "Vi importerer plastpegger til bruk i golfsimulator. Peggene kan leveres i forskjellige lengder og utførelser, slik at golfklubben eller simulatoranlegget kan velge en løsning som passer deres behov.",
    en: "We import plastic tees for use in golf simulators. The tees can be delivered in different lengths and designs, so the golf club or simulator facility can choose a solution that suits their needs.",
  },
  simBody2: {
    no: "Ta kontakt og fortell hvilken type, lengde og hvilket antall dere trenger, så undersøker vi tilgjengelige alternativer.",
    en: "Get in touch and tell us the type, length and quantity you need, and we will look into the available options.",
  },
  simPoints: {
    no: [
      "Plastpegger til bruk i golfsimulator",
      "Kan importeres i forskjellige lengder",
      "Tilgjengelig i forskjellige utførelser",
      "Tilbud gis på forespørsel",
    ],
    en: [
      "Plastic tees for use in golf simulators",
      "Can be imported in different lengths",
      "Available in different designs",
      "Quote provided on request",
    ],
  },

  specsEyebrow: { no: "Mål og spesifikasjoner", en: "Dimensions and specifications" },
  specsHeading: { no: "Bekreftede opplysninger", en: "Confirmed details" },
  woodSpecsHeading: { no: "Trepegger", en: "Wooden tees" },
  plasticSpecsHeading: { no: "Plastpegger", en: "Plastic tees" },

  ctaHeading: {
    no: "Interessert i pegger til klubb, proshop eller simulator?",
    en: "Interested in tees for the club, pro shop or simulator?",
  },
  ctaBody: {
    no: "Vi gir tilbud basert på type, antall, ønsket pakning, eventuell logoprofilering og leveringssted. Ta kontakt for mer informasjon om tilgjengelige alternativer. Vi svarer normalt innen én virkedag.",
    en: "We provide a quote based on type, quantity, desired packaging, any logo branding and delivery location. Get in touch for more information about available options. We normally reply within one working day.",
  },
} satisfies Record<string, Copy | CopyList>;

const plasticSpecs: { label: Copy; value: Copy }[] = [
  {
    label: { no: "Bruksområde", en: "Application" },
    value: { no: "Golfsimulator", en: "Golf simulator" },
  },
  {
    label: { no: "Lengder", en: "Lengths" },
    value: {
      no: "Forskjellige lengder kan importeres",
      en: "Different lengths can be imported",
    },
  },
  {
    label: { no: "Utførelser", en: "Designs" },
    value: {
      no: "Forskjellige utførelser kan importeres",
      en: "Different designs can be imported",
    },
  },
  {
    label: { no: "Tilgjengelighet", en: "Availability" },
    value: { no: "På forespørsel", en: "On request" },
  },
];

export function PeggerShowcase({
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
  const packaging = pick(copy.packaging, locale);
  const simPoints = pick(copy.simPoints, locale);
  const quoteHref = routes.quote(locale, product.slug);
  const contactHref = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Pegger")}`;

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

            <div className="mt-5 flex flex-wrap gap-2">
              {product.audience.map((key) => {
                const label = audienceLabels[key];
                if (!label) return null;
                return (
                  <Badge key={key} tone="neutral" className="px-3 py-1.5 text-[0.78rem]">
                    {pick(label, locale)}
                  </Badge>
                );
              })}
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

      {/* Trepegger: lengder og pakning */}
      <div className="border-y border-line bg-sand">
        <Container size="wide" className="py-16 sm:py-24">
          <div className="max-w-2xl">
            <p
              className="mb-3 text-xs font-semibold uppercase tracking-[0.18em]"
              style={{ color: category.accent }}
            >
              {pick(copy.teesEyebrow, locale)}
            </p>
            <h2 className="text-3xl font-semibold text-balance text-ink sm:text-4xl">
              {pick(copy.teesHeading, locale)}
            </h2>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-(--radius-card) border border-line bg-paper p-6 sm:p-8">
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-ink-muted">
                {pick(copy.lengthsLabel, locale)}
              </h3>
              <ul className="mt-4 space-y-3">
                {teeLengths.map((tee) => (
                  <li key={tee.length} className="flex gap-3 text-base text-ink-soft">
                    <CheckIcon className="mt-1 h-4.5 w-4.5 shrink-0 text-pine" />
                    <span className="font-medium text-ink">{tee.length}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-(--radius-card) border border-line bg-paper p-6 sm:p-8">
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-ink-muted">
                {pick(copy.packagingLabel, locale)}
              </h3>
              <ul className="mt-4 space-y-3">
                {packaging.map((option) => (
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

      {/* Tre lengder til ulike behov */}
      <Container size="wide" className="py-16 sm:py-24">
        <div className="max-w-2xl">
          <p
            className="mb-3 text-xs font-semibold uppercase tracking-[0.18em]"
            style={{ color: category.accent }}
          >
            {pick(copy.lengthsEyebrow, locale)}
          </p>
          <h2 className="text-3xl font-semibold text-balance text-ink sm:text-4xl">
            {pick(copy.lengthsHeading, locale)}
          </h2>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {teeLengths.map((tee) => (
            <div
              key={tee.length}
              className="flex flex-col rounded-(--radius-card) border border-line bg-paper p-6"
            >
              <span
                className="text-3xl font-semibold text-ink"
                style={{ color: category.accent }}
              >
                {tee.length}
              </span>
              <p className="mt-3 text-base leading-relaxed text-ink-soft">
                {pick(tee.note, locale)}
              </p>
            </div>
          ))}
        </div>
      </Container>

      {/* Pegger med egen logo */}
      <div className="border-y border-line bg-pine text-paper">
        <Container size="wide" className="py-16 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16 lg:items-center">
            <div>
              <div className="inline-flex">
                <Badge
                  tone="brass"
                  className="gap-1.5 px-3 py-1.5 text-[0.72rem] uppercase tracking-[0.14em]"
                >
                  <TagIcon className="h-4 w-4" />
                  {pick(copy.brandingEyebrow, locale)}
                </Badge>
              </div>
              <h2 className="mt-5 text-3xl font-semibold text-balance leading-tight sm:text-4xl">
                {pick(copy.brandingHeading, locale)}
              </h2>
            </div>
            <div className="rounded-(--radius-card) bg-paper/10 p-6 ring-1 ring-inset ring-paper/20 sm:p-8">
              <p className="text-base leading-relaxed text-paper/90 sm:text-lg">
                {pick(copy.brandingBody, locale)}
              </p>
              <p className="mt-5 text-base font-medium text-paper">
                {pick(copy.brandingNote, locale)}
              </p>
            </div>
          </div>
        </Container>
      </div>

      {/* Plastpegger til golfsimulator */}
      <Container size="wide" className="py-16 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div>
            <p
              className="mb-3 text-xs font-semibold uppercase tracking-[0.18em]"
              style={{ color: category.accent }}
            >
              {pick(copy.simEyebrow, locale)}
            </p>
            <h2 className="text-3xl font-semibold text-balance text-ink sm:text-4xl">
              {pick(copy.simHeading, locale)}
            </h2>
            <ul className="mt-6 space-y-3">
              {simPoints.map((point) => (
                <li key={point} className="flex gap-3 text-base text-ink-soft">
                  <CheckIcon className="mt-1 h-4.5 w-4.5 shrink-0 text-pine" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <Prose>
            <p>{pick(copy.simBody, locale)}</p>
            <p>{pick(copy.simBody2, locale)}</p>
          </Prose>
        </div>
      </Container>

      {/* Mål og spesifikasjoner */}
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
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-(--radius-card) border border-line bg-paper p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-ink">
                {pick(copy.woodSpecsHeading, locale)}
              </h3>
              <dl className="mt-5 divide-y divide-line">
                {product.specs.map((spec) => (
                  <div key={pick(spec.label, locale)} className="flex justify-between gap-6 py-3">
                    <dt className="text-sm text-ink-muted">{pick(spec.label, locale)}</dt>
                    <dd className="text-right text-sm font-medium text-ink">
                      {pick(spec.value, locale)}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="rounded-(--radius-card) border border-line bg-paper p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-ink">
                {pick(copy.plasticSpecsHeading, locale)}
              </h3>
              <dl className="mt-5 divide-y divide-line">
                {plasticSpecs.map((spec) => (
                  <div key={pick(spec.label, locale)} className="flex justify-between gap-6 py-3">
                    <dt className="text-sm text-ink-muted">{pick(spec.label, locale)}</dt>
                    <dd className="text-right text-sm font-medium text-ink">
                      {pick(spec.value, locale)}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
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
