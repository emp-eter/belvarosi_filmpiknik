# Belvárosi Filmpiknik 2026 — promo weblap

Egyoldalas promóoldal az egri **Belvárosi Filmpiknik** szabadtéri filmfesztiválhoz
(2026. szeptember 17–19., három nap, négy helyszín, minden program ingyenes).
Főszervező: CinemaCenter, főtámogató: Nemzeti Kulturális Alap.

A design forrása a `design_handoff_filmpiknik/` mappa. Ott a `README.md` a specifikáció,
a `design/Filmpiknik Promo.dc.html` a prototípus, a `tokens/` a tokenek. Ha a kód és a
handoff eltér, a handoff a mérvadó.

## Stack

- **Vite 7 + React 19 + TypeScript**, CSS Modules a design tokenekre építve
- **Leaflet 1.9** (npm) + OpenStreetMap csempék a helyszíntérképhez
- Nincs backend: statikus build, szerveroldali kód nélkül

## Parancsok

```bash
npm install
npm run dev        # fejlesztői szerver, http://localhost:5173
npm run build      # típusellenőrzés + production build a dist/ mappába
npm run preview    # a dist/ kiszolgálása helyben
npm run typecheck  # csak tsc
```

## Deploy

- **GitHub Pages:** minden push a `main` ágra lefuttatja a `.github/workflows/deploy.yml`-t,
  ami buildel és publikál. A build `BASE_PATH=/<repo neve>/`-vel fut, ezért az abszolút
  útvonalak a `src/lib/asset.ts` segédjén mennek át. Esősáv Pages-en: a repo
  *Settings → Variables* alatt egy `RAIN_ALERT` változó, utána újrafuttatott workflow.
- **cPanel (éles):** `npm run build` `BASE_PATH` nélkül, a `dist/` tartalma a `public_html`-be.

## Konfiguráció

Másold az `.env.example` fájlt `.env` néven. Egy kapcsoló van, opcionális:

| Változó | Mit csinál |
| --- | --- |
| `VITE_RAIN_ALERT` | Ha egy mondat áll benne, megjelenik az arany „Esőhelyszín” sáv a fejléc fölött. |

Build-időben olvasódik be (Vite env), tehát módosítás után újra kell buildelni.
Ha később CMS lesz, a `src/config.ts` az egyetlen hely, amit cserélni kell.

## Szerkezet

```
index.html                 head: meta, OG, fontok
public/assets/hero-bg.jpg  a hero fotója (karmazsin duotón), assets-src/photos-ból kicsinyítve
public/assets/og-image.jpg 1200×630 megosztókép a hero fotóból vágva
public/assets/portraits/   vendégportrék a fotó duotónjában (scripts/duotone.py állítja elő)
public/assets/townscape.png  a story-kártya illusztrációja
public/assets/logos/       partnerlogók krémre színezve (scripts/tint-logo.py állítja elő)
assets-src/logos/          a partnerlogók eredeti fájljai (nem kerülnek a buildbe)
scripts/tint-logo.py       fekete PNG → krém, a lábléchez
scripts/duotone.py         fotó → bordó-karmazsin duotón (portrék), illetve kicsinyítés
src/
  main.tsx, App.tsx        belépési pont; a szekciók sorrendje az App-ban
  config.ts                a szervezői kapcsoló (esősáv)
  data/
    programme.json         a teljes műsor (napok, filmek) — ITT szerkeszd a programot
    venues.json            a négy helyszín: cím, ikon, koordináta, Google Maps link
    types.ts               a fenti két fájl típusai
    programme.ts           tipizált export + segédek (entriesAt, entryKey, filmCount…)
  lib/
    calendar.ts            Google / Outlook link, .ics építés, letöltés
    slug.ts, reveal.ts
  hooks/                   useNow, useOverflowX, useEscape
  styles/
    tokens.css             a handoff tokenjei (szín, tipó, tér, effekt, mozgás)
    global.css             reset, .container, .reveal, reduced-motion blokk
  components/ui/           Button, Chip, Badge, Icon
  sections/                RainBanner, SiteHeader, Hero, Countdown, Programme, FilmCard,
                           Venues, VenueCard, VenueMap, Admission,
                           SiteFooter, StoryOverlay, JsonLd
```

## Adatszerkesztés

A műsor a `src/data/programme.json`-ban él. Egy film mezői: `time` („19.45”, ponttal),
`title`, `venue` (a négy helyszínnév egyike), `min` (játékidő, a naptárbejegyzés hossza is),
`rating` (6/12/16, opcionális), `lang` („Magyar film” / „Magyar szinkron”, opcionális),
`tags` (`Élő`, `Családi`, `Késő esti` bármelyike), `sub` (egy-két mondat).
A címkék a kártyán ezekből származnak; ami hiányzik, az nem jelenik meg.
Ha a kezdés az előző programtól függ, add meg a `timeLabel` mezőt („a vetítés után”): ez jelenik
meg az idő helyett, és a program kimarad a naptárexportból és a JSON-LD-ből, mert a `time`
ott csak becslés a rendezéshez.

Egy új vendégportré (kivágott, átlátszó hátterű PNG) így kerül a fotók duotónjába:

```bash
python scripts/duotone.py assets-src/photos/nev.png public/assets/portraits/nev.webp --height 1200
```

A lábléc partnerei (főszervező, támogató) a `festival.partners` tömbben vannak. A logó a
`public/assets/logos/` mappából jön; egy új fekete-átlátszó PNG-t így készíts elő:

```bash
python scripts/tint-logo.py assets-src/logos/eredeti.png public/assets/logos/nev.png
```

Amíg a logófájl hiányzik, a lábléc a partner nevét mutatja betűvel.

A helyszínek koordinátái kézzel vannak elhelyezve, a Kertmozi szándékosan nem geokódolt
(lásd a `note` mezőt). Ne adj hozzá futásidejű geokódolást.

## Indulás előtt

- [ ] Az `og:image` abszolút URL-je az `index.html`-ben a Pages-címre mutat; éles domainnél cserélni
- [ ] Kanonikus URL ellenőrzése (`index.html` + `programme.json` → `siteUrl`)
- [ ] Korhatárok és játékidők megerősítése a szervezőkkel (a *10 éjszakás kaland* és a *Nincs visszaút*
      maraton hossza hiányzik, a *Michael* és a *Backrooms* becslés)
- [ ] Péntek 18.00 akusztikus fellépő neve
- [ ] Uránia Mozi koordinátája hozzávetőleges (`venues.json`), egyeztetendő
- [ ] A közönségtalálkozók becsült kezdése („a vetítés után”: 21.15 és 16.00) csak a rendezéshez van
- [ ] Dobó tér és Agria Park koordináták megerősítése: a handoff README táblázata és a
      `design/map.html` eltér, a kód a `map.html` értékeit használja

## Ismert hiányok

- A helyszín-popup nincs fókuszcsapdázva (a handoff is jelzi).
- A story-kártya képernyőfotóval menthető; szerver oldali PNG-generálás a kézenfekvő upgrade.
