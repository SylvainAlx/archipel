import { SERVEUR_LOADING_STRING } from "../../settings/consts";
import { infoModalAtom, loadingSpinner, myStore } from "../../settings/store";
import { ParamPayload } from "../../types/typPayload";
import { createParamFetch } from "./paramFetch";

export const createNewParam = (param: ParamPayload) => {
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
