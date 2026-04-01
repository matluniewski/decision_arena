import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import { useI18n } from "../i18n/I18nProvider";

type AppShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
};

export function AppShell({ eyebrow, title, description, children }: AppShellProps) {
  const { locale, setLocale, messages } = useI18n();

  return (
    <div className="page-shell">
      <header className="topbar">
        <Link to="/" className="brand">
          {messages.appShell.brand}
        </Link>
        <div className="topbar-actions">
          <span className="topbar-badge">{messages.appShell.badge}</span>
          <div className="language-switch" aria-label={messages.appShell.languageLabel}>
            <button
              className={`language-button ${locale === "pl" ? "language-button-active" : ""}`}
              onClick={() => setLocale("pl")}
              type="button"
            >
              {messages.appShell.polish}
            </button>
            <button
              className={`language-button ${locale === "en" ? "language-button-active" : ""}`}
              onClick={() => setLocale("en")}
              type="button"
            >
              {messages.appShell.english}
            </button>
          </div>
        </div>
      </header>

      <main className="page-content">
        <section className="hero">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="hero-copy">{description}</p>
        </section>
        {children}
      </main>
    </div>
  );
}
