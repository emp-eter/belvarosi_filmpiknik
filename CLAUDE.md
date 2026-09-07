# Belvárosi Filmpiknik — promo site

Single-page Hungarian promo site for an open-air film festival in Eger (17–19 Sept 2026).
Vite 7 + React 19 + TypeScript, CSS Modules, Leaflet from npm. Static build, no backend.

## Source of truth

`design_handoff_filmpiknik/README.md` is the spec; `design/Filmpiknik Promo.dc.html` is the
high-fidelity prototype; `tokens/filmpiknik.css` the tokens (copied to `src/styles/tokens.css`).
When code and handoff disagree, the handoff wins. `design-system/readme.md` holds voice and
visual rules.

## Commands

- `npm run dev` — dev server
- `npm run build` — `tsc -b` then `vite build`; must pass before handing work back
- `npm run typecheck`

## Conventions

- All copy is Hungarian and final: use it verbatim, informal *tegezés*, no exclamation marks,
  **no emoji**, times written `20.00` (dot, never colon), `·` between peer facts, en dash for
  ranges, no em dashes in new copy.
- Colours only from tokens: wine, gold, cream, rose. Never introduce a new hue or a grey.
  Gold is rationed (numbers, eyebrows, one primary button per region, hairlines).
- Sizes are fluid `clamp()`; no media queries, grids are `repeat(auto-fit, minmax(...))`.
- Keep the `prefers-reduced-motion` block in `global.css`. Only two keyframes: `fpReveal`, `fpGlow`.
- Programme data lives in `src/data/programme.json` and `venues.json`, not in components.
  Badges on film cards are derived from data, never authored.
- Venue coordinates are hand-placed; never add runtime geocoding (Kertmozi pin is intentional).
- Fonts: Kaushan Script only for the wordmark/hero headline, Space Grotesk for everything else.
- Interactive elements are real `<button>`/`<a>`; keep visible focus rings and `aria-expanded`.
- The organiser switch (`rainAlert`) comes from `src/config.ts` via Vite env.

## Layout

`src/sections/*` are the page sections in `App.tsx` order. `src/components/ui/*` are the four
primitives (Button, Chip, Badge, Icon). `src/lib/calendar.ts` builds Google/Outlook links and
RFC 5545 `.ics` files with floating Europe/Budapest times.
