import type { ReactNode } from "react";
import { cx } from "../cx";

export interface ErrorNoteProps {
  children?: ReactNode;
  className?: string;
}

/**
 * Failure notice in muted brick red with a dashed border, above the content
 * that failed.
 *
 * The dashed border keeps it in the paper vocabulary rather than shouting like
 * a system alert — this design never uses a saturated error colour. A section
 * with nothing in it is not an error; use `EmptyNote` for that.
 */
export function ErrorNote({ children, className }: ErrorNoteProps) {
  return (
    <div className={cx("error-box", className)} role="alert">
      {children}
    </div>
  );
}
