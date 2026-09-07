import { Icon } from "../components/ui/Icon";
import { entriesAt, timeText } from "../data/programme";
import type { Venue } from "../data/types";
import { reveal } from "../lib/reveal";
import styles from "./VenueCard.module.css";

interface VenueCardProps {
  index: number;
  venue: Venue;
  open: boolean;
  onEnter: () => void;
  onLeave: () => void;
  onToggle: () => void;
}

/* Saját kártya, nem közös konténer sora: a popupnak ki kell tudnia lógni belőle.
   A kártya valódi <button>; a popup a testvére, mert linket tartalmaz. */
export function VenueCard({ index, venue, open, onEnter, onLeave, onToggle }: VenueCardProps) {
  const events = entriesAt(venue.name);
  const popupId = `venue-popup-${index}`;

  return (
    <div
      className={`reveal ${styles.card} ${open ? styles.open : ""}`}
      style={reveal(330)}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <button
        type="button"
        className={styles.trigger}
        aria-expanded={open}
        aria-controls={popupId}
        onFocus={onEnter}
        onBlur={onLeave}
        onClick={onToggle}
      >
        <span className={styles.numeral} aria-hidden="true">
          {index + 1}
        </span>
        <span className={styles.content}>
          <span className={styles.nameRow}>
            <Icon path={venue.icon} size={21} strokeWidth={1.5} stroke="#F0D48A" className={styles.icon} />
            <span className={styles.name}>{venue.name}</span>
          </span>
          <span className={styles.when}>{venue.when}</span>
          <span className={styles.address}>{venue.address}</span>
          <span className={styles.desc}>{venue.desc}</span>
          <span className={styles.hint}>{open ? "Kattints a bezáráshoz" : "Mutasd a műsort"}</span>
        </span>
      </button>

      {open ? (
        <div id={popupId} className={styles.popup}>
          <div className={styles.arrow} aria-hidden="true" />
          <div className={styles.popupHead}>
            <span className={styles.popupTitle}>A teljes műsor itt</span>
            <a className={styles.route} href={venue.mapsLink} target="_blank" rel="noopener">
              Útvonal →
            </a>
          </div>
          <div className={styles.list}>
            {events.map(({ day, film }) => (
              <div key={`${day.date}-${film.time}-${film.title}`} className={styles.row}>
                <span className={styles.rowWhen}>
                  {day.short} · {timeText(film)}
                </span>
                <span className={styles.rowTitle}>{film.title}</span>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
