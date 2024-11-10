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
import {
  SetAtom,
  nationsListFetchedAtom,
  statsAtom,
} from "../../settings/store";
import { nationSearchSortOptions } from "../../settings/consts";
import { useTranslation } from "react-i18next";
import { useAtom } from "jotai";

export interface SearchBarProps {
  type: string;
  list: any[];
  setList: SetAtom<[SetStateAction<any>], void>;
}

export default function NationSearchBar({ list, setList }: SearchBarProps) {
  const [selectOption, setSelectOption] = useState("7");
  const { t } = useTranslation();
  const [searchName, setSearchName] = useState("");
  const [searchTag, setSearchTag] = useState("");
  const [nationsList] = useAtom(nationsListFetchedAtom);
  const [stats] = useAtom(statsAtom);

  useEffect(() => {
    if (nationsList.length != stats.counts.nations) {
      getNations("", "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stats.counts.nations]);

  useEffect(() => {
    nationsSorting();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectOption, nationsList]);

  const reset = () => {
    getNations("", "");
    setSelectOption("7");
    setSearchName("");
    setSearchTag("");
  };

  const nationsSorting = () => {
    list = [...nationsList];
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
    } else if (selectOption === "2") {
      setList(
        list.sort(function (a, b) {
          return a.data.roleplay.places - b.data.roleplay.places;
        }),
      );
    } else if (selectOption === "3") {
      setList(
        list.sort(function (a, b) {
          return b.data.roleplay.places - a.data.roleplay.places;
        }),
      );
    } else if (selectOption === "4") {
      setList(
        list.sort(function (a, b) {
          return a.data.roleplay.citizens - b.data.roleplay.citizens;
        }),
      );
    } else if (selectOption === "5") {
      setList(
        list.sort(function (a, b) {
          return b.data.roleplay.citizens - a.data.roleplay.citizens;
        }),
      );
    } else if (selectOption === "6") {
      setList(
        list.sort(function (a, b) {
          return a.data.roleplay.treasury - b.data.roleplay.treasury;
        }),
      );
    } else if (selectOption === "7") {
      setList(
        list.sort(function (a, b) {
          return b.data.roleplay.treasury - a.data.roleplay.treasury;
        }),
      );
    }
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    getNations(searchName, searchTag);
    // console.log(searchName, searchTag);
  };

  return (
    <form
      className={`w-full p-4 flex flex-wrap items-end justify-center gap-4`}
      onSubmit={handleSubmit}
    >
      <Input
        required={false}
        onChange={handleSearch}
        type="text"
        name="name"
        placeholder={t("components.searchBars.nationsList.name")}
        value={searchName}
      />
      <Input
        required={false}
        onChange={(e) => setSearchTag(e.target.value)}
        type="text"
        name="tag"
        placeholder={t("components.searchBars.nationsList.tag")}
        value={searchTag}
      />
      <Select
        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          setSelectOption(e.target.value)
        }
        options={nationSearchSortOptions}
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
