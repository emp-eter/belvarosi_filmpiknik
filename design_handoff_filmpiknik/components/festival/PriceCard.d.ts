import * as React from "react";

/**
 * The "what does it cost / what is it" panel: eyebrow, one large statement,
 * a short note, and an optional action.
 *
 * @startingPoint section="Festival" subtitle="Free / opening night / giveaway panels" viewport="700x300"
 */
export interface PriceCardProps extends React.HTMLAttributes<HTMLDivElement> {
  surface?: "light" | "dashed" | "prize" | "glass";
  eyebrow?: React.ReactNode;
  /** Short strings ("0 Ft") render at display size; longer ones step down. */
  headline: React.ReactNode;
  note?: React.ReactNode;
  action?: React.ReactNode;
}

export declare function PriceCard(props: PriceCardProps): JSX.Element;
