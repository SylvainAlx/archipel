import {
  infoModalAtom,
  loadingAtom,
  myStore,
  nationAtom,
  nationsListAtom,
  nationsRoleplayDataAtom,
  userAtom,
} from "../../settings/store";
import { EmptyNation, Nation, NewNationPayload } from "../../types/typNation";

import {
  deleteElementOfAtomArray,
  updateElementOfAtomArray,
} from "../../utils/functions";
import {
  createNationFetch,
  DeleteSelfFetch,
  getAllNations,
  getOneNationFetch,
  getRoleplayDataFetch,
  updateNationFetch,
} from "./nationFetch";

const nationsList = myStore.get(nationsListAtom);
const setNationsList = (list: Nation[]) => myStore.set(nationsListAtom, list);

export const createNation = (payload: NewNationPayload) => {
  myStore.set(loadingAtom, true);
  createNationFetch(payload)
  .then((data) => {
    myStore.set(loadingAtom, false);
    if (data.nation) {
      myStore.set(nationsListAtom, [EmptyNation]);
      myStore.set(nationAtom, {
        officialId: data.nation.officialId,
        name: data.nation.name,
        owner: data.nation.owner,
        role: data.nation.role,
        data: data.nation.data,
        createdAt: data.nation.createdAt,
      });
      if (data.user){
        myStore.set(userAtom, data.user)
      }
    } else {
      myStore.set(loadingAtom, false);
      myStore.set(infoModalAtom, "création impossible : " + data.message);
    }
  })
  .catch((error) => {
    myStore.set(loadingAtom, false);
    myStore.set(infoModalAtom, error.message);
  });
}

export const getNation = (id: string) => {
  let nation = EmptyNation;
  myStore.set(loadingAtom, true);
  getOneNationFetch(id)
    .then((data) => {
      myStore.set(loadingAtom, false);
      if (data.nation) {
        nation = data.nation;
        // myStore.set(nationAtom, {
        //   officialId : data.nation.officialId,
        //   name: data.nation.name,
        //   owner: data.nation.owner,
        //   role: data.nation.role,
        //   data: data.nation.data,
        //   createdAt: data.nation.createdAt,
        // });
        // if (owner) {
        //   myStore.set(sessionAtom, {...session, nation: data.nation})
        //   myStore.set(nationAtom, {
        //     officialId : data.nation.officialId,
        //     name: data.nation.name,
        //     owner: data.nation.owner,
        //     role: data.nation.role,
        //     data: data.nation.data,
        //     createdAt: data.nation.createdAt,
        //   });
        // }
      }
    })
    .catch((error) => {
      myStore.set(loadingAtom, false);
      myStore.set(infoModalAtom, error.message);
    });
    return nation
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
      myStore.set(infoModalAtom, error.message);
    });
};

export const updateNation = (payload: Nation) => {
  myStore.set(loadingAtom, true);
  updateNationFetch(payload)
    .then((resp) => {
      myStore.set(loadingAtom, false);
      if (resp.nation) {
        myStore.set(nationAtom, resp.nation);
        updateElementOfAtomArray(resp.nation, nationsList, setNationsList);
      } else {
        myStore.set(infoModalAtom, resp.message);
      }
    })
    .catch((error) => {
      myStore.set(loadingAtom, false);
      myStore.set(infoModalAtom, error);
    });
};

export const deleteSelfNation = () => {
  const nation = myStore.get(nationAtom);
  myStore.set(loadingAtom, true);
  DeleteSelfFetch()
    .then((resp) => {
      myStore.set(loadingAtom, false);
      deleteElementOfAtomArray(nation.officialId, nationsList, setNationsList);
      myStore.set(infoModalAtom, resp.message);
      myStore.set(nationAtom, EmptyNation);
      if (resp.user) {
        myStore.set(userAtom, resp.user)
      }
    })
    .catch((error) => {
      myStore.set(loadingAtom, false);
      myStore.set(infoModalAtom, error);
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
      myStore.set(infoModalAtom, error.message);
    });
};
