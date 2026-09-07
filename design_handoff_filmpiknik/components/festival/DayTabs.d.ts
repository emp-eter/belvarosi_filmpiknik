import * as React from "react";

/** Pill switcher for the festival days; the active pill is solid gold. */
export interface DayTabsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Short day labels, e.g. ["Szerda", "Csütörtök", "Péntek"]. */
  days: string[];
  /** Index of the active day. */
  value?: number;
  onChange?: (index: number) => void;
}

export declare function DayTabs(props: DayTabsProps): JSX.Element;
