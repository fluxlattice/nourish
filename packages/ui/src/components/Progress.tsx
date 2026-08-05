import { cx } from "../cx";

export interface ProgressProps {
  /** Total cards in the flow. */
  count: number;
  /** Zero-based index of the current card. */
  current: number;
  /** Name of the current card, shown small under the counter. */
  label?: string;
  className?: string;
}

/**
 * Folder-tab progress indicator: a row of small clips along the top, filled in
 * stamp red up to the current card, over a "Card 2 of 4" counter.
 *
 * The tabs read as dividers poking out of the recipe box, which is why they sit
 * above the card rather than inside it. Naming the current card in `label` is
 * what makes the counter meaningful — "Card 2 of 4" alone says how far, not what.
 */
export function Progress({ count, current, label, className }: ProgressProps) {
  return (
    <div className={cx("progress", className)}>
      <div className="tab-row">
        {Array.from({ length: count }, (_, i) => (
          <div key={i} className={cx("tab-clip", i <= current && "is-filled")} />
        ))}
      </div>
      <div className="progress-label">
        Card {current + 1} of {count}
        {label ? <small>{label}</small> : null}
      </div>
    </div>
  );
}
