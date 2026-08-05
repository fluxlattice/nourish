import { cx } from "../cx";

export interface GoalCardProps {
  /** Primary choice text, set in the script face. */
  label: string;
  /** Supporting line explaining what the choice means. */
  description?: string;
  /** Glyph shown in the tilted circular chip. */
  icon?: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

/**
 * Full-width single-select row: a tilted round icon chip, the goal in script,
 * a small description, and a green check when active.
 *
 * Use it when each option needs explaining — Nourish stacks three for the goal
 * choice, the decision that shapes the whole plan. Descriptions are fragments
 * naming the mechanism ("Calorie deficit, high protein"), not sentences.
 *
 * Three or four options is the comfortable maximum. For terse options that fit
 * a grid use `ActivityCard`; for multi-select use `Chip`.
 */
export function GoalCard({
  label,
  description,
  icon,
  selected,
  onClick,
  className,
}: GoalCardProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cx("goal-card", selected && "is-selected", className)}
    >
      {icon ? <span className="goal-icon">{icon}</span> : null}
      <div style={{ textAlign: "left" }}>
        <div className="goal-title">{label}</div>
        {description ? <div className="goal-desc">{description}</div> : null}
      </div>
      {selected ? <span className="goal-check">✓</span> : null}
    </button>
  );
}
