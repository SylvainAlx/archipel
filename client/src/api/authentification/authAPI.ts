import { SERVEUR_LOADING_STRING, comOptions } from "../../settings/consts";
import { comsListAtom, infoModalAtom, loadingSpinner, myStore, nationAtom, nationsListAtom, recoveryKey } from "../../settings/store";
import { EmptyNation } from "../../types/typNation";
import { GET_JWT } from "../../utils/functions";
import { RecoveryFetch, authGet, loginFetch, registerFetch } from "./authFetch";
import { AuthPayload, RecoveryPayload } from "../../types/typPayload";
import { createComFetch } from "../communication/comFetch";
import { EmptyCom } from "../../types/typAtom";

export const register = ({name, password}: AuthPayload) => {
  myStore.set(loadingSpinner, { show: true, text: SERVEUR_LOADING_STRING });
  registerFetch({ name, password })
    .then((data) => {
      myStore.set(loadingSpinner, { show: false, text: "" });
      if (data.nation) {
        createComFetch({
          originId: data.nation._id,
          originName: data.nation.name,
          comType: comOptions[1].id,
        });
        localStorage.setItem("jwt", data.jwt);
        myStore.set(recoveryKey, data.recovery)
        myStore.set(nationsListAtom, [EmptyNation])
        myStore.set(comsListAtom, [EmptyCom])
        myStore.set(nationAtom, {
          _id: data.nation._id,
          name: data.nation.name,
          role: data.nation.role,
          data: data.nation.data,
          createdAt: data.nation.createdAt,
        })
        
      } else {
        myStore.set(loadingSpinner, { show: false, text: "" });
        myStore.set(infoModalAtom, "création impossible : " + data.message)
      }
    })
    .catch((error) => {
      myStore.set(loadingSpinner, { show: false, text: "" });
      myStore.set(infoModalAtom, error.message)
    });
}

export const authentification = () => {
  const jwt = GET_JWT();
  if (jwt) {
    myStore.set(loadingSpinner, { show: true, text: SERVEUR_LOADING_STRING });
    authGet(jwt)
      .then((data) => {
        myStore.set(loadingSpinner, { show: false, text: "" });
        if (data.name != undefined) {
          myStore.set(nationAtom, {
            _id: data._id,
            name: data.name,
            role: data.role,
            data: data.data,
            createdAt: data.createdAt,
          });
        } else {
          myStore.set(nationAtom, EmptyNation);
          myStore.set(loadingSpinner, { show: false, text: "" });
          localStorage.removeItem("jwt");
        }
      })
      .catch((error) => {
        myStore.set(nationAtom, EmptyNation);
        myStore.set(loadingSpinner, { show: false, text: "" });
        console.log(error);
      });
  } else {
    myStore.set(nationAtom, EmptyNation);
  }
};

export const logout = () => {
  myStore.set(infoModalAtom, "déconnexion effectuée");
  myStore.set(nationAtom, EmptyNation)
  localStorage.removeItem("jwt");
};

export const login = ({name, password}: AuthPayload) => {
  myStore.set(loadingSpinner, { show: true, text: SERVEUR_LOADING_STRING });
    loginFetch({ name, password })
      .then((data) => {
        myStore.set(loadingSpinner, { show: false, text: "" });
        if (data.nation) {
          localStorage.setItem("jwt", data.jwt);
          myStore.set(nationsListAtom, [EmptyNation])
          myStore.set(nationAtom, {
            _id: data.nation._id,
            name: data.nation.name,
            role: data.nation.role,
            data: data.nation.data,
            createdAt: data.nation.createdAt,
          })
        } else {
          myStore.set(loadingSpinner, { show: false, text: "" });
          myStore.set(infoModalAtom, data.message)
        }
      })
      .catch((error) => {
        myStore.set(loadingSpinner, { show: false, text: "" });
        myStore.set(infoModalAtom, error.message)
      });
}

export const recoveryNation = ({name, recovery, password}: RecoveryPayload) => {
  myStore.set(loadingSpinner, { show: true, text: SERVEUR_LOADING_STRING });
    const dataToSend = {
      name,
      recovery,
      newPassword: password,
    };
    RecoveryFetch(dataToSend)
      .then((data) => {
        myStore.set(loadingSpinner, { show: false, text: "" });
        myStore.set(infoModalAtom, data.messaga)
      })
      .catch((error) => {
        myStore.set(loadingSpinner, { show: false, text: "" });
        alert(error.message);
      });
}