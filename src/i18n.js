import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en_us from "./locales/en.json";
import span from "./locales/sp.json";
import lolcat from "./locales/lol.json";

i18n
  //detect user language
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: en_us,
      },
      es: {
        translation: span,
      },
      lol: {
        translation: lolcat,
      },
    },
  });

export default i18n;
