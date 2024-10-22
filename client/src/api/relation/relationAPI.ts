import { loadingAtom, myStore, relationListAtom } from "../../settings/store";
import { DiplomaticRelationship } from "../../types/typRelation";
import { updateOrCreateRelationInMemory } from "../../utils/atomArrayFunctions";
import { displayRelationInfoByType } from "../../utils/displayInfos";
import { errorMessage } from "../../utils/toasts";
import {
  createRelationFetch,
  getAllRelationsFetch,
  updateRelationFetch,
} from "./relationFetch";

export const createRelation = (payload: DiplomaticRelationship) => {
  myStore.set(loadingAtom, true);
  createRelationFetch(payload)
    .then((resp: { relation: DiplomaticRelationship; infoType: string }) => {
      if (resp.relation) {
        myStore.set(relationListAtom, [
          ...myStore.get(relationListAtom),
          resp.relation,
        ]);
        displayRelationInfoByType(resp.infoType);
      }
      myStore.set(loadingAtom, false);
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
    .then((resp: { relation: DiplomaticRelationship; infoType: string }) => {
      if (resp.relation) {
        updateOrCreateRelationInMemory(resp.relation);
        displayRelationInfoByType(resp.infoType);
      }
      myStore.set(loadingAtom, false);
    })
    .catch((error) => {
      myStore.set(loadingAtom, false);
      displayRelationInfoByType(error.infoType);
      errorMessage(error.message);
    });
};

export const getRelations = () => {
  const relations = myStore.get(relationListAtom);
  if (relations.length === 0) {
    myStore.set(loadingAtom, true);
    getAllRelationsFetch("")
      .then((resp: DiplomaticRelationship[]) => {
        myStore.set(loadingAtom, false);
        if (resp != undefined) {
          myStore.set(relationListAtom, resp);
        }
      })
      .catch((error) => {
        myStore.set(loadingAtom, false);
        displayRelationInfoByType(error.infoType);
        errorMessage(error.message);
      });
  }
};
