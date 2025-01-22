/* eslint-disable react-hooks/exhaustive-deps */
import Button from "../../components/buttons/button";
import { useState, lazy, Suspense } from "react";
import H1 from "../../components/titles/h1";
import IndexTag from "../../components/tags/indexTag";
import BarreLoader from "../../components/loading/barreLoader";
import { StringProps } from "../../types/typProp";
import PlaceSearchBar from "../../components/searchBars/placeSearchBar";
import { useTranslation } from "react-i18next";
import { ELEMENTS_DISPLAYED_LIMIT } from "../../settings/consts";
import { PlaceListModel } from "../../models/lists/placeListModel";

export default function PlaceList({ text }: StringProps) {
  const [placesList, setPlacesList] = useState<PlaceListModel>(
    new PlaceListModel(),
  );
  const [displayedPlaces, setDisplayedPlaces] = useState(
    ELEMENTS_DISPLAYED_LIMIT.places,
  );
  const { t } = useTranslation();

  const PlaceTile = lazy(() => import("../../components/tiles/placeTile"));

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
                <Suspense key={i} fallback={<BarreLoader />}>
                  <div className="min-w-[300px] w-full relative transition-all duration-300 animate-fadeIn">
                    <PlaceTile place={place} />
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
