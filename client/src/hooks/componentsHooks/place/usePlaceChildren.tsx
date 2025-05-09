import { useEffect, useState } from "react";
import { PlaceListModel } from "../../../models/lists/placeListModel";
import { PlaceModel } from "../../../models/placeModel";

export default function usePlaceChildren(
  place: PlaceModel,
  nationPlaceList: PlaceListModel,
) {
  const [children, setChildren] = useState<PlaceListModel>(nationPlaceList);

  useEffect(() => {
    setChildren(nationPlaceList.getPlacesByParentId(place.officialId));
  }, [nationPlaceList, place.officialId]);

  return { children };
}
