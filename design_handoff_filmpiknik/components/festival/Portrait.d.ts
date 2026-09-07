import * as React from "react";

/**
 * A guest portrait as a silhouette: one wine shape cut from the photograph and
 * set on the same gold-to-rose paper as the hero townscape. No facial detail —
 * the name underneath identifies the person.
 *
 * @startingPoint section="Festival" subtitle="Cut-out guest silhouettes, arch and card shapes" viewport="700x420"
 */
export interface PortraitProps extends React.HTMLAttributes<HTMLElement> {
  /** Path to a cut silhouette in `assets/portraits/`. Never a raw photograph. */
  src: string;
  alt?: string;
  /** Shown under the shape; without it the silhouette identifies nobody. */
  name?: React.ReactNode;
  /** Small gold uppercase line under the name, e.g. "Rendező". */
  role?: React.ReactNode;
  /** Arched top like a cinema screen, a plain rounded card, or a circle. */
  shape?: "arch" | "card" | "circle";
  width?: number | string;
  /** Gold hairline around the shape. */
  frame?: boolean;
}

export declare function Portrait(props: PortraitProps): JSX.Element;
