import * as React from "react";

/**
 * The standard section opener: gold eyebrow, tight heading, optional lead, and
 * an optional control cluster pushed to the right edge.
 *
 * @startingPoint section="Core" subtitle="Eyebrow + heading + lead, with optional actions" viewport="700x220"
 */
export interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "start" | "center";
  /** `light` for cream sections. */
  tone?: "dark" | "light";
  /** Tabs, buttons or links aligned to the heading baseline. */
  actions?: React.ReactNode;
}

export declare function SectionHeading(props: SectionHeadingProps): JSX.Element;
