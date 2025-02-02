/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Input from "../form/input";
import Select from "../form/select";
import { statsAtom } from "../../settings/store";
import { useTranslation } from "react-i18next";
import { useAtom } from "jotai";
import SearchButtons from "../form/searchButtons";
import { useLocation, useNavigate } from "react-router-dom";
import { NationListModel } from "../../models/lists/nationListModel";
import { NATION_SORTING } from "../../settings/sorting";

export interface NationSearchBarProps {
  type: string;
  list: NationListModel;
  setList: React.Dispatch<React.SetStateAction<NationListModel>>;
}

export default function NationSearchBar({
  list,
  setList,
}: NationSearchBarProps) {
  const { t } = useTranslation();
  const location = useLocation();
  const [searchName, setSearchName] = useState("");
  const [searchTag, setSearchTag] = useState(location.hash.replace("#", ""));
  const [stats] = useAtom(statsAtom);
  const navigate = useNavigate();

  useEffect(() => {
    setSearchTag(location.hash.replace("#", ""));
  }, [location]);

  useEffect(() => {
    if (
      list.getItems().length != stats.counts.nations ||
      list.getItems().length === 0
    ) {
      loadList(searchName, searchTag);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stats.counts.nations]);

  useEffect(() => {
    if (searchTag != "" && location.hash != "") {
      loadList(searchName, searchTag);
    }
  }, [searchTag]);

  const loadList = async (searchName: string, searchTag: string) => {
    const updatedList = await list.loadNationList(searchName, searchTag);
    if (updatedList) {
      updatedList.sortNations(updatedList.sorting);
      setList(updatedList);
    }
  };

  const reset = () => {
    setSearchName("");
    setSearchTag("");
    loadList("", "");
    navigate(`/explore/2`);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    loadList(searchName, searchTag);
  };

  const handleChangeSorting = (e: ChangeEvent<HTMLSelectElement>) => {
    const updatedList = list.sortNations(Number(e.target.value));
    setList(updatedList);
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
        onChange={handleChangeSorting}
        options={Object.values(NATION_SORTING)}
        value={list.sorting}
      />

      <SearchButtons reset={reset} />
    </form>
  );
}
