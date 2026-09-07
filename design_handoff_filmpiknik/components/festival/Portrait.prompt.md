Guest portraits are **silhouettes** — one flat wine shape on the festival's paper, no eyes, no
features. The name and role underneath do the identifying, which is why `name` is effectively
required.

```jsx
<Portrait src="assets/portraits/herendi.png" name="Herendi Gábor" role="Rendező" />
```

`shape="arch"` is the default and the brand-correct one — the rounded top echoes a cinema screen.
Lay several out in a `flex` row with `gap: var(--stack-gap)`; three or four across is the intended
density. Never pass a raw photograph as `src`: an untreated colour headshot breaks the palette, and
a half-rendered face is worse than no face.

**The photograph has to be cuttable.** The cut is automatic, so the subject must separate from the
background by colour or by tone across the *whole* outline — a studio shot on a plain backdrop is
ideal. A location photo where the face happens to match the wall behind it cannot be cut, and no
amount of tuning fixes it; ask for a different photo instead of shipping a broken shape.

**The recipe** (full version in `readme.md`): classify background by whichever channel actually
separates it, keep the single connected blob containing the head, close thin gaps (glasses, catch
lights) with a blur-threshold-blur pass, fill enclosed holes, then scale the blob so it fills about
86% of the sheet's height and let it bleed off the bottom edge. Fill `#521E30` at 94% over the
gold-to-rose paper, with light grain.
