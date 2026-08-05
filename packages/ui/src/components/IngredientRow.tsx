import type { ReactNode } from "react";
import { cx } from "../cx";

export interface IngredientRowProps {
  children?: ReactNode;
  className?: string;
}

/**
 * One ingredient, preceded by a small hand-drawn checkbox tilted a few degrees.
 *
 * The box is decorative — nothing ticks it. It signals "this is a list you work
 * through" without pretending to be interactive state the app doesn't keep.
 * For shopping entries use `ShoppingRow`, which tilts the other way and sits on
 * looser leading.
 */
export function IngredientRow({ children, className }: IngredientRowProps) {
  return (
    <div className={cx("ingredient-row", className)}>
      <span className="ingredient-check" aria-hidden="true" />
      <span>{children}</span>
    </div>
  );
}
