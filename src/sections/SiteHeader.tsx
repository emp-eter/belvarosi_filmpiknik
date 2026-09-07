import { festival } from "../data/programme";
import styles from "./SiteHeader.module.css";

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a href="#top" className={styles.wordmark}>
          {festival.shortName}
        </a>
        <nav className={styles.nav} aria-label="Fő navigáció">
          <a href="#filmek" className={styles.link}>
            Filmek
          </a>
          <a href="#terkep" className={styles.link}>
            Térkép
          </a>
          <a href="#belepo" className={styles.link}>
            Belépő
          </a>
        </nav>
      </div>
    </header>
  );
}
