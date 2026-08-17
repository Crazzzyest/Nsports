import type { Metadata } from "next";

import { ButtonLink, Container } from "@/components/layout-primitives";
import { defaultLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { routes } from "@/lib/i18n/routes";

export const metadata: Metadata = {
  title: getDictionary(defaultLocale).notFound.heading,
  robots: { index: false, follow: true },
};

export default function LocaleNotFound() {
  // Segmentet er ikke tilgjengelig her, så teksten står på standardspråket.
  const dict = getDictionary(defaultLocale);

  return (
    <Container size="narrow" className="py-28 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-pine-400">404</p>
      <h1 className="mt-3 text-4xl font-semibold text-ink">{dict.notFound.heading}</h1>
      <p className="mt-4 text-lg leading-relaxed text-ink-soft">{dict.notFound.body}</p>
      <ButtonLink href={routes.home(defaultLocale)} size="lg" className="mt-8">
        {dict.notFound.action}
      </ButtonLink>
    </Container>
  );
}
