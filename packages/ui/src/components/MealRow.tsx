import type { ReactNode } from "react";
import { cx } from "../cx";

export interface MealRowProps {
  /** Meal slot, set in script red — "Breakfast", "Lunch". */
  type: string;
  /** Description of the meal, with its calorie count. */
  children?: ReactNode;
  /** Normally a `Polaroid`. */
  photo?: ReactNode;
  className?: string;
}

/**
 * One meal in a day's plan: a polaroid on the left, the meal slot in script red,
 * and the description set on the card's ruled lines.
 *
 * Rows are separated by a dashed rule, like entries written down a page. The
 * body text is one line describing the dish with its calories in parentheses —
 * the full method belongs in `RecipeEntry`.
 */
export function MealRow({ type, children, photo, className }: MealRowProps) {
  return (
    <div className={cx("meal-row", className)}>
      {photo}
      <div>
        <span className="meal-type-tag">{type}</span>
        <p className="meal-text">{children}</p>
      </div>
    </div>
  );
}
