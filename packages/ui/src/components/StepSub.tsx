import type { ReactNode } from "react";
import { cx } from "../cx";

export interface StepSubProps {
  children?: ReactNode;
  className?: string;
}

/**
 * The explanatory line under a `StepTitle`, set on the card's ruled lines.
 *
 * Its line-height is the rule spacing, so the text sits on the blue rules
 * instead of floating between them. That alignment is the whole trick of the
 * index-card look — don't override the line-height.
 */
export function StepSub({ children, className }: StepSubProps) {
  return <p className={cx("step-sub", className)}>{children}</p>;
}
