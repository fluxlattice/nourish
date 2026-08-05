import { cx } from "../cx";

export interface FeatureGridProps {
  /** Two or three words each, rendered in script red. */
  labels: string[];
  className?: string;
}

/**
 * Three-across row of capability labels on the welcome card — Goal-based,
 * Budget-aware, Diet-friendly — set in stamp-red script.
 *
 * Text only: there are no icons, boxes or tiles behind these. They read as
 * three things jotted across the card, which is why they carry no border.
 * Each label is a noun phrase of two or three words; there is no room for more.
 */
export function FeatureGrid({ labels, className }: FeatureGridProps) {
  return (
    <div className={cx("feature-grid", className)}>
      {labels.map((label) => (
        <div key={label} className="feature-label">
          {label}
        </div>
      ))}
    </div>
  );
}
