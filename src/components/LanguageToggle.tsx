import { useLanguage, type Locale } from "../i18n/useLanguage";

const locales: Locale[] = ["nl", "en"];

export function LanguageToggle() {
  const { locale, setLocale, t } = useLanguage();
  return (
    <div role="group" aria-label={t.nav.language} className="inline-flex rounded-full border border-line bg-paper p-0.5 text-sm font-semibold">
      {locales.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLocale(l)}
          aria-pressed={locale === l}
          lang={l}
          className={`rounded-full px-3 py-1.5 uppercase transition-colors ${
            locale === l ? "bg-amsterdam-purple-brown text-cream" : "text-ink-soft hover:text-bollard"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
