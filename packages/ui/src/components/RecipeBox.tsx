import type { ReactNode } from "react";
import { cx } from "../cx";

export interface RecipeBoxProps {
  children?: ReactNode;
  className?: string;
}

/**
 * The kraft recipe box that holds the index cards — warm manila fill, darker
 * edge, deep drop shadow and a soft highlight raked across the top.
 *
 * Sits inside `Page`, below `Brand`. Everything else on a screen lives in here:
 * the box is the object, the cards are what you keep in it.
 */
export function RecipeBox({ children, className }: RecipeBoxProps) {
  return <div className={cx("card", className)}>{children}</div>;
}
