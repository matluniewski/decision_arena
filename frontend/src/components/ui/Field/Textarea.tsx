import type { ChangeEvent, TextareaHTMLAttributes } from "react";
import { cx } from "../../../lib/cx";
import * as primitives from "../../../styles/primitives.css";
import * as styles from "./Field.css";

type TextareaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "className"> & {
  clearLabel: string;
  className?: string;
  onClear?: () => void;
};

export function Textarea({ clearLabel, className, value, onChange, onClear, ...props }: TextareaProps) {
  const normalizedValue = typeof value === "string" ? value : "";
  const hasValue = normalizedValue.length > 0;

  return (
    <div className={styles.fieldShell}>
      <textarea
        {...props}
        className={cx(primitives.textareaInput, styles.fieldControl, className)}
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
              : onChange?.({ target: { value: "" } } as ChangeEvent<HTMLTextAreaElement>)
          }
          type="button"
        >
          ×
        </button>
      ) : null}
    </div>
  );
}
