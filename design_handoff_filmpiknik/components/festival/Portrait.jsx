import React from "react";

const shapes = {
  arch: "999px 999px 18px 18px / 340px 340px 18px 18px",
  card: "var(--radius-xl)",
  circle: "50%"
};

/* Guest portraits are silhouettes: a single wine shape cut from the photograph
   and set on the same gold-to-rose paper as the hero townscape. No facial
   detail, ever — the name underneath does the identifying. Cut files live in
   assets/portraits/; see readme.md for the recipe and the photo requirement. */
export function Portrait({
  src,
  alt = "",
  name,
  role,
  shape = "arch",
  width = 260,
  frame = true,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return (
    <figure
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ margin: 0, width, display: "flex", flexDirection: "column", gap: "var(--space-3)", ...style }}
      {...rest}
    >
      <div
        style={{
          position: "relative",
          aspectRatio: shape === "circle" ? "1 / 1" : "4 / 5",
          borderRadius: shapes[shape],
          overflow: "hidden",
          background: "var(--wine-900)",
          borderWidth: frame ? "1px" : 0,
          borderStyle: frame ? "solid" : "none",
          borderColor: frame ? (hover ? "var(--border-accent-strong)" : "var(--border-accent)") : "transparent",
          transition: "border-color var(--dur-base) var(--ease-out-soft)"
        }}
      >
        <img
          src={src}
          alt={alt || name || ""}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block"
          }}
        />
      </div>
      {name ? (
        <figcaption>
          <div style={{ fontSize: "clamp(16px, 2vw, 19px)", fontWeight: "var(--weight-bold)", color: "var(--text-primary)", lineHeight: 1.2 }}>{name}</div>
          {role ? (
            <div style={{ marginTop: "4px", fontSize: "var(--size-meta)", fontWeight: "var(--weight-bold)", letterSpacing: "2.2px", textTransform: "uppercase", color: "var(--text-accent)" }}>{role}</div>
          ) : null}
        </figcaption>
      ) : null}
    </figure>
  );
}
