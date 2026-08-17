import { defineField, defineType } from "sanity";

/**
 * Språkfelter.
 *
 * Norsk er alltid synlig. De øvrige språkene ligger i en sammenslått gruppe
 * slik at redaktøren slipper å forholde seg til dem før markedet er aktuelt.
 * Tomme felter faller tilbake til norsk på nettsiden.
 */

const extraLanguages = [
  { name: "en", title: "Engelsk" },
  { name: "sv", title: "Svensk" },
  { name: "da", title: "Dansk" },
];

export const localizedString = defineType({
  name: "localizedString",
  title: "Tekst",
  type: "object",
  options: { collapsible: true, collapsed: false },
  fields: [
    defineField({
      name: "no",
      title: "Norsk",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    ...extraLanguages.map((language) =>
      defineField({ name: language.name, title: language.title, type: "string" }),
    ),
  ],
  preview: { select: { title: "no" } },
});

export const localizedText = defineType({
  name: "localizedText",
  title: "Lengre tekst",
  type: "object",
  options: { collapsible: true, collapsed: false },
  fields: [
    defineField({
      name: "no",
      title: "Norsk",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    ...extraLanguages.map((language) =>
      defineField({ name: language.name, title: language.title, type: "text", rows: 3 }),
    ),
  ],
  preview: { select: { title: "no" } },
});

/** Liste med avsnitt eller punkter, per språk. */
export const localizedList = defineType({
  name: "localizedList",
  title: "Liste",
  type: "object",
  options: { collapsible: true, collapsed: false },
  fields: [
    defineField({
      name: "no",
      title: "Norsk",
      type: "array",
      of: [{ type: "text", rows: 3 }],
      validation: (rule) => rule.required().min(1),
    }),
    ...extraLanguages.map((language) =>
      defineField({
        name: language.name,
        title: language.title,
        type: "array",
        of: [{ type: "text", rows: 3 }],
      }),
    ),
  ],
});
