# Bookdragons v2

Bookdragons v2 er et skoleprosjekt bygget med Next.js og Payload CMS. Løsningen fungerer som en digital bruktbokhandel der brukeren kan bla gjennom bøker, se detaljer om hver bok, legge bøker i handlekurven og sende inn en reservasjon. I tillegg finnes det en ansattside og et adminpanel der bøker og reservasjoner kan håndteres.

## Prosjektmål

Målet med prosjektet har vært å lage en fullstack webapplikasjon som kombinerer:

- en brukervennlig frontend for visning av bøker
- et CMS/adminsystem for å lagre og administrere data
- API-ruter for henting og oppretting av innhold
- enkel bestillings- og reservasjonsflyt

## Tech stack

- Next.js
- TypeScript
- Payload
- SQLite som database
- Tailwind
- shadcn
- lucide react

## Hovedfunksjonalitet

Løsningen inneholder disse hoveddelene:

### 1. Frontend for kunder

- Forside med presentasjon av bokbutikken
- Bokoversikt med paginering - både lokalt data og fra databasen
- Detaljside for hver bok
- Handlekurv lagret i `localStorage`
- Bestillingsskjema som sender reservasjon til backend

### 2. Ansattside - Admin

På siden `/ansatte` kan ansatte:

- se innsendte reservasjoner (detaljer)
- legge inn nye bøker via skjema

### 3. Payload adminpanel

Payload brukes som CMS og administrasjonssystem. Adminpanelet ligger på `/admin` og gir tilgang til collections for:

- `users` - kun en Admin bruker.
- `books`
- `reservations`
- `media`

## Datamodell

Collections i Payload:

### Books

En bok inneholder:

- ID
- tittel
- forfatter
- pris
- beskrivelse
- signert/usignert
- innbinding
- språk
- sjanger
- utgivelsesår
- tilstand
- lagerstatus
- bilde-URL
- aldersgruppe

### Reservations

En reservasjon lagrer:

- fornavn og etternavn
- e-post og telefonnummer
- reserverte varer
- totalt antall varer
- totalpris
- status
- dato

### Users

Brukes til autentisering i Payload admin. beskytter '/ansatte' siden med middleware

### Media

ikke i bruk...

## Arkitektur og viktige valg

Prosjektet kombinerer Next.js App Router med Payload i samme mappe. Frontend, API og adminpanel lever sammen.

Det er også viktig å merke seg at bokdata kommer fra to kilder:

- `src/books.ts` brukes som lokal, statisk datakilde for boklisten og som første oppslag på detaljsiden
- Payload-databasen brukes i egne API for å hente og opprette bøker og reservasjoner av kunden

Dette betyr at løsningen i nåværende form er en hybrid mellom seedede lokale data og database-data. En felles kilde til data , ble litt utfordrende per nå.

## Viktige sider

- `/` viser forsiden
- `/books` viser bokoversikten med paginering
- `/books/[id]` viser detaljer om en bok
- `/cart` viser handlekurv og bestillingsskjema
- `/ansatte` viser ansattfunksjoner - lese av reservasjioner & adde bok
- `/admin` åpner payloads adminpanel

## API-ruter

Prosjektet har flere egne API-ruter i tillegg til Payload sitt admin/API-oppsett:

- `GET /api/getBooks` henter bøker fra Payload
- `GET /api/getbookById?id=<id>` henter én bok fra Payload db basert på bok-ID
- `POST /api/addBook` oppretter en ny bok i Payload
- `GET /api/reservations` henter reservasjoner
- `POST /api/reservations` oppretter en ny reservasjon
- `GET /api/store-books/[id]` henter bok fra lokal statisk datakilde

## Mappestruktur

De viktigste mappene i prosjektet er:

- `src/app(frontend)` inneholder sider, layout og API funksjoner
- `src/collections` definerer Payload collections - schema for databasen
- `src/components` inneholder React-komponenter for alle respekterte sidene
- `src/books.ts` inneholder lokal bokdata brukt i frontend
- `middleware.ts` beskytter '/ansatte' som ikke jobber i butikken

## Hvordan kjøre prosjektet lokalt

### 1. Installer avhengigheter

```bash
pnpm install
npm install
```

### 2. Opprett miljøvariabler

VIKTIG:
Prosjektet forventer minst disse variablene i en `.env`-fil i rota:

```env
DATABASE_URL=file:./.db
PAYLOAD_SECRET=velg-en-hemmelig-verdi
```

### 3. Start utviklingsserveren

```bash
pnpm dev / npm run dev
```

Applikasjonen kjører da på `http://localhost:3000`.

### 4. Åpne adminpanelet

Gå til `http://localhost:3000/admin`.
Ved første oppstart kan Payload be om at første adminbruker opprettes.

### 5. Tilbake til butikken?

Besøk `http://localhost:3000`.

## Nyttige scripts

```bash
pnpm dev
npm dev
pnpm build
pnpm start

```

## Vurdering

Det som fungerer godt i prosjektet:

- tydelig separasjon mellom frontend, API og Payload CMS
- bruk av TypeScript i hele prosjektet
- egen datamodell(schema) for bøker og reservasjoner
- enkel reservasjonsflyt fra bruker til adminside

Det som naturlig kan videreutvikles:

- bruke Payload som eneste datakilde for alle bøker
- forbedre validering og feilhåndtering i skjemaer og API-ruter
- forbedre tilgangskontroll for ansattsider
- koble bildefelt tettere mot `media`-collection i stedet for kun URL-felt
- filterering og søk på butikken
