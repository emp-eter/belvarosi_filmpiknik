import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Icon, ICONS } from "../components/ui/Icon";
import type { Entry } from "../data/types";
import { buildIcs, downloadIcs, eventFor, googleUrl, icsFilename, outlookUrl } from "../lib/calendar";
import styles from "./FilmCard.module.css";

interface FilmCardProps {
  entry: Entry;
  calOpen: boolean;
  onToggleCal: () => void;
  onCloseCal: () => void;
  onShare: () => void;
}

export function FilmCard({ entry, calOpen, onToggleCal, onCloseCal, onShare }: FilmCardProps) {
  const { day, film } = entry;

  /* A címkék az adatból származnak, nem szerkesztettek: ami hiányzik, az kimarad. */
  const badges = [
    film.rating ? `${film.rating} éves kortól` : null,
    film.lang ?? null,
    film.min ? `${film.min} perc` : null,
  ].filter((b): b is string => b !== null);

  const ev = eventFor(entry);

  const downloadOne = () => {
    downloadIcs(icsFilename(entry), buildIcs([ev]));
    onCloseCal();
  };

  return (
    <article className={styles.card} data-film-card>
      <div className={styles.filmstrip} aria-hidden="true" />
      <div className={styles.body}>
        <span className={styles.when}>
          {day.short} · {film.time}
        </span>
        <h3 className={styles.title}>{film.title}</h3>
        {badges.length > 0 ? (
          <div className={styles.badges}>
            {badges.map((b) => (
              <Badge key={b}>{b}</Badge>
            ))}
          </div>
        ) : null}
        <p className={styles.sub}>{film.sub}</p>
        <span className={styles.venue}>{film.venue}</span>

        <div className={styles.actions}>
          <Button variant="ghostGold" size="sm" pill aria-expanded={calOpen} aria-haspopup="menu" title="Naptárba mentés" onClick={onToggleCal}>
            <Icon path={ICONS.calendar} size={14} strokeWidth={1.8} />
            Naptárba
          </Button>

          {calOpen ? (
            <div className={styles.menu} role="menu" aria-label="Naptárba mentés">
              <a className={styles.menuRow} role="menuitem" href={googleUrl(ev)} target="_blank" rel="noopener" onClick={onCloseCal}>
                Google Naptár
              </a>
              <a className={styles.menuRow} role="menuitem" href={outlookUrl(ev)} target="_blank" rel="noopener" onClick={onCloseCal}>
                Outlook
              </a>
              <button type="button" className={styles.menuRow} role="menuitem" onClick={downloadOne}>
                Apple Naptár / .ics fájl
              </button>
            </div>
          ) : null}

          <Button variant="outline" size="sm" pill title="Megosztás" onClick={onShare}>
            <Icon path={ICONS.share} size={14} strokeWidth={1.8} />
            Megosztás
          </Button>
        </div>
      </div>
    </article>
  );
}
