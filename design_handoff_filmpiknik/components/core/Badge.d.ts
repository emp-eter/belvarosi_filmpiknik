import * as React from "react";

/**
 * A small uppercase pill for facts that are not actions: dates, prices, status.
 *
 * @startingPoint section="Core" subtitle="Gold, solid and quiet pills" viewport="700x120"
 */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: "gold" | "solid" | "quiet";
  children?: React.ReactNode;
}

export declare function Badge(props: BadgeProps): JSX.Element;
