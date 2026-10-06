import { useEffect, useMemo, useState, type ReactNode } from "react";
import { en, type Dictionary } from "./en";
import { nl } from "./nl";
import { LanguageContext, type Locale } from "./useLanguage";

const dictionaries: Record<Locale, Dictionary> = { en, nl };
const STORAGE_KEY = "locale";

function getInitialLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "en" || stored === "nl") return stored;
  return navigator.language?.toLowerCase().startsWith("nl") ? "nl" : "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(getInitialLocale);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, locale);
    document.documentElement.lang = locale;
    document.title = dictionaries[locale].meta.title;
  }, [locale]);

  const value = useMemo(() => ({ locale, setLocale, t: dictionaries[locale] }), [locale]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
