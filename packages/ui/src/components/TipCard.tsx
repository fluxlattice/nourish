import type { ReactNode } from "react";
import { cx } from "../cx";

export interface TipCardProps {
  /** Position in the tip list, shown in the mustard badge. */
  number: number | string;
  children?: ReactNode;
  className?: string;
}

/**
 * A single piece of advice on a mustard sticky note, rotated slightly — and
 * alternating rotation down a list, so a run of tips looks stuck on by hand.
 *
 * Unlike `StepRow`, a tip is standalone: the number orders the list, it does not
 * imply the reader works through them in sequence.
 *
 * Tips are specific to the user's own goal, budget and restrictions. A generic
 * tip is worse than none — it tells the reader the advice wasn't really theirs.
 */
export function TipCard({ number, children, className }: TipCardProps) {
  return (
    <div className={cx("tip-card", className)}>
      <div className="tip-badge">{number}</div>
      <p className="tip-text">{children}</p>
    </div>
  );
}
