/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ChangeEvent,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import Input from "../form/input";
import Button from "../buttons/button";
import Select from "../form/select";
import { SetAtom, comsListAtom, statsAtom } from "../../settings/store";
import { useTranslation } from "react-i18next";
import { useAtom } from "jotai";
import { comSearchSortOptions } from "../../settings/consts";
import { getComs } from "../../api/communication/comAPI";

export interface SearchBarProps {
  type: string;
  setList: SetAtom<[SetStateAction<any>], void>;
}

export default function ComSearchBar({ setList }: SearchBarProps) {
  const [selectOption, setSelectOption] = useState("1");
  const { t } = useTranslation();
  const [searchName, setSearchName] = useState("");
  const [comList] = useAtom(comsListAtom);
  const [stats] = useAtom(statsAtom);

  useEffect(() => {
    if (comList.length != stats.counts.coms) {
      getComs();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stats.counts.coms]);

  useEffect(() => {
    comSorting();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectOption, comList]);

  const reset = () => {
    getComs();
    setSelectOption("1");
  };

  const comSorting = () => {
    const sortedList = [...comList];

    if (selectOption === "0") {
      sortedList.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
    } else if (selectOption === "1") {
      sortedList.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    }
    setList(sortedList);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    getComs();
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
        name="title"
        placeholder={t("components.searchBars.comsList.input")}
        value={searchName}
      />
      <Select
        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          setSelectOption(e.target.value)
        }
        options={comSearchSortOptions}
        value={selectOption}
      />

      <div className="pb-2 flex flex-wrap gap-2 items-center justify-center md:justify-end">
        <div className="w-[150px] flex justify-center">
          <Button
            type="submit"
            disabled={false}
            text={t("components.buttons.search")}
          />
        </div>
        <div className="w-[150px] flex justify-center">
          <Button
            type="button"
            disabled={false}
            text={t("components.buttons.reset")}
            click={reset}
          />
        </div>
      </div>
    </form>
  );
}
