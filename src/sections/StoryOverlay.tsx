import { useEffect, useRef, useState } from "react";
import { Button } from "../components/ui/Button";
import { festival, timeText } from "../data/programme";
import type { Entry } from "../data/types";
import { useEscape } from "../hooks/useEscape";
import styles from "./StoryOverlay.module.css";

interface StoryOverlayProps {
  entry: Entry | null;
  onClose: () => void;
}

/* Teljes képernyős overlay egy 9:16-os, magasságvezérelt story-kártyával.
   A kártya container-query egység (cqh), így a kártyával skálázik, nem a
   viewporttal. Bezár: Escape, háttérre kattintás, Bezár gomb. */
export function StoryOverlay({ entry, onClose }: StoryOverlayProps) {
  const [copied, setCopied] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const restoreFocus = useRef<HTMLElement | null>(null);

  useEscape(entry !== null, onClose);

  /* Fókusz be az overlaybe nyitáskor, vissza a megnyitó gombra záráskor. */
  useEffect(() => {
    if (!entry) return;
    restoreFocus.current = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
      restoreFocus.current?.focus?.();
    };
  }, [entry]);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 2500);
    return () => clearTimeout(id);
  }, [copied]);

  if (!entry) return null;
  const { day, film } = entry;
  const when = `${day.label} · ${timeText(film)}`;
  const venueLine = `${film.venue} · ingyenes`;

  const share = () => {
    const text = `${film.title} — ${festival.name}, ${when}, ${venueLine}`;
    const url = typeof location !== "undefined" ? location.href : festival.siteUrl;
    if (navigator.share) {
      navigator.share({ title: festival.name, text, url }).catch(() => {});
    } else if (navigator.clipboard) {
      navigator.clipboard
        .writeText(`${text} ${url}`)
        .then(() => setCopied(true))
        .catch(() => {});
    }
  };

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Megosztás: ${film.title}`}
        tabIndex={-1}
        className={styles.dialog}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.card}>
          <div className={styles.townscape} aria-hidden="true" />
          <div className={styles.cardInner}>
            <div>
              <div className={styles.wordmark}>{festival.shortName}</div>
              <div className={styles.dates}>
                {festival.city} · {festival.year}. szept. 17–19.
              </div>
            </div>
            <div>
              <div className={styles.when}>{when}</div>
              <div className={styles.title}>{film.title}</div>
              <div className={styles.venue}>{venueLine}</div>
            </div>
            <div className={styles.foot}>
              <span className={styles.free}>Ingyenes</span>
              <span className={styles.site}>uraniaeger.hu</span>
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <Button size="md" pill onClick={share}>
            {copied ? "Link kimásolva" : "Megosztás"}
          </Button>
          <Button variant="outline" size="md" pill className={styles.close} onClick={onClose}>
            Bezár
          </Button>
        </div>
        <p className={styles.note}>Story-méretű kártya: mentsd képernyőfotóval, vagy oszd meg a linket.</p>
      </div>
    </div>
  );
}
