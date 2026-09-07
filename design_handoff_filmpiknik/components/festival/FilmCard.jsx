import React from "react";
import { Card } from "../core/Card.jsx";

export function FilmCard({ day, time, title, description, venue, width = "clamp(230px, 62vw, 290px)", style, ...rest }) {
  return (
    <Card
      surface="glass"
      filmstrip
      hoverLift
      padding="var(--card-pad-sm)"
      style={{ scrollSnapAlign: "start", flex: `0 0 ${width}`, borderRadius: "var(--radius-lg)", ...style }}
      {...rest}
    >
      <span style={{ fontSize: "var(--size-meta)", fontWeight: "var(--weight-bold)", letterSpacing: "2.2px", textTransform: "uppercase", color: "var(--text-accent)" }}>
        {day ? `${day} · ` : ""}{time}
      </span>
      <h3 style={{ margin: 0, fontSize: "var(--size-h3)", fontWeight: "var(--weight-bold)", lineHeight: "var(--leading-snug)", color: "var(--text-primary)" }}>{title}</h3>
      <p style={{ margin: 0, fontSize: "var(--size-small)", lineHeight: 1.55, color: "var(--text-muted)", flex: 1 }}>{description}</p>
      <span style={{ fontSize: "var(--size-eyebrow)", fontWeight: "var(--weight-bold)", letterSpacing: "1.8px", textTransform: "uppercase", color: "var(--rose-300)" }}>{venue}</span>
    </Card>
  );
}
