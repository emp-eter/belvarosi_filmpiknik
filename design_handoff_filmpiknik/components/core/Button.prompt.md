One button family for the whole festival site; use `primary` for the single most important action in a section and `outline` for the one next to it.

```jsx
<Button href="#filmek">Filmek</Button>
<Button variant="outline" href="#hirlevel">Szólj, ha kezdődik</Button>
<Button variant="onLight" size="md">Részletek</Button>
```

Never place two `primary` buttons side by side. `size="sm"` + `pill` is the header CTA. On cream surfaces (`--surface-light`) use `variant="onLight"`; gold on cream fails contrast.
