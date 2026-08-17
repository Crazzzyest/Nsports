"use client";

import { useMemo, useState } from "react";

import { ProductCard } from "@/components/product-card";
import { audiences, type Audience, type Category, type Product } from "@/lib/content/types";
import { pick, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { plural } from "@/lib/i18n/format";
import { cn } from "@/lib/utils";

type Filter = string | "all";

export function ProductExplorer({
  products,
  categories,
  locale,
  dict,
  initialCategory = "all",
}: {
  products: Product[];
  categories: Category[];
  locale: Locale;
  dict: Dictionary;
  initialCategory?: Filter;
}) {
  const [category, setCategory] = useState<Filter>(initialCategory);
  const [audience, setAudience] = useState<Audience | "all">("all");

  const categoryBySlug = useMemo(
    () => new Map(categories.map((entry) => [entry.slug, entry])),
    [categories],
  );

  const visible = useMemo(
    () =>
      products.filter(
        (product) =>
          (category === "all" || product.category === category) &&
          (audience === "all" || product.audience.includes(audience)),
      ),
    [products, category, audience],
  );

  const filtered = category !== "all" || audience !== "all";

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-line pb-6">
        <FilterRow label={dict.products.filterByCategory}>
          <Chip active={category === "all"} onClick={() => setCategory("all")}>
            {dict.products.all}
          </Chip>
          {categories.map((entry) => (
            <Chip
              key={entry.slug}
              active={category === entry.slug}
              onClick={() => setCategory(entry.slug)}
            >
              {pick(entry.name, locale)}
            </Chip>
          ))}
        </FilterRow>

        <FilterRow label={dict.products.filterByAudience}>
          <Chip active={audience === "all"} onClick={() => setAudience("all")}>
            {dict.products.all}
          </Chip>
          {audiences.map((entry) => (
            <Chip key={entry} active={audience === entry} onClick={() => setAudience(entry)}>
              {dict.audience[entry]}
            </Chip>
          ))}
        </FilterRow>
      </div>

      <div className="flex items-center justify-between py-6">
        <p className="text-sm text-ink-muted" aria-live="polite">
          {plural(dict.products.resultCount, visible.length)}
        </p>
        {filtered ? (
          <button
            type="button"
            onClick={() => {
              setCategory("all");
              setAudience("all");
            }}
            className="text-sm font-medium text-pine underline-offset-4 hover:underline"
          >
            {dict.products.clearFilters}
          </button>
        ) : null}
      </div>

      {visible.length === 0 ? (
        <p className="rounded-(--radius-card) border border-dashed border-line-strong px-6 py-16 text-center text-ink-muted">
          {dict.products.empty}
        </p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((product) => {
            const entry = categoryBySlug.get(product.category);
            if (!entry) return null;
            return (
              <ProductCard
                key={product.slug}
                product={product}
                category={entry}
                locale={locale}
                dict={dict}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

function FilterRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted sm:w-24 sm:shrink-0">
        {label}
      </span>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
        active
          ? "border-pine bg-pine text-paper"
          : "border-line bg-paper text-ink-soft hover:border-line-strong hover:text-ink",
      )}
    >
      {children}
    </button>
  );
}
