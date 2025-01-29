import i18n from "../i18n/i18n";
import {
  createNationFetch,
  DeleteSelfFetch,
  getAllNationTagsFetch,
  getOneNationFetch,
  updateNationFetch,
} from "../services/nationServices";
import { COM_TYPE } from "../settings/consts";
import {
  loadingAtom,
  myStore,
  nationListAtomV2,
  statsAtom,
} from "../settings/store";
import {
  EmptyNation,
  Hashtag,
  Nation,
  NewNationPayload,
} from "../types/typNation";
import { User } from "../types/typUser";
import { displayNationInfoByType, errorCatching } from "../utils/displayInfos";
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
  // private updateSessionAtom = (nation: Nation, user?: User) => {
  //   const session = myStore.get(sessionAtom);
  //   myStore.set(sessionAtom, {
  //     ...session,
  //     user: new UserModel(user) ?? session.user,
  //     nation: new NationModel(nation),
  //   });
  // };
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
      displayNationInfoByType(response.infoType);
      this.addToNationListAtom(response.nation);
      // this.updateSessionAtom(response.nation, response.user);
      const newCom = new ComModel({
        comType: COM_TYPE.userPrivate.id,
        origin: response.nation.officialId,
        destination: response.user.officialId,
        title: i18n.t("coms.nationCreate.title") + response.nation.name,
        message: i18n.t("coms.nationCreate.message"),
      });
      newCom.baseInsert();
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
      // this.updateSessionAtom(response.nation);
      displayNationInfoByType(response.infoType);
      // const session = myStore.get(sessionAtom);
      // myStore.set(sessionAtom, {
      //   ...session,
      //   nation: new NationModel(response.nation),
      // });
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
      // this.updateSessionAtom(new NationModel(), resp.user);
      const newCom = new ComModel({
        comType: COM_TYPE.userPrivate.id,
        origin: this.officialId,
        destination: resp.user.officialId,
        title: i18n.t("coms.nationDelete.title") + this.name,
        message: i18n.t("coms.nationDelete.message"),
      });
      newCom.baseInsert();
      this.updateFields(EmptyNation);
      displayNationInfoByType(resp.infoType);
    } catch (error) {
      errorCatching(error);
    } finally {
      myStore.set(loadingAtom, false);
      return new NationModel(this);
    }
  };
}
