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
import { SetAtom, citizenListAtom, statsAtom } from "../../settings/store";
import { useTranslation } from "react-i18next";
import { useAtom } from "jotai";
import { getCitizens } from "../../api/user/userAPI";
import { citizenSearchSortOptions } from "../../settings/lists";
import SearchButtons from "../form/searchButtons";

export interface SearchBarProps {
  type: string;
  list: any[];
  setList: SetAtom<[SetStateAction<any>], void>;
}

export default function CitizenSearchBar({ list, setList }: SearchBarProps) {
  const [selectOption, setSelectOption] = useState("0");
  const { t } = useTranslation();
  const [searchName, setSearchName] = useState("");
  const [isLeader, setIsLeader] = useState(false);
  const [citizenList] = useAtom(citizenListAtom);
  const [stats] = useAtom(statsAtom);

  useEffect(() => {
    if (citizenList.length != stats.counts.citizens) {
      getCitizens("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stats.counts.citizens]);

  useEffect(() => {
    citizensSorting();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectOption, citizenList, isLeader]);

  const reset = () => {
    getCitizens("");
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

    if (isLeader) {
      const updatedList = list.filter(
        (citizen) => citizen.citizenship.nationOwner === true,
      );
      setList(updatedList);
    }
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    getCitizens(searchName);
  };

  const handleChangeCheckbox = () => {
    setIsLeader(!isLeader);
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
      <div className="flex flex-wrap flex-col md:flex-row gap-2 items-center justify-center md:justify-between">
        <fieldset className="flex gap-3">
          <label className="flex gap-2 items-center">
            {t("components.hoverInfos.tags.nationOwner")}
            <input
              type="checkbox"
              id="0"
              checked={isLeader}
              onChange={handleChangeCheckbox}
            />
          </label>
        </fieldset>
        <SearchButtons reset={reset} />
      </div>
    </form>
  );
}
