import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { NationListModel } from "../../../models/lists/nationListModel";
import { useLocation, useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { myStore, nationListAtomV2, statsAtom } from "../../../settings/store";
import { getCounts } from "../../../services/statService";

export default function useNationSearchBar(
  list: NationListModel,
  // eslint-disable-next-line no-undef
  setList: React.Dispatch<React.SetStateAction<NationListModel>>,
) {
  const [stats] = useAtom(statsAtom);
  const location = useLocation();
  const [searchName, setSearchName] = useState("");
  const [isOfficial, setIsOfficial] = useState(false);
  const [searchTag, setSearchTag] = useState(location.hash.replace("#", ""));
  const navigate = useNavigate();

  useEffect(() => {
    if (stats.counts.citizens === 0) {
      getCounts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setSearchTag(location.hash.replace("#", ""));
  }, [location]);

  useEffect(() => {
    if (
      myStore.get(nationListAtomV2).getItems().length != stats.counts.nations
    ) {
      loadList(searchName, searchTag);
    } else {
      loadList(searchName, searchTag, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stats, searchName, searchTag, isOfficial]);

  const loadList = async (
    searchName: string,
    searchTag: string,
    forceFetch: boolean = true,
  ) => {
    const updatedList = await list.loadNationList(
      searchName,
      searchTag,
      forceFetch,
    );
    if (updatedList) {
      updatedList.sortNations(updatedList.sorting);
      if (isOfficial) {
        setList(updatedList.getOnlyOfficialNations());
      } else {
        setList(updatedList);
      }
    }
  };

  const reset = () => {
    loadList("", "");
    setSearchName("");
    setSearchTag("");
    navigate(`/explore/2`);
  };

  const handleChangeCheckbox = () => {
    setIsOfficial(!isOfficial);
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

  return {
    searchName,
    searchTag,
    isOfficial,
    handleChangeCheckbox,
    setSearchTag,
    handleSearch,
    handleSubmit,
    handleChangeSorting,
    reset,
  };
}
