import { useEffect, useState } from "react";
import { PlaceListModel } from "../models/lists/placeListModel";
import { NationModel } from "../models/nationModel";

export function useLoadNationPlaces(selectedNation: NationModel) {
  const [nationPlaceList, setNationPlaceList] = useState<PlaceListModel>(
    new PlaceListModel(),
  );

  // Chargement des places de la nation
  useEffect(() => {
    if (selectedNation.officialId != "") {
      const loadNationPlaceList = async () => {
        const list = await nationPlaceList.loadNationPlaces(selectedNation);
        setNationPlaceList(list);
      };
      loadNationPlaceList();
    }
  }, [selectedNation]);

  return nationPlaceList;
}
