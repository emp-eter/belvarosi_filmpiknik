/* A brand ikonmentes; ez a három vonalas jel van csak. A helyszínikonok
   path-ját az adat hozza (venues.json). Mind dekoratív, aria-hidden. */
export const ICONS = {
  calendar: "M4 6h16v15H4zM4 10h16M9 3v4M15 3v4",
  share: "M12 15V4M8 8l4-4 4 4M5 14v5h14v-5",
} as const;

interface IconProps {
  path: string;
  size?: number;
  strokeWidth?: number;
  /** Alapból currentColor. */
  stroke?: string;
  className?: string;
}

export function Icon({ path, size = 16, strokeWidth = 1.7, stroke = "currentColor", className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d={path} />
    </svg>
  );
}
