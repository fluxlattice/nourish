import { useId } from "react";
import { cx } from "../cx";

export interface TextFieldProps {
  /** Uppercase label above the input. */
  label?: string;
  value?: string;
  /** Receives the new string value directly — not the change event. */
  onChange?: (value: string) => void;
  placeholder?: string;
  type?: "text" | "number" | "email" | "tel";
  /** Derived-value note rendered under the input. */
  hint?: string;
  disabled?: boolean;
  /** Hints the on-screen keyboard — `numeric` for postcodes and the like. */
  inputMode?: "text" | "numeric" | "decimal" | "tel" | "email";
  /** Caps the entry length. */
  maxLength?: number;
  id?: string;
  className?: string;
}

/**
 * Text input drawn as a **ruled line, not a box** — transparent fill with a
 * single ink underline that turns stamp red on focus. It reads as writing on
 * the card rather than filling in a form widget, which is the whole point.
 *
 * `onChange` hands you the string value directly, so `onChange={setAge}` is the
 * idiomatic call — there is no event argument to unwrap.
 *
 * Placeholders show a realistic example value ("28", "160"), never a restatement
 * of the label.
 */
export function TextField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  hint,
  disabled,
  inputMode,
  maxLength,
  id,
  className,
}: TextFieldProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  return (
    <div className={cx("field", className)}>
      {label ? (
        <label className="label" htmlFor={inputId}>
          {label}
        </label>
      ) : null}
      <input
        id={inputId}
        className="control"
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        inputMode={inputMode}
        maxLength={maxLength}
        onChange={(e) => onChange?.(e.target.value)}
      />
      {hint ? <div className="hint">{hint}</div> : null}
    </div>
  );
}
