import { SERVEUR_LOADING_STRING } from "../settings/consts";
import {
  loadingSpinner,
  myStore,
  nationsListAtom,
  infoModal,
  comsListAtom,
  nationAtom,
  selectedNationAtom,
  nationsRoleplayDataAtom,
  placesListAtom,
} from "../settings/store";
import { EmptyNation, Nation } from "../types/typNation";
import {
  authGet,
  getAllComs,
  getAllNations,
  getAllPlacesFetch,
  getOneNationFetch,
  getRoleplayDataFetch,
} from "./fetch";
import { GET_JWT } from "./functions";

// Auth

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
};

// Nation

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
      myStore.set(infoModal, error.message);
    });
};

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
      myStore.set(infoModal, error.message);
    });
};

export const getRoleplayData = (selectedNation: Nation) => {
  const nationsRoleplayData = myStore.get(nationsRoleplayDataAtom);
  myStore.set(loadingSpinner, { show: true, text: SERVEUR_LOADING_STRING });
  getRoleplayDataFetch(selectedNation._id)
    .then((data) => {
      myStore.set(loadingSpinner, { show: false, text: "" });
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
      myStore.set(loadingSpinner, { show: false, text: "" });
      myStore.set(infoModal, error.message);
    });
};

// Com

export const getComs = () => {
  myStore.set(loadingSpinner, { show: true, text: SERVEUR_LOADING_STRING });
  getAllComs()
    .then((data) => {
      myStore.set(loadingSpinner, { show: false, text: "" });
      if (data != undefined) {
        myStore.set(comsListAtom, data);
      }
    })
    .catch((error) => {
      myStore.set(loadingSpinner, { show: false, text: "" });
      myStore.set(infoModal, error.message);
    });
};

// Place

export const getAllPlaces = () => {
  myStore.set(loadingSpinner, { show: true, text: SERVEUR_LOADING_STRING });
  getAllPlacesFetch()
    .then((data) => {
      myStore.set(loadingSpinner, { show: false, text: "" });
      if (data != undefined) {
        myStore.set(placesListAtom, data);
      }
    })
    .catch((error) => {
      myStore.set(loadingSpinner, { show: false, text: "" });
      myStore.set(infoModal, error.message);
    });
};
