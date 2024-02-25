/* eslint-disable react-hooks/exhaustive-deps */
import { useAtom } from "jotai";
import {
  NationsRoleplayDataAtom,
  infoModal,
  loadingSpinner,
  nationAtom,
  newPlaceAtom,
} from "../../settings/store";
import Button from "../button";
import { emptyPlace } from "../../types/typNation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Form from "../form/form";
import Input from "../form/input";
import TextArea from "../form/textArea";
import Tag from "../tag";
import { FaTrophy, FaUserGroup } from "react-icons/fa6";
import { SERVEUR_LOADING_STRING, placesTypeList } from "../../settings/consts";
import { createPlaceFetch } from "../../utils/fetch";

export default function NewPlaceModal() {
  const [newPlace, setNewPlace] = useAtom(newPlaceAtom);
  const [, setNation] = useAtom(nationAtom);
  const [, setLoading] = useAtom(loadingSpinner);
  const [, setInfo] = useAtom(infoModal);
  const [nationsRoleplayData, setNationsRoleplayData] = useAtom(
    NationsRoleplayDataAtom,
  );
  const [placeType, setPlaceType] = useState("");

  useEffect(() => {
    placesTypeList.forEach((place) => {
      if (place.id === newPlace.type) {
        setPlaceType(place.label);
      }
    });
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading({ show: true, text: SERVEUR_LOADING_STRING });
    createPlaceFetch(newPlace)
      .then((data) => {
        if (data.place) {
          setLoading({ show: false, text: SERVEUR_LOADING_STRING });
          const updateRoleplatData = [...nationsRoleplayData];
          nationsRoleplayData.forEach((nationData, i) => {
            if (nationData.nationId === newPlace.nationId) {
              updateRoleplatData[i].places.push(data.place);
            }
          });
          setNation(data.nation);
          setNationsRoleplayData(updateRoleplatData);
          setInfo(data.message);
        }
      })
      .catch((error) => {
        setLoading({ show: false, text: SERVEUR_LOADING_STRING });
        setInfo(error.message);
      });
    setNewPlace(emptyPlace);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewPlace({ ...newPlace, [name]: value });
  };

  return (
    <div>
      <h2 className="text-2xl text-center p-4">NOUVEAU LIEU : {placeType}</h2>
      <div className="w-full px-2 flex items-center justify-center gap-4">
        <Tag
          text={newPlace.population.toString()}
          bgColor="bg-info"
          children={<FaUserGroup />}
        />
        <Tag
          text={newPlace.points.toString()}
          bgColor="bg-info"
          children={<FaTrophy />}
        />
      </div>
      <Form
        submit={handleSubmit}
        children={
          <>
            <Input
              required
              type="text"
              name="name"
              value={newPlace.name}
              onChange={handleChange}
              placeholder="NOM DU LIEU"
            />
            <TextArea
              onChange={handleChange}
              name="description"
              placeholder="DESCRIPTION"
              value={newPlace.description}
              maxLength={500}
              rows={10}
            />
            <Button type="submit" path="" text="VALIDER" />
            <Button
              type="button"
              path=""
              text="ANNULER"
              click={() => setNewPlace(emptyPlace)}
            />
          </>
        }
      />
    </div>
  );
}
