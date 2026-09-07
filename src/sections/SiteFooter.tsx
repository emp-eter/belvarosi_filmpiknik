import { useState } from "react";
import { festival } from "../data/programme";
import type { Partner } from "../data/types";
import { asset } from "../lib/asset";
import styles from "./SiteFooter.module.css";

/* Partnerlogó: krémre színezett PNG (scripts/tint-logo.py). Amíg a fájl hiányzik,
   a név jelenik meg betűvel, hogy ne törött kép legyen a láblécben. */
function PartnerLogo({ partner }: { partner: Partner }) {
  const [missing, setMissing] = useState(false);
  const Tag = partner.url ? "a" : "span";
  const linkProps = partner.url ? { href: partner.url, target: "_blank", rel: "noopener" } : {};
  return (
    <div className={styles.partner}>
      <span className={styles.partnerRole}>{partner.role}</span>
      <Tag className={`${styles.partnerLink} ${partner.size === "lg" ? styles.partnerLg : ""}`} {...linkProps} aria-label={partner.name}>
        {missing ? (
          <span className={styles.partnerName}>{partner.name}</span>
        ) : (
          <img src={asset(partner.logo)} alt={partner.name} className={styles.partnerLogo} loading="lazy" onError={() => setMissing(true)} />
        )}
      </Tag>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.wordmark}>{festival.name}</div>
        <div className={styles.tagline}>Eger · A te történeted</div>
      </div>

      <div className={`container ${styles.partners}`}>
        {festival.partners.map((p) => (
          <PartnerLogo key={p.name} partner={p} />
        ))}
      </div>

      <p className={`container ${styles.support}`}>{festival.supportLine}</p>
      <p className={`container ${styles.legal}`}>
        © {festival.year} {festival.copyright}
      </p>
    </footer>
  );
}
