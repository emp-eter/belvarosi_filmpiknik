import { useCallback, useEffect, useState, type RefObject } from "react";

/* Igaz, ha az elem vízszintesen ténylegesen görgethető. Mérve, sosem feltételezve:
   mountkor, átméretezéskor (ResizeObserver + resize) és minden renderelés után,
   mert a tartalom (pl. a szűrt kártyák) is változtatja a scrollWidth-et. */
export function useOverflowX(ref: RefObject<HTMLElement | null>): boolean {
  const [scrollable, setScrollable] = useState(false);

  const measure = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const next = el.scrollWidth - el.clientWidth > 4;
    setScrollable((prev) => (prev === next ? prev : next));
  }, [ref]);

  useEffect(() => {
    measure();
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let ro: ResizeObserver | undefined;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(measure);
      ro.observe(el);
    }
    window.addEventListener("resize", measure);
    return () => {
      ro?.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [ref, measure]);

  return scrollable;
}
