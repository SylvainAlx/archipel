import { lazy, Suspense, useState } from "react";
import NewPlaceButton from "../buttons/newPlaceButton";
import { useTranslation } from "react-i18next";
import { NationModel } from "../../models/nationModel";
import { PlaceModel } from "../../models/placeModel";
import { placeListAtomV2 } from "../../settings/store";
import { useAtom } from "jotai";
import TileSkeleton from "../loading/skeletons/tileSkeleton";

interface PlaceChildrenProps {
  place: PlaceModel;
  nation: NationModel;
  owner: boolean;
}

export default function PlaceChildren({
  place,
  nation,
  owner,
}: PlaceChildrenProps) {
  const [haveChildren, setHaveChildren] = useState(false);
  const [placeList] = useAtom(placeListAtomV2);
  const PlaceTile = lazy(() => import("../tiles/placeTile"));
  const { t } = useTranslation();

  return (
    <section className="w-full px-2 flex flex-wrap justify-center gap-2">
      <div className="w-full py-4 flex flex-col gap-2">
        {placeList.getItems().length > 0 &&
          placeList.getItems().map((loc, i) => {
            if (loc.parentId === place.officialId) {
              !haveChildren && setHaveChildren(true);
              return (
                <Suspense key={i} fallback={<TileSkeleton />}>
                  <div className="relative w-full">
                    <PlaceTile owner={false} place={loc} nation={nation} />
                  </div>
                </Suspense>
              );
            }
          })}
        {!haveChildren && (
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
