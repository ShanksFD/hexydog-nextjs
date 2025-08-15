import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";

let i18nInstance = null;

export const initI18n = async () => {
  if (i18nInstance && i18nInstance.isInitialized) {
    return i18nInstance;
  }

  i18nInstance = i18n.createInstance();

  await i18nInstance
    .use(HttpBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      supportedLngs: ["ar", "de", "en", "es", "fr", "it", "ry", "tr"],
      fallbackLng: "en",
      load: "languageOnly",
      debug: false,
      interpolation: {
        escapeValue: false,
      },
      detection: {
        order: ["localStorage", "navigator", "htmlTag"],
        caches: ["localStorage"],
      },
      react: {
        useSuspense: false,
      },
      backend: {
        loadPath: "/locales/{{lng}}/{{ns}}.json",
      },
    });

  return i18nInstance;
};

export default i18nInstance;
