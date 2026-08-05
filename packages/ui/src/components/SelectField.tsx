import { useId } from "react";
import { cx } from "../cx";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectFieldProps {
  label?: string;
  value?: string;
  /** Receives the new option value directly — not the change event. */
  onChange?: (value: string) => void;
  options: SelectOption[];
  disabled?: boolean;
  id?: string;
  className?: string;
}

/**
 * Dropdown for closed sets — gender, cooking skill, meals per day. Shares the
 * underline treatment of `TextField` and swaps the native arrow for a small
 * hand-drawn chevron so it doesn't break the paper illusion.
 *
 * Option labels can carry a short qualifier after an em dash
 * ("Beginner — quick simple meals"); it is the only explanatory room a select has.
 */
export function SelectField({
  label,
  value,
  onChange,
  options,
  disabled,
  id,
  className,
}: SelectFieldProps) {
  const autoId = useId();
  const selectId = id ?? autoId;
  return (
    <div className={cx("field", className)}>
      {label ? (
        <label className="label" htmlFor={selectId}>
          {label}
        </label>
      ) : null}
      <select
        id={selectId}
        className="control"
        value={value}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
