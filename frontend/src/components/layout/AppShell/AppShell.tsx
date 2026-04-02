"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useI18n } from "../../../i18n/I18nProvider";
import { cx } from "../../../lib/cx";
import * as styles from "./AppShell.css";

type AppShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  heroClassName?: string;
  heroContentClassName?: string;
  heroAside?: ReactNode;
};

export function AppShell({
  eyebrow,
  title,
  description,
  children,
  heroClassName,
  heroContentClassName,
  heroAside
}: AppShellProps) {
  const { locale, setLocale, messages } = useI18n();

  return (
    <div className={styles.pageShell}>
      <header className={styles.topbar}>
        <Link href="/" className={styles.brand}>
          {messages.appShell.brand}
        </Link>
        <div className={styles.topbarActions}>
          <span className={styles.topbarBadge}>{messages.appShell.badge}</span>
          <div className={styles.languageSwitch} aria-label={messages.appShell.languageLabel}>
            <button
              className={cx(styles.languageButton, locale === "pl" && styles.languageButtonActive)}
              onClick={() => setLocale("pl")}
              type="button"
            >
              {messages.appShell.polish}
            </button>
            <button
              className={cx(styles.languageButton, locale === "en" && styles.languageButtonActive)}
              onClick={() => setLocale("en")}
              type="button"
            >
              {messages.appShell.english}
            </button>
          </div>
        </div>
      </header>

      <main className={styles.pageContent}>
        <section className={cx(styles.hero, heroClassName)}>
          <div className={cx(styles.heroContent, heroContentClassName)}>
            <p className={styles.topbarBadge}>{eyebrow}</p>
            <h1 className={styles.heroTitle}>{title}</h1>
            <p className={styles.heroCopy}>{description}</p>
          </div>
          {heroAside ? <div className={styles.heroAside}>{heroAside}</div> : null}
        </section>
        {children}
      </main>
    </div>
  );
}
