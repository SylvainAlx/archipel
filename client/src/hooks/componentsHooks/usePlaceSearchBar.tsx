import { useAtom } from "jotai";
import { PlaceListModel } from "../../models/lists/placeListModel";
import { myStore, placeListAtomV2, statsAtom } from "../../settings/store";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { getCounts } from "../../services/statService";

export default function usePlaceSearchBar(
  list: PlaceListModel,
  // eslint-disable-next-line no-undef
  setList: React.Dispatch<React.SetStateAction<PlaceListModel>>,
) {
  const [stats] = useAtom(statsAtom);
  const [searchName, setSearchName] = useState("");
  const [placeType, setPlaceType] = useState({
    type_0: true,
    type_1: true,
    type_2: true,
    type_3: true,
  });

  useEffect(() => {
    if (stats.counts.citizens === 0) {
      getCounts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (myStore.get(placeListAtomV2).getItems().length != stats.counts.places) {
      loadPlaceList(searchName);
    } else {
      loadPlaceList(searchName, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stats, searchName, placeType]);

  const loadPlaceList = async (
    searchName: string,
    forceFetch: boolean = true,
  ) => {
    let updatedList = await list.loadPlaceList(searchName, forceFetch);
    if (updatedList) {
      updatedList = filterPlaceList(updatedList);
      updatedList.sortPlaces(list.sorting);
      setList(updatedList);
    }
  };

  const filterPlaceList = (AList: PlaceListModel) => {
    const updatedList = AList.getItems().filter(
      (place) =>
        (place.type === 0 && placeType.type_0) ||
        (place.type === 1 && placeType.type_1) ||
        (place.type === 2 && placeType.type_2) ||
        (place.type === 3 && placeType.type_3),
    );
    return new PlaceListModel(updatedList, list.sorting);
  };

  const reset = () => {
    loadPlaceList("");
    setSearchName("");
    setPlaceType({
      type_0: true,
      type_1: true,
      type_2: true,
      type_3: true,
    });
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value);
  };

  const handleChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    switch (e.target.id) {
      case "0":
        setPlaceType({ ...placeType, type_0: !placeType.type_0 });
        break;
      case "1":
        setPlaceType({ ...placeType, type_1: !placeType.type_1 });
        break;
      case "2":
        setPlaceType({ ...placeType, type_2: !placeType.type_2 });
        break;
      case "3":
        setPlaceType({ ...placeType, type_3: !placeType.type_3 });
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    loadPlaceList(searchName);
  };

  const handleChangeSorting = (e: ChangeEvent<HTMLSelectElement>) => {
    const updatedList = list.sortPlaces(Number(e.target.value));
    setList(updatedList);
  };

  return {
    searchName,
    placeType,
    reset,
    handleSearch,
    handleChangeSorting,
    handleChangeCheckbox,
    handleSubmit,
  };
}
