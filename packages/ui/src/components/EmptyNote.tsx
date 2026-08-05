import type { ReactNode } from "react";
import { cx } from "../cx";

export interface EmptyNoteProps {
  children?: ReactNode;
  className?: string;
}

/**
 * Quiet placeholder for a section with nothing to show — a day whose meals
 * didn't parse, a plan without recipes yet.
 *
 * Says what is missing and how to get it, on the same dashed cardstock as the
 * rest of the system. Never uses the `ErrorNote` treatment: empty is a normal
 * state, and dressing it as a failure makes the app look broken.
 */
export function EmptyNote({ children, className }: EmptyNoteProps) {
  return (
    <div className={cx("empty-note", className)}>
      <p>{children}</p>
    </div>
  );
}
