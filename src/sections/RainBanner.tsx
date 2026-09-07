import { config } from "../config";
import styles from "./RainBanner.module.css";

/* Feltételes: csak akkor jelenik meg, ha a szervezők beállítottak egy mondatot. */
export function RainBanner() {
  if (!config.rainAlert) return null;
  return (
    <div role="status" className={styles.banner}>
      <span className={styles.label}>Esőhelyszín</span>
      <span className={styles.text}>{config.rainAlert}</span>
    </div>
  );
}
