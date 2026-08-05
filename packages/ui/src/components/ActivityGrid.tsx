import type { ReactNode } from "react";
import { cx } from "../cx";

export interface ActivityGridProps {
  /** A set of `ActivityCard` elements. */
  children?: ReactNode;
  className?: string;
}

/**
 * Two-column grid for `ActivityCard` tiles. Tighter than `FieldPair` because
 * the tiles are a single choice set rather than separate fields.
 */
export function ActivityGrid({ children, className }: ActivityGridProps) {
  return <div className={cx("activity-grid", className)}>{children}</div>;
}
