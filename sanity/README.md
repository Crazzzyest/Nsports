# Sanity — redigering i nettleseren

Nettsiden leser innhold fra JSON-filene i `content/` fram til Sanity er koblet på.
Da bytter den automatisk, og sidene trenger ingen endringer.

Denne mappen inneholder ferdige skjemaer, slik at overgangen er en import og ikke
en ny modellering.

## Slik kobler du på Sanity

**1. Opprett prosjektet**

```bash
npm create sanity@latest -- --template clean --create-project "NSports" --dataset production
```

Legg det i en egen mappe, for eksempel `studio/`, ved siden av nettsiden.

**2. Ta i bruk skjemaene**

Kopier `sanity/schemas/` inn i studio-prosjektet og pek på dem i `sanity.config.ts`:

```ts
import { schemaTypes } from "./schemas";

export default defineConfig({
  name: "default",
  title: "NSports",
  projectId: "<prosjekt-id>",
  dataset: "production",
  plugins: [structureTool()],
  schema: { types: schemaTypes },
});
```

**3. Flytt innholdet over**

```bash
npm run sanity:export
npx sanity dataset import sanity/export.ndjson production
```

Alle kategorier, produkter og nettstedstekster kommer over med norsk og engelsk tekst.
Bilder og PDF-er er ikke med — de lastes opp i Studio etterpå.

**4. Slå det på i nettsiden**

Legg inn i `.env.local` (og i miljøvariablene hos Vercel):

```
NEXT_PUBLIC_SANITY_PROJECT_ID=xxxxxxxx
NEXT_PUBLIC_SANITY_DATASET=production
```

Neste publisering leser fra Sanity. Ingen kode skal endres.

**5. Åpne datasettet for lesing**

Gå til [sanity.io/manage](https://www.sanity.io/manage) → API → CORS/datasett og sett
datasettet til offentlig lesing. Alternativt kan du lage et lesetoken og legge det
inn som `SANITY_READ_TOKEN`.

## Slik henger feltene sammen

| I Sanity | I JSON-filene | Vises som |
| --- | --- | --- |
| `category` | `content/categories.json` | Kategorisider og kategorikort |
| `product` | `content/products.json` | Produktkort og produktsider |
| `site` (ett dokument) | `content/site.json` | Forside, om oss, kontakt, bunntekst |

Språkfeltene heter det samme begge steder (`no`, `en`, `sv`, `da`). Felter uten
oversettelse faller tilbake til norsk, så et halvferdig språk gir ikke tomme sider.

## Hvor koden ligger

- `src/lib/content/sanity.ts` — henter innholdet. Bruker Sanitys HTTP-API direkte,
  så ingen ekstra pakker er nødvendig i nettsiden.
- `src/lib/content/index.ts` — velger kilde ut fra om `NEXT_PUBLIC_SANITY_PROJECT_ID`
  er satt.

Skal et nytt felt legges til, må det inn tre steder: skjemaet her, GROQ-spørringen i
`sanity.ts` og typene i `src/lib/content/types.ts`.

## Studio på samme domene

Vil dere ha redigeringsverktøyet på `nsports.no/studio` i stedet for et eget domene,
installeres `next-sanity` i dette prosjektet og Studio monteres på ruten `/studio`.
`src/proxy.ts` hopper allerede over den adressen, så den er holdt av.
