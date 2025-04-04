/* eslint-disable @typescript-eslint/no-explicit-any */
import i18n from "../i18n/i18n";
import { APP_NAME, MAX_LENGTH, REGIME } from "../settings/consts";
import { genderList, languageList } from "../settings/lists";
import { NationModel } from "../models/nationModel";

export const GET_JWT = () => {
  const jwt = localStorage.getItem("jwt");
  return jwt;
};

export const findElementsByName = (searchName: string, array: any[]) => {
  if (!searchName) return array; // Si searchName est vide, on retourne tout l'array
  const regex = new RegExp(`.*${searchName}.*`, "i"); // Équivalent à MongoDB regex
  return array.filter((element) => regex.test(element.name));
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

  // const getLabel = (id: number): string => {
  //   let label = i18n.t("listes.regimeList.others.unknownPoliticalRegime");
  //   Object.values(REGIME).map((regime) => {
  //     if (regime.id === id) {
  //       label = regime.label;
  //     }
  //   });
  //   return label;
  // };

  // tagRegime.label = getLabel(id);
  Object.values(REGIME).map((regime) => {
    if (regime.id === id) {
      tagRegime.label = regime.label;
      tagRegime.type = regime.type;
      tagRegime.bgColor = regime.color;
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

export const isOlderThan30Minutes = (stringDate: Date) => {
  const THIRTY_MINUTES = 30 * 60 * 1000;
  const now = new Date();
  return stringDate.getTime() < now.getTime() - THIRTY_MINUTES;
};

export const getFormatedDate = (date: Date | string) => {
  return new Date(date).toLocaleString(i18n.language, {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const isNation = (officialId: string): boolean => {
  return officialId.charAt(2) === "n";
};

export const getMarkdown = async (path: string): Promise<string> => {
  const response = await fetch(path);
  const text = await response.text();
  return text;
};

export const isStrongPassword = (password: string): boolean => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);
};

export const getGender = (gender: number): string => {
  return genderList.filter((element) => element.id === gender)[0].label;
};
