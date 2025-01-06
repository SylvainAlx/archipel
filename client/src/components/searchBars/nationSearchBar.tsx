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
import SearchButtons from "../form/searchButtons";
import { useLocation, useNavigate } from "react-router-dom";
import {
  sortByCreatedAt,
  sortByName,
  sortByPlaces,
  sortNationsByCitizens,
} from "../../utils/sorting";
import { NATION_SORTING } from "../../settings/sorting";

export interface SearchBarProps {
  type: string;
  list: any[];
  setList: SetAtom<[SetStateAction<any>], void>;
}

export default function NationSearchBar({ list, setList }: SearchBarProps) {
  const [selectOption, setSelectOption] = useState(NATION_SORTING.descCtz.id);
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
    setSelectOption(NATION_SORTING.descCtz.id);
    setSearchName("");
    setSearchTag("");
    navigate(`/explore/2`);
  };

  const nationsSorting = () => {
    list = [...nationsList];
    switch (selectOption) {
      case NATION_SORTING.ascAlpha.id:
        setList(sortByName(list, true));
        break;
      case NATION_SORTING.descAlpha.id:
        setList(sortByName(list, false));
        break;
      case NATION_SORTING.ascLoc.id:
        setList(sortByPlaces(list, true));
        break;
      case NATION_SORTING.descLoc.id:
        setList(sortByPlaces(list, false));
        break;
      case NATION_SORTING.ascCtz.id:
        setList(sortNationsByCitizens(list, true));
        break;
      case NATION_SORTING.descCtz.id:
        setList(sortNationsByCitizens(list, false));
        break;
      // case NATION_SORTING.ascTreasury.id:
      //   setList(sortByTreasury(list, true));
      //   break;
      // case NATION_SORTING.descTreasury.id:
      //   setList(sortByTreasury(list, false));
      //   break;
      case NATION_SORTING.ascDate.id:
        setList(sortByCreatedAt(list, true));
        break;
      case NATION_SORTING.descDate.id:
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
          setSelectOption(Number(e.target.value))
        }
        options={Object.values(NATION_SORTING)}
        value={selectOption}
      />

      <SearchButtons reset={reset} />
    </form>
  );
}
