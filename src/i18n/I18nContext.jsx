import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { LANGUAGES, translations } from "./translations";

const STORAGE_KEY = "roadboss-lang";
const I18nContext = createContext(null);

function readStored() {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function detectLanguage() {
  const saved = readStored();
  if (saved && translations[saved]) return saved;

  const browser = (typeof navigator !== "undefined" && navigator.language) || "en";
  if (browser.toLowerCase().startsWith("am")) return "am";
  if (browser.toLowerCase().startsWith("zh")) return "zh";
  return "en";
}

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(detectLanguage);

  const setLang = useCallback((code) => {
    if (!translations[code]) return;
    setLangState(code);
    try {
      window.localStorage.setItem(STORAGE_KEY, code);
    } catch {
      /* storage can be blocked; the choice still works for this visit */
    }
  }, []);

  // Keep <html lang>, the page title and the meta description in sync.
  useEffect(() => {
    const info = LANGUAGES.find((l) => l.code === lang);
    document.documentElement.lang = info ? info.htmlLang : "en";
    document.title = translations[lang]["meta.title"];

    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", translations[lang]["meta.description"]);
  }, [lang]);

  const t = useCallback(
    (key, vars) => {
      let text = translations[lang][key] ?? translations.en[key] ?? key;
      if (vars) {
        Object.entries(vars).forEach(([name, value]) => {
          text = text.split(`{${name}}`).join(String(value));
        });
      }
      return text;
    },
    [lang],
  );

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
}
