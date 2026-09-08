import type { Entry } from "../data/types";
import { festival } from "../data/programme";
import { slug } from "./slug";

/* Minden időpont helyi (Europe/Budapest) idő. Szeptember közepén Magyarország
   CEST-en van, ezért az explicit eltolás +02:00. A számoláshoz UTC-t használunk
   tárolóként, hogy a látogató böngészőjének időzónája ne szóljon bele. */
const TZ = "Europe/Budapest";
const OFFSET = "+02:00";
const DEFAULT_MINUTES = 90;

export interface CalendarEvent {
  /** "YYYYMMDDTHHMMSS" — lebegő helyi idő */
  start: string;
  end: string;
  /** ISO helyi idő explicit eltolással: "2026-09-17T19:45:00+02:00" */
  startIso: string;
  endIso: string;
  title: string;
  location: string;
  description: string;
  uid: string;
}

function parseTime(time: string): [number, number] {
  const [h, m] = time.split(".").map(Number);
  return [h, m ?? 0];
}

/** Lebegő helyi idő ms-ban, UTC mezőkbe pakolva. */
function floatingMs(date: string, time: string, addMinutes = 0): number {
  const [y, mo, d] = date.split("-").map(Number);
  const [h, mi] = parseTime(time);
  return Date.UTC(y, mo - 1, d, h, mi, 0) + addMinutes * 60_000;
}

const p2 = (n: number) => String(n).padStart(2, "0");

function stamp(ms: number): string {
  const d = new Date(ms);
  return `${d.getUTCFullYear()}${p2(d.getUTCMonth() + 1)}${p2(d.getUTCDate())}T${p2(d.getUTCHours())}${p2(d.getUTCMinutes())}00`;
}

function iso(ms: number): string {
  const d = new Date(ms);
  return `${d.getUTCFullYear()}-${p2(d.getUTCMonth() + 1)}-${p2(d.getUTCDate())}T${p2(d.getUTCHours())}:${p2(d.getUTCMinutes())}:00${OFFSET}`;
}

export function eventFor({ day, film }: Entry): CalendarEvent {
  const startMs = floatingMs(day.date, film.time);
  const endMs = floatingMs(day.date, film.time, film.min || DEFAULT_MINUTES);
  return {
    start: stamp(startMs),
    end: stamp(endMs),
    startIso: iso(startMs),
    endIso: iso(endMs),
    title: `${film.title} · ${festival.name}`,
    location: `${film.venue}, ${festival.city}`,
    description: `${film.sub}\n\nIngyenes program. ${festival.facebookEvent}`,
    uid: `filmpiknik-${festival.year}-${slug(film.title)}-${stamp(startMs)}@belvarosifilmpiknik.eger`,
  };
}

const q = encodeURIComponent;

export function googleUrl(ev: CalendarEvent): string {
  return (
    "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    `&text=${q(ev.title)}` +
    `&dates=${ev.start}/${ev.end}` +
    `&ctz=${q(TZ)}` +
    `&location=${q(ev.location)}` +
    `&details=${q(ev.description)}`
  );
}

export function outlookUrl(ev: CalendarEvent): string {
  return (
    "https://outlook.live.com/calendar/0/action/compose?rru=addevent" +
    `&subject=${q(ev.title)}` +
    `&startdt=${q(ev.startIso)}&enddt=${q(ev.endIso)}` +
    `&location=${q(ev.location)}` +
    `&body=${q(ev.description.replace(/\n+/g, " "))}`
  );
}

/** RFC 5545: `\`, `;`, `,` és sortörés escape-elve. */
function escapeIcs(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");
}

/** RFC 5545 3.1: sorok legfeljebb 75 oktett, folytatás szóközzel. */
function foldLine(line: string): string {
  const bytes = new TextEncoder().encode(line);
  if (bytes.length <= 75) return line;
  const out: string[] = [];
  let cur = "";
  let curBytes = 0;
  for (const ch of line) {
    const b = new TextEncoder().encode(ch).length;
    const limit = out.length === 0 ? 75 : 74;
    if (curBytes + b > limit) {
      out.push(cur);
      cur = "";
      curBytes = 0;
    }
    cur += ch;
    curBytes += b;
  }
  if (cur) out.push(cur);
  return out.join("\r\n ");
}

export function buildIcs(events: CalendarEvent[]): string {
  const now = new Date();
  const dtstamp = `${now.getUTCFullYear()}${p2(now.getUTCMonth() + 1)}${p2(now.getUTCDate())}T${p2(now.getUTCHours())}${p2(now.getUTCMinutes())}${p2(now.getUTCSeconds())}Z`;
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Belvarosi Filmpiknik//Eger//HU",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
  ];
  for (const ev of events) {
    lines.push(
      "BEGIN:VEVENT",
      `UID:${ev.uid}`,
      `DTSTAMP:${dtstamp}`,
      `DTSTART;TZID=${TZ}:${ev.start}`,
      `DTEND;TZID=${TZ}:${ev.end}`,
      `SUMMARY:${escapeIcs(ev.title)}`,
      `LOCATION:${escapeIcs(ev.location)}`,
      `DESCRIPTION:${escapeIcs(ev.description)}`,
      "END:VEVENT",
    );
  }
  lines.push("END:VCALENDAR");
  return lines.map(foldLine).join("\r\n") + "\r\n";
}

export function downloadIcs(filename: string, text: string): void {
  const blob = new Blob([text], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

export function icsFilename(entry: Entry): string {
  return `filmpiknik-${slug(entry.film.title)}.ics`;
}

export const FESTIVAL_ICS_FILENAME = `belvarosi-filmpiknik-${festival.year}.ics`;
