import type { ReactNode } from "react";
import { cx } from "../cx";

export interface ScrollPanelProps {
  children?: ReactNode;
  /**
   * `card` (default, 380px) for content inside an index card.
   * `panel` (340px) for a shopping list, `tips` (340px) for a run of tips —
   * the two differ only in which stylesheet hooks apply to their children.
   */
  size?: "card" | "panel" | "tips";
  className?: string;
}

const SIZES = { card: "scroll-panel", panel: "shopping-panel", tips: "tips-panel" } as const;

/**
 * Height-capped scrolling region for long content — a day's recipes, a shopping
 * list, a run of tips.
 *
 * Caps exist so the recipe box keeps its shape as content grows: an
 * uncapped list makes the box grow to the length of whatever the model returned.
 */
export function ScrollPanel({ children, size = "card", className }: ScrollPanelProps) {
  return <div className={cx(SIZES[size], className)}>{children}</div>;
}
