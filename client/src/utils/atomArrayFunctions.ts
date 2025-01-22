/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  citizenListAtom,
  myStore,
  nationsListAtom,
  relationListAtom,
  tileListAtom,
} from "../settings/store";
import { Nation } from "../types/typNation";
import { UpdateByOfficialIdProps } from "../types/typProp";
import { DiplomaticRelationship } from "../types/typRelation";
import { Tile } from "../types/typTile";
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

export const updateByDBId = (element: any, array: any[]): any[] => {
  const tempArray: any[] = [...array];
  for (let i = 0; i < array.length; i++) {
    if (array[i]._id === element._id) {
      tempArray[i] = element;
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

export const getUpdateByOfficialId = ({
  element,
  array,
}: UpdateByOfficialIdProps) => {
  const tempArray: any[] = [...array];
  for (let i = 0; i < array.length; i++) {
    if (array[i].officialId === element.officialId) {
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
    myStore.set(
      citizenListAtom,
      getUpdateByOfficialId({
        element: citizen,
        array: myStore.get(citizenListAtom),
      }),
    );
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
    myStore.set(
      nationsListAtom,
      getUpdateByOfficialId({
        element: nation,
        array: myStore.get(nationsListAtom),
      }),
    );
  }
};

export const updateOrCreateTileInMemory = (tile: Tile) => {
  const savedTile = findElementOfAtomArray(
    tile.nationOfficialId,
    myStore.get(tileListAtom),
  );
  if (savedTile === undefined) {
    const tempArray = [...myStore.get(tileListAtom)];
    tempArray.push(tile);
    myStore.set(tileListAtom, tempArray);
  } else {
    myStore.set(tileListAtom, updateByDBId(tile, myStore.get(tileListAtom)));
  }
};

export const updateOrCreateRelationInMemory = (
  relation: DiplomaticRelationship,
) => {
  const savedRelation = findElementOfAtomArray(
    relation.officialId,
    myStore.get(relationListAtom),
  );
  if (savedRelation === undefined) {
    const tempArray = [...myStore.get(relationListAtom)];
    tempArray.push(relation);
    myStore.set(relationListAtom, tempArray);
  } else {
    myStore.set(
      relationListAtom,
      getUpdateByOfficialId({
        element: relation,
        array: myStore.get(relationListAtom),
      }),
    );
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
