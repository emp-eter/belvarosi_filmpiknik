import * as React from "react";

/**
 * Email capture band: one field, one gold button, one confirmation line that
 * reserves its own height so the layout never jumps.
 *
 * @startingPoint section="Forms" subtitle="Email field + gold submit + inline confirmation" viewport="700x180"
 */
export interface NewsletterFormProps extends React.HTMLAttributes<HTMLDivElement> {
  placeholder?: string;
  submitLabel?: string;
  successMessage?: string;
  onSubmit?: (email: string) => void;
}

export declare function NewsletterForm(props: NewsletterFormProps): JSX.Element;
