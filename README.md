# NSports.no

Produktkatalog for NSports, importvirksomheten til Norsk Golfallianse.

Bygget med Next.js og Tailwind CSS. Innholdet ligger i JSON-filer fram til Sanity
kobles på, og hele siden finnes på norsk og engelsk.

Bakgrunnen for de tekniske valgene, forslaget til kategoristruktur og planen videre
mot nettbutikk står i **[PLAN.md](./PLAN.md)**.

---

## Kom i gang

```bash
npm install
npm run dev
```

Siden ligger da på <http://localhost:3000>.

| Kommando | Gjør |
| --- | --- |
| `npm run dev` | Utviklingsserver med automatisk oppdatering |
| `npm run build` | Bygger for publisering |
| `npm start` | Kjører den bygde versjonen |
| `npm run lint` | Sjekker kodestil |
| `npm run typecheck` | Sjekker typer |
| `npm run sanity:export` | Gjør innholdet klart for import til Sanity |

Innstillinger settes i `.env.local`. Kopier `.env.example` som utgangspunkt —
ingen av dem må være satt for at siden skal kjøre.

---

## Oppdatere innholdet

Alt redaksjonelt innhold ligger i mappen `content/`. Endringer der slår gjennom
på hele siden, på begge språk.

| Fil | Inneholder |
| --- | --- |
| `content/products.json` | Produktene |
| `content/categories.json` | Kategoriene |
| `content/site.json` | Firmaopplysninger, forsidetekst, om oss, ofte stilte spørsmål |

Alle tekster skrives som `{ "no": "…", "en": "…" }`. Mangler den engelske,
brukes den norske. Det er trygt å legge inn norsk først og oversette senere.

### Legge til et produkt

Kopier et eksisterende produkt i `content/products.json` og endre feltene:

```json
{
  "slug": "nytt-produkt",
  "category": "driving-range-og-anlegg",
  "order": 7,
  "featured": false,
  "audience": ["klubb"],
  "name": { "no": "Nytt produkt", "en": "New product" },
  "tagline": { "no": "Én setning om produktet.", "en": "One sentence about it." },
  "description": { "no": ["Første avsnitt.", "Andre avsnitt."], "en": ["First.", "Second."] },
  "highlights": { "no": ["Punkt én", "Punkt to"], "en": ["Point one", "Point two"] },
  "specs": [
    { "label": { "no": "Mål", "en": "Dimensions" }, "value": { "no": "100 × 50 cm", "en": "100 × 50 cm" } }
  ],
  "variants": [{ "name": { "no": "Standard", "en": "Standard" } }],
  "datasheets": [],
  "images": [{ "alt": { "no": "Beskrivelse av bildet", "en": "Description of the image" } }]
}
```

| Felt | Merk |
| --- | --- |
| `slug` | Adressen: `/produkter/nytt-produkt`. Små bokstaver, bindestrek, ingen æ/ø/å. Bør ikke endres etter publisering — gamle lenker slutter å virke. |
| `category` | Må finnes i `categories.json`. |
| `order` | Rekkefølgen inne i kategorien. Lavest først. |
| `featured` | `true` løfter produktet opp på forsiden. |
| `audience` | `"klubb"`, `"proshop"` og/eller `"privat"`. Styrer filteret på produktsiden. |
| `variants` | Kan ha `"note"` i tillegg til `"name"`. |
| `datasheets` | Uten `"file"` vises «Be om produktark» i stedet for nedlasting. |

Skriver du noe som ikke stemmer — en kategori som ikke finnes, to produkter med
samme `slug` — stopper `npm run build` med en beskjed om hva som er galt og hvilket
produkt det gjelder. Feilen når altså aldri ut på nett.

### Bytte eller legge til bilder

Legg filene i `public/bilder/produkter/` og pek på dem:

```json
"images": [
  { "src": "/bilder/produkter/bagskap-1.jpg", "alt": { "no": "Bagskap i rekke", "en": "Bag lockers in a row" } },
  { "src": "/bilder/produkter/bagskap-2.jpg", "alt": { "no": "Åpent bagskap", "en": "Open bag locker" } }
]
```

Første bilde brukes på produktkortene og ved deling. Produkter uten bilde får en
plassholder i kategoriens farge, så katalogen kan publiseres før alle bildene er
klare. Se `public/bilder/produkter/LES-MEG.md` for anbefalte størrelser.

### Legge inn produktark

PDF-ene legges i `public/datablad/`. Se `public/datablad/LES-MEG.md`.

### Endre tekst på forsiden, om oss eller kontakt

Alt ligger i `content/site.json`. Knapper og skjemaetiketter ligger derimot i
`src/lib/i18n/dictionaries/` — de er en del av grensesnittet, ikke av innholdet.

### Skru av utkast-stripen

Stripen øverst om at produktdata er foreløpige forsvinner når du setter
`NEXT_PUBLIC_DRAFT_BANNER=off`.

---

## Kontaktskjemaet

Skjemaet på `/kontakt` tar imot henvendelser og «Be om tilbud» fra produktsidene.
Knappen på et produkt fyller ut produktfeltet automatisk.

Henvendelser sendes med [Resend](https://resend.com). Uten `RESEND_API_KEY` skrives
de til serverloggen i stedet, slik at skjemaet kan testes før e-post er satt opp.

For å sette det opp:

1. Opprett konto hos Resend og verifiser domenet `nsports.no`.
2. Sett `RESEND_API_KEY`, `ENQUIRY_FROM` og eventuelt `ENQUIRY_TO`.

Skjemaet har et skjult felt som fanger automatiske innsendinger, og en enkel
grense på antall henvendelser fra samme avsender per time.

---

## Språk

Norsk ligger på `nsports.no`, engelsk på `nsports.no/en`. Adressene er oversatt:
`/produkter` og `/en/products` er samme side.

Svensk og dansk er forberedt. Slik slår du på svensk:

1. Flytt `"sv"` fra `plannedLocales` til `locales` i `src/lib/i18n/config.ts`.
2. Legg til svenske adresser i `src/lib/i18n/routes.ts`.
3. Lag `src/lib/i18n/dictionaries/sv.ts` — kopier `no.ts` og oversett — og
   registrer den i `dictionaries/index.ts`.
4. Legg til `"sv"` i tekstene i `content/*.json`.

Steg 1–3 er en halvtimes arbeid. Steg 4 er oversettelse. Felter uten svensk tekst
faller tilbake til norsk, så siden fungerer også mens oversettelsen pågår.

---

## Publisering

Anbefalt er [Vercel](https://vercel.com), som er laget for Next.js.

1. Legg koden i et Git-lager (GitHub, GitLab eller Bitbucket).
2. Importer lageret i Vercel. Byggeoppsettet oppdages automatisk.
3. Legg inn miljøvariablene fra `.env.example` under **Settings → Environment Variables**.
4. Koble til domenet `nsports.no` under **Settings → Domains**.

Hver endring som pushes til hovedgrenen publiseres automatisk. Andre grener får en
egen forhåndsvisningsadresse — nyttig for å se gjennom nytt innhold før det er ute.

---

## Redigering i nettleseren

Fram til Sanity er koblet på, redigeres innholdet i JSON-filene. Det fungerer, men
krever at man er komfortabel med tekstfiler.

`sanity/` inneholder ferdige skjemaer og et eksportskript, slik at overgangen til
redigering i nettleseren er en import og ikke en ny modellering. Framgangsmåten står
i [sanity/README.md](./sanity/README.md). Sidene trenger ingen endringer — de bytter
kilde automatisk når `NEXT_PUBLIC_SANITY_PROJECT_ID` er satt.

---

## Slik henger prosjektet sammen

```
content/                  Redaksjonelt innhold (JSON)
public/bilder/produkter/  Produktbilder
public/datablad/          Produktark og datablad (PDF)
sanity/                   Skjemaer for redigering i nettleseren
scripts/                  Eksport til Sanity
src/
  app/[locale]/           Sidene, én mappe per adresse
  components/             Gjenbrukte deler av grensesnittet
  lib/content/            Henter innhold — JSON eller Sanity
  lib/i18n/               Språk, ordbøker og adresser
  proxy.ts                Kobler offentlig adresse til riktig side
```

Noen valg det er verdt å kjenne til:

- **Sidene vet ikke hvor innholdet kommer fra.** All lesing går gjennom
  `src/lib/content/`. Å bytte fra JSON til Sanity endrer én modul, ikke sidene.
- **Alt tekstinnhold er språknøklet fra bunnen av.** Derfor er et nytt språk
  oversettelsesarbeid og ikke utviklingsarbeid.
- **Adressene er oversatt per språk.** Kartet ligger i `src/lib/i18n/routes.ts`,
  og `src/proxy.ts` setter dem om på vei inn. Skal en adresse hete noe annet,
  endres den ett sted.
- **Sidene bygges ferdig på forhånd.** Bare kontaktsiden lages ved forespørsel,
  fordi den leser produktvalget fra adressen.

---

## Før lansering

- [ ] Produktbilder lagt inn (`public/bilder/produkter/`)
- [ ] Endelige mål og spesifikasjoner i `content/products.json`
- [ ] Produktark lagt inn der de finnes (`public/datablad/`)
- [ ] Organisasjonsnummer, telefon og adresse i `content/site.json`
- [ ] Om oss-teksten gjennomgått av dere
- [ ] Logo i vektorformat, hvis den finnes (erstatter merket i `src/components/logo.tsx`
      og fanemerket i `src/app/icon.svg`)
- [ ] Resend satt opp, og en testhenvendelse mottatt
- [ ] `NEXT_PUBLIC_SITE_URL` satt til `https://nsports.no`
- [ ] `NEXT_PUBLIC_DRAFT_BANNER=off`
- [ ] Domenet `nsports.no` pekt mot Vercel
