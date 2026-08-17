import Link from "next/link";

import { ArrowRightIcon } from "@/components/icons";
import { ProductMedia } from "@/components/product-media";
import type { Category, Product } from "@/lib/content/types";
import { pick, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { routes } from "@/lib/i18n/routes";
import { cn } from "@/lib/utils";

export function ProductCard({
  product,
  category,
  locale,
  dict,
  priority = false,
  showCategory = true,
}: {
  product: Product;
  category: Category;
  locale: Locale;
  dict: Dictionary;
  priority?: boolean;
  showCategory?: boolean;
}) {
  const name = pick(product.name, locale);

  return (
    <Link
      href={routes.product(locale, product.slug)}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-(--radius-card) border border-line bg-paper",
        "transition-shadow hover:shadow-[0_12px_32px_-18px_rgba(20,24,26,0.4)]",
      )}
    >
      <div className="relative aspect-4/3 overflow-hidden bg-sand">
        <ProductMedia
          image={product.images[0]}
          accent={category.accent}
          icon={category.icon}
          seed={product.slug}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
          missingLabel={dict.product.imageMissing}
          className="transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        {showCategory ? (
          <span
            className="text-xs font-semibold uppercase tracking-[0.14em]"
            style={{ color: category.accent }}
          >
            {pick(category.name, locale)}
          </span>
        ) : null}

        <h3 className="text-lg font-semibold text-ink">{name}</h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-ink-muted">
          {pick(product.tagline, locale)}
        </p>

        <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-sm font-medium text-pine">
          {dict.actions.seeProduct}
          <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
