import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationEN from "./locales/en.json";
import translationAR from "./locales/ar.json";

// force English as default unless user explicitly changed language
const savedLang = localStorage.getItem("i18nextLng") || "en";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: translationEN },
      ar: { translation: translationAR },
    },
    lng: savedLang,         // <- sets default
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      // disable automatic detection on first load
      order: [], // ← disables browser/HTML detection
    },
  });

export default i18n;
