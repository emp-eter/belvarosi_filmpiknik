import { allEntries, days, festival, venues } from "../data/programme";
import { eventFor } from "../lib/calendar";

/* Festival + ScreeningEvent gráf ugyanabból a műsoradatból, amit az oldal mutat. */
function buildGraph() {
  const place = (name: string) => {
    const v = venues.find((x) => x.name === name);
    return {
      "@type": "Place",
      name,
      address: { "@type": "PostalAddress", streetAddress: v?.address ?? name, addressLocality: festival.city, addressCountry: "HU" },
      ...(v ? { geo: { "@type": "GeoCoordinates", latitude: v.coords[0], longitude: v.coords[1] } } : {}),
    };
  };

  const offer = {
    "@type": "Offer",
    price: "0",
    priceCurrency: "HUF",
    availability: "https://schema.org/InStock",
    url: festival.siteUrl,
  };

  const subEvents = allEntries.map((entry) => {
    const ev = eventFor(entry);
    const isFilm = !entry.film.tags.includes("Élő");
    return {
      "@type": isFilm ? "ScreeningEvent" : "Event",
      name: entry.film.title,
      description: entry.film.sub,
      startDate: ev.startIso,
      endDate: ev.endIso,
      location: place(entry.film.venue),
      isAccessibleForFree: true,
      offers: offer,
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      inLanguage: "hu",
    };
  });

  return {
    "@context": "https://schema.org",
    "@type": "Festival",
    name: `${festival.name} ${festival.year}`,
    url: festival.siteUrl,
    startDate: days[0].date,
    endDate: days[days.length - 1].date,
    location: place("Dobó tér"),
    organizer: { "@type": "Organization", name: festival.organiser, url: festival.url },
    isAccessibleForFree: true,
    offers: offer,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    inLanguage: "hu",
    subEvent: subEvents,
  };
}

export function JsonLd() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildGraph()) }} />;
}
