import Input from "../form/input";
import Select from "../form/select";
import { useTranslation } from "react-i18next";
import SearchButtons from "../form/searchButtons";
import { ComListModel } from "../../models/lists/comListModel";
import { COM_SORTING } from "../../settings/sorting";
import useComSearchBar from "../../hooks/componentsHooks/searchBars/useComSearchBar";

export interface ComSearchBarProps {
  type: string;
  list: ComListModel;
  // eslint-disable-next-line no-undef
  setList: React.Dispatch<React.SetStateAction<ComListModel>>;
}

export default function ComSearchBar({ list, setList }: ComSearchBarProps) {
  const { t } = useTranslation();
  const { nationId, reset, handleSearch, handleChangeSorting, handleSubmit } =
    useComSearchBar(list, setList);

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
