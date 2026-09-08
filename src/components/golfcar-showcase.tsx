import { CheckIcon } from "@/components/icons";
import { Badge, ButtonLink, Container, Prose } from "@/components/layout-primitives";
import { ProductGallery } from "@/components/product-gallery";
import { ProductMedia } from "@/components/product-media";
import type { Category, Product } from "@/lib/content/types";
import { pick, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { routes } from "@/lib/i18n/routes";

type Copy = { no: string; en: string };
type CopyList = { no: string[]; en: string[] };

const copy = {
  heroTitle: {
    no: "Elektriske golfbiler for profesjonelle anlegg",
    en: "Electric golf cars for professional facilities",
  },
  ceBadge: { no: "Alle biler leveres CE-sertifisert", en: "All cars delivered CE certified" },
  quoteCta: { no: "Be om tilbud", en: "Request a quote" },

  highlightsHeading: { no: "Kort oppsummert", en: "In brief" },

  modelsEyebrow: { no: "For golfbanen", en: "For the golf course" },
  modelsHeading: { no: "To modeller for golfklubber", en: "Two models for golf clubs" },

  basicTitle: { no: "Basic 2-seter", en: "Basic 2-seater" },
  basicBody: {
    no: "En driftssikker og prisgunstig golfbil for klubber som ønsker en enkel og funksjonell bil til utleie eller intern transport. Modellen leveres uten kostbart ekstrautstyr og kan tilpasses klubbens behov.",
    en: "A dependable and affordable golf car for clubs that want a simple, functional car for rental or internal transport. The model is delivered without costly extras and can be adapted to the club's needs.",
  },
  basicEquipHeading: { no: "Utstyr", en: "Equipment" },
  basicEquip: {
    no: [
      "To komfortable seter",
      "Tak og frontrute",
      "Bagholder for to golfbager",
      "Elektrisk drift med litiumbatteri",
      "Standard hjul og felger",
      "Tilpasset ladeutstyr",
      "CE-sertifisert",
    ],
    en: [
      "Two comfortable seats",
      "Roof and windscreen",
      "Bag holder for two golf bags",
      "Electric drive with lithium battery",
      "Standard wheels and rims",
      "Matched charging equipment",
      "CE certified",
    ],
  },
  basicNote: {
    no: "Basicmodellen leveres uten blant annet 14-tommers felger, høyttalere, ballvasker, regntrekk og annet premiumutstyr.",
    en: "The basic model is delivered without, among other things, 14-inch rims, speakers, ball washer, rain cover and other premium equipment.",
  },

  premiumTitle: { no: "Premium 2-seter", en: "Premium 2-seater" },
  premiumBody: {
    no: "Vår fullt utstyrte modell er basert på golfbilene vi importerte og tok i bruk i 2026. Dette er en moderne og komfortabel golfbil for klubber som ønsker høy standard på egen bilpark og en bedre totalopplevelse for spillerne.",
    en: "Our fully equipped model is based on the golf cars we imported and put into use in 2026. This is a modern, comfortable golf car for clubs that want a high standard for their own fleet and a better overall experience for players.",
  },
  premiumEquipHeading: { no: "Aktuelt utstyr", en: "Available equipment" },
  premiumEquip: {
    no: [
      "Kraftig litiumbatteri med kapasitet på opptil 125 Ah",
      "Firehjuls skivebremser",
      "Hydraulisk og elektronisk bremsesystem",
      "Individuell hjuloppheng foran",
      "Komfortseter med armlener",
      "14-tommers aluminiumsfelger",
      "Stor frontrute og tak",
      "Digitalt multifunksjonspanel",
      "Multimedieskjerm med Apple CarPlay",
      "Vanntette høyttalere",
      "LED-belysning og stemningslys",
      "USB-lading",
      "Speil",
      "Bagholder",
      "Sandflasker",
      "Ballvasker",
      "Kjøleboks",
      "Regntrekk",
      "CE-sertifisert",
    ],
    en: [
      "Powerful lithium battery with a capacity of up to 125 Ah",
      "Four-wheel disc brakes",
      "Hydraulic and electronic brake system",
      "Independent front suspension",
      "Comfort seats with armrests",
      "14-inch aluminium rims",
      "Large windscreen and roof",
      "Digital multifunction panel",
      "Multimedia screen with Apple CarPlay",
      "Waterproof speakers",
      "LED lighting and ambient light",
      "USB charging",
      "Mirrors",
      "Bag holder",
      "Sand bottles",
      "Ball washer",
      "Cooler box",
      "Rain cover",
      "CE certified",
    ],
  },
  premiumNote: {
    no: "Endelig utstyrsoppsett tilpasses og bekreftes før bestilling.",
    en: "The final equipment configuration is adapted and confirmed before ordering.",
  },

  fleetEyebrow: { no: "Flere kjøretøy", en: "More vehicles" },
  fleetHeading: { no: "Flere elektriske kjøretøy", en: "More electric vehicles" },

  batteryEyebrow: { no: "Batteri og lading", en: "Battery and charging" },
  batteryHeading: { no: "Kraftige litiumbatterier", en: "Powerful lithium batteries" },
  batteryBody: {
    no: [
      "Bilene leveres med vedlikeholdsvennlige litiumbatterier. Det største tilgjengelige batterialternativet har en kapasitet på 125 Ah.",
      "Batteristørrelse, rekkevidde og ladetid varierer mellom modellene og velges ut fra kjøretøyets størrelse, utstyr og bruksområde. Alle biler leveres med tilpasset lader.",
    ],
    en: [
      "The cars are delivered with low-maintenance lithium batteries. The largest available battery option has a capacity of 125 Ah.",
      "Battery size, range and charging time vary between the models and are chosen based on the vehicle's size, equipment and use. All cars are delivered with a matched charger.",
    ],
  },

  customEyebrow: { no: "Tilpasning og profilering", en: "Customisation and branding" },
  customHeading: { no: "Tilpasset klubbens profil", en: "Tailored to the club's profile" },
  customIntro: {
    no: "Bilene kan tilpasses klubbens eller virksomhetens profil før produksjon.",
    en: "The cars can be tailored to the club's or business's profile before production.",
  },
  customPoints: {
    no: [
      "Valgfri karosserifarge",
      "Klubb- eller firmalogo",
      "Flere setefarger",
      "Ulike felg- og dekkalternativer",
      "Regntrekk",
      "Kjøleboks",
      "Ballvasker og sandflasker",
      "Multimediesystem",
      "Lys- og sikkerhetsutstyr",
    ],
    en: [
      "Optional body colour",
      "Club or company logo",
      "Several seat colours",
      "Different rim and tyre options",
      "Rain cover",
      "Cooler box",
      "Ball washer and sand bottles",
      "Multimedia system",
      "Lighting and safety equipment",
    ],
  },

  specsEyebrow: { no: "Modeller og spesifikasjoner", en: "Models and specifications" },
  specsHeading: { no: "Modeller og spesifikasjoner", en: "Models and specifications" },
  specsNote: {
    no: "Tekniske spesifikasjoner som mål, vekt, motor, rekkevidde og ladetid varierer mellom modellene. Oppdatert produktark og endelig utstyrsliste sendes sammen med tilbudet.",
    en: "Technical specifications such as dimensions, weight, motor, range and charging time vary between the models. An updated product sheet and final equipment list are sent together with the quote.",
  },

  importEyebrow: { no: "Import og levering", en: "Import and delivery" },
  importHeading: { no: "Vi håndterer hele importen", en: "We handle the whole import" },
  importBody: {
    no: [
      "Vi hjelper dere gjennom hele prosessen, fra valg av modell og utstyr til profilering, transport, import og ferdig levering. Dere får ett kontaktpunkt og en trygg og oversiktlig leveranse tilpasset deres anlegg.",
      "Kontakt oss for produktinformasjon, forventet leveringstid og tilbud.",
    ],
    en: [
      "We guide you through the whole process, from the choice of model and equipment to branding, transport, import and finished delivery. You get a single point of contact and a secure, clear delivery tailored to your facility.",
      "Contact us for product information, expected delivery time and a quote.",
    ],
  },

  ctaHeading: { no: "Hvilken bil passer deres anlegg?", en: "Which car suits your facility?" },
  ctaBody: {
    no: "Fortell oss hvor mange biler dere trenger og hvordan de skal brukes. Vi hjelper dere med å sette sammen riktig modell og utstyrspakke.",
    en: "Tell us how many cars you need and how they will be used. We help you put together the right model and equipment package.",
  },
} satisfies Record<string, Copy | CopyList>;

function getFleet(locale: Locale) {
  return [
    {
      title: { no: "6- og 8-seters passasjerbiler", en: "6- and 8-seat passenger cars" },
      body: {
        no: [
          "Elektriske passasjerbiler for komfortabel transport av gjester, spillere og ansatte. Modellene passer godt til golfklubber, hoteller, ferieanlegg, campingplasser, arrangementer og transport mellom klubbhus, parkeringsplass og startområde.",
          "Bilene kan leveres med seks eller åtte fremovervendte seter, tak, frontrute, lys, speil og annet ønsket utstyr.",
        ],
        en: [
          "Electric passenger cars for comfortable transport of guests, players and staff. The models suit golf clubs, hotels, holiday resorts, campsites, events and transport between the clubhouse, car park and starting area.",
          "The cars can be delivered with six or eight forward-facing seats, roof, windscreen, lights, mirrors and other desired equipment.",
        ],
      },
      alt: { no: "6- og 8-seters elektrisk passasjerbil", en: "6- and 8-seat electric passenger car" },
    },
    {
      title: { no: "Buggybar og serveringsvogn", en: "Buggy bar and service cart" },
      body: {
        no: [
          "Ta serveringen ut på banen og skap både bedre gjesteopplevelser og nye inntektsmuligheter. Buggybaren kan tilpasses for salg av kald drikke, kaffe, snacks, enkle matvarer og golfartikler.",
          "Løsningen kan leveres med kjøling, oppbevaring, serveringsflater, tak og klubbens egen profilering.",
        ],
        en: [
          "Take service out onto the course and create both better guest experiences and new revenue opportunities. The buggy bar can be adapted for selling cold drinks, coffee, snacks, simple food and golf items.",
          "The solution can be delivered with refrigeration, storage, serving surfaces, roof and the club's own branding.",
        ],
      },
      alt: { no: "Buggybar og serveringsvogn", en: "Buggy bar and service cart" },
    },
    {
      title: { no: "Elektriske arbeidsbiler", en: "Electric utility vehicles" },
      body: {
        no: [
          "Praktiske arbeidsbiler for transport av utstyr, varer og materiell. De passer godt for banemannskap, greenkeepere, vedlikeholdsavdelinger og driftspersonell.",
        ],
        en: [
          "Practical utility vehicles for transporting equipment, goods and materials. They suit greenkeeping crews, greenkeepers, maintenance departments and operations staff.",
        ],
      },
      list: {
        no: [
          "Åpent lasteplan",
          "Tippbart lasteplan",
          "Lastekapasitet på opptil 300 eller 500 kg, avhengig av modell",
          "To seter",
          "Elektrisk drift",
          "Flere batteri- og utstyrsalternativer",
          "CE-sertifisert",
        ],
        en: [
          "Open cargo bed",
          "Tipping cargo bed",
          "Load capacity of up to 300 or 500 kg, depending on the model",
          "Two seats",
          "Electric drive",
          "Several battery and equipment options",
          "CE certified",
        ],
      },
      alt: { no: "Elektrisk arbeidsbil med lasteplan", en: "Electric utility vehicle with cargo bed" },
    },
  ];
}

export function GolfCarShowcase({
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
  const highlights = pick(product.highlights, locale);
  const fleet = getFleet(locale);
  const quoteHref = routes.quote(locale, product.slug);

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
            <h1 className="text-4xl font-semibold text-balance text-ink sm:text-5xl">
              {pick(copy.heroTitle, locale)}
            </h1>

            <div className="mt-5">
              <Badge tone="pine" className="gap-1.5 px-3 py-1.5 text-[0.78rem]">
                <CheckIcon className="h-4 w-4" />
                {pick(copy.ceBadge, locale)}
              </Badge>
            </div>

            <Prose className="mt-6">
              {pick(product.description, locale).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </Prose>

            <div className="mt-8">
              <ButtonLink href={quoteHref} size="lg">
                {pick(copy.quoteCta, locale)}
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

      {/* Kort oppsummert */}
      <div className="border-y border-line bg-sand">
        <Container size="wide" className="py-14 sm:py-20">
          <h2 className="text-2xl font-semibold text-ink sm:text-3xl">
            {pick(copy.highlightsHeading, locale)}
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

      {/* To modeller for golfklubber */}
      <Container size="wide" className="py-16 sm:py-24">
        <div className="max-w-2xl">
          <p
            className="mb-3 text-xs font-semibold uppercase tracking-[0.18em]"
            style={{ color: category.accent }}
          >
            {pick(copy.modelsEyebrow, locale)}
          </p>
          <h2 className="text-3xl font-semibold text-balance text-ink sm:text-4xl">
            {pick(copy.modelsHeading, locale)}
          </h2>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {/* Basic */}
          <div className="flex flex-col rounded-(--radius-card) border border-line bg-paper p-7 sm:p-8">
            <h3 className="text-2xl font-semibold text-ink">{pick(copy.basicTitle, locale)}</h3>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              {pick(copy.basicBody, locale)}
            </p>
            <p className="mt-7 text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
              {pick(copy.basicEquipHeading, locale)}
            </p>
            <ul className="mt-4 space-y-2.5">
              {pick(copy.basicEquip, locale).map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink-soft">
                  <CheckIcon className="mt-0.5 h-4.5 w-4.5 shrink-0 text-pine" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-auto pt-7 text-sm leading-relaxed text-ink-muted">
              {pick(copy.basicNote, locale)}
            </p>
          </div>

          {/* Premium */}
          <div className="flex flex-col rounded-(--radius-card) border border-pine/25 bg-paper p-7 shadow-sm ring-1 ring-pine/10 sm:p-8">
            <h3 className="text-2xl font-semibold text-ink">{pick(copy.premiumTitle, locale)}</h3>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              {pick(copy.premiumBody, locale)}
            </p>
            <p className="mt-7 text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
              {pick(copy.premiumEquipHeading, locale)}
            </p>
            <ul className="mt-4 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
              {pick(copy.premiumEquip, locale).map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink-soft">
                  <CheckIcon className="mt-0.5 h-4.5 w-4.5 shrink-0 text-pine" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-auto pt-7 text-sm leading-relaxed text-ink-muted">
              {pick(copy.premiumNote, locale)}
            </p>
          </div>
        </div>
      </Container>

      {/* Flere elektriske kjøretøy */}
      <div className="border-y border-line bg-sand">
        <Container size="wide" className="py-16 sm:py-24">
          <div className="max-w-2xl">
            <p
              className="mb-3 text-xs font-semibold uppercase tracking-[0.18em]"
              style={{ color: category.accent }}
            >
              {pick(copy.fleetEyebrow, locale)}
            </p>
            <h2 className="text-3xl font-semibold text-balance text-ink sm:text-4xl">
              {pick(copy.fleetHeading, locale)}
            </h2>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {fleet.map((vehicle) => (
              <div
                key={vehicle.title.no}
                className="flex flex-col overflow-hidden rounded-(--radius-card) border border-line bg-paper"
              >
                <div className="relative aspect-4/3 border-b border-line bg-sand">
                  <ProductMedia
                    image={{ alt: vehicle.alt }}
                    accent={category.accent}
                    icon={category.icon}
                    seed={vehicle.title.no}
                    sizes="(max-width: 1024px) 92vw, 30vw"
                    missingLabel={dict.product.imageMissing}
                  />
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <h3 className="text-xl font-semibold text-ink">{pick(vehicle.title, locale)}</h3>
                  <div className="mt-3 space-y-3 text-sm leading-relaxed text-ink-soft">
                    {pick(vehicle.body, locale).map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  {vehicle.list ? (
                    <ul className="mt-5 space-y-2.5">
                      {pick(vehicle.list, locale).map((item) => (
                        <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink-soft">
                          <CheckIcon className="mt-0.5 h-4.5 w-4.5 shrink-0 text-pine" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Batteri og lading */}
      <Container size="wide" className="py-16 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div>
            <p
              className="mb-3 text-xs font-semibold uppercase tracking-[0.18em]"
              style={{ color: category.accent }}
            >
              {pick(copy.batteryEyebrow, locale)}
            </p>
            <h2 className="text-3xl font-semibold text-balance text-ink sm:text-4xl">
              {pick(copy.batteryHeading, locale)}
            </h2>
          </div>
          <Prose>
            {pick(copy.batteryBody, locale).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Prose>
        </div>
      </Container>

      {/* Tilpasning og profilering */}
      <div className="border-y border-line bg-sand">
        <Container size="wide" className="py-16 sm:py-24">
          <div className="max-w-2xl">
            <p
              className="mb-3 text-xs font-semibold uppercase tracking-[0.18em]"
              style={{ color: category.accent }}
            >
              {pick(copy.customEyebrow, locale)}
            </p>
            <h2 className="text-3xl font-semibold text-balance text-ink sm:text-4xl">
              {pick(copy.customHeading, locale)}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              {pick(copy.customIntro, locale)}
            </p>
          </div>
          <ul className="mt-8 grid gap-x-8 gap-y-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {pick(copy.customPoints, locale).map((point) => (
              <li key={point} className="flex gap-3 text-base leading-relaxed text-ink-soft">
                <CheckIcon className="mt-1 h-4.5 w-4.5 shrink-0 text-pine" />
                {point}
              </li>
            ))}
          </ul>
        </Container>
      </div>

      {/* Modeller og spesifikasjoner */}
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

        {product.specs.length > 0 ? (
          <dl className="mt-8 divide-y divide-line border-y border-line">
            {product.specs.map((spec) => (
              <div
                key={pick(spec.label, locale)}
                className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-[minmax(0,14rem)_1fr] sm:gap-6"
              >
                <dt className="text-sm font-semibold text-ink">{pick(spec.label, locale)}</dt>
                <dd className="text-sm leading-relaxed text-ink-soft">{pick(spec.value, locale)}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-ink-muted">
          {pick(copy.specsNote, locale)}
        </p>
      </Container>

      {/* Import og levering */}
      <div className="border-y border-line bg-sand">
        <Container size="wide" className="py-16 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <div>
              <p
                className="mb-3 text-xs font-semibold uppercase tracking-[0.18em]"
                style={{ color: category.accent }}
              >
                {pick(copy.importEyebrow, locale)}
              </p>
              <h2 className="text-3xl font-semibold text-balance text-ink sm:text-4xl">
                {pick(copy.importHeading, locale)}
              </h2>
            </div>
            <Prose>
              {pick(copy.importBody, locale).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </Prose>
          </div>
        </Container>
      </div>

      {/* Avsluttende kontakt-CTA */}
      <div className="bg-pine text-paper">
        <Container size="wide" className="py-16 text-center sm:py-24">
          <h2 className="mx-auto max-w-3xl text-balance text-3xl font-semibold leading-tight sm:text-4xl">
            {pick(copy.ctaHeading, locale)}
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-paper/85 sm:text-lg">
            {pick(copy.ctaBody, locale)}
          </p>
          <div className="mt-8 flex justify-center">
            <ButtonLink href={quoteHref} variant="onPine" size="lg">
              {pick(copy.quoteCta, locale)}
            </ButtonLink>
          </div>
        </Container>
      </div>
    </>
  );
}
