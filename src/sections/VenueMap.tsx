import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";
import { entriesAt, timeText, venues } from "../data/programme";
import "./VenueMap.css";

/* Leaflet + OpenStreetMap raszter csempék, a --map-tile-filter szűrővel a
   borpalettába húzva. Három kézzel elhelyezett arany pin, fesztivál-stílusú
   popupok ugyanabból az adatból, mint a helyszínkártyák. Az OSM attribúció
   licencfeltétel: maradjon. */

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export function VenueMap() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const map = L.map(el, { scrollWheelZoom: false, zoomControl: true, attributionControl: true });
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> közreműködői',
      maxZoom: 19,
    }).addTo(map);

    const markers = venues.map((v, i) => {
      const no = i + 1;
      const marker = L.marker(v.coords, {
        icon: L.divIcon({ className: "", html: `<div class="fp-pin">${no}</div>`, iconSize: [34, 34], iconAnchor: [17, 17] }),
        title: v.name,
        alt: v.name,
      }).addTo(map);

      const rows = entriesAt(v.name)
        .map(
          ({ day, film }) =>
            `<div class="fp-row"><span class="fp-time">${esc(day.abbr)} · ${esc(timeText(film))}</span><span class="fp-title">${esc(film.title)}</span></div>`,
        )
        .join("");

      marker.bindPopup(
        `<span class="fp-name">${no}. ${esc(v.name)}</span>` +
          `<span class="fp-when">${esc(v.when)}</span>` +
          `<span class="fp-addr">${esc(v.address)}</span>` +
          `<a class="fp-link" href="${esc(v.mapsLink)}" target="_blank" rel="noopener">Útvonal →</a>` +
          `<div class="fp-prog">${rows}</div>`,
        { maxWidth: 300, autoPanPadding: [16, 16] },
      );
      marker.on("mouseover", () => marker.openPopup());
      return marker;
    });

    const bounds = L.featureGroup(markers).getBounds();
    const fit = () => map.fitBounds(bounds, { padding: [56, 56] });
    fit();

    /* A doboz mérete a viewporttal változik (egy- vagy kétoszlopos rács);
       Leafletnek szólni kell, különben a pinek a régi méretre maradnak. */
    let ro: ResizeObserver | undefined;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => {
        map.invalidateSize();
        fit();
      });
      ro.observe(el);
    }

    /* Görgetés csak kattintás után zoomol, hogy az oldal görgetését ne fogja meg. */
    map.on("click", () => map.scrollWheelZoom.enable());
    map.on("mouseout", () => map.scrollWheelZoom.disable());

    return () => {
      ro?.disconnect();
      map.remove();
    };
  }, []);

  return <div ref={ref} className="fp-map" role="region" aria-label="Helyszínek térképe" />;
}
