import {
  comsListAtom,
  infoModalAtom,
  loadingAtom,
  myStore,
  nationAtom,
  nationsListAtom,
  nationsRoleplayDataAtom,
  selectedNationAtom,
} from "../../settings/store";
import { EmptyCom } from "../../types/typAtom";
import { EmptyNation, Nation } from "../../types/typNation";

import {
  deleteElementOfAtomArray,
  updateElementOfAtomArray,
} from "../../utils/functions";
import {
  DeleteSelfFetch,
  getAllNations,
  getOneNationFetch,
  getRoleplayDataFetch,
  updateNationFetch,
} from "./nationFetch";
import { createComFetch } from "../communication/comFetch";

const nationsList = myStore.get(nationsListAtom);
const setNationsList = (list: Nation[]) => myStore.set(nationsListAtom, list);

export const getNation = (id: string, owner: boolean) => {
  myStore.set(loadingAtom, true);
  getOneNationFetch(id)
    .then((data) => {
      myStore.set(loadingAtom, false);
      if (data.nation) {
        myStore.set(selectedNationAtom, {
          _id: data.nation._id,
          officialId : data.nation.officialId,
          name: data.nation.name,
          role: data.nation.role,
          data: data.nation.data,
          createdAt: data.nation.createdAt,
        });
        if (owner) {
          myStore.set(nationAtom, {
            _id: data.nation._id,
            officialId : data.nation.officialId,
            name: data.nation.name,
            role: data.nation.role,
            data: data.nation.data,
            createdAt: data.nation.createdAt,
          });
        }
      }
    })
    .catch((error) => {
      myStore.set(loadingAtom, false);
      myStore.set(infoModalAtom, error.message);
    });
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
      createComFetch({
        originId: nation._id,
        originName: nation.name,
        comType: 2,
      });
      deleteElementOfAtomArray(nation._id, nationsList, setNationsList);
      myStore.set(comsListAtom, [EmptyCom]);
      myStore.set(infoModalAtom, resp.message);
      myStore.set(nationAtom, EmptyNation);
      localStorage.removeItem("jwt");
    })
    .catch((error) => {
      myStore.set(loadingAtom, false);
      myStore.set(infoModalAtom, error);
    });
};

export const getRoleplayData = (selectedNation: Nation) => {
  const nationsRoleplayData = myStore.get(nationsRoleplayDataAtom);
  myStore.set(loadingAtom, true);
  getRoleplayDataFetch(selectedNation._id)
    .then((data) => {
      myStore.set(loadingAtom, false);
      myStore.set(nationsRoleplayDataAtom, [
        ...nationsRoleplayData,
        {
          nationId: selectedNation._id,
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
