/* eslint-disable react-hooks/exhaustive-deps */
import Button from "../../components/buttons/button";
import { useState, lazy, Suspense } from "react";
import H1 from "../../components/titles/h1";
import IndexTag from "../../components/tags/indexTag";
import NationSearchBar from "../../components/searchBars/nationSearchBar";
import BarreLoader from "../../components/loading/barreLoader";
import { StringProps } from "../../types/typProp";
import { Nation } from "../../types/typNation";
import { useTranslation } from "react-i18next";

export default function NationList({ text }: StringProps) {
  const [nationsList, setNationsList] = useState<Nation[]>([]);
  const [displayedNations, setDisplayedNations] = useState(10);
  const { t } = useTranslation();
  const NationTile = lazy(() => import("../../components/tiles/nationTile"));

  return (
    <>
      <H1 text={text} />
      <NationSearchBar
        type="nation"
        list={nationsList}
        setList={setNationsList}
      />
      <section className="w-full flex gap-1 flex-wrap items-center flex-col ">
        {nationsList != undefined &&
          nationsList.length > 0 &&
          nationsList.map((nation, i) => {
            if (i < displayedNations) {
              return (
                <Suspense key={i} fallback={<BarreLoader />}>
                  <div className="min-w-[300px] w-full relative transition-all duration-300 animate-fadeIn">
                    <NationTile
                      _id={nation._id}
                      officialId={nation.officialId}
                      name={nation.name}
                      owner={nation.owner}
                      data={nation.data}
                      createdAt={nation.createdAt}
                    />
                    <IndexTag text={i} />
                  </div>
                </Suspense>
              );
            }
          })}
        {displayedNations < nationsList.length && (
          <Button
            click={() => setDisplayedNations(displayedNations + 5)}
            text={t("components.buttons.showMore")}
          />
        )}
      </section>
    </>
  );
}
