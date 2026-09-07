/**
 * Faste grensesnittekster på norsk — knapper, skjemaetiketter, tabelloverskrifter.
 *
 * Markedsføringstekst hører ikke hjemme her. Den ligger i `content/site.json`
 * slik at den kan endres uten utvikler.
 *
 * Tekster med {plassholdere} settes sammen med `format()` fra `../format`.
 * Ordboken inneholder bevisst ingen funksjoner, slik at den kan sendes
 * uendret videre til komponenter som kjører i nettleseren.
 */
const no = {
  nav: {
    home: "Forside",
    products: "Produkter",
    about: "Om oss",
    contact: "Kontakt",
    menu: "Meny",
    close: "Lukk",
    skipToContent: "Gå til innhold",
  },
  actions: {
    requestQuote: "Be om tilbud",
    requestQuoteFor: "Be om tilbud på {name}",
    contactUs: "Ta kontakt",
    seeProduct: "Se produkt",
    seeAllProducts: "Se alle produkter",
    seeCategory: "Se kategorien",
    downloadDatasheet: "Last ned produktark",
    requestDatasheet: "Be om produktark",
    backToProducts: "Tilbake til produkter",
    showMore: "Vis mer",
    showLess: "Vis mindre",
  },
  home: {
    categoriesHeading: "Produktkategorier",
    featuredHeading: "Utvalgte produkter",
    processHeading: "Slik jobber vi",
  },
  products: {
    heading: "Produkter",
    filterByCategory: "Kategori",
    filterByAudience: "Passer for",
    all: "Alle",
    clearFilters: "Nullstill filter",
    resultCount: { one: "1 produkt", other: "{count} produkter" },
    empty: "Ingen produkter passer med filtrene. Prøv å nullstille.",
  },
  product: {
    specifications: "Mål og spesifikasjoner",
    variants: "Varianter",
    downloads: "Dokumentasjon",
    highlights: "Kort fortalt",
    description: "Om produktet",
    relatedHeading: "Andre produkter i kategorien",
    relatedHeadingMixed: "Andre produkter",
    galleryPrevious: "Forrige bilde",
    galleryNext: "Neste bilde",
    galleryImage: "Bilde {index} av {total}",
    imageMissing: "Produktbilde kommer",
    quoteCardHeading: "Interessert i dette produktet?",
    quoteCardBody:
      "Vi gir pris ut fra antall og leveringssted, og svarer normalt innen én virkedag.",
    variantNote: "Merk",
    audienceHeading: "Passer for",
  },
  contact: {
    heading: "Kontakt",
    formHeading: "Send oss en henvendelse",
    name: "Navn",
    email: "E-post",
    phone: "Telefon",
    organisation: "Klubb eller bedrift",
    customerType: "Jeg representerer",
    product: "Gjelder produkt",
    productNone: "Generell henvendelse",
    quantity: "Antall",
    quantityPlaceholder: "F.eks. 2 stk eller 5 000 baller",
    message: "Melding",
    messagePlaceholder: "Fortell kort hva du trenger, og når du trenger det.",
    optional: "valgfritt",
    submit: "Send henvendelse",
    submitting: "Sender …",
    success: "Takk for henvendelsen. Vi svarer normalt innen én virkedag.",
    error: "Noe gikk galt. Prøv igjen, eller send oss en e-post direkte.",
    required: "Dette feltet må fylles ut",
    invalidEmail: "Skriv inn en gyldig e-postadresse",
    faqHeading: "Ofte stilte spørsmål",
    detailsHeading: "Kontaktopplysninger",
  },
  audience: {
    klubb: "Golfklubb og anlegg",
    proshop: "Proshop",
    privat: "Privatkunde",
  },
  footer: {
    productsHeading: "Produkter",
    companyHeading: "Selskap",
    contactHeading: "Kontakt",
    rights: "© {year} {company}",
    orgNumber: "Org.nr.",
  },
  language: {
    label: "Språk",
    change: "Bytt språk",
  },
  notFound: {
    heading: "Siden finnes ikke",
    body: "Adressen kan være skrevet feil, eller siden kan være flyttet.",
    action: "Gå til forsiden",
  },
};

export type Dictionary = typeof no;
export default no;
