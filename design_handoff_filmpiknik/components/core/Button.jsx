import React from "react";

const base = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "var(--space-2)",
  border: "0",
  cursor: "pointer",
  textDecoration: "none",
  fontFamily: "var(--font-ui)",
  fontWeight: "var(--weight-bold)",
  letterSpacing: "var(--tracking-label)",
  textTransform: "uppercase",
  transition: "background var(--dur-fast) var(--ease-out-soft), color var(--dur-fast) var(--ease-out-soft), border-color var(--dur-fast) var(--ease-out-soft)"
};

const sizes = {
  sm: { padding: "9px 16px", fontSize: "var(--size-eyebrow)", borderRadius: "var(--radius-pill)" },
  md: { padding: "14px 24px", fontSize: "12px", borderRadius: "var(--radius-sm)" },
  lg: { padding: "16px 28px", fontSize: "12.5px", borderRadius: "var(--radius-sm)" }
};

const variants = {
  primary: { background: "var(--accent)", color: "var(--accent-ink)" },
  outline: { background: "transparent", color: "var(--text-body)", border: "1px solid rgba(255,243,224,0.45)" },
  ghostGold: { background: "var(--surface-accent-soft)", color: "var(--text-accent)", border: "var(--border-gold-strong)" },
  onLight: { background: "var(--wine-300)", color: "var(--cream-100)" }
};

const hovers = {
  primary: { background: "var(--accent-hover)" },
  outline: { background: "rgba(255,243,224,0.1)" },
  ghostGold: { background: "rgba(240,212,138,0.22)" },
  onLight: { background: "var(--wine-600)" }
};

export function Button({ variant = "primary", size = "lg", href, pill = false, disabled = false, children, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const Tag = href ? "a" : "button";
  const css = {
    ...base,
    ...sizes[size],
    ...variants[variant],
    ...(hover && !disabled ? hovers[variant] : null),
    ...(pill ? { borderRadius: "var(--radius-pill)" } : null),
    ...(disabled ? { opacity: 0.45, cursor: "not-allowed" } : null),
    ...style
  };
  return (
    <Tag
      href={href}
      disabled={!href && disabled ? true : undefined}
      style={css}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...rest}
    >
      {children}
    </Tag>
  );
}
