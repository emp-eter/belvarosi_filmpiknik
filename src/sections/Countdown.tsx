import { useNow } from "../hooks/useNow";
import styles from "./Countdown.module.css";

interface CountdownProps {
  /** ISO időpont explicit időzónával. */
  target: string;
  caption?: string;
}

const pad = (n: number) => String(n).padStart(2, "0");

/* Négy cella (nap / óra / perc / mp), másodpercenként tikkel a nyitóestig.
   Nullán megáll, sosem mutat negatívat. */
export function Countdown({ target, caption = "a nyitóestig" }: CountdownProps) {
  const now = useNow(1000);
  const left = Math.max(0, new Date(target).getTime() - now);
  const cells = [
    { v: String(Math.floor(left / 86_400_000)), l: "nap" },
    { v: pad(Math.floor(left / 3_600_000) % 24), l: "óra" },
    { v: pad(Math.floor(left / 60_000) % 60), l: "perc" },
    { v: pad(Math.floor(left / 1000) % 60), l: "mp" },
  ];
  return (
    <div className={styles.row} role="timer" aria-live="off">
      {cells.map((c) => (
        <div key={c.l} className={styles.cell}>
          <div className={styles.value}>{c.v}</div>
          <div className={styles.label}>{c.l}</div>
        </div>
      ))}
      <span className={styles.caption}>{caption}</span>
    </div>
  );
}
