import i18n from "../../i18n/i18n";
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
          title: i18n.t("coms.relationToAccept.title"),
          message: i18n.t("coms.relationToAccept.message"),
        });
        createNewCom({
          comType: COM_TYPE.userPrivate.id,
          origin: resp.relation.nations[0].OfficialId,
          destination: resp.relation.nations[0].AmbassadorId,
          title: i18n.t("coms.relationToWait.title"),
          message: i18n.t("coms.relationToWait.message"),
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
          title: i18n.t("coms.relationUpdate.title"),
          message: i18n.t("coms.relationUpdate.message"),
        });
        createNewCom({
          comType: COM_TYPE.nationPrivate.id,
          origin: resp.relation.nations[1].OfficialId,
          destination: resp.relation.nations[1].OfficialId,
          title: i18n.t("coms.relationUpdate.title"),
          message: i18n.t("coms.relationUpdate.message"),
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
