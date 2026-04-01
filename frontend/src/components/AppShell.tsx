import { Link } from "react-router-dom";
import type { ReactNode } from "react";

type AppShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
};

export function AppShell({ eyebrow, title, description, children }: AppShellProps) {
  return (
    <div className="page-shell">
      <header className="topbar">
        <Link to="/" className="brand">
          Decision Arena
        </Link>
        <span className="topbar-badge">Structured life decisions</span>
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
