import { createComFetch, deleteComFetch } from "../services/comServices";
import { comListAtomV2, loadingAtom, myStore } from "../settings/store";
import { Com, ComPayload, emptyCom } from "../types/typCom";
import { displayComInfoByType, errorCatching } from "../utils/displayInfos";
import { CommonModel } from "./commonModel";
import { ComListModel } from "./lists/comListModel";

export class ComModel extends CommonModel implements Com {
  _id!: string;
  origin?: string;
  destination?: string;
  title!: string;
  comType!: number;
  message!: string;

  constructor(data: Partial<ComModel | Com | ComPayload> = {}) {
    super();
    const defaultData = { ...emptyCom, ...data };
    this.updateFields(defaultData);
  }

  private addToComListAtom = (com: Com) => {
    const updatedList = myStore.get(comListAtomV2).addOrUpdate(com);
    myStore.set(comListAtomV2, new ComListModel(updatedList));
  };
  private removeFromComListAtom = (com: Com) => {
    const updatedList = myStore.get(comListAtomV2).removeByBaseId(com._id);
    myStore.set(comListAtomV2, new ComListModel(updatedList));
  };
  addToComList = (comList: ComListModel, com: Com) => {
    const updatedList = comList.addOrUpdate(com);
    return new ComListModel(updatedList);
  };
  updateFields(fields: Partial<ComModel>) {
    Object.assign(this, fields);
    return this;
  }
  baseInsert = async () => {
    myStore.set(loadingAtom, true);
    try {
      const resp: { com: Com; infoType: string } = await createComFetch(this);
      this.updateFields(resp.com);
      displayComInfoByType(resp.infoType);
      this.addToComListAtom(resp.com);
    } catch (error) {
      errorCatching(error);
    } finally {
      myStore.set(loadingAtom, false);
      return new ComModel(this);
    }
  };
  baseDelete = async (baseId: string) => {
    myStore.set(loadingAtom, true);
    try {
      const resp: { com: Com; infoType: string } = await deleteComFetch(baseId);
      this.updateFields(emptyCom);
      displayComInfoByType(resp.infoType);
      this.removeFromComListAtom(resp.com);
    } catch (error) {
      errorCatching(error);
    } finally {
      myStore.set(loadingAtom, false);
      return new ComModel(this);
    }
  };
}
