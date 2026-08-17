# NSports.no — løsningsforslag og plan

Svar på henvendelsen fra Norsk Golfallianse om ny nettside under merkevaren NSports.no.

Dokumentet er delt i to: **del A** er anbefalingen (plattform, struktur, videre utvikling), **del B** er hva som faktisk er bygget og levert i denne versjonen.

---

# Del A — Anbefaling

## 1. Kort oppsummert

| Spørsmål | Anbefaling |
| --- | --- |
| Plattform | Next.js (React) som nettsted + Sanity som redigeringsverktøy |
| Hosting | Vercel |
| Innhold | Redaktørene endrer tekst, bilder og produkter selv, uten utvikler |
| Språk | Norsk nå, svensk/dansk/engelsk slås på uten ombygging |
| Nettbutikk senere | Legges på toppen av samme nettsted, ingen ny nettside |
| Kostnad v1 | 0 kr/mnd i hosting til å begynne med, ca. 0–150 kr/mnd for domene og e-post |

Kjernen i anbefalingen: **ikke velg en nettbutikkplattform nå for å slippe å bytte senere.** Velg i stedet en plattform der nettbutikk er en modul som kan skrus på. Det gir en raskere, billigere og penere katalogside i dag, uten at dere maler dere inn i et hjørne.

## 2. Hvorfor Next.js + Sanity

Dere har to krav som trekker i hver sin retning: siden skal være **enkel nå**, men **ikke bygges om senere**. Det utelukker de to vanligste svarene.

**Hvorfor ikke Shopify nå.** Shopify er en god nettbutikk, men en middelmådig katalogside. Dere ville betalt 400–2 500 kr/mnd for en handlekurv dere har sagt at dere ikke vil ha, og designet ville vært styrt av en netthandelsmal i stedet for av produktbildene. Shopify er likevel den mest sannsynlige nettbutikkmotoren *senere* — og løsningen under er bygget slik at Shopify kan kobles på bakfra når den dagen kommer, uten at nettsiden bygges om.

**Hvorfor ikke WordPress/WooCommerce.** Lav inngangsterskel, men det følger med løpende vedlikehold: oppdateringer, utdaterte tillegg og sikkerhetshull. For en importør som skal drive med produkter og ikke med drift av nettsted, er det feil arbeidsbelastning. Flerspråk i WordPress løses i praksis med tredjeparts tillegg som ofte blir en flaskehals.

**Hvorfor Next.js.** Det er i dag den vanligste måten å bygge profesjonelle produkt- og merkevaresider på. Konkret for dere:

- Sidene lastes raskt fordi de bygges ferdig på forhånd — viktig for tunge produktbilder og for synlighet i Google.
- Flere språk er innebygget i rammeverket, ikke et tillegg. Det er den viktigste grunnen med tanke på Sverige, Danmark og Europa.
- Nettbutikk, betaling, frakt, lagerstatus, valuta og B2B-priser legges på som moduler i samme kodebase.
- Ingen lisenskostnad, og koden eies av dere. Dere står fritt til å bytte leverandør.

**Hvorfor Sanity.** Nettsiden må kunne oppdateres av dere, ikke av en utvikler. Sanity gir et redigeringsverktøy på `nsports.no/studio` der man logger inn og endrer tekst, laster opp bilder og legger til produkter. Det som gjør Sanity riktig her framfor et enklere verktøy:

- Bildehåndtering: last opp ett bilde, systemet lager alle størrelser og formater automatisk. Dere trenger ikke tenke på beskjæring eller filstørrelse.
- Filopplasting for produktark og datablad (PDF).
- Flerspråk er innebygget per felt, så samme produkt kan ha norsk og engelsk tekst side om side.
- Gratis for en katalog av deres størrelse.

## 3. Forslag til produktstruktur

Dere ba om innspill. Utgangspunktet deres var godt; forslaget under er en liten justering som gir jevnere kategorier og et tydeligere skille mellom hvem produktet er til for.

**Fem hovedkategorier:**

| Kategori | Produkter | Antall |
| --- | --- | --- |
| Golfbiler | Golfbiler | 1 |
| Driving range og anlegg | Rangematter, peggbare rangematter, rangeballer hvite, rangeballer gule, plastpegg, bagskap | 6 |
| Robotikk og teknologi | Automatisk ballplukker, AI-golftralle | 2 |
| Golfutstyr og proshop | Premium golfball, pegger, golfsko | 3 |
| Profilprodukter | Caps med logo, golfhanske med logo, greengaffel med logo | 3 |

To endringer fra deres opprinnelige forslag, og hvorfor:

1. **Bagskap er flyttet til «Driving range og anlegg».** Kategorien handler egentlig om *utstyr til selve anlegget* — det klubben kjøper og monterer. Bagskap hører hjemme der, ikke blant utstyr som selges videre til spillere. Alternativt kan kategorien hete «Anlegg og driving range» hvis dere synes navnet passer bedre når det etter hvert kommer flere klubbhusprodukter.
2. **«Golfutstyr og tilbehør» er spisset til «Golfutstyr og proshop».** Det gjør det tydelig at dette er varer klubben kjøper inn for å selge videre, ikke utstyr til anlegget. Skillet blir viktig når dere senere skal ha ulike priser mot klubb og privatkunde.

**I tillegg: en usynlig merking av målgruppe.** Hvert produkt er merket med om det retter seg mot golfklubb/anlegg, proshop eller privatkunde. Dette vises som et lite merke på produktsiden i dag, men den egentlige verdien kommer senere: det er nøyaktig den merkingen dere trenger for å styre B2B-priser og for å skille privat- og klubbkunder i en nettbutikk. Å legge den inn nå koster ingenting; å legge den inn i etterkant betyr å gå gjennom hele katalogen på nytt.

**Om utvidelser.** Strukturen tåler at det kommer flere produkter. Blir «Driving range og anlegg» stor, deles den naturlig i «Driving range» og «Anlegg og klubbhus». Kommer det baneutstyr (klippere, maskiner, flagg, bunkerutstyr), er det en sjette kategori og ikke en ombygging.

## 4. Flere språk og markeder

Dette er punktet som avgjør plattformvalget, så det er bygget inn fra start i stedet for å bli lovet.

Nettsiden er allerede tospråklig: **norsk** på `nsports.no` og **engelsk** på `nsports.no/en`. Svensk og dansk er forberedt i systemet og krever oversettelse av tekstene, ikke ny utvikling.

Adressene er oversatt per språk, slik at engelske sider ser engelske ut:

```
nsports.no/produkter          →  nsports.no/en/products
nsports.no/kategorier/golfbiler  →  nsports.no/en/categories/golfbiler
nsports.no/om-oss             →  nsports.no/en/about
```

Google får beskjed om hvilke sider som er oversettelser av hverandre (`hreflang`), slik at svenske søk treffer den svenske siden når den kommer.

Selve produkt- og kategorinavnene i adressen (`.../golfbiler`) er like på alle språk. Det er et bevisst valg: én adresse per produkt gjør lenker stabile og delbare, og det er ett sted å endre hvis et navn skal justeres. Skulle dere senere ønske `.../golf-cars` på engelsk av hensyn til søk, er det en utvidelse av det samme oppsettet.

Når dere senere vil selge i Sverige og Danmark, står valget mellom å beholde alt på `nsports.no/sv` eller å bruke egne domener som `nsports.se`. Begge deler støttes av det samme oppsettet. Anbefalingen er å begynne med språkmapper og først kjøpe egne domener når salget faktisk er der — det er lettere å legge til et domene senere enn å drifte tre domener uten omsetning.

## 5. Vei videre mot nettbutikk

Rekkefølgen under er satt slik at hvert steg gir verdi alene, og slik at ingen av dem krever at det forrige gjøres om.

| Steg | Innhold | Forutsetter |
| --- | --- | --- |
| 1. I dag | Katalogside, «Be om tilbud», to språk | — |
| 2. Redaktørverktøy | Sanity koblet på, dere redigerer selv | Sanity-konto |
| 3. Svensk og dansk | Oversettelse av eksisterende tekster | Oversettelser |
| 4. Kjøp | Handlekurv, betaling med kort/Vipps/Klarna, frakt | Regnskap, frakt- og returrutiner |
| 5. Lager og valuta | Lagerstatus, NOK/SEK/DKK/EUR | Steg 4 |
| 6. B2B | Innlogging for klubber, egne priser, faktura | Steg 4 |

**Om steg 4.** Anbefalingen når det blir aktuelt er å bruke Shopify som motor i bakgrunnen, men beholde denne nettsiden som utstillingsvindu. Shopify tar seg da av det som er kjedelig og risikabelt å bygge selv — betaling, moms, frakt, ordrehåndtering, regnskapsintegrasjon — mens design og produktpresentasjon fortsatt er deres egen. Rent praktisk: produktsidene ser like ut, men får en «Legg i handlekurv»-knapp ved siden av «Be om tilbud».

**Om steg 6.** B2B er verdt å nevne særskilt, fordi det er her mange nettbutikker må bygges om. Behovet «golfklubber skal se andre priser enn privatpersoner» løses i Shopify med B2B-funksjonalitet, og målgruppemerkingen fra punkt 3 er allerede på plass i katalogen. Det betyr at steget er en utvidelse og ikke en omstart.

## 6. Hva som trengs fra dere

For å ta siden fra ferdig bygget til publisert:

1. **Produktbilder.** Helst 3–5 per produkt, minst 1600 px bred. Ett rent produktbilde på nøytral bakgrunn per produkt, resten gjerne fra anlegg eller i bruk. Filnavn spiller ingen rolle.
2. **Mål og tekniske spesifikasjoner** per produkt. Kan sendes som liste eller regneark; det er lagt inn plassholderverdier som skal byttes ut.
3. **Produktark og datablad** som PDF der dere har det.
4. **Bedriftsopplysninger:** organisasjonsnummer, besøks- og postadresse, telefon, e-post for henvendelser.
5. **Logo** i vektorformat (SVG, EPS eller AI) hvis den finnes.
6. **Om oss-tekst:** noen setninger om Norsk Golfallianse, hvorfor NSports ble startet og hvilke leverandører dere representerer.

Til punkt 2: produktene ligger nå inne med realistiske, men **foreløpige** spesifikasjoner, slik at siden kan vurderes visuelt. Så lenge de er foreløpige, vises en diskré stripe øverst på siden om at produktdataene er utkast. Den skrus av med én innstilling når de riktige tallene er på plass.

## 7. Drift og kostnad

| Post | Kostnad | Merknad |
| --- | --- | --- |
| Hosting (Vercel) | 0 kr/mnd | Gratisnivået holder godt for en katalogside |
| Sanity | 0 kr/mnd | Gratis opp til 3 redaktører og 10 GB |
| Domene `nsports.no` | ca. 100 kr/år | |
| E-postutsending (Resend) | 0 kr/mnd | Gratis opp til 3 000 e-poster/mnd |
| **Sum v1** | **≈ 0 kr/mnd** | |

Ved nettbutikk senere kommer Shopify (fra ca. 400 kr/mnd) og transaksjonsgebyr i tillegg.

Ingen deler av løsningen har lisensbinding. Koden ligger i deres eget kodelager, og både Vercel og Sanity kan byttes ut uten at nettsiden skrives om.

---

# Del B — Hva som er bygget

## 8. Sider

| Side | Adresse | Innhold |
| --- | --- | --- |
| Forside | `/` | Introduksjon, de fem kategoriene, utvalgte produkter, hvordan dere jobber, kontaktoppfordring |
| Produkter | `/produkter` | Alle produkter med filtrering på kategori og målgruppe |
| Kategori | `/kategorier/[kategori]` | Egen side per kategori, med egen tekst |
| Produkt | `/produkter/[produkt]` | Bildegalleri, beskrivelse, spesifikasjoner, varianter, datablad, «Be om tilbud» |
| Om oss | `/om-oss` | Om Norsk Golfallianse og NSports, arbeidsmåte, kontaktpunkt |
| Kontakt | `/kontakt` | Skjema, kontaktopplysninger, ofte stilte spørsmål |

Alle sidene finnes på engelsk under `/en`.

## 9. Slik virker «Be om tilbud»

Knappen på et produkt sender kunden til kontaktskjemaet med produktet allerede utfylt, slik at dere ser hva henvendelsen gjelder uten å måtte spørre. Skjemaet ber om antall og om kunden er klubb, proshop eller privat.

Henvendelser sendes på e-post via Resend. Uten nøkkel oppsatt logges de i stedet til serverloggen, slik at skjemaet kan testes før e-post er koblet opp. Skjemaet har enkel spamsikring — et skjult felt som fanger automatiske innsendinger, og en grense på antall henvendelser fra samme avsender per time — og virker også uten JavaScript.

## 10. Slik oppdateres innholdet i dag

Fram til Sanity er koblet på ligger innholdet i mappen `content/` som JSON-filer:

- `content/products.json` — produktene
- `content/categories.json` — kategoriene
- `content/site.json` — firmaopplysninger, kontaktinfo, forside- og om oss-tekst

Bilder legges i `public/bilder/produkter/`, datablad i `public/datablad/`. Produkter uten bilde vises med en pen plassholder i kategoriens farge, ikke som et ødelagt bilde — så katalogen kan publiseres selv om ikke alle bilder er på plass.

Se `README.md` for framgangsmåte, og `sanity/README.md` for overgangen til Sanity.

## 11. Tekniske valg verdt å nevne

- **Innholdslaget er byttbart.** All lesing av produkter går gjennom `src/lib/content/`. Der ligger to kilder: JSON-filer og Sanity. Bytte skjer ved å sette `NEXT_PUBLIC_SANITY_PROJECT_ID`; ingen sider trenger endring.
- **Alt tekstinnhold er språknøklet** (`{ "no": "...", "en": "..." }`) helt fra bunnen, med tilbakefall til norsk. Det er derfor et nytt språk er oversettelsesarbeid og ikke utviklingsarbeid.
- **Adresseoversettelse** ligger i `src/lib/i18n/routes.ts` og settes om av `src/proxy.ts`. Ett sted å endre hvis en adresse skal hete noe annet.
- **Sanity-skjemaene er ferdigskrevet** i `sanity/schemas/`, med samme felter som JSON-filene, slik at overgangen er en import og ikke en modellering.
