import * as React from "react";

/**
 * The container every block on the site sits in. Five surfaces cover the whole
 * design; the perforated gold filmstrip edge is the brand's signature.
 *
 * @startingPoint section="Core" subtitle="Glass, cream, dashed, prize and plain surfaces" viewport="700x280"
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  surface?: "glass" | "light" | "dashed" | "prize" | "plain";
  /** Perforated gold strip along the top edge — the film-reel motif. */
  filmstrip?: boolean;
  /** Lift and brighten the border on hover; only for cards that are links. */
  hoverLift?: boolean;
  /** Override the default `--card-pad`. */
  padding?: string;
  children?: React.ReactNode;
}

export declare function Card(props: CardProps): JSX.Element;
