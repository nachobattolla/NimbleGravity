import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { es } from "@/locales/es";
import { en } from "@/locales/en";

const LANG_KEY = "challenge-lang";

function getStoredLanguage(): string {
  try {
    const stored = localStorage.getItem(LANG_KEY);
    if (stored === "es" || stored === "en") return stored;
  } catch {
    /* ignore */
  }
  return "es";
}

i18n.use(initReactI18next).init({
  resources: {
    es: { translation: es },
    en: { translation: en },
  },
  lng: getStoredLanguage(),
  fallbackLng: "es",
  interpolation: {
    escapeValue: false,
  },
});

i18n.on("languageChanged", (lng) => {
  try {
    localStorage.setItem(LANG_KEY, lng);
  } catch {
    /* ignore */
  }
});

export default i18n;
