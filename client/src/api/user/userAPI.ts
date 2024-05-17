import { citizenFetchAtom, citizenListAtom, emptySession, infoModalAtom, loadingAtom, myStore, recoveryKey, session, sessionAtom } from "../../settings/store";
import { AuthPayload, emptyUser, RecoveryPayload, User } from "../../types/typUser";
import { createElementOfAtomArray, displayUserInfoByType, findElementOfAtomArray, GET_JWT, updateElementOfAtomArray } from "../../utils/functions";
import { authGet, DeleteUserFetch, getOneUserFetch, loginFetch, RecoveryFetch, registerFetch } from "./userFetch";
import { errorMessage, signInOk, logoutOk, signUpOK, saveOk } from "../../utils/toasts";

const citizenList = myStore.get(citizenListAtom)
const setCitizenList = (list: User[]) => myStore.set(citizenListAtom, list);

export const register = ({ name, password }: AuthPayload) => {
  myStore.set(loadingAtom, true);
  registerFetch({ name, password })
    .then((data) => {
      
      if (data.user) {
        localStorage.setItem("jwt", data.jwt);
        myStore.set(recoveryKey, data.recovery);
        // myStore.set(nationsListAtom, [EmptyNation]);
        createElementOfAtomArray(data.user, citizenList, setCitizenList)
        myStore.set(sessionAtom, {...session, user:data.user, jwt:data.jwt})
      myStore.set(loadingAtom, false);
      signUpOK()
      } else {
        myStore.set(loadingAtom, false);
        errorMessage( "création impossible : " + data.message)
        // myStore.set(infoModalAtom, "création impossible : " + data.message);
      }
    })
    .catch((error) => {
      myStore.set(loadingAtom, false);
      errorMessage(error.message)
      // myStore.set(infoModalAtom, error.message);
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
          updateElementOfAtomArray(data.user, citizenList, setCitizenList)
          myStore.set(sessionAtom, {...session, user: data.user, jwt})      
          signInOk()  
        } else {
          myStore.set(sessionAtom, emptySession);
          myStore.set(loadingAtom, false);
          localStorage.removeItem("jwt");
        }
      })
      .catch((error) => {
        myStore.set(sessionAtom, {...session, user:emptyUser})
        myStore.set(loadingAtom, false);
        errorMessage(error.message)
      });
  } else {
    myStore.set(sessionAtom, {...session, user:emptyUser})
  }
};

export const login = ({ name, password }: AuthPayload) => {
  myStore.set(loadingAtom, true);
  loginFetch({ name, password })
    .then((data) => {
      myStore.set(loadingAtom, false);
      if (data.user != undefined) {
        localStorage.setItem("jwt", data.jwt);
        myStore.set(sessionAtom, {...session, user:data.user, jwt:data.jwt})
      }
      displayUserInfoByType(data.infoType)
    })
    .catch((error) => {
      myStore.set(loadingAtom, false);
      displayUserInfoByType("error")
      console.log(error);
    });
};

export const logout = () => {
  myStore.set(sessionAtom, emptySession)
  localStorage.removeItem("jwt");
  logoutOk()
};

export const recoveryUser = ({
  name,
  recovery,
  password,
}: RecoveryPayload) => {
  myStore.set(loadingAtom, true);
  const dataToSend = {
    name,
    recovery,
    newPassword: password,
  };
  RecoveryFetch(dataToSend)
    .then(() => {
      myStore.set(loadingAtom, false);
      saveOk()
    })
    .catch((error) => {
      myStore.set(loadingAtom, false);
      errorMessage(error.message)
      // myStore.set(error.message);
    });
};

export const deleteUser = () => {
  myStore.set(loadingAtom, true);
  DeleteUserFetch()
    .then((resp) => {
      myStore.set(loadingAtom, false);
      myStore.set(sessionAtom, emptySession)
      // myStore.set(userAtom, emptyUser);
      // myStore.set(isLoggedAtom, "");
      // myStore.set(selectedNationAtom, EmptyNation);
      // myStore.set(nationAtom, EmptyNation);
      localStorage.removeItem("jwt");
      myStore.set(infoModalAtom, resp.message);
    })
    .catch((error) => {
      myStore.set(loadingAtom, false);
      myStore.set(infoModalAtom, error.message);
    });
};

export const getOneUser = (id: string) => {
  myStore.set(loadingAtom, true);
  const user = findElementOfAtomArray(id, citizenList)
  
  if (user === undefined || user === null) {
    getOneUserFetch(id)
    .then((data) => {
      myStore.set(loadingAtom, false);
      if (data.user) {
        myStore.set(citizenFetchAtom, data.user)
      }
    })
    .catch((error) => {
      myStore.set(loadingAtom, false);
      myStore.set(citizenFetchAtom, emptyUser)
      myStore.set(infoModalAtom, error.message);
    });
  }
};