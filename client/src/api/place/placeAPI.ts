import {
  dataCheckedAtom,
  loadingAtom,
  myStore,
  nationFetchedAtom,
  nationPlacesListAtom,
  nationsListAtom,
  placeFetchedAtom,
  placesListAtom,
  statsAtom,
} from "../../settings/store";
import { Nation } from "../../types/typNation";
import { PlacePayload } from "../../types/typPayload";
import { Place } from "../../types/typPlace";
import {
  spliceByOfficialId,
  updateByDBId,
  updateByOfficialId,
  updateOrCreatePlaceInMemory,
} from "../../utils/atomArrayFunctions";
import { displayPlaceInfoByType } from "../../utils/displayInfos";
import { findElementOfAtomArray } from "../../utils/functions";
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
        myStore.set(nationFetchedAtom, data.nation);
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
  const place = findElementOfAtomArray(id, myStore.get(placesListAtom));
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
    myStore.set(placeFetchedAtom, place);
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
  myStore.get(placesListAtom).forEach((place) => {
    if (place.nation === id) {
      savedNationPlacesList.push(place);
    }
  });
  if (savedNationPlacesList.length > 0) {
    myStore.set(nationPlacesListAtom, savedNationPlacesList);
  } else {
    myStore.set(loadingAtom, true);
    getNationPlacesFetch(id)
      .then((resp: Place[]) => {
        myStore.set(loadingAtom, false);
        myStore.set(nationPlacesListAtom, resp);
        if (resp.length > 0) {
          resp.forEach((place) => {
            updateOrCreatePlaceInMemory(place);
          });
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
      myStore.set(nationFetchedAtom, resp.nation);
      const tempPlaceArray = updateByOfficialId(
        resp.nation,
        myStore.get(nationsListAtom),
      );
      myStore.set(nationsListAtom, tempPlaceArray);
      const tempNationPlacesArray = spliceByOfficialId(
        resp.place.officialId,
        myStore.get(nationPlacesListAtom),
      );
      myStore.set(nationPlacesListAtom, tempNationPlacesArray);
      const tempPlacesListArray = spliceByOfficialId(
        resp.place.officialId,
        myStore.get(placesListAtom),
      );
      myStore.set(placesListAtom, tempPlacesListArray);

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
        updateOrCreatePlaceInMemory(resp.place);
        const tempPlaceArray = updateByOfficialId(
          resp.place,
          myStore.get(nationPlacesListAtom),
        );
        myStore.set(nationPlacesListAtom, tempPlaceArray);
        myStore.set(placeFetchedAtom, resp.place);
        displayPlaceInfoByType(resp.infoType);
      }
    })
    .catch((error) => {
      myStore.set(loadingAtom, false);
      errorMessage(error.message);
      console.log(error);
    });
};
