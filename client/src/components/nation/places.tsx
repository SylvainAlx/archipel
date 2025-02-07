import { Suspense, lazy } from "react";
import TileContainer from "../tileContainer";
import NewPlaceButton from "../buttons/newPlaceButton";
import { useTranslation } from "react-i18next";
import DashTile from "../dashTile";
import { NationModel } from "../../models/nationModel";
import TileSkeleton from "../loading/skeletons/tileSkeleton";
import { PlaceListModel } from "../../models/lists/placeListModel";

interface PlacesProps {
  selectedNation: NationModel;
  nationPlaceList: PlaceListModel;
  owner: boolean;
}

export default function Places({
  selectedNation,
  nationPlaceList,
  owner,
}: PlacesProps) {
  const { t } = useTranslation();
  const PlaceTile = lazy(() => import("../tiles/placeTile"));

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
                {nationPlaceList
                  .getPlacesByParentId(selectedNation.officialId)
                  .getItems().length > 0 ? (
                  nationPlaceList
                    .getPlacesByParentId(selectedNation.officialId)
                    .getItems()
                    .map((place, i) => {
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
