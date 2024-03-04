/* eslint-disable react-hooks/exhaustive-deps */
import { useAtom } from "jotai";
import Button from "../../../components/button";
import Input from "../../../components/form/input";
import { nationsListAtom, selectedNationAtom } from "../../../settings/store";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { nationSortOptions } from "../../../settings/consts";
import H1 from "../../../components/titles/h1";
import PublicNationTile from "../../../components/nations/publicNationTile";
import Select from "../../../components/form/select";
import { StringProps } from "../../../types/typProp";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { getNations } from "../../../utils/api";

export default function NationList({ text }: StringProps) {
  const [nationsList, setNationsList] = useAtom(nationsListAtom);
  const [, setNation] = useAtom(selectedNationAtom);
  const [searchName, setSearchName] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [selectOption, setSelectOption] = useState(nationSortOptions[0].label);
  const [displayedNations, setDisplayedNations] = useState(5);

  const navigate = useNavigate();

  useEffect(() => {
    if (nationsList.length > 0) {
      if (nationsList[0]._id === "") {
        setSearchName("");
        getNations("");
      }
    }
  }, []);

  useEffect(() => {
    const tempList = [...nationsList];
    if (selectOption === "0") {
      setNationsList(
        tempList.sort(function (a, b) {
          return a.name.localeCompare(b.name);
        }),
      );
    } else if (selectOption === "1") {
      setNationsList(
        tempList.sort(function (a, b) {
          return b.name.localeCompare(a.name);
        }),
      );
    } else if (selectOption === "2") {
      setNationsList(
        tempList.sort(function (a, b) {
          return a.data.roleplay.points - b.data.roleplay.points;
        }),
      );
    } else if (selectOption === "3") {
      setNationsList(
        tempList.sort(function (a, b) {
          return b.data.roleplay.points - a.data.roleplay.points;
        }),
      );
    }
  }, [selectOption]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    getNations(searchName);
  };

  return (
    <>
      <H1 text={text} />
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
            options={nationSortOptions}
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
      <section className="w-full flex gap-1 flex-wrap items-center flex-col ">
        {nationsList != undefined &&
          nationsList.length > 0 &&
          nationsList.map((nation, i) => {
            if (i < displayedNations) {
              return (
                <div
                  className="min-w-[300px] w-full relative transition-all duration-300"
                  key={i}
                  onClick={() => {
                    setNation({ ...nation });
                    navigate(`/dashboard/${nation._id}`);
                  }}
                >
                  <PublicNationTile
                    _id={nation._id}
                    name={nation.name}
                    role={nation.role}
                    data={nation.data}
                    createdAt={nation.createdAt}
                  />
                  <b className="absolute top-0 right-2 font-bolder">{i + 1}</b>
                </div>
              );
            }
          })}
        {displayedNations < nationsList.length && (
          <Button
            click={() => setDisplayedNations(displayedNations + 5)}
            text="VOIR PLUS"
            path=""
          />
        )}
      </section>
    </>
  );
}
