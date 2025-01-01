import { Nation } from "../types/typNation";
import { Place } from "../types/typPlace";
import { getTotalPopulation } from "./functions";

export const sortByCreatedAt = (list: any[], ascending: boolean = true) => {
  return [...list].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return ascending ? dateA - dateB : dateB - dateA;
  });
};

export const sortByName = (
  list: { name: string }[],
  ascending: boolean = true,
): any[] => {
  return [...list].sort((a, b) => {
    const nameA = typeof a.name === "string" ? a.name : "";
    const nameB = typeof b.name === "string" ? b.name : "";
    return ascending ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
  });
};

export const sortByPlaces = (list: Nation[], ascending: boolean = true) => {
  return [...list].sort(function (a, b) {
    return ascending
      ? a.data.roleplay.places - b.data.roleplay.places
      : b.data.roleplay.places - a.data.roleplay.places;
  });
};

export const sortNationsByCitizens = (
  AList: Nation[],
  AAscending: boolean = true,
) => {
  return [...AList].sort((a, b) => {
    if (a.data.roleplay.citizens === b.data.roleplay.citizens) {
      return AAscending
        ? a.data.roleplay.places - b.data.roleplay.places
        : b.data.roleplay.places - a.data.roleplay.places;
    }
    return AAscending
      ? a.data.roleplay.citizens - b.data.roleplay.citizens
      : b.data.roleplay.citizens - a.data.roleplay.citizens;
  });
};

export const sortByTreasury = (list: Nation[], ascending: boolean = true) => {
  return [...list].sort(function (a, b) {
    return ascending
      ? a.data.roleplay.treasury - b.data.roleplay.treasury
      : b.data.roleplay.citizens - a.data.roleplay.treasury;
  });
};

export const sortPlacesByCitizen = (
  list: Place[],
  ascending: boolean = true,
) => {
  return [...list].sort(function (a, b) {
    return ascending
      ? getTotalPopulation(a) - getTotalPopulation(b)
      : getTotalPopulation(b) - getTotalPopulation(a);
  });
};