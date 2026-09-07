import React from "react";

/* Borders are written as longhands, never as the `border` shorthand: a shorthand
   holding a var() loses its colour when a conditional longhand (the hover state
   below) is cleared alongside it. */
const surfaces = {
  glass: { background: "var(--grad-card)", borderWidth: "1px", borderStyle: "solid", borderColor: "var(--border-accent)", color: "var(--text-body)" },
  light: { background: "var(--surface-light)", borderWidth: 0, borderStyle: "none", borderColor: "transparent", color: "var(--text-on-light)" },
  dashed: { background: "var(--surface-accent-soft)", borderWidth: "1px", borderStyle: "dashed", borderColor: "var(--border-accent-strong)", color: "var(--text-body)" },
  prize: { background: "var(--grad-prize)", borderWidth: 0, borderStyle: "none", borderColor: "transparent", color: "var(--text-primary)" },
  plain: { background: "var(--surface-raised)", borderWidth: "1px", borderStyle: "solid", borderColor: "var(--border-accent)", color: "var(--text-body)" }
};
const hoverable = { glass: true, dashed: true, plain: true };

export function Card({ surface = "glass", filmstrip = false, hoverLift = false, padding, children, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        borderRadius: "var(--radius-xl)",
        overflow: "hidden",
        transition: "transform var(--dur-base) var(--ease-out-soft), border-color var(--dur-base) var(--ease-out-soft)",
        ...surfaces[surface],
        ...(hoverLift && hover
          ? { transform: "var(--lift-hover)", ...(hoverable[surface] ? { borderColor: "var(--border-accent-strong)" } : null) }
          : null),
        ...style
      }}
      {...rest}
    >
      {filmstrip ? <div style={{ height: "8px", flex: "0 0 auto", background: "var(--grad-filmstrip)" }} /> : null}
      <div style={{ padding: padding || "var(--card-pad)", display: "flex", flexDirection: "column", gap: "var(--space-3)", flex: 1 }}>
        {children}
      </div>
    </div>
  );
}
