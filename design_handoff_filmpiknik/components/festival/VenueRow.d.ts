import * as React from "react";

/**
 * A numbered venue entry. The number matches the gold pin on the map, so the
 * list and the map are read as one object.
 *
 * @startingPoint section="Festival" subtitle="Numbered venue entry keyed to the map pins" viewport="700x160"
 */
export interface VenueRowProps extends React.HTMLAttributes<HTMLElement> {
  /** Must match the map pin number. */
  number: number | string;
  name: React.ReactNode;
  /** Times or role, e.g. "19.00 térzene · 20.00 film". */
  when?: React.ReactNode;
  description?: React.ReactNode;
  /** Renders an <a>, typically a maps link. */
  href?: string;
}

export declare function VenueRow(props: VenueRowProps): JSX.Element;
