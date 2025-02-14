import i18n from "../i18n/i18n";
import {
  authGet,
  changePasswordFetch,
  changeStatusFetch,
  deleteUserFetch,
  getOneUserFetch,
  loginFetch,
  recoveryFetch,
  registerFetch,
  transferCreditsFetch,
  updateUserFetch,
  verifyCaptchaFetch,
} from "../services/userService";
import { APP_NAME, COM_TYPE } from "../settings/consts";
import {
  confirmBox,
  emptySession,
  loadingAtom,
  myStore,
  nationListAtomV2,
  placeListAtomV2,
  recoveryKey,
  sessionAtom,
  userListAtomV2,
} from "../settings/store";
import { Nation } from "../types/typNation";
import { Place } from "../types/typPlace";
import {
  AuthPayload,
  ChangePasswordPayload,
  changeStatusPayload,
  emptyUser,
  Plans,
  RecoveryPayload,
  Roles,
  TranferCreditPayload,
  User,
} from "../types/typUser";
import { errorCatching } from "../utils/displayInfos";
import { GET_JWT, isNation } from "../utils/functions";
import { createComByStatus } from "../utils/procedures";
import { successMessage } from "../utils/toasts";
import { ComModel } from "./comModel";
import { CommonModel } from "./commonModel";
import { NationListModel } from "./lists/nationListModel";
import { UserListModel } from "./lists/userListModel";
import { NationModel } from "./nationModel";

export class UserModel extends CommonModel implements User {
  name!: string;
  bio!: string;
  gender!: number;
  avatar!: string;
  language!: string;
  religion!: number;
  password?: string;
  recovery?: string;
  email!: string;
  link!: string;
  role!: Roles;
  credits!: number;
  plan!: Plans;
  expirationDate!: string;
  citizenship!: {
    status: number;
    nationId: string;
    nationOwner: boolean;
    residence: string;
  };
  lastVisitDate!: Date;

  constructor(data: Partial<UserModel | User> = {}) {
    super();
    const defaultData = { ...emptyUser, ...data };
    Object.assign(this, defaultData);
  }
  addOrUpdateUserListAtom = (user: User) => {
    const updatedList = myStore.get(userListAtomV2).addOrUpdate(user);
    myStore.set(userListAtomV2, new UserListModel(updatedList));
  };
  private loadNationAndUpdateNationListAtom = async (
    nationOfficialId: string,
  ) => {
    let nation = new NationModel();
    nation = await nation.loadNation(nationOfficialId);
    const updatedList = myStore.get(nationListAtomV2).addOrUpdate(nation);
    myStore.set(nationListAtomV2, new NationListModel(updatedList));
  };
  authentification = async () => {
    const jwt = GET_JWT();
    myStore.set(loadingAtom, true);
    try {
      if (jwt) {
        const response: { user: User; lastVisitDate: Date; infoType: string } =
          await authGet(jwt);
        if (response.user != undefined) {
          const userToUpdate = {
            ...response.user,
            lastVisitDate: new Date(response.lastVisitDate),
          };
          myStore.set(sessionAtom, {
            ...myStore.get(sessionAtom),
            user: new UserModel(userToUpdate),
            jwt,
          });
          this.updateFields(userToUpdate);
          this.addOrUpdateUserListAtom(userToUpdate);
          if (response.user.citizenship.nationId != "") {
            this.loadNationAndUpdateNationListAtom(
              response.user.citizenship.nationId,
            );
          }
        } else {
          myStore.set(sessionAtom, emptySession);
          myStore.set(loadingAtom, false);
          localStorage.removeItem("jwt");
        }
        this.displayUserInfoByType(response.infoType);
      } else {
        myStore.set(sessionAtom, {
          ...myStore.get(sessionAtom),
          user: new UserModel(),
        });
      }
    } catch (error) {
      errorCatching(error);
    } finally {
      myStore.set(loadingAtom, false);
    }
  };
  login = async ({ name, password }: AuthPayload) => {
    myStore.set(loadingAtom, true);
    try {
      const response: {
        user: User;
        lastVisitDate: Date;
        jwt: string;
        infoType: string;
      } = await loginFetch({ name, password });
      if (response.user != undefined) {
        const userToUpdate = {
          ...response.user,
          lastVisitDate: new Date(response.lastVisitDate),
        };
        localStorage.setItem("jwt", response.jwt);
        myStore.set(sessionAtom, {
          ...myStore.get(sessionAtom),
          user: new UserModel(userToUpdate),
          jwt: response.jwt,
        });
      }
      this.displayUserInfoByType(response.infoType);
    } catch (error) {
      errorCatching(error);
    } finally {
      myStore.set(loadingAtom, false);
    }
  };
  logout = () => {
    myStore.set(sessionAtom, emptySession);
    localStorage.removeItem("jwt");
    this.updateSessionAtom(emptyUser, "");
    successMessage(i18n.t("toasts.user.logout"));
  };
  loadUser = async (officialId: string) => {
    myStore.set(loadingAtom, true);
    try {
      const user = myStore
        .get(userListAtomV2)
        .getItems()
        .find((u) => u.officialId === officialId);
      if (user) {
        this.updateFields(user);
      } else {
        const response: { user: User } = await getOneUserFetch(officialId);
        this.updateFields(response.user);
        this.addOrUpdateUserListAtom(response.user);
      }
    } catch (error) {
      errorCatching(error);
    } finally {
      myStore.set(loadingAtom, false);
      return new UserModel(this);
    }
  };
  updateSessionAtom = (user: User, jwt?: string) => {
    const session = myStore.get(sessionAtom);
    myStore.set(sessionAtom, {
      ...session,
      user: new UserModel(user),
      jwt: jwt ?? session.jwt,
    });
  };
  updateFields(fields: Partial<UserModel | User>) {
    Object.assign(this, fields);
    return this;
  }
  approveCitizenship = () => {
    myStore.set(confirmBox, {
      text: i18n.t("components.modals.confirmModal.approveCitizenship"),
      actionToDo: async () => {
        await this.changeStatus({
          officialId: this.officialId,
          nationId: this.citizenship.nationId,
          status: 1,
        });
      },
    });
  };
  declineCitizenship = () => {
    myStore.set(confirmBox, {
      text: i18n.t("components.modals.confirmModal.declineCitizenship"),
      actionToDo: async () => {
        await this.changeStatus({
          officialId: this.officialId,
          nationId: this.citizenship.nationId,
          status: -1,
        });
      },
    });
  };
  recoveryUser = async ({ name, recovery, password }: RecoveryPayload) => {
    myStore.set(loadingAtom, true);
    let isOk: boolean = false;
    try {
      const dataToSend = {
        name,
        recovery,
        newPassword: password,
      };
      const response = await recoveryFetch(dataToSend);
      this.displayUserInfoByType(response.infoType);
      isOk = true;
    } catch (error) {
      errorCatching(error);
    } finally {
      myStore.set(loadingAtom, false);
      return isOk;
    }
  };
  changePassword = async ({
    oldPassword,
    newPassword,
  }: ChangePasswordPayload) => {
    myStore.set(loadingAtom, true);
    try {
      const response = await changePasswordFetch({ oldPassword, newPassword });
      this.displayUserInfoByType(response.infoType);
    } catch (error) {
      errorCatching(error);
    } finally {
      myStore.set(loadingAtom, false);
    }
  };
  changeStatus = async (payload: changeStatusPayload) => {
    myStore.set(loadingAtom, true);
    try {
      const resp: { user: User; nation: Nation; infoType: string } =
        await changeStatusFetch(payload);
      this.updateFields(resp.user);
      // this.updateSessionAtom(resp.user);
      this.addOrUpdateUserListAtom(resp.user);
      myStore.get(nationListAtomV2).addToNationListAtom([resp.nation]);
      createComByStatus(resp.user.citizenship.status, resp.nation, resp.user);
      this.displayUserInfoByType(resp.infoType);
    } catch (error) {
      errorCatching(error);
    } finally {
      myStore.set(loadingAtom, false);
      return new UserModel(this);
    }
  };
  transferCredits = async (
    { recipientId, amount }: TranferCreditPayload,
    senderName: string,
    recipientName: string,
    comment: string,
  ) => {
    myStore.set(loadingAtom, true);
    try {
      const resp: {
        sender: User;
        recipientUser: User;
        recipientNation: Nation;
        infoType: string;
      } = await transferCreditsFetch({ recipientId, amount });
      this.updateFields(resp.sender);
      this.updateSessionAtom(resp.sender);
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
        comType: COM_TYPE.userPrivate.id,
        origin: this.officialId,
        destination: this.officialId,
        title: i18n.t("coms.creditTransfer.title"),
        message:
          senderName +
          " > " +
          recipientName +
          "  " +
          i18n.t("coms.creditTransfer.amount") +
          amount +
          "  " +
          i18n.t("coms.creditTransfer.comment") +
          comment,
      });
      newCom2.baseInsert();
      this.displayUserInfoByType(resp.infoType);
    } catch (error) {
      errorCatching(error);
    } finally {
      myStore.set(loadingAtom, false);
    }
  };
  verifyCaptcha = async (token: string | null): Promise<boolean> => {
    let result = false;
    myStore.set(loadingAtom, true);
    try {
      const resp = await verifyCaptchaFetch(token);
      result = resp.success;
    } catch (error) {
      console.error(error);
    } finally {
      myStore.set(loadingAtom, false);
    }
    return result;
  };
  baseInsert = async ({ name, password, gender, language }: AuthPayload) => {
    myStore.set(loadingAtom, true);
    try {
      const response: {
        user: User;
        jwt: string;
        recovery: string;
        infoType: string;
      } = await registerFetch({ name, password, gender, language });
      localStorage.setItem("jwt", response.jwt);
      myStore.set(recoveryKey, response.recovery);
      this.updateFields(response.user);
      this.updateSessionAtom(response.user, response.jwt);
      this.addOrUpdateUserListAtom(response.user);
      this.displayUserInfoByType(response.infoType);
      const newCom = new ComModel({
        comType: COM_TYPE.userPrivate.id,
        origin: response.user.officialId,
        destination: response.user.officialId,
        title: i18n.t("coms.register.title") + APP_NAME,
        message: i18n.t("coms.register.message"),
      });
      newCom.baseInsert();
    } catch (error) {
      errorCatching(error);
    } finally {
      myStore.set(loadingAtom, false);
      return new UserModel(this);
    }
  };
  baseUpdate = async () => {
    myStore.set(loadingAtom, true);
    try {
      const resp: {
        user: User;
        place: Place;
        oldPlace: Place;
        infoType: string;
      } = await updateUserFetch(this);
      this.updateFields(resp.user);
      this.updateSessionAtom(resp.user);
      this.addOrUpdateUserListAtom(resp.user);
      resp.place && myStore.get(placeListAtomV2).addOrUpdate(resp.place);
      resp.oldPlace && myStore.get(placeListAtomV2).addOrUpdate(resp.oldPlace);
      this.displayUserInfoByType(resp.infoType);
    } catch (error) {
      errorCatching(error);
    } finally {
      myStore.set(loadingAtom, false);
      return new UserModel(this);
    }
  };
  baseDelete = async (password: string) => {
    myStore.set(loadingAtom, true);
    try {
      const response = await deleteUserFetch(password);
      myStore.set(sessionAtom, emptySession);
      this.updateFields(emptyUser);
      localStorage.removeItem("jwt");
      this.displayUserInfoByType(response.infoType);
    } catch (error) {
      errorCatching(error);
    } finally {
      myStore.set(loadingAtom, false);
    }
  };
  displayUserInfoByType = (type: string) => {
    switch (type) {
      case "signin":
        successMessage(i18n.t("toasts.user.signIn"));
        break;
      case "signup":
        successMessage(i18n.t("toasts.user.signUp"));
        break;
      case "verify":
        successMessage(i18n.t("toasts.user.verify"));
        break;
      case "newPassword":
        successMessage(i18n.t("toasts.user.newPassword"));
        break;
      case "update":
        successMessage(i18n.t("toasts.user.update"));
        break;
      case "delete":
        successMessage(i18n.t("toasts.user.delete"));
        break;
      case "changeStatus":
        successMessage(i18n.t("toasts.user.update"));
        break;
      case "transfer":
        successMessage(i18n.t("toasts.creditTransferSuccess"));
        break;
      default:
        break;
    }
  };
}
