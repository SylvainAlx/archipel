
import { SERVEUR_LOADING_STRING } from "../settings/consts";
import { loadingSpinner, myStore, nationsListAtom, infoModal, comsListAtom } from "../settings/store";
import { getAllComs, getAllNations } from "./fetch";

export const getNations = (searchName: string) => {
  myStore.set(loadingSpinner, { show: true, text: SERVEUR_LOADING_STRING });
  getAllNations(searchName)
    .then((data) => {
      myStore.set(loadingSpinner, { show: false, text: "" });
      if (data != undefined) {
        myStore.set(nationsListAtom, data);
      }
    })
    .catch((error) => {
      myStore.set(loadingSpinner, { show: false, text: "" });
      myStore.set(infoModal, error.message)
    });
};

export const getComs = () => {
  myStore.set(loadingSpinner, { show: true, text: SERVEUR_LOADING_STRING });
  getAllComs()
    .then((data) => {
      myStore.set(loadingSpinner, { show: false, text: "" });
      if (data != undefined) {
        myStore.set(comsListAtom, data)
      }
    })
    .catch((error) => {
      myStore.set(loadingSpinner, { show: false, text: "" });
      myStore.set(infoModal, error.message)
    });
};