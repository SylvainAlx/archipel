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
  nationAtom,
  nationsListAtom,
  NationsRoleplayDataAtom,
  newPlaceAtom,
} from "../../../settings/store";
import { useAtom } from "jotai";
import { getRoleplayDataFetch, updateNationFetch } from "../../../utils/fetch";
import { Citizen, Place } from "../../../types/typNation";
import { FaCoins, FaTrophy, FaUserGroup } from "react-icons/fa6";
import { addCredits, updateElementOfAtomArray } from "../../../utils/functions";
import PlaceTile from "./placeTile";
import Button from "../../button";

export default function Roleplay({
  selectedNation,
  owner,
}: SelectedNationProps) {
  const [, setCitizensList] = useState<Citizen[]>([]);
  const [placesList, setPlacesList] = useState<Place[]>([]);
  const [virtualCitizens, setVirtualCitizens] = useState(0);
  const [dataChecked, setDataChecked] = useState(false);
  const [nationsRoleplayData, setNationsRoleplayData] = useAtom(
    NationsRoleplayDataAtom,
  );
  const [, setNation] = useAtom(nationAtom);
  const [, setLoading] = useAtom(loadingSpinner);
  const [, setInfo] = useAtom(infoModal);
  const [nationsList, setNationsList] = useAtom(nationsListAtom);

  useEffect(() => {
    if (selectedNation._id != "" && !dataChecked) {
      setLoading({ show: true, text: SERVEUR_LOADING_STRING });
      getRoleplayDataFetch(selectedNation._id)
        .then((data) => {
          setLoading({ show: false, text: SERVEUR_LOADING_STRING });
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
          setLoading({ show: false, text: SERVEUR_LOADING_STRING });
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

  useEffect(() => {
    if (placesList.length > 0) {
      let points = 0;
      placesList.forEach((place) => {
        if (place.buildDate <= new Date()) {
          setVirtualCitizens(virtualCitizens + place.population);
          points += place.points;
        }
      });
      updateNationScore(points);
    }
  }, [placesList]);

  const updateNationScore = (points: number) => {
    let updatedNation = { ...selectedNation };
    if (selectedNation.data.roleplay.points != points) {
      updatedNation.data.roleplay.points = points;
      setLoading({ show: true, text: SERVEUR_LOADING_STRING });
      updateNationFetch(updatedNation)
        .then((resp) => {
          setLoading({ show: false, text: SERVEUR_LOADING_STRING });
          if (resp.nation) {
            setNation(resp.nation);
            updateElementOfAtomArray(resp.nation, nationsList, setNationsList);
          } else {
            setInfo(resp.message);
          }
        })
        .catch((error) => {
          setLoading({ show: false, text: SERVEUR_LOADING_STRING });
          setInfo(error);
        });
    }
  };

  const handleClick = () => {
    let date = new Date();
    let newPlace: Place = {
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
                {selectedNation.data.roleplay.credits >=
                placesTypeList[0].cost ? (
                  <Button
                    text="CRÉER UN NOUVEAU LIEU"
                    type="button"
                    path=""
                    click={handleClick}
                  />
                ) : (
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
          {/* {owner && (
            <DashTile
              title="Créer un nouveau lieu"
              children={
                <>
                  <div className="w-full flex flex-col items-center gap-2">
                    <p className="text-center">
                      Créer des lieux pour augmenter vos points et votre
                      population
                    </p>
                    {placesTypeList.map((place, i) => {
                      return (
                        <div className="w-full" key={i}>
                          <NewPlaceTile
                            owner={owner}
                            nationId={selectedNation._id}
                            title={placesTypeList[i].label}
                            type={placesTypeList[i].id}
                            cost={placesTypeList[i].cost}
                            benefit={placesTypeList[i].points}
                            population={placesTypeList[i].population}
                            image={placesTypeList[i].image}
                            description={placesTypeList[i].description}
                            waitTime={placesTypeList[i].waitTime}
                            canBuy={
                              place.cost <= selectedNation.data.roleplay.credits
                            }
                          />
                        </div>
                      );
                    })}
                  </div>
                </>
              }
            />
          )} */}
        </>
      }
    />
  );
}
