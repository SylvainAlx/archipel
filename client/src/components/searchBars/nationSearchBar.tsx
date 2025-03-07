import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Input from "../form/input";
import Select from "../form/select";
import { useTranslation } from "react-i18next";
import SearchButtons from "../form/searchButtons";
import { useLocation, useNavigate } from "react-router-dom";
import { NationListModel } from "../../models/lists/nationListModel";
import { NATION_SORTING } from "../../settings/sorting";

export interface NationSearchBarProps {
  type: string;
  list: NationListModel;
  // eslint-disable-next-line no-undef
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
  const navigate = useNavigate();

  useEffect(() => {
    setSearchTag(location.hash.replace("#", ""));
  }, [location]);

  useEffect(() => {
    if (list.getItems().length === 0) {
      loadList(searchName, searchTag);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (searchTag != "" && location.hash != "") {
      loadList(searchName, searchTag);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTag]);

  const loadList = async (searchName: string, searchTag: string) => {
    const updatedList = await list.loadNationList(searchName, searchTag);
    if (updatedList) {
      setList(updatedList);
    }
  };

  const reset = () => {
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
        required={searchTag === ""}
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
