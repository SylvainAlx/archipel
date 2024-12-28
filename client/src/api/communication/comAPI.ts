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
import {
  comErrorCatching,
  displayComInfoByType,
} from "../../utils/displayInfos";
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
    comErrorCatching(error);
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
    try {
      const coms = await getComsFetch(originId, destinationId, comType);
      coms.forEach((com: Com) => {
        updateOrCreateComInMemory(com);
      });
      myStore.set(comFetchedListAtom, coms);
    } catch (error) {
      comErrorCatching(error);
    } finally {
      myStore.set(loadingAtom, false);
    }
  }
};

export const getComsByDestination = async (officialId: string) => {
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
    try {
      const resp = await getComsByDestinationFetch(officialId);
      resp.forEach((com: Com) => {
        updateOrCreateComInMemory(com);
      });
      myStore.set(comFetchedListAtom, resp);
    } catch (error) {
      comErrorCatching(error);
    } finally {
      myStore.set(loadingAtom, false);
    }
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
      comErrorCatching(error);
    } finally {
      myStore.set(loadingAtom, false);
    }
  }
};

export const createNewCom = async (payload: ComPayload) => {
  myStore.set(loadingAtom, true);
  try {
    const resp: { com: Com; infoType: string } = await createComFetch(payload);
    updateOrCreateComInMemory(resp.com);
    const tempArray = [...myStore.get(comFetchedListAtom)];
    tempArray.push(resp.com);
    myStore.set(comFetchedListAtom, tempArray);
    displayComInfoByType(resp.infoType);
  } catch (error) {
    comErrorCatching(error);
  } finally {
    myStore.set(loadingAtom, false);
  }
};

export const deleteCom = async (com: Com) => {
  myStore.set(loadingAtom, true);
  try {
    const resp: { com: Com; infoType: string } = await deleteComFetch(com._id);
    let tempArray = spliceByDBId(resp.com._id, myStore.get(comsListAtom));
    myStore.set(comsListAtom, tempArray);
    tempArray = spliceByDBId(resp.com._id, myStore.get(comFetchedListAtom));
    myStore.set(comFetchedListAtom, tempArray);
    displayComInfoByType(resp.infoType);
  } catch (error) {
    comErrorCatching(error);
  } finally {
    myStore.set(loadingAtom, false);
  }
};
