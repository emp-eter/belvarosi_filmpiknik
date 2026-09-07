import * as React from "react";

/**
 * Live days/hours/minutes/seconds to the opening night, in four glass cells
 * with tabular gold numerals.
 *
 * @startingPoint section="Festival" subtitle="Four glass cells counting to opening night" viewport="700x150"
 */
export interface CountdownProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Target moment; a Date or anything `new Date()` parses. */
  target: Date | string | number;
  /** Trailing caption; pass null to hide. */
  caption?: React.ReactNode;
  /** Unit labels, in day/hour/minute/second order. */
  labels?: [string, string, string, string];
}

export declare function Countdown(props: CountdownProps): JSX.Element;
