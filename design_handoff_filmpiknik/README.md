# Handoff: Belvárosi Filmpiknik 2026 — promo weblap

## Overview

A single-page promotional site for the **Belvárosi Filmpiknik** open-air film festival in Eger,
Hungary, 17–19 September 2026. Three evenings, three venues, eleven films, every programme free.
The page's jobs, in order: make the dates and the free admission unmissable, let a visitor find the
one film they want, get that film into their calendar, and get them to the right venue.

The page is in Hungarian. All copy in this bundle is final and should be used verbatim.

## About the Design Files

The files in `design/` are **design references created in HTML** — a working prototype that shows
the intended look and behaviour. They are not production code to lift into a codebase.

`design/Filmpiknik Promo.dc.html` is written for a preview runtime (`support.js`, `<x-dc>`,
`{{ }}` template holes, an `sc-for`/`sc-if` template dialect). Do **not** try to port that runtime.
Read the file as a spec: the markup shows structure and every literal style value, the logic class
at the bottom holds the programme data, the calendar/ICS builders and the state machine. Recreate it
in the target codebase's own environment (React, Vue, Astro, plain HTML — whatever the project
uses), following that project's established patterns. If there is no codebase yet, this page is
static apart from one form POST: a static-site generator or a single React page is plenty.

`design/map.html` is a **real, self-contained implementation** — Leaflet with OpenStreetMap tiles,
three hand-placed markers, festival-styled popups. It can be shipped close to as-is; it is embedded
in the page through an `<iframe>`.

## Fidelity

**High fidelity.** Final colours, typography, spacing, copy and interactions. Every value in the
prototype is deliberate; reproduce them exactly. The design tokens in `tokens/` are the source of
truth and the prototype's inline literals all correspond to a token.

## Design tokens

`tokens/filmpiknik.css` is one flat file — link it and every value below is available as a custom
property. `tokens/source/*.css` is the same content split by concern; `tokens/styles.css` is the
`@import` manifest.

### Colour

Wine ground, gold accent, cream light surfaces, rose muted text. **Never** introduce a new hue.

| Token | Hex | Use |
| --- | --- | --- |
| `--wine-900` | `#2E0A1B` | page background, ink on gold |
| `--wine-800` | `#3A0D22` | section background (map section top) |
| `--wine-750` | `#40101F` | map frame |
| `--wine-700` | `#430F26` | popups, newsletter section bottom |
| `--wine-600` | `#4E0F26` | text on cream surfaces |
| `--wine-500` | `#5A1230` | prize-card gradient end |
| `--wine-400` | `#6B1030` | hero gradient start |
| `--plum-500` | `#8E1A56` | prize-card gradient start |
| `--gold-300` | `#F0D48A` | **the** accent: buttons, eyebrows, numbers, focus |
| `--gold-600` | `#B8863A` | eyebrow on cream surfaces |
| `--cream-100` | `#FFF8EA` | headings on dark, cream surfaces |
| `--cream-200` | `#FFF3E0` | body text on dark |
| `--rose-200` | `#F3D3DE` | body text on plum |
| `--rose-300` | `#E9B0C0` | popup times, venue line on cards |
| `--rose-400` | `#DBB6C1` | muted body text |
| `--rose-500` | `#C98FA3` | subtle text, hints |
| `--rose-800` | `#6E4553` | muted text on cream |

Semantic aliases exist for all of these (`--surface-base`, `--text-muted`, `--accent`,
`--accent-ink`, `--border-hairline`, …) — prefer them in components.

Alpha values used inline, all over gold or cream:
`rgba(240,212,138,·)` at `.14` (soft fill), `.22`/`.24`/`.28`/`.3`/`.34` (borders), `.45` (popup
border), `.55`/`.6` (hover border), and `rgba(255,243,224,·)` at `.03`/`.06`/`.07` (glass fills),
`.16`/`.28`/`.4`/`.45` (hairlines and ghost-button borders).

### Gradients

| Token | Value |
| --- | --- |
| `--grad-night` | `linear-gradient(180deg, #6B1030 0%, #4A0C22 55%, #2E0A1B 100%)` — hero, story card |
| `--grad-section` | `linear-gradient(180deg, #3A0D22, #2E0A1B)` — map section |
| `--grad-prize` | `linear-gradient(150deg, #8E1A56, #5A1230)` — prize card |
| `--grad-card` | `linear-gradient(180deg, rgba(255,243,224,0.09), rgba(255,243,224,0.03))` — film cards |
| `--grad-veil` | `linear-gradient(180deg, rgba(46,10,27,0.12) 0%, rgba(46,10,27,0.4) 55%, #2E0A1B 100%)` — over the hero illustration |
| `--grad-glow` | `radial-gradient(closest-side, rgba(240,212,138,0.32), transparent)` — the pulsing moon glow |
| `--grad-filmstrip` | `repeating-linear-gradient(90deg, #F0D48A 0 12px, transparent 12px 24px)` — 8px sprocket strip on every film card |

### Typography

Two families, both Google Fonts:

- **Kaushan Script** (400) — display only: the wordmark and the hero headline. Never for UI, never
  below 19px.
- **Space Grotesk** (400/500/600/700) — everything else.

The page is fluid; sizes are `clamp()` and must stay so.

| Role | Size | Weight | Tracking | Colour |
| --- | --- | --- | --- | --- |
| Hero headline | `clamp(44px, 11vw, 128px)`, `line-height: .96` | 400 Kaushan | — | `#FFF8EA`, `text-shadow: 0 14px 40px rgba(0,0,0,.45)` |
| Wordmark (header) | `clamp(19px, 2.6vw, 25px)` | 400 Kaushan | — | `#FFF8EA` |
| Wordmark (footer) | `clamp(22px, 3vw, 30px)` | 400 Kaushan | — | `#FFF8EA` |
| Section h2 | `clamp(26px, 4.6vw, 48px)` | 700 | `-1px` | inherit |
| Date line | `clamp(18px, 3vw, 32px)` | 700 | `-.5px` | `#FFF8EA` |
| Countdown number | `clamp(24px, 4vw, 40px)`, `line-height: 1` | 700 | `-1px`, `tabular-nums` | `#F0D48A` |
| Price "0 Ft" | `clamp(34px, 5.5vw, 56px)`, `line-height: 1` | 700 | `-2px` | `#4E0F26` |
| Card h3 | `clamp(19px, 2.6vw, 24px)`, `line-height: 1.15` | 700 | — | `#FFF8EA` |
| Venue h3 | `clamp(17px, 2.2vw, 21px)` | 700 | — | `#FFF8EA` |
| Lead paragraph | `clamp(14.5px, 1.9vw, 17px)`, `line-height: 1.6` | 400 | — | `#DBB6C1` |
| Body | `13.5–15px`, `line-height: 1.55–1.6` | 400 | — | `#DBB6C1` |
| Eyebrow / label | `11–12.5px` uppercase | 700 | `1.6–3px` | `#F0D48A` or `#C98FA3` |
| Badge / chip | `10.5–11px` uppercase | 700 | `1.4–1.6px` | `#F0D48A` |
| Hero eyebrow | `clamp(11px, 1.4vw, 13px)` uppercase | 700 | `clamp(2px, .6vw, 5px)` | `#F0D48A` |

Long paragraphs carry `text-wrap: pretty`. Nothing uppercase goes below 10.5px.

### Spacing, radius, shadow, motion

Section rhythm: `padding: clamp(44px, 7vw, 92px) clamp(18px, 4vw, 34px)`; content capped at
`max-width: 1200px; margin: 0 auto`. Card padding `clamp(18px, 2.6vw, 24px)`; feature-card padding
`clamp(24px, 3.4vw, 38px)`. Grid/flex gaps `clamp(14px, 2vw, 20px)` for cards, `8–10px` for chips.

Radius: `6px` rectangular buttons · `8px` menu rows · `12px` countdown cells and calendar menu ·
`14px` film cards, venue cards, popups · `18px` feature cards, map frame · `20px` story card ·
`999px` pills and chips · `50%` venue numerals.

Shadows: `0 20px 44px rgba(20,4,12,.6)` (calendar menu) · `0 24px 60px rgba(20,4,12,.6)` (venue
popup) · `0 30px 80px rgba(0,0,0,.6)` (story card) · focus ring
`0 0 0 3px rgba(240,212,138,.25)`.

Motion — two keyframes only:

```css
@keyframes fpReveal { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: none; } }
@keyframes fpGlow   { 0%,100% { opacity: .5; } 50% { opacity: .85; } }
```

`fpReveal .8s both` on entering blocks, staggered `0 / 110 / 220 / 330 / 440ms`; `.18–.22s` for
popups and menus. `fpGlow 7s ease-in-out infinite` on the hero glow. Hover transitions
`.18–.2s ease` on `transform`, `border-color`, `background`. All of it is disabled under
`prefers-reduced-motion: reduce` — keep that block.

## Page structure

Order top to bottom: rain banner (conditional) → sticky header → hero → programme → venues + map →
admission → newsletter → footer → story overlay (conditional).

### 1. Rain banner — conditional

Full-width `#F0D48A` bar above the header, ink `#2E0A1B`, `role="status"`. Content: the label
"Esőhelyszín" plus one sentence. Driven by a single field on the logic class, `rainAlert = null`;
an organiser sets it to a string on a wet day and the bar appears. In production this should be one
editable value in a CMS or config, not a code change.

### 2. Sticky header

`position: sticky; top: 0; z-index: 40`, `rgba(46,10,27,.9)` with `backdrop-filter: blur(12px)`,
bottom hairline `rgba(240,212,138,.16)`. Left: wordmark "Filmpiknik" linking `#top`. Right: nav
links "Filmek" `#filmek`, "Térkép" `#terkep`, "Belépő" `#belepo` (12px uppercase, tracking 2px)
plus a gold pill "Emlékeztető" → `#hirlevel`. Wraps on narrow screens. `html { scroll-behavior: smooth }`.

### 3. Hero

`min-height: clamp(560px, 90vh, 940px)`, content bottom-aligned, four stacked layers:

1. `--grad-night` base.
2. `assets/townscape.png` — hand-drawn Eger skyline, pinned to the bottom, height
   `clamp(200px, 34vw, 420px)`, `background-size: cover`, `opacity: .4`, `mix-blend-mode: screen`.
3. The glow: `min(820px, 94vw)` wide, `clamp(220px, 40vw, 380px)` tall, centred at `top: 6%`,
   `--grad-glow`, animated with `fpGlow`.
4. `--grad-veil` so the type stays legible.

Content: eyebrow "Eger történelmi belvárosa · 3 este · 3 helyszín · 11 film" → headline
"Belvárosi / Filmpiknik" (two lines, Kaushan) → date row "2026. SZEPT. 17–19." + 1px divider +
"Naplemente után" → countdown → two buttons ("Filmek" gold solid, "Szólj, ha kezdődik" ghost).

**Countdown**: four cells (nap / óra / perc / mp), ticking once per second toward
`2026-09-17 18:00` local. Hours, minutes, seconds zero-padded; days not. Cell is
`min-width: clamp(74px, 11vw, 108px)`, `rgba(255,243,224,.07)` on a `rgba(240,212,138,.28)` border,
radius 12px. Trailing label "a nyitóestig". Clamp at zero, never show negatives.

### 4. Programme (`#filmek`)

Heading "A műsor" with, on the same row, a ghost pill **"Teljes fesztivál a naptáramba"** that
downloads one `.ics` containing all 16 programmes.

**Day tabs** — three pills: Csütörtök / Péntek / Szombat. Active: `#F0D48A` fill, `#2E0A1B` ink.
Inactive: transparent, `#DBB6C1`, `rgba(240,212,138,.3)` border.

**Filters** — two labelled chip groups:

- *Helyszín*: Mind · Dobó tér · Kertmozi · Agria Park udvar
- *Jelleg*: Mind · Családi · Késő esti · Élő program (the value behind the last is `Élő`)

Single-select each, ANDed together, applied within the selected day. Chips are smaller than the
tabs (9px/15px, 11px type). When a combination yields nothing, the strip is replaced by
"Ezen a napon nincs a szűrésnek megfelelő program." plus a gold **"Szűrők törlése"** button.

**Film strip** — horizontal, `overflow-x: auto`, `scroll-snap-type: x mandatory`, cards
`flex: 0 0 clamp(250px, 74vw, 316px)` with `scroll-snap-align: start`. Card: `--grad-card` fill,
`rgba(240,212,138,.22)` border, radius 14px, an 8px `--grad-filmstrip` sprocket strip across the
top; hover `translateY(-6px)` and border to `rgba(240,212,138,.6)`.

Card contents in order: "Nap · Idő" eyebrow → title → badge row → description → venue line →
action row.

Badges are derived, not authored: age rating (`{n} éves kortól`), language (`Magyar film` or
`Magyar szinkron`), running time (`{n} perc`). Any missing field simply omits its badge — live
programmes have none of the three.

**Action row** — two buttons:

- **Naptárba** (soft gold fill) opens a small menu *above* the button (`bottom: calc(100% + 8px)`,
  `#430F26`, radius 12px, `min-width: 210px`) with three rows: *Google Naptár*, *Outlook*,
  *Apple Naptár / .ics fájl*. Google and Outlook are plain links with the event in the query
  string; the third downloads a one-event `.ics`. Only one menu open at a time; a click outside
  any card, or Escape, closes it.
- **Megosztás** (ghost) opens the story overlay.

Under the strip, the hint "Húzd oldalra a kártyákat →" appears **only when the strip actually
overflows** — measured with `scrollWidth - clientWidth > 4` on mount, on resize (`ResizeObserver`)
and after every update. Do not render it unconditionally; on a wide desktop a short day fits whole
and the hint would be a lie.

### 5. Venues + map (`#terkep`)

`--grad-section` background. Heading "Három helyszín, három hangulat", lead paragraph, then a
two-column `repeat(auto-fit, minmax(300px, 1fr))` grid: the map left, three venue cards right.

**Map**: `aspect-ratio: 4/3`, `min-height: 380px`, radius 18px, `#40101F` fill,
`rgba(240,212,138,.24)` border, containing `<iframe src="map.html" loading="lazy">`.
See `design/map.html` — Leaflet 1.9.4 from unpkg, CARTO dark-matter tiles, three markers as gold
numbered circles, `fitBounds` with 56px padding, popups restyled to the festival palette.
Coordinates are hand-placed and final:

| # | Venue | Lat, lon |
| --- | --- | --- |
| 1 | Dobó tér | 47.90275, 20.37475 |
| 2 | Kertmozi | 47.90048, 20.37919 |
| 3 | Agria Park udvar | 47.89865, 20.37665 |

The Kertmozi pin is deliberately **not** geocoded: the cinema is the inner courtyard of the block
framed by the Bródy Sándor library, Egererdő Zrt. and Egészségház u. 29/31/3, and a street-level
geocode lands on the wrong side of a building. Keep the literal coordinates; do not add a runtime
geocoding call (an earlier version had one and it was removed).

**Venue cards** — each is its own `#2E0A1B` card (radius 14px, `rgba(240,212,138,.22)` border), not
rows in a shared container, because the popup must be able to escape the card's bounds. Layout: a
34px gold numeral circle, then a 21px gold line-icon beside the name, the opening line in gold
uppercase, the address in `#C98FA3`, a description, and a hint line that reads "Mutasd a műsort" or
"Kattints a bezáráshoz".

Icons (24×24, `fill: none`, `stroke: #F0D48A`, `stroke-width: 1.5`, round caps and joins):

| Venue | `d` |
| --- | --- |
| Dobó tér (stage front) | `M4 20h16M6 20V9l6-4 6 4v11M10 20v-6h4v6` |
| Kertmozi (screen on legs) | `M3 4h18v11H3zM8 20l4-4 4 4M12 15v1` |
| Agria Park (courtyard arcade) | `M4 21V11a8 8 0 0116 0v10M3 21h18M9.5 21v-6a2.5 2.5 0 015 0v6` |

**Venue popup**: opens on hover **and** on focus, pins open on click (click again to unpin), Enter
and Space do the same from the keyboard. `#430F26`, radius 14px, `rgba(240,212,138,.45)` border,
a 11px rotated square as the arrow at `left: 34px`, positioned `top: calc(100% - 8px)` and inset
12px from the card's sides. Header row: "A teljes műsor itt" + an "Útvonal →" Google Maps link.
Body: **every programme at that venue across all three days**, in a `108px 1fr` grid — "Nap · Idő"
in rose uppercase, title in cream — scrollable at `max-height: 300px`. The open card gets
`z-index: 40` (others `1`) so the popup covers the cards below it.

Addresses: Dobó István tér, Eger · Egészségház utca, Eger — a régi Kertmozi a Bródy Sándor könyvtár
mögötti udvarban · Törvényház utca 4, Eger.

### 6. Admission (`#belepo`)

`repeat(auto-fit, minmax(290px, 1fr))` grid of three cards, radius 18px:

1. **Cream** (`#FFF8EA`, ink `#4E0F26`): eyebrow "Minden vetítés és program", "0 Ft", then the
   free-admission and first-come-first-served copy.
2. **Dashed gold** (`rgba(240,212,138,.12)` on `1px dashed rgba(240,212,138,.55)`): the two
   audience meet-ups, with a gold "Részletek" button → `uraniaeger.hu`.
3. **Plum** (`--grad-prize`): the prize draw, with a ghost "Játszom" button → the Facebook page.

Below, one muted line: buffet, the Uránia Mozi as the rain venue, programme-change disclaimer.

### 7. Newsletter (`#hirlevel`)

Centred, max-width 780px, on `linear-gradient(180deg, #2E0A1B, #430F26)`. Eyebrow "Emlékeztető",
heading "Szólunk, amikor kezdődik", the promise "Egy levél a programról, egy a kezdés előtt. Semmi
más.", then an inline form: email input (`flex: 1 1 260px; max-width: 380px`, glass fill, gold
border, radius 6px) and a gold submit reading "Feliratkozom" / "Küldés…" while in flight. A
`role="status"` line below shows the result.

**This is the one piece of real integration work.** The logic class has
`newsletterEndpoint = ""`; while empty, the form only acknowledges locally. With a URL it POSTs
`{ email }` as JSON and expects any 2xx. Wire it to Mailchimp / Buttondown / Formspree (or the
project's own endpoint) before launch. Success: "Köszönjük! Szólunk, amint közeledik a nyitóest."
Failure: "Most nem sikerült elküldeni. Próbáld újra, vagy írj: urania@egermozi.hu". Validation is
the browser's — `type="email" required`.

### 8. Footer

Top hairline, wordmark, "Uránia Mozi és Rendezvényközpont · Eger / uraniaeger.hu ·
facebook.com/egermozi", and right-aligned "Eger · A te történeted".

### 9. Story overlay — conditional

Full-screen `rgba(20,4,12,.86)` + `blur(6px)`, `z-index: 90`, scrollable, closed by Escape or a
click on the backdrop (clicks inside stop propagation).

The card is a 9:16 share graphic: **height-driven** — `flex: 0 0 auto`, `height: min(66vh, 600px)`,
`aspect-ratio: 9/16`, `max-width: 88vw` — so the flex overlay cannot squash it. It sets
`container-type: size` and all its type is in `cqh` units with `max(px, …)` floors, so it scales
with the card, not the viewport, and small caps never drop below 11px. Contents: `--grad-night`
with the townscape at 42% height, the wordmark and dates top, the film's time / title / venue
bottom, and a gold "Ingyenes" pill beside "uraniaeger.hu".

Below the card: a gold **Megosztás** button (`navigator.share`, falling back to
`navigator.clipboard` with the label flipping to "Link kimásolva" for 2.5s), a ghost **Bezár**, and
the note "Story-méretű kártya: mentsd képernyőfotóval, vagy oszd meg a linket."

If the target platform can render server-side, generating a real PNG for this card is the obvious
upgrade — the current design is deliberately screenshot-friendly as a fallback.

## Interactions summary

| Trigger | Result |
| --- | --- |
| Day tab click | switches the day, filters re-apply, strip re-measures |
| Filter chip click | single-select within its group, ANDed with the other group |
| "Szűrők törlése" | both groups back to "Mind" |
| Film card hover | lifts 6px, border brightens |
| "Naptárba" click | toggles that card's calendar menu; any other click or Escape closes it |
| Google / Outlook row | opens a prefilled event in a new tab |
| ".ics fájl" row | downloads a one-event file, closes the menu |
| "Teljes fesztivál…" | downloads all 16 events as one file |
| "Megosztás" (card) | opens the story overlay for that film |
| Story share | native share sheet, else clipboard + "Link kimásolva" |
| Backdrop click / Escape | closes the overlay |
| Venue card hover / focus | opens its programme popup |
| Venue card click / Enter / Space | pins the popup open; again unpins |
| Map marker hover / click | opens the same programme as a Leaflet popup |
| Newsletter submit | POSTs to `newsletterEndpoint`, or acknowledges locally when unset |
| Resize | re-measures the strip, shows or hides the drag hint |
| Tick (1s) | countdown recomputes |

## State

| State | Type | Notes |
| --- | --- | --- |
| `day` | `0 \| 1 \| 2` | selected day tab |
| `now` | epoch ms | 1s interval, only feeds the countdown |
| `venueFilter` | venue name or `"Mind"` | |
| `tagFilter` | `"Családi" \| "Késő esti" \| "Élő" \| "Mind"` | |
| `hoverVenue` | index or `null` | hover/focus |
| `pinVenue` | index or `null` | click; takes precedence over hover |
| `calMenu` | key or `null` | at most one open menu, keyed `day.short + time + title` |
| `story` | `{title, when, venue}` or `null` | overlay |
| `stripScrollable` | boolean | measured, never assumed |
| `email`, `sending`, `formMsg` | | newsletter form |

No data fetching. The programme is static data, shipped with the page — in a real build it belongs
in a JSON/CMS collection rather than inline in a component.

## Programme data

Live in the logic class's `days()`. Each film: `time` (`"19.45"`), `title`, `venue`, `min`
(running time, also the calendar duration; falls back to 90), `rating` (6/12/16, optional),
`lang` (`"Magyar film"` / `"Magyar szinkron"`, optional), `tags` (any of `Élő`, `Családi`,
`Késő esti`), `sub` (one-to-two-sentence description). Each day: `label`
(`"Szept. 17. csütörtök"`), `short` (`"Csütörtök"`), `date` (`[2026, 8, 17]`, month 0-indexed).

**Two things need confirming with the organisers before launch:** the age ratings, and the running
times for *Michael* and *Backrooms* — both are current best estimates.

## Calendar export

- **Google**: `calendar.google.com/calendar/render?action=TEMPLATE` with `text`, `dates`
  (`YYYYMMDDTHHMMSS/YYYYMMDDTHHMMSS`), `ctz=Europe/Budapest`, `location`, `details`.
- **Outlook**: `outlook.live.com/calendar/0/action/compose?rru=addevent` with `subject`,
  `startdt`/`enddt` as ISO with an explicit `+02:00` (Hungary is on CEST in mid-September),
  `location`, `body`.
- **ICS**: `VCALENDAR` 2.0, one `VEVENT` per programme, `DTSTART;TZID=Europe/Budapest:` with
  floating local times — what calendar apps expect for a fixed-location event. `;`, `,`, `\` and
  newlines escaped per RFC 5545. Blob download, object URL revoked after 4s. Filenames are
  accent-folded slugs: `filmpiknik-<slug>.ics`, and `belvarosi-filmpiknik-2026.ics` for the lot.

Titles are `"<film> · Belvárosi Filmpiknik"`, location `"<venue>, Eger"`, description the film's
`sub` plus "Ingyenes program." and the URL.

## Accessibility

Venue cards are `role="button" tabindex="0"` with `aria-expanded`, Enter/Space handlers and a
visible focus ring (`#F0D48A` border + `0 0 0 3px rgba(240,212,138,.25)`) — **in a real codebase
make them actual `<button>`s**; the prototype's runtime made that awkward. The calendar trigger
carries `aria-expanded`. Status regions (`role="status"`) on the rain banner and the form result.
Decorative SVGs are `aria-hidden`; the email input has an `aria-label`; the map iframe has a
`title`. All animation is behind `prefers-reduced-motion`. Contrast: gold on wine and cream on
wine both clear AA; the muted rose `#C98FA3` is used only for small non-essential text — keep it
off anything load-bearing.

Two known gaps worth closing during implementation: the popup is not focus-trapped, and the story
overlay does not move focus into itself.

## SEO / social

In the document head: title, description, `og:type/site_name/title/description/image/locale`
(`hu_HU`), `twitter:card=summary_large_image`, `theme-color: #2E0A1B`. `og:image` currently points
at `assets/townscape.png`; before launch produce a proper 1200×630 share card — the townscape on
`--grad-night` with the wordmark and dates is the intended composition.

Worth adding in a real build: a `JSON-LD` `Festival` + `ScreeningEvent` graph from the same
programme data, `hreflang`/`lang="hu"`, and a canonical URL.

## Assets

Everything in `assets/` was generated in this project — no third-party imagery, nothing licensed.

| File | What it is |
| --- | --- |
| `townscape.png` | The hero illustration: Eger's skyline (castle, minaret, basilica) as pen-and-wash line art on gold-to-rose paper. Used in the hero and the story card. |
| `cover.jpg`, `poster.jpg`, `nyeremeny.jpg` | Supporting festival imagery from the design-system exploration; not used by the current page. |
| `portraits/herendi.png` | A guest portrait as a silhouette — see below. |

**Portraits are silhouettes, never photographs.** One flat wine shape cut from a photo and set on
the same gold-to-rose paper as the townscape; the name and role in type do the identifying.
`assets/portraits/herendi.png` is the only cut one. Törőcsik Franciska is missing because none of
the available photographs were cuttable — the subject has to separate from the background across
the whole outline, and a location shot where the face matches the wall behind it cannot be cut.
Ask for a studio photo on a plain backdrop. The full recipe is in
`design-system/readme.md`. **There is no logo asset** — the wordmark is live Kaushan Script text.

Fonts are loaded from Google Fonts (`Kaushan+Script`, `Space+Grotesk:wght@400;500;600;700`) with
`preconnect` and `display=swap`. Self-host them if the project self-hosts fonts.

Leaflet 1.9.4 (CSS + JS) and CARTO dark-matter tiles come from CDNs in `map.html`. Keep the
OpenStreetMap and CARTO attribution — it is a licence condition.

## Files in this bundle

```
design/
  Filmpiknik Promo.dc.html   the whole page: markup, styles, programme data, logic
  map.html                   Leaflet venue map — shippable close to as-is
  support.js                 the prototype runtime; reference only, do not port
tokens/
  filmpiknik.css             all tokens, one flat file — the practical one to use
  source/*.css               the same, split by concern
  styles.css                 the @import manifest
components/
  core/, forms/, festival/   13 React components with .d.ts types and usage notes
design-system/
  readme.md                  voice, visual foundations, iconography, the portrait recipe
  SKILL.md                   makes the system usable as a skill in Claude Code
  assets-README.md           asset provenance
assets/                      images used by the design
```

The `components/` library is the design system's own React implementation of the recurring parts
(`Button`, `Badge`, `Eyebrow`, `SectionHeading`, `Card`, `Input`, `NewsletterForm`, `Countdown`,
`DayTabs`, `FilmCard`, `VenueRow`, `PriceCard`, `Portrait`). They are proper ES modules with types
and per-component `.prompt.md` usage notes. If the target project is React, start from these
rather than re-deriving the styling from the prototype's inline literals; the promo page predates
some of them, so where the two disagree, **the prototype is the current design** and the component
should be brought up to it.

## Suggested order of work

1. Tokens in, fonts loading, `prefers-reduced-motion` block in place.
2. Programme data out of the component and into JSON/CMS.
3. Static sections: header, hero (+ countdown), admission, newsletter shell, footer.
4. Programme section: tabs, filters, card strip, the measured drag hint.
5. Calendar menu and the three export paths.
6. Venues: cards, icons, popup, then the map iframe.
7. Story overlay — and consider a server-rendered PNG instead of screenshot-and-share.
8. Wire the newsletter endpoint; produce the 1200×630 `og:image`; confirm ratings and running times.
