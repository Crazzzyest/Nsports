/**
 * Innholdslaget.
 *
 * Sidene i appen henter alt herfra og vet ikke hvor innholdet kommer fra.
 * Er NEXT_PUBLIC_SANITY_PROJECT_ID satt, leses innholdet fra Sanity.
 * Ellers brukes JSON-filene i `content/`. Overgangen krever ingen endringer
 * i sidene.
 */

import { cache } from "react";

import * as local from "./local";
import * as sanity from "./sanity";
import type { Category, CategoryWithProducts, Product, SiteContent } from "./types";

const source = sanity.isConfigured ? sanity : local;

export const contentSource: "sanity" | "json" = sanity.isConfigured ? "sanity" : "json";

export const getCategories = cache(async (): Promise<Category[]> => source.getCategories());
export const getProducts = cache(async (): Promise<Product[]> => source.getProducts());
export const getSite = cache(async (): Promise<SiteContent> => source.getSite());

export const getProduct = cache(async (slug: string): Promise<Product | undefined> => {
  const products = await getProducts();
  return products.find((product) => product.slug === slug);
});

export const getCategory = cache(async (slug: string): Promise<Category | undefined> => {
  const categories = await getCategories();
  return categories.find((category) => category.slug === slug);
});

export const getProductsByCategory = cache(async (slug: string): Promise<Product[]> => {
  const products = await getProducts();
  return products.filter((product) => product.category === slug);
});

export const getFeaturedProducts = cache(async (limit = 6): Promise<Product[]> => {
  const products = await getProducts();
  const featured = products.filter((product) => product.featured);
  return (featured.length > 0 ? featured : products).slice(0, limit);
});

export const getCategoriesWithProducts = cache(async (): Promise<CategoryWithProducts[]> => {
  const [categories, products] = await Promise.all([getCategories(), getProducts()]);
  return categories.map((category) => ({
    ...category,
    products: products.filter((product) => product.category === category.slug),
  }));
});

/**
 * Andre produkter til bunnen av en produktside. Kategorier med bare ett produkt
 * fylles opp med utvalgte varer, slik at siden aldri blir en blindvei.
 */
export const getRelatedProducts = cache(
  async (product: Product, limit = 3): Promise<Product[]> => {
    const siblings = await getProductsByCategory(product.category);
    const related = siblings.filter((candidate) => candidate.slug !== product.slug);

    if (related.length < limit) {
      const fallback = await getFeaturedProducts(limit + 2);
      for (const candidate of fallback) {
        if (related.length >= limit) break;
        if (candidate.slug === product.slug) continue;
        if (related.some((entry) => entry.slug === candidate.slug)) continue;
        related.push(candidate);
      }
    }

    return related.slice(0, limit);
  },
);

export type { Category, CategoryWithProducts, Product, SiteContent };
export { audiences, type Audience, type IconKey } from "./types";
