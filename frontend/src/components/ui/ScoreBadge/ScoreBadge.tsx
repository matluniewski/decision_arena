import type { ReactNode } from "react";
import { cx } from "../../../lib/cx";
import * as styles from "./ScoreBadge.css";

type ScoreBadgeProps = {
  value: ReactNode;
  caption?: ReactNode;
  align?: "start" | "end";
  className?: string;
  valueClassName?: string;
  captionClassName?: string;
};

export function ScoreBadge({
  value,
  caption,
  align = "end",
  className,
  valueClassName,
  captionClassName
}: ScoreBadgeProps) {
  return (
    <div className={cx(styles.root, styles.align[align], className)}>
      <span className={cx(styles.value, valueClassName)}>{value}</span>
      {caption ? <small className={cx(styles.caption, captionClassName)}>{caption}</small> : null}
    </div>
  );
}
