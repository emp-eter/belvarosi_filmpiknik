import * as React from "react";

/** Gold uppercase kicker that sits above a heading or opens a card. */
export interface EyebrowProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /** `onLight` swaps to the darker gold that reads on cream surfaces. */
  tone?: "gold" | "onLight";
  children?: React.ReactNode;
}

export declare function Eyebrow(props: EyebrowProps): JSX.Element;
