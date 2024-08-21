import {
  loadingAtom,
  myStore,
  statsAtom,
  tagListAtom,
} from "../../settings/store";
import { errorMessage } from "../../utils/toasts";
import { getAllTagsFetch, getTagCountFetch } from "./tagFetch";

// const tagList = myStore.get(tagListAtom);
// const setTagList = (list: Tag[]) => myStore.set(tagListAtom, list);

export const getTagCount = async () => {
  const stats = myStore.get(statsAtom);
  myStore.set(loadingAtom, true);
  getTagCountFetch()
    .then((response) => {
      myStore.set(loadingAtom, false);
      const updatedStats = { ...stats };
      updatedStats.counts.places = response;
      myStore.set(statsAtom, updatedStats);
    })
    .catch((error) => {
      myStore.set(loadingAtom, false);
      errorMessage(error.message);
    });
};

export const getAllTags = async () => {
  myStore.set(loadingAtom, true);
  getAllTagsFetch()
    .then((data) => {
      myStore.set(loadingAtom, false);
      if (data != undefined) {
        myStore.set(tagListAtom, data);
      }
    })
    .catch((error) => {
      myStore.set(loadingAtom, false);
      errorMessage(error.message);
    });
};

export const createTagCloud = async () => {
  myStore.set(loadingAtom, true);
};
