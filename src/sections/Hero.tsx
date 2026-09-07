import { Button } from "../components/ui/Button";
import { days, festival, filmCount, venues } from "../data/programme";
import { asset } from "../lib/asset";
import { reveal } from "../lib/reveal";
import { Countdown } from "./Countdown";
import styles from "./Hero.module.css";

/* Rétegek: éjszakai gradiens (tartalék) → fesztiválfotó (karmazsin duotón) → fátyol a
   borszínű alapba → vendégportré eredeti színekben, a fátyol fölött, szűrő nélkül → tartalom. */
export function Hero() {
  return (
    <section id="top" className={styles.hero}>
      <div className={styles.night} aria-hidden="true" />
      <div className={styles.photo} aria-hidden="true" />
      <div className={styles.veil} aria-hidden="true" />
      <img
        className={styles.portrait}
        src={asset("/assets/portraits/torocsik-color.webp")}
        alt="Törőcsik Franciska, a péntek esti közönségtalálkozó vendége"
        width={820}
        height={1200}
        fetchPriority="high"
      />

      <div className={styles.content}>
        <p className={`reveal ${styles.eyebrow}`} style={reveal(0)}>
          Eger történelmi belvárosa · {days.length} nap · {venues.length} helyszín · {filmCount} film
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
        <p className={`reveal ${styles.lead}`} style={reveal(280)}>
          Közönségtalálkozók, magyar és nemzetközi filmek, premierek, jubileumi vetítések, élőzene, táncbemutató és
          egy ingyenes filmes LEGO-kiállítás. Minden film, program és közönségtalálkozó ingyenes.
        </p>

        <div className="reveal" style={{ ...reveal(330), marginTop: "clamp(24px, 4vw, 40px)" }}>
          <Countdown target={festival.opening} />
        </div>

        <div className={`reveal ${styles.actions}`} style={reveal(440)}>
          <Button href="#filmek" size="xl">
            Filmek
          </Button>
          <Button href={festival.facebookEvent} variant="outline" size="xl" target="_blank" rel="noopener">
            Facebook-esemény
          </Button>
        </div>
      </div>
    </section>
  );
}
