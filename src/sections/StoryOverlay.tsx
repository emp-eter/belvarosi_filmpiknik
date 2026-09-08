import { useEffect, useRef, useState } from "react";
import { Button } from "../components/ui/Button";
import { days, festival, filmCount, timeText, venues } from "../data/programme";
import type { Entry } from "../data/types";
import { useEscape } from "../hooks/useEscape";
import styles from "./StoryOverlay.module.css";

/** Amit a story-kártya mutat: egy film, vagy az egész fesztivál. */
export interface Story {
  title: string;
  when: string;
  venue: string;
  /** A megosztott szöveg első sora; alapból a cím. */
  shareTitle?: string;
}

export function storyForEntry({ day, film }: Entry): Story {
  return { title: film.title, when: `${day.label} · ${timeText(film)}`, venue: `${film.venue} · ingyenes` };
}

export function festivalStory(): Story {
  return {
    title: festival.name,
    when: `${days.length} nap · ${venues.length} helyszín · ${filmCount} film`,
    venue: `Eger történelmi belvárosa · minden program ingyenes`,
    shareTitle: `${festival.name} ${festival.year}`,
  };
}

interface StoryOverlayProps {
  story: Story | null;
  onClose: () => void;
}

/* Teljes képernyős overlay egy 9:16-os, magasságvezérelt story-kártyával.
   A kártya container-query egység (cqh), így a kártyával skálázik, nem a
   viewporttal. Bezár: Escape, háttérre kattintás, Bezár gomb. */
export function StoryOverlay({ story, onClose }: StoryOverlayProps) {
  const [copied, setCopied] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const restoreFocus = useRef<HTMLElement | null>(null);

  useEscape(story !== null, onClose);

  /* Fókusz be az overlaybe nyitáskor, vissza a megnyitó gombra záráskor. */
  useEffect(() => {
    if (!story) return;
    restoreFocus.current = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
      restoreFocus.current?.focus?.();
    };
  }, [story]);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 2500);
    return () => clearTimeout(id);
  }, [copied]);

  if (!story) return null;

  const share = () => {
    const head = story.shareTitle ?? `${story.title} — ${festival.name}`;
    const text = `${head}, ${story.when}, ${story.venue}`;
    const url = typeof location !== "undefined" ? location.href.split("#")[0] : festival.siteUrl;
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
        aria-label={`Megosztás: ${story.title}`}
        tabIndex={-1}
        className={styles.dialog}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.card}>
          <div className={styles.photo} aria-hidden="true" />
          <div className={styles.veil} aria-hidden="true" />
          <div className={styles.cardInner}>
            <div>
              <div className={styles.wordmark}>{festival.shortName}</div>
              <div className={styles.dates}>
                {festival.city} · {festival.year}. szept. 17–19.
              </div>
            </div>
            <div>
              <div className={styles.when}>{story.when}</div>
              <div className={styles.title}>{story.title}</div>
              <div className={styles.venue}>{story.venue}</div>
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
