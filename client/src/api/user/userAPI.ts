import i18n from "../../i18n/i18n";
import {
  citizenFetchAtom,
  citizenListAtom,
  emptySession,
  loadingAtom,
  myStore,
  nationCitizenListAtom,
  recoveryKey,
  session,
  sessionAtom,
  statsAtom,
} from "../../settings/store";
import {
  AuthPayload,
  emptyUser,
  RecoveryPayload,
  User,
} from "../../types/typUser";
import {
  createElementOfAtomArray,
  displayUserInfoByType,
  findElementOfAtomArray,
  findNationCitizens,
  GET_JWT,
  updateElementOfAtomArray,
} from "../../utils/functions";
import { errorMessage, successMessage } from "../../utils/toasts";
import {
  authGet,
  DeleteUserFetch,
  getAllCitizensFetch,
  getCitizensCountFetch,
  getNationCitizensFetch,
  getOneUserFetch,
  loginFetch,
  RecoveryFetch,
  registerFetch,
} from "./userFetch";

const citizenList = myStore.get(citizenListAtom);
const setCitizenList = (list: User[]) => myStore.set(citizenListAtom, list);

export const getCitizensCount = async () => {
  const stats = myStore.get(statsAtom);
  myStore.set(loadingAtom, true);
  getCitizensCountFetch()
    .then((response) => {
      myStore.set(loadingAtom, false);
      const updatedStats = { ...stats };
      updatedStats.counts.citizens = response;
      myStore.set(statsAtom, updatedStats);
    })
    .catch((error) => {
      myStore.set(loadingAtom, false);
      myStore.set(loadingAtom, false);
      errorMessage(error.message);
    });
};

export const register = ({ name, password, language }: AuthPayload) => {
  myStore.set(loadingAtom, true);
  registerFetch({ name, password, language })
    .then((data) => {
      myStore.set(loadingAtom, false);
      if (data.user) {
        localStorage.setItem("jwt", data.jwt);
        myStore.set(recoveryKey, data.recovery);
        // myStore.set(nationsListAtom, [EmptyNation]);
        createElementOfAtomArray(data.user, citizenList, setCitizenList);
        myStore.set(sessionAtom, {
          ...session,
          user: data.user,
          jwt: data.jwt,
        });
      }
      displayUserInfoByType(data.infoType);
    })
    .catch((error) => {
      myStore.set(loadingAtom, false);
      displayUserInfoByType("error");
      console.log(error.message);
    });
};

export const authentification = () => {
  const jwt = GET_JWT();
  if (jwt) {
    myStore.set(loadingAtom, true);
    authGet(jwt)
      .then((data) => {
        myStore.set(loadingAtom, false);
        if (data.user != undefined) {
          updateElementOfAtomArray(data.user, citizenList, setCitizenList);
          myStore.set(sessionAtom, { ...session, user: data.user, jwt });
        } else {
          myStore.set(sessionAtom, emptySession);
          myStore.set(loadingAtom, false);
          localStorage.removeItem("jwt");
        }
        displayUserInfoByType(data.infoType);
      })
      .catch((error) => {
        myStore.set(sessionAtom, { ...session, user: emptyUser });
        myStore.set(loadingAtom, false);
        displayUserInfoByType("error");
        console.log(error);
      });
  } else {
    myStore.set(sessionAtom, { ...session, user: emptyUser });
  }
};

export const login = ({ name, password }: AuthPayload) => {
  myStore.set(loadingAtom, true);
  loginFetch({ name, password })
    .then((data) => {
      myStore.set(loadingAtom, false);
      if (data.user != undefined) {
        localStorage.setItem("jwt", data.jwt);
        myStore.set(sessionAtom, {
          ...session,
          user: data.user,
          jwt: data.jwt,
        });
      }
      displayUserInfoByType(data.infoType);
    })
    .catch((error) => {
      myStore.set(loadingAtom, false);
      displayUserInfoByType("error");
      console.log(error);
    });
};

export const logout = () => {
  myStore.set(sessionAtom, emptySession);
  localStorage.removeItem("jwt");
  successMessage(i18n.t("toasts.user.logout"));
};

export const recoveryUser = ({ name, recovery, password }: RecoveryPayload) => {
  myStore.set(loadingAtom, true);
  const dataToSend = {
    name,
    recovery,
    newPassword: password,
  };
  RecoveryFetch(dataToSend)
    .then((data) => {
      myStore.set(loadingAtom, false);
      displayUserInfoByType(data.infoType);
    })
    .catch((error) => {
      myStore.set(loadingAtom, false);
      displayUserInfoByType("error");
      console.log(error);
    });
};

export const deleteUser = () => {
  myStore.set(loadingAtom, true);
  DeleteUserFetch()
    .then((resp) => {
      myStore.set(loadingAtom, false);
      myStore.set(sessionAtom, emptySession);
      localStorage.removeItem("jwt");
      displayUserInfoByType(resp.infoType);
    })
    .catch((error) => {
      myStore.set(loadingAtom, false);
      displayUserInfoByType("error");
      console.log(error);
    });
};

export const getOneUser = (id: string) => {
  myStore.set(loadingAtom, true);
  const user = findElementOfAtomArray(id, citizenList);

  if (user === undefined || user === null) {
    getOneUserFetch(id)
      .then((data) => {
        myStore.set(loadingAtom, false);
        if (data.user) {
          myStore.set(citizenFetchAtom, data.user);
        }
      })
      .catch((error) => {
        myStore.set(loadingAtom, false);
        myStore.set(citizenFetchAtom, emptyUser);
        errorMessage(error.message);
      });
  }
};

export const getNationCitizens = (nationId: string) => {
  myStore.set(loadingAtom, true);
  let citizens = findNationCitizens(nationId, citizenList);

  if (citizens.length === 0) {
    getNationCitizensFetch(nationId).then((data) => {
      if (data.name != "") {
        citizens = data.users;
        myStore.set(nationCitizenListAtom, data);
      }
    });
  } else {
    myStore.set(nationCitizenListAtom, citizens);
  }

  myStore.set(loadingAtom, false);
};

export const getCitizens = (searchName: string) => {
  myStore.set(loadingAtom, true);
  getAllCitizensFetch(searchName)
    .then((data) => {
      myStore.set(loadingAtom, false);
      if (data != undefined) {
        myStore.set(citizenListAtom, data);
      }
    })
    .catch((error) => {
      myStore.set(loadingAtom, false);
      errorMessage(error.message);
    });
};
