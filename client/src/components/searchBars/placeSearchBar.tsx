/* eslint-disable no-undef */
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import Input from "../form/input";
import Select from "../form/select";
import { useTranslation } from "react-i18next";
import SearchButtons from "../form/searchButtons";
import { PLACE_SORTING } from "../../settings/sorting";
import { PlaceListModel } from "../../models/lists/placeListModel";
import { PlaceModel } from "../../models/placeModel";

export interface PlaceSearchBarProps {
  type: string;
  list: PlaceListModel;
  setList: React.Dispatch<React.SetStateAction<PlaceListModel>>;
}

export default function PlaceSearchBar({ list, setList }: PlaceSearchBarProps) {
  const { t } = useTranslation();
  const [searchName, setSearchName] = useState("");
  const [placeType, setPlaceType] = useState({
    type_0: true,
    type_1: true,
    type_2: true,
    type_3: true,
  });

  useEffect(() => {
    if (list.getItems().length === 0) {
      loadPlaceList(searchName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const updatedList1 = list
      .getItems()
      .filter((place) => place.type === 0 && placeType.type_0);
    const updatedList2 = list
      .getItems()
      .filter((place) => place.type === 1 && placeType.type_1);
    const updatedList3 = list
      .getItems()
      .filter((place) => place.type === 2 && placeType.type_2);
    const updatedList4 = list
      .getItems()
      .filter((place) => place.type === 3 && placeType.type_3);
    const newList = [
      ...updatedList1,
      ...updatedList2,
      ...updatedList3,
      ...updatedList4,
    ];
    setList(new PlaceListModel(newList, list.sorting));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placeType]);

  const loadPlaceList = async (searchName: string) => {
    let updatedList = await list.loadPlaceList(searchName);
    updatedList = updatedList.sortPlaces(list.sorting);
    if (updatedList) {
      setList(updatedList);
    }
  };

  const reset = () => {
    loadPlaceList("");
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

  return (
    <form
      className={`w-full p-4 flex flex-wrap items-end justify-center gap-4`}
      onSubmit={handleSubmit}
    >
      <Input
        required={true}
        onChange={handleSearch}
        type="text"
        name="name"
        placeholder={t("components.searchBars.placesList.input")}
        value={searchName}
      />
      <Select
        onChange={handleChangeSorting}
        options={Object.values(PLACE_SORTING)}
        value={list.sorting}
      />
      <div className="flex flex-wrap flex-col md:flex-row gap-2 items-center justify-center md:justify-between">
        <fieldset className="flex gap-3">
          {[0, 1, 2, 3].map((index) => (
            <label key={index} className="flex gap-2 items-center">
              {new PlaceModel({ type: index }).getPlaceTypeLabel()}
              <input
                type="checkbox"
                id={String(index)}
                checked={placeType[`type_${index}` as keyof typeof placeType]}
                onChange={handleChangeCheckbox}
              />
            </label>
          ))}
        </fieldset>
        <SearchButtons reset={reset} />
      </div>
    </form>
  );
}
