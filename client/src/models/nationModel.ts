import i18n from "../i18n/i18n";
import {
  createNationFetch,
  DeleteSelfFetch,
  getAllNationTagsFetch,
  getOneNationFetch,
  updateNationFetch,
} from "../services/nationService";
import { COM_TYPE } from "../settings/consts";
import {
  loadingAtom,
  myStore,
  nationListAtomV2,
  sessionAtom,
  statsAtom,
} from "../settings/store";
import {
  EmptyNation,
  Hashtag,
  Nation,
  NewNationPayload,
} from "../types/typNation";
import { User } from "../types/typUser";
import { errorCatching } from "../utils/displayInfos";
import { errorMessage, successMessage } from "../utils/toasts";
import { ComModel } from "./comModel";
import { CommonModel } from "./commonModel";
import { NationListModel } from "./lists/nationListModel";

export class NationModel extends CommonModel implements Nation {
  _id?: string | undefined;
  name!: string;
  owner!: string;
  data!: {
    url: {
      flag: string;
      coatOfArms: string;
      map: string;
      website: string;
      wiki: string;
      instagram: string;
      discord: string;
    };
    general: {
      motto: string;
      nationalDay: string;
      isNationState: boolean;
      regime: number;
      currency: string;
      tags: string[];
      description: string;
    };
    roleplay: {
      treasury: number;
      capital: string;
      citizens: number;
      places: number;
    };
  };

  constructor(data: Partial<Nation | NationModel | NewNationPayload> = {}) {
    super();
    const defaultData = { ...EmptyNation, ...data };
    Object.assign(this, defaultData);
  }

  loadNation = async (officialId: string) => {
    myStore.set(loadingAtom, true);
    try {
      const nation = myStore
        .get(nationListAtomV2)
        .getItems()
        .find((n) => n.officialId === officialId);
      if (nation) {
        this.updateFields(nation);
      } else {
        const response: Nation = await getOneNationFetch(officialId);
        this.updateFields(response);
      }
      this.addToNationListAtom(this);
    } catch (error) {
      errorCatching(error);
    } finally {
      myStore.set(loadingAtom, false);
      return new NationModel(this);
    }
  };
  getAllNationTags = async () => {
    myStore.set(loadingAtom, true);
    const inventory: Hashtag[] = [];
    try {
      const savedTags = myStore.get(statsAtom).tags;
      savedTags.forEach((tag) => {
        inventory.push({ label: tag.label, occurrence: tag.occurrence });
      });
      if (savedTags.length === 0) {
        const tags: { _id: string; occurrence: number }[] =
          await getAllNationTagsFetch();
        tags.forEach((tag) => {
          inventory.push({ label: tag._id, occurrence: tag.occurrence });
        });
        const updatedStats = { ...myStore.get(statsAtom) };
        updatedStats.tags = inventory;
        updatedStats.counts.tags = inventory.length;
        myStore.set(statsAtom, updatedStats);
      }
    } catch (error) {
      errorCatching(error);
    } finally {
      myStore.set(loadingAtom, false);
      return inventory;
    }
  };
  private addToNationListAtom = (nation: Nation) => {
    const updatedList = myStore.get(nationListAtomV2).addOrUpdate(nation);
    myStore.set(nationListAtomV2, new NationListModel(updatedList));
  };
  private removeFromNationListAtom = (nation: Nation) => {
    const updatedList = myStore
      .get(nationListAtomV2)
      .removeByOfficialId(nation.officialId);
    myStore.set(nationListAtomV2, new NationListModel(updatedList));
  };
  private updatenNationListAtom = (nation: Nation) => {
    const updatedList = myStore
      .get(nationListAtomV2)
      .updateItemByOfficialId(new NationModel(nation));
    myStore.set(nationListAtomV2, updatedList);
  };
  updateFields(fields: Partial<NationModel | Nation | NewNationPayload>) {
    Object.assign(this, fields);
    return this;
  }
  baseInsert = async () => {
    myStore.set(loadingAtom, true);
    try {
      const response: { nation: Nation; user: User; infoType: string } =
        await createNationFetch(this);
      this.updateFields(response.nation);
      this.displayNationInfoByType(response.infoType);
      this.addToNationListAtom(response.nation);
      myStore.get(sessionAtom).user.addOrUpdateUserListAtom(response.user);
      myStore.get(sessionAtom).user.updateSessionAtom(response.user);
      const newCom1 = new ComModel({
        comType: COM_TYPE.userPrivate.id,
        origin: response.nation.officialId,
        destination: response.user.officialId,
        title: i18n.t("coms.nationCreate.title") + response.nation.name,
        message: i18n.t("coms.nationCreate.message"),
      });
      newCom1.baseInsert();
      const newCom2 = new ComModel({
        comType: COM_TYPE.nationPrivate.id,
        origin: response.nation.officialId,
        destination: response.nation.officialId,
        title: i18n.t("coms.nationCreate.title") + response.nation.name,
        message: i18n.t("coms.nationCreate.message"),
      });
      newCom2.baseInsert();
    } catch (error) {
      errorCatching(error);
    } finally {
      myStore.set(loadingAtom, false);
      return new NationModel(this);
    }
  };
  baseUpdate = async () => {
    myStore.set(loadingAtom, true);
    try {
      const response: { nation: Nation; infoType: string } =
        await updateNationFetch(this);
      this.updateFields(response.nation);
      this.updatenNationListAtom(response.nation);
      this.displayNationInfoByType(response.infoType);
    } catch (error) {
      errorCatching(error);
    } finally {
      myStore.set(loadingAtom, false);
      return new NationModel(this);
    }
  };
  baseDelete = async () => {
    myStore.set(loadingAtom, true);
    try {
      const resp: { user: User; infoType: string } = await DeleteSelfFetch();
      this.removeFromNationListAtom(this);
      const newCom = new ComModel({
        comType: COM_TYPE.userPrivate.id,
        origin: this.officialId,
        destination: resp.user.officialId,
        title: i18n.t("coms.nationDelete.title") + this.name,
        message: i18n.t("coms.nationDelete.message"),
      });
      newCom.baseInsert();
      this.updateFields(EmptyNation);
      myStore.get(sessionAtom).user.addOrUpdateUserListAtom(resp.user);
      myStore.get(sessionAtom).user.updateSessionAtom(resp.user);
      this.displayNationInfoByType(resp.infoType);
    } catch (error) {
      errorCatching(error);
    } finally {
      myStore.set(loadingAtom, false);
      return new NationModel(this);
    }
  };
  displayNationInfoByType = (type: string) => {
    switch (type) {
      case "new":
        successMessage(i18n.t("toasts.nation.create"));
        break;
      case "miss":
        errorMessage(i18n.t("toasts.errors.miss"));
        break;
      case "unknown":
        errorMessage(i18n.t("toasts.errors.400"));
        break;
      case "forbidden":
        errorMessage(i18n.t("toasts.errors.forbidden"));
        break;
      case "11000":
        errorMessage(i18n.t("toasts.errors.11000"));
        break;
      case "update":
        successMessage(i18n.t("toasts.nation.update"));
        break;
      case "delete":
        successMessage(i18n.t("toasts.nation.delete"));
        break;
      case "400":
        errorMessage(i18n.t("toasts.errors.400"));
        break;
      case "404":
        errorMessage(i18n.t("toasts.errors.404"));
        break;
      case "500":
        errorMessage(i18n.t("toasts.errors.500"));
        break;
      default:
        break;
    }
  };
}
