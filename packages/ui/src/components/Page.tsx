import type { ReactNode } from "react";
import { cx } from "../cx";

export interface PageProps {
  /** Screen content, constrained to the 460px column. */
  children?: ReactNode;
  className?: string;
}

/**
 * Root wrapper for every Nourish screen. Paints the dark walnut tabletop the
 * recipe box sits on, adds the warm overhead glow, and centres content in a
 * 460px column.
 *
 * Nothing in this design system is styled correctly outside a `Page` — the
 * tokens, the body font and the tabletop background all come from here. Wrap
 * every screen in it.
 */
export function Page({ children, className }: PageProps) {
  return (
    <div className={cx("page", className)}>
      <div className="center">{children}</div>
    </div>
  );
}
