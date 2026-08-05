import { cx } from "../cx";

export interface ChipProps {
  /** Chip text. */
  label: string;
  /** Selected chips take the herb-green fill, solid border and bold text. */
  selected?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

/**
 * Pill-shaped multi-select toggle for dietary restrictions — any number can be
 * active at once. For picking exactly one, use `GoalCard` or `ActivityCard`.
 *
 * Unselected chips have a **dashed** border; selecting one makes it solid,
 * green and bold. That dashed-to-solid shift is the system's selection idiom
 * and it recurs on `GoalCard` and `ActivityCard`.
 *
 * Chips are text only — no icons. Decorative emoji were deliberately removed
 * from this design; don't reintroduce them.
 */
export function Chip({ label, selected, onClick, disabled, className }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      disabled={disabled}
      onClick={onClick}
      className={cx("chip", selected && "is-selected", className)}
    >
      {label}
    </button>
  );
}
