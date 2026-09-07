import * as React from "react";

/** Single-line field on wine surfaces: translucent fill, gold hairline, gold focus ring. */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export declare function Input(props: InputProps): JSX.Element;
