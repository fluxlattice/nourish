import type { ReactNode } from "react";
import { cx } from "../cx";

export interface FieldLabelProps {
  children?: ReactNode;
  /** Id of the control this labels. */
  htmlFor?: string;
  className?: string;
}

/**
 * Small uppercase label above a control, in faint ink.
 *
 * `TextField` and `SelectField` render one from their `label` prop — reach for
 * this directly only when labelling something that has no label of its own,
 * such as a `ChipGroup` or an `ActivityGrid`.
 */
export function FieldLabel({ children, htmlFor, className }: FieldLabelProps) {
  return (
    <label className={cx("label", className)} htmlFor={htmlFor}>
      {children}
    </label>
  );
}
