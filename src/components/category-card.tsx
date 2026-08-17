import Link from "next/link";

import { ArrowRightIcon, Icon } from "@/components/icons";
import type { CategoryWithProducts } from "@/lib/content/types";
import { pick, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { plural } from "@/lib/i18n/format";
import { routes } from "@/lib/i18n/routes";
import { tint } from "@/lib/utils";

export function CategoryCard({
  category,
  locale,
  dict,
}: {
  category: CategoryWithProducts;
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <Link
      href={routes.category(locale, category.slug)}
      className="group relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-(--radius-card) border border-line p-6 transition-colors hover:border-line-strong"
      style={{ backgroundColor: tint(category.accent, 13) }}
    >
      <div>
        <span
          className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-paper/80"
          style={{ color: category.accent }}
        >
          <Icon name={category.icon} className="h-6 w-6" />
        </span>

        <h3 className="mt-5 text-xl font-semibold text-ink">{pick(category.name, locale)}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          {pick(category.tagline, locale)}
        </p>
      </div>

      <div className="flex items-center justify-between text-sm font-medium">
        <span className="text-ink-muted">
          {plural(dict.products.resultCount, category.products.length)}
        </span>
        <span
          className="inline-flex items-center gap-1.5"
          style={{ color: category.accent }}
        >
          {dict.actions.seeCategory}
          <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
