import { lazy, Suspense } from "react";
import ReportPanel from "../../components/ui/reportPanel";
import { createPageTitle } from "../../utils/procedures";
import MapSkeleton from "../../components/ui/loading/skeletons/mapSkeleton";
import TileSkeleton from "../../components/ui/loading/skeletons/tileSkeleton";
import ParamSkeleton from "../../components/ui/loading/skeletons/paramSkeleton";
import { useLoadNationPlaces } from "../../hooks/useLoadNationPlaces";
import { usePlace } from "../../hooks/pagesHooks/usePlace";

export default function Place() {
  const { place, nation, owner, updatePath, t } = usePlace();
  const nationPlaceList = useLoadNationPlaces(nation);

  createPageTitle(place.name);

  const PlaceHeader = lazy(() => import("../../components/place/placeHeader"));
  const PlaceIdentity = lazy(
    () => import("../../components/place/placeIdentity"),
  );
  const PlaceChildren = lazy(
    () => import("../../components/place/placeChildren"),
  );

  return place.officialId ? (
    <>
      <section className="w-full px-2 pb-2 flex flex-col items-center gap-2">
        <Suspense fallback={<ParamSkeleton />}>
          <PlaceHeader
            place={place}
            nation={nation}
            owner={owner}
            updatePath={updatePath}
          />
        </Suspense>
        {!place.reported && (
          <Suspense fallback={<MapSkeleton />}>
            <PlaceIdentity
              place={place}
              owner={owner}
              updatePath={updatePath}
            />
          </Suspense>
        )}
      </section>
      <Suspense fallback={<TileSkeleton />}>
        <PlaceChildren
          place={place}
          nation={nation}
          owner={owner}
          nationPlaceList={nationPlaceList}
        />
      </Suspense>
      <ReportPanel content={place} />
    </>
  ) : (
    <em className="text-center">{t("pages.place.noPlace")}</em>
  );
}
