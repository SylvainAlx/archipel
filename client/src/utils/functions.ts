/* eslint-disable @typescript-eslint/no-explicit-any */
import i18n from "../i18n/i18n";
import { APP_NAME, MAX_LENGTH } from "../settings/consts";
import { languageList, regimeList, regimeTypeList } from "../settings/lists";
import { NationModel } from "../models/nationModel";

export const GET_JWT = () => {
  const jwt = localStorage.getItem("jwt");
  return jwt;
};

export const findElementsByName = (searchName: string, array: any[]) => {
  return array.filter((element) =>
    element.name.toLowerCase().includes(searchName.toLowerCase()),
  );
};

export const findNationsByTag = (searchTag: string, nations: NationModel[]) => {
  return nations.filter((nation) =>
    nation.data.general.tags.some((tag) =>
      tag.toLowerCase().includes(searchTag.toLowerCase()),
    ),
  );
};

export const createTagRegime = (id: number) => {
  const tagRegime = {
    id,
    label: "",
    type: 0,
    bgColor: "bg-regime_0",
  };

  const getLabel = (id: number): string => {
    let label = i18n.t("listes.regimeList.others.unknownPoliticalRegime");
    regimeList.map((regime) => {
      if (regime.id === id) {
        label = regime.label;
      }
    });
    return label;
  };

  tagRegime.label = getLabel(id);
  regimeList.map((regime) => {
    if (regime.id === id) {
      regimeTypeList.map((type) => {
        if (regime.type === type.type) {
          tagRegime.type = type.type;
          tagRegime.bgColor = type.color;
        }
      });
    }
  });
  return tagRegime;
};

export const dateIsExpired = (stringDate: string): boolean => {
  const date = new Date(stringDate);
  const now = new Date();
  return date < now;
};

export const getMaxLength = (path: string) => {
  switch (path) {
    case "data.general.description":
      return MAX_LENGTH.text.nationDescription;
    case "description":
      return MAX_LENGTH.text.placeDescription;
    case "bio":
      return MAX_LENGTH.text.userPresentation;
    default:
      return 0;
  }
};

export const getLanguageLabel = (language: string) => {
  let label = "";
  languageList.map((lang) => {
    if (lang.id === language || (language === "fr" && lang.id === "fr-FR")) {
      label = lang.label;
    }
  });
  return label;
};

export const getDocumentTitle = (title: string) => {
  if (title === "") {
    return APP_NAME;
  } else {
    return APP_NAME + " - " + title;
  }
};

export const isMoreThan24Hours = (stringDate: Date) => {
  const date1 = new Date(stringDate);
  const date2 = new Date();
  return date1.getTime() < date2.getTime() - 24 * 60 * 60 * 1000;
};

export const isNation = (officialId: string): boolean => {
  return officialId.charAt(2) === "n";
};
