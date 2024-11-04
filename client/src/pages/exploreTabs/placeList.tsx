/* eslint-disable react-hooks/exhaustive-deps */
import Button from "../../components/buttons/button";
import { useState, lazy, Suspense } from "react";
import H1 from "../../components/titles/h1";
import IndexTag from "../../components/tags/indexTag";
import BarreLoader from "../../components/loading/barreLoader";
import { StringProps } from "../../types/typProp";
import { Place } from "../../types/typPlace";
import PlaceSearchBar from "../../components/searchBars/placeSearchBar";
import { useTranslation } from "react-i18next";

export default function PlaceList({ text }: StringProps) {
  const [placesList, setPlacesList] = useState<Place[]>([]);
  const [displayedPlaces, setDisplayedPlaces] = useState(10);
  const { t } = useTranslation();

  const PlaceTile = lazy(() => import("../../components/tiles/placeTile"));

  return (
    <>
      <H1 text={text} />
      <PlaceSearchBar type="nation" list={placesList} setList={setPlacesList} />
      <section className="w-full flex gap-1 flex-wrap items-center flex-col ">
        {placesList != undefined &&
          placesList.length > 0 &&
          placesList.map((place, i) => {
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
      {displayedPlaces < placesList.length && (
        <Button
          click={() => setDisplayedPlaces(displayedPlaces + 5)}
          text={t("components.buttons.showMore")}
        />
      )}
    </>
  );
}
