import Button from "../../components/ui/buttons/button";
import { lazy, Suspense } from "react";
import H1 from "../../components/ui/titles/h1";
import IndexTag from "../../components/ui/tags/indexTag";
import { StringProps } from "../../types/typProp";
import PlaceSearchBar from "../../components/searchBars/placeSearchBar";
import { useTranslation } from "react-i18next";
import { ELEMENTS_DISPLAYED_LIMIT } from "../../settings/consts";
import { NationModel } from "../../models/nationModel";
import TileSkeleton from "../../components/ui/loading/skeletons/tileSkeleton";
import { usePlaceList } from "../../hooks/exploreTabsHooks/usePlaceList";
import { PlaceModel } from "../../models/placeModel";

export default function PlaceList({ text }: StringProps) {
  const { placesList, setPlacesList, displayedPlaces, setDisplayedPlaces } =
    usePlaceList();
  const { t } = useTranslation();

  const PlaceTile = lazy(() => import("../../components/ui/tiles/placeTile"));

  return (
    <>
      <H1 text={text} />
      <PlaceSearchBar type="nation" list={placesList} setList={setPlacesList} />
      <section className="w-full flex gap-1 flex-wrap items-center flex-col ">
        {placesList != undefined &&
          placesList.getItems().length > 0 &&
          placesList.getItems().map((place, i) => {
            if (i < displayedPlaces) {
              return (
                <Suspense key={i} fallback={<TileSkeleton />}>
                  <div className="min-w-[300px] w-full relative transition-all duration-300 animate-fadeIn">
                    <PlaceTile
                      place={new PlaceModel(place)}
                      nation={new NationModel()}
                    />
                    <IndexTag text={i} />
                  </div>
                </Suspense>
              );
            }
          })}
      </section>
      {displayedPlaces < placesList.getItems().length && (
        <Button
          click={() =>
            setDisplayedPlaces(
              displayedPlaces + ELEMENTS_DISPLAYED_LIMIT.places,
            )
          }
          text={t("components.buttons.showMore")}
        />
      )}
    </>
  );
}
