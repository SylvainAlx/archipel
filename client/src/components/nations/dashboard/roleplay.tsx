import { Suspense, lazy, useEffect } from "react";
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

import Button from "../../button";

import { Place } from "../../../types/typPlace";
import PointTag from "../../tags/pointTag";
import CreditTag from "../../tags/creditTag";
import PopulationTag from "../../tags/populationTag";
import { getNationPlaces } from "../../../api/place/placeAPI";
import Spinner from "../../loading/spinner";
import Tag from "../../tag";

export default function Roleplay({
  selectedNation,
  owner,
}: SelectedNationProps) {
  const [nationPlacesList] = useAtom(nationPlacesListAtom);
  const PlaceTile = lazy(
    () => import("../../../components/nations/dashboard/placeTile"),
  );

  useEffect(() => {
    if (selectedNation.officialId !== "" && nationPlacesList.length === 0) {
      getNationPlaces(selectedNation.officialId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = () => {
    const newPlace: Place = {
      officialId: "",
      parentId: selectedNation.officialId,
      nation: selectedNation.officialId,
      cost: placesTypeList[0].cost,
      points: placesTypeList[0].points,
      type: placesTypeList[0].id,
      slots: placesTypeList[0].slots,
      level: 1,
      population: 0,
      name: "",
      description: "",
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
                <div className="w-full px-2 flex items-center justify-center gap-1">
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
            title="Lieux"
            children={
              <>
                <div className="w-full flex flex-col gap-2">
                  {nationPlacesList != undefined ? (
                    nationPlacesList.map((place, i) => {
                      if (place.nation === selectedNation.officialId) {
                        return (
                          <Suspense key={i} fallback={<Spinner />}>
                            <div className="relative w-full">
                              <PlaceTile
                                owner={owner}
                                place={place}
                                update={place.level}
                              />
                              <div className="absolute top-2 right-2">
                                <Tag
                                  text={(i + 1).toString()}
                                  bgColor="bg-complementary"
                                />
                              </div>
                            </div>
                          </Suspense>
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
                            <span>Nouveau lieu</span>
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
                        children={
                          <div className="pl-2 flex gap-1 items-center">
                            <FaCoins />
                            {placesTypeList[0].cost}
                          </div>
                        }
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
