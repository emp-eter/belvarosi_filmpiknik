import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

export type ButtonVariant = "primary" | "outline" | "outlineGold" | "ghostGold";
export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

type Common = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  pill?: boolean;
  className?: string;
  children?: ReactNode;
};

type AsButton = Common & { href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>;
type AsLink = Common & { href: string } & AnchorHTMLAttributes<HTMLAnchorElement>;

export type ButtonProps = AsButton | AsLink;

function cls(variant: ButtonVariant, size: ButtonSize, pill: boolean, extra?: string): string {
  return [styles.button, styles[variant], styles[size], pill ? styles.pill : "", extra ?? ""].filter(Boolean).join(" ");
}

/* A fesztivál egyetlen gombja. Arany kitöltés az egy fontos műveletre,
   körvonalas minden mellette lévőre. href-fel <a>-t renderel. */
export function Button(props: ButtonProps) {
  const { variant = "primary", size = "lg", pill = false, className, children } = props;
  if (props.href !== undefined) {
    const { variant: _v, size: _s, pill: _p, className: _c, children: _ch, ...rest } = props;
    return (
      <a className={cls(variant, size, pill, className)} {...rest}>
        {children}
      </a>
    );
  }
  const { variant: _v, size: _s, pill: _p, className: _c, children: _ch, type = "button", ...rest } = props;
  return (
    <button type={type} className={cls(variant, size, pill, className)} {...rest}>
      {children}
    </button>
  );
}
