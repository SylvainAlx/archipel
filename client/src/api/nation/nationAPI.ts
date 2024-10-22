import {
  loadingAtom,
  myStore,
  nationFetchedAtom,
  nationsListAtom,
  sessionAtom,
  Stats,
  statsAtom,
  tagListAtom,
} from "../../settings/store";
import { EmptyNation, Nation, NewNationPayload } from "../../types/typNation";
import { User } from "../../types/typUser";
import {
  spliceByOfficialId,
  updateOrCreateNationInMemory,
} from "../../utils/atomArrayFunctions";
import { displayNationInfoByType } from "../../utils/displayInfos";

import { findElementOfAtomArray } from "../../utils/functions";
import { errorMessage, successMessage } from "../../utils/toasts";
import {
  createNationFetch,
  DeleteSelfFetch,
  getAllNations,
  getAllNationTagsFetch,
  getNationsCountFetch,
  getOneNationFetch,
  updateNationFetch,
} from "./nationFetch";

export const getNationsCount = () => {
  myStore.set(loadingAtom, true);
  getNationsCountFetch()
    .then((response: number) => {
      const updatedStats: Stats = { ...myStore.get(statsAtom) };
      updatedStats.counts.nations = response;
      myStore.set(statsAtom, updatedStats);
      myStore.set(loadingAtom, false);
    })
    .catch((error: { infoType: string }) => {
      myStore.set(loadingAtom, false);
      displayNationInfoByType(error.infoType);
    });
};

export const createNation = (payload: NewNationPayload) => {
  myStore.set(loadingAtom, true);
  createNationFetch(payload)
    .then((resp: { nation: Nation; user: User; infoType: string }) => {
      if (resp.nation && resp.user && resp.infoType) {
        myStore.set(nationsListAtom, [
          ...myStore.get(nationsListAtom),
          resp.nation,
        ]);
        myStore.set(nationFetchedAtom, resp.nation);
        myStore.set(sessionAtom, {
          ...myStore.get(sessionAtom),
          nation: resp.nation,
          user: resp.user,
        });
      }
      myStore.set(loadingAtom, false);
      displayNationInfoByType(resp.infoType);
    })
    .catch((error: { infoType: string }) => {
      myStore.set(loadingAtom, false);
      displayNationInfoByType(error.infoType);
    });
};

export const getNation = (id: string) => {
  myStore.set(loadingAtom, true);
  const nation = findElementOfAtomArray(id, myStore.get(nationsListAtom));
  if (nation === undefined || nation === null) {
    getOneNationFetch(id)
      .then((resp: Nation) => {
        myStore.set(loadingAtom, false);
        myStore.set(nationFetchedAtom, resp);
        updateOrCreateNationInMemory(resp);
        myStore.set(loadingAtom, false);
      })
      .catch((error) => {
        myStore.set(nationFetchedAtom, EmptyNation);
        myStore.set(loadingAtom, false);
        errorMessage(error.message);
      });
  } else {
    myStore.set(loadingAtom, false);
    myStore.set(nationFetchedAtom, nation);
  }
};

export const getNations = (searchName: string) => {
  myStore.set(loadingAtom, true);
  getAllNations(searchName)
    .then((resp: Nation[]) => {
      if (resp != undefined) {
        myStore.set(nationsListAtom, resp);
      }
      myStore.set(loadingAtom, false);
    })
    .catch((error) => {
      myStore.set(loadingAtom, false);
      errorMessage(error.message);
    });
};

export const updateNation = (payload: Nation) => {
  myStore.set(loadingAtom, true);
  updateNationFetch(payload)
    .then((resp) => {
      myStore.set(loadingAtom, false);
      if (resp.nation) {
        myStore.set(nationFetchedAtom, resp.nation);
        const session = myStore.get(sessionAtom);
        myStore.set(sessionAtom, { ...session, nation: resp.nation });
        updateOrCreateNationInMemory(resp.nation);
      } else {
        successMessage(resp.message);
      }
    })
    .catch((error) => {
      myStore.set(loadingAtom, false);
      errorMessage(error.message);
    });
};

export const deleteSelfNation = () => {
  myStore.set(loadingAtom, true);
  DeleteSelfFetch()
    .then((resp: { user: User }) => {
      const session = myStore.get(sessionAtom);
      myStore.set(loadingAtom, false);
      if (session.nation) {
        const updatedNations = spliceByOfficialId(
          session.nation.officialId,
          myStore.get(nationsListAtom),
        );
        myStore.set(nationsListAtom, updatedNations);
      }
      displayNationInfoByType("delete");
      myStore.set(sessionAtom, {
        ...session,
        nation: EmptyNation,
        user: resp.user,
      });
    })
    .catch((error) => {
      myStore.set(loadingAtom, false);
      errorMessage(error.message);
    });
};

export const getAllNationTags = () => {
  myStore.set(loadingAtom, true);
  getAllNationTagsFetch()
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
