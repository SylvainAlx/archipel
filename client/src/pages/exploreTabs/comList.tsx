/* eslint-disable react-hooks/exhaustive-deps */
import Button from "../../components/buttons/button";
import { useState, Suspense, lazy } from "react";
import H1 from "../../components/titles/h1";
import IndexTag from "../../components/tags/indexTag";
import BarreLoader from "../../components/loading/barreLoader";
import { StringProps } from "../../types/typProp";
import { useTranslation } from "react-i18next";
import ComSearchBar from "../../components/searchBars/comSearchBar";
import { Com } from "../../types/typCom";

export default function ComList({ text }: StringProps) {
  const [comList, setComList] = useState<Com[]>([]);
  const [displayedComs, setDisplayedComs] = useState(10);
  const { t } = useTranslation();
  const ComTile = lazy(() => import("../../components/tiles/comTile"));

  return (
    <>
      <H1 text={text} />
      <ComSearchBar type="com" setList={setComList} />
      <section className="w-full flex gap-1 flex-wrap items-center flex-col ">
        {comList != undefined &&
          comList.length > 0 &&
          comList.map((com, i) => {
            if (i < displayedComs) {
              return (
                <Suspense key={i} fallback={<BarreLoader />}>
                  <div className="min-w-[300px] w-full relative transition-all duration-300 animate-fadeIn">
                    <ComTile com={com} />
                    <IndexTag text={i} />
                  </div>
                </Suspense>
              );
            }
          })}
        {displayedComs < comList.length && (
          <Button
            click={() => setDisplayedComs(displayedComs + 5)}
            text={t("components.buttons.showMore")}
          />
        )}
      </section>
    </>
  );
}
