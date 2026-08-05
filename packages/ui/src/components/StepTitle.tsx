import type { ReactNode } from "react";
import { cx } from "../cx";

export interface StepTitleProps {
  children?: ReactNode;
  /** Heading level. Defaults to `h2` — `Brand` owns the page `h1`. */
  as?: "h1" | "h2" | "h3";
  className?: string;
}

/**
 * The handwritten card title, 42px Dancing Script in dark ink.
 *
 * Pair it with `StepSub` for the question-and-explanation pattern every step of
 * the flow uses. Keep it to a few words — the script face is expressive at this
 * size and a long title wraps into an unreadable tangle.
 */
export function StepTitle({ children, as: Tag = "h2", className }: StepTitleProps) {
  return <Tag className={cx("step-title", className)}>{children}</Tag>;
}
