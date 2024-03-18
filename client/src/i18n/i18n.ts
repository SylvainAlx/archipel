import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Importez les fichiers de traduction
import translationEN from "./locales/en/translation.json";
import translationFR from "./locales/fr/translation.json";

// Configuration de react-i18next
i18n
  .use(initReactI18next) // initialise react-i18next
  .init({
    resources: {
      en: {
        translation: translationEN,
      },
      fr: {
        translation: translationFR,
      },
    },
    lng: "fr", // langue par défaut
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
    id: "fr",
    label: "Français",
  },
];

export default i18n;
