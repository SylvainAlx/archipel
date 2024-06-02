/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ChangeEvent,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { searchSortOptions } from "../settings/consts";
import { getNations } from "../api/nation/nationAPI";
import Input from "./form/input";
import Button from "./buttons/button";
import Select from "./form/select";
import { Nation } from "../types/typNation";
import { SetAtom } from "../settings/store";

export interface SearchBarProps {
  type: string;
  list: any[];
  setList: SetAtom<[SetStateAction<any>], void>;
}

export default function SearchBar({ type, list, setList }: SearchBarProps) {
  const [selectOption, setSelectOption] = useState(searchSortOptions[0].label);
  const [searchName, setSearchName] = useState("");
  useEffect(() => {
    const tempList = [...list];
    if (type === "nation") {
      nationsSorting(tempList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectOption]);

  const nationsSorting = (tempList: Nation[]) => {
    if (selectOption === "0") {
      setList(
        tempList.sort(function (a, b) {
          return a.name.localeCompare(b.name);
        }),
      );
    } else if (selectOption === "1") {
      setList(
        tempList.sort(function (a, b) {
          return b.name.localeCompare(a.name);
        }),
      );
    } else if (selectOption === "2") {
      setList(
        tempList.sort(function (a, b) {
          return a.data.roleplay.points - b.data.roleplay.points;
        }),
      );
    } else if (selectOption === "3") {
      setList(
        tempList.sort(function (a, b) {
          return b.data.roleplay.points - a.data.roleplay.points;
        }),
      );
    } else if (selectOption === "4") {
      setList(
        tempList.sort(function (a, b) {
          return a.data.roleplay.places - b.data.roleplay.places;
        }),
      );
    } else if (selectOption === "5") {
      setList(
        tempList.sort(function (a, b) {
          return b.data.roleplay.places - a.data.roleplay.places;
        }),
      );
    } else if (selectOption === "6") {
      setList(
        tempList.sort(function (a, b) {
          return a.data.roleplay.citizens - b.data.roleplay.citizens;
        }),
      );
    } else if (selectOption === "7") {
      setList(
        tempList.sort(function (a, b) {
          return b.data.roleplay.citizens - a.data.roleplay.citizens;
        }),
      );
    }
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    getNations(searchName);
  };

  return (
    <form
      className={`w-full p-4 flex flex-wrap items-center justify-center gap-4`}
      onSubmit={handleSubmit}
    >
      <Input
        required={true}
        onChange={handleSearch}
        type="text"
        name="name"
        placeholder="nom de la nation"
        value={searchName}
      />
      <Select
        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          setSelectOption(e.target.value)
        }
        options={searchSortOptions}
      />

      <div className="flex flex-wrap gap-2 items-center justify-center md:justify-end">
        <div className="w-[150px] flex justify-center">
          <Button type="submit" disabled={false} text="RECHERCHER" />
        </div>
        <div className="w-[150px] flex justify-center">
          <Button
            type="button"
            disabled={false}
            text="RÉINITIALISER"
            click={() => getNations(searchName)}
          />
        </div>
      </div>
    </form>
  );
}
