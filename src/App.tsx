import { useState } from "react";
import { Admission } from "./sections/Admission";
import { Hero } from "./sections/Hero";
import { JsonLd } from "./sections/JsonLd";
import { Programme } from "./sections/Programme";
import { RainBanner } from "./sections/RainBanner";
import { SiteFooter } from "./sections/SiteFooter";
import { SiteHeader } from "./sections/SiteHeader";
import { StoryOverlay, type Story } from "./sections/StoryOverlay";
import { Venues } from "./sections/Venues";

/* Sorrend fentről lefelé: esősáv (feltételes) → fejléc → hero → műsor →
   helyszínek + térkép → belépő → lábléc → story overlay (feltételes). */
export default function App() {
  const [story, setStory] = useState<Story | null>(null);

  return (
    <div style={{ maxWidth: "100%", overflowX: "hidden" }}>
      <RainBanner />
      <SiteHeader />
      <main>
        <Hero />
        <Programme onShare={setStory} />
        <Venues />
        <Admission />
      </main>
      <SiteFooter />
      <StoryOverlay story={story} onClose={() => setStory(null)} />
      <JsonLd />
    </div>
  );
}
