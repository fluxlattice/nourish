import type { ReactNode } from "react";
import { cx } from "../cx";

export interface HintProps {
  children?: ReactNode;
  className?: string;
}

/**
 * Derived-value note under an input — the weekly and daily equivalents shown
 * once a monthly budget is entered.
 *
 * For computed feedback, not validation. Render it conditionally; an empty hint
 * leaves a gap that makes the card jump when it fills.
 */
export function Hint({ children, className }: HintProps) {
  return <div className={cx("hint", className)}>{children}</div>;
}
