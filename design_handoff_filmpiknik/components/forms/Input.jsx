import React from "react";

export function Input({ type = "text", invalid = false, style, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  return (
    <input
      type={type}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      style={{
        width: "100%",
        padding: "16px 18px",
        borderRadius: "var(--radius-sm)",
        border: invalid ? "1px solid var(--plum-500)" : focus ? "1px solid var(--accent)" : "var(--border-gold-strong)",
        background: "var(--surface-glass)",
        color: "var(--text-primary)",
        fontFamily: "var(--font-ui)",
        fontSize: "15px",
        outline: "none",
        transition: "border-color var(--dur-fast) var(--ease-out-soft)",
        ...style
      }}
      {...rest}
    />
  );
}
