import type { ReactNode } from "react";
import { cx } from "../cx";

export interface ActionsProps {
  children?: ReactNode;
  /**
   * `row` (default) is the wizard footer — a ghost Back beside a primary that
   * takes the remaining width. `grid` gives both children equal halves.
   */
  layout?: "row" | "grid";
  className?: string;
}

/**
 * Footer row for a screen's actions.
 *
 * In `row` layout the primary button flexes automatically — no wrapper needed,
 * the stylesheet handles it. Use `grid` when two actions carry comparable
 * weight, like Start Over beside Download on a finished plan.
 */
export function Actions({ children, layout = "row", className }: ActionsProps) {
  return (
    <div className={cx(layout === "grid" ? "actions-grid" : "actions-row", className)}>
      {children}
    </div>
  );
}
