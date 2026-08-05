import { useEffect, useState } from "react";
import { cx } from "../cx";
import { LoadingRing } from "./LoadingRing";

export interface LoadingViewProps {
  /** Headline for what is being built, in the script face. */
  title: string;
  /**
   * Reassurance lines cycled every `interval` ms. Naming the actual work
   * ("Balancing your macros…") is what makes a long wait feel accounted for.
   */
  tips?: string[];
  /** Milliseconds between tips. */
  interval?: number;
  /** Glyph passed through to the `LoadingRing`. */
  glyph?: string;
  className?: string;
}

/**
 * Full-card waiting state: ring, script title, a rotating tip line, and three
 * pulsing dots. Shown while a plan generates — a wait long enough that a bare
 * ring would read as a hang.
 *
 * **Name the real work in the tips.** Generic "Please wait" copy wastes the one
 * mechanism that makes a long wait tolerable: each line reports a real stage, so
 * progress is legible even with no percentage to show. Order them to match the
 * actual sequence and end with something that promises the finish.
 *
 * Replaces the whole card body — don't render it beside the content it waits on.
 */
export function LoadingView({
  title,
  tips = [],
  interval = 2200,
  glyph,
  className,
}: LoadingViewProps) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (tips.length < 2) return;
    const t = setInterval(() => setI((x) => (x + 1) % tips.length), interval);
    return () => clearInterval(t);
  }, [tips.length, interval]);

  return (
    <div className={cx("loading", className)}>
      <LoadingRing glyph={glyph} />
      <h3 className="loading-title">{title}</h3>
      <p className="loading-tip">{tips[i] ?? ""}</p>
      <div className="loading-dots">
        {[0, 1, 2].map((j) => (
          <span key={j} style={{ animationDelay: `${j * 0.2}s` }} />
        ))}
      </div>
    </div>
  );
}
