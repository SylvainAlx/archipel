import { Suspense, lazy, useEffect, useState } from "react";
import TileContainer from "../tileContainer";
import NewPlaceButton from "../buttons/newPlaceButton";
import { useTranslation } from "react-i18next";
import DashTile from "../dashTile";
import BarreLoader from "../loading/barreLoader";
import { PlaceListModel } from "../../models/lists/placeListModel";
import { PlaceModel } from "../../models/placeModel";
import { NationModel } from "../../models/nationModel";
import { placeListAtomV2 } from "../../settings/store";
import { useAtom } from "jotai";

interface PlacesProps {
  selectedNation: NationModel;
  owner: boolean;
}

export default function Places({ selectedNation, owner }: PlacesProps) {
  const { t } = useTranslation();
  const [placeList] = useAtom(placeListAtomV2);
  const [places, setPlaces] = useState<PlaceListModel>(new PlaceListModel());
  const PlaceTile = lazy(() => import("../tiles/placeTile"));

  useEffect(() => {
    if (placeList.getItems().length === 0) {
      placeList.loadNationPlaces(selectedNation);
    } else {
      const updatedPlaces: PlaceModel[] = [];
      placeList.getItems().forEach((place) => {
        if (place.parentId === selectedNation.officialId) {
          updatedPlaces.push(place);
        }
      });
      setPlaces(new PlaceListModel(updatedPlaces));
    }
  }, [selectedNation, placeList]);

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
                    nation={selectedNation}
                  />
                )}
                {places.getItems().length > 0 ? (
                  places.getItems().map((place, i) => {
                    return (
                      <Suspense key={i} fallback={<BarreLoader />}>
                        <div className="relative w-full">
                          <PlaceTile
                            owner={owner}
                            place={place}
                            nation={selectedNation}
                          />
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
