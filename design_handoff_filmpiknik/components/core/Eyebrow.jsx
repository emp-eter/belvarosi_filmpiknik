import React from "react";

export function Eyebrow({ tone = "gold", children, style, ...rest }) {
  return (
    <p
      style={{
        margin: 0,
        fontFamily: "var(--font-ui)",
        fontSize: "var(--size-eyebrow)",
        fontWeight: "var(--weight-bold)",
        letterSpacing: "var(--tracking-eyebrow)",
        textTransform: "uppercase",
        color: tone === "onLight" ? "var(--gold-600)" : "var(--text-accent)",
        ...style
      }}
      {...rest}
    >
      {children}
    </p>
  );
}
