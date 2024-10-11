import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Importez les fichiers de traduction
import translationEN from "./locales/en/translation.json";
import translationFR from "./locales/fr/translation.json";

// Configuration de react-i18next
i18n
  .use(initReactI18next) // initialise react-i18next
  .use(LanguageDetector)
  .init({
    detection: {
      order: ["localStorage", "navigator"],
      lookupLocalStorage: "lng",
    },
    resources: {
      en: {
        translation: translationEN,
      },
      fr: {
        translation: translationFR,
      },
    },
    fallbackLng: "en", // langue de secours si la langue actuelle n'est pas disponible
    interpolation: {
      escapeValue: false, // pas besoin d'échapper les valeurs
    },
  });

export const langOptions = [
  {
    id: "en",
    label: "English",
  },
  {
    id: "fr-FR",
    label: "Français",
  },
];

export default i18n;
