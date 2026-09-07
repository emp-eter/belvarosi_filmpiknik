import { useState } from "react";
import { venues } from "../data/programme";
import { reveal } from "../lib/reveal";
import { VenueCard } from "./VenueCard";
import { VenueMap } from "./VenueMap";
import styles from "./Venues.module.css";

export function Venues() {
  const [hoverVenue, setHoverVenue] = useState<number | null>(null);
  const [pinVenue, setPinVenue] = useState<number | null>(null);
  /* A rögzített (kattintott) popup elsőbbséget élvez a hoverrel szemben. */
  const openVenue = pinVenue !== null ? pinVenue : hoverVenue;

  return (
    <section id="terkep" className={styles.section}>
      <div className="container">
        <h2 className={`reveal ${styles.title}`} style={reveal(0)}>
          Három helyszín, három hangulat
        </h2>
        <p className={`reveal ${styles.lead}`} style={reveal(110)}>
          A Dobó tér a fesztivál szíve, a Kertmozi és az Agria Park udvara innen 10–15 perc séta. Vidd az ujjad a
          helyszínekre a teljes műsorért.
        </p>

        <div className={styles.grid}>
          <div className={`reveal ${styles.mapFrame}`} style={reveal(220)}>
            <VenueMap />
          </div>

          <div className={styles.cards}>
            {venues.map((venue, i) => (
              <VenueCard
                key={venue.name}
                index={i}
                venue={venue}
                open={openVenue === i}
                onEnter={() => setHoverVenue(i)}
                onLeave={() => setHoverVenue((cur) => (cur === i ? null : cur))}
                onToggle={() => setPinVenue((cur) => (cur === i ? null : i))}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
