import {
  dataCheckedAtom,
  loadingAtom,
  myStore,
  nationPlacesListAtom,
  nationsListAtom,
  placeFetchedAtom,
  placesListAtom,
  session,
  sessionAtom,
  statsAtom,
} from "../../settings/store";
import { Nation } from "../../types/typNation";
import { PlacePayload } from "../../types/typPayload";
import { emptyPlace, Place } from "../../types/typPlace";
import { updateByDBId } from "../../utils/atomArrayFunctions";
import { displayPlaceInfoByType } from "../../utils/displayInfos";
import {
  deleteElementOfAtomArray,
  findElementOfAtomArray,
  updateElementOfAtomArray,
} from "../../utils/functions";
import { errorMessage, successMessage } from "../../utils/toasts";
import {
  createPlaceFetch,
  deletePlaceFetch,
  getAllPlacesFetch,
  getNationPlacesFetch,
  getPlaceFetch,
  getPlacesCountFetch,
  updatePlaceFetch,
} from "./placeFetch";

const nationsList = myStore.get(nationsListAtom);
const setNationsList = (list: Nation[]) => myStore.set(nationsListAtom, list);

const nationPlacesList = myStore.get(nationPlacesListAtom);
const setNationPlacesList = (list: Place[]) =>
  myStore.set(nationPlacesListAtom, list);

const placesList = myStore.get(placesListAtom);
const setPlacesList = (list: Place[]) => myStore.set(placesListAtom, list);

export const getPlacesCount = async () => {
  const stats = myStore.get(statsAtom);
  myStore.set(loadingAtom, true);
  getPlacesCountFetch()
    .then((response) => {
      myStore.set(loadingAtom, false);
      const updatedStats = { ...stats };
      updatedStats.counts.places = response;
      myStore.set(statsAtom, updatedStats);
    })
    .catch((error) => {
      myStore.set(loadingAtom, false);
      errorMessage(error.message);
    });
};

export const createNewPlace = (newPlace: PlacePayload) => {
  myStore.set(loadingAtom, true);
  createPlaceFetch(newPlace)
    .then((data: { place: Place; nation: Nation; infoType: string }) => {
      myStore.set(loadingAtom, false);
      if (data.place) {
        let tempPlaceArray = [...myStore.get(nationPlacesListAtom)];
        tempPlaceArray.push(data.place);
        myStore.set(nationPlacesListAtom, tempPlaceArray);
        tempPlaceArray = [...myStore.get(placesListAtom)];
        tempPlaceArray.push(data.place);
        myStore.set(placesListAtom, tempPlaceArray);
        const tempNationArray = updateByDBId(
          data.nation,
          myStore.get(nationsListAtom),
        );
        myStore.set(nationsListAtom, tempNationArray);
        myStore.set(sessionAtom, { ...session, nation: data.nation });
        displayPlaceInfoByType(data.infoType);
      }
    })
    .catch((error) => {
      myStore.set(loadingAtom, false);
      console.log(error);
      errorMessage(error.message);
    });
};

export const getPlace = (id: string) => {
  myStore.set(loadingAtom, true);
  const place = findElementOfAtomArray(id, placesList);
  if (place === undefined || place === null) {
    getPlaceFetch(id)
      .then((data) => {
        myStore.set(placeFetchedAtom, data.place);
        myStore.set(loadingAtom, false);
      })
      .catch((error) => {
        myStore.set(loadingAtom, false);
        errorMessage(error.message);
      });
  } else {
    myStore.set(placeFetchedAtom, emptyPlace);
    myStore.set(loadingAtom, false);
  }
};

export const getAllPlaces = () => {
  myStore.set(loadingAtom, true);
  getAllPlacesFetch("")
    .then((data) => {
      myStore.set(loadingAtom, false);
      if (data != undefined) {
        myStore.set(placesListAtom, data);
      }
    })
    .catch((error) => {
      myStore.set(loadingAtom, false);
      errorMessage(error.message);
    });
};

export const getPlaces = (searchName: string) => {
  myStore.set(loadingAtom, true);
  getAllPlacesFetch(searchName)
    .then((data) => {
      myStore.set(loadingAtom, false);
      if (data != undefined) {
        myStore.set(placesListAtom, data);
      }
    })
    .catch((error) => {
      myStore.set(loadingAtom, false);
      errorMessage(error.message);
    });
};

export const getNationPlaces = (id: string) => {
  const savedNationPlacesList: Place[] = [];
  placesList.forEach((place) => {
    if (place.nation === id) {
      savedNationPlacesList.push(place);
    }
  });
  if (savedNationPlacesList.length > 0) {
    setNationPlacesList(savedNationPlacesList);
  } else {
    myStore.set(loadingAtom, true);
    getNationPlacesFetch(id)
      .then((resp: Place[]) => {
        myStore.set(loadingAtom, false);
        setNationPlacesList(resp);
        if (resp.length > 0) {
          const copyPlacesList: Place[] = [...placesList];
          copyPlacesList.push(...resp);
          setPlacesList(copyPlacesList);
        }
      })
      .catch((error) => {
        myStore.set(loadingAtom, false);
        errorMessage(error.message);
      });
  }
};

export const deletePlace = (id: string) => {
  myStore.set(loadingAtom, true);
  deletePlaceFetch(id)
    .then((resp: { place: Place; nation: Nation; message: string }) => {
      myStore.set(dataCheckedAtom, false);
      myStore.set(sessionAtom, { ...session, nation: resp.nation });
      updateElementOfAtomArray(resp.nation, nationsList, setNationsList);
      deleteElementOfAtomArray(
        resp.place.officialId,
        nationPlacesList,
        setNationPlacesList,
      );
      deleteElementOfAtomArray(
        resp.place.officialId,
        placesList,
        setPlacesList,
      );
      myStore.set(loadingAtom, false);
      successMessage(resp.message);
    })
    .catch((error) => {
      myStore.set(loadingAtom, false);
      errorMessage(error.message);
    });
};

export const updatePlace = (payload: Place) => {
  myStore.set(loadingAtom, true);
  updatePlaceFetch(payload)
    .then((resp: { place: Place; infoType: string }) => {
      myStore.set(loadingAtom, false);
      if (resp.place) {
        let tempPlaceArray = updateByDBId(
          resp.place,
          myStore.get(placesListAtom),
        );
        myStore.set(placesListAtom, tempPlaceArray);
        tempPlaceArray = updateByDBId(
          resp.place,
          myStore.get(nationPlacesListAtom),
        );
        myStore.set(nationPlacesListAtom, tempPlaceArray);
        displayPlaceInfoByType(resp.infoType);
        // const data = myStore.get(editPlaceAtom);
        // myStore.set(editPlaceAtom, { ...data, place: resp.place });
      }
    })
    .catch((error) => {
      myStore.set(loadingAtom, false);
      errorMessage(error.message);
      console.log(error);
    });
};
