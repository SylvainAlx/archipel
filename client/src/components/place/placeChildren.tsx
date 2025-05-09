import { lazy, Suspense } from "react";
import NewPlaceButton from "../ui/buttons/newPlaceButton";
import { useTranslation } from "react-i18next";
import { NationModel } from "../../models/nationModel";
import { PlaceModel } from "../../models/placeModel";
import TileSkeleton from "../ui/loading/skeletons/tileSkeleton";
import { PlaceListModel } from "../../models/lists/placeListModel";
import usePlaceChildren from "../../hooks/componentsHooks/place/usePlaceChildren";

interface PlaceChildrenProps {
  place: PlaceModel;
  nation: NationModel;
  owner: boolean;
  nationPlaceList: PlaceListModel;
}

export default function PlaceChildren({
  place,
  nation,
  owner,
  nationPlaceList,
}: PlaceChildrenProps) {
  const PlaceTile = lazy(() => import("../ui/tiles/placeTile"));
  const { t } = useTranslation();
  const { children } = usePlaceChildren(place, nationPlaceList);

  return (
    <section className="w-full px-2 flex flex-wrap justify-center gap-2">
      <div className="w-full py-4 flex flex-col gap-2">
        {children.getItems().map((loc, i) => {
          return (
            <Suspense key={i} fallback={<TileSkeleton />}>
              <div className="relative w-full">
                <PlaceTile owner={false} place={loc} nation={nation} />
              </div>
            </Suspense>
          );
        })}
        {children.getItems().length === 0 && (
          <em className="text-center">{t("pages.place.noChildrenPlaces")}</em>
        )}
      </div>
      {owner && place.type != 2 && (
        <NewPlaceButton
          nation={nation}
          parentId={place.officialId}
          owner={owner}
        />
      )}
    </section>
  );
}
