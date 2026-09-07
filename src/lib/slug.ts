/** Ékezetmentes, kötőjeles slug fájlnevekhez és azonosítókhoz. */
export function slug(s: string): string {
  return s
    .toLowerCase()
    .replace(/[áä]/g, "a")
    .replace(/[éë]/g, "e")
    .replace(/[íï]/g, "i")
    .replace(/[óöő]/g, "o")
    .replace(/[úüű]/g, "u")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
