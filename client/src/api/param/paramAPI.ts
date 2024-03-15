import { SERVEUR_LOADING_STRING } from "../../settings/consts";
import { infoModalAtom, loadingSpinner, myStore, paramsListAtom } from "../../settings/store";
import { Param } from "../../types/typAtom";
import { createParamFetch, getAllParamsFetch } from "./paramFetch";

export const createNewParam = (param: Param) => {
  myStore.set(loadingSpinner, { show: true, text: SERVEUR_LOADING_STRING });
  createParamFetch(param)
    .then((data) => {
      myStore.set(loadingSpinner, { show: false, text: "" });
      if (data.param) {
        myStore.set(infoModalAtom, data.message);
      }
    })
    .catch((error) => {
      myStore.set(loadingSpinner, { show: false, text: "" });
      myStore.set(infoModalAtom, error.message);
    });
};

export const getAllParams = () => {
  myStore.set(loadingSpinner, { show: true, text: SERVEUR_LOADING_STRING });
  getAllParamsFetch()
  .then((data: Param[]) => {
    myStore.set(loadingSpinner, { show: false, text: "" });
    myStore.set(paramsListAtom, data);
  })
  .catch((error) => {
    myStore.set(loadingSpinner, { show: false, text: "" });
    myStore.set(infoModalAtom, error.message);
  });
}
