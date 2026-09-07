# Belvárosi Filmpiknik — design system

The visual system for **Belvárosi Filmpiknik**, an open-air film festival run by the
**Uránia Mozi és Rendezvényközpont** in the historic centre of Eger, Hungary. Three evenings,
four outdoor venues, twelve films, free entry. The system was extracted from the festival's
2026 promo material and the promo web page built from it (`Filmpiknik Promo.dc.html` at the
project root).

## Sources

| Source | Where |
| --- | --- |
| Festival poster (programme, dates, venues) | `assets/poster.jpg` (user upload) |
| Cover/townscape artwork | `assets/cover.jpg`, cropped to `assets/townscape.png` |
| Giveaway announcement graphic | `assets/nyeremeny.jpg` |
| Live promo page built from them | `Filmpiknik Promo.dc.html` |
| Venue geometry | `map.html` (Leaflet + OpenStreetMap raster tiles) |

No codebase, Figma file or brand book was provided. Everything here is derived from those images
and the page built with the user over this project. **No logo was supplied**, so the brand mark is
the festival name set in Kaushan Script — there is no logotype asset and none was invented.

## Index

- `styles.css` — the entry point consumers link. `@import` lines only.
- `tokens/` — `fonts`, `colors`, `typography`, `spacing`, `effects`, `motion`.
- `components/core/` — Button, Badge, Eyebrow, SectionHeading, Card.
- `components/forms/` — Input, NewsletterForm.
- `components/festival/` — Countdown, DayTabs, FilmCard, VenueRow, PriceCard, Portrait.
- `ui_kits/promo_site/` — the full one-page site recreation.
- `guidelines/` — foundation specimen cards (Colors, Type, Spacing, Brand).
- `assets/` — poster, cover, townscape silhouette, giveaway graphic.
- `ds-local.js` — browser-loadable build of every component, generated from the sources in
  `components/`. The cards and the UI kit prefer the compiler's `_ds_bundle.js` and fall back to
  this file, so everything renders whether or not the project is registered as a Design System.
  **Regenerate it whenever you change a component** (concatenate the sources, strip `import`/`export`,
  publish on `window.Filmpiknik`).
- `SKILL.md` — Agent Skills entry point.

### Intentional additions

The sources define no component library, so the component set was authored from the page itself:
every primitive here has a direct counterpart in the promo site. `Eyebrow` and `SectionHeading`
were factored out because the same gold-kicker-plus-heading pattern opens every section.

---

## CONTENT FUNDAMENTALS

**Language.** Hungarian throughout. Sentence case for prose; ALL CAPS with wide tracking only for
short labels, eyebrows, buttons and the date line — never for a sentence.

**Address.** Informal second person singular (*tegezés*): "Kövesd", "Kommenteld be", "Hozz plédet",
"Húzd oldalra". The festival speaks as a friendly local host, not an institution. First person plural
appears only when the organiser genuinely acts: "Szólunk, amikor kihirdetjük a teljes műsort",
"A műsorváltoztatás jogát fenntartjuk".

**Register.** Warm, plain, concrete. Copy states facts and lets them be attractive on their own:
"3 este · 4 helyszín · 12 film" rather than adjectives about magic or unforgettable nights. No
exclamation marks except inside film titles (*Mamma Mia!*).

**Length.** Eyebrows under six words. Headings one line, at most two. Body paragraphs two or three
sentences. Film descriptions are a single fragment with no closing full stop: "Musical a legnagyobb
ABBA slágerekkel", "Sci-fi klasszikus a régi Kertmozi hangulatában".

**Punctuation.** Middle dot `·` separates peer facts ("Uránia Mozi · ingyenes", "Csütörtök · 20.00").
En dash for ranges ("SZEPT. 16–18."). **Em dashes are not used** — a colon or comma does that job.
Times are written with a dot in the Hungarian manner: "20.00", never "20:00".

**Free is stated, not sold.** The festival is free at every venue; say so plainly ("0 Ft", "Ingyenes")
and never dress it as a limited offer. The only urgency the brand permits is practical:
"a terem véges: érdemes időben jönni", "a helyfoglalás érkezési sorrendben történik".

**No emoji.** Anywhere. The one decorative glyph the brand uses is `✦` as a separator in marquee-style
title runs, and the arrow `→` in the "Húzd oldalra a kártyákat →" affordance hint.

**Sample voice**

> Eger történelmi belvárosa · 3 este · 4 helyszín · 12 film
> Minden helyszín pár perc járásra van egymástól a belvárosban. Kattints a pontokra a részletekért.
> Egy levél a programról, egy a kezdés előtt. Semmi más.

---

## VISUAL FOUNDATIONS

**The idea.** Dusk in a small historic city: deep wine sky, warm gold light, cream paper. The whole
system is two hues — wine and gold — plus cream, and it never leaves them.

**Colour.** `--wine-900 #2E0A1B` is the page. Sections alternate between it and a slightly lifted
`--wine-800` wash so the scroll has rhythm without a second background colour. Gold
(`--gold-300 #F0D48A`) is the only accent and is rationed: numerals, eyebrows, one primary button
per region, hairlines, map pins. Large gold fills are wrong — the exception is the single cream
`PriceCard`, which is the loudest thing on the page precisely because nothing else is light. Rose
tints (`--rose-400`, `--rose-500`) carry secondary text; they are the wine hue desaturated, so the
page never introduces a grey.

**Type.** Two families. **Kaushan Script** is the wordmark voice and appears *only* as the festival
name — hero, header, footer. Everything else is **Space Grotesk**: 700 for headings, labels and
numerals, 400 for body. Headings run tight (`-1px` tracking, 1.06 leading); labels run wide
(`2–2.6px`, uppercase). Numerals are `tabular-nums` so the countdown does not jitter.

**Scale.** Fluid, not breakpointed. Every size is a `clamp()` — `--size-hero` spans 44→128px,
`--section-y` 44→92px. There is one column of content at `--measure 1200px`; grids are
`repeat(auto-fit, minmax(…, 1fr))`, so the layout reflows continuously and no media queries are needed.

**Backgrounds.** Photography is never shown raw. The hero is a wine gradient with the Eger townscape
crop (`assets/townscape.png`) laid in at 40% opacity, `mix-blend-mode: screen`, plus a slowly pulsing
radial gold glow and a downward veil that dissolves it into the page. Any supplied artwork that
already contains typography is cropped to its imagery before use — the page sets its own type.

**Cards.** Radius 14–18px, no drop shadow. Separation comes from value plus a 1px gold hairline
(`rgba(240,212,138,.28)`). Five surfaces only: translucent glass on wine, cream, dashed gold,
the plum→wine giveaway gradient, and plain raised wine. The signature detail is the perforated gold
filmstrip along the top edge of programme cards.

**Transparency and blur.** Blur appears exactly once, on the sticky header (`blur(12px)` over a 0.9
wine scrim). Elsewhere transparency is flat alpha over wine — `rgba(255,243,224,.07)` glass fills and
gold hairlines — which keeps it cheap and predictable on mobile.

**Borders and separators.** 1px gold hairline for cards; `rgba(255,243,224,.16)` cream hairline for
structural rules (header bottom, footer top). Lists of venues are stacked with a 2px gap over a gold
background, so the gaps read as gold rules. Dashed gold marks a secondary offer.

**Radii.** `999px` pills for anything interactive and small (nav CTA, day tabs, badges); `6px` for
full-size buttons; `12–18px` for containers. Nothing is square.

**Shadows.** Effectively none. Two exist: `--shadow-hero-text` so the script wordmark survives over
imagery, and `--halo-gold`, a 6px translucent gold ring around map pins and numbered markers.

**Motion.** Restrained and one-directional. Content reveals on scroll with an 18px rise and fade over
0.8s on `cubic-bezier(.2,.7,.3,1)`, staggered 110ms within a group, and never replays. Hover on a
linked card is `translateY(-6px)` plus a brighter gold border over 0.2s. Buttons change colour on
hover only — no scaling, no bounce. The one ambient loop is the 7s hero glow. Everything is disabled
under `prefers-reduced-motion`.

**Interaction states.** Hover: primary button gold→cream; outline button gains a 10% cream wash;
links go gold→cream. Active/press: no transform, colour only — the brand does not squash things.
Focus: the gold border on inputs; keep a visible focus ring on anything custom.

**Imagery.** Warm, evening, low-sun. Anything cool or clinical is off-brand. Photographs are always
either cropped to a silhouette band or veiled by a wine gradient; they never sit at full contrast
behind text.

**Portraits.** Faces are never shown. A guest portrait is a **silhouette**: one flat wine shape cut
from the photograph and set on the same gold-to-rose paper as the hero townscape, with the name and
role in type underneath doing the identifying. This is a deliberate retreat from illustration —
tracing a photograph into line art produces a mechanical, uncanny face that sits badly next to a
hand-drawn skyline, whereas a silhouette is honest about being a shape and shares the drawing's
flatness.

The cut: classify background by whichever channel actually separates it (a blue studio backdrop by
blue dominance, a backlit subject by luminance), keep the single connected blob containing the head,
close thin gaps such as spectacle rims and catch lights with a blur-threshold-blur pass, fill
enclosed holes, then scale the blob to about 86% of the sheet height and let it bleed off the bottom
edge rather than float as a cut stump. Fill `#521E30` at 94% over the
`#F0D096 → #E3B78D → #CD9096 → #B4747F` paper, with light grain. The default `arch` shape, with its
rounded top, echoes a cinema screen.

The photograph has to be cuttable: the subject must separate from the background across the whole
outline. A studio shot on a plain backdrop cuts cleanly. A location photo where the face sits within
a few percent of the wall behind it cannot be cut at all — request a different photograph rather
than shipping a broken shape. Cut files live in `assets/portraits/`; sources stay in `uploads/` and
are never shipped.

**Maps.** Real geography, never drawn. OpenStreetMap raster tiles run through `--map-tile-filter` to
land them in the wine palette, with numbered gold pins matching the venue list numbering.

---

## ICONOGRAPHY

The brand is deliberately **icon-free**. Nothing in the source material or the promo page uses an icon
set, and none was added:

- **Numbers instead of icons.** Venues are identified by gold numbered discs (1–4) that pair the list
  with the map pins. This is the system's only "icon".
- **Typographic marks.** `·` as a separator, `→` for the horizontal-scroll hint, `✦` between titles in
  marquee runs. No emoji, ever.
- **No icon font, no sprite, no SVG set** is bundled, and no CDN icon library is linked — adding one
  would be a new decision, not a recovery of something lost.

If a future surface genuinely needs icons (a ticketing flow, a settings screen), pick a single
thin-stroke outline set, tint it `--text-accent`, and record the choice here before shipping it.
