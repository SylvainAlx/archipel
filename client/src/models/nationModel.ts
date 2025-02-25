import i18n from "../i18n/i18n";
import {
  createNationFetch,
  DeleteSelfFetch,
  getAllNationTagsFetch,
  getOneNationFetch,
  giveOwnershipFetch,
  transferCreditsFetch,
  updateNationFetch,
} from "../services/nationService";
import { COM_TYPE } from "../settings/consts";
import {
  loadingAtom,
  myStore,
  nationListAtomV2,
  sessionAtom,
  statsAtom,
  userListAtomV2,
} from "../settings/store";
import {
  EmptyNation,
  Hashtag,
  Nation,
  NewNationPayload,
  TranferCreditPayload,
} from "../types/typNation";
import { User } from "../types/typUser";
import { errorCatching } from "../utils/displayInfos";
import { isNation } from "../utils/functions";
import { successMessage } from "../utils/toasts";
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
  transferCredits = async (
    { nationOwnerId, recipientId, amount }: TranferCreditPayload,
    senderName: string,
    recipientName: string,
    comment: string,
  ) => {
    myStore.set(loadingAtom, true);
    try {
      const resp: {
        sender: Nation;
        recipientUser: User;
        recipientNation: Nation;
        infoType: string;
      } = await transferCreditsFetch({ nationOwnerId, recipientId, amount });
      this.updateFields(resp.sender);
      myStore.get(nationListAtomV2).addToNationListAtom([resp.sender]);
      if (resp.recipientNation) {
        myStore
          .get(nationListAtomV2)
          .addToNationListAtom([resp.recipientNation]);
      } else if (resp.recipientUser) {
        myStore.get(userListAtomV2).addToUserListAtom([resp.recipientUser]);
      }
      const newCom1 = new ComModel({
        comType: isNation(recipientId)
          ? COM_TYPE.nationPrivate.id
          : COM_TYPE.userPrivate.id,
        origin: this.officialId,
        destination: recipientId,
        title: i18n.t("coms.creditTransfer.title"),
        message:
          senderName +
          " > " +
          recipientName +
          i18n.t("coms.creditTransfer.amount") +
          amount +
          i18n.t("coms.creditTransfer.comment") +
          comment,
      });
      newCom1.baseInsert();
      const newCom2 = new ComModel({
        comType: COM_TYPE.nationPrivate.id,
        origin: this.officialId,
        destination: this.officialId,
        title: i18n.t("coms.creditTransfer.title"),
        message:
          senderName +
          " > " +
          recipientName +
          i18n.t("coms.creditTransfer.amount") +
          amount +
          i18n.t("coms.creditTransfer.comment") +
          comment,
      });
      newCom2.baseInsert();
      this.displayNationInfoByType(resp.infoType);
    } catch (error) {
      errorCatching(error);
    } finally {
      myStore.set(loadingAtom, false);
    }
  };
  giveOwnership = async (buyerOfficialId: string, password: string) => {
    myStore.set(loadingAtom, true);
    try {
      const resp: {
        seller: User;
        buyer: User;
        nation: Nation;
        infoType: string;
      } = await giveOwnershipFetch({
        nationOfficialId: this.officialId,
        sellerOfficialId: myStore.get(sessionAtom).user.officialId,
        buyerOfficialId,
        password,
      });
      this.updateFields(resp.nation);
      myStore.get(nationListAtomV2).addToNationListAtom([resp.nation]);
      myStore.get(userListAtomV2).addToUserListAtom([resp.seller]);
      myStore.get(userListAtomV2).addToUserListAtom([resp.buyer]);
      myStore.get(sessionAtom).user.updateSessionAtom(resp.seller);
      this.displayNationInfoByType(resp.infoType);
      const newCom1 = new ComModel({
        comType: COM_TYPE.userPrivate.id,
        origin: resp.nation.officialId,
        destination: resp.seller.officialId,
        title: i18n.t("coms.giveOwnership.title") + resp.nation.name,
        message:
          resp.seller.name +
          i18n.t("coms.giveOwnership.message") +
          resp.buyer.name,
      });
      newCom1.baseInsert();
      const newCom2 = new ComModel({
        comType: COM_TYPE.userPrivate.id,
        origin: resp.nation.officialId,
        destination: resp.buyer.officialId,
        title: i18n.t("coms.giveOwnership.title") + resp.nation.name,
        message:
          resp.seller.name +
          i18n.t("coms.giveOwnership.message") +
          resp.buyer.name,
      });
      newCom2.baseInsert();
      const newCom3 = new ComModel({
        comType: COM_TYPE.nationPrivate.id,
        origin: resp.nation.officialId,
        destination: resp.nation.officialId,
        title: i18n.t("coms.giveOwnership.title") + resp.nation.name,
        message:
          resp.seller.name +
          i18n.t("coms.giveOwnership.message") +
          resp.buyer.name,
      });
      newCom3.baseInsert();
    } catch (error) {
      errorCatching(error);
    } finally {
      myStore.set(loadingAtom, false);
      return new NationModel(this);
    }
  };
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
  baseDelete = async (password: string) => {
    myStore.set(loadingAtom, true);
    try {
      const resp: { user: User; infoType: string } =
        await DeleteSelfFetch(password);
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
      case "update":
        successMessage(i18n.t("toasts.nation.update"));
        break;
      case "delete":
        successMessage(i18n.t("toasts.nation.delete"));
        break;
      case "transfer":
        successMessage(i18n.t("toasts.creditTransferSuccess"));
        break;
      case "updateOnwership":
        successMessage("droits de gestion cédés");
        break;
      default:
        break;
    }
  };
}
