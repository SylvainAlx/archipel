import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Input from "../form/input";
import Select from "../form/select";
import { useTranslation } from "react-i18next";
import SearchButtons from "../form/searchButtons";
import { CITIZEN_SORTING } from "../../settings/sorting";
import { UserListModel } from "../../models/lists/userListModel";

export interface CitizenSearchBarProps {
  type: string;
  list: UserListModel;
  // eslint-disable-next-line no-undef
  setList: React.Dispatch<React.SetStateAction<UserListModel>>;
}

export default function CitizenSearchBar({
  list,
  setList,
}: CitizenSearchBarProps) {
  const { t } = useTranslation();
  const [searchName, setSearchName] = useState("");
  const [isLeader, setIsLeader] = useState(false);

  useEffect(() => {
    if (list.getItems().length === 0) {
      if (isLeader) {
        const updatedList = list
          .getItems()
          .filter((user) => user.citizenship.nationOwner === true);
        setList(new UserListModel(updatedList));
      } else {
        loadUserList(searchName);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadUserList = async (searchName: string) => {
    let updatedList = await list.loadUserList(searchName);
    updatedList = updatedList.sortUsers(list.sorting);
    if (updatedList) {
      setList(updatedList);
    }
  };

  const reset = () => {
    loadUserList("");
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    loadUserList(searchName);
  };

  const handleChangeCheckbox = () => {
    setIsLeader(!isLeader);
  };

  const handleChangeSorting = (e: ChangeEvent<HTMLSelectElement>) => {
    const updatedList = list.sortUsers(Number(e.target.value));
    setList(updatedList);
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
        onChange={handleChangeSorting}
        options={Object.values(CITIZEN_SORTING)}
        value={list.sorting}
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
