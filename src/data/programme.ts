import programmeJson from "./programme.json";
import venuesJson from "./venues.json";
import type { Day, Entry, Film, ProgrammeData, Tag, Venue, VenueName } from "./types";

const data = programmeJson as ProgrammeData;

export const festival = data.festival;
export const days: Day[] = data.days;
export const venues: Venue[] = venuesJson as Venue[];

export const VENUE_NAMES: VenueName[] = ["Dobó tér", "Régi Kertmozi", "Agria Park udvar", "Uránia Mozi"];
export const TAGS: Tag[] = ["Családi", "Késő esti", "Élő", "Kiállítás"];

/** A "Jelleg" szűrő feliratai; az érték mögötti kulcs a tag maga. */
export const TAG_LABELS: Record<Tag, string> = {
  "Családi": "Családi",
  "Késő esti": "Késő esti",
  "Élő": "Élő program",
  "Kiállítás": "Kiállítás",
};

/** Minden programpont, napok szerint sorban. */
export const allEntries: Entry[] = days.flatMap((day) => day.films.map((film) => ({ day, film })));

/** Egy helyszín teljes műsora mindhárom estéről. */
export function entriesAt(venue: VenueName): Entry[] {
  return allEntries.filter((e) => e.film.venue === venue);
}

/** Stabil kulcs egy programponthoz (naptármenü, React key). */
export function entryKey(day: Day, film: Film): string {
  return `${day.date}-${film.time}-${film.title}`;
}

/** Megjelenített időpont: a becsült idő helyett a címke, ha van. */
export function timeText(film: Film): string {
  return film.timeLabel ?? film.time;
}

/** Naptárba menthető programok: csak a rögzített kezdésűek. */
export const scheduledEntries: Entry[] = allEntries.filter((e) => !e.film.timeLabel);

export const programmeCount = allEntries.length;

/** Filmek száma: minden, ami nem élő program és nem kiállítás. */
export const filmCount = allEntries.filter((e) => !e.film.tags.includes("Élő") && !e.film.tags.includes("Kiállítás")).length;
