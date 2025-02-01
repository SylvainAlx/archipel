/* eslint-disable @typescript-eslint/no-explicit-any */

import { myStore, relationListAtom } from "../settings/store";
import { UpdateByOfficialIdProps } from "../types/typProp";
import { DiplomaticRelationship } from "../types/typRelation";
import { findElementOfAtomArray } from "./functions";

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
