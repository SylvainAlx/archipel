// Auth

import i18n from "../i18n/i18n";
import { StandardOption } from "../types/typAtom";
import { PoliticalSide, Regime, RegimeType } from "../types/typNation";
import { BuildCategory } from "../types/typPlace";

export const MDP_LOBBY = import.meta.env.VITE_MDP_LOBBY;
export const SERVER_URL = import.meta.env.VITE_SERVER_URL;
export const VERSION = "0.1";
export const TITLE = "Navir";

//  Colors

export const color_primary = "#081825";
export const color_secondary = "var(--color-secondary)";
export const color_complementary = "var(--color-complementary)";
export const color_light = "var(--color-light)";
export const color_black_alpha = "var(--color-black-alpha)";

// listes

export const nationSortOptions: StandardOption[] = [
  { id: 0, label: "Alphabetique croissant" },
  { id: 1, label: "Alphabetique décroissant" },
  { id: 2, label: "Succès croissant" },
  { id: 3, label: "Succès décroissant" },
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
    level: 1,
    cost: 1000,
    points: 1,
    slots: 10,
    waitTime: 315,
    description: "Quelques maisons au milieu de nulle part",
  },
  {
    id: 1,
    level: 2,
    cost: 10000,
    points: 10,
    slots: 100,
    waitTime: 630,
    description: "L'ébauche d'un petit village",
  },
  {
    id: 2,
    level: 3,
    cost: 100000,
    points: 100,
    slots: 1000,
    waitTime: 1260,
    description: "Tout ce qu'il faut pour faire une communauté",
  },
  {
    id: 3,
    level: 4,
    cost: 1000000,
    points: 1000,
    slots: 10000,
    waitTime: 2520,
    description: "Communauté de grande taille",
  },
  {
    id: 4,
    level: 5,
    cost: 10000000,
    points: 10000,
    slots: 100000,
    waitTime: 5040,
    description: "Grande agglomération",
  },
  {
    id: 5,
    level: 6,
    cost: 100000000,
    points: 100000,
    slots: 102400,
    waitTime: 10080,
    description: "Grande métropole à rayonnement internationnal",
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
  { id: 0, label: "GLOBE VIRTUEL" },
  { id: 1, label: "LISTE DES NATIONS" },
  { id: 2, label: "ACTUALITES" },
  { id: 3, label: "STATISTIQUES" },
];
