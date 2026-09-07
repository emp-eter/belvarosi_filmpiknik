/* Abszolút public/ útvonal a build base-éhez igazítva (GitHub Pages alútvonal,
   cPanel gyökér). A CSS url()-eket a Vite maga írja át; ez a JSON-ból jövő
   útvonalakhoz kell (pl. partnerlogók). */
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return base + (path.startsWith("/") ? path : `/${path}`);
}
