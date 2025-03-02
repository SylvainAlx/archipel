/* eslint-disable react-hooks/exhaustive-deps */
import Button from "../../components/buttons/button";
import { useState, lazy, Suspense } from "react";
import H1 from "../../components/titles/h1";
import IndexTag from "../../components/tags/indexTag";
import NationSearchBar from "../../components/searchBars/nationSearchBar";
import { StringProps } from "../../types/typProp";
import { useTranslation } from "react-i18next";
import { ELEMENTS_DISPLAYED_LIMIT } from "../../settings/consts";
import { NationListModel } from "../../models/lists/nationListModel";
import TileSkeleton from "../../components/loading/skeletons/tileSkeleton";
import RegimeChart from "../../components/charts/regimeChart";
// import AdBanner from "../../components/ads/adBanner";

export default function NationList({ text }: StringProps) {
  const [nationsList, setNationsList] = useState<NationListModel>(
    new NationListModel(),
  );
  const [displayedNations, setDisplayedNations] = useState(
    ELEMENTS_DISPLAYED_LIMIT.nations,
  );
  const { t } = useTranslation();
  const NationTile = lazy(() => import("../../components/tiles/nationTile"));

  return (
    <>
      {/* <AdBanner /> */}
      <H1 text={text} />
      <NationSearchBar
        type="nation"
        list={nationsList}
        setList={setNationsList}
      />
      <RegimeChart nations={nationsList} />
      <section className="w-full flex gap-1 flex-wrap items-center flex-col ">
        {nationsList != undefined &&
          nationsList.getItems().length > 0 &&
          nationsList.getItems().map((nation, i) => {
            if (i < displayedNations) {
              return (
                <Suspense key={i} fallback={<TileSkeleton />}>
                  <div className="min-w-[300px] w-full relative transition-all duration-300 animate-fadeIn">
                    <NationTile nation={nation} />
                    <IndexTag text={i} />
                  </div>
                </Suspense>
              );
            }
          })}
      </section>
      {displayedNations < nationsList.getItems().length && (
        <Button
          click={() =>
            setDisplayedNations(
              displayedNations + ELEMENTS_DISPLAYED_LIMIT.nations,
            )
          }
          text={t("components.buttons.showMore")}
        />
      )}
    </>
  );
}
