import type { ReactNode } from "react";
import styles from "./Badge.module.css";

/* Kis arany címke a filmkártyán: korhatár, nyelv, játékidő. */
export function Badge({ children }: { children: ReactNode }) {
  return <span className={styles.badge}>{children}</span>;
}
