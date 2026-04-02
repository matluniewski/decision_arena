import type { ReactNode } from "react";
import { cx } from "../../../lib/cx";
import * as primitives from "../../../styles/primitives.css";
import * as styles from "./SectionHeader.css";

type SectionHeaderProps = {
  label: string;
  title?: ReactNode;
  description?: ReactNode;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
};

export function SectionHeader({
  label,
  title,
  description,
  className,
  titleClassName,
  descriptionClassName
}: SectionHeaderProps) {
  return (
    <div className={cx(styles.root, className)}>
      <span className={primitives.sectionLabel}>{label}</span>
      {title ? <h2 className={cx(styles.title, titleClassName)}>{title}</h2> : null}
      {description ? <p className={cx(styles.description, descriptionClassName)}>{description}</p> : null}
    </div>
  );
}
