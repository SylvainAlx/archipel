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
import Select from "../form/select";
import {
  SetAtom,
  nationsListFetchedAtom,
  statsAtom,
} from "../../settings/store";
import { useTranslation } from "react-i18next";
import { useAtom } from "jotai";
import { nationSearchSortOptions } from "../../settings/lists";
import SearchButtons from "../form/searchButtons";
import { useLocation, useNavigate } from "react-router-dom";
import {
  sortByCreatedAt,
  sortByName,
  sortByPlaces,
  sortByTreasury,
  sortNationsByCitizens,
} from "../../utils/sorting";

export interface SearchBarProps {
  type: string;
  list: any[];
  setList: SetAtom<[SetStateAction<any>], void>;
}

export default function NationSearchBar({ list, setList }: SearchBarProps) {
  const [selectOption, setSelectOption] = useState("5");
  const { t } = useTranslation();
  const [searchName, setSearchName] = useState("");
  const [searchTag, setSearchTag] = useState("");
  const [nationsList] = useAtom(nationsListFetchedAtom);
  const [stats] = useAtom(statsAtom);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (nationsList.length != stats.counts.nations) {
      getNations(searchName, searchTag);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stats.counts.nations]);

  useEffect(() => {
    nationsSorting();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectOption, nationsList]);

  useEffect(() => {
    setSearchTag(location.hash.replace("#", ""));
  }, [location]);

  useEffect(() => {
    if (searchTag != "" && location.hash != "") {
      getNations(searchName, searchTag);
    }
  }, [searchTag]);

  const reset = () => {
    getNations("", "");
    setSelectOption("5");
    setSearchName("");
    setSearchTag("");
    navigate(`/explore/2`);
  };

  const nationsSorting = () => {
    list = [...nationsList];
    switch (selectOption) {
      case "0":
        setList(sortByName(list, true));
        break;
      case "1":
        setList(sortByName(list, false));
        break;
      case "2":
        setList(sortByPlaces(list, true));
        break;
      case "3":
        setList(sortByPlaces(list, false));
        break;
      case "4":
        setList(sortNationsByCitizens(list, true));
        break;
      case "5":
        setList(sortNationsByCitizens(list, false));
        break;
      case "6":
        setList(sortByTreasury(list, true));
        break;
      case "7":
        setList(sortByTreasury(list, false));
        break;
      case "8":
        setList(sortByCreatedAt(list, true));
        break;
      case "9":
        setList(sortByCreatedAt(list, false));
        break;
      default:
        break;
    }
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    getNations(searchName, searchTag);
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

      <SearchButtons reset={reset} />
    </form>
  );
}
