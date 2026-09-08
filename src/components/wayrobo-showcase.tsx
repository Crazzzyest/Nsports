import {
  BallIcon,
  CheckIcon,
  GlobeIcon,
  RobotIcon,
  TargetIcon,
  TruckIcon,
} from "@/components/icons";
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
  heroTitle: {
    no: "Wayrobo WP1000 – autonom robotballplukker",
    en: "Wayrobo WP1000 – autonomous ball-collecting robot",
  },
  meландBadge: { no: "Testet i norsk terreng på Meland Golfklubb", en: "Tested in Norwegian terrain at Meland Golfklubb" },
  quoteCta: { no: "Be om tilbud", en: "Request a quote" },
  contactCta: { no: "Kontakt Frank", en: "Contact Frank" },
  featuresHeading: { no: "Hovedfordeler", en: "Key benefits" },

  testedEyebrow: { no: "Erfaringer", en: "Experiences" },
  testedHeading: { no: "Testet på Meland Golfklubb", en: "Tested at Meland Golfklubb" },
  testedBody: {
    no: [
      "Meland Golfklubb tok Wayrobo WP1000 i bruk på drivingrangen sommeren 2026. Rangen vår har krevende topografi med ujevnt underlag, hellinger og flere siktepunkter, og har derfor vært en god testarena for roboten.",
      "Erfaringene våre er svært gode. Firehjulsdriften gir imponerende fremkommelighet, også på områder hvor tradisjonelle løsninger kan være utfordrende.",
      "Roboten bruker kamera, sensorer og intelligent navigasjon til å arbeide selvstendig på rangen. Systemet analyserer hvor balltettheten er størst og kan prioritere disse områdene først.",
      "Når kurvene når angitt kapasitet, returnerer roboten automatisk til tømmestasjonen. Deretter kan den fortsette arbeidet.",
      "Områder rundt siktepunkter, installasjoner eller andre steder roboten ikke skal kjøre kan defineres som no-go-soner. Ved behov kan roboten også styres manuelt med fjernkontroll eller via app.",
    ],
    en: [
      "Meland Golfklubb put the Wayrobo WP1000 to work on the driving range in the summer of 2026. Our range has demanding topography with uneven ground, slopes and several target points, and has therefore been a good test arena for the robot.",
      "Our experiences are very good. The four-wheel drive gives impressive mobility, even in areas where traditional solutions can be challenging.",
      "The robot uses a camera, sensors and intelligent navigation to work independently on the range. The system analyses where the ball density is greatest and can prioritise those areas first.",
      "When the baskets reach the set capacity, the robot returns automatically to the emptying station. It can then continue its work.",
      "Areas around target points, installations or other places the robot should not drive can be defined as no-go zones. If needed, the robot can also be controlled manually with a remote or via the app.",
    ],
  },
  quote: {
    no: "Mye robotballplukker for pengene. Etter en sesong med testing på Meland er vi svært godt fornøyd med både effektivitet, drift og fremkommelighet.",
    en: "A lot of ball-collecting robot for the money. After a season of testing at Meland we are very pleased with the efficiency, operation and mobility alike.",
  },

  processEyebrow: { no: "Slik arbeider Wayrobo", en: "How Wayrobo works" },
  processHeading: { no: "Fra oppmåling til automatisk tømming", en: "From mapping to automatic emptying" },

  terrainEyebrow: { no: "Fremkommelighet", en: "Mobility" },
  terrainHeading: { no: "Bygget for krevende drivingranger", en: "Built for demanding driving ranges" },
  terrainBody: {
    no: [
      "Wayrobo er ikke avhengig av en helt flat og perfekt drivingrange. 4WD og terrengegenskapene gjør roboten egnet for vått gress, ujevnt underlag og hellinger. På Meland har nettopp fremkommeligheten vært en av egenskapene som har imponert oss mest.",
    ],
    en: [
      "Wayrobo does not depend on a completely flat and perfect driving range. The 4WD and terrain capabilities make the robot suitable for wet grass, uneven ground and slopes. At Meland the mobility has been one of the qualities that has impressed us the most.",
    ],
  },

  valueEyebrow: { no: "Verdi for klubben", en: "Value for the club" },
  valueHeading: {
    no: "Mindre tid på ballplukking. Mer tid på golfbanen.",
    en: "Less time on ball collection. More time on the course.",
  },
  valueBody: {
    no: [
      "Ballplukking er en nødvendig, repetitiv og tidkrevende del av rangedriften. Med en autonom løsning kan store deler av denne oppgaven flyttes fra ansatte og tradisjonelle kjøretøy til roboten.",
      "Det kan gi mindre behov for manuell kjøring, redusert bruk av tradisjonelle rangebiler og frigjøre arbeidstid til banevedlikehold, medlemmer og andre oppgaver som skaper større verdi for klubben.",
    ],
    en: [
      "Ball collection is a necessary, repetitive and time-consuming part of running a range. With an autonomous solution, large parts of this task can be moved from staff and traditional vehicles to the robot.",
      "That can mean less need for manual driving, reduced use of traditional range vehicles and free up working hours for course maintenance, members and other tasks that create greater value for the club.",
    ],
  },

  controlEyebrow: { no: "Smart styring", en: "Smart control" },
  controlHeading: { no: "Full kontroll fra appen", en: "Full control from the app" },
  specsEyebrow: { no: "Tekniske nøkkeltall", en: "Technical key figures" },
  specsHeading: { no: "Tekniske nøkkeltall", en: "Technical key figures" },

  completeEyebrow: { no: "Komplett løsning", en: "Complete solution" },
  completeHeading: { no: "Komplett løsning for drivingrangen", en: "A complete solution for the driving range" },
  completeBody: {
    no: [
      "Wayrobo kan leveres som en komplett løsning med robot og tømmestasjon. Vi bistår med planlegging, oppsett og installasjon tilpasset den enkelte drivingrange.",
      "På Meland arbeider vi også med neste steg: automatisk transport av ballene videre fra tømmestasjonen til ballvasker og ballautomat. Målet er en mest mulig automatisert kjede fra ballen ligger ute på rangen til den igjen er klar for spilleren.",
    ],
    en: [
      "Wayrobo can be delivered as a complete solution with a robot and emptying station. We assist with planning, setup and installation adapted to each driving range.",
      "At Meland we are also working on the next step: automatic transport of the balls onward from the emptying station to the ball washer and ball dispenser. The goal is a chain that is as automated as possible, from the ball lying out on the range to it being ready for the player again.",
    ],
  },

  videoEyebrow: { no: "Se den i aksjon", en: "See it in action" },
  videoHeading: { no: "Wayrobo WP1000 på rangen", en: "Wayrobo WP1000 on the range" },

  ctaHeading: { no: "Interessert i Wayrobo?", en: "Interested in Wayrobo?" },
  ctaBody: {
    no: "Ingen drivingranger er helt like. Ta kontakt med oss, så ser vi på størrelse, terreng, ballmengde og dagens løsning og vurderer hvordan Wayrobo kan passe inn i driften hos dere.",
    en: "No two driving ranges are exactly alike. Get in touch and we will look at size, terrain, ball volume and your current solution, and consider how Wayrobo can fit into your operation.",
  },
} satisfies Record<string, Copy | CopyList>;

function getSteps(locale: Locale) {
  return [
    {
      title: { no: "Analyserer rangen", en: "Analyses the range" },
      body: {
        no: "Kamera, LiDAR og RTK-GPS gir roboten oversikt over arbeidsområdet og hindringer.",
        en: "Camera, LiDAR and RTK GPS give the robot an overview of the working area and obstacles.",
      },
    },
    {
      title: { no: "Prioriterer ballene", en: "Prioritises the balls" },
      body: {
        no: "AI-baserte heatmaps analyserer balltettheten og gjør det mulig å prioritere områdene hvor behovet for plukking er størst.",
        en: "AI-based heatmaps analyse the ball density and make it possible to prioritise the areas where the need for collection is greatest.",
      },
    },
    {
      title: { no: "Plukker autonomt", en: "Collects autonomously" },
      body: {
        no: "Roboten arbeider selvstendig og kan kjøre gjennom store deler av døgnet med minimalt behov for tilsyn.",
        en: "The robot works independently and can run through large parts of the day with minimal need for supervision.",
      },
    },
    {
      title: { no: "Tømmer automatisk", en: "Empties automatically" },
      body: {
        no: "Når kurvene er fulle, returnerer roboten automatisk til tømmestasjonen.",
        en: "When the baskets are full, the robot returns automatically to the emptying station.",
      },
    },
  ].map((step, index) => ({
    number: String(index + 1).padStart(2, "0"),
    title: pick(step.title, locale),
    body: pick(step.body, locale),
  }));
}

const controlPoints = [
  { no: "Sanntidsoversikt i app", en: "Real-time overview in the app" },
  { no: "Opprett og endre arbeidsområder", en: "Create and edit working areas" },
  { no: "Definer no-go-soner", en: "Define no-go zones" },
  { no: "Følg robotens posisjon", en: "Track the robot's position" },
  { no: "Se driftstid og innsamlede baller", en: "See operating time and collected balls" },
  { no: "Motta varsler", en: "Receive alerts" },
  { no: "Planlegg arbeidsøkter", en: "Schedule work sessions" },
  { no: "Fjernstyr roboten ved behov", en: "Control the robot remotely when needed" },
];

export function WayroboShowcase({
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
  const steps = getSteps(locale);
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
            <h1 className="text-4xl font-semibold text-balance text-ink sm:text-5xl">
              {pick(copy.heroTitle, locale)}
            </h1>

            <div className="mt-5">
              <Badge tone="pine" className="gap-1.5 px-3 py-1.5 text-[0.78rem]">
                <TargetIcon className="h-4 w-4" />
                {pick(copy.meландBadge, locale)}
              </Badge>
            </div>

            <Prose className="mt-6">
              {pick(product.description, locale).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </Prose>

            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={quoteHref} size="lg">
                {pick(copy.quoteCta, locale)}
              </ButtonLink>
              <ButtonLink href={contactHref} variant="secondary" size="lg">
                {pick(copy.contactCta, locale)}
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

      {/* Testet på Meland */}
      <Container size="wide" className="py-16 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div>
            <p
              className="mb-3 text-xs font-semibold uppercase tracking-[0.18em]"
              style={{ color: category.accent }}
            >
              {pick(copy.testedEyebrow, locale)}
            </p>
            <h2 className="text-3xl font-semibold text-balance text-ink sm:text-4xl">
              {pick(copy.testedHeading, locale)}
            </h2>
            <figure className="mt-8 rounded-(--radius-card) border border-line bg-sand p-6 sm:p-7">
              <blockquote className="text-lg font-medium leading-relaxed text-ink text-pretty">
                {"\u201C"}
                {pick(copy.quote, locale)}
                {"\u201D"}
              </blockquote>
              <figcaption className="mt-4 text-sm text-ink-muted">
                — Meland Golfklubb
              </figcaption>
            </figure>
          </div>
          <Prose>
            {pick(copy.testedBody, locale).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Prose>
        </div>
      </Container>

      {/* Slik arbeider Wayrobo */}
      <div className="border-y border-line bg-sand">
        <Container size="wide" className="py-16 sm:py-24">
          <div className="max-w-2xl">
            <p
              className="mb-3 text-xs font-semibold uppercase tracking-[0.18em]"
              style={{ color: category.accent }}
            >
              {pick(copy.processEyebrow, locale)}
            </p>
            <h2 className="text-3xl font-semibold text-balance text-ink sm:text-4xl">
              {pick(copy.processHeading, locale)}
            </h2>
          </div>
          <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <li
                key={step.number}
                className="flex flex-col rounded-(--radius-card) border border-line bg-paper p-6"
              >
                <span
                  className="text-sm font-semibold tabular-nums"
                  style={{ color: category.accent }}
                >
                  {step.number}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{step.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </div>

      {/* Video */}
      <Container size="wide" className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p
            className="mb-3 text-xs font-semibold uppercase tracking-[0.18em]"
            style={{ color: category.accent }}
          >
            {pick(copy.videoEyebrow, locale)}
          </p>
          <h2 className="text-3xl font-semibold text-balance text-ink sm:text-4xl">
            {pick(copy.videoHeading, locale)}
          </h2>
        </div>
        <div className="mx-auto mt-8 max-w-4xl overflow-hidden rounded-(--radius-card) border border-line bg-ink">
          <div className="relative aspect-video">
            <iframe
              className="absolute inset-0 h-full w-full"
              src="https://www.youtube-nocookie.com/embed/iLQ3MWKAjhs"
              title="Wayrobo WP1000"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      </Container>

      {/* Bygget for krevende ranger */}
      <div className="border-y border-line bg-sand">
        <Container size="wide" className="py-16 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <div>
              <p
                className="mb-3 text-xs font-semibold uppercase tracking-[0.18em]"
                style={{ color: category.accent }}
              >
                {pick(copy.terrainEyebrow, locale)}
              </p>
              <h2 className="text-3xl font-semibold text-balance text-ink sm:text-4xl">
                {pick(copy.terrainHeading, locale)}
              </h2>
            </div>
            <Prose>
              {pick(copy.terrainBody, locale).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </Prose>
          </div>
        </Container>
      </div>

      {/* Verdi */}
      <div className="bg-pine text-paper">
        <Container size="wide" className="py-16 text-center sm:py-24">
          <p
            className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-brass-soft"
          >
            {pick(copy.valueEyebrow, locale)}
          </p>
          <h2 className="mx-auto max-w-3xl text-balance text-3xl font-semibold leading-tight sm:text-4xl">
            {pick(copy.valueHeading, locale)}
          </h2>
          <div className="mx-auto mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-paper/85 sm:text-lg">
            {pick(copy.valueBody, locale).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Container>
      </div>

      {/* Smart styring + tekniske nøkkeltall */}
      <Container size="wide" className="py-16 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div>
            <p
              className="mb-3 text-xs font-semibold uppercase tracking-[0.18em]"
              style={{ color: category.accent }}
            >
              {pick(copy.controlEyebrow, locale)}
            </p>
            <h2 className="text-3xl font-semibold text-balance text-ink sm:text-4xl">
              {pick(copy.controlHeading, locale)}
            </h2>
            <ul className="mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {controlPoints.map((point) => (
                <li key={point.no} className="flex gap-3 text-base text-ink-soft">
                  <CheckIcon className="mt-1 h-4.5 w-4.5 shrink-0 text-pine" />
                  {pick(point, locale)}
                </li>
              ))}
            </ul>
          </div>

          {product.specs.length > 0 ? (
            <div>
              <p
                className="mb-3 text-xs font-semibold uppercase tracking-[0.18em]"
                style={{ color: category.accent }}
              >
                {pick(copy.specsEyebrow, locale)}
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {product.specs.map((spec) => (
                  <div
                    key={pick(spec.label, locale)}
                    className="rounded-(--radius-card) border border-line bg-sand p-5"
                  >
                    <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-muted">
                      {pick(spec.label, locale)}
                    </dt>
                    <dd className="mt-2 text-lg font-semibold leading-snug text-ink">
                      {pick(spec.value, locale)}
                    </dd>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </Container>

      {/* Komplett løsning */}
      <div className="border-y border-line bg-sand">
        <Container size="wide" className="py-16 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <div>
              <p
                className="mb-3 text-xs font-semibold uppercase tracking-[0.18em]"
                style={{ color: category.accent }}
              >
                {pick(copy.completeEyebrow, locale)}
              </p>
              <h2 className="text-3xl font-semibold text-balance text-ink sm:text-4xl">
                {pick(copy.completeHeading, locale)}
              </h2>
              <div className="mt-6 flex flex-wrap gap-3 text-ink-muted">
                <RobotIcon className="h-6 w-6" />
                <TruckIcon className="h-6 w-6" />
                <BallIcon className="h-6 w-6" />
                <GlobeIcon className="h-6 w-6" />
              </div>
            </div>
            <Prose>
              {pick(copy.completeBody, locale).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </Prose>
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
              {pick(copy.contactCta, locale)}
            </ButtonLink>
          </div>
        </Container>
      </div>
    </>
  );
}
