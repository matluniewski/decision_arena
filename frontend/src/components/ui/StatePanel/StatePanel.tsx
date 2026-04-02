import type { ReactNode } from "react";
import { cx } from "../../../lib/cx";
import * as primitives from "../../../styles/primitives.css";
import { SectionHeader } from "../SectionHeader";
import * as styles from "./StatePanel.css";

type StatePanelProps = {
  label?: string;
  message: ReactNode;
  hint?: ReactNode;
  action?: ReactNode;
  tone?: "default" | "error";
  className?: string;
};

export function StatePanel({
  label,
  message,
  hint,
  action,
  tone = "default",
  className
}: StatePanelProps) {
  return (
    <section className={cx(primitives.panel, styles.root, className)}>
      {label ? <SectionHeader label={label} /> : null}
      <p className={cx(tone === "error" ? primitives.errorBanner : styles.message, tone === "error" && styles.tone.error)}>
        {message}
      </p>
      {hint ? <p className={styles.hint}>{hint}</p> : null}
      {action}
    </section>
  );
}
