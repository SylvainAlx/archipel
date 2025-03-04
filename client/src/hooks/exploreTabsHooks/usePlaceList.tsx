import { useState } from "react";
import { PlaceListModel } from "../../models/lists/placeListModel";
import { ELEMENTS_DISPLAYED_LIMIT } from "../../settings/consts";

export function usePlaceList() {
  const [placesList, setPlacesList] = useState<PlaceListModel>(
    new PlaceListModel(),
  );
  const [displayedPlaces, setDisplayedPlaces] = useState(
    ELEMENTS_DISPLAYED_LIMIT.places,
  );
  return {
    placesList,
    setPlacesList,
    displayedPlaces,
    setDisplayedPlaces,
  };
}
