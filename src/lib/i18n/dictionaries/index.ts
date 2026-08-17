import type { Locale } from "../config";
import no, { type Dictionary } from "./no";
import en from "./en";

const dictionaries: Record<Locale, Dictionary> = { no, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? no;
}

export type { Dictionary };
