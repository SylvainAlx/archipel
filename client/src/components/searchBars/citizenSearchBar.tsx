/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ChangeEvent,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import { getNations } from "../../api/nation/nationAPI";
import Input from "../form/input";
import Button from "../buttons/button";
import Select from "../form/select";
import { SetAtom, citizenListAtom } from "../../settings/store";
import { useTranslation } from "react-i18next";
import { useAtom } from "jotai";
import { getCitizens } from "../../api/user/userAPI";
import { citizenSearchSortOptions } from "../../settings/consts";

export interface SearchBarProps {
  type: string;
  list: any[];
  setList: SetAtom<[SetStateAction<any>], void>;
}

export default function CitizenSearchBar({ list, setList }: SearchBarProps) {
  const [selectOption, setSelectOption] = useState("0");
  const { t } = useTranslation();
  const [searchName, setSearchName] = useState("");
  const [citizenList] = useAtom(citizenListAtom);

  useEffect(() => {
    if (citizenList.length === 0) {
      getCitizens("");
    } else if (citizenList.length > 0) {
      if (citizenList[0].officialId === "") {
        getCitizens("");
      }
    }
  }, []);

  useEffect(() => {
    citizensSorting();
  }, [selectOption, citizenList]);

  const reset = () => {
    getNations("");
    setSelectOption("0");
  };

  const citizensSorting = () => {
    list = [...citizenList];
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
    getNations(searchName);
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
        placeholder={t("components.searchBars.citizensList.input")}
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
