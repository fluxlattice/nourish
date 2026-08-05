import { cx } from "../cx";

export interface LoadingRingProps {
  /** Glyph held still in the centre of the rings. */
  glyph?: string;
  className?: string;
}

/**
 * Two counter-rotating rings around a still glyph: a dashed ink track, a stamp-red
 * ring outside and a mustard one inside.
 *
 * The standalone busy indicator. For a full waiting screen with a title and
 * rotating copy, use `LoadingView`, which composes this.
 */
export function LoadingRing({ glyph = "✏️", className }: LoadingRingProps) {
  return (
    <div className={cx("loading-ring", className)} role="status" aria-label="Loading">
      <div className="track" />
      <div className="spin" />
      <div className="spin-slow" />
      {glyph ? <div className="icon">{glyph}</div> : null}
    </div>
  );
}
