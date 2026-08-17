"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { GlobeIcon } from "@/components/icons";
import { localeNames, locales, type Locale } from "@/lib/i18n/config";
import { translatePath } from "@/lib/i18n/routes";
import { cn } from "@/lib/utils";

/**
 * Bytter språk og beholder siden man står på.
 *
 * `translatePath` godtar både den offentlige adressen (/produkter) og den
 * interne (/no/products), så lenken blir den samme uansett hvilken form
 * ruteren rapporterer.
 */
export function LanguageSwitcher({
  locale,
  label,
  className,
  variant = "compact",
  onNavigate,
}: {
  locale: Locale;
  label: string;
  className?: string;
  /** «named» viser språknavn i stedet for landkode, til den lille menyen på mobil. */
  variant?: "compact" | "named";
  onNavigate?: () => void;
}) {
  const pathname = usePathname() ?? "/";

  if (locales.length < 2) return null;

  const named = variant === "named";

  return (
    <div className={cn("flex items-center gap-1", className)} aria-label={label}>
      <GlobeIcon className="mr-1 h-4 w-4 text-ink-muted" />
      {locales.map((candidate) => {
        const active = candidate === locale;
        return (
          <Link
            key={candidate}
            href={translatePath(pathname, locale, candidate)}
            hrefLang={candidate}
            aria-current={active ? "true" : undefined}
            onClick={onNavigate}
            className={cn(
              "rounded-full transition-colors",
              named
                ? "px-3 py-1.5 text-sm font-medium"
                : "px-2 py-1 text-xs font-semibold uppercase tracking-wide",
              active ? "bg-pine-50 text-pine" : "text-ink-muted hover:text-pine",
            )}
          >
            {named ? (
              localeNames[candidate]
            ) : (
              <>
                <span className="sr-only">{localeNames[candidate]}</span>
                <span aria-hidden="true">{candidate}</span>
              </>
            )}
          </Link>
        );
      })}
    </div>
  );
}
