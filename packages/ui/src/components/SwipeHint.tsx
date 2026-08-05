import type { ReactNode } from "react";
import { cx } from "../cx";

export interface SwipeHintProps {
  children?: ReactNode;
  className?: string;
}

/**
 * Small right-aligned affordance at the foot of a swipeable `IndexCard`.
 *
 * Show it only in the directions that actually work — "← swipe" on the last
 * card, "swipe →" on the first — so the hint never promises a card that isn't
 * there.
 */
export function SwipeHint({ children = "swipe →", className }: SwipeHintProps) {
  return <span className={cx("swipe-hint", className)}>{children}</span>;
}
