import React from "react";
import { Card } from "../core/Card.jsx";
import { Eyebrow } from "../core/Eyebrow.jsx";

export function PriceCard({ surface = "light", eyebrow, headline, note, action, style, ...rest }) {
  const onLight = surface === "light";
  const big = typeof headline === "string" && headline.length <= 6;
  return (
    <Card surface={surface} style={style} {...rest}>
      {eyebrow ? <Eyebrow tone={onLight ? "onLight" : "gold"}>{eyebrow}</Eyebrow> : null}
      <div
        style={{
          margin: "6px 0 2px",
          fontSize: big ? "var(--size-stat)" : "clamp(24px, 3.4vw, 34px)",
          fontWeight: "var(--weight-bold)",
          letterSpacing: big ? "-2px" : "-1px",
          lineHeight: big ? 1 : 1.1,
          color: onLight ? "var(--text-on-light)" : "var(--text-primary)"
        }}
      >
        {headline}
      </div>
      <p style={{ margin: 0, fontSize: "var(--size-body)", lineHeight: "var(--leading-body)", color: onLight ? "var(--text-on-light-muted)" : "var(--text-muted)" }}>{note}</p>
      {action ? <div style={{ marginTop: "var(--space-3)" }}>{action}</div> : null}
    </Card>
  );
}
