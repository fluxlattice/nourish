import { cx } from "../cx";

export interface DayTabsProps {
  /** Day numbers to offer, e.g. `[1,2,3,4,5,6,7]`. */
  days: number[];
  /** Currently selected day number. */
  value?: number;
  onChange?: (day: number) => void;
  className?: string;
}

/**
 * Row of file-divider tabs for navigating a multi-day plan. The active tab takes
 * the cream card colour so it reads as the divider in front — it visually joins
 * the card below it, which is why the two sit flush with no gap.
 *
 * Scrolls horizontally rather than wrapping, so a week of tabs keeps one line.
 */
export function DayTabs({ days, value, onChange, className }: DayTabsProps) {
  return (
    <div className={cx("day-selector", className)}>
      {days.map((day) => (
        <button
          key={day}
          type="button"
          aria-pressed={day === value}
          onClick={() => onChange?.(day)}
          className={cx("day-pill", day === value && "is-active")}
        >
          Day {day}
        </button>
      ))}
    </div>
  );
}
