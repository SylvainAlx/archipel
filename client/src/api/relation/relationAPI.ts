import { loadingAtom, myStore, relationListAtom } from "../../settings/store";
import { DiplomaticRelationship } from "../../types/typRelation";
import {
  getNationRelationListFromMemory,
  updateOrCreateRelationInMemory,
} from "../../utils/atomArrayFunctions";
import { displayRelationInfoByType } from "../../utils/displayInfos";
import {
  createElementOfAtomArray,
  updateElementOfAtomArray,
} from "../../utils/functions";
import { errorMessage } from "../../utils/toasts";
import {
  createRelationFetch,
  getAllRelationsFetch,
  updateRelationFetch,
} from "./relationFetch";

const relationList = myStore.get(relationListAtom);
const setRelationList = (list: DiplomaticRelationship[]) =>
  myStore.set(relationListAtom, list);

export const createRelation = (payload: DiplomaticRelationship) => {
  myStore.set(loadingAtom, true);
  createRelationFetch(payload)
    .then((data) => {
      myStore.set(loadingAtom, false);
      if (data.relation) {
        createElementOfAtomArray(data.relation, relationList, setRelationList);
        displayRelationInfoByType(data.infoType);
      }
    })
    .catch((error) => {
      myStore.set(loadingAtom, false);
      displayRelationInfoByType(error.infoType);
      errorMessage(error.message);
    });
};

export const updateRelation = (payload: DiplomaticRelationship) => {
  myStore.set(loadingAtom, true);
  updateRelationFetch(payload)
    .then((data) => {
      myStore.set(loadingAtom, false);
      if (data.relation) {
        updateElementOfAtomArray(data.relation, relationList, setRelationList);
        displayRelationInfoByType(data.infoType);
      }
    })
    .catch((error) => {
      myStore.set(loadingAtom, false);
      displayRelationInfoByType(error.infoType);
      errorMessage(error.message);
    });
};

export const getRelations = (nationId: string) => {
  myStore.set(loadingAtom, true);
  const relations = getNationRelationListFromMemory(nationId);
  if (relations.length > 0) {
    relations.forEach((element) => {
      updateOrCreateRelationInMemory(element);
    });
    // myStore.set(relationListAtom, relations);
    myStore.set(loadingAtom, false);
  } else {
    getAllRelationsFetch(nationId)
      .then((data: DiplomaticRelationship[]) => {
        myStore.set(loadingAtom, false);
        if (data != undefined) {
          data.forEach((element) => {
            updateOrCreateRelationInMemory(element);
          });
          // myStore.set(relationListAtom, data);
        }
      })
      .catch((error) => {
        myStore.set(loadingAtom, false);
        displayRelationInfoByType(error.infoType);
        errorMessage(error.message);
      });
  }
};
