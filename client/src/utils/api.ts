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
  dataCheckedAtom,
  nationPlacesListAtom,
} from "../settings/store";
import { EmptyNation, Nation } from "../types/typNation";
import { PlacePayload } from "../types/typPayload";
import { Place } from "../types/typPlace";
import {
  authGet,
  createPlaceFetch,
  deletePlaceFetch,
  getAllComs,
  getAllNations,
  getAllPlacesFetch,
  getNationPlacesFetch,
  getOneNationFetch,
  getRoleplayDataFetch,
} from "./fetch";
import {
  GET_JWT,
  createElementOfAtomArray,
  deleteElementOfAtomArray,
  updateElementOfAtomArray,
} from "./functions";

const nationsList = myStore.get(nationsListAtom);
const setNationsList = (list: Nation[]) => myStore.set(nationsListAtom, list);
const nationPlacesList = myStore.get(nationPlacesListAtom);
const setNationPlacesList = (list: Place[]) =>
  myStore.set(nationPlacesListAtom, list);

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

export const createNewPlace = (newPlace: PlacePayload) => {
  myStore.set(loadingSpinner, { show: true, text: SERVEUR_LOADING_STRING });
  createPlaceFetch(newPlace)
    .then((data) => {
      myStore.set(loadingSpinner, { show: false, text: "" });
      if (data.place) {
        createElementOfAtomArray(
          data.place,
          nationPlacesList,
          setNationPlacesList,
        );
        myStore.set(nationAtom, data.nation);
        myStore.set(infoModal, data.message);
      }
    })
    .catch((error) => {
      myStore.set(loadingSpinner, { show: false, text: "" });
      myStore.set(infoModal, error.message);
    });
};

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

export const getNationPlaces = (id: string) => {
  myStore.set(loadingSpinner, { show: true, text: SERVEUR_LOADING_STRING });
  getNationPlacesFetch(id)
    .then((resp: Place[]) => {
      myStore.set(loadingSpinner, { show: false, text: "" });
      setNationPlacesList(resp);
    })
    .catch((error) => {
      myStore.set(loadingSpinner, { show: false, text: "" });
      myStore.set(infoModal, error.message);
    });
};

export const deletePlace = (id: string) => {
  myStore.set(loadingSpinner, { show: true, text: SERVEUR_LOADING_STRING });
  deletePlaceFetch(id)
    .then((resp) => {
      myStore.set(dataCheckedAtom, false);
      myStore.set(nationAtom, resp.nation);
      updateElementOfAtomArray(resp.nation, nationsList, setNationsList);
      deleteElementOfAtomArray(
        resp.place,
        nationPlacesList,
        setNationPlacesList,
      );
      myStore.set(loadingSpinner, { show: false, text: "" });
      myStore.set(infoModal, resp.message);
    })
    .catch((error) => {
      myStore.set(loadingSpinner, { show: false, text: "" });
      myStore.set(infoModal, error.message);
    });
};
