/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { SelectedNationProps } from "../../../types/typProp";
import DashTile from "../../dashTile";
import TileContainer from "../../tileContainer";
import H2 from "../../titles/h2";
import Tag from "../../tag";
import { MdAddCircle } from "react-icons/md";
import {
  SERVEUR_LOADING_STRING,
  placesTypeList,
} from "../../../settings/consts";
import {
  infoModal,
  loadingSpinner,
  myStore,
  NationsRoleplayDataAtom,
  newPlaceAtom,
} from "../../../settings/store";
import { useAtom } from "jotai";
import { getRoleplayDataFetch } from "../../../utils/fetch";
import { Citizen, Place } from "../../../types/typNation";
import { FaCoins, FaTrophy, FaUserGroup } from "react-icons/fa6";
import { addCredits } from "../../../utils/functions";
import PlaceTile from "./placeTile";
import Button from "../../button";

export default function Roleplay({
  selectedNation,
  owner,
}: SelectedNationProps) {
  const [, setCitizensList] = useState<Citizen[]>([]);
  const [placesList, setPlacesList] = useState<Place[]>([]);
  const [dataChecked, setDataChecked] = useState(false);
  const [nationsRoleplayData, setNationsRoleplayData] = useAtom(
    NationsRoleplayDataAtom,
  );
  const [, setInfo] = useAtom(infoModal);

  useEffect(() => {
    if (selectedNation._id != "" && !dataChecked) {
      myStore.set(loadingSpinner, { show: true, text: SERVEUR_LOADING_STRING });
      getRoleplayDataFetch(selectedNation._id)
        .then((data) => {
          myStore.set(loadingSpinner, { show: false, text: "" });
          setNationsRoleplayData([
            ...nationsRoleplayData,
            {
              nationId: selectedNation._id,
              citizens: data.citizens,
              places: data.places,
            },
          ]);
        })
        .catch((error) => {
          myStore.set(loadingSpinner, { show: false, text: "" });
          setInfo(error.message);
        });
      setDataChecked(true);
    }
  }, [selectedNation]);

  useEffect(() => {
    if (nationsRoleplayData.length > 0) {
      nationsRoleplayData.forEach((data) => {
        if (data.nationId === selectedNation._id) {
          setCitizensList(data.citizens);
          setPlacesList(data.places);
        }
      });
    }
  }, [nationsRoleplayData]);

  const handleClick = () => {
    const date = new Date();
    const newPlace: Place = {
      nationId: selectedNation._id,
      buildDate: new Date(date.getTime() + placesTypeList[0].waitTime * 60000),
      type: placesTypeList[0].id,
      cost: placesTypeList[0].cost,
      points: placesTypeList[0].points,
      population: placesTypeList[0].population,
      name: placesTypeList[0].label,
      description: placesTypeList[0].description,
      image: placesTypeList[0].image,
    };
    myStore.set(newPlaceAtom, newPlace);
  };

  return (
    <TileContainer
      children={
        <>
          <H2 text="Roleplay" />
          <DashTile
            title="Score"
            className="w-full"
            children={
              <>
                <div className="w-full px-2 flex items-center justify-center gap-4">
                  <Tag
                    text={selectedNation.data.roleplay.points.toString()}
                    bgColor="bg-info"
                    children={<FaTrophy />}
                  />
                  {/* <Tag
                    text={citizensList.length.toString()}
                    bgColor="bg-info"
                    children={<FaUserCheck />}
                  /> */}
                  <Tag
                    text={selectedNation.data.roleplay.population.toString()}
                    bgColor="bg-info"
                    children={<FaUserGroup />}
                  />
                  <Tag
                    text={selectedNation.data.roleplay.credits.toString()}
                    bgColor="bg-info"
                    children={
                      <>
                        <FaCoins />
                        {owner && (
                          <span
                            className="text-2xl cursor-pointer"
                            onClick={addCredits}
                          >
                            <MdAddCircle />
                          </span>
                        )}
                      </>
                    }
                  />
                </div>
              </>
            }
          />

          <DashTile
            title="Lieux"
            children={
              <>
                {placesList.length > 0 ? (
                  placesList.map((place, i) => {
                    return (
                      <div className="w-full" key={i}>
                        <PlaceTile
                          owner={owner}
                          name={place.name}
                          points={place.points}
                          population={place.population}
                          buildDate={place.buildDate}
                          description={place.description}
                          image={place.image}
                          type={place.type}
                          update={
                            selectedNation.data.roleplay.credits >=
                            placesTypeList[place.type + 1].cost
                              ? place.type + 1
                              : -1
                          }
                        />
                      </div>
                    );
                  })
                ) : (
                  <em className="text-center">Aucun lieux</em>
                )}
                {selectedNation.data.roleplay.credits >= placesTypeList[0].cost
                  ? owner && (
                      <Button
                        text="CRÉER UN NOUVEAU LIEU"
                        type="button"
                        path=""
                        click={handleClick}
                      />
                    )
                  : owner && (
                      <Button
                        text="CRÉDITS INSUFFISANTS"
                        type="button"
                        path=""
                        bgColor="bg-danger"
                        click={addCredits}
                      />
                    )}
              </>
            }
          />
        </>
      }
    />
  );
}
