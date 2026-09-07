import React from "react";

export function VenueRow({ number, name, when, description, href, style, ...rest }) {
  const Tag = href ? "a" : "div";
  return (
    <Tag
      href={href}
      style={{
        display: "flex",
        gap: "var(--space-4)",
        alignItems: "flex-start",
        padding: "var(--card-pad-sm)",
        background: "var(--surface-base)",
        textDecoration: "none",
        ...style
      }}
      {...rest}
    >
      <span
        style={{
          flex: "0 0 auto",
          width: "34px",
          height: "34px",
          borderRadius: "50%",
          background: "var(--accent)",
          color: "var(--accent-ink)",
          fontSize: "14px",
          fontWeight: "var(--weight-bold)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {number}
      </span>
      <div style={{ flex: 1 }}>
        <h3 style={{ margin: "0 0 4px", fontSize: "clamp(17px, 2.2vw, 21px)", fontWeight: "var(--weight-bold)", color: "var(--text-primary)" }}>{name}</h3>
        <div style={{ fontSize: "var(--size-eyebrow)", fontWeight: "var(--weight-bold)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--text-accent)" }}>{when}</div>
        {description ? <p style={{ margin: "var(--space-3) 0 0", fontSize: "14px", lineHeight: "var(--leading-body)", color: "var(--text-muted)" }}>{description}</p> : null}
      </div>
    </Tag>
  );
}
