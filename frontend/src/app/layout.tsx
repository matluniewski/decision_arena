import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Providers } from "./providers";
import "../styles/app.css.ts";
import * as appStyles from "../App.css";

export const metadata: Metadata = {
  title: "Decision Arena",
  description: "Structured life decisions with a scored AI-backed report."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pl">
      <body className={appStyles.appRoot}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
