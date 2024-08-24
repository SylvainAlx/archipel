/* eslint-disable @typescript-eslint/no-explicit-any */
import { SetStateAction } from "jotai";
import i18n from "../i18n/i18n";
import {
  placesTypeList,
  politicalSideList,
  regimeList,
  regimeTypeList,
} from "../settings/consts";
import { LabelId, Nation } from "../types/typNation";
import { Place } from "../types/typPlace";
import { SetAtom } from "../settings/store";
import { errorMessage, successMessage } from "./toasts";
import { User } from "../types/typUser";

export const GET_JWT = () => {
  const jwt = localStorage.getItem("jwt");
  return jwt;
};

export const dateToString = (date: Date) => {
  const createdAtDate: Date = new Date(date);
  return createdAtDate.toLocaleDateString("fr");
};

export const findNationCitizens = (nationId: string, citizenList: User[]) => {
  const elements: User[] = [];
  citizenList.forEach((citizen) => {
    if (citizen.citizenship.nationId === nationId) {
      elements.push(citizen);
    }
  });
  return elements;
};

export const findElementOfAtomArray = (id: string, atom: any[]) => {
  const element = atom.find((objet) => objet.officialId === id);
  return element;
};

export const deleteElementOfAtomArray = (
  id: string,
  atom: any[],
  setAtom: SetAtom<[SetStateAction<any>], void>,
) => {
  const tempArray: any[] = [...atom];
  for (let i = 0; i < atom.length; i++) {
    if (atom[i].officialId === id) {
      tempArray.splice(i, 1);
      break;
    }
  }
  setAtom(tempArray);
};

export const createElementOfAtomArray = (
  payload: any,
  atom: any[],
  setAtom: SetAtom<[SetStateAction<any>], void>,
) => {
  const tempArray = [...atom];
  tempArray.push(payload);
  setAtom(tempArray);
};

export const updateElementOfAtomArray = (
  payload: any,
  atom: any[],
  setAtom: SetAtom<[SetStateAction<any>], void>,
) => {
  const tempArray = atom.map((objet) =>
    objet.officialId === payload.officialId ? payload : objet,
  );
  if (tempArray.length === 0) {
    createElementOfAtomArray(payload, atom, setAtom);
  } else {
    setAtom(tempArray);
  }
};

export const getPoliticalSide = (value: number) => {
  let label = "";
  politicalSideList.map((politicalSide) => {
    if (value === politicalSide.id) {
      label = politicalSide.label;
    }
  });
  return label;
};

export const differenceEnMinutes = (date: Date) => {
  const difference = new Date().getTime() - new Date(date).getTime();
  const differenceMinutes: number = Math.round(difference / (1000 * 60));
  return differenceMinutes;
};

export const addCredits = () => {
  alert("plus de thune !");
};

export const formatTime = (totalMinutes: number): string => {
  const days = Math.floor(totalMinutes / (24 * 60));
  const hours = Math.floor((totalMinutes % (24 * 60)) / 60);
  const minutes = Math.floor(totalMinutes % 60);

  return `${days > 0 ? days + "j" : ""} ${hours > 0 ? hours + "h" : ""} ${minutes > 0 ? hours + "m" : ""}`;
};

export const getPlaceName = (
  placesList: Place[],
  id: string,
  def: string,
): string => {
  const foundPlace = placesList.find((place) => place.officialId === id);
  if (foundPlace) {
    return foundPlace.name;
  } else {
    return def;
  }
};

export const getPlaceListByType = (
  nation: Nation,
  placesList: Place[],
  types: number[],
): LabelId[] => {
  const result: LabelId[] = [];
  placesList.forEach((place) => {
    types.forEach((type) => {
      if (place.type === type) {
        result.push({ id: place.officialId, label: place.name });
      }
    });
  });
  result.push({ id: nation.officialId, label: nation.name });
  return result;
};

export const getPlaceTypeLabel = (id: number) => {
  const foundType = placesTypeList.find((type) => type.id === id);
  if (foundType) {
    return foundType.label;
  } else {
    return "";
  }
};

export const createTagRegime = (id: number) => {
  const tagRegime = {
    id,
    label: "",
    type: 0,
    bgColor: "bg-regime_0",
  };
  const getLabel = (id: number): string => {
    switch (id) {
      case 1:
        return i18n.t("listes.regimeList.others.unknownPoliticalRegime");
      case 2:
        return i18n.t("listes.regimeList.others.noGovernment");
      case 3:
        return i18n.t("listes.regimeList.others.provisionalGovernment");
      case 4:
        return i18n.t("listes.regimeList.others.other");
      case 100:
        return i18n.t("listes.regimeList.democracies.presidentialRepublic");
      case 101:
        return i18n.t("listes.regimeList.democracies.semiPresidentialRepublic");
      case 102:
        return i18n.t("listes.regimeList.democracies.parliamentaryRepublic");
      case 103:
        return i18n.t("listes.regimeList.democracies.onePartyRepublic");
      case 104:
        return i18n.t("listes.regimeList.democracies.directDemocracy");
      case 200:
        return i18n.t("listes.regimeList.monarchies.constitutionalMonarchy");
      case 201:
        return i18n.t("listes.regimeList.monarchies.absoluteMonarchy");
      case 300:
        return i18n.t(
          "listes.regimeList.autoritarianRegimes.militaryDictatorship",
        );
    }
    return i18n.t("listes.regimeList.others.unknownPoliticalRegime");
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

export const displayUserInfoByType = (type: string) => {
  switch (type) {
    case "signin":
      successMessage(i18n.t("toasts.user.signIn"));
      break;
    case "signup":
      successMessage(i18n.t("toasts.user.signUp"));
      break;
    case "verify":
      successMessage(i18n.t("toasts.user.verify"));
      break;
    case "newPassword":
      successMessage(i18n.t("toasts.user.newPassword"));
      break;
      case "update":
        successMessage(i18n.t("toasts.user.update"));
        break;
    case "delete":
      successMessage(i18n.t("toasts.user.delete"));
      break;
    case "deleteKO":
      errorMessage(i18n.t("toasts.user.deleteKO"));
      break;
    case "error":
      errorMessage(i18n.t("toasts.user.error"));
      break;
    case "badRecovery":
      errorMessage(i18n.t("toasts.user.badRecovery"));
      break;
    case "user":
      errorMessage(i18n.t("toasts.user.badUser"));
      break;
    case "password":
      errorMessage(i18n.t("toasts.user.badPassword"));
      break;
    case "11000":
      errorMessage(i18n.t("toasts.user.11000"));
      break;
    case "serverError":
      errorMessage(i18n.t("toasts.user.serverError"));
      break;
    default:
      break;
  }
};

export const displayNationInfoByType = (type: string) => {
  switch (type) {
    case "new":
      successMessage(i18n.t("toasts.nation.create"));
      break;
    case "delete":
      successMessage(i18n.t("toasts.nation.delete"));
      break;
    default:
      break;
  }
};

export const removeDuplicates = (array: any[]) => {
  const uniqueArray: any[] = [];
  const seen = new Set();

  array.forEach((item) => {
    const key = `${item.name}-${item.symbol}`;
    if (!seen.has(key)) {
      seen.add(key);
      uniqueArray.push(item);
    }
  });

  return uniqueArray;
};

export const sortObjectKeys = (obj: any): any => {
  const sortedKeys = Object.keys(obj).sort();
  const sortedObj: any = {};
  sortedKeys.forEach((key) => {
    sortedObj[key] = obj[key];
  });
  return sortedObj;
};
