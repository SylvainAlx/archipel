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
  updateUserFetch,
  verifyCaptchaFetch,
} from "../services/userService";
import {
  emptySession,
  loadingAtom,
  myStore,
  nationListAtomV2,
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
  User,
} from "../types/typUser";
import { displayUserInfoByType, errorCatching } from "../utils/displayInfos";
import { GET_JWT } from "../utils/functions";
import { createComByStatus } from "../utils/procedures";
import { successMessage } from "../utils/toasts";
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

  constructor(data: Partial<UserModel | User> = {}) {
    super();
    const defaultData = { ...emptyUser, ...data };
    Object.assign(this, defaultData);
  }
  private addOrUpdateUserListAtom = (user: User) => {
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
        const response: { user: User; infoType: string } = await authGet(jwt);
        if (response.user != undefined) {
          myStore.set(sessionAtom, {
            ...myStore.get(sessionAtom),
            user: new UserModel(response.user),
            jwt,
          });
          this.addOrUpdateUserListAtom(response.user);
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
        displayUserInfoByType(response.infoType);
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
      const response: { user: User; jwt: string; infoType: string } =
        await loginFetch({ name, password });
      if (response.user != undefined) {
        localStorage.setItem("jwt", response.jwt);
        myStore.set(sessionAtom, {
          ...myStore.get(sessionAtom),
          user: new UserModel(response.user),
          jwt: response.jwt,
        });
      }
      displayUserInfoByType(response.infoType);
    } catch (error) {
      errorCatching(error);
    } finally {
      myStore.set(loadingAtom, false);
    }
  };
  logout = () => {
    myStore.set(sessionAtom, emptySession);
    localStorage.removeItem("jwt");
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
  private updateSessionAtom = (user: User, jwt?: string) => {
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
      displayUserInfoByType(response.infoType);
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
      displayUserInfoByType(response.infoType);
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
      this.updateSessionAtom(resp.user);
      this.addOrUpdateUserListAtom(resp.user);
      createComByStatus(resp.user.citizenship.status, resp.nation, resp.user);
      displayUserInfoByType(resp.infoType);
    } catch (error) {
      errorCatching(error);
    } finally {
      myStore.set(loadingAtom, false);
      return new UserModel(this);
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
      displayUserInfoByType(response.infoType);
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
      displayUserInfoByType(resp.infoType);
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
      displayUserInfoByType(response.infoType);
    } catch (error) {
      errorCatching(error);
    } finally {
      myStore.set(loadingAtom, false);
    }
  };
}
