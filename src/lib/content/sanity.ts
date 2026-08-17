/**
 * Innhold fra Sanity.
 *
 * Tas i bruk automatisk så snart NEXT_PUBLIC_SANITY_PROJECT_ID er satt.
 * Bruker Sanitys HTTP-API direkte, så ingen ekstra pakker er nødvendig.
 * Skjemaene som hører til ligger i `sanity/schemas/`.
 */

import type { Category, Product, SiteContent } from "./types";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-10-01";

export const isConfigured = Boolean(projectId);

async function query<T>(groq: string): Promise<T> {
  if (!projectId) throw new Error("NEXT_PUBLIC_SANITY_PROJECT_ID mangler");

  const url = new URL(
    `/v${apiVersion}/data/query/${dataset}`,
    `https://${projectId}.apicdn.sanity.io`,
  );
  url.searchParams.set("query", groq);

  const response = await fetch(url, {
    headers: process.env.SANITY_READ_TOKEN
      ? { Authorization: `Bearer ${process.env.SANITY_READ_TOKEN}` }
      : undefined,
    next: { revalidate: 60, tags: ["sanity"] },
  });

  if (!response.ok) {
    throw new Error(`Sanity svarte ${response.status}: ${await response.text()}`);
  }

  const body = (await response.json()) as { result: T };
  return body.result;
}

/** Felles projeksjoner. Feltnavnene er de samme som i JSON-filene. */
const localized = `{ no, en, sv, da }`;
const imageFields = `{ "src": asset->url, alt ${localized} }`;

const productProjection = `{
  "slug": slug.current,
  "category": category->slug.current,
  name ${localized},
  tagline ${localized},
  description ${localized},
  highlights ${localized},
  "specs": specs[]{ label ${localized}, value ${localized} },
  "variants": variants[]{ name ${localized}, note ${localized} },
  "datasheets": datasheets[]{ label ${localized}, "file": file.asset->url },
  "images": images[] ${imageFields},
  audience,
  featured,
  order
}`;

const categoryProjection = `{
  "slug": slug.current,
  name ${localized},
  tagline ${localized},
  description ${localized},
  accent,
  icon,
  order
}`;

export async function getCategories(): Promise<Category[]> {
  return query<Category[]>(`*[_type == "category"] | order(order asc) ${categoryProjection}`);
}

export async function getProducts(): Promise<Product[]> {
  return query<Product[]>(`*[_type == "product"] | order(order asc) ${productProjection}`);
}

export async function getSite(): Promise<SiteContent> {
  return query<SiteContent>(`*[_type == "site"][0]`);
}
