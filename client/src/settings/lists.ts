import i18n from "../i18n/i18n";
import { StandardOption } from "../types/typAtom";
import { Regime, RegimeType } from "../types/typNation";
import { COM_TYPE } from "./consts";

export const nationComTypeOptions = [
  COM_TYPE.nationPrivate,
  COM_TYPE.nationPublic,
];

export const STAT_COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A28DFF",
  "#FF6384",
  "#36A2EB",
  "#FFCE56",
  "#4BC0C0",
  "#9966FF",
];

export const adminComTypeOptions = [COM_TYPE.general, COM_TYPE.userPrivate];

export const regimeTypeList: RegimeType[] = [
  {
    type: 0,
    color: "bg-regime_0",
  },
  {
    type: 1,
    color: "bg-regime_1",
  },
  {
    type: 2,
    color: "bg-regime_2",
  },
  {
    type: 3,
    color: "bg-regime_3",
  },
];

export const regimeList: Regime[] = [
  {
    id: 1,
    label: i18n.t("listes.regimeList.others.unknownPoliticalRegime"),
    type: 0,
  },
  {
    id: 2,
    label: i18n.t("listes.regimeList.others.noGovernment"),
    type: 0,
  },
  {
    id: 3,
    label: i18n.t("listes.regimeList.others.provisionalGovernment"),
    type: 0,
  },
  {
    id: 4,
    label: i18n.t("listes.regimeList.others.other"),
    type: 0,
  },
  {
    id: 100,
    label: i18n.t("listes.regimeList.democracies.presidentialRepublic"),
    type: 1,
  },
  {
    id: 101,
    label: i18n.t("listes.regimeList.democracies.semiPresidentialRepublic"),
    type: 1,
  },
  {
    id: 102,
    label: i18n.t("listes.regimeList.democracies.parliamentaryRepublic"),
    type: 1,
  },
  {
    id: 103,
    label: i18n.t("listes.regimeList.democracies.onePartyRepublic"),
    type: 1,
  },
  {
    id: 104,
    label: i18n.t("listes.regimeList.democracies.directDemocracy"),
    type: 1,
  },
  {
    id: 105,
    label: i18n.t("listes.regimeList.democracies.illiberalDemocracy"),
    type: 1,
  },
  {
    id: 200,
    label: i18n.t("listes.regimeList.monarchies.constitutionalMonarchy"),
    type: 2,
  },
  {
    id: 201,
    label: i18n.t("listes.regimeList.monarchies.absoluteMonarchy"),
    type: 2,
  },
  {
    id: 300,
    label: i18n.t("listes.regimeList.autoritarianRegimes.militaryDictatorship"),
    type: 3,
  },
];

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
