/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { SelectedNationProps } from "../../../types/typProp";
import DashTile from "../../dashTile";
import TileContainer from "../../tileContainer";
import H2 from "../../titles/h2";
import { MdTimer } from "react-icons/md";
import { placesTypeList } from "../../../settings/consts";
import {
  myStore,
  nationPlacesListAtom,
  newPlaceAtom,
} from "../../../settings/store";
import { useAtom } from "jotai";

import { FaCoins } from "react-icons/fa6";
import { addCredits, formatTime } from "../../../utils/functions";
import PlaceTile from "./placeTile";
import Button from "../../button";

import { Place } from "../../../types/typPlace";
import PointTag from "../../tags/pointTag";
import CreditTag from "../../tags/creditTag";
import PopulationTag from "../../tags/populationTag";
import { getNationPlaces } from "../../../api/place/placeAPI";

export default function Roleplay({
  selectedNation,
  owner,
}: SelectedNationProps) {
  const [nationPlacesList] = useAtom(nationPlacesListAtom);

  useEffect(() => {
    if (nationPlacesList.length === 0 && selectedNation._id !== "") {
      getNationPlaces(selectedNation._id);
    }
  }, []);

  const handleClick = () => {
    const date = new Date();
    const newPlace: Place = {
      nationId: selectedNation._id,
      buildDate: new Date(date.getTime() + placesTypeList[0].waitTime * 60000),
      cost: placesTypeList[0].cost,
      points: placesTypeList[0].points,
      type: placesTypeList[0].id,
      slots: placesTypeList[0].slots,
      level: 1,
      builds: 0,
      population: 0,
      name: "Nouvelle ville",
      description: placesTypeList[0].description,
      image: "",
    };
    myStore.set(newPlaceAtom, newPlace);
  };

  return (
    <TileContainer
      children={
        <>
          <H2 text="Simulation" />
          <DashTile
            title="Score"
            className="w-full"
            children={
              <>
                <div className="w-full px-2 flex items-center justify-center gap-4">
                  <PointTag label={selectedNation.data.roleplay.points} />
                  <PopulationTag
                    label={selectedNation.data.roleplay.population}
                  />
                  <CreditTag
                    label={selectedNation.data.roleplay.credits}
                    owner={owner}
                  />
                </div>
              </>
            }
          />

          <DashTile
            title="Villes"
            children={
              <>
                <div className="flex flex-wrap items-start justify-center gap-2">
                  {nationPlacesList != undefined ? (
                    nationPlacesList.map((place, i) => {
                      return (
                        <div
                          className="w-full md:w-[49%] md:min-w-[250px]"
                          key={i}
                        >
                          <PlaceTile
                            owner={owner}
                            place={place}
                            update={
                              selectedNation.data.roleplay.credits >=
                              placesTypeList[place.level].cost
                                ? place.level
                                : -1
                            }
                          />
                        </div>
                      );
                    })
                  ) : (
                    <em className="text-center">Aucune ville</em>
                  )}
                </div>
                {selectedNation.data.roleplay.credits >= placesTypeList[0].cost
                  ? owner && (
                      <Button
                        text=""
                        type="button"
                        path=""
                        click={handleClick}
                        children={
                          <div className="w-full flex flex-col justify-center items-center gap-1 flex-wrap">
                            <span>Nouvelle ville</span>
                            <div className="w-full flex items-center justify-center gap-2 text-sm">
                              <span className="flex gap-1 items-center">
                                <FaCoins />
                                {placesTypeList[0].cost}
                              </span>
                              <span className="flex gap-1 items-center">
                                <MdTimer />
                                {formatTime(placesTypeList[0].waitTime)}
                              </span>
                            </div>
                          </div>
                        }
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
