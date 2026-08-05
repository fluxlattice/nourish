/** Joins truthy class names. Internal helper — not part of the public component API. */
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
