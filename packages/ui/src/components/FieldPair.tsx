import type { ReactNode } from "react";
import { cx } from "../cx";

export interface FieldPairProps {
  children?: ReactNode;
  className?: string;
}

/**
 * Two-column grid for paired form fields — Age beside Gender, Weight beside
 * Height. Keeps four related numbers on one card without scrolling.
 *
 * Fields that need the full width (a budget, a long select) sit outside it
 * rather than spanning it.
 */
export function FieldPair({ children, className }: FieldPairProps) {
  return <div className={cx("grid-2", className)}>{children}</div>;
}
