import React from "react";

function useTick() {
  const [now, setNow] = React.useState(() => Date.now());
  React.useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

export function Countdown({ target, caption = "a nyitóestig", labels = ["nap", "óra", "perc", "mp"], style, ...rest }) {
  const now = useTick();
  const end = target instanceof Date ? target.getTime() : new Date(target).getTime();
  const left = Math.max(0, end - now);
  const pad = (n) => String(n).padStart(2, "0");
  const cells = [
    { v: Math.floor(left / 86400000), l: labels[0] },
    { v: pad(Math.floor(left / 3600000) % 24), l: labels[1] },
    { v: pad(Math.floor(left / 60000) % 60), l: labels[2] },
    { v: pad(Math.floor(left / 1000) % 60), l: labels[3] }
  ];
  return (
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "clamp(10px, 2vw, 18px)", ...style }} {...rest}>
      {cells.map((c) => (
        <div
          key={c.l}
          style={{
            minWidth: "clamp(74px, 11vw, 108px)",
            padding: "clamp(12px, 1.8vw, 18px) clamp(10px, 1.6vw, 16px)",
            borderRadius: "var(--radius-md)",
            background: "var(--surface-glass)",
            border: "var(--border-gold)",
            textAlign: "center"
          }}
        >
          <div style={{ fontSize: "clamp(24px, 4vw, 40px)", fontWeight: "var(--weight-bold)", letterSpacing: "-1px", lineHeight: 1, color: "var(--text-accent)", fontVariantNumeric: "tabular-nums" }}>{c.v}</div>
          <div style={{ marginTop: "6px", fontSize: "10.5px", fontWeight: "var(--weight-bold)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--text-muted)" }}>{c.l}</div>
        </div>
      ))}
      {caption ? <span style={{ fontSize: "12px", fontWeight: "var(--weight-bold)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--text-subtle)" }}>{caption}</span> : null}
    </div>
  );
}
