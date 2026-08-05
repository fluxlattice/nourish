import type { ReactNode } from "react";
import { cx } from "../cx";

export interface ButtonProps {
  children?: ReactNode;
  /**
   * `primary` is the rubber-stamp action — one per screen.
   * `ghost` is the dashed-outline secondary used for Back and Start Over.
   */
  variant?: "primary" | "ghost";
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
}

/**
 * The action control, styled as a rubber stamp: solid red fill, a hard offset
 * shadow, and a half-degree rotation so it reads as pressed onto the card by
 * hand. Pressing it sinks the button into its own shadow.
 *
 * A screen carries at most one `primary` — the thing the user came to do.
 *
 * Disabled primaries become a **dashed outline with no fill** rather than a
 * dimmed stamp: an unavailable action reads as "not stamped yet", never as a
 * faded version of a live one. Bind `disabled` to the same condition that gates
 * the step.
 */
export function Button({
  children,
  variant = "primary",
  disabled,
  onClick,
  type = "button",
  className,
}: ButtonProps) {
  const tone = disabled && variant === "primary" ? "btn-disabled" : `btn-${variant}`;
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cx("btn", tone, className)}
    >
      {children}
    </button>
  );
}
