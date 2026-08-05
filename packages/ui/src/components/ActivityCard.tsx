import { cx } from "../cx";

export interface ActivityCardProps {
  /** Choice text, centred. */
  label: string;
  /** Short qualifier under the label. */
  description?: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

/**
 * Compact centred single-select tile, laid out in an `ActivityGrid`. Nourish
 * uses a 2×2 grid of these for activity level.
 *
 * Selection shows as the dashed border going solid green with a tinted fill —
 * there is no check glyph, so that shift has to carry it. Keep labels to two or
 * three words and descriptions to a short qualifier ("3–4 workouts/week").
 */
export function ActivityCard({
  label,
  description,
  selected,
  onClick,
  className,
}: ActivityCardProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cx("activity-card", selected && "is-selected", className)}
    >
      <div className="activity-title">{label}</div>
      {description ? <div className="activity-desc">{description}</div> : null}
    </button>
  );
}
