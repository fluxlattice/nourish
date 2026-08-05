import type { ReactNode } from "react";
import { cx } from "../cx";

export interface StepRowProps {
  /** Position in the sequence, shown in the dashed mustard badge. */
  number: number;
  children?: ReactNode;
  className?: string;
}

/**
 * One numbered instruction in a recipe method, with its number in a dashed
 * mustard circle set in the script face.
 *
 * Mustard here deliberately pairs with the mustard `RecipeSectionTitle` that
 * opens the steps block, so the whole method reads as one keyed region distinct
 * from the green ingredients above it.
 *
 * Number from 1 and pass it explicitly; the component doesn't count for you.
 */
export function StepRow({ number, children, className }: StepRowProps) {
  return (
    <div className={cx("step-row", className)}>
      <div className="step-badge">{number}</div>
      <span>{children}</span>
    </div>
  );
}
