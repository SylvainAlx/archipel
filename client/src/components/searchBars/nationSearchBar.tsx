import Input from "../form/input";
import Select from "../form/select";
import { useTranslation } from "react-i18next";
import SearchButtons from "../form/searchButtons";
import { NationListModel } from "../../models/lists/nationListModel";
import { NATION_SORTING } from "../../settings/sorting";
import useNationSearchBar from "../../hooks/componentsHooks/useNationSearchBar";

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
  const {
    searchName,
    searchTag,
    setSearchTag,
    handleSearch,
    handleSubmit,
    handleChangeSorting,
    reset,
  } = useNationSearchBar(list, setList);

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
