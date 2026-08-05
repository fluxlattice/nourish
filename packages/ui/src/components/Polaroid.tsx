import { cx } from "../cx";

export type MealType = "breakfast" | "lunch" | "dinner" | "snack";

export interface PolaroidProps {
  /** Photo URL. Omit while loading, or when none was found. */
  src?: string;
  /** Alt text — the dish name. */
  alt?: string;
  /** Shows the shimmer placeholder instead of a photo or fallback. */
  loading?: boolean;
  /** Tints the fallback when there is no photo. */
  type?: MealType;
  /** Glyph shown in the fallback. */
  fallbackIcon?: string;
  /** Direction of the paper tilt. Alternate down a list. */
  tilt?: "left" | "right";
  /** `lg` for the larger print used on recipe cards. */
  size?: "md" | "lg";
  /** Photographer name, rendered as a quiet credit under the print. */
  credit?: string;
  /** Link for the credit. */
  creditHref?: string;
  /** Fired when the image URL fails to load, so the caller can fall back. */
  onImageError?: () => void;
  className?: string;
}

/**
 * A meal photo mounted as a polaroid print — white border, heavier bottom edge,
 * soft shadow, tilted a few degrees.
 *
 * Handles all three states itself: `loading` shows a shimmer, a missing `src`
 * falls back to a tinted panel keyed to the meal `type`, and a real photo fills
 * the frame. Pass `credit` when the photo came from a service that asks for
 * attribution — it renders as a quiet line under the print, never as an overlay
 * on the image.
 *
 * **Alternate `tilt` down a list** (`i % 2 ? "right" : "left"`); a column of
 * prints all leaning the same way looks like a mistake rather than a scrapbook.
 */
export function Polaroid({
  src,
  alt,
  loading,
  type = "breakfast",
  fallbackIcon = "🍽",
  tilt = "left",
  size = "md",
  credit,
  creditHref,
  onImageError,
  className,
}: PolaroidProps) {
  const hasPhoto = !loading && Boolean(src);
  return (
    <div className={cx("polaroid-wrap", className)}>
      <div
        className={cx("polaroid", size === "lg" && "polaroid-lg", tilt === "right" && "tilt-right")}
      >
        <div className="polaroid-frame">
          {loading ? <div className="photo-skeleton" /> : null}
          {!loading && !hasPhoto ? (
            <div className={cx("photo-fallback", type)}>
              <span>{fallbackIcon}</span>
            </div>
          ) : null}
          {hasPhoto ? <img src={src} alt={alt} loading="lazy" onError={onImageError} /> : null}
        </div>
      </div>
      {hasPhoto && credit ? (
        <a className="photo-credit-line" href={creditHref} target="_blank" rel="noreferrer">
          {credit}
        </a>
      ) : null}
    </div>
  );
}
