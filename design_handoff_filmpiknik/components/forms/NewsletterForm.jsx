import React from "react";
import { Input } from "./Input.jsx";
import { Button } from "../core/Button.jsx";

export function NewsletterForm({
  placeholder = "te@email.hu",
  submitLabel = "Feliratkozom",
  successMessage = "Köszönjük! Szólunk, amint megvan a teljes műsor.",
  onSubmit,
  style,
  ...rest
}) {
  const [email, setEmail] = React.useState("");
  const [msg, setMsg] = React.useState("");

  function handle(e) {
    e.preventDefault();
    if (onSubmit) onSubmit(email);
    setMsg(successMessage);
    setEmail("");
  }

  return (
    <div style={{ width: "100%", ...style }} {...rest}>
      <form onSubmit={handle} style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-3)", justifyContent: "center" }}>
        <div style={{ flex: "1 1 260px", maxWidth: "380px" }}>
          <Input type="email" required placeholder={placeholder} value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <Button type="submit">{submitLabel}</Button>
      </form>
      <p style={{ margin: "var(--space-4) 0 0", minHeight: "20px", textAlign: "center", fontSize: "var(--size-small)", color: "var(--text-accent)" }}>{msg}</p>
    </div>
  );
}
