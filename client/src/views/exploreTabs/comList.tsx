/* eslint-disable react-hooks/exhaustive-deps */
import Button from "../../components/buttons/button";
import { Suspense, lazy } from "react";
import H1 from "../../components/titles/h1";
import IndexTag from "../../components/tags/indexTag";
import { StringProps } from "../../types/typProp";
import { useTranslation } from "react-i18next";
import ComSearchBar from "../../components/searchBars/comSearchBar";
import { ELEMENTS_DISPLAYED_LIMIT } from "../../settings/consts";
import TileSkeleton from "../../components/loading/skeletons/tileSkeleton";
import { useComList } from "../../hooks/exploreTabsHooks/useComList";

export default function ComList({ text }: StringProps) {
  const { comList, setComList, displayedComs, setDisplayedComs } = useComList();
  const { t } = useTranslation();
  const ComTile = lazy(() => import("../../components/tiles/comTile"));

  return (
    <>
      <H1 text={text} />
      <ComSearchBar type="com" list={comList} setList={setComList} />
      <section className="w-full flex gap-1 flex-wrap items-center flex-col ">
        {comList.getItems().map((com, i) => {
          if (i < displayedComs) {
            return (
              <Suspense key={i} fallback={<TileSkeleton />}>
                <div className="min-w-[300px] w-full relative transition-all duration-300 animate-fadeIn">
                  <ComTile com={com} />
                  <IndexTag text={i} />
                </div>
              </Suspense>
            );
          }
        })}
      </section>
      {displayedComs < comList.getItems().length && (
        <Button
          click={() =>
            setDisplayedComs(displayedComs + ELEMENTS_DISPLAYED_LIMIT.coms)
          }
          text={t("components.buttons.showMore")}
        />
      )}
    </>
  );
}
