import type { CSSProperties, PointerEventHandler, ReactNode } from "react";
import { cx } from "../cx";

export interface IndexCardProps {
  children?: ReactNode;
  /** Inline style — used by swipe handlers to apply a drag transform. */
  style?: CSSProperties;
  className?: string;
  /** Pointer handlers, so the card can be dragged between siblings. */
  onPointerDown?: PointerEventHandler<HTMLDivElement>;
  onPointerMove?: PointerEventHandler<HTMLDivElement>;
  onPointerUp?: PointerEventHandler<HTMLDivElement>;
  onPointerCancel?: PointerEventHandler<HTMLDivElement>;
}

/**
 * The cream index card: ruled blue lines, a red margin rule down the left, and
 * a faint paper grain. The surface all written content sits on.
 *
 * Body copy inside a card should use `line-height: var(--rule-line)` so text
 * sits **on** the ruled lines rather than drifting between them — `StepSub`,
 * `MealRow` and the checklist rows already do this. Left padding clears the red
 * margin rule; don't reduce it.
 *
 * Pass drag transforms through `style` if you wire up swipe gestures.
 */
export function IndexCard({ children, style, className, ...pointer }: IndexCardProps) {
  return (
    <div className={cx("index-card", className)} style={style} {...pointer}>
      {children}
    </div>
  );
}
