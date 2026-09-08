import {
  ArrowRightIcon,
  CheckIcon,
  FlagIcon,
  RobotIcon,
  TargetIcon,
} from "@/components/icons";
import { Badge, ButtonLink, Container, Prose } from "@/components/layout-primitives";
import { ProductGallery } from "@/components/product-gallery";
import type { Category, Product } from "@/lib/content/types";
import { pick, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { routes } from "@/lib/i18n/routes";

type Copy = { no: string; en: string };

const copy = {
  heroTitle: { no: "Din egen AI-caddie på golfbanen", en: "Your own AI caddie on the course" },
  dealerCta: { no: "Bli forhandler av Robera Pro", en: "Become a Robera Pro dealer" },
  demoCta: {
    no: "Be om demo / produktinformasjon",
    en: "Request a demo / product information",
  },
  bannerLead: { no: "Du går mot neste slag.", en: "You walk to your next shot." },
  bannerTrail: { no: "Robera følger etter.", en: "Robera follows." },
  featuresHeading: { no: "Hovedfunksjoner", en: "Key features" },
  followEyebrow: { no: "AI Follow Me", en: "AI Follow Me" },
  followHeading: { no: "Slipp fjernkontrollen. Bare gå.", en: "Drop the remote. Just walk." },
  followBody: {
    no: [
      "Det som virkelig skiller Robera Pro fra en tradisjonell elektrisk golftralle er AI Follow Me.",
      "Aktiver følgemodus og begynn å gå. Robera registrerer spilleren og følger automatisk etter med valgt avstand.",
      "Det gir en helt annen flyt gjennom golfrunden. Ingen tralle å trekke og ingen fjernkontroll som må være i hånden hele tiden.",
    ],
    en: [
      "What really sets Robera Pro apart from a traditional electric golf trolley is AI Follow Me.",
      "Activate follow mode and start walking. Robera registers the player and automatically follows at the chosen distance.",
      "It gives a completely different flow through the round. No trolley to pull and no remote that has to stay in your hand the whole time.",
    ],
  },
  techEyebrow: { no: "Teknologi", en: "Technology" },
  techHeading: {
    no: "Avansert AI-teknologi utviklet for autonom bevegelse",
    en: "Advanced AI technology built for autonomous movement",
  },
  techBody: {
    no: [
      "Robera Pro bygger på teknologi utviklet for autonom kjøring i lav hastighet.",
      "Systemet kombinerer visuell gjenkjenning, RGB- og TOF-teknologi, bevegelseskontroll og AI-basert objektgjenkjenning. Dette gjør at trallen kan identifisere og følge spilleren samtidig som den registrerer omgivelsene.",
      "Teknologien er utviklet for å håndtere varierende lysforhold på golfbanen.",
    ],
    en: [
      "Robera Pro builds on technology developed for autonomous driving at low speed.",
      "The system combines visual recognition, RGB and TOF technology, motion control and AI-based object recognition. This lets the trolley identify and follow the player while it registers the surroundings.",
      "The technology is developed to handle varying light conditions on the course.",
    ],
  },
  modesHeading: { no: "Fire måter å bruke Robera", en: "Four ways to use Robera" },
  accessoriesEyebrow: { no: "Tilbehør", en: "Accessories" },
  accessoriesHeading: { no: "Gjør Robera komplett", en: "Make Robera complete" },
  accessoriesLead: { no: "Robera Pro kan leveres med:", en: "Robera Pro can be supplied with:" },
  accessoriesNote: {
    no: "Tilbehøret gir klubbens proshop gode muligheter for pakkesalg og mersalg.",
    en: "The accessories give the club's pro shop good opportunities for bundle sales and upselling.",
  },
  clubsEyebrow: { no: "For golfklubber", en: "For golf clubs" },
  clubsHeading: {
    no: "Et nytt salgsprodukt for norske golfklubber",
    en: "A new product to sell for Norwegian golf clubs",
  },
  clubsBody: {
    no: [
      "Norsk Golfallianse har agentur på Robera Pro i Norge.",
      "Vi ønsker å gjøre Robera Pro tilgjengelig gjennom norske golfklubber og proshoper, og tilbyr samarbeidsmodeller som gir klubbene mulighet til å skape nye inntekter gjennom salg til egne medlemmer.",
      "Robera Pro egner seg spesielt godt som demoprodukt. Når spilleren får prøve AI Follow Me ute på banen, blir forskjellen fra en tradisjonell el-tralle raskt tydelig.",
    ],
    en: [
      "Norsk Golfallianse holds the agency for Robera Pro in Norway.",
      "We want to make Robera Pro available through Norwegian golf clubs and pro shops, and offer partnership models that let clubs create new revenue through sales to their own members.",
      "Robera Pro is especially well suited as a demo product. Once a player gets to try AI Follow Me out on the course, the difference from a traditional electric trolley quickly becomes clear.",
    ],
  },
  closing: { no: "Denne må prøves på golfbanen.", en: "This one has to be tried on the course." },
  specsHeading: { no: "Tekniske detaljer", en: "Technical details" },
} satisfies Record<string, Copy | { no: string[]; en: string[] }>;

function getModes(locale: Locale) {
  return [
    {
      icon: RobotIcon,
      title: { no: "AI Follow Me", en: "AI Follow Me" },
      body: { no: "Trallen følger spilleren automatisk.", en: "The trolley follows the player automatically." },
    },
    {
      icon: ArrowRightIcon,
      title: { no: "Marching Mode", en: "Marching Mode" },
      body: {
        no: "Trallen kan bevege seg foran spilleren.",
        en: "The trolley can move ahead of the player.",
      },
    },
    {
      icon: TargetIcon,
      title: { no: "Fjernkontroll", en: "Remote control" },
      body: {
        no: "Styr trallen selv med den medfølgende fjernkontrollen. Rekkevidde opptil 100 meter.",
        en: "Steer the trolley yourself with the included remote. Range up to 100 metres.",
      },
    },
    {
      icon: FlagIcon,
      title: { no: "Hastighetskontroll", en: "Speed control" },
      body: {
        no: "Velg mellom hastighetsnivå 1–9 og tilpass trallen til spilleren og terrenget.",
        en: "Choose between speed levels 1–9 and adapt the trolley to the player and the terrain.",
      },
    },
  ].map((mode) => ({ ...mode, title: pick(mode.title, locale), body: pick(mode.body, locale) }));
}

const accessories = [
  { no: "Paraplyholder", en: "Umbrella holder" },
  { no: "Koppholder", en: "Cup holder" },
  { no: "Mobilholder", en: "Phone holder" },
  { no: "Scorekortklips", en: "Scorecard clip" },
  { no: "Sete", en: "Seat" },
  { no: "Ekstra batteri 22,2 V / 13,5 Ah", en: "Spare battery 22.2 V / 13.5 Ah" },
];

export function RoberaProShowcase({
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
  const modes = getModes(locale);
  const dealerHref = routes.quote(locale, product.slug);
  const demoHref = routes.quote(locale, product.slug);

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
              {name}
            </p>
            <h1 className="text-4xl font-semibold text-balance text-ink sm:text-5xl">
              {pick(copy.heroTitle, locale)}
            </h1>

            {product.audience.length > 0 ? (
              <div className="mt-5 flex flex-wrap gap-2">
                {product.audience.map((entry) => (
                  <Badge key={entry} tone="neutral">
                    {dict.audience[entry]}
                  </Badge>
                ))}
              </div>
            ) : null}

            <Prose className="mt-6">
              {pick(product.description, locale).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </Prose>

            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={dealerHref} size="lg">
                {pick(copy.dealerCta, locale)}
              </ButtonLink>
              <ButtonLink href={demoHref} variant="secondary" size="lg">
                {pick(copy.demoCta, locale)}
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

      {/* Uthevet budskap */}
      <div className="bg-pine text-paper">
        <Container size="wide" className="py-14 text-center sm:py-20">
          <p className="mx-auto max-w-3xl text-balance text-3xl font-semibold leading-tight sm:text-4xl">
            {pick(copy.bannerLead, locale)}{" "}
            <span className="text-brass-soft">{pick(copy.bannerTrail, locale)}</span>
          </p>
        </Container>
      </div>

      {/* Hovedfunksjoner */}
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

      {/* AI Follow Me */}
      <div className="border-y border-line bg-sand">
        <Container size="wide" className="py-16 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <div>
              <p
                className="mb-3 text-xs font-semibold uppercase tracking-[0.18em]"
                style={{ color: category.accent }}
              >
                {pick(copy.followEyebrow, locale)}
              </p>
              <h2 className="text-3xl font-semibold text-balance text-ink sm:text-4xl">
                {pick(copy.followHeading, locale)}
              </h2>
            </div>
            <Prose>
              {pick(copy.followBody, locale).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </Prose>
          </div>
        </Container>
      </div>

      {/* Teknologi + spesifikasjoner */}
      <Container size="wide" className="py-16 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div>
            <p
              className="mb-3 text-xs font-semibold uppercase tracking-[0.18em]"
              style={{ color: category.accent }}
            >
              {pick(copy.techEyebrow, locale)}
            </p>
            <h2 className="text-3xl font-semibold text-balance text-ink sm:text-4xl">
              {pick(copy.techHeading, locale)}
            </h2>
            <Prose className="mt-5">
              {pick(copy.techBody, locale).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </Prose>
          </div>

          {product.specs.length > 0 ? (
            <div className="rounded-(--radius-card) border border-line bg-sand p-6 sm:p-7">
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-ink-muted">
                {pick(copy.specsHeading, locale)}
              </h3>
              <dl className="mt-4 divide-y divide-line">
                {product.specs.map((spec) => {
                  const label = pick(spec.label, locale);
                  return (
                    <div key={label} className="grid grid-cols-2 gap-4 py-3">
                      <dt className="text-sm text-ink-muted">{label}</dt>
                      <dd className="text-sm font-medium text-ink">{pick(spec.value, locale)}</dd>
                    </div>
                  );
                })}
              </dl>
            </div>
          ) : null}
        </div>
      </Container>

      {/* Fire måter */}
      <div className="border-t border-line bg-sand">
        <Container size="wide" className="py-16 sm:py-24">
          <h2 className="text-2xl font-semibold text-ink sm:text-3xl">
            {pick(copy.modesHeading, locale)}
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {modes.map((mode) => {
              const ModeIcon = mode.icon;
              return (
                <div
                  key={mode.title}
                  className="flex flex-col rounded-(--radius-card) border border-line bg-paper p-6"
                >
                  <span
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full"
                    style={{ backgroundColor: `${category.accent}1a`, color: category.accent }}
                  >
                    <ModeIcon className="h-5.5 w-5.5" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-ink">{mode.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{mode.body}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </div>

      {/* Tilbehør */}
      <Container size="wide" className="py-16 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div>
            <p
              className="mb-3 text-xs font-semibold uppercase tracking-[0.18em]"
              style={{ color: category.accent }}
            >
              {pick(copy.accessoriesEyebrow, locale)}
            </p>
            <h2 className="text-3xl font-semibold text-balance text-ink sm:text-4xl">
              {pick(copy.accessoriesHeading, locale)}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-soft">
              {pick(copy.accessoriesNote, locale)}
            </p>
          </div>

          <div>
            <p className="text-base font-medium text-ink">{pick(copy.accessoriesLead, locale)}</p>
            <ul className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {accessories.map((accessory) => (
                <li
                  key={accessory.no}
                  className="flex gap-3 border-b border-line py-3 text-base text-ink-soft"
                >
                  <CheckIcon className="mt-1 h-4.5 w-4.5 shrink-0 text-pine" />
                  {pick(accessory, locale)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      {/* For golfklubber */}
      <div className="border-y border-line bg-sand">
        <Container size="wide" className="py-16 sm:py-24">
          <div className="max-w-3xl">
            <p
              className="mb-3 text-xs font-semibold uppercase tracking-[0.18em]"
              style={{ color: category.accent }}
            >
              {pick(copy.clubsEyebrow, locale)}
            </p>
            <h2 className="text-3xl font-semibold text-balance text-ink sm:text-4xl">
              {pick(copy.clubsHeading, locale)}
            </h2>
            <Prose className="mt-5">
              {pick(copy.clubsBody, locale).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </Prose>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={dealerHref} size="lg">
                {pick(copy.dealerCta, locale)}
              </ButtonLink>
              <ButtonLink href={demoHref} variant="secondary" size="lg">
                {pick(copy.demoCta, locale)}
              </ButtonLink>
            </div>
          </div>
        </Container>
      </div>

      {/* Avsluttende budskap */}
      <div className="bg-pine text-paper">
        <Container size="wide" className="py-16 text-center sm:py-20">
          <p className="mx-auto max-w-2xl text-balance text-3xl font-semibold leading-tight sm:text-4xl">
            {pick(copy.closing, locale)}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href={dealerHref} variant="onPine" size="lg">
              {pick(copy.dealerCta, locale)}
            </ButtonLink>
            <ButtonLink
              href={demoHref}
              size="lg"
              className="bg-transparent text-paper ring-1 ring-inset ring-paper/50 hover:bg-paper/10"
            >
              {pick(copy.demoCta, locale)}
            </ButtonLink>
          </div>
        </Container>
      </div>
    </>
  );
}
