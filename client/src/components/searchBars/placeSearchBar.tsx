/* eslint-disable no-undef */
import Input from "../form/input";
import Select from "../form/select";
import { useTranslation } from "react-i18next";
import SearchButtons from "../form/searchButtons";
import { PLACE_SORTING } from "../../settings/sorting";
import { PlaceListModel } from "../../models/lists/placeListModel";
import { PlaceModel } from "../../models/placeModel";
import usePlaceSearchBar from "../../hooks/componentsHooks/searchBars/usePlaceSearchBar";

export interface PlaceSearchBarProps {
  type: string;
  list: PlaceListModel;
  setList: React.Dispatch<React.SetStateAction<PlaceListModel>>;
}

export default function PlaceSearchBar({ list, setList }: PlaceSearchBarProps) {
  const { t } = useTranslation();
  const {
    searchName,
    placeType,
    reset,
    handleSearch,
    handleChangeSorting,
    handleChangeCheckbox,
    handleSubmit,
  } = usePlaceSearchBar(list, setList);

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
