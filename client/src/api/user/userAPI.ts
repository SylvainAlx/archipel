import { emptySession, infoModalAtom, loadingAtom, myStore, nationsListAtom, recoveryKey, session, sessionAtom, userAtom } from "../../settings/store";
import { EmptyNation } from "../../types/typNation";
import { AuthPayload, emptyUser, RecoveryPayload } from "../../types/typUser";
import { GET_JWT } from "../../utils/functions";
import { authGet, DeleteUserFetch, getOneUserFetch, loginFetch, RecoveryFetch, registerFetch } from "./userFetch";

export const register = ({ name, password }: AuthPayload) => {
  myStore.set(loadingAtom, true);
  registerFetch({ name, password })
    .then((data) => {
      
      if (data.user) {
        localStorage.setItem("jwt", data.jwt);
        myStore.set(recoveryKey, data.recovery);
        myStore.set(nationsListAtom, [EmptyNation]);
        myStore.set(sessionAtom, {...session, user:data.user, jwt:data.jwt})
        // myStore.set(userAtom, {
        //   officialId: data.user.officialId,
        //   name: data.user.name,
        //   surname: data.user.surname,
        //   avatar: data.user.avatar,
        //   password: data.user.password,
        //   recovery: data.user.recovery,
        //   role: data.user.role,
        //   citizenship: data.user.citizenship,
        //   createdAt: data.user.createdAt
        // })
      // myStore.set(isLoggedAtom, data.user.officialId)
      myStore.set(loadingAtom, false);
      } else {
        myStore.set(loadingAtom, false);
        myStore.set(infoModalAtom, "création impossible : " + data.message);
      }
    })
    .catch((error) => {
      myStore.set(loadingAtom, false);
      myStore.set(infoModalAtom, error.message);
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
          
          myStore.set(sessionAtom, {...session, user: data.user, jwt})
          // myStore.set(isLoggedAtom, data.user.officialId)
          // myStore.set(userAtom, {
          //   officialId: data.user.officialId,
          //   name: data.user.name,
          //   surname: data.user.surname,
          //   avatar: data.user.avatar,
          //   role: data.user.role,
          //   citizenship: data.user.citizenship,
          //   createdAt: data.user.createdAt
          // })
          
        } else {
          myStore.set(sessionAtom, emptySession);
          // myStore.set(userAtom, emptyUser);
          myStore.set(loadingAtom, false);
          localStorage.removeItem("jwt");
        }
      })
      .catch((error) => {
        myStore.set(userAtom, emptyUser);
        myStore.set(loadingAtom, false);
        console.log(error);
      });
  } else {
    myStore.set(userAtom, emptyUser);
  }
};

export const login = ({ name, password }: AuthPayload) => {
  myStore.set(loadingAtom, true);
  loginFetch({ name, password })
    .then((data) => {
      myStore.set(loadingAtom, false);
      myStore.set(infoModalAtom, data.message);
      if (data.user.name != undefined) {
        localStorage.setItem("jwt", data.jwt);
        myStore.set(sessionAtom, {...session, user:data.user, jwt:data.jwt})
        // myStore.set(userAtom, {
        //   officialId: data.user.officialId,
        //   name: data.user.name,
        //   surname: data.user.surname,
        //   avatar: data.user.avatar,
        //   role: data.user.role,
        //   citizenship: data.user.citizenship,
        //   createdAt: data.user.createdAt
        // })
        // myStore.set(isLoggedAtom, data.user.officialId)
      } else {
        myStore.set(loadingAtom, false);
      }
    })
    .catch((error) => {
      myStore.set(loadingAtom, false);
      console.log(error.message);
    });
};

export const logout = () => {
  myStore.set(infoModalAtom, "déconnexion effectuée");
  myStore.set(sessionAtom, emptySession)
  // myStore.set(userAtom, emptyUser);
  // myStore.set(isLoggedAtom, "");
  // myStore.set(selectedNationAtom, EmptyNation);
  localStorage.removeItem("jwt");
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
    .then((data) => {
      myStore.set(loadingAtom, false);
      myStore.set(infoModalAtom, data.messaga);
    })
    .catch((error) => {
      myStore.set(loadingAtom, false);
      myStore.set(error.message);
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
  let user = emptyUser;
  myStore.set(loadingAtom, true);
  getOneUserFetch(id)
    .then((data) => {
      myStore.set(loadingAtom, false);
      if (data.user) {
        user = data.user
        myStore.set(userAtom, {
          officialId: data.user.officialId,
          name: data.user.name,
          surname: data.user.surname,
          avatar: data.user.avatar,
          role: data.user.role,
          citizenship: data.user.citizenship,
          createdAt: data.user.createdAt
        })
      }
    })
    .catch((error) => {
      myStore.set(loadingAtom, false);
      myStore.set(infoModalAtom, error.message);
    });
    return user
};