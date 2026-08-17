# Produktbilder

Legg produktbildene her, og pek på dem fra `content/products.json`.

```json
"images": [
  { "src": "/bilder/produkter/elektrisk-golfbil-1.jpg", "alt": { "no": "…", "en": "…" } }
]
```

Filnavnet spiller ingen rolle så lenge `src` peker riktig. `src` starter alltid
med `/bilder/produkter/`, ikke med `public`.

## Anbefalinger

- **Bredde:** minst 1600 px. Nettsiden lager mindre versjoner selv.
- **Format:** JPG for foto, PNG bare når bildet trenger gjennomsiktig bakgrunn.
- **Utsnitt:** liggende 4:3 gir best resultat. Andre forhold beskjæres mot midten.
- **Første bilde** brukes på produktkortene og når siden deles i sosiale medier.
  Velg det reneste produktbildet der.
- **Bildebeskrivelse (`alt`)** bør si hva bildet viser. Den leses av skjermlesere
  og av Google.

Produkter uten bilde vises med en plassholder i kategoriens farge. Katalogen kan
altså publiseres før alle bildene er på plass.
