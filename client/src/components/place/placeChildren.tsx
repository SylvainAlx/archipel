import { lazy, Suspense, useState } from "react";
import Spinner from "../loading/spinner";
import NewPlaceButton from "../buttons/newPlaceButton";
import { Place } from "../../types/typPlace";
import { Nation } from "../../types/typNation";
import { useTranslation } from "react-i18next";
import { useAtom } from "jotai";
import { nationPlaceListAtomV2 } from "../../settings/store";

interface PlaceChildrenProps {
  place: Place;
  nation: Nation;
  owner: boolean;
}

export default function PlaceChildren({
  place,
  nation,
  owner,
}: PlaceChildrenProps) {
  const [haveChildren, setHaveChildren] = useState(false);
  const [nationPlacesList] = useAtom(nationPlaceListAtomV2);
  const PlaceTile = lazy(() => import("../tiles/placeTile"));
  const { t } = useTranslation();

  return (
    <section className="w-full px-2 flex flex-wrap justify-center gap-2">
      <div className="w-full py-4 flex flex-col gap-2">
        {nationPlacesList != undefined &&
          nationPlacesList.getItems().length > 0 &&
          nationPlacesList.getItems().map((loc, i) => {
            if (loc.parentId === place.officialId) {
              !haveChildren && setHaveChildren(true);
              return (
                <Suspense key={i} fallback={<Spinner />}>
                  <div className="relative w-full">
                    <PlaceTile owner={false} place={loc} />
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
