import { cx } from "../cx";

export interface BrandProps {
  /** Product name, set in the script display face. */
  name: string;
  /** Uppercase, wide-tracked line under the name. */
  tagline?: string;
  className?: string;
}

/**
 * The product lockup that opens a screen: the name in Dancing Script at 44px
 * over a small tracked tagline, both in warm page ink against the tabletop.
 *
 * Sits directly inside `Page`, above the `RecipeBox` — not inside it. There is
 * deliberately no logo mark or badge; the script wordmark is the brand.
 */
export function Brand({ name, tagline, className }: BrandProps) {
  return (
    <div className={cx("brand", className)}>
      <h1 className="brand-name">{name}</h1>
      {tagline ? <p className="brand-tag">{tagline}</p> : null}
    </div>
  );
}
