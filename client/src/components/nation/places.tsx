import { Suspense, lazy, useEffect, useState } from "react";
import TileContainer from "../tileContainer";
import NewPlaceButton from "../buttons/newPlaceButton";
import { useTranslation } from "react-i18next";
import DashTile from "../dashTile";
import { PlaceListModel } from "../../models/lists/placeListModel";
import { PlaceModel } from "../../models/placeModel";
import { NationModel } from "../../models/nationModel";
import TileSkeleton from "../loading/skeletons/tileSkeleton";

interface PlacesProps {
  selectedNation: NationModel;
  owner: boolean;
}

export default function Places({ selectedNation, owner }: PlacesProps) {
  const { t } = useTranslation();
  const [places, setPlaces] = useState<PlaceListModel>(new PlaceListModel());
  const PlaceTile = lazy(() => import("../tiles/placeTile"));

  useEffect(() => {
    const filterMainPlaces = (list: PlaceListModel) => {
      const updatedPlaces: PlaceModel[] = [];
      list.getItems().forEach((place) => {
        if (place.parentId === selectedNation.officialId) {
          updatedPlaces.push(place);
        }
      });
      setPlaces(new PlaceListModel(updatedPlaces));
    };
    const loadNationPlaceList = async () => {
      const list = await places.loadNationPlaces(selectedNation);
      if (list) {
        filterMainPlaces(list);
      }
    };
    loadNationPlaceList();
  }, [selectedNation]);

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
                      <Suspense key={i} fallback={<TileSkeleton />}>
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
