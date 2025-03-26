import { useAtom } from "jotai";
import { UserListModel } from "../../models/lists/userListModel";
import { myStore, statsAtom, userListAtomV2 } from "../../settings/store";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { getCounts } from "../../services/statService";

export default function useCitizenSearchBar(
  list: UserListModel,
  // eslint-disable-next-line no-undef
  setList: React.Dispatch<React.SetStateAction<UserListModel>>,
) {
  const [stats] = useAtom(statsAtom);
  const [searchName, setSearchName] = useState("");
  const [isLeader, setIsLeader] = useState(false);

  useEffect(() => {
    if (stats.counts.citizens === 0) {
      getCounts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (
      myStore.get(userListAtomV2).getItems().length != stats.counts.citizens
    ) {
      loadUserList(searchName);
    } else {
      loadUserList(searchName, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stats, searchName, isLeader]);

  const loadUserList = async (
    searchName: string,
    forceFetch: boolean = true,
    onlyOnwers: boolean = isLeader,
  ) => {
    const updatedList = await list.loadUserList(searchName, forceFetch);
    if (updatedList) {
      updatedList.sortUsers(list.sorting);
      setList(!onlyOnwers ? updatedList : updatedList.getOnlyNationOwners());
    }
  };

  const reset = () => {
    loadUserList("", true, false);
    setSearchName("");
    setIsLeader(false);
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

  return {
    searchName,
    isLeader,
    handleSearch,
    handleSubmit,
    handleChangeCheckbox,
    handleChangeSorting,
    reset,
  };
}
