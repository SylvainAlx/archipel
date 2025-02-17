import i18n from "../i18n/i18n";
import {
  createComFetch,
  deleteComFetch,
  readComFetch,
} from "../services/comService";
import { COM_TYPE } from "../settings/consts";
import { comListAtomV2, loadingAtom, myStore } from "../settings/store";
import { Com, ComPayload, emptyCom } from "../types/typCom";
import { errorCatching } from "../utils/displayInfos";
import { successMessage } from "../utils/toasts";
import { CommonModel } from "./commonModel";
import { ComListModel } from "./lists/comListModel";

export class ComModel extends CommonModel implements Com {
  _id!: string;
  origin?: string;
  destination?: string;
  title!: string;
  comType!: number;
  message!: string;
  read: boolean = false;

  constructor(data: Partial<ComModel | Com | ComPayload> = {}) {
    super();
    const defaultData = { ...emptyCom, ...data };
    this.updateFields(defaultData);
  }
  addToComList = (comList: ComListModel, com: Com) => {
    const updatedList = comList.addOrUpdate(com);
    return new ComListModel(updatedList);
  };
  updateFields(fields: Partial<ComModel>) {
    Object.assign(this, fields);
    return this;
  }
  getComTypeLabel = () => {
    return Object.values(COM_TYPE).find(
      (type) => type.id === this.comType && typeof type.id === "number",
    );
  };
  baseInsert = async () => {
    myStore.set(loadingAtom, true);
    try {
      const resp: { com: Com; infoType: string } = await createComFetch(this);
      this.updateFields(resp.com);
      this.displayComInfoByType(resp.infoType);
      myStore.get(comListAtomV2).addToComListAtom([resp.com]);
    } catch (error) {
      errorCatching(error);
    } finally {
      myStore.set(loadingAtom, false);
      return new ComModel(this);
    }
  };
  readCom = async (isRead: boolean) => {
    myStore.set(loadingAtom, true);
    try {
      const resp: { com: Com; infoType: string } = await readComFetch(
        this._id,
        isRead,
      );
      this.updateFields(resp.com);
      this.displayComInfoByType(resp.infoType);
      myStore.get(comListAtomV2).addToComListAtom([resp.com]);
    } catch (error) {
      errorCatching(error);
    } finally {
      myStore.set(loadingAtom, false);
    }
  };
  baseDelete = async (baseId: string) => {
    myStore.set(loadingAtom, true);
    try {
      const resp: { com: Com; infoType: string } = await deleteComFetch(baseId);
      this.updateFields(emptyCom);
      this.displayComInfoByType(resp.infoType);
      const updatedList = myStore
        .get(comListAtomV2)
        .removeByBaseId(resp.com._id);
      myStore.set(comListAtomV2, new ComListModel(updatedList));
    } catch (error) {
      errorCatching(error);
    } finally {
      myStore.set(loadingAtom, false);
      return new ComModel(this);
    }
  };
  displayComInfoByType = (type: string) => {
    switch (type) {
      case "201":
        successMessage(i18n.t("toasts.com.new"));
        break;
      case "delete":
        successMessage(i18n.t("toasts.com.delete"));
        break;
      default:
        break;
    }
  };
}
