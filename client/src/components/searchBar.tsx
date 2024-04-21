import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { searchSortOptions } from "../settings/consts";
import { getNations } from "../api/nation/nationAPI";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import Input from "./form/input";
import Button from "./buttons/button";
import Select from "./form/select";
import { SearchBarProps } from "../types/typProp";
import { Nation } from "../types/typNation";

export default function SearchBar({ type, list, setList }: SearchBarProps) {
  const [showSearch, setShowSearch] = useState(false);
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
    <>
      <fieldset
        className={`mb-8 py-2 min-w-max w-[300px] xl:w-full rounded text-center ${showSearch ? "bg-complementary px-4" : "xl:bg-complementary xl:px-4"}`}
      >
        <legend
          onClick={() => setShowSearch(!showSearch)}
          className={`w-full flex items-center justify-center gap-2 py-1 rounded ${!showSearch && "bg-complementary xl:bg-transparent"}`}
        >
          <span>RECHERCHE</span>
          <span
            className={`cursor-pointertext-3xl transition-all duration-300 xl:hidden ${showSearch && "rotate-180"}`}
          >
            <IoIosArrowDropdownCircle />
          </span>
        </legend>
        <form
          className={`${!showSearch ? "hidden xl:flex" : "flex"} flex-col xl:flex-row items-center justify-around gap-4`}
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
          <div className="flex flex-col md:flex-row gap-2">
            <Button type="submit" disabled={false} text="RECHERCHER" path="" />
            <Button
              type="button"
              disabled={false}
              text="RÉINITIALISER"
              path=""
              click={() => getNations(searchName)}
            />
          </div>
        </form>
      </fieldset>
    </>
  );
}
