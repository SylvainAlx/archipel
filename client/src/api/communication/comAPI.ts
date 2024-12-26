/* eslint-disable @typescript-eslint/no-explicit-any */
import { COM_TYPE } from "../../settings/consts";
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
import { errorCatching } from "../../utils/functions";
import {
  createComFetch,
  deleteComFetch,
  getComsCountFetch,
  getComsByDestinationFetch,
  getAllPublicComsFetch,
  getPublicComsByOriginFetch,
  getComsFetch,
} from "./comFetch";

export const getComsCount = async () => {
  const stats = myStore.get(statsAtom);
  myStore.set(loadingAtom, true);
  try {
    const response = await getComsCountFetch();
    const updatedStats = {
      ...stats,
      counts: { ...stats.counts, coms: response },
    };
    myStore.set(statsAtom, updatedStats);
  } catch (error) {
    errorCatching(error);
  } finally {
    myStore.set(loadingAtom, false);
  }
};

export const getComs = async (
  originId: string,
  destinationId: string,
  comType: number[],
) => {
  const savedComList: Com[] = [];
  myStore.get(comsListAtom).forEach((com) => {
    if (
      com.origin === originId &&
      com.destination === destinationId &&
      comType.includes(com.comType)
    ) {
      savedComList.push(com);
    }
  });
  if (savedComList.length > 0) {
    myStore.set(comFetchedListAtom, savedComList);
  } else {
    myStore.set(loadingAtom, true);
    const coms = await getComsFetch(originId, destinationId, comType);
    if (coms != undefined) {
      coms.forEach((com: Com) => {
        updateOrCreateComInMemory(com);
      });
      myStore.set(comFetchedListAtom, coms);
    }
    myStore.set(loadingAtom, false);
  }
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
    if (com.comType === COM_TYPE.nationPublic.id && com.origin === nationId) {
      savedComList.push(com);
    }
  });
  if (savedComList.length > 0 && nationId != "") {
    myStore.set(comFetchedListAtom, savedComList);
  } else {
    myStore.set(loadingAtom, true);
    try {
      let response: [Com];
      if (nationId != "") {
        response = await getPublicComsByOriginFetch(nationId);
      } else {
        response = await getAllPublicComsFetch();
      }
      response.forEach((com: Com) => {
        updateOrCreateComInMemory(com);
      });
      myStore.set(comFetchedListAtom, response);
    } catch (error) {
      errorCatching(error);
    } finally {
      myStore.set(loadingAtom, false);
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
