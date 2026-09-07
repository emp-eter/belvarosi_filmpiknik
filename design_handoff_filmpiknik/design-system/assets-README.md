# Assets

| File | What it is | Notes |
| --- | --- | --- |
| `poster.jpg` | The 2026 festival poster supplied by the user | Contains its own typography — do not use as a background behind new type; show it framed, as an image |
| `cover.jpg` | Cover artwork with the Eger townscape | Also contains typography |
| `townscape.png` | Type-free townscape band cropped out of `cover.jpg` | **This is the one to use as a background**: 40% opacity, `mix-blend-mode: screen` over the wine gradient |
| `nyeremeny.jpg` | Giveaway announcement graphic | Framed image only |

`portraits/` holds guest silhouettes already cut onto the festival's paper (see the Portraits
section of `readme.md` for the recipe and for which photographs can be cut). Source photographs stay
in `uploads/` and are never shipped.

**No logo asset exists.** The brand mark is the festival name set in Kaushan Script
(`--font-display`). Do not draw or reconstruct a logotype.

Fonts are loaded from Google Fonts (see `tokens/fonts.css`); no font binaries are stored here.
