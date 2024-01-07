/* eslint-disable react-hooks/exhaustive-deps */
import { useAtom } from "jotai";
import Button from "../../components/button";
import Input from "../../components/form/input";
import {
  loadingSpinner,
  nationsListAtom,
  selectedNationAtom,
} from "../../settings/store";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { nationSortOptions } from "../../settings/consts";
import { getAll, getTop100 } from "../../utils/fetch";
import H1 from "../../components/titles/h1";
import PublicNationTile from "../../components/nations/publicNationTile";
import Select from "../../components/form/select";
import { StringProps } from "../../types/typProp";

export default function NationList({ text }: StringProps) {
  const [nationsList, setNationsList] = useAtom(nationsListAtom);
  const [, setLoading] = useAtom(loadingSpinner);
  const [, setNation] = useAtom(selectedNationAtom);
  const [searchName, setSearchName] = useState("");
  const [selectOption, setSelectOption] = useState(nationSortOptions[0].label);

  const navigate = useNavigate();

  useEffect(() => {
    if (nationsList[0]._id === "") {
      setLoading({ show: true, text: "Connexion au serveur" });
      getTop100()
        .then((data) => {
          setLoading({ show: false, text: "Connexion au serveur" });
          if (data != undefined) {
            setNationsList(data);
          }
        })
        .catch((error) => {
          setLoading({ show: false, text: "Connexion au serveur" });
          alert(error.message);
        });
    }
  }, []);

  useEffect(() => {
    const tempList = [...nationsList];
    if (selectOption === "0") {
      setNationsList(
        tempList.sort(function (a, b) {
          return a.name.localeCompare(b.name);
        })
      );
    } else if (selectOption === "1") {
      setNationsList(
        tempList.sort(function (a, b) {
          return b.name.localeCompare(a.name);
        })
      );
    } else if (selectOption === "2") {
      setNationsList(
        tempList.sort(function (a, b) {
          return a.data.general.points - b.data.general.points;
        })
      );
    } else if (selectOption === "3") {
      setNationsList(
        tempList.sort(function (a, b) {
          return b.data.general.points - a.data.general.points;
        })
      );
    }
  }, [selectOption]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value);
  };

  const handleClick = () => {
    setSearchName("");
    setLoading({ show: true, text: "Connexion au serveur" });
    getTop100()
      .then((data) => {
        setLoading({ show: false, text: "Connexion au serveur" });
        if (data != undefined) {
          setNationsList(data);
        }
      })
      .catch((error) => {
        setLoading({ show: false, text: "Connexion au serveur" });
        alert(error.message);
      });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading({ show: true, text: "Connexion au serveur" });
    getAll(searchName)
      .then((data) => {
        setLoading({ show: false, text: "Connexion au serveur" });
        setNationsList(data);
      })
      .catch((error) => {
        setLoading({ show: false, text: "Connexion au serveur" });
        alert(error.message);
      });
  };

  return (
    <>
      <H1 text={text} />
      <fieldset className="mb-8 py-2 border-complementary border-2 border-solid min-w-[300px] md:w-full px-4 rounded text-center">
        <legend>RECHERCHE</legend>
        <form
          className="flex flex-col md:flex-row items-center justify-around gap-4"
          onSubmit={handleSubmit}
        >
          <Input
            required={true}
            onChange={handleSearch}
            type="text"
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
              click={handleClick}
            />
          </div>
        </form>
      </fieldset>
      <section className="w-full flex gap-8 flex-wrap items-center flex-col ">
        {nationsList != undefined &&
          nationsList.map((nation, i) => {
            return (
              <div
                className="w-[300px] md:w-full relative hover:scale-105 cursor-pointer transition-all duration-300"
                key={i}
                onClick={() => {
                  setNation(nation);
                  navigate("/dashboard");
                }}
              >
                <PublicNationTile
                  name={nation.name}
                  role={nation.role}
                  data={nation.data}
                  createdAt={nation.createdAt}
                />
                <b className="absolute top-0 right-2 font-bolder">{i + 1}</b>
              </div>
            );
          })}
      </section>
    </>
  );
}
