import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { ComListModel } from "../../models/lists/comListModel";
import { COM_TYPE } from "../../settings/consts";

export default function useComSearchBar(
  list: ComListModel,
  // eslint-disable-next-line no-undef
  setList: React.Dispatch<React.SetStateAction<ComListModel>>,
) {
  const [nationId, setNationId] = useState("");

  useEffect(() => {
    loadList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reset = async () => {
    setNationId("");
    loadList();
  };

  const loadList = async () => {
    const updatedList = await list.loadComList(
      "",
      "",
      [COM_TYPE.nationPublic.id, COM_TYPE.general.id],
      false,
    );
    if (updatedList) {
      updatedList.sortComs(updatedList.sorting);
      setList(updatedList);
    }
  };
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setNationId(e.target.value);
  };
  const handleChangeSorting = (e: ChangeEvent<HTMLSelectElement>) => {
    const updatedList = list.sortComs(Number(e.target.value));
    setList(updatedList);
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const updatedList = new ComListModel(
      list.getItems().filter((com) => com.origin === nationId.toLowerCase()),
    );
    setList(updatedList);
  };

  return {
    nationId,
    reset,
    handleSearch,
    handleChangeSorting,
    handleSubmit,
  };
}
