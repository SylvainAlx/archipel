/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ChangeEvent,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import Input from "../form/input";
import Select from "../form/select";
import { SetAtom, placesListAtom, statsAtom } from "../../settings/store";
import { useTranslation } from "react-i18next";
import { useAtom } from "jotai";
import { getPlaces } from "../../api/place/placeAPI";
import { getPlaceTypeLabel, getTotalPopulation } from "../../utils/functions";
import { Place } from "../../types/typPlace";
import { placeSearchSortOptions } from "../../settings/lists";
import SearchButtons from "../form/searchButtons";
import {
  sortByCreatedAt,
  sortByName,
  sortPlacesByCitizen,
} from "../../utils/sorting";

export interface SearchBarProps {
  type: string;
  list: any[];
  setList: SetAtom<[SetStateAction<any>], void>;
}

export default function PlaceSearchBar({ list, setList }: SearchBarProps) {
  const { t } = useTranslation();
  const [searchName, setSearchName] = useState("");
  const [sorting, setSorting] = useState("3");
  const [placeType, setPlaceType] = useState({
    type_0: true,
    type_1: true,
    type_2: true,
    type_3: true,
  });
  const [placeList] = useAtom(placesListAtom);
  const [stats] = useAtom(statsAtom);

  useEffect(() => {
    if (placeList.length != stats.counts.places) {
      getPlaces("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stats.counts.places]);

  useEffect(() => {
    placesSorting(placeList, sorting);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placeList]);

  useEffect(() => {
    const updatedList1 = placeList.filter(
      (place) => place.type === 0 && placeType.type_0,
    );
    const updatedList2 = placeList.filter(
      (place) => place.type === 1 && placeType.type_1,
    );
    const updatedList3 = placeList.filter(
      (place) => place.type === 2 && placeType.type_2,
    );
    const updatedList4 = placeList.filter(
      (place) => place.type === 3 && placeType.type_3,
    );
    const newList = [
      ...updatedList1,
      ...updatedList2,
      ...updatedList3,
      ...updatedList4,
    ];
    setList(newList);
    placesSorting(newList, sorting);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placeType]);

  const reset = () => {
    getPlaces("");
    setPlaceType({
      type_0: true,
      type_1: true,
      type_2: true,
      type_3: true,
    });
  };

  const placesSorting = (Alist: Place[], selectOption: string) => {
    const updatedList = [...Alist];
    switch (selectOption) {
      case "0":
        setList(sortByName(updatedList, true));
        break;
      case "1":
        setList(sortByName(updatedList, false));
        break;
      case "2":
        setList(sortPlacesByCitizen(updatedList, true));
        break;
      case "3":
        setList(sortPlacesByCitizen(updatedList, false));
        break;
      case "4":
        setList(sortByCreatedAt(updatedList, true));
        break;
      case "5":
        setList(sortByCreatedAt(updatedList, false));
        break;
      default:
        break;
    }

    if (selectOption === "0") {
      setList(
        updatedList.sort(function (a, b) {
          return a.name.localeCompare(b.name);
        }),
      );
    } else if (selectOption === "1") {
      setList(
        updatedList.sort(function (a, b) {
          return b.name.localeCompare(a.name);
        }),
      );
    } else if (selectOption === "2") {
      setList(
        updatedList.sort(
          (a, b) => getTotalPopulation(a) - getTotalPopulation(b),
        ),
      );
    } else if (selectOption === "3") {
      setList(
        updatedList.sort(
          (a, b) => getTotalPopulation(b) - getTotalPopulation(a),
        ),
      );
    }
    setSorting(selectOption);
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
    getPlaces(searchName);
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
        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          placesSorting(list, e.target.value)
        }
        options={placeSearchSortOptions}
        value={sorting}
      />
      <div className="flex flex-wrap flex-col md:flex-row gap-2 items-center justify-center md:justify-between">
        <fieldset className="flex gap-3">
          <label className="flex gap-2 items-center">
            {getPlaceTypeLabel(0)}
            <input
              type="checkbox"
              id="0"
              checked={placeType.type_0}
              onChange={handleChangeCheckbox}
            />
          </label>
          <label className="flex gap-2 items-center">
            {getPlaceTypeLabel(1)}
            <input
              type="checkbox"
              id="1"
              checked={placeType.type_1}
              onChange={handleChangeCheckbox}
            />
          </label>
          <label className="flex gap-2 items-center">
            {getPlaceTypeLabel(2)}
            <input
              type="checkbox"
              id="2"
              checked={placeType.type_2}
              onChange={handleChangeCheckbox}
            />
          </label>
          <label className="flex gap-2 items-center">
            {getPlaceTypeLabel(3)}
            <input
              type="checkbox"
              id="3"
              checked={placeType.type_3}
              onChange={handleChangeCheckbox}
            />
          </label>
        </fieldset>
        <SearchButtons reset={reset} />
      </div>
    </form>
  );
}
