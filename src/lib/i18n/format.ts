/**
 * Setter inn verdier i tekster med {plassholdere}.
 *
 * Ordbøkene inneholder bare tekst, aldri funksjoner, slik at de kan sendes
 * uendret fra server til nettleser.
 */
export function format(
  template: string,
  values: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}

export type PluralText = { one: string; other: string };

export function plural(text: PluralText, count: number): string {
  return format(count === 1 ? text.one : text.other, { count });
}
