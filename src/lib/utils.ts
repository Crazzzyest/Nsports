export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

/** Blander aksentfargen inn i sandbakgrunnen. Brukes til plassholderbilder og kategorimerker. */
export function tint(accent: string, percent: number): string {
  return `color-mix(in srgb, ${accent} ${percent}%, var(--color-sand))`;
}
