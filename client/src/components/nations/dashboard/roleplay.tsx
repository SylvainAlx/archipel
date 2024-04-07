import { Suspense, lazy, useEffect } from "react";
import { SelectedNationProps } from "../../../types/typProp";
import DashTile from "../../dashTile";
import TileContainer from "../../tileContainer";
import H2 from "../../titles/h2";
import { NEW_PLACE_COST, placesTypeList } from "../../../settings/consts";
import {
  myStore,
  nationPlacesListAtom,
  newPlaceAtom,
} from "../../../settings/store";
import { useAtom } from "jotai";

import { FaCoins } from "react-icons/fa6";
import { addCredits } from "../../../utils/functions";

import Button from "../../buttons/button";

import { Place, emptyPlace } from "../../../types/typPlace";
import PointTag from "../../tags/pointTag";
import CreditTag from "../../tags/creditTag";
import PopulationTag from "../../tags/populationTag";
import { getNationPlaces } from "../../../api/place/placeAPI";
import Spinner from "../../loading/spinner";
import IndexTag from "../../tags/indexTag";

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
      officialId: emptyPlace.officialId,
      parentId: selectedNation.officialId,
      nation: selectedNation.officialId,
      points: emptyPlace.points,
      type: placesTypeList[0].id,
      slots: emptyPlace.slots,
      population: emptyPlace.population,
      name: emptyPlace.name,
      description: emptyPlace.description,
      image: emptyPlace.image,
      builds: emptyPlace.builds,
      children: emptyPlace.children,
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
                              <PlaceTile owner={owner} place={place} />
                              <IndexTag text={i} />
                            </div>
                          </Suspense>
                        );
                      }
                    })
                  ) : (
                    <em className="text-center">Aucun lieu</em>
                  )}
                </div>
                {selectedNation.data.roleplay.credits >= NEW_PLACE_COST
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
                              {NEW_PLACE_COST}
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
                            {NEW_PLACE_COST}
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
