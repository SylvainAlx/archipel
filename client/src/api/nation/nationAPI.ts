import {
  loadingAtom,
  myStore,
  nationFetchedAtom,
  nationsListAtom,
  nationsRoleplayDataAtom,
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
  getRoleplayDataFetch,
  updateNationFetch,
} from "./nationFetch";

export const getNationsCount = async () => {
  const stats = myStore.get(statsAtom);
  myStore.set(loadingAtom, true);
  getNationsCountFetch()
    .then((response: number) => {
      myStore.set(loadingAtom, false);
      const updatedStats: Stats = { ...stats };
      updatedStats.counts.nations = response;
      myStore.set(statsAtom, updatedStats);
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
      myStore.set(loadingAtom, false);
      if (resp.nation) {
        const session = myStore.get(sessionAtom);
        myStore.set(nationsListAtom, [
          ...myStore.get(nationsListAtom),
          resp.nation,
        ]);
        myStore.set(sessionAtom, { ...session, nation: resp.nation });
        if (resp.user) {
          myStore.set(sessionAtom, { ...session, user: resp.user });
          displayNationInfoByType(resp.infoType);
        }
      } else {
        myStore.set(loadingAtom, false);
        displayNationInfoByType(resp.infoType);
      }
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
      .then((data) => {
        myStore.set(loadingAtom, false);
        myStore.set(nationFetchedAtom, data.nation);
        updateOrCreateNationInMemory(data.nation);
        myStore.set(loadingAtom, false);
        return nation;
      })
      .catch((error) => {
        myStore.set(nationFetchedAtom, EmptyNation);
        myStore.set(loadingAtom, false);
        errorMessage(error.message);
        return nation;
      });
  } else {
    myStore.set(loadingAtom, false);
    myStore.set(nationFetchedAtom, nation);
    return nation;
  }
};

export const getNations = (searchName: string) => {
  myStore.set(loadingAtom, true);
  getAllNations(searchName)
    .then((data) => {
      myStore.set(loadingAtom, false);
      if (data != undefined) {
        myStore.set(nationsListAtom, data);
      }
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
    .then((resp) => {
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
      myStore.set(sessionAtom, { ...session, nation: EmptyNation });
      if (resp.user) {
        myStore.set(sessionAtom, { ...session, user: resp.user });
      }
    })
    .catch((error) => {
      myStore.set(loadingAtom, false);
      errorMessage(error.message);
    });
};

export const getRoleplayData = (selectedNation: Nation) => {
  const nationsRoleplayData = myStore.get(nationsRoleplayDataAtom);
  myStore.set(loadingAtom, true);
  getRoleplayDataFetch(selectedNation.officialId)
    .then((data) => {
      myStore.set(loadingAtom, false);
      myStore.set(nationsRoleplayDataAtom, [
        ...nationsRoleplayData,
        {
          nationId: selectedNation.officialId,
          citizens: data.citizens,
          places: data.places,
        },
      ]);
    })
    .catch((error) => {
      myStore.set(loadingAtom, false);
      errorMessage(error.message);
    });
};

export const getAllNationTags = async () => {
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
