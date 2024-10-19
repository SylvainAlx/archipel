/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  citizenListAtom,
  myStore,
  nationsListAtom,
  placesListAtom,
  relationListAtom,
} from "../settings/store";
import { Nation } from "../types/typNation";
import { Place } from "../types/typPlace";
import { DiplomaticRelationship } from "../types/typRelation";
import { User } from "../types/typUser";
import { findElementOfAtomArray } from "./functions";

// _id MongoDB

export const spliceByDBId = (id: string, atoms: any[]) => {
  const tempArray: any[] = [...atoms];
  for (let i = 0; i < atoms.length; i++) {
    if (atoms[i]._id === id) {
      tempArray.splice(i, 1);
      break;
    }
  }
  return tempArray;
};

export const updateByDBId = (atom: any, atoms: any[]) => {
  const tempArray: any[] = [...atoms];
  for (let i = 0; i < atoms.length; i++) {
    if (atoms[i]._id === atom._id) {
      tempArray[i] = atom;
      break;
    }
  }
  return tempArray;
};

// officialId

export const spliceByOfficialId = (id: string, atoms: any[]) => {
  const tempArray: any[] = [...atoms];
  for (let i = 0; i < atoms.length; i++) {
    if (atoms[i].officialId === id) {
      tempArray.splice(i, 1);
      break;
    }
  }
  return tempArray;
};

export const updateByOfficialId = (element: any, atoms: any[]) => {
  const tempArray: any[] = [...atoms];
  for (let i = 0; i < atoms.length; i++) {
    if (atoms[i].officialId === element.officialId) {
      tempArray[i] = element;
      break;
    }
  }
  return tempArray;
};

export const updateOrCreateCitizenInMemory = (citizen: User) => {
  const savedUser = findElementOfAtomArray(
    citizen.officialId,
    myStore.get(citizenListAtom),
  );
  if (savedUser === undefined) {
    const tempArray = [...myStore.get(citizenListAtom)];
    tempArray.push(citizen);
    myStore.set(citizenListAtom, tempArray);
  } else {
    updateByOfficialId(citizen, myStore.get(citizenListAtom));
  }
};

export const updateOrCreateNationInMemory = (nation: Nation) => {
  const savedNation = findElementOfAtomArray(
    nation.officialId,
    myStore.get(nationsListAtom),
  );
  if (savedNation === undefined) {
    const tempArray = [...myStore.get(nationsListAtom)];
    tempArray.push(nation);
    myStore.set(nationsListAtom, tempArray);
  } else {
    updateByOfficialId(nation, myStore.get(nationsListAtom));
  }
};

export const updateOrCreatePlaceInMemory = (place: Place) => {
  const savedPlace = findElementOfAtomArray(
    place.officialId,
    myStore.get(placesListAtom),
  );
  if (savedPlace === undefined) {
    const tempArray = [...myStore.get(placesListAtom)];
    tempArray.push(place);
    myStore.set(placesListAtom, tempArray);
  } else {
    updateByOfficialId(place, myStore.get(placesListAtom));
  }
};

export const getNationRelationListFromMemory = (nationId: string) => {
  const relations: DiplomaticRelationship[] = [];
  myStore.get(relationListAtom).forEach((relation) => {
    relation.nations.forEach((nation) => {
      if (nation.OfficialId === nationId) {
        relations.push(relation);
      }
    });
  });
  return relations;
};
