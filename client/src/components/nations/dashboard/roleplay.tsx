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
  NationsRoleplayDataAtom,
} from "../../../settings/store";
import { useAtom } from "jotai";
import { getRoleplayDataFetch } from "../../../utils/fetch";
import NewPlaceTile from "./newPlaceTile";
import { Citizen, Place } from "../../../types/typNation";
import { FaCoins, FaTrophy, FaUserCheck, FaUserGroup } from "react-icons/fa6";
import { addCredits } from "../../../utils/functions";
import PlaceTile from "./placeTile";

export default function Roleplay({
  selectedNation,
  owner,
}: SelectedNationProps) {
  const [citizensList, setCitizensList] = useState<Citizen[]>([]);
  const [placesList, setPlacesList] = useState<Place[]>([]);
  const [virtualCitizens, setVirtualCitizens] = useState(0);
  const [dataChecked, setDataChecked] = useState(false);
  const [nationsRoleplayData, setNationsRoleplayData] = useAtom(
    NationsRoleplayDataAtom,
  );
  const [, setLoading] = useAtom(loadingSpinner);
  const [, setInfo] = useAtom(infoModal);

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
      placesList.forEach((place) => {
        if (place.buildDate <= new Date()) {
          setVirtualCitizens(virtualCitizens + place.population);
        }
      });
    }
  }, [placesList]);

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
                  <Tag
                    text={citizensList.length.toString()}
                    bgColor="bg-info"
                    children={<FaUserGroup />}
                  />
                  <Tag
                    text={virtualCitizens.toString()}
                    bgColor="bg-info"
                    children={<FaUserCheck />}
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
                          population={place.population}
                          buildDate={place.buildDate}
                          description={place.description}
                          image={place.image}
                          type={place.type}
                        />
                      </div>
                    );
                  })
                ) : (
                  <em className="text-center">Aucun lieux</em>
                )}
              </>
            }
          />
          {owner && (
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
                            placeList={placesList}
                            setPlaceList={setPlacesList}
                          />
                        </div>
                      );
                    })}
                  </div>
                </>
              }
            />
          )}
        </>
      }
    />
  );
}
