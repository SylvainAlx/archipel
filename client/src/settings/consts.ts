// Auth

import i18n from "../i18n/i18n";
import { StandardOption } from "../types/typAtom";
import { PoliticalSide, Regime, RegimeType } from "../types/typNation";
import { BuildCategory } from "../types/typPlace";

export const MDP_LOBBY = import.meta.env.VITE_MDP_LOBBY;
export const SERVER_URL = import.meta.env.VITE_SERVER_URL;
export const VERSION = "0.1";

//  Colors

export const color_primary = "#081825";
export const color_secondary = "var(--color-secondary)";
export const color_complementary = "var(--color-complementary)";
export const color_light = "var(--color-light)";
export const color_black_alpha = "var(--color-black-alpha)";

// Const

export const NEW_PLACE_COST = 100;

// listes

export const searchSortOptions: StandardOption[] = [
  { id: 0, label: "Alphabetique croissant" },
  { id: 1, label: "Alphabetique décroissant" },
  { id: 2, label: "Succès croissant" },
  { id: 3, label: "Succès décroissant" },
  { id: 4, label: "Nombre de lieux croissant" },
  { id: 5, label: "Nombre de lieux décroissant" },
  { id: 6, label: "Nombre de citoyens croissant" },
  { id: 7, label: "Nombre de citoyens décroissant" },
];

export const comOptions: StandardOption[] = [
  { id: 0, label: "contact administrateur" },
  { id: 1, label: "Nouvelle nation" },
  { id: 2, label: "Suppression d'une nation" },
  { id: 3, label: "Politique intérieure (public)" },
  { id: 4, label: "Politique extérieure (public)" },
  { id: 5, label: "Modification apportée" },
];

export const comTypeOptions = [comOptions[3], comOptions[4], comOptions[0]];

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
  { id: "ar", label: "العربية" },
  { id: "en", label: "English" },
  { id: "fr", label: "Français" },
  { id: "de", label: "Deutsch" },
  { id: "es", label: "Español" },
  { id: "hi", label: "हिन्दी" },
  { id: "ja", label: "日本語" },
  { id: "ko", label: "한국어" },
  { id: "pt", label: "Português" },
  { id: "ru", label: "Анже" },
  { id: "zh", label: "昂热" },
];

export const politicalSideList: PoliticalSide[] = [
  { id: -90, label: "Extrême gauche" },
  { id: -60, label: "Gauche radicale" },
  { id: -20, label: "Gauche modérée" },
  { id: 0, label: "Centriste" },
  { id: 20, label: "Droite modérée" },
  { id: 60, label: "Droite radicale" },
  { id: 90, label: "Extrême droite" },
];

export const placesTypeList = [
  {
    id: 0,
    label: "État",
  },
  {
    id: 1,
    label: "Région",
  },
  {
    id: 2,
    label: "Ville",
  },
  {
    id: 3,
    label: "Environnement",
  },
];

export const buildList: BuildCategory[] = [
  {
    id: 0,
    label: {
      fr: "logements",
      en: "homes",
    },
    builds: [
      {
        id: 0,
        label: {
          fr: "maison individuelle",
          en: "individual house",
        },
        level: 1,
        count: 0,
        max: -1,
      },
      {
        id: 1,
        label: {
          fr: "immeuble",
          en: "building",
        },
        level: 1,
        count: 0,
        max: -1,
      },
    ],
  },
  {
    id: 1,
    label: {
      fr: "services publics",
      en: "public services",
    },
    builds: [
      {
        id: 0,
        label: {
          fr: "lieu administratif",
          en: "administration",
        },
        level: 1,
        count: 0,
        max: -1,
      },
      {
        id: 1,
        label: {
          fr: "embassade",
          en: "embassy",
        },
        level: 1,
        count: 0,
        max: -1,
      },
    ],
  },
  {
    id: 2,
    label: {
      fr: "entreprises",
      en: "companies",
    },
    builds: [
      {
        id: 0,
        label: {
          fr: "secteur primaire",
          en: "primary sector",
        },
        level: 1,
        count: 0,
        max: -1,
      },
      {
        id: 1,
        label: {
          fr: "secteur secondaire",
          en: "secondary sector",
        },
        level: 1,
        count: 0,
        max: -1,
      },
      {
        id: 1,
        label: {
          fr: "secteur tertiaire",
          en: "tertiary sector",
        },
        level: 1,
        count: 0,
        max: -1,
      },
    ],
  },
];

// onglets

export const nationTabs: StandardOption[] = [
  { id: 1, label: "LISTE DES NATIONS" },
  // { id: 2, label: "ACTUALITES" },
  { id: 3, label: "STATISTIQUES" },
];
