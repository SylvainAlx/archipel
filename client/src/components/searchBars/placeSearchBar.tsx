/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ChangeEvent,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import Input from "../form/input";
import Button from "../buttons/button";
import Select from "../form/select";
import { SetAtom, placesListAtom } from "../../settings/store";
import { useTranslation } from "react-i18next";
import { useAtom } from "jotai";
import { citizenSearchSortOptions } from "../../settings/consts";
import { getPlaces } from "../../api/place/placeAPI";

export interface SearchBarProps {
  type: string;
  list: any[];
  setList: SetAtom<[SetStateAction<any>], void>;
}

export default function PlaceSearchBar({ list, setList }: SearchBarProps) {
  const [selectOption, setSelectOption] = useState("0");
  const { t } = useTranslation();
  const [searchName, setSearchName] = useState("");
  const [placeList] = useAtom(placesListAtom);

  useEffect(() => {
    if (placeList.length === 0) {
      getPlaces("");
    } else if (placeList.length > 0) {
      if (placeList[0].officialId === "") {
        getPlaces("");
      }
    }
  }, []);

  useEffect(() => {
    placesSorting();
  }, [selectOption, placeList]);

  const reset = () => {
    getPlaces("");
    setSelectOption("0");
  };

  const placesSorting = () => {
    list = [...placeList];
    if (selectOption === "0") {
      setList(
        list.sort(function (a, b) {
          return a.name.localeCompare(b.name);
        }),
      );
    } else if (selectOption === "1") {
      setList(
        list.sort(function (a, b) {
          return b.name.localeCompare(a.name);
        }),
      );
    }
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value);
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
          setSelectOption(e.target.value)
        }
        options={citizenSearchSortOptions}
        value={selectOption}
      />

      <div className="pb-2 flex flex-wrap gap-2 items-center justify-center md:justify-end">
        <div className="w-[150px] flex justify-center">
          <Button
            type="submit"
            disabled={false}
            text={t("components.buttons.search")}
          />
        </div>
        <div className="w-[150px] flex justify-center">
          <Button
            type="button"
            disabled={false}
            text={t("components.buttons.reset")}
            click={reset}
          />
        </div>
      </div>
    </form>
  );
}
