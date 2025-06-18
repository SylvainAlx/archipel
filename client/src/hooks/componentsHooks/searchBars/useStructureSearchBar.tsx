import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import {
  myStore,
  statsAtom,
  structureListAtomV2,
} from "../../../settings/store";
import { StructureListModel } from "../../../models/lists/structureListModel";
import { getCounts } from "../../../services/statService";

export default function useStructureSearchBar(
  list: StructureListModel,
  // eslint-disable-next-line no-undef
  setList: React.Dispatch<React.SetStateAction<StructureListModel>>,
) {
  const [stats] = useAtom(statsAtom);
  const [searchName, setSearchName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (stats.counts.structures === 0) {
      getCounts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (
      myStore.get(structureListAtomV2).getItems().length !=
      stats.counts.structures
    ) {
      loadList(searchName);
    } else {
      loadList(searchName, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stats, searchName]);

  const loadList = async (searchName: string, forceFetch: boolean = true) => {
    const updatedList = await list.loadStructureList(searchName, forceFetch);
    if (updatedList) {
      updatedList.sortStructures(updatedList.sorting);
      setList(updatedList);
    }
  };

  const reset = () => {
    loadList("");
    setSearchName("");
    navigate(`/explore/3`);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    loadList(searchName);
  };

  const handleChangeSorting = (e: ChangeEvent<HTMLSelectElement>) => {
    const updatedList = list.sortStructures(Number(e.target.value));
    setList(updatedList);
  };

  return {
    searchName,
    handleSearch,
    handleSubmit,
    handleChangeSorting,
    reset,
  };
}
