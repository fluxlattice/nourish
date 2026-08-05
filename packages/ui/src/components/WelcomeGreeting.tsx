import type { ReactNode } from "react";
import { cx } from "../cx";

export interface WelcomeGreetingProps {
  children?: ReactNode;
  className?: string;
}

/**
 * The small script salutation that sits immediately above a `StepTitle` on the
 * welcome card — "Hello," over "Welcome to Nourish".
 *
 * Deliberately tucked tight against the title with negative margin so the two
 * read as one handwritten phrase. One word or two; it is a greeting, not a line
 * of copy.
 */
export function WelcomeGreeting({ children, className }: WelcomeGreetingProps) {
  return <p className={cx("welcome-greeting", className)}>{children}</p>;
}
