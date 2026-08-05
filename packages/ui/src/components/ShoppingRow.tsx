import type { ReactNode } from "react";
import { cx } from "../cx";

export interface ShoppingRowProps {
  children?: ReactNode;
  className?: string;
}

/**
 * One shopping-list entry with a small tilted checkbox — the item and its
 * estimated cost.
 *
 * Group runs of these under a `ShoppingCategory`. The checkbox tilts the
 * opposite way to `IngredientRow`'s, which keeps a long list from looking
 * mechanically repeated.
 */
export function ShoppingRow({ children, className }: ShoppingRowProps) {
  return (
    <div className={cx("shopping-row", className)}>
      <span className="shopping-check" aria-hidden="true" />
      <span>{children}</span>
    </div>
  );
}

export interface ShoppingCategoryProps {
  children?: ReactNode;
  className?: string;
}

/**
 * Category heading in a shopping list — Produce, Proteins — in stamp red over a
 * red rule, echoing the card's margin line.
 */
export function ShoppingCategory({ children, className }: ShoppingCategoryProps) {
  return <div className={cx("shopping-category", className)}>{children}</div>;
}
