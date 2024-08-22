/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  comsListAtom,
  confirmBox,
  loadingAtom,
  myStore,
} from "../../settings/store";
import { Com } from "../../types/typCom";
import {
  createElementOfAtomArray,
  deleteElementOfAtomArray,
} from "../../utils/functions";
import { errorMessage, successMessage } from "../../utils/toasts";
import { createComFetch, deleteComFetch, getAllComs } from "./comFetch";

const confirm = myStore.get(confirmBox);
const comsList = myStore.get(comsListAtom);
const setComsList = (list: Com[]) => myStore.set(comsListAtom, list);

export const getComs = () => {
  myStore.set(loadingAtom, true);
  getAllComs()
    .then((data) => {
      myStore.set(loadingAtom, false);
      if (data != undefined) {
        myStore.set(comsListAtom, data);
      }
    })
    .catch((error) => {
      myStore.set(loadingAtom, false);
      errorMessage(error.message);
    });
};

export const createNewCom = (payload: any) => {
  myStore.set(loadingAtom, true);
  createComFetch(payload)
    .then((resp) => {
      myStore.set(loadingAtom, false);
      createElementOfAtomArray(resp.com, comsList, setComsList);
      successMessage(resp.message);
    })
    .catch((error) => {
      myStore.set(loadingAtom, false);
      errorMessage(error.message);
    });
};

export const deleteCom = () => {
  myStore.set(loadingAtom, true);
  deleteComFetch(confirm.target)
    .then((resp) => {
      myStore.set(loadingAtom, false);
      deleteElementOfAtomArray(confirm.target, comsList, setComsList);
      successMessage(resp.message);
    })
    .catch((error) => {
      myStore.set(loadingAtom, false);
      errorMessage(error.message);
    });
};
