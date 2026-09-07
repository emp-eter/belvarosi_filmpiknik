import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Chip.module.css";

interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** `tab`: napfül (nagyobb). `chip`: szűrő (kisebb). */
  kind?: "tab" | "chip";
  active: boolean;
  children: ReactNode;
}

/* Egyválasztós kapcsolópirula: napfülek és szűrők. */
export function Chip({ kind = "chip", active, className, children, ...rest }: ChipProps) {
  const cls = [styles.base, styles[kind], active ? styles.active : "", className ?? ""].filter(Boolean).join(" ");
  return (
    <button type="button" className={cls} aria-pressed={active} {...rest}>
      {children}
    </button>
  );
}
