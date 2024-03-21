import {
  infoModalAtom,
  loadingAtom,
  myStore,
  paramsListAtom,
} from "../../settings/store";
import { Param } from "../../types/typAtom";
import { createParamFetch, getAllParamsFetch } from "./paramFetch";

export const createNewParam = (param: Param) => {
  myStore.set(loadingAtom, true);
  createParamFetch(param)
    .then((data) => {
      myStore.set(loadingAtom, false);
      if (data.param) {
        myStore.set(infoModalAtom, data.message);
      }
    })
    .catch((error) => {
      myStore.set(loadingAtom, false);
      myStore.set(infoModalAtom, error.message);
    });
};

export const getAllParams = () => {
  myStore.set(loadingAtom, true);
  getAllParamsFetch()
    .then((data: Param[]) => {
      myStore.set(loadingAtom, false);
      myStore.set(paramsListAtom, data);
    })
    .catch((error) => {
      myStore.set(loadingAtom, false);
      myStore.set(infoModalAtom, error.message);
    });
};
