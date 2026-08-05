import type { ReactNode } from "react";
import { cx } from "../cx";

export interface ChipGroupProps {
  /** A set of `Chip` elements. */
  children?: ReactNode;
  className?: string;
}

/**
 * Wrapping flex row for `Chip` toggles. Label it with a `FieldLabel` above —
 * chips carry no label of their own, and the label is where the selection rule
 * ("select all that apply") belongs.
 */
export function ChipGroup({ children, className }: ChipGroupProps) {
  return <div className={cx("chip-group", className)}>{children}</div>;
}
