/* eslint-disable @typescript-eslint/no-explicit-any */
import { SERVEUR_LOADING_STRING } from "../../settings/consts";
import { comsListAtom, confirmBox, infoModalAtom, loadingSpinner, myStore } from "../../settings/store";
import { Com } from "../../types/typAtom";
import { createElementOfAtomArray, deleteElementOfAtomArray } from "../../utils/functions";
import { createComFetch, deleteComFetch, getAllComs } from "./comFetch";

const confirm = myStore.get(confirmBox)
const comsList = myStore.get(comsListAtom)
const setComsList = (list: Com[]) => myStore.set(comsListAtom, list)

export const getComs = () => {
  myStore.set(loadingSpinner, { show: true, text: SERVEUR_LOADING_STRING });
  getAllComs()
    .then((data) => {
      myStore.set(loadingSpinner, { show: false, text: "" });
      if (data != undefined) {
        myStore.set(comsListAtom, data);
      }
    })
    .catch((error) => {
      myStore.set(loadingSpinner, { show: false, text: "" });
      myStore.set(infoModalAtom, error.message);
    });
};

export const createNewCom = (payload: any) => {
  myStore.set(loadingSpinner, { show: true, text: SERVEUR_LOADING_STRING });
  createComFetch(payload)
    .then((resp) => {
      myStore.set(loadingSpinner, { show: false, text: "" });
      createElementOfAtomArray(resp.com, comsList, setComsList);
      myStore.set(infoModalAtom, resp.message);
    })
    .catch((error) => {
      myStore.set(loadingSpinner, { show: false, text: "" });
      myStore.set(infoModalAtom, error);
    });
};

export const deleteCom = () => {
  myStore.set(loadingSpinner, { show: true, text: SERVEUR_LOADING_STRING });
  deleteComFetch(confirm.target)
    .then((resp) => {
      myStore.set(loadingSpinner, { show: false, text: "" });
      deleteElementOfAtomArray(confirm.target, comsList, setComsList);
      myStore.set(infoModalAtom, resp.message);
    })
    .catch((error) => {
      myStore.set(loadingSpinner, { show: false, text: "" });
      myStore.set(infoModalAtom, error);
    });
};