import * as React from "react";

/**
 * One screening in the programme rail: gold filmstrip edge, day and time,
 * title, one line of context, venue.
 *
 * @startingPoint section="Festival" subtitle="Screening card with filmstrip edge" viewport="700x300"
 */
export interface FilmCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Weekday label; omit inside a single-day list. */
  day?: string;
  /** Start time in Hungarian dot notation, e.g. "20.00". */
  time: string;
  title: React.ReactNode;
  /** One sentence. Genre, guests, or why it is worth the walk. */
  description?: React.ReactNode;
  /** Venue line, optionally with a price note: "Uránia Mozi · ingyenes". */
  venue?: React.ReactNode;
  /** Fixed rail width; set "100%" to use it inside a grid instead. */
  width?: string;
}

export declare function FilmCard(props: FilmCardProps): JSX.Element;
