Filters the programme by day. Pass it as `actions` on a `SectionHeading` so it aligns with the heading baseline.

```jsx
<DayTabs days={["Szerda", "Csütörtök", "Péntek"]} value={day} onChange={setDay} />
```

Labels are the weekday alone — the date lives in the hero, not repeated per tab.
