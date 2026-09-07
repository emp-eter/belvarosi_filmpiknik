import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/* BASE_PATH: az útvonal, ahol az oldal él. GitHub Pages projektoldalon
   "/belvarosi_filmpiknik/" (a workflow adja át), cPanelen a gyökér: "/". */
export default defineConfig({
  base: process.env.BASE_PATH || "/",
  plugins: [react()],
});
