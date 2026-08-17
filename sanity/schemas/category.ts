import { defineField, defineType } from "sanity";

export const iconOptions = [
  { title: "Golfbil", value: "cart" },
  { title: "Blink", value: "target" },
  { title: "Robot", value: "robot" },
  { title: "Golfball", value: "ball" },
  { title: "Merkelapp", value: "tag" },
  { title: "Lastebil", value: "truck" },
  { title: "Skjold", value: "shield" },
  { title: "Blad", value: "leaf" },
];

export const category = defineType({
  name: "category",
  title: "Kategori",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Navn",
      type: "localizedString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Adresse",
      type: "slug",
      description: "Delen av adressen etter /kategorier/. Bør ikke endres etter publisering.",
      options: { source: "name.no", maxLength: 60 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Kort beskrivelse",
      type: "localizedString",
      description: "Én setning. Vises på kategorikortene på forsiden.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Beskrivelse",
      type: "localizedList",
      description: "Ett avsnitt per punkt. Vises øverst på kategorisiden.",
    }),
    defineField({
      name: "accent",
      title: "Farge",
      type: "string",
      description: "Hex-kode, f.eks. #0E4C3A. Brukes på kategorikort og plassholderbilder.",
      initialValue: "#0E4C3A",
      validation: (rule) => rule.regex(/^#[0-9a-fA-F]{6}$/, { name: "hex-farge" }),
    }),
    defineField({
      name: "icon",
      title: "Ikon",
      type: "string",
      options: { list: iconOptions },
      initialValue: "ball",
    }),
    defineField({
      name: "order",
      title: "Rekkefølge",
      type: "number",
      description: "Lavest tall vises først.",
      validation: (rule) => rule.required().integer(),
    }),
  ],
  orderings: [
    { name: "order", title: "Rekkefølge", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: { select: { title: "name.no", subtitle: "tagline.no" } },
});
