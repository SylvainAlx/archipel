import i18n from "../i18n/i18n";
import { StandardOption } from "../types/typAtom";
import { PoliticalSide, Regime, RegimeType } from "../types/typNation";
import { COM_TYPE } from "./consts";

export const nationSearchSortOptions: StandardOption[] = [
  {
    id: 0,
    label: i18n.t("components.searchBars.nationsList.sortNations.ascAlpha"),
  },
  {
    id: 1,
    label: i18n.t("components.searchBars.nationsList.sortNations.descAlpha"),
  },
  {
    id: 2,
    label: i18n.t("components.searchBars.nationsList.sortNations.ascLoc"),
  },
  {
    id: 3,
    label: i18n.t("components.searchBars.nationsList.sortNations.descLoc"),
  },
  {
    id: 4,
    label: i18n.t("components.searchBars.nationsList.sortNations.ascCtz"),
  },
  {
    id: 5,
    label: i18n.t("components.searchBars.nationsList.sortNations.descCtz"),
  },
  {
    id: 6,
    label: i18n.t("components.searchBars.nationsList.sortNations.ascTreasury"),
  },
  {
    id: 7,
    label: i18n.t("components.searchBars.nationsList.sortNations.descTreasury"),
  },
];

export const citizenSearchSortOptions: StandardOption[] = [
  {
    id: 0,
    label: i18n.t("components.searchBars.citizensList.sortCitizens.ascAlpha"),
  },
  {
    id: 1,
    label: i18n.t("components.searchBars.citizensList.sortCitizens.descAlpha"),
  },
];

export const placeSearchSortOptions: StandardOption[] = [
  {
    id: 0,
    label: i18n.t("components.searchBars.placesList.sortPlaces.ascAlpha"),
  },
  {
    id: 1,
    label: i18n.t("components.searchBars.placesList.sortPlaces.descAlpha"),
  },
  // {
  //   id: 2,
  //   label: i18n.t("components.searchBars.placesList.sortPlaces.ascCtz"),
  // },
  // {
  //   id: 3,
  //   label: i18n.t("components.searchBars.placesList.sortPlaces.descCtz"),
  // },
];

export const comSearchSortOptions: StandardOption[] = [
  {
    id: 0,
    label: i18n.t("components.searchBars.comsList.SortComs.ascDate"),
  },
  {
    id: 1,
    label: i18n.t("components.searchBars.comsList.SortComs.descDate"),
  },
];

export const nationComTypeOptions = [
  COM_TYPE.nationPrivate,
  COM_TYPE.nationPublic,
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
  { id: "", label: "" },
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

export const genderList: StandardOption[] = [
  { id: 0, label: "ne souhaite pas l'indiquer" },
  { id: 1, label: "femme" },
  { id: 2, label: "homme" },
  { id: 3, label: "autre" },
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
    label: i18n.t("components.searchBars.placesList.checkbox.state"),
  },
  {
    id: 1,
    label: i18n.t("components.searchBars.placesList.checkbox.county"),
  },
  {
    id: 2,
    label: i18n.t("components.searchBars.placesList.checkbox.city"),
  },
  {
    id: 3,
    label: i18n.t("components.searchBars.placesList.checkbox.nature"),
  },
];
