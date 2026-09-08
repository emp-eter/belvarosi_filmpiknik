export type VenueName = "Dobó tér" | "Régi Kertmozi" | "Agria Park udvar" | "Uránia Mozi";
export type Tag = "Élő" | "Családi" | "Késő esti" | "Kiállítás";
export type Lang = "Magyar film" | "Magyar szinkron";
export type Rating = 6 | 12 | 16;

export interface Film {
  /** "19.45" — magyar írásmód, ponttal. Rendezéshez és naptárhoz. */
  time: string;
  /** Ha a kezdés az előző programtól függ ("a vetítés után"): ez jelenik meg az idő
      helyett, és a program kimarad a naptárexportból, mert a `time` csak becslés. */
  timeLabel?: string;
  title: string;
  venue: VenueName;
  /** Játékidő percben; a naptárbejegyzés hossza is. Ha hiányzik, 90 perc. */
  min?: number;
  rating?: Rating;
  lang?: Lang;
  tags: Tag[];
  /** Egy-két mondatos leírás. */
  sub: string;
}

export interface Day {
  /** "Szept. 17. csütörtök" */
  label: string;
  /** "Csütörtök" — a napfülön */
  short: string;
  /** "Csüt" — a térkép popupjában */
  abbr: string;
  /** ISO dátum: "2026-09-17" */
  date: string;
  films: Film[];
}

export interface Festival {
  name: string;
  shortName: string;
  year: number;
  city: string;
  dateRange: string;
  /** A nyitóest kezdete, ISO, explicit időzónával. */
  opening: string;
  url: string;
  siteUrl: string;
  organiser: string;
  facebook: string;
  /** A fesztivál hivatalos Facebook-eseménye. */
  facebookEvent: string;
  rainVenue: string;
  /** A lábléc © sorának tulajdonosa. */
  copyright: string;
  /** A támogatói mondat a láblécben. */
  supportLine: string;
  partners: Partner[];
}

/** Lábléc-partner: főszervező, támogató. A logó krémre színezett PNG (scripts/tint-logo.py). */
export interface Partner {
  role: string;
  name: string;
  logo: string;
  url?: string;
  /** `lg`: nagyobb logódoboz (pl. a főtámogató). Alapból `md`. */
  size?: "md" | "lg";
}

export interface ProgrammeData {
  festival: Festival;
  days: Day[];
}

export interface Venue {
  name: VenueName;
  when: string;
  address: string;
  desc: string;
  /** 24×24 SVG path, stroke-only ikon. */
  icon: string;
  mapsLink: string;
  /** [lat, lon] — kézzel elhelyezve, végleges. */
  coords: [number, number];
  note?: string;
}

/** Egy programpont a napjával együtt: a naptár, a popupok és a story ezt kapja. */
export interface Entry {
  day: Day;
  film: Film;
}
