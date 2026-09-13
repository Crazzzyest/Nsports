/**
 * Innhold fra JSON-filene i `content/`.
 *
 * Dette er kilden fram til Sanity kobles på. Filene leses ved bygging, så
 * en endring krever en ny publisering. Se `sanity/README.md` for hvordan
 * man går over til redigering i nettleseren.
 */

import categoriesJson from "@content/categories.json";
import productsJson from "@content/products.json";
import siteJson from "@content/site.json";

import { audiences, type Category, type Product, type SiteContent } from "./types";

function fail(message: string): never {
  throw new Error(`Feil i innholdsfilene: ${message}`);
}

const categories: Category[] = (() => {
  const parsed = categoriesJson as unknown as Category[];
  const seen = new Set<string>();

  for (const category of parsed) {
    if (!category.slug) fail("en kategori mangler «slug»");
    if (seen.has(category.slug)) fail(`kategorien «${category.slug}» finnes flere ganger`);
    if (!category.name?.no) fail(`kategorien «${category.slug}» mangler norsk navn`);
    seen.add(category.slug);
  }

  return [...parsed].sort((a, b) => a.order - b.order);
})();

const products: Product[] = (() => {
  const parsed = productsJson as unknown as Product[];
  const known = new Set(categories.map((category) => category.slug));
  const seen = new Set<string>();

  for (const product of parsed) {
    if (!product.slug) fail("et produkt mangler «slug»");
    if (seen.has(product.slug)) fail(`produktet «${product.slug}» finnes flere ganger`);
    if (!product.name?.no) fail(`produktet «${product.slug}» mangler norsk navn`);
    if (!known.has(product.category)) {
      fail(
        `produktet «${product.slug}» viser til kategorien «${product.category}», som ikke finnes i categories.json`,
      );
    }
    for (const audience of product.audience ?? []) {
      if (!audiences.includes(audience)) {
        fail(`produktet «${product.slug}» har ukjent målgruppe «${audience}»`);
      }
    }
    seen.add(product.slug);
  }

  // Sorteres etter kategorirekkefølgen først, slik at en samlet produktliste
  // ikke hopper mellom kategorier.
  const categoryOrder = new Map(categories.map((category) => [category.slug, category.order]));

  return [...parsed].sort(
    (a, b) =>
      (categoryOrder.get(a.category) ?? 0) - (categoryOrder.get(b.category) ?? 0) ||
      a.order - b.order,
  );
})();

const site = siteJson as unknown as SiteContent;

export async function getCategories(): Promise<Category[]> {
  return categories;
}

export async function getProducts(): Promise<Product[]> {
  return products;
}

export async function getSite(): Promise<SiteContent> {
  return site;
}
