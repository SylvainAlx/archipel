import { COM_TYPE } from "../../settings/consts";
import { loadingAtom, myStore, relationListAtom } from "../../settings/store";
import { DiplomaticRelationship } from "../../types/typRelation";
import { updateOrCreateRelationInMemory } from "../../utils/atomArrayFunctions";
import { displayRelationInfoByType } from "../../utils/displayInfos";
import { createNewCom } from "../communication/comAPI";
import {
  createRelationFetch,
  getAllRelationsFetch,
  updateRelationFetch,
} from "./relationFetch";

export const createRelation = (payload: DiplomaticRelationship) => {
  myStore.set(loadingAtom, true);
  createRelationFetch(payload)
    .then((resp: { relation: DiplomaticRelationship; infoType: string }) => {
      if (resp.infoType === "new") {
        myStore.set(relationListAtom, [
          ...myStore.get(relationListAtom),
          resp.relation,
        ]);
        displayRelationInfoByType(resp.infoType);
        createNewCom({
          comType: COM_TYPE.userPrivate.id,
          origin: resp.relation.nations[1].OfficialId,
          destination: resp.relation.nations[1].AmbassadorId,
          title: "[A TRADUIRE] Diplomatie",
          message: "[A TRADUIRE] Demande de relation diplomatique à valider",
        });
        createNewCom({
          comType: COM_TYPE.userPrivate.id,
          origin: resp.relation.nations[0].OfficialId,
          destination: resp.relation.nations[0].AmbassadorId,
          title: "[A TRADUIRE] Diplomatie",
          message: "[A TRADUIRE] Demande de relation en attente d'approbation",
        });
      }
      myStore.set(loadingAtom, false);
    })
    .catch((error) => {
      myStore.set(loadingAtom, false);
      console.error(error);
      displayRelationInfoByType(error.infoType);
    });
};

export const updateRelation = (payload: DiplomaticRelationship) => {
  myStore.set(loadingAtom, true);
  updateRelationFetch(payload)
    .then((resp: { relation: DiplomaticRelationship; infoType: string }) => {
      if (resp.infoType === "update") {
        updateOrCreateRelationInMemory(resp.relation);
        displayRelationInfoByType(resp.infoType);
        createNewCom({
          comType: COM_TYPE.nationPrivate.id,
          origin: resp.relation.nations[0].OfficialId,
          destination: resp.relation.nations[0].OfficialId,
          title: "[A TRADUIRE] Diplomatie",
          message: "[A TRADUIRE] Mise à jour des relations diplomatiques",
        });
        createNewCom({
          comType: COM_TYPE.nationPrivate.id,
          origin: resp.relation.nations[1].OfficialId,
          destination: resp.relation.nations[1].OfficialId,
          title: "[A TRADUIRE] Diplomatie",
          message: "[A TRADUIRE] Mise à jour des relations diplomatiques",
        });
      }
      myStore.set(loadingAtom, false);
    })
    .catch((error) => {
      myStore.set(loadingAtom, false);
      console.error(error);
      displayRelationInfoByType(error.infoType);
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
        console.error(error);
        displayRelationInfoByType(error.infoType);
      });
  }
};
