import Input from "../form/input";
import Select from "../form/select";
import { useTranslation } from "react-i18next";
import SearchButtons from "../form/searchButtons";
import { NATION_SORTING } from "../../settings/sorting";
import { StructureListModel } from "../../models/lists/structureListModel";
import useStructureSearchBar from "../../hooks/componentsHooks/searchBars/useStructureSearchBar";

export interface StructureSearchBarProps {
  list: StructureListModel;
  // eslint-disable-next-line no-undef
  setList: React.Dispatch<React.SetStateAction<StructureListModel>>;
}

export default function StructureSearchBar({
  list,
  setList,
}: StructureSearchBarProps) {
  const { t } = useTranslation();
  const { searchName, handleSearch, handleSubmit, handleChangeSorting, reset } =
    useStructureSearchBar(list, setList);

  return (
    <form
      className={`w-full p-4 flex flex-wrap items-end justify-center gap-4`}
      onSubmit={handleSubmit}
    >
      <Input
        required
        onChange={handleSearch}
        type="text"
        name="name"
        placeholder={t("components.searchBars.structuresList.name")}
        value={searchName}
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
