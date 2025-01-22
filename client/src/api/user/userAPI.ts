import i18n from "../../i18n/i18n";
import {
  citizenFetchAtom,
  citizenListAtom,
  emptySession,
  loadingAtom,
  myStore,
  nationCitizenListAtom,
  nationFetchedAtom,
  recoveryKey,
  sessionAtom,
} from "../../settings/store";
import { EmptyNation, Nation } from "../../types/typNation";
import { Place } from "../../types/typPlace";
import {
  AuthPayload,
  ChangePasswordPayload,
  changeStatusPayload,
  emptyUser,
  RecoveryPayload,
  User,
} from "../../types/typUser";
import {
  updateOrCreateCitizenInMemory,
  updateOrCreateNationInMemory,
} from "../../utils/atomArrayFunctions";
import { displayUserInfoByType } from "../../utils/displayInfos";
import { findElementOfAtomArray, GET_JWT } from "../../utils/functions";
import { createComByStatus } from "../../utils/procedures";
import { successMessage } from "../../utils/toasts";
import {
  authGet,
  changePasswordFetch,
  changeStatusFetch,
  deleteUserFetch,
  getAllCitizensFetch,
  getNationCitizensFetch,
  getOneUserFetch,
  loginFetch,
  recoveryFetch,
  registerFetch,
  updateUserFetch,
  verifyCaptchaFetch,
} from "./userFetch";

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
          ...myStore.get(sessionAtom),
          user: data.user,
          jwt: data.jwt,
        });
      }
      displayUserInfoByType(data.infoType);
    })
    .catch((error) => {
      myStore.set(loadingAtom, false);
      displayUserInfoByType(error.infoType);
      console.error(error.message);
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
          myStore.set(sessionAtom, {
            ...myStore.get(sessionAtom),
            user: data.user,
            jwt,
          });
        } else {
          myStore.set(sessionAtom, emptySession);
          myStore.set(loadingAtom, false);
          localStorage.removeItem("jwt");
        }
        displayUserInfoByType(data.infoType);
      })
      .catch((error) => {
        console.error(error);
        myStore.set(sessionAtom, {
          ...myStore.get(sessionAtom),
          user: emptyUser,
        });
        myStore.set(loadingAtom, false);
        displayUserInfoByType(error.infoType);
      });
  } else {
    myStore.set(sessionAtom, { ...myStore.get(sessionAtom), user: emptyUser });
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
          ...myStore.get(sessionAtom),
          user: data.user,
          jwt: data.jwt,
        });
      }
      displayUserInfoByType(data.infoType);
    })
    .catch((error) => {
      myStore.set(loadingAtom, false);
      displayUserInfoByType(error.infoType);
      console.error(error);
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
      displayUserInfoByType(error.infoType);
      console.error(error);
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
      displayUserInfoByType(error.infoType);
      console.error(error);
    });
};

export const deleteUser = (password: string) => {
  myStore.set(loadingAtom, true);
  deleteUserFetch(password)
    .then((resp) => {
      myStore.set(loadingAtom, false);
      if (resp.infoType === "delete") {
        myStore.set(sessionAtom, emptySession);
        localStorage.removeItem("jwt");
      }
      displayUserInfoByType(resp.infoType);
      if (resp.nation != null) {
        updateOrCreateNationInMemory(resp.nation);
      }
    })
    .catch((error) => {
      myStore.set(loadingAtom, false);
      displayUserInfoByType(error.infoType);
      console.error(error);
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
        displayUserInfoByType(error.infoType);
        console.error(error);
      });
  }
  myStore.set(loadingAtom, false);
};

export const getNationCitizens = (nation: Nation) => {
  const savedNationCitizenList: User[] = [];
  myStore.get(citizenListAtom).forEach((citizen) => {
    if (citizen.citizenship.nationId === nation.officialId) {
      savedNationCitizenList.push(citizen);
    }
  });
  if (savedNationCitizenList.length > 0) {
    myStore.set(nationCitizenListAtom, savedNationCitizenList);
  } else {
    myStore.set(loadingAtom, true);
    getNationCitizensFetch(nation.officialId)
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
        displayUserInfoByType(error.infoType);
        console.error(error);
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
      displayUserInfoByType(error.infoType);
      console.error(error);
    });
};

export const updateUser = (payload: User) => {
  myStore.set(loadingAtom, true);
  updateUserFetch(payload)
    .then(
      (resp: {
        user: User;
        place: Place;
        oldPlace: Place;
        infoType: string;
      }) => {
        myStore.set(loadingAtom, false);
        if (resp.user) {
          myStore.set(citizenFetchAtom, resp.user);
          const session = myStore.get(sessionAtom);
          myStore.set(sessionAtom, {
            nation: session.nation,
            user: resp.user,
            jwt: session.jwt,
          });
          updateOrCreateCitizenInMemory(resp.user);
          displayUserInfoByType(resp.infoType);
        } else {
          displayUserInfoByType(resp.infoType);
        }
      },
    )
    .catch((error) => {
      console.error(error);
      myStore.set(loadingAtom, false);
      displayUserInfoByType(error.infoType);
    });
};

export const changeStatus = (payload: changeStatusPayload) => {
  myStore.set(loadingAtom, true);
  changeStatusFetch(payload)
    .then((resp: { user: User; nation: Nation; infoType: string }) => {
      myStore.set(loadingAtom, false);
      if (resp.user) {
        myStore.set(citizenFetchAtom, resp.user);
        myStore.set(nationFetchedAtom, resp.nation);
        updateOrCreateNationInMemory(resp.nation);
        updateOrCreateCitizenInMemory(resp.user);

        const session = myStore.get(sessionAtom);
        if (session.user.officialId === resp.user.officialId) {
          myStore.set(sessionAtom, {
            nation: session.nation,
            user: resp.user,
            jwt: session.jwt,
          });
        }
        getNationCitizens(resp.nation);
        displayUserInfoByType(resp.infoType);
        createComByStatus(resp.user.citizenship.status, resp.nation, resp.user);
      } else {
        displayUserInfoByType(resp.infoType);
      }
    })
    .catch((error) => {
      myStore.set(loadingAtom, false);
      displayUserInfoByType(error.infoType);
      console.error(error);
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
