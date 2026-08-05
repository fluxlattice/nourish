import type { ReactNode } from "react";
import { cx } from "../cx";

export interface RecipeSectionTitleProps {
  children?: ReactNode;
  /** `ingredients` (herb green) for things you gather, `steps` (mustard) for the method. */
  tone: "ingredients" | "steps";
  className?: string;
}

/**
 * Script sub-heading that divides a recipe, underlined in its own colour.
 *
 * **The colour split carries meaning.** Herb green heads what you gather —
 * ingredients, shopping categories. Mustard heads the method, matching the
 * mustard numbers on `StepRow`. Keeping that consistent is what lets someone
 * skim a card and find the steps without reading.
 */
export function RecipeSectionTitle({ children, tone, className }: RecipeSectionTitleProps) {
  return <div className={cx("recipe-section-title", tone, className)}>{children}</div>;
}
