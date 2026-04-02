"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { messages } from "./messages";
import type { Locale } from "./locale";

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  messages: (typeof messages)[Locale];
};

const STORAGE_KEY = "decision-arena-locale";

const I18nContext = createContext<I18nContextValue | null>(null);

function getInitialLocale(): Locale {
  if (typeof window === "undefined") {
    return "pl";
  }

  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === "pl" || saved === "en") {
    return saved;
  }

  return "pl";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => getInitialLocale());

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, locale);
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      setLocale: setLocaleState,
      messages: messages[locale]
    }),
    [locale]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useI18n must be used within I18nProvider.");
  }

  return context;
}
