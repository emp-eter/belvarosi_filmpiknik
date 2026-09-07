import * as React from "react";

/**
 * The festival's only button. Gold-filled for the one action that matters on a
 * screen, outline for everything beside it.
 *
 * @startingPoint section="Core" subtitle="Gold primary, outline secondary, gold-tinted ghost" viewport="700x150"
 */
export interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
  /** Gold fill, cream outline, gold-tinted ghost, or wine fill for cream surfaces. */
  variant?: "primary" | "outline" | "ghostGold" | "onLight";
  /** lg is the page default; sm is the pill used in the sticky header. */
  size?: "sm" | "md" | "lg";
  /** Renders an <a> instead of a <button>. */
  href?: string;
  /** Force fully rounded corners regardless of size. */
  pill?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
}

export declare function Button(props: ButtonProps): JSX.Element;
