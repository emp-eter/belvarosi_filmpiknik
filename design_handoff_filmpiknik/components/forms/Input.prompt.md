The only text field in the system. It expects a wine background; on cream, swap the fill to `#fff` and the border to `--border-on-light`.

```jsx
<Input type="email" placeholder="te@email.hu" value={email} onChange={e => setEmail(e.target.value)} />
```

No floating labels, no helper text below by default — the surrounding copy does that work.
