
import { SERVEUR_LOADING_STRING } from "../settings/consts";
import { loadingSpinner, myStore, nationsListAtom, infoModal, comsListAtom, nationAtom, selectedNationAtom } from "../settings/store";
import { EmptyNation } from "../types/typNation";
import { authGet, getAllComs, getAllNations, getOneNationFetch } from "./fetch";
import { GET_JWT } from "./functions";

export const authentification = () => {
  const jwt = GET_JWT();
    if (jwt) {
      myStore.set(loadingSpinner, { show: true, text: SERVEUR_LOADING_STRING });
      authGet(jwt)
        .then((data) => {
          myStore.set(loadingSpinner, { show: false, text: "" });
          if (data.name != undefined) {
            myStore.set(nationAtom, {
              _id: data._id,
              name: data.name,
              role: data.role,
              data: data.data,
              createdAt: data.createdAt,
            });
          } else {
            myStore.set(nationAtom, EmptyNation);
            myStore.set(loadingSpinner, { show: false, text: "" });
            localStorage.removeItem("jwt");
          }
        })
        .catch((error) => {
          myStore.set(nationAtom, EmptyNation);
          myStore.set(loadingSpinner, { show: false, text: "" });
          console.log(error);
        });
    } else {
      myStore.set(nationAtom, EmptyNation);
    }
}

export const getNation = (id: string) => {
  myStore.set(loadingSpinner, { show: true, text: SERVEUR_LOADING_STRING });
      getOneNationFetch(id)
        .then((data) => {
          myStore.set(loadingSpinner, { show: false, text: "" });
          if (data.nation) {
            myStore.set(selectedNationAtom, {
              _id: data.nation._id,
              name: data.nation.name,
              role: data.nation.role,
              data: data.nation.data,
              createdAt: data.nation.createdAt,
            });
          }
        })
        .catch((error) => {
          myStore.set(loadingSpinner, { show: false, text: "" });
          myStore.set(infoModal, error.message)
        });
    
}

export const getNations = (searchName: string) => {
  myStore.set(loadingSpinner, { show: true, text: SERVEUR_LOADING_STRING });
  getAllNations(searchName)
    .then((data) => {
      myStore.set(loadingSpinner, { show: false, text: "" });
      if (data != undefined) {
        myStore.set(nationsListAtom, data);
      }
    })
    .catch((error) => {
      myStore.set(loadingSpinner, { show: false, text: "" });
      myStore.set(infoModal, error.message)
    });
};

export const getComs = () => {
  myStore.set(loadingSpinner, { show: true, text: SERVEUR_LOADING_STRING });
  getAllComs()
    .then((data) => {
      myStore.set(loadingSpinner, { show: false, text: "" });
      if (data != undefined) {
        myStore.set(comsListAtom, data)
      }
    })
    .catch((error) => {
      myStore.set(loadingSpinner, { show: false, text: "" });
      myStore.set(infoModal, error.message)
    });
};