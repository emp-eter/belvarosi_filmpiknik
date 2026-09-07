import React from "react";
import { Eyebrow } from "./Eyebrow.jsx";

export function SectionHeading({ eyebrow, title, lead, align = "start", tone = "dark", actions, style, ...rest }) {
  const onLight = tone === "light";
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "var(--space-4)",
        alignItems: "flex-end",
        justifyContent: actions ? "space-between" : "flex-start",
        textAlign: align === "center" ? "center" : "left",
        ...style
      }}
      {...rest}
    >
      <div style={{ maxWidth: "620px", margin: align === "center" ? "0 auto" : undefined }}>
        {eyebrow ? <Eyebrow tone={onLight ? "onLight" : "gold"} style={{ marginBottom: "var(--space-2)" }}>{eyebrow}</Eyebrow> : null}
        <h2
          style={{
            margin: 0,
            fontFamily: "var(--font-ui)",
            fontSize: "var(--size-h2)",
            fontWeight: "var(--weight-bold)",
            letterSpacing: "var(--tracking-heading)",
            lineHeight: 1.06,
            color: onLight ? "var(--text-on-light)" : "var(--text-primary)",
            textWrap: "pretty"
          }}
        >
          {title}
        </h2>
        {lead ? (
          <p style={{ margin: "var(--space-3) 0 0", fontSize: "var(--size-lead)", lineHeight: "var(--leading-body)", color: onLight ? "var(--text-on-light-muted)" : "var(--text-muted)", textWrap: "pretty" }}>
            {lead}
          </p>
        ) : null}
      </div>
      {actions ? <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)" }}>{actions}</div> : null}
    </div>
  );
}
