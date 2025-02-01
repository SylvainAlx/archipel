/* eslint-disable @typescript-eslint/no-explicit-any */
import i18n from "../i18n/i18n";
import { APP_NAME, COM_TYPE, MAX_LENGTH, PLACE_TYPE } from "../settings/consts";
import { LabelId, Nation } from "../types/typNation";
import { Place } from "../types/typPlace";
import { languageList, regimeList, regimeTypeList } from "../settings/lists";
import { NationModel } from "../models/nationModel";
import { PlaceListModel } from "../models/lists/placeListModel";

export const GET_JWT = () => {
  const jwt = localStorage.getItem("jwt");
  return jwt;
};

export const GET_LAST_WATCH = (param: string) => {
  const date = localStorage.getItem(param);
  if (date) {
    return new Date(date);
  } else {
    return null;
  }
};

export const findElementOfAtomArray = (id: string, atom: any[]) => {
  const element = atom.find((objet) => objet.officialId === id);
  return element;
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
  const foundType = Object.values(PLACE_TYPE).find((type) => type.id === id);
  return foundType ? foundType.label : "";
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

export const getLabelIdArrayFromNationPlaceList = (
  placeList: PlaceListModel,
) => {
  const updatedPlaces: LabelId[] = [];

  placeList.getItems().forEach((place) => {
    if (place.type === 2) {
      const newPlace: LabelId = { id: place.officialId, label: place.name };
      updatedPlaces.push(newPlace);
    }
  });
  return updatedPlaces;
};

export const getTotalPopulation = (
  placeList: PlaceListModel,
  place: Place,
): number => {
  let total: number = 0;
  placeList.getItems().forEach((e) => {
    if (e.parentId === place.officialId) {
      total += e.population;
    }
  });
  return total + place.population;
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

export const isDateLessThanOneMonthOld = (Adate: Date) => {
  const dateATester = new Date(Adate);
  const dateActuelle = new Date();
  const dateIlYAUnMois = new Date();
  dateIlYAUnMois.setMonth(dateActuelle.getMonth() - 1);
  return dateATester > dateIlYAUnMois;
};

export const getComTypeLabelById = (id: number) => {
  let label: string | null = null;
  Object.values(COM_TYPE).forEach((type) => {
    if (type.id === id && typeof type.id === "number") {
      label = type.label;
    }
  });
  return label;
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
