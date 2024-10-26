import { Suspense, lazy, useEffect, useState } from "react";
import { SelectedNationProps } from "../../types/typProp";
import TileContainer from "../tileContainer";
import { nationPlacesListAtom } from "../../settings/store";
import { useAtom } from "jotai";
import { getNationPlaces } from "../../api/place/placeAPI";
import NewPlaceButton from "../buttons/newPlaceButton";
import { useTranslation } from "react-i18next";
import DashTile from "../dashTile";
import { Place } from "../../types/typPlace";
import BarreLoader from "../loading/barreLoader";

export default function Places({ selectedNation, owner }: SelectedNationProps) {
  const { t } = useTranslation();
  const [nationPlacesList] = useAtom(nationPlacesListAtom);
  const [places, setPlaces] = useState<Place[]>([]);
  const PlaceTile = lazy(() => import("../tiles/placeTile"));

  useEffect(() => {
    if (selectedNation != undefined) {
      getNationPlaces(selectedNation);
    }
  }, [selectedNation]);

  useEffect(() => {
    const updatedPlaces: Place[] = [];
    nationPlacesList.forEach((place) => {
      if (place.parentId === selectedNation.officialId) {
        updatedPlaces.push(place);
      }
    });
    setPlaces(updatedPlaces);
  }, [nationPlacesList, selectedNation.officialId]);

  return (
    <TileContainer
      children={
        <section className="flex flex-col items-center gap-4">
          <DashTile
            title={t("pages.nation.places.title")}
            className="w-full min-w-[300px] flex-grow"
            children={
              <div className="w-full flex flex-col gap-2 items-center">
                {owner && (
                  <NewPlaceButton
                    owner={owner}
                    parentId={selectedNation.officialId}
                  />
                )}
                {places.length > 0 ? (
                  places.map((place, i) => {
                    return (
                      <Suspense key={i} fallback={<BarreLoader />}>
                        <div className="relative w-full">
                          <PlaceTile owner={owner} place={place} />
                        </div>
                      </Suspense>
                    );
                  })
                ) : (
                  <em className="text-center">
                    {t("pages.nation.places.noPlaces")}
                  </em>
                )}
              </div>
            }
          />
        </section>
      }
    />
  );
}
