import Image from "next/image";

import { ButtonLink, Container } from "@/components/layout-primitives";
import type { SiteContent } from "@/lib/content/types";
import { pick, type Locale } from "@/lib/i18n/config";
import { routes } from "@/lib/i18n/routes";

/**
 * Forsidens toppseksjon: tekst til venstre og hovedbildet til høyre med
 * golfbil, ballplukker og el-tralle samlet i ett bilde. Teksten og bildet
 * ligger i `content/site.json` under `home.hero`.
 */
export function HomeHero({
  site,
  locale,
}: {
  site: SiteContent;
  locale: Locale;
}) {
  const hero = site.home.hero;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sand via-sand to-paper">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(72% 68% at 14% 0%, color-mix(in srgb, var(--color-pine-50) 85%, transparent) 0%, transparent 58%), radial-gradient(48% 55% at 92% 8%, var(--color-brass-soft) 0%, transparent 55%)",
        }}
      />

      <Container size="wide" className="relative">
        <div className="grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div className="max-w-xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-pine">
              {pick(hero.eyebrow, locale)}
            </p>
            <h1 className="text-4xl font-semibold leading-[1.08] text-ink text-balance sm:text-5xl lg:text-6xl">
              {pick(hero.title, locale)}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft">
              {pick(hero.body, locale)}
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href={routes.products(locale)} size="lg">
                {pick(hero.primaryCta, locale)}
              </ButtonLink>
              <ButtonLink href={routes.contact(locale)} variant="secondary" size="lg">
                {pick(hero.secondaryCta, locale)}
              </ButtonLink>
            </div>
          </div>

          <div className="relative aspect-16/9 overflow-hidden rounded-(--radius-card) border border-line bg-paper shadow-sm">
            <Image
              src={hero.image}
              alt={pick(hero.imageAlt, locale)}
              fill
              priority
              sizes="(max-width: 1024px) 92vw, 52vw"
              className="object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
