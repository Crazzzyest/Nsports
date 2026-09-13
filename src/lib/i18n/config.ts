/**
 * Språkoppsett for NordicSports.
 *
 * `locales` er språkene som er aktive på nettsiden. `plannedLocales` er språk
 * innholdsmodellen allerede aksepterer tekst for, men som ikke er publisert.
 *
 * Slik slår du på svensk:
 *   1. Flytt 'sv' fra `plannedLocales` til `locales`.
 *   2. Lag `src/lib/i18n/dictionaries/sv.ts` (kopier `no.ts` og oversett).
 *   3. Registrer den i `src/lib/i18n/dictionaries/index.ts`.
 *   4. Legg til svenske tekster i `content/*.json` der de mangler.
 * Felter uten svensk tekst faller automatisk tilbake til norsk.
 */

export const locales = ["no", "en"] as const;
export const plannedLocales = ["sv", "da"] as const;

export const defaultLocale = "no" satisfies (typeof locales)[number];

export type Locale = (typeof locales)[number];
export type PlannedLocale = (typeof plannedLocales)[number];
export type ContentLocale = Locale | PlannedLocale;

/** Tekst som finnes på flere språk. Norsk er påkrevd og brukes som fallback. */
export type Localized<T = string> = { no: T } & Partial<Record<ContentLocale, T>>;

export const localeNames: Record<ContentLocale, string> = {
  no: "Norsk",
  en: "English",
  sv: "Svenska",
  da: "Dansk",
};

/** Brukes i <html lang> og i hreflang-taggene. */
export const localeHtmlLang: Record<ContentLocale, string> = {
  no: "nb-NO",
  en: "en",
  sv: "sv-SE",
  da: "da-DK",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Henter riktig språkversjon, med fall tilbake til norsk. */
export function pick<T>(value: Localized<T>, locale: ContentLocale): T {
  return value[locale] ?? value[defaultLocale];
}
