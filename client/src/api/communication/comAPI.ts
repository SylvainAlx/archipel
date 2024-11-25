/* eslint-disable @typescript-eslint/no-explicit-any */
import { comOptions } from "../../settings/lists";
import {
  comFetchedListAtom,
  comsListAtom,
  loadingAtom,
  myStore,
  statsAtom,
} from "../../settings/store";
import { Com, ComPayload } from "../../types/typCom";
import {
  spliceByDBId,
  updateOrCreateComInMemory,
} from "../../utils/atomArrayFunctions";
import { displayComInfoByType } from "../../utils/displayInfos";
import {
  createComFetch,
  deleteComFetch,
  getComsCountFetch,
  getComsByDestinationFetch,
  getAllPublicComsFetch,
  getPublicComsByOriginFetch,
  getAllAdminComsFetch,
} from "./comFetch";

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
      displayComInfoByType(error.infoType);
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
        console.error(error);
        displayComInfoByType(error.infoType);
      });
  }
};

export const getPublicComs = async (nationId: string) => {
  const savedComList: Com[] = [];
  myStore.get(comsListAtom).forEach((com) => {
    if (com.comType === comOptions[3].id) {
      savedComList.push(com);
    }
  });
  if (savedComList.length > 0) {
    myStore.set(comFetchedListAtom, savedComList);
  } else {
    try {
      myStore.set(loadingAtom, true);
      let response: [Com];
      if (nationId != "") {
        response = await getPublicComsByOriginFetch(nationId);
      } else {
        response = await getAllPublicComsFetch();
      }
      myStore.set(loadingAtom, false);
      if (response != undefined) {
        response.forEach((com: Com) => {
          updateOrCreateComInMemory(com);
        });
        myStore.set(comFetchedListAtom, response);
      }
    } catch (error) {
      myStore.set(loadingAtom, false);
      console.error(error);
    }
  }
};

export const getAdminComs = async () => {
  const savedComList: Com[] = [];
  myStore.get(comsListAtom).forEach((com) => {
    if (com.comType === comOptions[0].id) {
      savedComList.push(com);
    }
  });
  if (savedComList.length > 0) {
    myStore.set(comFetchedListAtom, savedComList);
  } else {
    try {
      myStore.set(loadingAtom, true);
      let response: [Com];
      response = await getAllAdminComsFetch();
      myStore.set(loadingAtom, false);
      if (response != undefined) {
        response.forEach((com: Com) => {
          updateOrCreateComInMemory(com);
        });
        myStore.set(comFetchedListAtom, response);
      }
    } catch (error) {
      myStore.set(loadingAtom, false);
      console.error(error);
    }
  }
};

export const createNewCom = (payload: ComPayload) => {
  myStore.set(loadingAtom, true);
  createComFetch(payload)
    .then((resp: { com: Com; infoType: string }) => {
      myStore.set(loadingAtom, false);
      updateOrCreateComInMemory(resp.com);
      const tempArray = [...myStore.get(comFetchedListAtom)];
      tempArray.push(resp.com);
      myStore.set(comFetchedListAtom, tempArray);
      displayComInfoByType(resp.infoType);
    })
    .catch((error) => {
      myStore.set(loadingAtom, false);
      console.error(error);
      displayComInfoByType(error.infoType);
    });
};

export const deleteCom = (com: Com) => {
  myStore.set(loadingAtom, true);
  deleteComFetch(com._id)
    .then((resp: { com: Com; infoType: string }) => {
      myStore.set(loadingAtom, false);
      let tempArray = spliceByDBId(resp.com._id, myStore.get(comsListAtom));
      myStore.set(comsListAtom, tempArray);
      tempArray = spliceByDBId(resp.com._id, myStore.get(comFetchedListAtom));
      myStore.set(comFetchedListAtom, tempArray);
      displayComInfoByType(resp.infoType);
    })
    .catch((error) => {
      myStore.set(loadingAtom, false);
      console.error(error);
      displayComInfoByType(error.infoType);
    });
};
