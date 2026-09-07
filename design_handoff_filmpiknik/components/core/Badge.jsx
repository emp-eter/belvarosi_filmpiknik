import React from "react";

const tones = {
  gold: { background: "var(--surface-accent-soft)", color: "var(--text-accent)", border: "var(--border-gold-strong)" },
  solid: { background: "var(--accent)", color: "var(--accent-ink)", border: "1px solid var(--accent)" },
  quiet: { background: "transparent", color: "var(--text-muted)", border: "var(--border-gold)" }
};

export function Badge({ tone = "gold", children, style, ...rest }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "9px 16px",
        borderRadius: "var(--radius-pill)",
        fontFamily: "var(--font-ui)",
        fontSize: "var(--size-eyebrow)",
        fontWeight: "var(--weight-bold)",
        letterSpacing: "var(--tracking-label)",
        textTransform: "uppercase",
        ...tones[tone],
        ...style
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
