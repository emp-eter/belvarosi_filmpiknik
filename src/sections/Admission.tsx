import { Button } from "../components/ui/Button";
import { festival } from "../data/programme";
import { reveal } from "../lib/reveal";
import styles from "./Admission.module.css";

export function Admission() {
  return (
    <section id="belepo" className={styles.section}>
      <div className={`container ${styles.grid}`}>
        <div className={`reveal ${styles.card} ${styles.cream}`} style={reveal(0)}>
          <div className={`${styles.eyebrow} ${styles.eyebrowOnLight}`}>Minden vetítés és program</div>
          <div className={styles.price}>0 Ft</div>
          <p className={`${styles.text} ${styles.textOnLight}`}>
            A belépés mindhárom estén, minden helyszínen ingyenes. A helyfoglalás érkezési sorrendben történik, hozz
            plédet vagy összecsukható széket.
          </p>
        </div>

        <div className={`reveal ${styles.card} ${styles.dashed}`} style={reveal(110)}>
          <div className={styles.eyebrow}>Közönségtalálkozók · Dobó tér</div>
          <div className={`${styles.headline} ${styles.headlineMeet}`}>Herendi Gábor és Törőcsik Franciska</div>
          <p className={`${styles.text} ${styles.textSpaced}`}>
            Csütörtökön Herendi Gábor a Kincsem előtt, pénteken Törőcsik Franciska a Hogyan tudnék élni nélküled előtt.
            A terem véges: érdemes időben jönni.
          </p>
          <Button href={festival.url} size="lg">
            Részletek
          </Button>
        </div>

        <div className={`reveal ${styles.card} ${styles.plum}`} style={reveal(220)}>
          <div className={styles.eyebrow}>Nyereményjáték</div>
          <div className={`${styles.headline} ${styles.headlinePrize}`}>3 páros belépő az Agria Moziba</div>
          <p className={`${styles.text} ${styles.textOnPlum}`}>
            Kommenteld be, melyik filmet nézed meg a piknik alatt, és három nyertest hirdetünk a fesztivál után.
          </p>
          <Button href={festival.facebook} variant="outline" size="lg" className={styles.plumButton}>
            Játszom
          </Button>
        </div>
      </div>

      <p className={`container ${styles.note}`}>
        Büfé széles kínálattal minden helyszínen. Rossz idő esetén az {festival.rainVenue} az esőhelyszín. A
        műsorváltoztatás jogát fenntartjuk.
      </p>
    </section>
  );
}
