import Button from "../../components/ui/buttons/button";
import { lazy, Suspense } from "react";
import H1 from "../../components/ui/titles/h1";
import IndexTag from "../../components/ui/tags/indexTag";
import NationSearchBar from "../../components/searchBars/nationSearchBar";
import { StringProps } from "../../types/typProp";
import { useTranslation } from "react-i18next";
import { ELEMENTS_DISPLAYED_LIMIT } from "../../settings/consts";
import TileSkeleton from "../../components/ui/loading/skeletons/tileSkeleton";
import { useNationList } from "../../hooks/exploreTabsHooks/useNationList";
// import AdBanner from "../../components/ads/adBanner";

export default function NationList({ text }: StringProps) {
  const { nationsList, setNationsList, displayedNations, setDisplayedNations } =
    useNationList();
  const { t } = useTranslation();
  const NationTile = lazy(() => import("../../components/ui/tiles/nationTile"));

  return (
    <>
      {/* <AdBanner /> */}
      <H1 text={text} />
      <NationSearchBar
        type="nation"
        list={nationsList}
        setList={setNationsList}
      />
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
