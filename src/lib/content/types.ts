import type { Localized } from "@/lib/i18n/config";

/**
 * Hvem produktet retter seg mot. Vises som et lite merke i dag, men er
 * først og fremst lagt inn med tanke på ulike priser mot klubb og
 * privatkunde i en senere nettbutikk.
 */
export const audiences = ["klubb", "proshop", "privat"] as const;
export type Audience = (typeof audiences)[number];

export type IconKey =
  | "cart"
  | "target"
  | "robot"
  | "ball"
  | "tag"
  | "truck"
  | "shield"
  | "leaf";

export interface Category {
  slug: string;
  name: Localized;
  tagline: Localized;
  description: Localized<string[]>;
  accent: string;
  icon: IconKey;
  order: number;
}

export interface ProductImage {
  /** Sti under /public, f.eks. "/bilder/produkter/golfbil-1.jpg". Uten sti vises en plassholder. */
  src?: string;
  alt: Localized;
  /**
   * Hvordan bildet fyller rammen. "contain" (standard) passer produktfoto på
   * hvit bakgrunn, mens "cover" fyller hele flaten og egner seg for helfoto.
   */
  fit?: "contain" | "cover";
}

export interface Spec {
  label: Localized;
  value: Localized;
}

export interface Variant {
  name: Localized;
  note?: Localized;
}

export interface Datasheet {
  label: Localized;
  /** Sti under /public/datablad. Uten fil vises «Be om produktark» i stedet. */
  file?: string;
}

export interface Product {
  slug: string;
  category: string;
  name: Localized;
  tagline: Localized;
  description: Localized<string[]>;
  highlights: Localized<string[]>;
  specs: Spec[];
  variants: Variant[];
  datasheets: Datasheet[];
  images: ProductImage[];
  audience: Audience[];
  featured: boolean;
  order: number;
}

export interface SiteContent {
  brand: {
    name: string;
    legalName: Localized;
    tagline: Localized;
  };
  contact: {
    email: string;
    phone: string;
    orgNumber: string;
    address: { street: string; postalCode: string; city: string; country: Localized };
  };
  seo: {
    title: Localized;
    description: Localized;
  };
  hero: {
    eyebrow: Localized;
    title: Localized;
    body: Localized;
  };
  home: {
    hero: {
      eyebrow: Localized;
      title: Localized;
      body: Localized;
      primaryCta: Localized;
      secondaryCta: Localized;
      image: string;
      imageAlt: Localized;
    };
    benefits: { icon: IconKey; title: Localized; body: Localized }[];
    alliance: {
      heading: Localized;
      body: Localized<string[]>;
      cta: Localized;
      image: string;
      imageAlt: Localized;
    };
    project: { heading: Localized; body: Localized<string[]>; cta: Localized };
    finalCta: {
      heading: Localized;
      body: Localized;
      primaryCta: Localized;
      secondaryCta: Localized;
    };
  };
  valueProps: { icon: IconKey; title: Localized; body: Localized }[];
  process: { title: Localized; body: Localized }[];
  about: {
    lead: Localized;
    sections: { heading: Localized; body: Localized<string[]> }[];
  };
  contactPage: {
    lead: Localized;
    faq: { question: Localized; answer: Localized }[];
  };
}

export interface CategoryWithProducts extends Category {
  products: Product[];
}
