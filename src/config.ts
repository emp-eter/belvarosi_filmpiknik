/* A kapcsoló, amit a szervezők állítanak, kódmódosítás nélkül.
   Forrásuk a .env (lásd .env.example); később CMS-re cserélhető. */

function env(name: string): string {
  const v = (import.meta.env as Record<string, string | undefined>)[name];
  return typeof v === "string" ? v.trim() : "";
}

export const config = {
  /** Esős napon egy mondat: megjelenik az arany "Esőhelyszín" sáv a fejléc fölött. */
  rainAlert: env("VITE_RAIN_ALERT") || null,
};
