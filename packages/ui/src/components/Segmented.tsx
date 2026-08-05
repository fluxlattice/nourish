import { cx } from "../cx";

export interface SegmentedItem {
  /** Stable key returned by `onChange`. */
  id: string;
  label: string;
}

export interface SegmentedProps {
  items: SegmentedItem[];
  /** `id` of the active item. */
  value?: string;
  onChange?: (id: string) => void;
  className?: string;
}

/**
 * Underlined tab strip for switching views — Meals against Recipes inside a
 * card, Shopping against Tips below it. The active tab takes stamp red with a
 * matching underline.
 *
 * Renders only the strip; you render the panel yourself based on `value`. Tabs
 * are left-aligned and sized to their text rather than sharing the width
 * equally, so the strip reads as a set of headings, not buttons.
 */
export function Segmented({ items, value, onChange, className }: SegmentedProps) {
  return (
    <div className={cx("segmented", className)} role="tablist">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          role="tab"
          aria-selected={item.id === value}
          onClick={() => onChange?.(item.id)}
          className={cx(item.id === value && "is-active")}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
