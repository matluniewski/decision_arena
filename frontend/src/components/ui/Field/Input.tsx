import type { ChangeEvent, InputHTMLAttributes } from "react";
import { cx } from "../../../lib/cx";
import * as primitives from "../../../styles/primitives.css";
import * as styles from "./Field.css";

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "className"> & {
  clearLabel: string;
  className?: string;
  onClear?: () => void;
};

export function Input({ clearLabel, className, value, onChange, onClear, ...props }: InputProps) {
  const normalizedValue = typeof value === "string" ? value : "";
  const hasValue = normalizedValue.length > 0;

  return (
    <div className={styles.fieldShell}>
      <input
        {...props}
        className={cx(primitives.textInput, styles.fieldControl, className)}
        value={value}
        onChange={onChange}
      />
      {hasValue ? (
        <button
          aria-label={clearLabel}
          className={styles.clearButton}
          onClick={() =>
            onClear
              ? onClear()
              : onChange?.({ target: { value: "" } } as ChangeEvent<HTMLInputElement>)
          }
          type="button"
        >
          ×
        </button>
      ) : null}
    </div>
  );
}
