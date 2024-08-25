import {
  loadingAtom,
  myStore,
  nationFetchedAtom,
  nationsListAtom,
  nationsRoleplayDataAtom,
  session,
  sessionAtom,
  statsAtom,
} from "../../settings/store";
import { EmptyNation, Nation, NewNationPayload } from "../../types/typNation";

import {
  deleteElementOfAtomArray,
  displayNationInfoByType,
  findElementOfAtomArray,
  // updateElementOfAtomArray,
} from "../../utils/functions";
import { errorMessage, successMessage } from "../../utils/toasts";
import {
  createNationFetch,
  DeleteSelfFetch,
  getAllNations,
  getNationsCountFetch,
  getOneNationFetch,
  getRoleplayDataFetch,
  updateNationFetch,
} from "./nationFetch";

const nationsList = myStore.get(nationsListAtom);
const setNationsList = (list: Nation[]) => myStore.set(nationsListAtom, list);

export const getNationsCount = async () => {
  const stats = myStore.get(statsAtom);
  myStore.set(loadingAtom, true);
  getNationsCountFetch()
    .then((response) => {
      myStore.set(loadingAtom, false);
      const updatedStats = { ...stats };
      updatedStats.counts.nations = response;
      myStore.set(statsAtom, updatedStats);
    })
    .catch((error) => {
      myStore.set(loadingAtom, false);
      myStore.set(loadingAtom, false);
      errorMessage(error.message);
    });
};

export const createNation = (payload: NewNationPayload) => {
  myStore.set(loadingAtom, true);
  createNationFetch(payload)
    .then((data) => {
      myStore.set(loadingAtom, false);
      if (data.nation) {
        myStore.set(nationsListAtom, [...nationsList, data.nation]);
        myStore.set(sessionAtom, { ...session, nation: data.nation });
        if (data.user) {
          myStore.set(sessionAtom, { ...session, user: data.user });
          displayNationInfoByType("new");
        }
      } else {
        myStore.set(loadingAtom, false);
        errorMessage("création impossible : " + data.message);
      }
    })
    .catch((error) => {
      myStore.set(loadingAtom, false);
      errorMessage(error.message);
    });
};

export const getNation = (id: string) => {
  myStore.set(loadingAtom, true);
  const nation = findElementOfAtomArray(id, nationsList);
  if (nation === undefined || nation === null) {
    getOneNationFetch(id)
      .then((data) => {
        myStore.set(loadingAtom, false);
        myStore.set(nationFetchedAtom, data.nation);
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
        myStore.set(sessionAtom, { ...session, nation: resp.nation });
        myStore.set(nationsListAtom, []);
        // updateElementOfAtomArray(resp.nation, nationsList, setNationsList);
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
      myStore.set(loadingAtom, false);
      if (session.nation) {
        deleteElementOfAtomArray(
          session.nation.officialId,
          nationsList,
          setNationsList,
        );
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
