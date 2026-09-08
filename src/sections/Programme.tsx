import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "../components/ui/Button";
import { Chip } from "../components/ui/Chip";
import { Icon, ICONS } from "../components/ui/Icon";
import { days, entryKey, scheduledEntries, TAG_LABELS, TAGS, VENUE_NAMES } from "../data/programme";
import type { Tag, VenueName } from "../data/types";
import { useEscape } from "../hooks/useEscape";
import { useOverflowX } from "../hooks/useOverflowX";
import { buildIcs, downloadIcs, eventFor, FESTIVAL_ICS_FILENAME } from "../lib/calendar";
import { reveal } from "../lib/reveal";
import { FilmCard } from "./FilmCard";
import { festivalStory, storyForEntry, type Story } from "./StoryOverlay";
import styles from "./Programme.module.css";

type VenueFilter = VenueName | "Mind";
type TagFilter = Tag | "Mind";

interface ProgrammeProps {
  onShare: (story: Story) => void;
}

export function Programme({ onShare }: ProgrammeProps) {
  const [dayIndex, setDayIndex] = useState(0);
  const [venueFilter, setVenueFilter] = useState<VenueFilter>("Mind");
  const [tagFilter, setTagFilter] = useState<TagFilter>("Mind");
  const [calMenu, setCalMenu] = useState<string | null>(null);

  const stripRef = useRef<HTMLDivElement>(null);
  const stripScrollable = useOverflowX(stripRef);

  const day = days[dayIndex];
  const shown = day.films.filter(
    (f) => (venueFilter === "Mind" || f.venue === venueFilter) && (tagFilter === "Mind" || f.tags.includes(tagFilter)),
  );

  const closeCal = useCallback(() => setCalMenu(null), []);
  useEscape(calMenu !== null, closeCal);

  /* Egyszerre egy naptármenü; kattintás bárhova a kártyákon kívül bezárja. */
  useEffect(() => {
    if (calMenu === null) return;
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target?.closest("[data-film-card]")) setCalMenu(null);
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [calMenu]);

  const addWholeFestival = () => {
    downloadIcs(FESTIVAL_ICS_FILENAME, buildIcs(scheduledEntries.map(eventFor)));
  };

  const clearFilters = () => {
    setVenueFilter("Mind");
    setTagFilter("Mind");
  };

  return (
    <section id="filmek" className={styles.section}>
      <div className={`container ${styles.head}`}>
        <h2 className={`reveal ${styles.title}`} style={reveal(0)}>
          A műsor
        </h2>
        <div className={`reveal ${styles.headActions}`} style={reveal(60)}>
          <Button variant="outlineGold" size="md" pill onClick={addWholeFestival}>
            <Icon path={ICONS.calendar} size={16} strokeWidth={1.7} />
            Teljes fesztivál a naptáramba
          </Button>
          <Button variant="outline" size="md" pill onClick={() => onShare(festivalStory())}>
            <Icon path={ICONS.share} size={16} strokeWidth={1.7} />
            Fesztivál megosztása
          </Button>
        </div>
      </div>

      <div className={`container ${styles.controls}`}>
        <div className={`reveal ${styles.tabs}`} style={reveal(110)} role="group" aria-label="Nap">
          {days.map((d, i) => (
            <Chip key={d.date} kind="tab" active={i === dayIndex} onClick={() => setDayIndex(i)}>
              {d.short}
            </Chip>
          ))}
        </div>

        <div className={`reveal ${styles.filters}`} style={reveal(160)}>
          <div className={styles.filterGroup} role="group" aria-label="Helyszín">
            <span className={styles.filterLabel}>Helyszín</span>
            <div className={styles.chips}>
              {(["Mind", ...VENUE_NAMES] as VenueFilter[]).map((name) => (
                <Chip key={name} active={venueFilter === name} onClick={() => setVenueFilter(name)}>
                  {name}
                </Chip>
              ))}
            </div>
          </div>
          <div className={styles.filterGroup} role="group" aria-label="Jelleg">
            <span className={styles.filterLabel}>Jelleg</span>
            <div className={styles.chips}>
              {(["Mind", ...TAGS] as TagFilter[]).map((tag) => (
                <Chip key={tag} active={tagFilter === tag} onClick={() => setTagFilter(tag)}>
                  {tag === "Mind" ? "Mind" : TAG_LABELS[tag]}
                </Chip>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div ref={stripRef} className={styles.strip}>
        {shown.map((film) => {
          const key = entryKey(day, film);
          return (
            <FilmCard
              key={key}
              entry={{ day, film }}
              calOpen={calMenu === key}
              onToggleCal={() => setCalMenu((cur) => (cur === key ? null : key))}
              onCloseCal={closeCal}
              onShare={() => onShare(storyForEntry({ day, film }))}
            />
          );
        })}
      </div>

      {shown.length === 0 ? (
        <div className={`container ${styles.empty}`}>
          <p className={styles.emptyText}>Ezen a napon nincs a szűrésnek megfelelő program.</p>
          <Button size="md" pill onClick={clearFilters}>
            Szűrők törlése
          </Button>
        </div>
      ) : null}

      {stripScrollable ? <p className={`container ${styles.hint}`}>Húzd oldalra a kártyákat →</p> : null}
    </section>
  );
}
