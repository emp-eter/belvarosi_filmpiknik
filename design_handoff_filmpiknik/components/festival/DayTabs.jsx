import React from "react";

export function DayTabs({ days = [], value = 0, onChange, style, ...rest }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)", ...style }} {...rest}>
      {days.map((d, i) => {
        const on = i === value;
        return (
          <button
            key={d}
            type="button"
            onClick={() => onChange && onChange(i)}
            style={{
              padding: "11px 18px",
              borderRadius: "var(--radius-pill)",
              cursor: "pointer",
              fontFamily: "var(--font-ui)",
              fontSize: "var(--size-eyebrow)",
              fontWeight: "var(--weight-bold)",
              letterSpacing: "1.6px",
              textTransform: "uppercase",
              transition: "all var(--dur-fast) var(--ease-out-soft)",
              background: on ? "var(--accent)" : "transparent",
              color: on ? "var(--accent-ink)" : "var(--text-muted)",
              border: on ? "1px solid var(--accent)" : "var(--border-gold)"
            }}
          >
            {d}
          </button>
        );
      })}
    </div>
  );
}
