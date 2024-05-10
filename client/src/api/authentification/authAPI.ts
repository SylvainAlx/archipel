import { comOptions } from "../../settings/consts";
import {
  comsListAtom,
  infoModalAtom,
  loadingAtom,
  myStore,
  nationAtom,
  nationsListAtom,
  ownerAtom,
  recoveryKey,
  selectedNationAtom,
} from "../../settings/store";
import { EmptyNation } from "../../types/typNation";
import { GET_JWT } from "../../utils/functions";
import { RecoveryFetch, authGet, loginFetch, registerFetch } from "./authFetch";

import { createComFetch } from "../communication/comFetch";
import { EmptyCom } from "../../types/typAtom";
import { AuthPayload, RecoveryPayload } from "../../types/typUser";

export const register = ({ name, password }: AuthPayload) => {
  myStore.set(loadingAtom, true);
  registerFetch({ name, password })
    .then((data) => {
      myStore.set(loadingAtom, false);
      if (data.nation) {
        createComFetch({
          originId: data.nation._id,
          originName: data.nation.name,
          comType: comOptions[1].id,
        });
        localStorage.setItem("jwt", data.jwt);
        myStore.set(recoveryKey, data.recovery);
        myStore.set(nationsListAtom, [EmptyNation]);
        myStore.set(comsListAtom, [EmptyCom]);
        myStore.set(nationAtom, {
          _id: data.nation._id,
          officialId: data.nation.officialId,
          name: data.nation.name,
          owner: data.nation.owner,
          role: data.nation.role,
          data: data.nation.data,
          createdAt: data.nation.createdAt,
        });
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
        if (data.name != undefined) {
          myStore.set(nationAtom, {
            _id: data._id,
            officialId: data.officialId,
            name: data.name,
            owner: data.nation.owner,
            role: data.role,
            data: data.data,
            createdAt: data.createdAt,
          });
        } else {
          myStore.set(nationAtom, EmptyNation);
          myStore.set(loadingAtom, false);
          localStorage.removeItem("jwt");
        }
      })
      .catch((error) => {
        myStore.set(nationAtom, EmptyNation);
        myStore.set(loadingAtom, false);
        console.log(error);
      });
  } else {
    myStore.set(nationAtom, EmptyNation);
  }
};

export const logout = () => {
  myStore.set(infoModalAtom, "déconnexion effectuée");
  myStore.set(nationAtom, EmptyNation);
  myStore.set(selectedNationAtom, EmptyNation);
  myStore.set(ownerAtom, false);
  localStorage.removeItem("jwt");
};

export const login = ({ name, password }: AuthPayload) => {
  myStore.set(loadingAtom, true);
  loginFetch({ name, password })
    .then((data) => {
      myStore.set(loadingAtom, false);
      if (data.nation) {
        localStorage.setItem("jwt", data.jwt);
        myStore.set(nationsListAtom, [EmptyNation]);
        myStore.set(nationAtom, {
          _id: data.nation._id,
          officialId: data.nation.officialId,
          name: data.nation.name,
          owner: data.nation.owner,
          role: data.nation.role,
          data: data.nation.data,
          createdAt: data.nation.createdAt,
        });
      } else {
        myStore.set(loadingAtom, false);
        myStore.set(infoModalAtom, data.message);
      }
    })
    .catch((error) => {
      myStore.set(loadingAtom, false);
      myStore.set(infoModalAtom, error.message);
    });
};

export const recoveryNation = ({
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
      alert(error.message);
    });
};
