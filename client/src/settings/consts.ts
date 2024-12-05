import i18n from "../i18n/i18n";

export const MDP_LOBBY = import.meta.env.VITE_MDP_LOBBY;
export const SERVER_URL = import.meta.env.VITE_SERVER_URL;
export const UPLOADCARE_PUBLIC_KEY = import.meta.env.VITE_UPLOADCARE_PUBLIC_KEY;
export const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;
export const CAPTCHA_PUBLIC_KEY = import.meta.env.VITE_CAPTCHA_PUBLIC_KEY;
export const GOOGLE_ANALYTICS_MEASUREMENT_ID = import.meta.env
  .VITE_GOOGLE_ANALYTICS_MEASUREMENT_ID;

export const VERSION = {
  beta: "BETA-0.1",
  rc: "",
  release: "",
};

export const color_primary = "var(--color-primary)";
export const color_secondary = "var(--color-secondary)";
export const color_complementary = "var(--color-complementary)";
export const color_light = "var(--color-light)";
export const color_black_alpha = "var(--color-black-alpha)";

export const QUOTAS = {
  PLACES: 10,
  TILES: 8,
  COMS: 1, // par jour
};

export const COSTS = {
  PLACE: 10,
  TILE: 10,
  COM: 10,
};

export const MAX_LENGTH = {
  default: 2000,
  comMessage: 500,
  userPresentation: 1000,
  nationDescription: 5000,
  placeDescription: 2000,
  textArea: 60,
};

export const COM_TYPE = {
  admin: { id: 0, label: i18n.t("listes.comType.admin") },
  general: { id: 1, label: i18n.t("listes.comType.general") },
  nationPrivate: { id: 10, label: i18n.t("listes.comType.nationPrivate") },
  nationPublic: { id: 11, label: i18n.t("listes.comType.nationPublic") },
  nationUpdate: { id: 12, label: i18n.t("listes.comType.nationUpdate") },
  userUpdate: { id: 20, label: i18n.t("listes.comType.userUpdate") },
  userPrivate: { id: 21, label: i18n.t("listes.comType.userPrivate") },
};

export const FLAG_MAKER_URL = "https://flagmakerjr.stg7.net/";
export const COA_MAKER_URL = "https://coamaker.com/";
