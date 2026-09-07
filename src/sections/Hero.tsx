import { Button } from "../components/ui/Button";
import { days, festival, filmCount, venues } from "../data/programme";
import { reveal } from "../lib/reveal";
import { Countdown } from "./Countdown";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section id="top" className={styles.hero}>
      <div className={styles.night} aria-hidden="true" />
      <div className={styles.townscape} aria-hidden="true" />
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.veil} aria-hidden="true" />

      <div className={styles.content}>
        <p className={`reveal ${styles.eyebrow}`} style={reveal(0)}>
          Eger történelmi belvárosa · {days.length} este · {venues.length} helyszín · {filmCount} film
        </p>
        <h1 className={`reveal ${styles.headline}`} style={reveal(110)}>
          Belvárosi
          <br />
          Filmpiknik
        </h1>
        <div className={`reveal ${styles.dateRow}`} style={reveal(220)}>
          <span className={styles.date}>{festival.dateRange}</span>
          <span className={styles.divider} aria-hidden="true" />
          <span className={styles.after}>Naplemente után</span>
        </div>

        <div className="reveal" style={{ ...reveal(330), marginTop: "clamp(24px, 4vw, 40px)" }}>
          <Countdown target={festival.opening} />
        </div>

        <div className={`reveal ${styles.actions}`} style={reveal(440)}>
          <Button href="#filmek" size="xl">
            Filmek
          </Button>
        </div>
      </div>
    </section>
  );
}
