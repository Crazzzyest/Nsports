import { defineArrayMember, defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Produkt",
  type: "document",
  groups: [
    { name: "content", title: "Innhold", default: true },
    { name: "specs", title: "Spesifikasjoner" },
    { name: "media", title: "Bilder og dokumenter" },
    { name: "settings", title: "Innstillinger" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Produktnavn",
      type: "localizedString",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Adresse",
      type: "slug",
      group: "content",
      description: "Delen av adressen etter /produkter/. Bør ikke endres etter publisering.",
      options: { source: "name.no", maxLength: 60 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Kategori",
      type: "reference",
      to: [{ type: "category" }],
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Kort beskrivelse",
      type: "localizedString",
      group: "content",
      description: "Én setning. Vises på produktkortene og i søkeresultater.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "highlights",
      title: "Kort fortalt",
      type: "localizedList",
      group: "content",
      description: "Tre til fem punkter. Vises med hake ved siden av produktbildet.",
    }),
    defineField({
      name: "description",
      title: "Om produktet",
      type: "localizedList",
      group: "content",
      description: "Ett avsnitt per punkt.",
    }),

    defineField({
      name: "specs",
      title: "Mål og spesifikasjoner",
      type: "array",
      group: "specs",
      of: [
        defineArrayMember({
          type: "object",
          name: "spec",
          fields: [
            defineField({ name: "label", title: "Egenskap", type: "localizedString" }),
            defineField({ name: "value", title: "Verdi", type: "localizedString" }),
          ],
          preview: { select: { title: "label.no", subtitle: "value.no" } },
        }),
      ],
    }),
    defineField({
      name: "variants",
      title: "Varianter",
      type: "array",
      group: "specs",
      of: [
        defineArrayMember({
          type: "object",
          name: "variant",
          fields: [
            defineField({ name: "name", title: "Variant", type: "localizedString" }),
            defineField({ name: "note", title: "Merknad", type: "localizedString" }),
          ],
          preview: { select: { title: "name.no", subtitle: "note.no" } },
        }),
      ],
    }),

    defineField({
      name: "images",
      title: "Produktbilder",
      type: "array",
      group: "media",
      description:
        "Første bilde brukes på produktkort og i deling. Uten bilder vises en plassholder i kategoriens farge.",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Bildebeskrivelse",
              type: "localizedString",
              description: "Beskriver bildet for skjermlesere og søkemotorer.",
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "datasheets",
      title: "Produktark og datablad",
      type: "array",
      group: "media",
      description:
        "Uten opplastet fil viser nettsiden «Be om produktark» og sender kunden til kontaktskjemaet.",
      of: [
        defineArrayMember({
          type: "object",
          name: "datasheet",
          fields: [
            defineField({ name: "label", title: "Tittel", type: "localizedString" }),
            defineField({ name: "file", title: "Fil (PDF)", type: "file" }),
          ],
          preview: { select: { title: "label.no" } },
        }),
      ],
    }),

    defineField({
      name: "audience",
      title: "Passer for",
      type: "array",
      group: "settings",
      description: "Styrer filteret på produktsiden, og senere priser mot ulike kundegrupper.",
      of: [defineArrayMember({ type: "string" })],
      options: {
        list: [
          { title: "Golfklubb og anlegg", value: "klubb" },
          { title: "Proshop", value: "proshop" },
          { title: "Privatkunde", value: "privat" },
        ],
      },
    }),
    defineField({
      name: "featured",
      title: "Vis på forsiden",
      type: "boolean",
      group: "settings",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Rekkefølge i kategorien",
      type: "number",
      group: "settings",
      description: "Lavest tall vises først.",
      validation: (rule) => rule.required().integer(),
    }),
  ],
  orderings: [
    { name: "order", title: "Rekkefølge", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "name.no", subtitle: "category.name.no", media: "images.0" },
  },
});
