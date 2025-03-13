import i18n from "../i18n/i18n";
import { StandardOption } from "../types/typAtom";
import { COM_TYPE } from "./consts";

export const STAT_COLORS: string[] = [
  "#ffa600", // Jaune orangé
  "#1f78b4", // Bleu soutenu
  "#ff7c43", // Orange foncé
  "#33a02c", // Vert intense
  "#d45087", // Rose foncé
  "#4BC0C0", // Turquoise
  "#e31a1c", // Rouge vif
  "#665191", // Violet foncé
  "#b2df8a", // Vert clair
  "#f95d6a", // Rouge rosé
  "#8E44AD", // Violet profond
  "#fb9a99", // Rose clair
  "#a05195", // Violet moyen
];

export const nationComTypeOptions = [
  COM_TYPE.nationPrivate,
  COM_TYPE.nationPublic,
];

export const adminComTypeOptions = [COM_TYPE.general, COM_TYPE.userPrivate];

export const languageList: StandardOption[] = [
  { id: "ar", label: "العربية" }, // Arabe
  { id: "en", label: "English" }, // Anglais
  { id: "fr-FR", label: "Français" }, // Français
  { id: "de", label: "Deutsch" }, // Allemand
  { id: "es", label: "Español" }, // Espagnol
  { id: "hi", label: "हिन्दी" }, // Hindi
  { id: "ja", label: "日本語" }, // Japonais
  { id: "ko", label: "한국어" }, // Coréen
  { id: "pt", label: "Português" }, // Portugais
  { id: "ru", label: "Русский" }, // Russe
  { id: "zh", label: "中文" }, // Chinois simplifié
  { id: "it", label: "Italiano" }, // Italien
  { id: "nl", label: "Nederlands" }, // Néerlandais
  { id: "sv", label: "Svenska" }, // Suédois
  { id: "no", label: "Norsk" }, // Norvégien
  { id: "fi", label: "Suomi" }, // Finnois
  { id: "da", label: "Dansk" }, // Danois
  { id: "tr", label: "Türkçe" }, // Turc
  { id: "pl", label: "Polski" }, // Polonais
  { id: "cs", label: "Čeština" }, // Tchèque
  { id: "el", label: "Ελληνικά" }, // Grec
  { id: "he", label: "עברית" }, // Hébreu
  { id: "vi", label: "Tiếng Việt" }, // Vietnamien
  { id: "th", label: "ภาษาไทย" }, // Thaï
  { id: "id", label: "Bahasa Indonesia" }, // Indonésien
  { id: "ms", label: "Bahasa Melayu" }, // Malais
  { id: "ta", label: "தமிழ்" }, // Tamoul
  { id: "bn", label: "বাংলা" }, // Bengali
  { id: "fa", label: "فارسی" }, // Persan
  { id: "uk", label: "Українська" }, // Ukrainien
  { id: "hu", label: "Magyar" }, // Hongrois
  { id: "ro", label: "Română" }, // Roumain
  { id: "bg", label: "Български" }, // Bulgare
];

export const genderList: StandardOption[] = [
  { id: 0, label: i18n.t("listes.genderList.preferNotToSay") },
  { id: 1, label: i18n.t("listes.genderList.female") },
  { id: 2, label: i18n.t("listes.genderList.male") },
  { id: 3, label: i18n.t("listes.genderList.other") },
  { id: 4, label: i18n.t("listes.genderList.nonBinary") },
];

export const religionList: StandardOption[] = [
  { id: 0, label: i18n.t("listes.religionList.preferNotToSay") },
  { id: 1, label: i18n.t("listes.religionList.christian") },
  { id: 2, label: i18n.t("listes.religionList.muslim") },
  { id: 3, label: i18n.t("listes.religionList.jewish") },
  { id: 4, label: i18n.t("listes.religionList.buddhist") },
  { id: 5, label: i18n.t("listes.religionList.hindu") },
  { id: 6, label: i18n.t("listes.religionList.sikh") },
  { id: 7, label: i18n.t("listes.religionList.shinto") },
  { id: 8, label: i18n.t("listes.religionList.bahai") },
  { id: 9, label: i18n.t("listes.religionList.jain") },
  { id: 10, label: i18n.t("listes.religionList.zoroastrian") },
  { id: 11, label: i18n.t("listes.religionList.taoist") },
  { id: 12, label: i18n.t("listes.religionList.confucian") },
  { id: 13, label: i18n.t("listes.religionList.indigenous") },
  { id: 14, label: i18n.t("listes.religionList.atheist") },
  { id: 15, label: i18n.t("listes.religionList.agnostic") },
  { id: 16, label: i18n.t("listes.religionList.other") },
];
