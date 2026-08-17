#!/usr/bin/env node
/**
 * Gjør innholdet i `content/` om til en NDJSON-fil Sanity kan importere.
 *
 *   npm run sanity:export
 *   npx sanity dataset import sanity/export.ndjson production
 *
 * Bilder og PDF-er er ikke med. De lastes opp i Sanity Studio etterpå, siden
 * de må registreres som filer i prosjektet for å få en adresse.
 */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outputPath = join(root, "sanity", "export.ndjson");

const readJson = async (name) =>
  JSON.parse(await readFile(join(root, "content", name), "utf8"));

const [categories, products, site] = await Promise.all([
  readJson("categories.json"),
  readJson("products.json"),
  readJson("site.json"),
]);

const documents = [];

for (const category of categories) {
  documents.push({
    _id: `category.${category.slug}`,
    _type: "category",
    name: category.name,
    slug: { _type: "slug", current: category.slug },
    tagline: category.tagline,
    description: category.description,
    accent: category.accent,
    icon: category.icon,
    order: category.order,
  });
}

for (const product of products) {
  documents.push({
    _id: `product.${product.slug}`,
    _type: "product",
    name: product.name,
    slug: { _type: "slug", current: product.slug },
    category: { _type: "reference", _ref: `category.${product.category}` },
    tagline: product.tagline,
    highlights: product.highlights,
    description: product.description,
    specs: product.specs.map((spec, index) => ({
      _key: `spec-${index}`,
      _type: "spec",
      label: spec.label,
      value: spec.value,
    })),
    variants: product.variants.map((variant, index) => ({
      _key: `variant-${index}`,
      _type: "variant",
      name: variant.name,
      note: variant.note,
    })),
    datasheets: product.datasheets.map((datasheet, index) => ({
      _key: `datasheet-${index}`,
      _type: "datasheet",
      label: datasheet.label,
    })),
    audience: product.audience,
    featured: product.featured,
    order: product.order,
  });
}

const withKeys = (items, type) =>
  items.map((item, index) => ({ _key: `${type}-${index}`, _type: type, ...item }));

documents.push({
  _id: "site",
  _type: "site",
  brand: site.brand,
  contact: site.contact,
  seo: site.seo,
  hero: site.hero,
  valueProps: withKeys(site.valueProps, "valueProp"),
  process: withKeys(site.process, "step"),
  about: {
    lead: site.about.lead,
    sections: withKeys(site.about.sections, "section"),
  },
  contactPage: {
    lead: site.contactPage.lead,
    faq: withKeys(site.contactPage.faq, "faqItem"),
  },
});

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, documents.map((doc) => JSON.stringify(doc)).join("\n") + "\n");

console.log(
  `Skrev ${documents.length} dokumenter til sanity/export.ndjson ` +
    `(${categories.length} kategorier, ${products.length} produkter, 1 nettstedsdokument).`,
);
