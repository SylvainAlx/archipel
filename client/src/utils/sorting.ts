/* eslint-disable @typescript-eslint/no-explicit-any */
import { PlaceListModel } from "../models/lists/placeListModel";
import { UserModel } from "../models/userModel";
import { Nation } from "../types/typNation";

export const sortByCreatedAt = (list: any[], ascending: boolean = true) => {
  return list.sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return ascending ? dateA - dateB : dateB - dateA;
  });
};

export const sortByLastVisit = (list: any[], ascending: boolean = true) => {
  return list.sort((a, b) => {
    const dateA = new Date(a.updatedAt).getTime();
    const dateB = new Date(b.updatedAt).getTime();
    return ascending ? dateA - dateB : dateB - dateA;
  });
};

export const sortByName = (
  list: { name: string }[],
  ascending: boolean = true,
): any[] => {
  return list.sort((a, b) => {
    const nameA = typeof a.name === "string" ? a.name : "";
    const nameB = typeof b.name === "string" ? b.name : "";
    return ascending ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
  });
};

export const sortByPlaces = (list: Nation[], ascending: boolean = true) => {
  return list.sort(function (a, b) {
    return ascending
      ? a.data.roleplay.places - b.data.roleplay.places
      : b.data.roleplay.places - a.data.roleplay.places;
  });
};

export const sortNationsByCitizens = (
  AList: Nation[],
  AAscending: boolean = true,
) => {
  return AList.sort((a, b) => {
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
  return list.sort(function (a, b) {
    return ascending
      ? a.data.roleplay.treasury - b.data.roleplay.treasury
      : b.data.roleplay.treasury - a.data.roleplay.treasury;
  });
};

export const sortByCredits = (list: UserModel[], ascending: boolean = true) => {
  return list.sort((a, b) => {
    return ascending ? a.credits - b.credits : b.credits - a.credits;
  });
};

export const sortPlacesByCitizen = (
  list: PlaceListModel,
  ascending: boolean = true,
) => {
  return list.getItems().sort(function (a, b) {
    return ascending
      ? list.getTotalPopulation(a) - list.getTotalPopulation(b)
      : list.getTotalPopulation(b) - list.getTotalPopulation(a);
  });
};
