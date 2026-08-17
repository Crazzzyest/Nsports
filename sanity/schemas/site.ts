import { defineArrayMember, defineField, defineType } from "sanity";

import { iconOptions } from "./category";

/**
 * Ett enkelt dokument med alt som ikke hører til et produkt: firmaopplysninger,
 * forsidetekst, om oss og ofte stilte spørsmål.
 */
export const site = defineType({
  name: "site",
  title: "Nettstedsinnhold",
  type: "document",
  groups: [
    { name: "company", title: "Firma", default: true },
    { name: "home", title: "Forside" },
    { name: "about", title: "Om oss" },
    { name: "contact", title: "Kontaktside" },
    { name: "seo", title: "Søk og deling" },
  ],
  fields: [
    defineField({
      name: "brand",
      title: "Merkevare",
      type: "object",
      group: "company",
      fields: [
        defineField({ name: "name", title: "Navn", type: "string", initialValue: "NSports" }),
        defineField({ name: "legalName", title: "Juridisk navn", type: "localizedString" }),
        defineField({ name: "tagline", title: "Undertittel", type: "localizedString" }),
      ],
    }),
    defineField({
      name: "contact",
      title: "Kontaktopplysninger",
      type: "object",
      group: "company",
      fields: [
        defineField({ name: "email", title: "E-post", type: "string" }),
        defineField({ name: "phone", title: "Telefon", type: "string" }),
        defineField({ name: "orgNumber", title: "Organisasjonsnummer", type: "string" }),
        defineField({
          name: "address",
          title: "Adresse",
          type: "object",
          fields: [
            defineField({ name: "street", title: "Gate", type: "string" }),
            defineField({ name: "postalCode", title: "Postnummer", type: "string" }),
            defineField({ name: "city", title: "Poststed", type: "string" }),
            defineField({ name: "country", title: "Land", type: "localizedString" }),
          ],
        }),
      ],
    }),

    defineField({
      name: "hero",
      title: "Toppseksjon på forsiden",
      type: "object",
      group: "home",
      fields: [
        defineField({ name: "eyebrow", title: "Overtittel", type: "localizedString" }),
        defineField({ name: "title", title: "Tittel", type: "localizedString" }),
        defineField({ name: "body", title: "Ingress", type: "localizedText" }),
      ],
    }),
    defineField({
      name: "valueProps",
      title: "Tre punkter under toppseksjonen",
      type: "array",
      group: "home",
      of: [
        defineArrayMember({
          type: "object",
          name: "valueProp",
          fields: [
            defineField({
              name: "icon",
              title: "Ikon",
              type: "string",
              options: { list: iconOptions },
            }),
            defineField({ name: "title", title: "Tittel", type: "localizedString" }),
            defineField({ name: "body", title: "Tekst", type: "localizedText" }),
          ],
          preview: { select: { title: "title.no" } },
        }),
      ],
      validation: (rule) => rule.max(3),
    }),
    defineField({
      name: "process",
      title: "Slik jobber vi",
      type: "array",
      group: "home",
      of: [
        defineArrayMember({
          type: "object",
          name: "step",
          fields: [
            defineField({ name: "title", title: "Steg", type: "localizedString" }),
            defineField({ name: "body", title: "Tekst", type: "localizedText" }),
          ],
          preview: { select: { title: "title.no" } },
        }),
      ],
    }),

    defineField({
      name: "about",
      title: "Om oss",
      type: "object",
      group: "about",
      fields: [
        defineField({ name: "lead", title: "Ingress", type: "localizedText" }),
        defineField({
          name: "sections",
          title: "Avsnitt",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              name: "section",
              fields: [
                defineField({ name: "heading", title: "Overskrift", type: "localizedString" }),
                defineField({ name: "body", title: "Tekst", type: "localizedList" }),
              ],
              preview: { select: { title: "heading.no" } },
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: "contactPage",
      title: "Kontaktside",
      type: "object",
      group: "contact",
      fields: [
        defineField({ name: "lead", title: "Ingress", type: "localizedText" }),
        defineField({
          name: "faq",
          title: "Ofte stilte spørsmål",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              name: "faqItem",
              fields: [
                defineField({ name: "question", title: "Spørsmål", type: "localizedString" }),
                defineField({ name: "answer", title: "Svar", type: "localizedText" }),
              ],
              preview: { select: { title: "question.no" } },
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: "seo",
      title: "Standardtekst for søk og deling",
      type: "object",
      group: "seo",
      fields: [
        defineField({ name: "title", title: "Sidetittel", type: "localizedString" }),
        defineField({ name: "description", title: "Beskrivelse", type: "localizedText" }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Nettstedsinnhold" }) },
});
