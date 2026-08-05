import type { ReactNode } from "react";
import { cx } from "../cx";

export interface CardStackProps {
  /** Normally a single `IndexCard`. */
  children?: ReactNode;
  className?: string;
}

/**
 * Renders two rotated cards peeking out behind its child, so the card on top
 * reads as the front of a stack rather than a lone panel.
 *
 * This is what sells the recipe-box metaphor — always wrap an `IndexCard` in it
 * when the card represents one of several (a step in the flow, a day in a plan).
 * The peeks are decorative and are not announced to assistive technology.
 */
export function CardStack({ children, className }: CardStackProps) {
  return (
    <div className={cx("card-stack", className)}>
      <div className="stack-peek stack-peek-2" aria-hidden="true" />
      <div className="stack-peek stack-peek-1" aria-hidden="true" />
      {children}
    </div>
  );
}
