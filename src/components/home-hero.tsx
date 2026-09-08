import Image from "next/image";

import { ButtonLink, Container } from "@/components/layout-primitives";
import type { SiteContent } from "@/lib/content/types";
import { pick, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { routes } from "@/lib/i18n/routes";

/**
 * Forsidens toppseksjon: et bredt helfoto av et nordisk golfanlegg med en
 * mørk gradient som gir teksten god kontrast. Innhold og bilde ligger i
 * `content/site.json` under `home.hero`, slik at de kan endres uten utvikler.
 */
export function HomeHero({
  site,
  locale,
}: {
  site: SiteContent;
  locale: Locale;
  dict: Dictionary;
}) {
  const hero = site.home.hero;

  return (
    <section className="relative isolate flex min-h-[540px] items-center overflow-hidden sm:min-h-[620px]">
      <Image
        src={hero.image}
        alt={pick(hero.imageAlt, locale)}
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(90deg, color-mix(in srgb, var(--color-ink) 84%, transparent) 0%, color-mix(in srgb, var(--color-ink) 58%, transparent) 46%, color-mix(in srgb, var(--color-ink) 18%, transparent) 100%), linear-gradient(0deg, color-mix(in srgb, var(--color-ink) 55%, transparent) 0%, transparent 55%)",
        }}
      />

      <Container size="wide" className="relative py-20 sm:py-28">
        <div className="max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-pine-100">
            {pick(hero.eyebrow, locale)}
          </p>
          <h1 className="text-4xl font-semibold leading-[1.05] text-paper text-balance sm:text-5xl lg:text-6xl">
            {pick(hero.title, locale)}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/85">
            {pick(hero.body, locale)}
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href={routes.products(locale)} variant="onPine" size="lg">
              {pick(hero.primaryCta, locale)}
            </ButtonLink>
            <ButtonLink href={routes.contact(locale)} variant="onDark" size="lg">
              {pick(hero.secondaryCta, locale)}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
