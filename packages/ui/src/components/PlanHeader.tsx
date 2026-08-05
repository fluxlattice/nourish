import type { ReactNode } from "react";
import { cx } from "../cx";

export interface PlanHeaderProps {
  /** Plan name, in large script against the tabletop. */
  title: string;
  /** Small green pill above the title. */
  badge?: string;
  /** Short facts shown as pills under the title. */
  stats?: string[];
  className?: string;
}

/**
 * Header for a finished plan: a green "plan ready" pill, the plan name in
 * script, and a row of small stat pills.
 *
 * Sits on the tabletop **above** the recipe box, not on a card — which is why
 * its type is warm page ink rather than dark ink. It announces the thing the
 * user has been waiting for, so keep the badge rare and the stats to two or
 * three short facts.
 */
export function PlanHeader({ title, badge, stats = [], className }: PlanHeaderProps) {
  return (
    <div className={cx("plan-head", className)}>
      {badge ? <div className="plan-badge">{badge}</div> : null}
      <h2 className="plan-title">{title}</h2>
      {stats.length > 0 ? (
        <div className="plan-stats">
          {stats.map((s) => (
            <span key={s} className="plan-stat">
              {s}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export interface DayHeadingProps {
  children?: ReactNode;
  className?: string;
}

/** Small uppercase caption naming the day above a list of meals. */
export function DayHeading({ children, className }: DayHeadingProps) {
  return <div className={cx("day-heading", className)}>{children}</div>;
}
