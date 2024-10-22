import i18n from "../../i18n/i18n";
import {
  citizenFetchAtom,
  citizenListAtom,
  emptySession,
  loadingAtom,
  myStore,
  nationCitizenListAtom,
  nationFetchedAtom,
  nationsListAtom,
  recoveryKey,
  session,
  sessionAtom,
  statsAtom,
} from "../../settings/store";
import { EmptyNation } from "../../types/typNation";
import {
  AuthPayload,
  ChangePasswordPayload,
  changeStatusPayload,
  emptyUser,
  RecoveryPayload,
  User,
} from "../../types/typUser";
import {
  updateByOfficialId,
  updateOrCreateCitizenInMemory,
  updateOrCreateNationInMemory,
} from "../../utils/atomArrayFunctions";
import { displayUserInfoByType } from "../../utils/displayInfos";
import { findElementOfAtomArray, GET_JWT } from "../../utils/functions";
import { errorMessage, successMessage } from "../../utils/toasts";
import {
  authGet,
  changePasswordFetch,
  changeStatusFetch,
  deleteUserFetch,
  getAllCitizensFetch,
  getCitizensCountFetch,
  getNationCitizensFetch,
  getOneUserFetch,
  loginFetch,
  recoveryFetch,
  registerFetch,
  updateUserFetch,
  verifyCaptchaFetch,
} from "./userFetch";

export const getCitizensCount = () => {
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

export const register = ({ name, password, gender, language }: AuthPayload) => {
  myStore.set(loadingAtom, true);
  registerFetch({ name, password, gender, language })
    .then((data) => {
      myStore.set(loadingAtom, false);
      if (data.user) {
        localStorage.setItem("jwt", data.jwt);
        myStore.set(recoveryKey, data.recovery);
        updateOrCreateCitizenInMemory(data.user);
        myStore.set(citizenFetchAtom, data.user);
        myStore.set(nationFetchedAtom, EmptyNation);
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
      .then((data: { user: User; infoType: string }) => {
        myStore.set(loadingAtom, false);
        myStore.set(nationFetchedAtom, EmptyNation);
        if (data.user != undefined) {
          myStore.set(citizenFetchAtom, data.user);
          updateOrCreateCitizenInMemory(data.user);
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
        myStore.set(citizenFetchAtom, data.user);
        myStore.set(nationFetchedAtom, EmptyNation);
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
  myStore.set(citizenFetchAtom, emptyUser);
  myStore.set(nationFetchedAtom, EmptyNation);
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
  recoveryFetch(dataToSend)
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

export const changePassword = ({
  oldPassword,
  newPassword,
}: ChangePasswordPayload) => {
  myStore.set(loadingAtom, true);
  changePasswordFetch({ oldPassword, newPassword })
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
  deleteUserFetch()
    .then((resp) => {
      myStore.set(loadingAtom, false);
      myStore.set(sessionAtom, emptySession);
      localStorage.removeItem("jwt");
      displayUserInfoByType(resp.infoType);
      if (resp.nation != null) {
        const tempArray = updateByOfficialId(
          resp.nation,
          myStore.get(nationsListAtom),
        );
        myStore.set(nationsListAtom, tempArray);
      }
    })
    .catch((error) => {
      myStore.set(loadingAtom, false);
      displayUserInfoByType("error");
      console.log(error);
    });
};

export const getOneUser = (id: string) => {
  myStore.set(loadingAtom, true);
  const user = findElementOfAtomArray(id, myStore.get(citizenListAtom));

  if (user === undefined || user === null) {
    getOneUserFetch(id)
      .then((data) => {
        if (data.user) {
          updateOrCreateCitizenInMemory(data.user);
          myStore.set(citizenFetchAtom, data.user);
        }
      })
      .catch((error) => {
        myStore.set(citizenFetchAtom, emptyUser);
        errorMessage(error.message);
      });
  }
  myStore.set(loadingAtom, false);
};

export const getNationCitizens = (nationId: string) => {
  const savedNationCitizenList: User[] = [];
  myStore.get(citizenListAtom).forEach((citizen) => {
    if (citizen.citizenship.nationId === nationId) {
      savedNationCitizenList.push(citizen);
    }
  });
  if (savedNationCitizenList.length > 0) {
    myStore.set(nationCitizenListAtom, savedNationCitizenList);
  } else {
    myStore.set(loadingAtom, true);
    getNationCitizensFetch(nationId)
      .then((resp: User[]) => {
        myStore.set(loadingAtom, false);
        myStore.set(nationCitizenListAtom, resp);
        if (resp.length > 0) {
          resp.forEach((place) => {
            updateOrCreateCitizenInMemory(place);
          });
        }
      })
      .catch((error) => {
        myStore.set(loadingAtom, false);
        errorMessage(error.message);
      });
  }
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

export const updateUser = (payload: User) => {
  myStore.set(loadingAtom, true);
  updateUserFetch(payload)
    .then((resp) => {
      myStore.set(loadingAtom, false);
      if (resp.user) {
        myStore.set(citizenFetchAtom, resp.user);
        myStore.set(sessionAtom, { ...session, user: resp.user });
        updateOrCreateCitizenInMemory(resp.user);
        displayUserInfoByType("update");
      } else {
        displayUserInfoByType("error");
      }
    })
    .catch((error) => {
      myStore.set(loadingAtom, false);
      errorMessage(error.message);
    });
};

export const changeStatus = (payload: changeStatusPayload) => {
  myStore.set(loadingAtom, true);
  changeStatusFetch(payload)
    .then((resp) => {
      myStore.set(loadingAtom, false);
      if (resp.user) {
        myStore.set(citizenFetchAtom, resp.user);
        myStore.set(nationFetchedAtom, resp.nation);
        updateOrCreateNationInMemory(resp.nation);
        updateOrCreateCitizenInMemory(resp.user);
        getNationCitizens(payload.nationId);
        displayUserInfoByType("changeStatus");
      } else {
        displayUserInfoByType("error");
      }
    })
    .catch((error) => {
      myStore.set(loadingAtom, false);
      errorMessage(error.message);
    });
};

export const verifyCaptcha = async (token: string | null): Promise<boolean> => {
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
