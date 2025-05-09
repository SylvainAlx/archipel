import i18n from "../i18n/i18n";
import { Dictionary, IdLabelDictionary } from "../types/dictionnaries";
import { Regime } from "../types/typNation";

export const MDP_LOBBY = import.meta.env.VITE_MDP_LOBBY;
export const LOBBY_INFO = import.meta.env.VITE_LOBBY_INFO;
export const SERVER_URL: string = import.meta.env.VITE_SERVER_URL;
export const UPLOADCARE_PUBLIC_KEY = import.meta.env.VITE_UPLOADCARE_PUBLIC_KEY;
export const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;
export const CAPTCHA_PUBLIC_KEY = import.meta.env.VITE_CAPTCHA_PUBLIC_KEY;
export const GOOGLE_ANALYTICS_MEASUREMENT_ID = import.meta.env
  .VITE_GOOGLE_ANALYTICS_MEASUREMENT_ID;
export const INSTAGRAM_URL = import.meta.env.VITE_INSTAGRAM_URL;
export const BTC_PUBLIC_KEY = import.meta.env.VITE_BTC_PUBLIC_KEY;
export const ETH_PUBLIC_KEY = import.meta.env.VITE_ETH_PUBLIC_KEY;
export const SOL_PUBLIC_KEY = import.meta.env.VITE_SOL_PUBLIC_KEY;
export const ADA_PUBLIC_KEY = import.meta.env.VITE_ADA_PUBLIC_KEY;

export const VERSION = {
  beta: "",
  rc: "",
  release: "1.2.0",
  testing: false,
};

export const APP_NAME = i18n.t("components.logo.title");

export const color_primary = "var(--color-primary)";
export const color_secondary = "var(--color-secondary)";
export const color_complementary = "var(--color-complementary)";
export const color_light = "var(--color-light)";
export const color_black_alpha = "var(--color-black-alpha)";

export const PIONEER_DATE = "2025-03-07T00:00:00.000Z";

export const UPLOADCARE_URL = "https://ucarecdn.com";

export const MAX_LENGTH = {
  text: {
    defaultMD: 2000,
    comMessage: 500,
    userPresentation: 1000,
    nationDescription: 5000,
    placeDescription: 2000,
    relationDescription: 100,
    textArea: 100,
    input: 60,
  },
  array: {
    tags: 5,
  },
};

export const ELEMENTS_DISPLAYED_LIMIT = {
  nations: 30,
  citizens: 30,
  places: 30,
  coms: 30,
};

export const COM_GENERAL_DESTINATION = "-1";

export const FLAG_MAKER_URL = "https://flagmakerjr.stg7.net/";
export const COA_MAKER_URL = "https://coamaker.com/";

export const COM_TYPE: IdLabelDictionary = {
  admin: { id: 0, label: i18n.t("listes.comType.admin") },
  general: { id: 1, label: i18n.t("listes.comType.general") },
  nationPrivate: { id: 10, label: i18n.t("listes.comType.nationPrivate") },
  nationPublic: { id: 11, label: i18n.t("listes.comType.nationPublic") },
  nationUpdate: { id: 12, label: i18n.t("listes.comType.nationUpdate") },
  userUpdate: { id: 20, label: i18n.t("listes.comType.userUpdate") },
  userPrivate: { id: 21, label: i18n.t("listes.comType.userPrivate") },
};

export const PLACE_TYPE: IdLabelDictionary = {
  state: {
    id: 0,
    label: i18n.t("components.searchBars.placesList.checkbox.state"),
  },
  county: {
    id: 1,
    label: i18n.t("components.searchBars.placesList.checkbox.county"),
  },
  city: {
    id: 2,
    label: i18n.t("components.searchBars.placesList.checkbox.city"),
  },
  nature: {
    id: 3,
    label: i18n.t("components.searchBars.placesList.checkbox.nature"),
  },
};

export const REGIME: Dictionary<Regime> = {
  unknownPoliticalRegime: {
    id: 1,
    label: i18n.t("listes.regimeList.others.unknownPoliticalRegime"),
    type: 0,
    color: "bg-regime_0",
  },
  noGovernment: {
    id: 2,
    label: i18n.t("listes.regimeList.others.noGovernment"),
    type: 0,
    color: "bg-regime_0",
  },
  provisionalGovernment: {
    id: 3,
    label: i18n.t("listes.regimeList.others.provisionalGovernment"),
    type: 0,
    color: "bg-regime_0",
  },
  other: {
    id: 4,
    label: i18n.t("listes.regimeList.others.other"),
    type: 0,
    color: "bg-regime_0",
  },
  presidentialRepublic: {
    id: 100,
    label: i18n.t("listes.regimeList.democracies.presidentialRepublic"),
    type: 1,
    color: "bg-regime_1",
  },
  semiPresidentialRepublic: {
    id: 101,
    label: i18n.t("listes.regimeList.democracies.semiPresidentialRepublic"),
    type: 1,
    color: "bg-regime_1",
  },
  parliamentaryRepublic: {
    id: 102,
    label: i18n.t("listes.regimeList.democracies.parliamentaryRepublic"),
    type: 1,
    color: "bg-regime_1",
  },
  onePartyRepublic: {
    id: 103,
    label: i18n.t("listes.regimeList.democracies.onePartyRepublic"),
    type: 1,
    color: "bg-regime_1",
  },
  directDemocracy: {
    id: 104,
    label: i18n.t("listes.regimeList.democracies.directDemocracy"),
    type: 1,
    color: "bg-regime_1",
  },
  illiberalDemocracy: {
    id: 105,
    label: i18n.t("listes.regimeList.democracies.illiberalDemocracy"),
    type: 1,
    color: "bg-regime_1",
  },
  constitutionalMonarchy: {
    id: 200,
    label: i18n.t("listes.regimeList.monarchies.constitutionalMonarchy"),
    type: 2,
    color: "bg-regime_2",
  },
  absoluteMonarchy: {
    id: 201,
    label: i18n.t("listes.regimeList.monarchies.absoluteMonarchy"),
    type: 2,
    color: "bg-regime_2",
  },
  militaryDictatorship: {
    id: 300,
    label: i18n.t("listes.regimeList.autoritarianRegimes.militaryDictatorship"),
    type: 3,
    color: "bg-regime_3",
  },
};
