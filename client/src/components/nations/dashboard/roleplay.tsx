import { useEffect } from "react";
import { SelectedNationProps } from "../../../types/typProp";
import DashTile from "../../dashTile";
import TileContainer from "../../tileContainer";
import H2 from "../../titles/h2";
import { buildList, placesTypeList } from "../../../settings/consts";
import {
  myStore,
  nationPlacesListAtom,
  newPlaceAtom,
} from "../../../settings/store";
import { useAtom } from "jotai";

import { FaCoins } from "react-icons/fa6";
import { addCredits } from "../../../utils/functions";
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
    if (selectedNation._id !== "") {
      getNationPlaces(selectedNation._id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = () => {
    const newPlace: Place = {
      nation: selectedNation._id,
      cost: placesTypeList[0].cost,
      points: placesTypeList[0].points,
      type: placesTypeList[0].id,
      slots: placesTypeList[0].slots,
      level: 1,
      population: 0,
      name: "Nouvelle ville",
      description: placesTypeList[0].description,
      image: "",
      builds: buildList,
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
                      if (place.nation === selectedNation._id) {
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
                      }
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
                          <div className="w-full flex justify-center items-center gap-2 flex-wrap">
                            <span>Nouvelle ville</span>
                            <span className="flex gap-1 items-center">
                              <FaCoins />
                              {placesTypeList[0].cost}
                            </span>
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
