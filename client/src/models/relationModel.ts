import i18n from "../i18n/i18n";
import {
  createRelationFetch,
  updateRelationFetch,
} from "../services/relationService";
import { COM_TYPE } from "../settings/consts";
import { loadingAtom, myStore, relationListAtomV2 } from "../settings/store";
import {
  DiplomaticRelationship,
  emptyDiplomaticRelationship,
  NationDiplomacyInfo,
  RelationKind,
} from "../types/typRelation";
import {
  displayRelationInfoByType,
  errorCatching,
} from "../utils/displayInfos";
import { ComModel } from "./comModel";
import { CommonModel } from "./commonModel";

export class RelationModel
  extends CommonModel
  implements DiplomaticRelationship
{
  name!: string;
  nations!: NationDiplomacyInfo[];
  kind!: RelationKind;

  constructor(data: Partial<DiplomaticRelationship> = {}) {
    super();
    const defaultData = { ...emptyDiplomaticRelationship, ...data };
    Object.assign(this, defaultData);
  }

  updateFields(fields: Partial<RelationModel | DiplomaticRelationship>) {
    Object.assign(this, fields);
    return this;
  }
  baseInsert = async (newRelation: RelationModel) => {
    myStore.set(loadingAtom, true);
    try {
      const resp: { relation: DiplomaticRelationship; infoType: string } =
        await createRelationFetch(newRelation);
      this.updateFields(resp.relation);
      myStore.get(relationListAtomV2).addToRelationListAtom([resp.relation]);
      displayRelationInfoByType(resp.infoType);
      const newCom1 = new ComModel({
        comType: COM_TYPE.userPrivate.id,
        origin: resp.relation.nations[1].OfficialId,
        destination: resp.relation.nations[1].AmbassadorId,
        title: i18n.t("coms.relationToAccept.title"),
        message: i18n.t("coms.relationToAccept.message"),
      });
      newCom1.baseInsert();
      const newCom2 = new ComModel({
        comType: COM_TYPE.userPrivate.id,
        origin: resp.relation.nations[0].OfficialId,
        destination: resp.relation.nations[0].AmbassadorId,
        title: i18n.t("coms.relationToWait.title"),
        message: i18n.t("coms.relationToWait.message"),
      });
      newCom2.baseInsert();
    } catch (error) {
      errorCatching(error);
    } finally {
      myStore.set(loadingAtom, false);
      return new RelationModel(this);
    }
  };
  baseUpdate = async (newRelation: RelationModel) => {
    myStore.set(loadingAtom, true);
    try {
      const resp: { relation: DiplomaticRelationship; infoType: string } =
        await updateRelationFetch(newRelation);
      this.updateFields(resp.relation);
      myStore.get(relationListAtomV2).addToRelationListAtom([resp.relation]);
      displayRelationInfoByType(resp.infoType);
      const newCom1 = new ComModel({
        comType: COM_TYPE.nationPrivate.id,
        origin: resp.relation.nations[0].OfficialId,
        destination: resp.relation.nations[0].OfficialId,
        title: i18n.t("coms.relationUpdate.title"),
        message: i18n.t("coms.relationUpdate.message"),
      });
      newCom1.baseInsert();
      const newCom2 = new ComModel({
        comType: COM_TYPE.nationPrivate.id,
        origin: resp.relation.nations[1].OfficialId,
        destination: resp.relation.nations[1].OfficialId,
        title: i18n.t("coms.relationUpdate.title"),
        message: i18n.t("coms.relationUpdate.message"),
      });
      newCom2.baseInsert();
    } catch (error) {
    } finally {
      myStore.set(loadingAtom, false);
    }
  };
}
