import {
  dataCheckedAtom,
  loadingAtom,
  myStore,
  nationFetchedAtom,
  nationPlacesListAtom,
  nationsListAtom,
  placeFetchedAtom,
  placesListAtom,
  sessionAtom,
  statsAtom,
} from "../../settings/store";
import { Nation } from "../../types/typNation";
import { PlacePayload } from "../../types/typPayload";
import { Place } from "../../types/typPlace";
import {
  getUpdateByOfficialId,
  spliceByOfficialId,
  updateOrCreateNationInMemory,
  updateOrCreatePlaceInMemory,
} from "../../utils/atomArrayFunctions";
import { displayPlaceInfoByType } from "../../utils/displayInfos";
import { findElementOfAtomArray } from "../../utils/functions";
import {
  createPlaceFetch,
  deletePlaceFetch,
  getAllPlacesFetch,
  getNationPlacesFetch,
  getPlaceFetch,
  getPlacesCountFetch,
  updatePlaceFetch,
} from "./placeFetch";

export const getPlacesCount = () => {
  myStore.set(loadingAtom, true);
  getPlacesCountFetch()
    .then((response) => {
      myStore.set(loadingAtom, false);
      const updatedStats = structuredClone(myStore.get(statsAtom));
      updatedStats.counts.places = response;
      myStore.set(statsAtom, updatedStats);
    })
    .catch((error) => {
      myStore.set(loadingAtom, false);
      console.error(error);
      displayPlaceInfoByType(error.infoType);
    });
};

export const createNewPlace = (newPlace: PlacePayload) => {
  myStore.set(loadingAtom, true);
  createPlaceFetch(newPlace)
    .then((data: { place: Place; nation: Nation; infoType: string }) => {
      myStore.set(loadingAtom, false);
      if (data.place && data.nation) {
        myStore.set(nationPlacesListAtom, [
          ...myStore.get(nationPlacesListAtom),
          data.place,
        ]);
        myStore.set(placesListAtom, [
          ...myStore.get(placesListAtom),
          data.place,
        ]);
        const session = myStore.get(sessionAtom);
        myStore.set(sessionAtom, {
          nation: data.nation,
          user: session.user,
          jwt: session.jwt,
        });
        updateOrCreateNationInMemory(data.nation);
        myStore.set(nationFetchedAtom, data.nation);
      }
      displayPlaceInfoByType(data.infoType);
    })
    .catch((error) => {
      myStore.set(loadingAtom, false);
      console.error(error);
      displayPlaceInfoByType(error.infoType);
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
        displayPlaceInfoByType(error.infoType);
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
      console.error(error);
      displayPlaceInfoByType(error.infoType);
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
      console.error(error);
      displayPlaceInfoByType(error.infoType);
    });
};

export const getNationPlaces = (nation: Nation) => {
  const savedNationPlacesList: Place[] = [];
  myStore.get(placesListAtom).forEach((place) => {
    if (place.nation === nation.officialId) {
      savedNationPlacesList.push(place);
    }
  });
  if (
    savedNationPlacesList.length > 0 &&
    nation.data.roleplay.places === savedNationPlacesList.length
  ) {
    myStore.set(nationPlacesListAtom, savedNationPlacesList);
  } else {
    myStore.set(loadingAtom, true);
    getNationPlacesFetch(nation.officialId)
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
        console.error(error);
        displayPlaceInfoByType(error.infoType);
      });
  }
};

export const deletePlace = (id: string) => {
  myStore.set(loadingAtom, true);
  deletePlaceFetch(id)
    .then((resp: { place: Place; nation: Nation; infoType: string }) => {
      myStore.set(dataCheckedAtom, false);
      myStore.set(nationFetchedAtom, resp.nation);
      const tempPlaceArray = getUpdateByOfficialId({
        element: resp.nation,
        array: myStore.get(nationsListAtom),
      });
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
      const session = myStore.get(sessionAtom);
      myStore.set(sessionAtom, {
        nation: resp.nation,
        user: session.user,
        jwt: session.jwt,
      });

      myStore.set(loadingAtom, false);
      displayPlaceInfoByType(resp.infoType);
    })
    .catch((error) => {
      myStore.set(loadingAtom, false);
      console.error(error);
      displayPlaceInfoByType(error.infoType);
    });
};

export const updatePlace = (payload: Place) => {
  myStore.set(loadingAtom, true);
  updatePlaceFetch(payload)
    .then((resp: { place: Place; infoType: string }) => {
      myStore.set(loadingAtom, false);
      if (resp.place) {
        updateOrCreatePlaceInMemory(resp.place);
        const tempNationPlaceArray = getUpdateByOfficialId({
          element: resp.place,
          array: myStore.get(nationPlacesListAtom),
        });
        myStore.set(nationPlacesListAtom, tempNationPlaceArray);
        myStore.set(placeFetchedAtom, resp.place);
        displayPlaceInfoByType(resp.infoType);
      }
    })
    .catch((error) => {
      myStore.set(loadingAtom, false);
      console.error(error);
      displayPlaceInfoByType(error.infoType);
    });
};
