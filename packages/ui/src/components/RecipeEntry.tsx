import type { ReactNode } from "react";
import { cx } from "../cx";

export interface RecipeEntryProps {
  /** Dish name, the entry's headline in script. */
  name: string;
  /** Uppercase meal slot above the name. */
  type?: string;
  /** Normally a large `Polaroid`. */
  photo?: ReactNode;
  /** Sections of the recipe. */
  children?: ReactNode;
  className?: string;
}

/**
 * A full recipe written onto the card: a large polaroid beside the meal slot and
 * dish name, then whatever sections you compose below.
 *
 * The house pattern for the body is a green `RecipeSectionTitle` over
 * `IngredientRow` checkboxes, then a mustard one over numbered `StepRow`s.
 *
 * Entries are separated by a dashed rule rather than boxed — several recipes
 * read as successive entries on one card, not as a stack of panels.
 */
export function RecipeEntry({ name, type, photo, children, className }: RecipeEntryProps) {
  return (
    <div className={cx("recipe-card", className)}>
      <div className="recipe-head-row">
        {photo}
        <div>
          {type ? <div className="recipe-eyebrow">{type}</div> : null}
          <div className="recipe-name">{name}</div>
        </div>
      </div>
      {children}
    </div>
  );
}
