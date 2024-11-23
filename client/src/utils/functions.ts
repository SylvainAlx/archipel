/* eslint-disable @typescript-eslint/no-explicit-any */
import i18n from "../i18n/i18n";
import {
  MAX_LENGTH,
  placesTypeList,
  politicalSideList,
  regimeList,
  regimeTypeList,
} from "../settings/consts";
import { LabelId, Nation } from "../types/typNation";
import { Place } from "../types/typPlace";
import {
  confirmBox,
  myStore,
  nationPlacesListAtom,
  sessionAtom,
} from "../settings/store";
import { User } from "../types/typUser";
import { deleteFileAPIProps } from "../api/files/fileAPI";
import { updateNation } from "../api/nation/nationAPI";
import { updateUser } from "../api/user/userAPI";
import { updatePlace } from "../api/place/placeAPI";

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

export const findElementByDBId = (id: string, array: any[]) => {
  const element = array.find((objet) => objet._id === id);
  return element;
};

export const findElementsByName = (searchName: string, array: any[]) => {
  return array.filter((element) =>
    element.name.toLowerCase().includes(searchName.toLowerCase()),
  );
};

export const findNationsByTag = (searchTag: string, nations: Nation[]) => {
  return nations.filter((nation) =>
    nation.data.general.tags.some((tag) =>
      tag.toLowerCase().includes(searchTag.toLowerCase()),
    ),
  );
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

export async function getCachedImage(url: string): Promise<string | null> {
  const cached = localStorage.getItem(url);

  if (cached) {
    return cached;
  } else {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const reader = new FileReader();

      return new Promise((resolve, reject) => {
        reader.onloadend = () => {
          if (reader.result) {
            localStorage.setItem(url, reader.result as string);
            resolve(reader.result as string);
          } else {
            reject("Failed to read the image data");
          }
        };
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error("Failed to fetch image:", error);
      return null;
    }
  }
}

export const approveCitizenship = (citizen: User) => {
  const payload = {
    officialId: citizen.officialId,
    nationId: citizen.citizenship.nationId,
    status: 1,
  };
  myStore.set(confirmBox, {
    action: "changeStatus",
    text: i18n.t("components.modals.confirmModal.approveCitizenship"),
    result: "",
    payload,
  });
};

export const declineCitizenship = (citizen: User) => {
  const payload = {
    officialId: citizen.officialId,
    nationId: citizen.citizenship.nationId,
    status: -1,
  };
  myStore.set(confirmBox, {
    action: "changeStatus",
    text: i18n.t("components.modals.confirmModal.declineCitizenship"),
    result: "",
    payload,
  });
};

export const handleDeleteImage = ({ url, type }: deleteFileAPIProps) => {
  myStore.set(confirmBox, {
    action: "deleteFile",
    text: i18n.t("components.modals.confirmModal.deleteFile"),
    payload: url,
    result: "",
    target: type,
  });
};

export const getLabelIdArrayFromNationPlaceList = () => {
  const updatedPlaces: LabelId[] = [];
  const nationPlaces = myStore.get(nationPlacesListAtom);

  nationPlaces.forEach((place) => {
    if (place.type === 2) {
      const newPlace: LabelId = { id: place.officialId, label: place.name };
      updatedPlaces.push(newPlace);
    }
  });
  return updatedPlaces;
};

export const getTotalPopulation = (place: Place): number => {
  let total: number = 0;
  myStore.get(nationPlacesListAtom).forEach((e) => {
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
      return MAX_LENGTH.nationDescription;
    case "description":
      return MAX_LENGTH.placeDescription;
    case "bio":
      return MAX_LENGTH.userPresentation;
    default:
      return 0;
  }
};

export const updateElement = (
  destination: string,
  path: string,
  value: string,
  place?: Place,
) => {
  const session = myStore.get(sessionAtom);
  const parties: string[] = path.split(".");
  let isOk = true;
  let objetCourant;
  let dernierePartie;
  switch (destination) {
    case "nation":
      const updatedNation: any = { ...session.nation };
      objetCourant = updatedNation;
      for (let i = 0; i < parties.length - 1; i++) {
        if (typeof objetCourant === "object" && objetCourant !== null) {
          objetCourant = objetCourant[parties[i]];
        } else {
          isOk = false;
          console.error(
            `Chemin incorrect. Propriété ${parties[i]} non trouvée.`,
          );
          break;
        }
      }
      dernierePartie = parties[parties.length - 1];
      if (typeof objetCourant === "object" && objetCourant !== null) {
        objetCourant[dernierePartie] = value;
      }

      if (isOk) {
        updateNation(updatedNation);
      }

      break;
    case "citizen":
      // eslint-disable-next-line no-case-declarations
      const updatedUser: any = { ...session.user };
      objetCourant = updatedUser;
      for (let i = 0; i < parties.length - 1; i++) {
        if (typeof objetCourant === "object" && objetCourant !== null) {
          objetCourant = objetCourant[parties[i]];
        } else {
          isOk = false;
          console.error(
            `Chemin incorrect. Propriété ${parties[i]} non trouvée.`,
          );
          break;
        }
      }
      dernierePartie = parties[parties.length - 1];
      if (typeof objetCourant === "object" && objetCourant !== null) {
        objetCourant[dernierePartie] = value;
      }

      if (isOk) {
        updateUser(updatedUser);
      }

      break;
    case "place":
      // eslint-disable-next-line no-case-declarations
      const updatedPlace: any = { ...place };
      objetCourant = updatedPlace;
      for (let i = 0; i < parties.length - 1; i++) {
        if (typeof objetCourant === "object" && objetCourant !== null) {
          objetCourant = objetCourant[parties[i]];
        } else {
          isOk = false;
          console.error(
            `Chemin incorrect. Propriété ${parties[i]} non trouvée.`,
          );
          break;
        }
      }
      dernierePartie = parties[parties.length - 1];
      if (typeof objetCourant === "object" && objetCourant !== null) {
        objetCourant[dernierePartie] = value;
      }

      if (isOk) {
        updatePlace(updatedPlace);
      }
      break;
  }
};
