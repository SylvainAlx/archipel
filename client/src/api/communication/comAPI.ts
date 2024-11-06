/* eslint-disable @typescript-eslint/no-explicit-any */
import { comOptions } from "../../settings/consts";
import {
  comFetchedListAtom,
  comsListAtom,
  confirmBox,
  loadingAtom,
  myStore,
  statsAtom,
} from "../../settings/store";
import { Com } from "../../types/typCom";
import {
  spliceByDBId,
  updateOrCreateComInMemory,
} from "../../utils/atomArrayFunctions";
import { errorMessage, successMessage } from "../../utils/toasts";
import {
  createComFetch,
  deleteComFetch,
  getComsCountFetch,
  getComsByDestinationFetch,
  getPublicComsFetch,
} from "./comFetch";

const confirm = myStore.get(confirmBox);

export const getComsCount = () => {
  const stats = myStore.get(statsAtom);
  myStore.set(loadingAtom, true);
  getComsCountFetch()
    .then((response) => {
      myStore.set(loadingAtom, false);
      const updatedStats = { ...stats };
      updatedStats.counts.coms = response;
      myStore.set(statsAtom, updatedStats);
    })
    .catch((error) => {
      myStore.set(loadingAtom, false);
      console.error(error);
      errorMessage(error.message);
    });
};

export const getComsByDestination = (officialId: string) => {
  const savedComList: Com[] = [];
  myStore.get(comsListAtom).forEach((com) => {
    if (com.destination === officialId) {
      savedComList.push(com);
    }
  });
  if (savedComList.length > 0) {
    myStore.set(comFetchedListAtom, savedComList);
  } else {
    myStore.set(loadingAtom, true);
    getComsByDestinationFetch(officialId)
      .then((resp) => {
        myStore.set(loadingAtom, false);
        if (resp != undefined) {
          resp.forEach((com: Com) => {
            updateOrCreateComInMemory(com);
          });
          myStore.set(comFetchedListAtom, resp);
        }
      })
      .catch((error) => {
        myStore.set(loadingAtom, false);
        errorMessage(error.message);
      });
  }
};

export const getPublicComs = () => {
  const savedComList: Com[] = [];
  myStore.get(comsListAtom).forEach((com) => {
    if (com.comType === comOptions[3].id) {
      savedComList.push(com);
    }
  });
  if (savedComList.length > 0) {
    myStore.set(comFetchedListAtom, savedComList);
  } else {
    myStore.set(loadingAtom, true);
    getPublicComsFetch()
      .then((resp) => {
        myStore.set(loadingAtom, false);
        if (resp != undefined) {
          resp.forEach((com: Com) => {
            updateOrCreateComInMemory(com);
          });
          myStore.set(comFetchedListAtom, resp);
        }
      })
      .catch((error) => {
        myStore.set(loadingAtom, false);
        errorMessage(error.message);
      });
  }
};

export const createNewCom = (payload: any) => {
  myStore.set(loadingAtom, true);
  createComFetch(payload)
    .then((resp) => {
      myStore.set(loadingAtom, false);
      updateOrCreateComInMemory(resp.com);
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
      let tempArray = spliceByDBId(resp.com._id, myStore.get(comsListAtom));
      myStore.set(comsListAtom, tempArray);
      tempArray = spliceByDBId(resp.com._id, myStore.get(comFetchedListAtom));
      myStore.set(comFetchedListAtom, tempArray);
      successMessage(resp.message);
    })
    .catch((error) => {
      myStore.set(loadingAtom, false);
      errorMessage(error.message);
    });
};
