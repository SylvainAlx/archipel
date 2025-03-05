import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Input from "../form/input";
import Select from "../form/select";
import { statsAtom } from "../../settings/store";
import { useTranslation } from "react-i18next";
import { useAtom } from "jotai";
import SearchButtons from "../form/searchButtons";
import { COM_TYPE } from "../../settings/consts";
import { ComListModel } from "../../models/lists/comListModel";
import { COM_SORTING } from "../../settings/sorting";

export interface ComSearchBarProps {
  type: string;
  list: ComListModel;
  // eslint-disable-next-line no-undef
  setList: React.Dispatch<React.SetStateAction<ComListModel>>;
}

export default function ComSearchBar({ list, setList }: ComSearchBarProps) {
  const { t } = useTranslation();
  const [nationId, setNationId] = useState("");
  const [stats] = useAtom(statsAtom);

  useEffect(() => {
    loadList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stats.counts.coms]);

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

  return (
    <form
      className={`w-full p-4 flex flex-wrap items-end justify-center gap-4`}
      onSubmit={handleSubmit}
    >
      <Input
        required={true}
        onChange={handleSearch}
        type="text"
        name="nationId"
        placeholder={t("components.searchBars.comsList.input")}
        value={nationId}
      />
      <Select
        onChange={handleChangeSorting}
        options={Object.values(COM_SORTING)}
        value={list.sorting}
      />
      <SearchButtons reset={reset} />
    </form>
  );
}
