import { SERVEUR_LOADING_STRING } from "../../settings/consts";
import { dataCheckedAtom, infoModalAtom, loadingSpinner, myStore, nationAtom, nationPlacesListAtom, nationsListAtom, placesListAtom } from "../../settings/store";
import { Nation } from "../../types/typNation";
import { PlacePayload } from "../../types/typPayload";
import { Place } from "../../types/typPlace";
import { createElementOfAtomArray, deleteElementOfAtomArray, updateElementOfAtomArray } from "../../utils/functions";
import { createPlaceFetch, deletePlaceFetch, getAllPlacesFetch, getNationPlacesFetch } from "./placeFetch";

const nationsList = myStore.get(nationsListAtom);
const setNationsList = (list: Nation[]) => myStore.set(nationsListAtom, list);
const nationPlacesList = myStore.get(nationPlacesListAtom);
const setNationPlacesList = (list: Place[]) =>
  myStore.set(nationPlacesListAtom, list);
const placesList = myStore.get(placesListAtom)
const setPlacesList = (list: Place[]) => myStore.set(placesListAtom, list);


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
        createElementOfAtomArray(data.place, placesList, setPlacesList)
        myStore.set(nationAtom, data.nation);
        myStore.set(infoModalAtom, data.message);
      }
    })
    .catch((error) => {
      myStore.set(loadingSpinner, { show: false, text: "" });
      myStore.set(infoModalAtom, error.message);
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
      myStore.set(infoModalAtom, error.message);
    });
};

export const getNationPlaces = (id: string) => {
  const savedNationPlacesList: Place[] = []
  placesList.forEach((place) => {
    if (place.nation === id) {    
      savedNationPlacesList.push(place)
    }
  })
  if (savedNationPlacesList.length > 0) {
    setNationPlacesList(savedNationPlacesList);
  } else {
    myStore.set(loadingSpinner, { show: true, text: SERVEUR_LOADING_STRING });
    getNationPlacesFetch(id)
      .then((resp: Place[]) => {
        myStore.set(loadingSpinner, { show: false, text: "" });
        setNationPlacesList(resp);
        if (resp.length > 0) {
          const copyPlacesList: Place[] = [...placesList]
          copyPlacesList.push(...resp)
          setPlacesList(copyPlacesList)
        }
      })
      .catch((error) => {
        myStore.set(loadingSpinner, { show: false, text: "" });
        myStore.set(infoModalAtom, error.message);
      });
    }
  
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
      deleteElementOfAtomArray(resp.place, placesList, setPlacesList)
      myStore.set(loadingSpinner, { show: false, text: "" });
      myStore.set(infoModalAtom, resp.message);
    })
    .catch((error) => {
      myStore.set(loadingSpinner, { show: false, text: "" });
      myStore.set(infoModalAtom, error.message);
    });
};