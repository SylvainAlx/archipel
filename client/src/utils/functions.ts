/* eslint-disable @typescript-eslint/no-explicit-any */
import i18n from "../i18n/i18n";
import {
  placesTypeList,
  politicalSideList,
  regimeList,
  regimeTypeList,
} from "../settings/consts";
import { Place } from "../types/typPlace";

export const GET_JWT = () => localStorage.getItem("jwt");

export const dateToString = (date: Date) => {
  const createdAtDate: Date = new Date(date);
  return createdAtDate.toLocaleDateString("fr");
  return createdAtDate.toLocaleString("fr");
};

export const deleteElementOfAtomArray = (
  id: string,
  atom: any[],
  setAtom: React.Dispatch<React.SetStateAction<any>>,
) => {
  const tempArray: any[] = atom.filter((objet) => objet.officialId !== id);
  setAtom(tempArray);
};

export const createElementOfAtomArray = (
  payload: any,
  atom: any[],
  setAtom: React.Dispatch<React.SetStateAction<any>>,
) => {
  const tempArray = [...atom];
  tempArray.push(payload);
  setAtom(tempArray);
};

export const updateElementOfAtomArray = (
  payload: any,
  atom: any[],
  setAtom: React.Dispatch<React.SetStateAction<any>>,
) => {
  const tempArray = atom.map((objet) =>
    objet._id === payload.officialId ? payload : objet,
  );
  setAtom(tempArray);
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

export const getCapitalName = (placesList: Place[], id: string): string => {
  const foundPlace = placesList.find((place) => place.officialId === id);
  if (foundPlace) {
    return foundPlace.name;
  } else {
    return "";
  }
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
      case 104:
        return i18n.t("listes.regimeList.democracies.directDemocracy");
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
